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

/* Importiert Skript f�r einen Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});