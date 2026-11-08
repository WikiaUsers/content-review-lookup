/* ===== Theme picker (kept at the very top so it runs first) ===== */
(function () {
  try {
    // New key on purpose: everyone starts on the default (Autumn) once, then their own pick is remembered.
    // To keep people's old choices instead, change this back to 'mwTheme'.
    var KEY = 'mwTheme2';
    var DEFAULT_THEME = 'autumn';
    var root = document.documentElement;

    // 'autumn' is the default look. 'classic' and 'autumn' both use the mw-classic base; autumn then recolors it.
    // group = which section of the picker the theme is listed under
    var GROUPS = ['Seasonal', 'Standard'];
    var THEMES = [
      { id: 'autumn',    group: 'Seasonal', name: 'Autumn',    desc: 'Golden leaves and a little fall town', colors: ['#ff8a1f', '#3d1c0b'] },
      { id: 'halloween', group: 'Seasonal', name: 'Halloween', desc: 'Spooky orange and purple',              colors: ['#ff7a18', '#2a1238'] },
      { id: 'classic',   group: 'Standard', name: 'Classic',   desc: 'The original look',                     colors: ['#3366cc', '#f8f9fa'] }
    ];
    var USES_CLASSIC_BASE = { classic: true, autumn: true };

    function isValid(id) {
      return THEMES.some(function (t) { return t.id === id; });
    }
    function read() {
      try {
        var v = localStorage.getItem(KEY);
        if (isValid(v)) { return v; }
      } catch (e) {}
      return DEFAULT_THEME;
    }
    function save(id) {
      try { localStorage.setItem(KEY, id); } catch (e) {}
    }
    function nameOf(id) {
      for (var i = 0; i < THEMES.length; i++) { if (THEMES[i].id === id) { return THEMES[i].name; } }
      return '';
    }

    var btn, btnLabel, modal, optionEls = {};

    function updateUI(id) {
      if (btnLabel) { btnLabel.textContent = 'Theme'; }
      if (btn) { btn.title = 'Theme: ' + nameOf(id) + ' (click to change)'; }
      Object.keys(optionEls).forEach(function (k) {
        var on = k === id;
        optionEls[k].classList.toggle('is-active', on);
        optionEls[k].setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }

    function apply(id) {
      var targets = [root];
      if (document.body) { targets.push(document.body); }
      targets.forEach(function (el) {
        THEMES.forEach(function (t) { el.classList.toggle('mw-theme-' + t.id, t.id === id); });
        el.classList.toggle('mw-classic', !!USES_CLASSIC_BASE[id]);
      });
      root.setAttribute('data-mw-theme', id);
      updateUI(id);
    }

    // Apply right now, as soon as this file runs
    apply(read());
    root.classList.add('mw-ready');

    // Apply again once <body> exists
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { apply(read()); });
    }

    /* Styles for the button and the box (every declaration gets !important so site CSS can't override) */
    function injectStyles() {
      if (document.getElementById('mw-theme-styles')) { return; }
      var css =
        '#mw-theme-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;' +
          'width:auto;min-width:0;max-width:max-content;height:auto;flex:none;box-sizing:border-box;' +
          'padding:9px 16px;border-radius:999px;' +
          'border:2px solid rgba(255,255,255,.35);background:rgba(30,20,40,.92);color:#fff;font:600 14px/1 sans-serif;' +
          'cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.35);transition:transform .15s,box-shadow .15s,border-color .15s;user-select:none;' +
          'visibility:visible;opacity:1;margin:0;text-decoration:none;}' +
        '#mw-theme-btn:hover{transform:translateY(-1px);border-color:#ff9a3c;box-shadow:0 4px 14px rgba(255,122,24,.45);}' +
        '#mw-theme-btn:active{transform:scale(.97);}' +
        '#mw-theme-btn:focus-visible{outline:3px solid #ff9a3c;outline-offset:2px;}' +
        '#mw-theme-btn .mw-theme-caret{font-size:11px;opacity:.8;}' +
        '#mw-theme-btn:not(.mw-theme-inline){position:fixed;left:16px;bottom:16px;right:auto;top:auto;z-index:99998;}' +
        '.mw-theme-modal{position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);}' +
        '.mw-theme-modal.is-open{display:flex;}' +
        '.mw-theme-box{position:relative;width:min(92vw,360px);max-height:88vh;overflow-y:auto;box-sizing:border-box;padding:18px;border-radius:14px;background:#1e1428;color:#fff;' +
          'border:1px solid rgba(255,255,255,.2);box-shadow:0 10px 40px rgba(0,0,0,.6);font-family:sans-serif;}' +
        '.mw-theme-title{font-size:18px;font-weight:700;margin:0 28px 12px 0;color:#fff;}' +
        '.mw-theme-cat{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ffb347;margin:14px 2px 8px;opacity:.9;}' +
        '.mw-theme-cat:first-of-type{margin-top:4px;}' +
        '.mw-theme-close{position:absolute;top:10px;right:10px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:16px;cursor:pointer;padding:0;}' +
        '.mw-theme-close:hover{background:rgba(255,255,255,.25);}' +
        '.mw-theme-opt{display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;margin:0 0 8px;padding:10px 12px;border-radius:10px;' +
          'border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;text-align:left;cursor:pointer;font:inherit;transition:border-color .15s,background .15s;}' +
        '.mw-theme-opt:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.4);}' +
        '.mw-theme-opt.is-active{border-color:#ff9a3c;background:rgba(255,154,60,.15);}' +
        '.mw-theme-swatch{flex:0 0 auto;width:38px;height:38px;border-radius:8px;border:1px solid rgba(255,255,255,.3);}' +
        '.mw-theme-text{flex:1 1 auto;display:flex;flex-direction:column;gap:3px;}' +
        '.mw-theme-text b{font-size:15px;color:#fff;}' +
        '.mw-theme-text span{font-size:12px;opacity:.75;color:#fff;}' +
        '.mw-theme-check{flex:0 0 auto;font-size:18px;color:#ff9a3c;visibility:hidden;}' +
        '.mw-theme-opt.is-active .mw-theme-check{visibility:visible;}';
      var s = document.createElement('style');
      s.id = 'mw-theme-styles';
      s.textContent = css.replace(/;/g, ' !important;');
      (document.head || document.documentElement).appendChild(s);
    }

    function openBox() { if (modal) { modal.classList.add('is-open'); } }
    function closeBox() { if (modal) { modal.classList.remove('is-open'); } }

    function makeOption(t) {
      var o = document.createElement('button');
      o.type = 'button';
      o.className = 'mw-theme-opt';
      o.setAttribute('role', 'radio');
      var sw = document.createElement('span');
      sw.className = 'mw-theme-swatch';
      sw.style.background = 'linear-gradient(135deg,' + t.colors[0] + ' 50%,' + t.colors[1] + ' 50%)';
      var tx = document.createElement('span');
      tx.className = 'mw-theme-text';
      var b = document.createElement('b');
      b.textContent = t.name;
      var d = document.createElement('span');
      d.textContent = t.desc;
      tx.appendChild(b);
      tx.appendChild(d);
      var ck = document.createElement('span');
      ck.className = 'mw-theme-check';
      ck.textContent = '✓';
      o.appendChild(sw);
      o.appendChild(tx);
      o.appendChild(ck);
      o.addEventListener('click', function () {
        save(t.id);
        apply(t.id);
        closeBox();
      });
      optionEls[t.id] = o;
      return o;
    }

    function build() {
      if (!document.body) { return; }
      if (document.getElementById('mw-theme-btn')) { return; }
      injectStyles();

      // Button (text + arrow, no emoji)
      btn = document.createElement('button');
      btn.id = 'mw-theme-btn';
      btn.type = 'button';
      btn.setAttribute('aria-haspopup', 'dialog');
      btnLabel = document.createElement('span');
      var caret = document.createElement('span');
      caret.className = 'mw-theme-caret';
      caret.textContent = '▼';
      btn.appendChild(btnLabel);
      btn.appendChild(caret);
      btn.addEventListener('click', openBox);

      // Box
      modal = document.createElement('div');
      modal.className = 'mw-theme-modal';
      var box = document.createElement('div');
      box.className = 'mw-theme-box';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-label', 'Choose a theme');

      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'mw-theme-close';
      close.textContent = '✕';
      close.addEventListener('click', closeBox);
      box.appendChild(close);

      var title = document.createElement('div');
      title.className = 'mw-theme-title';
      title.textContent = 'Choose a theme';
      box.appendChild(title);

      // one heading per group, then that group's themes
      GROUPS.forEach(function (g) {
        var inGroup = THEMES.filter(function (t) { return t.group === g; });
        if (!inGroup.length) { return; }
        var head = document.createElement('div');
        head.className = 'mw-theme-cat';
        head.textContent = g;
        box.appendChild(head);
        inGroup.forEach(function (t) { box.appendChild(makeOption(t)); });
      });

      modal.appendChild(box);
      modal.addEventListener('click', function (e) { if (e.target === modal) { closeBox(); } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeBox(); } });
      document.body.appendChild(modal);

      var slot = document.getElementById('mw-theme-slot');
      if (slot) { btn.className = 'mw-theme-inline'; slot.appendChild(btn); } else { document.body.appendChild(btn); }
      updateUI(read());
      console.log('[Theme] picker built');
    }

    function safeBuild() {
      try { build(); } catch (err) { console.error('[Theme] build failed:', err); }
    }

    // Keep other open tabs in sync
    window.addEventListener('storage', function (e) {
      if (e.key === KEY) { apply(read()); }
    });

    // Build as early as possible, with several fallbacks
    if (document.body) { safeBuild(); }
    document.addEventListener('DOMContentLoaded', safeBuild);
    window.addEventListener('load', safeBuild);
    if (window.mw && mw.loader && mw.loader.using) {
      mw.loader.using('jquery').then(function () { $(safeBuild); });
    }
  } catch (err) {
    console.error('[Theme] failed to start:', err);
  }
})();

