/* ################################################################ */
/* ####### Begin tags for various user rights: Do not edit ######## */
/* ################################################################ */
 
$(function() {
 var rights = {};
 var founderTag = "Creator";
 
 var cratTag = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Ruler</span></a>";
 
 var adminTag = "<a href='/wiki/Project:Administrators'><span style='color:white'>Deity</span></a>";
 
 var patrollerTag = "<a href='/wiki/Project:Patrollers'><span style='color:white'>Reaper</span></a>";
 
 var custodianTag = "<a href='/wiki/Project:Custodians'><span style='color:white'>Assassin</span></a>";
 
 var rollBack = "<a href='/wiki/Project:Rollback'><span style='color:white'>Alchemist</span></a>";
 
 var chatMod = "<a href='/wiki/Project:Chat_Moderators'><span style='color:white'>Guardian</span></a>";
 
 var botTag = "<a href='/wiki/Help:Bots'><span style='color:white'>Bot</span></a>";
 
 var starTag = "<a href='/wiki/homepage:Stars'><span style='color:white'>Wikia Star</span></a>";
 
/* ################################################################ */
/* ##### Begin list of accounts given extra user rights icons ##### */
/* ################################################################ */
 
   // BOTS
 
 rights["Yuzubot"]                            = [botTag],
 rights["Wikia"]                              = [botTag],
 rights["WikiaBot"]                           = [botTag],
 
   //Administrators
 
 rights["Ezio Editore da California"]         = [adminTag],
 rights["Miricle1778"]                        = [adminTag, cratTag],
 rights["Midori Phénix"]                      = [adminTag],
 rights["Yuzura"]                             = [founderTag, adminTag, cratTag, starTag],
 
   //Custodians and Patrollers
 
 rights[" "]                                  = [patrollerTag],
 rights[" "]                                  = [custodianTag],
 
   //Rollback
 
 rights["XxGodZerxesxX"]                      = [rollBack],
 rights["DeviantSerpent"]                     = [rollBack, patrollerTag],
 
   // Chat Moderators
 
 rights["27finnsprincess"]                    = [chatMod],
 rights["Arishok Frieza"]                     = [chatMod, rollBack],
 rights["ParadoxSpiral"]                      = [chatMod, patrollerTag];
 
 // End list of accounts given extra user rights icons
 
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