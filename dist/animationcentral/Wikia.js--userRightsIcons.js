// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["A.r.s.h."]                               = ["<a href=\" http://animationcentral.wikia.com/index.php?title=User:A.r.s.h.\"><span style=\" color:white;\">Bureaucrat</span></a>","<a href=\" http://animatincentral.wikia.com/index.php?title=User:A.r.s.h.\"><span style=\" color:white;\">The Wiki God</span></a>"],
],
 rights["EdBoy3"]                               = ["<a href=\" http://beyblade.wikia.com/index.php?title=User:EdBoy3\"><span style=\" color:white;\">Bureaucrat</span></a>","<a href=\" http://beyblade.wikia.com/index.php?title=User:Manaphy12342\"><span style=\" color:white;\">Soup Nazi</span></a>"],
 rights["Poisoned Ivy"]                               = ["<a href=\" http://beyblade.wikia.com/index.php?title=User:Manaphy12342\"><span style=\" color:white;\">Disrespects the Wiki God</span></a>"];
 rights["Kululu12"]                               = ["<a href=\" http://beyblade.wikia.com/index.php?title=User:Manaphy12342\"><span style=\" color:white;\">Seriously. Seriously? SERIOUSLY?!</span></a>"];
 
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