$(function() {
	if (mw.config.get('skin') !== 'fandomdesktop' || $('.caburum-theme-switcher').length) return;

	var urlTheme = mw.util.getParamValue('usetheme'),
		paramRegExp = /(\?|&)variant(?:=[^&]*)?(&|$)/g;

	function setTheme(newTheme) {
		$('link[href*="/wikia.php"][href*="controller=ThemeApi"][href*="method=themeVariables"]').attr('href', function(i, v) { // Based on [[w:c:dev:MediaWiki:ThemeSelector.js]]
			return !paramRegExp.test(v) ? v + '&variant=' + newTheme : v.replace(paramRegExp, function(m, p1, p2) { return p1 + 'variant=' + newTheme + p2; });
		});
		$('link#caburum-theme-switchee').attr('href', mw.util.wikiScript('load') + '?modules=ext.fandom.GlobalComponents.GlobalComponentsTheme.' + newTheme + '.css|ext.fandom.GlobalComponents.GlobalNavigationTheme.' + newTheme + '.css&only=styles');
		$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark').addClass('theme-fandomdesktop-' + newTheme);

		mw.config.set('isDarkTheme', newTheme === 'dark');

		$('.staffSigImage use').attr('xlink:href', '#wds-brand-fandom-logo' + (newTheme === 'dark' ? '-light' : ''));

		$('.caburum-theme-switcher').empty()
			.append(window.dev.wds.icon((newTheme === 'light' ? 'moon' : 'sun') + '-small'));
		$('.caburum-theme-switcher').attr('title', mw.msg('fd-community-header-' + (newTheme === 'light' ? 'dark' : 'light') + '-theme'));
	}

	$.when(mw.hook('dev.wds').add(), mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.jqueryMsg']), mw.hook('wikipage.content').add())
		.then(function() {
			return new mw.Api().loadMessagesIfMissing(['fd-community-header-light-theme', 'fd-community-header-dark-theme']);
		})
		.then(function() {
			$('.wiki-tools .wiki-tools__theme-switch').after('<a class="wds-button wds-is-secondary caburum-theme-switcher" title="' + mw.msg('fd-community-header-' + (mw.config.get('isDarkTheme') ? 'light' : 'dark') + '-theme') + '" />');
			$('.caburum-theme-switcher').append(window.dev.wds.icon((mw.config.get('isDarkTheme') ? 'sun' : 'moon') + '-small'));
			$('head').append('<link rel="stylesheet" id="caburum-theme-switchee" />');

			if (['light', 'dark'].includes(urlTheme)) {
				setTheme(urlTheme);
			}

			$('.caburum-theme-switcher').click(function() {
				setTheme(mw.config.get('isDarkTheme') ? 'light' : 'dark');
			});
		});

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:WDSIcons/code.js'
	});
});