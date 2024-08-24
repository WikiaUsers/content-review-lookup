/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
// Uhrendisplay
 
window.DisplayClockJS = '%2H:%2M:%2S %2d. %B %Y (UTC)';
 
// Import [[MediaWiki:Onlyifuploading.js]] 
 
importArticles({
    type: 'script',
    articles: [
         'w:c:dev:ShowHide/code.js',
         'w:c:dev:DisplayClock/code.js',
    ]
});


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