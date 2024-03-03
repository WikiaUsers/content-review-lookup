/* Tagi profili użytkowniczek i użytkowników */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Założyciel' },
		bureaucrat: { u:'Biurokrata/ka', m:'Biurokrata', f: 'Biurokratka' },
		sysop: { u:'Administrator/ka', m:'Administrator', f: 'Administratorka' },
		contentmoderator: { u:'Moderator/ka treści', m:'Moderator treści', f: 'Moderatorka treści' },
		threadmoderator: { u:'Moderator/ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji' },
		formerbureaucrat: { u: 'Były/a biurokrata/ka', m:'Były biurokrata', f:'Była biurokratka' },
		formersysop: { u: 'Były/a administrator/ka', m:'Były administrator', f:'Była administratorka' },
		formercontentmodeator: { u: 'Były/a moderator/ka treści', m:'Były moderator treści', f:'Była moderatorka treści' },
		formerthreadmoderator: { u: 'Były/a moderator/ka dyskusji', m:'Były moderator dyskusji', f:'Była moderatorka dyskusji' },
		formerchatmoderator: { u: 'Były/a moderator/ka czatu', m:'Były moderator czatu', f:'Była moderatorka czatu' },
		blocked: { u: 'Zablokowany/a', m:'Zablokowany', f:'Zablokowana' },
		inactive: { u: 'Nieaktywny/a', m:'Nieaktywny', f:'Nieaktywna' }
	}
};

UserTagsJS.modules.custom = {
	'Severin Andrews': ['founder', 'formerbureaucrat', 'formersysop'],
	'Talho': ['formerbureaucrat', 'formersysop'],
	'Ravger': ['formersysop'],
	'Lordtrion': ['formerbureaucrat', 'formersysop'],
	'Ksoroxdz': ['formerbureaucrat', 'formersysop'],
	'Charmedp5': ['formersysop'],
	'Colette Rousseau': ['formerchatmoderator'],
	'Pallid': ['formersysop'],
	'Dawid2.bot': ['bot']
};

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'bureaucrat', 'contentmoderator', 'threadmoderator'],
	'sysop': ['bot']
};

UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: false
};