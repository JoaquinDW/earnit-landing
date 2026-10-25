import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'public');
const read = async file => readFile(path.join(root, file), 'utf8');
try {
  const env = await read('.env.local');
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^(POSTHOG_PROJECT_TOKEN|POSTHOG_HOST|ENABLE_WEBSITE_ANALYTICS)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].trim();
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const config = JSON.parse(await read('site.config.json'));
const homeCopy = JSON.parse(await read('content/home.json'));
const guides = JSON.parse(await read('content/guides.json'));
const template = await read('src/home.html');
const origin = new URL(config.origin).origin;
const languages = ['en', 'es'];
const analyticsEnabled = process.env.ENABLE_WEBSITE_ANALYTICS === 'true';
if (analyticsEnabled && (!process.env.POSTHOG_PROJECT_TOKEN || !process.env.POSTHOG_HOST)) {
  throw new Error('Analytics enabled without POSTHOG_PROJECT_TOKEN and POSTHOG_HOST.');
}
if (analyticsEnabled && !/^phc_[A-Za-z0-9_-]+$/.test(process.env.POSTHOG_PROJECT_TOKEN)) throw new Error('Use the public PostHog project token, never a personal API key.');
if (analyticsEnabled && new URL(process.env.POSTHOG_HOST).protocol !== 'https:') throw new Error('PostHog ingestion requires HTTPS.');
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const homePath = lang => lang === 'es' ? '/es/' : '/';
const guidesPath = lang => `${homePath(lang)}guides/`;
const guidePath = (guide, lang) => `${guidesPath(lang)}${guide[lang].slug}/`;
const url = route => origin + route;
const arrow = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const label = {
  en: {
    guides: 'Guides', home: 'Earnit for iPhone', how: 'How it works', get: 'Get the app', skip: 'Skip to content',
    title: 'A little less scroll. A little more know-how.',
    intro: 'Practical guides to app limits, earned screen time, and putting a little movement before your next session.',
    description: 'Learn how to earn screen time by walking and set app limits on iPhone. Practical guides from Earnit, with clear steps and honest limitations.',
    read: 'Read the guide', guide: 'Guide', next: 'Keep reading', contents: 'In this guide', answer: 'The short answer',
    updated: 'Updated', author: 'By the Earnit team', sources: 'Sources & further reading', back: 'All guides',
    ctaTitle: 'Make your next walk count.', ctaBody: 'Turn your steps into time for the apps you choose. Earnit for iPhone, with iOS 18 or later.',
    download: 'Download on the App Store', product: 'See how Earnit works', available: 'See current pricing and in-app purchases on the App Store.',
    footer: 'A little more life. A little less scroll.', privacy: 'Privacy', terms: 'Terms', support: 'Support',
    sectionTitle: 'A better boundary starts here.', sectionBody: 'A few practical ways to make your next app session more intentional.',
    switch: 'Language', nav: 'Main navigation', footerNav: 'Footer navigation', breadcrumb: 'Breadcrumb',
    indexTitle: 'iPhone Screen Time & Walking Guides | Earnit',
    screenshot: 'App Store image showing the Earnit app, with a balance of earned minutes and selected apps.',
    caption: 'Earnit’s App Store image. The balance shown is an example.',
    onThisPage: 'On this page', review: 'Product details checked against our App Store listing; iPhone instructions link to Apple’s documentation.'
  },
  es: {
    guides: 'Guías', home: 'Earnit para iPhone', how: 'Cómo funciona', get: 'Descargar', skip: 'Ir al contenido',
    title: 'Menos scroll. Más claridad.',
    intro: 'Guías prácticas sobre límites de apps, tiempo que ganas y un poco de movimiento antes de tu próxima sesión.',
    description: 'Aprende a ganar tiempo de pantalla caminando y a limitar apps en iPhone. Guías de Earnit con pasos claros y límites explicados.',
    read: 'Leer la guía', guide: 'Guía', next: 'Sigue leyendo', contents: 'En esta guía', answer: 'La respuesta breve',
    updated: 'Actualizado', author: 'Por el equipo de Earnit', sources: 'Fuentes y más información', back: 'Todas las guías',
    ctaTitle: 'Dale algo más a tu próxima caminata.', ctaBody: 'Convierte tus pasos en tiempo para las apps que elijas. Earnit para iPhone, con iOS 18 o posterior.',
    download: 'Descargar en el App Store', product: 'Descubre cómo funciona Earnit', available: 'Consulta precios y compras dentro de la app en el App Store.',
    footer: 'Un poco más de vida. Un poco menos de scroll.', privacy: 'Privacidad', terms: 'Condiciones', support: 'Soporte',
    sectionTitle: 'Empieza por una regla más clara.', sectionBody: 'Ideas prácticas para elegir cómo quieres usar tus apps.',
    switch: 'Idioma', nav: 'Navegación principal', footerNav: 'Navegación del pie', breadcrumb: 'Ruta de navegación',
    indexTitle: 'Guías de tiempo de pantalla y movimiento en iPhone | Earnit',
    screenshot: 'Imagen del App Store de Earnit con un saldo de minutos ganados y una selección de apps.',
    caption: 'Imagen de Earnit en el App Store, en inglés. El saldo mostrado es un ejemplo.',
    onThisPage: 'En esta página', review: 'Los detalles del producto se contrastaron con nuestra ficha del App Store; las instrucciones de iPhone enlazan a la documentación de Apple.'
  }
};

