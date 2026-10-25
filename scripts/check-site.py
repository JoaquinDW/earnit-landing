"""Check the deployable site: links, SEO identity, locale reciprocity and sitemap coverage."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
CONFIG = json.loads((ROOT / 'site.config.json').read_text())
ORIGIN = CONFIG['origin'].rstrip('/')
errors = []

class Page(HTMLParser):
    def __init__(self, file):
        super().__init__(convert_charrefs=True)
        self.file = file
        self.links = []
        self.ids = set()
        self.h1s = 0
        self.canonical = []
        self.alternates = {}
        self.description = []
        self.lang = None
        self.title = ''
        self.in_title = False
        self.jsonld = []
        self.in_jsonld = False
        self.json_text = ''
    def handle_starttag(self, tag, attrs):
        names = [name for name, _ in attrs]
        if len(names) != len(set(names)):
            errors.append(f'{self.file}: duplicate attribute on {tag}')
        a = dict(attrs)
        if a.get('id'):
            if a['id'] in self.ids:
                errors.append(f'{self.file}: duplicate id {a["id"]}')
            self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'h1': self.h1s += 1
        if tag == 'title': self.in_title = True
        if tag == 'meta' and a.get('name') == 'description': self.description.append(a.get('content',''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if tag == 'link' and a.get('rel') == 'alternate' and a.get('hreflang'): self.alternates[a['hreflang']] = a.get('href')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ('script','img') and a.get('src'): self.links.append(a['src'])
        if tag == 'link' and a.get('rel') in ('stylesheet','preload') and a.get('href'): self.links.append(a['href'])
        if tag == 'img' and 'alt' not in a: errors.append(f'{self.file}: image missing alt')
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_jsonld = True; self.json_text = ''
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_jsonld: self.json_text += data
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_jsonld:
            self.in_jsonld = False
            try: self.jsonld.append(json.loads(self.json_text))
            except json.JSONDecodeError: errors.append(f'{self.file}: invalid JSON-LD')

def route(file):
    relative = file.relative_to(PUBLIC).as_posix()
    return '/' + relative[:-10] if relative.endswith('index.html') else '/' + relative

def resolve(href, current):
    parsed = urlsplit(href)
    if parsed.scheme and parsed.scheme not in ('http','https'): return None, None
    if parsed.netloc and parsed.netloc != urlsplit(ORIGIN).netloc: return None, None
    value = unquote(parsed.path)
    if not value: target = current
    elif value.startswith('/'): target = PUBLIC / value.lstrip('/')
    else: target = current.parent / value
    if target.is_dir(): target /= 'index.html'
    return target.resolve(), unquote(parsed.fragment)

pages = {}
for file in PUBLIC.rglob('*.html'):
    page = Page(file.relative_to(PUBLIC))
    content = file.read_text()
    page.feed(content)
    pages[file.resolve()] = page
    if page.alternates and re.search(r'\{\{[^}]+\}\}|data-i18n',content): errors.append(f'{page.file}: unresolved template/translation marker')

localized = [page for file,page in pages.items() if page.alternates]
for file,page in pages.items():
    for href in page.links:
        target, fragment = resolve(href,file)
        if target is None: continue
        if not target.is_file(): errors.append(f'{page.file}: broken link {href}')
        elif fragment and target in pages and fragment not in pages[target].ids:
            errors.append(f'{page.file}: missing fragment {href}')
    if not page.alternates: continue
    expected = ORIGIN + route(file)
    if page.canonical != [expected]: errors.append(f'{page.file}: canonical must be {expected}')
    if page.h1s != 1 or not page.title or len(page.description) != 1 or not page.description[0]:
        errors.append(f'{page.file}: missing or ambiguous h1/title/description')
    if set(page.alternates) != {'en','es','x-default'}: errors.append(f'{page.file}: missing locale alternate')
    if page.alternates.get(page.lang) != expected: errors.append(f'{page.file}: missing self alternate')
    if not page.jsonld: errors.append(f'{page.file}: missing structured data')
    for lang, href in page.alternates.items():
        target,_ = resolve(href,file)
        other = pages.get(target)
        if other is None: errors.append(f'{page.file}: missing localized page {href}')
        elif other.alternates != page.alternates: errors.append(f'{page.file}: nonreciprocal language links')
        elif lang != 'x-default' and other.lang != lang: errors.append(f'{page.file}: alternate language mismatch')

titles = [page.title for page in localized]
if len(titles) != len(set(titles)): errors.append('Localized pages have duplicate titles')
sitemap = ET.parse(PUBLIC / 'sitemap.xml')
ns = {'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
locations = [node.text for node in sitemap.findall('s:url/s:loc',ns)]
if len(locations) != len(set(locations)): errors.append('Sitemap has duplicate URLs')
for page in localized:
    if page.canonical[0] not in locations: errors.append(f'{page.file}: absent from sitemap')
for location in locations:
    target,_ = resolve(location,PUBLIC/'index.html')
    if target is None or not target.is_file(): errors.append(f'Sitemap points to missing file: {location}')
robots = (PUBLIC / 'robots.txt').read_text()
if f'Sitemap: {ORIGIN}/sitemap.xml' not in robots: errors.append('robots.txt missing sitemap')
for css in (PUBLIC/'assets').glob('*.css'):
    for href in re.findall(r'url\([\'"]?([^\)\'"\s]+)',css.read_text()):
        if href.startswith('data:'): continue
        target,_ = resolve(href,css)
        if target is not None and not target.is_file(): errors.append(f'{css.name}: missing CSS asset {href}')
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'Validated {len(pages)} HTML pages, {len(localized)} localized pages, all local links/fragments, JSON-LD, locale pairs and {len(locations)} sitemap URLs.')
