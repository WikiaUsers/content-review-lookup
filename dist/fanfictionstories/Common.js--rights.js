/* Any JavaScript here will be loaded for all users on every page load. */
 
// Written by User:Rappy_4187, Aion Wiki
// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // ROLLBACK
 
  rights["DragoNEX"]    = ["Book Keeper"],
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>