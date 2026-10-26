"""HTTP/robots smoke check; user-agent strings do not establish real crawler visits."""
import concurrent.futures
import hashlib
import json
import re
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.robotparser import RobotFileParser

ROOT = Path(__file__).resolve().parent.parent
origin = json.loads((ROOT / 'site.config.json').read_text())['origin'].rstrip('/')
agents = ['OAI-SearchBot','Googlebot','bingbot','PerplexityBot','Claude-SearchBot']
def get(route, agent='Earnit-Discovery-Check'):
    with urlopen(Request(origin + route, headers={'User-Agent':agent,'Cache-Control':'no-cache'}), timeout=30) as response:
        assert response.status == 200, (route, agent, response.status)
        rules = response.headers.get('X-Robots-Tag', '').lower()
        assert not re.search(r'\b(noindex|nosnippet|none)\b|max-snippet:\s*0\b', rules), (route, agent, rules)
        return response.read()
robots = RobotFileParser()
robots.parse(get('/robots.txt').decode().splitlines())
manifest = json.loads(get('/publication.json'))
route = manifest['articles'][-1]['en']
def check(agent):
    assert robots.can_fetch(agent, origin + route), (agent, 'robots.txt disallows the article')
    content = get(route, agent)
    assert b'<h1>' in content and b'application/ld+json' in content, (agent, 'missing static content')
    return agent, hashlib.sha256(content).hexdigest()
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    results = list(pool.map(check, agents))
assert len({digest for _,digest in results}) == 1, 'Different article content returned for different user agents'
print(f'HTTP 200, robots access and identical HTML confirmed for {", ".join(agents)} on {origin}{route}.')
print('This is a user-agent smoke check, not evidence of indexing, verified crawler IP access or AI citations.')
