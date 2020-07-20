//************************************************
// Imported Scripts
//************************************************
// See MediaWiki:ImportJS

//************************************************
// User Tag Config
//************************************************

//*** Make New Tags
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { u: 'King Maker'},
        bot: { link:'', order:1 },
		sysop: { u: 'King', order:2 },
        'msysop': { u: 'True Warrior', order:3 },
		rollback: { u: 'Rollback', order:4 },
		chatmoderator: { u: 'Chat Mod', order:5 },
		'threadmoderator': { u: 'Forum Mod', order:6 },
		'canonmoderator': { u: 'Canon Mod', order:7 },
		'inactive': { u: 'Died', order:10 },
		'fired': { u: 'Fired', order:11 },
        'founder': { u: 'Founder of the Wiki', order: -1000 },
        'blocked': { u: 'Banished into the Pit', order: 25},
	}
};

//***Adds tags to users
UserTagsJS.modules.custom = {
    'Southparklover': ['founder'],
    'ElderPrinceShroob': ['msysop', 'canonmoderator'],
    'Bramble.exe': ['canonmoderator'],
    'Edd Shwartz':['canonmoderator']
};
 
//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;
 
//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};
 
//*** Tags Inactive Users - >=40 Days 
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0]
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'chatmoderator',
    'rollback',
    'bannedfromchat',
    'bot'
];

UserTagsJS.modules.userfilter = {
	'Bramble.exe': ['rollback', 'chatmoderator', 'threadmoderator'],
    'AwesomeSeaCucumber': ['rollback', 'threadmoderator', 'moderator'],
    'Dragonballgtgoku': ['rollback', 'chatmoderator', 'threadmoderator'],
    'Alfonso720': ['rollback', 'chatmoderator', 'threadmoderator'],
    'ElderPrinceShroob': ['rollback', 'chatmoderator', 'threadmoderator'],
    'WeegeeBotOver9000': ['sysop']
};

//************************************************
// Message Wall UserTags Config
//************************************************

window.MessageWallUserTags = {
    tagColor: 'yellow',
    glow: true,
    glowSize: '15px',
    glowColor: '#339',
    users: {
        'AwesomeSeaCucumber': 'Admin',
        'ElderPrinceShroob': 'Mini Admin',
        'Edd Shwartz': 'Admin',
        'Bramble.exe': 'Admin',
        'Alfonso720': 'Admin',
        'Tekonoshi': 'Admin'
    }
};

//************************************************
// AJAX Auto-Refresh
//************************************************
 
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Log',
    'Special:NewFiles'
];
window.AjaxRCRefreshText = 'Automatically refresh this page',
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads',

//************************************************
// RailWAM
//************************************************
window.railWAM = {
    logPage:"Project:WAM Log"
};

//************************************************
// Misc
//************************************************
$('.accountname').text(mw.config.get('wgUserName'));