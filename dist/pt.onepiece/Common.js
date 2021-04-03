// =====================================
//        Variables for functions
// =====================================
// ArchiveTool
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',
   archivePageTemplate: 'Archived Talk Tabs',
   archiveSubpage: 'Archive',
   userLang: true
};

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

// BackToTopButton
window.BackToTopModern = true;

// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS