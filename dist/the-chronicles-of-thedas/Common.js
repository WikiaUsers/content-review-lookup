/* ============================================================
   THE CHRONICLES OF THEDAS — INTERACTIVE BEHAVIOUR  (Part 8)
   Vanilla JS · progressive enhancement · reduced-motion aware
   ============================================================ */
(function () {
  'use strict';

  var LS_KEY = 'coth:prefs';
  var prefs = readPrefs();
  function readPrefs(){ try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } }
  function writePrefs(){ try { localStorage.setItem(LS_KEY, JSON.stringify(prefs)); } catch (e) {} }
  function $all(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- 1 · scroll-reveal fallback ---------- */
  function scrollReveal(root){
    var sel = '.coth-reveal,.coth-reveal-l,.coth-reveal-r,.coth-reveal-zoom,.coth-stagger > *';
    if (!('IntersectionObserver' in window)) {
      $all(sel, root).forEach(function (el){ el.classList.add('coth-inview'); });
      return;
    }
    var io = new IntersectionObserver(function (entries){
      entries.forEach(function (en){
        if (en.isIntersecting){ en.target.classList.add('coth-inview'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    $all(sel, root).forEach(function (el, i){
      if (el.parentNode && el.parentNode.classList.contains('coth-stagger')) {
        el.style.transitionDelay = (i % 12) * 70 + 'ms';
      }
      io.observe(el);
    });
  }

  /* ---------- 2 · custom content tabs ---------- */
  function tabs(root){
    $all('.coth-tabs', root).forEach(function (box){
      if (box.dataset.cothReady) return; box.dataset.cothReady = '1';
      var panels = $all(':scope > .coth-tab', box);
      if (!panels.length) return;
      var nav = box.querySelector(':scope > .coth-tabs__nav');
      if (!nav){ nav = document.createElement('div'); nav.className = 'coth-tabs__nav'; box.insertBefore(nav, panels[0]); }
      nav.innerHTML = '';
      panels.forEach(function (panel, i){
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'coth-tabs__btn'; btn.setAttribute('role', 'tab');
        btn.textContent = panel.getAttribute('data-tab') || ('Tab ' + (i + 1));
        btn.addEventListener('click', function (){ activate(i); });
        nav.appendChild(btn);
      });
      function activate(idx){
        panels.forEach(function (p, i){ p.classList.toggle('coth-tab--active', i === idx); });
        $all('.coth-tabs__btn', nav).forEach(function (b, i){
          b.classList.toggle('coth-tabs__btn--active', i === idx);
          b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        });
      }
      activate(0);
    });
  }

  /* ---------- 3 · table filtering (sorting is native: class="wikitable sortable") ---------- */
  function filterTables(root){
    $all('table.coth-filter', root).forEach(function (tbl){
      if (tbl.dataset.cothReady) return; tbl.dataset.cothReady = '1';
      var box = document.createElement('div'); box.className = 'coth-filter__box';
      var input = document.createElement('input');
      input.type = 'search'; input.className = 'coth-filter__input';
      input.placeholder = tbl.getAttribute('data-filter-placeholder') || 'Filter this table…';
      box.appendChild(input);
      tbl.parentNode.insertBefore(box, tbl);
      var body = tbl.tBodies[0] || tbl;
      var rows = Array.prototype.slice.call(body.rows);
      input.addEventListener('input', function (){
        var q = input.value.trim().toLowerCase();
        rows.forEach(function (r){
          if (r.querySelector('th') && !r.querySelector('td')) return; // header row
          r.style.display = r.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 4 · faction / character selector ---------- */
  function selectors(root){
    $all('.coth-selector', root).forEach(function (sel){
      if (sel.dataset.cothReady) return; sel.dataset.cothReady = '1';
      var name = sel.getAttribute('data-target');
      var group = document.querySelector('[data-group="' + name + '"]');
      if (!group) return;
      var items = $all('[data-tags]', group);
      var btns = $all('[data-filter]', sel);
      function apply(filter){
        items.forEach(function (it){
          var tags = (it.getAttribute('data-tags') || '').toLowerCase().split(/\s+/);
          it.classList.toggle('coth-hidden', !(filter === 'all' || tags.indexOf(filter) !== -1));
        });
        btns.forEach(function (b){ b.classList.toggle('coth-selector__btn--active', b.getAttribute('data-filter').toLowerCase() === filter); });
      }
      btns.forEach(function (b){ b.addEventListener('click', function (){ apply(b.getAttribute('data-filter').toLowerCase()); }); });
      apply('all');
    });
  }

  /* ---------- 5 · spoiler enhancements ---------- */
  function spoilers(root){
    $all('.coth-spoiler__label', root).forEach(function (l){
      if (!l.hasAttribute('tabindex')) l.setAttribute('tabindex', '0');
      l.setAttribute('role', 'button');
      l.addEventListener('keydown', function (e){
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          var cb = l.parentNode.querySelector('input[type=checkbox]');
          if (cb){ cb.checked = !cb.checked; }
        }
      });
    });
    if (prefs.spoilersOpen) $all('.coth-spoiler > input[type=checkbox]', root).forEach(function (cb){ cb.checked = true; });
  }

  /* ---------- 6 · tooltips (focusable + edge flip) ---------- */
  function tooltips(root){
    $all('.coth-tip', root).forEach(function (t){
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
      t.addEventListener('mouseenter', flip); t.addEventListener('focus', flip);
      function flip(){ t.classList.toggle('coth-tip--below', t.getBoundingClientRect().top < 120); }
    });
  }

  /* ---------- 7 · randomised content ---------- */
  function randoms(root){
    $all('.coth-random', root).forEach(function (box){
      if (box.dataset.cothReady) return; box.dataset.cothReady = '1';
      var items = Array.prototype.slice.call(box.children).filter(function (c){ return !c.classList.contains('coth-random__reroll'); });
      if (!items.length) return;
      function pick(){ var idx = Math.floor(Math.random() * items.length);
        items.forEach(function (it, i){ it.style.display = i === idx ? '' : 'none'; }); }
      pick();
      if (box.classList.contains('coth-random--reroll')){
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'coth-random__reroll coth-btn coth-btn--ghost'; btn.textContent = '↻ Reroll';
        btn.addEventListener('click', pick); box.appendChild(btn);
      }
    });
  }

  /* ---------- 8 · preference toggles ---------- */
  function prefToggles(root){
    $all('.coth-pref-toggle[data-pref]', root).forEach(function (btn){
      if (btn.dataset.cothReady) return; btn.dataset.cothReady = '1';
      var key = btn.getAttribute('data-pref');
      reflect(btn, !!prefs[key]);
      btn.addEventListener('click', function (){ prefs[key] = !prefs[key]; writePrefs(); reflect(btn, !!prefs[key]); applyPref(key); });
    });
  }
  function reflect(btn, on){ btn.classList.toggle('coth-pref-toggle--on', on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
  function applyPref(key){
    if (key === 'reduceMotion') document.body.classList.toggle('coth-noanim', !!prefs.reduceMotion);
    if (key === 'spoilersOpen') $all('.coth-spoiler > input[type=checkbox]').forEach(function (cb){ cb.checked = !!prefs.spoilersOpen; });
  }

  /* ---------- 9 · chapter-nav keyboard shortcuts (← / →) ---------- */
  function chapterKeys(){
    document.addEventListener('keydown', function (e){
      var t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var nav = document.querySelector('.coth-chapternav'); if (!nav) return;
      var a = e.key === 'ArrowLeft'  ? nav.querySelector('.coth-chapternav__prev a')
            : e.key === 'ArrowRight' ? nav.querySelector('.coth-chapternav__next a') : null;
      if (a && a.href) window.location.href = a.href;
    });
  }

  /* ---------- 10 · back-to-top sigil ---------- */
  function backToTop(){
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'coth-backtotop'; btn.setAttribute('aria-label', 'Back to top'); btn.textContent = '❖';
    document.body.appendChild(btn);
    btn.addEventListener('click', function (){ window.scrollTo({ top: 0, behavior: prefs.reduceMotion ? 'auto' : 'smooth' }); });
    var onScroll = function (){ btn.classList.toggle('coth-backtotop--show', window.scrollY > 600); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- boot ---------- */
  function init(root){
    root = root || document;
    [scrollReveal, tabs, filterTables, selectors, spoilers, tooltips, randoms, prefToggles]
      .forEach(function (fn){ try { fn(root); } catch (e) { if (window.console) console.warn('COTH:', e); } });
  }
  function once(){
    if (prefs.reduceMotion) document.body.classList.add('coth-noanim');
    try { chapterKeys(); } catch (e) {}
    try { backToTop(); } catch (e) {}
  }

  // per-content (also fires on preview); once() for page-level bindings
  if (window.mw && mw.hook) mw.hook('wikipage.content').add(function ($c){ init($c && $c[0] ? $c[0] : document); });
  else if (document.readyState !== 'loading') init(document);
  else document.addEventListener('DOMContentLoaded', function (){ init(document); });

  if (document.readyState !== 'loading') once();
  else document.addEventListener('DOMContentLoaded', once);

  // small public API
  window.COTH = { getPref: function (k){ return prefs[k]; },
                  setPref: function (k, v){ prefs[k] = v; writePrefs(); applyPref(k); } };
})();