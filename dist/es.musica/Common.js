/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Importación del Chat a todas las pieles */
importScriptPage('MediaWiki:Chat.js', 'es.musica');

/* BOTONES EXTRAS */
/******************/
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
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};
 
 
    }