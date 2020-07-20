if (document.getElementById('WikiaRail')) {
 (function() {
  var prc = document.createElement('section');
  prc.className = 'module';
  var prc_ttl = document.createElement('h2');
  prc_ttl.textContent = 'Sintonízanos en Facebook';
  prc.appendChild(prc_ttl);
  var prc_ifm = document.createElement('iframe');
  prc_ifm.src = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FWikiRadios&tabs&width=268&height=230&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true';
  prc_ifm.width = 268;
  prc_ifm.height = 230;
  prc_ifm.scrolling = 'no';
  prc.appendChild(prc_ifm);
  document.getElementById('WikiaRail').appendChild(prc);
 })();
}


if (wgPageName === 'Wiki_Prueba:Portada') {} else {
 $('#WikiaFooter.WikiaFooter').prepend('<div id="WR-WDrft"><h2>Sintonízanos en las redes</h2><ul><li><a href="//www.facebook.com/WikiRadios" target="_blank" class="WR-WDicn"></a></li><li><a href="//www.twitter.com/WikiRadios" target="_blank" class="WR-WDicn"></a></li><li><a href="//www.youtube.com/WikiRadios" target="_blank" class="WR-WDicn"></a></li></ul></div>')
}

/* Publicidad interna como fondo 
$('body').prepend('<a href="//twitter.com/intent/user?screen_name=WikIRadios" target="_blank" class="publifondo"></a>');*/