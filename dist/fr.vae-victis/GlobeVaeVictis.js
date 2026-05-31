/* ========================================
   Le Monde de Vae — Globe D3.js v6
   Coller dans : MediaWiki:Common.js
   ======================================== */
(function () {
  'use strict';

  /* ─── COULEURS GLOBE ─── */
  var C_DEFAULT = '#3a5f8a'; /* tous les pays listés */
  var C_HOVER   = '#6a9fd4'; /* survol               */
  var C_ACTIVE  = '#e8c96a'; /* région sélectionnée  */
  var C_NONE    = '#1e3358'; /* pays hors liste       */

  /* ─── RÉGIONS ─── */
  var REGIONS = [
    { id:"usa",               nom:"États-Unis",           color:"#C4A35A", img:"https://i.imgur.com/Uj95GDe.jpg", lat: 38, lon:-97,  path:"/wiki/États-Unis_d'Amérique", pays:["United States of America"] },
    { id:"canada",            nom:"Canada",                color:"#B8935A", img:"https://i.imgur.com/xVu1Qhb.jpg", lat: 56, lon:-96,  path:"/wiki/Canada",                pays:["Canada"] },
    { id:"amerique-centrale", nom:"Amérique Centrale",     color:"#D4A96A", img:"https://i.imgur.com/mvSRiqq.jpg", lat: 15, lon:-87,  path:"/wiki/Amérique_Centrale",     pays:["Mexico","Guatemala","Belize","Honduras","El Salvador","Nicaragua","Costa Rica","Panama"] },
    { id:"bresil",            nom:"Brésil",                color:"#C49A5A", img:"https://i.imgur.com/Gm8Jqxp.jpg", lat:-10, lon:-52,  path:"/wiki/Brésil",                pays:["Brazil"] },
    { id:"france",            nom:"France",                color:"#7B9EC4", img:"https://i.imgur.com/vsGNtFv.jpg", lat: 46, lon:  2,  path:"/wiki/France",                pays:["France"] },
    { id:"espagne-portugal",  nom:"Péninsule Ibérique",    color:"#6A8EB8", img:"https://i.imgur.com/PFVXQBg.jpg", lat: 40, lon: -4,  path:"/wiki/Péninsule_Ibérique",    pays:["Spain","Portugal"] },
    { id:"allemagne-autriche",nom:"Allemagne - Autriche",  color:"#7A9DC3", img:"https://i.imgur.com/180Lu6U.jpg", lat: 48, lon: 13,  path:"/wiki/Allemagne_-_Autriche",  pays:["Germany","Austria"] },
    { id:"benelux",           nom:"Benelux",               color:"#8AADD0", img:"https://i.imgur.com/gX8NT8i.jpg", lat: 51, lon:  5,  path:"/wiki/Benelux",               pays:["Belgium","Netherlands","Luxembourg"] },
    { id:"royaume-uni",       nom:"Royaume-Uni",           color:"#6B9BC0", img:"https://i.imgur.com/tSGWd5B.jpg", lat: 54, lon: -2,  path:"/wiki/Royaume-Uni",           pays:["United Kingdom"] },
    { id:"italie",            nom:"Italie",                color:"#7CA8C8", img:"https://i.imgur.com/5GpLdLA.jpg", lat: 42, lon: 12,  path:"/wiki/Italie",                pays:["Italy"] },
    { id:"grece-balkans",     nom:"Terres Balkaniques",    color:"#5A8AB5", img:"https://i.imgur.com/ugYlw8j.jpg", lat: 42, lon: 21,  path:"/wiki/Terres_Balkaniques",    pays:["Greece","Albania","Bosnia and Herzegovina","Serbia","Montenegro","Kosovo","North Macedonia","Croatia","Slovenia","Bulgaria"] },
    { id:"visegrad",          nom:"Pacte de Visegrád",     color:"#7090BB", img:"https://i.imgur.com/nf0PFUF.jpg", lat: 50, lon: 19,  path:"/wiki/Pacte_de_Visegrád",     pays:["Poland","Czechia","Slovakia","Hungary"] },
    { id:"scandinavie",       nom:"Scandinavie",           color:"#8AAED2", img:"https://i.imgur.com/NrCH3vZ.jpg", lat: 63, lon: 16,  path:"/wiki/Scandinavie",           pays:["Sweden","Norway","Denmark","Finland","Iceland"] },
    { id:"ruthenie",          nom:"Ruthénie",              color:"#5080A8", img:"https://i.imgur.com/BjlWr2w.jpg", lat: 50, lon: 30,  path:"/wiki/Ruthénie",              pays:["Ukraine","Estonia","Latvia","Lithuania","Romania","Moldova","Belarus"] },
    { id:"arabie",            nom:"Péninsule Arabique",    color:"#9E8050", img:"https://i.imgur.com/TiHSouQ.jpg", lat: 25, lon: 45,  path:"/wiki/Péninsule_Arabique",    pays:["Iraq","Syria","Saudi Arabia","Yemen","Oman","United Arab Emirates","Qatar","Kuwait","Bahrain","Jordan"] },
    { id:"iran-georgie",      nom:"Terres Perses",         color:"#A07840", img:"https://i.imgur.com/DQiV8Qf.jpg", lat: 35, lon: 50,  path:"/wiki/Terres_Perses",         pays:["Iran","Georgia","Armenia","Azerbaijan"] },
    { id:"asie-centrale",     nom:"Steppes Centrales",     color:"#887040", img:"https://i.imgur.com/u9FerZR.jpg", lat: 45, lon: 63,  path:"/wiki/Steppes_Centrales",     pays:["Kazakhstan","Uzbekistan","Turkmenistan","Tajikistan","Kyrgyzstan","Afghanistan"] },
    { id:"russie",            nom:"Russie",                color:"#3A6080", img:"https://i.imgur.com/B8QguWu.jpg", lat: 62, lon: 94,  path:"/wiki/Russie",                pays:["Russia"] },
    { id:"chine",             nom:"Chine",                 color:"#487090", img:"https://i.imgur.com/crpJReS.jpg", lat: 36, lon:103,  path:"/wiki/Chine",                 pays:["China","Taiwan","Mongolia"] },
    { id:"japon",             nom:"Japon",                 color:"#4A7898", img:"https://i.imgur.com/8yUi1Bf.jpg", lat: 36, lon:128,  path:"/wiki/Japon",                 pays:["Japan","South Korea","North Korea"] },
    { id:"inde",              nom:"Sous-Continent Indien", color:"#906050", img:"https://i.imgur.com/XARkXRW.jpg", lat: 22, lon: 78,  path:"/wiki/Sous-Continent_Indien", pays:["India","Pakistan","Bangladesh","Sri Lanka","Nepal","Bhutan"] },
    { id:"australie",         nom:"Terres Australes",      color:"#508870", img:"https://i.imgur.com/bZFndVz.jpg", lat:-27, lon:134,  path:"/wiki/Terres_Australes",      pays:["Australia","New Zealand"] },
    { id:"maghreb-egypte",    nom:"Terres du Maghreb",     color:"#786040", img:"https://i.imgur.com/bXSvQLP.jpg", lat: 28, lon: 10,  path:"/wiki/Terres_du_Maghreb",     pays:["Morocco","Algeria","Tunisia","Libya","Egypt","Western Sahara"] },
  ];

  var COUNTRY_NAMES = {
    "004":"Afghanistan","008":"Albania","012":"Algeria","024":"Angola","032":"Argentina",
    "036":"Australia","040":"Austria","050":"Bangladesh","112":"Belarus","056":"Belgium",
    "064":"Bhutan","068":"Bolivia","070":"Bosnia and Herzegovina","076":"Brazil",
    "100":"Bulgaria","116":"Cambodia","124":"Canada","152":"Chile","156":"China",
    "170":"Colombia","188":"Costa Rica","191":"Croatia","192":"Cuba","203":"Czechia",
    "208":"Denmark","218":"Ecuador","818":"Egypt","222":"El Salvador","233":"Estonia",
    "246":"Finland","250":"France","276":"Germany","288":"Ghana","300":"Greece",
    "320":"Guatemala","332":"Haiti","340":"Honduras","348":"Hungary","356":"India",
    "360":"Indonesia","364":"Iran","368":"Iraq","372":"Ireland","376":"Israel",
    "380":"Italy","392":"Japan","400":"Jordan","398":"Kazakhstan","404":"Kenya",
    "410":"South Korea","408":"North Korea","414":"Kuwait","428":"Latvia","422":"Lebanon",
    "434":"Libya","440":"Lithuania","442":"Luxembourg","484":"Mexico","496":"Mongolia",
    "504":"Morocco","524":"Nepal","528":"Netherlands","554":"New Zealand","558":"Nicaragua",
    "566":"Nigeria","578":"Norway","586":"Pakistan","591":"Panama","604":"Peru",
    "616":"Poland","620":"Portugal","642":"Romania","643":"Russia","682":"Saudi Arabia",
    "703":"Slovakia","705":"Slovenia","724":"Spain","144":"Sri Lanka","729":"Sudan",
    "752":"Sweden","760":"Syria","158":"Taiwan","762":"Tajikistan","764":"Thailand",
    "792":"Turkey","795":"Turkmenistan","804":"Ukraine","784":"United Arab Emirates",
    "826":"United Kingdom","840":"United States of America","858":"Uruguay",
    "860":"Uzbekistan","704":"Vietnam","887":"Yemen","716":"Zimbabwe","417":"Kyrgyzstan",
    "498":"Moldova","807":"North Macedonia","499":"Montenegro","051":"Armenia",
    "031":"Azerbaijan","268":"Georgia","084":"Belize","512":"Oman","634":"Qatar",
    "048":"Bahrain","788":"Tunisia","732":"Western Sahara","466":"Mali","562":"Niger",
    "478":"Mauritania","686":"Senegal","454":"Malawi","894":"Zambia","072":"Botswana",
    "516":"Namibia","710":"South Africa","508":"Mozambique","834":"Tanzania",
    "800":"Uganda","231":"Ethiopia","598":"Papua New Guinea",
  };

  var countryToRegion = {};
  REGIONS.forEach(function(r) {
    r.pays.forEach(function(p) { countryToRegion[p] = r; });
  });

  /* ─── ÉTAT GLOBAL ─── */
  var SIZE = 420;
  var projection, geoPath, svgEl, gWorld, gGraticule;
  var rotLambda = 0, rotPhi = 0, targetLambda = 0, targetPhi = 0;
  var isDragging = false, dragStart = null;
  var highlightedIdx = -1;
  var tooltipEl;
  var autoSpin = true;

  /* ─── INIT ─── */
  function init() {
    var root = document.getElementById('mvae-globe-root');
    if (!root) return;
    injectStyles();
    buildHTML(root);
    loadDeps(startGlobe);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

  /* ─── STYLES ─── */
  function injectStyles() {
    if (document.getElementById('mvae-styles')) return;
    var el = document.createElement('style');
    el.id = 'mvae-styles';
    el.textContent =
      '@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap");' +
      '.mvae-wrap{font-family:"Crimson Pro",serif;max-width:800px;margin:0 auto;padding:2rem 1rem;}' +
      '.mvae-globe-title{text-align:center;font-family:"Cinzel",serif;font-size:30px;font-weight:400;color:#1a0e4e;letter-spacing:.15em;margin:0 0 .3rem;}' +
      '.mvae-globe-sub{text-align:center;font-size:15px;color:#999;font-style:italic;margin:0 0 1.4rem;}' +
      '.mvae-globe-section{display:flex;justify-content:center;margin-bottom:1.8rem;position:relative;}' +
      '#mvae-svg-globe{cursor:grab;display:block;filter:drop-shadow(0 8px 32px rgba(10,20,60,.5));}' +
      '#mvae-svg-globe:active{cursor:grabbing;}' +
      '#mvae-svg-globe path{background:transparent!important;background-color:transparent!important;}' +
      '#mvae-svg-globe path:hover{background:transparent!important;background-color:transparent!important;}' +
      /* Tooltip : fixé au body, donc aucune interférence Fandom */
      '#mvae-tip{position:fixed;background:rgba(8,14,40,.95);border:1px solid rgba(160,180,255,.4);border-radius:8px;padding:5px 13px;font-size:12px;font-family:"Cinzel",serif;color:#d8e4ff;pointer-events:none;opacity:0;transition:opacity .1s;white-space:nowrap;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,.6);letter-spacing:.05em;}' +
      '.mvae-divider{border:none;border-top:1px solid #e4e0f5;margin:0 0 1.4rem;}' +
      '.mvae-icons-title{font-family:"Cinzel",serif;font-size:11px;font-weight:600;color:#aaa;letter-spacing:.16em;text-transform:uppercase;text-align:center;margin-bottom:1rem;}' +
      '.mvae-countries-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;}' +
      '.mvae-country-icon{position:relative;display:block;border-radius:10px;border:1.5px solid #ebe7f8;cursor:pointer;overflow:hidden;padding:0;margin:0;transition:border-color .15s,transform .12s,box-shadow .15s;background:transparent;}' +
      '.mvae-country-icon:hover{border-color:#9b8fe0;transform:translateY(-2px);box-shadow:0 4px 14px rgba(100,80,200,.15);}' +
      '.mvae-country-icon.mvae-hl{border-color:#6c5ce7;box-shadow:0 4px 16px rgba(108,92,231,.3);}' +
      '.mvae-cbanner{display:block;width:100%;height:90px;object-fit:cover;object-position:center;margin:0;padding:0;border:0;}' +
      '.mvae-cfoot{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:5px;padding:20px 6px 7px;background:linear-gradient(transparent,rgba(0,0,20,0.75));pointer-events:none;}' +
      '.mvae-cdot{width:6px;height:6px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,0.5);}' +
      '.mvae-cname{font-family:"Cinzel",serif;font-size:8px;font-weight:600;letter-spacing:.04em;color:#fff;text-align:center;line-height:1.4;text-shadow:0 1px 4px rgba(0,0,0,.9);}' +
      '.mvae-country-icon.mvae-hl .mvae-cname{color:#fff;}';
    document.head.appendChild(el);

    /* Tooltip fixé au body */
    var tip = document.createElement('div');
    tip.id = 'mvae-tip';
    document.body.appendChild(tip);
    tooltipEl = tip;
  }

  /* ─── HTML ─── */
  function buildHTML(root) {
    var wrap = document.createElement('div');
    wrap.className = 'mvae-wrap';
    wrap.innerHTML =
      '<h1 class="mvae-globe-title">Le Monde de Vae</h1>' +
      '<p class="mvae-globe-sub">Tournez le globe \u00b7 Cliquez pour explorer</p>' +
      '<div class="mvae-globe-section" id="mvae-globe-section"></div>' +
      '<hr class="mvae-divider">' +
      '<p class="mvae-icons-title">Destinations</p>' +
      '<div class="mvae-countries-grid" id="mvae-countries-grid"></div>';

    var grid = wrap.querySelector('#mvae-countries-grid');
    REGIONS.forEach(function(r, i) {
      var div  = document.createElement('div');
      div.className = 'mvae-country-icon';
      div.setAttribute('data-idx', i);

      var img = document.createElement('img');
      img.className = 'mvae-cbanner';
      img.src = r.img;
      img.alt = r.nom;
      img.loading = 'lazy';

      var foot = document.createElement('div');
      foot.className = 'mvae-cfoot';

      var dot = document.createElement('div');
      dot.className = 'mvae-cdot';
      dot.style.background = r.color;

      var nm = document.createElement('span');
      nm.className = 'mvae-cname';
      nm.textContent = r.nom;

      foot.appendChild(dot);
      foot.appendChild(nm);
      div.appendChild(img);
      div.appendChild(foot);
      div.addEventListener('click', function() { onIconClick(i); });
      grid.appendChild(div);
    });
    root.appendChild(wrap);
  }

  /* ─── CHARGEMENT LIBS ─── */
  function loadDeps(cb) {
    function loadScript(src, next) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = next;
      document.head.appendChild(s);
    }
    if (window.d3 && window.topojson) { cb(); return; }
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js', function() {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js', cb);
    });
  }

  /* ─── GLOBE ─── */
  function startGlobe() {
    var d3 = window.d3;
    var section = document.getElementById('mvae-globe-section');

    projection = d3.geoOrthographic()
      .scale(SIZE / 2 - 4)
      .center([0, 0])
      .rotate([0, 0])
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90);

    geoPath = d3.geoPath().projection(projection);

    svgEl = d3.create('svg')
      .attr('id', 'mvae-svg-globe')
      .attr('width', SIZE).attr('height', SIZE)
      .attr('viewBox', '0 0 ' + SIZE + ' ' + SIZE);

    var defs = svgEl.append('defs');

    var gOcean = defs.append('radialGradient').attr('id','mvae-og').attr('cx','38%').attr('cy','35%').attr('r','65%');
    gOcean.append('stop').attr('offset','0%').attr('stop-color','#2a4a7a');
    gOcean.append('stop').attr('offset','60%').attr('stop-color','#152a50');
    gOcean.append('stop').attr('offset','100%').attr('stop-color','#080e28');

    var gShine = defs.append('radialGradient').attr('id','mvae-sg').attr('cx','33%').attr('cy','28%').attr('r','60%');
    gShine.append('stop').attr('offset','0%').attr('stop-color','rgba(255,255,255,0.11)');
    gShine.append('stop').attr('offset','60%').attr('stop-color','rgba(255,255,255,0.01)');
    gShine.append('stop').attr('offset','100%').attr('stop-color','rgba(0,0,30,0.52)');

    defs.append('clipPath').attr('id','mvae-clip')
      .append('circle').attr('cx', SIZE/2).attr('cy', SIZE/2).attr('r', SIZE/2 - 4);

    /* Océan */
    svgEl.append('circle').attr('cx',SIZE/2).attr('cy',SIZE/2).attr('r',SIZE/2-4).attr('fill','url(#mvae-og)');

    /* Graticule */
    gGraticule = svgEl.append('g').attr('clip-path','url(#mvae-clip)');
    gGraticule.append('path')
      .datum(d3.geoGraticule()())
      .attr('fill','none').attr('stroke','rgba(255,255,255,0.06)').attr('stroke-width','0.5');

    /* Pays */
    gWorld = svgEl.append('g').attr('clip-path','url(#mvae-clip)');

    /* Brillance par-dessus */
    svgEl.append('circle').attr('cx',SIZE/2).attr('cy',SIZE/2).attr('r',SIZE/2-4)
      .attr('fill','url(#mvae-sg)').attr('pointer-events','none');
    svgEl.append('circle').attr('cx',SIZE/2).attr('cy',SIZE/2).attr('r',SIZE/2-4)
      .attr('fill','none').attr('stroke','rgba(100,150,255,0.28)').attr('stroke-width','1.5').attr('pointer-events','none');

    /* Données GeoJSON */
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(function(world) {
      var features = topojson.feature(world, world.objects.countries).features;
      var borders  = topojson.mesh(world, world.objects.countries, function(a,b){ return a !== b; });

      gWorld.selectAll('.mvae-country')
        .data(features)
        .enter().append('path')
        .attr('class','mvae-country')
        .attr('d', geoPath)
        .style('fill', function(d) {
          return countryToRegion[COUNTRY_NAMES[d.id] || ''] ? C_DEFAULT : C_NONE;
        })
        .style('stroke','rgba(255,255,255,0.14)').style('stroke-width','0.4px')
        .style('cursor','pointer')
        .style('background','transparent')
        .on('mouseover', function(event, d) {
          var reg = countryToRegion[COUNTRY_NAMES[d.id] || ''];
          if (!reg) return;
          var idx = REGIONS.indexOf(reg);
          if (idx !== highlightedIdx) {
            d3.select(this).style('fill', C_HOVER);
          }
          tooltipEl.textContent = reg.nom;
          tooltipEl.style.left  = (event.clientX + 14) + 'px';
          tooltipEl.style.top   = (event.clientY - 30) + 'px';
          tooltipEl.style.opacity = '1';
          svgEl.node().style.cursor = 'pointer';
        })
        .on('mousemove', function(event) {
          tooltipEl.style.left = (event.clientX + 14) + 'px';
          tooltipEl.style.top  = (event.clientY - 30) + 'px';
        })
        .on('mouseout', function(event, d) {
          var reg = countryToRegion[COUNTRY_NAMES[d.id] || ''];
          if (!reg) return;
          var idx = REGIONS.indexOf(reg);
          d3.select(this).style('fill', idx === highlightedIdx ? C_ACTIVE : C_DEFAULT);
          tooltipEl.style.opacity = '0';
          svgEl.node().style.cursor = 'grab';
        })
        .on('click', function(event, d) {
          var reg = countryToRegion[COUNTRY_NAMES[d.id] || ''];
          if (!reg) return;
          var idx = REGIONS.indexOf(reg);
          if (highlightedIdx === idx) { window.location.href = reg.path; return; }
          highlightedIdx = idx;
          recolorAll();
          syncHL(idx);
          targetLambda = -reg.lon;
          targetPhi    = -reg.lat * 0.5;
          autoSpin = false;
          var el = document.querySelector('[data-idx="' + idx + '"]');
          if (el) el.scrollIntoView({ behavior:'smooth', block:'nearest' });
        });

      gWorld.append('path').datum(borders)
        .attr('fill','none').attr('stroke','rgba(255,255,255,0.17)').attr('stroke-width','0.45').attr('pointer-events','none');

      var drag = d3.drag()
        .on('start', function(event) {
          isDragging = true; autoSpin = false;
          dragStart = { x:event.x, y:event.y, l:rotLambda, p:rotPhi };
        })
        .on('drag', function(event) {
          if (!dragStart) return;
          targetLambda = dragStart.l + (event.x - dragStart.x) * 0.35;
          targetPhi    = Math.max(-70, Math.min(70, dragStart.p - (event.y - dragStart.y) * 0.25));
          tooltipEl.style.opacity = '0';
        })
        .on('end', function() { isDragging = false; dragStart = null; });

      svgEl.call(drag);
      section.appendChild(svgEl.node());
      requestAnimationFrame(animate);
    });
  }

  function recolorAll() {
    if (!gWorld) return;
    gWorld.selectAll('.mvae-country').style('fill', function(d) {
      var reg = countryToRegion[COUNTRY_NAMES[d.id] || ''];
      if (!reg) return C_NONE;
      return REGIONS.indexOf(reg) === highlightedIdx ? C_ACTIVE : C_DEFAULT;
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    if (autoSpin && !isDragging) targetLambda -= 0.15;
    rotLambda += (targetLambda - rotLambda) * 0.06;
    rotPhi    += (targetPhi    - rotPhi)    * 0.06;
    projection.rotate([rotLambda, rotPhi]);
    if (gWorld)     gWorld.selectAll('path').attr('d', geoPath);
    if (gGraticule) gGraticule.selectAll('path').attr('d', geoPath);
  }

  function syncHL(idx) {
    document.querySelectorAll('.mvae-country-icon').forEach(function(el, i) {
      el.classList.toggle('mvae-hl', i === idx);
    });
  }

  function onIconClick(i) {
    if (highlightedIdx === i) { window.location.href = REGIONS[i].path; return; }
    highlightedIdx = i;
    recolorAll();
    syncHL(i);
    autoSpin = false;
    targetLambda = -REGIONS[i].lon;
    targetPhi    = -REGIONS[i].lat * 0.5;
    var globe = document.getElementById('mvae-svg-globe');
    if (globe) globe.scrollIntoView({ behavior:'smooth', block:'center' });
  }

})();