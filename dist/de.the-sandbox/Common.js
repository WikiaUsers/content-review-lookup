/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

function hideTab() {
  if (typeof TabView !== 'undefined') {
    $('ul.tabs > li > a[href="/wiki/Benutzer:Kangalioo/Spielwiese?action=render"]') .each(function () {
      if (mw.config.get('wgUserName') == 'Kangalioo') {
        return ;
      }
      this.style.display = 'none';
    });
    return ;
  }
  setTimeout('hideTab()', 500);
}

setTimeout('hideTab()', 500);

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
 
importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';
 
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';