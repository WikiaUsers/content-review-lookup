window.UserTagsJS = {
		modules: {},
		tags: {
			sysop: { u: 'Professeur' }
}

//=================================================================================================
//
//                                             USERTAGS
//
//=================================================================================================

// Affiche plusieurs titres sur les pages utilisateur.

window.UserTagsJS = {
		modules: {},
		tags: {
			sysop: { u: 'Professeur', link:'Cat�gorie:Administrateur du Wiki Harry Potter' },
			professeur: { m: 'Pr�fet', f: 'Pr�f�te', u: 'Pr�fet' },
			prefetenchef: { m: 'Pr�fet-en-chef', f: 'Pr�f�te-en-chef', u: 'Pr�fet-en-chef', order:1 }
	},
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'prefetenchef', 'util', 'voldev', 'helper'];