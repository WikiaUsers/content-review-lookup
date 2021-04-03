/* Any JavaScript here will be loaded for all users on every page load. */

/* global mw, $ */
/* jshint strict:false, browser:true */

mw.loader.using( [ 'mediawiki.util' ] ).done( function () {
	/* Begin of mw.loader.using callback */

	/**
	 * Collapsible tables; reimplemented with mw-collapsible
	 * Styling is also in place to avoid FOUC
	 *
	 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
	 * @version 3.0.0 (2018-05-20)
	 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
	 * @author [[User:R. Koot]]
	 * @author [[User:Krinkle]]
	 * @author [[User:TheDJ]]
	 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
	 * is supported in MediaWiki core. Shimmable since MediaWiki 1.32
	 *
	 * @param {jQuery} $content
	 */
	function makeCollapsibleMwCollapsible( $content ) {
		var $tables = $content
			.find( 'table.collapsible:not(.mw-collapsible)' )
			.addClass( 'mw-collapsible' );

		$.each( $tables, function ( index, table ) {
			// mw.log.warn( 'This page is using the deprecated class collapsible. Please replace it with mw-collapsible.');
			if ( $( table ).hasClass( 'collapsed' ) ) {
				$( table ).addClass( 'mw-collapsed' );
				// mw.log.warn( 'This page is using the deprecated class collapsed. Please replace it with mw-collapsed.');
			}
		} );
		if ( $tables.length > 0 ) {
			mw.loader.using( 'jquery.makeCollapsible' ).then( function () {
				$tables.makeCollapsible();
			} );
		}
	}
	mw.hook( 'wikipage.content' ).add( makeCollapsibleMwCollapsible );

	/**
	 * Add support to mw-collapsible for autocollapse, innercollapse and outercollapse
	 *
	 * Maintainers: TheDJ
	 */
	function mwCollapsibleSetup( $collapsibleContent ) {
		var $element,
			$toggle,
			autoCollapseThreshold = 2;
		$.each( $collapsibleContent, function ( index, element ) {
			$element = $( element );
			if ( $element.hasClass( 'collapsible' ) ) {
				$element.find( 'tr:first > th:first' ).prepend( $element.find( 'tr:first > * > .mw-collapsible-toggle' ) );
			}
			if ( $collapsibleContent.length >= autoCollapseThreshold && $element.hasClass( 'autocollapse' ) ) {
				$element.data( 'mw-collapsible' ).collapse();
			} else if ( $element.hasClass( 'innercollapse' ) ) {
				if ( $element.parents( '.outercollapse' ).length > 0 ) {
					$element.data( 'mw-collapsible' ).collapse();
				}
			}
			// because of colored backgrounds, style the link in the text color
			// to ensure accessible contrast
			$toggle = $element.find( '.mw-collapsible-toggle' );
			if ( $toggle.length ) {
				// Make the toggle inherit text color
				if ( $toggle.parent()[ 0 ].style.color ) {
					$toggle.find( 'a' ).css( 'color', 'inherit' );
				}
			}
		} );
	}

	mw.hook( 'wikipage.collapsibleContent' ).add( mwCollapsibleSetup );

	/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */