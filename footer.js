(function() {
  var isPost = location.pathname.indexOf('/posts/') !== -1;
  var p = isPost ? '../' : '';

  var html = '<footer>' +
    '<div class="footer-inner">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<a class="logo-wrap" href="' + p + 'index.html"><img src="' + p + 'images/logo_wfs.webp" alt="Logo"><div class="logo-text"><span data-fr="Des Ailes pour la Science" data-en="Wings for Science">Des Ailes pour la Science</span></div></a>' +
          '<p class="footer-tagline" data-fr="Association à but non lucratif depuis 2008." data-en="Non-profit association since 2008.">Association à but non lucratif depuis 2008.</p>' +
        '</div>' +
        '<p class="footer-mission-phrase">' +
          '<span class="footer-mission-label" data-fr="Notre mission :" data-en="Our mission:">Notre mission :</span> ' +
          '<a href="' + p + 'science-environnement.html" data-fr="Aider la science et l\'environnement" data-en="Helping science and the environment">Aider la science et l\'environnement</a>' +
          '<span class="footer-mission-sep">·</span>' +
          '<a href="' + p + 'expeditions.html" data-fr="par des expéditions aéronautiques" data-en="through aeronautical expeditions">par des expéditions aéronautiques</a>' +
          '<span class="footer-mission-sep">·</span>' +
          '<a href="' + p + 'sensibilisation.html" data-fr="et des actions de sensibilisation" data-en="and public awareness actions">et des actions de sensibilisation</a>' +
        '</p>' +
      '</div>' +
      '<div class="footer-cols">' +
        '<div class="footer-col">' +
          '<div class="footer-col-title" data-fr="Nos actions" data-en="Our actions">Nos actions</div>' +
          '<ul>' +
            '<li><a href="' + p + 'campagne-scientifique.html" data-fr="Campagne scientifique" data-en="Scientific Campaign">Campagne scientifique</a></li>' +
            '<li><a href="' + p + 'conferences.html" data-fr="Conférences" data-en="Conferences">Conférences</a></li>' +
            '<li><a href="' + p + 'reportages.html" data-fr="Reportages" data-en="Documentaries">Reportages</a></li>' +
            '<li><a href="' + p + 'livres.html" data-fr="Livres" data-en="Books">Livres</a></li>' +
            '<li><a href="' + p + 'presse.html" data-fr="Presse" data-en="Press">Presse</a></li>' +
            '<li><a href="' + p + 'actu.html" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<div class="footer-col-title" data-fr="Notre réseau" data-en="Our network">Notre réseau</div>' +
          '<ul>' +
            '<li><a href="' + p + 'confondateurs.html" data-fr="Cofondateurs &amp; parrains" data-en="Co-founders &amp; Patrons">Cofondateurs &amp; parrains</a></li>' +
            '<li><a href="' + p + 'equipe.html" data-fr="L\'équipe" data-en="The Team">L\'équipe</a></li>' +
            '<li><a href="' + p + 'partenaires.html" data-fr="Partenaires &amp; sponsors" data-en="Partners &amp; Sponsors">Partenaires &amp; sponsors</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<div class="footer-col-title" data-fr="Contact" data-en="Contact">Contact</div>' +
          '<ul>' +
            '<li><a href="' + p + 'contact.html" class="footer-link-featured" data-fr="Nous écrire" data-en="Get in touch">Nous écrire</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<span class="footer-copy" data-fr="© 2026 Clementine Bacri pour Wings for Science" data-en="© 2026 Wings for Science / Des Ailes pour la Science. Non-profit association.">© 2026 Clementine Bacri pour Wings for Science</span>' +
    '</div>' +
  '</footer>';

  var placeholder = document.getElementById('site-footer');
  if (placeholder) {
    placeholder.outerHTML = html;
  }
})();
