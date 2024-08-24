/* Common.js <pre>
Cualquier JavaScript que esté aquí será cargado para todos los usuarios en todas las páginas cargadas del wiki. */


/* Show/Hide Config */
var ShowHideConfig = { 
    brackets: '[]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]
/* Fin */


/* [[Plantilla:Nombreusuario]] */
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "InsertUserName");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
} 
addOnloadHook(UserNameReplace);
/* Fin */


/* Substitute Template:Information into upload page */
$(document).ready(function() {
	if (wgPageName != 'Special:Upload') {
		return;
	}
});
/* Fin */


// ==============================
// Botones de edición
// ==============================

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Tabla",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! encabezado 1\n! encabezado 2\n! encabezado 3\n|-\n| fila 1, celda 1\n| fila 1, celda 2\n| fila 1, celda 3\n|-\n| fila 2, celda 1\n| fila 2, celda 2\n| fila 2, celda 3"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Botón_plantilla.png",
     "speedTip": "Plantilla",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirigir",
     "tagOpen": "#REDIRECCIÓN [[",
     "tagClose": "]]",
     "sampleText": "Nombre del artículo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Usuario",
     "tagOpen": "[[Usuario:",
     "tagClose": "|]]",
     "sampleText": "Nombre"};
     
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/looneytunes/es/images/5/5c/Button_LT.png",
     "speedTip": "LT",
     "tagOpen": "''[[Looney Tunes]]''"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/looneytunes/es/images/2/2e/Button_MM.png",
     "speedTip": "MM",
     "tagOpen": "''[[Merrie Melodies]]''"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/looneytunes/es/images/9/98/Button_WBChar.png",
     "speedTip": "Plantilla de Personaje",
     "tagOpen": "\{\{WBPersonaje\n|nombre		= ",
     "tagClose": "\n|imagen		= \n|texto imagen	= \n|especie	= \n|genero		= \n|alias		= \n|familiares	= \n|mascotas	= \n|origen		= \n|poder		= \n|amigos		= \n|rivales	= \n|frases		= \n|debut		= \n|creado por	= \n|voz		= \n\}\}"};
}

// ==================================================
//  Fin - Botones de edición
// ==================================================