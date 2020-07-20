/* Any JavaScript here will be loaded for all users on every page load. */

// Adds Extra User Rights Icons
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
     // FOUNDERS
 
  rights[""] = ["Founder"]
 
    // BUREAUCRATS
 
  rights["Scourge the Dark Claw"]      = ["Bureaucrat"],
  rights["Dynovan"]      = ["Bureaucrat"],

    // ADMINISTRATORS
 
  rights["Sunriseondarkenedseas"]        = ["Administrator"],    
  rights["Raadec"]        = ["Administrator"],
 
 
    // MODERATORS
 
     rights[""]    = ["Chat moderator"],
 
    // ROLLBACK
 
     rights[""]    = ["Rollback"], 
 
   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Bot"], 
  rights["Wikia"]          = ["Bot"]
 
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
// END Extra User Rights Icons