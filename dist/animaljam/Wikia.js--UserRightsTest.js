// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:;\">Founder</span>";
 var bcrat = "<span style=\" color:;\">Bureaucrat</span>";
 var inactiveBcrat = "<span style=\" color:;\">Inactive Bureaucrat</span>";
 var sysop = "<span style=\" color:;\">Administrator</span>";
 var inactiveSysop = "<span style=\" color:;\">Inactive Admin</span>";
 var blogPatrol = "<span style=\" color:;\">Blog Patrol</span>";
 var custodian = "<span style=\" color:;\">Custodian</span>";
 var chatModerator = "<span style=\" color:;\">Chat Moderator</span>";
 var checkUser = "<span style=\" color:;\">Check User</span>";
 var bot = "<span style=\" color:;\">Bot</span>";
 var URL = "<span style='color:black;background-color:white;'>Dragoness</span>";
 var vstf = "<span style=\" color:;\">VSTF</span>";
 var councilor = "<a href=\" http://community.wikia.com/wiki/Help:Community_Council\"><span style=\" color:;\">Councilor</span></a>";
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 
 rights["652Graystripe"]                              = [bcrat],
 rights["Cheif Spiritstone"]                            = [bcrat],
 
 
   // INACTIVE BUREAUCRATS
 
 rights["Sageleaf"]                           = [founder,inactiveBcrat],
 rights["Ghostpony"]                              = [inactiveBcrat],
 rights["JagurStar198"]                              = [inactiveBcrat],
 
 
   // ADMINS
 
 rights["Klintran"]                             = [sysop,custodian,blogPatrol],
 rights["UniversalGalaxies"]                         = [sysop],
 rights["Anakin Jared"]                           = [sysop],
 rights["Diamonddragon88"]                          = [sysop],
 rights["Froststar1"]                                = [sysop],
 
 
   // INACTIVE ADMINS
 
 rights["NotName"]                            = [inactiveSysop],
 rights["YesName"]                              = [inactiveSysop],
 
   // BOTS
 
 rights["KlinBot"]                                = [bot],
 rights["Animal Jam Wiki Bot"]                              = [bot],
 rights["Wikia"]                                = [bot],
 
 
   // BLOG PATROLLERS
 
 rights["Diegox223"]                            = [blogPatrol],
 
   // CHAT MODERATORS
 
 rights["Icefern"]                           = [chatModerator,vstf],
 rights["Puppygirl1244"]            = [chatModerator,custodian]
 
   // CUSTODIANS
 
 
 rights["Legofanyoda1547"]                             = [custodian,chatModerator],
 rights["KlintBot"]                            = [custodian],
 rights["Bot K"]                        = [custodian,chatModerator,blogPatrol],
 rights["Hurrican75"]                             = [custodian,chatModerator];
 
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