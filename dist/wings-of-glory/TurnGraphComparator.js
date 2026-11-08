/*
 * Turn Graph Comparator for Fandom / MediaWiki
 *
 * Expected page placeholder:
 *   <div class="turn-graph-comparator" data-data-page="TurnGraphData.json"></div>
 *
 * The data page must serve the raw JSON expected by the original dataset:
 *   { "_info": {...}, "planes": { "PlaneKey": { "name", "nation", "speed", "ITR", "STR" } } }
 *
 * No third-party libraries are used. Aircraft names are inserted with textContent,
 * not interpreted as HTML. Two aircraft are graphed at one time; selectors use nation colors,
 * hover labels use short designations, and curves use smoothed paths with performance bands.
 */
(function () {
  'use strict';

  if (window.__turnGraphComparatorBootstrapped) return;
  window.__turnGraphComparatorBootstrapped = true;

  const DATA_PROMISES = new Map();
  const COLORS = ['#38bdf8', '#fb923c'];
  const TIE_EPSILON = 0.05;

  // Nation colors are used for the aircraft selectors. Britain is displayed as UK.
  const NATION_COLORS = {
    USA: '#60a5fa',  // blue
    USSR: '#ff6969',  // soviet red zzzzz
    Germany: '#fb923c',  // orange
    Britain: '#c4b5fd',  // purple, why is this duplicated (leave here just in case)
    UK: '#c4b5fd',  // purple
    France: '#ff99ff',  // pink
    Japan: '#bc002d',  // japanese red, I don't really like plain white, too boring
    Special: '#a3f3ff',  // cyan
    Event: '#31ff2e'  // nope we're doing lime for events
    // future: Sweden is yellow, #ffd503
  };

  // Five-degree performance bands, from weak (red) to strong (dark blue).
  const TURN_BANDS = [
    'rgba(127, 29, 29, 0.38)',
    'rgba(185, 28, 28, 0.30)',
    'rgba(194, 65, 12, 0.27)',
    'rgba(202, 138, 4, 0.25)',
    'rgba(101, 163, 13, 0.23)',
    'rgba(22, 163, 74, 0.23)',
    'rgba(13, 148, 136, 0.23)',
    'rgba(8, 145, 178, 0.25)',
    'rgba(30, 64, 175, 0.32)'
  ];

  const CSS = `
    .tgc { --tgc-bg:#101827; --tgc-panel:#162235; --tgc-line:#33445e; --tgc-text:#e7eef9; --tgc-muted:#a9b7cc; --tgc-accent:#7dd3fc; --tgc-good:#86efac; --tgc-bad:#fca5a5;
      color:var(--tgc-text); background:var(--tgc-bg); border:1px solid var(--tgc-line); border-radius:12px; padding:16px; margin:16px 0; font:14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; box-sizing:border-box; }
    .tgc * { box-sizing:border-box; }
    .tgc h2,.tgc h3,.tgc p { margin:0; }
    .tgc h2 { font-size:19px; line-height:1.25; margin-bottom:4px; }
    .tgc h3 { font-size:15px; line-height:1.3; }
    .tgc p { color:var(--tgc-muted); }
    .tgc .tgc-muted { color:var(--tgc-muted); font-size:12px; }
    .tgc .tgc-header { display:flex; flex-wrap:wrap; gap:12px; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
    .tgc .tgc-status { color:var(--tgc-muted); font-size:12px; overflow-wrap:anywhere; }
    .tgc .tgc-fields { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto; gap:10px; align-items:end; margin-bottom:12px; }
    .tgc .tgc-field { display:flex; flex-direction:column; min-width:0; gap:5px; color:var(--tgc-muted); font-size:12px; }
    .tgc input,.tgc select,.tgc button { min-width:0; max-width:100%; color:var(--tgc-text); background:#0b1220; border:1px solid #41536e; border-radius:7px; padding:8px 9px; font:inherit; }
    .tgc input:focus,.tgc select:focus,.tgc button:focus { outline:2px solid var(--tgc-accent); outline-offset:1px; }
    .tgc button { cursor:pointer; white-space:nowrap; }
    .tgc button:hover { border-color:var(--tgc-accent); }
    .tgc .tgc-search { margin-bottom:10px; }
    .tgc .tgc-search input { width:100%; }
    .tgc .tgc-plots { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .tgc .tgc-panel { min-width:0; background:var(--tgc-panel); border:1px solid var(--tgc-line); border-radius:9px; padding:12px; }
    .tgc .tgc-panel-head { display:flex; flex-wrap:wrap; gap:6px; align-items:baseline; justify-content:space-between; margin-bottom:6px; }
    .tgc canvas { display:block; width:100%; height:270px; }
    .tgc .tgc-readout { min-height:36px; padding-top:6px; color:#d4dfef; font-size:12px; overflow-wrap:anywhere; }
    .tgc .tgc-legend { display:flex; flex-wrap:wrap; gap:8px 14px; color:#d4dfef; font-size:12px; }
    .tgc .tgc-legend span { display:inline-flex; align-items:center; gap:6px; }
    .tgc .tgc-swatch { display:inline-block; width:17px; height:3px; border-radius:2px; }
    .tgc .tgc-section { margin-top:12px; }
    .tgc .tgc-metrics { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:8px; }
    .tgc .tgc-metric { min-width:0; background:#0b1220; border:1px solid var(--tgc-line); border-radius:8px; padding:11px; overflow-wrap:anywhere; }
    .tgc .tgc-metric h3 { margin-bottom:7px; }
    .tgc .tgc-metric div { margin-top:3px; }
    .tgc .tgc-h2h { display:grid; grid-template-columns:minmax(150px,220px) minmax(0,1fr); gap:12px; align-items:start; margin-top:8px; }
    .tgc .tgc-pair-results { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .tgc .tgc-pair { min-width:0; border:1px solid var(--tgc-line); border-radius:8px; background:#0b1220; padding:11px; overflow-wrap:anywhere; }
    .tgc .tgc-pair h3 { margin-bottom:7px; }
    .tgc .tgc-positive { color:var(--tgc-good); }
    .tgc .tgc-negative { color:var(--tgc-bad); }
    .tgc .tgc-warning { color:#fcd34d; }
    .tgc .tgc-footnote { color:var(--tgc-muted); font-size:12px; margin-top:10px; }
    .tgc .tgc-error { border:1px solid #9f4545; background:#351d25; border-radius:8px; color:#fee2e2; padding:12px; overflow-wrap:anywhere; }
    @media (max-width:760px) { .tgc .tgc-plots { grid-template-columns:1fr; } .tgc .tgc-fields { grid-template-columns:1fr 1fr; } .tgc .tgc-fields button { grid-column:1/-1; } .tgc .tgc-h2h { grid-template-columns:1fr; } }
    @media (max-width:480px) { .tgc { padding:10px; } .tgc .tgc-metrics,.tgc .tgc-pair-results { grid-template-columns:1fr; } .tgc canvas { height:245px; } }
  `;

  function addStyles() {
    if (document.getElementById('tgc-style')) return;
    const style = document.createElement('style');
    style.id = 'tgc-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function rawDataUrl(pageTitle) {
    if (!window.mw || !mw.config) {
      throw new Error('MediaWiki configuration is unavailable. This script must run inside the wiki.');
    }
    const scriptPath = mw.config.get('wgScript') || '/index.php';
    const url = new URL(scriptPath, window.location.origin);
    url.searchParams.set('title', pageTitle);
    url.searchParams.set('action', 'raw');
    url.searchParams.set('ctype', 'application/json');
    url.searchParams.set('tgc_cache', String(Date.now()));
    return url.href;
  }

  function fetchData(pageTitle) {
    if (!DATA_PROMISES.has(pageTitle)) {
      const promise = fetch(rawDataUrl(pageTitle), { credentials: 'same-origin', cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('Data page returned HTTP ' + response.status + '.');
          return response.text();
        })
        .then(function (text) {
          let parsed;
          try { parsed = JSON.parse(text); }
          catch (error) { throw new Error('The data page is not valid raw JSON. Make sure it contains only the JSON object.'); }
          return normalizeData(parsed);
        });
      DATA_PROMISES.set(pageTitle, promise);
    }
    return DATA_PROMISES.get(pageTitle);
  }

  function nationLabel(nation) {
    return nation === 'Britain' ? 'UK' : nation;
  }

  function nationColor(nation) {
    return NATION_COLORS[nation] || '#cbd5e1';
  }

  // Extract the aircraft designation at the start of its full display name.
  // Examples: "Su-30SM2 Flanker-H" -> "Su-30SM2"; "Bf 109 F-1" -> "Bf 109 F-1".
  function shortNameFor(name, key) {
    const value = String(name || key || '').trim();
    const patterns = [
      /^(Bf\s*\d+\s+[A-Z]\s*-\s*\d+(?:\/[A-Za-z0-9]+)?)/i,
      /^(Me\s*\d+\s+[A-Z]\s*-\s*\d+[A-Za-z]?)/i,
      /^(Fw\s*\d+\s+[A-Z]\s*-\s*\d+[A-Za-z]?)/i,
      /^(He\s*\d+\s+[A-Z]\s*-\s*\d+[A-Za-z]?)/i,
      /^(Ta\s*\d+\s+[A-Z]\s*-\s*\d+[A-Za-z]?)/i,
      /^(Ho\s*\d+\s+[A-Z]\d+)/i,
      /^(F\/A-\d+[A-Z]?)/i,
      /^(M\.D\.\d+[A-Za-z0-9-]*)/i,
      /^(NC\.\d+[A-Za-z0-9-]*)/i,
      /^(D\.\d+[A-Za-z0-9-]*)/i,
      /^(Mirage\s+(?:\d+[A-Za-z0-9-]*|F1[A-Za-z0-9-]*|III[A-Za-z]*))/i,
      /^(Spitfire(?:\s+(?:(?:LF|F|FR)\s+)?Mk\.?\s*[A-Za-z0-9.]+)?)/i,
      /^(Alpha\s+Jet)/i,
      /^(Eurofighter)/i,
      /^(Super\s+Mystere)/i,
      /^(Hornet\s+Mk\.?\s*[IVX]+)/i,
      /^(Hunter\s+F\.?\s*\d+)/i,
      /^(Harrier\s+GR\.?\s*\d+)/i,
      /^(Lightning\s+F\.?\s*\d+)/i,
      /^(Meteor\s+F\.?\s*Mk\.?\s*\d+)/i,
      /^(Phantom\s+FG\.?\s*\d+)/i,
      /^(Swift\s+FR\s+Mk\.?\s*\d+)/i,
      /^([A-Za-z]+-\d+[A-Za-z0-9]*(?:-[A-Za-z0-9]+)*(?:\([^)]*\))?)/,
      /^([A-Za-z]+\d+[A-Za-z0-9]*(?:-[A-Za-z0-9]+)*(?:\([^)]*\))?)/
    ];

    for (let i = 0; i < patterns.length; i++) {
      const match = value.match(patterns[i]);
      if (match) return match[1].replace(/\s+/g, ' ').trim();
    }

    // For names without a conventional model number, retain a useful short label.
    return value.split(/\s+/).slice(0, 2).join(' ') || String(key || value);
  }

  function hexToRgba(hex, alpha) {
    const value = hex.replace('#', '');
    const number = parseInt(value, 16);
    const red = (number >> 16) & 255;
    const green = (number >> 8) & 255;
    const blue = number & 255;
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
  }

  // Draw a Catmull-Rom-like cubic curve through the supplied points.
  // Control-point clamping avoids artificial overshoot between measured samples.
  function traceSmoothPath(ctx, points) {
    if (!points.length) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const lowY = Math.min(p1.y, p2.y);
      const highY = Math.max(p1.y, p2.y);
      const cp1x = Math.max(p1.x, Math.min(p2.x, p1.x + (p2.x - p0.x) / 6));
      const cp2x = Math.max(p1.x, Math.min(p2.x, p2.x - (p3.x - p1.x) / 6));
      const cp1y = Math.max(lowY, Math.min(highY, p1.y + (p2.y - p0.y) / 6));
      const cp2y = Math.max(lowY, Math.min(highY, p2.y - (p3.y - p1.y) / 6));
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
  }

  function normalizeData(raw) {
    if (!raw || typeof raw !== 'object' || !raw.planes || typeof raw.planes !== 'object') {
      throw new Error('Expected an object with a "planes" property.');
    }
    const planes = [];
    const skipped = [];

    Object.entries(raw.planes).forEach(function (entry) {
      const key = entry[0];
      const source = entry[1];
      if (!source || !Array.isArray(source.speed) || !Array.isArray(source.ITR) || !Array.isArray(source.STR)) {
        skipped.push(key + ': missing speed, ITR, or STR array');
        return;
      }
      const speed = source.speed.map(Number);
      const ITR = source.ITR.map(Number);
      const STR = source.STR.map(Number);
      const validLengths = speed.length >= 2 && speed.length === ITR.length && speed.length === STR.length;
      const validValues = speed.every(Number.isFinite) && ITR.every(Number.isFinite) && STR.every(Number.isFinite);
      const ascending = speed.every(function (value, index) { return index === 0 || value >= speed[index - 1]; });
      if (!validLengths || !validValues || !ascending) {
        skipped.push(key + ': invalid array lengths, values, or speed order');
        return;
      }
      planes.push({
        key: key,
        name: String(source.name || key),
        shortName: shortNameFor(source.name || key, key),
        nation: String(source.nation || 'Unspecified'),
        speed: speed,
        ITR: ITR,
        STR: STR
      });
    });

    if (!planes.length) throw new Error('No valid aircraft were found in the data page.');
    planes.sort(function (a, b) { return a.name.localeCompare(b.name) || a.key.localeCompare(b.key); });
    return { planes: planes, info: raw._info || {}, skipped: skipped };
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function peakFor(plane, field) {
    const values = plane[field];
    const maximum = Math.max.apply(null, values);
    const indexes = [];
    values.forEach(function (value, index) { if (value === maximum) indexes.push(index); });
    return { value: maximum, minMach: plane.speed[indexes[0]], maxMach: plane.speed[indexes[indexes.length - 1]] };
  }

  function peakMachText(peak) {
    return peak.minMach === peak.maxMach
      ? peak.minMach.toFixed(2)
      : peak.minMach.toFixed(2) + '–' + peak.maxMach.toFixed(2);
  }

  function interpolate(plane, field, mach) {
    if (!Number.isFinite(mach)) return null;
    const xs = plane.speed;
    const ys = plane[field];
    if (mach < xs[0] - 1e-9 || mach > xs[xs.length - 1] + 1e-9) return null;
    if (mach <= xs[0]) return ys[0];
    if (mach >= xs[xs.length - 1]) return ys[ys.length - 1];
    for (let i = 0; i < xs.length - 1; i++) {
      if (mach >= xs[i] && mach <= xs[i + 1]) {
        const width = xs[i + 1] - xs[i];
        if (width <= 0) return ys[i];
        const fraction = (mach - xs[i]) / width;
        return ys[i] + fraction * (ys[i + 1] - ys[i]);
      }
    }
    return null;
  }

  function buildApp(root, data) {
    const planes = data.planes;
    const byKey = new Map(planes.map(function (plane) { return [plane.key, plane]; }));
    const preferredA = byKey.has('F15C') ? 'F15C' : planes[0].key;
    const preferredB = byKey.has('F16ADF') ? 'F16ADF' : (planes.find(function (p) { return p.key !== preferredA; }) || planes[0]).key;
    const state = { a: preferredA, b: preferredB, hover: { ITR: null, STR: null } };

    root.replaceChildren();
    root.classList.add('tgc');
    root.innerHTML = `
      <div class="tgc-header">
        <div><h2>Turn Graph Comparator</h2><p>Compare two aircraft at the same Mach. Rates are degrees per second.</p></div>
        <div class="tgc-status" data-role="status" role="status">Loading aircraft…</div>
      </div>
      <div class="tgc-search"><label class="tgc-field">Filter aircraft list <input data-role="search" type="search" placeholder="Search name, nation, or aircraft key…" autocomplete="off"></label></div>
      <div class="tgc-fields">
        <label class="tgc-field">Aircraft A <select data-role="plane-a"></select></label>
        <label class="tgc-field">Aircraft B <select data-role="plane-b"></select></label>
        <button type="button" data-role="swap">Swap aircraft</button>
      </div>
      <div class="tgc-plots">
        <section class="tgc-panel"><div class="tgc-panel-head"><h3>Instantaneous turn rate (ITR)</h3><span class="tgc-muted">°/s vs Mach</span></div><canvas data-chart="ITR" aria-label="Instantaneous turn rate chart" role="img"></canvas><div class="tgc-readout" data-readout="ITR">Move the pointer over the chart to inspect both aircraft at one Mach.</div><div class="tgc-legend" data-legend="ITR"></div></section>
        <section class="tgc-panel"><div class="tgc-panel-head"><h3>Sustained turn rate (STR)</h3><span class="tgc-muted">°/s vs Mach</span></div><canvas data-chart="STR" aria-label="Sustained turn rate chart" role="img"></canvas><div class="tgc-readout" data-readout="STR">Move the pointer over the chart to inspect both aircraft at one Mach.</div><div class="tgc-legend" data-legend="STR"></div></section>
      </div>
      <section class="tgc-section"><h3>Sampled turning peaks</h3><div class="tgc-metrics" data-role="metrics"></div><p class="tgc-footnote">Peak values are the highest recorded samples, not fitted theoretical maxima. A Mach interval means the peak is tied across multiple samples.</p></section>
      <section class="tgc-section"><h3>Same-speed head-to-head</h3><div class="tgc-h2h"><label class="tgc-field">Mach number<input data-role="mach" type="number" min="0" max="3" step="0.01" value="0.80"></label><div class="tgc-pair-results" data-role="pair-results"></div></div><p class="tgc-footnote">Intermediate values use linear interpolation. If the chosen Mach is outside either aircraft’s sampled speed range, the comparison is marked unavailable rather than extrapolated.</p></section>
      <p class="tgc-footnote" data-role="source-info"></p>
    `;

    const q = function (role) { return root.querySelector('[data-role="' + role + '"]'); };
    const chart = function (field) { return root.querySelector('[data-chart="' + field + '"]'); };
    const readout = function (field) { return root.querySelector('[data-readout="' + field + '"]'); };

    function renderOptions() {
      const search = q('search').value.trim().toLocaleLowerCase();
      const visible = planes.filter(function (plane) {
        return !search || [plane.key, plane.name, plane.nation, plane.shortName].join(' ').toLocaleLowerCase().includes(search) || plane.key === state.a || plane.key === state.b;
      });
      [['plane-a', 'a'], ['plane-b', 'b']].forEach(function (pair) {
        const select = q(pair[0]);
        const key = pair[1];
        const previous = state[key];
        select.replaceChildren();
        visible.forEach(function (plane) {
          const option = document.createElement('option');
          option.value = plane.key;
          option.textContent = nationLabel(plane.nation) + ': ' + plane.name;
          option.style.color = nationColor(plane.nation);
          option.style.backgroundColor = '#0b1220';
          select.appendChild(option);
        });
        if (!byKey.has(previous)) state[key] = (key === 'a' ? preferredA : preferredB);
        select.value = state[key];
        const selectedPlane = byKey.get(state[key]);
        select.style.color = selectedPlane ? nationColor(selectedPlane.nation) : '#e7eef9';
      });
    }

    function currentPlanes() { return [byKey.get(state.a), byKey.get(state.b)].filter(Boolean); }

    function renderLegends() {
      ['ITR', 'STR'].forEach(function (field) {
        const legend = root.querySelector('[data-legend="' + field + '"]');
        legend.replaceChildren();
        currentPlanes().forEach(function (plane, index) {
          const item = el('span');
          const swatch = el('i', 'tgc-swatch');
          swatch.style.backgroundColor = COLORS[index];
          item.append(swatch, document.createTextNode(plane.shortName));
          legend.appendChild(item);
        });
      });
    }

    function drawChart(field) {
      const canvas = chart(field);
      const ctx = canvas.getContext('2d');
      const width = canvas.clientWidth || 600;
      const height = canvas.clientHeight || 270;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const chosen = currentPlanes();
      const left = 48, right = width - 12, top = 14, bottom = height - 38;

      if (!chosen.length) return;
      const xValues = chosen.flatMap(function (plane) { return plane.speed; });
      const yValues = chosen.flatMap(function (plane) { return plane[field]; });
      let xMin = Math.min.apply(null, xValues), xMax = Math.max.apply(null, xValues);
      if (xMax - xMin < 0.02) { xMin -= 0.01; xMax += 0.01; }

      // Keep a consistent 0–45°/s scale so the colored performance zones mean the same thing.
      // If future data exceeds 45°/s, expand in 5° increments rather than clipping it.
      const dataMaximum = Math.max.apply(null, yValues);
      const yMax = Math.max(5, Math.ceil(dataMaximum / 5) * 5);  // change to (45, Math.ceil(stuff)) if full
      const xPos = function (x) { return left + (x - xMin) / (xMax - xMin) * (right - left); };
      const yPos = function (y) { return bottom - (y / yMax) * (bottom - top); };

      // Horizontal five-degree performance zones: red at the bottom, blue at the top.
      for (let band = 0; band < yMax / 5; band++) {
        const lower = band * 5;
        const upper = lower + 5;
        const bandColor = TURN_BANDS[Math.min(band, TURN_BANDS.length - 1)];
        const bandTop = yPos(upper);
        const bandBottom = yPos(lower);
        ctx.fillStyle = bandColor;
        ctx.fillRect(left, bandTop, right - left, bandBottom - bandTop);
      }

      ctx.font = '11px system-ui, sans-serif';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(190, 205, 225, 0.28)';
      ctx.fillStyle = '#c5d2e5';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let y = 0; y <= yMax; y += 5) {
        const py = yPos(y);
        ctx.beginPath(); ctx.moveTo(left, py); ctx.lineTo(right, py); ctx.stroke();
        ctx.fillText(String(y), left - 7, py);
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (let i = 0; i <= 5; i++) {
        const value = xMin + (xMax - xMin) * i / 5;
        const px = xPos(value);
        ctx.beginPath(); ctx.moveTo(px, top); ctx.lineTo(px, bottom); ctx.stroke();
        ctx.fillText(value.toFixed(2), px, bottom + 6);
      }
      ctx.save();
      ctx.translate(12, (top + bottom) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#e0e9f5'; ctx.fillText('Turn rate (°/s)', 0, 0);
      ctx.restore();
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillStyle = '#e0e9f5'; ctx.fillText('Mach', (left + right) / 2, height - 1);

      // Smooth, symbol-free curves with a transparent fill beneath each aircraft.
      chosen.forEach(function (plane, planeIndex) {
        const color = COLORS[planeIndex];
        const points = plane.speed.map(function (mach, index) {
          return { x: xPos(mach), y: yPos(plane[field][index]) };
        });
        if (!points.length) return;

        ctx.beginPath();
        traceSmoothPath(ctx, points);
        ctx.lineTo(points[points.length - 1].x, bottom);
        ctx.lineTo(points[0].x, bottom);
        ctx.closePath();
        const areaGradient = ctx.createLinearGradient(0, top, 0, bottom);
        areaGradient.addColorStop(0, hexToRgba(color, 0.30));
        areaGradient.addColorStop(1, hexToRgba(color, 0.015));
        ctx.fillStyle = areaGradient;
        ctx.fill();

        ctx.beginPath();
        traceSmoothPath(ctx, points);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      const hoverMach = state.hover[field];
      if (Number.isFinite(hoverMach) && hoverMach >= xMin && hoverMach <= xMax) {
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 248, 255, 0.85)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(xPos(hoverMach), top); ctx.lineTo(xPos(hoverMach), bottom); ctx.stroke();
        ctx.restore();

        // Markers only appear during hover; the underlying samples remain available for inspection.
        chosen.forEach(function (plane, planeIndex) {
          const value = interpolate(plane, field, hoverMach);
          if (value === null) return;
          const pointX = xPos(hoverMach);
          const pointY = yPos(value);
          ctx.beginPath();
          ctx.arc(pointX, pointY, 4.2, 0, Math.PI * 2);
          ctx.fillStyle = COLORS[planeIndex];
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#f8fafc';
          ctx.stroke();
        });
      }

      canvas._tgcPlot = { left: left, right: right, top: top, bottom: bottom, xMin: xMin, xMax: xMax };
    }

    function showHover(field, event) {
      const canvas = chart(field), plot = canvas._tgcPlot;
      if (!plot) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      if (x < plot.left || x > plot.right) return;
      const mach = plot.xMin + (x - plot.left) / (plot.right - plot.left) * (plot.xMax - plot.xMin);
      state.hover[field] = mach;
      drawChart(field);
      const lines = currentPlanes().map(function (plane, index) {
        const value = interpolate(plane, field, mach);
        return plane.shortName + ': ' + (value === null ? 'not sampled at this Mach' : value.toFixed(2) + '°/s');
      });
      readout(field).textContent = 'Mach ' + mach.toFixed(3) + ' · ' + lines.join(' | ');
    }

    function renderMetrics() {
      const target = q('metrics');
      target.replaceChildren();
      currentPlanes().forEach(function (plane) {
        const itr = peakFor(plane, 'ITR'), str = peakFor(plane, 'STR');
        const card = el('div', 'tgc-metric');
        // card.appendChild(el('h3', '', plane.name + ' (' + plane.key + ')'));  // no short names
        card.appendChild(el('h3', '', plane.name));
        card.appendChild(el('div', '', 'Peak ITR: ' + itr.value.toFixed(1) + '°/s at Mach ' + peakMachText(itr)));
        card.appendChild(el('div', '', 'Peak STR: ' + str.value.toFixed(1) + '°/s at Mach ' + peakMachText(str)));
        target.appendChild(card);
      });
    }

    function renderPair() {
      const target = q('pair-results');
      target.replaceChildren();
      const a = byKey.get(state.a), b = byKey.get(state.b);
      const mach = Number(q('mach').value);
      if (!a || !b || !Number.isFinite(mach)) {
        target.appendChild(el('div', 'tgc-pair tgc-warning', 'Choose two aircraft and enter a valid Mach number.'));
        return;
      }
      [['ITR', 'Instantaneous turn rate'], ['STR', 'Sustained turn rate']].forEach(function (entry) {
        const field = entry[0], label = entry[1];
        const va = interpolate(a, field, mach), vb = interpolate(b, field, mach);
        const card = el('div', 'tgc-pair');
        card.appendChild(el('h3', '', label + ' at Mach ' + mach.toFixed(2)));
        if (va === null || vb === null) {
          card.appendChild(el('div', 'tgc-warning', 'Unavailable: Mach is outside at least one aircraft’s sampled speed range.'));
          card.appendChild(el('div', 'tgc-muted', 'A: ' + a.speed[0].toFixed(2) + '–' + a.speed[a.speed.length - 1].toFixed(2) + ' · B: ' + b.speed[0].toFixed(2) + '–' + b.speed[b.speed.length - 1].toFixed(2)));
        } else {
          card.appendChild(el('div', '', a.shortName + ': ' + va.toFixed(2) + '°/s'));
          card.appendChild(el('div', '', b.shortName + ': ' + vb.toFixed(2) + '°/s'));
          const delta = va - vb;
          const tied = Math.abs(delta) < TIE_EPSILON;
          const lead = tied ? 'Approximately tied' : (delta > 0 ? a.shortName + ' leads' : b.shortName + ' leads');
          card.appendChild(el('div', tied ? '' : (delta > 0 ? 'tgc-positive' : 'tgc-negative'), lead + (tied ? '' : ' by ' + Math.abs(delta).toFixed(2) + '°/s')));
        }
        target.appendChild(card);
      });
    }

    function renderAll() {
      renderOptions();
      renderLegends();
      drawChart('ITR');
      drawChart('STR');
      renderMetrics();
      renderPair();
    }

    q('search').addEventListener('input', renderOptions);
    q('plane-a').addEventListener('change', function (event) { state.a = event.target.value; renderAll(); });
    q('plane-b').addEventListener('change', function (event) { state.b = event.target.value; renderAll(); });
    q('swap').addEventListener('click', function () { const oldA = state.a; state.a = state.b; state.b = oldA; renderAll(); });
    q('mach').addEventListener('input', renderPair);
    ['ITR', 'STR'].forEach(function (field) {
      chart(field).addEventListener('pointermove', function (event) { showHover(field, event); });
      chart(field).addEventListener('pointerleave', function () {
        state.hover[field] = null;
        drawChart(field);
        readout(field).textContent = 'Move the pointer over the chart to inspect both aircraft at one Mach.';
      });
    });
    window.addEventListener('resize', function () { drawChart('ITR'); drawChart('STR'); });

    const info = data.info || {};
    const details = [planes.length + ' aircraft', (info.altitude || 'altitude unspecified'), (info.loadout || 'loadout unspecified'), 'speed axis: Mach'];
    if (info.points) details.push(info.points + ' sampled points per aircraft');
    q('source-info').textContent = details.join(' · ') + '. Peaks and curves reflect the supplied dataset, not a live measurement of Roblox physics.';
    const statusParts = ['Data loaded'];
    if (data.skipped.length) statusParts.push('skipped ' + data.skipped.length + ' invalid entries');
    q('status').textContent = statusParts.join(' · ');
    if (data.skipped.length) q('status').classList.add('tgc-warning');
    renderAll();
  }

  function showError(root, error) {
    root.replaceChildren();
    root.classList.add('tgc');
    const box = el('div', 'tgc-error');
    box.appendChild(el('strong', '', 'Turn Graph Comparator could not load.'));
    box.appendChild(el('p', '', error && error.message ? error.message : String(error)));
    box.appendChild(el('p', '', 'Check that the data page title is correct and that the page contains raw JSON with a top-level "planes" object.'));
    root.appendChild(box);
  }

  function boot() {
    const roots = Array.from(document.querySelectorAll('.turn-graph-comparator'));
    if (!roots.length) return;
    addStyles();
    roots.forEach(function (root) {
      if (root.dataset.tgcInitialized === 'yes') return;
      root.dataset.tgcInitialized = 'yes';
      const pageTitle = root.getAttribute('data-data-page') || 'TurnGraphData.json';
      fetchData(pageTitle).then(function (data) { buildApp(root, data); }).catch(function (error) { showError(root, error); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();