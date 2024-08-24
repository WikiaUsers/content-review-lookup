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

importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';