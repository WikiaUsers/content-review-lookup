/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */


    /* zeigt einen Besucherähler auf jeder Seite diese Wikis */

    document.write ("<div style='position:fixed; right:2px; bottom:2px; display:block; height:20px; width:80px'>");
    document.write ("<a href='http://www.counter-kostenlos.net'><img src='http://www.counter-kostenlos.net/counter.php?id=124887.jpg'></a>");
    document.write ("</div>");

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