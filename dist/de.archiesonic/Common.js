/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

SpoilerAlert = {
   'class': "Spoiler",
    question: 'Diese Seite enthält Spoiler. Möchten Sie sie trotzdem ansehen?',
    yes: 'Na klar!',
    no: 'Nein, noch nicht.'
};
 
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
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ShowHide/code.js",
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});