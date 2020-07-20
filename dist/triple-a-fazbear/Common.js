/* Any JavaScript here will be loaded for all users on every page load. */

// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// Other code
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucratronics' },
		sysop: { u:'Adminatronics' },
		'content-moderator': { u:'Contentimatronics' },
		'chat-moderator': { u:'Chatronics' },
		'discuss-moderator': { u:'Discussatronics' },
		'autoconfirmed-users': { u: 'Animatronics' }
	}
};