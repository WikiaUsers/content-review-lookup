/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u: 'Administrator' },
		inactive: { u: 'Inactive' },
		bureaucrat: { u: 'Bureaucrat', order:-1/0 },
		mod: { u: 'Moderator' },
		'autoconfirmed users': { u: 'Editors', order:1/10 }
	}
	
};

var WikiaNotificationMessage = "NoxRune has been terminated. The Wiki is going to stay how it was when the game was closed, so please do not vandalize or edit on the wiki. Thank you,";
var WikiaNotificationexpiry = 20;

userReasonDefault = '<option value="Default reason">Select a reason</option>';

window.MessageWallUserTags = {
    font: 'bold',
    tagColor: 'white',
    glow: true,
    glowSize: '18px',
    glowColor: 'white',
    users: {
        'Soyakii': 'Bureaucrat',
        'Pvm_Blueboy': 'Administrator',
        'OtterSpace': 'Rollback'

    }
};
importArticles({
    type: "script",
    articles: [
        "u:dev:Insertables/code.js",
        'w:c:dev:UserTags/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:FloatingToc/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:User_Rights_Reasons_Dropdown/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:Standard_Edit_Summary/code.js'
    ]
});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: false,
     select: 'Template:Stdsummaries'
};

window.ajaxRefresh = 30000;
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';


window.RevealAnonIP = {
    permissions : ['bureaucrat', 'administrator', 'sysop']
};

 
highlight = {
    selectAll: false,
    founder: 'white',
    sysop : 'white',
    bureaucrat: 'white',
    rollback: 'white',
    mod: 'white',
    'autoconfirmed user': 'white',
    'new account': 'white',
    users: { 
     
 
    }
};