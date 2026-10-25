import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Accepts a Search Console Queries CSV (English or Spanish) or Search Analytics API JSON.
// It never publishes content. Private exports belong in the gitignored .seo-data/ directory.
export function parseCSV(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else if (quoted || field === '') quoted = !quoted;
      else throw new Error('Unexpected quote in CSV field.');
    } else if (char === ',' && !quoted) { row.push(field); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      if (row.some(value => value !== '')) rows.push(row);
      row = []; field = '';
    } else field += char;
  }
  if (quoted) throw new Error('Unclosed quote in CSV.');
  row.push(field);
  if (row.some(value => value !== '')) rows.push(row);
  return rows;
}
export function metric(value) {
  let text = String(value ?? '').trim().replace(/[%\s]/g, '');
  if (!text) return 0;
  if (text.includes(',') && text.includes('.')) {
    text = text.lastIndexOf(',') > text.lastIndexOf('.') ? text.replace(/\./g,'').replace(',','.') : text.replace(/,/g,'');
  } else if (text.includes(',')) {
    text = /^\d{1,3}(,\d{3})+$/.test(text) ? text.replace(/,/g,'') : text.replace(',','.');
  }
  const number = Number(text);
  if (!Number.isFinite(number) || number < 0) throw new Error(`Invalid metric: ${value}`);
  return number;
}
export function fromCSV(text) {
  const [headers, ...data] = parseCSV(text);
  if (!headers) return [];
  const keys = headers.map(h => h.trim().toLowerCase());
  const column = (...names) => keys.findIndex(key => names.includes(key));
  const indexes = {
    query:column('top queries','consultas principales','query','consulta'),
    clicks:column('clicks','clics'), impressions:column('impressions','impresiones'),
    position:column('position','posición','average position','posición media'), page:column('page','página')
  };
  for (const name of ['query','clicks','impressions','position']) {
    if (indexes[name] < 0) throw new Error(`Missing ${name} column. Export the Queries table from Search Console (CSV).`);
  }
  return data.map(row => {
    const clicks = metric(row[indexes.clicks]), impressions = metric(row[indexes.impressions]);
    return { query:row[indexes.query], page:indexes.page < 0 ? null : row[indexes.page], clicks, impressions, ctr:impressions ? clicks / impressions : 0, position:metric(row[indexes.position]) };
  });
}
export function fromAPI(data) {
  const dimensions = data.dimensions || ['query','page'];
  const queryIndex = dimensions.indexOf('query'), pageIndex = dimensions.indexOf('page');
  if (queryIndex < 0) throw new Error('API data must include the query dimension.');
  return (data.rows || []).map(row => ({
    query:row.keys[queryIndex], page:pageIndex < 0 ? null : row.keys[pageIndex],
    clicks:metric(row.clicks), impressions:metric(row.impressions), ctr:metric(row.ctr), position:metric(row.position)
  }));
}
export function recommend(row) {
  const query = row.query.toLowerCase();
  const walking = /\b(walk\w*|step\w*|camin\w*|pasos?)\b/.test(query);
  const instagram = /instagram/.test(query);
  const relevant = walking || instagram || /screen time|tiempo de (pantalla|uso)|app block|bloque.*app|limit.*app|earnit/.test(query);
  const target = walking ? 'walking' : instagram ? 'instagram' : null;
  let action = 'investigar';
  let reason = 'Revisar intención y resultados de búsqueda antes de elegir una página.';
  if (target) {
    action = 'mejorar_pagina_existente';
    reason = 'Ya hay una guía para esta intención; revisar su respuesta y los enlaces antes de crear otra.';
  }
  if (row.position <= 10 && row.ctr < 0.02) reason += ' La posición y el CTR justifican revisar el título y la presentación del resultado.';
  else if (row.position > 10) reason += ' La posición media está fuera de los primeros diez resultados; comprobar encaje y contenido.';
  return { ...row, relevant, target, action, reason };
}
export function opportunities(rows, minImpressions = 25) {
  return rows.filter(row => row.query && row.impressions >= minImpressions)
    .map(recommend).filter(row => row.relevant)
    .sort((a,b) => b.impressions - a.impressions || a.ctr - b.ctr);
}
const cleanCell = value => String(value ?? '—').replace(/[|\r\n]/g,' ');
export function report(data, source) {
  const lines = [
    '# Oportunidades SEO de Earnit', '', `Fuente: ${cleanCell(source)}.`, '',
    'Datos observados, no estimaciones de volumen del mercado. Las prioridades son heurísticas para revisión humana.', '',
    'Search Console omite ciertas consultas por privacidad; su API puede no devolver todas las filas. Posición y CTR dependen del país, dispositivo y periodo.', ''
  ];
  if (!data.length) return lines.concat('No hay oportunidades relevantes que alcancen el umbral. No generar un artículo para cumplir una cuota.','').join('\n');
  lines.push('| Consulta | Página observada | Impresiones | Clics | CTR | Posición | Acción |', '| --- | --- | ---: | ---: | ---: | ---: | --- |');
  for (const row of data.slice(0,30)) lines.push(`| ${cleanCell(row.query)} | ${cleanCell(row.page)} | ${row.impressions} | ${row.clicks} | ${(row.ctr*100).toFixed(2)}% | ${row.position.toFixed(1)} | ${row.action} |`);
  const first = data[0];
  lines.push('', '## Primera oportunidad para revisar', '', `Consulta: ${cleanCell(first.query)}. ${first.reason}`,
    first.target ? `Guía existente: ${first.target}. Consultar las URLs por idioma en content/guides.json.` : 'La intención necesita una investigación antes de escribir.',
    '', 'No se han realizado cambios ni publicado contenido.','');
  return lines.join('\n');
}
function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
}
async function main() {
  const argv = process.argv.slice(2);
  const option = (flag, fallback) => {
    const i = argv.indexOf(flag);
    if (i < 0) return fallback;
    if (!argv[i+1] || argv[i+1].startsWith('--')) throw new Error(`Missing value for ${flag}`);
    return argv[i+1];
  };
  if (argv.includes('--help') || !argv.length) {
    console.log('Local export: npm run seo:opportunities -- --input .seo-data/Queries.csv\nAPI: GSC_ACCESS_TOKEN=<OAuth token> npm run seo:opportunities -- --fetch --start YYYY-MM-DD --end YYYY-MM-DD\nOptions: --site sc-domain:earnitscreen.com --output .seo-data/opportunities.md --min-impressions 25');
    return;
  }
  const root = fileURLToPath(new URL('../',import.meta.url));
  const output = path.resolve(root, option('--output','.seo-data/opportunities.md'));
  const threshold = Number(option('--min-impressions','25'));
  if (!Number.isFinite(threshold) || threshold < 0) throw new Error('min-impressions must be a nonnegative number.');
  let rows, source;
  if (argv.includes('--fetch')) {
    const token = process.env.GSC_ACCESS_TOKEN;
    if (!token) throw new Error('GSC_ACCESS_TOKEN is missing. Use an authorized read-only OAuth token or import a CSV export.');
    const startDate = option('--start'), endDate = option('--end');
    if (!validDate(startDate) || !validDate(endDate) || startDate > endDate) throw new Error('Supply a valid --start and --end date range.');
    const site = option('--site','sc-domain:earnitscreen.com');
    const allRows = [];
    let truncated = false;
    for (let startRow = 0; startRow < 100000; startRow += 25000) {
      const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
        method:'POST', headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
        body:JSON.stringify({ startDate,endDate,dimensions:['query','page'],type:'web',dataState:'final',rowLimit:25000,startRow }),
        signal:AbortSignal.timeout(30000)
      });
      if (!response.ok) throw new Error(`Search Console API returned ${response.status}. Check the authorized account, scope and property access.`);
      const result = await response.json();
      allRows.push(...(result.rows || []));
      if ((result.rows || []).length < 25000) break;
      if (startRow === 75000) truncated = true;
    }
    const raw = { site,startDate,endDate,dimensions:['query','page'],truncated,rows:allRows };
    await mkdir(path.dirname(output), { recursive:true });
    const rawPath = path.join(path.dirname(output),'search-console.json');
    await writeFile(rawPath,JSON.stringify(raw,null,2)+'\n',{ mode:0o600 });
    rows = fromAPI(raw);
    source = `Search Console API, ${site}, ${startDate} a ${endDate}${truncated ? ', límite de 100.000 filas alcanzado' : ''}`;
  } else {
    const input = option('--input');
    if (!input) throw new Error('Supply --input with a CSV/JSON export, or --fetch for authorized API access.');
    const contents = await readFile(path.resolve(root,input),'utf8');
    rows = input.toLowerCase().endsWith('.json') ? fromAPI(JSON.parse(contents)) : fromCSV(contents);
    source = `exportación local ${path.basename(input)}; comprobar periodo y filtros en el archivo original`;
  }
  const selected = opportunities(rows,threshold);
  await mkdir(path.dirname(output), { recursive:true });
  await writeFile(output,report(selected,source),{ mode:0o600 });
  console.log(`${rows.length} observed rows; ${selected.length} relevant candidates. Report: ${output}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
