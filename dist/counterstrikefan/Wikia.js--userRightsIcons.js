// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:CallofDuty5, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 var botTag = "<span style='color:white'>Bot</span>";
 var imageControl = "<a href='http://counterstrikefan.wikia.com/wiki/Forum:Image_control_group_nomination_thread'><span style='color:white'>Image Control</span></a>";
 var chatMod = "<a href='http://counterstrikefan.wikia.com/wiki/Counter Strike Fanon:Chat'><span style='color:white'>Chat Moderator</span></a>";
 var adminTag = "<a href='http://mlp.wikia.com/wiki/Counter Strike Fanon:Administrators'><span style='color:white'>Adminstrator</span></a>";
 var rollBack = "<span style='color:white'>Rollback</span>";
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.

// BOTS

// Chat Moderators

//Administrators

 rights["CallofDuty5"]               = [adminTag],

//Rollbacks

  //Image Control 

//Other

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