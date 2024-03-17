// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS

// 讓 Template:Tabs 的 subtab 參數能用的程式，參見 https://onepiece.fandom.com/wiki/MediaWiki:Common.js
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