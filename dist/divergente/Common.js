/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* Countdown Timer */
importScriptPage('Countdown/code.js', 'dev');

/* Funci�n para cargar la plantilla informaci�n en Descripci�n de archivo */
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Informaci�n\r| atencion= \r| descripci�n= \r| fuente= \r| autor= \r| retoques= \r| licencia= \r| otras versiones= \r}}"));
 
}
addOnloadHook (preloadUploadDesc)

/*<pre><nowiki>*/

/* A�adir botones extra de edici�n */
if (mwCustomEditButtons) {

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/64/Bot�n_categor%C3%ADa.png",
     "speedTip": "Categor�a",
     "tagOpen": "[[Categor�a:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categor�a"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135208/es.starwars/images/3/38/Bot�n_intercategor%C3%ADa.png",
     "speedTip": "en:Category",
     "tagOpen": "[[en:Category:",
     "tagClose": "]]",
     "sampleText": "Name"};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Proponer el art�culo para ser borrado",
     "tagOpen": "\{\{Borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Plantilla Informaci�n",
     "tagOpen": "{{Informaci�n\n|atenci�n=\n|descripci�n=",
     "tagClose": "\n|fuente=\n|autor=\n|retoques=\n|licencia=\n|otras versiones=\n}}",
     "sampleText": ""};
 
 
 }