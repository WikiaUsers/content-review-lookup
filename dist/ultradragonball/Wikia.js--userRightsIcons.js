// 13:07, May 18, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:GOTEK
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // STAFF
  rights["Kirkburn"]       = ["Staff","Bureaucrat Emeritus","Administrator"],
  rights["Raylan13"]       = ["Staff","Sleepless"],

    // FOUNDERS
 
  rights[""] = ["Founder",""],
 
    // BUREAUCRATS
 
  rights["DrAssassin"]      = ["Bureaucrat","Administrator","Master Assassin","Guardiano"],
  // rights[""]            = ["Bureaucrat","Administrator"],
 
    // BUREAUCRATS EMERITUS
 
  rights[""] = [""],
 
    // ADMINISTRATORS
 
  rights["AssassinHood"]        = ["Administrator","Eternal Dragon","Diamond Assassin"],
  rights["Daimaō"]        = ["Administrator","Demon King","Legendary Super Namek","Lord of Darkness"],

    // ADMINISTRATORS EMERITUS
 
  rights[""] = [""],

    // MODERATORS

  // rights[""]    = ["Moderator","Chatmod"], 

    // PATROLLERS

  rights[""]    = [""], 
  rights[""]    = [""],
  rights[""]    = [""],

    // ROLLBACK

  // rights[""]    = ["Rollback"], 
 
     // MISCELLANEOUS
 
  // rights[""]       = ["Misc","Stuff"],

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"];
 

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