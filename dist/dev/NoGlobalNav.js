/*
 * NoGlobalNav
 *
 * @description Removes the FandomDesktop global navigation and moves user and notification dropdowns to top right
 * @author Joritochip
 *
 * Make sure you also import the CSS at [[MediaWiki:NoGlobalNav.css]]
 */

$(function() {
	if (mw.config.get('skin') !== 'fandomdesktop' || window.NoGlobalNavLoaded) return;
	window.NoGlobalNavLoaded = true;
	
	$('.global-navigation__bottom').clone().addClass('user-navigation-moved').removeClass('global-navigation__bottom').appendTo('.wiki-tools.wds-button-group');
	$('.user-navigation-moved .notifications').attr('class', 'moved-notifications');
	$('.user-navigation-moved .notifications__toggle svg').addClass('wds-icon-small');
	$('.user-navigation-moved .notifications__counter').attr('class', 'moved-notifications__counter');
	$('.user-navigation-moved .moved-notifications .wds-dropdown__content').remove();
	$('.user-navigation-moved .moved-notifications .wds-dropdown').attr('class', '');
	$('.user-navigation-moved .moved-notifications .wds-dropdown__toggle').removeClass('wds-dropdown__toggle');
	$('.user-navigation-moved .wds-dropdown.wds-open-to-right').removeClass('wds-open-to-right');
	$('.user-navigation-moved .wds-dropdown .wds-dropdown__content').addClass('wds-is-right-aligned');
	$('.user-navigation-moved .moved-notifications .global-navigation__icon').click(function(e) {
		e.stopPropagation();
		$('.global-navigation .notifications .global-navigation__icon').click();
	});
	
	/* Add classes/variables for notification dropdown when sticky nav is not visible */
	if ($('.fandom-community-header__image').length) {
		var height = $('.fandom-community-header__image img').attr('height');
		$('body').addClass('user-navigation-moved__has-header-image');
		$(':root').css('--theme-icon-height', height+'px');
	}
	
	/* Propagate unread notification count to cloned counters */
	var counter = $('.global-navigation .notifications__counter');
	if (counter.text()) {
		$('.user-navigation-moved .moved-notifications__counter').text(counter.text());
	} else {
		new MutationObserver(function(n, observer) {
			var text = counter.text();
			if (text) {
				$('.user-navigation-moved .moved-notifications__counter').text(text);
				observer.disconnect();
			}
		}).observe(counter[0], {
			childList: true
		});
	}
});