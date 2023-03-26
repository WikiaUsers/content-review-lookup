// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
ajaxPages = ['Special:Log', 'Special:Contributions', 'Special:NewFiles', 'Special:AbuseLog'];
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
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

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* Code for custom edit buttons (ō, ū characters). */
/*
if (mwCustomEditButtons) {
 
    /*** wrappers ****
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
        "speedTip": "request delete",
        "tagOpen": "\{\{delete|reason=",
        "tagClose": "\}\}",
        "sampleText": "your reason here"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Add the ō character",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Add the ū character",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
}
*/
 
// =====================================
//                Imports
// =====================================
 
// See MediaWiki:ImportJS