/**
 * NewsSystem.js — Vae Victis (Neliya's Cut)
 * Fichier JS dédié pour le système de news RP
 * À charger via MediaWiki:NewsSystem.js (PAS dans common.js)
 *
 * Utilisation dans une page wiki :
 *   <div id="vv-news-page"></div>       ← page News complète
 *   <div id="vv-news-home"></div>       ← widget accueil (gros titres)
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════
  // CONFIG — modifie uniquement cette section
  // ═══════════════════════════════════════════════
  var CONFIG = {
    csvUrl:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=815680199&single=true&output=csv',
    dieuxUrl:  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=441083058&single=true&output=csv',
    homeMaxCards: 3,        // nombre de cartes sur l'accueil
    accentColor: '#6C63FF', // couleur principale
    wikiName: 'Vae Victis'
  };

  // ═══════════════════════════════════════════════
  // CATÉGORIES
  // ═══════════════════════════════════════════════
  var CAT = {
    war:      { label: 'Guerre',     color: '#A32D2D', bg: '#FCEBEB' },
    politics: { label: 'Politique',  color: '#185FA5', bg: '#E6F1FB' },
    economy:  { label: 'Économie',   color: '#3B6D11', bg: '#EAF3DE' },
    society:  { label: 'Société',    color: '#6C3A9A', bg: '#F3EAFA' },
    event:    { label: 'Événement',  color: '#854F0B', bg: '#FAEEDA' }
  };

  var PH = {
    war:      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=60',
    politics: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=60',
    economy:  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=60',
    society:  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=60',
    event:    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=60'
  };

  // ═══════════════════════════════════════════════
  // CSS INJECTÉ
  // ═══════════════════════════════════════════════
  var CSS = [
    /* ── reset scoped ── */
    '.vv-news * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }',

    /* ── variables ── */
    '.vv-news {',
    '  --a: ' + CONFIG.accentColor + ';',
    '  --bg: #ffffff; --bg2: #f7f7f8; --bg3: #f0f0f2;',
    '  --t: #111; --t2: #555; --t3: #999;',
    '  --bd: #e5e5e5; --bd2: #ccc;',
    '  --rad: 12px; --rad-md: 8px; --danger: #E24B4A;',
    '}',

    /* ── SHARED ── */
    '.vv-tag { display:inline-block; font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px; letter-spacing:.04em; }',
    '.vv-hero-label { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--a); margin-bottom:10px; }',
    /* ── DIEUX portraits ── */
    '.vv-dieux { display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:wrap; }',
    '.vv-dieu-avatar { position:relative; flex-shrink:0; }',
    '.vv-dieu-img { width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,.25); display:block; transition:transform .2s, box-shadow .2s; cursor:pointer; }',
    '.vv-dieu-img:hover { transform:scale(1.12); box-shadow:0 4px 14px rgba(108,99,255,.4); }',
    '.vv-dieu-tooltip { position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:#111; color:#fff; font-size:11px; font-weight:600; padding:3px 8px; border-radius:4px; white-space:nowrap; pointer-events:none; opacity:0; transition:opacity .2s; z-index:10; }',
    '.vv-dieu-tooltip::after { content:""; position:absolute; top:100%; left:50%; transform:translateX(-50%); border:4px solid transparent; border-top-color:#111; }',
    '.vv-dieu-avatar:hover .vv-dieu-tooltip { opacity:1; }',
    '.vv-dieux-label { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#888; margin-right:2px; }',
    /* dieux dans le modal article */
    '.vv-modal-dieux { display:flex; align-items:center; gap:8px; margin-top:12px; padding-top:12px; border-top:1px solid #e5e5e5; flex-wrap:wrap; }',
    '.vv-modal-dieu-img { width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid #6C63FF; box-shadow:0 2px 8px rgba(0,0,0,.2); display:block; transition:transform .2s; cursor:pointer; }',
    '.vv-modal-dieu-img:hover { transform:scale(1.1); }',
    '.vv-modal-dieu-name { font-size:11px; color:#555; text-align:center; margin-top:3px; font-weight:600; }',
    '.vv-modal-dieu-wrap { display:flex; flex-direction:column; align-items:center; cursor:pointer; }',

    /* ══════════════════════════════════
       PAGE NEWS COMPLÈTE
    ══════════════════════════════════ */

    /* nav tabs */
    '.vv-nav { display:flex; gap:0; border-bottom:1px solid var(--bd); background:var(--bg); margin-bottom:18px; }',
    '.vv-ntab { background:none; border:none; border-bottom:2px solid transparent; color:var(--t2); font-family:inherit; font-size:13px; padding:12px 16px; cursor:pointer; transition:all .2s; white-space:nowrap; }',
    '.vv-ntab:hover { color:var(--t); }',
    '.vv-ntab.vv-active { color:var(--a); border-bottom-color:var(--a); font-weight:600; }',

    /* pages */
    '.vv-page { display:none; }',
    '.vv-page.vv-active { display:block; }',

    /* loading */
    '.vv-loading { text-align:center; padding:40px; color:var(--t3); font-size:13px; }',
    '.vv-spinner { width:28px; height:28px; border:2px solid var(--bd); border-top-color:var(--a); border-radius:50%; animation:vv-spin .7s linear infinite; margin:0 auto 12px; }',
    '@keyframes vv-spin { to { transform:rotate(360deg); } }',

    /* home - une */
    '.vv-breaking { background:var(--bg); border:1px solid var(--bd); border-radius:var(--rad); overflow:hidden; margin-bottom:14px; cursor:pointer; transition:border-color .2s, box-shadow .2s; }',
    '.vv-breaking:hover { border-color:var(--a); box-shadow:0 2px 14px rgba(108,99,255,.1); }',
    '.vv-bc-img { width:100%; height:220px; object-fit:cover; display:block; }',
    '.vv-bc-img-ph { width:100%; height:120px; background:var(--bg2); display:flex; align-items:center; justify-content:center; color:var(--t3); font-size:32px; border-bottom:1px solid var(--bd); }',
    '.vv-bc-body { padding:16px 18px; }',
    '.vv-bc-top { display:flex; align-items:center; gap:8px; margin-bottom:9px; }',
    '.vv-live-dot { width:7px; height:7px; border-radius:50%; background:#E24B4A; animation:vv-pulse 1.4s infinite; flex-shrink:0; }',
    '@keyframes vv-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }',
    '.vv-live-lbl { font-size:10px; font-weight:700; color:#E24B4A; letter-spacing:.12em; text-transform:uppercase; }',
    '.vv-bc-cat { font-size:11px; color:var(--t3); margin-left:auto; }',
    '.vv-bc-title { font-size:18px; font-weight:700; line-height:1.3; margin-bottom:7px; color:var(--t); }',
    '.vv-bc-summary { font-size:13px; color:var(--t2); line-height:1.6; }',
    '.vv-bc-more { font-size:11px; color:var(--a); margin-top:9px; font-weight:600; }',

    /* home - grille secondaires */
    '.vv-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:10px; margin-bottom:14px; }',
    '.vv-sec { background:var(--bg); border:1px solid var(--bd); border-radius:var(--rad); overflow:hidden; cursor:pointer; transition:border-color .2s, box-shadow .2s; }',
    '.vv-sec:hover { border-color:var(--a); box-shadow:0 2px 10px rgba(108,99,255,.09); }',
    '.vv-sec-img { width:100%; height:100px; object-fit:cover; display:block; }',
    '.vv-sec-img-ph { width:100%; height:100px; background:var(--bg2); display:flex; align-items:center; justify-content:center; color:var(--t3); font-size:22px; border-bottom:1px solid var(--bd); }',
    '.vv-sec-body { padding:11px 13px; }',
    '.vv-sec-title { font-size:13px; font-weight:600; line-height:1.35; margin-bottom:4px; color:var(--t); }',
    '.vv-sec-meta { font-size:11px; color:var(--t3); }',

    /* detail panel */
    '.vv-detail { background:var(--bg); border:1px solid var(--bd); border-radius:var(--rad); overflow:hidden; margin-top:14px; animation:vv-up .2s ease; }',
    '@keyframes vv-up { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }',
    '.vv-dp-img { width:100%; height:220px; object-fit:cover; display:block; }',
    '.vv-dp-img-ph { width:100%; height:60px; background:var(--bg2); display:flex; align-items:center; justify-content:center; color:var(--t3); font-size:24px; }',
    '.vv-dp-inner { padding:16px 18px; }',
    '.vv-dp-head { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin-bottom:10px; }',
    '.vv-dp-title { font-size:17px; font-weight:700; line-height:1.3; margin-bottom:4px; color:var(--t); }',
    '.vv-dp-meta { font-size:12px; color:var(--t3); margin-top:4px; }',
    '.vv-dp-body { font-size:14px; color:var(--t2); line-height:1.8; border-top:1px solid var(--bd); padding-top:13px; margin-top:13px; white-space:pre-wrap; }',
    '.vv-close-btn { background:none; border:1px solid var(--bd); color:var(--t3); padding:5px 9px; border-radius:var(--rad-md); cursor:pointer; font-size:12px; transition:all .2s; }',
    '.vv-close-btn:hover { border-color:var(--bd2); color:var(--t); }',

    /* TIMELINE */
    '.vv-filters { display:flex; gap:6px; margin-bottom:14px; flex-wrap:wrap; }',
    '.vv-tf { background:var(--bg); border:1px solid var(--bd); color:var(--t2); font-family:inherit; font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; padding:5px 12px; border-radius:20px; cursor:pointer; transition:all .2s; }',
    '.vv-tf:hover { border-color:var(--bd2); color:var(--t); }',
    '.vv-tf.vv-active { background:var(--a); border-color:var(--a); color:#fff; }',

    '.vv-tl-outer { position:relative; background:var(--bg); border:1px solid var(--bd); border-radius:var(--rad); overflow:hidden; margin-bottom:14px; }',
    '.vv-tl-fl, .vv-tl-fr { position:absolute; top:0; bottom:0; width:56px; z-index:10; display:flex; align-items:center; pointer-events:none; opacity:0; transition:opacity .25s; }',
    '.vv-tl-fl { left:0; justify-content:flex-start; background:linear-gradient(to right,var(--bg) 50%,transparent); }',
    '.vv-tl-fr { right:0; justify-content:flex-end; background:linear-gradient(to left,var(--bg) 50%,transparent); }',
    '.vv-tl-outer:hover .vv-tl-fl.vv-vis, .vv-tl-outer:hover .vv-tl-fr.vv-vis { opacity:1; pointer-events:all; }',
    '.vv-tl-arr { width:26px; height:26px; border-radius:50%; background:var(--bg); border:1px solid var(--bd2); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--t2); margin:0 6px; font-size:15px; font-weight:700; transition:all .2s; }',
    '.vv-tl-arr:hover { background:var(--a); border-color:var(--a); color:#fff; }',

    '.vv-tl-scroll { overflow-x:auto; overflow-y:hidden; padding:36px 28px 32px; scrollbar-width:none; cursor:grab; }',
    '.vv-tl-scroll:active { cursor:grabbing; }',
    '.vv-tl-scroll::-webkit-scrollbar { display:none; }',
    '.vv-tl-track { display:flex; align-items:center; position:relative; min-width:max-content; user-select:none; }',
    '.vv-tl-line { position:absolute; top:50%; left:0; right:0; height:1px; background:var(--bd); transform:translateY(-50%); z-index:0; }',

    '.vv-yg { display:flex; align-items:center; position:relative; z-index:1; }',
    '.vv-ysep { display:flex; flex-direction:column; align-items:center; margin:0 8px; }',
    '.vv-ypill { background:var(--a); color:#fff; font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; white-space:nowrap; }',
    '.vv-yline { width:1px; height:18px; background:var(--a); }',

    '.vv-ev { display:flex; flex-direction:column; align-items:center; margin:0 7px; position:relative; z-index:1; cursor:pointer; }',
    '.vv-ev-top, .vv-ev-bot { display:flex; flex-direction:column; align-items:center; }',
    '.vv-ev.above .vv-ev-bot { visibility:hidden; height:0; overflow:hidden; }',
    '.vv-ev.below .vv-ev-top { visibility:hidden; height:0; overflow:hidden; }',
    '.vv-stem { width:1px; height:20px; background:var(--bd); }',
    '.vv-dot { width:10px; height:10px; border-radius:50%; border:2px solid var(--a); background:var(--bg); flex-shrink:0; transition:background .2s; }',
    '.vv-ev:hover .vv-dot, .vv-ev.vv-active .vv-dot { background:var(--a); }',

    '.vv-card { width:148px; background:var(--bg2); border:1px solid var(--bd); border-radius:var(--rad-md); overflow:hidden; transition:border-color .2s, background .2s; }',
    '.vv-ev:hover .vv-card, .vv-ev.vv-active .vv-card { border-color:var(--a); background:var(--bg); }',
    '.vv-card-img { width:100%; height:72px; object-fit:cover; display:block; }',
    '.vv-card-img-ph { width:100%; height:72px; background:var(--bg3); display:flex; align-items:center; justify-content:center; color:var(--t3); font-size:18px; }',
    '.vv-card-body { padding:8px 10px; }',
    '.vv-card-date { font-size:10px; color:var(--t3); margin-bottom:2px; }',
    '.vv-card-title { font-size:11px; font-weight:600; color:var(--t); line-height:1.3; margin-bottom:5px; }',
    '.vv-tl-hint { text-align:center; padding:8px; font-size:11px; color:var(--t3); border-top:1px solid var(--bd); }',

    /* ACTES */
    '.vv-actes-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }',
    '.vv-actes-header h2 { font-size:17px; font-weight:700; color:var(--t); }',
    '.vv-acte-card { background:var(--bg); border:1px solid var(--bd); border-radius:var(--rad); overflow:hidden; margin-bottom:12px; }',
    '.vv-acte-head { display:flex; align-items:center; padding:13px 16px; gap:10px; }',
    '.vv-acte-num { background:var(--a); color:#fff; font-size:12px; font-weight:700; padding:3px 11px; border-radius:20px; flex-shrink:0; }',
    '.vv-acte-name { font-size:14px; font-weight:700; flex:1; color:var(--t); }',
    '.vv-acte-desc { font-size:12px; color:var(--t2); padding:0 16px 10px; line-height:1.6; }',
    '.vv-acte-news { border-top:1px solid var(--bd); padding:10px 16px; }',
    '.vv-anl { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--t3); margin-bottom:8px; }',
    '.vv-anr { display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid var(--bd); cursor:pointer; }',
    '.vv-anr:last-child { border-bottom:none; }',
    '.vv-anr:hover .vv-anr-title { color:var(--a); }',
    '.vv-anr-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }',
    '.vv-anr-title { font-size:12px; color:var(--t); flex:1; line-height:1.3; transition:color .2s; }',
    '.vv-anr-date { font-size:11px; color:var(--t3); flex-shrink:0; }',
    '.vv-acte-empty { font-size:12px; color:var(--t3); font-style:italic; padding:6px 0; }',

    /* ══════════════════════════════════
       WIDGET ACCUEIL
    ══════════════════════════════════ */
    /* conteneur principal avec fond solide pour lisibilité sur n'importe quel fond wiki */
    '.vv-home-widget { background:#1a1a2e; border-radius:16px; padding:20px 20px 16px; }',
    '.vv-home-widget .vv-hero-label { color:#a89cff; }',
    '.vv-hw-grid { display:flex; gap:14px; flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; padding-bottom:4px; }',
    '.vv-hw-grid::-webkit-scrollbar { display:none; }',
    /* cartes avec fond blanc solide, ombre forte pour contraste */
    '.vv-hw-card { flex:0 0 230px; background:#ffffff; border:none; border-radius:var(--rad); overflow:hidden; cursor:pointer; transition:box-shadow .2s, transform .2s; box-shadow:0 4px 20px rgba(0,0,0,.4); }',
    '.vv-hw-card:hover { box-shadow:0 8px 28px rgba(108,99,255,.5); transform:translateY(-3px); }',
    '.vv-hw-img { width:100%; height:130px; object-fit:cover; display:block; }',
    '.vv-hw-img-ph { width:100%; height:130px; background:#f0f0f2; display:flex; align-items:center; justify-content:center; color:#999; font-size:26px; }',
    '.vv-hw-body { padding:12px 14px; background:#ffffff; }',
    '.vv-hw-badge { display:inline-flex; align-items:center; gap:5px; font-size:10px; font-weight:700; padding:3px 9px; border-radius:4px; margin-bottom:8px; }',
    '.vv-hw-dot { width:5px; height:5px; border-radius:50%; animation:vv-pulse 1.4s infinite; flex-shrink:0; }',
    '.vv-hw-title { font-size:13px; font-weight:700; line-height:1.35; color:#111; margin-bottom:5px; }',
    '.vv-hw-meta { font-size:11px; color:#888; }',
    '.vv-hw-arrow { font-size:11px; color:#6C63FF; font-weight:700; margin-top:9px; display:flex; align-items:center; gap:3px; }',
    /* bandeau important en haut des cartes */
    '.vv-hw-important { background:linear-gradient(90deg,#E24B4A,#c0392b); color:#fff; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:4px 12px; display:flex; align-items:center; gap:5px; }',
    '.vv-hw-imp-dot { width:5px; height:5px; border-radius:50%; background:#fff; animation:vv-pulse 1.4s infinite; }',

    /* ══════════════════════════════════
       MODAL — article complet
    ══════════════════════════════════ */
    /* fond sombre + centrage */
    '.vv-modal-bg { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:9999; align-items:center; justify-content:center; padding:20px; }',
    '.vv-modal-bg.vv-open { display:flex; }',
    /* boîte large, scroll interne, pas de hauteur max contraignante */
    '.vv-modal-box { background:#ffffff; border-radius:var(--rad); overflow:hidden; width:100%; max-width:680px; max-height:88vh; overflow-y:auto; animation:vv-up .25s ease; position:relative; box-shadow:0 20px 60px rgba(0,0,0,.5); }',
    '.vv-modal-img { width:100%; height:260px; object-fit:cover; display:block; }',
    '.vv-modal-img-ph { width:100%; height:80px; background:#f0f0f2; display:flex; align-items:center; justify-content:center; color:#999; font-size:28px; }',
    '.vv-modal-inner { padding:22px 24px 28px; }',
    '.vv-modal-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:14px; }',
    '.vv-modal-title { font-size:20px; font-weight:700; line-height:1.3; color:#111; margin-bottom:5px; }',
    '.vv-modal-meta { font-size:12px; color:#888; margin-top:4px; }',
    /* corps de l'article sans limite de hauteur, texte lisible */
    '.vv-modal-body { font-size:15px; color:#333; line-height:1.9; border-top:1px solid #e5e5e5; padding-top:16px; margin-top:14px; white-space:pre-wrap; word-break:break-word; }',
    /* bouton fermer fixe en haut à droite même au scroll */
    '.vv-modal-close-wrap { position:sticky; top:0; z-index:10; display:flex; justify-content:flex-end; background:linear-gradient(to bottom,rgba(255,255,255,1) 60%,transparent); padding:10px 12px 0; margin:-22px -24px 0; }',
  ].join('\n');

  // ═══════════════════════════════════════════════
  // UTILITAIRES
  // ═══════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('vv-news-css')) return;
    var s = document.createElement('style');
    s.id = 'vv-news-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function catInfo(cat) {
    return CAT[cat] || { label: cat, color: '#854F0B', bg: '#FAEEDA' };
  }

  function getImg(n) {
    return n.img || PH[n.category] || '';
  }

  function tagHTML(cat) {
    var c = catInfo(cat);
    return '<span class="vv-tag" style="background:' + c.bg + ';color:' + c.color + '">' + c.label + '</span>';
  }

  function imgHTML(src, cls, ph) {
    if (src) {
      return '<img src="' + esc(src) + '" class="' + cls + '" alt="" onerror="this.style.display=\'none\'">';
    }
    return '<div class="' + ph + '">📷</div>';
  }

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ═══════════════════════════════════════════════
  // PARSE CSV
  // ═══════════════════════════════════════════════
  function parseCSV(text) {
    var lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    return lines.slice(1).map(function(line) {
      var cols = [], cur = '', inQ = false;
      for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (ch === '"') { inQ = !inQ; }
        else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      cols.push(cur.trim());
      if (!cols[1]) return null;
      return {
        id:       cols[0] || String(Date.now() + Math.random()),
        title:    cols[1] || '',
        summary:  cols[2] || '',
        body:     cols[3] || '',
        category: (cols[4] || 'event').toLowerCase().trim(),
        date:     cols[5] || '',
        acte:     cols[6] || '',
        img:      cols[7] || '',
        featured: cols[8] && (cols[8].toString().toUpperCase() === 'TRUE' || cols[8] === '1' || cols[8].toUpperCase() === 'VRAI'),
        dieux:    cols[9] ? cols[9].split(',').map(function(s){return s.trim();}).filter(Boolean) : []
      };
    }).filter(Boolean);
  }

  // ═══════════════════════════════════════════════
  // FETCH NEWS
  // ═══════════════════════════════════════════════
  function fetchNews(callback) {
    fetch(CONFIG.csvUrl)
      .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function(text) { callback(null, parseCSV(text)); })
      .catch(function(e) { callback(e, []); });
  }


  // ═══════════════════════════════════════════════
  // FETCH DIEUX
  // ═══════════════════════════════════════════════
  var dieuxCache = null;

  function fetchDieux(callback) {
    if (dieuxCache) { callback(null, dieuxCache); return; }
    fetch(CONFIG.dieuxUrl)
      .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function(text) {
        var lines = text.trim().split('\n');
        var dieux = {};
        lines.slice(1).forEach(function(line) {
          var cols = [], cur = '', inQ = false;
          for (var i = 0; i < line.length; i++) {
            var ch = line[i];
            if (ch === '"') { inQ = !inQ; }
            else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
            else { cur += ch; }
          }
          cols.push(cur.trim());
          if (cols[0]) {
            var nom = cols[0].trim();
            dieux[nom.toLowerCase()] = {
              nom:     nom,
              portrait: cols[1] ? cols[1].trim() : '',
              wiki:    cols[2] ? cols[2].trim() : ''
            };
          }
        });
        dieuxCache = dieux;
        callback(null, dieux);
      })
      .catch(function(e) { callback(e, {}); });
  }

  function buildDieuxHTML(dieuxNoms, dieuxData, size, cssClass) {
    if (!dieuxNoms || !dieuxNoms.length) return '';
    var html = '<div class="vv-dieux"><span class="vv-dieux-label">Dieux liés</span>';
    dieuxNoms.forEach(function(nom) {
      var key = nom.trim().toLowerCase();
      var d = dieuxData[key];
      if (!d) return;
      var s = size || 38;
      var imgStyle = 'width:' + s + 'px;height:' + s + 'px;';
      if (d.wiki) {
        html += '<a href="' + esc(d.wiki) + '" target="_blank" class="vv-dieu-avatar" title="' + esc(d.nom) + '">';
      } else {
        html += '<span class="vv-dieu-avatar">';
      }
      if (d.portrait) {
        html += '<img src="' + esc(d.portrait) + '" class="' + (cssClass||'vv-dieu-img') + '" style="' + imgStyle + '" alt="' + esc(d.nom) + '" onerror="this.style.display=\x27none\x27">';
      } else {
        html += '<div style="width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:' + Math.round(s*0.4) + 'px;color:#999">⚡</div>';
      }
      html += '<div class="vv-dieu-tooltip">' + esc(d.nom) + '</div>';
      html += d.wiki ? '</a>' : '</span>';
    });
    html += '</div>';
    return html;
  }

  // ═══════════════════════════════════════════════
  //  PAGE NEWS COMPLÈTE
  // ═══════════════════════════════════════════════
  function initNewsPage(container) {
    container.className = 'vv-news';
    container.innerHTML = '<div class="vv-loading"><div class="vv-spinner"></div>Chargement des news…</div>';

    fetchNews(function(err, news) {
      if (err || !news.length) {
        container.innerHTML = '<div class="vv-news"><p style="color:#999;font-size:13px;padding:20px 0">' +
          (err ? 'Impossible de charger les news. Vérifie la connexion.' : 'Aucune news disponible.') + '</p></div>';
        return;
      }
      // charger les dieux en parallèle (non bloquant)
      fetchDieux(function() {});

      // actes déduits depuis les news
      var acteKeys = [];
      news.forEach(function(n) { if (n.acte && acteKeys.indexOf(n.acte) === -1) acteKeys.push(n.acte); });

      var state = { filter: 'all', detail: null, page: 'home' };

      function render() {
        container.innerHTML = '';
        container.className = 'vv-news';

        // NAV
        var nav = document.createElement('div');
        nav.className = 'vv-nav';
        nav.innerHTML = [
          '<button class="vv-ntab' + (state.page==='home'?' vv-active':'') + '" data-page="home">Accueil</button>',
          '<button class="vv-ntab' + (state.page==='timeline'?' vv-active':'') + '" data-page="timeline">Frise chronologique</button>',
          '<button class="vv-ntab' + (state.page==='actes'?' vv-active':'') + '" data-page="actes">Actes</button>'
        ].join('');
        nav.querySelectorAll('.vv-ntab').forEach(function(btn) {
          btn.addEventListener('click', function() {
            state.page = this.getAttribute('data-page');
            state.detail = null;
            render();
          });
        });
        container.appendChild(nav);

        // PAGE CONTENT
        var pg = document.createElement('div');
        pg.className = 'vv-page vv-active';

        if (state.page === 'home') renderHome(pg, news, state, render);
        if (state.page === 'timeline') renderTimeline(pg, news, state, render);
        if (state.page === 'actes') renderActes(pg, news, acteKeys, state, render);

        container.appendChild(pg);
      }

      render();
    });
  }

  // ── HOME ──
  function renderHome(pg, news, state, render) {
    var featured = news.filter(function(n) { return n.featured; });
    var main = featured[0] || news[0];
    if (!main) { pg.innerHTML = '<p style="color:#999;font-size:13px">Aucune news.</p>'; return; }

    var c = catInfo(main.category);
    var img = getImg(main);
    var html = '';

    // MAIN
    html += '<div class="vv-hero-label">À la une</div>';
    html += '<div class="vv-breaking" data-id="' + esc(main.id) + '">';
    html += imgHTML(img, 'vv-bc-img', 'vv-bc-img-ph');
    html += '<div class="vv-bc-body">';
    html += '<div class="vv-bc-top"><span class="vv-live-dot"></span><span class="vv-live-lbl">En direct</span>';
    html += '<span class="vv-bc-cat">' + c.label + (main.date?' · '+esc(main.date):'') + (main.acte?' · '+esc(main.acte):'') + '</span></div>';
    html += '<div class="vv-bc-title">' + esc(main.title) + '</div>';
    html += '<div class="vv-bc-summary">' + esc(main.summary) + '</div>';
    html += '<div class="vv-bc-more">→ Lire l\'article</div>';
    if (main.dieux && main.dieux.length && dieuxCache) {
      html += buildDieuxHTML(main.dieux, dieuxCache, 36, 'vv-dieu-img');
    }
    html += '</div></div>';

    // SECONDAIRES
    var seconds = featured.length >= 2 ? featured.slice(1, 1 + CONFIG.homeMaxCards) : news.filter(function(n){return n.id!==main.id;}).slice(0, CONFIG.homeMaxCards);
    if (seconds.length) {
      html += '<div class="vv-hero-label" style="margin-top:16px">Autres titres</div>';
      html += '<div class="vv-grid">';
      seconds.forEach(function(n) {
        var c2 = catInfo(n.category);
        html += '<div class="vv-sec" data-id="' + esc(n.id) + '">';
        html += imgHTML(getImg(n), 'vv-sec-img', 'vv-sec-img-ph');
        html += '<div class="vv-sec-body">';
        html += '<span class="vv-tag" style="background:' + c2.bg + ';color:' + c2.color + ';margin-bottom:7px;display:inline-block">' + c2.label + '</span>';
        html += '<div class="vv-sec-title">' + esc(n.title) + '</div>';
        html += '<div class="vv-sec-meta">' + esc(n.date||'') + (n.acte?' · '+esc(n.acte):'') + '</div>';
        if (n.dieux && n.dieux.length && dieuxCache) {
          html += buildDieuxHTML(n.dieux, dieuxCache, 28, 'vv-dieu-img');
        }
        html += '</div></div>';
      });
      html += '</div>';
    }

    html += '<div id="vv-detail-home"></div>';
    pg.innerHTML = html;

    // events
    pg.querySelectorAll('[data-id]').forEach(function(el) {
      el.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        renderDetailInto(document.getElementById('vv-detail-home'), news, id, function() {
          document.getElementById('vv-detail-home').innerHTML = '';
        });
        setTimeout(function() {
          var d = document.getElementById('vv-detail-home');
          if (d) d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      });
    });
  }

  // ── DETAIL ──
  function renderDetailInto(container, news, id, onClose) {
    var n = news.filter(function(x){return x.id==id;})[0];
    if (!n) return;
    var c = catInfo(n.category);
    var img = getImg(n);
    var html = '<div class="vv-detail">';
    html += imgHTML(img, 'vv-dp-img', 'vv-dp-img-ph');
    html += '<div class="vv-dp-inner"><div class="vv-dp-head"><div style="flex:1">';
    html += '<span class="vv-tag" style="background:' + c.bg + ';color:' + c.color + ';margin-bottom:8px;display:inline-block">' + c.label + '</span>';
    html += '<div class="vv-dp-title">' + esc(n.title) + '</div>';
    html += '<div class="vv-dp-meta">' + esc(n.date||'') + (n.acte?' · '+esc(n.acte):'') + '</div>';
    html += '</div><button class="vv-close-btn" id="vv-close-dp">✕</button></div>';
    html += '<div class="vv-dp-body">' + esc(n.body || n.summary) + '</div>';
    if (n.dieux && n.dieux.length && dieuxCache) {
      html += '<div class="vv-modal-dieux"><span class="vv-dieux-label">Dieux impliqués</span>';
      n.dieux.forEach(function(nom) {
        var d = dieuxCache[nom.toLowerCase()];
        if (!d) return;
        var wrap = d.wiki ? '<a href="' + esc(d.wiki) + '" target="_blank" class="vv-modal-dieu-wrap">' : '<span class="vv-modal-dieu-wrap">';
        var wrapEnd = d.wiki ? '</a>' : '</span>';
        html += wrap;
        if (d.portrait) {
          html += '<img src="' + esc(d.portrait) + '" class="vv-modal-dieu-img" alt="' + esc(d.nom) + '" onerror="this.style.display=\x27none\x27">';
        } else {
          html += '<div style="width:44px;height:44px;border-radius:50%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:18px">⚡</div>';
        }
        html += '<div class="vv-modal-dieu-name">' + esc(d.nom) + '</div>';
        html += wrapEnd;
      });
      html += '</div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
    container.querySelector('#vv-close-dp').addEventListener('click', onClose);
  }

  // ── TIMELINE ──
  function renderTimeline(pg, news, state, render) {
    var filtered = state.filter === 'all' ? news.slice() : news.filter(function(n){return n.category===state.filter;});
    var byActe = {};
    filtered.forEach(function(n) { var k = n.acte||'Sans acte'; if(!byActe[k]) byActe[k]=[]; byActe[k].push(n); });
    var keys = Object.keys(byActe);

    var cats = ['all','war','politics','economy','society','event'];
    var filtersHtml = '<div class="vv-filters">';
    cats.forEach(function(f) {
      filtersHtml += '<button class="vv-tf' + (state.filter===f?' vv-active':'') + '" data-f="' + f + '">' + (f==='all'?'Tout':catInfo(f).label) + '</button>';
    });
    filtersHtml += '</div>';

    if (!filtered.length) {
      pg.innerHTML = filtersHtml + '<p style="color:#999;font-size:13px;padding:20px 0">Aucun événement dans cette catégorie.</p>';
      pg.querySelectorAll('.vv-tf').forEach(function(b){ b.addEventListener('click', function(){ state.filter=this.getAttribute('data-f'); render(); }); });
      return;
    }

    var trackHtml = '';
    keys.forEach(function(acte) {
      var evts = byActe[acte];
      trackHtml += '<div class="vv-yg"><div class="vv-ysep"><div class="vv-yline"></div><div class="vv-ypill">' + esc(acte) + '</div><div class="vv-yline"></div></div>';
      evts.forEach(function(n, ei) {
        var above = ei % 2 === 0;
        var c = catInfo(n.category);
        var isAct = state.detail == n.id;
        var img = getImg(n);
        var cardHtml = '<div class="vv-card">';
        cardHtml += imgHTML(img, 'vv-card-img', 'vv-card-img-ph');
        cardHtml += '<div class="vv-card-body">';
        cardHtml += '<div class="vv-card-date">' + esc(n.date||'') + '</div>';
        cardHtml += '<div class="vv-card-title">' + esc(n.title) + '</div>';
        cardHtml += '<span class="vv-tag" style="background:' + c.bg + ';color:' + c.color + '">' + c.label + '</span>';
        cardHtml += '</div></div>';

        trackHtml += '<div class="vv-ev ' + (above?'above':'below') + (isAct?' vv-active':'') + '" data-id="' + esc(n.id) + '">';
        if (above) {
          trackHtml += '<div class="vv-ev-top">' + cardHtml + '<div class="vv-stem"></div></div>';
          trackHtml += '<div class="vv-dot"></div>';
          trackHtml += '<div class="vv-ev-bot"><div class="vv-stem"></div></div>';
        } else {
          trackHtml += '<div class="vv-ev-top"><div class="vv-stem"></div></div>';
          trackHtml += '<div class="vv-dot"></div>';
          trackHtml += '<div class="vv-ev-bot"><div class="vv-stem"></div>' + cardHtml + '</div>';
        }
        trackHtml += '</div>';
      });
      trackHtml += '</div>';
    });

    pg.innerHTML = filtersHtml +
      '<div class="vv-tl-outer" id="vv-tl-outer">' +
        '<div class="vv-tl-fl" id="vv-tl-fl"><button class="vv-tl-arr" id="vv-arr-l">‹</button></div>' +
        '<div class="vv-tl-fr vv-vis" id="vv-tl-fr"><button class="vv-tl-arr" id="vv-arr-r">›</button></div>' +
        '<div class="vv-tl-scroll" id="vv-tl-scroll">' +
          '<div class="vv-tl-track"><div class="vv-tl-line"></div>' + trackHtml + '</div>' +
        '</div>' +
        '<div class="vv-tl-hint">' + filtered.length + ' événement' + (filtered.length>1?'s':'') + ' · glisser ou utiliser les flèches</div>' +
      '</div>' +
      '<div id="vv-tl-detail"></div>';

    // filter events
    pg.querySelectorAll('.vv-tf').forEach(function(b){
      b.addEventListener('click', function(){ state.filter=this.getAttribute('data-f'); state.detail=null; render(); });
    });

    // card click
    pg.querySelectorAll('.vv-ev').forEach(function(el) {
      el.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        if (state.detail == id) { state.detail = null; render(); return; }
        state.detail = id;
        render();
        setTimeout(function() {
          var d = document.getElementById('vv-tl-detail');
          if (d) d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      });
    });

    // detail
    if (state.detail) {
      var detailEl = document.getElementById('vv-tl-detail');
      if (detailEl) renderDetailInto(detailEl, news, state.detail, function(){ state.detail=null; render(); });
    }

    // scroll arrows
    var sc = document.getElementById('vv-tl-scroll');
    var fl = document.getElementById('vv-tl-fl');
    var fr = document.getElementById('vv-tl-fr');
    function updateArrows() {
      if (!sc||!fl||!fr) return;
      fl.classList.toggle('vv-vis', sc.scrollLeft > 4);
      fr.classList.toggle('vv-vis', sc.scrollLeft < sc.scrollWidth - sc.clientWidth - 4);
    }
    if (sc) {
      sc.addEventListener('scroll', updateArrows);
      updateArrows();
      var isDown=false, sx=0, sl=0;
      sc.addEventListener('mousedown', function(e){ isDown=true; sx=e.pageX-sc.offsetLeft; sl=sc.scrollLeft; sc.style.cursor='grabbing'; });
      document.addEventListener('mouseup', function(){ isDown=false; if(sc) sc.style.cursor='grab'; });
      sc.addEventListener('mousemove', function(e){ if(!isDown) return; e.preventDefault(); sc.scrollLeft=sl-(e.pageX-sc.offsetLeft-sx); });
    }
    var arrL = document.getElementById('vv-arr-l');
    var arrR = document.getElementById('vv-arr-r');
    if (arrL) arrL.addEventListener('click', function(){ sc.scrollBy({left:-220,behavior:'smooth'}); });
    if (arrR) arrR.addEventListener('click', function(){ sc.scrollBy({left:220,behavior:'smooth'}); });
  }

  // ── ACTES ──
  function renderActes(pg, news, acteKeys, state, render) {
    if (!acteKeys.length) {
      pg.innerHTML = '<p style="color:#999;font-size:13px;padding:20px 0">Aucun acte défini. Ajoute le champ "acte" dans tes news Google Sheets.</p>';
      return;
    }
    var html = '<div class="vv-actes-header"><h2>Actes du RP</h2></div>';
    acteKeys.forEach(function(acte) {
      var linked = news.filter(function(n){ return n.acte===acte; });
      html += '<div class="vv-acte-card"><div class="vv-acte-head">';
      html += '<span class="vv-acte-num">' + esc(acte) + '</span>';
      html += '</div>';
      if (linked.length) {
        html += '<div class="vv-acte-news"><div class="vv-anl">' + linked.length + ' news liée' + (linked.length!==1?'s':'') + '</div>';
        linked.forEach(function(n) {
          var c = catInfo(n.category);
          html += '<div class="vv-anr" data-id="' + esc(n.id) + '">';
          html += '<span class="vv-anr-dot" style="background:' + c.color + '"></span>';
          html += '<span class="vv-anr-title">' + esc(n.title) + '</span>';
          html += '<span class="vv-anr-date">' + esc(n.date||'') + '</span>';
          html += '</div>';
        });
        html += '</div>';
      } else {
        html += '<div class="vv-acte-news"><div class="vv-acte-empty">Aucune news liée à cet acte.</div></div>';
      }
      html += '</div>';
    });
    html += '<div id="vv-actes-detail"></div>';
    pg.innerHTML = html;

    pg.querySelectorAll('.vv-anr').forEach(function(el) {
      el.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        var detailEl = document.getElementById('vv-actes-detail');
        renderDetailInto(detailEl, news, id, function(){ detailEl.innerHTML=''; });
        setTimeout(function(){ detailEl.scrollIntoView({behavior:'smooth',block:'nearest'}); }, 50);
      });
    });
  }

  // ═══════════════════════════════════════════════
  //  WIDGET ACCUEIL (gros titres horizontaux)
  // ═══════════════════════════════════════════════
  function initHomeWidget(container) {
    container.className = 'vv-news';
    container.innerHTML = '<div class="vv-loading"><div class="vv-spinner"></div>Chargement…</div>';

    // modal
    var modalBg = document.createElement('div');
    modalBg.className = 'vv-modal-bg';
    modalBg.id = 'vv-hw-modal';
    modalBg.innerHTML = '<div class="vv-modal-box" id="vv-hw-modal-box"></div>';
    document.body.appendChild(modalBg);
    modalBg.addEventListener('click', function(e){ if(e.target===modalBg) modalBg.classList.remove('vv-open'); });

    // précharger les dieux avant les news
    fetchDieux(function() {
      fetchNews(function(err, news) {
        if (err || !news.length) {
          container.innerHTML = '<div class="vv-news"><p style="color:#999;font-size:13px">Aucune news disponible.</p></div>';
          return;
        }

        var featured = news.filter(function(n){ return n.featured; }).slice(0, CONFIG.homeMaxCards);
      if (!featured.length) featured = news.slice(0, CONFIG.homeMaxCards);

      var html = '<div class="vv-home-widget"><div class="vv-hero-label">⚡ Actualités importantes</div><div class="vv-hw-grid">';
      featured.forEach(function(n) {
        var c = catInfo(n.category);
        html += '<div class="vv-hw-card" data-id="' + esc(n.id) + '">';
        // bandeau "IMPORTANT" en haut de chaque carte
        html += '<div class="vv-hw-important"><span class="vv-hw-imp-dot"></span>IMPORTANT</div>';
        html += imgHTML(getImg(n), 'vv-hw-img', 'vv-hw-img-ph');
        html += '<div class="vv-hw-body">';
        html += '<div class="vv-hw-badge" style="background:' + c.bg + ';color:' + c.color + '">';
        html += '<span class="vv-hw-dot" style="background:' + c.color + '"></span>' + c.label + '</div>';
        html += '<div class="vv-hw-title">' + esc(n.title) + '</div>';
        html += '<div class="vv-hw-meta">' + esc(n.date||'') + (n.acte?' · '+esc(n.acte):'') + '</div>';
        html += '<div class="vv-hw-arrow">→ Lire l\'article</div>';
        if (n.dieux && n.dieux.length && dieuxCache) {
          html += buildDieuxHTML(n.dieux, dieuxCache, 30, 'vv-dieu-img');
        }
        html += '</div></div>';
      });
      html += '</div></div>';
      container.innerHTML = html;
      container.className = 'vv-news';

      container.querySelectorAll('.vv-hw-card').forEach(function(el) {
        el.addEventListener('click', function() {
          var id = this.getAttribute('data-id');
          var n = news.filter(function(x){return x.id==id;})[0];
          if (!n) return;
          var c = catInfo(n.category);
          var img = getImg(n);
          var box = document.getElementById('vv-hw-modal-box');
          var html2 = '';
          // image de couverture pleine largeur
          html2 += imgHTML(img, 'vv-modal-img', 'vv-modal-img-ph');
          html2 += '<div class="vv-modal-inner">';
          // bouton fermer sticky en haut — toujours visible même en scrollant
          html2 += '<div class="vv-modal-close-wrap"><button class="vv-close-btn" id="vv-modal-close" style="background:#fff;font-size:14px;padding:6px 12px;font-weight:700">✕ Fermer</button></div>';
          html2 += '<div class="vv-modal-head"><div style="flex:1">';
          html2 += '<span class="vv-tag" style="background:' + c.bg + ';color:' + c.color + ';margin-bottom:10px;display:inline-block">' + c.label + '</span>';
          html2 += '<div class="vv-modal-title">' + esc(n.title) + '</div>';
          html2 += '<div class="vv-modal-meta">' + esc(n.date||'') + (n.acte?' · '+esc(n.acte):'') + '</div>';
          html2 += '</div></div>';
          // corps complet sans troncature
          html2 += '<div class="vv-modal-body">' + esc(n.body||n.summary) + '</div>';
          // portraits des dieux dans le modal
          if (n.dieux && n.dieux.length && dieuxCache) {
            html2 += '<div class="vv-modal-dieux"><span class="vv-dieux-label">Dieux impliqués</span>';
            n.dieux.forEach(function(nom) {
              var d = dieuxCache[nom.trim().toLowerCase()];
              if (!d) return;
              var wrap = d.wiki ? '<a href="' + esc(d.wiki) + '" target="_blank" class="vv-modal-dieu-wrap">' : '<span class="vv-modal-dieu-wrap">';
              var wrapEnd = d.wiki ? '</a>' : '</span>';
              html2 += wrap;
              if (d.portrait) {
                html2 += '<img src="' + esc(d.portrait) + '" class="vv-modal-dieu-img" alt="' + esc(d.nom) + '" onerror="this.style.display=\x27none\x27">';
              } else {
                html2 += '<div style="width:44px;height:44px;border-radius:50%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:18px">⚡</div>';
              }
              html2 += '<div class="vv-modal-dieu-name">' + esc(d.nom) + '</div>';
              html2 += wrapEnd;
            });
            html2 += '</div>';
          }
          html2 += '</div>';
          box.innerHTML = html2;
          document.getElementById('vv-hw-modal').classList.add('vv-open');
          // scroll en haut du modal à l'ouverture
          box.scrollTop = 0;
          document.getElementById('vv-modal-close').addEventListener('click', function(){
            document.getElementById('vv-hw-modal').classList.remove('vv-open');
          });
        });
        });
      });
    });
  }

  // ═══════════════════════════════════════════════
  // INIT — détecte les conteneurs et lance
  // ═══════════════════════════════════════════════
  function init() {
    injectCSS();
    var newsPage = document.getElementById('vv-news-page');
    var newsHome = document.getElementById('vv-news-home');
    if (newsPage) initNewsPage(newsPage);
    if (newsHome) initHomeWidget(newsHome);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();