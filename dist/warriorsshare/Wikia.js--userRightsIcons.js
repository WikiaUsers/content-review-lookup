/ 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">

// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki

$(function() {
 var rights = {};

 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

   // BUREAUCRATS

  rights["Cloudskye"]      = ["Bureaucrat","Administrator""Councilor"],
  rights["Nightfern"]      = ["Bureaucrat","Administrator"],

   // ADMINS
 
  rights["Leopardclawxx"]        = ["Administrator"],

   // MODERATORS

     rights["Graceglow"]    = ["Chat moderator"],

    // ROLLBACK

     rights["Silversong123"]    = ["Rollback","Chat Moderator"], 
      

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"]

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