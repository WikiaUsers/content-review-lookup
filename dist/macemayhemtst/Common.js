window.UserTagsJS = {
	modules: {},
	tags: {
		founder:        { u: 'Founder', order: -3 },
		cofounder:      { u: 'Co-Founder', order: -2 },
		topcontributor: { u: 'Top Contributor', order: 4 },
		mostedits:      { u: 'Most Edits', order: 5 },
		active:         { u: 'Active', order: 6 },
		wikistaff:      { u: 'Wiki Staff', order: 7 },
		contributor:    { u: 'Trusted Contributor', order: 8 },

		// Built-in role order
		bureaucrat: { order: 1 }
	}
};

// Auto-detect real MediaWiki groups
UserTagsJS.modules.mwGroups = [
	'bureaucrat',
	'threadmoderator',
	'rollback'
];

// Manually assign custom tags
UserTagsJS.modules.custom = {
	'David-Mace-Mayhem': ['founder', 'active'],
	'Username1': ['cofounder', 'wikistaff', 'topcontributor', 'active'],
	'Username2': ['wikistaff', 'topcontributor', 'active']
};

// Automatic tags
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

// Hide redundant tags
UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder', 'cofounder']
};