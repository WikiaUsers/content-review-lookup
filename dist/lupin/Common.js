/* Any JavaScript here will be loaded for all users on every page load. */

// =====================================
//                Functions
// =====================================

// Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag === 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Collapse All');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Expand All');
    }
});
// END of Expand All

// Template:Tabber
$(function() {
	// If a sub-tab is "selected", make the parent tabs also "selected"
	$('.at-selected').parents('.article-tabber li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabber .at-selected .article-tabber').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabber').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Template:Tabs