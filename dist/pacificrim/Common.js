/* Any JavaScript here will be loaded for all users on every page load. */

/* Snow */	
//importScriptPage('MediaWiki:Snow.js'); //remove those two slashes during the holidays

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* InactiveUsers
 * Adds an "inactive" tag to the user pages, user talk pages, message walls and blog pages of users who haven't made an edit of any sort for some time
 * See w:c:dev:InactiveUsers for info and attribution
 */

InactiveUsers = { months: 2 };


var fdButtons = [];
fdButtons[fdButtons.length] = {
    'summary': 'spam',
    'label': 'spam'
};
fdButtons[fdButtons.length] = {
    'summary': 'vandalism',
    'label': 'vandalism'
};
fdButtons[fdButtons.length] = {
    'summary': 'Fan art',
    'label': 'Fan art'
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
/* Add a button to edit Message Wall Greeting
 * By: [[User:Ray422]], modified by [[User:Ray422]]
 */

$(function EditGreeting() {
    if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
        if (wgTitle == wgUserName) {
            $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:' + wgUserName + '?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
        }
    }
});