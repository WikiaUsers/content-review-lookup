// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["Ryll Shados"]                               = ["<a href=\" http://bringbacklegouniverse.wikia.com/index.php?title=User:Ryll+Shados\"><span style=\" color:white;\">the bug in the system</span></a>"];
 rights["ThePawn"]                               = ["<a href=\" http://bringbacklegouniverse.wikia.com/index.php?title=User:ThePawn\"><span style=\" color:white;\">The King Of All Pawns</span></a>"];
 rights["SSROCK101"]                               = ["<a href=\" http://bringbacklegouniverse.wikia.com/index.php?title=User:SSROCK101\"><span style=\" color:white;\">Legendary Builder</span></a>"];
 rights["River12347"]                               = ["<a href=\" http://bringbacklegouniverse.wikia.com/index.php?title=User:River12347\"><span style=\" color:white;\">Necromorph Slayer</span></a>"];
 
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