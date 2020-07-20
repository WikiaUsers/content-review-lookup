// Zuständig für auf- und zuklappbare Navigationsboxen, siehe auch http://dev.wikia.com/wiki/ShowHide
var ShowHideConfig = { autoCollapse: Infinity, userLang: true }; 
importScriptPage('ShowHide2/code.js', 'dev');

// Ein- und Ausklappbutton auch deutschsprachig
var ShowHideConfig = { 
    de: {
	show: "Auf",
	hide: "Zu",
	showAll: "Alle aufklappen",
	hideAll: "Alle zuklappen"
   }
};

// Lokaler Bilddiskussionsseitenlink eines Commonsbildes verweist nach Commons

if (wgNamespaceNumber === 6) addOnloadHook( function() {
	if (window.keepLocalFileTabs ) return;
	if (document.getElementById( 'ca-history')) return; //Lokale Dateibeschreibung vorhanden?
	if (!getElementsByClassName(document, 'div', 'sharedUploadNotice')[0]) return; //Nur bei Commons-Bildern
 
	var path = wgServer.match(/^https/)
		? 'https://secure.wikimedia.org/wikipedia/commons/wiki/'
		: 'http://commons.wikimedia.org/wiki/';
 
	// Ändere Link auf Diskussionsseite
	// vector uses ca-image_talk
	var talk = document.getElementById('ca-talk') || document.getElementById('ca-image_talk');
	if (talk && talk.className.match(/(^| )new( |$)/)) {
		var link		= talk.getElementsByTagName('a')[0];
		link.href       = path + 'File_talk:' + encodeURIComponent(wgTitle) + '?uselang=de';
		link.className  += ' commonstab';
	}
 
	// Ändere Bearbeiten-Link
	var edit	= document.getElementById('ca-edit') || document.getElementById('ca-viewsource');
	if (edit) { 
		var link		= edit.getElementsByTagName('a')[0];
		link.href       = path + 'File:' + encodeURIComponent(wgTitle) + '?uselang=de&action=edit';
		link.className  += ' commonstab';
		link.firstChild.nodeValue = 'Bearbeiten';
	}
});