/* <syntaxhighlight lang="javascript"> */

$( document ).ready ( function () {
	var wgPageName = mw.config.get('wgPageName'),
		ajaxIndicator = 'http://hydra-media.cursecdn.com/commons.cursetech.com/0/05/Ajax.gif',
		ajaxTimer,
		refreshText = 'Auto-refresh',
		refreshHover = 'Enable auto-refreshing page loads',
		ajRefresh = 60000,
		ajPages = ["Special:RecentChanges", "Special:Log", "Special:Watchlist",
                           "Special:Contributions", "Special:AbuseLog", "Special:NewFiles",
                           "Special:Statistics", "Special:NewPages", "Special:ListFiles"];

	function storage( setTo ) {
		if ( localStorage.getItem( 'AjaxRC-refresh' ) === null ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		if ( setTo === false || setTo === true ) {
			localStorage.setItem( 'AjaxRC-refresh', setTo );
		}

		return JSON.parse( localStorage.getItem( 'AjaxRC-refresh' ) );
	}

	/**
	 * Main function to start the Auto-refresh process
	 */
	function preloadAJAXRL() {
		var $appTo = $( '.firstHeading' ),
			$checkbox = $( '<span id="ajaxRefresh"></span>' )
			.css( { 'font-size': 'xx-small', 'line-height': '100%', 'margin-left': '5px' } )
			.append(
				$( '<label id="ajaxToggleText" for="ajaxToggle"></label>' )
				.css( { 'border-bottom': '1px dotted', 'cursor': 'help' } )
				.attr( 'title', refreshHover ).text( refreshText + ':' ),
				$( '<input type="checkbox" id="ajaxToggle">' ).css( { 'margin-bottom': 0 } ),
				$( '<span id="ajaxLoadProgress"></span>' ).css( 'display', 'none' ).append(
					$( '<img>' ).css( { 'vertical-align': 'baseline', 'float': 'none', 'border': 0 } )
						.attr( 'src', ajaxIndicator ).attr( 'alt', 'Refreshing page' )
					)
				),
			$throbber;

		$appTo.append( $checkbox );

		$throbber = $appTo.find( '#ajaxLoadProgress' );

		$( document ).ajaxSend( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$throbber.show();
			}
		} ).ajaxComplete ( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$throbber.hide();
				if ( wgPageName === 'Special:RecentChanges' ) {
					mw.special.recentchanges.init();
				}
			}
		} );
		$( '#ajaxToggle' ).click( toggleAjaxReload );
		$( '#ajaxToggle' ).attr( 'checked', storage() );
		if ( storage() ) {
			loadPageData();
		}
	}

	/**
	 * Turn refresh on and off by toggling the checkbox
	 */
	function toggleAjaxReload() {
		if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
			storage( true );
			loadPageData();
		} else {
			storage( false );
			clearTimeout( ajaxTimer );
		}
	}

	/**
	 * Does the actual refresh
	 */
	function loadPageData() {
		var $temp = $( '<div>' );

		$temp.load( location.href + ' #mw-content-text', function () {
			var $newContent = $temp.children( '#mw-content-text' );

			if ( $newContent.length ) {
				$( '#mw-content-text' ).replaceWith( $newContent );
			}

			ajaxTimer = setTimeout( loadPageData, ajRefresh );
		} );
		$temp.remove();
	}

	/**
	 * Load the script on specific pages
	 * and only on certain values for wgAction (see disallowActions above)
	 */
	$( function () {
		if ( $.inArray( wgPageName, ajPages ) !== -1 && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	} );

} );
/* </syntaxhighlight> */