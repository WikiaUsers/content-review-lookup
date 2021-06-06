window.WikiaNotificationexpiry = 10;

jQuery(document).ready(function($) {
	$(".contbtn").mouseleave(function(){
		$(this).find('#imove').animate({ top: '100px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});