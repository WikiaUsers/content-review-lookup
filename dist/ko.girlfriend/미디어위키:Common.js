///////////////////////////////////////////////////////
// SCROLL TO TOP
$(function() {
	if (wgNamespaceNumber != 2) {
		$('#WikiaRail').append('<div id="toTop"><img src="https://images.wikia.nocookie.net/cafeinlove/ko/images/b/b3/Up-arrow.png" /></div>' );
		$(window).scroll(function() {
			if($(this).scrollTop() > 400) {
				$('#toTop').fadeIn();	
			} else {
				$('#toTop').fadeOut();
			}
		});
 		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},100);
		});
	}
});