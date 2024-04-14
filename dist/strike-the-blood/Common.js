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

/* BackToTopButton */
window.BackToTopModern = true;
window.BackToTopArrow = true;
/*window.BackToTopText = "Back to Top";*/
window.BackToTopSpeed = 550;

/* Add Rail */
window.AddRailModule = ['Template:DiscordRailModule'];