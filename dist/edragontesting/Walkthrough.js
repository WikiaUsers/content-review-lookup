$(function() {
	if ( !$( '.Walkthrough, .WalkthroughModes').length ) return;
	
	//Make first walkthrough active
	$('.WalkthroughModes').each(function () {
		var mode = $(this).find('.WalkthroughIcon:first').attr('data-mode');
		$(this).siblings('.WalkthroughPreview[data-mode="' + mode + '"]').addClass('active');
	});
	
	//Clicking the WalkthroughModes template buttons
	$('.WalkthroughIcon').click(function () {
		//New version
		if ($(this).attr('data-mode') !== undefined) {
			var parent = $(this).parents('.WalkthroughModes');
			var mode = $(this).attr("data-mode");
			parent.find('.WalkthroughIcon').removeClass("active");
			parent.siblings('.WalkthroughPreview').removeClass("active");
			parent.siblings('.WalkthroughPreview[data-mode="' + mode + '"]').addClass("active");
			$(this).addClass("active");
		//Old version retro support
		}else {
			var Class = $(this).attr("class").replace(" active", "").replace("WalkthroughIcon ", "");
			$(this).parents('tr').find('.WalkthroughIcon').removeClass("active");
			$(this).parents('.WalkthroughModes').siblings('.WalkthroughPreview').removeClass("active");
			$(this).parents('.WalkthroughModes').siblings("." + Class).addClass("active");
			$(this).addClass("active");
		}
	});
		
	//Prevent images from lazyloading for a better transition between steps
	if ($('.Walkthrough').length) {
		$('.Walkthrough img.lazyload').attr('src', function(){
			return $(this).attr('data-src');
		}).attr('loading', 'lazyloaded').removeClass('lazyload');
	}
});