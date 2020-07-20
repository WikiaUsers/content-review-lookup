/* ################################################################ */
/* ####### Begin tags for various user rights: Do not edit ######## */
/* ################################################################ */
 
$(function() {
 var rights = {};
 var founderTag = "<a href='http://conspiracy-theories.wikia.com/wiki/Yuzura'><span style='color:white'>Founder</span></a>";
 
 var cratTag = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:Bureaucrats'><span style='color:white'>Supercomputer</span></a>";
 
 var adminTag = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:Administrators'><span style='color:white'>Virus</span></a>";
 
 var patrollerTag = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:Patrollers'><span style='color:white'> Abominable Snowman</span></a>";
 
 var rollBack = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:Rollback'><span style='color:white'>Hacker</span></a>";
 
 var chatMod = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:Chat_Moderators'><span style='color:white'>Robot</span></a>";
 
 var coderTag = "<span style='color:white'>Coder</span>";
 
 var walrusTag = "<span style='color:white'>Walrus</span>";
 
 var botTag = "<a href='http://c.wikia.com/wiki/Help:Bots'><span style='color:white'>Actual Robot</span></a>";
 
 var VSTF = "<a href='http://community.wikia.com/wiki/Help:SpamTaskForce'><span style='color:white'>VSTF</span></a>";
 
 var featuredUser = "<a href='http://conspiracy-theories.wikia.com/wiki/Project:User_of_the_month'><span style='color:white'>Featured User</span></a>";
 
/* ################################################################ */
/* ##### Begin list of accounts given extra user rights icons ##### */
/* ################################################################ */
 
   // BOTS
 
 rights["Elecbotlet"]                         = [botTag],
 rights["Yuzubot"]                            = [botTag],
 rights["Wikia"]                              = [botTag],
 rights["WikiaBot"]                           = [botTag],
 
   //Bureaucrats
 
 rights["Yuzura"]                             = [founderTag, adminTag, cratTag, coderTag, walrusTag],
 rights["XGlass Reflection"]                  = [adminTag, cratTag],
 
    //Administrators
 
 rights["BlazeFireXXXX"]                      = [adminTag, featuredUser],
 rights["Epsilon Master"]                     = [adminTag, coderTag],
 
   // Chat Moderators
 
 rights["Destroy Us All"]                     = [chatMod],
 rights["~98malimal"]                         = [chatMod],
 
   //Patrollers
 
 rights["Zangetsu-jin"]                       = [patrollerTag, featuredUser],
 
   //Moderator Rollback
 
 rights[" "]                                  = [chatMod, rollBack],
 
   //Rollback
 
 rights[" "]                                  = [rollBack];
 
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
 
/* ################################################################ */
/* # Adds link to Special:Contributions for Banned From Chat tags # */
/* ################################################################ */
 
if ($('span.tag:contains("Banned From Chat")').length == 1){
 $('span.tag:contains("Banned From Chat")').wrap("<a href='/wiki/Special:Contributions/"+wgTitle.replace(' ', '_')+"' style='color:white;'></a>");
}
 
// </source>