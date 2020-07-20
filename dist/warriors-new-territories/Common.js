/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('Countdown/code.js', 'dev');
 
importScriptPage('DisplayClock/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 
* See w:c:dev:AjaxRC for info & attribution
*/
 
 
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:BlockList", "Everything and Anything Wiki talk:Charart/Approval Page"]
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls
 
* See w:c:dev:PurgeButton for info & attribution
*/
 
 
 
importScriptPage('PurgeButton/code.js', 'dev');
 
 
 
/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
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
 
if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) {
$(function() {
    var i, len, html, rights = {
	"WCDDoherty": ["Bureaucrat", "Rollback", "AWESOME"],
	"BatPeddieSeddieSibuna": ["Bureaucrat"],
	"KimberlyAmaya": ["Bureaucrat"],
	"Fabian2": ["Supreme Leader"],
    };
    rights = rights[wgTitle];
    if (typeof rights !== "undefined") {
        len = rights.length;
        html = "";
        // remove old rights
        //$('.UserProfileMasthead .masthead-info span.group').remove();
        for (i = 0; i < len; i += 1) {
            html += '<span class="group">' + rights[i] + '</span>';
        }
        $(html).appendTo('.masthead-info hgroup');
    }
});
}