/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* "Username" template - from PvZ Wiki */
 
$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});