// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};

    // FOUNDERS

    rights["JamesonOTP"]         = ["Founder","Bureaucrat","Head Admin", "Chat Mod"],

    // BUREAUCRATS

    rights["Zinnia3"]      = ["Bureaucrat","Co-Second Admin", "Chat Mod"],
    rights["PraeOTP"]           = ["Bureaucrat","Co-Second Admin", "Chat Mod"],
    rights["Fallin'"]          = ["Bureaucrat","Admin","Chat Mod"],
      
    
    

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