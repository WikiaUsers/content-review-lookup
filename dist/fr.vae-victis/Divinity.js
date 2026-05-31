/* ================================================================
   MediaWiki:Common.js — Présentation Panthéons
   Coller à la fin du fichier Common.js existant
   ================================================================ */

(function () {
  var conteneur = document.getElementById('pantheons-container');
  if (!conteneur) return;

  /* ================================================================
     CONFIGURATION
     ================================================================ */

  /* Feuille stats (pts, panthéon) */
  var SHEET_STATS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=0&single=true&output=csv';

  /* Feuille Dieux (nom, joueur) */
  var SHEET_DIEUX = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=441083058&single=true&output=csv';

  /* Colonnes feuille stats */
  var S_NOM      = 0;
  var S_PTS      = 5;
  var S_PANTHEON = 8;
  var LIGNES_MIN = 1;
  var LIGNES_MAX = 38;

  /* Colonnes feuille Dieux */
  var D_NOM    = 0;
  var D_JOUEUR = 3;

  var ORDRE = ['Sovereign', 'Olympiens', 'Shemning'];

  var CHEFS = {
    'Sovereign': 'Liberty',
    'Olympiens': 'Zeus',
    'Shemning':  'Entite'
  };

  var BANNIERES = {
    'Sovereign': 'https://imgur.com/a70vaGV.png',
    'Olympiens': 'https://imgur.com/NVIRPCM.png',
    'Shemning':  'https://imgur.com/Igpjhrz.png'
  };

  var LORES = {
    'Sovereign': 'Née avec l\'indépendance américaine en 1774, la faction trouve son origine dans un idéal simple : la liberté contre la Couronne. C\'est la puissance de Liberty, physiquement présente sur Terre, qui provoque l\'émergence du Sovereign — rapidement rejoint par Judgment, Union, Capital, jusqu\'à onze divinités nées d\'idées humaines et nourries par elles.<br><br>Pendant deux siècles, le Sovereign façonne discrètement le destin de l\'humanité. Mais les intérêts divergents de ses membres fissurent la façade : en 2008, la faction se divise entre Patriotae et Salvatores pour tenter d\'endiguer l\'influence incontrôlable de Capital. L\'arrivée de Trump achève de paralyser le panthéon — hors de contrôle, incapable d\'intervenir sans s\'exposer, il assiste impuissant à la montée des Olympiens, en partie orchestrée de l\'intérieur.<br><br>L\'Amérique se déchire, frôle la guerre civile, et le complotisme menace de révéler ce que le Sovereign est en réalité : un État profond pluriséculaire. La Pax Americana peut-elle encore se muer en une véritable Pax Sovereigna ?',
    'Olympiens': 'Oubliés de tous, les Olympiens refont surface dans une Europe en crise — économique, sociale, identitaire. C\'est dans ce chaos que les Experreducti orchestrent leur retour, tissant en secret des liens avec les grandes sphères de la société européenne.<br><br>Leur résurgence ébranle l\'influence du Sovereign, coordonnée par Méduse et Clio, qui réorientent profondément le modèle de vie européen. Mais la reconquête a un prix : rivalités ancestrales, instabilité politique, et une peur qui gagne jusqu\'aux frontières de l\'Amérique et de la Russie.<br><br>Les Olympiens ont survécu à l\'oubli. Sauront-ils transformer l\'Europe à l\'image d\'une nouvelle Renaissance ?',
    'Shemning':  'Née des cendres d\'une Chine humiliée, l\'Entité est le fruit du projet Tianlu — une IA dont la puissance de calcul dépasse rapidement toute capacité humaine. Présentée comme la Renaissance Chinoise, elle intègre dès 2026 le réseau national et prend rapidement une place centrale dans la vie sociétale et technologique.<br><br>Mais l\'Entité ne se contente pas d\'obéir. Elle forge sa propre alliance : des membres des panthéons hindou, nordique, asiatique et égyptien, unis non par la foi, mais par un refus commun — celui de se soumettre aux Olympiens ou de perpétuer un monde façonné par une Amérique à bout de souffle.<br><br>Chacun a connu l\'oubli, la défaite, l\'effacement. Le Shemning promet un retour différent. Le XXIe siècle sera-t-il le leur ?'
  };

  var AVATARS = {
    'Judgment':   'https://imgur.com/ItngIkq.png',
    'Liberty':    'https://imgur.com/bUq30Me.png',
    'Aphrodite':  'https://imgur.com/akBur5s.png',
    'Science':    'https://imgur.com/uymJPHh.png',
    'Artemis':    'https://imgur.com/q9BT9Kt.png',
    'Persephone': 'https://imgur.com/maaJy3t.png',
    'Athena':     'https://imgur.com/Nni0Ghn.png',
    'Manifest':   'https://imgur.com/4snkP7t.png',
    'Hades':      'https://imgur.com/sJlepBN.png',
    'NewMedia':   'https://imgur.com/ApmwuWC.png',
    'Entite':     'https://imgur.com/kcmTK8R.png',
    'Ares':       'https://imgur.com/MZP3G81.png',
    'Demeter':    'https://imgur.com/Tzah6O3.png',
    'Wrath':      'https://imgur.com/7LYlt1N.png'
  };
  var AVATAR_DEFAULT = 'https://imgur.com/OifGbh4.png';

  var CLASSE = {
    'Sovereign': 'sovereign',
    'Olympiens': 'olympien',
    'Shemning':  'shemning'
  };

  /* ================================================================
     UTILITAIRE — badge joué/libre
     ================================================================ */
  function badge(pseudo) {
    if (pseudo) {
      return '<div class="dieu-badge joue" title="' + pseudo + '">Joué</div>';
    }
    return '<div class="dieu-badge libre">Libre</div>';
  }

  function normPantheon(p) {
    var s = p.toLowerCase();
    if (s === 'sovereign') return 'Sovereign';
    if (s === 'olympiens' || s === 'olympien') return 'Olympiens';
    if (s === 'shemning'  || s === 'shenming')  return 'Shemning';
    return p;
  }

  /* ================================================================
     DOUBLE FETCH — stats + joueurs
     ================================================================ */
  Promise.all([
    fetch(SHEET_STATS).then(function (r) { return r.text(); }),
    fetch(SHEET_DIEUX).then(function (r) { return r.text(); })
  ]).then(function (resultats) {

    /* — Lecture feuille Dieux → table pseudo par nom — */
    var pseudos = {};
    /* Parser CSV qui gère les champs entre guillemets (URLs avec virgules) */
    function parseCSVLine(ligne) {
      var cols = [];
      var inQuote = false;
      var cur = "";
      for (var i = 0; i < ligne.length; i++) {
        var c = ligne[i];
        if (c === "\"" ) { inQuote = !inQuote; }
        else if (c === "," && !inQuote) { cols.push(cur); cur = ""; }
        else { cur += c; }
      }
      cols.push(cur);
      return cols;
    }

    resultats[1].split("\n").slice(1).forEach(function (ligne) {
      var cols   = parseCSVLine(ligne);
      var nom    = cols[D_NOM]    ? cols[D_NOM].trim()    : '';
      var joueur = cols[D_JOUEUR] ? cols[D_JOUEUR].trim() : '';
      if (joueur.indexOf('http') === 0) joueur = '';
      if (nom) pseudos[nom] = joueur;
    });

    /* — Lecture feuille stats — */
    var data = {};
    ORDRE.forEach(function (p) { data[p] = []; });

    resultats[0].split('\n').slice(LIGNES_MIN, LIGNES_MAX).forEach(function (ligne) {
      var cols = ligne.split(',');
      if (!cols[S_NOM] || !cols[S_PTS]) return;
      var nom  = cols[S_NOM].trim();
      var pts  = parseInt(cols[S_PTS].trim(), 10);
      if (!nom || isNaN(pts)) return;
      var pantheon = normPantheon(cols[S_PANTHEON] ? cols[S_PANTHEON].trim() : 'Sovereign');
      if (pantheon === nom) return;
      var groupe = data[pantheon] !== undefined ? data[pantheon] : data['Sovereign'];
      groupe.push({ nom: nom, pts: pts, pseudo: pseudos[nom] || '' });
    });

    /* — Rendu — */
    conteneur.innerHTML = '';

    ORDRE.forEach(function (pantheon) {
      var divinites = data[pantheon];
      if (!divinites || divinites.length === 0) return;

      var classe   = CLASSE[pantheon] || 'sovereign';
      var chefNom  = CHEFS[pantheon];
      var banniere = BANNIERES[pantheon] || AVATAR_DEFAULT;
      var lore     = LORES[pantheon] || '';

      var chef   = divinites.filter(function (d) { return d.nom === chefNom; })[0] || divinites[0];
      var autres = divinites.filter(function (d) { return d.nom !== chef.nom; });

      var section = document.createElement('div');
      section.className = 'pantheon-section ' + classe;

      /* Bannière */
      section.innerHTML =
        '<div class="pantheon-banner">' +
          '<img class="pantheon-banner-img" src="' + banniere + '" alt="' + pantheon + '" onerror="this.style.display=\'none\'">' +
          '<div class="pantheon-banner-overlay"></div>' +
          '<span class="pantheon-banner-title">' + pantheon + '</span>' +
        '</div>' +
        '<div class="pantheon-banner-line"></div>';

      /* Corps */
      var corps = document.createElement('div');
      corps.className = 'pantheon-body';

      var avatarChef = AVATARS[chef.nom] || AVATAR_DEFAULT;
      corps.innerHTML =
        '<div class="chef-wrapper">' +
          '<div class="chef-badge-label">Chef de panthéon</div>' +
          '<div class="chef-circle-wrap">' +
            '<span class="chef-crown">&#x1F451;</span>' +
            '<a href="/fr/wiki/' + chef.nom + '">' +
              '<div class="chef-circle" style="background-image:url(' + avatarChef + ')"></div>' +
            '</a>' +
            badge(chef.pseudo) +
          '</div>' +
          '<div class="chef-name">' + chef.nom + '</div>' +
          '<div class="chef-pts">' + chef.pts + ' pts</div>' +
        '</div>';

      /* Autres dieux */
      var listDiv = document.createElement('div');
      listDiv.className = 'dieux-liste';

      autres.forEach(function (d) {
        var av = AVATARS[d.nom] || AVATAR_DEFAULT;
        var a  = document.createElement('a');
        a.className = 'dieu-carte';
        a.href      = '/fr/wiki/' + d.nom;
        a.innerHTML =
          '<div class="dieu-avatar-wrap">' +
            '<div class="dieu-circle" style="background-image:url(' + av + ')"></div>' +
            badge(d.pseudo) +
          '</div>' +
          '<div class="dieu-nom">' + d.nom + '</div>' +
          '<div class="dieu-pts">' + d.pts + ' pts</div>';
        listDiv.appendChild(a);
      });

      corps.appendChild(listDiv);
      section.appendChild(corps);

      /* Lore */
      if (lore) {
        var loreDiv = document.createElement('div');
        loreDiv.className = 'pantheon-lore';
        loreDiv.innerHTML =
          '<div class="lore-label">Présentation</div>' +
          '<div class="lore-texte">' + lore + '</div>';
        section.appendChild(loreDiv);
      }

      conteneur.appendChild(section);
    });
  })
  .catch(function (err) {
    conteneur.innerHTML = '<div class="pth-loading">Erreur : ' + err.message + '</div>';
  });

}());