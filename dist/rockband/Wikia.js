//Nav button hover animation
jQuery(document).ready(function($) {
	$(".NavButton").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
 
//App button hover animation
jQuery(document).ready(function($) {
	$(".AppButton").mouseleave(function(){
		$(this).find('#amove').animate({ top: '115px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#amove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});