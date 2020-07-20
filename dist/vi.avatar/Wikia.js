/* Sang Common.js */
/* Sliders using jquery
 * By: [[User:Tierrie]], with modifications by [[User:Thailog]]
 */

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
	var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
	$("[class^=portal_sliderlink]").click(function() { // bind click event to link
		$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
		return false;
	});
});
});