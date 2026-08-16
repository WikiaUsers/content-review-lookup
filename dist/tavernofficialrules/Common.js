/* ============================================================
   TAVERN — Official Rules page behaviour
   Paste into  MediaWiki:Common.js
   ------------------------------------------------------------
   • Exits immediately on any page without .tv-page, so it is
     completely inert everywhere else on the wiki.
   • No globals, no eval, no external loads, no innerHTML built
     from page data — every dynamic string goes in as textContent,
     so there is nothing to escape and nothing to inject.
   ============================================================ */
(function () {
  'use strict';

  /* ── tiny DOM builder: el('div.tv-chip', {data:{t:'ban'}}, 'Bans') ── */
  function el(spec, attrs, kids) {
    var bits = String(spec).split('.');
    var node = document.createElement(bits.shift() || 'div');
    if (bits.length) node.className = bits.join(' ');
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'data') {
          Object.keys(attrs.data).forEach(function (d) { node.dataset[d] = attrs.data[d]; });
        } else if (k === 'text') {
          node.textContent = attrs.text;
        } else if (k in node && k !== 'list') {
          node[k] = attrs[k];
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    (Array.isArray(kids) ? kids : kids == null ? [] : [kids]).forEach(function (k) {
      node.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    });
    return node;
  }

  var REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(node) {
    node.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
  }

  function init() {
    var page = document.querySelector('.tv-page');
    if (!page || page.dataset.tvReady) return;
    page.dataset.tvReady = '1';

    /* ══════════ toolbar — <input>/<button> cannot live in wikitext ══════════ */
    var mount = page.querySelector('.tv-toolbar');
    if (mount && !mount.children.length) {
      var KINDS = [['all', 'All rules'], ['mute', 'Chat mutes'], ['ban', 'Bans'],
                   ['allowed', 'Allowed'], ['staff', 'Case by case']];

      mount.appendChild(el('div.tv-search-wrap', null, [
        el('span.tv-search-i', { text: '⌕' }),
        el('input', {
          id: 'tv-search',
          type: 'search',
          autocomplete: 'off',
          spellcheck: false,
          'aria-label': 'Search rules',
          placeholder: 'Search rules, examples or punishments — try “loan”, “autoclicker”, “SC-06”'
        }),
        el('kbd', { text: '/' })
      ]));

      mount.appendChild(el('div.tv-chips', { role: 'group', 'aria-label': 'Filter rules' },
        KINDS.map(function (k) {
          return el('button.tv-chip' + (k[0] === 'all' ? '.on' : ''), {
            type: 'button',
            'aria-pressed': k[0] === 'all' ? 'true' : 'false',
            data: { t: k[0] },
            text: k[1]
          });
        })));

      mount.appendChild(el('span.tv-count', { 'aria-live': 'polite' }));
      mount.appendChild(el('div.tv-here', { 'aria-live': 'polite' }, [
        el('span.tv-here-n'),
        el('span.tv-here-txt', null, [el('b'), el('i')])
      ]));

      mount.parentNode.insertBefore(
        el('div.tv-empty', null, [
          'Nothing matches that. Press ', el('kbd', { text: 'Esc' }),
          ' to clear, or browse the sections below.'
        ]),
        mount.nextSibling
      );
    }

    var rules    = [].slice.call(page.querySelectorAll('.tv-rule'));
    var sections = [].slice.call(page.querySelectorAll('.tv-section'));
    var parts    = [].slice.call(page.querySelectorAll('.tv-part'));
    var search   = page.querySelector('#tv-search');
    var chips    = [].slice.call(page.querySelectorAll('.tv-chip'));
    var counter  = page.querySelector('.tv-count');
    var empty    = page.querySelector('.tv-empty');
    var kind     = 'all';

    /* drop-cap the opening paragraph of each section */
    sections.forEach(function (s) {
      var body = s.querySelector('.tv-secbody');
      if (!body) return;
      var lead = body.querySelector(':scope > p');
      if (lead && lead.textContent.trim().length > 60) lead.classList.add('tv-lead');
    });

    /* per-rule search index + copy-link anchor */
    rules.forEach(function (r) {
      var h = r.querySelector('.tv-rule-h');
      if (h && !h.querySelector('.tv-anchor')) {
        h.appendChild(el('a.tv-anchor', {
          href: '#' + r.id,
          title: 'Copy a link to this rule',
          text: '#'
        }));
      }
      r._txt = ((r.dataset.code || '') + ' ' + r.textContent)
        .toLowerCase().replace(/\s+/g, ' ');
    });

    /* ══════════ match highlighting, without wrecking the markup ══════════ */
    function clearMarks(el2) {
      el2.querySelectorAll('mark.tv-hit').forEach(function (m) {
        var p = m.parentNode;
        p.replaceChild(document.createTextNode(m.textContent), m);
        p.normalize();
      });
    }

    function mark(root, terms) {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var t = n.parentNode.nodeName;
          if (t === 'SCRIPT' || t === 'STYLE' || t === 'MARK') return NodeFilter.FILTER_REJECT;
          var low = n.nodeValue.toLowerCase();
          for (var i = 0; i < terms.length; i++) {
            if (low.indexOf(terms[i]) !== -1) return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      });
      var hits = [], n;
      while ((n = walker.nextNode())) hits.push(n);

      hits.forEach(function (node) {
        var txt = node.nodeValue, low = txt.toLowerCase();
        var frag = document.createDocumentFragment(), i = 0;
        while (i < txt.length) {
          var at = -1, len = 0;
          for (var ti = 0; ti < terms.length; ti++) {
            var p = low.indexOf(terms[ti], i);
            if (p === -1) { continue; }
            if (at === -1 || p < at || (p === at && terms[ti].length > len)) { at = p; len = terms[ti].length; }
          }
          if (at === -1) { break; }
          if (at > i) frag.appendChild(document.createTextNode(txt.slice(i, at)));
          frag.appendChild(el('mark.tv-hit', { text: txt.substr(at, len) }));
          i = at + len;
        }
        if (!frag.childNodes.length) return;
        frag.appendChild(document.createTextNode(txt.slice(i)));
        node.parentNode.replaceChild(frag, node);
      });
    }

    /* ══════════ filtering ══════════ */
    var lastKey = null;

    function terms(q) {
      return q.split(/\s+/).filter(function (t) { return t.length >= 2; });
    }

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase().replace(/\s+/g, ' ');
      var ts = terms(q);
      var filtering = Boolean(q) || kind !== 'all';
      var shown = 0;

      rules.forEach(function (r) {
        var ok = (kind === 'all' || r.dataset.kind === kind);
        if (ok && q) {
          ok = ts.length ?
            ts.every(function (t) { return r._txt.indexOf(t) !== -1; }) :
            r._txt.indexOf(q) !== -1;
        }
        r.classList.toggle('tv-hide', !ok);
        if (ok) { r.classList.add('tv-in'); shown++; }
      });

      var key = kind + ':' + q;
      if (key !== lastKey) {
        rules.forEach(clearMarks);
        if (ts.length) {
          rules.forEach(function (r) { if (!r.classList.contains('tv-hide')) mark(r, ts); });
        }
        lastKey = key;
      }

      sections.forEach(function (s) {
        s.classList.toggle('tv-hide', Boolean(filtering && !s.querySelector('.tv-rule:not(.tv-hide)')));
      });
      parts.forEach(function (p) { p.classList.toggle('tv-hide', Boolean(filtering)); });

      if (counter) {
        counter.textContent = filtering ?
          shown + ' of ' + rules.length + ' rules' :
          rules.length + ' rules';
      }
      if (empty) empty.classList.toggle('show', shown === 0);
      cursor = -1;
      writeState(q);
    }

    /* ══════════ shareable state in the URL ══════════ */
    function writeState(q) {
      if (!window.history || !history.replaceState) return;
      var p = new URLSearchParams(location.search);
      if (q) { p.set('q', q); } else { p.delete('q'); }
      if (kind !== 'all') { p.set('k', kind); } else { p.delete('k'); }
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + (location.hash || ''));
    }

    function readState() {
      var p = new URLSearchParams(location.search);
      if (p.get('q') && search) search.value = p.get('q');
      var k = p.get('k');
      if (k && chips.some(function (c) { return c.dataset.t === k; })) {
        kind = k;
        chips.forEach(function (c) { setChip(c, c.dataset.t === kind); });
      }
    }

    function setChip(c, on) {
      c.classList.toggle('on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    /* ══════════ input + keyboard ══════════ */
    var typing;
    if (search) {
      search.addEventListener('input', function () {
        clearTimeout(typing);
        typing = setTimeout(apply, 110);
      });
    }

    function isTyping() {
      var a = document.activeElement;
      return Boolean(a) && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.nodeName) || a.isContentEditable);
    }

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === '/' && search && !isTyping()) {
        e.preventDefault(); search.focus(); search.select(); return;
      }
      if (e.key === '?' && !isTyping()) { e.preventDefault(); toggleKeys(); return; }

      if (e.key === 'Escape') {
        if (keys) keys.classList.remove('show');
        if (search && document.activeElement === search) {
          search.value = ''; apply(); search.blur();
        }
        return;
      }
      if (!search) return;
      if (e.key === 'Enter' && document.activeElement === search) {
        e.preventDefault(); cursor = -1; step(1); return;
      }
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
          (document.activeElement === search || (search.value && !isTyping()))) {
        e.preventDefault(); step(e.key === 'ArrowDown' ? 1 : -1);
      }
    });

    /* ══════════ filter chips, with a ripple ══════════ */
    chips.forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (!REDUCE) {
          var box = c.getBoundingClientRect();
          var d = Math.max(box.width, box.height);
          var r = el('span.tv-ripple');
          r.style.width = r.style.height = d + 'px';
          r.style.left = (e.clientX - box.left - d / 2) + 'px';
          r.style.top  = (e.clientY - box.top  - d / 2) + 'px';
          c.appendChild(r);
          setTimeout(function () { r.remove(); }, 600);
        }
        kind = c.dataset.t;
        chips.forEach(function (x) { setChip(x, x === c); });
        apply();
      });
    });

    /* ══════════ toast — nodes only, never a built HTML string ══════════ */
    var toastEl = null, toastT;
    function toast(nodes) {
      if (!toastEl) {
        toastEl = el('div.tv-toast', { role: 'status', 'aria-live': 'polite' });
        document.body.appendChild(toastEl);
      }
      while (toastEl.firstChild) toastEl.removeChild(toastEl.firstChild);
      (Array.isArray(nodes) ? nodes : [nodes]).forEach(function (n) {
        toastEl.appendChild(typeof n === 'string' ? document.createTextNode(n) : n);
      });
      toastEl.classList.add('show');
      clearTimeout(toastT);
      toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 1900);
    }

    function flash(node) {
      node.classList.remove('tv-flash');
      void node.offsetWidth;
      node.classList.add('tv-flash');
    }

    /* ══════════ arrow-key stepping through results ══════════ */
    var cursor = -1;
    function step(dir) {
      var vis = rules.filter(function (r) { return !r.classList.contains('tv-hide'); });
      if (!vis.length) return;
      cursor = (cursor + dir + vis.length) % vis.length;
      var node = vis[cursor];
      goTo(node);
      flash(node);
      toast([
        el('b', { text: node.dataset.code || '' }),
        ' — ' + (cursor + 1) + ' of ' + vis.length
      ]);
    }

    /* ══════════ in-page links + copy-link anchors ══════════ */
    function copy(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () { return true; },
                                                        function () { return false; });
      }
      return Promise.resolve(false);
    }

    page.addEventListener('click', function (e) {
      if (!e.target.closest) return;

      var anc = e.target.closest('.tv-anchor');
      if (anc) {
        e.preventDefault();
        var href = anc.getAttribute('href') || '';
        var rule = anc.closest('.tv-rule');
        var url  = location.origin + location.pathname + href;
        if (history.replaceState) history.replaceState(null, '', href);
        var was = anc.textContent;
        anc.textContent = '✓';
        setTimeout(function () { anc.textContent = was; }, 1200);
        copy(url).then(function (ok) {
          toast(ok ?
            [ 'Link copied — ', el('b', { text: (rule && rule.id) || '' }) ] :
            [ el('b', { text: (rule && rule.id) || '' }), ' — copy the address bar to share this' ]);
        });
        return;
      }

      var a = e.target.closest('a[href^="#"]');
      if (a) {
        var dest = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
        if (dest) setTimeout(function () { flash(dest); }, 320);
      }
    });

    /* ══════════ "you are here" strip ══════════ */
    var here  = page.querySelector('.tv-here');
    var hereN = here && here.querySelector('.tv-here-n');
    var hereT = here && here.querySelector('.tv-here-txt b');
    var hereP = here && here.querySelector('.tv-here-txt i');
    var active = null;

    function setHere(sec) {
      if (!here || !sec || sec === active) return;
      active = sec;
      hereN.textContent = sec.dataset.n || '';
      hereT.textContent = sec.dataset.title || '';
      hereP.textContent = sec.dataset.part || '';
    }

    function tickHere() {
      if (!here) return;
      var first = sections[0];
      here.classList.toggle('show', Boolean(first && first.getBoundingClientRect().top < 130));
    }

    function nearestSection() {
      var best = null;
      sections.forEach(function (s) {
        if (s.classList.contains('tv-hide')) return;
        var t = s.getBoundingClientRect().top;
        if (t < 150 && (!best || t > best.getBoundingClientRect().top)) best = s;
      });
      return best;
    }

    var hasIO = 'IntersectionObserver' in window;

    if (hasIO) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setHere(en.target); });
      }, { rootMargin: '-136px 0px -66% 0px' });
      sections.forEach(function (s) { spy.observe(s); });

      var sweep = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('tv-seen'); sweep.unobserve(e.target); }
        });
      }, { threshold: 0.06 });
      sections.forEach(function (s) { sweep.observe(s); });
    }

    if (here) {
      here.style.cursor = 'pointer';
      here.title = 'Back to the top of this section';
      here.addEventListener('click', function () {
        var sec = active || nearestSection();
        if (sec) goTo(sec);
      });
    }

    /* ══════════ back to top + reading progress (rAF-throttled) ══════════ */
    var top = el('button.tv-top', { type: 'button', 'aria-label': 'Back to top', text: '▲' });
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
    });
    document.body.appendChild(top);

    var bar = document.querySelector('.tv-progress i');
    if (!bar) {
      var wrap = el('div.tv-progress', { 'aria-hidden': 'true' }, el('i'));
      document.body.appendChild(wrap);
      bar = wrap.firstChild;
    }

    var queued = false;
    function onScroll() {
      queued = false;
      top.classList.toggle('show', window.scrollY > 500);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
      tickHere();
      if (!hasIO) setHere(nearestSection());
    }
    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(onScroll);
    }, { passive: true });

    /* ══════════ dark mode — only off-wiki; Fandom ships its own ══════════ */
    if (!window.mw) {
      var stored = null;
      try { stored = localStorage.getItem('tv-dark'); } catch (err) {}
      var dark = stored === null ?
        Boolean(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) :
        stored === '1';
      var tt = el('button.tv-theme', { type: 'button', 'aria-label': 'Toggle dark mode' });
      var paint = function () {
        document.body.classList.toggle('tv-dark', dark);
        tt.textContent = dark ? '☀' : '☾';
        tt.setAttribute('aria-pressed', dark ? 'true' : 'false');
      };
      tt.addEventListener('click', function () {
        dark = !dark;
        try { localStorage.setItem('tv-dark', dark ? '1' : '0'); } catch (err) {}
        paint();
      });
      paint();
      document.body.appendChild(tt);
    }

    /* ══════════ progressive reveal — JS-only, so no-JS still sees everything ══════════ */
    if (hasIO && !REDUCE) {
      (page.querySelector('.tv-main') || page).classList.add('tv-anim');
      var reveal = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('tv-in'); reveal.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
      rules.forEach(function (r) { reveal.observe(r); });
      setTimeout(function () {
        rules.forEach(function (r) {
          if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('tv-in');
        });
      }, 40);
    }

    /* ══════════ ambient embers — decorative, desktop, motion-safe ══════════ */
    if (!REDUCE && window.innerWidth > 760 && !document.querySelector('.tv-motes')) {
      var motes = el('div.tv-motes', { 'aria-hidden': 'true' });
      for (var mi = 0; mi < 16; mi++) {
        var m = el('i');
        var sc = 0.7 + Math.random() * 1.5;
        m.style.left = (Math.random() * 100).toFixed(2) + '%';
        m.style.animationDuration = (16 + Math.random() * 20).toFixed(1) + 's';
        m.style.animationDelay = (-Math.random() * 30).toFixed(1) + 's';
        m.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
        m.style.width = m.style.height = (3 * sc).toFixed(1) + 'px';
        motes.appendChild(m);
      }
      document.body.appendChild(motes);
    }

    /* ══════════ keyboard shortcuts panel ══════════ */
    var keys = el('div.tv-keys', { 'aria-hidden': 'true' });
    var card = el('div.tv-keys-card', null, el('h4', { text: 'Keyboard' }));
    [[['/'], 'Jump to the search box'],
     [['↑', '↓'], 'Step through the results'],
     [['Enter'], 'Go to the first result'],
     [['Esc'], 'Clear the search'],
     [['?'], 'Open and close this panel']].forEach(function (row) {
      card.appendChild(el('div.tv-keys-row', null, [
        el('span', { text: row[1] }),
        el('span', null, row[0].map(function (k) { return el('kbd', { text: k }); }))
      ]));
    });
    card.appendChild(el('div.tv-keys-hint', { text: 'Click anywhere to close' }));
    keys.appendChild(card);
    keys.addEventListener('click', function () { keys.classList.remove('show'); });
    document.body.appendChild(keys);

    function toggleKeys() {
      if (!keys) return;
      var on = keys.classList.toggle('show');
      keys.setAttribute('aria-hidden', on ? 'false' : 'true');
    }

    if (window.innerWidth > 760) {
      var hb = el('button.tv-help', { type: 'button', 'aria-label': 'Keyboard shortcuts', text: '?' });
      hb.addEventListener('click', toggleKeys);
      document.body.appendChild(hb);
    }

    /* ══════════ go ══════════ */
    readState();
    apply();
    tickHere();

    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(function () { target.scrollIntoView(); flash(target); }, 120);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  if (window.mw && mw.hook) mw.hook('wikipage.content').add(init);
})();