/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto-Refresh for Wiki Activity */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
		inactive: 30,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: false,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
			contentmoderator: ['sysop'],
		},
		newuser: true,
	},
	tags: {
		andy: { u: 'andy', order: 2 },
		ruxi: { u: 'ruxi', order: 2 },
		ivona: { u: 'ivona', order: 2 },
		daniel: { u: 'daniel', order: 2 },
        calin: { u: 'calin', order: 4},
		wikiresponsibility: { u: 'wiki responsibility', order: 2 },
		blubby: { u: 'blubby', order: 2 },
		paul: { u: 'paul', order: 2 },
		semiactive: { u: 'semi active', order: 2},
		mod: { u: 'content moderator', order: 0},
		rollback: { u: 'rollback', order: 2},
		honorarybureaucrat: { u: 'honorary bureucrat', order: 4},
		contentmod: { u: 'content moderator', order: 4},
		formerstaff: { u: 'former staff', order: 4},
	}
};

UserTagsJS.modules.custom = {
	"TheXDarkness": ['sysop'],
	'TheAnimFan': ['rollback', 'honorarybureaucrat', 'formerstaff'],
    'Cahl1997': ['sysop', 'calin', 'ruxi'],
    'TheXSmart': ['sysop', 'bureaucrat', 'semiactive'],
    'Ivocreep247': ['sysop', 'semiactive', 'calin', 'ivona'],
    'Dinosaur247': ['daniel'],
};