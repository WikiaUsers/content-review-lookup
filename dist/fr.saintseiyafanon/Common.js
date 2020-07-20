/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*Paramètres UserTags*/
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: {u: 'BUREAUCRATE' },
        rollback: {u: 'ROLLBACK'},
        'content-moderator': {u: 'MODÉRATEUR DE CONTENU'},
		inactive: {u: 'CONTRIBUTEUR INACTIF' },
		blocked: { u: 'BLOQUÉ(E)' }
	}
};
UserTagsJS.modules.inactive = 30; //Ajoute "Inactif" si aucun edit en 1 mois (30 jours)
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'chatmoderator',
    'inactive',
    'bot',
    'user',
    'threadmoderator'
];
};