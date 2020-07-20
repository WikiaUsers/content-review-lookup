// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:white;\">Founder</span>";
 var sysop = "<a href=\" http://callofduty.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Admin</span></a>";
 var chatModerator = "<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>";
 var regalis = "<span style=\" color:white;\">Creator of Containment Breach</span>";
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // FOUNDER
 
 rights["Dr.Mark"]                              = [founder,sysop],
 rights["Tremorfan94"]                          = [founder,sysop],
 rights["Mrpeanut188"]                          = [founder,sysop],
 
   // ADMINS
 
 rights["Regalis11"]                            = [regalis,sysop],
 rights["Steelpoint"]                           = [sysop],
 rights["Omniary"]                              = [sysop],
 
   // CHAT MODERATORS
 
 rights["Z-Bites"]                              = [chatModerator],
 
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