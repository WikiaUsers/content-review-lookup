/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//Import Articles
importArticles({
	type: "script",
	articles: [
                "u:dev:DisplayClock/code.js",
		"u:dev:DynamicImages/code.js",
		"MediaWiki:Common.js/Usertags.js",
		"MediaWiki:Common.js/summaries.js",
		"w:c:dev:BackToTopButton/code.js",
		"MediaWiki:Common.js/displayTimer.js",
		"w:dev:WallGreetingButton/code.js",
		"w:c:dev:Countdown/code.js",
		"w:c:dev:TimedSlider/code.js",
		"u:dev:SearchSuggest/code.js",
		"MediaWiki:Common.js/MainPageUpload.js",
		"MediaWiki:Common.js/Username.js",
		"MediaWiki:Common.js/Emote.js",
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/B3.js"
 
	]
});
 
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
window.AjaxRCRefreshText = 'Act. automát';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
importScriptPage('AjaxRC/code.js', 'dev');