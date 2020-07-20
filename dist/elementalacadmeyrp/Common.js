/* Any JavaScript here will be loaded for all users on every page load. */
/*Custom User Tags*/

/* Commenting out improper UserTags setup. Please read the instructions at
   http://dev.wikia.com/wiki/UserTags
   
window.UserTagsJS.modules.newuser = {
	days: 1, // Must have been on the Wiki for 1 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
*/
  
var PurgeButtonText = 'Refresh',
    ajaxPages = [
        "Special:RecentChanges",
        "Special:Watchlist",
        "Special:Log",
        "Special:Contributions",
        "Special:WikiActivity",
        "Blog:Recent_posts"
    ],
    AjaxRCRefreshText = 'Auto-refresh',
    EditIntroButtonText = 'Intro';