/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Custom User Tags, including Inactive
window.UserTagsJS = {
	modules: {
		inactive: { // Edits must be to content namespaces
			days: 30,
			namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			zeroIsInactive: false
		},
		mwGroups: [
		    'founder',
            'bureaucrat',
            'chatmoderator',
            'month-editor',
            'ortography-corrector',
            'rollback',
            'sysop',
            'bannedfromchat',
            'threadmoderator',
            'content-moderator',
            'bot',
            'bot-global',
            'council',
            'global-discussions-moderator',
            'vanguard',
            'soap',
            'helper',
            'staff',
            'voldev',
            'wiki-manager',
            'content-team-member',
            'content-volunteer',
            'english-wiki-staff',
            'former-wiki-staff',
            'wiki-staff-member'
        ], 
		autoconfirmed: false,
		newuser: true,
		inactive: true,
		metafilter: {
			bot: ['bot-global'],
			sysop: ['bot'],
		},
	},
	tags: {
		'month-editor': { u:'Editor(a) del Mes', m: 'Editor del Mes', f: 'Editora del Mes', },
		'ortography-corrector': { u:'Corrector(a) ortográfico/a', m: 'Corrector ortográfico', f: 'Correctora ortográfica', },
		'english-wiki-staff': { u:'Staff de la wiki inglesa', },
		'wiki-staff-member': { u:'Miembro del Staff', },
		'former-wiki-staff': { u:'Antiguo/a Miembro del Staff', m: 'Antiguo Miembro del Staff', f: 'Antigua Miembro del Staff', },
		voldev: { u:'Desarrollador(a) Volutario/a', f: 'Desarrolladora Voluntaria', },
		rollback: { u:'Reversor(a)', f: 'Reversora', },
		hiatus: { u:'Staff en "Hiatus"', },
		sysop: { u:'Admin', f: 'Administradora', },
		chatmoderator: { u:'Mod. del Chat', f:'Moderadora del Chat', },
		council: { u:'Consejero/a', f:'Consejera', },
		'global-discussions-moderator': { u:'Moderador(a) Global de Discusiones', f:'Moderadora Global de Discusiones', },
	}
};

UserTagsJS.modules.custom = {
	'Shirkam03': ['ortography-corrector', 'wiki-staff-member', 'english-wiki-staff'],
	'Questionator': ['former-wiki-staff'],
	'ShinGojiraGamerDiep.io987': ['former-wiki-staff'],
	'Deadkiller537': ['former-wiki-staff'],
	'Qwertyjustio': ['former-wiki-staff'],
	'Andresini05': ['wiki-staff-member', 'hiatus'],
	'TheMythicIndoraptus01': ['wiki-staff-member', 'english-wiki-staff'],
	'MonstruoMarino23': ['wiki-staff-member', 'hiatus'],
};//Terminar US*/