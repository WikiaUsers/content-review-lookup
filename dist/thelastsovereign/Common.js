/* Any JavaScript here will be loaded for all users on every page load. */

/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
importArticles({
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:TwittWidget/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:SignatureCheck/code.js', /* Alerts users for not signing when publishing a talk page edit */
        'u:dev:AjaxRC/code.js',
        'w:c:dev:ReferencePopups/custom.js',
        'u:dev:CategoryRenameAuto-update/code.js',
        ]
});
/*Copied from the MortalKombat wiki: http://mortalkombat.wikia.com*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */