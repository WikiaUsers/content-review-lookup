/* BOTONES EXTRAS */
/******************/
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
     "speedTip": "Insertar plantilla",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};
    }
 if (typeof(mwCustomEditButtons) != 'undefined') {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
     "speedTip": "Aviso de Vandalismo",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Plantilla:Vandalismo"};
    }

  		
/* Agrega un enlace hacia el blog del usuario */	
function UsuarioBlogEnlace() {
$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Mis blogs</a></li>');
  	 	
}
  	 	
addOnloadHook(UsuarioBlogEnlace);