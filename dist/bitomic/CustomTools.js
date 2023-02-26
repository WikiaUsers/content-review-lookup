;(function (window, $, mw) {
	'use strict';

	window.dev = window.dev || {};
	if (window.dev.ct) {
		return;
	}
	window.dev.ct = {};

	function setup(settings) {
		mw.hook('dev.wds').add(function(wds) {
			mw.hook('dev.i18n').add(function(i18n) {
				i18n.loadMessages(settings.i18n).done(function(i18n) {
					if (settings.activityTabs && $('.activity-tabs').length) {
						addButtonsToContainer(settings.activityTabs, {
							container: $('.activity-tabs .wds-tabs'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var $button = $('<li>', {
									class: 'wds-tabs__tab ' + customClasses
								});
								var $link = $('<a>', {
									href: options.href,
									text: options.i18nKey ? i18n.msg(options.i18nKey).plain() : options.text
								});
								if (options.wdsIcon) {
									$link.prepend(wds.icon(options.wdsIcon + '-small', {
										style: 'margin-right: 7px'
									}));
								}
								$button.append($('<div>', {
									class: 'wds-tabs__tab-label'
								}).append($link));
								return $button;
							}
						}, i18n, wds);
					}

					if (settings.explore) {
						addToListContainer({
							container: $('.fandom-sticky-header .explore-menu .wds-list'),
							iconClass: 'navigation-item-icon'
						}, settings.explore, i18n, wds);
						addToListContainer({
							container: $('.community-header-wrapper .explore-menu .wds-list'),
							iconClass: 'navigation-item-icon'
						}, settings.explore, i18n, wds);
					}

					if (settings.globalNavigationDropdown) {
						addToListContainer({
							container: $('.global-navigation__bottom .wds-dropdown .wds-list')
						}, settings.globalNavigationDropdown, i18n, wds);
					}

					if (settings.myTools) {
						assertMyToolsMenu();
						addToListContainer({
							container: $('#my-tools-menu')
						}, settings.myTools, i18n, wds);
					}

					if (settings.pageActions && $('.page-header__actions').length) {
						addButtonsToContainer(settings.pageActions, {
							container: $('.page-header__actions'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var $button = $('<a>', {
									class: 'wds-button wds-is-text page-header__action-button has-label ' + customClasses,
									href: options.href,
									text: options.i18nKey ? i18n.msg(options.i18nKey).plain() : undefined
								});
								if (options.wdsIcon) {
									$button.prepend(wds.icon(options.wdsIcon + '-small'));
								}
								return $button;
							}
						}, i18n, wds);
					}

					if (settings.pageActionsDropdown && $('.page-header__actions #p-cactions').length) {
						addToListContainer({
							container: $('.page-header__actions #p-cactions .wds-list')
						}, settings.pageActionsDropdown, i18n, wds);
					}

					if (settings.pageSideTools) {
						addButtonsToContainer(settings.pageSideTools, {
							container: $('.page-side-tools'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var buttonTag = options.href ? '<a>' : '<button>'
								var $button = $(buttonTag, {
									class: 'page-side-tool custom-side-tool ' + customClasses,
									data: {
										'wds-tooltip-name': options.i18nKey
									},
									href: options.href
								});
								$button.append(wds.icon(options.wdsIcon + '-small'));
								return $button;
							},
							forceIcon: true,
							hasTooltips: true
						}, i18n,wds);
					}

					if (settings.pageTools && $('.page.has-right-rail').length) {
						$.when(findContainer('.page-tools-module .rail-module__list')).then(function() {
							addToListContainer({
								container: $('.page-tools-module .rail-module__list')
							}, settings.pageTools, i18n, wds);
						});
					}

					if (settings.toolbar) {
						addToListContainer({
							container: $('#WikiaBar .tools')
						}, settings.toolbar, i18n, wds);
					}

					if (mw.config.get('profileUserName') && (settings.userLinks || settings.userStats)) {
						$.when(findContainer('#userProfileApp .user-identity-header__actions')).then(function() {
							if (settings.userLinks) {
								addToListContainer({
									container: $('#userProfileApp .user-profile-navigation'),
									listItemClass: 'user-profile-navigation__link'
								}, settings.userLinks, i18n, wds);
							}

							if (settings.userStats) {
								addToListContainer({
									container: $('#userProfileApp .user-identity-stats')
								}, settings.userStats, i18n, wds);
							}
						});
					}

					if (settings.wikiTools) {
						addButtonsToContainer(settings.wikiTools, {
							container: $('.fandom-community-header__top-container .wiki-tools'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var $button = $('<a>', {
									class: 'wds-button wds-is-secondary ' + customClasses,
									href: options.href,
									title: i18n.msg(options.i18nKey).plain()
								});
								$button.append(wds.icon(options.wdsIcon + '-small'));
								return $button;
							},
							forceIcon: true

						}, i18n,wds);
					}

					if (settings.wikiToolsDropdown) {
						addToListContainer({
							container: $('.fandom-community-header__top-container .wiki-tools .wds-dropdown .wds-list')
						}, settings.wikiToolsDropdown, i18n, wds);
					}
				});
			});
		});
	}

	function addToListContainer(containerSettings, tools, i18n, wds) {
		for (var i = 0; i < tools.length; i++) {
			var options = tools[i];
			var $tool = $('<li>', {
				class: containerSettings.listItemClass
			});

			var $link = $('<a>', {
				href: options.href,
				text: options.i18nKey ? i18n.msg(options.i18nKey).plain() : options.text
			}).appendTo($tool);
			if (options.wdsIcon) {
				$link.prepend(' ').prepend(wds.icon(options.wdsIcon + '-tiny', {
					class: containerSettings.iconClass
				}));
			}

			if (options.click) {
				$tool.click(options.click);
			}

			insertInPosition(containerSettings.container, $tool, options.position);
		}
	}

	function addButtonsToContainer(buttons, containerSettings, i18n, wds) {
		for (var i = 0; i < buttons.length; i++) {
			var options = buttons[i];
			options.classes = options.classes || [];
			if (!options.wdsIcon && containerSettings.forceIcon) {
				options.wdsIcon = 'error';
			}
			var $button = containerSettings.createButton(options);
			insertInPosition(containerSettings.container, $button, options.position);

			if (options.click) {
				$button.click(options.click);
			}

			if (!containerSettings.hasTooltips) {
				continue;
			}

			var tooltipId = 'tooltip-' + options.i18nKey;
			$button.mouseenter(function() {
				var tooltipmsg = i18n.msg($(this).data('wds-tooltip-name')).plain();
				var topPosition = ($(this).offset().top - $(document).scrollTop() + 20) + 'px';
				var leftPosition = ($(this).offset().left + 50) + 'px';
				$('<div>', {
					class: 'wds-tooltip is-right',
					css: {
						left: leftPosition,
						top: topPosition
					},
					id: tooltipId,
					text: tooltipmsg
				}).appendTo('body');
			});

			$button.mouseleave(function() {
				var tooltip = document.getElementById(tooltipId);
				if (tooltip) {
					tooltip.remove();
				}
			});
		}
	}

	function assertMyToolsMenu() {
		if (!$('#my-tools-menu').length) {
			var $myToolsMenu = $('<li>', {
				class: 'mytools menu wds-dropdown wds-is-flipped',
				html: '<span class="wds-dropdown__toggle">' +
					'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>' +
					'<a href="#">Mis herramientas</a>' +
				'</span>' +
				'<div class="wds-dropdown__content">' +
					'<ul id="my-tools-menu" class="tools-menu wds-list wds-is-linked">' +
					'</ul>' +
				'</div>'
			});
			$('#WikiaBar .tools').prepend($myToolsMenu);
		}
	}

	// https://dev.fandom.com/wiki/MediaWiki:AddUserRightsTag/code.js
	function findContainer(identifier) {
		var promise = $.Deferred();
		var interval = setInterval(function() {
			var $element = $(identifier);
			if ($element.length) {
				clearInterval(interval);
				promise.resolve($element);
			}
		}, 300);
		return promise;
	}

	function insertInPosition($container, $item, index) {
		index = index || 0;

		var $children = $container.children();
		if (index < 0) {
			index = $children.length + index + 1;
		}
		var $child = $children.eq(index);

		if (!$child || $child.length === 0) {
			$item.appendTo($container);
		} else {
			$item.insertBefore($child);
		}
	}

	mw.loader.using(['jquery']).then(function() {
		mw.hook('dev.ct').fire(setup);
	});

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js',
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});
}(this, jQuery, mediaWiki));