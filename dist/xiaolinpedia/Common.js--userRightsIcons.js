// <source lang="JavaScript">
/* ################################################################ */
/* ####### Begin tags for various user rights: Do not edit ######## */
/* ################################################################ */
 
$(function() {
 var rights = {};
 var founderTag = "<a href='/wiki/Project:Bureaucrats'><span style='color:#000'>Xiaolin Grand Master</span></a>";
 var cratTag = "<a href='/wiki/Project:Bureaucrats'><span style='color:#000'>Xiaolin Master</span></a>";
 var adminTag = "<a href='/wiki/Project:Administrators'><span style='color:#000'>Xiaolin Dragon</span></a>";
 var patrollerTag = "<a href='/wiki/Project:Patrollers'><span style='color:#000'>Shoku Warrior</span></a>";
 var chatMod = "<a href='/wiki/Project:Chat_Moderators'><span style='color:#000'>Wudai Warrior</span></a>";
 var rollBack = "<a href='/wiki/Project:Rollback'><span style='color:#000'>Xiaolin Apprentice</span></a>";
 var botTag = "<a href='/wiki/Help:Bots'><span style='color:#000'>Bot</span></a>";
 var starTag = "<a href='/wiki/homepage:Stars'><span style='color:#000'>Wikia Star</span></a>";
 
/* ################################################################ */
/* ##### Begin list of accounts given extra user rights icons ##### */
/* ################################################################ */
 
$(function() { var rights = {};
 
// BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
// ADMINISTRATORS
 
   rights["Antonismage"]            = [adminTag], 
   rights["Ricky Spanish"]          = [founderTag], 
   rights["LevenThumps"]            = [cratTag], 
   rights["TrueThespian"]           = [adminTag], 
   rights["Yuzura"]                 = [cratTag], 
 
// PATROLLERS
 
   rights[" "]                      = [patrollerTag], 
 
// CHAT MODERATORS
 
   rights[" "]                      = [chatMod], 
 
// BOTS
 
   rights["Wikia"]                  = [botTag], 
   rights["Yuzubot"]                = [botTag];
 
/* ################################################################ */
/* ############# Adds tags to Special:Contributions ############### */
/* ################################################################ */
 
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