importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag associé }
		'Inactif depuis + de 1 mois': { u:'Inactif depuis + de 1 mois', link: 'Inactif' },
		'Assistant': { u:'Assistant' },
		'Créateur': { u:'Créateur', link: 'Plus de 50 modifications.' },
		'Informateur': { u:'Informateur', link: 'informe des évènements du Wiki' }

	}
};


UserTagsJS.modules.custom = {
	'LeModificateurDePages': ['Inactif depuis + de 1 mois'], // ajoute "Inactif depuis + de 1 mois" 
	'Utilisateur2': ['css'], // Add Codeur CSS
	'Utilisateur3': ['modele', 'css'], // Ajoute modèle+css
	'Utilisateur4': ['inactive'] // Toujours indiqué comme inactif, même s'il modifie.
};