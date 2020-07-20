/* Any JavaScript here will be loaded for all users on every page load. */

// Tags
// ================================================================
// Username tags additions/filters (Working as intended)
// Don't mess with order without telling a Super Admin first, this
// breaks very easy.
// ================================================================

window.UserTagsJS = {
    modules: {},
    tags: {
		'bureaucrat-sysop': { u:'Bureaucrat', title:'Both an admin and a bureaucrat.' },
		'half-sysop': { u: 'Half-Admin', title:'Chatmoderator, rollback and forum moderator.' },
		'founder': { u: 'Founder', title:'Founder of Exchange Student Zero Wiki.' },
		'liberator': { u: 'Liberator', title:'The boy who saved Exchange Student Zero Wiki.' },
		'novice': { u: 'Novice', title:'Equivalent to beginner.' }
	}
};

UserTagsJS.modules.implode = {
'bureaucrat-sysop': ['sysop', 'bureaucrat'],
'half-sysop': ['chatmoderator', 'rollback', 'moderator'],
'novice': ['newuser']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.inactive = {
	months: 1,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
'RGL Victor The Great': ['liberator']
};
UserTagsJS.modules.metafilter = {
	'bureaucrat-sysop': ['founder']
};

window.MessageWallUserTags = {
    tagColor: '#A0522D',
    glow: false,
    users: {
        'username': 'usergroup',
        'RGL_Victor_The_Great': 'Bureaucrat',
        'DeeBenn': 'Founder',
    }
};

// Import scripts
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:MessageWallUserTags/code.js',
	'u:dev:Countdown/code.js',
	'u:dev:BackToTopButton/code.js',
        'u:dev:MessageWallUserTags/code.js'
    ]
});

// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};