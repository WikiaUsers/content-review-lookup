window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

/* Any JavaScript here will be loaded for all users on every page load. */
PurgeButtonText = 'Refresh';

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:InactiveUsers/code.js'
    ]
});
    InactiveUsers = { months: 2 };

/*
////////////////////////////////////////////////////////
// Facebook box on every page
////////////////////////////////////////////////////////
*/
 
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=572554752808087&connections=10&amstream=0" align="top" frameborder="0" width="270" height="280" scrolling="no" />');
}
$(fBox);
 
/*
////////////////////////////////////////////////////////
// END Facebook box on every page
////////////////////////////////////////////////////////
*/