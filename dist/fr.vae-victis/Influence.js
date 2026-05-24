/* ================================================================
   INFLUENCE DIVINE — MediaWiki:Influence.js
   Globe interactif D3 + TopoJSON
   ================================================================ */

/* ================================================================
   DONNÉES DES ZONES — À remplir avec vos infos RP
   nom      : Nom RP de la zone
   leader   : Nom du leader RP
   portrait : URL du portrait (imgur, wiki, etc.)
   pays     : Noms des pays (correspondant aux données TopoJSON)
   ================================================================ */
var ZONES_DATA = {
  "usa": {
    nom: "Etats-Unis d'Amerique",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["United States of America"]
  },
  "canada": {
    nom: "Canada",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Canada"]
  },
  "amerique-centrale": {
    nom: "Amérique Centrale",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Mexico","Guatemala","Belize","Honduras","El Salvador","Nicaragua","Costa Rica","Panama"]
  },
  "bresil": {
    nom: "Brésil",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Brazil"]
  },
  "france": {
    nom: "France",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["France"]
  },
  "espagne-portugal": {
    nom: "Péninsule Ibérique",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Spain","Portugal"]
  },
  "allemagne-autriche": {
    nom: "Allemagne - Autriche",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Germany","Austria"]
  },
  "benelux": {
    nom: "Benelux",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Belgium","Netherlands","Luxembourg"]
  },
  "royaume-uni": {
    nom: "Royaume-Uni",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["United Kingdom"]
  },
  "italie": {
    nom: "Italie",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Italy"]
  },
  "grece-balkans": {
    nom: "Terres Balkaniques",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Greece","Albania","Bosnia and Herzegovina","Serbia","Montenegro","Kosovo","North Macedonia","Croatia","Slovenia","Bulgaria"]
  },
  "visegrad": {
    nom: "Pacte de Visegrád",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Poland","Czechia","Slovakia","Hungary"]
  },
  "scandinavie": {
    nom: "Scandinavie",
    leader: "À définir",
    portrait: "https://imgur.com/SsqAB5N.png",
    influence_nom: "Romina Pourmokhtari",
    influence_logo: "",
    pays: ["Sweden","Norway","Denmark","Finland","Iceland"]
  },
  "ruthenie": {
    nom: "Ruthénie",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Ukraine","Estonia","Latvia","Lithuania","Romania","Moldova","Belarus"]
  },
  "arabie": {
    nom: "Péninsule Arabique",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Iraq","Syria","Saudi Arabia","Yemen","Oman","United Arab Emirates","Qatar","Kuwait","Bahrain","Jordan"]
  },
  "iran-georgie": {
    nom: "Terres Perses",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Iran","Georgia","Armenia","Azerbaijan"]
  },
  "asie-centrale": {
    nom: "Steppes Centrales",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Kazakhstan","Uzbekistan","Turkmenistan","Tajikistan","Kyrgyzstan","Afghanistan"]
  },
  "russie": {
    nom: "Russie",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Russia"]
  },
  "chine": {
    nom: "Chine",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["China","Taiwan","Mongolia"]
  },
  "japon": {
    nom: "Japon",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Japan","South Korea","North Korea"]
  },
  "inde": {
    nom: "Sous-Continent Indien",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["India","Pakistan","Bangladesh","Sri Lanka","Nepal","Bhutan"]
  },
  "australie": {
    nom: "Terres Australes",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Australia","New Zealand"]
  },
  "maghreb-egypte": {
    nom: "Terres du Maghreb",
    leader: "À définir",
    portrait: "",
    influence_nom: "",
    influence_logo: "",
    pays: ["Morocco","Algeria","Tunisia","Libya","Egypt","Western Sahara"]
  }
};

/* ================================================================
   GLOBE — Initialisation
   ================================================================ */
