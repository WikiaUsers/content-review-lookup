$(function() {
	$(".WalkthroughIcon").click(function () {
		$('.WalkthroughIcon, .WalkthroughPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("WalkthroughIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
	//Prevent images from lazyloading for a better transition between steps
	$('.Walkthrough img.lazyload').attr('src', function(){
			return $(this).attr('data-src');
		}).addClass('ls-is-cached lazyloaded').removeClass('lazyload');
});