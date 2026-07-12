(function () {
  'use strict';

  var ORIGINS = ["Jianghu", "Wudang Sect", "Shaolin Temple", "Beggars' Sect",
    "Condor School", "Villain Valley", "Liushan School", "Mingjian Manor",
    "Wuxian Sect", "Tianshan Sect", "Perpetual Sanctum", "Xuanhuo Cult", "Tianji Palace"];
  var MOVETYPES = ["Normal", "Special", "Mighty", "Unique"];

  function normalizeMoveType(raw) {
    if (!raw) return '';
    var v = raw.trim().toUpperCase();
    if (v === 'B' || v === 'N') return 'Normal';
    if (v === 'S') return 'Special';
    if (v === 'M') return 'Mighty';
    if (v === 'U') return 'Unique';
    return raw.trim(); // already a full word (or unrecognized) — pass through
  }

  function getPresentOrigins(cards) {
    var seen = {};
    cards.forEach(function (card) {
      var o = card.dataset.origin;
      if (o) seen[o] = true;
    });
    // keep them in the same intended order as ORIGINS when possible,
    // then append anything unexpected that still showed up in the data
    var ordered = ORIGINS.filter(function (o) { return seen[o]; });
    Object.keys(seen).forEach(function (o) {
      if (ordered.indexOf(o) === -1) ordered.push(o);
    });
    return ordered;
  }

  function el(tag, props, children) {
    var e = document.createElement(tag);
    if (props) {
      for (var k in props) {
        if (k === 'text') e.textContent = props[k];
        else e.setAttribute(k, props[k]);
      }
    }
    (children || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function buildSelect(id, options) {
    var sel = el('select', { class: 'wsk-select', id: id });
    sel.appendChild(el('option', { value: '', text: 'All' }));
    options.forEach(function (o) {
      sel.appendChild(el('option', { value: o, text: o }));
    });
    return sel;
  }

  function buildFilterBar(mount, presentOrigins) {
    var bar = el('div', { class: 'wsk-filterbar' });

    var searchGroup = el('div', { class: 'wsk-filter-group' });
    searchGroup.appendChild(el('div', { class: 'wsk-filter-label', text: 'Search by name' }));
    var searchInput = el('input', {
      class: 'wsk-search', id: 'wskSearch', type: 'text',
      placeholder: 'Type a skill name...'
    });
    searchGroup.appendChild(searchInput);

    var moveGroup = el('div', { class: 'wsk-filter-group' });
    moveGroup.appendChild(el('div', { class: 'wsk-filter-label', text: 'Move Type' }));
    var moveSelect = buildSelect('wskMoveType', MOVETYPES);
    moveGroup.appendChild(moveSelect);

    var originGroup = el('div', { class: 'wsk-filter-group' });
    originGroup.appendChild(el('div', { class: 'wsk-filter-label', text: 'Origin' }));
    var originSelect = buildSelect('wskOrigin', presentOrigins);
    originGroup.appendChild(originSelect);

    bar.appendChild(searchGroup);
    bar.appendChild(moveGroup);
    bar.appendChild(originGroup);

    var noResults = el('div', {
      class: 'wsk-no-results', id: 'wskNoResults', style: 'display:none;',
      text: 'No skills match the current filters.'
    });

    mount.appendChild(bar);
    mount.appendChild(noResults);

    return { searchInput: searchInput, moveSelect: moveSelect, originSelect: originSelect, noResults: noResults };
  }

  function initFilterBar() {
    var mount = document.getElementById('wsk-filterbar-mount');
    if (!mount) return; // not on this page

    var cards = document.querySelectorAll('.wsk-card');
    var presentOrigins = getPresentOrigins(Array.prototype.slice.call(cards));
    var ctrl = buildFilterBar(mount, presentOrigins);

    function applyFilters() {
      var term = ctrl.searchInput.value.trim().toLowerCase();
      var activeMoveType = ctrl.moveSelect.value;
      var activeOrigin = ctrl.originSelect.value;
      var visibleCount = 0;

      cards.forEach(function (card) {
        var name = (card.dataset.name || '').toLowerCase();
        var nameMatch = term === '' || name.indexOf(term) !== -1;
        var moveMatch = !activeMoveType || normalizeMoveType(card.dataset.movetype) === activeMoveType;
        var originMatch = !activeOrigin || card.dataset.origin === activeOrigin;
        var show = nameMatch && moveMatch && originMatch;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      ctrl.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    ctrl.searchInput.addEventListener('input', applyFilters);
    ctrl.moveSelect.addEventListener('change', applyFilters);
    ctrl.originSelect.addEventListener('change', applyFilters);
  }

  var TERM_SELECTOR = '[class^="Skilltool-"], [class*=" Skilltool-"], ' +
                       '[class^="SkilltoolLowplus-"], [class*=" SkilltoolLowplus-"], ' +
                       '[class^="SkilltoolLowminus-"], [class*=" SkilltoolLowminus-"]';

  function initTooltipFix() {
    var killStyle = document.createElement('style');
    killStyle.textContent =
      '[class^="Skilltool-"]::after, [class*=" Skilltool-"]::after,' +
      '[class^="SkilltoolLowplus-"]::after, [class*=" SkilltoolLowplus-"]::after,' +
      '[class^="SkilltoolLowminus-"]::after, [class*=" SkilltoolLowminus-"]::after' +
      '{ display:none !important; opacity:0 !important; }';
    document.head.appendChild(killStyle);

    var tip = document.createElement('div');
    tip.id = 'wsk-tooltip-portal';
    tip.style.position = 'fixed';
    tip.style.pointerEvents = 'none';
    tip.style.backgroundSize = 'contain';
    tip.style.backgroundRepeat = 'no-repeat';
    tip.style.backgroundPosition = 'center';
    tip.style.opacity = '0';
    tip.style.display = 'none';
    tip.style.transition = 'opacity .12s ease';
    tip.style.zIndex = '9999';
    tip.style.border = 'none';
    tip.style.borderRadius = '0';
    document.body.appendChild(tip);

    var hideTimer = null;
    var currentEl = null;

    function sizeFor(el) {
      var cls = el.className || '';
      if (/(^|\s)Skilltool-/.test(cls)) return { w: 400, h: 300 };
      return { w: 400, h: 400 };
    }

    function positionTip(el, size) {
      var rect = el.getBoundingClientRect();
      var margin = 8;
      var left = rect.left + rect.width / 2 - size.w / 2;
      var top = rect.bottom + margin;

      left = Math.max(margin, Math.min(left, window.innerWidth - size.w - margin));

      if (top + size.h > window.innerHeight - margin) {
        var above = rect.top - size.h - margin;
        top = above > margin ? above : Math.max(margin, window.innerHeight - size.h - margin);
      }

      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
    }

    function showTip(el) {
      var computed = window.getComputedStyle(el, '::after');
      var bg = computed.backgroundImage;
      if (!bg || bg === 'none') return;

      clearTimeout(hideTimer);
      currentEl = el;
      var size = sizeFor(el);
      tip.style.width = size.w + 'px';
      tip.style.height = size.h + 'px';
      tip.style.backgroundImage = bg;
      positionTip(el, size);
      tip.style.display = 'block';
      requestAnimationFrame(function () {
        tip.style.opacity = '1';
      });
    }

    function hideTip() {
      tip.style.opacity = '0';
      hideTimer = setTimeout(function () {
        tip.style.display = 'none';
        tip.style.backgroundImage = 'none';
        currentEl = null;
      }, 120);
    }

    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest(TERM_SELECTOR);
      if (el) showTip(el);
    });

    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest(TERM_SELECTOR);
      if (el) hideTip();
    });

    window.addEventListener('scroll', function () {
      if (currentEl && tip.style.display === 'block') {
        positionTip(currentEl, sizeFor(currentEl));
      }
    }, true);
    window.addEventListener('resize', function () {
      if (currentEl && tip.style.display === 'block') {
        positionTip(currentEl, sizeFor(currentEl));
      }
    });
  }

  function init() {
    initFilterBar();
    initTooltipFix();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// --------------------------------------------------------------------------------------------
// Make the whole ArtGrid clickable (icon is too small to hit reliably on its own)

(function () {
  'use strict';

  function initArtGridClickable() {
    var cells = document.querySelectorAll('.art-grid-icon-cell');

    cells.forEach(function (cell) {
      var link = cell.querySelector('a[href]');
      if (!link) return;

      var href = link.getAttribute('href');
      cell.style.cursor = 'pointer';

      cell.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        window.location.href = href;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArtGridClickable);
  } else {
    initArtGridClickable();
  }
})();

// --------------------------------------------------------------------------------------------
// Menu of All Items

(function () {
  'use strict';

  var LEVEL_ORDER = ["0","1","2","3","4","5","6","7","8","9","10"];

  function el(tag, props, children) {
    var e = document.createElement(tag);
    if (props) {
      for (var k in props) {
        if (k === 'text') e.textContent = props[k];
        else e.setAttribute(k, props[k]);
      }
    }
    (children || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function buildSelect(id, options, allLabel) {
    var sel = el('select', { class: 'wit-select', id: id });
    sel.appendChild(el('option', { value: '', text: allLabel || 'All' }));
    options.forEach(function (o) {
      sel.appendChild(el('option', { value: o, text: o }));
    });
    return sel;
  }

  function getPresentValues(cards, attr, preferredOrder) {
    var seen = {};
    cards.forEach(function (card) {
      var v = card.dataset[attr];
      if (v) seen[v] = true;
    });
    var ordered = (preferredOrder || []).filter(function (v) { return seen[v]; });
    Object.keys(seen).forEach(function (v) {
      if (ordered.indexOf(v) === -1) ordered.push(v);
    });
    return ordered;
  }

  function makeNoResults() {
    return el('div', {
      class: 'wit-no-results', id: 'witNoResults', style: 'display:none;',
      text: 'No items match the current filters.'
    });
  }

// --------------------------------------------------------------------------------------------
// Variant 1: Search + Type + Craftable

  function buildTypeCraftBar(mount, cards) {
    var bar = el('div', { class: 'wit-filterbar' });

    var searchGroup = el('div', { class: 'wit-filter-group' });
    searchGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Search by name' }));
    var searchInput = el('input', { class: 'wit-search', type: 'text', placeholder: 'Type an item name...' });
    searchGroup.appendChild(searchInput);

    var typeGroup = el('div', { class: 'wit-filter-group' });
    typeGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Type' }));
    var typeOptions = getPresentValues(cards, 'type', []);
    var typeSelect = buildSelect('witType', typeOptions);
    typeGroup.appendChild(typeSelect);

    var craftGroup = el('div', { class: 'wit-filter-group' });
    craftGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Craftable' }));
    var craftSelect = buildSelect('witCraftable', ['Yes', 'No']);
    craftGroup.appendChild(craftSelect);

    bar.appendChild(searchGroup);
    bar.appendChild(typeGroup);
    bar.appendChild(craftGroup);

    var noResults = makeNoResults();
    mount.appendChild(bar);
    mount.appendChild(noResults);

    function applyFilters() {
      var term = searchInput.value.trim().toLowerCase();
      var activeType = typeSelect.value;
      var activeCraft = craftSelect.value;
      var visible = 0;

      cards.forEach(function (card) {
        var name = (card.dataset.name || '').toLowerCase();
        var nameMatch = term === '' || name.indexOf(term) !== -1;
        var typeMatch = !activeType || card.dataset.type === activeType;
        var craftMatch = !activeCraft || card.dataset.craftable === activeCraft;
        var show = nameMatch && typeMatch && craftMatch;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', applyFilters);
    typeSelect.addEventListener('change', applyFilters);
    craftSelect.addEventListener('change', applyFilters);
  }

// --------------------------------------------------------------------------------------------
// Variant 2: Search + Required Level + Cost sort toggle

  function buildLevelCostBar(mount, cards) {
    var bar = el('div', { class: 'wit-filterbar' });

    var searchGroup = el('div', { class: 'wit-filter-group' });
    searchGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Search by name' }));
    var searchInput = el('input', { class: 'wit-search', type: 'text', placeholder: 'Type a recipe name...' });
    searchGroup.appendChild(searchInput);

    var levelGroup = el('div', { class: 'wit-filter-group' });
    levelGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Required Level' }));
    var levelOptions = getPresentValues(cards, 'level', LEVEL_ORDER);
    var levelSelect = buildSelect('witLevel', levelOptions);
    levelGroup.appendChild(levelSelect);

    var sortGroup = el('div', { class: 'wit-filter-group' });
    sortGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Sort by Cost' }));
    var sortToggle = el('div', { class: 'wit-sorttoggle' });
    var highBtn = el('div', { class: 'wit-sort-btn', text: 'Highest first' });
    var lowBtn = el('div', { class: 'wit-sort-btn', text: 'Lowest first' });
    sortToggle.appendChild(highBtn);
    sortToggle.appendChild(lowBtn);
    sortGroup.appendChild(sortToggle);

    bar.appendChild(searchGroup);
    bar.appendChild(levelGroup);
    bar.appendChild(sortGroup);

    var noResults = makeNoResults();
    mount.appendChild(bar);
    mount.appendChild(noResults);

    var originalOrder = cards.slice();
    var sortDirection = null; // null | 'asc' | 'desc'

    function applyFilters() {
      var term = searchInput.value.trim().toLowerCase();
      var activeLevel = levelSelect.value;
      var visible = 0;

      cards.forEach(function (card) {
        var name = (card.dataset.name || '').toLowerCase();
        var nameMatch = term === '' || name.indexOf(term) !== -1;
        var levelMatch = !activeLevel || card.dataset.level === activeLevel;
        var show = nameMatch && levelMatch;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    function applySort() {
      if (!originalOrder.length) return;
      var parent = originalOrder[0].parentNode;
      if (!parent) return;

      var ordered;
      if (sortDirection === null) {
        ordered = originalOrder;
      } else {
        ordered = originalOrder.slice().sort(function (a, b) {
          var costA = parseFloat(a.dataset.cost) || 0;
          var costB = parseFloat(b.dataset.cost) || 0;
          return sortDirection === 'desc' ? costB - costA : costA - costB;
        });
      }

      ordered.forEach(function (card) { parent.appendChild(card); });
    }

    function setSort(direction) {
      if (sortDirection === direction) {
        // Clicking the already-active button deselects it.
        sortDirection = null;
      } else {
        sortDirection = direction;
      }
      highBtn.classList.toggle('active', sortDirection === 'desc');
      lowBtn.classList.toggle('active', sortDirection === 'asc');
      applySort();
    }

    highBtn.addEventListener('click', function () { setSort('desc'); });
    lowBtn.addEventListener('click', function () { setSort('asc'); });

    searchInput.addEventListener('input', applyFilters);
    levelSelect.addEventListener('change', applyFilters);
  }

// --------------------------------------------------------------------------------------------
// Variant 3: Search only

  function buildSearchOnlyBar(mount, cards) {
    var bar = el('div', { class: 'wit-filterbar' });

    var searchGroup = el('div', { class: 'wit-filter-group' });
    searchGroup.appendChild(el('div', { class: 'wit-filter-label', text: 'Search by name' }));
    var searchInput = el('input', { class: 'wit-search', type: 'text', placeholder: 'Type an item name...' });
    searchGroup.appendChild(searchInput);

    bar.appendChild(searchGroup);

    var noResults = makeNoResults();
    mount.appendChild(bar);
    mount.appendChild(noResults);

    function applyFilters() {
      var term = searchInput.value.trim().toLowerCase();
      var visible = 0;

      cards.forEach(function (card) {
        var name = (card.dataset.name || '').toLowerCase();
        var show = term === '' || name.indexOf(term) !== -1;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', applyFilters);
  }

  function init() {
    var mount = document.getElementById('wit-filterbar-mount');
    if (!mount) return; // this page doesn't have an item table on it

    var cards = Array.prototype.slice.call(document.querySelectorAll('.wit-card'));
    var variant = mount.dataset.variant || 'search-only';

    if (variant === 'type-craft') {
      buildTypeCraftBar(mount, cards);
    } else if (variant === 'level-cost') {
      buildLevelCostBar(mount, cards);
    } else {
      buildSearchOnlyBar(mount, cards);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// --------------------------------------------------------------------------------------------
// Make the whole nav-seg-item tile clickable (icon is too small to hit reliably on its own)

(function () {
  'use strict';

  function initNavSegClickable() {
    var items = document.querySelectorAll('.nav-seg-item');

    items.forEach(function (item) {
      var link = item.querySelector('a[href]');
      if (!link) return;

      var href = link.getAttribute('href');
      item.style.cursor = 'pointer';

      item.addEventListener('click', function (e) {
        // If the click landed on (or inside) a real <a>, let it navigate
        // natively — no need to intervene, and this avoids double-navigation.
        if (e.target.closest('a')) return;

        window.location.href = href;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavSegClickable);
  } else {
    initNavSegClickable();
  }
})();