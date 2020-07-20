// 1:21, May 3, 2013 (UTC)
// <source lang="JavaScript">

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // BUREAUCRATS
 
  rights["KidVegeta"]      = ["KV Buddy"],
 
    // ADMINISTRATORS
 
  rights[""]        = ["Administrator"],

    // MODERATORS

  // rights[""]    = ["Moderator","Chatmod"], 
    // ROLLBACK

  // rights[""]    = ["Rollback"], 
 
     // MISCELLANEOUS
 
  // rights[""]       = ["Misc","Stuff"],

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