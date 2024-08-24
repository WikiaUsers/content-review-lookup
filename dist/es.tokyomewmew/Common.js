/*<pre>*/
// BOTONES DE EDICIÓN PERSONALIZADOS
// Esto esta basado en el código original: Wikipedia:Tools/Editing tools
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirijir Articulo",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insertar texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/fairytail/es/images/f/f0/BotonDegradado.png",
     "speedTip": "Insertar Degradado en Tablas",
     "tagOpen": " background:-moz-linear-gradient(top, COLOR ARRIBA 0%, COLOR ABAJO 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,COLOR ARRIBA), color-stop(100%,COLOR ABAJO)); ",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/fairytail/es/images/0/0d/Box-shadow.png",
     "speedTip": "Insertar Sombra en Tablas",
     "tagOpen": "-moz-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA; -webkit-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA;",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/fairytail/es/images/d/d3/En_construccion.png",
     "speedTip": "Advertir de que este articulo esta en contrucción",
     "tagOpen": "{{Enobras|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Texto Tachado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto a tachar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Subrayar",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Texto a Subrayar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
     "speedTip": "texto Grande",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Texto Grande"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
     "speedTip": "Texto Pequeño",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Texto Pequeño"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla de Personaje",
     "tagOpen": "{{Personaje",
     "tagClose": "\r|Nombre = \r|Imagen = \r|Comentario = \r|Imagenmanga = \r|Imagenanime = \r|Debutmanga = \r|Debutanime = \r|Nacimiento = \r|Genero = \r|Edad = \r|Altura = \r|Peso = \r|Ocupacion = \r|Afiliacion = \r|Familia = \r|Animal = \r}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla de Capítulo",
     "tagOpen": "{{Capítulo",
     "tagClose": "\r|Capitulo = \r|Imagen = \r|Anterior = \r|Siguiente = \r|Volumen = \r|Personajes = \r}}",
     "sampleText": ""};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla de Episodio",
     "tagOpen": "{{Episodio",
     "tagClose": "\r|Episodio = \r|Imagen = \r|Anterior = \r|Siguiente = \r|Kanji = \r|Romaji = \r|Castellano = \r|Latino = \r|Personajes = \r}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images4.wikia.nocookie.net/fairytail/es/images/3/31/Mensaje_oculto.png",
     "speedTip": "Insertar Comentario Oculto",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comentario"};

// </source>
 
/* switch.js */
importScript('MediaWiki:Common.js/Switch.js');
/*</pre>*/