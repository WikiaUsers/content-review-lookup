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
 
 // anzeigen & verbergen
 function einaus (inhalt, einblenden, ausblenden) {
    var thisLevel  = document.getElementById(inhalt);
    var otherLevel = document.getElementById(einblenden);
    var linkLevel  = document.getElementById(ausblenden);
    if (thisLevel.style.display == 'none') {
        thisLevel.style.display = 'block';
        otherLevel.style.display = 'none';
        linkLevel.style.display = 'inline';
    } else {
        thisLevel.style.display = 'none';
        otherLevel.style.display = 'inline';
        linkLevel.style.display = 'none';
    }
 }

window.UserBadgesJS = {
custom: {
/* Overrap: ['Rollback'],
ShadowTheHedgehog: ['Gründer'] */
}
};

/* Countdownzähler
----------------------------------------------------
*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
        "w:c:dev:AjaxRC/code.js"
    ]
});
/* Auto-Aktualisierung AjaxRC-Variabeln
----------------------------------------------------
*/
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung ohne Neuladen der kompletten Seite';