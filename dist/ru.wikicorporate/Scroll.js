	function handleScrollTo(e) {
			const breakY = ($(document).height() - $(window).height()) * 50 / 100;
		
	        e.preventDefault();
	        const reachHalf = $(window).scrollTop() > breakY
	        $('html').animate({scrollTop: reachHalf ? 0 : $(document).height()}, '10');
	}
	
	const wdsSecondScroll = $('<a>', {
	    class: 'wds-button wds-is-secondary',
	    html: '<svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>'
	})
	    .prependTo('.fandom-sticky-header > .wiki-tools')
	    .on('click', handleScrollTo)
	    
	
	const wdsSecondScrollIcon = wdsSecondScroll.children();
	wdsSecondScrollIcon.css({
		transition: 'transform .3s',
		transform: 'rotate(360deg)'
	})
	
	
	const scrollBottomButtonIcon = $('<a>', {
	    class: 'scroll-button scroll-button--bottom',
	})
	    .appendTo('#WikiaBar')
	    .on('click', handleScrollTo)
	
	$(window).scroll(function () {
		const breakY = ($(document).height() - $(window).height()) * 50 / 100;
		
	    const reachHalf = $(window).scrollTop() > breakY;
	    wdsSecondScrollIcon.css('transform', 'rotate(' + (reachHalf ? 360 : 180) + 'deg)');
	    scrollBottomButtonIcon.attr('class', 'scroll-button scroll-button--' + (reachHalf ? 'top' : 'bottom'));
	});