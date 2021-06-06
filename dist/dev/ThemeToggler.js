$(function() {
    if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeTogglerLoaded) return;
	window.ThemeTogglerLoaded = true;
	
	mw.hook('dev.wds').add(function(wds) {
	    $('.page-side-tools').append('<button class="page-side-tool skin-theme-toggle" data-wds-tooltip="Toggle theme" data-wds-tooltip-position="right" data-tooltip-attached="1"></button>');
	    $('.skin-theme-toggle').append( wds.icon('eye-small') );
	
	    $('.page-side-tools').append('<button class="page-side-tool skin-theme-toggle-temporal" data-wds-tooltip="Temporarily toggle theme" data-wds-tooltip-position="right" data-tooltip-attached="1"></button>');
	    $('.skin-theme-toggle-temporal').append( wds.icon('clock-small') );
	
		    
		function toggleWithoutReload() {
			var theme = $('body').hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
			var newTheme = theme === 'light' ? 'dark' : 'light';
	   
			// Implementation by [[User:Pcj]] from ThemeSwitcher
			$.get(mw.util.wikiScript('wikia')+'?controller=ThemeApi&method=themeVariables&variant='+newTheme+'&cb='+(new Date().getTime())).done(function(data) {
	 		var $s = $('#pcjThemeSwitch')[0] || $('<style>').attr('id','pcjThemeSwitch').appendTo('body');
	        	$($s).text(data);
	        	$('body').removeClass('theme-fandomdesktop-light theme-fandomdesktop-dark').addClass('theme-fandomdesktop-'+newTheme);
			});
		}
	
	    var api = new mw.Api();
	    $('.skin-theme-toggle').click( function() {
			var theme = $('body').hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
			var newTheme = theme === 'light' ? 'dark' : 'light';
	
			toggleWithoutReload();
	        api.postWithToken( 'csrf', { action: 'options', optionname: 'theme', optionvalue: newTheme } );
	    } )
	
		$('.skin-theme-toggle-temporal').click( function() {
			toggleWithoutReload();
		} )
	});

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
});