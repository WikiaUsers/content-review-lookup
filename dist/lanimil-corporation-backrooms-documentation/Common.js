/* Any JavaScript here will be loaded for all users on every page load. */

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
$(function() {
    if(mw.config.get('wgUserName')) {
        $('.insertusername').html(mw.config.get('wgUserName'));
    }
});

window.SpoilerAlertJS = {
    question: 'This Entry contains Spoilers to the Lore, or Fate for specific Individuals. Do you wish to Continue?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 500
};

window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Founder', order:-1/0 },
		respected: 'Respected',
		topwriter: 'Top Writer',
		ultrachad: 'Ultra Chad'
	}
};