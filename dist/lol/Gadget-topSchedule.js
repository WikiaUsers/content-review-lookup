$(function() {
	var $schedule = $('#top-schedule');
	if (! $schedule) return;
	$schedule.detach();
	$("#mw-head").append($schedule);
	$schedule.css('display', '');
    var i = 0;
    $('.topschedule-box').each(function() {
    	var nowTime = Date.now();
    	var expTime = parseInt($(this).attr('data-expiration')) * 1000;
		if (nowTime >= expTime) {
			$(this).css('display', 'none');
			i = parseInt($(this).attr('data-i'));
		}
		else if (i + 15 < parseInt($(this).attr('data-i'))) {
			$(this).css('display', 'none');
		}
    });
});