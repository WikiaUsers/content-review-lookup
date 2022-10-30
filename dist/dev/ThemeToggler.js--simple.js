$(function() {
	if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeTogglerLoaded) return;
	window.ThemeTogglerLoaded = true;
	
	var fullBackground = $('.fandom-community-header__background.fullScreen');
	
	function toggleWithoutReload() {
		var theme = $('body').hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
		var newTheme = theme === 'light' ? 'dark' : 'light';

		// Implementation by [[User:Pcj]] from ThemeSwitcher
		$.when(
			$.get(mw.util.wikiScript('wikia') + '?controller=ThemeApi&method=themeVariables&variant=' + newTheme + '&cb=' + (new Date().getTime())),
			$.get(mw.util.wikiScript('load') + '?modules=ext.fandom.GlobalComponents.GlobalComponentsTheme.' + newTheme + '.css%7Cext.fandom.GlobalComponents.GlobalNavigationTheme.' + newTheme + '.css&only=styles')
		)
		.done(function(wikiTheme, brandTheme) {
			var css = wikiTheme[0] + brandTheme[0];
			var $s = $('#pcjThemeSwitch')[0] || $('<style>').attr('id', 'pcjThemeSwitch').appendTo('body');
			$($s).text(css);
			
			if (fullBackground.length) {
				var bgMatch = wikiTheme[0].match(/--theme-body-background-image\s*?:\s*?url\((.*?)\)/);
				if (bgMatch) {
					var bgImage = new Image();
					bgImage.onload = function() {
						fullBackground.css('--image-ratio', (this.height / this.width).toString());
					};
					bgImage.src = bgMatch[1];
				}
			}
			
			$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark').addClass('theme-fandomdesktop-' + newTheme);
			mw.config.set('isDarkTheme', !mw.config.get('isDarkTheme'));
			mw.hook('dev.themeToggler.toggled').fire(newTheme);
		});
	}
	
	mw.hook('dev.ct').add(function(customTools) {
		customTools([
			{
				click: function() {
					var theme = $('body').hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
					var newTheme = theme === 'light' ? 'dark' : 'light';

					toggleWithoutReload();
					var api = new mw.Api();
					api.postWithToken('csrf', { action: 'options', optionname: 'theme', optionvalue: newTheme });
					// for anon users
					if (!mw.config.get('wgUserName')) {
						document.cookie = 'theme=' + newTheme + '; domain=fandom.com';
					}
				},
				i18n: 'ThemeToggler',
				icon: 'moon',
				placement: 'page-tools-left',
				position: -1,
				text: 'tt-preferences-toggle'
			}
		]);
		
		mw.hook('dev.themeToggler.loaded').fire();
	});

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:CustomTools.js'
		]
	});
});