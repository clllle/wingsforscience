(function() {
  // Inject font preconnect links for pages that load via header.js (especially posts)
  if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
    var pc1 = document.createElement('link');
    pc1.rel = 'preconnect';
    pc1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(pc1);
    var pc2 = document.createElement('link');
    pc2.rel = 'preconnect';
    pc2.href = 'https://fonts.gstatic.com';
    pc2.crossOrigin = '';
    document.head.appendChild(pc2);
  }

  var isPost = location.pathname.indexOf('/posts/') !== -1;
  var p = isPost ? '../' : '';

  var html =
  '<a class="logo-wrap" href="' + p + 'index.html">' +
    '<img src="' + p + 'images/logo_wfs.webp" alt="Logo Wings for Science" width="48" height="48" decoding="async">' +
    '<div class="logo-text"><span data-fr="Des Ailes pour la Science" data-en="Wings for Science">Des Ailes pour la Science</span></div>' +
  '</a>' +
  '<nav>' +
    '<div class="nav-item">' +
      '<a class="nav-link" href="#" onclick="return false;"><span data-fr="Notre mission" data-en="Our mission">Notre mission</span> <span class="chevron">▼</span></a>' +
      '<div class="dropdown">' +
        '<a href="' + p + 'science-environnement.html" data-fr="Appuyer la Science et l\'Environnement" data-en="Supporting Science and the Environment">Appuyer la Science et l\'Environnement</a>' +
        '<a href="' + p + 'expeditions.html" data-fr="Par des Expéditions aéronautiques" data-en="Through Aeronautical Expeditions">Par des Expéditions aéronautiques</a>' +
        '<a href="' + p + 'sensibilisation.html" data-fr="Et de la sensibilisation" data-en="And Public Awareness">Et de la sensibilisation</a>' +
      '</div>' +
    '</div>' +
    '<div class="nav-item">' +
      '<a class="nav-link" href="#" onclick="return false;"><span data-fr="Nos actions" data-en="Our actions">Nos actions</span> <span class="chevron">▼</span></a>' +
      '<div class="dropdown">' +
        '<a href="' + p + 'campagne-scientifique.html" data-fr="Campagne scientifique" data-en="Scientific Campaign">Campagne scientifique</a>' +
        '<a href="' + p + 'conferences.html" data-fr="Conférences" data-en="Conferences">Conférences</a>' +
        '<a href="' + p + 'reportages.html" data-fr="Reportages" data-en="Documentaries">Reportages</a>' +
        '<a href="' + p + 'livres.html" data-fr="Livres" data-en="Books">Livres</a>' +
        '<a href="' + p + 'presse.html" data-fr="Presse" data-en="Press">Presse</a>' +
        '<a href="' + p + 'actu.html" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(95,168,211,0.2);" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a>' +
      '</div>' +
    '</div>' +
    '<div class="nav-item">' +
      '<a class="nav-link" href="#" onclick="return false;"><span data-fr="Notre réseau" data-en="Our network">Notre réseau</span> <span class="chevron">▼</span></a>' +
      '<div class="dropdown">' +
        '<a href="' + p + 'confondateurs.html" data-fr="Les cofondateurs et parrains" data-en="Co-founders and Patrons">Les cofondateurs et parrains</a>' +
        '<a href="' + p + 'equipe.html" data-fr="L\'équipe" data-en="The Team">L\'équipe</a>' +
        '<a href="' + p + 'partenaires.html" data-fr="Les partenaires et sponsors" data-en="Partners and Sponsors">Les partenaires et sponsors</a>' +
      '</div>' +
    '</div>' +
    '<a class="btn btn-primary" href="' + p + 'contact.html" style="padding:9px 20px;font-size:11px;" data-fr="Contact" data-en="Contact">Contact</a>' +
  '</nav>' +
  '<button class="hamburger" id="hamburger" onclick="toggleMenu()" aria-label="Menu">' +
    '<span></span><span></span><span></span>' +
  '</button>' +
  '<button class="lang-toggle" onclick="setLang(window.currentLang===\'fr\'?\'en\':\'fr\')">FR</button>';

  var mobileNav =
  '<div class="mobile-nav" id="mobileNav">' +
    '<div class="mobile-section-title" data-fr="Notre mission" data-en="Our mission">Notre mission</div>' +
    '<div class="mobile-sub">' +
      '<a href="' + p + 'science-environnement.html" data-fr="Science et Environnement" data-en="Science and Environment">Science et Environnement</a>' +
      '<a href="' + p + 'expeditions.html" data-fr="Expéditions aéronautiques" data-en="Aeronautical Expeditions">Expéditions aéronautiques</a>' +
      '<a href="' + p + 'sensibilisation.html" data-fr="Sensibilisation" data-en="Public Awareness">Sensibilisation</a>' +
    '</div>' +
    '<div class="mobile-section-title" data-fr="Nos actions" data-en="Our actions">Nos actions</div>' +
    '<div class="mobile-sub">' +
      '<a href="' + p + 'campagne-scientifique.html" data-fr="Campagne scientifique" data-en="Scientific Campaign">Campagne scientifique</a>' +
      '<a href="' + p + 'conferences.html" data-fr="Conférences" data-en="Conferences">Conférences</a>' +
      '<a href="' + p + 'reportages.html" data-fr="Reportages" data-en="Documentaries">Reportages</a>' +
      '<a href="' + p + 'livres.html" data-fr="Livres" data-en="Books">Livres</a>' +
      '<a href="' + p + 'presse.html" data-fr="Presse" data-en="Press">Presse</a>' +
      '<a href="' + p + 'actu.html" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(95,168,211,0.2);" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a>' +
    '</div>' +
    '<div class="mobile-section-title" data-fr="Notre réseau" data-en="Our network">Notre réseau</div>' +
    '<div class="mobile-sub">' +
      '<a href="' + p + 'confondateurs.html" data-fr="Cofondateurs et parrains" data-en="Co-founders and Patrons">Cofondateurs et parrains</a>' +
      '<a href="' + p + 'equipe.html" data-fr="L\'équipe" data-en="The Team">L\'équipe</a>' +
      '<a href="' + p + 'partenaires.html" data-fr="Partenaires et sponsors" data-en="Partners and Sponsors">Partenaires et sponsors</a>' +
    '</div>' +
    '<a href="' + p + 'contact.html" data-fr="Contact" data-en="Contact">Contact</a>' +
    '<div class="mobile-lang">' +
      '<button class="active" data-lang="fr" onclick="setLang(\'fr\');toggleMenu()">🇫🇷 Français</button>' +
      '<button data-lang="en" onclick="setLang(\'en\');toggleMenu()">🇬🇧 English</button>' +
    '</div>' +
  '</div>';

  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = html;
    headerEl.insertAdjacentHTML('afterend', mobileNav);
  }
})();
