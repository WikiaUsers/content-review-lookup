// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, WoW Wiki, optimized by User:Callofduty4
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // BOTS
 
 rights["BonBot"]                             = ["<span style=\" color:white;\">Bot</span>"],
 rights["Grizeldroid"]                        = ["<span style=\" color:white;\">Bot</span>"],
 rights["SweetieBot"]                         = ["<span style=\" color:white;\">Bot</span>"],
 rights["URL"]                                = ["<span style=\" color:white;\">Bot</span>"],
 rights["Wikia"]                              = ["<span style=\" color:white;\">Bot</span>"],
 rights["WikiaBot"]                           = ["<span style=\" color:white;\">Bot</span>"],
 
 
   // Chat Moderators
 
 rights["BosBull52"]                          = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Demon Lord of The Round Table"]      = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Embergale"]                          = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["EquZephyr"]                          = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["EvergreenFir"]                       = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>", "<span style=\" color:white;\">Rollback</span>"],
 rights["Foodbandlt"]                         = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>", "<span style=\" color:white;\">Rollback</span>"],
 rights["JPanzerj"]                           = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Lasmoore"]                           = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["MysteriousForce"]                    = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"], 
 rights["Xx Mr Brony xX"]                     = ["<a href=\" http://mlp.wikia.com/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 
 
   //Rollback
 
 rights["Aura24"]                          = ["<span style=\" color:white;\">Rollback</span>"],
 rights["Duo2nd"]                          = ["<span style=\" color:white;\">Rollback</span>"],
 rights["Interactive Booster"]             = ["<span style=\" color:white;\">Rollback</span>"];
 
 
   //Image Control 
/*
 rights["user"]                          = ["<span style=\" color:white;\">Image Control</span>"],
 rights["user"]                          = ["<span style=\" color:white;\">Image Control</span>"];
 
 */
 
 
 // End list of accounts given extra user rights icons
 
 
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