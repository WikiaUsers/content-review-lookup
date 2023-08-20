/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */

window.ARKCodeI18n = {
	text: 'Texte',
	visualisation: 'Visualisation',
	decodeText: 'Texte décodé',
	decode: 'Décoder'
};

window.CookingCalcI18n = {
	drink: 'Boisson',
	food: 'Nourriture',
	health: 'Santé',
	ingredient: 'Ingrédients',
	number: 'Quantité',
	results: 'Results',
	speed: 'Compétence de fabrication',
	stamina: 'Énergie',
	values: 'Valeurs',
	water: 'Eau',
	weight: 'Poids'
};

window.CookingStatsI18n = [
	'Poussière d\'élément',
	'Amar/Azul/Tintoberry/Extrait de cactus',
	'Mejoberry',
	'Narcoberry',
	'Stimberry',
	'Légumes',
	'Champignon terreux',
	'Champignon aquatique',
	'Champignon ascorbique',
	'Champignon doré',
	'Champignon rare',
	'Graine',
	'Fleur rare',
	'Miel',
	'Délicieux gâteau aux légumes',
	'Oeuf',
	'Croquette',
	'Savon',
	'Nodule corrompu',
	'Polymère organique',
	'Viande/Poisson cru',
	'Mouton/Viande/Poisson supérieur',
	'Viande/Poisson cuits, viande séchée',
	'Viande/Poisson cuits/Viande séchée supérieure, Mouton cuit',
	'Viande avariée',
	'Excrément humain',
	'Petit excrément',
	'Excrément moyen',
	'Excrément Gros/Immense',
	'Pelote de réjection'
];

window.CopyClipboardI18n = {
	title: 'Copier vers le presse-papier',
	success: 'Copié avec succès vers le presse-papier.',
	error: 'Échec de la copie vers le presse-papier. Copiez vous-même.'
};

window.ResourceMapsI18n = {
	toggleAll: 'Tout afficher/masquer',
	toggleCaves: 'Afficher/masquer les grottes',
};

window.SpawnMapsI18n = {
	creatureSpawns: 'Apparition des créatures',
	selectCreature: 'Sélectionnez une créature', // WIP T66: Select a creature or container
	optionGroupCreatures: 'Créatures',
	optionGroupContainers: 'Contenants de groupes',
	dataLoadErrorAnon: 'Échec du chargement des données; esssayez de rafraîchir la page',
	dataLoadErrorSigned: 'Échec du chargement des données de la page - vérifez si elles existent et s\'il existe un JSON valide',
	toggleDetails: ' détails complets des contenants de groupes',
	deselectGroups: 'désélectionnez tous les contenants',
	tooltipFrom: 'depuis',
	tooltipTo: 'vers',
	tooltipLat: 'lat',
	tooltipLong: 'lon',
	tooltipUntameable: 'non apprivoisable',
	tooltipUntameableLocal: 'les créatures de ce lieu ne sont pas apprivoisables',
};

importArticle({
	type: 'script',
	article: 'u:ark:MediaWiki:Common.js'
});