for (const guide of guides) {
  if (!/^[a-z][a-z0-9-]+$/.test(guide.id)) throw new Error(`Invalid guide ID: ${guide.id}`);
  for (const lang of languages) {
    if (!/^[a-z0-9-]+$/.test(guide[lang].slug)) throw new Error('Invalid guide slug');
    for (const key of ['title', 'description', 'summary', 'lead', 'answer']) {
      if (!guide[lang][key]) throw new Error(`Missing ${guide.id}.${lang}.${key}`);
    }
  }
}

function alternates(paths) {
  return languages.map(lang => `<link rel="alternate" hreflang="${lang}" href="${url(paths[lang])}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${url(paths.en)}">`;
}
function seoHead(route, paths, lang, schema) {
  const verification = config.googleSiteVerification ? `\n<meta name="google-site-verification" content="${esc(config.googleSiteVerification)}">` : '';
  return `<link rel="canonical" href="${url(route)}">\n${alternates(paths)}
<meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}">${verification}
<script type="application/ld+json">${json(schema)}</script>
<script src="/assets/analytics-config.js" defer></script><script src="/assets/analytics.js" defer></script>`;
}
function languageLinks(lang, paths) {
  return `<nav class="language" aria-label="${label[lang].switch}">${languages.map(code =>
    `<a href="${paths[code]}" lang="${code}" hreflang="${code}" data-language="${code}"${code === lang ? ' aria-current="page"' : ''} aria-label="${code === 'es' ? 'Español' : 'English'}">${code.toUpperCase()}</a>`).join('')}</nav>`;
}
function appLink(lang, placement, className = 'nav-download') {
  return `<a class="${className}" href="${esc(config.appStore)}" data-app-store data-placement="${placement}">${esc(label[lang].download)}${arrow}</a>`;
}
function header(lang, paths) {
  const t = label[lang];
  return `<a class="skip-link" href="#main">${t.skip}</a>
<header class="site-header"><nav class="nav wrap" aria-label="${t.nav}">
<a class="brand" href="${homePath(lang)}" aria-label="Earnit">Earnit<span class="brand-dot" aria-hidden="true"></span></a>
<div class="nav-links"><a href="${homePath(lang)}#how">${t.how}</a><a href="${guidesPath(lang)}">${t.guides}</a></div>
<div class="nav-actions">${languageLinks(lang, paths)}<a class="nav-download" href="${esc(config.appStore)}" data-app-store data-placement="header">${t.get}${arrow}</a></div>
</nav></header>`;
}
function footer(lang) {
  const t = label[lang];
  return `<footer class="site-footer wrap"><div class="footer-top"><a class="brand" href="${homePath(lang)}">Earnit<span class="brand-dot" aria-hidden="true"></span></a><p class="footer-tagline">${t.footer}</p><nav class="footer-links" aria-label="${t.footerNav}"><a href="${guidesPath(lang)}">${t.guides}</a><a href="/privacy.html">${t.privacy}</a><a href="/terms.html">${t.terms}</a><a href="/support/">${t.support}</a></nav></div><p class="copyright">© <span id="year">2026</span> Earnit</p></footer>`;
}
function guideRows(lang, selected = guides) {
  return `<div class="guide-list">${selected.map(guide => `<a class="guide-row" href="${guidePath(guide, lang)}"><div><h3>${esc(guide[lang].title)}</h3><p>${esc(guide[lang].summary)}</p></div><span class="guide-row-action">${label[lang].read}${arrow}</span></a>`).join('\n')}</div>`;
}
function guideSection(lang) {
  const t = label[lang];
  return `<section class="section guide-feature wrap" aria-labelledby="guides-title"><div class="section-heading"><h2 id="guides-title">${t.sectionTitle}</h2><p>${t.sectionBody}</p><a class="text-link" href="${guidesPath(lang)}">${t.back}${arrow}</a></div>${guideRows(lang)}</section>`;
}
function cta(lang) {
  const t = label[lang];
  return `<aside class="reader-cta" aria-labelledby="cta-title"><h2 id="cta-title">${t.ctaTitle}</h2><p>${t.ctaBody}</p>${appLink(lang, 'article-end')}<a class="text-link" href="${homePath(lang)}#how">${t.product}${arrow}</a><p class="cta-fine">${t.available}</p></aside>`;
}
function page(lang, route, paths, title, description, content, schema, article = false, extraMeta = '') {
  const favicon = template.match(/<link rel="icon"[^>]+>/)[0];
  return `<!doctype html>
<html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
${seoHead(route, paths, lang, schema)}
<meta name="theme-color" content="#070e0d"><meta property="og:type" content="${article ? 'article' : 'website'}">
<meta property="og:site_name" content="Earnit"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url(route)}">
<meta property="og:image" content="${url('/assets/earnit-appstore.png')}"><meta property="og:image:alt" content="${esc(label[lang].screenshot)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${url('/assets/earnit-appstore.png')}">
${extraMeta}${favicon}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script>
</head><body class="reader-page" data-page="${article ? 'guide' : 'guides'}" data-content="${article ? esc(guides.find(g => guidePath(g, lang) === route).id) : 'guides'}">
${header(lang, paths)}${content}${footer(lang)}</body></html>\n`;
}
function translateHome(html, lang) {
  const copy = { ...homeCopy[lang], 'nav.guides': label[lang].guides };
  html = html.replace(/<([a-z][\w-]*)([^>]*\sdata-i18n(?:-html)?="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g, (all, tag, attrs, key) => {
    if (!(key in copy)) throw new Error(`Missing translation: ${lang}.${key}`);
    const value = attrs.includes('data-i18n-html=') ? copy[key] : esc(copy[key]);
    return `<${tag}${attrs}>${value}</${tag}>`;
  });
  html = html.replace(/<[a-z][^>]*\sdata-i18n-(?:content|alt|aria-label)="[^"]+"[^>]*>/g, tag => {
    const updates = [...tag.matchAll(/data-i18n-(content|alt|aria-label)="([^"]+)"/g)];
    for (const [, attr, key] of updates) {
      if (!(key in copy)) throw new Error(`Missing attribute translation: ${lang}.${key}`);
      tag = tag.replace(new RegExp(`\\s${attr}="[^"]*"`, 'g'), '')
        .replace(` data-i18n-${attr}="${key}"`, '')
        .replace(/>$/, ` ${attr}="${esc(copy[key])}">`);
    }
    return tag;
  });
  // Attribute order varies: remove the original attribute even when it precedes the marker.
  html = html.replace(/\sdata-i18n(?:-html)?="[^"]*"/g, '');
  return html;
}
function breadcrumbSchema(lang, guide) {
  const entries = [[label[lang].home, homePath(lang)], [label[lang].guides, guidesPath(lang)]];
  if (guide) entries.push([guide[lang].title, guidePath(guide, lang)]);
  return { '@type': 'BreadcrumbList', itemListElement: entries.map(([name, route], i) => ({ '@type':'ListItem', position:i+1, name, item:url(route) })) };
}
async function save(route, html) {
  const target = path.join(out, route, 'index.html');
  await mkdir(path.dirname(target), { recursive:true });
  await writeFile(target, html);
}

