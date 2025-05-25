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
	var wrapper, gap;
	
	function init() {
		wrapper = $('.carousel__wrapper');
		
		setOffset(wrapper, 0);
		
		var gapCSS = wrapper.css('gap');
		gap = parseInt(gapCSS.substring(0, gapCSS.length - 1));
		
		wrapper.each(function () {
			$(wrapper.children().get(0)).addClass('active');
		});
		
		// find modules
		
		$(wrapper.children()).each(function () {
			var id = $(this).attr('id');
			
			if ($('#' + id + 'Module').length > 0) {
				$(this).addClass('has-module');
			} 
		});
	}
	
	function getCurrentTab(wrapper) {
		return wrapper.find('.active').index();
	}
	
	function setCurrentTab(wrapper, i) {
		var tabs = wrapper.children();
		
		tabs.removeClass('active');
		$(tabs.get(i)).addClass('active');
	}
	
	function getOffset(wrapper) {
		return parseInt(wrapper.attr('data-offset'));
	}
	
	function setOffset(wrapper, i) {
		wrapper.attr('data-offset', i);
	}
	
	function getTabsToJump(wrapper) {
		var containerWidth = wrapper.parent().width();
		var arrowsWidth = $('.main-page .carousel .arrows').width();
		var tabWidth = $(wrapper.children().get(0)).outerWidth() + gap;
		
		return Math.floor((containerWidth - arrowsWidth) / tabWidth);
	}
	
	function getPosition(wrapper, i) {
		var x = 0;
		var position = 0;
		
		while (x < i) {
			position += $(wrapper.children().get(x)).outerWidth() + gap;
			x++;
		}
		
		return -position;
	}
	
	function jump(wrapper, jump, forward = true) {
		var offset = getOffset(wrapper);
		
		var landingTab;
		
		if (forward) { landingTab = offset + jump; }
		else { landingTab = offset - jump; }
		
		console.log(wrapper);
		
		wrapper.css('left', getPosition(wrapper, landingTab).toString() + 'px');
		//setCurrentTab(wrapper, landingTab);
		setOffset(wrapper, landingTab);
		
	}
	
	$('.arrows__prev').on('click', function (event) {
		var thisWrapper = $(this).parent().prev();
		var tabsToJump = getTabsToJump(thisWrapper);
		var offset = getOffset(thisWrapper);
		
		if (offset - tabsToJump >= 0) {
			jump(thisWrapper, tabsToJump, false);
		}
		
		else {
			var x = 1;
			
			while (tabsToJump - x > 0) {
				if (offset - (tabsToJump - x) >= 0) {
					jump(thisWrapper, tabsToJump - x, false);
				}
				x++;
			}
		}
	});
	
	$('.arrows__next').on('click', function (event) {
		var thisWrapper = $(this).parent().prev();
		var tabsToJump = getTabsToJump(thisWrapper);
		var offset = getOffset(thisWrapper);
		
		if (offset + tabsToJump < thisWrapper.children().length) {
			jump(thisWrapper, tabsToJump);
		}
	});
	
	$(document).on('click', '.has-module', function (event) {
		if (!$(this).hasClass('active')) {
			var id = $(this).attr('id');
			var siblings = $(this).siblings();
			var otherModules = $(this).parent().parent().next().children();
			
			console.log(id);
			console.log(siblings);
			console.log(otherModules);
			
			siblings.removeClass('active');
			$(this).addClass('active');
			
			otherModules.removeClass('active');
			$('#' + id + 'Module').addClass('active');
		}
	});
	
	init();
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