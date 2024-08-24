/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

//Auto-Reload f�r Aktivit�tsfeed
window.AjaxRCRefreshText = 'Automatisch aktualisieren';
window.AjaxRCRefreshHoverText = 'L�dt alle 60 Sekunden den Aktivit�tsfeed neu';
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');

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