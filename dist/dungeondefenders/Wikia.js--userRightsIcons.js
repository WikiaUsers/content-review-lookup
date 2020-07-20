// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BUREAUCRATS
 
   rights["Ltearth"]         = ["Bureaucrat"],
 
    // INACTIVE ADMINS
 
  rights["Jetah"]               = ["Inactive Admin"],
  rights["RighteousRage"]              = ["Inactive Admin"],
 
    // MODERATORS

    // INACTIVE MODERATORS

    // PATROLLERS
 
  rights["Guyde"] = ["Patroller"];
 
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