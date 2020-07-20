/* Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */
 
window.ajaxPages = ["Blog:Recent_posts", "Special:RecentChanges", "Special:WikiActivity", "Special:Chat", "Special:Watchlist", "Special:Log", "Special:Log/upload", "Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Replaces {{USERNAME}} with the name of the user browsing the page.
 * Requires copying Template:USERNAME.
 */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});