(() => {
  const config = window.EARNIT_ANALYTICS;
  // Previews and local visits never enter the production analytics project.
  if (!config?.enabled || location.hostname !== config.productionHost ||
      navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  const distinctId = crypto.randomUUID(); // In memory for this page only; never saved or shared with the app.
  let referrerHost = '';
  try { referrerHost = new URL(document.referrer).hostname; } catch {}
  const base = {
    surface: 'marketing_website', page: location.pathname, language: document.documentElement.lang,
    content: document.body.dataset.content || 'home', referrer_host: referrerHost,
    $process_person_profile: false, $geoip_disable: true
  };
  function capture(event, properties = {}) {
    fetch(`${config.host}/i/v0/e/`, {
      method: 'POST', keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: config.token, distinct_id: distinctId, event, properties: { ...base, ...properties } })
    }).catch(() => {}); // Analytics must never interfere with reading or navigation.
  }
  capture('website_page_viewed');
  window.addEventListener('earnit:analytics', event => {
    if (event.detail?.event === 'app_store_click') capture('app_store_click', event.detail.properties);
  });
})();
