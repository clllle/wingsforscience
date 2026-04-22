(function() {
  var posts = [
    "decouverte-archeo.html",
    "c-est-parti.html",
    "arrivee-a-port-vila-on-s-approche.html",
    "objectif-en-vue.html",
    "petit-contretemps.html",
    "ca-chauffe.html",
    "vol-d-aujourd-hui.html",
    "1ere-campagne-de-vol-reussie.html",
    "on-rentre-vers-port-vila.html",
    "debut-du-travail-numerique.html",
    "remerciement-aux-eleves.html",
    "quand-faut-y-aller.html",
    "1ere-reconstruction-ce-n-est-qu-un-debut.html",
    "radio.html",
    "redcloud-le-teaser.html",
    "nouveau-depart.html",
    "nouveau-volcan-nouvelle-aventure.html",
    "bientot-le-depart-sur-le-stromboli.html",
    "1ers-resultats.html",
    "deja-3-publications-scientifiques.html",
    "conference-avec-michel-brunet.html",
    "conference-par-l-inrap.html",
    "le-ministere-de-l-education-au-luxembourg-apporte-son-soutie.html",
    "essayage-de-l-equipement-de-survie.html",
    "bienvenue-a-l-ecole-du-parc-hosingen-welcome-to-hosingen-sch.html",
    "meeting-beringer.html",
    "new-supports-in-luxembourg-nouveaux-soutiens-officiels-au-lu.html",
    "new-attendees-for-the-departure-nouveaux-invites-pour-le-dep.html",
    "rencontre-avec-notre-nouvelle-maison.html",
    "first-flight-in-the-plane-premier-vol-test.html",
    "a-new-flight-test-in-slovenia-patrol-in-the-alps.html",
    "mission-luxembourgeoise.html",
    "rtl.html",
    "l-essentiel-newspaper.html",
    "dernier-jour-avant-le-depart-officiel-du-tour-du-monde.html",
    "go-go-go.html",
    "mission-volcanologique-islandaise.html",
    "kulusuk.html",
    "question-volume.html",
    "question-where-ou-est-ce-que-cette-photo-a-ete-prise.html",
    "kuujjuaq-canada.html",
    "greenlandic-album-photos-du-groenland.html",
    "whale-in-mingan-une-baleine-a-mingan.html",
    "the-answer-la-reponse.html",
    "reportage-sur-la-presse-canada-du-20-juillet.html",
    "st-marteen-yacht-club.html",
    "smoky-mountain.html",
    "trees-in-amazon-forest.html",
    "survol-de-l-amazone-vers-les-andes.html",
    "land-on-the-road-done.html",
    "changement-de-programme.html",
    "drawings-of-college-kids-dessins-des-enfants-rencontres.html",
    "escale-pakistanaise.html",
    "bye-bye-l-avion-take-care-for-your-trip-to-australia.html",
    "les-etats-du-golfe-persique-maintenant.html",
    "emirats-arabes-unis-arabie-saoudite.html",
    "les-hyenes-et-les-onyx-de-l-ile-refuge-des-emirats.html",
    "maori-goodbye-for-the-gloworms.html",
    "partenariat-avec-l-eso.html",
    "lemonde-uses-our-picture.html",
    "wallaby.html",
    "aircraft-back-new-sponsor.html",
    "flying-again-nous-revoici-en-vol.html",
    "dragon-de-komodo-komodo-dragons.html",
    "festival-de-l-eau-a-rangoon.html",
    "last-but-not-least-meteorite-crater.html",
    "sad-news.html",
    "c-est-gagne-dinosaur-footprints-soon.html",
    "tout-n-est-pas-perdu-there-is-hope.html",
    "here-there-are-the-dinosaurs-footprints.html",
    "last-night-in-a-bus-listening-to-guitar.html",
    "new-sponsor-cnes.html",
    "underwater-snorkling.html",
    "bad-weather-instead-of-laos-we-go-to-myanmar.html",
    "diversion-due-to-bad-visibility-but-nice-fishing-system.html",
    "we-fly-over-these-hand-made-artificial-islands-and-this-bigg.html",
    "welcome-in-jordan.html",
    "this-week-at-the-international-paris-air-show.html",
    "arrivee-au-salon-du-bourget.html",
    "dernier-jour-du-salon-international-du-bourget.html",
    "journee-princiere.html",
    "friday-at-the-paris-air-show-vendredi-au-bourget.html",
    "quelques-chiffres-pour-decrire-cette-experience-incroyable.html",
    "on-a-survole-la-terre-episode-1-islande-our-movie-about-icel.html",
    "bande-annonce-des-films-longs.html",
    "design-du-nouvel-avion.html",
    "des-nouvelles-argentines.html",
    "mission-glacier-et-tsunami.html",
    "mission-exploration-decouverte-chili.html",
    "mission-forets-fossilisees-tango.html",
    "mission-communaute-pilaga.html",
    "mission-bresil-buritis-parana.html",
    "bonne-annee-2017.html",
    "nouvelle-collection-photos.html",
    "tous-engages-pour-la-science.html",
    "mission-au-surinam-paresseux.html",
    "mission-guyane-biodiversite.html",
    "deux-magazines.html",
    "oshkosh.html",
    "en-vol-durant-l-eclipse-totale.html",
    "tribune-confinement.html",
  ];
  var current = location.pathname.split('/').pop();
  var idx = posts.indexOf(current);
  if (idx === -1) return;
  var backLink = document.querySelector('.post-back');
  if (!backLink) return;
  var wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;';
  backLink.parentNode.insertBefore(wrapper, backLink);
  backLink.style.marginBottom = '0';
  wrapper.appendChild(backLink);
  var lang = document.documentElement.lang || 'fr';
  if (idx < posts.length - 1) {
    var next = document.createElement('a');
    next.href = posts[idx + 1];
    next.className = 'post-back';
    next.style.marginBottom = '0';
    next.setAttribute('data-fr', 'Suivant \u2192');
    next.setAttribute('data-en', 'Next \u2192');
    next.textContent = lang === 'en' ? 'Next \u2192' : 'Suivant \u2192';
    wrapper.appendChild(next);
  }
  var postBody = document.querySelector('.post-body');
  if (postBody) {
    var bottomNav = document.createElement('div');
    bottomNav.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-top:48px;padding-top:24px;border-top:1px solid rgba(95,168,211,0.15);';
    var bottomBack = document.createElement('a');
    bottomBack.href = '../actu.html';
    bottomBack.className = 'post-back';
    bottomBack.style.marginBottom = '0';
    bottomBack.setAttribute('data-fr', '\u2190 Retour au carnet de route');
    bottomBack.setAttribute('data-en', '\u2190 Back to logbook');
    bottomBack.textContent = lang === 'en' ? '\u2190 Back to logbook' : '\u2190 Retour au carnet de route';
    bottomNav.appendChild(bottomBack);
    if (idx < posts.length - 1) {
      var bottomNext = document.createElement('a');
      bottomNext.href = posts[idx + 1];
      bottomNext.className = 'post-back';
      bottomNext.style.marginBottom = '0';
      bottomNext.setAttribute('data-fr', 'Suivant \u2192');
      bottomNext.setAttribute('data-en', 'Next \u2192');
      bottomNext.textContent = lang === 'en' ? 'Next \u2192' : 'Suivant \u2192';
      bottomNav.appendChild(bottomNext);
    }
    postBody.appendChild(bottomNav);
  }
})();
