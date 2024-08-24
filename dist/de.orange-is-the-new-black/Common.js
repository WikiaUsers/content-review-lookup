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

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light",
	buttonSize: "25px",
	wikiTwitterAccount: "wikia_de"
};
importScriptPage('SocialIcons/code.js','dev');