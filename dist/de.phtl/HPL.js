/* Any JavaScript here will be loaded for all users on every page load. */
// <nowiki>

/**
 * Ersetzt {{BENUTZERNAME}} mit dem Benutzernamen des die Seite betrachtenden
 * Benutzers.
 */
var wgUserNameAnon = 'Anonym';

$(document).ready(function() {
	if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
	$("span.insertusername").text(mw.config.get('wgUserName') || wgUserNameAnon);
});

// Konfigurationen für importierte Skripte

window.MessageBlock = {
  title : 'Block',
  message : 'Du wirst $2 Tage lang gesperrt (Grund: $1)',
  autocheck : true
};