/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

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

/* Auto-refreshing recent changes */
ajaxPages = ["Spezial:WikiActivity","Spezial:Letzte_�nderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beitr�ge"];
AjaxRCRefreshText = 'Aktualisierung';
AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch';
importScriptPage('AjaxRC/code.js', 'dev');