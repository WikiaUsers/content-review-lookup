/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//** Custom User Tags **
window.UserTagsJS = {
	modules: {},
	tags: {
		'sysop': { u:'Admin', link:'Project:Administrators' },
		'mini-sysop': { u: 'Mini-Admin', link:'Project:Mini Admins' },
		'patroller': { u: 'Janitor'},
                'semi-active': { u: 'Semi Active', link:'Project:Semi Active Staff' }
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 2 },
		archonemperor: { u: 'Archon Emperor', order: 1 },
		oldaccount: { u: 'Old Account', order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Aethervallum': ['csshelper', 'templatehelper', 'jshelper', 'archonemperor'], // NOTE: order of list here does NOT matter
	'Josh the Hedgehog': ['oldaccount']
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
        days: 5,
        edits: 10
};
UserTagsJS.modules.inactive = {
        days: 30,
        namespaces: [0, 1, 3, 4, 5, 6, 7, 10, 11, 14, 15, 110, 111, 112, 113, 500, 501, 502, 503, 1200, 1201, 2000, 2001, 2002]
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback', 'cleanup', 'sysop']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	'vandal-patrol': ['mini-sysop'], // Remove vandal-patrol from mini-sysops
        'sysop': ['bot', 'Archon Emperor'], // Remove administrator from bots
        'chatmoderator': ['bot'], // Remove chat moderator from bots
        'founder': ['Archon Emperor'], // Remove founder from exclusive "Archon Emperor"
        'bureaucrat': ['Archon Emperor'],
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'.
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback.
};