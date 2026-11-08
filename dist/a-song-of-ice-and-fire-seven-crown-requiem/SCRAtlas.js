/**
 * SCRAtlas — interactive timeline atlas for the Seven Crown Requiem wiki.
 * Renders into any <div class="scr-atlas-app" data-map="(image URL)" data-data="(data page, default Atlas/Data)"></div>
 * (class "scr-atlas" works the same way).
 * Styles live in MediaWiki:Common.css (section "SCR Atlas — script version").
 * Atlas data (places, characters, timeline steps) lives in Atlas/Data —
 * edit that page to update the map; this script never needs changing for data.
 * No external resources, no user data collected, no tracking.
 */
(function () {
    'use strict';

    /*
 * Atlas/Data is written with readable names (places, characters, timeline → eras → events).
 * This turns it into the short internal form the rest of the script uses.
 * Old short-key data (with "steps") is still accepted as-is.
 */
function normalize(D) {
  if (D.steps) { return D; }
  function each(o, fn) { Object.keys(o || {}).forEach(function (k) { fn(k, o[k]); }); }
  function initials(name) { return String(name || '?').split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase(); }
  var out = { wikiBase: D.wikiBase, places: {}, chars: {}, steps: [] };
            /* Optional per-map settings (used by atlases other than Westeros). */
            ['title', 'span', 'mapAlt', 'mapWidth', 'mapHeight', 'emptyNote'].forEach(function (k) { if (D[k] !== undefined) { out[k] = D[k]; } });
  each(D.places, function (k, p) {
    var o = { n: p.name, x: p.x, y: p.y, r: p.region || '', d: p.description || '' };
    if (p.house) { o.h = p.house; }
    out.places[k] = o;
  });
  each(D.characters, function (k, c) {
    out.chars[k] = { n: c.name, s: c.title || '', c: c.color || '#5a4a3a', i: c.initials || initials(c.name), img: c.token || '', w: c.page || c.name };
  });
  (D.timeline || []).forEach(function (era) {
    (era.events || []).forEach(function (e) {
      var s = { y: e.year || '', era: era.era || '', t: e.title || '', at: e.place, m: [], d: e.description || '' };
      if (e.marker !== 'none') { s.m.push([e.place, e.marker || 'event']); }
      each(e.alsoMarked, function (k, kind) { s.m.push([k, kind]); });
      if (e.burned) { s.burn = e.burned; }
      if (e.clearMap) { s.reset = true; }
      if (e.page) { s.page = e.page; }
      each(e.characters, function (k, v) {
        if (typeof v === 'string') { (s.pos = s.pos || {})[k] = v; }
        else if (v && v.offMap !== undefined) { (s.off = s.off || {})[k] = v.offMap; }
        else if (v && v.place) { (s.pos = s.pos || {})[k] = v.dies ? { at: v.place, dies: true } : v.place; }
      });
      out.steps.push(s);
    });
  });
  return out;
}

/* Builds the atlas from the loaded data and returns init(root). */
    function build(DATA) {
        DATA = normalize(DATA);

var L = DATA.places, C = DATA.chars, S = DATA.steps;
        var MW = +DATA.mapWidth || 800, MH = +DATA.mapHeight || 1600, NS = 'http://www.w3.org/2000/svg';
        var TITLE = DATA.title || 'Atlas of the Realm', SPAN = DATA.span || '2 BC – 296 AC', MAP_ALT = DATA.mapAlt || 'Map of Westeros';
        var EMPTY_NOTE = DATA.emptyNote || 'No characters are placed on the map before the Return of the Dragons. Step forward to ca. 270s AC.';

        function copy(o) { var r = {}, k; for (k in o) { if (o.hasOwnProperty(k)) { r[k] = o[k]; } } return r; }
        /* Escape text from Atlas/Data before it goes into HTML. */
        function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
        function safeColor(c) { c = String(c == null ? '' : c).trim(); return /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|(rgb|rgba|hsl|hsla)\([0-9.,%\s]+\))$/.test(c) ? c : '#777'; }
        function each(o, fn) { Object.keys(o || {}).forEach(function (k) { fn(k, o[k]); }); }
        function wikiUrl(title) {
            var t = title.replace(/ /g, '_');
            if (window.mw && mw.util && mw.util.getUrl) { return mw.util.getUrl(t); }
            return DATA.wikiBase + encodeURIComponent(t);
        }

        /* Character positions for each step (positions carry forward). */
        var STATE = [];
        (function () {
            var cur = {}, dead = {};
            S.forEach(function (s, i) {
                if (s.reset) { cur = {}; }
                var died = {};
                each(s.pos, function (k, v) {
                    if (typeof v === 'string') { cur[k] = v; } else { cur[k] = v.at; if (v.dies) { died[k] = 1; } }
                });
                each(s.off, function (k) { delete cur[k]; });
                each(s.unplaced, function (k) { delete cur[k]; });
                STATE.push({ pos: copy(cur), died: died });
                each(died, function (k) { delete cur[k]; dead[k] = i; });
                s.dead = copy(dead);
            });
        }());

        function trail(k, i) {
            var pts = [], j, at;
            for (j = 0; j <= i; j++) {
                if (S[j].reset && pts.length) { pts.push(null); }
                at = STATE[j].pos[k];
                if (at && (!pts.length || pts[pts.length - 1] !== at)) { pts.push(at); }
            }
            return pts;
        }

        function svgEl(tag, attrs) {
            var n = document.createElementNS(NS, tag), k;
            for (k in attrs) { if (attrs.hasOwnProperty(k)) { n.setAttribute(k, attrs[k]); } }
            return n;
        }

        function icon(kind, x, y) {
            var g = svgEl('g', { transform: 'translate(' + x + ',' + y + ')' });
            if (kind === 'battle') {
                g.appendChild(svgEl('circle', { r: 13, fill: '#8f1d1d', stroke: '#fff7ec', 'stroke-width': 2 }));
                g.appendChild(svgEl('path', { d: 'M-6 -6L6 6M6 -6L-6 6M-7 3l3 3M7 3l-3 3', stroke: '#fff7ec', 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }));
            } else if (kind === 'fire') {
                g.appendChild(svgEl('circle', { r: 34, fill: 'url(#scr-fire)', 'class': 'scr-a-burn' }));
            } else if (kind === 'ash') {
                g.appendChild(svgEl('circle', { r: 30, fill: 'url(#scr-ash)' }));
            } else {
                g.appendChild(svgEl('circle', { r: 11, fill: '#fff7ec', stroke: '#8f1d1d', 'stroke-width': 2.5 }));
                g.appendChild(svgEl('circle', { r: 4, fill: '#8f1d1d' }));
            }
            return g;
        }

        var SKELETON =
            '<div class="scr-a-top">' +
                '<div class="scr-a-title">' + esc(TITLE) + ' <span>' + esc(SPAN) + '</span></div>' +
                '<div class="scr-a-search"><input type="search" class="scr-a-q" placeholder="Find a place or character…" aria-label="Search places and characters"><div class="scr-a-res" hidden></div></div>' +
            '</div>' +
            '<div class="scr-a-body">' +
                '<div class="scr-a-main">' +
                    '<div class="scr-a-map">' +
                        '<div class="scr-a-stage">' +
                            '<img class="scr-a-img" alt="' + esc(MAP_ALT) + '" draggable="false">' +
                            '<svg class="scr-a-svg" viewBox="0 0 ' + MW + ' ' + MH + '" aria-hidden="true">' +
                                '<defs>' +
                                    '<radialGradient id="scr-fire"><stop offset="0" stop-color="#ffcf4a" stop-opacity=".95"/><stop offset=".45" stop-color="#ff6a1a" stop-opacity=".7"/><stop offset="1" stop-color="#b3200a" stop-opacity="0"/></radialGradient>' +
                                    '<radialGradient id="scr-ash"><stop offset="0" stop-color="#3a2a20" stop-opacity=".55"/><stop offset="1" stop-color="#3a2a20" stop-opacity="0"/></radialGradient>' +
                                    '<marker id="scr-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#ffd54a" stroke="#2a2116" stroke-width="1"/></marker>' +
                                '</defs>' +
                                '<g class="scr-g-burn"></g><g class="scr-g-path"></g><g class="scr-g-mark"></g>' +
                            '</svg>' +
                            '<div class="scr-a-locs"></div><div class="scr-a-toks"></div>' +
                        '</div>' +
                        '<div class="scr-a-zoom"><button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">−</button><button type="button" data-z="fit" aria-label="Fit the whole map">⤢</button></div>' +
                        '<div class="scr-a-legend">' +
                            '<label><input type="checkbox" data-ly="chars" checked> Characters</label>' +
                            '<label><input type="checkbox" data-ly="events" checked> Battles &amp; events</label>' +
                            '<label><input type="checkbox" data-ly="burn" checked> Burned lands</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="scr-a-chron">' +
                        '<div class="scr-a-ctl"><button type="button" data-go="prev" aria-label="Previous event">◀</button><button type="button" data-go="play" class="scr-a-play" aria-label="Play timeline">▶</button><button type="button" data-go="next" aria-label="Next event">▶</button></div>' +
                        '<div class="scr-a-slider"><input type="range" class="scr-a-step" min="0" aria-label="Timeline position"><div class="scr-a-eras"></div></div>' +
                        '<div class="scr-a-ev"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="scr-a-side">' +
                    '<div class="scr-a-sec scr-a-detail"></div>' +
                    '<div class="scr-a-sec"><div class="scr-a-h">Characters at this point</div><div class="scr-a-chars"></div><p class="scr-a-note">Pick a character to follow their road across the timeline.</p></div>' +
                    '<div class="scr-a-sec scr-a-off"></div>' +
                '</div>' +
            '</div>';

        function init(root) {
            if (root.getAttribute('data-scr-ready')) { return; }
            root.setAttribute('data-scr-ready', '1');
            root.classList.add('scr-atlas-app');
            root.innerHTML = SKELETON;

            function q(sel) { return root.querySelector(sel); }
            var wrap = q('.scr-a-map'), stage = q('.scr-a-stage');
            q('.scr-a-img').src = root.getAttribute('data-map');
            /* Maps other than the default 800 × 1600 size the stage from Atlas data (mapWidth / mapHeight). */
            ['.scr-a-stage', '.scr-a-img', '.scr-a-svg'].forEach(function (c) {
                var el = q(c);
                el.style.setProperty('width', MW + 'px', 'important');
                el.style.setProperty('height', MH + 'px', 'important');
            });

            var step = S.length - 1, sel = null, follow = null, timer = null;
            var z = 1, tx = 0, ty = 0;
            var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            /* ---- layout width: side panel beside the map only when there is room ---- */
            function sizeCls() { root.classList.toggle('scr-wide', root.clientWidth >= 900); }

            /* ---- pan & zoom ---- */
            /* Smallest zoom shows the whole map inside the frame. */
            function minZ() { return Math.min(wrap.clientWidth / MW, wrap.clientHeight / MH); }
            function clamp() {
                var w = wrap.clientWidth, h = wrap.clientHeight, sw = MW * z, sh = MH * z;
                tx = sw < w ? (w - sw) / 2 : Math.min(0, Math.max(w - sw, tx));
                ty = sh < h ? (h - sh) / 2 : Math.min(0, Math.max(h - sh, ty));
            }
            function apply() {
                clamp();
                stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
                stage.style.setProperty('--inv', Math.max(0.45, Math.min(1.6, 1 / z)));
            }
            function zoomAt(f, cx, cy) {
                var nz = Math.max(minZ(), Math.min(4, z * f)), k = nz / z;
                tx = cx - (cx - tx) * k; ty = cy - (cy - ty) * k; z = nz; apply();
            }
            function fit() { z = minZ(); tx = 0; ty = 0; apply(); }
            function flyTo(x, y, zz) {
                z = Math.max(minZ(), Math.min(4, zz || Math.max(z, 1.3)));
                tx = wrap.clientWidth / 2 - x * z; ty = wrap.clientHeight / 2 - y * z;
                stage.style.transition = reduce ? '' : 'transform .55s ease';
                apply();
                setTimeout(function () { stage.style.transition = ''; }, 600);
            }
            wrap.addEventListener('wheel', function (e) {
                e.preventDefault();
                var r = wrap.getBoundingClientRect();
                zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
            }, { passive: false });

            var ptrs = {}, last = null, pinchD = null, moved = false;
            function ptrList() { return Object.keys(ptrs).map(function (k) { return ptrs[k]; }); }
            wrap.addEventListener('pointerdown', function (e) {
                if (e.target.closest('.scr-a-zoom, .scr-a-legend')) { return; }
                ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; moved = false;
                var p = ptrList();
                if (p.length === 1) { last = { x: e.clientX, y: e.clientY }; }
                else if (p.length === 2) { pinchD = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); }
            });
            wrap.addEventListener('pointermove', function (e) {
                if (!ptrs[e.pointerId]) { return; }
                ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
                var p = ptrList(), r, d, dx, dy;
                if (p.length === 2 && pinchD) {
                    d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); r = wrap.getBoundingClientRect();
                    zoomAt(d / pinchD, (p[0].x + p[1].x) / 2 - r.left, (p[0].y + p[1].y) / 2 - r.top);
                    pinchD = d; moved = true;
                } else if (p.length === 1 && last) {
                    dx = e.clientX - last.x; dy = e.clientY - last.y;
                    if (Math.abs(dx) + Math.abs(dy) > 3) {
                        moved = true; wrap.classList.add('scr-drag');
                        if (!wrap.hasPointerCapture(e.pointerId)) { wrap.setPointerCapture(e.pointerId); }
                    }
                    if (moved) { tx += dx; ty += dy; apply(); }
                    last = { x: e.clientX, y: e.clientY };
                }
            });
            function up(e) {
                delete ptrs[e.pointerId];
                if (ptrList().length < 2) { pinchD = null; }
                if (!ptrList().length) { last = null; wrap.classList.remove('scr-drag'); }
            }
            wrap.addEventListener('pointerup', up);
            wrap.addEventListener('pointercancel', up);
            wrap.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
            root.querySelectorAll('[data-z]').forEach(function (b) {
                b.addEventListener('click', function () {
                    var m = b.getAttribute('data-z');
                    if (m === 'fit') { fit(); } else { zoomAt(m === 'in' ? 1.4 : 1 / 1.4, wrap.clientWidth / 2, wrap.clientHeight / 2); }
                });
            });
            function onResize() { sizeCls(); if (z < minZ()) { z = minZ(); } apply(); }
            if (window.ResizeObserver) { new ResizeObserver(onResize).observe(root); } else { window.addEventListener('resize', onResize); }

            /* ---- static pieces ---- */
            var locEls = {};
            each(L, function (k, p) {
                var b = document.createElement('button');
                b.type = 'button'; b.className = 'scr-a-loc';
                b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
                b.title = p.n; b.setAttribute('aria-label', p.n);
                b.addEventListener('click', function () { sel = { type: 'loc', k: k }; render(); });
                q('.scr-a-locs').appendChild(b); locEls[k] = b;
            });
            (function () {
                var eras = [];
                S.forEach(function (s) {
                    if (!eras.length || eras[eras.length - 1].n !== s.era) { eras.push({ n: s.era, c: 0 }); }
                    eras[eras.length - 1].c++;
                });
                q('.scr-a-eras').innerHTML = eras.map(function (e) {
                    return '<span style="flex:' + (+e.c || 1) + '" title="' + esc(e.n) + '">' + esc(e.n) + '</span>';
                }).join('');
            }());
            q('.scr-a-step').max = S.length - 1;

            function layer(name) { return q('[data-ly="' + name + '"]').checked; }
            function showChars() { var c = q('[data-ly="chars"]'); if (c) { c.checked = true; } }
            function imgUrl(f) { return '/wiki/Special:FilePath/' + encodeURIComponent(f.replace(/ /g, '_')).replace(/'/g, '%27') + '?width=64'; }
            function chBg(ch) { return ch.img ? 'background:' + safeColor(ch.c) + ' url(\'' + imgUrl(ch.img) + '\') center/cover' : 'background:' + safeColor(ch.c); }
            function dot(ch) { return '<span class="scr-a-dot" style="' + chBg(ch) + '">' + (ch.img ? '' : esc(ch.i)) + '</span>'; }

            /* ---- render ---- */
            function render() {
                var s = S[step], st = STATE[step];
                q('.scr-a-step').value = step;
                q('.scr-a-ev').innerHTML = '<div class="scr-a-yr">' + esc(s.y) + '</div><div class="scr-a-txt"><div class="scr-a-era">' + esc(s.era) + '</div><div class="scr-a-evt">' + esc(s.t) + '</div><p>' + esc(s.d) + '</p></div>';

                var gm = q('.scr-g-mark'), gb = q('.scr-g-burn'), gp = q('.scr-g-path');
                gm.innerHTML = ''; gb.innerHTML = ''; gp.innerHTML = '';
                var showEv = layer('events'), showBurn = layer('burn'), showCh = layer('chars');

                if (showEv) {
                    (s.m || []).forEach(function (m) {
                        var p = L[m[0]];
                        if (m[1] === 'fire') { gb.appendChild(icon('fire', p.x, p.y)); } else { gm.appendChild(icon(m[1], p.x + 14, p.y - 14)); }
                    });
                }
                if (showBurn) {
                    var cull = -1, j, resetSince = false;
                    S.forEach(function (x, i) { if (x.burn && cull < 0) { cull = i; } });
                    for (j = cull; j <= step && cull >= 0; j++) { if (S[j].reset) { resetSince = true; } }
                    if (cull >= 0 && step >= cull && !resetSince) {
                        S[cull].burn.forEach(function (k) { gb.appendChild(icon(step === cull ? 'fire' : 'ash', L[k].x, L[k].y)); });
                    }
                }
                if (follow && showCh) {
                    var seg = [];
                    var flush = function () {
                        if (seg.length > 1) {
                            var d = seg.map(function (k, i) { return (i ? 'L' : 'M') + L[k].x + ' ' + L[k].y; }).join(' ');
                            gp.appendChild(svgEl('path', { d: d, fill: 'none', stroke: '#2a2116', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.5, 'vector-effect': 'non-scaling-stroke' }));
                            gp.appendChild(svgEl('path', { d: d, fill: 'none', stroke: '#ffd54a', 'stroke-width': 3, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'marker-mid': 'url(#scr-arr)', 'marker-end': 'url(#scr-arr)', 'vector-effect': 'non-scaling-stroke' }));
                        }
                        seg = [];
                    };
                    trail(follow, step).forEach(function (p) { if (p === null) { flush(); } else { seg.push(p); } });
                    flush();
                }

                var tk = q('.scr-a-toks'), groups = {};
                tk.innerHTML = '';
                each(st.pos, function (k, at) { (groups[at] = groups[at] || []).push(k); });
                if (showCh) {
                    each(groups, function (at, ks) {
                        var p = L[at], n = ks.length;
                        ks.forEach(function (k, i) {
                            var ang = n === 1 ? 0 : (i / n) * Math.PI * 2 - Math.PI / 2, rad = n === 1 ? 0 : 16 + n * 2.5, ch = C[k];
                            var b = document.createElement('button');
                            b.type = 'button';
                            b.className = 'scr-a-tok' + (st.died[k] ? ' scr-dead' : '') + (follow === k ? ' scr-follow' : '') + (follow && follow !== k ? ' scr-dim' : '');
                            b.style.background = safeColor(ch.c);
                            if (ch.img) { b.style.backgroundImage = 'url(\'' + imgUrl(ch.img) + '\')'; b.style.backgroundSize = 'cover'; b.style.backgroundPosition = 'center'; b.textContent = ''; b.title = ch.n; } else { b.textContent = ch.i; }
                            b.title = ch.n + (st.died[k] ? ' (dies here)' : '');
                            b.setAttribute('aria-label', ch.n);
                            b.style.left = 'calc(' + p.x + 'px + ' + (Math.cos(ang) * rad).toFixed(1) + 'px * var(--inv, 1))';
                            b.style.top = 'calc(' + p.y + 'px + ' + (Math.sin(ang) * rad).toFixed(1) + 'px * var(--inv, 1))';
                            b.addEventListener('click', function (e) { e.stopPropagation(); sel = { type: 'char', k: k }; follow = follow === k ? null : k; render(); });
                            tk.appendChild(b);
                        });
                    });
                }
                each(locEls, function (k, b) {
                    b.classList.toggle('scr-focus', k === s.at && showEv);
                    b.classList.toggle('scr-sel', !!(sel && sel.type === 'loc' && sel.k === k));
                });

                var rows = Object.keys(st.pos).map(function (k) {
                    var ch = C[k];
                    return '<button type="button" class="scr-a-crow' + (follow === k ? ' scr-on' : '') + '" data-c="' + esc(k) + '">' + dot(ch) +
                        '<span class="scr-a-nm">' + esc(ch.n) + '<small>' + esc(ch.s) + '</small></span><span class="scr-a-where">' + (st.died[k] ? '✝ ' : '') + esc(L[st.pos[k]].n) + '</span></button>';
                });
                var gone = s.reset ? [] : Object.keys(s.dead).filter(function (k) { return !st.pos[k]; }).map(function (k) {
                    var ch = C[k];
                    return '<button type="button" class="scr-a-crow scr-gone" data-c="' + esc(k) + '">' + dot(ch) +
                        '<span class="scr-a-nm">' + esc(ch.n) + '<small>' + esc(ch.s) + '</small></span><span class="scr-a-where">✝ ' + esc(S[s.dead[k]].y) + '</span></button>';
                });
                q('.scr-a-chars').innerHTML = rows.concat(gone).join('') ||
                    '<p class="scr-a-note">' + esc(EMPTY_NOTE) + '</p>';
                q('.scr-a-chars').querySelectorAll('[data-c]').forEach(function (b) {
                    b.addEventListener('click', function () {
                        var k = b.getAttribute('data-c');
                        follow = follow === k ? null : k; sel = { type: 'char', k: k }; if (follow) { showChars(); } render();
                        if (st.pos[k]) { flyTo(L[st.pos[k]].x, L[st.pos[k]].y); }
                    });
                });

                var offs = [];
                each(s.off, function (k, v) { offs.push([k, v]); });
                each(s.unplaced, function (k, v) { offs.push([k, v]); });
                var off = q('.scr-a-off');
                off.hidden = !offs.length;
                off.innerHTML = '<div class="scr-a-h">Beyond the map</div>' + offs.map(function (o) {
                    var ch = C[o[0]];
                    return '<div class="scr-a-crow scr-static">' + dot(ch) + '<span class="scr-a-nm">' + esc(ch.n) + '<small>' + esc(o[1]) + '</small></span><span></span></div>';
                }).join('');

                renderDetail();
            }

            function evRow(s, i, label) {
                return '<li><button type="button" data-i="' + i + '" class="' + (i === step ? 'scr-cur' : '') + '"><time>' + esc(s.y) + '</time><span>' + label + '</span></button></li>';
            }

            function renderDetail() {
                var d = q('.scr-a-detail'), st = STATE[step], html, p, ch;
                if (sel && sel.type === 'loc') {
                    p = L[sel.k];
                    var here = Object.keys(st.pos).filter(function (k) { return st.pos[k] === sel.k; });
                    var evs = [];
                    S.forEach(function (s, i) {
                        var hit = s.at === sel.k || (s.m || []).some(function (m) { return m[0] === sel.k; }) || (s.burn || []).indexOf(sel.k) >= 0;
                        if (hit) { evs.push(evRow(s, i, '<b>' + esc(s.t) + '</b>')); }
                    });
                    html = '<div class="scr-a-h">Place</div><div class="scr-a-name">' + esc(p.n) + '</div><div class="scr-a-sub">' + esc(p.r) + (p.h ? ' · ' + esc(p.h) : '') + '</div><p>' + esc(p.d) + '</p>';
                    if (here.length) {
                        html += '<div class="scr-a-h">Here in ' + esc(S[step].y) + '</div><div class="scr-a-here">' + here.map(function (k) {
                            return '<button type="button" class="scr-a-pill" data-c="' + esc(k) + '"><i style="' + esc(chBg(C[k])) + '"></i>' + esc(C[k].n) + '</button>';
                        }).join('') + '</div>';
                    }
                    if (evs.length) { html += '<div class="scr-a-h">History here</div><ul class="scr-a-evlist">' + evs.join('') + '</ul>'; }
                    html += '<p><a href="' + esc(wikiUrl(p.n)) + '">Read the article →</a></p>';
                } else if (sel && sel.type === 'char') {
                    ch = C[sel.k];
                    var rows = [];
                    S.forEach(function (s, i) {
                        var at = STATE[i].pos[sel.k];
                        if (at && (i === 0 || STATE[i - 1].pos[sel.k] !== at || (s.pos && s.pos[sel.k]))) {
                            rows.push(evRow(s, i, '<b>' + esc(L[at].n) + '</b> · ' + esc(s.t)));
                        }
                    });
                    var now = st.pos[sel.k];
                    var status = now ? 'In ' + esc(S[step].y) + ': <b>' + esc(L[now].n) + '</b>' + (st.died[sel.k] ? ', where they die.' : '.') :
                        (S[step].dead[sel.k] !== undefined ? 'Died ' + esc(S[S[step].dead[sel.k]].y) + '.' : 'Not on the map in ' + esc(S[step].y) + '.');
                    html = '<div class="scr-a-h">Character</div><div class="scr-a-name">' + esc(ch.n) + '</div><div class="scr-a-sub">' + esc(ch.s) + '</div><p>' + status + '</p>' +
                        '<div class="scr-a-h">Their road</div><ul class="scr-a-evlist">' + rows.join('') + '</ul>' +
                        '<p><a href="' + esc(wikiUrl(ch.w)) + '">Read the article →</a></p>';
                } else {
                    p = L[S[step].at];
                    html = '<div class="scr-a-h">Now showing</div><div class="scr-a-name">' + esc(S[step].t) + '</div><div class="scr-a-sub">' + esc(S[step].y) + ' · ' + esc(p.n) + '</div>' +
                        (S[step].page ? '<p><a href="' + esc(wikiUrl(S[step].page)) + '">Read the story →</a></p>' : '') +
                        '<p>Click any castle or city on the map for its history, or a character token to trace their road.</p>';
                }
                d.innerHTML = html;
                d.querySelectorAll('[data-i]').forEach(function (b) { b.addEventListener('click', function () { go(+b.getAttribute('data-i'), true); }); });
                d.querySelectorAll('[data-c]').forEach(function (b) {
                    b.addEventListener('click', function () { var k = b.getAttribute('data-c'); sel = { type: 'char', k: k }; follow = k; showChars(); render(); });
                });
            }

            function go(i, fly) {
                step = Math.max(0, Math.min(S.length - 1, i));
                render();
                if (fly) { var p = L[S[step].at]; flyTo(p.x, p.y, Math.max(z, 1.1)); }
            }
            var slider = q('.scr-a-step');
            slider.addEventListener('input', function () { go(+slider.value, false); });
            slider.addEventListener('change', function () { go(+slider.value, true); });
            var playBtn = q('[data-go="play"]');
            function stop() { clearInterval(timer); timer = null; playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'Play timeline'); }
            q('[data-go="prev"]').addEventListener('click', function () { go(step - 1, true); });
            q('[data-go="next"]').addEventListener('click', function () { go(step + 1, true); });
            playBtn.addEventListener('click', function () {
                if (timer) { stop(); return; }
                if (step >= S.length - 1) { go(0, true); }
                playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'Pause timeline');
                timer = setInterval(function () { if (step >= S.length - 1) { stop(); return; } go(step + 1, true); }, 3200);
            });
            root.querySelectorAll('[data-ly]').forEach(function (c) { c.addEventListener('change', render); });
            root.tabIndex = -1;
            root.addEventListener('keydown', function (e) {
                if (e.target.matches('input[type=search]')) { return; }
                if (e.key === 'ArrowRight') { go(step + 1, true); e.preventDefault(); }
                if (e.key === 'ArrowLeft') { go(step - 1, true); e.preventDefault(); }
            });

            /* ---- search ---- */
            var qi = q('.scr-a-q'), res = q('.scr-a-res'), hits = [], hi = 0, pool = [];
            each(L, function (k, p) { pool.push({ type: 'loc', k: k, n: p.n, sub: 'Place' }); });
            each(C, function (k, c) { pool.push({ type: 'char', k: k, n: c.n, sub: 'Character' }); });
            S.forEach(function (s, i) { pool.push({ type: 'ev', k: i, n: s.t, sub: 'Event · ' + s.y }); });
            function showRes() {
                res.hidden = !hits.length;
                res.innerHTML = hits.map(function (h, i) {
                    return '<button type="button" data-h="' + i + '" class="' + (i === hi ? 'scr-on' : '') + '"><span>' + esc(h.n) + '</span><small>' + esc(h.sub) + '</small></button>';
                }).join('');
                res.querySelectorAll('[data-h]').forEach(function (b) { b.addEventListener('click', function () { pick(hits[+b.getAttribute('data-h')]); }); });
            }
            function pick(h) {
                res.hidden = true; qi.value = '';
                if (h.type === 'loc') { sel = { type: 'loc', k: h.k }; render(); flyTo(L[h.k].x, L[h.k].y, 1.8); }
                else if (h.type === 'ev') { sel = null; go(h.k, true); }
                else {
                    sel = { type: 'char', k: h.k }; follow = h.k; showChars();
                    var i = step, j;
                    if (!STATE[i].pos[h.k]) { for (j = S.length - 1; j >= 0; j--) { if (STATE[j].pos[h.k]) { i = j; break; } } }
                    go(i, false);
                    var at = STATE[step].pos[h.k];
                    if (at) { flyTo(L[at].x, L[at].y, 1.6); }
                }
            }
            qi.addEventListener('input', function () {
                var v = qi.value.trim().toLowerCase(); hi = 0;
                hits = v ? pool.filter(function (p) { return p.n.toLowerCase().indexOf(v) >= 0; }).slice(0, 8) : [];
                showRes();
            });
            qi.addEventListener('keydown', function (e) {
                if (!hits.length) { return; }
                if (e.key === 'ArrowDown') { hi = (hi + 1) % hits.length; showRes(); e.preventDefault(); }
                else if (e.key === 'ArrowUp') { hi = (hi - 1 + hits.length) % hits.length; showRes(); e.preventDefault(); }
                else if (e.key === 'Enter') { pick(hits[hi]); e.preventDefault(); }
                else if (e.key === 'Escape') { res.hidden = true; }
            });
            document.addEventListener('click', function (e) { if (!root.contains(e.target) || !e.target.closest('.scr-a-search')) { res.hidden = true; } });

            /* ---- start ---- */
            sizeCls();
            render();
            requestAnimationFrame(function () {
                fit();
            });
        }
        return init;
    }

    /* ---- Stories on the map ----
* Stories are read from the Timeline page (set "storiesPage" on a data page to use another page).
* Any timeline table row carrying a hidden atlas note becomes a timeline step:
* | '''296 AC'''
* | '''[[White Cinders]]:''' Two armies, one ford...<!--atlas location=[[Dornish Marches]]; region=The Stormlands; date=3rd moon; characters=[[Rhaekar Targaryen]], [[Vaeron Targaryen]]-->
* The first cell is the year. The link in the bold '''[[Story]]:''' opening is the story page (its link text is the
* step title) and the rest of the cell is the summary (up to ~600 characters). The note's fields:
* location — the place it is pinned to (first link); any other linked places are marked too
* region — used only if no location matches this map (e.g. [[Lys]] on the Essos atlas;
* if the story has a location that just isn't on this map, the region is marked but nobody moves)
* date — orders stories inside the same year ("3rd moon", "Day 12, 4th moon")
* characters — every linked character moves to the location
* atlas=no — keeps the row off the map
* The === heading === above the table names the era on the atlas; a new era is added after the eras of that year
* if the data page doesn't have it. Rows keep their order on the page within the same year. A location only counts
* if it matches a place in the data page (by name or key). A data page can set "stories": false to switch this off.
*
* Characters fill themselves in too:
* - Anyone linked in a story's characters who has a {{Character Infobox}} page but no entry under
* "characters" gets one automatically (name = page name, title from |titles= or their house,
* colour from {{House Color}} of |house=, else |color=, else |sworn=).
* - Any character without a "token" uses "<Page name> token.png" if that file exists,
* otherwise the image from their character infobox, otherwise initials.
* A hand-written entry always wins. A data page can set "autoCharacters": false to switch this off.
*/
var STORIES_PAGE = 'Timeline';
function scrNorm(s) { return String(s || '').toLowerCase().replace(/_/g, ' ').replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, ' ').replace(/\b[ivx]+\b/g, ' ').replace(/\s+/g, ' ').trim(); }
function scrYear(y) { var m = String(y || '').match(/\d+/); if (!m) { return NaN; } return /\bBC\b/i.test(String(y)) ? -m[0] : +m[0]; }
function scrDateKey(d) {
var s = String(d || '').toLowerCase();
var moon = s.match(/(\d+)\s*(?:st|nd|rd|th)?\s+moon/), day = s.match(/day\s+(\d+)|(\d+)\s*(?:st|nd|rd|th)?\s+day/);
return (moon ? +moon[1] : 0) * 100 + (day ? +(day[1] || day[2]) : 0);
}
function scrPlain(v) {
return String(v || '').replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/\{\{[^{}]*\}\}/g, '')
.replace(/<br\s*\/?>/gi, ', ').replace(/<[^>]+>/g, '').replace(/'{2,}/g, '').replace(/\s+/g, ' ').trim();
}
function scrNames(v) {
var out = [], m, re = /\[\[([^\]|#]+)[^\]]*\]\]/g;
while ((m = re.exec(v || ''))) { out.push(m[1]); }
if (!out.length) { scrPlain(v).split(/\s*[,;•]\s*/).forEach(function (x) { if (x) { out.push(x); } }); }
return out;
}
function scrParams(text, name) {
var re = new RegExp('\\{\\{\\s*' + name.replace(/[ _]/g, '[ _]') + '\\s*(?=\\||\\}\\})', 'i');
var m = re.exec(text), out = {}, parts = [], i, start, depth = 1, sq = 0, two;
if (!m) { return null; }
start = i = m.index + 2;
for (; i < text.length; i++) {
two = text.substr(i, 2);
if (two === '{{') { depth++; i++; } else if (two === '}}') { depth--; if (!depth) { parts.push(text.slice(start, i)); break; } i++; }
else if (two === '[[') { sq++; i++; } else if (two === ']]') { sq = Math.max(0, sq - 1); i++; }
else if (text.charAt(i) === '|' && depth === 1 && !sq) { parts.push(text.slice(start, i)); start = i + 1; }
}
parts.slice(1).forEach(function (p) { var k = p.indexOf('='); if (k > 0) { out[p.slice(0, k).trim().toLowerCase()] = p.slice(k + 1).trim(); } });
return out;
}
var SCR_CHAR_FIELDS = ['protagonists', 'antagonists', 'supporting', 'characters', 'others'];

/* ---- reading the story tables on the Timeline page ---- */
/* Split on sep, but not inside [[links]] or {{templates}}. */
function scrSplitTop(s, sep) {
var out = [], cur = 0, sq = 0, start = 0, i, two;
for (i = 0; i < s.length; i++) {
two = s.substr(i, 2);
if (two === '{{') { cur++; i++; } else if (two === '}}') { cur = Math.max(0, cur - 1); i++; }
else if (two === '[[') { sq++; i++; } else if (two === ']]') { sq = Math.max(0, sq - 1); i++; }
else if (!cur && !sq && s.substr(i, sep.length) === sep) { out.push(s.slice(start, i)); start = i + sep.length; i += sep.length - 1; }
}
out.push(s.slice(start));
return out;
}
/* Drop cell attributes (style="..." | text). */
function scrCell(c) {
var parts = scrSplitTop(String(c), '|');
if (parts.length > 1 && /^\s*[\w-]+\s*=/.test(parts[0]) && parts[0].indexOf('[[') < 0) { return parts.slice(1).join('|').trim(); }
return String(c).trim();
}
var SCR_NOTE = /<!--\s*atlas\b([\s\S]*?)-->/i;
function scrTimelineStories(text) {
var out = [], n = 0, era = '', row = null, inTable = false;
function flush() {
if (!row) { return; }
var r = row, note = SCR_NOTE.exec(r.text), P, body, cells = [], main, lead, head, link, page;
row = null;
if (!note) { return; }
P = { _i: n++, _era: r.era };
scrSplitTop(note[1], ';').forEach(function (f) {
var k = f.indexOf('='), key, v;
if (k > 0) {
key = f.slice(0, k).trim().toLowerCase(); v = f.slice(k + 1).trim();
if (v) { P[key === 'location' || key === 'locations' ? 'location1' : key] = v; }
}
});
if (/^(no|false|off|hide|none)$/i.test(scrPlain(P.atlas))) { return; }
body = r.text.replace(/<!--[\s\S]*?-->/g, '');
body.split('\n').forEach(function (line) {
var t = line.trim(), c = t.charAt(0);
if (c === '|' || c === '!') { scrSplitTop(t.slice(1), c === '!' ? '!!' : '||').forEach(function (x) { cells.push(scrCell(x)); }); }
else if (cells.length && t) { cells[cells.length - 1] += '\n' + line; }
});
if (cells.length < 2) { return; }
main = cells.slice(1).join(' ');
lead = /^\s*'''([\s\S]*?)'''\s*:?/.exec(main);
head = lead ? lead[1] : main;
link = /\[\[([^\]|#]+)(?:\|([^\]]*))?\]\]/.exec(head);
page = link ? link[1].replace(/_/g, ' ').trim() : '';
if (!page) { return; }
P.title = link[2] || page;
P.year = P.year || cells[0];
P.summary = lead ? main.slice(lead[0].length) : '';
out.push([page, P]);
}
String(text || '').split('\n').forEach(function (line) {
var t = line.trim(), h = /^(={2,6})\s*(.*?)\s*\1$/.exec(t);
if (!inTable && h) { if (h[1].length <= 3) { era = h[1].length === 3 ? h[2] : ''; } return; }
if (/^\{\|/.test(t)) { inTable = true; row = null; return; }
if (!inTable) { return; }
if (/^\|\}/.test(t)) { flush(); inTable = false; return; }
if (/^\|-/.test(t)) { flush(); row = { era: era, text: '' }; return; }
if (/^\|\+/.test(t)) { return; }
if (!row) { row = { era: era, text: '' }; }
row.text += line + '\n';
});
return out;
}

function scrStory(title, P, D) {
var y = scrYear(P.year);
if (isNaN(y)) { return null; }
var places = {}, chars = {}, locs = [], ev, desc, date;
Object.keys(D.places || {}).forEach(function (k) { places[scrNorm(k)] = k; places[scrNorm(D.places[k].name)] = k; });
Object.keys(D.characters || {}).forEach(function (k) {
var c = D.characters[k];
chars[scrNorm(k)] = k; chars[scrNorm(c.name)] = k; if (c.page) { chars[scrNorm(c.page)] = k; }
(c.aka || []).forEach(function (a) { chars[scrNorm(a)] = k; });
});
['location1', 'location2', 'location3'].forEach(function (f) {
scrNames(P[f]).forEach(function (n) { var k = places[scrNorm(n)]; if (k && locs.indexOf(k) < 0) { locs.push(k); } });
});
var elsewhere = false;
if (!locs.length) {
/* set somewhere off this map (e.g. Pyke on the Essos atlas)? then the region only marks the spot */
elsewhere = !!scrPlain((P.location1 || '') + (P.location2 || '') + (P.location3 || ''));
scrNames(P.region).forEach(function (n) { var k = places[scrNorm(n)]; if (k && locs.indexOf(k) < 0) { locs.push(k); } });
}
if (!locs.length) { return null; }
date = scrPlain(P.date);
desc = scrPlain(P.summary || P.synopsis || '');
if (desc.length > 600) { desc = desc.slice(0, 600).replace(/\s+\S*$/, '') + '…'; }
ev = {
year: scrPlain(P.year), title: scrPlain(P.title) || title, place: locs[0], page: title,
description: (date ? date + '. ' : '') + (desc || 'A story set at ' + D.places[locs[0]].name + '.'),
characters: {}, alsoMarked: {}, _elsewhere: elsewhere, _y: y, _d: scrDateKey(P.date), _i: P._i || 0, _era: P._era || ''
};
locs.slice(1).forEach(function (k) { ev.alsoMarked[k] = 'event'; });
if (!elsewhere) { SCR_CHAR_FIELDS.forEach(function (f) {
scrNames(P[f]).forEach(function (n) { var k = chars[scrNorm(n)]; if (k && !ev.characters[k]) { ev.characters[k] = locs[0]; } });
}); }
return ev;
}
function scrInsert(D, stories) {
var have = {};
function firstYear(e) { return e.events && e.events.length ? scrYear(e.events[0].year) : NaN; }
D.timeline.forEach(function (era) { (era.events || []).forEach(function (e) { if (e.page) { have[e.page] = true; } }); });
stories.filter(function (s) { return !have[s.page]; })
.sort(function (a, b) { return a._y - b._y || a._d - b._d || a._i - b._i; })
.forEach(function (s) {
var era = null, evs, at, last = 0;
/* the === heading === above the story names its era; a new era goes after the eras of that year */
if (s._era) {
D.timeline.forEach(function (e) { if (scrNorm(e.era) === scrNorm(s._era)) { era = e; } });
if (!era) {
D.timeline.forEach(function (e, i) { if (firstYear(e) <= s._y) { last = i + 1; } });
era = { era: s._era, events: [] };
D.timeline.splice(last, 0, era);
}
}
if (!era) {
era = D.timeline[0];
D.timeline.forEach(function (e) { if (firstYear(e) <= s._y) { era = e; } });
}
evs = era.events || (era.events = []);
at = evs.length;
while (at > 0 && !(scrYear(evs[at - 1].year) <= s._y)) { at--; }
delete s._y; delete s._d; delete s._i; delete s._elsewhere; delete s._era;
evs.splice(at, 0, s);
});
}
function scrBatches(list) { var out = [], i; for (i = 0; i < list.length; i += 50) { out.push(list.slice(i, i + 50)); } return out; }
    function scrHouseKey(v) { return scrPlain(v).toLowerCase().replace(/^house\s+/, '').replace(/[^a-z]/g, ''); }
    function scrAutoChars(D, raw, get) {
        if (D.autoCharacters === false) { return Promise.resolve(); }
        D.characters = D.characters || {};
        var known = {}, want = {}, need = [], noTok = [], pageOf = {};
        Object.keys(D.characters).forEach(function (k) {
            var c = D.characters[k];
            known[scrNorm(k)] = known[scrNorm(c.name)] = 1;
            if (c.page) { known[scrNorm(c.page)] = 1; }
            if (!c.token) { noTok.push(k); pageOf[k] = c.page || c.name; }
        });
        raw.forEach(function (r) {
            SCR_CHAR_FIELDS.forEach(function (f) {
                scrNames(r[1][f]).forEach(function (n) {
                    n = n.replace(/_/g, ' ').trim();
                    if (n && !known[scrNorm(n)] && !want[scrNorm(n)]) { want[scrNorm(n)] = 1; need.push(n); }
                });
            });
        });
        var titles = need.concat(noTok.map(function (k) { return pageOf[k]; }));
        if (!titles.length) { return Promise.resolve(); }
        var colorsP = get('&prop=revisions&rvprop=content&rvslots=main&titles=' + encodeURIComponent('Template:House Color'))
            .then(function (j) {
                var map = {}, p = j.query && j.query.pages && j.query.pages[0], m, re = /^\|\s*([a-z]+)\s*=\s*(#[0-9a-f]{3,6})\s*$/gim;
                var t = p && p.revisions ? p.revisions[0].slots.main.content : '';
                while ((m = re.exec(t))) { map[m[1].toLowerCase()] = m[2]; }
                return map;
            }, function () { return {}; });
        var pagesP = Promise.all(scrBatches(titles).map(function (b) {
            return get('&prop=revisions%7Cpageimages&piprop=name&pilimit=50&rvprop=content&rvslots=main&redirects=1&titles=' + encodeURIComponent(b.join('|')));
        }));
        return Promise.all([colorsP, pagesP]).then(function (res) {
            var colors = res[0], info = {}, alias = {};
            res[1].forEach(function (j) {
                var q = j.query || {};
                (q.normalized || []).concat(q.redirects || []).forEach(function (r) { alias[r.from] = r.to; });
                (q.pages || []).forEach(function (p) { if (!p.missing) { info[p.title] = p; } });
            });
            function resolve(t) { var n = 0; while (alias[t] && n++ < 5) { t = alias[t]; } return info[t]; }
            var created = [];
            need.forEach(function (n) {
                var p = resolve(n);
                if (!p || !p.revisions) { return; }
                var CI = scrParams(String(p.revisions[0].slots.main.content).replace(/<!--[\s\S]*?-->/g, ''), 'Character Infobox');
                if (!CI) { return; }
                var key = 'auto_' + scrNorm(p.title).replace(/ /g, '_');
                if (D.characters[key]) { D.characters[key].aka.push(n); return; }
                var house = scrHouseKey(CI.house), sworn = scrHouseKey(CI.sworn), col = scrPlain(CI.color);
                var sub = scrPlain(CI.titles).split(/\s*[,;•]\s*/)[0];
                if (/^(ser|lord|lady|prince|princess|king|queen|maester|septon|septa)$/i.test(sub)) { sub = ''; }
                sub = sub || (house ? 'House ' + scrPlain(CI.house).replace(/^house\s+/i, '') : '');
                D.characters[key] = {
                    name: p.title, page: p.title, aka: [n], title: sub.length > 60 ? sub.slice(0, 57) + '…' : sub,
                    color: colors[house] || (/^#[0-9a-f]{3,6}$/i.test(col) ? col : '') || colors[sworn] || '#7a6a8a',
                    image: p.pageimage || ''
                };
                created.push(key);
            });
            noTok.forEach(function (k) { var p = resolve(pageOf[k]); D.characters[k].image = (p && p.pageimage) || ''; });
            var tokKeys = created.concat(noTok);
            return Promise.all(scrBatches(tokKeys).map(function (b) {
                return get('&prop=info&titles=' + encodeURIComponent(b.map(function (k) { return 'File:' + D.characters[k].page + ' token.png'; }).join('|')));
            })).then(function (js) {
                var have = {};
                js.forEach(function (j) {
                    var q = j.query || {}, back = {};
                    (q.normalized || []).forEach(function (r) { back[r.to] = r.from; });
                    (q.pages || []).forEach(function (p) { if (!p.missing) { have[(back[p.title] || p.title).replace(/_/g, ' ')] = 1; } });
                });
                tokKeys.forEach(function (k) {
                    var c = D.characters[k], f = c.page + ' token.png';
                    if (have['File:' + f]) { c.token = f; } else if (c.image) { c.token = c.image.replace(/_/g, ' '); }
                    delete c.image;
                });
            });
        });
    }
    function addStories(D, api) {
if (!D || D.stories === false || !D.timeline || !window.fetch || !window.Promise) { return D; }
var base = api + '?action=query&format=json&formatversion=2';
function get(qs) { return fetch(base + qs, { credentials: 'same-origin' }).then(function (r) { return r.json(); }); }
var page = D.storiesPage || STORIES_PAGE;
return get('&prop=revisions&rvprop=content&rvslots=main&redirects=1&titles=' + encodeURIComponent(page) + '&_=' + Date.now())
.then(function (j) {
var p = j.query && j.query.pages && j.query.pages[0];
var raw = scrTimelineStories(p && p.revisions ? p.revisions[0].slots.main.content : '');
/* only stories that land on this map bring in new characters */
raw = raw.filter(function (r) { return scrStory(r[0], r[1], D); });
var castRaw = raw.filter(function (r) { var s = scrStory(r[0], r[1], D); return s && !s._elsewhere; });
return scrAutoChars(D, castRaw, get).catch(function (e) {
if (window.console) { window.console.warn('SCRAtlas: automatic characters were skipped', e); }
}).then(function () {
var stories = [];
raw.forEach(function (r) { var s = scrStory(r[0], r[1], D); if (s) { stories.push(s); } });
scrInsert(D, stories);
return D;
});
})
.catch(function (e) {
if (window.console) { window.console.warn('SCRAtlas: stories were not added to the map', e); }
return D;
});
}

var DATA_PAGE = 'Atlas/Data';
    var dataPromises = {};

    /* Each atlas can name its own data page with data-data="..." (default Atlas/Data). */
    function loadData(page) {
        if (dataPromises[page]) { return dataPromises[page]; }
        var dataPromise;
        var api = (window.mw && mw.util && mw.util.wikiScript) ? mw.util.wikiScript('api') : '/api.php';
        var url = api + '?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2' +
            '&titles=' + encodeURIComponent(page) + '&_=' + Date.now();
        dataPromise = fetch(url, { credentials: 'same-origin' })
            .then(function (r) { return r.json(); })
            .then(function (j) {
                var p = j && j.query && j.query.pages && j.query.pages[0];
                if (!p || p.missing || !p.revisions) { throw new Error(page + ' not found'); }
                return addStories(JSON.parse(p.revisions[0].slots.main.content), api);
            });
        dataPromises[page] = dataPromise;
        dataPromise.catch(function () { delete dataPromises[page]; });
        return dataPromise;
    }

    var initFns = {};
    function boot(scope) {
        /* .scr-atlas boxes are atlases too (the class keeps older copies of this script from claiming them). */
        var els = (scope || document).querySelectorAll('.scr-atlas-app, .scr-atlas');
        Array.prototype.forEach.call(els, function (el) {
            if (el.getAttribute('data-scr-ready')) { return; }
            var page = el.getAttribute('data-data') || DATA_PAGE;
            loadData(page).then(function (DATA) {
                if (!initFns[page]) { initFns[page] = build(DATA); }
                initFns[page](el);
            }).catch(function (e) {
                el.textContent = 'The atlas could not load its data (' + e.message + '). Check that ' + page + ' exists and is valid JSON.';
            });
        });
    }
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($content) { boot($content[0]); });
    } else if (document.readyState !== 'loading') {
        boot();
    } else {
        document.addEventListener('DOMContentLoaded', function () { boot(); });
    }
}());