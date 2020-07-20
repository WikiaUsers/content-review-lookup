/* Any JavaScript here will be loaded for all users on every page load. */

// ================================================================
// JavaScript here will be loaded for all users on every page load.
// ================================================================

// ================================================================
// BEGIN 
// ================================================================
 
importArticles({
    type: "script",
    articles: [
        "u:halo:MediaWiki:Wikia.js/Slider.js"
    ]
});

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

//Scrolls Games left and right 
$('.GamesArrowLeft').click(function () { scroll = 
$('#GamesCarousel').scrollLeft(); 
$('#GamesCarousel').animate({'scrollLeft': scroll-540},1000); }); 
$('.GamesArrowRight').click(function () { scroll = 
$('#GamesCarousel').scrollLeft(); 
$('#GamesCarousel').animate({'scrollLeft': scroll+540},1000); });