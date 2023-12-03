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
var ajaxPages = ['Special:WikiActivity','Special:Log','Special:AbuseLog','Special:NewPages'];
var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxRefresh.js');
// END of ajax auto-refresh

// Standard Edit Summaries
importScript('MediaWiki:Common.js/StandardEditSummaries.js');
// END of Standard Edit Summaries