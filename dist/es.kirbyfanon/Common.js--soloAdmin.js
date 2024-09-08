/* Mensaje solo para admins (hecho en Wikipedia) */

function showAdmMessage() {
    if (wgUserGroups.indexOf('sysop') != -1) {
        $('.WikiaRail .WikiaSearch').after('<section id="MenuAdministrativo" class="module"><h1>Menú administrativo</h1><ul><li><img width="20" height="20" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite move" /><em><a href="http://es.kirby--fanon.wikia.com/wiki/Categoría:Borrar">Categoría:Borrar</a></em><div class="descripcion">Lista de artículos marcados para borrarse</div></li><li><img width="20" height="20" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite move" /><em><a href="http://es.kirby--fanon.wikia.com/wiki/Wiki_Kirby_Fanon:Reglas">Reglas @ Wiki Kirby Fanon</a></em><div class="descripcion">Listado de normas del wiki</div></li></ul><div id="fastdelete"></div></section>');
        $('.administradores').css({'display': 'block'});
    };
}
 
addOnloadHook(showAdmMessage);
 
function fastdeleteappend() {
   setTimeout(function(){
      $('.WikiaRail a[data-id="delete"]').appendTo('#fastdelete')
      $('.WikiaRail a[data-id="delete"]').css({'display': 'inline-block'})
   },3000);
}
addOnloadHook(fastdeleteappend);