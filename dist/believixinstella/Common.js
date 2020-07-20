importArticles({
    type: "script",
    articles: [ 
         "w:dev:BackToTopButton/code.js",
         "w:dev:DisplayClock/code.js",
         "w:dev:AutoEditDropdown/code.js", 
         "w:dev:WallGreetingButton/code.js", 
         "w:dev:LastEdited/code.js",
         "u:dev:ExtendedNavigation/code.js",
         "MediaWiki:Wikia.js/MainPage.js",
         "MediaWiki:Wikia.js/Slider.js"
    ]
});

// ================================================================
// BEGIN - Sliders using JQuery by User:Tierrie
// ================================================================
 
//wsl.loadCSS.call(wsl, "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css");
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
 
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
 
// ================================================================
// END - Sliders/JQuery
// ================================================================

/* ######################################################################## */
/* ### SHOW/HIDE                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Collapsible tables using jQuery. Allows tables to   ### */
/* ###              be collapsed, showing only the header.              ### */
/* ### Credit:      User:Dantman                                        ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ShowHide/code.js      ### */
/* ######################################################################## */
 
var ShowHideConfig = { autoCollapse: 1, userLang: false };
importScriptPage( 'ShowHide/code.js', 'dev' );