//=================================================================================================
//
//                                             USERTAGS
//
//=================================================================================================

// Affiche plusieurs titres sur les pages utilisateur.

window.UserTagsJS = {
		modules: {},
		tags: {
			/*sysop: { u: 'Professeur', link:'Catégorie:Administrateur du Wiki Harry Potter' },*/
			/*bureaucrat: { u: 'AdminTest', link:'Catégorie:Test' },*/
			bureaucrate: { u: 'test', link:'Catégorie:Test' },
			sysop: { u: 'Admin', link:'Catégorie:Administrateur du Wiki Harry Potter' },
			rollback: { m: 'Préfet', f: 'Préfète', u: 'Préfet' },
			prefetenchef: { m: 'Préfet-en-chef', f: 'Préfète-en-chef', u: 'Préfet-en-chef', order:1 }
	},
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'prefetenchef', 'util', 'voldev', 'helper'];