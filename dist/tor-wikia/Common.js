window.UserTagsJS = {
	modules: {},
	tags: {
		// groupname: { u:'Displayname', link:'TOS-Page', order:number }
		// status
		blocked: {u:'Kidnapped', order: 1/0},
		inactive: {u:'in Graveyard', order: 1/0},
		goodieofthemonth: { u:'Goodie of the Month', order: -1 },
		notautoconfirmed: { u:'Maeve', order:0 },
		// ranks
		founder: { u:'Aata', link:'Tor Wikia Staff', order:-1 },
		bureaucrat: { u:'Sayori', link:'Tor Wikia Staff', order:-1 },
		sysop: { u:'Wispon', link:'Tor Wikia Staff', order:1 },
		contentmoderator: { u: 'Yua', link:'Tor Wikia Staff', order:-1 },
		threadmoderator: { u:'Irru', link:'Tor Wikia Staff', order:-1 },
		rollback: { u:'Hinata', link:'Tor Wikia Staff', order:1 },
		chatmoderator: { u:'Alexander', link:'Tor Wikia Staff', order:1 },
		autoconfirmed: { u:'Confirmed Goodie', order:-1 },
		Octoling: { u: 'Octoling' },
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
	'TheOnlyFoxCat': ['goodieofthemonth'] // Add Goodie of the Month
};

UserTagsJS.modules.custom = {
	'Saxtremegaming': ['Octoling'] // Sax's Custom Rank(:P)
};

UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'sysop': ['bureaucrat', 'founder'],
	"content-moderator": ['sysop', 'bureaucrat', 'founder'],
	'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['goodieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};