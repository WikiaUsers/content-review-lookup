// Last updated: 07:01, 2014 June 03
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var checkUser = "<a href='/wiki/Help:Checkuser'><span style='color:white'>Check User</span></a>";
 var founder = "<a href='/wiki/Project:User Rights#Bureaucrats'><span style='color:white'>Founder</span></a>";
 var cratTag = "<a href='/wiki/Project:User Rights#Bureaucrats'><span style='color:white'>Bureaucrat</span></a>";
 var adminTag = "<a href='/wiki/Project:User Rights#Administrators'><span style='color:white'>Administrator</span></a>";
 var chatMod = "<a href='/wiki/Project:User Rights#Chat Moderator'><span style='color:white'>Chat Moderator</span></a>";
 var rollBack = "<a href='/wiki/Help:Rollback'><span style='color:white'>Rollback</span></a>";
 var botTag = "<a href='/wiki/Project:User Rights#Bots'><span style='color:white'>Bot</span></a>";
 var starTag = "<a href='http://wikia.com/Stars'><span style='color:white'>Wikia Star</span></a>";
 var interfaceTag = "<a href='/wiki/Project:User Rights#Interface Editors'><span style='color:white'>Interface Editor</span></a>";
 var headofTag = "<a href='/wiki/Project:User Rights#Head of Command'><span style='color:white'>Head of Command</span></a>";
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

   // ADMINS
 
 rights["KCCreations"]                            = [adminTag];

   // FOUNDER
 
 rights["Dragonleaf5678"]                         = [founder, interfaceTag, headofTag];
 
   // BOTS
   
 rights["Little Codec"]                           = [botTag];
 
   // INTRERFACE EDITORS (excluding Dragonleaf5678)
   
 rights["Penguin-Pal"]                            = [interfaceTag, adminTag];

 
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