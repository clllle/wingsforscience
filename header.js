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
        '<a href="' + p + 'actu.html" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a>' +
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
      '<a href="' + p + 'science-environnement.html" data-fr="Appuyer la Science et l\'Environnement" data-en="Supporting Science and the Environment">Appuyer la Science et l\'Environnement</a>' +
      '<a href="' + p + 'expeditions.html" data-fr="Par des Expéditions aéronautiques" data-en="Through Aeronautical Expeditions">Par des Expéditions aéronautiques</a>' +
      '<a href="' + p + 'sensibilisation.html" data-fr="Et de la sensibilisation" data-en="And Public Awareness">Et de la sensibilisation</a>' +
    '</div>' +
    '<div class="mobile-section-title" data-fr="Nos actions" data-en="Our actions">Nos actions</div>' +
    '<div class="mobile-sub">' +
      '<a href="' + p + 'campagne-scientifique.html" data-fr="Campagne scientifique" data-en="Scientific Campaign">Campagne scientifique</a>' +
      '<a href="' + p + 'conferences.html" data-fr="Conférences" data-en="Conferences">Conférences</a>' +
      '<a href="' + p + 'reportages.html" data-fr="Reportages" data-en="Documentaries">Reportages</a>' +
      '<a href="' + p + 'livres.html" data-fr="Livres" data-en="Books">Livres</a>' +
      '<a href="' + p + 'presse.html" data-fr="Presse" data-en="Press">Presse</a>' +
      '<a href="' + p + 'actu.html" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a>' +
    '</div>' +
    '<div class="mobile-section-title" data-fr="Notre réseau" data-en="Our network">Notre réseau</div>' +
    '<div class="mobile-sub">' +
      '<a href="' + p + 'confondateurs.html" data-fr="Les cofondateurs et parrains" data-en="Co-founders and Patrons">Les cofondateurs et parrains</a>' +
      '<a href="' + p + 'equipe.html" data-fr="L\'équipe" data-en="The Team">L\'équipe</a>' +
      '<a href="' + p + 'partenaires.html" data-fr="Les partenaires et sponsors" data-en="Partners and Sponsors">Les partenaires et sponsors</a>' +
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
    setupMenuInteractions(headerEl);
    markCurrentPage(headerEl);
  }

  function markCurrentPage(hdr) {
    var currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var links = hdr.querySelectorAll('.dropdown a, nav a.btn');
    links.forEach(function(a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      var hrefFile = href.split('/').pop();
      if (hrefFile && hrefFile === currentFile) {
        a.classList.add('active');
        var parent = a.closest('.nav-item');
        if (parent) parent.classList.add('current');
      }
    });
  }

  function setupMenuInteractions(hdr) {
    var items = hdr.querySelectorAll('.nav-item');
    var pinned = false;
    var closeTimer = null;

    function clearTimer() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    }

    function openOnly(item) {
      clearTimer();
      items.forEach(function(o) {
        if (o !== item) o.classList.remove('active-drop');
      });
      item.classList.add('active-drop');
    }

    function closeAll() {
      clearTimer();
      items.forEach(function(o) { o.classList.remove('active-drop'); });
      pinned = false;
    }

    function scheduleClose() {
      if (pinned) return;
      clearTimer();
      closeTimer = setTimeout(function() {
        items.forEach(function(o) { o.classList.remove('active-drop'); });
      }, 200);
    }

    items.forEach(function(item) {
      var link = item.querySelector('.nav-link');
      var drop = item.querySelector('.dropdown');

      item.addEventListener('mouseenter', function() {
        if (pinned) return;
        openOnly(item);
      });
      item.addEventListener('mouseleave', scheduleClose);

      if (drop) {
        drop.addEventListener('mouseenter', clearTimer);
        drop.addEventListener('mouseleave', scheduleClose);
      }

      link.addEventListener('click', function(e) {
        e.preventDefault();
        var wasPinnedOnThis = item.classList.contains('active-drop') && pinned;
        closeAll();
        if (!wasPinnedOnThis) {
          item.classList.add('active-drop');
          pinned = true;
        }
      });
    });

    document.addEventListener('click', function(e) {
      if (!hdr.contains(e.target)) closeAll();
    });
  }
})();
