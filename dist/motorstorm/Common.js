/* Any JavaScript here will be loaded for all users on every page load. */

// Written by User:RAPPY_4187, Aion Wiki
// Currently maintained by Trellar
// Last Updated August 15, 2012  (UTC)
// <source lang="JavaScript">

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // ROLLBACK
 
  rights["Killercrusher232"]    = ["Chat Monitor"],
  
 
    // INACTIVE
 
  rights["MetaCracken"]      = ["Bureaucrat"];
 
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