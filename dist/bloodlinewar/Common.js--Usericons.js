// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["JJRawesome"] = ["Founder", "Bureaucrat"],
 
    // BUREAUCRATS
 
  rights["MattShadow"]      = ["Bureaucrat"],
 
    // ADMINISTRATORS
 
  rights["DaughterofAchelois"]        = ["Admin", "Rater of Awesomeness"],
  rights["Jack Firesword"]        = ["Admin", "Official Awesome Person", "Diplomat"],
 
    // MODERATORS
 
     rights[""]    = ["Chat Diplomat"],
 
    // ROLLBACK
 
     rights[""]    = ["Wiki Diplomat"], 
 
   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Bot"], 
  rights["Wikia"]          = ["Bot"]
 
    // Other
 
     rights["Mcleo1"]        = ["Forever"],
 
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