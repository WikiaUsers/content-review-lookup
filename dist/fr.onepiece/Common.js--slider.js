//================================
//          jQuery Slider
//================================
 
// Code de http://dragonage.wikia.com/wiki/MediaWiki:Common.js créé par Tierrie

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

  $(".portal_sliderlink").click(function() { // Liaison avec l'événement clic
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // Liaison avec l'événement clic
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // passer à l'onglet suivant
    return false;
  });
  $(".portal_prev").click(function() { // Liaison avec l'événement clic
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // revenir à l'onglet précédent
    return false;
  });
});