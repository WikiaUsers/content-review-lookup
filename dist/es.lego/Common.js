/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* Importaci�n del Chat a todas las pieles */
importScriptPage('MediaWiki:Chat.js', 'es.lego');

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

/* BOTONES EXTRAS */
/******************/
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/lego/es/images/7/77/Bot%C3%B3n_Expandir.png",
     "speedTip": "Expandir este art�culo",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Expandir"};
    }