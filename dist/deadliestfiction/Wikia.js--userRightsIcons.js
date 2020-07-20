// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 

 
   // Chat Moderators

 //rights["Richard Starkey"]      = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Chat_Moderators\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 //rights["Wassboss"]                        = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Chat_Moderators\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 //rights["El Alamein"]                          = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Chat_Moderators\"><span style=\" color:white;\">Chat Moderator</span></a>"],
 


   // Rollback

 //rights["So-Pro Warrior"]                        = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Rollback\"><span style=\" color:white;\">Rollback</span></a>"],
 //rights["Sith Venator"]                          = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Rollback\"><span style=\" color:white;\">Rollback</span></a>"],
// rights["Dr. Las Moore"]                          = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Rollback\"><span style=\" color:white;\">Rollback</span></a>"], 


  // Bureaucrats

//   rights["MrPacheco101"]      = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Bureaucrat</span></a>"],
 rights["Leolab"]                        = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Bureaucrat</span></a>"],
 rights["Cfp3157"]                          = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Bureaucrat</span></a>"],

 // Admins

  rights["WanderingSkull"]                        = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Admin</span></a>"],
  rights["Wassboss"]                        = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Admin</span></a>"],
 rights["Beastman14"]                          = ["<a href=\" http://deadliestfiction.wikia.com/wiki/Deadliest_Fiction_Wiki:Administrators\"><span style=\" color:white;\">Admin</span></a>"];

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