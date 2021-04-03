if ($('.yt-gallery-container').length) {
	$('.yt-gallery-container').each(function(i, el) {
		var ids = $(el).attr('data-vids').split('|').map(function(id) { return id.trim(); });
		$(el).attr('data-current', 0);
		$left = $('<button type=button class="yt-gallery-nav left" data-change=-1>L</button>').appendTo(el);
		$left.unbind('click');
		$left.click(move);
		$.each(ids, function(i, id) {
			var $frame = $('<iframe allowfullscreen frameborder=0 src="https://www.youtube.com/embed/' + id + '?enablejsapi=1&version=3&playerapiid=ytplayer" />').appendTo(el);
			if (i === parseInt($(el).attr('data-current'))) $frame.toggleClass('current');
		});
		$right = $('<button type=button class="yt-gallery-nav right" data-change=1>R</button>').appendTo(el);
		$right.unbind('click');
		$right.click(move);
	});
}

function move(el) {
	var $container = $(el.target).parent();
	var amount = $container.find('iframe').length;
	var change = parseInt($(el.target).attr('data-change'));
	var current = parseInt($container.attr('data-current'));
	if (current + change > amount-1) current += change - amount;
	else if (current + change < 0) current += change + amount;
	else current += change;
	$container.find('.current')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
	$container.find('.current').toggleClass('current');
	$container.find('iframe').eq(current).toggleClass('current');
	$container.attr('data-current', current);
}