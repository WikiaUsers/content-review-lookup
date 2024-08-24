@importScript('MediaWiki:Chat.js');

/* Desplegable */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');

// NOMBREUSUARIO
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);
 
 
/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]
 
Traída de Inciclopedia, inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder, para que funcione correctamente usando ''class='' en vez de ''id=''.
*/
 
function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};
 
addOnloadHook(UserNameReplace);
function addga() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
}
function ocultaNoobs() {
    if (wgUserGroups == null ) 
        $('*[data-id="edit"]').css("display","none");
    else
        $('*[data-id="edit"]').css("display","inline-block");
}
function ocultaNoobs() {
    if (wgUserGroups == null ) 
        $('*[data-id="edit"]').css("display","none");
    else
        $('*[data-id="edit"]').css("display","inline-block");
}