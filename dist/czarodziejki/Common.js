/* TAGI PROFILI UŻYTKOWNICZEK I UŻYTKOWNIKÓW */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Założyciel' },
		bureaucrat: { u:'Biurokrata_ka', m:'Biurokrata', f: 'Biurokratka' },
		sysop: { u:'Administrator_ka', m:'Administrator', f: 'Administratorka' },
		contentmoderator: { u:'Moderator_ka treści', m:'Moderator treści', f: 'Moderatorka treści' },
		threadmoderator: { u:'Moderator_ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji' },
		formerbureaucrat: { u: 'Były_a biurokrata_ka', m:'Były biurokrata', f:'Była biurokratka' },
		formersysop: { u: 'Były_a administrator_ka', m:'Były administrator', f:'Była administratorka' },
		formercontentmodeator: { u: 'Były_a moderator_ka treści', m:'Były moderator treści', f:'Była moderatorka treści' },
		formerthreadmoderator: { u: 'Były_a moderator_ka dyskusji', m:'Były moderator dyskusji', f:'Była moderatorka dyskusji' },
		formerchatmoderator: { u: 'Były_a moderator_ka czatu', m:'Były moderator czatu', f:'Była moderatorka czatu' },
		blocked: { u: 'Zablokowany_a', m:'Zablokowany', f:'Zablokowana' },
		inactive: { u: 'Nieaktywny_a', m:'Nieaktywny', f:'Nieaktywna' }
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

/* WDSICONS */
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });

mw.hook('dev.wds').add(function(wds) {
	mw.hook('wikipage.content').add(function() {
    wds.render('.bar');
	});
});