$(function() {
	if ($('.WalkthroughIcon').length) {
		$('.WalkthroughIcon').click(function () {
		var Class = $(this).attr("class").replace(" active", "").replace("WalkthroughIcon ", "");
			$(this).parents('tr').find('.WalkthroughIcon').removeClass("active");
			$(this).parents('.WalkthroughModes').siblings('.WalkthroughPreview').removeClass("active");
			$(this).parents('.WalkthroughModes').siblings("." + Class).addClass("active");
			$(this).addClass("active");
		});
	}
	//Prevent images from lazyloading for a better transition between steps
	if ($('.Walkthrough').length) {
		$('.Walkthrough img.lazyload').attr('src', function(){
			return $(this).attr('data-src');
		}).removeClass('lazyload');
	}
});