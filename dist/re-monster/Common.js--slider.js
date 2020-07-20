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
  $(".portal_sliderlink[data-hover-image]").hover(function() {
  var existingImage = this.querySelector('img'),
      hoverImage = document.createElement('img');
 
  // Ensure images are fixed in-place, to minimize flicker when loading the hover image.
  // `.portal_sliderlink` should be absolutely positioned, so it serves as our relative reference point.
  [existingImage, hoverImage].forEach(function (image) {
    image.style.position = 'absolute';
    image.style.left = '0';
    image.style.top = '0';
  });
 
  hoverImage.src = this.dataset.hoverImage;
  existingImage.insertAdjacentElement('afterend', hoverImage);
}, function() {
  this.querySelector('img + img').remove();
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