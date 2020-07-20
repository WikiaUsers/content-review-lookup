/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

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

/* SoundManager2Button Skript übernommen aus http://de.leagueoflegends.wikia.com/wiki/MediaWiki:Common.js */
/* Siehe auch http://de.borderlands.wikia.com/wiki/MediaWiki:Sm2.js */

importScriptPage('ShowHide/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Sm2.js", //Extension:SoundManager2Button
    ]
});