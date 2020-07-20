/* Any JavaScript here will be loaded for all users on every page load. */
 
//Makes tables collapsible
importScriptPage( 'ShowHide/code.js', 'dev' );
 
//Enable auto-refreshing
importScript("MediaWiki:Common.js/AutoRefresh.js");
 
//Enables countdowns
importScriptPage('Countdown/code.js', 'dev');
 
//Archive tool
var archiveListTemplate = 'Archives'; 
var archivePageTemplate = 'Archivepage'; 
importScriptPage('ArchiveTool/code.js', 'dev');
 
//Grayed-out edit button for archived talk pages
importScript("MediaWiki:Common.js/GrayEditButtonArchive.js");
 
//Extra user mastheads
importScript("MediaWiki:Common.js/UserMastheads.js");
 
/* Adds icons to page header bottom border
 * by: [[w:c:avatar:User:The 888th Avatar|The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});