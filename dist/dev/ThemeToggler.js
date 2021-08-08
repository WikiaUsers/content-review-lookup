$(function() {
	if ( mw.config.get( 'skin' ) !== 'fandomdesktop' || window.ThemeTogglerLoaded ) return;
	window.ThemeTogglerLoaded = true;
	

	function toggleWithoutReload() {
		var theme = $( 'body' ).hasClass( 'theme-fandomdesktop-light' ) ? 'light' : 'dark';
		var newTheme = theme === 'light' ? 'dark' : 'light';

		// Implementation by [[User:Pcj]] from ThemeSwitcher
		$.when(
			$.get(mw.util.wikiScript( 'wikia' ) + '?controller=ThemeApi&method=themeVariables&variant=' + newTheme + '&cb=' + ( new Date().getTime() ) ),
			$.get( mw.util.wikiScript( 'load' ) + '?modules=ext.fandom.DesignSystem.GlobalNavigation.brand.' + newTheme + '.css%7Cext.fandom.DesignSystem.brand.' + newTheme + '.css&only=styles' )
		)
		.done( function( wikiTheme, brandTheme ) {
			var css = wikiTheme[0] + brandTheme[0];
			var $s = $( '#pcjThemeSwitch' )[0] || $( '<style>' ).attr( 'id', 'pcjThemeSwitch' ).appendTo('body');
			$($s).text(css);
			$( 'body' ).removeClass( 'theme-fandomdesktop-light theme-fandomdesktop-dark' ).addClass( 'theme-fandomdesktop-' + newTheme );
		} );
	}
	
	mw.hook( 'dev.wds' ).add( function( wds ) {
		var tooltips = {
			permanent: undefined,
			temporary: undefined
		};

		$( '.page-side-tools' ).append( '<button class="page-side-tool custom-side-tool skin-theme-toggle" data-wds-tooltip-name="tt-preferences-toggle" data-wds-tooltip-position="right" data-tooltip-attached="1"></button>' );
		$( '.skin-theme-toggle' ).append( wds.icon( 'eye-small' ) );
	
		$( '.page-side-tools' ).append( '<button class="page-side-tool custom-side-tool skin-theme-toggle-temporal" data-wds-tooltip-name="tt-temporary-toggle" data-wds-tooltip-position="right" data-tooltip-attached="1"></button>' );
		$( '.skin-theme-toggle-temporal' ).append( wds.icon( 'clock-small' ) );

		mw.hook( 'dev.themeToggler.loaded' ).fire();

		mw.hook( 'dev.i18n' ).add( function( i18n ) {
			i18n.loadMessages( 'ThemeToggler' ).done( function ( i18n ) {
				$( '.custom-side-tool' ).mouseenter( function() {
					var tooltipmsg = i18n.msg( $( this ).data( 'wds-tooltip-name' ) ).escape();
					var topPosition = ( $( this ).offset().top - $( document ).scrollTop() + 20 ) + 'px';
					var leftPosition = ( $( this ).offset().left + 50 ) + 'px';
					var tooltip = $( '<div>', {
						class: 'wds-tooltip is-right',
						css: {
							left: leftPosition,
							top: topPosition
						},
						text: tooltipmsg
					} );
					$( 'body' ).append( tooltip );
					if ( $( this ).hasClass( 'skin-theme-toggle' ) ) {
						tooltips.permanent = tooltip;
					} else {
						tooltips.temporary = tooltip;
					}
				} );
			});
		});

		$( '.custom-side-tool' ).mouseleave( function() {
			var tooltip;
			if ( $( this ).hasClass( 'skin-theme-toggle' ) ) {
				tooltip = tooltips.permanent;
				tooltips.permanent = undefined;
			} else {
				tooltip = tooltips.temporary;
				tooltips.temporary = undefined;
			}

			if ( tooltip ) {
				tooltip.remove();
			}
		} );

		var api = new mw.Api();
		$( '.skin-theme-toggle' ).click( function() {
			var theme = $( 'body' ).hasClass( 'theme-fandomdesktop-light' ) ? 'light' : 'dark';
			var newTheme = theme === 'light' ? 'dark' : 'light';

			toggleWithoutReload();
			api.postWithToken( 'csrf', { action: 'options', optionname: 'theme', optionvalue: newTheme } );
		} );

		$( '.skin-theme-toggle-temporal' ).click( toggleWithoutReload );
	} );

	importArticle( {
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js',
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	} );
} );