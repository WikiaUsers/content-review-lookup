/* =====================================================================
   Merchant Run Odds Calculator — Fandom gadget
   -------------------------------------------------------------------
   Paste this ENTIRE file into MediaWiki:Common.js on your wiki.

   It only builds the calculator on ONE article — the page named in
   TARGET_PAGE below. Everywhere else on the wiki it does nothing.

   On the target article, put this single line in the page's wikitext
   (use the source editor, not the visual editor):

       <div id="merchant-calc-root"></div>

   That's it. See the chat message for full step-by-step instructions.
   ===================================================================== */
(function () {
  'use strict';

  // ---- Change this if your article has a different title ----------
  var TARGET_PAGE = 'Merchant'.replace(/ /g, '_');

  if (mw.config.get('wgPageName') !== TARGET_PAGE) {
    return;
  }

  function init() {
    var root = document.getElementById('merchant-calc-root');
    if (!root) return; // no mount point found on this page, do nothing

    // ---- Load the webfonts the design uses (once) ------------------
    if (!document.getElementById('merchant-calc-fonts')) {
      var preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect);

      var fontLink = document.createElement('link');
      fontLink.id = 'merchant-calc-fonts';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(fontLink);
    }

    // ---- Inject styles, scoped to #merchant-calc-root ---------------
    var style = document.createElement('style');
    style.id = 'merchant-calc-style';
    style.textContent = `
#merchant-calc-root{
  --bg:#0F1E1A;
  --surface:#16281F;
  --surface-2:#1E362A;
  --line: rgba(237,230,211,0.12);
  --paper:#F1E8D4;
  --paper-line: rgba(43,32,19,0.14);
  --ink:#2B2013;
  --ink-soft: rgba(43,32,19,0.62);
  --text:#EDE6D3;
  --text-muted:#9CB0A4;
  --gold:#C69C3F;
  --copper:#B5652F;
  --slate:#5E8FB0;
  --hero1: var(--slate);
  --hero2: var(--gold);
  --hero3: var(--copper);

  background: var(--bg);
  color: var(--text);
  font-family:'Inter', -apple-system, sans-serif;
  font-feature-settings:'tnum' 1;
  line-height:1.4;
  border-radius:16px;
  padding:4px;
}
#merchant-calc-root, #merchant-calc-root *{ box-sizing:border-box; }

#merchant-calc-root .wrap{
  max-width:1180px;
  margin:0 auto;
  padding: 16px 24px;
  display:flex;
  flex-direction:column;
}
#merchant-calc-root header{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:24px;
  flex-wrap:wrap;
  margin-bottom:12px;
  border-bottom:1px solid var(--line);
  padding-bottom:10px;
  flex:none;
}
#merchant-calc-root h1{
  font-family:'Fraunces', serif;
  font-weight:600;
  font-size:clamp(22px,3vw,30px);
  margin:0;
  letter-spacing:-0.01em;
}
#merchant-calc-root .subtitle{
  font-style:italic;
  font-size:12.5px;
  color:var(--text-muted);
  margin:4px 0 0;
}
#merchant-calc-root .layout{
  display:grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap:20px;
  align-items:stretch;
}
@media (max-width: 880px){
  #merchant-calc-root .layout{ grid-template-columns: 1fr; }
}

#merchant-calc-root .panel{
  background: var(--surface);
  border:1px solid var(--line);
  border-radius:14px;
  padding:16px;
}
#merchant-calc-root .panel + .panel{ margin-top:14px; }

#merchant-calc-root .panel h2{
  font-family:'Fraunces', serif;
  font-weight:600;
  font-size:15px;
  margin:0 0 12px;
}

#merchant-calc-root .field{
  margin-bottom:10px;
}
#merchant-calc-root .field:last-child{ margin-bottom:0; }
#merchant-calc-root .field label{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  font-size:12.5px;
  color:var(--text-muted);
  margin-bottom:5px;
}
#merchant-calc-root .field input[type=number]{
  width:100%;
  background: var(--surface-2);
  border:1px solid var(--line);
  color:var(--text);
  font-family:'Inter',sans-serif;
  font-size:14px;
  font-weight:600;
  padding:7px 10px;
  border-radius:8px;
  -moz-appearance:textfield;
}
#merchant-calc-root .field input[type=number]:focus{
  outline:2px solid var(--gold);
  outline-offset:1px;
}
#merchant-calc-root .field input[type=number]::-webkit-outer-spin-button,
#merchant-calc-root .field input[type=number]::-webkit-inner-spin-button{
  -webkit-appearance:none; margin:0;
}

#merchant-calc-root .main-col{
  display:flex;
  flex-direction:column;
}
#merchant-calc-root .stat-cards{
  display:grid;
  grid-template-columns:repeat(3, minmax(0, 1fr));
  gap:12px;
  margin-bottom:12px;
  flex:none;
}
@media (max-width:700px){ #merchant-calc-root .stat-cards{ grid-template-columns:1fr; } }
#merchant-calc-root .stat-card{
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:12px;
  padding:12px 14px 11px;
  border-top:3px solid var(--hero-color);
}
#merchant-calc-root .stat-card .name{
  display:flex; align-items:center; gap:8px;
  font-size:12.5px; color:var(--text-muted); margin-bottom:8px;
}
#merchant-calc-root .stat-card .name .hero-dot{ width:8px;height:8px; }
#merchant-calc-root .stat-card .row{
  display:flex; justify-content:space-between; align-items:baseline;
  margin-bottom:4px;
}
#merchant-calc-root .stat-card .row:last-child{ margin-bottom:0; }
#merchant-calc-root .stat-card .row .l{ font-size:12px; color:var(--text-muted); }
#merchant-calc-root .stat-card .row .v{ font-family:'Fraunces',serif; font-weight:600; font-size:16.5px; }
#merchant-calc-root .stat-card .row.total .v{ color:var(--gold); }

#merchant-calc-root .chart-toggle{
  display:inline-flex;
  align-items:center;
  gap:8px;
  background:var(--surface);
  border:1px solid var(--line);
  color:var(--text);
  font-family:'Inter',sans-serif;
  font-size:12.5px;
  font-weight:600;
  padding:7px 14px;
  border-radius:9px;
  cursor:pointer;
  margin-bottom:12px;
  flex:none;
  align-self:flex-start;
}
#merchant-calc-root .chart-toggle:hover{ border-color:var(--gold); }
#merchant-calc-root .chart-toggle:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }

#merchant-calc-root .chart-panel{
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:14px;
  padding:16px 16px 8px;
  margin-bottom:12px;
  flex:none;
}
#merchant-calc-root .chart-panel h2{
  font-family:'Fraunces',serif;
  font-weight:600;
  font-size:15px;
  margin:0 0 2px;
}
#merchant-calc-root .chart-panel .sub{ font-size:12px; color:var(--text-muted); margin:0 0 6px; }
#merchant-calc-root .legend{
  display:flex; gap:18px; margin-bottom:8px; flex-wrap:wrap;
}
#merchant-calc-root .legend span{
  display:flex; align-items:center; gap:6px;
  font-size:12px; color:var(--text-muted);
}
#merchant-calc-root .legend .hero-dot{ width:8px; height:8px; }
#merchant-calc-root svg.dist-chart{ width:100%; height:auto; display:block; }

#merchant-calc-root .ledger{
  background:var(--paper);
  color:var(--ink);
  border-radius:14px;
  padding:0;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  margin-top:14px;
}
#merchant-calc-root .ledger .ledger-head{
  padding:14px 20px 10px;
  border-bottom:1px solid var(--paper-line);
  flex:none;
}
#merchant-calc-root .ledger .ledger-head h2{
  font-family:'Fraunces',serif;
  font-weight:700;
  font-size:16px;
  margin:0;
}
#merchant-calc-root .table-scroll{
  overflow:auto;
  max-height:630px;
}
#merchant-calc-root table{
  width:100%;
  border-collapse:collapse;
  font-size:12.5px;
}
#merchant-calc-root thead th{
  text-align:left;
  font-weight:600;
  font-size:11px;
  letter-spacing:0.02em;
  color:var(--ink-soft);
  padding:6px 20px;
  border-bottom:1px solid var(--paper-line);
  white-space:nowrap;
  position:sticky;
  top:0;
  background:var(--paper);
}
#merchant-calc-root thead th.num, #merchant-calc-root tbody td.num{ text-align:right; }
#merchant-calc-root tbody td{
  padding:5px 20px;
  border-bottom:1px solid var(--paper-line);
  vertical-align:middle;
}
#merchant-calc-root tbody tr:last-child td{ border-bottom:none; }
#merchant-calc-root tbody tr:hover{ background:rgba(43,32,19,0.045); }
#merchant-calc-root td.good-name{ font-weight:600; }
#merchant-calc-root td.value{ color:var(--ink-soft); font-variant-numeric:tabular-nums; }
#merchant-calc-root .odds-cell{ display:flex; align-items:center; gap:8px; justify-content:flex-end; }
#merchant-calc-root .odds-cell .num-label{
  font-variant-numeric:tabular-nums;
  min-width:60px;
  text-align:right;
}
#merchant-calc-root .bar-track{
  width:52px; height:6px;
  background:rgba(43,32,19,0.08);
  border-radius:4px;
  overflow:hidden;
  flex:none;
}
#merchant-calc-root .bar-fill{ height:100%; border-radius:4px; }

#merchant-calc-root footer{
  flex:none;
  margin-top:8px;
  font-size:11px;
  color:var(--text-muted);
  text-align:center;
}
    `;
    document.head.appendChild(style);

    // ---- Build the markup --------------------------------------------
    root.innerHTML = `
<div class="wrap">

  <header>
    <div>
      <h1>Merchant calculator</h1>
      <p class="subtitle">Created by DGM</p>
    </div>
  </header>

  <div class="layout">

    <!-- LEFT: controls -->
    <div>
      <div class="panel">
        <h2>Merchant skill</h2>

        <div class="field">
          <label>Hero 1</label>
          <input type="number" id="in-skill1" value="39" min="0" max="100" step="0.1">
        </div>
        <div class="field">
          <label>Hero 2</label>
          <input type="number" id="in-skill2" value="38" min="0" max="100" step="0.1">
        </div>
        <div class="field">
          <label>Hero 3</label>
          <input type="number" id="in-skill3" value="40" min="0" max="100" step="0.1">
        </div>
      </div>
    </div>

    <!-- RIGHT: results -->
    <div class="main-col">
      <div class="stat-cards">
        <div class="stat-card" style="--hero-color:var(--hero1)">
          <div class="name"><span class="hero-dot" style="background:var(--hero1)"></span>Hero 1</div>
          <div class="row"><span class="l">Average payout</span><span class="v" id="out-avg1">—</span></div>
          <div class="row total"><span class="l">Per day</span><span class="v" id="out-day1">—</span></div>
        </div>
        <div class="stat-card" style="--hero-color:var(--hero2)">
          <div class="name"><span class="hero-dot" style="background:var(--hero2)"></span>Hero 2</div>
          <div class="row"><span class="l">Average payout</span><span class="v" id="out-avg2">—</span></div>
          <div class="row total"><span class="l">Per day</span><span class="v" id="out-day2">—</span></div>
        </div>
        <div class="stat-card" style="--hero-color:var(--hero3)">
          <div class="name"><span class="hero-dot" style="background:var(--hero3)"></span>Hero 3</div>
          <div class="row"><span class="l">Average payout</span><span class="v" id="out-avg3">—</span></div>
          <div class="row total"><span class="l">Per day</span><span class="v" id="out-day3">—</span></div>
        </div>
      </div>

      <button class="chart-toggle" id="chart-toggle" type="button" aria-expanded="false">Show distribution graph</button>

      <div class="chart-panel" id="chart-panel" hidden>
        <h2>Distribution across trade goods</h2>
        <p class="sub">Probability of a run ending on each good, shaped by roll count and skill.</p>
        <div class="legend">
          <span><span class="hero-dot" style="background:var(--hero1)"></span>Hero 1</span>
          <span><span class="hero-dot" style="background:var(--hero2)"></span>Hero 2</span>
          <span><span class="hero-dot" style="background:var(--hero3)"></span>Hero 3</span>
        </div>
        <svg class="dist-chart" id="dist-chart" viewBox="0 0 1000 260" preserveAspectRatio="none"></svg>
      </div>
    </div>
  </div>

  <div class="ledger">
    <div class="ledger-head">
      <h2>Trade good odds</h2>
    </div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Trade good</th>
            <th class="num">Value</th>
            <th class="num">Odds — Hero 1</th>
            <th class="num">Odds — Hero 2</th>
            <th class="num">Odds — Hero 3</th>
          </tr>
        </thead>
        <tbody id="ledger-body"></tbody>
      </table>
    </div>
  </div>

  <footer>All figures recompute in your browser from the inputs above — nothing is sent anywhere.</footer>
</div>
    `;

    // ---- Wire up the calculator ---------------------------------------
    runCalculator();
  }

  function runCalculator() {
    const GOODS = [
      {name:'Coins', value:0},
      {name:'Hides', value:10000},
      {name:'Paper', value:20000},
      {name:'Timber', value:30000},
      {name:'Wheat', value:40000},
      {name:'Clothes', value:50000},
      {name:'Oil', value:75000},
      {name:'Salt', value:100000},
      {name:'Grapes', value:125000},
      {name:'Bronze', value:175000},
      {name:'Iron', value:225000},
      {name:'Wine', value:300000},
      {name:'Silk', value:400000},
      {name:'Dyes', value:550000},
      {name:'Spices', value:750000},
      {name:'Ivory', value:1000000},
      {name:'Silver', value:1500000},
      {name:'Gold', value:2000000},
      {name:'Gems', value:3000000},
    ];

    const HERO_COLORS = ['#5E8FB0', '#C69C3F', '#B5652F'];

    // Binomial PMF via stable multiplicative recurrence: pmf(0)=(1-p)^n,
    // pmf(k) = pmf(k-1) * (n-k+1)/k * p/(1-p)
    function binomPMF(k, n, p) {
      if (p <= 0) return k === 0 ? 1 : 0;
      if (p >= 1) return k === n ? 1 : 0;
      if (k < 0 || k > n) return 0;
      let pmf = Math.pow(1 - p, n);
      const ratio = p / (1 - p);
      for (let i = 1; i <= k; i++) {
        pmf *= ((n - i + 1) / i) * ratio;
      }
      return pmf;
    }

    function fmtInt(x){
      return Math.round(x).toLocaleString('en-US');
    }
    function fmtGold(x){
      const rounded = Math.round(x / 1000) * 1000;
      if (rounded >= 1000000) {
        let str = (rounded / 1000000).toFixed(2);
        str = str.replace(/0+$/, '').replace(/\.$/, '');
        str = str.replace('.', ',');
        return '🪙' + str + 'M';
      }
      return '🪙' + (rounded / 1000) + 'k';
    }
    function fmtPct(p){
      const pct = p * 100;
      if (pct === 0) return '0%';
      if (pct >= 1) return pct.toFixed(2) + '%';
      if (pct >= 0.01) return pct.toFixed(3) + '%';
      return pct.toFixed(4) + '%';
    }

    // Run settings — fixed, same as the source sheet. Not user-editable,
    // but still drive every calculation below.
    const RUN_SETTINGS = {
      ticks: 12,
      rolls: 2,
      ticklen: 30,
    };

    function getInputs(){
      return {
        ticks: RUN_SETTINGS.ticks,
        rolls: RUN_SETTINGS.rolls,
        ticklen: RUN_SETTINGS.ticklen,
        skills: [
          parseFloat(document.getElementById('in-skill1').value) || 0,
          parseFloat(document.getElementById('in-skill2').value) || 0,
          parseFloat(document.getElementById('in-skill3').value) || 0,
        ]
      };
    }

    function buildChart(oddsByHero, maxOdds){
      const svg = document.getElementById('dist-chart');
      const W = 1000, H = 260, padL = 20, padR = 20, padT = 14, padB = 24;
      const n = GOODS.length;
      const stepX = (W - padL - padR) / (n - 1);
      const yScale = (v) => H - padB - (v / (maxOdds || 1)) * (H - padT - padB);
      const xScale = (i) => padL + i * stepX;

      let svgParts = [];

      // baseline
      svgParts.push(`<line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="rgba(237,230,211,0.18)" stroke-width="1"/>`);

      oddsByHero.forEach((odds, hi) => {
        let d = '';
        odds.forEach((v, i) => {
          const x = xScale(i), y = yScale(v);
          d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
        });
        svgParts.push(`<path d="${d}" fill="none" stroke="${HERO_COLORS[hi]}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.95"/>`);
      });

      // x-axis labels (every good, rotated small set to avoid clutter - show every other)
      GOODS.forEach((g, i) => {
        if (i % 2 !== 0 && n > 12) return;
        const x = xScale(i);
        svgParts.push(`<text x="${x}" y="${H-6}" font-size="10" fill="rgba(237,230,211,0.55)" text-anchor="middle" font-family="Inter, sans-serif">${g.name}</text>`);
      });

      svg.innerHTML = svgParts.join('');
    }

    function recompute(){
      const {ticks, rolls, ticklen, skills} = getInputs();
      const n = ticks * rolls;
      const cyclesPerDay = (ticks * ticklen) > 0 ? (24 * 60) / (ticks * ticklen) : 0;

      const oddsByHero = skills.map(skillPct => {
        const p = skillPct / 100;
        return GOODS.map((g, k) => binomPMF(k, n, p));
      });

      const avgPayout = oddsByHero.map(odds =>
        odds.reduce((sum, o, i) => sum + o * GOODS[i].value, 0)
      );
      const avgPerDay = avgPayout.map(v => v * cyclesPerDay);

      [1,2,3].forEach((num, i) => {
        document.getElementById('out-avg' + num).textContent = fmtGold(avgPayout[i]);
        document.getElementById('out-day' + num).textContent = fmtGold(avgPerDay[i]);
      });

      const maxOdds = Math.max(...oddsByHero.flat());
      buildChart(oddsByHero, maxOdds);

      // Ledger table
      const tbody = document.getElementById('ledger-body');
      tbody.innerHTML = GOODS.map((g, i) => {
        const cells = [0,1,2].map(h => {
          const o = oddsByHero[h][i];
          const widthPct = maxOdds > 0 ? Math.max(2, (o / maxOdds) * 100) : 0;
          return `<td class="num">
            <div class="odds-cell">
              <div class="bar-track"><div class="bar-fill" style="width:${widthPct}%; background:${HERO_COLORS[h]}"></div></div>
              <span class="num-label">${fmtPct(o)}</span>
            </div>
          </td>`;
        }).join('');
        return `<tr>
          <td class="good-name">${g.name}</td>
          <td class="num value">${g.value === 0 ? '—' : fmtGold(g.value)}</td>
          ${cells}
        </tr>`;
      }).join('');
    }

    document.querySelectorAll('input[type=number]').forEach(el => {
      el.addEventListener('input', recompute);
    });

    const chartToggle = document.getElementById('chart-toggle');
    const chartPanel = document.getElementById('chart-panel');
    chartToggle.addEventListener('click', () => {
      const isHidden = chartPanel.hasAttribute('hidden');
      if (isHidden) {
        chartPanel.removeAttribute('hidden');
        chartToggle.textContent = 'Hide distribution graph';
        chartToggle.setAttribute('aria-expanded', 'true');
      } else {
        chartPanel.setAttribute('hidden', '');
        chartToggle.textContent = 'Show distribution graph';
        chartToggle.setAttribute('aria-expanded', 'false');
      }
    });

    recompute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();