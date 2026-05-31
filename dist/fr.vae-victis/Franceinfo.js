(function () {

  var CONFIG = {
    cardId: "leader-card-france",

    leader: {
      nom:         "Mathilde de Saint-Honoré",
      role:        "Présidente",
      desc: "Mathilde de Saint-Honoré est une femme, née le 17 février 1982 à Paris, avocate de renom spécialisée en droit pénal, alors que la situation en Europe tourne à la catastrophe, Saint-Honoré fonde la Mouvance Réveillers ! et réussit à accéder à la présidence.",
      avatar:      "https://imgur.com/Wpbskef.png",
      tagImage:    "https://imgur.com/iba5pfZ.png",  /* image carrée, ou "" pour icône */
      tagIcon:     "ti-shield",      /* utilisé si tagImage vide */
      drapeauHTML: '<div style="width:100%;height:100%;display:flex;"><div style="flex:1;background:#002395"></div><div style="flex:1;background:#fff"></div><div style="flex:1;background:#ED2939"></div></div>',
    },

      banniere: {
      type:       "bonus",
      texte:      "Invaincu depuis des siècles, définitivement.",
      image:      "",     /* URL image haut ou "" pour icône */
      showTexte:  false,   /* false = image seule, plus haute */
    },

    description: "La France est une puissance européenne...",

    hexagones: [
      {
        type:          "bonus",
        label:         "La République",
        image:         "URL_IMAGE_HEX",
        icon:          "ti-building-bank",
        banniere:      "Invaincu depuis des siècles, définitivement.",
        banniereImage: "",
        showTexte:     true,
        desc:          "l'Assemblée nationale en France est l'une des institutions les plus puissantes du pays.",
      },
      {
        type:          "bonus",
        label:         "Hex 2",
        image:         "",
        icon:          "ti-bolt",
        banniere:      "Bonus actif.",
        banniereImage: "",
        showTexte:     true,
        desc:          "Description longue.",
      },
      {
        type:          "malus",
        label:         "Hex 3",
        image:         "",
        icon:          "ti-alert-triangle",
        banniere:      "",
        banniereImage: "",
        showTexte:     false,  /* image seule */
        desc:          "Description longue.",
      },
      {
        type:          "malus",
        label:         "Hex 4",
        image:         "",
        icon:          "ti-trending-down",
        banniere:      "Malus actif.",
        banniereImage: "",
        showTexte:     true,
        desc:          "Description longue.",
      },
    ],
  };

  /* ---- Moteur ---- */

  function setBanner(card, type, texte, image, showTexte, animate) {
    var banner  = card.querySelector('.lc-banner');
    var imgWrap = card.querySelector('.lc-banner-img');
    var content = card.querySelector('.lc-banner-content');
    var textEl  = card.querySelector('.lc-banner-text');
    function apply() {
      banner.className = 'lc-banner ' + type;
      if (image) {
        imgWrap.innerHTML = '<img src="' + image + '" alt="">';
      } else {
        var iconCls = type === 'bonus' ? 'ti-trending-up' : 'ti-trending-down';
        imgWrap.innerHTML = '<div class="lc-banner-img-placeholder"><i class="ti ' + iconCls + '"></i></div>';
      }
      if (showTexte && texte) {
        content.classList.remove('hidden');
        textEl.textContent = texte;
      } else {
        content.classList.add('hidden');
      }
      textEl.classList.remove('updating');
    }
    if (animate) { textEl.classList.add('updating'); setTimeout(apply, 220); }
    else { apply(); }
  }

  function setDesc(card, text) {
    var descEl = card.querySelector('.lc-desc');
    descEl.classList.add('updating');
    setTimeout(function () { descEl.textContent = text; descEl.classList.remove('updating'); }, 220);
  }

  function buildHex(h, index, card) {
    var wrap = document.createElement('div');
    wrap.className = 'lc-hex';
    wrap.style.animationDelay = (0.3 + index * 0.08) + 's';
    var shape = document.createElement('div');
    shape.className = 'lc-hex-shape';
    if (h.image) {
      var img = document.createElement('img');
      img.src = h.image; img.alt = h.label;
      img.onerror = function () { img.remove(); shape.innerHTML = '<i class="ti ' + h.icon + '"></i>'; };
      shape.appendChild(img);
    } else {
      shape.innerHTML = '<i class="ti ' + h.icon + '"></i>';
    }
    var label = document.createElement('span');
    label.className = 'lc-hex-label';
    label.textContent = h.label;
    wrap.appendChild(shape); wrap.appendChild(label);
    wrap.addEventListener('click', function () {
      card.querySelectorAll('.lc-hex').forEach(function (w) { w.classList.remove('active','bonus-active','malus-active'); });
      wrap.classList.add('active', h.type === 'bonus' ? 'bonus-active' : 'malus-active');
      setBanner(card, h.type, h.banniere, h.banniereImage||'', h.showTexte, true);
      setDesc(card, h.desc);
    });
    return wrap;
  }

  function init() {
    var card = document.getElementById(CONFIG.cardId);
    if (!card) { setTimeout(init, 80); return; }
    var c = CONFIG;

    setBanner(card, c.banniere.type, c.banniere.texte, c.banniere.image||'', c.banniere.showTexte, false);
    card.querySelector('.lc-desc').textContent = c.description;
    card.querySelector('.lc-flag').innerHTML = c.leader.drapeauHTML;
    card.querySelector('.lc-name').textContent = c.leader.nom;
    card.querySelector('.lc-role').textContent = c.leader.role;
	card.querySelector('.lc-right-desc').textContent = c.leader.desc;

	// Ajoute ces deux lignes juste après :
	card.querySelector('.lc-right').style.minHeight = card.querySelector('.lc-right').scrollHeight + 'px';
	card.style.alignItems = 'start';

    var avatarEl = card.querySelector('.lc-avatar');
    avatarEl.innerHTML = '';
    if (c.leader.avatar) {
      var img = document.createElement('img');
      img.src = c.leader.avatar; img.alt = c.leader.nom;
      img.onerror = function () { avatarEl.innerHTML = '<i class="ti ti-user"></i>'; };
      avatarEl.appendChild(img);
    } else { avatarEl.innerHTML = '<i class="ti ti-user"></i>'; }

    var tagEl = card.querySelector('.lc-tag');
    if (c.leader.tagImage) {
      tagEl.style.display = 'flex';
      tagEl.innerHTML = '<img src="' + c.leader.tagImage + '" alt="alliance">';
    } else if (c.leader.tagIcon) {
      tagEl.style.display = 'flex';
      tagEl.innerHTML = '<i class="ti ' + c.leader.tagIcon + '" style="font-size:28px;color:rgba(200,169,110,0.5);"></i>';
    } else { tagEl.style.display = 'none'; }

    var hexRow = card.querySelector('.lc-hex-row');
    hexRow.innerHTML = '';
    c.hexagones.slice(0,4).forEach(function(h,i){ hexRow.appendChild(buildHex(h,i,card)); });
  }

  init();
}());