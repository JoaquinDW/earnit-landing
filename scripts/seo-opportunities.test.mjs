import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, fromCSV, fromAPI, opportunities, report } from './seo-opportunities.mjs';

test('imports Spanish CSV with quoted decimals, commas, BOM and CRLF', () => {
  const rows = fromCSV('\uFEFFConsultas principales,Clics,Impresiones,CTR,Posición\r\n"caminar, ganar minutos",2,100,"2,00%","14,50"\r\n');
  assert.equal(rows[0].query,'caminar, ganar minutos');
  assert.equal(rows[0].position,14.5);
  assert.equal(rows[0].ctr,0.02);
  assert.equal(rows[0].page,null);
});
test('rejects a Pages export instead of inventing queries', () => {
  assert.throws(() => fromCSV('Top pages,Clicks,Impressions,Position\nhttps://example.com,1,10,5'),/Missing query/);
});
test('handles escaped quotes and rejects a truncated CSV', () => {
  assert.deepEqual(parseCSV('Query,Clicks\n"earn ""screen time""",2'),[['Query','Clicks'],['earn "screen time"','2']]);
  assert.throws(() => parseCSV('Query\n"broken'),/Unclosed quote/);
});
test('uses declared API dimensions and preserves the page/query pairing', () => {
  const rows = fromAPI({dimensions:['page','query'],rows:[{keys:['https://www.earnitscreen.com/','walk before instagram'],clicks:0,impressions:50,position:20,ctr:0}]});
  assert.equal(rows[0].query,'walk before instagram');
  assert.equal(rows[0].page,'https://www.earnitscreen.com/');
  assert.equal(opportunities(rows)[0].action,'mejorar_pagina_existente');
});
test('does not recommend unrelated traffic or a new article when no data exists', () => {
  assert.deepEqual(opportunities([{query:'weather tomorrow',impressions:500,clicks:0,position:20,ctr:0}]),[]);
  assert.match(report([],'empty export'),/No generar un artículo/);
});
