//InactiveUser
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 3 };

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';