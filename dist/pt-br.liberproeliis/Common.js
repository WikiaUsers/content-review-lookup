/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown

/* "Username" template - from PvZ Wiki */

$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});