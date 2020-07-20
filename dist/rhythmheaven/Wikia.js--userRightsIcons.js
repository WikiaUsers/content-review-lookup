// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 var botTag = "<a href='/wiki/Project:Bots'><span style='color:white'>Bot</span></a>";
 var chatMod = "<a href='/wiki/Project:Chat_Moderators'><span style='color:white'>Chat Moderator</span></a>";
 var adminTag = "<a href='/wiki/Project:Administrators'><span style='color:white'>Administrator</span></a>";
 var cratTag = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Bureaucrat</span></a>";
 var rollBack = "<a href='/wiki/Project:Rollback'><span style='color:white'>Rollback</span></a>";
 var starTag = "<a href='http://wikia.com/Stars'><span style='color:white'>Wikia Star</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
 // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
   // BOTS
 
 rights["Thisismybot"]                        = [botTag],
 rights["Yuzubot"]                            = [botTag],
 rights["URL"]                                = [botTag],
 rights["Wikia"]                              = [botTag],
 rights["WikiaBot"]                           = [botTag],
 
   //Administrators
 
 rights["PaperScarf"]                         = [adminTag, cratTag],
 rights["Yami Arashi"]                        = [adminTag, cratTag, starTag],
 
   //Other
 
 rights["James233"]                            = ["Founder"];
 
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
 
//***************
// Adds link to Special:Contributions for "Banned From Chat" tags
//***************
 
if ($('span.tag:contains("Banned From Chat")').length == 1){
 $('span.tag:contains("Banned From Chat")').wrap("<a href='/wiki/Special:Contributions/"+wgTitle.replace(' ', '_')+"' style='color:white;'></a>");
}
 
// </source>