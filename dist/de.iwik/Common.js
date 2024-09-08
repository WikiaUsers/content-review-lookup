/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		iwik: { u:'Iwik' },
		techpro: { u:'Technik-Profi'},
		sysop: { m:'Administrator',f:'Administratorin'},
		chatmod: { m:'Chat-Moderator',f:'Chat-Moderatorin'},
		bureaucrat: { m:'Bürokrat', f:'Bürokratin' },
		threadmod: { m:'Threadmoderator', f:'Threadmoderatorin'},
		editor_month: { m:'Bearbeiter des Monats', f:'Bearbeiterin des Monats'},
		iwik_month: { u:'Iwik des Monats'}
	}
};

UserTagsJS.modules.custom = {
	'Trollocool': ['techpro',],
	'Roterhund07': ['techpro'],
	'Grünfell':['iwik_month']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* */
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