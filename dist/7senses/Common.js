/* Any JavaScript here will be loaded for all users on every page load. */
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
  inviteLink: 'https://discord.gg/FYcrnTmq4r'
}