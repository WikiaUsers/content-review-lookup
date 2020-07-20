// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Example"] = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
  rights["Example"]  = ["Bureaucrat","Administrator"],
 
    // ADMINISTRATORS
 
  rights["Example"]         = ["Administrator"],
 
    // ROLLBACK
 
  rights["Example"]          = ["Rollback"],
 
    // CHATMODS
 
  rights["Example"]          = ["Chatmod"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]        = ["Wikia Bot"]; 
  rights["Wikia"]           = ["Wikia Bot"];
  rights["Example Bot"]     = ["Bot"];
 
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