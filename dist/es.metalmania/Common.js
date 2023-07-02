/*<pre><nowiki>*/
$(document).ready(function()
{
	// Restores normal upload form since the popup one ignores source and license policy. Adapted from http://es.pokemon.wikia.com/wiki/MediaWiki:Wikia.js.
    if (window.UploadPhotos && window.UploadPhotos.showDialog)
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});
/*</nowiki></pre>*/

/* Función para cargar la plantilla información en Descripción de archivo */
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Información\r| atencion= \r| descripcion= \r| fuente= \r| autor= \r| retoques= \r| licencia= \r| otras versiones= \r}}"));
 
}
addOnloadHook (preloadUploadDesc)