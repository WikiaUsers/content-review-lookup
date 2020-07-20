/* <source lang="JavaScript"> */
 
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
  var rights     = {};
  var botTag     = "<a href='/wiki/Help:Bots'><span style='color:white'>Bot</span></a>";
  var rollBack   = "<a href='/wiki/Help:Rollback'><span style='color:white'>Rollback</span>
  var chatMod    = "<a href='/wiki/Project:Chat_Moderators'><span style='color:white'>Anbu</span></a>";
  var adminTag   = "<a href='/wiki/Project:Administrators'><span style='color:white'>Jonin</span></a>";
  var hokage     = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Hokage</span></a>";
  var mizukage   = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Mizukage</span></a>";
  var raikage    = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Raikage</span></a>";
  var kazekage   = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Kacekage</span></a>";
  var tsuchikage = "<a href='/wiki/Project:Bureaucrats'><span style='color:white'>Tsuchikage</span></a>";</a>";
  var founder    = "Jinchūriki";
  var checkUser  = "<a href='/wiki/Help:Checkuser'><span style='color:white'>Check User</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
 // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
   // BOTS
 
 rights["Yuzubot"]                            = [botTag],
 rights["QATestsBot"]                         = [botTag],
 rights["Wikia"]                              = [botTag],
 rights["WikiaBot"]                           = [botTag],
 
 
   //Administrators
 
 rights["27finnsprincess"]                    = [mizukage, adminTag],
 rights["BlazeFireXXXX"]                      = [adminTag],
 rights["Yuzura"]                             = [founder, hokage, adminTag],
 
   // Chat Moderators
 
 rights["Odaceus"]                            = [chatMod],
 
   //Rollback
 
 rights[" "]                                  = [rollBack];
 
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
 
/* </source> */