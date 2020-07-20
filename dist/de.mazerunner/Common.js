/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
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


/* Variablen für das Skript AjaxRC (http://dev.wikia.com/wiki/AjaxRC) */
window.ajaxPages = ["Spezial:Letzte_Änderungen","Spezial:Logbuch","Spezial:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';


/* Skript-Import */
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:Countdown/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:MediaWiki:FixWantedFiles/code.js',
        'u:dev:MediaWiki:ShowHide/code.js'
    ]
});