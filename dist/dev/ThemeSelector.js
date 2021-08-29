$(function() {
	//check skin, double-run protection, initialize script configuration
	if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeSelectorLoaded) return;
	window.ThemeSelectorLoaded = true;
	window.ThemeSelector = window.ThemeSelector || {};
	
	//initialize script-wide variables
	var paramRegExp = /(\?|&)variant(?:=[^&]*)?(&|$)/g,
		extRegExp = new RegExp('((?:=|%7[Cc])ext\\.fandom\\.DesignSystem\\.'
			+ '(?:GlobalNavigation\\.)?brand\\.(?:wikiaorg-)?)(dark|default|light)'
			+ '(?:\\.css(?:%7[Cc]|&|$))', 'g'),
		now = Math.floor(Date.now() / 1000),
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
		
		themes.current = newTheme;
		$('.ThemeSelector-indicator').text(i18n[newTheme].plain());
		
		if (newTheme === 'user') newTheme = themes.user;
		
		$('link[href*="/wikia.php"][href*="controller=ThemeApi"]'
			+ '[href*="method=themeVariables"]').attr('href', newTheme === 'wiki'
			? function(i, v) {
			return v.replace(paramRegExp, function(m, p1, p2) {
				return p2 === '&' ? (p1 === '?' ? '?' : '&') : '';
			});
		} : function(i, v) {
			return !paramRegExp.test(v) ? v + '&variant=' + newTheme : v.replace(paramRegExp,
				function(m, p1, p2) {
				return p1 + 'variant=' + newTheme + p2;
			});
		});
		
		if (newTheme === 'wiki') newTheme = themes.wiki;
		
		if ((newTheme === 'dark') != mw.config.get('isDarkTheme')) {
			$('link[href*="/load.php"][href*=".brand."]').attr('href', function(i, v) {
				var match = extRegExp.exec(v),
					repIdx;
				while (match) {
					repIdx = match.index + match[1].length;
					extRegExp.lastIndex = repIdx;
					v = v.slice(0, repIdx) + newTheme + v.slice(repIdx + match[2].length);
					match = extRegExp.exec(v);
				}
				return v;
			});
			$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark')
				.addClass('theme-fandomdesktop-' + newTheme);
			mw.config.set('isDarkTheme', newTheme === 'dark');
		}
	}
	
	$.when(
		//load [[WDSIcons]] and script messages from [[I18n-js]]
		scriptsReady.then(function() {
			return window.dev.i18n.loadMessages('ThemeSelector').then(function(m) {
				i18n = {
					light: m.msg('light'),
					dark: m.msg('dark'),
					wiki: m.msg('wiki'),
					user: m.msg('user'),
					current: m.msg('current'),
					save: m.msg('save'),
					'error-known': m.msg('error-known'),
					'error-unknown': m.msg('error-unknown'),
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
				method: 'themeVariables',
				version: now
			}
		}).then(function(wiki_css) {
			return $.ajax({
				url: mw.config.get('wgScriptPath') + "/wikia.php",
				type: 'GET',
				dataType: 'text',
				data: {
					controller: 'ThemeApi',
					method: 'themeVariables',
					version: now,
					variant: 'dark'
				}
			}).then(function(dark_css) {
				themes.wiki = wiki_css === dark_css ? 'dark' : 'light';
			});
		})
	).done(function() {
		if (window.ThemeSelector.siteWide) {
			setTheme(mw.util.getParamValue('usetheme'));
			return;
		}
		
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
				+ '<use height="12" width="12" xlink:href="#wds-icons-sun-small">'
				+ '</use><use y="6" x="-18" height="12" width="12" style="transform:'
				+ ' rotateY(180deg);" xlink:href="#wds-icons-moon-small"></use></svg>',
			gui, running, insert;
		
		//insert a small about of CSS
		importArticles({
			type: 'style',
			articles: [
				'u:dev:MediaWiki:ThemeSelector/style.css'
			]
		});
		if (window.ThemeSelector.hideBuiltIn) mw.util.addCSS('.wiki-tools__theme-switch'
			+ ' { display: none; }');
		
		$('<div id="ThemeSelector-wrapper"></div>')
			.appendTo('.fandom-community-header__top-container')
			.append($('.fandom-community-header__top-container > .wiki-tools'));
		
		if (window.ThemeSelector.useDropdown) {
			gui = $('<div class="wiki-tools wds-button-group ThemeSelector-dropdown">'
				+ '<a class="wds-button wds-is-secondary ThemeSelector-indicator" title="'
				+ i18n.current.escape() + '">' + i18n.user.escape()
				+ '</a><div class="wds-dropdown"><div class="wds-button wds-is-secondary'
				+ ' wds-dropdown__toggle"></div><div class="wds-dropdown__content'
				+ ' wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list'
				+ ' wds-is-linked"></ul></div></div></div>');
			
			gui.find('.wds-dropdown__toggle').append(wds.icon('more-small'));
			$('<li><a>' + i18n.light.escape() + '</a></li>')
				.appendTo(gui.find('.wds-list')).find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('light');
				running = false;
			});
			$('<li><a>' + i18n.dark.escape() + '</a></li>')
				.appendTo(gui.find('.wds-list')).find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('dark');
				running = false;
			});
			$('<li><a>' + i18n.wiki.escape() + '</a></li>')
				.appendTo(gui.find('.wds-list')).find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('wiki');
				running = false;
			});
			$('<li><a>' + i18n.user.escape() + '</a></li>')
				.appendTo(gui.find('.wds-list')).find('a').click(function() {
				if (running) return;
				running = true;
				setTheme('user');
				running = false;
			});
		} else {
			gui = $('<div class="wiki-tools wds-button-group ThemeSelector-buttons"></div>')
				.append(
				$('<a class="wds-button wds-is-secondary" title="' + i18n.light.escape()
					+ '"></a>').append(wds.icon('sun-small')).click(function() {
					if (running) return;
					running = true;
					setTheme('light');
					running = false;
				}),
				$('<a class="wds-button wds-is-secondary" title="' + i18n.dark.escape()
					+ '"></a>').append(wds.icon('moon-small')).click(function() {
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
		
		insert = window.ThemeSelector.insertAfter ? gui.insertAfter.bind(gui)
			: gui.insertBefore.bind(gui);
		
		insert((window.ThemeSelector.addSticky ? '' : '#ThemeSelector-wrapper ')
			+ '.wiki-tools').append($('<a class="wds-button wds-is-secondary" title="'
			+ i18n.save.escape() + '"></a>').append(iconSetPreference).click(function() {
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
				},
				function(data) {
					(typeof data === 'string' ? new bn(i18n['error-known'].escape() + ' ' + data,
						'error') : new bn(i18n['error-unknown'].escape(), 'error', 3000)).show();
				}
			).always(function() {
				running = false;
			});
		}));
		
		setTheme(mw.util.getParamValue("usetheme") || window.ThemeSelector.defaultTheme);
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