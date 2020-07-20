/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* UserTags */
// On définit UserTagsJS pour la suite
window.UserTagsJS = {
	modules: {},
	tags: {}
};
// On utilise des filtres
UserTagsJS.modules.userfilter = {
	'Slifeur': ['founder'] // Retire le groupe « fondateur »
};
// On choisit d'afficher certains groupes systématiquement
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

/* Import de scripts */
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		'u:dev:UserTags/code.js' 
		// ...
	]
});