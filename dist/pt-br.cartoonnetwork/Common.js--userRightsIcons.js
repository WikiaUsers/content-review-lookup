// <source lang="JavaScript">
 
// Added support for Special:Contributions by Foodbandlt
 
$(function() {
 var rights = {};
 var bot = "<a href=\"/wiki/Ajuda:Robô\"><span style=\" color:white;\">Robô</span></a>";
 var rollback = "<span style=\" color:white;\">Rollback</span></a>";
 var chatMod = "<a href=\"/wiki/Especial:Chat\"><span style=\" color:white;\">Moderador do Chat</span></a>";
 var admin = "<a href=\"/wiki/Cartoon Network Wiki:Administradores\"><span style=\" color:white;\">Administrador</span></a>";
 var burocrata = "<span style=\" color:white;\">Burocrata</span></a>";
 var fundador = "<span style=\" color:white;\">Fundador</span></a>";
 
 // Begin list of accounts given extra user rights icons
 //
//Be sure that the last line listed for modified rights is proceeded by a semi-colon rather than a comma.
 
   // Robô
 
 rights["Wikia"]               = [bot],
 rights["Robô"] = [bot],
 rights["WikiaBot"]          = [bot]
 
   // Moderador do Chat
 
rights[""] = [chatMod],
rights[""] = [chatMod, rollback]
 
   //Rollback

rights[""] = [rollback]
 
  //Burocrata
 rights["Menino!"]           = [fundador, burocrata, admin, chatMod]
 rights["TeQuatro"]          = [burocrata, admin]
 rights["Gustavo64151889"]   = [burocrata, admin]

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