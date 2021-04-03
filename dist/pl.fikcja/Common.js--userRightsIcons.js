// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:RAPPY_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 
 var bot = "<a href="/wiki/Fikcja_Wiki:Administratorzy"><span style=\" color:white;\">Bot</span></a>";

 var rollback = "<a href=/wiki/Fikcja_Wiki:Administratorzy\"><span style=\" color:white;\">Rollback</span></a>";

 var chatMod = "<a href=/wiki/Specjalna:Chat\"><span style=\" color:white;\">Moderator czatu</span></a>";

 var Opk-newsów = "<a href=/wiki/Centrum_Wiadomości\"><span style=\" color:white;\">Opiekun newsów</span></a>";

 var admin = "<a href=/wiki/Fikcja_Wiki:Administratorzy\"><span style=\" color:white;\">Administrator</span></a>";

 var biur = "<a href=/wiki/Fikcja_Wiki:Administratorzy\"><span style=\" color:white;\">Biurokrata</span></a>";

// Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.

   //Boty

 rights["SimsomaniaczkaBot"]        = [bot] 
 rights["Wikia"]        = [bot] 
 rights["WikiaBot"]        = [bot] 

   //Rollback
 rights["Wikcio4"]        = [rollback]
 
   //Biurokraci
 rights["Simsomaniaczka123"]        = [biur, admin] 
 rights["Ciaciek12"]        = [biur, admin] 

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

Kopiowano z Simspedii