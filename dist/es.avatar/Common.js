/* Adds buttons for one-click deletions with delete summary included
 * See w:c:dev:FastDelete for info & attribution 
 */

window.fdButtons = [
	{
		'summary': 'Vandalismo',
		'label': 'V'
	},
	{
		'summary': 'Limpieza',
		'label': 'L'
	}
];


/* Añadir botones extra de edición */
if (window.mwCustomEditButtons) {
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
     "tagOpen": "{{Personaje infobox\n| nación          = ",
     "tagClose": "\n| imagen          = \n| nombre          = \n| nombrealter     = \n| nacionalidad    = \n| etnia           = \n| edad            = \n| nacimiento      = \n| muerte          = \n| reinado         = \n| pred            = \n| suces           = \n| género          = \n| cabello         = \n| ojos            = \n| colordepiel     = \n| interesamoroso  = \n| aliados         = \n| enemigos        = \n| arma            = \n| estilodepelea   = \n| profesión       = \n| posición        = \n| afiliación      = \n| aparición       = \n| últimaapar      = \n| voz original    = \n| voz de doblaje  = \n}}",
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
 
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// Etiqueta Inactivo
window.InactiveUsers = { text: 'Congelado en el Iceberg' };