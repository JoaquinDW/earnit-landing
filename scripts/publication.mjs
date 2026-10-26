// Editorial days follow the publisher's timezone, including on Vercel's UTC workers.
export const publicationTimeZone = 'America/Argentina/Cordoba';

export function editorialDay(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: publicationTimeZone, year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
}

export function publishedGuides(guides, day = editorialDay()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(Date.parse(day + 'T12:00:00Z'))) {
    throw new Error(`Invalid publication day: ${day}`);
  }
  for (const guide of guides) {
    for (const key of ['datePublished', 'dateModified']) {
      const value = guide[key];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || new Date(value + 'T12:00:00Z').toISOString().slice(0, 10) !== value) {
        throw new Error(`Invalid ${key} on ${guide.id}`);
      }
    }
    if (guide.dateModified < guide.datePublished) throw new Error(`Modification predates publication: ${guide.id}`);
  }
  return guides.filter(guide => guide.datePublished <= day);
}
