import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { editorialDay, publishedGuides } from './publication.mjs';

const config = JSON.parse(await readFile(new URL('../site.config.json', import.meta.url), 'utf8'));
const all = JSON.parse(await readFile(new URL('../content/guides.json', import.meta.url), 'utf8'));
const eligible = publishedGuides(all);
const origin = new URL(config.origin).origin;
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
async function get(route, expected = 200) {
  const url = new URL(route, origin);
  url.searchParams.set('publication-check', String(Date.now()));
  const response = await fetch(url, {headers:{'Cache-Control':'no-cache'}, signal:AbortSignal.timeout(30000)});
  assert.equal(response.status, expected, `${route}: expected HTTP ${expected}, got ${response.status}`);
  return response.text();
}
const manifest = JSON.parse(await get('/publication.json'));
assert.equal(manifest.timeZone, 'America/Argentina/Cordoba');
assert.deepEqual(manifest.articles.map(g => g.id).sort(), eligible.map(g => g.id).sort(), 'Production article IDs differ from the editorial calendar');
const sitemap = await get('/sitemap.xml');
for (const guide of eligible) {
  for (const lang of ['en','es']) {
    const route = `${lang === 'es' ? '/es' : ''}/guides/${guide[lang].slug}/`;
    const body = await get(route);
    assert.ok(body.includes(`<h1>${escape(guide[lang].title)}</h1>`), `${route}: incorrect article heading`);
    assert.ok(body.includes(`<link rel="canonical" href="${origin}${route}">`), `${route}: incorrect canonical`);
    assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: missing from sitemap`);
  }
}
const next = all.find(g => g.datePublished > editorialDay());
if (next) {
  for (const lang of ['en','es']) {
    const route = `${lang === 'es' ? '/es' : ''}/guides/${next[lang].slug}/`;
    await get(route, 404);
    assert.ok(!sitemap.includes(`${origin}${route}`), 'Future article leaked into sitemap');
  }
}
console.log(`Verified ${eligible.length} bilingual articles on ${origin}; future URLs remain unpublished.`);
