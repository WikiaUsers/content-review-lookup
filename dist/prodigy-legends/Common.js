// BackToTop config
window.BackToTopModern = true;
window.BackToTopStart = 1500;
window.BackToTopSpeed = 400;

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
	    rollback: { 
	        u: 'Intern',
	        title: 'Also known as Rollback. This user can warn you/participate in wiki staff discussions/otherwise act as a moderator, but they have no extra user rights other than the ability to quickly revert edits.'
	    },
	    discmod: {
	        u: 'Discord Staff',
	        title: 'This user is a staff member in this wiki\'s Discord server',
	        link: 'https://discord.gg/KcDaUWR'
	    },
	    verified: {
	        u: 'Verified',
	        title: 'This user has been verified by local wiki administrators.',
	        link: 'https://prodigy-legends.fandom.com/wiki/Prodigy_Legends_Wiki:Requests_for_verification'
	    }
	    
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = ['rollback'];

window.UserTagsJS.modules.custom = {
    "Gacha W1Z4RD":  ['discmod','verified'],
    "DaChickenKing": ['verified','discmod'],
    "YeetYeetYeetYeetYees": ['discmod'],
    "RixiiLazule": ['verified', 'discmod'],
    "LittleGirlScarlett": ['verified'],
    "RobTheBobert": ['verified'],
    "Glaciersong": ['verified'],
};

window.UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'],
	'content-moderator': ['sysop', 'bureaucrat'],
	'threadmoderator': ['sysop', 'bureaucrat', 'content-moderator'],
	'chatmoderator': ['threadmoderator', 'sysop', 'bureaucrat', 'content-moderator'],
	'rollback': ['sysop', 'bureaucrat', 'content-moderator']
};

// TopicBlockLog config
window.TBL_WIKIS = [ "community", "prodigy-math-game", "prodigy-glitch", "prodigy-game-fanon" ];

// LockForums config
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 15,
    expiryMessage: "This thread hasn't been commented on for over <expiryDays> days, and is now locked to prevent disruption.",
};