// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS
 
 rights["Vidmas7er"]                               = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Administrators\"><span style=\" color:white;\">Bureaucrat</span></a>",
 
   // ADMINS
 
 rights["RavenRT"]                          = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Administrators\"><span style=\" color:white;\">Administrator</span></a>"],
 
   // CHAT MODERATORS
 
 rights["Dr Frostbite228"]                         = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Chat#Chat Moderators\"><span style=\" color:white;\">Chat Guardian</span></a>"],"<span style=\" color:white;\">Trusted Author</span>",
 rights["GLaDOS114"]                         = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Chat#Chat Moderators\"><span style=\" color:white;\">Chat Guardian</span></a>"],
 
   // TRUSTED AUTHORS
 
 rights["Dr Frostbite228"]                         = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Chat#Chat Moderators\"><span style=\" color:white;\">Chat Guardian</span></a>"],
 rights["GLaDOS114"]                         = ["<a href=\" http://halohub.wikia.com/wiki/Halo_Hub:Chat#Chat Moderators\"><span style=\" color:white;\">Chat Guardian</span></a>"],
 
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