/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('Content/SpoilersToggle.js', 'scripts');

importScriptPage('AjaxRC/code.js', 'dev');

$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});