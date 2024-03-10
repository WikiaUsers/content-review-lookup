$(function() {
	var $schedule = $('#top-schedule');
	if (! $schedule) return;
	$schedule.detach();
	if ($('#p-logo').length) {
		$("#mw-head").append($schedule);
	}
	else {
		// rearrange the DOM to make space for the top schedule
		$('.fandom-community-header .fandom-community-header__community-name-wrapper').detach();
		$wikiTools = $('.fandom-community-header .wiki-tools');
		$wikiTools.detach();
		$('.community-header-wrapper .fandom-community-header__local-navigation').append($wikiTools);
		$schedule.insertAfter($('.fandom-community-header .fandom-community-header__image'));
	}
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