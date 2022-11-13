/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
addOnloadHook( function() {
  var wmaload = document.getElementById("wikiminiatlas-load");
  if ( !wmaload ) return;   //The page has no coordinates.

  if (wgServer == "https://secure.wikimedia.org") {
    var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
  } else {
    var metaBase = "http://meta.wikimedia.org";
  }
  importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")
} );

window.wma_settings = {
 height: 400,
 width: 700
};