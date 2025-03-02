/** 
 * Adding support to mw-collapsible for autocollapse
 * Based on code (maintained by TheDJ) from en.wikipedia.org/wiki/MediaWiki:Common.js
 */
 
function autocollapseSetup ($collapsibleContent) {
	// Autocollapse threshold
	var threshold = 2;
	
	// Remove all subgroup navboxes from the list; these shouldn't count
	$collapsibleContent = $collapsibleContent.filter(":not(.navbox-subgroup)");
	
	$.each($collapsibleContent, function (index, element) {
		$element = $(element);
		
		// If a collapsible object has the autocollapse state, and the threshold is met or succeeded, it collapses
		if ($collapsibleContent.length >= threshold && $element.hasClass('mw-autocollapse')) {
			$element.data('mw-collapsible').collapse();
		} 
	});
}

mw.hook('wikipage.collapsibleContent').add(autocollapseSetup);

/* MAIN PAGE 2025 */

function mainPageSeriesCarousel() {
	var wrapper, tabs, numTabs, tabSpacing, tabsToJump;
	
	var currentStartTab = 0;
	
	function findModules() {
		$(tabs).each(function() {
			var id = $(this).attr('id');
			
			if ($('#' + id + 'Module').length) {
				$(this).addClass('has-module');
			}
		});
		
		$('.has-module').on('click', function() {
			initCarouselValues();
			if (!$(this).hasClass('active')) {
				var id = $(this).attr('id');
				var siblingTabs = $(this).siblings();
				var siblingModules = $(this).parent().parent().next().children();
				
				$(siblingTabs).removeClass('active');
				$(this).addClass('active');
				
				$(siblingModules).removeClass('active');
				$('#' + id + 'Module').addClass('active');
			}
		});
	}
	
	function getTabsToJump() {
		var containerWidth = $(wrapper).parent().width();
		var arrowsWidth = $('.main-page .carousel .arrows').width();
		var tabWidth = $($(tabs).get(0)).outerWidth() + tabSpacing;
		
		return Math.floor((containerWidth - arrowsWidth) / tabWidth);
	}
	
	function initCarouselValues() {
		wrapper = $('.carousel__wrapper');
		tabs = $(wrapper).children();
		
		numTabs = $(tabs).length;
	
		// get gap amount
		var tabSpacingString = $(wrapper).css('gap');
		tabSpacing = parseInt(tabSpacingString.substring(0, tabSpacingString.length - 1));
	
		tabsToJump = getTabsToJump();
	}
	
	function getPosition(i) {
		var x = 0;
		var position = 0;
		
		while (x < i) {
			position += $($(tabs).get(x)).outerWidth() + tabSpacing;
			
			x++;
		}
		
		return -position;
	}
	
	$(window).on('resize', function() {
		initCarouselValues();
	});
	
	function jumpBack(jump) {
		$(wrapper).css('left', getPosition(currentStartTab - jump).toString() + 'px');
		currentStartTab -= jump;
	}
	
	$('.arrows__prev').on('click', function() {
		initCarouselValues();
		
		if (currentStartTab - tabsToJump >= 0) {
			jumpBack(tabsToJump);
		} else {
			var x = 1;
			while (tabsToJump - x > 0) {
				if (currentStartTab - (tabsToJump - x) >= 0) {
					jumpBack(tabsToJump - x);
				}
				
				x++;
			}
		}
	});
	
	function jumpForward(jump) {
		$(wrapper).css('left', getPosition(currentStartTab + jump).toString() + 'px');
		currentStartTab += jump;
	}
	
	$('.arrows__next').on('click', function() {
		initCarouselValues();
		
		if (currentStartTab + tabsToJump < numTabs) {
			jumpForward(tabsToJump);
		}
	});
	
	initCarouselValues();
	findModules();
	
}

// change OTD purge button to null edit when available
function convertPurgeToNull() {
	function tryClick() {
		if ($('#ca-null-edit').length > 0) {
			$('.on-this-day .button .wds-button:last-child a').on('click', function(event) {
				event.preventDefault();
				$('#ca-null-edit').trigger('click');
				event.stopImmediatePropagation();
			});
		}
	}
	
	function callback(mutationList, observer) {
		mutationList.forEach(function (mutation) {
			if (mutation.type === 'childList') {
				tryClick();
			}
		});
	}
	
	if ($('body').hasClass('mainpage')) {
		var editButtonList = $('#ca-edit + .wds-dropdown .wds-list');
		var config = { childList: true };
		
		var observer = new MutationObserver(callback);
		
		observer.observe(editButtonList[0], config);
		
		// In case we've already purged...
		tryClick();
	}
}

mw.hook('wikipage.content').add(mainPageSeriesCarousel).add(convertPurgeToNull);