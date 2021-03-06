/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// WikiActivity & RecentChanges
AjaxRCRefreshText = 'Actualización Automática';
AjaxRCRefreshHoverText = 'Refrescar la página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:NOMBREUSUARIO]]
// Traída inicialmente de Uncyclopedia y corregida por 
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
 
/* Usuarios Inactivos - idea de Sam Wang y dev.wikia.com */
InactiveUsers = {
    months: 1,
    gone: ['Ivan Uchiha', 'Leodix', 'Waxo159'],
    text: 'Inactivo'
};
importScriptPage('InactiveUsers/code.js', 'dev');