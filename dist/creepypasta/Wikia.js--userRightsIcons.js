$(function() {
 var rights = {};
 var botTag = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Bots'><span style='color:white'>Bot</span></a>";
 var imageControl = "<a href='http://mlp.wikia.com/wiki/Forum:Image_control_group_nomination_thread'><span style='color:white'>Image Control</span></a>";
 var chatMod = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat'><span style='color:white'>Chat Moderator</span></a>";
 var adminTag = "<a href='http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'>Admin</span></a>";
 var rollBack = "<a href='http://mlp.wikia.com/wiki/Forum:Rollback_group_nomination_thread'><span style='color:white'>Rollback</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // BOTS
 
 rights["CPwikiCHATlogger"]                             = [botTag],
 rights["RobotofMadness"]                    = [botTag, adminTag],
 
 
   // Chat Moderators
 
 rights["Business Cat"]                       = [chatMod],
 rights["Dream Hacked"]                      = [chatMod],
 
  //Administrators
 
 rights["EvraVon53"]                          = [adminTag],
 rights["Shining-Armor"]                        = ["<span style='color:white'>MediaWiki</span>", adminTag],
 rights["ClericofMadness"]                         = [adminTag],
 rights["Shingami.Eyes"]                    = [adminTag],
 rights["Weirdozzy"]                         = [adminTag];
 
   //Rollback
 
 
   //Image Control 
 

 
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
 
// </source>