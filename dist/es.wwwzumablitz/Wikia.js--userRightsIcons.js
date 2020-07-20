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
 
 rights["Frio123"]                             = ["<span style=\" color:white;\">Bot</span>"],
 rights["Foodbot"]                            = ["<span style=\" color:white;\">Bot</span>"],
 rights["Grizeldroid"]                        = ["<span style=\" color:white;\">Bot</span>"],
 rights["SweetieBot"]                         = ["<span style=\" color:white;\">Bot</span>"],
 rights["URL"]                                = ["<span style=\" color:white;\">Bot</span>"],
 rights["Wikia"]                              = ["<span style=\" color:white;\">Bot</span>"],
 rights["WikiaBot"]                           = ["<span style=\" color:white;\">Bot</span>"],

 
   // Chat Moderators
 
 rights["CatastrophicPony"]                   = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Demon Lord of The Round Table"]      = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Dr. Frohman"]                        = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Embergale"]                          = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["EquZephyr"]                          = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Jonbuddy1"]                          = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["JPanzerj"]                           = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>", "<span style=\" color:white;\">Image Control</span>"],
 rights["Lasmoore"]                           = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["MysteriousForce"]                    = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>", "<span style=\" color:white;\">Image Control</span>"], 
 rights["Ocredan"]                            = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>", "<span style=\" color:white;\">Image Control</span>", "<span style=\" color:white;\">Rollback</span>"], 
 rights["Oneforseven"]                        = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Xx Mr Brony xX"]                     = ["<a href=\" http://es.wwwzumablitz.wikia.com/wiki/Frio123_Wikia:Chat\"><span style=\" color:white;\">Chat Moderator</span></a>"],


   //Rollback

 rights["Frio123"]                          = ["<span style=\" color:white;\">Rollback</span>"],
 rights["Duo2nd"]                          = ["<span style=\" color:white;\">Rollback</span>"],
 rights["EvergreenFir"]                    = ["<span style=\" color:white;\">Rollback</span>", "<span style=\" color:white;\">Image Control</span>"],
 rights["Interactive Booster"]             = ["<span style=\" color:white;\">Rollback</span>"],

   
   //Image Control 

 rights["FoxofRarity"]                          = ["<span style=\" color:white;\">Image Control</span>"];


 
 
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