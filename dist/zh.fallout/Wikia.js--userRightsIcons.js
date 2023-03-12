// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BUREAUCRATS
 
  rights["SigmaDelta54"]         = ["行政员"];

    // INACTIVE ADMINS

    // MODERATORS

    // INACTIVE MODERATORS

    // PATROLLERS

    // INACTIVE PATROLLERS

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