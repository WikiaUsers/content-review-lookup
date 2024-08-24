/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

//Auto-Reload für Aktivitätsfeed
window.AjaxRCRefreshText = 'Automatisch aktualisieren';
window.AjaxRCRefreshHoverText = 'Lädt alle 60 Sekunden den Aktivitätsfeed neu';
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