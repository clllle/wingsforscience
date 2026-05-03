(function() {
  var STORAGE_KEY = 'wfs_lang';
  // Flag interne : pendant l'init, on applique la langue sans la persister en localStorage.
  // Sinon une langue déduite de l'URL (?lang=fr) ou du hostname (.com→en) écraserait
  // la préférence utilisateur, et la prochaine visite directe garderait cette langue forcée.
  var _skipPersist = false;

  function setLang(lang) {
    if (!_skipPersist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}
    }
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
    // Priorité : ?lang=xx dans l'URL (visiteur arrivant via redirection .fr→.com?lang=fr)
    // > choix utilisateur sauvegardé en localStorage
    // > défaut selon hostname (.com → en, sinon → fr)
    var urlMatch = location.search.match(/[?&]lang=(fr|en)\b/);
    var urlLang = urlMatch ? urlMatch[1] : null;

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e) {}

    var hostDefault = location.hostname.endsWith('.com') ? 'en' : 'fr';

    var lang = urlLang || saved || hostDefault;
    // window.setLang plutôt que setLang local : respecte les overrides de pages (ex campagne-scientifique)
    _skipPersist = true;
    try { (window.setLang || setLang)(lang); } finally { _skipPersist = false; }
  }

  window.setLang = setLang;
  window.initLang = initLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();
