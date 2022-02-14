/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}

/* Username replace feature
 * Inserts viewing user's name into <span class="Unknown/Logged Out User"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}