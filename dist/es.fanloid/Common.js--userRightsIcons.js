/* Any JavaScript here will be loaded for all users on every page load. */
 
// 06:49, Noviembre 1, 2011 (UTC)
// Creado por User:RAPPY_4187, Aion Wiki
// Agregado para Especial:Contribuciones por Foodbandlt
 
$(function() {
 var rights = {};
 var botTag = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Bot'><span style='color:white'>BOT</span></a>";
 var chatMod = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Moderador_del_chat'><span style='color:white'>MODERADOR DEL CHAT</span>";
 var adminTag = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Administrador'><span style='color:white'>ADMIN</span>";
 var rollBack = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Rollback'><span style='color:white'>ROLLBACK</span>";
 var VSTF = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#VSTF'><span style='color:white'>Volunteer Spam Task Force</span>";
 var STAFF = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#STAFF'><span style='color:white'>STAFF</span>";
 var founder = "<span style='color:white'>Fundador</span>";
 
 // Comienza lista de cuentas con iconos de Permisos de Usuarios
 //
 // Asegúrate que la ultima linea de permisos esté seguida de un punto y coma, en vez de una coma.
 
   // Bots
 
 rights["MediaWiki default"]                  = [botTag],
 
   // Moderadores de Chat
 
 rights["Aylinmichel.armenta"]                = [chatMod],
 rights["JadeEdenCDM"]                        = [chatMod],
 rights["LKXBKN2000"]                         = [chatMod],
 rights["Mr.Mastroqueishon"]                  = [chatMod],
 rights["Rie-chan"]                           = [chatMod],
 rights["Rinmaiden"]                          = [chatMod],
 rights["Sakura CDM"]                         = [chatMod],
 rights["Sound of hope"]                      = [chatMod],
 rights["UsagiMaka"]                          = [chatMod],
 rights["Valeria.montoyaromero"]              = [chatMod, rollBack],

 
   //Administradores

 rights["Weggines"]                           = [chatMod, admintag],
 rights["Asura.Shinigami"]                    = [adminTag],
 rights["Kuku-hatsune"]                       = [adminTag],
 rights["Naruloid ragnarok"]                  = [adminTag],
 rights["Sara Kurai"]                         = [adminTag],
 
   //Rollback
 
 rights["ACarfira"]                           = [rollBack],
 rights["Asura.Shinigami"]                    = [rollBack],
 rights["Dannayukita01"]                      = [rollBack],
 rights["Gabyloid2"]                          = [rollBack],
 rights["Ginyang98"]                          = [rollBack],
 rights["Layla.Dark"]                         = [rollBack],
 rights["Sound of hope"]                      = [rollBack],
 rights["Yamichikawa"]                        = [rollBack],
 
   //VSTF
 
 rights["Callofduty4"]                        = [VSTF],
 rights["Eulalia459678"]                      = [VSTF],
 rights["Leviathan 89"]                       = [VSTF],
 rights["Randomtime"]                         = [VSTF],
 rights["TK-999"]                             = [VSTF],
 
   //Staff
 
 rights["CuBaN VeRcEttI"]                     = [STAFF],
 
   //Fundador
 
 rights["RainbowDaash"]                       = [founder];
 
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