/**
 * @title HoverGlobalMenus
 * @version v1.0.2
 * @author DarkBarbarian
 * @description Makes the notification and user avatar buttons in the global navigation hoverable, instead of the click default
 */

mw.loader.using('mediawiki.api', function() {
	"use strict";
	
	if (window.hoverGlobalMenusLoaded) {
		return;
	}
	window.hoverGlobalMenusLoaded = true;
		
	function mutationHoverHelper(targetSelector, eventSelector) {
		var observer = new MutationObserver(function() {
			$(eventSelector).on('mouseleave', function() {
				$('body').click();
			});
			observer.disconnect();
		});
		observer.observe($(targetSelector).get(0), { attributes: false, childList: true, subtree: false });
	}
	
	// Notifications
	mutationHoverHelper('#global-top-navigation button[aria-controls="notifications__content"]', '#notifications__content');
	$('.notifications.global-action__item.global-action-notifications').each(function(_, element) {
		$(element).on('mouseenter', function() {
			if (!$('#global-top-navigation .notifications .wds-dropdown').hasClass('wds-is-active'))
				$('.wds-dropdown__toggle.notifications__toggle').first().click();
		});
	});
	
	// Account menu
	mutationHoverHelper('#user-panel__content', '#user-panel__content > .navigation-panel');
	$('.global-action__item.global-action__user').each(function(_, element) {
		$(element).on('mouseenter', function() {
			if (!$(element).hasClass('wds-is-active'))
				$('button[aria-controls="user-panel__content"]').first().click();
		});
	});
});