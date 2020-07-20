// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["BlazingLightFire"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:BlazingLightFire\"><span style=\" color:white;\">Head Monster</span></a>"];
 rights["SilverMarsh"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:SilverMarsh\"><span style=\" color:white;\">Count Dracula</span></a>"];
 rights["SpanishConqueror"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:SpanishConqueror\"><span style=\" color:white;\">Count Dracula</span></a>"];
 rights["Clawgerber"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:Clawgerber\"><span style=\" color:white;\">Alpha Werewolf</span></a>"];
 rights["Lilbuddy"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:Lilbuddy\"><span style=\" color:white;\">Alpha Werewolf</span></a>"];
  rights["Ryll Shados"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:Ryll+Shados\"><span style=\" color:white;\">Alpha Werewolf</span></a>"];
 rights["Pickle786™"]                               = ["<a href=\" http://mythicalmania.wikia.com/index.php?title=User:Pickle786™\"><span style=\" color:white;\">Haunted Keeper</span></a>"];

 
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