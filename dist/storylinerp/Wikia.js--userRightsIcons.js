// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 rights["Omega111"]                               = ["<a href=\" http://storylinerp.wikia.com\"><span style=\" color:white;\">King</span></a>"];
 
 rights["Kululu12"]                               = ["<a href=\" http://storylinerp.wikia.com\"><span style=\" color: Silver;\">Commander of Kings</span></a>"];
 
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