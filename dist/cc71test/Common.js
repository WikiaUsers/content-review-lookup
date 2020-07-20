/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('Countdown/code.js', 'dev');

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = {
    hoverText: 'Refresh this page',
    interval: 1000, /* How often the timer updates in milliseconds (1000=1second) */
    monofonts: 'Lucida Console, sans serif' /* The font the clock uses by default */
};
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

importScriptPage('RelatedDiscussionsModule/code.js', 'dev');

importScriptPage('ListFiles/code.js', 'dev');

importScriptPage('PortableCSSPad/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 
* See w:c:dev:AjaxRC for info & attribution
*/
 
 
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
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
	"Ciria": ["Rollback"],
	"Gleek62442": ["Rollback"],
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

importScriptPage("MarkForDeletion/code.js", "dev");
// MarkForDeletion customization, see http://dev.wikia.com/wiki/MarkForDeletion
window.MarkForDeletion = {
    promptedDeleteReason: "Spam"
};