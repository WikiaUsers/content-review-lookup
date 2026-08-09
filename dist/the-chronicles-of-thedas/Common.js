/* ============================================================
   THE CHRONICLES OF THEDAS WIKI — COMMON.JS
   Interactive Behaviour

   Vanilla JS. Progressive enhancement. Reduced-motion aware.

   ------------------------------------------------------------
   THE RULE THIS FILE FOLLOWS
   ------------------------------------------------------------
   NOTHING HERE MAY BE THE ONLY WAY TO REACH CONTENT.

   Every behaviour below is an improvement on a page that
   already works without it. If this script fails to load —
   blocked, cached wrong, a syntax error in a later edit — the
   wiki must still be readable.

   That is why the tab handler ADDS a class before it hides
   anything: .coth-tabs--ready is the signal to Tabber.css that
   a nav now exists to reach the hidden panels with. Without
   the script, no class, no hiding, and every panel shows
   stacked. Worse than tabs, but readable.

   Anything added here should be checked the same way: turn the
   script off and see whether the page still gives up its
   content.

   ------------------------------------------------------------
   WHAT IS IN HERE
   ------------------------------------------------------------
    1  Scroll reveal fallback
    2  Custom tabs
    3  Table filtering
    4  Roster filtering
    5  Spoiler and seal accessibility
    6  Tooltip edge flip
    7  Randomised content
    8  Reader preferences
    9  Chapter keyboard navigation
   10  The reckoning (main page clock)
   11  Back to top

   Last Updated: Phase 1 — Codex Rebuild
   ============================================================ */

