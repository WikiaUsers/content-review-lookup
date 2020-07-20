/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { autoCollapse: 0 };
importScriptPage('ShowHide/code.js', 'dev');

function spotlightSlider_setup() {
	//timer for automatic spotlight slideshow
	var spotlightSlider_timer;

	//select nav
	$("#spotlight-slider-0").find(".nav").addClass("selected");

	//show description
	$("#spotlight-slider-0").find(".description").hide();

	//bind events
	$("#spotlight-slider .nav").click(function() {
		if($("#spotlight-slider .spotlight-slider").queue().length == 0) {
			clearInterval(spotlightSlider_timer);
			spotlightSlider_scroll($(this));
		}
	});
	spotlightSlider_timer = setInterval(spotlightSlider_slideshow, 7000);
}

function spotlightSlider_slideshow() {
	var current = $("#spotlight-slider .selected").parent().prevAll().length;
	var next = (current == $("#spotlight-slider .nav").length - 1) ? 0 : current + 1;
	spotlightSlider_scroll($("#spotlight-slider-" + next).find(".nav"));
}

function spotlightSlider_scroll(nav) {
	//setup variables
	var thumb_index = nav.parent().prevAll().length;
	var scroll_by = parseInt(nav.parent().find(".spotlight-slider").css("left"));
	//set "selected" class
	$("#spotlight-slider .nav").removeClass("selected");
	nav.addClass("selected");
	//hide description
	$("#spotlight-slider .description").clearQueue().hide();
	//scroll
	$("#spotlight-slider .spotlight-slider").animate({
		left: "-=" + scroll_by
	}, function() {
		$("#spotlight-slider-" + thumb_index).find(".description").fadeIn();
	});
}

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://assassinscreed.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
 
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