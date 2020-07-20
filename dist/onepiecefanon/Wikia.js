// Ajax auto-refresh
/* Options */
ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles'];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refresh the page';
/* Script */
importScriptPage('AjaxRC/code.js', 'dev');
// END of Ajax auto-refresh

// One Piece Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "One Piece",
        id: "419062958497202186",
        theme: "light"
    }
};

// Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag === 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Collapse All');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Expand All');
    }
});
// END of Expand All

// BackToTopButton
window.BackToTopModern = true;

// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS