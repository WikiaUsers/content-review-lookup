/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
 var rights = {};
 var botTag = "<a href='http://es.nintendo.wikia.com/wiki/Wikitendo:Bots'><span style='color:white'>BOT</span></a>";
 var bot2Tag = "<a href='http://es.nintendo.wikia.com/wiki/Wikitendo:Bots'><span style='color:white'>BOT SIN FLAG</span></a>";
 var chatMod = "<a href='http://es.nintendo.wikia.com/wiki/Wikitendo:Moderadores_del_chat'><span style='color:white'>MODERADOR DEL CHAT</span>";
 var adminTag = "<a href='http://es.nintendo.wikia.com/wiki/Wikitendo:Administradores'><span style='color:white'>ADMIN</span>";
 var rollBack = "<a href='http://es.nintendo.wikia.com/wiki/Wikitendo:Reversores'><span style='color:white'>ROLLBACK</span>";
 var VSTF = "<span style='color:white'>Volunteer Spam Task Force</span>";
 var STAFF = "<span style='color:white'>STAFF</span>";
 var founder = "<span style='color:white'>Fundador</span>";
 
 // Comienza lista de cuentas con iconos de Permisos de Usuarios
 //
 // Asegúrate que la ultima linea de permisos esté seguida de un punto y coma, en vez de una coma.
 
   // Bots
 
 rights["ROB el Bot"]                           = [bot2Tag],

   //Reversores
 
 rights["Jaithyplosion"]                      = [rollBack],
 
   //Administradores
 
 rights["Meta dragon"]                      = [adminTag],
 rights["TimmyBurch2604"]                      = [adminTag],
 
   //VSTF
 
 rights["Callofduty4"]                        = [VSTF],
 rights["Eulalia459678"]                      = [VSTF],
 rights["Leviathan 89"]                       = [VSTF],
 rights["Randomtime"]                         = [VSTF],
 rights["TK-999"]                             = [VSTF],
 
   //Staff
 
 rights["Bola"]                               = [STAFF],
 rights["Hotsoup.6891"]                       = [STAFF],
 rights["Merrystar"]                          = [STAFF],
 
   //Fundador
 
 rights["Pexy"]                       = [founder];
 
 // Término de la lista de usuarios con iconos de permisos
 
 if (wgPageName.indexOf("Especial:Contribuciones") != -1){
newTitle = fbReturnToTitle.replace("Especial:Contribuciones/", "");
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