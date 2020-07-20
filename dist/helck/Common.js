/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
PurgeButtonText = 'Refresh';
 
// importArticles-start
importArticles({
    type: 'script',
    articles: [
        // 'u:dantest:MediaWiki:Search_Fix.js',
        'u:dev:AjaxRC/code.js',                 // Auto Refresh
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:DisplayClock/code.js',           // Displays clock on wiki
        'u:dev:ReferencePopups/code.js',        // References pop-up when hovered over
        'u:dev:ShowHide/code.js',
        'u:dev:DiscordIntegrator/code.js',
    ]
});
// importArticles-end

window.DisplayClockJS = {
	hoverText: 'Click here to refresh the page'
};