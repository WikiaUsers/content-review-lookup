$(function() {
  if(mw.config.get('wgNamespaceNumber') === 0) {
     if(mw.config.get('wgIsMainPage')) {
         return;
     }
    $('.WikiaPageHeader h1').after('<a href="/wiki/Galeria:' + mw.config.get('wgPageName') + '"><img src="http://i.imgur.com/4t0h6VD.png" title="Odwiedź galerię artykułu ' + mw.config.get('wgTitle') + '" /></a>');
 } else {
     if(mw.config.get('wgNamespaceNumber') == 112) {
        $('.WikiaPageHeader h1').html('<strong>Galeria:</strong>' + mw.config.get('wgTitle')).after('<h2><a href="/wiki/' + mw.config.get('wgPageName').replace('Galeria:','') + '">Powrót do artykułu</a></h2>');
     }
 }
});