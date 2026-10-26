import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { editorialDay, publishedGuides } from './publication.mjs';

const guides = JSON.parse(await readFile(new URL('../content/guides.json', import.meta.url), 'utf8'));
const campaign = guides.filter(g => g.format === 'listicle');

test('publication uses Cordoba midnight rather than the UTC date', () => {
  assert.equal(editorialDay(new Date('2026-10-27T02:59:59Z')), '2026-10-26');
  assert.equal(editorialDay(new Date('2026-10-27T03:00:00Z')), '2026-10-27');
});

test('releases exactly one bilingual listicle per day, including today', () => {
  assert.equal(campaign.length, 10);
  assert.equal(new Set(campaign.flatMap(g => g.keywords)).size, 20);
  assert.equal(publishedGuides(campaign, '2026-10-25').length, 0);
  for (let i = 0; i < 10; i++) {
    const day = new Date(Date.UTC(2026, 9, 26 + i)).toISOString().slice(0, 10);
    const visible = publishedGuides(campaign, day);
    assert.equal(visible.length, i + 1, day);
    assert.equal(visible.at(-1).datePublished, day);
    assert.ok(visible.at(-1).en && visible.at(-1).es);
  }
  assert.equal(publishedGuides(campaign, '2026-11-05').length, 10);
});

test('rejects malformed editorial dates rather than publishing them', () => {
  assert.throws(() => publishedGuides([{id:'bad',datePublished:'2026-02-31',dateModified:'2026-03-03'}]));
  assert.throws(() => publishedGuides([{id:'bad',datePublished:'2026-10-26',dateModified:'2026-10-25'}]));
});
