/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// WikiActivity & RecentChanges
AjaxRCRefreshText = 'Actualizaci�n Autom�tica';
AjaxRCRefreshHoverText = 'Refrescar la p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Etiqueta de Inactivo
InactiveUsers = { texto: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');

// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde est� "<span class="insertusername"></span>"
// o la [[Plantilla:NOMBREUSUARIO]]
// Tra�da inicialmente de Uncyclopedia y corregida por 
// uncyclopedia:es:user:Ciencia Al Poder ,
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// **************************************************
 
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
    type: "script",
    articles: [
        // 1. Mostrar im�genes duplicadas
        "MediaWiki:Common.js/DupImageList.js",
        // 2. Res�menes de edici�n
        "MediaWiki:Common.js/resumenedicion.js"
    ]
});