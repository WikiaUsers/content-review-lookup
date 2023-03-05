// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["Ryll Shados"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:Ryll+Shados\"><span style=\" color:white;\">Senior Bookwyrm</span></a>"];
 rights["Halofan99"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:Halofan99\"><span style=\" color:white;\">Bookwyrm</span></a>"];
 rights["Argyos Maestre"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:Argyos+Maestre\"><span style=\" color:white;\">Sir Argy</span></a>"];
 rights["Clawgerber"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:Clawgerber\"><span style=\" color:white;\">Chaos Mage Mod</span></a>"];
 rights["Phynix05"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:Phynix05\"><span style=\" color:white;\">Lady Phy</span></a>"];

 rights["BlueBruin77"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:BlueBruin77\"><span style=\" color:white;\">Honorary Bookkeeper</span></a>"];
rights["BloodAdept"]                               = ["<a href=\" http://bookwyrm.wikia.com/index.php?title=User:BloodAdept\"><span style=\" color:white;\">Data Entry Clerk</span></a>"]
 
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