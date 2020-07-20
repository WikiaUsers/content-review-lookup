/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		intern: { u:'Intern' },
		vip: { u:'VIP' },
		formerstaff: { u:'Former Staff' },
		bcrat0: { u:'The 0th Overseer', order: 1},
		firstbcrat: {u:'The First Overseer', order: 2},
		secondbcrat: {u:'The Second Overseer', order: 3},
		thirdbcrat: {u: 'The Third Overseer', order: 4},
		founder: {u: 'Founder', order: -1/0},
		bureaucrat: {order: 5},
		sysop: {order: 6},
		'content-moderator': {order: 7}
	}
};

UserTagsJS.modules.custom = {
    'Kevin91103': ['bcrat0'],
    'Aslam113': ['founder'],
    "Kevin91103's useless alt": ['founder','firstbcrat', 'secondbcrat', 'thirdbcrat'],
    "SURVlVRmanBIATCH": ["vip","formerstaff"], 
    "Hal2F2F": ["vip"]
};
UserTagsJS.modules.inactive = 14;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'rollback': ['chatmoderator','threadmoderator']
};

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AbuseLogRC.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ListAdmins/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassUserRights/code.js',
    ]
});

window.MessageWallUserTags = {
    tagColor: '777777',
    txtSize: '10px',
    users: {
        'Kevin91103': 'Founder , Bureaucrat',
        'Aslam113': 'Founder , Bureaucrat',
        'Kevin91103%27s useless alt': 'Founder , Bureaucrat',
    }
};