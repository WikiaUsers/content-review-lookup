/* Any JavaScript here will be loaded for all users on every page load. */

// 19:00, July 21, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 
 rights["Werewolf333"]                               = ["<a href=\" http://dragonvaleeggs1.wikia.com/index.php?title=User:Werewolf333\"><span style=\" color:white;\">Bureaucrat</span></a>","<a href=\" http:/dragonvaleeggs1.wikia.com/index.php?title=User:Werewolf333\"><span style=\" color:white;\">Admin</span></a>","<a href=\" http:/dragonvaleeggs1.wikia.com/index.php?title=User:Werewolf333\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Adithyæ24"]                               = ["<a href=\" http://dragonvaleeggs1.wikia.com/index.php?title=User:Adithyæ24\"><span style=\" color:white;\">Bureaucrat</span></a>","<a href=\" http://dragonvaleeggs1.wikia.com/index.php?title=User:Adithyæ24\"><span style=\" color:white;\">Admin</span></a>","<a href=\" http://dragonvaleeggs1.wikia.com/index.php?title=User:Adithyæ24\"><span style=\" color:white;\">Chat Moderator</span></a>"]; 

 
 
 
 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if (wgPageName == "Special:Contributions"){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.group').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span class="group">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});
 
// </source>