/* global mw, $ */
(function () {
  'use strict';

  // csak a cikk névtérben és ha van 4Story_skill doboz
  var $root = $('.skill-row').closest('table');
  if (!$root.length) return;

  // Kiinduló állapot: URL -> objektum
  function readQuery() {
    var q = Object.create(null);
    var s = window.location.search.slice(1).split('&');
    s.forEach(function (kv) {
      if (!kv) return;
      var p = kv.split('=');
      q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    return q;
  }
  var query = readQuery();

  // Olvasd be a kezdeti értéket: URL param (pl. ?s100=3), különben DOM szöveg
  function getVal($row) {
    var key = $row.data('skill');
    if (query[key] != null && query[key] !== '') {
      var n = parseInt(query[key], 10);
      if (!Number.isNaN(n)) return n;
    }
    return parseInt($row.find('.skill-val').text(), 10) || 0;
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  // Állapot felépítése
  var state = {};
  $('.skill-row').each(function () {
    var $row = $(this);
    var id   = $row.data('skill');       // pl. "s100"
    var max  = parseInt($row.data('max'), 10) || 0;
    var cost = parseInt($row.data('cost'), 10) || 1; // pontköltség / szint
    var sys  = parseInt($row.data('sys'), 10) || 0;  // rendszerpont / szint
    var tree = String($row.data('tree') || 'misc');  // atk/def/con

    state[id] = { val: clamp(getVal($row), 0, max), max: max, cost: cost, sys: sys, tree: tree, $row: $row };
    $row.find('.skill-val').text(state[id].val);
  });

  // Számolás és UI frissítés
  function recompute() {
    var used = 0, atk = 0, def = 0, con = 0;
    Object.keys(state).forEach(function (k) {
      var s = state[k];
      used += s.val * s.cost;
      var add = s.val * s.sys;
      if (s.tree === 'atk') atk += add;
      else if (s.tree === 'def') def += add;
      else con += add;
    });
    var remain = 76 - used;
    // Összegzés dobozok (ha vannak külön azonosítók)
    $('#sum-used').text(used);
    $('#sum-remain').text(remain);
    $('#sum-atk').text(atk);
    $('#sum-def').text(def);
    $('#sum-con').text(con);

    // Build típus 70% küszöbbel
    var total = atk + def + con;
    var build = 'Hibrid - Harcos';
    if (total > 0) {
      if (atk > total * 0.7) build = 'Támadás - Harcos';
      else if (def > total * 0.7) build = 'Védelem - Harcos';
      else if (con > total * 0.7) build = 'Kondíció - Harcos';
    }
    $('#sum-build').text(build);

    // Share-elhető URL létrehozása
    var params = [];
    Object.keys(state).forEach(function (k) {
      if (state[k].val > 0) params.push(encodeURIComponent(k) + '=' + state[k].val);
    });
    var url = location.pathname + (params.length ? '?' + params.join('&') : '');
    $('#share-url').attr('href', url).text(url);
  }

  // Eseménykezelők
  function bindRow(s) {
    var $r = s.$row;
    $r.find('.skill-inc').on('click', function () {
      s.val = clamp(s.val + 1, 0, s.max);
      $r.find('.skill-val').text(s.val);
      recompute();
    });
    $r.find('.skill-dec').on('click', function () {
      s.val = clamp(s.val - 1, 0, s.max);
      $r.find('.skill-val').text(s.val);
      recompute();
    });
  }
  Object.keys(state).forEach(function (k) { bindRow(state[k]); });

  // Kezdő számítás
  recompute();
})();