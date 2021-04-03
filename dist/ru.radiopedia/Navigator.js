/* Any JavaScript here will be loaded for all users on every page load. */
//================================
//          Navigator
//================================
 
// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie" (JQuery Slider)
// see also http://onepiece.wikia.com/wiki/MediaWiki:Common.js/slider.js 
//  See also http://telepedia.fandom.com/uk/wiki/MediaWiki:Common.js/Navigator.js 
mw.loader.using(["jquery.cookie"]);
 
mw.loader.using(["jquery.ui.tabs"], function() {
  function trigger_helper() {
    window.setTimeout(function(){$(window).trigger('scroll');}, 95); //trigger image lazy loader
  }
  $(window).trigger('scroll'); //trigger image lazy loader
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");
 
  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 5
    }
  });
 
  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    trigger_helper(); //trigger image lazy loader
    return false;
  });
  $(".portal_next").click(function() { // binding click event
    var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    trigger_helper(); //trigger image lazy loader
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
    var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    trigger_helper(); //trigger image lazy loader
    return false;
  });
});