$(function () {
	var interval = setInterval(function () {
			​$('.Message p').text(function () {
    			return $(this).text().replace("Test", "****"); 
			}).addClass("test");
		}, 100);
	var interval = setInterval(function () {
	$('.wds-avatar__image').addClass('test');
	}, 100 );
});