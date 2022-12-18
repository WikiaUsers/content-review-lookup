/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        // 'u:dantest:MediaWiki:Search_Fix.js',

        'u:dev:MediaWiki:AjaxRC/code.js',           // Ajax auto-refresh
        'u:dev:MediaWiki:BackToTopButton/code.js',  // BackToTopButton
        'u:dev:MediaWiki:Countdown/code.js',        // Countdown
        'u:dev:MediaWiki:ReferencePopups/code.js',  // ReferencePopups
        'u:dev:MediaWiki:ShowHide/code.js',         // ShowHide
        'u:dev:MediaWiki:Toggler.js',               // Toggler
        'u:dev:DisplayClock/code.js',               // Display Clock
    ]
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:RecentChanges', 
    'Special:WikiActivity',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:NewFiles',
    'Special:AbuseLog'
];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
/* End of the {{USERNAME}} replacement */

// ============================================================
// displayTimer
// ============================================================
 
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the server cache and update the contents of this page'
};

/* Bere's user page WikiRail footer */
if ($('.page-User_Bereisgreat').length !== 0) {
	$("#WikiaRail").append('<div style="clear:both;" align="center"><img src="http://bereistesting.wikia.com/wiki/Special:FilePath?file=Akina_Hiizumi.png"></div>');
}