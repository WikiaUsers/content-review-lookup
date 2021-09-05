/* Any JavaScript here will be loaded for all users on every page load. */
// Template:Tabs
$(function() {
	// If a sub-tab is "selected", also make the parent tabs also "selected"
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
window.tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: false,
};