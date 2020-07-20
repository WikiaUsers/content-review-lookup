/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar infobox de personaje",
     "tagOpen": "{{Personaje\n|Nombre     = ",
     "tagClose": "\n|Imagen     = \n|Kanji      = \n|Romaji     = \n|Debutmanga = \n|Debutanime = \n|Seiyu      = \n|Nacimiento = \n|Edad       = \n|Género	    = \n|Estado	    = \n|Sangre     = \n|Altura	    = \n|Peso	    = \n|Origen	    = \n|Afiliación = \n|Familia    = \n|Tipo de Cirugía = \n|Insertado con	 = \n|Ranking         = \n}}",
     "sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
     "speedTip": "Insertar infobox de capítulo",
     "tagOpen": "{{Capítulo\n|Nombre= ",
     "tagClose": "\n|Imagen= \n|Kanji= \n|Romaji= \n|Ingles= \n|Volumen= \n|Capítulo= \n|Fecha= \n|Anime= \n|Anterior= \n|Siguiente= \n}}",
     "sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Insertar infobox de episodio",
     "tagOpen": "{{Episodio\n|Nombre    = ",
     "tagClose": "\n|Imagen    = \n|Kanji     = \n|Romaji    = \n|Ingles    = \n|Episodio  = \n|Manga     = \n|Japón     = \n|Anterior  = \n|Siguiente = \n}}",
     "sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
		"speedTip": "Proponer que el artículo sea borrado",
		"tagOpen": "{{Borrar",
		"tagClose": "}}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
		"speedTip": "Insertar aviso de Esbozo",
		"tagOpen": "{{Esbozo",
		"tagClose": "}}",
                "sampleText": ""};
}

/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');