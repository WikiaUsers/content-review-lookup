;(function () {
	'use strict';

	window.dev = window.dev || {};
	if (window.dev.ct) {
		return;
	}
	window.dev.ct = {};

	var conf = mw.config.get([ 'wgArticlePath', 'wgUserLanguage' ]);
	var wgArticlePath = conf.wgArticlePath; // "/wiki/$1", "/es/wiki/$1"
	var wgUserLanguage = conf.wgUserLanguage;

	function _addCustomTools(settings) {
		mw.hook('dev.wds').add(function(wds) {
			mw.hook('dev.i18n').add(function(i18n) {
				while (settings.length) {
					var options = settings.shift();

					if (options.placement === 'activity-tabs' && $('.activity-tabs').length) {
						var containerSettings = {
							container: $('.activity-tabs .wds-tabs'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var $button = $('<li>', {
									class: 'wds-tabs__tab ' + customClasses
								});
								var $link = $('<a>', {
									href: options.link,
									text: options.text
								});
								if (options.icon) {
									$link.prepend(wds.icon(options.icon + '-small', {
										style: 'margin-right: 7px'
									}));
								}
								$button.append($('<div>', {
									class: 'wds-tabs__tab-label'
								}).append($link));
								return $button;
							}
						};
						runWithI18n(addButtonsToContainer, options, containerSettings, wds, i18n);
					} else if (options.placement === 'explore') {
						runWithI18n(function(options, _containerSettings, wds, i18n) {
							addToListContainer($.extend({}, options), {
								container: $('.fandom-sticky-header .explore-menu .wds-list'),
								iconClass: 'navigation-item-icon'
							}, wds, i18n);
							addToListContainer(options, {
								container: $('.community-header-wrapper .explore-menu .wds-list'),
								iconClass: 'navigation-item-icon'
							}, wds, i18n);
						}, options, null, wds, i18n);
					} else if (options.placement === 'global-navigation') {
						var containerSettings = {
							container: $('.global-navigation__links'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var buttonTag = options.link ? '<a>' : '<div>';
								var $button = $(buttonTag, {
									class: 'global-navigation__link ' + customClasses,
									href: options.link
								});
								$button.append($('<span>', {
									class: 'global-navigation__icon has-background'
								}).append(wds.icon(options.icon)));
								$button.append($('<span>', {
									class: 'global-navigation__label',
									text: options.text
								}));
								return $button;
							},
							forceIcon: true
						};
						runWithI18n(addButtonsToContainer, options, containerSettings, wds, i18n);
					} else if (options.placement === 'global-navigation-dropdown') {
						runWithI18n(addToListContainer, options, {
							container: $('.global-navigation__bottom .wds-dropdown .wds-list')
						}, wds, i18n);
					} else if (options.placement === 'my-tools') {
						if ($('#my-tools-menu').length) {
							runWithI18n(addToListContainer, options, {
								container: $('#my-tools-menu')
							}, wds, i18n);
						} else {
							settings.push($.extend({}, options, {
								placement: 'toolbar'
							}));
						}
					} else if (options.placement === 'page-actions' && $('.page-header__actions').length) {
						var containerSettings = {
							container: $('.page-header__actions'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var $button = $('<a>', {
									class: 'wds-button wds-is-text page-header__action-button has-label ' + customClasses,
									href: options.link,
									text: options.text
								});
								if (options.icon) {
									$button.prepend(wds.icon(options.icon + '-small'));
								}
								return $button;
							}
						};
						runWithI18n(addButtonsToContainer, options, containerSettings, wds, i18n);
					} else if (options.placement === 'page-actions-dropdown' && $('.page-header__actions #p-cactions').length) {
						runWithI18n(addToListContainer, options, {
							container: $('.page-header__actions #p-cactions .wds-list')
						}, wds, i18n);
					} else if (options.placement === 'page-tools-left') {
						var containerSettings = {
							container: $('.page-side-tools'),
							createButton: function(options) {
								var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
								var buttonTag = options.link ? '<a>' : '<button>';
								var $button = $(buttonTag, {
									class: 'page-side-tool custom-side-tool ' + customClasses,
									data: {
										'wds-tooltip-name': options.i18nKey,
										'wds-tooltip-text': options.text
									},
									href: options.link
								});
								$button.append(wds.icon(options.icon + '-small'));
								return $button;
							},
							forceIcon: true,
							hasTooltips: true
						};
						runWithI18n(addButtonsToContainer, options, containerSettings, wds, i18n);
					} else if (options.placement === 'page-tools-right' && $('.page.has-right-rail').length) {
						$.when(findContainer('.page-tools-module .rail-module__list', options)).then(function(_container, options) {
							runWithI18n(addToListContainer, options, {
								container: $('.page-tools-module .rail-module__list')
							}, wds, i18n);
						});
					} else if (options.placement === 'toolbar') {
						runWithI18n(addToListContainer, options, {
							container: $('#WikiaBar .tools')
						}, wds, i18n);
					} else if ((options.placement === 'user-links' || options.placement === 'user-stats') && mw.config.get('profileUserName')) {
						$.when(findContainer('#userProfileApp .user-identity-header__actions', options)).then(function(_container, options) {
							var containerSettings;
							if (options.placement === 'user-links') {
								containerSettings = {
									container: $('#userProfileApp .user-profile-navigation'),
									listItemClass: 'user-profile-navigation__link'
								};
							} else { // user-stats
								containerSettings = {
									container: $('#userProfileApp .user-identity-stats')
								};
							}
							runWithI18n(addToListContainer, options, containerSettings, wds, i18n);
						});
					} else if (options.placement === 'wiki-tools') {
						runWithI18n(function(options, _containerSettings, wds, i18n) {
							var containerSettings = {
								createButton: function(options) {
									var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
									var $button = $('<a>', {
										class: 'wds-button wds-is-secondary ' + customClasses,
										href: options.link,
										title: options.i18nKey ? i18n.msg(options.i18nKey).plain() : options.text
									});
									$button.append(wds.icon(options.icon + '-small'));
									return $button;
								},
								forceIcon: true
							};
							addButtonsToContainer($.extend({}, options), $.extend({}, containerSettings, {
								container: $('.community-header-wrapper .wiki-tools')
							}), wds, i18n);
							addButtonsToContainer(options, $.extend({}, containerSettings, {
								container: $('.fandom-sticky-header .wiki-tools')
							}), wds, i18n);
						}, options, null, wds, i18n);
					} else if (options.placement === 'wiki-tools-dropdown') {
						runWithI18n(function(options, _containerSettings, wds, i18n) {
							var containerSettings = {
								createButton: function(options) {
									var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
									var $button = $('<a>', {
										class: 'wds-button wds-is-secondary ' + customClasses,
										href: options.link,
										title: options.i18nKey ? i18n.msg(options.i18nKey).plain() : options.text
									});
									$button.append(wds.icon(options.icon + '-small'));
									return $button;
								},
								forceIcon: true
							};
							addToListContainer($.extend({}, options), $.extend({}, containerSettings, {
								container: $('.community-header-wrapper .wiki-tools .wds-dropdown .wds-list')
							}), wds, i18n);
							addToListContainer(options, $.extend({}, containerSettings, {
								container: $('.fandom-sticky-header .wiki-tools .wds-dropdown .wds-list')
							}), wds, i18n);
						}, options, null, wds, i18n);
					}
				}
			});
		});
	}

	function addToListContainer(options, containerSettings, wds) {
		if (options.link) {
			options.link = parseLink(options.link);
		}
		var $tool = $('<li>', {
			class: containerSettings.listItemClass
		});

		var $link = $('<a>', {
			href: options.link,
			text: options.text
		}).appendTo($tool);
		if (options.icon) {
			$link.prepend(' ').prepend(wds.icon(options.icon + '-tiny', {
				class: containerSettings.iconClass
			}));
		}

		if (options.click) {
			$tool.click(options.click);
		}

		insertInPosition(containerSettings.container, $tool, options.position);
	}

	function addButtonsToContainer(options, containerSettings, wds) {
		options.classes = options.classes || [];
		if (options.link) {
			options.link = parseLink(options.link);
		}
		if (!options.icon && containerSettings.forceIcon) {
			options.icon = 'error';
		}
		var $button = containerSettings.createButton(options);
		insertInPosition(containerSettings.container, $button, options.position);

		if (options.click) {
			$button.click(options.click);
		}

		if (!containerSettings.hasTooltips) {
			return;
		}

		$button.data('wds-tooltip-name', options.text);
		$button.mouseenter(function() {
			var topPosition = ($(this).offset().top - $(document).scrollTop() + 20) + 'px';
			var leftPosition = ($(this).offset().left + 50) + 'px';
			$('<div>', {
				class: 'wds-tooltip is-right',
				css: {
					left: leftPosition,
					top: topPosition
				},
				id: 'tooltip-' + options.i18nKey,
				text: $(this).data('wds-tooltip-name')
			}).appendTo('body');
		});

		$button.mouseleave(function() {
			var tooltip = document.getElementById('tooltip-' + options.i18nKey);
			if (tooltip) {
				tooltip.remove();
			}
		});
	}

	// https://dev.fandom.com/wiki/MediaWiki:AddUserRightsTag/code.js
	function findContainer(identifier, options) {
		var promise = $.Deferred();
		var interval = setInterval(function() {
			var $element = $(identifier);
			if ($element.length) {
				clearInterval(interval);
				promise.resolve($element, options);
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

	function loadSystemMessages(settings) {
		var optionsWithSystemMessages = [];
		for (var i = 0; i < settings.length; i++) {
			var options = settings[i];
			if (options.system) {
				optionsWithSystemMessages.push(options);
			}
		}

		if (!optionsWithSystemMessages.length) {
			return;
		}
		var systemMessages = optionsWithSystemMessages.map(function(item) {
			return item.text;
		});

		var promise = $.Deferred();
        new mw.Api().get({
            action: 'query',
            amlang: wgUserLanguage,
            ammessages: systemMessages.join('|'),
            format: 'json',
            formatversion: 2,
            meta: 'allmessages'
        }).then(function(data) {
        	var allmessages = data.query.allmessages.reduce(function(messages, item) {
        		messages[item.name] = item.content;
        		return messages;
        	}, {});
        	for (var i = 0; i < optionsWithSystemMessages.length; i++) {
        		var label = optionsWithSystemMessages[i].text;
        		if (allmessages[label]) {
        			optionsWithSystemMessages[i].text = allmessages[label];
        		}
        	}
        	promise.resolve();
        });

        return promise;
	}

	function runWithI18n(callback, options, containerSettings, wds, i18n) {
		if (!options.i18n || options.i18nLoaded) {
			callback(options, containerSettings, wds);
			return;
		}
		i18n.loadMessages(options.i18n).done(function(i18n) {
			options.text = i18n.msg(options.text).plain();
			options.i18nLoaded = true;
			callback(options, containerSettings, wds, i18n);
		});
	}

	function parseLink(href) {
		if (href.match(/^(http:|https:)?\/\//)) { // http://, https://, //
			return href;
		} else if (href.startsWith('/')) {
			return wgArticlePath.replace('/wiki/$1', href);
		} else {
			return wgArticlePath.replace('$1', href);
		}
	}

	function setup(settings) {
		settings = Array.isArray(settings) ? settings : [ settings ];
		$.when(loadSystemMessages(settings)).then(function() {
			_addCustomTools(settings);
		});
	}

	mw.loader.using(['jquery', 'mediawiki.api']).then(function() {
		window.dev.ct.setup = setup;

		mw.hook('dev.ct').fire(setup);

		if (window.CustomTools) {
			setup(window.CustomTools);
		}

		if (mw.user.options.get('userjs-custom-tools')) {
			setup(JSON.parse(mw.user.options.get('userjs-custom-tools')));
		}
	});

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js',
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});
}());