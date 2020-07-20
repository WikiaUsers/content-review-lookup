/* Any JavaScript here will be loaded for all users on every page load. */

/* Enables collapsable tables, add class="collapsable" or class="wikitable collapsable" after {| starting a table.  Tables without this script will function normally.  For more info, contact me at Message Wall:Iggyvolz */


importScriptPage('ShowHide/code.js', 'dev');

// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});