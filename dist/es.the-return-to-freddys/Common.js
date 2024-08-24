/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
window.AjaxRCRefreshText = 'Act. automát';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';

//Import Articles
importArticles({
	type: "script",
	articles: [
		'MediaWiki:Common.js/B3.js',
		'MediaWiki:Common.js/displayTimer.js',
		'MediaWiki:Common.js/Emote.js',
		'MediaWiki:Common.js/MainPageUpload.js',
		'MediaWiki:Common.js/plok.js',
		'MediaWiki:Common.js/Username.js',
		'MediaWiki:Common.js/Usertags.js',
		'MediaWiki:Common.js/summaries.js',

        'u:dev:AjaxRC/code.js',
		'u:dev:BackToTopButton/code.js',
		'u:dev:Countdown/code.js',
        'u:dev:DisplayClock/code.js',
		'u:dev:DynamicImages/code.js',
		'u:dev:SearchSuggest/code.js',
		'u:dev:TimedSlider/code.js',
		'u:dev:WallGreetingButton/code.js',
 
		'u:monchbox:MediaWiki:Torus.js',
	]
});