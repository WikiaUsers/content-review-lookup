// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["NgoRocktoro"] = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
  rights["Mathmagician"]  = ["Bureaucrat","Administrator"],
  rights["Chris Odinsen"] = ["Bureaucrat","Administrator"],
  rights["LumpZ"] = ["Bureaucrat","Administrator"],
  rights["The Pathogen"] = ["Bureaucrat","Administrator","Template Designer"]

    // ADMINISTRATORS

  rights["Exshooter101"] = ["Administrator"]
 
    // ROLLBACK
 
    // TEST ACCTS, BOTS, & AWB
 
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