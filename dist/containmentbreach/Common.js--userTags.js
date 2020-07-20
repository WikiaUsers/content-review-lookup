/* Setting up tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { order: -1 },
		regalis: { u: 'Creator of Containment Breach', order: -1 },
		mark: { u: 'O5-1', order: 1 },
		tremor: { u: 'O5-9', order: -1 },
		peanut: { u: 'O5-6', order: -1 },
		john: { u: 'Local Warhammer 40k Expert', order: -1 },
		overseer: { u: 'Overseer', order: -1 }
	}
};

// Remove Tags

UserTagsJS.modules.userfilter = {
	'Dr.Mark': ['sysop'],
	'Tremorfan94': ['sysop'],
	'Mrpeanut188': ['founder'],
};

/* Add User Tags */
UserTagsJS.modules.custom = {
        // Founders
	'Dr.Mark': ['founder','mark'],
	'Tremorfan94': ['tremor'],
	'Mrpeanut188': ['peanut'],
        // Other
	'Regalis11': ['regalis'],
	'JohnREDACTED': ['john']
};

UserTagsJS.modules.implode = {
	'overseer': ['chatmoderator']
};