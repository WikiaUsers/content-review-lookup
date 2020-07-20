// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 rights["Halo4master"]                               = ["<span style=\" color:white;\">Bureaucrat</span>"],
 rights["Vidmas7er"]                                 = ["<span style=\" color:white;\">Bureaucrat</span>"],
 rights["Helenna A-114"]                             = ["<span style=\" color:white;\">Bureaucrat</span>"],
 rights["Penis"]                             = ["<span style=\" color:white;\">Overlord of this wiki</span>"];

 
   // CHAT MODERATORS

 rights["Sgt D Grif"]                               = ["<span style=\" color:white;\">Family Friend</span>"];

 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 if (wgTitle == "Contributions") {
      var user = fbReturnToTitle.substring(fbReturnToTitle.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});
 
// </source>