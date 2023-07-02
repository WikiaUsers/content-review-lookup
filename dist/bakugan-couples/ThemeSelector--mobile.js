$(function() {
	//check skin, double-run protection, initialize script configuration
	if (mw.config.get('skin') !== 'fandommobile' || window.ThemeSelectorLoaded) return;
	window.ThemeSelectorLoaded = true;
	window.ThemeSelector = window.ThemeSelector || {};
	
	//initialize script-wide variables
	var extRegExp = new RegExp('((?:=|%7[Cc])(?:ext\\.fandom\\.DesignSystem\\.'
			+ '(?:GlobalNavigation\\.)?brand\\.(?:wikiaorg-)?|skin\\.fandommobile\\.'
			+ '(?:fandom|wikiaorg)\\.))(dark|default|light)(?:\\.css(?:%7[Cc]|&|$))', 'g'),
		scriptsReady = $.Deferred(),
		themes = {
			wiki: ((mw.loader.getState('skin.fandommobile.fandom.dark.css') === 'ready')
				|| (mw.loader.getState('skin.fandommobile.wikiaorg.dark.css') === 'ready'))
				? 'dark' : 'light',
			current: 'wiki'
		},
		i18n, api;
	
	//function to change theme and update user interface
	function setTheme(newTheme) {
		if (!((newTheme === 'light') || (newTheme === 'dark') || (newTheme === 'user')))
			newTheme = 'wiki';
		if (newTheme === themes.current) return;
		
		themes.current = newTheme;
		$('.ThemeSelector-indicator').text(i18n['current-prefix'].plain() + ' '
			+ i18n[newTheme].plain());
		
		if (newTheme === 'user') newTheme = themes.user;
		if (newTheme === 'wiki') newTheme = themes.wiki;
		
		$('link[href*="/load.php"][href*=".brand."], link[href*="/load.php"]'
			+ '[href*="skin.fandommobile."]').attr('href', function(i, v) {
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
	}
	
	$.when(
		//load script messages from [[I18n-js]]
		scriptsReady.then(function() {
			return window.dev.i18n.loadMessages('ThemeSelector').then(function(m) {
				i18n = {
					light: m.msg('light'),
					dark: m.msg('dark'),
					wiki: m.msg('wiki'),
					user: m.msg('user'),
					'current-prefix': m.msg('current-prefix'),
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
				api.loadMessagesIfMissing([
					'back',
					'savedprefs'
				]),
				api.get({
					action: 'query',
					meta: 'userinfo',
					uiprop: 'options'
				}).then(function(data) {
					themes.user = data && data.query && data.query.userinfo
						&& data.query.userinfo.options && data.query.userinfo
						.options['userjs-ThemeSelector-mobiletheme'];
					if ((themes.user !== 'light') && (themes.user !== 'dark')) themes.user = 'wiki';
				})
			);
		})
	).done(function() {
		if (window.ThemeSelector.siteWide) {
			setTheme(mw.util.getParamValue('usetheme'));
			return;
		}
		
		var bn = window.dev.banners.BannerNotification,
			successBanner = new bn(mw.messages.values.savedprefs, 'confirm', false, 3000),
			listIndex = $('.wds-list.wds-community-bar__level-1')[0].children.length,
			gui, running;
		
		//insert a small amount of CSS
		mw.util.addCSS('.ThemeSelector-save { cursor: pointer; } .ThemeSelector-save:hover'
			+ ' { background-color: var(--wds-dropdown-linked-item-background-color); }');
		
		$('<li><a data-index="' + listIndex + '"><span class="wds-community-bar'
			+ '__item-content ThemeSelector-indicator">' + i18n['current-prefix'].escape()
			+ ' ' + i18n.wiki.escape() + '</span><svg class="wds-icon wds-icon-tiny"><use'
			+ ' xlink:href="#wds-icons-menu-control-tiny" /></svg></a></li>')
			.appendTo('.wds-list.wds-community-bar__level-1');
		
		gui = $('<div class="wds-community-bar__level-2" data-index="' + listIndex
			+ '"><div class="wds-community-bar__navigation-back"><svg class="wds-icon'
			+ ' wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny" /></svg>'
			+ mw.messages.values.back + '</div><a class="wds-community-bar__navigation-header'
			+ ' ThemeSelector-indicator">' + i18n['current-prefix'].escape() + ' '
			+ i18n.wiki.escape() + '</a><ul class="wds-list wds-is-linked"></ul>'
			+ '<a class="wds-community-bar__navigation-header ThemeSelector-save">'
			+ i18n.save.escape() + '</a></div>').appendTo('.wds-community-bar__navigation'
			+ ' > .wds-dropdown > .wds-dropdown__content');
		
		gui.find(':last-child').click(function() {
			if (running) return;
			running = true;
			var theme = themes.current === 'user' ? themes.user : themes.current;
			api.postWithEditToken({
				action: 'options',
				optionname: 'userjs-ThemeSelector-mobiletheme',
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
		});
		
		gui.find('.wds-list').append(
			$('<li><a data-level2-index="' + listIndex + ':0">' + i18n.light.escape()
				+ '</a></li>').click(function() {
				if (running) return;
				running = true;
				setTheme('light');
				running = false;
			}),
			$('<li><a data-level2-index="' + listIndex + ':1">' + i18n.dark.escape()
				+ '</a></li>').click(function() {
				if (running) return;
				running = true;
				setTheme('dark');
				running = false;
			}),
			$('<li><a data-level2-index="' + listIndex + ':2">' + i18n.wiki.escape()
				+ '</a></li>').click(function() {
				if (running) return;
				running = true;
				setTheme('wiki');
				running = false;
			}),
			$('<li><a data-level2-index="' + listIndex + ':3">' + i18n.user.escape()
				+ '</a></li>').click(function() {
				if (running) return;
				running = true;
				setTheme('user');
				running = false;
			})
		);
		
		setTheme(mw.util.getParamValue('usetheme') || window.ThemeSelector.defaultTheme
			|| ((themes.user !== 'wiki') && (themes.user !== themes.wiki) && 'user'));
	});
	
	//chain of hooks to ensure all dependencies are ready
	mw.hook('dev.i18n').add(function() {
	mw.hook('dev.banners').add(function() {
		scriptsReady.resolve();
	});});
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:BannerNotification.js'
		]
	});
});