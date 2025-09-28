/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		formerstaff: { u:'Former Staff' },
		intern: { u:'Intern' },
		founder: {u: 'Founder', order: -1/0},
		vip: { u:'VIP', order: -3 },
		owner: { u:'Owner', order: -2 },
		cowner: { u:'Co-Owner', order: -1 },
		bureaucrat: {order: 0},
		sysop: {order: 1},
		'content-moderator': {order: 2},
		threadmoderator: {order: 3},
		bcrat0: { u:'The 0th Overseer', order: 4},
		firstbcrat: {u:'The First Overseer', order: 5},
		secondbcrat: {u:'The Second Overseer', order: 6},
		thirdbcrat: {u: 'The Third Overseer', order: 7},
		fourthbcrat: {u: 'The Fourth Overseer', order: 8},
		artist: {u: 'Artist of the Wiki', order: 8}
	}
};

UserTagsJS.modules.custom = {
    'Kevin91103': ['vip','bcrat0','owner'],
    'Aslam113': ['founder','firstbcrat','cowner'],
    "Kevin91103's useless alt": ['founder','firstbcrat', 'secondbcrat', 'thirdbcrat'],
    "SURVlVRmanBIATCH": ["vip","formerstaff", "artist"], 
    "THSTW": ["fourthbcrat", "artist"],
    "Hal2F2F": ["vip"]
};
UserTagsJS.modules.inactive = 14;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.metafilter = {
    'rollback': ['chatmoderator','threadmoderator'],
};

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});

window.MessageWallUserTags = {
    tagColor: '777777',
    txtSize: '10px',
    users: {
        'Kevin91103': 'Founder ,  VIP , Bureaucrat',
        'Aslam113': 'Founder , Bureaucrat',
        'Kevin91103%27s useless alt': 'Founder , Bureaucrat',
        'TanTheMaker69': 'Discussions Moderator',
        'THSTW': 'Bureaucrat',
        'SURVlVRmanBIATCH': 'Rollback'
        
    }
};

var tooltips_config = {
    noCSS: true,
};