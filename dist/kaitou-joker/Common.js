/* Any JavaScript here will be loaded for all users on every page load. */

// All imported scripts
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js',
		'u:dev:RevealAnonIP/code.js',
		'u:dev:AjaxRC/code.js',
		'u:dev:MessageBlock/code.js',
		'u:dev:BackToTopButton/code.js',
		'u:dev:LastEdited/code.js',
		'u:dev:MessageWallUserTags/code.js',
		'u:dev:MessageBlock/code.js',
		'u:dev:UserTags/code.js',
		"u:dev:Countdown/code.js",
	]
});

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Last Edited Config
window.lastEdited = {
    avatar: false
};

// MessageWallUserTags

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'ThunderGemios10': 'Bureaucrat',
    }
};