importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

/* Auto updating recent changes opt-in

* See w:c:dev:AjaxRC for info & attribution 
*/

AjaxRCRefreshText = 'Auto-refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; importScriptPage('AjaxRC/code.js', 'dev');

/* Adds "purge" option to page controls

* See w:c:dev:PurgeButton for info & attribution 
*/

importScriptPage('PurgeButton/code.js', 'dev');


/* Any JavaScript here will be loaded for all users on every page load. */ jQuery('.achievementbox').mouseover(function() {

  jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {

  jQuery("div", this).hide();
})

importScriptPage('ShowHide/code.js', 'dev')

/* Replaces Template:USERNAME with the name of the user browsing the page.

  Requires copying Template:USERNAME. */

function UserNameReplace() {

   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the Template:USERNAME replacement */

/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});