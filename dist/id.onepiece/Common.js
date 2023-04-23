// =====================================
//        Variables for functions
// =====================================
// ArchiveTool
ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',	// Template to use on the main talk page
   archivePageTemplate: 'Archived Talk Tabs',	// Template to use on the archived talk pages
   archiveSubpage: 'Archive',					// Basename to use for archived talk pages
   userLang: true
};

// BackToTopButton
window.BackToTopModern = true;

// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS

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