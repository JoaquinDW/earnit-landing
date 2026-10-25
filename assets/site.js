(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const es = document.documentElement.lang === 'es';
  function closeMenu(returnFocus = false) {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', es ? 'Abrir menú' : 'Open menu');
    if (returnFocus) menuButton.focus();
  }
  if (menu && menuButton) {
    // The links remain available without JavaScript; only JS-enabled pages collapse them.
    closeMenu();
    menuButton.hidden = false;
    menuButton.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', es ? (open ? 'Cerrar menú' : 'Abrir menú') : (open ? 'Close menu' : 'Open menu'));
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('click', event => {
      if (!menu.hidden && !event.target.closest('.site-header')) closeMenu();
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) closeMenu(true); });
    window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }
  document.querySelectorAll('a[data-language]').forEach(link => {
    link.addEventListener('click', () => {
      // Both locale versions use the same section IDs. Keep the reader's place.
      if (location.hash) link.hash = location.hash;
    });
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Integration points only: no analytics network request or identifier is created here.
  // A configured adapter can listen to earnit:analytics without blocking navigation.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-app-store]');
    if (!link) return;
    const properties = {
      page: location.pathname,
      language: document.documentElement.lang,
      content: document.body.dataset.content || 'home',
      placement: link.dataset.placement || 'body'
    };
    window.dispatchEvent(new CustomEvent('earnit:analytics', {
      detail: { event: 'app_store_click', properties }
    }));
  });
})();
