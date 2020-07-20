// Custom user rights tags on userpages
// WRITTEN BY USER:RAPPY_4187, Aion Wiki; FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 var founder = "<span style=\" color:white;\">Founder</span>";
 var bcrat = "<span style=\" color:white;\">Bureaucrat</span>";
 var admin = "<span style=\" color:white;\">Administrator</span>";
 var patroller = "<span style=\" color:white;\">Patroller</span>";
 var rollback = "<span style=\" color:white;\">Rollback</span>";
 var chatModerator = "<span style=\" color:white;\">Chat Moderator</span>";
 var forumModerator = "<span style=\" color:white;\">Forum Moderator</span>";
 var news = "<span style=\" color:white;\">News Team</span>";

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

 rights["Ghost Anubis"] = [founder,bcrat,admin];
 rights["HumbleDaedricServant"] = [admin];
 rights["AngryEnclaveSoldier"] = [forumModerator,chatModerator];

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