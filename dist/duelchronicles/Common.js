/* Any JavaScript here will be loaded for all users on every page load. */

/* Countdown */
importScriptPage('Countdown/code.js', 'dev');

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('ShowHide/code.js', 'dev');

/*Icons code from Avatar wiki*/
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

importScriptPage('ShowHide/code.js', 'dev');