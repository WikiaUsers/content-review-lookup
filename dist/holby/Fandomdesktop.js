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

window.UserTagsJS = {
	modules: {
		autoconfirmed: true,
		custom: {
			'Lythronax': ['botowner', 'jshelper', 'csshelper', 'templatehelper', 'luahelper'],
			
			// Former staff
			'Solar Dragon-fduser': ['founder', 'formerstaff'],
			'Eladkse': ['formerstaff'],
			'Soapslover96': ['formerstaff'],
			'Dannysage96': ['formerstaff'],
			'Sforster123': ['formerstaff'],
			'EastEndersLover123': ['formerstaff'],
			'Titan95': ['formerstaff'],
			'RhysDavies27': ['formerstaff'],
			'WeylandHaulage': ['formerstaff'],
		},
		inactive: {
			days: 180,
			namespaces: [ 0, 'Talk', 'User talk', 'Template', 'Module' ],
			zeroIsInactive: false,
		},
		isblocked: true,
		metafilter: {
			'content-moderator': ['sysop'],
			'threadmoderator': ['sysop'],
			'rollback': ['sysop', 'content-moderator'],
		},
		mwGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback', 'bot'],
		newuser: {
			days: 30,
			edits: 50
		},
		nonuser: true,
	},
	tags: {
		// Staff tags
		bureaucrat: { u:'Director', link:'Project:Administrators', title: 'This user is a bureaucrat.' },
		sysop: { u:'Consultant', link: 'Project:Administrators', title: 'This user is an administrator.' },
		'content-moderator': { u:'Registrar', link: 'Project:Administrators', title: 'This user is a content moderator.' },
		threadmoderator: { u:'Human Resources', link: 'Project:Administrators', title: 'This user is a thread moderator.' },
		rollback: { u:'Nurse', link: 'Project:Administrators', title: 'This user is a rollbacker.' },
		formerstaff: { u: 'Former Staff', link: 'Project:Administrators', title: 'This user is a former staff member.' },
		
		// Blocked
		blocked: { u: 'Struck Off', link: 'Project:Blocking policy', title: 'This user is blocked from editing the wiki.' },
		
		// New user tag
		newuser: { u: 'Trainee', title: 'This user recently joined the wiki.' },
		
		// Bot flag
		bot: { u: 'Bot', link: 'Help:Bots', title: 'This user is a bot.' },
		botowner: { u: 'Telesurgeon', link: 'Help:Bots', title: 'This user owns a bot.', order: 50 },
		
		// Founder
		founder: { u: 'Holby Wiki Founder', title: 'This user founded the Holby Wiki.' },
		
		// Signifiers
		jshelper: { u: 'JavaScript', order: 100, title: 'This user is adapt at JavaScript.' },
		csshelper: { u: 'CSS', order: 101, title: 'This user is adapt at CSS.' },
		templatehelper: { u: 'Templates', order: 102, title: 'This user is adapt at writing and maintaining wiki templates.' },
		luahelper: { u: 'Lua', order: 103, title: 'This user is adapt at writing and maintaining Lua modules.' },
	}
};

(function ($, mw) {
	mw.hook('fandom.masthead').add(function (elem) {
		var $elem = $(elem);

		var format = function () {
			var $counts = $elem.find('ul.user-identity-stats a strong');
			if (!$counts.length) {
				return false;
			}
			observer.disconnect(); // stop watching before we mutate
			$counts.each(function () {
				var editCount = parseInt($(this).text(), 10);
				if (!isNaN(editCount)) {
					$(this).text(editCount.toLocaleString());
				}
			});
			return true;
		};

		if (format()) {
			return; // stats were already present at hook time
		}

		var observer = new MutationObserver(function () {
			format();
		});
		observer.observe(elem, { childList: true, subtree: true });
	});
})(jQuery, mediaWiki);