/* Any JavaScript here will be loaded for all users on every page load. See w:c:dev:AjaxRC for info & attribution  */  

/* Installed scripts
   See MediaWiki:ImportJS
   */

window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

/* Auto-Refresh feature */
window.AjaxRCRefreshText = 'Auto-Refresh'; 
window.AjaxRCRefreshHoverText = 'Automatically refresh the Activity page.'; 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

window.SpoilerAlert = {
  pages: ["Spoiler"],
};