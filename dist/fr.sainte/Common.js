window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag associ� }
		holper: { u:'Titulaire' },
		playerframework: { u:'Joueur Cadre', f:'Joueuse Cadre' }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Pr�sident' },
		sysop: { u:'Entra�neur' },
		rollback: { u:'Capitaine' },
		'content-moderator': { u:'Patrouilleur' },
		threadmoderator: { u:'Mod�rateur' },
		inactive: { u: 'En pr�t' }
	}
};
UserTagsJS.modules.inactive = 28; // 28 jours
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importScriptPage('SpoilerAlert/code.js', 'dev');
SpoilerAlert = {
    question: 'Cette page contient des spoilers (informations d�voilant l\'intrigue d\'un joueur). �tes-vous s�r(e) de vouloir la lire ?',
    yes: 'Oui, Bien s�r',
    no: 'Non',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');