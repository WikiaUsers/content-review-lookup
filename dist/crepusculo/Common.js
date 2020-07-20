/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Función para cargar la plantilla información en Descripción de archivo */
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Información\r| atencion= \r| descripción= \r| fuente= \r| autor= \r| retoques= \r| licencia= \r| otras versiones= \r}}"));
 
}
addOnloadHook (preloadUploadDesc)

/*<pre><nowiki>*/

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/64/Botón_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Categoría:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135208/es.starwars/images/3/38/Botón_intercategor%C3%ADa.png",
     "speedTip": "en:Category",
     "tagOpen": "[[en:Category:",
     "tagClose": "]]",
     "sampleText": "Name"};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{Borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Plantilla Información",
     "tagOpen": "{{Información\n|atención=\n|descripción=",
     "tagClose": "\n|fuente=\n|autor=\n|retoques=\n|licencia=\n|otras versiones=\n}}",
     "sampleText": ""};
 
 
 }