$(function() {
  var rights = {};
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
    // FOUNDERS
  rights[""]         = ["Founder","Bureaucrat Emeritus","Administrator"],
    // BUREAUCRATS
  // rights[""]      = ["Bureaucrat","Administrator"],
    // BUREAUCRATS EMERITUS
  rights[""]      = ["Bureaucrat Emeritus","Administrator"],
  rights[""]      = ["Bureaucrat Emeritus","Administrator"],
    // ADMINISTRATORS
  rights[""]        = ["Administrator"],
  rights[""]     = ["Administrator"],
    // ADMINISTRATORS EMERITUS
  rights[""]   = ["Administrator Emeritus"],
    // MODERATORS
  // rights[""]    = ["Moderator","Chatmod"], 
    // PATROLLERS
  // rights[""]    = ["Patroller"], 
    // ROLLBACK
  // rights[""]    = ["Rollback"], 
     // MISCELLANEOUS
  rights[""]         = ["Bureaucrat","Administrator","Crazy Person"],
  rights[""]         = ["Staff","Sleepless"],
   // TEST ACCTS, BOTS, & AWB
  rights["WikiaBot"]   = ["Wikia Bot"], 
  rights["Wikia"]   = ["Wikia User Bot"];
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