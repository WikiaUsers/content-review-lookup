/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/*
    Affiche plusieurs titres sur les pages utilisateur.
*/
 window.UserTagsJS = {
        modules: {},
        tags: {
		c: { u: 'Designer', order:1 },
		d: { u: 'Actif', order:2 },
		e: { u: 'Inactif', order:3 },
                bureaucrat: { u: 'Alpha'},
                sysop: { u: 'Lycanthrope'}
	},
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot'];
 
UserTagsJS.modules.custom = {
	'AlphaAshura': ['c', 'e'],
	'Neyiox': ['c', 'e'],
	'Jabberwacky': ['e'],
	'Ozann23': ['d'],
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});