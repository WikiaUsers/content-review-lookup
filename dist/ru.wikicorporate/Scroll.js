	function handleScrollTo(e) {
			const breakY = ($(document).height() - $(window).height()) * 50 / 100;
		
	        e.preventDefault();
	        const reachHalf = $(window).scrollTop() > breakY
	        $('html').animate({scrollTop: reachHalf ? 0 : $(document).height()}, '10');
	}
	
	const wdsSecondScroll = $('<a>', {
	    class: 'wds-button wds-is-secondary',
	     html: '<svg class="wds-icon wds-icon-small" viewBox="0 0 284.929 284.929"><g><path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285 C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854 c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848 c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566 C284.929,199.378,283.984,197.188,282.082,195.285z"/></g></svg>'
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