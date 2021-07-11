$(function() {
	//check skin, double-run protection, initialize script configuration
	if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeTogglerLoaded) return;
	window.ThemeTogglerLoaded = true;
	window.ThemeToggler = window.ThemeToggler || {};
	
	//initialize script-wide variables
	var paramRegExp = /(\?|&)variant(?:=[^&]*)?(&|$)/g,
		scriptsReady = $.Deferred(),
		themes = {
			current: 'user'
		},
		i18n, api;
	
	//function to change theme and update user interface
	function setTheme(newTheme) {
		if (!((newTheme === 'light') || (newTheme === 'dark') || (newTheme === 'wiki')))
			newTheme = 'user';
		if (newTheme === themes.current) return;
		
		var cssLinks = $('link[href*="/wikia.php"][href*="controller=ThemeApi"]'
			+ '[href*="method=themeVariables"]'),
			indicator = $('#ThemeToggler-indicator'),
			sideWikiButton = $('.skin-theme-wiki'),
			sideUserButton = $('.skin-theme-user'),
			sideSaveButton = $('.skin-theme-save');
		
		themes.current = newTheme;
		
		if (newTheme === 'user') {
			indicator.text(i18n.user.plain());
			sideUserButton.addClass('custom-side-tool-disabled');
			sideSaveButton.addClass('custom-side-tool-disabled');
			
			newTheme = themes.user;
		} else {
			indicator.text(i18n[newTheme].plain());
			sideUserButton.removeClass('custom-side-tool-disabled');
			sideSaveButton.removeClass('custom-side-tool-disabled');
		}
		
		if (newTheme === 'wiki') {
			cssLinks.attr('href', function(i, v) {
				return v.replace(paramRegExp, function(m, p1, p2) {
					return p2 === '&' ? (p1 === '?' ? '?' : '&') : '';
				});
			});
			
			sideWikiButton.addClass('custom-side-tool-disabled');
			
			newTheme = themes.wiki;
		} else {
			cssLinks.attr('href', function(i, v) {
				return !paramRegExp.test(v) ? v + '&variant=' + newTheme
					: v.replace(paramRegExp, function(m, p1, p2) {
					return p1 + 'variant=' + newTheme + p2;
				});
			});
			
			sideWikiButton.removeClass('custom-side-tool-disabled');
		}
		
		$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark')
			.addClass('theme-fandomdesktop-' + newTheme);
		$('.skin-theme-light-dark').data('wds-tooltip-name', 'tt-' + (newTheme ===
			'light' ? 'dark' : 'light'));
	}
	
	/*
	//function to toggle theme
	function toggleWithoutReload() {
		var newTheme = $('body').hasClass('theme-fandomdesktop-light') ? 'dark' : 'light';
		
		// Implementation by [[User:Pcj]] from ThemeSwitcher
		$.get(mw.util.wikiScript('wikia') + '?controller=ThemeApi&method=themeVariables'
			+ '&variant=' + newTheme + '&cb=' + (new Date().getTime())).done(function(data) {
			var $s = $('#pcjThemeSwitch')[0] || $('<style>').attr('id','pcjThemeSwitch')
				.appendTo('body');
			$($s).text(data);
			$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark')
				.addClass('theme-fandomdesktop-' + newTheme);
		});
	}
	*/
	
	$.when(
		//load [[WDSIcons]] and script messages from [[I18n-js]]
		scriptsReady.then(function() {
			return window.dev.i18n.loadMessages('ThemeToggler').then(function(m) {
				i18n = {
					light: m.msg('light'),
					dark: m.msg('dark'),
					wiki: m.msg('wiki'),
					user: m.msg('user'),
					current: m.msg('current'),
					'tt-preferences-toggle': m.msg('tt-preferences-toggle'),
					'tt-temporary-toggle': m.msg('tt-temporary-toggle'),
					'tt-light': m.msg('tt-light').exists ? m.msg('tt-light')
						: (m.msg('light').exists ? m.msg('light') : m.msg('tt-temporary-toggle')),
					'tt-dark': m.msg('tt-dark').exists ? m.msg('tt-dark')
						: (m.msg('dark').exists ? m.msg('dark') : m.msg('tt-temporary-toggle')),
					'tt-wiki': m.msg('tt-wiki').exists ? m.msg('tt-wiki') : m.msg('wiki'),
					'tt-user': m.msg('tt-user').exists ? m.msg('tt-user') : m.msg('user'),
					'tt-save': m.msg('tt-save'),
					'bn-error-known': m.msg('bn-error-known'),
					'bn-error-unknown': m.msg('bn-error-unknown'),
				};
			});
		}),
		/*
			load and wait for required modules, set script-wide API object, retrieve
			user's theme preference, retrieve success message for preference saving
		*/
		mw.loader.using([
			'mediawiki.api',
			'mediawiki.util'
		]).then(function() {
			api = new mw.Api();
			return $.when(
				api.loadMessagesIfMissing(['savedprefs']),
				api.get({
					action: 'query',
					meta: 'userinfo',
					uiprop: 'options'
				}).then(function(data) {
					themes.user = data && data.query && data.query.userinfo
						&& data.query.userinfo.options && data.query.userinfo.options.theme;
					if ((themes.user !== 'light') && (themes.user !== 'dark')) themes.user = 'wiki';
				})
			);
		}),
		//determine wiki's preset theme
		$.ajax({
			url: mw.config.get('wgScriptPath') + "/wikia.php",
			type: 'GET',
			dataType: 'text',
			data: {
				controller: 'ThemeApi',
				method: 'themeVariables'
			}
		}).then(function(wiki_css) {
			return $.ajax({
				url: mw.config.get('wgScriptPath') + "/wikia.php",
				type: 'GET',
				dataType: 'text',
				data: {
					controller: 'ThemeApi',
					method: 'themeVariables',
					variant: 'dark'
				}
			}).then(function(dark_css) {
				themes.wiki = wiki_css === dark_css ? 'dark' : 'light';
			});
		})
	).done(function() {
		var wds = window.dev.wds,
			bn = window.dev.banners.BannerNotification,
			successBanner = new bn(mw.messages.values.savedprefs, 'confirm', false, 3000),
			iconSetPreference = '<svg height="18" width="18" viewBox="0 0 18 18"'
				+ ' class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg">'
				+ '<use height="12" width="12" xlink:href="#wds-icons-avatar-small"></use>'
				+ '<use y="6" x="6" height="12" width="12" xlink:href="#wds-icons-pencil-small">'
				+ '</use></svg>',
			iconWikiTheme = '<svg height="18" width="18" viewBox="0 0 18 18"'
				+ ' class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg">'
				+ '<use height="12" width="12" xlink:href="#wds-icons-light-mode-small">'
				+ '</use><use y="6" x="-18" height="12" width="12" style="transform:'
				+ ' rotateY(180deg);" xlink:href="#wds-icons-dark-mode-small"></use></svg>',
			tooltips = {},
			running;
		
		//insert a small about of CSS
		mw.util.addCSS('#ThemeToggler-wrapper { align-self: stretch; display: flex;'
			+ ' flex-direction: column; justify-content: space-around; align-items:'
			+ ' flex-end; } #ThemeToggler-indicator:hover { z-index: auto; color:'
			+ ' var(--wds-secondary-button-label-color); } .custom-side-tool-disabled {'
			+ ' position: relative; pointer-events: none; } .custom-side-tool-disabled::before'
			+ ' { content: ""; position: absolute; width: 100%; height: 100%;'
			+ ' border-radius: 50%; background-color: rgba(0, 0, 0, 0.5); }'
			+ ' .theme-fandomdesktop-light .skin-theme-light-dark svg[data-id="wds-'
			+ 'icons-light-mode-small"], .theme-fandomdesktop-dark .skin-theme-light-dark'
			+ ' svg[data-id="wds-icons-dark-mode-small"] { display: none; }'
			+ (window.ThemeToggler.hideBuiltIn ? ' .wiki-tools__theme-switch { display:'
			+ ' none; }' : ''));
		
		if (!window.ThemeToggler.disableSideButtons) {
			$('<button class="page-side-tool custom-side-tool skin-theme-toggle"'
				+ ' data-wds-tooltip-name="tt-preferences-toggle" data-wds-tooltip-position="right"'
				+ ' data-tooltip-attached="1"></button>').appendTo('.page-side-tools')
				.append(wds.icon('eye-small')).click(function() {
				if (running) return;
				running = true;
				var newTheme = $('body').hasClass('theme-fandomdesktop-light') ? 'dark' : 'light';
				api.postWithEditToken({
					action: 'options',
					optionname: 'theme',
					optionvalue: newTheme
				}).then(
					function() {
						successBanner.show();
						themes.user = newTheme;
						setTheme(newTheme);
						$('.skin-theme-user, .skin-theme-save').addClass('custom-side-tool-disabled');
					},
					function(data) {
						(typeof data === 'string' ? new bn(i18n['bn-error-known'].escape() + ' ' + data,
							'error') : new bn(i18n['bn-error-unknown'].escape(), 'error', 3000)).show();
					}
				).always(function() {
					running = false;
				});
			});
			
			$('<button class="page-side-tool custom-side-tool skin-theme-toggle-temporal"'
				+ ' data-wds-tooltip-name="tt-temporary-toggle" data-wds-tooltip-position="right"'
				+ ' data-tooltip-attached="1"></button>').appendTo('.page-side-tools')
				.append(wds.icon('clock-small')).click(function() {
				if (running) return;
				running = true;
				setTheme($('body').hasClass('theme-fandomdesktop-light') ? 'dark' : 'light');
				running = false;
			});
		}
		
		if (window.ThemeToggler.newSideButtons) {
			$('<button class="page-side-tool custom-side-tool skin-theme-light-dark"'
				+ ' data-wds-tooltip-name="tt-' + ($('body').hasClass('theme-fandomdesktop-light')
				? 'dark' : 'light') + '" data-wds-tooltip-position="right"'
				+ ' data-tooltip-attached="1"></button>').appendTo('.page-side-tools')
				.append(wds.icon('light-mode-small'), wds.icon('dark-mode-small'))
				.click(function() {
				if (running) return;
				running = true;
				$(this).mouseleave();
				setTheme($('body').hasClass('theme-fandomdesktop-light') ? 'dark' : 'light');
				$(this).mouseenter();
				running = false;
			});

			$('<button class="page-side-tool custom-side-tool skin-theme-wiki"'
				+ ' data-wds-tooltip-name="tt-wiki" data-wds-tooltip-position="right"'
				+ ' data-tooltip-attached="1"></button>').appendTo('.page-side-tools')
				.append(iconWikiTheme).click(function() {
				if (running) return;
				running = true;
				setTheme('wiki');
				running = false;
			});

			$('<button class="page-side-tool custom-side-tool skin-theme-user'
				+ ' custom-side-tool-disabled" data-wds-tooltip-name="tt-user"'
				+ ' data-wds-tooltip-position="right" data-tooltip-attached="1"></button>')
				.appendTo('.page-side-tools').append(wds.icon('avatar-small')).click(function() {
				if (running) return;
				running = true;
				setTheme();
				running = false;
			});

			$('<button class="page-side-tool custom-side-tool skin-theme-save'
				+ ' custom-side-tool-disabled" data-wds-tooltip-name="tt-save"'
				+ ' data-wds-tooltip-position="right" data-tooltip-attached="1"></button>')
				.appendTo('.page-side-tools').append(iconSetPreference).click(function() {
				if (running) return;
				running = true;
				var theme = themes.current === 'user' ? themes.user : themes.current;
				api.postWithEditToken({
					action: 'options',
					optionname: 'theme',
					optionvalue: theme
				}).then(
					function() {
						successBanner.show();
						themes.user = theme;
						$('.skin-theme-user, .skin-theme-save').addClass('custom-side-tool-disabled');
					},
					function(data) {
						(typeof data === 'string' ? new bn(i18n['bn-error-known'].escape() + ' ' + data,
							'error') : new bn(i18n['bn-error-unknown'].escape(), 'error', 3000)).show();
					}
				).always(function() {
					running = false;
				});
			});
		}
		
		//tooltips for custom page side buttons
		$('.custom-side-tool').mouseenter(function() {
			var name = $(this).data('wds-tooltip-name');
			
			tooltips[name] = $('<div class="wds-tooltip is-right" style="left: '
				+ ($(this).offset().left + 50) + 'px; top: ' + ($(this).offset().top
				- $(document).scrollTop() + 20) + 'px;">' + i18n[name].escape() + '</div>')
				.appendTo('body');
		}).mouseleave(function() {
			var name = $(this).data('wds-tooltip-name'),
				tooltip = tooltips[name];
			
			if (tooltip) {
				tooltips[name] = undefined;
				tooltip.remove();
			}
		});
		
		if (window.ThemeToggler.enableTopDropdown) {
			$('<div id="ThemeToggler-wrapper"></div>')
				.appendTo('.fandom-community-header__top-container')
				.append($('.fandom-community-header__top-container > .wiki-tools'));
			
			$('<div class="wiki-tools wds-button-group" id="ThemeToggler-dropdown">'
				+ '<a class="wds-button wds-is-secondary" title="' + i18n.current.escape()
				+ '" id="ThemeToggler-indicator">' + i18n.user.escape()
				+ '</a><div class="wds-dropdown"><div class="wds-button wds-is-secondary'
				+ ' wds-dropdown__toggle"></div><div class="wds-dropdown__content'
				+ ' wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list'
				+ ' wds-is-linked"></ul></div></div></div>').appendTo('#ThemeToggler-wrapper');
			
			$('#ThemeToggler-dropdown .wds-dropdown__toggle').append(wds.icon('more-small'));
			$('<li><a>' + i18n.light.escape() + '</a></li>')
				.appendTo('#ThemeToggler-dropdown .wds-list').find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('light');
				running = false;
			});
			$('<li><a>' + i18n.dark.escape() + '</a></li>')
				.appendTo('#ThemeToggler-dropdown .wds-list').find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('dark');
				running = false;
			});
			$('<li><a>' + i18n.wiki.escape() + '</a></li>')
				.appendTo('#ThemeToggler-dropdown .wds-list').find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('wiki');
				running = false;
			});
			$('<li><a>' + i18n.user.escape() + '</a></li>')
				.appendTo('#ThemeToggler-dropdown .wds-list').find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('user');
				running = false;
			});
		}
		
		if (window.ThemeToggler.enableTopButtons) {
			if (!$('#ThemeToggler-wrapper').length) $('<div id="ThemeToggler-wrapper"></div>')
				.appendTo('.fandom-community-header__top-container')
				.append($('.fandom-community-header__top-container > .wiki-tools'));
			
			$('<div class="wiki-tools wds-button-group" id="ThemeToggler-buttons"></div>')
				.appendTo('#ThemeToggler-wrapper').append(
				$('<a class="wds-button wds-is-secondary" title="' + i18n.light.escape()
					+ '"></a>').append(wds.icon('light-mode-small')).click(function() {
					if (running) return;
					running = true;
					setTheme('light');
					running = false;
				}),
				$('<a class="wds-button wds-is-secondary" title="' + i18n.dark.escape()
					+ '"></a>').append(wds.icon('dark-mode-small')).click(function() {
					if (running) return;
					running = true;
					setTheme('dark');
					running = false;
				}),
				$('<a class="wds-button wds-is-secondary" title="' + i18n.wiki.escape()
					+ '"></a>').append(iconWikiTheme).click(function() {
					if (running) return;
					running = true;
					setTheme('wiki');
					running = false;
				}),
				$('<a class="wds-button wds-is-secondary" title="' + i18n.user.escape()
					+ '"></a>').append(wds.icon('avatar-small')).click(function() {
					if (running) return;
					running = true;
					setTheme('user');
					running = false;
				})
			);
		}
		
		setTheme(mw.util.getParamValue("usetheme") || window.ThemeToggler.defaultTheme);
	});
	
	//chain of hooks to ensure all dependencies are ready
	mw.hook('dev.wds').add(function() {
	mw.hook('dev.i18n').add(function() {
	mw.hook('dev.banners').add(function() {
		scriptsReady.resolve();
	});});});
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js',
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:BannerNotification.js'
		]
	});
});