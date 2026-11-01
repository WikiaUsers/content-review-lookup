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
// testing
/* Theme button: switch between the Halloween theme and the classic look. Remembers the choice in the browser. */
(function () {
  var KEY = 'mwTheme';
  var root = document.documentElement;
  var btn, label;

  function read() {
    try { return localStorage.getItem(KEY) === 'classic' ? 'classic' : 'halloween'; } catch (e) { return 'halloween'; }
  }
  function save(t) {
    try { localStorage.setItem(KEY, t); } catch (e) {}
  }
  function apply(t) {
    if (t === 'classic') { root.classList.add('mw-classic'); } else { root.classList.remove('mw-classic'); }
    if (btn) {
      label.textContent = t === 'classic' ? 'Theme: Classic' : 'Theme: Halloween';
      btn.setAttribute('aria-pressed', t === 'halloween' ? 'true' : 'false');
      btn.title = t === 'classic' ? 'Switch to the Halloween theme' : 'Switch to the classic theme';
    }
  }

  apply(read());
  root.classList.add('mw-ready');

  function build() {
    if (document.getElementById('mw-theme-btn')) { return; }
    btn = document.createElement('button');
    btn.id = 'mw-theme-btn';
    btn.type = 'button';
    var dot = document.createElement('span');
    dot.className = 'mw-theme-dot';
    label = document.createElement('span');
    btn.appendChild(dot);
    btn.appendChild(label);
    btn.addEventListener('click', function () {
      var next = root.classList.contains('mw-classic') ? 'halloween' : 'classic';
      save(next);
      apply(next);
    });
    var slot = document.getElementById('mw-theme-slot');
    if (slot) { btn.className = 'mw-theme-inline'; slot.appendChild(btn); } else { document.body.appendChild(btn); }
    apply(read());
  }

  window.addEventListener('storage', function (e) {
    if (e.key === KEY) { apply(read()); }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

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