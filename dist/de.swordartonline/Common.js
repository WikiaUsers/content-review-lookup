/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

//AjaxRC Settings
var ajaxPages = ["Spezial:Letzte_Änderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beiträge","Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';
var AjaxRCRefreshHoverText = 'Automatisch Seite aktualisieren';
var ajaxRefresh = 300000;
 
//Import Scripts
// moved to MediaWiki:ImportJS
//End Script Import

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
window.railWAM = {
    logPage:"Project:WAM Log"
};