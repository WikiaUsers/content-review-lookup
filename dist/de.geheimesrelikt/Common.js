/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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
/* zeigt einen Besucherähler auf jeder Seite diese Wikis */
document.write ("<div style='position:fixed; right:2px; bottom:2px; display:block; height:20px; width:80px'>");
document.write <a id="1384612997" href="http://www.counter.de/">counter</a><script type="text/javascript" language="JavaScript" src="http://www.counter-go.de/counter_js.php?account=1384612997"></script><noscript><a href="http://www.counter-go.de/" target="_blank"><img border=0 src="http://www.counter-go.de/counter.php?account=1384612997"/></a></noscript>
);
document.write ("</div>");