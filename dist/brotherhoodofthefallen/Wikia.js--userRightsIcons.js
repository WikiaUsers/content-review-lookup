/ 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:white;\">Founder</span>";
 var bcrat = "<a href=\" http://callofduty.wikia.com/index.php?title=COD:BCRAT\"><span style=\" color:white;\">Bureaucrat</span></a>";
 var sysop = "<a href=\" http://callofduty.wikia.com/index.php?title=COD:SYSOP\"><span style=\" color:white;\">Admin</span></a>";
 var blogPatrol = "<a href=\" http://callofduty.wikia.com/wiki/COD:BP\"><span style=\" color:white;\">Blog Patroller</span></a>";
 var custodian = "<a href=\" http://callofduty.wikia.com/wiki/COD:CUSTS\"><span style=\" color:white;\">Custodian</span></a>";
 var chatModerator = "<a href=\" http://callofduty.wikia.com/wiki/COD:MODS\"><span style=\" color:white;\">Chat Moderator</span></a>";
 var checkUser = "<a href=\" http://callofduty.wikia.com/index.php?title=COD:CHKUSERS\"><span style=\" color:white;\">Check User</span></a>";
 var bot = "<a href=\" http://callofduty.wikia.com/wiki/Special:ListUsers?group=bot\"><span style=\" color:white;\">Bot</span></a>";
 var URL = "<span style='color:black;background-color:white;'>Wolf Goddess</span>";
 var vstf = "<a href=\" http://community.wikia.com/wiki/Help%3ASpamTaskForce\"><span style=\" color:white;\">VSTF</span></a>";
 var councilor = "<a href=\" http://community.wikia.com/wiki/Help:Community_Council\"><span style=\" color:white;\">Councilor</span></a>";

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 rights["Azuris"]                               = [bcrat,checkUser],
 rights["MythicConditor"]                       = [bcrat], 
 rights["MythicConditor"]                       = [bcrat,vstf,checkUser],
 rights["CMythicConditor"]                      = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat,vstf,checkUser],
 rights["MythicConditor"]                       = [founder,bcrat],
 rights["MythicConditor"]                       = [bcrat,vstf,checkUser],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 rights["MythicConditor"]                       = [bcrat],
 
   // ADMINS
 
 rights["AntiScootaTwo"]                        = [sysop],
 rights["Argorrath"]                            = [sysop],
 rights["Capt. Miller"]                         = [sysop],
 rights["Carbonite 0"]                          = [sysop],
 rights["Cpl. Dunn"]                            = [sysop],
 rights["Cpl.Bohater"]                          = [sysop,vstf],
 rights["Damac1214"]                            = [sysop],
 rights["Deathmanstratos"]                      = [sysop],
 rights["Delije Sever 1989"]                    = [sysop],
 rights["Doc.Richtofen"]                        = [sysop],
 rights["Drkdragonz66"]                         = [sysop,councilor],
 rights["EightOhEight"]                         = [sysop],
 rights["Eltomo85"]                             = [sysop],
 rights["Griever0311"]                          = [sysop],
 rights["Icepacks"]                             = [sysop],
 rights["Imrlybord7"]                           = [sysop],
 rights["Joe Copp"]                             = [sysop],
 rights["Joeyaa"]                               = [sysop],
 rights["Juan Jose Rodriguez"]                  = [sysop],
 rights["Laagone"]                              = [sysop],
 rights["Legos-Rule-15"]                        = [sysop],
 rights["Madnessfan34537"]                      = [sysop],
 rights["N7"]                                   = [sysop],
 rights["Poketape"]                             = [sysop],
 rights["Raven's wing"]                         = [sysop],
 rights["Redskin-26"]                           = [sysop],
 rights["RisingSun2013"]                        = [sysop],
 rights["Smuff"]                                = [sysop],
 rights["StB"]                                  = [sysop],
 rights["Ukimies"]                              = [sysop],
 rights["Ultimate94ninja"]                      = [sysop],
 rights["WouldYouKindly"]                       = [sysop],
 
   // BOTS
 
 rights["Bot50"]                                = [bot],
 rights["BotZero"]                              = [bot],
 rights["CEBot"]                                = [bot],
 rights["Daedalus7"]                            = [bot],
 rights["Holo the Wise Wolf"]                   = [bot,URL],
 rights["Icecreambot"]                          = [bot],
 rights["MB�t"]                                 = [bot],
 rights["Neo Metal Silver"]                     = [bot],
 rights["The Prog Opus"]                        = [bot],
 rights["TyBot"]                                = [bot],
 rights["URL"]                                  = [bot,URL],
 rights["Wikia"]                                = [bot],
 
 
   // BLOG PATROLLERS, CHAT MODS AND CUSTODIANS
 
 rights["1337 SPNKR"]                           = [custodian],
 rights["Aces Creed"]                           = [chatModerator],
 rights["MythicConditor"]                       = [blogPatrol,custodian],
 rights["Dizturn"]                              = [blogPatrol,chatModerator],
 rights["DremYolLok"]                           = [blogPatrol],
 rights["FireBird-"]                            = [blogPatrol,chatModerator],
 rights["Jar teh marksman"]                     = [blogPatrol,chatModerator],
 rights["Joseph Tan"]                           = [custodian],
 rights["Just a cone"]                          = [custodian],
 rights["Inkie Twig"]                           = [chatModerator],
 rights["LazarouDave"]                          = [custodian],
 rights["Louis Bancroft"]                       = [custodian],
 rights["ParagonX7"]                            = [custodian],
 rights["Phillycj"]                             = [custodian,chatModerator],
 rights["Qw3rty!"]                              = [custodian],
 rights["RansomTime"]                           = [chatModerator,vstf],
 rights["Sgt.Sandwich"]                         = [blogPatrol],
 rights["Smilular"]                             = [custodian,chatModerator],
 rights["Sp3ctr3 130 Ki11er"]                   = [blogPatrol],
 rights["SXe Fiend"]                            = [custodian],
 rights["This username better work"]            = [chatModerator],
 rights["Twilight Maxxis"]                      = [custodian],
 rights["Verantha"]                             = [custodian,chatModerator],
 rights["Soap Shadow"]                          = [custodian,blogPatrol];
 
 
 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if ( wgPageName.indexOf("Special:Contributions") != -1 ) {
    userName = fbReturnToTitle.replace("Special:Contributions/", ""); 
    while (userName.search("_") > 0) {
        userName = userName.replace("_", " ");
    } 
} else {
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