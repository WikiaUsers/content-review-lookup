/* Añadir botones extra de edición */
if (mwCustomEditButtons) {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};
 
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje",
     "tagOpen": "{{Infobox Personaje|Nombre    = \n|Imagen      = \n|Anonimo   =",
     "tagClose": " \n|Kanji      = \n|Rōmaji    = \n|Sobrenombre = \n||Debutmanga = \n|Debutanime \n|Debutova = \n|Españollatino = \n|Españolespaña = \n|Seiyū = \n|Ingles = \n|Nacimiento = \n|Genero = \n|Edad = \n|Estado = \n|Altura = \n|Peso = \n|Sangre = \n|Ocupación = \n|Afiliación= \n|Compañeros = \n|Base de Operaciones = \n|Color de Cabello = \n|Color de Ojos = \n|Familia = \n|Habilidades = \n|Armas = \n|Temas = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[Usuario:",
     "tagClose": "|]]",
     "sampleText": "Nombre"};
 
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
     "imageFile" : "https://images.wikia.nocookie.net/__cb20110910164523/central/images/3/31/HighlightButton.png",
     "speedTip"  : "Texto en rojo",
     "tagOpen"   : "<span style='color:Darkred'>",
     "tagClose"  : "</span>",
     "sampleText": ""};
 
 }