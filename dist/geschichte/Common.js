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
addOnloadHook(function () {
   addPortletLink ('p-cactions', 'http://de.wikipedia.org/wiki/' + wgPageName, 'WP');
   addPortletLink ('p-cactions', 'http://marjorie-wiki.org/wiki/' + wgPageName, 'MA');
   addPortletLink ('p-cactions', 'http://de.uniform.wikia.com/wiki/' + wgPageName, 'UW');
   addPortletLink ('p-cactions', 'http://de.bladeandarmour.wikia.com/wiki/' + wgPageName, 'WW');
});