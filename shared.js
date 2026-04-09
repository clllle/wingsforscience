/* ── Wings for Science — Shared JS ── */

/* Mobile menu toggle */
function toggleMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

/* Close mobile menu on ESC key */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var nav = document.getElementById('mobileNav');
    if (nav && nav.classList.contains('open')) {
      toggleMenu();
    }
  }
});

/* Close dropdowns when clicking outside */
document.addEventListener('click', function(e) {
  if (!e.target.closest('header')) {
    var dropdowns = document.querySelectorAll('.nav-item');
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('open');
    }
  }
});

/* Smooth scroll for anchor links */
document.addEventListener('click', function(e) {
  var link = e.target.closest('a[href^="#"]');
  if (link && link.getAttribute('href').length > 1) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* Active nav link highlight based on current page */
(function() {
  var current = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('nav a, .mobile-nav a');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === current) {
      links[i].classList.add('active');
    }
  }
})();

/* Back-to-top: show button when scrolled down */
(function() {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var btnDown = document.createElement('button');
  btnDown.className = 'scroll-down';
  btnDown.setAttribute('aria-label', 'Descendre');
  btnDown.innerHTML = '&#8595;';
  document.body.appendChild(btnDown);

  window.addEventListener('scroll', function() {
    var atBottom = window.scrollY >= document.body.scrollHeight - window.innerHeight - 100;
    btnDown.classList.toggle('visible', window.scrollY < document.body.scrollHeight - window.innerHeight - 100);
  });

  btnDown.addEventListener('click', function() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
})();

/* Fade-in sections on scroll (IntersectionObserver) */
(function() {
  var sections = document.querySelectorAll('.content-section, .content-inner, .about-strip, .pillar-grid, .actions-grid, .gallery-grid, .page-hero-content');
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].style.opacity) continue;
    sections[i].classList.add('fade-in');
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('visible');
          observer.unobserve(entries[j].target);
        }
      }
    }, { threshold: 0.1 });

    var fadeEls = document.querySelectorAll('.fade-in');
    for (var k = 0; k < fadeEls.length; k++) {
      observer.observe(fadeEls[k]);
    }
  } else {
    /* Fallback: show all immediately */
    var all = document.querySelectorAll('.fade-in');
    for (var m = 0; m < all.length; m++) {
      all[m].classList.add('visible');
    }
  }
})();

/* Scroll snap géré en CSS — pas d'interception JS de la molette */

/* Enhance language switcher: update page title on lang change */
(function() {
  var origSetLang = window.setLang;
  if (origSetLang) {
    window.setLang = function(lang) {
      origSetLang(lang);
      /* Update title with translated h1 if available */
      var h1 = document.querySelector('h1[data-' + lang + ']');
      if (h1) {
        var text = h1.getAttribute('data-' + lang).replace(/<[^>]+>/g, '');
        document.title = text + ' – Wings for Science';
      }
    };
  }
})();
