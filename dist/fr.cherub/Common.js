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

/* Inversion des couleurs des elements grace au modele [[Modèle:InversionTheme]] */
var root = document.querySelector(':root');
var tabImages;
if (getComputedStyle(root).getPropertyValue('--theme-page-background-color') == '#ffffff') {
	tabImages = Array.from(document.getElementsByClassName('inversionClair'));
} else {
	tabImages = Array.from(document.getElementsByClassName('inversionSombre'));
}
console.log(tabImages);
for (var i = 0; i<tabImages.length; i++) {
	tabImages[i].style.filter = 'invert(100%)';
}

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
	    bureaucrat: { u:'Directeur', link:'Wiki CHERUB:Rôles#Directeur', order:1 },
	    sysop: { u:'Contrôleur de missions', link:'Wiki CHERUB:Rôles#Contr.C3.B4leur_de_missions', order:2 },
		'content-moderator': { u:'Instructeur (contenu)', link:'Wiki CHERUB:Rôles#Instructeur_.28contenu.29', order:3 },
		threadmoderator: { u:'Instructeur (discussion)', link:'Wiki CHERUB:Rôles#Instructeur_.28discussion.29', order:4 },
	    tshirtNoir: { u:'T-Shirt Noir', link:'Wiki CHERUB:Rôles#T-Shirt Noir', order:5 },
		autoconfirmed: { u:'T-Shirt Bleu marine', link:'Wiki CHERUB:Rôles#T-Shirt Bleu marine', order:6 },
		notautoconfirmed: { u:'T-Shirt Gris', link:'Wiki CHERUB:Rôles#T-Shirt Gris', order:7 },
		newuser: { u:'T-Shirt Rouge', link:'Wiki CHERUB:Rôles#T-Shirt Rouge', order:8 },
		inactive: { u:'Agent à la retraite', link:'Wiki CHERUB:Rôles#Agent_.C3.A0_la_retraite', order:10 },
		nonuser: { u:'T-Shirt Orange', link:'Wiki CHERUB:Rôles#T-Shirt Orange', order:9 },
		blocked: { u:'Bloqué(e)', link:'Wiki CHERUB:Rôles#Bloqu.C3.A9.28e.29', order:1/0 }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'rollback', 'founder', 'threadmoderator', 'notautoconfirmed', 'autoconfirmed'];
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'autoconfirmed': ['syspop', 'bureaucrat', 'content-moderator', 'threadmoderator', 'newuser', 'tshirtNoir', 'nonuser'],
	'notautoconfirmed': ['newuser', 'nonuser'],
	'content-moderator': ['sysop'],
	'threadmoderator': ['sysop'],
	'tshirtNoir': ['threadmoderator', 'content-moderator', 'notautoconfirmed', 'newuser', 'nonuser', 'bureaucrat', 'syspop', 'blocked'],
	'nonuser': ['blocked'],
	'newuser': ['threadmoderator', 'content-moderator','bureaucrat', 'syspop','tshirtNoir']
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 16, // And have at least 16 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.custom = {
	'Ctx54' : ['tshirtNoir'],
	'~Revelium~' : ['tshirtNoir'],
	'Aster09' : ['tshirtNoir'],
	'Baba OM' : ['tshirtNoir'],
	'Nidoran1212': ['tshirtNoir'],
	'Esoulard': ['tshirtNoir']
};