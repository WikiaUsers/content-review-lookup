/* Any JavaScript here will be loaded for all users on every page load. */
// 06:49, Noviembre 1, 2011 (UTC)
// Creado por User:RAPPY_4187, Aion Wiki
// Agregado para Especial:Contribuciones por Foodbandlt
 
$(function() {
 var rights = {};
 var Bot = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Bot'><span style='color:white'>Bot</span></a>";
 var ChatManager = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Chat_Manager'><span style='color:white'>Chat Manager</span>";
 var ChatMod = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Moderador_del_chat'><span style='color:white'>Moderador del Chat</span>";
 var Admin = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Administrador'><span style='color:white'>Admin</span>";
 var RollBack = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Rollback'><span style='color:white'>Rollback</span>";
 var VSTF = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#VSTF'><span style='color:white'>VSTF</span>";
 var STAFF = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#STAFF'><span style='color:white'>Staff</span>";
 var ImageControl = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Control_de_Im.C3.A1genes'><span style='color:white'>Control de Imágenes</span>";
 var CommentControl = "<a href='http://es.mlp.wikia.com/wiki/Ayuda:Permisos_de_usuarios#Control_de_Comentarios'><span style='color:white'>Control de Comentarios</span>";
 var Founder = "<span style='color:white'>Fundador</span>";


 // Comienza lista de cuentas con iconos de Permisos de Usuarios
 //
 // Asegúrate que la ultima linea de permisos esté seguida de un punto y coma, en vez de una coma.
 
    //Rollback
rights["666magic"]                    = [RollBack, ChatMod],

    //Burocrata
rights["Pramirez351"]                    = [Admin, bureaucrat],

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