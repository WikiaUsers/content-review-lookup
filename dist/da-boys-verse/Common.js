// Auto-fill current month and year for the Calendar module
document.addEventListener("DOMContentLoaded", function() {
    // Find all elements that use the Calendar template
    document.querySelectorAll('[data-mw*="Calendar|main"]').forEach(function(el) {
        const today = new Date();
        const month = today.getMonth() + 1; // JS months are 0–11
        const year = today.getFullYear();

        // Get the original wikitext
        let text = el.textContent;

        // Replace month/year parameters if they exist, otherwise add them
        if (text.includes("month=")) {
            text = text.replace(/month=\{\{\{month\|.*?\}\}\}/, `month=${month}`);
        } else {
            text = text.replace("Calendar|main", `Calendar|main|month=${month}`);
        }

        if (text.includes("year=")) {
            text = text.replace(/year=\{\{\{year\|.*?\}\}\}/, `year=${year}`);
        } else {
            text = text.replace("month=" + month, `month=${month}|year=${year}`);
        }

        // Replace the element’s contents with the updated template
        el.textContent = text;
    });
});

/* Character Stats Radar - creates SVG polygons from simple data attributes.
   Place a container: <div class="stats-radar" data-vocals="3" ...></div>
   JS will generate the SVG, path, and labels. Works with Ajax page changes. */

( function ( mw, window, document ) {
  'use strict';

  // helper: create an SVG element in the SVG namespace
  function svgEl(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    if (attrs) Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
    return el;
  }

  // Build a single radar chart inside the given container
  function buildRadar(container) {
    // avoid double-build
    if (container.dataset.radarBuilt === '1') return;
    container.dataset.radarBuilt = '1';

    const max = 5;
    // read values (coerce to numbers and clamp 0..max)
    const vals = [
      Number(container.dataset.vocals || 0),
      Number(container.dataset.stamina || 0),
      Number(container.dataset.talent || 0),
      Number(container.dataset.mental || 0),
      Number(container.dataset.star || 0),
      Number(container.dataset.visuals || 0)
    ].map(v => Math.min(max, Math.max(0, Number.isFinite(v) ? v : 0)));

    // create svg area
    const wrapper = document.createElement('div');
    wrapper.className = 'radar-canvas';
    const svg = svgEl('svg', { viewBox: '0 0 200 200', preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true' });

    // optional: create a subtle outer pent/hex grid (6 levels)
    const grid = svgEl('g', { class: 'radar-grid' });
    const centerX = 100, centerY = 100;
    const levels = 5;
    const outer = 85; // px radius for max
    const axes = vals.length;
    for (let L = levels; L >= 1; L--) {
      const r = outer * (L / levels);
      // polygon points for this level
      let pts = [];
      for (let i = 0; i < axes; i++) {
        const angle = (Math.PI * 2 / axes) * i - Math.PI/2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        pts.push(`${x},${y}`);
      }
      const poly = svgEl('polygon', {
        points: pts.join(' '),
        fill: L % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.012)',
        class: 'radar-outline'
      });
      grid.appendChild(poly);
    }
    svg.appendChild(grid);

    // create the fill polygon (programmatically so it's not in template HTML)
    const poly = svgEl('polygon', { class: 'radar-fill' });
    svg.appendChild(poly);

    // optionally add small nodes at points
    const nodesGroup = svgEl('g', { class: 'radar-nodes' });
    svg.appendChild(nodesGroup);

    wrapper.appendChild(svg);
    // add labels overlay
    const labels = document.createElement('div');
    labels.className = 'radar-labels';
    labels.innerHTML = ''
      + '<span class="label label-vocals">Vocals</span>'
      + '<span class="label label-stamina">Stamina</span>'
      + '<span class="label label-talent">Talent</span>'
      + '<span class="label label-mental">Mental Strength</span>'
      + '<span class="label label-star">Star Potential</span>'
      + '<span class="label label-visuals">Visuals</span>';

    container.appendChild(wrapper);
    container.appendChild(labels);

    // compute polygon points for the values
    function setShape() {
      const pts = vals.map((val, i) => {
        const angle = (Math.PI * 2 / vals.length) * i - Math.PI/2;
        const radius = outer * (val / max);
        const x = (centerX + Math.cos(angle) * radius).toFixed(4);
        const y = (centerY + Math.sin(angle) * radius).toFixed(4);
        return `${x},${y}`;
      }).join(' ');
      poly.setAttribute('points', pts);

      // create/position nodes
      while (nodesGroup.firstChild) nodesGroup.removeChild(nodesGroup.firstChild);
      vals.forEach((val, i) => {
        const angle = (Math.PI * 2 / vals.length) * i - Math.PI/2;
        const radius = outer * (val / max);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const c = svgEl('circle', { cx: x, cy: y, r: 3, class: 'radar-node' });
        nodesGroup.appendChild(c);
      });
    }

    setShape();

    // store reference so we can update later if needed
    container._radar = { svg, poly, setShape };
  }

  // find all containers and build them
  function buildAll() {
    const charts = document.querySelectorAll('.stats-radar');
    charts.forEach(buildRadar);
  }

  // on DOM ready and on mw ajax content replaced
  function onReady() {
    buildAll();
  }

  if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
    setTimeout(onReady, 10);
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

  // If MediaWiki hooks exist, listen for content replacement
  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(buildAll);
  }

  // expose a small API for updating values via JS if desired
  window.FandomRadar = {
    rebuild: buildAll,
    updateContainer: function(container, data) {
      // accept an element or selector and values object
      const el = (typeof container === 'string') ? document.querySelector(container) : container;
      if (!el || !el._radar) return;
      ['vocals','stamina','talent','mental','star','visuals'].forEach(k => {
        if (k in data) el.dataset[k] = data[k];
      });
      // refresh internal cached vals by forcing rebuild (simple approach)
      // easiest is to remove built marker and rebuild
      el.dataset.radarBuilt = '';
      buildRadar(el);
    }
  };

} )( mw, window, document );