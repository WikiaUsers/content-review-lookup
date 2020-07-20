/* Any JavaScript here will be loaded for all users on every page load. */
//************************************************
// Message Wall UserTags
//************************************************
window.MessageWallUserTags = {
    tagColor: '#408',
    glow: true,
    glowSize: '10px',
    glowColor: '#0ff',
    users: {
        'Dragonballgtgoku': 'B-Crat, Admin',
        'Darthwikia': 'Admin',
    }
};

//************************************************
// New Tags and Tag Upgrades
//************************************************
//* Import

window.UserTagsJS = {
	modules: {},
	tags: {
	    bureaucrat: { u:'Outlaw', order:-1337},
	    admin: { u: 'Classy Thief', order: 1},
	    blocked: { u: 'Caught by Officers', order: 2},
	    inactive: { u: 'Retired', order: 3},
	    rollback: { u: 'Sniper', order: 4},
	    chatmod: { u: 'Watcher', order: -1},
	   
	},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//*********
//Inactive
//*********

UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.custom = {
	'Dragonballgtgoku': ['bureaucrat', 'admin', 'rollback'],
	'Darthwikia': ['admin', 'rollback'],
	'Kerrawesome': ['inactive', 'rollback'],
};

//*************
// AJAX Refresh
//*************