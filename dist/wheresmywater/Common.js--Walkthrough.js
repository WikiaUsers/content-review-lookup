$(function() {
	$(".WalkthroughIcon").click(function () {
		$('.WalkthroughIcon, .WalkthroughPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("WalkthroughIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
});