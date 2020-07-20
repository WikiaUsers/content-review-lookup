/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */


/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Falling Wikia Ws*/
importScript('MediaWiki:Common.js/falling.js');
 
 
 
/* imports*/
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('Mediawiki:FindReplace.js', 'kangaroopower');
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('AdvancedOasisUI/code.js', 'dev');
importScriptPage('MediaWiki:Common.js/displayClock.js', 'admintools');
importScriptPage('User:Nikolaitttt/whammod.js', 'southpark');
importScriptPage('User:A.r.s.h./Ultimate chat.js', 'c');
importScriptPage('User:A.r.s.h./Skin switcher.js', 'c');

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 
    // BUREAUCRATS
 
  rights["A.r.s.h."]      = ["C.E.O.","Bureaucrat","Administrator","Wiki Stats Manager","Wikia God","The Most Interesting Man in the World"],
 
    // ADMINISTRATORS
 
  rights[""]        = ["Doctor","Administrator"],
  rights[""]        = ["Administrator","a crazy person"],
  rights[""] = ["Administrator "],

    // MODERATORS

  // rights[""]    = ["Moderator","Chatmod"], 

    // ROLLBACK

  // rights[""]    = ["Rollback"], 

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"]
  rights["A.r.s.h.'s_bot"]       = ["Bot"];
 

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>

//</source>