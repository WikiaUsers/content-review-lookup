/* Tout JavaScript pr�sent ici sera ex�cut� par tous les utilisateurs � chaque chargement de page. */

window.ARKCodeI18n = {
	text: 'Texte',
	visualisation: 'Visualisation',
	decodeText: 'Texte d�cod�',
	decode: 'D�coder'
};

window.CookingCalcI18n = {
	drink: 'Boisson',
	food: 'Nourriture',
	health: 'Sant�',
	ingredient: 'Ingr�dients',
	number: 'Quantit�',
	results: 'Results',
	speed: 'Comp�tence de fabrication',
	stamina: '�nergie',
	values: 'Valeurs',
	water: 'Eau',
	weight: 'Poids'
};

window.CookingStatsI18n = [
	'Poussi�re d\'�l�ment',
	'Amar/Azul/Tintoberry/Extrait de cactus',
	'Mejoberry',
	'Narcoberry',
	'Stimberry',
	'L�gumes',
	'Champignon terreux',
	'Champignon aquatique',
	'Champignon ascorbique',
	'Champignon dor�',
	'Champignon rare',
	'Graine',
	'Fleur rare',
	'Miel',
	'D�licieux g�teau aux l�gumes',
	'Oeuf',
	'Croquette',
	'Savon',
	'Nodule corrompu',
	'Polym�re organique',
	'Viande/Poisson cru',
	'Mouton/Viande/Poisson sup�rieur',
	'Viande/Poisson cuits, viande s�ch�e',
	'Viande/Poisson cuits/Viande s�ch�e sup�rieure, Mouton cuit',
	'Viande avari�e',
	'Excr�ment humain',
	'Petit excr�ment',
	'Excr�ment moyen',
	'Excr�ment Gros/Immense',
	'Pelote de r�jection'
];

window.CopyClipboardI18n = {
	title: 'Copier vers le presse-papier',
	success: 'Copi� avec succ�s vers le presse-papier.',
	error: '�chec de la copie vers le presse-papier. Copiez vous-m�me.'
};

window.ResourceMapsI18n = {
	toggleAll: 'Tout afficher/masquer',
	toggleCaves: 'Afficher/masquer les grottes',
};

window.SpawnMapsI18n = {
	creatureSpawns: 'Apparition des cr�atures',
	selectCreature: 'S�lectionnez une cr�ature', // WIP T66: Select a creature or container
	optionGroupCreatures: 'Cr�atures',
	optionGroupContainers: 'Contenants de groupes',
	dataLoadErrorAnon: '�chec du chargement des donn�es; esssayez de rafra�chir la page',
	dataLoadErrorSigned: '�chec du chargement des donn�es de la page - v�rifez si elles existent et s\'il existe un JSON valide',
	toggleDetails: ' d�tails complets des contenants de groupes',
	deselectGroups: 'd�s�lectionnez tous les contenants',
	tooltipFrom: 'depuis',
	tooltipTo: 'vers',
	tooltipLat: 'lat',
	tooltipLong: 'lon',
	tooltipUntameable: 'non apprivoisable',
	tooltipUntameableLocal: 'les cr�atures de ce lieu ne sont pas apprivoisables',
};

importArticle({
	type: 'script',
	article: 'u:ark:MediaWiki:Common.js'
});