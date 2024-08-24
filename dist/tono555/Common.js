/* Any JavaScript here will be loaded for all users on every page load. */
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
importScript('MediaWiki:Common.js/profileRedesign.js');

if (mwCustomEditButtons) {
// <nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/c/c8/Button_comment_round.png",
		"speedTip": "Insertar plantilla de cita",
		"tagOpen": "{{Cita|<nacionalidad>|<cita>|<vocero> <cuando>}} ",
		"tagClose": "",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar plantilla de personaje",
     "tagOpen": "{{Personaje infobox\n| nación        = ",
     "tagClose": "\n| image         = \n| nombre        = \n| etnia        = \n| nacionalidad  = \n| edad          = \n| género        = \n| cabello       = \n| aliados       = \n| enemigos      = \n| arma          = \n| estilodepelea = \n| profesión     = \n| posición      = \n| afiliación    = \n| aparición     = \n| últimaapar    = \n| voz           = \n}}",
     "sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "A favor",
		"tagOpen": "{{Afavor}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "En contra",
		"tagOpen": "{{Encontra}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insertar Plantilla:Imagebox",
		"tagOpen": "\{\{Imagebox\r| descripción = ",
		"tagClose": "\r| película    = \r| series      = \r| temporada   = \r| episodio    = \r| fuente      = \r| origen      = \r| cats        = \r| licencia    = \r\}\}",
		"sampleText": ""};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
		"speedTip": "Proponer que el artículo sea borrado",
		"tagOpen": "{{Borrar|Motivo}} ",
		"tagClose": "",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
		"speedTip": "Insertar aviso de en construcción",
		"tagOpen": "{{Construyendo|Usuario}} ",
		"tagClose": "",
		"sampleText": ""};
// </nowiki>
}

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');