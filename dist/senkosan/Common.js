/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC configuration.
   The script itself is loaded through MediaWiki:ImportJS (dev:AjaxRC/code.js).
   The legacy importArticles() call was removed: that loader is retired on
   Fandom and silently never fetched the script, so the auto-refresh toggle
   never appeared. Keeping only the configuration variables here means the
   widget works again with no deprecated loader. */
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
    ];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;

/* ============================================================================
   SENKO-SAN DESIGN SYSTEM — TIER 2 : MAIN PAGE SCRIPT
   Target: MediaWiki:Common.js  (senkosan.fandom.com) — APPEND at the bottom.
   ----------------------------------------------------------------------------
   Scope gate: the script does nothing unless the Main Page markup exists, so
   it costs ~0 on the other 176 articles. No dependencies, no globals
   (IIFE), no third-party code, works on stock FandomDesktop.

   What it does:
     1. Spotlight rail: prev/next buttons for .snk-spot__track (desktop only;
        touch devices use native swipe and the buttons are hidden in CSS).
     2. Honours prefers-reduced-motion (uses instant scrolling instead).
   ============================================================================ */
(function () {
  'use strict';

  function init() {
    var track = document.querySelector('.snk-spot__track');
    var prev  = document.querySelector('.snk-spot__btn--prev');
    var next  = document.querySelector('.snk-spot__btn--next');
    if (!track || !prev || !next) { return; }   // not the Main Page

    var reduce = false;
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { /* older engine: default to smooth */ }

    /* One "page" of the rail: a card + its gap (0.8rem = 12.8px, use 14). */
    function step() {
      var card = track.querySelector('.snk-spot__card');
      if (card && card.getBoundingClientRect) {
        return card.getBoundingClientRect().width + 14;
      }
      return Math.round(track.clientWidth * 0.7) || 300;
    }

    function scrollByAmount(delta) {
      var behavior = reduce ? 'auto' : 'smooth';
      if (track.scrollBy) {
        try {
          track.scrollBy({ left: delta, behavior: behavior });
          return;
        } catch (e) { /* fall through */ }
      }
      /* Very old engines: instant jump. */
      track.scrollLeft += delta;
    }

    prev.addEventListener('click', function () { scrollByAmount(-step()); });
    next.addEventListener('click', function () { scrollByAmount(step()); });

    /* Keep the disabled state honest; rAF-throttled so 120Hz touch scroll
       streams don't hammer layout. */
    var ticking = false;
    function sync() {
      ticking = false;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >=
        (track.scrollWidth - track.clientWidth - 2);
    }
    track.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(sync);
        } else {
          window.setTimeout(sync, 60);
        }
      }
    }, { passive: true });

    window.addEventListener('resize', sync, { passive: true });
    sync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* ===== SAKURA PETAL FALL ===== */
(function() {
    if (document.getElementById('snk-petals')) return;
    var n = 18, box = document.createElement('div');
    box.id = 'snk-petals';
    box.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(box);
    for (var i = 0; i < n; i++) {
        var p = document.createElement('div');
        p.innerHTML = '🌸';
        p.style.cssText = 'position:absolute;top:-40px;font-size:' +
            (12 + Math.random() * 14) + 'px;opacity:' +
            (0.5 + Math.random() * 0.5) + ';left:' +
            (Math.random() * 100) + '%;animation:snkPetal ' +
            (8 + Math.random() * 8) + 's linear infinite;animation-delay:' +
            (Math.random() * 10) + 's;';
        box.appendChild(p);
    }
    var s = document.createElement('style');
    s.textContent = '@keyframes snkPetal{0%{transform:translateY(-40px) rotate(0deg);opacity:0.8}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}';
    document.head.appendChild(s);
})();
/* ===== PARALLAX BACKGROUND ===== */
(function() {
    var bg = document.body;
    window.addEventListener('scroll', function() {
        bg.style.backgroundPositionY = (window.scrollY / 3) + 'px';
    }, { passive: true });
})();