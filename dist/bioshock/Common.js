//Customization for imported scripts
//PreloadFileDescription, source: https://dev.fandom.com/wiki/PreloadFileDescription
PFD_templates = [
    {
        label:   'General files',
        desc:    '{' + '{Information\n|description = \n|source      = \n|game        = \n|remastered  = \n|level       = \n|levelpart   = \n|location    = \n|topic       = \n|license     = \n|approver    = \n}}\n{' + '{Unprocessed File}}',
    },
    'Other templates',
    {
        label:   'Audio Diary/Voxophone images or recordings',
        desc:    '{' + '{Audio Diary File\n|game           = \n|level          = \n|title          = \n|speaker        = \n|disspeaker     = \n|location       = \n|article        = \n|disarticle     = \n|license        = \n|source         = \n|sourcepath     = \n|sourcefilename = \n}}\n{' + '{Unprocessed File}}',
    },
    {
        label:   'Kinetoscope images or recordings',
        desc:    '{' + '{Kinetoscope File\n|game           = \n|level          = \n|title          = \n|addtitle       = \n|location       = \n|article        = \n|disarticle     = \n|license        = \n|source         = \n|sourcepath     = \n|sourcefilename = \n}}\n{' + '{Unprocessed File}}',
    },
];

/* 
 * Replacement for the old collapsible tables.
 * This incorporates mw-collapsible which brings several advantages over the previous method:
 * - Bundled with MediaWiki, so unlikely to ever break
 * - Works on previews too
 * - Performs better, instantaneously instead of the content showing for a split second
 */

// Amount of navboxes on a page that should be regarded as limit. If met, collapse all navboxes on the page
var autoCollapse = 2; 
var navBoxes = $( '.navbox' ).not( '.nocount' );

if ( navBoxes.length >= autoCollapse ) {
    // Collapse all elements in navBoxes
    navBoxes.addClass( 'mw-collapsed' );
}

// ============================================================
// BEGIN sliders using jquery by User:Tierrie
// ============================================================

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
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
} );

// ============================================================
// END sliders using jquery by User:Tierrie
// ============================================================