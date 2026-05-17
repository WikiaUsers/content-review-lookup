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
  .then(function() { console.log('D3 OK'); })
  .catch(function() { console.log('D3 BLOQUÉ'); });