/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

//===========================================
//*** http://dev.wikia.com/wiki/ShowHide

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:ShowHide/code.js',
    ]
});

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

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

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