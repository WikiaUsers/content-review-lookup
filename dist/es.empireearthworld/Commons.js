/* 
De Inciclopedia.
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]
 
Traida inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder ,
  para que funcione correctamente usando ''class='' en vez de ''id=''.
*/
 
function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};
 
$(UserNameReplace);