// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:MythicConditor, Clone Wars Wiki
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BUREAUCRATS
 
  rights["MythicConditor"]     = ["Founder of BotF", "Website creator and Owner"],
  
    // ADMINS
                 
  rights["DJ Zoobith"]         = ["Former Admin", " Former Design Artist"],
  rights["Cmser"]              = ["Admin", "Chat moderator"],
 
    // INACTIVE ADMINS
 
  rights["Tlock69"]            = ["Former Admin", "Erotic Pharmacist"],
  rights["ZesT Truths"]        = ["Inactive Admin"],
 
    // MODERATORS
 
  rights["ZesT Wawiaa"]        = ["Moderator"], 
  
    // INACTIVE MODERATORS
 
    // PATROLLERS
  
    // INACTIVE PATROLLERS
  
    // INACTIVE CHAT-MODERATORS

   // BOTS

  rights["BotF Website Bot"]    =["Bot", "Bureaucrat"];
  
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead').length) {
    addMastheadTags();
  }
});

// </source>