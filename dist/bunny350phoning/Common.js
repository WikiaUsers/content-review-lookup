/* Any JavaScript here will be loaded for all users on every page load. */

/******************************************************************************
 ***
 *** Template-specific scripts here
 ***
 ******************************************************************************/

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Automatic update';
 AjaxRCRefreshHoverText = 'Automatic update recent changes, If enabled: The changes will automactilly update at 30 seconds';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Bunny_350_Wiki:Administrators"];
 importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        ]
    });

/* DO NOT ADD CODE BELOW THIS LINE */