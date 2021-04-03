/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};


 
/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/star-ratings.js",
	]
});