window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag associé }
		holper: { u:'Titulaire' },
		playerframework: { u:'Joueur Cadre', f:'Joueuse Cadre' }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Président' },
		sysop: { u:'Entraîneur' },
		rollback: { u:'Capitaine' },
		'content-moderator': { u:'Patrouilleur' },
		threadmoderator: { u:'Modérateur' },
		inactive: { u: 'En prêt' }
	}
};
UserTagsJS.modules.inactive = 28; // 28 jours
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importScriptPage('SpoilerAlert/code.js', 'dev');
SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations dévoilant l\'intrigue d\'un joueur). Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui, Bien sûr',
    no: 'Non',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');