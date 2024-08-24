/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */


//AjaxRC Settings
var ajaxPages = ["Spezial:Letzte_�nderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beitr�ge","Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';
var AjaxRCRefreshHoverText = 'Automatisch Seite aktualisieren';
var ajaxRefresh = 300000;
 
//Import Scripts
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AjaxRC/code.js', //Auto-Refresh
        'w:c:dev:ReferencePopups/code.js' //Popup references
    ]
});
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