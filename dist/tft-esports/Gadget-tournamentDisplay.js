// remove title attr for spoiler-free internal links
$(function() {
	$('.external a').removeAttr('title');
});

// matchlist stuff 
mw.hook('wikipage.content').add(function($content) {
	if (! $content.find('#matchlist')[0]) return;

	// initialize display of current dates for user local tz
	var curDate;
	$content.find('.matchlist-you-date').each(function() {
		$this = $(this);
		var newDate = this.innerHTML;
		// force show the date if it's the first match in the particular tab
		var isFirst = $this.attr('data-isfirst');
		if (newDate == curDate && isFirst != 'Yes') {
			$this.remove();
		}
		curDate = newDate;
	});
	
	// hide the hyphen & 2nd date in range for matches date list if it's all one day
	$content.find('.matchlist-daterange-you').each(function() {
		$this = $(this);
		var $firstdate = $(this.childNodes[0]);
		var $lastdate = $(this.childNodes[2]);
		if ($firstdate.html() == $lastdate.html()) {
			$(this.childNodes[1]).css('display','none');
			$lastdate.css('display','none');
		}
	});
	
	// toggle results vs times on click
	$content.find('.matchlist-toggler-results').click(function() {
		if (! $(this).hasClass('active')) {
			$content.find('.matchlist-results').toggleClass('matchlist-results-hidden');
			$content.find('.matchlist-toggler-results').toggleClass('active');
		}
	});
});

// match details width
mw.hook('wikipage.content').add(function($content) {
	if (! $content.find('#md-table')[0]) return;
	$mdTable = $content.find('#md-table');
	var width = $mdTable.width();
	$mdTable.css('min-width', width);
});

// standings widths equalize
mw.hook('wikipage.content').add(function($content) {
	if ($content.find('frontpage-featured-leagues')[0]) return;
	$standings = $content.find('.standings');
	var width = 0;
	$standings.each(function() {
		width = Math.max(width, parseInt($(this).width()));
	});
	console.log(width);
	$standings.each(function() {
		$(this).css('min-width', width);
	});
});

$(function() {
	$('.tournament-results-prize').each(function() {
		$(this).css('min-width', $(this).width());
	});
	
	$('.prizepool-togglers-currency').click(function() {
		$('.tournament-results-prize').each(function() {
			$(this).css('min-width', Math.max($(this).width(), parseInt($(this).css('min-width'))) + 'px');
		});
	});	
});

$(function() {
	$('.player-distribution').each(function() {
		var $dist = $(this);
		$dist.find('.distribution-cell').hover(function() {
			console.log('kittens');
			var key = $(this).attr('data-distribution-key');
			console.log(key);
			$dist.find('[data-distribution-key="' + key + '"]').addClass('team-highlighted');
		}, function() {
			$dist.find('td').removeClass('team-highlighted');
		});
	});
});