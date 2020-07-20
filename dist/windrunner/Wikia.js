//Auto refresh of Recent Activity and Recent Changes pages
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Enable automatic refreshing of the page';
importScriptPage('AjaxRC/code.js', 'dev');

// Display 12 hour time followed by day, month
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});