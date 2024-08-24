/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 2, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* SoundManager2Button Skript �bernommen aus http://de.leagueoflegends.wikia.com/wiki/MediaWiki:Common.js */
/* Siehe auch http://de.borderlands.wikia.com/wiki/MediaWiki:Sm2.js */

importScriptPage('ShowHide/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Sm2.js", //Extension:SoundManager2Button
    ]
});