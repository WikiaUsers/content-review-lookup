/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// Nombreusuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// Etiqueta Inactivo
window.InactiveUsers = { text: 'Retirado' };

/* WDS Notification */
 
if (!$.storage.get('noti')) {
    new BannerNotification('<a href="https://futbol-mexicano.fandom.com/es/wiki/Usuario_Blog:Elite_T7/La_wiki_cumple_5_a%C3%B1os_de_existencia_y_llega_a_sus_3,000_art%C3%ADculos.">En este año 2020, la wiki cumple 5 años de existencia y recién llegamos a los 3,000 artículos.</a>', 'warn').onClose(function () {
        $.storage.set('noti', true);
    }).show();
}

if (!$.storage.get('noti2')) {
    new BannerNotification('Querido lector, ahora ya contamos con información sobre el sector amateur y Liga de Balompié Mexicano, si tiene información util que sea importante para el sitio, puede ayudarnos editandolo, si no sabes como editar te recomendamos leer la <a href="https://futbol-mexicano.fandom.com/es/wiki/Fútbol_Mexicano_Wiki:Guía_de_Edición">guía de edición.</a>', 'warn').onClose(function () {
        $.storage.set('noti2', true);
    }).show();
}