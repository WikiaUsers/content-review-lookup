/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importArticles({
    type: "script",
    articles: ["MediaWiki:Statistik/code.js",
        "w:c:dev:DisplayClock/code.js",     // Cache Purge Clock
        "w:c:dev:RevealAnonIP/code.js",     // Reveal Anon IPs
        "w:c:dev:SignatureCheck/code.js"    // Beitrag unterschrieben?
 
      /* commented out to leave an example how to include external scripts
        "w:c:dev:MediaWiki:External_include.js"
       */
    ]
});

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