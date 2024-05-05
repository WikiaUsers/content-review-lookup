// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["NecrusIV"]                               = ["<a href=\" http://evangelionfanon.wikia.com/index.php?title=User:NecrusIV\"><span style=\" color:white;\">Artist</span></a>"];
 rights["Azure Arch"]                               = ["<a href=\" http://evangelionfanon.wikia.com/index.php?title=User:Azure_Arch\"><span style=\" color:white;\">Absolutely Flawless</span></a>"];
 rights["Gearhead Otaku"]                               = ["<a href=\" http://evangelionfanon.wikia.com/index.php?title=User:Gearhead_Otaku\"><span style=\" color:white;\">Otaku</span></a>"];
 rights["Cal XD"]                               = ["<a href=\" http://evangelionfanon.wikia.com/index.php?title=User:Cal_XD\"><span style=\" color:white;\">Voice Only</span></a>"];
 rights["DirgeOfCerberus111"]                               = ["<a href=\" http://evangelionfanon.wikia.com/index.php?title=User:DirgeOfCerberus111\"><span style=\" color:white;\">Architect</span></a>"];
 
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