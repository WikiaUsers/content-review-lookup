// 00:41, JULY 5, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:ULTIMATE GOGETA
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // STAFF
  rights[""]       = ["Staff"],
  rights[""]       = ["Staff"],

    // FOUNDERS
 
  rights[""] = ["Founder",""],
 
    // BUREAUCRATS
 
  rights["Ultimate Gogeta"]      = ["Bureaucrat","Administrator"],
  // rights[""]            = ["Bureaucrat","Administrator"],
 
    // BUREAUCRATS EMERITUS
 
  rights[""] = [""],
 
    // ADMINISTRATORS
 
  rights["SaiyanAwesomeness"]        = ["Administrator"],
  rights["GogetaRules"]        = ["Administrator"],

    // ADMINISTRATORS EMERITUS
 
  rights[""] = [""],

    // MODERATORS

  // rights["The SuperNova"]    = ["Moderator","Chatmod"], 

    // PATROLLERS

  rights[""]    = [""], 
  rights[""]    = [""],
  rights[""]    = [""],

    // ROLLBACK

  // rights["Ultimate Vegito 13"]    = ["Rollback"], 
 
     // MISCELLANEOUS
 
  // rights[""]       = ["Misc","Stuff"],

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"];
 

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