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

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

/* Code ab hier importiert von: [[w:c:dev:UserBadges]]*/

window.UserBadgesJS = {
	inactive: 30, 
	gone: {'Doomspeaker':True}, 
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, 
	newusers: true, 
	nonusers: true, 
	custom: {}, 
	names: {
		patroller: 'Patroller',
		rollback: 'Rollback',
		newuser: 'Neuer Nutzer',
		inactive: 'Inaktiv',
		nonuser: 'Keine Bearbeitungen'
	} 
}