/*
$(function() {
	if ($('.WalkthroughIcon').length) {
		$('.WalkthroughIcon').click(function () {
		var Class = $(this).attr("class").replace(" active", "").replace("WalkthroughIcon ", "");
			$(this).parents('td').children('.WalkthroughIcon').removeClass("active");
			$(this).parents('.WalkthroughPreview').removeClass("active");
			$(this).addClass("active");
			$("." + Class).addClass("active");
		});
	}
	//Prevent images from lazyloading for a better transition between steps
	if ($('.Walkthrough').length) {
		$('.Walkthrough img.lazyload').attr('src', function(){
			return $(this).attr('data-src');
		}).removeClass('lazyload');
	}
});

$('.WalkthroughIcon').css('background', 'red');*/