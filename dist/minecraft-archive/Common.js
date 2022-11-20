/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution
  */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:log",
    "Special:Contributions",
    "Special:Images",
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/lca/images/4/42/Loading.gif';
window.ajaxRefresh = 30000;
window.ajaxRCRefreshText = 'Update';
window.ajaxRCRefreshHoverText = 'Automatically refresh';