importScript('MediaWiki:Common.js/HerramientasUtiles.js');
importScript('MediaWiki:Common.js/Expansibles.js');
 
/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
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