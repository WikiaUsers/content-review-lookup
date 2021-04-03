/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importArticles({
	type: 'script',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
}, {
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

/* CustomEditButtons */
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
	    cogito: { u:'Spécialiste de Cogito', m:'Spécialiste de Cogito', f:'Spécialiste de Cogito', link:'Cogito' },
		lecasjackspark: { u:'Spécialiste du cas Jack Spark', m:'Spécialiste du cas Jack Spark', f:'Spécialiste du cas Jack Spark', link:'Le_cas_Jack_Spark' },
		phobos: { u:'Spécialiste de Phobos', m:'Spécialiste de Phobos', f:'Spécialiste de Phobos', link:'Phobos_(série)' },
		animale: { u:'Spécialiste d\'Animale', m:'Spécialiste d\'Animale', f:'Spécialiste d\'Animale', link:'Animale' },
		dessin: { u: 'Dessinateur', m:'Dessinateur', f:'Dessinatrice'},
		fusion: { u: 'Enquêteur d\'Animale', m:'Enquêteur d\'Animale', f:'Enquêtrice d\'Animale', link:'Blog_utilisateur:Ctx54/FUSION'},
		sysop: { u:'Administrateur', m:'Administrateur', f:'Administratrice' },
		'content-moderator': { u:'Modérateur de contenu', m:'Modérateur de contenu', f:'Modératrice de contenu'},
		chatmoderator: { u:'Modérateur du tchat', h:'Modérateur du tchat', f:'Modératrice du tchat'},
		threadmoderator: { u:'Modérateur de discussions', h:'Modérateur de discussions', f:'Modératrice de discussions'},
		inactive: { u:'Inactif', m:'Incatif', f:'Inactive' }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback', 'bot', 'chatmoderator', 'founder', 'threadmoderator'];
UserTagsJS.modules.custom = {
	'Atlantica Luna' : ['animale','fusion'],
	'Ctx54': ['lecasjackspark', 'phobos', 'animale', 'cogito', 'fusion'],
	'Léorcus': ['phobos', 'animale', 'fusion'],
	'Missphenix' : ['fusion'],
	'Psykokwhat' : ['dessin']
};
UserTagsJS.modules.inactive = {
	days: 30, // 30 jours
	namespaces: [0], // Modifications uniquement dans l'espace de noms principal
	zeroIsInactive: true // 0 modifications est considéré comme inactif
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']],
	'content-moderator': ['sysop'],
	'threadmoderator': ['sysop']
};
UserTagsJS.modules.stopblocked = false;

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});