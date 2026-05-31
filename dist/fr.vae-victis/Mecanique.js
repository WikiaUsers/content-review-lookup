/* === Vae Victis — MécaniquesRP === */
(function () {

  var MOUNT_ID = 'vv-mecaniques-rp';

  var CSS = `
.vv-rp { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; max-width: 680px; margin: 0 auto; padding: 1rem 0 2rem; }
.vv-rp .vv-page-title { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #888; margin-bottom: 6px; }
.vv-rp .vv-heading { font-size: 24px; font-weight: 600; color: #111; margin-bottom: 12px; line-height: 1.2; }
.vv-rp .vv-intro { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 2rem; border-left: 2px solid #ddd; padding-left: 14px; }
.vv-rp .vv-hint { font-size: 12px; color: #aaa; text-align: center; margin-bottom: .75rem; font-style: italic; }
.vv-rp .vv-ring-wrap { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.vv-rp .vv-detail { border-radius: 12px; border: 1px solid #e0ddd6; background: #fff; padding: 16px 18px; margin-bottom: 1.5rem; min-height: 72px; transition: border-color .3s; }
.vv-rp .vv-detail.active { border-color: var(--vv-col, #ddd); }
.vv-rp .vv-detail-title { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 6px; }
.vv-rp .vv-detail-body { font-size: 13px; color: #555; line-height: 1.65; }
.vv-rp .vv-detail-body ul { padding-left: 16px; margin-top: 5px; }
.vv-rp .vv-detail-body li { margin-bottom: 3px; }
.vv-rp .vv-detail-body strong { color: #333; font-weight: 600; }
.vv-rp .vv-section-label { font-size: 11px; font-weight: 600; letter-spacing: .08em; color: #aaa; text-transform: uppercase; margin-bottom: 8px; }
.vv-rp .vv-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.vv-rp .vv-pill { font-size: 12px; padding: 5px 14px; border-radius: 99px; border: 1px solid #ddd; background: #fff; color: #666; cursor: pointer; transition: background .15s, color .15s, border-color .15s, transform .1s; user-select: none; }
.vv-rp .vv-pill:hover { border-color: #bbb; color: #333; transform: translateY(-1px); }
.vv-rp .vv-pill.on { background: #2c2c2c; border-color: #2c2c2c; color: #fff; }
.vv-rp .vv-pill-info { display: none; background: #f9f8f5; border-radius: 10px; border: 1px solid #e8e5de; padding: 12px 14px; font-size: 13px; color: #555; line-height: 1.65; margin-bottom: 6px; }
.vv-rp .vv-pill-info.on { display: block; animation: vvFade .2s ease; }
.vv-rp .vv-pill-info ul { padding-left: 16px; margin-top: 5px; }
.vv-rp .vv-pill-info li { margin-bottom: 3px; }
.vv-rp .vv-pill-info strong { color: #333; font-weight: 600; }
.vv-rp .vv-divider { border: none; border-top: 1px solid #e8e5de; margin: 1.5rem 0; }
@keyframes vvFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes vvAppear { from { opacity: 0; transform-origin: 190px 190px; transform: scale(.7); } to { opacity: 1; transform-origin: 190px 190px; transform: scale(1); } }
@keyframes vvPulse { 0%,100% { opacity: 1; } 50% { opacity: .72; } }
.vv-seg-g { animation: vvAppear .5s cubic-bezier(.34,1.56,.64,1) both; }
.vv-seg-g:nth-child(1) { animation-delay: .05s; }
.vv-seg-g:nth-child(2) { animation-delay: .15s; }
.vv-seg-g:nth-child(3) { animation-delay: .25s; }
.vv-seg-g:nth-child(4) { animation-delay: .35s; }
.vv-seg-p.pulse { animation: vvPulse 1.6s ease-in-out infinite; }
`;

  var SEGS = [
    { label: 'Information',  sub: 'Contexte & enjeux',       col: '#534AB7', light: '#EEEDFE', dark: '#3C3489', s: -90, e: 0,
      title: "Phase d'Information",
      body: "Les éléments clés du cycle sont partagés : visuels, textes, personnages-clés, enjeux principaux.<ul><li>Contexte du cycle posé par le staff</li><li>Bonus et/ou malus par Panthéon révélés</li><li>Axes majeurs de préoccupation pour les divinités</li><li>Rien n'est demandé aux joueurs : lire, discuter, poser des questions</li></ul>" },
    { label: 'Décision',     sub: 'Contester ou coopérer',   col: '#1D9E75', light: '#E1F5EE', dark: '#085041', s: 0,   e: 90,
      title: "Phase de Décision",
      body: "Chaque joueur déclare ses intentions pour la phase en cours.<ul><li><strong>Contestation</strong> : affronter une autre divinité sur l'une de ses possessions</li><li><strong>Coopération</strong> : résoudre une situation préoccupante via un bonus de Panthéon</li><li>Décisions transmises en secret au staff, révélées la veille du RP</li></ul>" },
    { label: 'Roleplay',     sub: 'Scène de 2 semaines',     col: '#EF9F27', light: '#FAEEDA', dark: '#633806', s: 90,  e: 180,
      title: "Phase de Roleplay",
      body: "Une fois les contestations révélées, la scène peut commencer.<ul><li>Durée fixe : <strong>2 semaines</strong>, sans prolongation</li><li>Liberté totale sur la façon de jouer, tant que logique et fairplay</li><li>Tenir compte de la différence d'influence, des caractéristiques du point contesté et du contexte</li><li>Si la scène est incomplète → narration de conclusion ou décision du staff</li></ul>" },
    { label: 'Conclusion',   sub: 'Accord ou staff tranche', col: '#D85A30', light: '#FAECE7', dark: '#712B13', s: 180, e: 270,
      title: "Phase de Conclusion",
      body: "Les joueurs se mettent d'accord sur l'issue en se basant sur le fairplay, la logique et l'influence.<ul><li>L'intrigue du cycle se dévoile davantage, annonçant la phase suivante</li><li>Les joueurs anticipent leurs prochaines contestations</li><li>Si aucun accord → le staff tranche</li><li>Après la 3e conclusion → <strong>bilan de fin de cycle</strong></li></ul>" }
  ];

  var PILLS = [
    { key: 'contestation', label: 'Contestation',
      body: "<strong>Contestation</strong> — Confrontation directe sur une possession d'une autre divinité (lieu, institution, groupe…).<ul><li>Chaque divinité dispose de <strong>2 attaques</strong> et <strong>1 défense</strong> par phase.</li><li>Une divinité ne peut être contestée que <strong>2 fois maximum</strong>.</li><li>Contestations <strong>secrètes</strong> jusqu'à la veille du début de phase.</li><li>Si 2 contestations te visent et tu n'as qu'une défense, tu choisis — l'autre est déclarée gagnante sans scène.</li></ul>" },
    { key: 'cooperation',  label: 'Coopération',
      body: "<strong>Coopération</strong> — Résolution d'une situation préoccupante proposée par le staff.<ul><li>Se déclare <strong>en même temps que les Contestations</strong>.</li><li>Requiert l'accord du chef de Panthéon ou un écart inférieur à <strong>10 pts d'influence</strong>.</li><li>Un bonus utilisé en Coopération <strong>disparaît</strong> — ne peut pas servir en Contestation.</li><li>Possible à plusieurs — les conséquences varient selon la résolution.</li></ul>" },
    { key: 'duel',         label: 'Duel',
      body: "<strong>Duel</strong> — Quand deux divinités se contestent mutuellement lors de la même phase.<ul><li>Deux issues uniquement : <strong>statu quo</strong> ou <strong>victoire totale</strong>.</li><li>Emplacement choisi d'un commun accord, ou par la divinité ayant le plus d'influence.</li><li><strong>Une seule scène</strong> possible pour un Duel.</li></ul>" }
  ];

  var CX = 190, CY = 190, R_OUT = 168, R_IN = 82, R_LBL = 130;
  var NS = 'http://www.w3.org/2000/svg';

  function rad(d) { return d * Math.PI / 180; }

  function arc(ro, ri, s, e) {
    var gap = 2, sr = rad(s + gap), er = rad(e - gap), lg = (e - s - gap * 2) > 180 ? 1 : 0;
    var x1o = CX + ro * Math.cos(sr), y1o = CY + ro * Math.sin(sr);
    var x2o = CX + ro * Math.cos(er), y2o = CY + ro * Math.sin(er);
    var x1i = CX + ri * Math.cos(er), y1i = CY + ri * Math.sin(er);
    var x2i = CX + ri * Math.cos(sr), y2i = CY + ri * Math.sin(sr);
    return 'M'+x1o+','+y1o+' A'+ro+','+ro+',0,'+lg+',1,'+x2o+','+y2o+' L'+x1i+','+y1i+' A'+ri+','+ri+',0,'+lg+',0,'+x2i+','+y2i+' Z';
  }

  function mid(r, s, e) {
    var m = rad((s + e) / 2);
    return { x: CX + r * Math.cos(m), y: CY + r * Math.sin(m) };
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function injectCSS() {
    if (document.getElementById('vv-rp-css')) return;
    var s = document.createElement('style');
    s.id = 'vv-rp-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildHTML(root) {
    root.innerHTML =
      '<p class="vv-page-title">Wiki Vae Victis</p>' +
      '<h2 class="vv-heading">Fonctionnement du RP</h2>' +
      '<p class="vv-intro">Le RP sur Vae Victis est organisé en <strong>cycles</strong> d\'environ 1 mois et demi, eux-mêmes divisés en <strong>3 phases de 2 semaines</strong>. À la fin de chaque cycle, un bilan détermine les changements d\'influence et les enjeux du prochain cycle.</p>' +
      '<p class="vv-hint">Clique sur un segment pour voir le détail de l\'étape</p>' +
      '<div class="vv-ring-wrap"><svg id="vv-ring" width="380" height="380" viewBox="0 0 380 380" role="img"><title>Cycle de RP Vae Victis</title><desc>4 étapes : Information, Décision, Roleplay, Conclusion</desc></svg></div>' +
      '<div class="vv-detail" id="vv-detail"><div class="vv-detail-title" id="vv-dt">Sélectionne une étape</div><div class="vv-detail-body" id="vv-db" style="color:#bbb">Clique sur l\'un des 4 segments du cycle pour afficher son détail.</div></div>' +
      '<hr class="vv-divider">' +
      '<p class="vv-section-label">Types d\'actions</p>' +
      '<div class="vv-pills" id="vv-pills"></div>' +
      '<div id="vv-pill-infos"></div>';
  }

  function buildSVG() {
    var svg = document.getElementById('vv-ring');
    if (!svg) return;

    var defs = svgEl('defs', {});
    var mk = svgEl('marker', { id: 'vv-arrow', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '5', markerHeight: '5', orient: 'auto-start-reverse' });
    var mp = svgEl('path', { d: 'M2 1L8 5L2 9', fill: 'none', stroke: '#ccc', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    mk.appendChild(mp); defs.appendChild(mk); svg.appendChild(defs);

    SEGS.forEach(function(seg, i) {
      var g = svgEl('g', { class: 'vv-seg-g' });
      g.style.cursor = 'pointer';

      var p = svgEl('path', { d: arc(R_OUT, R_IN, seg.s, seg.e), fill: seg.light, stroke: seg.col, 'stroke-width': '0.5', class: 'vv-seg-p' });
      p.id = 'vv-p' + i;

      var lp = mid(R_LBL, seg.s, seg.e);
      var t1 = svgEl('text', { x: lp.x, y: lp.y - 7, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': '13', 'font-weight': '600', fill: seg.dark });
      t1.textContent = seg.label;
      var t2 = svgEl('text', { x: lp.x, y: lp.y + 9, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': '11', fill: seg.col });
      t2.textContent = seg.sub;

      g.appendChild(p); g.appendChild(t1); g.appendChild(t2);

      (function(idx, s) {
        g.addEventListener('click', function() { selectSeg(idx); });
        g.addEventListener('mouseenter', function() { if (activeIdx !== idx) p.setAttribute('fill', s.col + '30'); });
        g.addEventListener('mouseleave', function() { if (activeIdx !== idx) p.setAttribute('fill', s.light); });
      })(i, seg);

      svg.appendChild(g);
    });

    svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: R_IN - 4, fill: '#fff', stroke: '#e8e5de', 'stroke-width': '0.5' }));

    var ar = R_IN - 18;
    svg.appendChild(svgEl('path', { d: 'M'+(CX+ar)+','+CY+' A'+ar+','+ar+',0,1,1,'+(CX-ar+2)+','+(CY-2), fill: 'none', stroke: '#ddd', 'stroke-width': '1', 'marker-end': 'url(#vv-arrow)' }));

    [{ t:'Cycle', y:CY-10, sz:'14', w:'600', f:'#222' },
     { t:'~6 semaines', y:CY+6, sz:'11', w:'400', f:'#888' },
     { t:'3 phases', y:CY+21, sz:'11', w:'400', f:'#bbb' }
    ].forEach(function(o) {
      var tx = svgEl('text', { x: CX, y: o.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': o.sz, 'font-weight': o.w, fill: o.f });
      tx.textContent = o.t;
      svg.appendChild(tx);
    });
  }

  function buildPills() {
    var pillsEl = document.getElementById('vv-pills');
    var infosEl = document.getElementById('vv-pill-infos');
    if (!pillsEl || !infosEl) return;

    PILLS.forEach(function(pill) {
      var btn = document.createElement('span');
      btn.className = 'vv-pill';
      btn.textContent = pill.label;
      btn.addEventListener('click', function() { togglePill(pill.key, btn); });
      pillsEl.appendChild(btn);

      var info = document.createElement('div');
      info.className = 'vv-pill-info';
      info.id = 'vv-pi-' + pill.key;
      info.innerHTML = pill.body;
      infosEl.appendChild(info);
    });
  }

  var activeIdx = -1;

  function selectSeg(i) {
    var detail = document.getElementById('vv-detail');
    if (activeIdx === i) {
      document.getElementById('vv-p'+i).setAttribute('fill', SEGS[i].light);
      document.getElementById('vv-p'+i).classList.remove('pulse');
      activeIdx = -1;
      detail.classList.remove('active');
      detail.style.removeProperty('--vv-col');
      document.getElementById('vv-dt').textContent = 'Sélectionne une étape';
      document.getElementById('vv-db').innerHTML = '<span style="color:#bbb">Clique sur l\'un des 4 segments du cycle pour afficher son détail.</span>';
      return;
    }
    if (activeIdx >= 0) {
      document.getElementById('vv-p'+activeIdx).setAttribute('fill', SEGS[activeIdx].light);
      document.getElementById('vv-p'+activeIdx).classList.remove('pulse');
    }
    activeIdx = i;
    var seg = SEGS[i];
    var p = document.getElementById('vv-p'+i);
    p.setAttribute('fill', seg.col + '44');
    p.classList.add('pulse');
    detail.style.setProperty('--vv-col', seg.col);
    detail.classList.add('active');
    document.getElementById('vv-dt').textContent = seg.title;
    document.getElementById('vv-db').innerHTML = seg.body;
  }

  function togglePill(key, btn) {
    var wasOn = btn.classList.contains('on');
    document.querySelectorAll('.vv-pill').forEach(function(p) { p.classList.remove('on'); });
    document.querySelectorAll('.vv-pill-info').forEach(function(d) { d.classList.remove('on'); });
    if (!wasOn) {
      btn.classList.add('on');
      document.getElementById('vv-pi-' + key).classList.add('on');
    }
  }

  function init() {
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) return;
    injectCSS();
    mount.className = 'vv-rp';
    buildHTML(mount);
    buildSVG();
    buildPills();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();