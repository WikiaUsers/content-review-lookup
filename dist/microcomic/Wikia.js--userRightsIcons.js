// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">

// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki

$(function() {
 var rights = {};

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

   // BUREAUCRATS

 rights["Emperor Andrew"]                               = ["<a href=\" http://microcomic.wikia.com/index.php?title=MicroComic:BCRAT\"><span style=\" color:white;\">Bureaucrat</span></a>","<a href=\" http://callofduty.wikia.com/index.php?title=COD:CHKUSERS\"><span style=\" color:white;\">Check User</span></a>"],


   // INACTIVE BUREAUCRATS

 

   // ADMINS
 
 rights["SaluteChicken"]                          = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Admin</span></a>"],



   // INACTIVE ADMINS
 
 rights["Cpl. Dunn"]                            = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["EightOhEight"]                         = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["Griever0311"]                          = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["Joeyaa"]                               = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["Juan Jose Rodriguez"]                  = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["StB"]                                  = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["WouldYouKindly"]                       = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:INSYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["Icepacks"]                             = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],
 rights["Ukimies"]                              = ["<a href=\" http://callofduty.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Inactive Admin</span></a>"],

   // BOTS

 rights["Bot50"]                                = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["BotZero"]                              = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["CEBot"]                                = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["Daedalus7"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["Icecreambot"]                          = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["Neo Metal Silver"]                     = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["The Prog Opus"]                        = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["TyBot"]                                = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],
 rights["URL"]                                  = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>","<span style='color:black;background-color:white;'>Dragoness</span>"],
 rights["Wikia"]                                = ["<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>"],


   // BLOG PATROLLERS

 rights["DarkMetroid567"]                       = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Dizturn"]                              = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["FireBird-"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Jar teh marksman"]                     = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Sgt.Sandwich"]                         = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>"],
 rights["Sp3ctr3 130 Ki11er"]                   = ["<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],

   // CHAT MODERATORS

 rights["Randomtime"]                           = ["<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>","<a href=\" http://community.wikia.com/wiki/Help%3ASpamTaskForce\"><span style=\" color:white;\">VSTF</span></a>"],
 rights["Vulpes Twigy"]                         = ["<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],

   // CUSTODIANS

 rights["1337 SPNKR"]                           = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["AdvancedRookie"]                       = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Argorrath"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Doctor Richtoffee"]                    = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Hax 217"]                              = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Jako7286"]                             = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Joeytje50"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Joseph Tan"]                           = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["JPanzerj"]                             = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Maj. Blackout"]                        = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Mr. Expert"]                           = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Nikolai Cannot Die"]                   = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["ParagonX7"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Phillycj"]                             = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["Rambo362"]                             = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Reznov115"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["Smilular"]                             = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>","<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 rights["SXe Fiend"]                            = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"],
 rights["The Wikia Contributor"]                = ["<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>"];

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