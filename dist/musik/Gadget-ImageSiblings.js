function commonsSiblingsAddScript(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function commonsSiblingsInit () {
  if ( wgNamespaceNumber != 6 ) return ;
  var cd = document.getElementById('commons_descr');
  if ( cd ) { // Commons
    url = "http://toolserver.org/~magnus/file_siblings.php?language=commons&project=wikimedia&sort_by_date=0&sib_cat=1&sib_gal=1&mode=json&file=" + escape ( wgTitle ) ;
    url += "&uselang=" + wgUserLanguage ;
    url += "&message=" + escape ( "Verwandte Bilder auf<br/><a href='http://commons.wikimedia.org'>Wikimedia Commons</a>" ) ;
  } else { // Local
    url = "http://toolserver.org/~magnus/file_siblings.php?language=de&project=wikipedia&sort_by_date=0&sib_cat=1&sib_gal=0&mode=json&file=" + escape ( wgTitle ) ;
    url += "&message=" + escape ( "Verwandte Bilder (lokal)" ) ;
  }
  commonsSiblingsAddScript ( url ) ;
}

function file_siblings_callback ( html ) {
  var file = document.getElementById ( 'file' ) ;
  file.innerHTML = html + file.innerHTML ;
//  jQuery('#file_siblings_table').fadeTo ( 'fast' , 0.5 ) ;
}

addOnloadHook(commonsSiblingsInit);