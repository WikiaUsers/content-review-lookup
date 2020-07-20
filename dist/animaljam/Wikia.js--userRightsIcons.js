// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:white;\">Founder</span>";
 var bcrat = "<a href=\" http://animaljam.wikia.com/wiki/Special:ListUsers/bureaucray\"><span style=\" color:white;\">Bureaucrat</span></a>";
 var inactiveBcrat = "<span style=\" color:white;\">Inactive Bureaucrat</span>";
 var sysop = "<a href=\" http://animaljam.wikia.com/wiki/Help:Sysop\"><span style=\" color:white;\">Administrator</span></a>";
 var custodian = "<a href=\" http://animaljam.wikia.com/wiki/Special:ListUsers/commentcontron\"><span style=\" color:white;\">Custodian</span></a>";
 var chatModerator = "<a href=\" http://animaljam.wikia.com/wiki/Special:ListUsers/chatmoderator\"><span style=\" color:white;\">Chat Moderator</span></a>";
 var bot = "<a href=\" http://animaljam.wikia.com/wiki/Special:ListUsers/bot\"><span style=\" color:white;\">Bot</span></a>";
 var vstf = "<a href=\" http://community.wikia.com/wiki/Help%3ASpamTaskForce\"><span style=\" color:white;\">VSTF</span></a>";
 var councilor = "<a href=\" http://community.wikia.com/wiki/Help:Community_Council\"><span style=\" color:white;\">Councilor</span></a>";

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 rights["652Graystripe"]                          = [bcrat],
 rights["UniversalGalaxies"]                              = [bcrat],
 rights["~Chief~"]                            = [bcrat],
 
 
   // INACTIVE BUREAUCRATS
 
 rights["Ghost Pony"]                           = [inactiveBcrat],
 rights["JaguarStar190"]                              = [founder,inactiveBcrat],
 
   // ADMINS
 
 rights["Roadhawk"]                            = [sysop],
 rights["Diamonddragon88"]                          = [sysop],
 rights["NightshadeTheWolf"]             = [sysop],
 rights["Icefern"]                          = [sysop],

   // INACTIVE ADMINS
 
 
   // BOTS
 
 rights["Hawkbot"]                                = [bot],
 rights["T7-O1"]                              = [bot],
 rights["HenchBot"]                                = [bot],
 rights["HarryBot"]                            = [bot],

   // CHAT MODERATORS
 
 rights["Emerald Pup"]                           = [chatModerator],
 rights["Asmodeous Paradoxicus Z"]            = [chatModerator],
 rights["Froststar1"]            = [chatModerator],
 
   // CUSTODIANS
 
 rights["Koalala101"]                           = [custodian],
 rights["IndigoPi"]                           = [custodian],
 rights["Hurricane75"]                            = [custodian],
 rights["Emerald Pup"]                             = [custodian,chatModerator],
 rights["Asmodeous Paradoxicus Z"]                             = [custodian,chatModerator],
 rights[OFFICIALHARRY"]                            = [custodian],

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