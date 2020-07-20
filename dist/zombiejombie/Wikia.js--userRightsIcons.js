// Written by User:Rappy_4187, Aion Wiki
// <source lang="JavaScript">

$(function() {
  var rights = {};
 
  rights["RedReaper83"] = ["Founder","Bureaucrat","Zombie Administrator"],
  rights["DinoKev"]      = ["Bureaucrat","Zombie Administrator","Zombie Dino"],
  rights["Gunk Man"]      = ["Zombie Administrator"],

    // MODERATORS

  // rights[""]    = ["Moderator","Chatmod"], 


    // ROLLBACK

  // rights[""]    = ["Rollback"], 
 
     // MISCELLANEOUS
 
  // rights[""]       = ["Misc","Stuff"],

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"];
  rights["Abuse filter"]          = ["Abuse filter"];
 

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