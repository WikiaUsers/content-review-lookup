/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// </source>
 
/*****************/
/* NOMBREUSUARIO */
/*****************/
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') {
	$(function() {
		importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
	});
}