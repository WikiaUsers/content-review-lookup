// toggle for Template:SpoilerButton
$(".mw-customtoggle-Spoiler").click(function() {
  $('.mw-customtoggle-Spoiler').toggleClass("spoiler-button_active");
});

// Slider (Template:ChapterGuide)
//
// modified for guide by youngjustice.fandom.com/User:KeetleMeetPot
// @author dragonage.fandom.com/wiki/User:Tierrie

mw.loader.using(['jquery.ui'], function() {
	$(function () {
		var $tabs = $("#chapterslider").tabs({
		fx: {
			opacity: 'toggle',
			duration: 100
		}
	});
	$("[class^=chapterslider_nav]").click(function() {
		$tabs.tabs('select', this.className.replace("chapterslider_nav_", ""));
	return false;
	});
});
});