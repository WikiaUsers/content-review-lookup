window.UserTagsJS = {
	modules: {},
	tags: {
		Helper: { u: 'Helper', order: 10/10 },
		Monkey: { u: 'Monkey', order: -1/0 },
	}
};

UserTagsJS.modules.custom = {
	' ': ['Helper'], // NOTE: order of list here does NOT matter
	'Monkeysgt': ['Monkey']
};

UserTagsJS.modules.inactive = 60; // 60 days

/* ............................................................ */

/* RailWAM */
window.railWAM = {
    logPage: "Project:WAM Log"
};
window.BackToTopModern = true;

/* Auto Refresh */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';