// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // STAFF
  rights["Raylan13"]       = ["Staff","Sleepless"],

    // FOUNDERS
 
  rights["Themagicthief"] = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS

  // rights[""]    = ["Bureaucrat"],  
  
    // ADMINISTRATORS 

  // rights[""]    = ["Administrator"],  

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
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>