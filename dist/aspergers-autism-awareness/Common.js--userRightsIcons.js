// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 var botTag = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Bots'><span style='color:white'>Bot</span></a>";
 var imageControl = "<a href='http://mlp.wikia.com/wiki/Forum:Image_control_group_nomination_thread'><span style='color:white'>Image Control</span></a>";
 var chatMod = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat'><span style='color:white'>Chat Moderator</span></a>";
 var adminTag = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'>Admin</span></a>";
 var rollBack = "<a href='http://mlp.wikia.com/wiki/Forum:Rollback_group_nomination_thread'><span style='color:white'>Rollback</span></a>";
 var VSTF = "<a href='http://mlp.wikia.com/wiki/Help:VSTF'><span style='color:white'>VSTF</span></a>";
 var councilor = "<a href='http://mlp.wikia.com/wiki/Help:Community_Council'><span style='color:white'>Councilor</span></a>";
 var star = "<a href='http://www.wikia.com/Stars'><span style='color:white'>Wikia Star</span></a>";
 var founder = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'><span style='color: white'>Founder</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
 // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.

   // BOTS

 rights["ShadowBot343"]                       = [botTag],
 rights["Wikia"]                              = [botTag],
 rights["WikiaBot"]                           = [botTag],

   // Chat Moderators

 rights["Master Ceadeus 27"]                  = [chatMod],
 rights["Meowingtons Brony"]                  = [chatMod], 

   //Administrators

 rights["Aaron999"]                           = [adminTag],
 rights["CoolioDoolio93"]                     = [adminTag],
 rights["Demon Lord of The Round Table"]      = [adminTag],
 rights["ShadowLurker343"]                    = [founder],

 // End list of accounts given extra user rights icons
 

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

//***************
// Adds link to Special:Contributions for "Banned From Chat" tags
//***************

if ($('span.tag:contains("Banned From Chat")').length == 1){
 $('span.tag:contains("Banned From Chat")').wrap("<a href='/wiki/Special:Contributions/"+wgTitle.replace(' ', '_')+"' style='color:white;'></a>");
}
 
// </source>