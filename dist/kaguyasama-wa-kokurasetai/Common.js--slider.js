/* Any JavaScript here will be loaded for all users on every page load. */
//================================
//          jQuery Slider
//================================

// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"
// see also http://onepiece.wikia.com/wiki/MediaWiki:Common.js/slider.js

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});