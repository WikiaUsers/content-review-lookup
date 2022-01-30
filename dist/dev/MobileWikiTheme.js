$( function() {
	if ($('body').hasClass('skin-fandommobile')) {
		var $linkEl = $('head > link[rel="stylesheet"][href*="/load.php?"][href*="&modules="]').first();
		$linkEl.clone().attr('href', (mw.config.get('wgArticlePath')).replace('/wiki/$1', '') + '/wikia.php?controller=ThemeApi&method=themeVariables&cityId=' + mw.config.get('wgCityId') + ((window.MobileWikiTheme) ? '&variant='+window.MobileWikiTheme : '')).insertAfter($linkEl);
		if (window.MobileWikiTheme == 'light') $('body').addClass('mwt-light');
		else if (window.MobileWikiTheme == 'dark') $('body').addClass('mwt-dark');
	}
});