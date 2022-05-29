window.UserTagsJS = {
	modules: {},
	tags: {
		// groupname: { u:'Displayname', link:'BM-Page', order:number }
		// status
		blocked: {u:'Jailed', order: 1/0},
		notautoconfirmed: { u:'Amnesiac', order:0 },
		// ranks
		founder: { u:'Host', order:-1 },
		bureaucrat: { u:'Investigator', order:-1 },
		sysop: { u:'Jailor', order:1 },
		'content-moderator': { u: 'Trapper', order:-1 },
		threadmoderator: { u:'Sheriff', order:-1 },
		rollback: { u:'Retributionist', order:1 },
		chatmoderator: { u:'Vigilante', order:1 },
		autoconfirmed: { u:'Confirmed Townie', order:-1 },
		// suspicious people
		bannedfromchat: { u:'blackmailed', order:-1},
		jester: { u:'Jester', order:-1 },
		serialkiller: { u:'Serial Killer', order:-1 },
		executioner: { u:'Executioner', order:-1 },
		arsonist: { u:'Arsonist', order:-1 }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'autoconfirmed', 'notautoconfirmed', 'blocked',
    'founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator",
    'bannedfromchat', 'jester', 'serialkiller', 'executioner', 'arsonist'];
    
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'sysop': ['bureaucrat', 'founder'],
	"content-moderator": ['sysop', 'bureaucrat', 'founder'],
	'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};

UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 5, // Must have at least 5 total edits
	namespace: 1 // Edits must be made to articles to count
};                  // These all apply to remove the tag