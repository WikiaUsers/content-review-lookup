// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 var bot = "<a href=\"/wiki/Pomoc:Boty\"><span style=\" color:white;\">Bot</span></a>";
 var admin = "<span style=\" color:white;\">Administrator</span></a>";
 var biurokrata = "<span style=\" color:white;\">Biurokrata</span></a>";
 var pijana = "<span style=\" color:white;\">Najjaśniejsza gwiazda</span></a>";
 var founder = "<span style=\" color:white;\">Założyciel</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // Boty
 
 rights["Wikia"]               = [bot],
 rights["WikiaBot"]          = [bot],
 

  //Administratorzy

 rights["Marcy15"]  = [admin, biurokrata, chatMod]
 rights["Cartoons23"]  = [admin, biurokrata, chatMod]
 rights["Lollipopik"]  = [admin, biurokrata, chatMod]
 rights["Ciastkoo"]  = [admin, biurokrata, chatMod]
 rights["Cartoons23"]  = [admin, biurokrata, chatMod]
 rights["Pijana Mysz"]  = [founder, pijana]
 rights["Gouomp"]  = [admin, biurokrata, chatMod]
 
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