/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
	bot: { u: 'Bot', m: 'Bot', f: 'Bot'},
	mod: { u: 'Moderator', m: 'Moderator', f: 'Moderator', link:'Project:The_Staff_Department', order:-1e10},
	rollback: { u: 'Rollback', m: 'Rollback',  f: 'Rollback', link:'Project:The_Staff_Department', order:-1e10 },
	RB: { u: 'Rollback', m: 'Rollback',  f: 'Rollback', link:'Project:The_Staff_Department', order:-1e10 },
	sysop: { u: 'Admin', m: 'Admin', f: 'Admin', link:'Project:The_Staff_Department', order:-1e10 },
	bureaucrat: { u: 'Bureaucrat', m: 'Bureaucrat', f: 'Bureaucrat', link:'Project:The_Staff_Department', order:-1e100 },
	Founder: { u: 'Founder', m: 'Founder', f: 'Founder', order:-1e200 },
    TS: { u: 'Technical Specialist', m: 'Technical Specialist', f: 'Technical Specialist', link:'Project:The_Staff_Department', order:-1e1 },
    CS: { u: 'Community Specialist', m: 'Community Specialist', f: 'Community Specialist', link:'Project:The_Staff_Department', order:-1e1 },
	inactive: { u: 'Inactive', m: 'Inactive', f: 'Inactive', order:-1e300 },
	BFC: { u: 'Banned From Chat', m: 'Banned From Chat', f: 'Banned From Chat', order:-1e10 },
	PB: { u: 'Permanently Banned', m: 'Permanently Banned', f: 'Permanently Banned', order:-1/0 }
	}
};

UserTagsJS.modules.inactive = {
    days: 31,
    namespaces: [0, 'Talk', 'User talk', 'Forum', 'Thread', 'Board', 'Board Thread']
};

UserTagsJS.modules.implode = {
/* Mod Implosion */
    'mod': ['threadmoderator', 'content-moderator'],
    'RB': ['content-moderator', 'threadmoderator', 'rollback'],
};

UserTagsJS.modules.stopblocked = false;

UserTagsJS.modules.userfilter = {
	'CoreyBot': ['inactive', 'sysop', 'threadmoderator', 'content-moderator'],
    'Zhu Li the Assistant': ['inactive', 'sysop', 'threadmoderator', 'content-moderator'],
};

UserTagsJS.modules.custom = {
/* ARPW Founder+Communty Specialist+Faction Founder */
	'Hydrocarbon1997': ['Founder', 'CS', 'bureaucrat'],
/* ARPW Founder only */
	'AsteriaNyx': ['Founder'],
	'Azrael the Sorrowful': ['Founder'],
	'OnyxVolcano': ['Founder'],
	'Queen of Anarchy': ['Founder'],
	'TheDarkMerc VI': ['Founder'],
/* Technical Specialist+Faction Founder */
	'Wingstrike': ['bureaucrat', 'TS'],
/* Community Specialist */
	'Gigitygig': ['CS'],
/* Bot List */
	'CoreyBot': ['bot'],
	'Zhu Li the Assistant': ['bot'],
/* Chat Ban list */
	'Djinnamon': ['BFC'],
};

importArticles({
	type:'script',
	articles: [
	'u:dev:UserTags/code.js',
	]
});