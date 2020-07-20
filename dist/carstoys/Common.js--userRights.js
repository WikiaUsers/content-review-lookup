/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Elecbullet"]         = ["Elec", "User"];
  rights["Iopl3887"] = ["Cars Lover"];
  rights["Lightening McQueen"]        = ["Helper"];
  rights["Xx$0uL$t3aL3rXx"]       = ["St3al3r"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info .tag-container');
    }
  }
});