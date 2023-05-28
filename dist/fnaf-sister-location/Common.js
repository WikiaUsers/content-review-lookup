/* Any JavaScript here will be loaded for all users on every page load. */


    
// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:AjaxRC/code.js',
    ]
});
//===================================================================

// Custom Username Tagsz
window.UserTagsJS = {
	modules: {},
	tags: {
	founder: 'Wikia Founder',
        formerstaff: 'Former Staff'
	}
};
UserTagsJS.modules.custom = {
	'A Mystery Anamatronic': ['founder'],
	'FiveCraft': ['formerstaff'],
	'Redx360': ['formerstaff'],
	'22garrets': ['formerstaff'],
	'Cadethefrogger': ['formerstaff'],
	'Kaz Heater': ['formerstaff']
};
UserTagsJS.modules.metafilter = {
	rollback: ['formerstaff'],
	inactive: ['formerstaff']
};
//======================