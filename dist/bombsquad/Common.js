/* Any JavaScript here will be loaded for all users on every page load. */

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[Wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Light mode and dark mode detector */
if (document.querySelector('body.theme-fandomdesktop-dark')) {
  // User is in dark mode
  $('.islightmode').html('0');
} else {
  // User is in light mode
  $('.islightmode').html('1');
}