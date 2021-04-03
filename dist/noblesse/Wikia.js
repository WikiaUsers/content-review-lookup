window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: '2Gnnvas',
    prependToRail: true
};

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        admin: { u: 'Admin', },
	}
};

/* Adds tags to after a users name on the message wall */
window.MessageWallUserTags = {
    tagColor: '#ebebeb',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#ffffff',
    users: {
        'username': 'usergroup',
        'Shishkabunny': 'Founder',
        'Sebastian Clarke': 'Bureaucrat • Administrator',
        'Marion0Ame': 'Administrator',
        'Foggywizard': 'Administrator',
        'Joan Black': 'Administrator'
    }
};
 
/* Add custom groups to several users */
UserTagsJS.modules.custom = {
    'Sebastian_Clarke': ['bureaucrat', 'admin'],
};

UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.newuser = {
	namespace: 0, // Edits must be made to articles
	computation: function(days, edits) {
		// If true then newuser
		// If false then not
		// Newuser removed when user has 10 edits, OR when present for 4 days, whichever first
		return days < 4 && edits < 10;
	}
};

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:WallGreetingButton/code.js", /* Wall Greeting Button */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "u:dev:ShowHide/code.js", /* Show/Hide */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});