/* Any JavaScript here will be loaded for all users on every page load. */
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */

var wgUserName = mw.config.get('wgUserName');
if (wgUserName) {
	$('.insertusername').html(wgUserName);
}