/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.RevealAnonIP = { permissions : ['user'] };

window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: 'Es gibt möglicherweise Probleme mit deinem Beitrag:\n\n',
	epilogue: '\nMöchtest Du den Beitrag trotzdem abschicken?',
	noForumheader: '!! Auf dieser Seite ist kein Forumheader. Seiten ohne den Header werden in der Forumliste nicht angezeigt.\n',
	noSignature: '?? Es sieht so aus, als fehlt die Unterschrift unter deinem Beitrag. Benutze bitte <nowiki>~~~~</nowiki> zum Unterschreiben.\n',
 
	// Other stuff
	forumheader: 'Forumheader', // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function
};

// This will refresh your RecentChanges automatically, for maximum stalking ability. http://dev.wikia.com/wiki/AjaxRC
var ajaxRefresh = 30000;
var ajaxPages = ["Special:RecentChanges","Spezial:Letzte_Änderungen"];

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
// Deprecated variable  wgCanonicalSpecialPageName replaced 2022-06-19, WiseWoman

if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" ) {
      importScriptUri("MediaWiki:Onlyifuploading.js?action=raw");
}

// Vroniplag Chat eingebettet ins Wiki:
/* Old version, does not currently work
$(function onloadhookcustom() {
	if ($('#JSChatReplace').length) {
		$('#JSChatReplace').html('<iframe src="http://webchat.freenode.net/?channels=vroniplag" width="660" height="500"></iframe>');
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
});
*/

// New Version for embedding Freenode in the Wiki --> funktionier auch nicht
//----- Freenode
/*
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null !== replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=vroniplag" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
 */
//----- Freenode

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Badges/code.js',
        'MediaWiki:Fragcolors/code.js',     // Farbige Fragmente
        'MediaWiki:Autobarcode/code.js',    // Automatic barcodes
           //  'MediaWiki:Autobarcode_en/code.js', // Automatic barcodes english ... needs further adjustments
        // 'Mediawiki:Timeline/code.js',       // Timeline does not work for more than 50 cases....
        'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',       // Cache Purge Clock
        'u:dev:ShowHide/code.js',           // Add collapsible tables
        'u:dev:SignatureCheck/code.js',     // Beitrag unterschrieben?
        'u:dev:RevealAnonIP/code.js',       // Reveal Anon IPs

      /* commented out to leave an example how to include external scripts
        "w:c:dev:MediaWiki:External_include.js"
       */
    ]
});