/* Any JavaScript here will be loaded for all users on every page load. */

/* Spoilers */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

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
		handy: { u: 'Handy', order: 2 },
		petunia: { u: 'Petunia', order: 2 },
		flaky: { u: 'Flaky', order: 2 },
		mime: { u: 'Mime', order: 2 },
		flippy: { u: 'Flippy', order: 2 },
		lumpy: { u: 'Lumpy', order: 2 },
		nutty: {u: 'Nutty', order: 1},
        mole: { u: 'The Mole', order: 2 },
        lifty: { u: 'Lifty', order: 2 },
        shifty: { u: 'Shifty', order: 2 },
        russell: { u: 'Russell', order: 2 },
		toybonnie: { u: 'Toy Bonnie', order: 4 },
		toychica: { u: 'Toy Chica', order: 4 },
        toyfreddy: { u: 'Toy Freddy', order: 4},
        kenny: { u: 'Kenny', order: 4},
		wikiresponsibility: { u: 'Wiki Responsibility', order: 2 },
		cuddles: { u: 'Cuddles', order: 2 },
		toothy: { u: 'Toothy', order: 2 },
		sniffles: { u: 'Sniffles', order: 2 },
		splendid: { u: 'Splendid', order: 2 },
		discobear: { u: 'Disco Bear', order: 1 },
		pop: { u: 'Pop', order: 1 },
		honosysop: { u: 'Honorary admin', order: 1},
		lapis: { u: 'Lapis Lazuli', order: 4},
		bandmstudios: { u: 'Bandmstudios', order: 5},
		semiactive: { u: 'Semi Active', order: 2},
		mod: { u: 'Content Moderator', order: 0},
		rollback: { u: 'Rollback', order: 2},
		honorarybureaucrat: { u: 'Honorary Bureucrat', order: 4},
		contentmod: { u: 'Content Moderator', order: 4},
		formerstaff: { u: 'Former Staff', order: 4},
		inactive: { u: 'Inactive', order: 4},
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
    'Smart zombie': ['honorarybureaucrat', 'nutty', 'formerstaff'],
    'Mr Creeper500': ['sysop', 'semiactive', 'cuddles', 'flippy'],
    'DinoLord00': ['lumpy', 'mole', 'russell'],
    'Fasterrr': ['rollback'],
    'Zrenjaninac': ['handy', 'mime', 'mole'],
    'BlueTide': ['rollback', 'handy'],
    'Sleep Mast R': ['rollback'],
    'Amber saffeels': ['lumpy'],
    'Splendit-HTF': ['sysop', 'splendid'],
    'OrigamiHound': ['rollback'],
    'SpongeBob\'s Biggest Enthusiast': ['sysop', 'sniffles', 'pop'],
    'Tabletstoons123': ['rollback']
};

window.MessageWallUserTags = {
    tagColor: 'black',
    glow: true,
    users: {
        'username': 'usergroup',
        "Lord_O'_Darkness": 'Admin',
        'Yong_feng': 'Honorary Bureaucrat',
        'AnimationFan15': 'Honorary Bureaucrat • Rollback • Cuddles • Toy Chica • Lapis Lazuli',
        'KennyX1994': 'Bureaucrat • Cuddles • Flaky • BandMStudios', 
        'Smart_zombie': 'Honorary Bureaucrat • Nutty',
        'Mr_Creeper500': 'Bureaucrat • Cuddles • Flippy',
        'DinoLord00': 'Admin • Russell • Lumpy • Mole',
        'Fasterrr': 'Rollback',
        'Zrenjaninac': 'Admin • Handy • The Mole • Mime',
        'BlueTide': 'Rollback • Handy',
        'Sleep Mast R': 'Rollback',
        'Splendit-HTF': 'Admin • Splendid',
        'OrigamiHound': 'Rollback',
	    'SpongeBob\'s Biggest Enthusiast': 'Admin • Sniffles • Pop',
	    'Tabletstoons123': 'Rollback',
	    'TravellingEye': 'Admin',
	    'MattDet': 'Admin'
    }
};

UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
UserTagsJS.modules.mwGroups = ['contentmoderator'];

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
 
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