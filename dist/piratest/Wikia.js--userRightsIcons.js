

// 02:55, August 2, 2013 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:Aaron9999
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:white;\">Founder</span>";
 var bcrat = "<a href=\" http://piratest.wikia.com/index.php?title=Aaron9999's_Test_Wiki:Bureacrat\"><span style=\" color:white;\">Bureaucrat</span></a>";
 var inactiveBcrat = "<a href=\" http://piratest.wikia.com/index.php?title=COD:INBCRAT\"><span style=\" color:white;\">Inactive Bureaucrat</span></a>";
 var sysop = "<a href=\" http://piratest.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Admin</span></a>";
 var inactiveSysop = "<a href=\" http://piratest.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>";
 var blogPatrol = "<a href=\" http://piratest.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>";
 var custodian = "<a href=\" http://piratest.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>";
 var chatModerator = "<a href=\" http://piratest.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>";
 var checkUser = "<a href=\" http://piratest.wikia.com/index.php?title=COD:CHKUSERS\"><span style=\" color:white;\">Check User</span></a>";
 var bot = "<a href=\" http://piratest.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>";
 var URL = "<span style='color:black;background-color:white;'>Aaron9999</span>";
 var vstf = "<a href=\" http://community.wikia.com/wiki/Help%3ASpamTaskForce\"><span style=\" color:white;\">VSTF</span></a>";
 var councilor = "<a href=\" http://community.wikia.com/wiki/Help:Community_Council\"><span style=\" color:white;\">Councilor</span></a>";

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 rights["Aaron9999"]                               = [bcrat],
 
   // INACTIVE BUREAUCRATS
 
   // ADMINS

 right["Thomas Macwrecker"]                        = [Admin of POTCOW],
 
   // INACTIVE ADMINS
 
   // BOTS

 
   // BLOG PATROLLERS
 
   // CHAT MODERATORS
 
   // CUSTODIANS
 
 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if (wgPageName.indexOf("Special:Contributions") != -1){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});
 
// </source>