(function () {
    'use strict';

    var LS_KEY = 'coth:prefs';
    var prefs = readPrefs();

    function readPrefs() {
        try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
        catch (e) { return {}; }
    }

    function writePrefs() {
        try { localStorage.setItem(LS_KEY, JSON.stringify(prefs)); }
        catch (e) { /* private browsing, quota, disabled storage — not fatal */ }
    }

    function $all(sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    }

    /* ---------- 1 · SCROLL REVEAL FALLBACK ----------
       Modern engines do this in CSS with animation-timeline.
       This is only for the ones that cannot, and it must run
       even when IntersectionObserver is missing — in that case
       everything is revealed immediately, because invisible
       content is worse than un-animated content. */

    function scrollReveal(root) {
        var sel = '.coth-reveal, .coth-reveal-l, .coth-reveal-r, .coth-reveal-zoom, .coth-stagger > *';

        if (!('IntersectionObserver' in window)) {
            $all(sel, root).forEach(function (el) { el.classList.add('coth-inview'); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('coth-inview');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

        $all(sel, root).forEach(function (el, i) {
            if (el.parentNode && el.parentNode.classList.contains('coth-stagger')) {
                el.style.transitionDelay = (i % 12) * 70 + 'ms';
            }
            io.observe(el);
        });
    }

    /* ---------- 2 · CUSTOM TABS ----------
       Builds a nav from the data-tab attributes, then marks the
       container ready so the stylesheet may hide panels. The
       order matters: ready last, always. */

    function tabs(root) {
        $all('.coth-tabs', root).forEach(function (box) {
            if (box.dataset.cothReady) return;
            box.dataset.cothReady = '1';

            var panels = $all(':scope > .coth-tab', box);
            if (!panels.length) return;

            var nav = box.querySelector(':scope > .coth-tabs__nav');
            if (!nav) {
                nav = document.createElement('div');
                nav.className = 'coth-tabs__nav';
                nav.setAttribute('role', 'tablist');
                box.insertBefore(nav, panels[0]);
            }
            nav.innerHTML = '';

            panels.forEach(function (panel, i) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'coth-tabs__btn';
                btn.setAttribute('role', 'tab');
                btn.textContent = panel.getAttribute('data-tab') || ('Tab ' + (i + 1));
                btn.addEventListener('click', function () { activate(i); });
                btn.addEventListener('keydown', function (e) {
                    if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % panels.length); focusBtn((i + 1) % panels.length); }
                    if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + panels.length) % panels.length); focusBtn((i - 1 + panels.length) % panels.length); }
                });
                nav.appendChild(btn);
            });

            function focusBtn(idx) {
                var b = $all('.coth-tabs__btn', nav)[idx];
                if (b) b.focus();
            }

            function activate(idx) {
                panels.forEach(function (p, i) {
                    p.classList.toggle('coth-tab--active', i === idx);
                });
                $all('.coth-tabs__btn', nav).forEach(function (b, i) {
                    b.classList.toggle('coth-tabs__btn--active', i === idx);
                    b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
                    b.tabIndex = i === idx ? 0 : -1;
                });
            }

            activate(0);
            box.classList.add('coth-tabs--ready');
        });
    }

    /* ---------- 3 · TABLE FILTERING ----------
       Sorting is native: class="wikitable sortable".
       This adds a search box above any table marked
       class="wikitable coth-filter". */

    function filterTables(root) {
        $all('table.coth-filter', root).forEach(function (tbl) {
            if (tbl.dataset.cothReady) return;
            tbl.dataset.cothReady = '1';

            var box = document.createElement('div');
            box.className = 'coth-filter__box';

            var input = document.createElement('input');
            input.type = 'search';
            input.className = 'coth-filter__input';
            input.placeholder = tbl.getAttribute('data-filter-placeholder') || 'Search this table…';
            input.setAttribute('aria-label', input.placeholder);

            var count = document.createElement('span');
            count.className = 'coth-filter__count';

            box.appendChild(input);
            box.appendChild(count);
            tbl.parentNode.insertBefore(box, tbl);

            var body = tbl.tBodies[0] || tbl;
            var rows = Array.prototype.slice.call(body.rows).filter(function (r) {
                return !(r.querySelector('th') && !r.querySelector('td'));
            });

            input.addEventListener('input', function () {
                var q = input.value.trim().toLowerCase();
                var shown = 0;

                rows.forEach(function (r) {
                    var hit = r.textContent.toLowerCase().indexOf(q) !== -1;
                    r.style.display = hit ? '' : 'none';
                    if (hit) shown++;
                });

                /* Silence is confusing. A filter that matches
                   nothing should say so, not just empty the
                   table and leave the reader wondering. */
                count.textContent = q === '' ? '' :
                    (shown === 0 ? 'Nothing found' : shown + ' of ' + rows.length);
            });
        });
    }

    /* ---------- 4 · ROSTER FILTERING ----------
       A row of buttons that shows and hides tagged items.

       <div class="coth-selector" data-target="cast">
         <span data-filter="all">All</span>
         <span data-filter="warden">Wardens</span>
       </div>
       <div class="coth-grid" data-group="cast">
         <div class="coth-card" data-tags="warden human">...</div>
       </div>

       THE FILTERS ARE SPANS BECAUSE MEDIAWIKI FORBIDS <button>
       IN WIKITEXT. It is not on the sanitiser's permitted tag
       list, so a <button> written on a page is escaped and the
       reader sees the raw markup instead of a control.

       A span has none of a button's built-in behaviour, so
       this function has to supply all of it: the button role,
       a tab stop, and Enter/Space activation. Anything else on
       this wiki that wants a clickable control in wikitext has
       to do the same. */

    function selectors(root) {
        $all('.coth-selector', root).forEach(function (sel) {
            if (sel.dataset.cothReady) return;
            sel.dataset.cothReady = '1';

            var name = sel.getAttribute('data-target');
            var group = document.querySelector('[data-group="' + name + '"]');
            if (!group) return;

            var items = $all('[data-tags]', group);
            var btns = $all('[data-filter]', sel);

            function apply(filter) {
                items.forEach(function (it) {
                    var tags = (it.getAttribute('data-tags') || '').toLowerCase().split(/\s+/);
                    var hit = filter === 'all' || tags.indexOf(filter) !== -1;
                    it.classList.toggle('coth-hidden', !hit);
                });
                btns.forEach(function (b) {
                    var on = b.getAttribute('data-filter').toLowerCase() === filter;
                    b.classList.toggle('coth-selector__btn--active', on);
                    b.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
            }

            btns.forEach(function (b) {
                b.classList.add('coth-selector__btn');

                /* Everything a <button> would have given us free */
                if (b.tagName !== 'BUTTON') {
                    b.setAttribute('role', 'button');
                    if (!b.hasAttribute('tabindex')) b.setAttribute('tabindex', '0');
                }

                function activate() {
                    apply(b.getAttribute('data-filter').toLowerCase());
                }

                b.addEventListener('click', activate);
                b.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activate();
                    }
                });
            });

            apply('all');
        });
    }

    /* ---------- 5 · SPOILERS AND SEALS ----------
       The markup uses MediaWiki's custom-toggle pattern, which
       already handles the click. This adds what that pattern
       does not: keyboard access.

       The wax seal is a hover in CSS, which a keyboard cannot
       perform, so it is given a tabindex and opens on focus —
       the :focus-within rule in Miscellaneous.css does the
       rest. */

    function spoilers(root) {
        $all('.coth-spoiler__head', root).forEach(function (head) {
            if (!head.hasAttribute('tabindex')) head.setAttribute('tabindex', '0');
            head.setAttribute('role', 'button');

            head.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    head.click();
                }
            });
        });

        $all('.coth-rel-toggle', root).forEach(function (t) {
            if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
            t.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    t.click();
                }
            });
        });

        $all('.coth-sealed', root).forEach(function (s) {
            if (!s.hasAttribute('tabindex')) s.setAttribute('tabindex', '0');
            s.setAttribute('role', 'button');
            s.setAttribute('aria-label', 'Sealed content — activate to reveal');
        });

        if (prefs.spoilersOpen) {
            $all('.coth-spoiler.mw-collapsed .coth-spoiler__head', root)
                .forEach(function (h) { h.click(); });
        }
    }

    /* ---------- 6 · TOOLTIP EDGE FLIP ----------
       A tooltip near the top of the viewport opens upward into
       nothing. Flip it below instead. */

    function tooltips(root) {
        $all('.coth-tip', root).forEach(function (t) {
            if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');

            function flip() {
                t.classList.toggle('coth-tip--below', t.getBoundingClientRect().top < 140);
            }

            t.addEventListener('mouseenter', flip);
            t.addEventListener('focus', flip);
        });
    }

    /* ---------- 7 · RANDOMISED CONTENT ----------
       Shows one child at random. For a rotating passage in the
       Codex module on the main page.

       Every child is in the page source, so a reader with no
       script sees all of them — a longer module, not an empty
       one. */

    function randoms(root) {
        $all('.coth-random', root).forEach(function (box) {
            if (box.dataset.cothReady) return;
            box.dataset.cothReady = '1';

            var items = Array.prototype.slice.call(box.children).filter(function (c) {
                return !c.classList.contains('coth-random__reroll');
            });
            if (!items.length) return;

            function pick() {
                var idx = Math.floor(Math.random() * items.length);
                items.forEach(function (it, i) {
                    it.style.display = i === idx ? '' : 'none';
                });
            }

            pick();

            if (box.classList.contains('coth-random--reroll')) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'coth-random__reroll coth-btn coth-btn--ghost';
                btn.textContent = '\u21BB Another';
                btn.addEventListener('click', pick);
                box.appendChild(btn);
            }
        });
    }

    /* ---------- 8 · READER PREFERENCES ----------
       <span class="coth-pref-toggle" data-pref="reduceMotion">
         Reduce motion
       </span> */

    function prefToggles(root) {
        $all('.coth-pref-toggle[data-pref]', root).forEach(function (btn) {
            if (btn.dataset.cothReady) return;
            btn.dataset.cothReady = '1';

            var key = btn.getAttribute('data-pref');
            reflect(btn, !!prefs[key]);

            /* Written as a span in wikitext, for the same reason
               as the roster filters above. */
            if (btn.tagName !== 'BUTTON') {
                btn.setAttribute('role', 'button');
                if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
            }

            function toggle() {
                prefs[key] = !prefs[key];
                writePrefs();
                reflect(btn, !!prefs[key]);
                applyPref(key);
            }

            btn.addEventListener('click', toggle);
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                }
            });
        });
    }

    function reflect(btn, on) {
        btn.classList.toggle('coth-pref-toggle--on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    function applyPref(key) {
        if (key === 'reduceMotion') {
            document.body.classList.toggle('coth-noanim', !!prefs.reduceMotion);
        }
        if (key === 'spoilersOpen') {
            $all('.coth-spoiler' + (prefs.spoilersOpen ? '.mw-collapsed' : ':not(.mw-collapsed)') + ' .coth-spoiler__head')
                .forEach(function (h) { h.click(); });
        }
    }

    /* ---------- 9 · CHAPTER KEYBOARD NAVIGATION ----------
       Left and right arrows move between chapters, for reading
       a run of them in sequence.

       The guards are the whole point: no modifier keys, and
       never while the reader is in a field. Hijacking an arrow
       key inside a search box is genuinely infuriating. */

    function chapterKeys() {
        document.addEventListener('keydown', function (e) {
            var t = e.target;
            if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
            if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

            var nav = document.querySelector('.coth-chapternav');
            if (!nav) return;

            var a = e.key === 'ArrowLeft'  ? nav.querySelector('.coth-chapternav__prev a')
                  : e.key === 'ArrowRight' ? nav.querySelector('.coth-chapternav__next a')
                  : null;

            if (a && a.href) window.location.href = a.href;
        });
    }

    /* ---------- 10 · THE RECKONING ----------
       A live clock for the front cover. Pairs with
       Template:Clock.

       It only starts if the markup is on the page, so the
       interval does not run on the other four thousand pages
       that do not have a clock on them.

       It shows real local time. There is deliberately no
       conversion to the Thedas calendar here — inventing one
       is a fictional decision and it belongs in the template,
       where you can see it and change it, not buried in a
       script. */

    function clock() {
        var timeEl = document.getElementById('coth-clock-time');
        var dateEl = document.getElementById('coth-clock-date');
        if (!timeEl && !dateEl) return;

        function pad(n) { return String(n).padStart(2, '0'); }

        function tick() {
            var now = new Date();

            if (timeEl) {
                timeEl.textContent =
                    pad(now.getHours()) + ':' +
                    pad(now.getMinutes()) + ':' +
                    pad(now.getSeconds());
            }

            if (dateEl) {
                dateEl.textContent = now.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }

        tick();
        setInterval(tick, 1000);
    }

    /* ---------- 11 · BACK TO TOP ---------- */

    function backToTop() {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'coth-backtotop';
        btn.setAttribute('aria-label', 'Back to top');
        btn.textContent = '\u2756';
        document.body.appendChild(btn);

        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: prefs.reduceMotion ? 'auto' : 'smooth'
            });
        });

        var onScroll = function () {
            btn.classList.toggle('coth-backtotop--show', window.scrollY > 600);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- BOOT ----------
       init() runs per content block, so it also fires on edit
       preview. once() runs for page-level bindings that must
       not be attached twice.

       Each handler is wrapped, because one throwing must not
       take the other nine with it. */

    function init(root) {
        root = root || document;
        [scrollReveal, tabs, filterTables, selectors, spoilers, tooltips, randoms, prefToggles]
            .forEach(function (fn) {
                try { fn(root); }
                catch (e) { if (window.console) console.warn('COTH:', e); }
            });
    }

    function once() {
        if (prefs.reduceMotion) document.body.classList.add('coth-noanim');
        try { chapterKeys(); } catch (e) {}
        try { backToTop(); } catch (e) {}
        try { clock(); } catch (e) {}
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($c) {
            init($c && $c[0] ? $c[0] : document);
        });
    } else if (document.readyState !== 'loading') {
        init(document);
    } else {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    }

    if (document.readyState !== 'loading') once();
    else document.addEventListener('DOMContentLoaded', once);

    /* Small public API, for anything added later */
    window.COTH = {
        getPref: function (k) { return prefs[k]; },
        setPref: function (k, v) { prefs[k] = v; writePrefs(); applyPref(k); }
    };
})();