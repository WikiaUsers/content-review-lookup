//TopicBlockLog config
TBL_WIKIS = [
    "prodigy-fan-ideas",
    "community",
    "prodigy-game-fanon",
    "prodigy-glitch",
];

// Auto Refresh Settings
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
];

var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;
 
// Back to Top Config
window.BackToTopModern = true;

// Configuration for UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
            bureaucrat: { link:'https://community.fandom.com/wiki/Help:User_rights#Bureaucrats', order: -1/0 },
            sysop: { u:'Admin', link:'https://community.fandom.com/wiki/Help:User_rights#Administrators', order: -105 },
            content-moderator: { u:'Content Moderator', link:'https://community.fandom.com/wiki/Help:User_rights#Content_Moderators', order: -104 },
            threadmoderator: { u:'Thread Moderator', link:'https://community.fandom.com/wiki/Help:User_rights#Discussions_Moderators', order: -103 },
            rollback: { u:'Rollback', link:'https://community.fandom.com/wiki/Help:User_rights#Rollbacker', order: -102 },
            bot: { link:'https://community.fandom.com/wiki/Help:User_rights#Bots', order: -101 },
            notautoconfirmed: { u:'Not Autoconfirmed', order: -51 },
            newuser: { u:'New User', order: -50 },
            founder: { u:'Founder', order: 0 },
            official: { u:'Official Prodigy Account', order: 1 },
            alumni: { u:'Alumnus', m:'Alumnus', f:'Alumna', order: 2 }
        },
};
UserTagsJS.modules.inactive = {
	days: 28,
	namespaces: [0, 'Template', 'File', 'User'],
        zeroIsInactive: true
};
UserTagsJS.modules.mwGroups = {
    merge: true,
    groups: ['founder', 'inactive', 'notautoconfirmed', 'newuser']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 4,
	edits: 30,
	namespace: 0
};
UserTagsJS.modules.custom = {
        'Reflectivity': ['founder'],
        'ProdigyEd': ['official'],
        'FlareonIsAwesome13': ['alumni'],
        'Sonic of Prodigy': ['alumni'],
        'GAK16': ['alumni'],
        'Ironlightning': ['alumni'],
        'Cooler88986': ['alumni'],
        'PokemonUser37': ['alumni'],
        'Pengugeneral': ['alumni'],
        'Shizuekana': ['alumni'],
        'Yumms567': ['alumni'],
        'DerpSmoothie': ['alumni'],
        'ErrorLifeIsNull': ['alumni'],
        'ItsWiz': ['alumni'], 
        'Dystopianist': ['alumni'],
        'Sitb': ['alumni'],
        'Voldemort0714': ['alumni'],
        'Magisukiyo': ['alumni'],
        'CrazedFalcon17': ['alumni'],
        'Yeetbun': ['alumni'],
        'Hope of the Forest': ['alumni'],
        'Lifevault': ['alumni'],
        'ProdigyFan100': ['alumni'],
        'Moonbrxght': ['alumni'],
        'Diamondsea': ['alumni'],
        'KanikoRika': ['alumni'],
        'Pineapplecake14': ['alumni'],
        'Mxnt': ['alumni'],
        'ItsHELL': ['alumni'],
        '9TimesLyrical': ['alumni'],
        'MisticalMyst': ['alumni'],
        'TheIndigoDragon': ['alumni'],
        'Dragel Springcast': ['alumni'],
        'Paunchpaunch': ['alumni'],
        'Tagaziel': ['alumni'],
        'C1V.3XE': ['alumni'],
        'Franciscothepro': ['alumni'],
        'Jellybean Jade': ['alumni']
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat', 'bot'],
	'sysop': ['bureaucrat', 'bot'],
        'content-moderator': ['sysop', 'bureaucrat', 'bot'],
        'rollback': ['content-moderator', 'sysop', 'bureaucrat', 'bot'],
        'newuser': ['notautoconfirmed']
};

// RailModule
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true},
    'Template:ChatModule'
];

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true
};

// Configuration for TokenRefresh
window.TokenRefreshInterval = 360000;

// Configuration for UserStatus
window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 0,
    online: '#0078ff',
    away: '#cc7',
    dnd: 'crimson',
    offline: 'darkgray',
};

// Configuration for Standard Edit Summary
// Create the "dev" namespace if it doesn't exist already:

window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
};