function initGlobe(conteneur, zonesActives) {
  var active = zonesActives || [];

  // Map pays → zoneId
  var paysVersZone = {};
  Object.keys(ZONES_DATA).forEach(function(zoneId) {
    ZONES_DATA[zoneId].pays.forEach(function(p) {
      paysVersZone[p] = zoneId;
    });
  });

  function getColor(name, hover) {
    var zoneId = paysVersZone[name];
    if (!zoneId) return hover ? '#6a8aaa' : '#3a5070';
    if (active.indexOf(zoneId) !== -1) return hover ? '#f0d080' : '#c8a96e';
    return hover ? '#c8d8f0' : '#8aaad0';
  }

  // Loader animé pendant le chargement
  conteneur.innerHTML = '';
  conteneur.style.display        = 'flex';
  conteneur.style.alignItems     = 'center';
  conteneur.style.justifyContent = 'center';
  conteneur.style.minHeight      = '250px';
  conteneur.innerHTML = [
    '<style>',
    '@keyframes ig-pulse{0%,100%{opacity:0.4}50%{opacity:1}}',
    '@keyframes ig-dot{0%,100%{opacity:0.2;transform:translateY(0)}50%{opacity:1;transform:translateY(-5px)}}',
    '@keyframes ig-logo-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
    '@keyframes ig-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes ig-fadeout{from{opacity:1}to{opacity:0;transform:translateY(-8px)}}',
    '</style>',
    '<div id="ig-loader" style="text-align:center;pointer-events:none;animation:ig-fadein 0.6s ease forwards">',
    '<img src="https://i.imgur.com/3VqtRdh.png" style="width:90px;height:90px;object-fit:contain;',
    'border-radius:50%;border:1px solid rgba(200,169,110,0.4);margin-bottom:18px;display:block;margin-left:auto;margin-right:auto;',
    'animation:ig-logo-float 3s ease-in-out infinite;',
    'box-shadow:0 0 20px rgba(200,169,110,0.3),0 0 40px rgba(200,169,110,0.1)">',
    '<div style="font-family:Georgia,serif;font-size:11px;color:#c8a96e;text-transform:uppercase;',
    'letter-spacing:4px;animation:ig-pulse 2s ease-in-out infinite;margin-bottom:14px">',
    "Chargement de l'Interface Divine",
    '</div>',
    '<div style="display:flex;justify-content:center;gap:7px">',
    '<span style="width:5px;height:5px;border-radius:50%;background:#c8a96e;display:inline-block;',
    'animation:ig-dot 1.4s ease-in-out infinite;animation-delay:0s"></span>',
    '<span style="width:5px;height:5px;border-radius:50%;background:#c8a96e;display:inline-block;',
    'animation:ig-dot 1.4s ease-in-out infinite;animation-delay:0.2s"></span>',
    '<span style="width:5px;height:5px;border-radius:50%;background:#c8a96e;display:inline-block;',
    'animation:ig-dot 1.4s ease-in-out infinite;animation-delay:0.4s"></span>',
    '</div>',
    '</div>'
  ].join('');
  conteneur.style.aspectRatio = '16/9';
  conteneur.style.position    = 'relative';
  conteneur.style.background  = 'radial-gradient(ellipse at 35% 35%, #060e1c 0%, #020509 100%)';
  conteneur.style.borderRadius = '3px';
  conteneur.style.overflow    = 'hidden';
  conteneur.style.cursor      = 'grab';

  var svgEl = null; // Créé après le chargement

  // Tooltip
  var tip = document.getElementById('influence-globe-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'influence-globe-tooltip';
    tip.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'display:none',
      'z-index:9999',
      'transform:translateY(-50%)',
      'font-family:Georgia,serif'
    ].join(';');
    tip.innerHTML = [
      '<div style="background:rgba(8,10,22,0.97);border:1px solid #c8a96e;border-radius:3px;',
      'padding:12px 16px;min-width:190px;box-shadow:0 4px 20px rgba(0,0,0,0.8),0 0 10px rgba(200,169,110,0.2);font-family:Georgia,serif">',
	'<img id="ig-portrait" style="width:100px;height:100px;object-fit:cover;border-radius:50%;',
	'margin:0 auto 8px;display:block;border:2px solid rgba(200,169,110,0.5);',
      'margin-bottom:10px;border:1px solid rgba(200,169,110,0.3);display:none">',
      '<div id="ig-zone" style="font-size:13px;color:#c8a96e;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px"></div>',
      '<div style="font-size:10px;color:#5a6080;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Leader</div>',
      '<div id="ig-leader" style="font-size:14px;color:#f0d080;margin-bottom:8px"></div>',
      '<div id="ig-influence-bloc" style="display:none;align-items:center;gap:6px;padding:6px 8px;',
      'background:rgba(200,169,110,0.08);border:1px solid rgba(200,169,110,0.2);border-radius:2px;margin-bottom:8px">',
      '<img id="ig-influence-logo" style="width:20px;height:20px;object-fit:contain;border-radius:50%" src="">',
      '<span id="ig-influence-nom" style="font-size:11px;color:#c8a96e;text-transform:uppercase;letter-spacing:1px"></span>',
      '</div>',
      '<div id="ig-statut" style="font-size:10px;padding-top:6px;border-top:1px solid rgba(200,169,110,0.2);text-transform:uppercase;letter-spacing:1px"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(tip);
  }

  function showTooltip(event, name) {
    var zoneId = paysVersZone[name];
    if (!zoneId) return;
    var zone   = ZONES_DATA[zoneId];
    var isActive = active.indexOf(zoneId) !== -1;

    document.getElementById('ig-zone').textContent   = zone.nom;
	document.getElementById('ig-leader').textContent = zone.leader !== 'À définir' ? zone.leader : '';
	document.getElementById('ig-leader').style.display = zone.leader !== 'À définir' ? 'block' : 'none';

    var portrait = document.getElementById('ig-portrait');
    if (zone.portrait) {
      portrait.src          = zone.portrait;
      portrait.style.display = 'block';
    } else {
      portrait.style.display = 'none';
    }

    var statut = document.getElementById('ig-statut');
    statut.textContent = isActive ? 'Sous influence divine' : 'Zone neutre';
    statut.style.color = isActive ? '#c8a96e' : '#5a6080';

    // Bloc influence (dieu tutélaire)
    var infBloc = document.getElementById('ig-influence-bloc');
    if (zone.influence_nom) {
      document.getElementById('ig-influence-nom').textContent = zone.influence_nom;
      var infLogo = document.getElementById('ig-influence-logo');
      if (zone.influence_logo) {
        infLogo.src           = zone.influence_logo;
        infLogo.style.display = 'block';
      } else {
        infLogo.style.display = 'none';
      }
      infBloc.style.display = 'flex';
    } else {
      infBloc.style.display = 'none';
    }

    tip.style.display = 'block';
    moveTooltip(event);
  }

  function moveTooltip(event) {
    var x = event.clientX + 18;
    var y = event.clientY;
    if (x + 180 > window.innerWidth) x = event.clientX - 195;
    tip.style.left = x + 'px';
    tip.style.top  = y + 'px';
  }

  // Charger D3 + TopoJSON puis dessiner
  mw.loader.getScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js')
  .then(function() {
    return mw.loader.getScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js');
  })
  .then(function() {
    return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    // Délai minimum de 5 secondes pour l'écran de chargement
    return new Promise(function(resolve) {
      setTimeout(function() { resolve(data); }, 5000);
    });
  })
  .then(function(world) {
    // Fondu de sortie du loader
    var loader = document.getElementById('ig-loader');
    if (loader) {
      loader.style.animation = 'ig-fadeout 0.6s ease forwards';
    }

    setTimeout(function() {
      // Vider et préparer le conteneur
      conteneur.innerHTML = '';
      conteneur.style.display        = '';
      conteneur.style.alignItems     = '';
      conteneur.style.justifyContent = '';

      svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.style.width      = '100%';
      svgEl.style.height     = '100%';
      svgEl.style.opacity    = '0';
      svgEl.style.transition = 'opacity 0.8s ease';
      conteneur.appendChild(svgEl);

      var svg    = d3.select(svgEl);
      var W      = conteneur.clientWidth;
      var H      = conteneur.clientHeight;
      var radius = Math.min(W, H) * 0.42;

      var projection = d3.geoOrthographic()
        .scale(radius)
        .translate([W/2, H/2])
        .clipAngle(90)
        .rotate([0, -30]);

      var path = d3.geoPath().projection(projection);

      // Defs
      var defs = svg.append('defs');
      var og = defs.append('radialGradient').attr('id','ig-ocean').attr('cx','38%').attr('cy','35%').attr('r','65%');
      og.append('stop').attr('offset','0%').attr('stop-color','#060e1c').attr('stop-opacity',1);
      og.append('stop').attr('offset','100%').attr('stop-color','#020509').attr('stop-opacity',1);

      var hg = defs.append('radialGradient').attr('id','ig-halo').attr('cx','38%').attr('cy','38%').attr('r','60%');
      hg.append('stop').attr('offset','0%').attr('stop-color','#1a3a6b').attr('stop-opacity',0.35);
      hg.append('stop').attr('offset','100%').attr('stop-color','#000').attr('stop-opacity',0);

      // Étoiles
      var starsG = svg.append('g');
      for (var i = 0; i < 180; i++) {
        starsG.append('circle')
          .attr('cx', Math.random() * W * 3)
          .attr('cy', Math.random() * H * 3)
          .attr('r',  Math.random() * 1.2 + 0.2)
          .attr('fill','white')
          .style('opacity', Math.random() * 0.6 + 0.1);
      }

      // Océan
      svg.append('circle').attr('id','ig-ocean-circle')
        .attr('cx',W/2).attr('cy',H/2).attr('r',radius)
        .attr('fill','url(#ig-ocean)');

      // Graticule
      svg.append('path')
        .datum(d3.geoGraticule()())
        .attr('d', path)
        .attr('fill','none')
        .attr('stroke','rgba(100,140,200,0.07)')
        .attr('stroke-width',0.4)
        .attr('id','ig-graticule');

      // Pays
      var countries  = topojson.feature(world, world.objects.countries);
      var countriesG = svg.append('g').attr('id','ig-countries');

      countriesG.selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('d', path)
        .attr('fill',         function(d) { return getColor(d.properties.name, false); })
        .attr('stroke',       'rgba(100,140,200,0.18)')
        .attr('stroke-width', 0.4)
        .on('mouseover', function(event, d) {
          var name   = d.properties.name;
          var zoneId = paysVersZone[name];
          var isAct  = zoneId && active.indexOf(zoneId) !== -1;
          d3.select(this)
            .attr('fill',         getColor(name, true))
            .attr('stroke',       isAct ? '#f0d080' : '#8aaad0')
            .attr('stroke-width', 0.8);
          if (zoneId) showTooltip(event, name);
        })
        .on('mousemove', function(event, d) {
          if (paysVersZone[d.properties.name]) moveTooltip(event);
        })
        .on('mouseout', function(event, d) {
          d3.select(this)
            .attr('fill',         getColor(d.properties.name, false))
            .attr('stroke',       'rgba(100,140,200,0.18)')
            .attr('stroke-width', 0.4);
          tip.style.display = 'none';
        });

      // Contours
      svg.append('path')
        .datum(topojson.mesh(world, world.objects.countries, function(a,b) { return a !== b; }))
        .attr('d', path).attr('fill','none')
        .attr('stroke','rgba(100,140,200,0.12)').attr('stroke-width',0.3)
        .attr('pointer-events','none');

      // Halo
      svg.append('circle').attr('id','ig-halo-circle')
        .attr('cx',W/2).attr('cy',H/2).attr('r',radius)
        .attr('fill','url(#ig-halo)').attr('pointer-events','none');

      // Contour globe
      svg.append('circle')
        .attr('cx',W/2).attr('cy',H/2).attr('r',radius)
        .attr('fill','none')
        .attr('stroke','rgba(200,169,110,0.2)').attr('stroke-width',1)
        .attr('pointer-events','none');

      // Drag
      var dragStart = null, rotStart = null;
      svg.call(d3.drag()
        .on('start', function(event) {
          dragStart = [event.x, event.y];
          rotStart  = projection.rotate().slice();
          conteneur.style.cursor = 'grabbing';
          tip.style.display = 'none';
        })
        .on('drag', function(event) {
          if (!dragStart) return;
          projection.rotate([
            rotStart[0] + (event.x - dragStart[0]) * 0.3,
            rotStart[1] - (event.y - dragStart[1]) * 0.3
          ]);
          svg.selectAll('path').attr('d', path);
        })
        .on('end', function() {
          conteneur.style.cursor = 'grab';
          dragStart = null;
        })
      );

      // Zoom molette
      svg.on('wheel', function(event) {
        event.preventDefault();
        var delta = event.deltaY > 0 ? 0.9 : 1.1;
        radius = Math.max(Math.min(W, H) * 0.25, Math.min(radius * delta, Math.min(W, H) * 0.75));
        projection.scale(radius);
        svg.select('#ig-ocean-circle').attr('r', radius);
        svg.select('#ig-halo-circle').attr('r', radius);
        svg.selectAll('path').attr('d', path);
        svg.selectAll('circle').filter(function() {
          return d3.select(this).attr('fill') === 'none';
        }).attr('r', radius);
      });

      // Resize
      window.addEventListener('resize', function() {
        W      = conteneur.clientWidth;
        H      = conteneur.clientHeight;
        radius = Math.min(W, H) * 0.42;
        projection.scale(radius).translate([W/2, H/2]);
        svg.select('#ig-ocean-circle').attr('cx',W/2).attr('cy',H/2).attr('r',radius);
        svg.select('#ig-halo-circle').attr('cx',W/2).attr('cy',H/2).attr('r',radius);
        svg.selectAll('path').attr('d', path);
      });

      // Fondu d'entrée du globe
      setTimeout(function() { svgEl.style.opacity = '1'; }, 50);

    }, 700); // fin setTimeout fondu loader

  })
  .catch(function(e) {
    console.warn('Influence.js: erreur chargement globe', e);
  });
}

/* ================================================================
   INIT — Détecter les conteneurs et lancer
   ================================================================ */
mw.hook('wikipage.content').add(function() {
  document.querySelectorAll('.influence-carte-svg[data-zones]').forEach(function(conteneur) {
    var zonesStr = conteneur.getAttribute('data-zones').trim();
    var zones    = zonesStr ? zonesStr.split(' ').filter(Boolean) : [];
    initGlobe(conteneur, zones);
  });
});