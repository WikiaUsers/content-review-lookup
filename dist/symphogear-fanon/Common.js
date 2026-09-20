/* Any JavaScript here will be loaded for all users on every page load. */

/* Template for Tabs -  From Wikia One Piece*/
// Template:Tabs
$(function() {
	// If a sub-tab is "selected", make the parent tabs also "selected"
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Template:Tabs


/* UTC Clock - Date Placement */
window.DisplayClockJS = {
    format: '%2d %{Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec}m %2Y %2H:%2M (UTC)',
    hoverText: 'UTC Clock',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});