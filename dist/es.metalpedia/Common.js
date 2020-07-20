// El siguiente código despliega el pop-up con previsualización al pasar el cursor sobre un link interno.
// Proveniente de [http://en.wikipedia.org/wiki/User:Lupin/popups.js]
importScriptURI("http://en.wikipedia.org/w/index.php?title=User:Lupin/popups.js&action=raw&ctype=text/javascript");


/*
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:Nombreusuario]]

Traida inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder en Inciclopedia,
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

addOnloadHook(UserNameReplace);