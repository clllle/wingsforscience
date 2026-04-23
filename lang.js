(function() {
  var STORAGE_KEY = 'wfs_lang';

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}
    document.documentElement.lang = lang;

    // Translate elements with data-fr / data-en, sauf si un descendant a déjà ses propres data-fr (évite d'écraser la traduction des enfants)
    var els = document.querySelectorAll('[data-fr][data-en]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el.querySelector('[data-fr]')) {
        el.innerHTML = el.getAttribute('data-' + lang);
      }
    }

    // Update single lang toggle button (shows CURRENT language)
    var toggles = document.querySelectorAll('.lang-toggle');
    for (var k = 0; k < toggles.length; k++) {
      toggles[k].textContent = lang === 'fr' ? 'FR' : 'EN';
    }
    window.currentLang = lang;
  }

  function initLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e) {}
    // window.setLang plutôt que setLang local : respecte les overrides de pages (ex campagne-scientifique)
    (window.setLang || setLang)(saved || 'fr');
  }

  window.setLang = setLang;
  window.initLang = initLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();
