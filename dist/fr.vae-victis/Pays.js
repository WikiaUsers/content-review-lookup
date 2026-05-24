/* ================================================================
   LEADER CARD — Modèle pays
   
   UTILISATION :
   1. Dupliquer ce fichier, le renommer (ex: France.js, Russie.js)
   2. Modifier uniquement le bloc CONFIG
   3. Uploader sur le wiki Fandom
   4. Charger depuis MediaWiki:Common.js avec :
      importScript('MediaWiki:France.js');
   5. Coller le HTML de la carte dans la page du pays (voir fin de fichier)
   ================================================================ */

(function () {

  /* ==============================================================
     CONFIG — TOUT MODIFIER ICI
     ============================================================== */
  var CONFIG = {

    /* ID unique de la carte sur la page — doit correspondre au HTML */
    cardId: "leader-card-pays",

    /* --- Leader (colonne droite) --- */
    leader: {
      nom:         "Prénom Nom",
      role:        "Titre · Pays",
      desc:        "Courte description sous le nom du leader.",
      avatar:      "nom_avatar.png",   /* fichier uploadé sur le wiki, ou "" pour icône */
      tag:         "OTAN",             /* "OTAN", "BRICS", "Non-aligné", "" pour masquer */
      tagIcon:     "ti-shield",        /* ti-shield, ti-star, ti-world, ti-flame… */
      borderColor: "#2a5080",          /* couleur de bordure du panneau leader */

      /* Drapeau en HTML/CSS — exemples commentés plus bas */
      drapeauHTML: '<div style="width:100%;height:100%;background:#555;"></div>',

      /*
      === EXEMPLES DE DRAPEAUX ===

      France :
      '<div style="width:100%;height:100%;display:flex;">'
      +'<div style="flex:1;background:#002395"></div>'
      +'<div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#ED2939"></div>'
      +'</div>'

      Allemagne :
      '<div style="width:100%;height:100%;display:flex;flex-direction:column;">'
      +'<div style="flex:1;background:#000"></div>'
      +'<div style="flex:1;background:#DD0000"></div>'
      +'<div style="flex:1;background:#FFCE00"></div>'
      +'</div>'

      Russie :
      '<div style="width:100%;height:100%;display:flex;flex-direction:column;">'
      +'<div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#0032A0"></div>'
      +'<div style="flex:1;background:#DA0010"></div>'
      +'</div>'

      Italie :
      '<div style="width:100%;height:100%;display:flex;">'
      +'<div style="flex:1;background:#009246"></div>'
      +'<div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#CE2B37"></div>'
      +'</div>'

      Chine :
      '<div style="width:100%;height:100%;background:#DE2910;display:flex;align-items:center;justify-content:center;">'
      +'<span style="color:#FFDE00;font-size:16px;">★</span>'
      +'</div>'

      États-Unis :
      '<div style="width:100%;height:100%;background:#B22234;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;">'
      +'<div style="flex:1;background:#B22234"></div><div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#B22234"></div><div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#B22234"></div><div style="flex:1;background:#fff"></div>'
      +'<div style="flex:1;background:#B22234"></div>'
      +'</div>'
      +'<div style="position:absolute;top:0;left:0;width:42%;height:54%;background:#3C3B6E;'
      +'display:flex;align-items:center;justify-content:center;font-size:7px;color:#fff;letter-spacing:2px;">★ ★ ★</div>'
      +'</div>'
      */
    },

    /* --- Bannière affichée par défaut au chargement --- */
    banniere: {
      type:  "bonus",   /* "bonus" ou "malus" */
      texte: "Texte de la bannière affiché par défaut.",
    },

    /* --- Description affichée par défaut au chargement --- */
    description: "Texte de présentation du pays affiché dans le panneau central.",

    /* --- Hexagones : 1 à 4 maximum ---
       type     : "bonus" ou "malus"
       label    : texte sous l'hexagone
       image    : fichier image uploadé sur le wiki, ou "" pour utiliser l'icône
       icon     : icône Tabler si image vide — ti-sword, ti-bolt, ti-shield, ti-flame…
       banniere : texte de la bannière quand on clique sur cet hexagone
       desc     : texte de la description quand on clique sur cet hexagone
    --------------------------------------------------------------- */
    hexagones: [
      {
        type:     "bonus",
        label:    "Hex 1",
        image:    "",
        icon:     "ti-star",
        banniere: "Bonus : description courte pour la bannière.",
        desc:     "Description longue affichée dans le panneau central au clic.",
      },
      {
        type:     "bonus",
        label:    "Hex 2",
        image:    "",
        icon:     "ti-bolt",
        banniere: "Bonus : description courte pour la bannière.",
        desc:     "Description longue affichée dans le panneau central au clic.",
      },
      {
        type:     "malus",
        label:    "Hex 3",
        image:    "",
        icon:     "ti-alert-triangle",
        banniere: "Malus : description courte pour la bannière.",
        desc:     "Description longue affichée dans le panneau central au clic.",
      },
      /* Supprimer ce bloc ou en ajouter un 4e ici */
      {
        type:     "malus",
        label:    "Hex 4",
        image:    "",
        icon:     "ti-trending-down",
        banniere: "Malus : description courte pour la bannière.",
        desc:     "Description longue affichée dans le panneau central au clic.",
      },
    ],
  };
  /* ==============================================================
     FIN CONFIG
     ============================================================== */


  /* ==============================================================
     MOTEUR — NE PAS MODIFIER
     ============================================================== */

  function setBanner(card, type, texte, animate) {
    var banner = card.querySelector('.lc-banner');
    var icon   = card.querySelector('.lc-banner-icon');
    var textEl = card.querySelector('.lc-banner-text');
    var descEl = card.querySelector('.lc-desc');

    function apply() {
      banner.className       = 'lc-banner ' + type;
      icon.className         = 'lc-banner-icon ti ' + (type === 'bonus' ? 'ti-trending-up' : 'ti-trending-down');
      textEl.textContent     = texte;
      textEl.classList.remove('updating');
    }

    if (animate) {
      textEl.classList.add('updating');
      descEl.classList.add('updating');
      setTimeout(apply, 220);
    } else {
      apply();
    }
  }

  function setDesc(card, text) {
    var descEl = card.querySelector('.lc-desc');
    descEl.classList.add('updating');
    setTimeout(function () {
      descEl.textContent = text;
      descEl.classList.remove('updating');
      descEl.style.animation = 'none';
      descEl.offsetHeight;
      descEl.style.animation = 'leaderDescFade 0.3s ease both';
    }, 220);
  }

  function buildHex(h, index, card) {
    var wrap = document.createElement('div');
    wrap.className = 'lc-hex';
    wrap.style.animationDelay = (0.45 + index * 0.08) + 's';

    var shape = document.createElement('div');
    shape.className = 'lc-hex-shape';

    if (h.image) {
      var img = document.createElement('img');
      img.src = h.image;
      img.alt = h.label;
      img.onerror = function () {
        img.remove();
        shape.innerHTML = '<i class="ti ' + h.icon + '" aria-hidden="true"></i>';
      };
      shape.appendChild(img);
    } else {
      shape.innerHTML = '<i class="ti ' + h.icon + '" aria-hidden="true"></i>';
    }

    var label = document.createElement('span');
    label.className = 'lc-hex-label';
    label.textContent = h.label;

    wrap.appendChild(shape);
    wrap.appendChild(label);

    wrap.addEventListener('click', function () {
      card.querySelectorAll('.lc-hex').forEach(function (w) {
        w.classList.remove('active', 'bonus-active', 'malus-active');
      });
      wrap.classList.add('active', h.type === 'bonus' ? 'bonus-active' : 'malus-active');
      setBanner(card, h.type, h.banniere, true);
      setDesc(card, h.desc);
    });

    return wrap;
  }

  function init() {
    var card = document.getElementById(CONFIG.cardId);
    if (!card) { setTimeout(init, 80); return; }

    var c = CONFIG;

    setBanner(card, c.banniere.type, c.banniere.texte, false);
    card.querySelector('.lc-desc').textContent        = c.description;
    card.querySelector('.lc-flag').innerHTML          = c.leader.drapeauHTML;
    card.querySelector('.lc-right').style.border      = '2px solid ' + c.leader.borderColor;
    card.querySelector('.lc-name').textContent        = c.leader.nom;
    card.querySelector('.lc-role').textContent        = c.leader.role;
    card.querySelector('.lc-right-desc').textContent  = c.leader.desc;

    var avatarEl = card.querySelector('.lc-avatar');
    if (c.leader.avatar) {
      var img = document.createElement('img');
      img.src = c.leader.avatar;
      img.alt = c.leader.nom;
      img.onerror = function () { avatarEl.innerHTML = '<i class="ti ti-user"></i>'; };
      avatarEl.appendChild(img);
    } else {
      avatarEl.innerHTML = '<i class="ti ti-user"></i>';
    }

    var tagEl = card.querySelector('.lc-tag');
    if (c.leader.tag) {
      tagEl.style.display = 'inline-flex';
      card.querySelector('.lc-tag-icon').className  = 'lc-tag-icon ti ' + c.leader.tagIcon;
      card.querySelector('.lc-tag-text').textContent = c.leader.tag;
    } else {
      tagEl.style.display = 'none';
    }

    var hexRow = card.querySelector('.lc-hex-row');
    c.hexagones.slice(0, 4).forEach(function (h, i) {
      hexRow.appendChild(buildHex(h, i, card));
    });
  }

  init();

}());

/* ==============================================================
   HTML À COLLER DANS LA PAGE FANDOM (éditeur source)
   Remplacer "leader-card-pays" par l'id défini dans cardId
   ==============================================================

<div class="leader-card" id="leader-card-pays">
  <div class="lc-left">
    <div class="lc-banner">
      <i class="lc-banner-icon ti" aria-hidden="true"></i>
      <span class="lc-banner-text"></span>
    </div>
    <div class="lc-desc"></div>
    <div class="lc-bonuses">
      <div class="lc-bonuses-label">Bonus / Malus actifs</div>
      <div class="lc-hex-row"></div>
    </div>
  </div>
  <div class="lc-right">
    <div class="lc-flag"></div>
    <div class="lc-avatar"></div>
    <div class="lc-name"></div>
    <div class="lc-role"></div>
    <span class="lc-tag" style="display:none">
      <i class="lc-tag-icon ti" aria-hidden="true"></i>
      <span class="lc-tag-text"></span>
    </span>
    <div class="lc-right-desc"></div>
  </div>
</div>

*/