/* Any JavaScript here will be loaded for all users on every page load. */
//<source lang="javascript">

/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Standard Edit Summaries */
importScript('MediaWiki:Common.js/standardeditsummaries.js');

/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Patapon_Fanopedia", Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:AbuseLog", "Special:NewFiles", "Special:Statistics" "User:Rottenlee_Ravenous", "User_talk:Rottenlee_Ravenous"];

var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxrefresh.js');