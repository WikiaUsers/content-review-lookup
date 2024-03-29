/* © Wiki Gardiens des Cités Perdues */
/* Provient de : https://gardiens-des-cites-perdues.fandom.com/fr/wiki/MediaWiki:Slider.js */

//================================
//          jQuery Slider
//================================

// Créée par Tierrie pour le Dragon Age Wiki
// Adapté par Soronos pour Wiki GdCP

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui"], function() {
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