mw.hook('wikipage.content').add(function ($content) {
  if ($('#mw-cmp-bar').length) return;
  if ($content.find('.mw-detail-hero').length) return; // skip building pages
  var $cards = $content.find('.mw-gallery-card');
  if (!$cards.length) return;
  console.log('[Compare] loaded,', $cards.length, 'cards');

  var picked = [];
  var $bar = $('<div id="mw-cmp-bar" class="mw-cmp-bar"></div>').appendTo('body').hide();
  var $modal = $('<div class="mw-cmp-modal"></div>').appendTo('body').hide();

  function nameOf($card) { return $card.find('.mw-gallery-card-name a').text().trim(); }

  function refreshBar() {
    $cards.each(function () {
      $(this).toggleClass('mw-cmp-picked', picked.indexOf(nameOf($(this))) !== -1);
    });
    if (!picked.length) { $bar.hide(); return; }
    $bar.empty()
      .append($('<span class="mw-cmp-names">').text(picked.join('  vs  ') + (picked.length < 2 ? '  (pick one more)' : '')))
      .append($('<button class="mw-cmp-go">').text('Compare').prop('disabled', picked.length < 2).on('click', showCompare))
      .append($('<button class="mw-cmp-clear">').text('Clear').on('click', function () { picked = []; refreshBar(); }))
      .show();
  }

  $cards.each(function () {
    var $card = $(this);
    if ($card.find('.mw-cmp-btn').length) return;
    $('<button class="mw-cmp-btn" type="button">⚖ Compare</button>')
      .on('click', function (e) {
        e.preventDefault();
        var n = nameOf($card), i = picked.indexOf(n);
        if (i !== -1) picked.splice(i, 1);
        else { if (picked.length === 2) picked.shift(); picked.push(n); }
        refreshBar();
      }).appendTo($card);
  });

  function getData(name) {
    return $.getJSON(mw.util.wikiScript('api'), {
      action: 'parse', page: name, prop: 'text', format: 'json', formatversion: 2, disablelimitreport: 1
    }).then(function (r) {
      var doc = new DOMParser().parseFromString(r.parse.text, 'text/html');
      var t = function (el, sel) { var n = el.querySelector(sel); return n ? n.textContent.trim() : ''; };
      var stats = [];
      doc.querySelectorAll('.mw-detail-stat').forEach(function (el) {
        stats.push([t(el, '.mw-detail-stat-label'), t(el, '.mw-detail-stat-value')]);
      });
      var units = [];
      doc.querySelectorAll('.mw-spawned-unit-card').forEach(function (el) {
        var u = { name: t(el, '.mw-card-title'), stats: [] };
        el.querySelectorAll('.mw-headline-stat').forEach(function (s) {
          u.stats.push([t(s, '.mw-headline-label'), t(s, '.mw-headline-value')]);
        });
        el.querySelectorAll('.mw-stat').forEach(function (s) {
          u.stats.push([t(s, '.mw-stat-label'), t(s, '.mw-stat-value')]);
        });
        units.push(u);
      });
      return { name: name, tier: t(doc, '.mw-detail-hero-tier'), stats: stats, units: units };
    });
  }

  function get(list, label) {
    var f = list.filter(function (s) { return s[0] === label; })[0];
    return f ? f[1] : '—';
  }

  function num(s) {
    s = String(s).replace(/,/g, '');
    var r = s.match(/(\d+(?:\.\d+)?)\s*[–—-]\s*(\d+(?:\.\d+)?)/);
    if (r) return (parseFloat(r[1]) + parseFloat(r[2])) / 2;
    if (/\d\s*x\s*\d/i.test(s)) return null;
    var m = s.match(/-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }

  function lowerIsBetter(label) { return /cost|time|cooldown|delay/i.test(label); }

  function dps(u) {
    var d = num(get(u.stats, 'Damage')), c = num(get(u.stats, 'Attack Cooldown'));
    return (d !== null && c) ? (d / c).toFixed(1) : null;
  }

  function showCompare() {
    $modal.empty().text('Loading…').show();
    $.when(getData(picked[0]), getData(picked[1])).then(function (A, B) {
      var $wrap = $('<div>');
      $wrap.append($('<button class="mw-cmp-close">✕</button>').on('click', function () { $modal.hide(); }));
      $wrap.append($('<div class="mw-cmp-title">').text(A.name + '  vs  ' + B.name));

      // building stats
      var labels = [];
      A.stats.concat(B.stats).forEach(function (s) { if (labels.indexOf(s[0]) === -1) labels.push(s[0]); });
      var $t = $('<table>').append(
        $('<tr>').append($('<th>').text('Stat'), $('<th>').text(A.name), $('<th>').text(B.name))
      );
      $t.append($('<tr>').append($('<td>').text('Rarity'), $('<td>').text(A.tier || '—'), $('<td>').text(B.tier || '—')));
      labels.forEach(function (l) {
        var a = get(A.stats, l), b = get(B.stats, l), na = num(a), nb = num(b);
        var $tr = $('<tr>').append($('<td>').text(l), $('<td>').text(a), $('<td>').text(b));
        if (na !== null && nb !== null && na !== nb) {
          var aWins = lowerIsBetter(l) ? na < nb : na > nb;
          $tr.children().eq(aWins ? 1 : 2).addClass('mw-better');
        }
        $t.append($tr);
      });
      $wrap.append($('<div class="mw-table-wrapper">').append($t));

      // spawned units
      $wrap.append($('<div class="mw-cmp-sub">').text('Spawned Units'));
      var $cols = $('<div class="mw-cmp-cols">');
      [A, B].forEach(function (b) {
        var $c = $('<div class="mw-cmp-col">').append($('<div class="mw-cmp-col-head">').text(b.name));
        if (!b.units.length) $c.append($('<div class="mw-cmp-unit">').text('No unit data found.'));
        b.units.forEach(function (u) {
          var $chips = $('<div class="mw-cmp-chips">');
          u.stats.forEach(function (s) {
            $chips.append($('<span>').append($('<i>').text(s[0]), document.createTextNode(' ' + s[1])));
          });
          var d = dps(u);
          if (d) $chips.append($('<span class="mw-cmp-dps">').append($('<i>').text('DPS'), document.createTextNode(' ' + d)));
          $c.append($('<div class="mw-cmp-unit">').append($('<div class="mw-cmp-unit-name">').text(u.name), $chips));
        });
        $cols.append($c);
      });
      $wrap.append($cols);

      $modal.empty().append($wrap);
    }, function () { $modal.text('Could not load one of the pages.'); });
  }
});

mw.hook('wikipage.content').add(function ($content) {
  var $root = $content.find('#mw-gen-combo');
  if (!$root.length || $root.data('ready')) return;
  $root.data('ready', true);

  // [name, rarity, bonuses]
  var GENERALS = [
    ["Air General", "Common", {"airDamage":5,"airSpeed":5}],
    ["Farmer General", "Common", {"productionTime":5,"civilians":5}],
    ["Junior General", "Common", {"troopDamage":10,"troopHealth":10}],
    ["Armored General", "Uncommon", {"troopHealth":20,"vehicleHealth":5}],
    ["Camo General", "Uncommon", {"troopRange":10,"vehicleRange":10}],
    ["Infantry General", "Uncommon", {"troopDamage":15,"troopHealth":15}],
    ["Senior General", "Uncommon", {"troopHealth":20,"vehicleSpeed":10,"troopDamage":20}],
    ["Air Commander", "Rare", {"airHealth":10,"airDamage":10,"healBoost":100}],
    ["Nuclear Researcher", "Rare", {"nuclearResearchSpeed":30,"researchSpeed":15,"rocketCooldown":-5}],
    ["President", "Rare", {"questLimit":1,"income":10,"civilians":10}],
    ["Crazy Scientist", "Epic", {"scientistSlots":1,"researchSpeed":20,"vehicleSpeed":10}],
    ["Dark Lord", "Epic", {"vehicleDamage":10,"vehicleHealth":20,"conquerSpeed":50}],
    ["General of Doom", "Legendary", {"vehicleDamage":20,"vehicleHealth":10,"conquerLimit":1,"civilians":10}],
    ["Nuclear General", "Legendary", {"troopHealth":10,"vehicleHealth":10,"nuclearRocketCooldown":-30,"rocketCooldown":-15}],
    ["Rich Businessman", "Legendary", {"productionTime":10,"income":10,"restockTime":-15}],
    ["Emperor", "Mythic", {"airHealth":30,"civilians":20,"radioactiveChance":15,"productionTime":5,"conquerLimit":1}],
    ["Empress", "Mythic", {"vehicleHealth":25,"income":10,"civilians":25,"superChargeChance":15,"conquerLimit":1}],
    ["Death General", "Secret", {"burnChance":20,"vehicleHealth":30,"builders":2,"conquerLimit":4}],
    ["Shark Queen", "Secret", {"vehicleHealth":50,"income":10,"civilians":30,"lifesteal":10,"conquerLimit":2}],
    ["Toxic Overlord", "Secret", {"vehicleHealth":20,"civilians":30,"radioactiveChance":10,"rocketLimit":2,"conquerLimit":1}],
    ["Warlord", "Secret", {"rocketLimit":5,"vehicleHealth":30,"civilians":30,"conquerLimit":2}],
    ["Alien General", "Cosmic", {"alienMutationChance":20,"vehicleHealth":50,"civilians":40,"conquerLimit":3}],
    ["Airforce Elite General", "Titan", {"airHealth":40,"income":5,"civilians":30,"airDamage":40,"conquerLimit":3}],
    ["Angel Elite General", "Titan", {"airHealth":40,"income":5,"civilians":30,"troopHealth":40,"vehicleHealth":40}],
    ["Builder Elite General", "Titan", {"restockTime":-30,"income":10,"builders":3,"buildSpeed":10,"researchSpeed":15,"civilians":50}],
    ["Communication Elite General", "Titan", {"troopRange":10,"civilians":30,"income":5,"vehicleSpeed":20,"conquerLimit":3}],
    ["Corrupted General", "Titan", {"productionTime":7.5,"income":5,"civilians":30,"allDamage":25,"allHealth":25}],
    ["Mech Elite General", "Titan", {"vehicleDamage":50,"vehicleHealth":30,"vehicleRange":10,"allSpeed":-10,"civilians":30,"conquerLimit":5}],
    ["Necromancer General", "Titan", {"productionTime":5,"income":10,"civilians":40,"lifesteal":5,"rocketLimit":3}],
    ["Null General", "Titan", {"productionTime":5,"income":5,"civilians":25,"allSpeed":5,"conquerLimit":4,"allDamage":30,"allHealth":30}],
    ["Orbital Elite General", "Titan", {"vehicleDamage":40,"income":5,"civilians":30,"airDamage":40,"conquerLimit":4}],
    ["Rage Elite General", "Titan", {"income":10,"civilians":40,"conquerLimit":3,"allDamage":40,"allSpeed":10}]
  ];

  var RARITIES = ['Common','Uncommon','Rare','Epic','Legendary','Mythic','Secret','Cosmic','Titan'];

  // key: [label, unit]   unit: '%' percent, '' flat number, 's' seconds
  var STATS = {
    income: ['Income', '%'], civilians: ['Civilians', ''],
    productionTime: ['Production Speed', '%'],
    troopHealth: ['Troop Health', '%'], troopDamage: ['Troop Damage', '%'], troopRange: ['Troop Range', '%'],
    vehicleHealth: ['Vehicle Health', '%'], vehicleDamage: ['Vehicle Damage', '%'], vehicleRange: ['Vehicle Range', '%'], vehicleSpeed: ['Vehicle Speed', '%'],
    airHealth: ['Air Unit Health', '%'], airDamage: ['Air Unit Damage', '%'], airSpeed: ['Air Unit Speed', '%'],
    allHealth: ['All Health', '%'], allDamage: ['All Damage', '%'], allSpeed: ['All Speed', '%'],
    lifesteal: ['Lifesteal', '%'], healBoost: ['Med Heli Heal', '%'], burnChance: ['Burn Chance', '%'],
    radioactiveChance: ['Radioactive Mutation Chance', '%'], superChargeChance: ['Super Charge Chance', '%'], alienMutationChance: ['Alien Mutation', '%'],
    conquerLimit: ['Conquer Limit', ''], conquerSpeed: ['Conquer Speed', '%'],
    buildSpeed: ['Build Speed', '%'], builders: ['Builders', ''], restockTime: ['Restock Time', 's'],
    researchSpeed: ['Research Speed', '%'], nuclearResearchSpeed: ['Nuclear Research (Fallout)', '%'], scientistSlots: ['Research Slots', ''],
    rocketCooldown: ['Rocket Cooldown', 's'], nuclearRocketCooldown: ['Nuclear Rocket CD (Fallout)', 's'], rocketLimit: ['Rocket Limit', ''],
    questLimit: ['Quest Limit', '']
  };
  var ORDER = Object.keys(STATS);

  // effective totals: category stat + the matching "all" stat
  var EFFECTIVE = [
    ['Troop Damage', ['troopDamage','allDamage']], ['Troop Health', ['troopHealth','allHealth']],
    ['Vehicle Damage', ['vehicleDamage','allDamage']], ['Vehicle Health', ['vehicleHealth','allHealth']], ['Vehicle Speed', ['vehicleSpeed','allSpeed']],
    ['Air Unit Damage', ['airDamage','allDamage']], ['Air Unit Health', ['airHealth','allHealth']], ['Air Unit Speed', ['airSpeed','allSpeed']]
  ];

  var SLOT_LABELS = ['Slot 1', 'Slot 2 (+1 General Slot research)', 'Slot 3 (Extra General gamepass)'];
  var picks = [null, null, null];

  function fmt(v, unit) {
    var n = Math.round(v * 100) / 100;
    return (n > 0 ? '+' : '') + n + unit;  // unit is '%', 's' or ''
  }

  var $ui = $('<div class="mw-gc"></div>');
  var $slots = $('<div class="mw-gc-slots"></div>').appendTo($ui);
  var $out = $('<div class="mw-gc-out"></div>').appendTo($ui);
  var $selects = [];

  SLOT_LABELS.forEach(function (label, i) {
    var $wrap = $('<label class="mw-gc-slot"></label>').append($('<span class="mw-gc-slot-label">').text(label));
    var $sel = $('<select class="mw-gc-select"></select>').appendTo($wrap);
    $sel.on('change', function () {
      picks[i] = this.value === '' ? null : parseInt(this.value, 10);
      refresh();
    });
    $selects.push($sel);
    $slots.append($wrap);
  });

  function fillSelects() {
    $selects.forEach(function ($sel, i) {
      $sel.empty().append($('<option value="">— none —</option>'));
      RARITIES.forEach(function (r) {
        var $g = $('<optgroup>').attr('label', r);
        GENERALS.forEach(function (g, idx) {
          if (g[1] !== r) return;
          var takenElsewhere = picks.some(function (p, j) { return j !== i && p === idx; });
          var $o = $('<option>').val(idx).text(g[0]).prop('disabled', takenElsewhere);
          if (picks[i] === idx) $o.prop('selected', true);
          $g.append($o);
        });
        if ($g.children().length) $sel.append($g);
      });
    });
  }

  function refresh() {
    fillSelects();
    var chosen = picks.map(function (p) { return p === null ? null : GENERALS[p]; });
    var any = chosen.filter(Boolean);
    $out.empty();
    if (!any.length) { $out.append($('<div class="mw-gc-empty">Pick two or three generals to see their combined bonuses.</div>')); return; }
    if (any.length === 1) $out.append($('<div class="mw-gc-hint">Pick a second general to combine.</div>'));

    var total = {};
    any.forEach(function (g) { Object.keys(g[2]).forEach(function (k) { total[k] = (total[k] || 0) + g[2][k]; }); });

    // main table
    var $t = $('<table class="mw-gc-table"></table>');
    var $h = $('<tr><th>Bonus</th></tr>');
    chosen.forEach(function (g) { if (g) $h.append($('<th>').text(g[0])); });
    $h.append('<th class="mw-gc-total">Total</th>');
    $t.append($h);
    ORDER.forEach(function (k) {
      if (total[k] === undefined) return;
      var u = STATS[k][1];
      var $r = $('<tr>').append($('<td>').text(STATS[k][0]));
      chosen.forEach(function (g) {
        if (g) $r.append($('<td>').text(g[2][k] !== undefined ? fmt(g[2][k], u) : '—').toggleClass('mw-gc-dim', g[2][k] === undefined));
      });
      $r.append($('<td class="mw-gc-total">').text(fmt(total[k], u)));
      $t.append($r);
    });
    $out.append($('<div class="mw-gc-sub">Combined bonuses</div>'), $('<div class="mw-gc-scroll">').append($t));

    // effective by unit type
    var $e = $('<div class="mw-gc-eff"></div>');
    EFFECTIVE.forEach(function (row) {
      var v = 0, has = false;
      row[1].forEach(function (k) { if (total[k] !== undefined) { v += total[k]; has = true; } });
      if (has) $e.append($('<div class="mw-gc-chip">').append($('<i>').text(row[0]), document.createTextNode(' ' + fmt(v, '%'))));
    });
    if ($e.children().length) {
      $out.append($('<div class="mw-gc-sub">Effective by unit type <span class="mw-gc-note">(All-bonuses added in)</span></div>'), $e);
    }
    $out.append($('<div class="mw-gc-foot">Assumes bonuses add together. Civilians, Conquer Limit, Builders, Rocket Limit, Research Slots and Quest Limit are flat numbers. Cooldown and restock bonuses are in seconds. Duplicate generals can’t be equipped twice.</div>'));
  }

  $root.empty().append($ui);
  refresh();
});

/* ===== Event countdown: <span class="mw-countdown" data-end="2026-11-07T18:00:00Z" data-ended="Event ended">Ends soon</span> ===== */
(function () {
  var nodes = [];
  function collect() {
    nodes = Array.prototype.slice.call(document.querySelectorAll('.mw-countdown[data-end]'));
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var now = Date.now();
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var end = Date.parse(el.getAttribute('data-end'));
      if (isNaN(end)) { continue; }
      var pre = el.getAttribute('data-prefix') || '';
      var left = Math.floor((end - now) / 1000);
      if (left <= 0) {
        el.textContent = el.getAttribute('data-ended') || 'Ended';
        el.classList.add('mw-countdown-done');
        continue;
      }
      var d = Math.floor(left / 86400);
      var h = Math.floor((left % 86400) / 3600);
      var m = Math.floor((left % 3600) / 60);
      var s = left % 60;
      if (el.classList.contains('mw-cd-boxes')) {
        el.innerHTML = (pre ? '<span class="mw-cd-pre">' + pre + '</span>' : '') +
          '<span class="mw-cd-cell"><b>' + d + '</b><i>days</i></span>' +
          '<span class="mw-cd-cell"><b>' + pad(h) + '</b><i>hours</i></span>' +
          '<span class="mw-cd-cell"><b>' + pad(m) + '</b><i>min</i></span>' +
          '<span class="mw-cd-cell"><b>' + pad(s) + '</b><i>sec</i></span>';
      } else {
        el.textContent = pre + (d > 0 ? d + 'd ' : '') + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
      }
    }
  }
  function start() {
    collect();
    if (!nodes.length) { return; }
    tick();
    var timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearInterval(timer); } else { tick(); timer = setInterval(tick, 1000); }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();

/* ===== Search suggestions for the homepage search bar ===== */
(function () {
  function init() {
    var box = document.querySelector('.mw-search-box');
    if (!box) { return; }
    var input = box.querySelector('input[type="search"], input[name="search"]');
    if (!input || input.getAttribute('data-suggest')) { return; }
    input.setAttribute('data-suggest', '1');
    input.setAttribute('autocomplete', 'off');

    var api = ((window.mw && mw.config && mw.config.get('wgScriptPath')) || '') + '/api.php';
    var list = document.createElement('div');
    list.className = 'mw-suggest';
    list.setAttribute('role', 'listbox');
    list.style.display = 'none';
    box.appendChild(list);

    var items = [], active = -1, timer = null, ctrl = null, cache = {};

    function close() { list.style.display = 'none'; active = -1; }
    function highlight(i) {
      var kids = list.children;
      for (var k = 0; k < kids.length; k++) { kids[k].classList.toggle('is-active', k === i); }
      active = i;
    }
    function render(titles, urls, q) {
      list.innerHTML = '';
      items = [];
      if (!titles.length) { close(); return; }
      titles.forEach(function (t, i) {
        var a = document.createElement('a');
        a.href = urls[i];
        a.setAttribute('role', 'option');
        var low = t.toLowerCase(), at = low.indexOf(q.toLowerCase());
        if (at > -1) {
          a.appendChild(document.createTextNode(t.slice(0, at)));
          var b = document.createElement('b');
          b.textContent = t.slice(at, at + q.length);
          a.appendChild(b);
          a.appendChild(document.createTextNode(t.slice(at + q.length)));
        } else { a.textContent = t; }
        list.appendChild(a);
        items.push(a);
      });
      list.style.display = 'block';
      active = -1;
    }
    function fetchSuggestions(q) {
      if (cache[q]) { render(cache[q][0], cache[q][1], q); return; }
      if (ctrl && ctrl.abort) { ctrl.abort(); }
      ctrl = window.AbortController ? new AbortController() : null;
      var url = api + '?action=opensearch&format=json&namespace=0&limit=8&search=' + encodeURIComponent(q);
      fetch(url, { credentials: 'same-origin', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (input.value.trim() !== q) { return; }
          cache[q] = [data[1] || [], data[3] || []];
          render(cache[q][0], cache[q][1], q);
        })
        .catch(function () {});
    }

    input.addEventListener('input', function () {
      var q = input.value.trim();
      clearTimeout(timer);
      if (q.length < 2) { close(); return; }
      timer = setTimeout(function () { fetchSuggestions(q); }, 120);
    });
    input.addEventListener('keydown', function (e) {
      if (list.style.display === 'none') { return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); highlight((active + 1) % items.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); highlight((active - 1 + items.length) % items.length); }
      else if (e.key === 'Enter' && active > -1) { e.preventDefault(); window.location.href = items[active].href; }
      else if (e.key === 'Escape') { close(); }
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) { close(); } });
    input.addEventListener('focus', function () { if (items.length) { list.style.display = 'block'; } });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

/* ===== Search bar: turn off the browser's own white dropdown, and rotate the placeholder ===== */
(function () {
  function init() {
    var box = document.querySelector('.mw-search-box');
    if (!box) { return; }
    var input = box.querySelector('input[type="search"], input[name="search"]');
    if (!input) { return; }
    input.removeAttribute('list');
    input.setAttribute('autocomplete', 'off');
    var lists = box.querySelectorAll('datalist');
    for (var i = 0; i < lists.length; i++) { lists[i].parentNode.removeChild(lists[i]); }

    var tips = ['Search the wiki...', 'Try: Generals', 'Try: War Pass', 'Try: Crates', 'Try: Halloween Event', 'Try: Territories'];
    var n = 0;
    setInterval(function () {
      if (document.activeElement === input || input.value) { return; }
      n = (n + 1) % tips.length;
      input.placeholder = tips[n];
    }, 3000);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
/* ===== Autumn town in the background =====
   The only autumn thing made by JS. Everything else (grid, glow, decorations) is in Common.css.
   It adds the little fall town and lifts it a few pixels as you scroll. Still for reduced-motion users. */
(function () {
  try {
    var root = document.documentElement;
    var town, ticking = false, wired = false;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build() {
      if (!document.body || document.getElementById('mw-au-layers')) { return; }
      var wrap = document.createElement('div');
      wrap.id = 'mw-au-layers';
      wrap.setAttribute('aria-hidden', 'true');
      town = document.createElement('div');
      town.className = 'mw-au-town';
      wrap.appendChild(town);
      document.body.insertBefore(wrap, document.body.firstChild);
    }

    function update() {
      ticking = false;
      if (!town || still) { return; }
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      town.style.transform = 'translate3d(0,' + (-Math.min(y * 0.04, 30)) + 'px,0)';
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }

    function start() {
      build();
      town = town || document.querySelector('.mw-au-town');
      if (!wired) {
        wired = true;
        window.addEventListener('scroll', onScroll, { passive: true });
      }
      update();
    }

    if (document.body) { start(); }
    document.addEventListener('DOMContentLoaded', start);
    window.addEventListener('load', start);
  } catch (err) {
    console.error('[Autumn town] failed:', err);
  }
})();
/* ===== Mini War Calculator =====
   Put this on any page:   <div id="mw-calc"></div>
   Optional:  <div id="mw-calc" data-factories="Factories" data-military="Military"></div>
   data-factories / data-military = the pages whose gallery cards list the buildings (default: Factories and Military).
   Tabs: Generals, Factories, Army.
   Factories and Army read the building pages live from the wiki (same stat boxes the Compare tool reads). */
mw.hook('wikipage.content').add(function ($content) {
  var $root = $content.find('#mw-calc');
  if (!$root.length || $root.data('ready')) return;
  $root.data('ready', true);

  var PAGES = { factories: $root.attr('data-factories') || 'Factories', military: $root.attr('data-military') || 'Military' };

  /* ---------- helpers ---------- */
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function fmt(n, d) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    var p = Math.pow(10, d === undefined ? 2 : d);
    return (Math.round(n * p) / p).toLocaleString();
  }
  function num(s) {
    s = String(s).replace(/,/g, '');
    var r = s.match(/(\d+(?:\.\d+)?)\s*[–—-]\s*(\d+(?:\.\d+)?)/);
    if (r) return (parseFloat(r[1]) + parseFloat(r[2])) / 2;
    var m = s.match(/-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  function seconds(s) {                       // "1m 30s", "28s", "2h" -> seconds
    s = String(s).toLowerCase(); var t = 0, any = false, m, re = /(\d+(?:\.\d+)?)\s*(d|h|m|s)/g;
    while ((m = re.exec(s))) { any = true; t += parseFloat(m[1]) * ({ d: 86400, h: 3600, m: 60, s: 1 }[m[2]]); }
    return any ? t : num(s);
  }
  function field(label, value, cb, step) {
    var w = el('label', 'mw-calc-field'); w.appendChild(el('span', '', label));
    var i = el('input'); i.type = 'number'; i.value = value; i.step = step || 'any'; i.min = 0;
    i.addEventListener('input', function () { cb(parseFloat(i.value) || 0); });
    w.appendChild(i); return w;
  }
  function sumField(label, cb, hint) {          // accepts "25" or "25+10+5": boosts add together
    var w = el('label', 'mw-calc-field'); w.appendChild(el('span', '', label));
    var i = el('input'); i.type = 'text'; i.value = '0'; i.placeholder = hint || 'e.g. 25+10';
    i.addEventListener('input', function () {
      var t = 0; i.value.split('+').forEach(function (x) { t += parseFloat(x) || 0; }); cb(t);
    });
    w.appendChild(i); return w;
  }
  function check(label, cb) {
    var w = el('label', 'mw-calc-check'), c = el('input'); c.type = 'checkbox';
    c.addEventListener('change', function () { cb(c.checked); });
    w.appendChild(c); w.appendChild(document.createTextNode(' ' + label)); return w;
  }
  function out(rows) {                        // rows: [[label, value], ...]
    var g = el('div', 'mw-calc-out');
    rows.forEach(function (r) {
      var c = el('div', 'mw-calc-chip'); c.appendChild(el('i', '', r[0])); c.appendChild(document.createTextNode(' ' + r[1])); g.appendChild(c);
    });
    return g;
  }
  function btn(text, fn, cls) { var b = el('button', 'mw-calc-btn ' + (cls || ''), text); b.type = 'button'; b.addEventListener('click', fn); return b; }

  /* ---------- shell ---------- */
  var shell = el('div', 'mw-calc');
  var tabs = el('div', 'mw-calc-tabs');
  var body = el('div', 'mw-calc-body');
  shell.appendChild(tabs); shell.appendChild(body);
  var TABS = [['gen', 'Generals'], ['fac', 'Factories'], ['army', 'Army']];
  var panels = {}, tabBtns = {};
  TABS.forEach(function (t) {
    var b = btn(t[1], function () { show(t[0]); }, 'mw-calc-tab'); tabBtns[t[0]] = b; tabs.appendChild(b);
    var p = el('div', 'mw-calc-panel'); p.style.display = 'none'; panels[t[0]] = p; body.appendChild(p);
  });
  var built = {};
  function show(k) {
    TABS.forEach(function (t) { panels[t[0]].style.display = t[0] === k ? '' : 'none'; tabBtns[t[0]].classList.toggle('is-on', t[0] === k); });
    if (!built[k]) { built[k] = true; ({ gen: buildGen, fac: buildFac, army: buildArmy })[k](panels[k]); }
  }

  /* ================= 2. GENERAL COMBOS ================= */
  var GENERALS = [
    ["Air General","Common",{"airDamage":5,"airSpeed":5}],["Farmer General","Common",{"productionTime":5,"civilians":5}],["Junior General","Common",{"troopDamage":10,"troopHealth":10}],
    ["Armored General","Uncommon",{"troopHealth":20,"vehicleHealth":5}],["Camo General","Uncommon",{"troopRange":10,"vehicleRange":10}],["Infantry General","Uncommon",{"troopDamage":15,"troopHealth":15}],["Senior General","Uncommon",{"troopHealth":20,"vehicleSpeed":10,"troopDamage":20}],
    ["Air Commander","Rare",{"airHealth":10,"airDamage":10,"healBoost":100}],["Nuclear Researcher","Rare",{"nuclearResearchSpeed":30,"researchSpeed":15,"rocketCooldown":-5}],["President","Rare",{"questLimit":1,"income":10,"civilians":10}],
    ["Crazy Scientist","Epic",{"scientistSlots":1,"researchSpeed":20,"vehicleSpeed":10}],["Dark Lord","Epic",{"vehicleDamage":10,"vehicleHealth":20,"conquerSpeed":50}],
    ["General of Doom","Legendary",{"vehicleDamage":20,"vehicleHealth":10,"conquerLimit":1,"civilians":10}],["Nuclear General","Legendary",{"troopHealth":10,"vehicleHealth":10,"nuclearRocketCooldown":-30,"rocketCooldown":-15}],["Rich Businessman","Legendary",{"productionTime":10,"income":10,"restockTime":-15}],
    ["Emperor","Mythic",{"airHealth":30,"civilians":20,"radioactiveChance":15,"productionTime":5,"conquerLimit":1}],["Empress","Mythic",{"vehicleHealth":25,"income":10,"civilians":25,"superChargeChance":15,"conquerLimit":1}],
    ["Death General","Secret",{"burnChance":20,"vehicleHealth":30,"builders":2,"conquerLimit":4}],["Shark Queen","Secret",{"vehicleHealth":50,"income":10,"civilians":30,"lifesteal":10,"conquerLimit":2}],["Toxic Overlord","Secret",{"vehicleHealth":20,"civilians":30,"radioactiveChance":10,"rocketLimit":2,"conquerLimit":1}],["Warlord","Secret",{"rocketLimit":5,"vehicleHealth":30,"civilians":30,"conquerLimit":2}],
    ["Alien General","Cosmic",{"alienMutationChance":20,"vehicleHealth":50,"civilians":40,"conquerLimit":3}],
    ["Airforce Elite General","Titan",{"airHealth":40,"income":5,"civilians":30,"airDamage":40,"conquerLimit":3}],["Angel Elite General","Titan",{"airHealth":40,"income":5,"civilians":30,"troopHealth":40,"vehicleHealth":40}],["Builder Elite General","Titan",{"restockTime":-30,"income":10,"builders":3,"buildSpeed":10,"researchSpeed":15,"civilians":50}],["Communication Elite General","Titan",{"troopRange":10,"civilians":30,"income":5,"vehicleSpeed":20,"conquerLimit":3}],["Corrupted General","Titan",{"productionTime":7.5,"income":5,"civilians":30,"allDamage":25,"allHealth":25}],["Mech Elite General","Titan",{"vehicleDamage":50,"vehicleHealth":30,"vehicleRange":10,"allSpeed":-10,"civilians":30,"conquerLimit":5}],["Necromancer General","Titan",{"productionTime":5,"income":10,"civilians":40,"lifesteal":5,"rocketLimit":3}],["Null General","Titan",{"productionTime":5,"income":5,"civilians":25,"allSpeed":5,"conquerLimit":4,"allDamage":30,"allHealth":30}],["Orbital Elite General","Titan",{"vehicleDamage":40,"income":5,"civilians":30,"airDamage":40,"conquerLimit":4}],["Rage Elite General","Titan",{"income":10,"civilians":40,"conquerLimit":3,"allDamage":40,"allSpeed":10}]
  ];
  var STATS = {
    income:['Income','%'],civilians:['Civilians',''],productionTime:['Production Speed','%'],troopHealth:['Troop Health','%'],troopDamage:['Troop Damage','%'],troopRange:['Troop Range','%'],
    vehicleHealth:['Vehicle Health','%'],vehicleDamage:['Vehicle Damage','%'],vehicleRange:['Vehicle Range','%'],vehicleSpeed:['Vehicle Speed','%'],airHealth:['Air Unit Health','%'],airDamage:['Air Unit Damage','%'],airSpeed:['Air Unit Speed','%'],
    allHealth:['All Health','%'],allDamage:['All Damage','%'],allSpeed:['All Speed','%'],lifesteal:['Lifesteal','%'],healBoost:['Med Heli Heal','%'],burnChance:['Burn Chance','%'],
    radioactiveChance:['Radioactive Mutation Chance','%'],superChargeChance:['Super Charge Chance','%'],alienMutationChance:['Alien Mutation','%'],conquerLimit:['Conquer Limit',''],conquerSpeed:['Conquer Speed','%'],
    buildSpeed:['Build Speed','%'],builders:['Builders',''],restockTime:['Restock Time','s'],researchSpeed:['Research Speed','%'],nuclearResearchSpeed:['Nuclear Research (Fallout)','%'],scientistSlots:['Research Slots',''],
    rocketCooldown:['Rocket Cooldown','s'],nuclearRocketCooldown:['Nuclear Rocket CD (Fallout)','s'],rocketLimit:['Rocket Limit',''],questLimit:['Quest Limit','']
  };
  var RARS = ['Common','Uncommon','Rare','Epic','Legendary','Mythic','Secret','Cosmic','Titan'];
  function signed(v, u) { var n = Math.round(v * 100) / 100; return (n > 0 ? '+' : '') + n + u; }
  function buildGen(p) {
    var picks = [null, null, null], selects = [], res = el('div');
    var slots = el('div', 'mw-calc-row');
    ['Slot 1', 'Slot 2', 'Slot 3'].forEach(function (lab, i) {
      var w = el('label', 'mw-calc-field'); w.appendChild(el('span', '', lab));
      var s = el('select'); selects.push(s); w.appendChild(s);
      s.addEventListener('change', function () { picks[i] = s.value === '' ? null : parseInt(s.value, 10); fill(); render(); });
      slots.appendChild(w);
    });
    function fill() {
      selects.forEach(function (s, i) {
        s.innerHTML = ''; s.appendChild(new Option('— none —', ''));
        RARS.forEach(function (r) {
          var g = document.createElement('optgroup'); g.label = r;
          GENERALS.forEach(function (x, idx) {
            if (x[1] !== r) return;
            var o = new Option(x[0], idx); o.disabled = picks.some(function (q, j) { return j !== i && q === idx; }); o.selected = picks[i] === idx; g.appendChild(o);
          });
          s.appendChild(g);
        });
      });
    }
    function render() {
      res.innerHTML = '';
      var chosen = picks.filter(function (x) { return x !== null; }).map(function (x) { return GENERALS[x]; });
      if (!chosen.length) { res.appendChild(el('div', 'mw-calc-hint', 'Pick up to three generals to see their combined bonuses.')); return; }
      var total = {};
      chosen.forEach(function (g) { Object.keys(g[2]).forEach(function (k) { total[k] = (total[k] || 0) + g[2][k]; }); });
      var t = el('table', 'mw-calc-table'), hr = el('tr'); hr.appendChild(el('th', '', 'Bonus'));
      chosen.forEach(function (g) { hr.appendChild(el('th', '', g[0])); }); hr.appendChild(el('th', 'is-total', 'Total')); t.appendChild(hr);
      Object.keys(STATS).forEach(function (k) {
        if (total[k] === undefined) return;
        var tr = el('tr'); tr.appendChild(el('td', '', STATS[k][0]));
        chosen.forEach(function (g) { tr.appendChild(el('td', '', g[2][k] !== undefined ? signed(g[2][k], STATS[k][1]) : '—')); });
        tr.appendChild(el('td', 'is-total', signed(total[k], STATS[k][1]))); t.appendChild(tr);
      });
      var wrap = el('div', 'mw-calc-scroll'); wrap.appendChild(t); res.appendChild(wrap);
      var eff = [['Troop Damage', ['troopDamage', 'allDamage']], ['Troop Health', ['troopHealth', 'allHealth']], ['Vehicle Damage', ['vehicleDamage', 'allDamage']], ['Vehicle Health', ['vehicleHealth', 'allHealth']], ['Vehicle Speed', ['vehicleSpeed', 'allSpeed']], ['Air Unit Damage', ['airDamage', 'allDamage']], ['Air Unit Health', ['airHealth', 'allHealth']], ['Air Unit Speed', ['airSpeed', 'allSpeed']]];
      var rows = [];
      eff.forEach(function (r) { var v = 0, has = false; r[1].forEach(function (k) { if (total[k] !== undefined) { v += total[k]; has = true; } }); if (has) rows.push([r[0], signed(v, '%')]); });
      if (rows.length) { res.appendChild(el('div', 'mw-calc-sub', 'Effective by unit type (All-bonuses added in)')); res.appendChild(out(rows)); }
    }
    slots.appendChild(btn('Clear', function () { picks = [null, null, null]; fill(); render(); }, 'mw-calc-go is-clear'));
    p.appendChild(slots); p.appendChild(res); fill(); render();
  }

  /* ================= wiki loading ================= */
  var cache = {};
  function api(page) {
    if (cache[page]) return cache[page];
    return (cache[page] = $.getJSON(mw.util.wikiScript('api'), { action: 'parse', page: page, prop: 'text', format: 'json', formatversion: 2, disablelimitreport: 1 })
      .then(function (r) { return new DOMParser().parseFromString(r.parse.text, 'text/html'); }));
  }
  function listPage(page) {                   // names of the buildings on a gallery page
    return api(page).then(function (doc) {
      var names = []; doc.querySelectorAll('.mw-gallery-card-name a').forEach(function (a) { var n = a.textContent.trim(); if (n && names.indexOf(n) === -1) names.push(n); });
      return names;
    });
  }
  function txt(root, sel) { var n = root.querySelector(sel); return n ? n.textContent.trim() : ''; }
  function building(name) {
    return api(name).then(function (doc) {
      var stats = {}; doc.querySelectorAll('.mw-detail-stat').forEach(function (e) { var l = txt(e, '.mw-detail-stat-label'); if (l) stats[l] = txt(e, '.mw-detail-stat-value'); });
      var units = [];
      doc.querySelectorAll('.mw-spawned-unit-card').forEach(function (e) {
        var u = { name: txt(e, '.mw-card-title'), stats: {} };
        e.querySelectorAll('.mw-headline-stat').forEach(function (s) { var l = txt(s, '.mw-headline-label'); if (l) u.stats[l] = txt(s, '.mw-headline-value'); });
        e.querySelectorAll('.mw-stat').forEach(function (s) { var l = txt(s, '.mw-stat-label'); if (l) u.stats[l] = txt(s, '.mw-stat-value'); });
        units.push(u);
      });
      return { name: name, stats: stats, units: units };
    });
  }
  function find(stats, re) { for (var k in stats) { if (re.test(k)) return stats[k]; } return null; }

  /* generic "pick buildings" list used by Factories and Army */
  function picker(p, pageName, onChange, loadingText) {
    var sel = el('select'), add = btn('Add', function () { if (sel.value) { onAdd(sel.value); } }, 'mw-calc-go');
    var row = el('div', 'mw-calc-row'); var w = el('label', 'mw-calc-field mw-calc-grow'); w.appendChild(el('span', '', 'Building')); w.appendChild(sel);
    row.appendChild(w); row.appendChild(add); p.appendChild(row);
    sel.appendChild(new Option(loadingText || 'Loading…', ''));
    var onAdd = function () {};
    listPage(pageName).then(function (names) {
      sel.innerHTML = ''; sel.appendChild(new Option('— choose a building —', ''));
      names.forEach(function (n) { sel.appendChild(new Option(n, n)); });
      if (!names.length) sel.firstChild.textContent = 'No buildings found on "' + pageName + '"';
    }, function () { sel.innerHTML = ''; sel.appendChild(new Option('Could not load "' + pageName + '"', '')); });
    return { onAdd: function (f) { onAdd = f; } };
  }

  /* ================= 3. FACTORIES ================= */
  function buildFac(p) {
    var items = [];                           // { name, d, n }
    var boosts = { market: 0, extra: 0 };
    var boxes = el('div', 'mw-calc-boxes'), list = el('div', 'mw-calc-list'), res = el('div');
    var admin = false;
    boxes.appendChild(sumField('Market boost % (max 45)', function (v) { boosts.market = v; render(); }));
    boxes.appendChild(sumField('Other boosts % (statues, generals… add them: 10+25)', function (v) { boosts.extra = v; render(); }));
    boxes.appendChild(check('Admin Abuse is active (removes the market cap)', function (v) { admin = v; render(); }));
    var pk = picker(p, PAGES.factories, null);
    p.appendChild(boxes); p.appendChild(list); p.appendChild(res);
    p.appendChild(btn('Clear all', function () { items = []; render(); }, 'mw-calc-go is-clear'));
    pk.onAdd(function (name) {
      var ex = items.filter(function (i) { return i.name === name; })[0];
      if (ex) { ex.n++; render(); return; }
      var it = { name: name, d: null, n: 1 }; items.push(it); render();
      building(name).then(function (d) { it.d = d; render(); });
    });
    function perSec(d) {
      var prod = find(d.stats, /production|income|output/i); if (!prod) return null;
      var m = /\(\s*([\d,.]+)\s*\/\s*s\s*\)/i.exec(prod); if (m) return parseFloat(m[1].replace(/,/g, ''));
      m = /([\d,.]+)\s*\/\s*([\d,.]+\s*[smhd]?)/i.exec(prod);
      if (m) { var t = seconds(/[smhd]/i.test(m[2]) ? m[2] : m[2] + 's'); if (t) return parseFloat(m[1].replace(/,/g, '')) / t; }
      var a = num(prod), cyc = find(d.stats, /grow time|cycle|production time/i), t2 = cyc ? seconds(cyc) : null;
      return (a !== null && t2) ? a / t2 : null;
    }
    function render() {
      list.innerHTML = ''; res.innerHTML = '';
      if (!items.length) { res.appendChild(el('div', 'mw-calc-hint', 'Add factories to see their output per second, minute and hour.')); return; }
      var mk = admin ? boosts.market : Math.min(boosts.market, 45), mult = 1 + (mk + boosts.extra) / 100, ps = 0, cost = 0, civ = 0, miss = [];
      items.forEach(function (it, idx) {
        var r = el('div', 'mw-calc-item'); r.appendChild(el('a', 'mw-calc-item-name', it.name)).href = mw.util.getUrl(it.name);
        if (!it.d) { r.appendChild(el('span', 'mw-calc-item-note', 'loading…')); }
        else {
          var s = perSec(it.d); if (s === null) { miss.push(it.name); r.appendChild(el('span', 'mw-calc-item-note', 'no production info found')); }
          else r.appendChild(el('span', 'mw-calc-item-note', fmt(s * mult, 3) + '/s each'));
          if (s !== null) ps += s * mult * it.n;
          var c = num(find(it.d.stats, /^cost/i) || ''); if (c !== null) cost += c * it.n;
          var cv = num(find(it.d.stats, /civilian/i) || ''); if (cv !== null) civ += cv * it.n;
        }
        r.appendChild(btn('−', function () { if (--it.n <= 0) items.splice(idx, 1); render(); }, 'mw-calc-mini'));
        r.appendChild(el('span', 'mw-calc-count', String(it.n)));
        r.appendChild(btn('+', function () { it.n++; render(); }, 'mw-calc-mini'));
        r.appendChild(btn('✕', function () { items.splice(idx, 1); render(); }, 'mw-calc-mini is-danger'));
        list.appendChild(r);
      });
      var rows = [['Per second', fmt(ps, 3)], ['Per minute', fmt(ps * 60)], ['Per hour', fmt(ps * 3600)], ['Per day', fmt(ps * 86400)], ['Total cost', '$' + fmt(cost, 0)], ['Civilian slots', fmt(civ, 0)]];
      if (ps > 0 && cost > 0) rows.push(['Payback (if output is cash)', fmt(cost / ps / 60, 1) + ' min']);
      res.appendChild(out(rows));
      if (miss.length) res.appendChild(el('div', 'mw-calc-hint', 'No production stat found for: ' + miss.join(', ') + '. They are left out of the totals.'));
    }
    render();
  }

  /* ================= 4. ARMY ================= */
  function buildArmy(p) {
    var items = [];                           // { name, d, units:[{u, qty}] }
    var boost = { dmg: 0, hp: 0 };
    var boxes = el('div', 'mw-calc-boxes'), list = el('div', 'mw-calc-list'), res = el('div');
    boxes.appendChild(sumField('Damage boosts % (general + statue + research: 20+10+5)', function (v) { boost.dmg = v; render(); }));
    boxes.appendChild(sumField('Health boosts % (add them: 20+10+5)', function (v) { boost.hp = v; render(); }));
    var pk = picker(p, PAGES.military, null);
    p.appendChild(boxes); p.appendChild(list); p.appendChild(res);
    p.appendChild(btn('Clear all', function () { items = []; render(); }, 'mw-calc-go is-clear'));
    pk.onAdd(function (name) {
      if (items.filter(function (i) { return i.name === name; }).length) return;
      var it = { name: name, d: null, units: [], n: 1 }; items.push(it); render();
      building(name).then(function (d) { it.d = d; it.units = d.units.map(function (u) { return { u: u, qty: 1 }; }); render(); });
    });
    function render() {
      list.innerHTML = ''; res.innerHTML = '';
      if (!items.length) { res.appendChild(el('div', 'mw-calc-hint', 'Add military buildings, then set how many of each unit you will have.')); return; }
      var HP = 0, DPS = 0, count = 0;
      items.forEach(function (it, idx) {
        var box = el('div', 'mw-calc-group'), head = el('div', 'mw-calc-item');
        head.appendChild(el('a', 'mw-calc-item-name', it.name)).href = mw.util.getUrl(it.name);
        if (!it.d) head.appendChild(el('span', 'mw-calc-item-note', 'loading…'));
        else {
          var st = num(find(it.d.stats, /^strength/i) || ''), ups = find(it.d.stats, /units per spawn/i), spt = find(it.d.stats, /spawn time/i);
          head.appendChild(el('span', 'mw-calc-item-note', (st !== null ? 'Strength ' + fmt(st, 0) + ' · ' : '') + (ups ? ups + ' units' : '') + (spt ? ' / ' + spt : '')));
        }
        head.appendChild(btn('−', function () { if (--it.n <= 0) items.splice(idx, 1); render(); }, 'mw-calc-mini'));
        head.appendChild(el('span', 'mw-calc-count', '×' + it.n));
        head.appendChild(btn('+', function () { it.n++; render(); }, 'mw-calc-mini'));
        head.appendChild(btn('✕', function () { items.splice(idx, 1); render(); }, 'mw-calc-mini is-danger'));
        box.appendChild(head);
        if (it.d && !it.units.length) box.appendChild(el('div', 'mw-calc-hint', 'This page has no spawned-unit cards.'));
        it.units.forEach(function (x) {
          var s = x.u.stats, hp = num(find(s, /health|hp/i) || ''), dmg = num(find(s, /^damage|dmg/i) || ''), cd = num(find(s, /cooldown|reload/i) || '');
          var r = el('div', 'mw-calc-item mw-calc-unit');
          r.appendChild(el('span', 'mw-calc-item-name', x.u.name));
          var dps = (dmg !== null && cd) ? dmg * (1 + boost.dmg / 100) / cd : null, h = hp !== null ? hp * (1 + boost.hp / 100) : null;
          r.appendChild(el('span', 'mw-calc-item-note', (h !== null ? fmt(h, 0) + ' HP' : 'no HP') + ' · ' + (dps !== null ? fmt(dps, 1) + ' DPS' : 'no DPS')));
          var q = el('input', 'mw-calc-qty'); q.type = 'number'; q.min = 0; q.value = x.qty;
          q.addEventListener('input', function () { x.qty = Math.max(0, parseInt(q.value, 10) || 0); update(); });
          r.appendChild(q); box.appendChild(r);
          x._h = h; x._d = dps;
        });
        list.appendChild(box);
      });
      var summary = el('div'); res.appendChild(summary);
      function update() {
        HP = 0; DPS = 0; count = 0; var STR = 0;
        items.forEach(function (it) { if (it.d) { var sv = num(find(it.d.stats, /^strength/i) || ''); if (sv !== null) STR += sv * it.n; } it.units.forEach(function (x) { count += x.qty; if (x._h) HP += x._h * x.qty; if (x._d) DPS += x._d * x.qty; }); });
        summary.innerHTML = '';
        summary.appendChild(out([['Game Strength (buildings)', fmt(STR, 0)], ['Units', fmt(count, 0)], ['Total HP', fmt(HP, 0)], ['Total DPS', fmt(DPS, 1)], ['Power score (HP × DPS)', fmt(HP * DPS, 0)], ['Time to deal 100,000 dmg', DPS ? fmt(100000 / DPS, 1) + ' s' : '—']]));
        summary.appendChild(el('div', 'mw-calc-hint', 'Game Strength is the sum of each building\'s Strength stat × how many you have. Power score is a separate comparison number (HP × DPS).'));
      }
      update();
    }
    render();
  }

  $root.empty().append(shell);
  show('gen');
});
/* ===== Mini War Grid Planner =====
   Put this on any page:   <div id="mw-planner"></div>
   Optional: <div id="mw-planner" data-pages="Houses,Factories,Military" data-cols="128" data-rows="112"></div>
   data-pages = comma list of wiki pages whose gallery cards (.mw-gallery-card-name a) become the palette; each page is a tab.
   Size of a piece: read from the building page's stat box labelled Size / Footprint / Grid (like "4x4"), else 4x4.
   You can change any piece's size in the Selection panel; it is remembered in this browser.
   Drag from the palette onto the grid, drag pieces to move, R rotates, Delete removes, Ctrl+D duplicates, arrows nudge.
   Layouts autosave, and can be exported/imported or shared as a link (#plan=...). */
mw.hook('wikipage.content').add(function ($content) {
  var $root = $content.find('#mw-planner');
  if (!$root.length || $root.data('ready')) return;
  $root.data('ready', true);

  var COLS = parseInt($root.attr('data-cols'), 10) || 128, ROWS = parseInt($root.attr('data-rows'), 10) || 112;
  var PAGES = ($root.attr('data-pages') || 'Houses,Factories,Military').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  var KEY = 'mwPlanner1', SIZEKEY = 'mwPlannerSizes1';
  var CELL = 12, zoom = 1, snap = true;
  var pieces = [], sel = null, nextId = 1, defs = {}, imgs = {}, sizes = {}, drag = null, hover = null;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} return null; }
  sizes = store(SIZEKEY) || {};

  /* ---------- layout ---------- */
  $root.empty().addClass('mw-pl');
  var top = el('div', 'mw-pl-top');
  var title = el('div', 'mw-pl-title', 'Country Planner'); top.appendChild(title);
  var coord = el('div', 'mw-pl-coord', 'x 0 · y 0'); top.appendChild(coord);
  var count = el('div', 'mw-pl-count', '0 pieces'); top.appendChild(count);
  $root[0].appendChild(top);

  var bar = el('div', 'mw-pl-bar');
  function btn(label, cb, cls) { var b = el('button', 'mw-pl-btn' + (cls ? ' ' + cls : ''), label); b.type = 'button'; b.addEventListener('click', cb); bar.appendChild(b); return b; }
  var zoomOut = btn('−', function () { setZoom(zoom / 1.25); });
  var zoomTxt = el('span', 'mw-pl-zoom', '100%'); bar.appendChild(zoomTxt);
  var zoomIn = btn('+', function () { setZoom(zoom * 1.25); });
  btn('Fit Width', function () { setZoom((wrap.clientWidth - 2) / (COLS * CELL)); });
  var snapB = btn('Snap: On', function () { snap = !snap; snapB.textContent = 'Snap: ' + (snap ? 'On' : 'Off'); snapB.classList.toggle('is-off', !snap); });
  btn('Rotate', rotate); btn('Duplicate', dup); btn('Delete', del);
  btn('Export', exportPlan); btn('Import', importPlan); btn('Share Link', shareLink);
  btn('Clear', function () { if (pieces.length && confirm('Remove every piece from the grid?')) { pieces = []; sel = null; changed(); } }, 'is-clear');
  $root[0].appendChild(bar);

  var main = el('div', 'mw-pl-main');
  var side = el('div', 'mw-pl-side');
  var wrap = el('div', 'mw-pl-wrap');
  var canvas = el('canvas', 'mw-pl-canvas'); wrap.appendChild(canvas);
  main.appendChild(side); main.appendChild(wrap);
  var info = el('div', 'mw-pl-info');
  main.appendChild(info);
  $root[0].appendChild(main);
  var ctx = canvas.getContext('2d');

  /* ---------- palette ---------- */
  var tabs = el('div', 'mw-pl-tabs'), search = el('input', 'mw-pl-search'), list = el('div', 'mw-pl-list');
  search.placeholder = 'Search buildings…'; search.type = 'search';
  var palHead = el('div', 'mw-pl-h', 'Palette');
  side.appendChild(palHead); side.appendChild(search); side.appendChild(tabs); side.appendChild(list);
  var curTab = PAGES[0];
  var cache = {};
  function api(page) {
    return cache[page] || (cache[page] = $.getJSON(mw.util.wikiScript('api'), { action: 'parse', page: page, prop: 'text', format: 'json', formatversion: 2, disablelimitreport: 1 })
      .then(function (r) { return new DOMParser().parseFromString(r.parse.text, 'text/html'); }));
  }
  function loadImg(name, src) {
    if (imgs[name] || !src) return;
    var i = new Image(); i.crossOrigin = 'anonymous'; i.onload = function () { draw(); }; i.onerror = function () { var j = new Image(); j.onload = function () { imgs[name] = j; draw(); }; j.src = src; };
    imgs[name] = i; i.src = src;
  }
  function sizeOf(name) { var s = sizes[name] || (defs[name] && defs[name].size) || [4, 4]; return [s[0], s[1]]; }
  function loadCategory(page) {
    list.innerHTML = ''; list.appendChild(el('div', 'mw-pl-hint', 'Loading…'));
    api(page).then(function (doc) {
      var cards = doc.querySelectorAll('.mw-gallery-card');
      list.innerHTML = '';
      var tier = '';
      Array.prototype.forEach.call(cards, function (c) {
        var a = c.querySelector('.mw-gallery-card-name a'); if (!a) return;
        var name = (a.getAttribute('title') || a.textContent).trim();
        var im = c.querySelector('img'); var src = im ? (im.getAttribute('data-src') || im.getAttribute('src')) : '';
        if (src && src.indexOf('data:') === 0) src = im.getAttribute('data-src') || '';
        if (!defs[name]) defs[name] = { name: name, src: src, page: page };
        defs[name].src = defs[name].src || src;
        loadImg(name, defs[name].src);
        var it = el('div', 'mw-pl-item'); it.setAttribute('data-name', name); it.draggable = false;
        var th = el('div', 'mw-pl-thumb'); if (defs[name].src) { var ii = el('img'); ii.src = defs[name].src; ii.draggable = false; th.appendChild(ii); }
        it.appendChild(th); it.appendChild(el('div', 'mw-pl-iname', name));
        var sz = sizeOf(name); it.appendChild(el('div', 'mw-pl-isize', sz[0] + '×' + sz[1]));
        it.addEventListener('pointerdown', function (e) { e.preventDefault(); startDrag({ kind: 'new', name: name }, e); });
        it.addEventListener('dblclick', function () { addPiece(name, 2, 2); });
        list.appendChild(it);
        fetchSize(name);
      });
      if (!list.children.length) list.appendChild(el('div', 'mw-pl-hint', 'No buildings found on ' + page + '.'));
      applySearch();
    }, function () { list.innerHTML = ''; list.appendChild(el('div', 'mw-pl-hint', 'Could not load ' + page + '.')); });
  }
  function fetchSize(name) {
    if (defs[name].sizeTried) return; defs[name].sizeTried = true;
    api(name).then(function (doc) {
      Array.prototype.forEach.call(doc.querySelectorAll('.mw-detail-stat'), function (s) {
        var l = s.querySelector('.mw-detail-stat-label'), v = s.querySelector('.mw-detail-stat-value');
        if (!l || !v) return;
        var lab = l.textContent.trim(), val = v.textContent.trim(), d = defs[name];
        if (/^(size|footprint|grid|plot)/i.test(lab)) {
          var m = /(\d+)\s*[x×*]\s*(\d+)/i.exec(val);
          if (m) { d.size = [parseInt(m[1], 10), parseInt(m[2], 10)]; draw(); }
        } else if (/^jobs?$/i.test(lab)) { d.jobs = toNum(val); }
        else if (/^military slots?$/i.test(lab)) { d.slots = toNum(val); }
        else if (/^(civilians?|housing|population)/i.test(lab)) { d.civ = toNum(val); }
        else if (/prod|income|output|generat|earn/i.test(lab) && !d.prod) {
          var ps = perSec(val); if (ps !== null) d.prod = { label: lab, perSec: ps, text: val };
        }
      });
      refreshExtra();
    }, function () {});
  }
  function applySearch() {
    var q = search.value.trim().toLowerCase();
    Array.prototype.forEach.call(list.querySelectorAll('.mw-pl-item'), function (i) { i.style.display = !q || i.getAttribute('data-name').toLowerCase().indexOf(q) > -1 ? '' : 'none'; });
  }
  search.addEventListener('input', applySearch);
  PAGES.forEach(function (p) {
    var t = el('button', 'mw-pl-tab' + (p === curTab ? ' is-on' : ''), p); t.type = 'button';
    t.addEventListener('click', function () { curTab = p; Array.prototype.forEach.call(tabs.children, function (x) { x.classList.toggle('is-on', x === t); }); loadCategory(p); });
    tabs.appendChild(t);
  });
  loadCategory(curTab);

  /* ---------- pieces ---------- */
  function colorFor(name) { var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360; return 'hsl(' + h + ',55%,38%)'; }
  function addPiece(name, x, y) {
    var s = sizeOf(name);
    var p = { id: nextId++, name: name, x: Math.max(0, Math.min(COLS - s[0], x)), y: Math.max(0, Math.min(ROWS - s[1], y)), w: s[0], h: s[1] };
    pieces.push(p); sel = p; changed(); return p;
  }
  function hits(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
  function overlaps(p) { return pieces.some(function (q) { return q !== p && hits(p, q); }); }
  function rotate() { if (!sel) return; var t = sel.w; sel.w = sel.h; sel.h = t; clamp(sel); changed(); }
  function del() { if (!sel) return; pieces = pieces.filter(function (p) { return p !== sel; }); sel = null; changed(); }
  function dup() { if (!sel) return; var c = { id: nextId++, name: sel.name, x: sel.x + sel.w, y: sel.y, w: sel.w, h: sel.h }; clamp(c); pieces.push(c); sel = c; changed(); }
  function clamp(p) { p.x = Math.max(0, Math.min(COLS - p.w, p.x)); p.y = Math.max(0, Math.min(ROWS - p.h, p.y)); }

  /* ---------- drawing ---------- */
  function setZoom(z) {
    zoom = Math.max(0.25, Math.min(4, z));
    var px = CELL * zoom, dpr = window.devicePixelRatio || 1;
    canvas.style.width = COLS * px + 'px'; canvas.style.height = ROWS * px + 'px';
    canvas.width = Math.round(COLS * px * dpr); canvas.height = Math.round(ROWS * px * dpr);
    zoomTxt.textContent = Math.round(zoom * 100) + '%'; draw();
  }
  function draw() {
    var dpr = window.devicePixelRatio || 1, px = CELL * zoom * dpr, W = canvas.width, H = canvas.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#1b130d'; ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (var x = 0; x <= COLS; x++) { ctx.strokeStyle = x % 8 === 0 ? 'rgba(255,190,110,.28)' : 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.moveTo(Math.round(x * px) + .5, 0); ctx.lineTo(Math.round(x * px) + .5, H); ctx.stroke(); }
    for (var y = 0; y <= ROWS; y++) { ctx.strokeStyle = y % 8 === 0 ? 'rgba(255,190,110,.28)' : 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.moveTo(0, Math.round(y * px) + .5); ctx.lineTo(W, Math.round(y * px) + .5); ctx.stroke(); }
    pieces.forEach(function (p) { drawPiece(p, px, false); });
    if (drag && drag.ghost) drawPiece(drag.ghost, px, true);
  }
  function drawPiece(p, px, ghost) {
    var x = p.x * px, y = p.y * px, w = p.w * px, h = p.h * px, bad = ghost ? overlaps(p) : overlaps(p);
    ctx.save(); ctx.globalAlpha = ghost ? .75 : 1;
    ctx.fillStyle = bad ? 'rgba(200,40,30,.55)' : colorFor(p.name); ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
    var im = imgs[p.name];
    if (im && im.complete && im.naturalWidth) { var s = Math.min(w, h) * .86; try { ctx.drawImage(im, x + (w - s) / 2, y + (h - s) / 2, s, s); } catch (e) {} }
    ctx.strokeStyle = sel === p ? '#ffd23f' : 'rgba(255,255,255,.35)'; ctx.lineWidth = sel === p ? 3 : 1; ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    if (zoom >= .7 && w > 40) { ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(x + 2, y + h - 16 * dprOf(), w - 4, 14 * dprOf()); ctx.fillStyle = '#fff'; ctx.font = (10 * dprOf()) + 'px sans-serif'; ctx.textBaseline = 'middle'; ctx.fillText(p.name, x + 5, y + h - 9 * dprOf(), w - 10); }
    ctx.restore();
  }
  function dprOf() { return window.devicePixelRatio || 1; }

  /* ---------- pointer interaction ---------- */
  function cellAt(e) {
    var r = canvas.getBoundingClientRect(), px = CELL * zoom;
    return { x: (e.clientX - r.left) / px, y: (e.clientY - r.top) / px, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
  }
  function pieceAt(cx, cy) { for (var i = pieces.length - 1; i >= 0; i--) { var p = pieces[i]; if (cx >= p.x && cx < p.x + p.w && cy >= p.y && cy < p.y + p.h) return p; } return null; }
  function startDrag(d, e) {
    drag = d;
    if (d.kind === 'new') { var s = sizeOf(d.name); d.ghost = { name: d.name, x: -99, y: -99, w: s[0], h: s[1] }; d.offx = s[0] / 2; d.offy = s[1] / 2; }
    document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp);
  }
  canvas.addEventListener('pointerdown', function (e) {
    var c = cellAt(e), p = pieceAt(c.x, c.y);
    sel = p; updateInfo(); draw();
    if (p) { drag = { kind: 'move', piece: p, offx: c.x - p.x, offy: c.y - p.y, orig: { x: p.x, y: p.y } }; drag.ghost = null; document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp); e.preventDefault(); }
  });
  canvas.addEventListener('pointermove', function (e) { var c = cellAt(e); coord.textContent = 'x ' + Math.floor(c.x) + ' · y ' + Math.floor(c.y); });
  function place(o, c) { var nx = c.x - o.offx, ny = c.y - o.offy; if (snap) { nx = Math.round(nx); ny = Math.round(ny); } else { nx = Math.round(nx * 2) / 2; ny = Math.round(ny * 2) / 2; } return [nx, ny]; }
  function onMove(e) {
    if (!drag) return; var c = cellAt(e), t;
    if (drag.kind === 'new') { if (c.inside) { t = place(drag, c); drag.ghost.x = t[0]; drag.ghost.y = t[1]; clamp(drag.ghost); } else { drag.ghost.x = -99; drag.ghost.y = -99; } }
    else { t = place(drag, c); drag.piece.x = t[0]; drag.piece.y = t[1]; clamp(drag.piece); }
    draw();
  }
  function onUp(e) {
    document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp);
    if (!drag) return; var d = drag; drag = null;
    if (d.kind === 'new') { if (d.ghost.x >= 0) { var p = addPiece(d.name, d.ghost.x, d.ghost.y); } else draw(); }
    else changed();
  }
  document.addEventListener('keydown', function (e) {
    if (!sel || !document.body.contains($root[0])) return;
    var t = e.target && e.target.tagName; if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
    if (e.key === 'Delete' || e.key === 'Backspace') { del(); e.preventDefault(); }
    else if (e.key === 'r' || e.key === 'R') { rotate(); }
    else if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) { dup(); e.preventDefault(); }
    else if (/^Arrow/.test(e.key)) { var d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; sel.x += d[0]; sel.y += d[1]; clamp(sel); changed(); e.preventDefault(); }
  });

  /* ---------- info panel ---------- */
  function updateInfo() {
    info.innerHTML = '';
    info.appendChild(el('div', 'mw-pl-h', 'Selection'));
    if (!sel) { info.appendChild(el('div', 'mw-pl-hint', 'Click a piece to select it.')); }
    else {
      info.appendChild(el('div', 'mw-pl-selname', sel.name));
      info.appendChild(el('div', 'mw-pl-hint', 'Position ' + sel.x + ', ' + sel.y + (overlaps(sel) ? ' · overlapping!' : '')));
      var row = el('div', 'mw-pl-row');
      ['w', 'h'].forEach(function (k) {
        var l = el('label', 'mw-pl-lab'); l.appendChild(el('span', '', k === 'w' ? 'Width' : 'Height'));
        var i = el('input'); i.type = 'number'; i.min = 1; i.max = 64; i.value = sel[k];
        i.addEventListener('change', function () { sel[k] = Math.max(1, Math.min(64, parseInt(i.value, 10) || 1)); clamp(sel); changed(); });
        l.appendChild(i); row.appendChild(l);
      });
      info.appendChild(row);
      var save = el('button', 'mw-pl-btn', 'Use this size for every ' + sel.name); save.type = 'button';
      save.addEventListener('click', function () { sizes[sel.name] = [sel.w, sel.h]; store(SIZEKEY, sizes); pieces.forEach(function (p) { if (p.name === sel.name) { p.w = sel.w; p.h = sel.h; clamp(p); } }); changed(); loadCategoryKeep(); });
      info.appendChild(save);
    }
    var tally = {}; pieces.forEach(function (p) { tally[p.name] = (tally[p.name] || 0) + 1; });
    info.appendChild(el('div', 'mw-pl-h', 'Totals'));
    var names = Object.keys(tally).sort();
    if (!names.length) info.appendChild(el('div', 'mw-pl-hint', 'Nothing placed yet.'));
    names.forEach(function (n) { var r = el('div', 'mw-pl-tally'); r.appendChild(el('span', '', n)); r.appendChild(el('b', '', '×' + tally[n])); info.appendChild(r); });
    var bad = pieces.filter(overlaps).length;
    if (bad) info.appendChild(el('div', 'mw-pl-warn', bad + ' piece(s) overlap (shown in red).'));
    var used = 0; pieces.forEach(function (p) { used += p.w * p.h; });
    info.appendChild(el('div', 'mw-pl-hint', 'Grid ' + COLS + '×' + ROWS + ' · ' + used + ' cells used (' + (used / (COLS * ROWS) * 100).toFixed(1) + '%)'));
  }
  function loadCategoryKeep() { loadCategory(curTab); }

  /* ---------- save / share ---------- */
  function serialize() { return pieces.map(function (p) { return [p.name, p.x, p.y, p.w, p.h]; }); }
  function load(arr) { pieces = []; nextId = 1; (arr || []).forEach(function (a) { if (a && a.length >= 5) pieces.push({ id: nextId++, name: String(a[0]), x: +a[1], y: +a[2], w: +a[3], h: +a[4] }); }); sel = null; changed(true); }
  function changed(noSave) { count.textContent = pieces.length + (pieces.length === 1 ? ' piece' : ' pieces'); if (!noSave) store(KEY, serialize()); updateInfo(); refreshExtra(); draw(); }
  function exportPlan() {
    var txt = JSON.stringify({ cols: COLS, rows: ROWS, pieces: serialize(), research: research });
    var a = el('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); a.download = 'miniwar-plan.json'; document.body.appendChild(a); a.click(); a.remove();
  }
  function importPlan() {
    var f = el('input'); f.type = 'file'; f.accept = '.json,application/json';
    f.addEventListener('change', function () {
      var r = new FileReader(); r.onload = function () { try { var d = JSON.parse(r.result); if (d.research) { research = d.research; store(RKEY, research); renderResearch(); } load(d.pieces || d); } catch (e) { alert('That file is not a valid plan.'); } }; if (f.files[0]) r.readAsText(f.files[0]);
    }); f.click();
  }
  function shareLink() {
    var code = btoa(unescape(encodeURIComponent(JSON.stringify(serialize()))));
    var url = location.href.split('#')[0] + '#plan=' + code;
    try { history.replaceState(null, '', url); } catch (e) {}
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { alert('Link copied.'); }, function () { prompt('Copy this link:', url); }); else prompt('Copy this link:', url);
  }


  /* ---------- research, base stats, income breakdown ---------- */
  function toNum(t) { var m = /-?\d[\d,]*(?:\.\d+)?/.exec(String(t)); return m ? parseFloat(m[0].replace(/,/g, '')) : 0; }
  function perSec(t) {                       // "(1.5/s)", "90/min", "3,600/h", "2/s"
    t = String(t).replace(/,/g, '');
    var m = /\(?\s*(\d+(?:\.\d+)?)\s*(?:\/|per)\s*(s|sec|second|m|min|minute|h|hr|hour)\b/i.exec(t);
    if (!m) return null; var n = parseFloat(m[1]), u = m[2].toLowerCase()[0];
    return u === 's' ? n : u === 'm' ? n / 60 : n / 3600;
  }
  var EFFECTS = [
    ['income', 'Income %'], ['production', 'Production %'], ['market', 'Market %'], ['civilians', 'Civilians +'], ['builders', 'Builders +'],
    ['troops', 'Troop cap +'], ['rockets', 'Rockets +'], ['jobs', 'Jobs +'], ['cap', 'Conquer cap +'], ['gems', 'Gem income %']
  ];
  var effLabel = {}; EFFECTS.forEach(function (e) { effLabel[e[0]] = e[1]; });
  var RKEY = 'mwPlannerResearch1';
  var research = store(RKEY) || [
    { name: 'Bigger Conquer', eff: 'cap', val: 2, on: false },
    { name: 'Population', eff: 'civilians', val: 20, on: false },
    { name: 'Civilization', eff: 'civilians', val: 30, on: false },
    { name: 'Clan Builders', eff: 'builders', val: 2, on: false },
    { name: 'Clan Architects', eff: 'builders', val: 2, on: false }
  ];
  var BASE = { builders: 8, troops: 35, rockets: 6, civilians: 0, jobs: 0, cap: 0 };
  var extra = el('div', 'mw-pl-extra'); $root[0].appendChild(extra);
  var resBox = el('div', 'mw-pl-box'), statBox = el('div', 'mw-pl-box'), incBox = el('div', 'mw-pl-box mw-pl-wide');
  extra.appendChild(resBox); extra.appendChild(statBox); extra.appendChild(incBox);

  function bonus(eff) { var t = 0; research.forEach(function (r) { if (r.on && r.eff === eff) t += +r.val || 0; }); return t; }
  function renderResearch() {
    resBox.innerHTML = ''; resBox.appendChild(el('div', 'mw-pl-h', 'Research'));
    resBox.appendChild(el('div', 'mw-pl-hint', 'Tick what your clan has. Amounts are editable (use the % ones as whole numbers, e.g. 10 = +10%).'));
    research.forEach(function (r, i) {
      var row = el('div', 'mw-pl-rrow' + (r.on ? ' is-on' : ''));
      var c = el('input'); c.type = 'checkbox'; c.checked = r.on; c.addEventListener('change', function () { r.on = c.checked; store(RKEY, research); renderResearch(); refreshExtra(); });
      var n = el('span', 'mw-pl-rname', r.name);
      var v = el('input', 'mw-pl-rval'); v.type = 'number'; v.value = r.val; v.addEventListener('change', function () { r.val = parseFloat(v.value) || 0; store(RKEY, research); refreshExtra(); });
      var e = el('span', 'mw-pl-reff', effLabel[r.eff] || r.eff);
      var x = el('button', 'mw-pl-mini', '×'); x.type = 'button'; x.title = 'Remove'; x.addEventListener('click', function () { research.splice(i, 1); store(RKEY, research); renderResearch(); refreshExtra(); });
      row.appendChild(c); row.appendChild(n); row.appendChild(v); row.appendChild(e); row.appendChild(x); resBox.appendChild(row);
    });
    var add = el('div', 'mw-pl-radd');
    var nm = el('input'); nm.placeholder = 'New research name';
    var sl = el('select'); EFFECTS.forEach(function (e2) { var o = el('option', '', e2[1]); o.value = e2[0]; sl.appendChild(o); });
    var am = el('input'); am.type = 'number'; am.placeholder = 'Amount'; am.className = 'mw-pl-rval';
    var ab = el('button', 'mw-pl-btn', 'Add'); ab.type = 'button';
    ab.addEventListener('click', function () { if (!nm.value.trim()) return; research.push({ name: nm.value.trim(), eff: sl.value, val: parseFloat(am.value) || 0, on: true }); store(RKEY, research); renderResearch(); refreshExtra(); });
    add.appendChild(nm); add.appendChild(sl); add.appendChild(am); add.appendChild(ab); resBox.appendChild(add);
  }
  function fmtN(n, d) { return (Math.round(n * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).toLocaleString(); }
  function refreshExtra() {
    var tally = {}; pieces.forEach(function (p) { tally[p.name] = (tally[p.name] || 0) + 1; });
    var jobs = 0, slots = 0, civ = 0;
    Object.keys(tally).forEach(function (n) { var d = defs[n] || {}; jobs += (d.jobs || 0) * tally[n]; slots += (d.slots || 0) * tally[n]; civ += (d.civ || 0) * tally[n]; fetchSize(n); });
    statBox.innerHTML = ''; statBox.appendChild(el('div', 'mw-pl-h', 'Base Stats'));
    var rows = [
      ['Civilians', fmtN(civ + BASE.civilians + bonus('civilians'))],
      ['Jobs', fmtN(jobs + bonus('jobs'))],
      ['Builders cap', fmtN(BASE.builders + bonus('builders'))],
      ['Troops', fmtN(slots) + ' / ' + fmtN(BASE.troops + bonus('troops'))],
      ['Rockets cap', fmtN(BASE.rockets + bonus('rockets'))],
      ['Conquer cap bonus', '+' + fmtN(BASE.cap + bonus('cap'))]
    ];
    rows.forEach(function (r) { var d = el('div', 'mw-pl-tally'); d.appendChild(el('span', '', r[0])); d.appendChild(el('b', '', r[1])); statBox.appendChild(d); });
    var civNeeded = jobs, short = civNeeded - (civ + BASE.civilians + bonus('civilians'));
    if (jobs && short > 0) statBox.appendChild(el('div', 'mw-pl-warn', 'Not enough civilians: ' + fmtN(short) + ' jobs unfilled.'));
    statBox.appendChild(el('div', 'mw-pl-hint', 'Base caps (8 builders, 35 troops, 6 rockets) are the planner defaults. Civilians and jobs come from each building page\'s stat boxes.'));

    var mult = 1 + (bonus('income') + bonus('production')) / 100, mkt = 1 + bonus('market') / 100, gem = 1 + bonus('gems') / 100;
    incBox.innerHTML = ''; incBox.appendChild(el('div', 'mw-pl-h', 'Income Breakdown'));
    var tbl = el('table', 'mw-pl-table'), th = el('tr'); ['Building', 'Count', 'Each /s', 'Base /s', 'Boosted /s'].forEach(function (h) { th.appendChild(el('th', '', h)); }); tbl.appendChild(th);
    var tb = 0, tt = 0, missing = [];
    Object.keys(tally).sort().forEach(function (n) {
      var d = defs[n] || {}; if (!d.prod) { missing.push(n); return; }
      var m = /gem/i.test(d.prod.label + d.prod.text) ? gem : /market|money|cash|coin/i.test(d.prod.label + d.prod.text) ? mult * mkt : mult;
      var base = d.prod.perSec * tally[n], boosted = base * m; tb += base; tt += boosted;
      var tr = el('tr'); [n, '×' + tally[n], fmtN(d.prod.perSec, 2), fmtN(base, 2), fmtN(boosted, 2)].forEach(function (c) { tr.appendChild(el('td', '', c)); }); tbl.appendChild(tr);
    });
    var tr2 = el('tr', 'is-total'); ['Total', '', '', fmtN(tb, 2), fmtN(tt, 2)].forEach(function (c) { tr2.appendChild(el('td', '', c)); }); tbl.appendChild(tr2);
    if (pieces.length) incBox.appendChild(tbl); else incBox.appendChild(el('div', 'mw-pl-hint', 'Place buildings to see their income.'));
    var chips = el('div', 'mw-pl-chips');
    [['Per minute', tt * 60], ['Per hour', tt * 3600], ['Per day', tt * 86400]].forEach(function (c) { var d = el('div', 'mw-pl-chip', fmtN(c[1], 0)); d.appendChild(el('i', '', c[0])); chips.appendChild(d); });
    var bd = el('div', 'mw-pl-chip', '+' + fmtN((mult - 1) * 100, 1) + '%'); bd.appendChild(el('i', '', 'Income boost from research')); chips.appendChild(bd);
    incBox.appendChild(chips);
    if (missing.length) incBox.appendChild(el('div', 'mw-pl-hint', 'No production stat found yet for: ' + missing.join(', ') + '. Their page needs a stat box (Production / Income / Output) with a rate like "5/s".'));
    incBox.appendChild(el('div', 'mw-pl-hint', 'Boost = Income % + Production %. Market-type output also gets Market %, gem output gets Gem income %.'));
  }
  renderResearch();

  /* ---------- start ---------- */
  var fromLink = null; try { var m = /#plan=([^&]+)/.exec(location.hash); if (m) fromLink = JSON.parse(decodeURIComponent(escape(atob(m[1])))); } catch (e) {}
  setZoom(1); load(fromLink || store(KEY) || []);
  setTimeout(function () { if (wrap.clientWidth && wrap.clientWidth < COLS * CELL) setZoom((wrap.clientWidth - 2) / (COLS * CELL)); }, 0);
});