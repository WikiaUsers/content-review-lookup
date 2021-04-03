/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */



/* Code modèle "USERNAME" de Mihawk Moha */ 
$(function () {
if (window.disableUsernameReplace ||
mw.config.get('wgUserName') === null) return;
$('span.insertusername').html(mw.config.get('wgUserName'));
});