// Only this disposable build directory is replaced. Authoring files and assets stay in place.
await rm(out, { recursive:true, force:true });
await mkdir(out, { recursive:true });
await mkdir(path.join(out, 'assets'), { recursive:true });
for (const asset of ['site.css','site.js','home.js','analytics.js','earnit-appstore.png','app-store-qr.svg','home-evening.jpg','earnit-guide.webp','earnit-logo.svg']) {
  await cp(path.join(root,'assets',asset),path.join(out,'assets',asset));
}
await writeFile(path.join(out,'assets/analytics-config.js'), `window.EARNIT_ANALYTICS=${json({
  enabled:analyticsEnabled, productionHost:new URL(origin).hostname,
  token:analyticsEnabled ? process.env.POSTHOG_PROJECT_TOKEN : '',
  host:analyticsEnabled ? new URL(process.env.POSTHOG_HOST).origin : ''
})};\n`);
for (const name of ['privacy.html', 'terms.html', '404.html', 'support']) {
  await cp(path.join(root, name), path.join(out, name), { recursive:true });
}
const routes = [];
for (const lang of languages) {
  const t = label[lang];
  const paths = { en:'/', es:'/es/' };
  const schema = { '@context':'https://schema.org', '@graph':[
    { '@type':'WebSite', '@id':origin+'/#website', name:'Earnit', url:origin+'/', inLanguage:['en','es'] },
    { '@type':'WebPage', name:homeCopy[lang]['meta.title'], url:url(homePath(lang)), inLanguage:lang, isPartOf:{ '@id':origin+'/#website' } }
  ]};
  const demoCopy = Object.fromEntries(Object.entries(homeCopy[lang]).filter(([key]) => key.startsWith('phone.') || key.startsWith('demo.')));
  const substitutions = {
    lang, title:esc(homeCopy[lang]['meta.title']),
    seoHead:seoHead(homePath(lang), paths, lang, schema),
    languageLinks:languageLinks(lang, paths), guidesPath:guidesPath(lang), guidesSection:guideSection(lang),
    demoScript:`<script type="application/json" id="demo-copy">${json(demoCopy)}</script>`
  };
  let home = translateHome(template, lang).replace(/\{\{(\w+)\}\}/g, (match,key) => {
    if (!(key in substitutions)) throw new Error(`Unknown home token: ${key}`);
    return substitutions[key];
  });
  home = home.replace(/(<meta property="og:url" content=")[^"]+/, `$1${url(homePath(lang))}`)
    .replace(/(<meta property="og:image:alt" content=")[^"]+/, `$1${esc(t.screenshot)}`)
    .replace(/<button class="menu-toggle"/, '<button hidden class="menu-toggle"')
    .replace('id="mobile-menu" hidden', 'id="mobile-menu"')
    .replace(/href="https:\/\/apps\.apple\.com\/app\/id6804905841"/g, `href="${esc(config.appStore)}" data-app-store data-placement="home"`);
  home = home.replace(/(<a class="nav-download"[^>]*data-placement=")home"/g, '$1header"')
    .replace(/(<a class="qr-link"[^>]*data-placement=")home"/g, '$1desktop-qr"');
  let badgeNumber = 0;
  home = home.replace(/(<a class="store-badge"[^>]*data-placement=")home"/g, (match,prefix) => `${prefix}${badgeNumber++ === 0 ? 'hero' : 'closing'}"`);
  // Nav duplication is intentional: desktop and mobile have independent accessible links.
  if (lang === 'es') home = home.replace('aria-label="Mobile navigation"', 'aria-label="Navegación móvil"');
  await save(homePath(lang), home);
  routes.push({ route:homePath(lang), paths });

  const indexPaths = Object.fromEntries(languages.map(code => [code, guidesPath(code)]));
  const indexContent = `<main id="main" class="guides-main wrap"><header class="guides-intro"><h1>${t.title}</h1><p>${t.intro}</p></header>${guideRows(lang)}<div class="guides-close"><p>${t.ctaBody}</p><a class="text-link" href="${homePath(lang)}#how">${t.product}${arrow}</a></div></main>`;
  const indexSchema = { '@context':'https://schema.org', '@graph':[
    { '@type':'CollectionPage', name:t.indexTitle, description:t.description, url:url(guidesPath(lang)), inLanguage:lang,
      mainEntity:{ '@type':'ItemList', itemListElement:guides.map((g,i) => ({ '@type':'ListItem', position:i+1, url:url(guidePath(g,lang)), name:g[lang].title })) } },
    breadcrumbSchema(lang)
  ]};
  await save(guidesPath(lang), page(lang, guidesPath(lang), indexPaths, t.indexTitle, t.description, indexContent, indexSchema));
  routes.push({ route:guidesPath(lang), paths:indexPaths });

  for (const guide of guides) {
    const data = guide[lang];
    const route = guidePath(guide,lang);
    const articlePaths = Object.fromEntries(languages.map(code => [code, guidePath(guide,code)]));
    let body = await read(`content/guides/${guide.id}.${lang}.html`);
    body = body.replace(/\{\{(home|guides|appStore|guide:[\w-]+)\}\}/g, (match, token) => {
      if (token === 'home') return homePath(lang);
      if (token === 'guides') return guidesPath(lang);
      if (token === 'appStore') return esc(config.appStore);
      const other = guides.find(g => g.id === token.slice(6));
      if (!other) throw new Error(`Unknown guide reference: ${token}`);
      return guidePath(other,lang);
    });
    const text = body.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
    const minutes = Math.max(1, Math.ceil(text.split(' ').length / (lang === 'es' ? 210 : 230)));
    const date = new Intl.DateTimeFormat(lang === 'es' ? 'es' : 'en', { dateStyle:'long', timeZone:'UTC' }).format(new Date(guide.dateModified+'T12:00:00Z'));
    const toc = `<nav class="article-toc" aria-label="${t.contents}"><p>${t.contents}</p><ol>${data.toc.map(([id,title]) => `<li><a href="#${id}">${esc(title)}</a></li>`).join('')}</ol></nav>`;
    const related = guides.filter(g => g.id !== guide.id);
    const content = `<main id="main"><article class="article wrap">
<nav class="breadcrumbs" aria-label="${t.breadcrumb}"><a href="${homePath(lang)}">Earnit</a><span aria-hidden="true">/</span><a href="${guidesPath(lang)}">${t.guides}</a></nav>
<header class="article-header"><h1>${esc(data.title)}</h1><p class="article-lead">${esc(data.lead)}</p><div class="article-meta"><span>${t.author}</span><span>${t.updated} <time datetime="${guide.dateModified}">${date}</time></span><span>${minutes} min ${lang === 'es' ? 'de lectura' : 'read'}</span></div></header>
<div class="article-layout"><div class="article-body"><div class="quick-answer"><h2>${t.answer}</h2><p>${esc(data.answer)}</p></div><details class="mobile-toc"><summary>${t.onThisPage}</summary>${toc}</details>${body}${cta(lang)}</div><aside class="article-rail">${toc}<a class="rail-product" href="${homePath(lang)}#how">${t.product}${arrow}</a></aside></div>
</article><section class="related-guides wrap" aria-labelledby="related-title"><h2 id="related-title">${t.next}</h2>${guideRows(lang,related)}</section></main>`;
    const articleSchema = { '@context':'https://schema.org', '@graph':[
      { '@type':'Article', headline:data.title, description:data.description, inLanguage:lang,
        datePublished:guide.datePublished, dateModified:guide.dateModified,
        mainEntityOfPage:{ '@type':'WebPage', '@id':url(route) },
        author:{ '@type':'Organization', name:config.publisher, url:origin+'/' },
        publisher:{ '@type':'Organization', name:config.publisher, url:origin+'/' } },
      breadcrumbSchema(lang,guide)
    ]};
    const extra = `<meta property="article:published_time" content="${guide.datePublished}"><meta property="article:modified_time" content="${guide.dateModified}">`;
    await save(route, page(lang, route, articlePaths, `${data.title} | Earnit`, data.description, content, articleSchema, true, extra));
    routes.push({ route, paths:articlePaths, modified:guide.dateModified });
  }
}
const sitemapEntries = routes.map(({route,paths,modified}) => `<url><loc>${url(route)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}${Object.entries(paths).map(([lang,alt]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(alt)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${url(paths.en)}"/></url>`);
for (const route of ['/privacy.html','/terms.html','/support/']) sitemapEntries.push(`<url><loc>${url(route)}</loc></url>`);
await writeFile(path.join(out,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join('\n')}\n</urlset>\n`);
await writeFile(path.join(out,'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('/sitemap.xml')}\n`);
console.log(`Built ${routes.length} localized pages, sitemap, robots.txt, and existing legal/support pages in public/.`);
