/* Any JavaScript here will be loaded for all users on every page load. */
 
/*User rights tag to masthead 
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki. Taken from callofduty.wikia.com
 
$(function() {
 var rights = {};
 
   // BUREAUCRATS
 
 rights["Master Sima Yi"]      = ["Mentore"];
 rights["Vatsa1708"]           = ["Mentore"];
 
  // ADMINIS
 
 rights["Amnestyyy"]           = ["Dai"];
   
  // PATROLLERS + MOTM (chronological)
 rights["TheSt0ryTeller"]      = ["Rafiq","Bibliotecario Capo"];
 rights["DarkFeather"]         = ["Rafiq"];
 rights["Slate Vesper"]        = ["Rafiq"];
 rights["Kaloneous"]           = ["Rafiq"];
 rights["Stormbeast"]          = ["Rafiq"];
 rights["Gabriel Auditore"]    = ["Rafiq"];
 rights["Arcemz"]              = ["Rafiq"];
  //BOTS
 
 rights["VatsaAWB"]            = ["Bot"];
 
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

*/