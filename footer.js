(function() {
  var isPost = location.pathname.indexOf('/posts/') !== -1;
  var p = isPost ? '../' : '';

  var html = '<footer>' +
    '<div class="footer-inner">' +
      '<div class="footer-brand">' +
        '<a class="logo-wrap" href="' + p + 'index.html"><img src="' + p + 'images/logo_wfs.png" alt="Logo"><div class="logo-text"><span data-fr="Des Ailes pour la Science" data-en="Wings for Science">Des Ailes pour la Science</span></div></a>' +
        '<p data-fr="Association à but non lucratif œuvrant pour la science et la protection de l\'environnement depuis 2008." data-en="Non-profit association working for science and environmental protection since 2008.">Association à but non lucratif œuvrant pour la science et la protection de l\'environnement depuis 2008.</p>' +
        '<address class="footer-address" data-fr="Maison des associations, 38 bd Henri IV, 75004 Paris" data-en="Maison des associations, 38 bd Henri IV, 75004 Paris, France">Maison des associations, 38 bd Henri IV, 75004 Paris</address>' +
      '</div>' +
      '<div class="footer-col">' +
        '<div class="footer-col-title" data-fr="Nos actions" data-en="Our actions">Nos actions</div>' +
        '<ul>' +
          '<li><a href="' + p + 'campagne-scientifique.html" data-fr="Campagne scientifique" data-en="Scientific Campaign">Campagne scientifique</a></li>' +
          '<li><a href="' + p + 'conferences.html" data-fr="Conférences" data-en="Conferences">Conférences</a></li>' +
          '<li><a href="' + p + 'reportages.html" data-fr="Reportages" data-en="Documentaries">Reportages</a></li>' +
          '<li><a href="' + p + 'livres.html" data-fr="Livres" data-en="Books">Livres</a></li>' +
          '<li><a href="' + p + 'presse.html" data-fr="Presse" data-en="Press">Presse</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<div class="footer-col-title" data-fr="Notre mission" data-en="Our mission">Notre mission</div>' +
        '<ul>' +
          '<li><a href="' + p + 'science-environnement.html" data-fr="Science &amp; Environnement" data-en="Science &amp; Environment">Science &amp; Environnement</a></li>' +
          '<li><a href="' + p + 'expeditions.html" data-fr="Expéditions aéronautiques" data-en="Aeronautical Expeditions">Expéditions aéronautiques</a></li>' +
          '<li><a href="' + p + 'sensibilisation.html" data-fr="Sensibilisation" data-en="Public Awareness">Sensibilisation</a></li>' +
          '<li style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(95,168,211,0.15);"><a href="' + p + 'actu.html" style="color:var(--accent);font-weight:600;" data-fr="Carnet de route" data-en="Logbook">Carnet de route</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
        '<div class="footer-col-title" data-fr="Notre réseau" data-en="Our network">Notre réseau</div>' +
        '<ul>' +
          '<li><a href="' + p + 'confondateurs.html" data-fr="Cofondateurs &amp; parrains" data-en="Co-founders &amp; Patrons">Cofondateurs &amp; parrains</a></li>' +
          '<li><a href="' + p + 'equipe.html" data-fr="L\'équipe" data-en="The Team">L\'équipe</a></li>' +
          '<li><a href="' + p + 'partenaires.html" data-fr="Partenaires &amp; sponsors" data-en="Partners &amp; Sponsors">Partenaires &amp; sponsors</a></li>' +
          '<li style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(95,168,211,0.15);"><a href="' + p + 'contact.html" style="color:var(--accent);font-weight:600;" data-fr="Contact" data-en="Contact">Contact</a></li>' +
        '</ul>' +
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
