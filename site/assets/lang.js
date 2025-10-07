(function(){
  const KEY = 'as-lang';
  function getPreferred(){
    const stored = localStorage.getItem(KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    const nav = (navigator.language || 'pt-PT').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }
  function setPreferred(lang){ localStorage.setItem(KEY, lang); }

  function currentLangFromPath(){
    return location.pathname.startsWith('/en') ? 'en' : 'pt';
  }

  function toggleUrl(targetLang){
    const path = location.pathname;
    if (targetLang === 'pt') {
      // /en/... -> /...
      if (path === '/en' || path === '/en/') { return '/'; }
      if (path.startsWith('/en/')) { return path.replace('/en/', '/'); }
      return path; // already pt
    } else {
      // pt -> en prefix
      if (path === '/') { return '/en'; }
      if (path.startsWith('/en')) { return path; }
      return '/en' + path;
    }
  }

  function applyLangButtons(){
    const ptBtn = document.querySelector('[data-lang="pt"]');
    const enBtn = document.querySelector('[data-lang="en"]');
    if (!ptBtn || !enBtn) return;
    const lang = currentLangFromPath();
    ptBtn.classList.toggle('active', lang==='pt');
    enBtn.classList.toggle('active', lang==='en');
    ptBtn.addEventListener('click', function(){
      const url = toggleUrl('pt');
      setPreferred('pt');
      if (url !== location.pathname) location.href = url;
    });
    enBtn.addEventListener('click', function(){
      const url = toggleUrl('en');
      setPreferred('en');
      if (url !== location.pathname) location.href = url;
    });
  }

  function redirectToPreferredIfHome(){
    // Only redirect on the root paths to respect deep links
    const path = location.pathname;
    if (path === '/' || path === '/en' || path === '/en/') {
      const pref = getPreferred();
      const lang = currentLangFromPath();
      if (pref !== lang) {
        const url = toggleUrl(pref);
        if (url !== path) location.replace(url);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyLangButtons();
    redirectToPreferredIfHome();
  });
})();


