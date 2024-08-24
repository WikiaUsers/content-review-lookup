/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* A�adir botones extra de edici�n */
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar infobox de personaje",
     "tagOpen": "{{Personaje\n|Nombre     = ",
     "tagClose": "\n|Imagen     = \n|Kanji      = \n|Romaji     = \n|Debutmanga = \n|Debutanime = \n|Seiyu      = \n|Nacimiento = \n|Edad       = \n|G�nero	    = \n|Estado	    = \n|Sangre     = \n|Altura	    = \n|Peso	    = \n|Origen	    = \n|Afiliaci�n = \n|Familia    = \n|Tipo de Cirug�a = \n|Insertado con	 = \n|Ranking         = \n}}",
     "sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
     "speedTip": "Insertar infobox de cap�tulo",
     "tagOpen": "{{Cap�tulo\n|Nombre= ",
     "tagClose": "\n|Imagen= \n|Kanji= \n|Romaji= \n|Ingles= \n|Volumen= \n|Cap�tulo= \n|Fecha= \n|Anime= \n|Anterior= \n|Siguiente= \n}}",
     "sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Insertar infobox de episodio",
     "tagOpen": "{{Episodio\n|Nombre    = ",
     "tagClose": "\n|Imagen    = \n|Kanji     = \n|Romaji    = \n|Ingles    = \n|Episodio  = \n|Manga     = \n|Jap�n     = \n|Anterior  = \n|Siguiente = \n}}",
     "sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
		"speedTip": "Proponer que el art�culo sea borrado",
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

/*** A�adir bot�n para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');