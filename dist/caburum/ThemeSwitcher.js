// Modified from [[w:c:dev:MediaWiki:ThemeToggler.js]]]

$(function() {
	if (mw.config.get('skin') !== 'fandomdesktop') return;

	mw.hook('dev.wds').add(function(wds) {
		$('.wiki-tools .wds-dropdown').before('<a class="wds-button wds-is-secondary fandomdesktop-theme-toggle" title="Toggle theme" />');
		$('.fandomdesktop-theme-toggle').append(wds.icon('eye-small'));

		$('.fandomdesktop-theme-toggle').click(function() {
			var theme = $('body').hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
			var newTheme = theme === 'light' ? 'dark' : 'light';

			// Implementation by [[User:Pcj]] from ThemeSwitcher
			$.get(mw.util.wikiScript('wikia') + '?controller=ThemeApi&method=themeVariables&variant=' + newTheme + '&cb=' + (new Date().getTime())).done(function(data) {
				var $s = $('#pcjThemeSwitch')[0] || $('<style>').attr('id','pcjThemeSwitch').appendTo('body');
				$($s).text(data);
				$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark').addClass('theme-fandomdesktop-' + newTheme);
			});
		});
	});

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:WDSIcons/code.js'
	});
});