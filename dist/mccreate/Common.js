/* Any JavaScript here will be loaded for all users on every page load. */
// REVEAL IP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
// END REVEAL IP
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Log','Special:AbuseLog','Special:NewPages'];
var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxRefresh.js');
// END of ajax auto-refresh

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

// Enabling collapsible tables //
importScript('MediaWiki:Common.js/ShowHide/code.js');
// END Enabling collapsible tables //

/* Replaces {{USERNAME}} with the name of the user browsing the page. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Twitter follow button */
function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/dak47922" class="twitter-follow-button" data-show-count="true">Follow Minecraft Creations</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);