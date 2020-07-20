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
		handy: { u: 'handy', order: 2 },
		petunia: { u: 'petunia', order: 2 },
		flaky: { u: 'flaky', order: 2 },
		mime: { u: 'mime', order: 2 },
		flippy: { u: 'flippy', order: 2 },
		lumpy: { u: 'lumpy', order: 2 },
		nutty: {u: 'nutty', order: 1},
        mole: { u: 'the mole', order: 2 },
        lifty: { u: 'lifty', order: 2 },
        shifty: { u: 'shifty', order: 2 },
        russell: { u: 'russell', order: 2 },
		toybonnie: { u: 'toy bonnie', order: 4 },
		toychica: { u: 'toy chica', order: 4 },
        toyfreddy: { u: 'toy freddy', order: 4},
        kenny: { u: 'kenny', order: 4},
		wikiresponsibility: { u: 'wiki responsibility', order: 2 },
		cuddles: { u: 'cuddles', order: 2 },
		toothy: { u: 'toothy', order: 2 },
		splendid: { u: 'splendid', order: 2 },
		discobear: { u: 'discobear', order: 1 },
		honosysop: { u: 'honorary admin', order: 1},
		lapis: { u: 'lapis lazuli', order: 4},
		bandmstudios: { u: 'bandmstudios', order: 5},
		semiactive: { u: 'semi active', order: 2},
		mod: { u: 'content moderator', order: 0},
		rollback: { u: 'rollback', order: 2},
		honorarybureaucrat: { u: 'honorary bureucrat', order: 4},
		contentmod: { u: 'content moderator', order: 4},
		formerstaff: { u: 'former staff', order: 4},
	}
};

UserTagsJS.modules.custom = {
	"Lord O' Darkness": ['sysop'],
	'Yong feng': ['honorarybureaucrat', 'toybonnie', 'formerstaff'],
	'AnimationFan15': ['rollback', 'honorarybureaucrat', 'mime', 'toychica', 'lapis', 'formerstaff'],
    'Rorosilky5': ['flippy', 'kenny', 'formerstaff'],
    'Sandgar': ['flaky', 'nutty', 'bandmstudios', 'formerstaff'],
    'PokemonTDHTF98': ['lifty', 'shifty', 'formerstaff'],
    'AdamISAWESOME': ['lumpy', 'mole', 'formerstaff'],
    'BonnieBunny1987': ['lifty', 'shifty'],
    'KennyX1994': ['sysop', 'cuddles', 'flaky', 'bandmstudios' ],
    'IThrowLemonsAtLife': ['bandmstudios'],
    'Smart zombie': ['sysop', 'bureaucrat', 'nutty', 'semiactive'],
    'Mr Creeper500': ['sysop', 'semiactive', 'cuddles', 'flippy'],
    'DinoLord00': ['lumpy', 'mole', 'russell'],
    'Fasterrr': ['rollback'],
    'Zrenjaninac': ['handy', 'mime', 'formerstaff'],
    'BlueTide': ['rollback', 'handy'],
    'Nmcconnell': ['rollback'],
    'Amber saffeels': ['lumpy'],
    'Splendit-HTF': ['rollback', 'splendid'],
    'OrigamiHound': ['rollback'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
UserTagsJS.modules.mwGroups = ['contentmoderator'];

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

window.MessageWallUserTags = {
    tagColor: 'black',
    glow: true,
    users: {
        'username': 'usergroup',
        "Lord_O'_Darkness": 'Admin',
        'Yong_feng': 'Honorary Bureaucrat',
        'AnimationFan15': 'Honorary Bureaucrat • Rollback • Cuddles • Toy Chica • Lapis Lazuli',
        'Rorosilky5': 'Flippy • Kenny',
        'Sandgar': 'Content Moderator • Flaky • Nutty • BandMStudios',
        'PokemonTDHTF98': 'Lifty • Shifty',
        'AdamISAWESOME': 'Lumpy • Mole',
        'BonnieBunny1987': 'Lifty • Shifty',
        'KennyX1994': 'Bureaucrat • Cuddles • Flaky • BandMStudios', 
        'IThrowLemonsAtLife': 'BandMStudios',
        'Smart_zombie': 'Bureaucrat • Nutty',
        'Mr_Creeper500': 'Bureaucrat • Cuddles • Flippy',
        'DinoLord00': 'Admin • Russell • Lumpy • Mole',
        'Fasterrr': 'Rollback',
        'Zrenjaninac': 'Admin • Handy • The Mole',
        'BlueTide': 'Rollback • Handy Fan',
        'Nmcconnell': 'Rollback',
        'Splendit-HTF': 'Rollback • Splendid',
        'OrigamiHound': 'Rollback',
    }
};
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been killed for $2 for the following reason(s): "$1"',
  autocheck : false
};

//LastEdited 
window.lastEdited = {
//  avatar: false,
    size: false,
    diff: true,
    comment: true,
    time: true
};

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t comment this blog!",
    nonexpiryCategory: "Never archived blogs"
};