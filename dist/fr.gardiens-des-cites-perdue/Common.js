/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/** Customisation **/

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Mentor', m: 'Mentor', f:'Mentor', link: 'Aide:Rollback' },
		codeur: { u: 'Codeur Général', m: 'Codeur Général', f: 'Codeuse Générale' },
		ambassador: { u: 'Ambassadeur', m: 'Ambassadeur', f: 'Ambassadrice', order: 1 },
		wikicode: { u: 'Brigadier Wikicode', m: 'Brigadier Wikicode', f: 'Brigadière Wikicode' }
	}
};

UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'codeur', 'ambassador', 'util', 'voldev', 'helper', 'wikicode'];

UserTagsJS.modules.custom = {
	    'Julesandherbooks': ['ambassador', 'wikicode'],
	    'Teteban41' : ['wikicode'],
	    'Gwen67' : ['wikicode'],
	    'Lucie_l%27Hydrokinésiste' : ['wikicode'],
	    'Maman Paillette 25' : ['wikicode'],
	    'Soronos' : ['wikicode'],
	    'SophieVacker01' : ['wikicode'],
};

/** Imports **/

/* UserTags */
importArticle({
    type:'script',
    article: ['w:c:dev:UserTags/code.js']
});

/* ExtendedPrivateMessaging */
importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:ExtendedPrivateMessaging/code.js']
});