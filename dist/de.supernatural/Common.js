/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */
window.ajaxPages = ["Spezial:Letzte_Änderungen"];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';

// Import [[MediaWiki:Onlyifuploading.js]] 
if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

importScriptPage('MediaWiki:Parallax.js','comunidad');

/* Tags */
window.UserTagsJS = {
        modules: {},
        tags: {
                founder: { u:'Wiki-Gründer', order: 1 },
                bureaucrat: { u:'Mann der Schriften', link:'Hilfe:Bürokraten', order: 2 },
                sysop: { u:'Bobby Singer', link:'Hilfe:Administratoren', order: 3 },
                contentmoderator: { u:'Schicksal', order: 4 },
                rollback: { u:'Chronos', link:'Hilfe:Zurücksetzen', order: 5 },
                chatmoderator: { u:'Prophet', link:'Hilfe:Chat', order: 6},
                user: { u:'Jäger', link:'Spezial:Benutzer', order: 7 },
                inactive: { u:'Inaktiv', order: 8 }
   }
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'chatmoderator', 'contentmoderator', 'user', 'newuser'];

UserTagsJS.modules.inactive = {
	days: 21,
	namespaces: [0, 'Talk', 'User talk', 'Forum']
};

UserTagsJS.modules.metafilter = {
	'user': ['sysop']
};