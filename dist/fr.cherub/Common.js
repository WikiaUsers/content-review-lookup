/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NullEditButton/code.js',
    ]
});

/* SpoilerAlert */
window.SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'une œuvre). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    fadeDelay: 1600
};

if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirection",
		"tagOpen": "#REDIRECT [" + "[",
		"tagClose": "]]",
		"sampleText": "Insérer le texte"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
		"speedTip": "Barré",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Texte barré"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
		"speedTip": "Retour à la ligne",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
		"speedTip": "Commentaire visible uniquement aux contributeurs",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insérer ici le commentaire"
	};
}

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
	    tshirtNoir: { u:'T-Shirt Noir', link:'Wiki CHERUB:Rôles#T-Shirt Noir' },
	    bureaucrat: { u:'Directeur', link:'Wiki CHERUB:Rôles#Directeur' },
	    sysop: { u:'Contrôleur de missions', link:'Wiki CHERUB:Rôles#Contr.C3.B4leur_de_missions' },
		'content-moderator': { u:'Instructeur (contenu)', link:'Wiki CHERUB:Rôles#Instructeur_.28contenu.29' },
		chatmoderator: { u:'Instructeur (tchat)', link:'Wiki CHERUB:Rôles#Instructeur_.28tchat.29' },
		threadmoderator: { u:'Instructeur (discussion)', link:'Wiki CHERUB:Rôles#Instructeur_.28discussion.29' },
		autoconfirmed: { u:'T-Shirt Bleu marine', link:'Wiki CHERUB:Rôles#T-Shirt Bleu marine' },
		notautoconfirmed: { u:'T-Shirt Gris', link:'Wiki CHERUB:Rôles#T-Shirt Gris' },
		newuser: { u:'T-Shirt Rouge', link:'Wiki CHERUB:Rôles#T-Shirt Rouge' },
		inactive: { u:'Agent à la retraite', link:'Wiki CHERUB:Rôles#Agent_.C3.A0_la_retraite' },
		nonuser: { u:'T-Shirt Orange', link:'Wiki CHERUB:Rôles#T-Shirt Orange' },
		blocked: { u:'Bloqué(e)', link:'Wiki CHERUB:Rôles#Bloqu.C3.A9.28e.29' }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'rollback', 'chatmoderator', 'founder', 'threadmoderator', 'notautoconfirmed', 'autoconfirmed'];
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'autoconfirmed': ['syspop', 'bureaucrat', 'content-moderator', 'chatmoderator', 'threadmoderator', 'newuser', 'tshirtNoir', 'nonuser'],
	'notautoconfirmed': ['newuser', 'nonuser'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']],
	'content-moderator': ['sysop'],
	'threadmoderator': ['sysop'],
	'tshirtNoir': ['threadmoderator', 'content-moderator', 'chatmoderator', 'notautoconfirmed', 'newuser', 'nonuser', 'bureaucrat', 'syspop', 'blocked'],
	'nonuser': ['blocked']
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 20, // And have at least 20 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.custom = {
	'Ctx54' : ['tshirtNoir'],
	'~Revelium~' : ['tshirtNoir'], //ne fonctionne pas
	'Aster09' : ['tshirtNoir'],
	'Baba OM' : ['tshirtNoir'],
	'Nidoran1212': ['tshirtNoir']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});