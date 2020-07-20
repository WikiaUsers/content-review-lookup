/* Any JavaScript here will be loaded for all users on every page load. */
 
/*User rights tag to masthead */
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki. Taken from callofduty.wikia.com

//Taken By Sgt Frogman from Assassin's Creed Wiki.

 
$(function() {
 var rights = {};
 
   // BUREAUCRATS
 rights["Sgt Frogman"]             = ["Mayor"];
 rights["Tunheim"]                 = ["Mayor"];
 rights["Elassint"]                = ["Mayor"];
 rights["Jelx"]                    = ["Mayor"];
 rights["Ryan."]                   = ["Mayor"];

  // ADMINS
 rights["TimeMaster"]              = ["Advisor"]; 
 rights["EpicJoyBoy"]              = ["Advisor"]; 
 
  //BOTS
  rights["Sgt_Frogman1"]            = ["Robot"];
 
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
 
//