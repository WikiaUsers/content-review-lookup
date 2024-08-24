/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* NOMBREUSUARIO */
$(function UserNameReplace() {
    if (wgUserName) {
        var spans = getElementsByClassName(document, "span", "insertusername");
  
        for (var i = 0; i < spans.length; i++){
            spans[i].textContent = wgUserName;
        }
    }
});

/* Arreglo de invitacion en Discord banner */
window.DiscordBannerSettings = {
  inviteLink: 'https://discord.gg/3QrTJkp'
}