// =====================================
//        Variabel untuk fungsi
// =====================================
// ArchiveTool
ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',	// Template untuk digunakan pada halaman pembicaraan utama
   archivePageTemplate: 'Archived Talk Tabs',	// Templat untuk digunakan pada halaman pembicaraan yang diarsipkan
   archiveSubpage: 'Archive',					// Nama dasar yang akan digunakan untuk halaman pembicaraan yang diarsipkan
   userLang: true
};

// BackToTopButton
window.BackToTopModern = true;

// =====================================
//                Imports
// =====================================

// Lihat MediaWiki:ImportJS

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
	// Jika sub-tab "dipilih", buatlah tab induknya juga "dipilih"
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Meningkatkan margin bawah tab utama
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Templat:Tabs