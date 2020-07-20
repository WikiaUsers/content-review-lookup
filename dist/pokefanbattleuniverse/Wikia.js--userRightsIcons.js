// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">

// WRITTEN BY USER:RAPPY_4187, WOW Wiki, OPTIMISED BY USER:CALLOFDUTY4

$(function() {
 var rights = {};

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

 
 rights["Kululu12"]                               = ["<a href=\" http://pokefanbattleuniverse.wikia.com/index.php?title=User:Kululu12\"><span style=\" color:white;\">EPIC FROG!</span></a>","<a href=\" http:/pokefanbattleuniverse.wikia.com/index.php?title=User:Kululu12\"><span style=\" color:white;\">CHAMPION!</span></a>"],
 rights["Omega111"]                               = ["<a href=\" http://pokefanbattleuniverse.wikia.com\"><span style=\" color:white;\">ELITE FOUR!</span></a>"];

 
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