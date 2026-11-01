mw.hook('wikipage.content').add(function () {
	
  // EVENT TIMER
  
  function nowEST(offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 3600000);
  }
  function format(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${h}h ${m}m ${s}s`;
  }
  function updateTimer(box) {
    const offset = Number(box.dataset.timezone || -5);
    const now = nowEST(offset);
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const windows = [
      new Date(y, m, d, 0, 0, 0),
      new Date(y, m, d, 6, 0, 0),
      new Date(y, m, d, 12, 0, 0),
      new Date(y, m, d, 18, 0, 0)
    ];
    let start, end;
    for (const w of windows) {
      const e = new Date(w.getTime() + 10 * 60000);
      if (now < e) {
        start = w;
        end = e;
        break;
      }
    }
    if (!start) {
      start = new Date(y, m, d + 1, 0, 0, 0);
      end = new Date(start.getTime() + 10 * 60000);
    }
    const status = box.querySelector('.ga-event-status');
    const countdown = box.querySelector('.ga-event-countdown');
    if (now >= start && now < end) {
      status.textContent = 'Event is Active';
      status.style.color = '#6dff6d';
      status.style.textShadow = '0 0 8px #2aff2a';
      countdown.textContent = 'Time left: ' + format(end - now);
    } else {
      status.textContent = 'Event is Not Active';
      status.style.color = '#ff6d6d';
      status.style.textShadow = '0 0 8px #ff2a2a';
      countdown.textContent = 'Next Opening in: ' + format(start - now);
    }
  }
  document.querySelectorAll('.ga-event-timer').forEach(function (box) {
    updateTimer(box);
    setInterval(function () {
      updateTimer(box);
    }, 1000);
  });

});

// COLLAPSE TOGGLE
(function () {
  'use strict';

  function initCollapses() {
    document.querySelectorAll('.ga-collapse').forEach(function (box) {
      var header = box.querySelector('.ga-collapse-header');
      if (!header || box.dataset.collapseInit) return;
      box.dataset.collapseInit = '1';

      header.addEventListener('click', function () {
        box.classList.toggle('open');
      });
    });
  }

  initCollapses();

  var obs = new MutationObserver(initCollapses);
  obs.observe(document.body, { childList: true, subtree: true });
})();

// Category expand/collapse
$(function() {
  var $categories = $('.page-header__categories');
  var totalCategories = $categories.children('a').length;
  
  if (totalCategories > 3) {
    $categories.addClass('has-more');
    
    $categories.on('click', function(e) {
      if ($(e.target).is('.page-header__categories') || $(e.target).is('.page-header__categories::before')) {
        $(this).toggleClass('expanded');
      }
    });
  }
});

// ITEMBOX
mw.hook('wikipage.content').add(function ($content) {
  var RARITIES = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Aesir'];

  $content.find('.ga-item-grid').each(function () {
    var grid = this;
    if (grid.getAttribute('data-ga-ib-ready')) return;
    grid.setAttribute('data-ga-ib-ready', '1');

    var bar = document.createElement('div');
    bar.className = 'ga-ib-bar';

    var search = document.createElement('input');
    search.type = 'text';
    search.className = 'ga-ib-search';
    search.placeholder = 'Search Items';
    search.setAttribute('aria-label', 'Search Items');

    var filter = document.createElement('select');
    filter.className = 'ga-ib-filter';
    filter.setAttribute('aria-label', 'Filter');
    ['All'].concat(RARITIES).forEach(function (label) {
      var opt = document.createElement('option');
      opt.value = label.toLowerCase();
      opt.textContent = label;
      filter.appendChild(opt);
    });

    bar.appendChild(search);
    bar.appendChild(filter);
    grid.parentNode.insertBefore(bar, grid);

    function apply() {
      var query = search.value.trim().toLowerCase();
      var rarity = filter.value;
      $(grid).find('.ga-ib').each(function () {
        var nameEl = this.querySelector('.ga-ib-name');
        var name = nameEl ? nameEl.textContent.toLowerCase() : '';
        var m = /(?:^|\s)(common|rare|epic|legendary|mythical|aesir)-border(?:\s|$)/.exec(this.className);
        var itemRarity = m ? m[1] : '';
        var show = (!query || name.indexOf(query) !== -1) &&
                   (rarity === 'all' || itemRarity === rarity);
        this.style.display = show ? '' : 'none';
      });
    }

    search.addEventListener('input', apply);
    filter.addEventListener('change', apply);
  });

  $content.find('.ga-ib .tr-img-inner a').removeAttr('title');
});

(function () {
  if (window.gaItemBoxPopups) return;
  window.gaItemBoxPopups = true;
  document.documentElement.classList.add('ga-ib-js');

  var GAP = 8;
  var HIDE_DELAY = 120;
  var layer = null;
  var shown = null;
  var hideTimer = null;

  function itemOf(node) {
    return node && node.closest ? node.closest('.ga-ib') : null;
  }

  function place() {
    if (!shown || !layer || !layer.firstChild) return;
    if (!document.body.contains(shown)) { hide(); return; }
    var pop = layer.firstChild;
    var rect = shown.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var w = pop.offsetWidth;
    var h = pop.offsetHeight;
    var flip = rect.right + w > vw - GAP;
    var left = flip ? rect.left - w : rect.right;
    var top = rect.top + rect.height / 2 - h / 2;
    pop.classList.toggle('is-flip', flip);
    pop.style.left = Math.max(GAP, left) + 'px';
    pop.style.top = Math.max(GAP, Math.min(top, vh - h - GAP)) + 'px';
  }

  function show(item) {
    var source = item.querySelector('.ga-ib-pop');
    if (!source) return;
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'ga-ib-layer';
      layer.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
      layer.addEventListener('mouseleave', scheduleHide);
      document.body.appendChild(layer);
    }
    clearTimeout(hideTimer);
    shown = item;
    layer.innerHTML = '';
    layer.appendChild(source.cloneNode(true));
    place();
  }

  function hide() {
    if (layer) layer.innerHTML = '';
    shown = null;
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, HIDE_DELAY);
  }

  document.addEventListener('mouseover', function (e) {
    var item = itemOf(e.target);
    if (!item) return;
    if (item === shown) { clearTimeout(hideTimer); return; }
    show(item);
  });

  document.addEventListener('mouseout', function (e) {
    var item = itemOf(e.target);
    if (!item || item !== shown) return;
    if (itemOf(e.relatedTarget) === item) return;
    scheduleHide();
  });

  document.addEventListener('focusin', function (e) {
    var item = itemOf(e.target);
    if (item) show(item);
  });

  document.addEventListener('focusout', function (e) {
    var item = itemOf(e.target);
    if (item && item === shown) scheduleHide();
  });

  window.addEventListener('scroll', place, { capture: true, passive: true });
  window.addEventListener('resize', place);
})();