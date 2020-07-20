/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/*Customize tags on user profiles*/
    window.UserTagsJS = {
        modules: {},
        tags: {
            imageeditor: { u: 'Image Editor', order:-1/0},
            former: { u: 'Former Operator', title: 'This user was formerly an operator.' },
            inactive: { u: 'Inactive', title: 'This user has not edited in the past 60 days.' },
            founder: { u: 'Founder'},
            blocked: { title: 'This user is currently blocked.' },
            newuser: { u: 'New User', title: 'This user is new to the wiki.' },
            notautoconfirmed: { title: 'This user is new to FANDOM.'}
        }
    };
 
    UserTagsJS.modules.inactive      = 60;
    UserTagsJS.modules.newuser = {
	computation: function(days, edits) {
		return days < 7 && edits < 25;
	}
};
    UserTagsJS.modules.autoconfirmed = true;
    UserTagsJS.modules.mwGroups = [
        'founder',
        'bureaucrat',
        'sysop',
        'imageeditor',
        'dualmoderator',
        'content-moderator',
        'threadmoderator',
        'chatmoderator',
        'rollback',
        'patroller',
        'bannedfromchat',
        'bot',
        'bot-global',
    ];
 
    UserTagsJS.modules.custom = {
        'Blitzflame99': ['former'],
        'Codebreak1': ['former'],
        'Laugh Attack Videos': ['former'],
        'Pinkgalaxy': ['former'],
    };
    
    UserTagsJS.modules.metafilter = {
        sysop:        ['bureaucrat',['imageeditor']],
        rollback:     ['threadmoderator',['chatmoderator']],
    };
    
    UserTagsJS.modules.implode = {
	'dualmoderator': ['threadmoderator', 'content-moderator'],
    };
    
/*AjaxRC (Auto Refresh)*/
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Log",
    "Special:NewFiles",
    "Special:Videos",
    "Special:Contributions",
    "Special:Images"
];

/*Lock Message Walls, forums and blogs*/
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "You may not comment on this blog because it hasn't been commented on for over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 20,
    expiryMessage: "This thread hasn\'t been commented on for over <expiryDays> days."
};