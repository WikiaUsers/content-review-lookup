/* Importación del Chat a todas las pieles */
importScriptPage('MediaWiki:Chat.js', 'es.seriesspain');

/* Para desplegable */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');

importScript('MediaWiki:Common.js/desplegable.js');

/* Botones extras */
/*botón de personaje por [[User:Danke7|Danke7]]*/
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuario"};


    }

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirigir",
		"tagOpen": "#REDIRECCIÓN [[",
		"tagClose": "]]",
		"sampleText": "Nombre del artículo"
	};

if (typeof(mwCustomEditButtons) != 'undefined') {

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/seriesspain/es/images/6/6d/Bot%C3%B3n_personaje.png",
     "speedTip": "Insertar Plantilla de Personaje",
     "tagOpen": "\{\{Personaje\r| nombre = ",
     "tagClose": "\r| imagen = \r| sexo = \r| serie = \r| frase = \r| ocupación = \r| familia = \r| primera aparición = \r\}\}",
     "sampleText": ""};
 }

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
     "speedTip": "Obtenido de Wikipedia",
     "tagOpen": "\{\{Wikipedia|",
     "tagClose": "\}\}",
     "sampleText": ""};

/* NOMBREUSUARIO */

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);