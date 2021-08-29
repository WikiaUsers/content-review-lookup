/*
 * CategorizedNotifications
 * @description Separates notifications into five categories based on where they came from for easier navigation
 * @author Joritochip
 */

$(function() {
	if (
		mw.config.get('skin') !== 'fandomdesktop' || 
		window.CategorizedNotificationsLoaded === true
	) return;
	window.CategorizedNotificationsLoaded = true;
	
	var categoryMap = [
		{
			icon: 'bell',
			title: 'Announcements',
			types: ['announcement']
		},
		{
			icon: 'envelope',
			title: 'Messages',
			types: ['message-wall-post', 'message-wall-reply', 'talk-page-message']
		},
		{
			icon: 'comment',
			title: 'Comments',
			types: ['article-comment-reply', 'article-comment-at-mention', 'article-comment-reply-at-mention']
		},
		{
			icon: 'blocks',
			title: 'Discussions',
			types: ['discussion-reply', 'discussion-upvote-post', 'post-at-mention', 'thread-at-mention']
		},
		{
			icon: 'more',
			title: 'Miscellaneous',
			types: ['DEFAULT']
		}
	];
	
	if (window.CategorizedNotificationsConfig) {
		categoryMap = window.CategorizedNotificationsConfig;
	}
	
	function translateCategory(attr) {
		attr = attr.slice(19);
		var category, def;
		
		categoryMap.forEach(function(array) {
			if (array.types.indexOf(attr) !== -1) {
				category = array;
			}
			if (array.types.indexOf('DEFAULT') !== -1) {
				def = array;
			}
		});
		
		return category || def;
	}
	
	function beginObserving(tabber) {
		var hasOpened = false;
		var container = $(".global-navigation__bottom .notifications");
		
		new MutationObserver(function() {
			var content = $('.NotificationsDropdown-module_tabber__1qKxW');
			if (!hasOpened && content.length) {
				hasOpened = true;
				content.hide();
				tabber.appendTo(content.parent()[0]);
			}
			
			var notifications = $('.wds-tabber:not(.categorized-notifications) .NotificationCard-module_card__2YXOh');
			
			notifications.each(function(index, notification) {
				notification = $(notification);
				var tabData = translateCategory(notification.attr('data-tracking-label'));
				if (tabData) {
					var tab = $('.categorized-notifications-' + tabData.icon + ' ul');
					if (tab.length) {
						if (notification.find('.NotificationCard-module_unreadStatusDot__q1FDX').length) {
							tabData.count += 1;
							tabData.counter.text(tabData.count);
						}
						notification.appendTo(tab);
					}
				}
			});
			
			var scroll = $('.NotificationsDropdown-module_scrollableListWrapper__2m4TQ ul');
			if (notifications.length && scroll.length) {
				scroll[0].dispatchEvent(new CustomEvent('scroll'));
			}
		}).observe(container[0], {
			childList: true,
			subtree: true
		});
	}
	
	mw.hook('dev.wds').add(function(wds) {
		var tabber = $('<div class="wds-tabber categorized-notifications"></div>');
		var wrapper = $('<div class="wds-tabs__wrapper"></div>').appendTo(tabber);
		var labels = $('<ul class="wds-tabs" style="justify-content: space-around;"></ul>').appendTo(wrapper);
		
		categoryMap.forEach(function(array, index) {
			var icon = array.icon;
			array.count = 0;
			
			$('<li>', {
				class: 'wds-tabs__tab ' + (index === 0 ? 'wds-is-current' : '')
			}).append(
				$('<span>', {
					class: 'wds-tabs__tab-label',
					title: array.title
				}).append(
					wds.icon(icon + '-small'),
					array.counter = $('<span>', {
						class: 'notifications__counter'
					})
				)
			).appendTo(labels);
			
			$('<div>', {
				class: 'wds-tab__content categorized-notifications-' + icon + ' ' + (index === 0 ? ' wds-is-current' : '')
			}).append(
				$('<div>', {
					class: 'NotificationsDropdown-module_scrollableListWrapper_2m4Tq tab-wrapper'
				}).append(
					$('<ul>').append(
						$('<div>', {
							class: 'NotificationsZeroState-module_container__3Y2qX tab-empty'
						}).append(
							$('<span>', {
								class: 'NotificationsZeroState-module_icon__NGpTP'
							}).append(wds.icon('bell')),
							$('<div>', {
								class: 'NotificationsZeroState-module_header__1FDbq',
								text: 'You have no notifications.'
							}),
							$('<p>', {
								text: 'Check back later for new notifications.'
							})
						)
					)
				)
			).appendTo(tabber);
		});
		
		mw.util.addCSS('.notifications .categorized-notifications .tab-wrapper>ul::after,.notifications .categorized-notifications .tab-wrapper>ul::before,.notifications .categorized-notifications .tab-empty{display:none}.notifications .categorized-notifications .tab-empty:only-child{display:flex}.notifications .categorized-notifications .tab-wrapper,.notifications .categorized-notifications .tab-wrapper>ul{width:100%;height:100%}.notifications .categorized-notifications{display:flex;flex-direction:column;height:100%}.notifications .categorized-notifications .wds-tab__content{height:100%;overflow-x:hidden}');
		
		beginObserving(tabber);
	});
	
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:WDSIcons/code.js'
    });
});