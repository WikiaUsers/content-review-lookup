importScript('MediaWiki:Influence.js');

// Forcer le thème desktop sur navigateur mobile
if (window.innerWidth < 768 && !mw.config.get('wgMFMode')) {
    // On est sur mobile mais pas en mode MF — le CSS devrait marcher
}

// Forcer version desktop sur mobile
if (window.location.hostname.startsWith('m.')) {
    window.location.href = window.location.href.replace('m.fandom.com', 'fandom.com');
}

mw.loader.getScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js')
  .then(function() {
    return mw.loader.getScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js');
  })
  .then(function() {
    console.log('D3 + TopoJSON OK');
    mw.loader.load('/wiki/MediaWiki:USA-map.js?action=raw&ctype=text/javascript');
  })
  .catch(function(e) { console.log('ERREUR', e); });
  
  // Révéler les storybox une fois collapsible initialisé
mw.hook('wikipage.content').add(function() {
  setTimeout(function() {
    document.querySelectorAll('.storybox').forEach(function(el) {
      el.style.opacity = '1';
    });
  }, 300);
});

mw.hook('wikipage.content').add(function() {
  document.querySelectorAll('.storybox').forEach(function(el) {

    // Récupérer la position de la storybox
    var rect = el.getBoundingClientRect();

    // Cacher la storybox
    el.style.opacity    = '0';
    el.style.transition = 'opacity 0.5s ease';

    // Loader positionné exactement par-dessus
    var loader = document.createElement('div');
    loader.className = 'storybox-loader';
    loader.style.cssText = [
      'position:fixed',
      'top:'    + rect.top    + 'px',
      'left:'   + rect.left   + 'px',
      'width:'  + rect.width  + 'px',
      'height:120px',
      'z-index:9999'
    ].join(';');
    loader.innerHTML = [
      '<img src="https://i.imgur.com/3VqtRdh.png" style="width:36px;height:36px;',
      'object-fit:contain;border-radius:50%;border:1px solid rgba(200,169,110,0.4);',
      'animation:ig-logo-float 3s ease-in-out infinite;',
      'box-shadow:0 0 10px rgba(200,169,110,0.3)">',
      '<div class="storybox-loader-texte">Chargement du Lore Divin</div>',
      '<div class="storybox-loader-points">',
      '<span></span><span></span><span></span>',
      '</div>'
    ].join('');
    document.body.appendChild(loader);

    setTimeout(function() {
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity    = '0';
      setTimeout(function() {
        loader.remove();
        el.style.opacity = '1';
      }, 500);
    }, 2000);
  });
});

// Conflit — charger les images via data-img
mw.hook('wikipage.content').add(function() {
  document.querySelectorAll('[data-img]').forEach(function(el) {
    var url = el.getAttribute('data-img');
    if (url) {
      el.style.backgroundImage = 'url(' + url + ')';
      el.style.backgroundSize  = 'cover';
      el.style.backgroundPosition = 'center';
    }
  });
});

mw.loader.load("/fr/wiki/MediaWiki:Stats.js?action=raw&ctype=text/javascript");
mw.loader.load("/fr/wiki/MediaWiki:Cartes.js?action=raw&ctype=text/javascript");
importScript('MediaWiki:USA-map.js');
importScript('MediaWiki:USA-globe.js');
importScriptPage('MediaWiki:Europe-influence.js', 'vae-victis');
importScript('MediaWiki:NewsSystem.js');
importScriptURI('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js');
importScriptURI('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js');
importScript('MediaWiki:France-globe.js');
importScript('Mediawiki:GlobeVaeVictis.js');
importScript('MediaWiki:Mecanique.js');
importScript('Mediawiki:Franceinfo.js');
importScript('Mediawiki:Guide.js');
importScript('Mediawiki:Divinity.js')