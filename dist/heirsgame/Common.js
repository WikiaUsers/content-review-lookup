/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges", 
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:NewFiles"
];

/* Usertags */
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Has not edited recently' }
	}
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};