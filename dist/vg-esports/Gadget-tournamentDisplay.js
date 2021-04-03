// remove title attr for spoiler-free internal links
$(function() {
	$('.external a').removeAttr('title');
});

// matchlist stuff 
mw.hook('wikipage.content').add(function() {
	if (! document.getElementById('matchlist')) {
		return;
	}
	
	// initialize display of current dates for user local tz
	var curDate;
	$('.matchlist-you-date').each(function() {
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
	$('.matchlist-daterange-you').each(function() {
		$this = $(this)
		var $firstdate = $(this.childNodes[0]);
		var $lastdate = $(this.childNodes[2]);
		if ($firstdate.html() == $lastdate.html()) {
			$(this.childNodes[1]).css('display','none');
			$lastdate.css('display','none');
		}
	});
	
	// toggle results vs times on click
	$('.matchlist-toggler-results').click(function() {
		if (! $(this).hasClass('active')) {
			$('.matchlist-results').toggleClass('matchlist-results-hidden');
			$('.matchlist-toggler-results').toggleClass('active');
		}
	});
});

// match details width
mw.hook('wikipage.content').add(function() {
	if (! document.getElementById('md-table')) {
		return;
	}
	$mdTable = $('#md-table');
	var width = $mdTable.width();
	$mdTable.css('min-width', width);
});

// standings widths equalize
mw.hook('wikipage.content').add(function() {
	if (document.getElementById('frontpage-featured-leagues')) return;
	$standings = $('.standings');
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