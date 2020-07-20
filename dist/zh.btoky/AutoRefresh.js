/* <syntaxhighlight lang="javascript"> */
/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 *
 * Original by pcj of Wowpedia
 * Maintenance, cleanup, style and bug fixes by:
 *   Grunny (http://c.wikia.com/wiki/User:Grunny)
 *   Kangaroopower (http://c.wikia.com/wiki/User:Kangaroopower)
 *   Cqm (http://c.wikia.com/wiki/User:Cqm)
 */

/*jshint browser:true, camelcase:true, curly:true, eqeqeq:true, immed:true, jquery:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, quotmark:single, trailing:true, undef:true, unused:true, onevar:true */
/*global mediaWiki:true, Wikia:true */

( function ( window, $, mw, Wikia ) {
	'use strict';

	var config = mw.config.get( [
			'stylepath',
			'wgAction',
			'wgCanonicalSpecialPageName',
			'wgPageName'
		] ),
		// use common file as it's very likely to be already cached by user
		// used in oasis sidebar loading, preview modal, etc.
		ajaxIndicator = window.ajaxIndicator || config.stylepath + '/common/images/ajax.gif',
		ajaxTimer,
		refreshText = typeof window.AjaxRCRefreshText === 'string' ? window.AjaxRCRefreshText : 'AJAX',
		refreshHover = typeof window.AjaxRCRefreshHoverText === 'string' ? window.AjaxRCRefreshHoverText : 'Enable auto-refreshing page loads',
		ajRefresh = window.ajaxRefresh || 60000,
		ajPages = window.ajaxPages || [ 'Special:RecentChanges' ],
		RecentChangesLocal,
		// don't load on these values of wgAction
		// @todo check if markpatrolled should be here
		disallowActions = [
			'delete',
			'edit',
			'protect',
			'revisiondelete'
		];


	function storage( setTo ) {
		if ( localStorage.getItem( 'AjaxRC-refresh' ) === null ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		if ( setTo === false ) {
			localStorage.setItem( 'AjaxRC-refresh', false );
		} else if ( setTo === true ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		return JSON.parse( localStorage.getItem( 'AjaxRC-refresh' ) );
	}


	/**
	 * Main function to start the Auto-refresh process
	 */
	function preloadAJAXRL() {
		// monobook
		var $appTo = $( '.firstHeading' ).length ? $( '.firstHeading' ) :
			// most oasis pages
			( $( '#WikiaPageHeader' ).length ? $( '#WikiaPageHeader' ) :
				// most oasis special pages
				( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : false ) ),
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

		// fallback for pages with profile masthead
		if ( $appTo === false ) {
			$( '#WikiaArticle' ).prepend( $checkbox );
		} else {
			$appTo.append( $checkbox );
		}

		$throbber = $appTo.find( '#ajaxLoadProgress' );

		$( document ).ajaxSend( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$throbber.show();
			}
		} ).ajaxComplete ( function ( event, xhr, settings ) {

			var $collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' ),
				ajCallAgain = window.ajaxCallAgain || [],
				i;

			if ( location.href === settings.url ) {
				$throbber.hide();
				if ( $collapsibleElements.length ) {
					$collapsibleElements.makeCollapsible();
				}
				if ( config.wgCanonicalSpecialPageName === 'Recentchanges' ) {
					mw.special.recentchanges.init();
					if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
						RecentChangesLocal.init();
					}
				}
				if ( config.wgCanonicalSpecialPageName === 'WikiActivity' ) {
					window.WikiActivity.init();
				}
				for ( i = 0; i < ajCallAgain.length; i++ ) {
					ajCallAgain[i]();
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
		if (
			$.inArray( config.wgPageName, ajPages ) !== -1 && $( '#ajaxToggle' ).length === 0 &&
			$.inArray( config.wgAction, disallowActions ) === -1
		) {
			preloadAJAXRL();
		}
	} );

	/**
	 * Temp Hack: copy the RC filter JS since it can't be accessed
	 * @source <https://github.com/Wikia/app/blob/dev/extensions/wikia/RecentChanges/js/RecentChanges.js>
	 */
	RecentChangesLocal = {
		init: function () {
			this.$table = $( '.mw-recentchanges-table' );
			this.$dropdown = this.$table.find( '.WikiaDropdown' );
			this.$submit = this.$table.find('input[type="submit"]');
			this.$submit.on( 'click.RecentChangesDropdown', $.proxy( this.saveFilters, this ) );
			this.$submit.removeAttr( 'disabled' ); //FF clean
			this.dropdown = new Wikia.MultiSelectDropdown( this.$dropdown );
			this.dropdown.on( 'change', $.proxy( this.onChange, this ) );

		},

		saveFilters: function( event ) {
			var self = this;

			event.preventDefault();

			self.dropdown.disable();
			self.$submit.attr( 'disabled', 'disabled' );

			if ( self.dropdown.getSelectedValues().length === 0 ) {
				self.dropdown.doSelectAll( true );
			}

			$.nirvana.sendRequest( {
				controller: 'RecentChangesController',
				method: 'saveFilters',
				data: {
					filters: self.dropdown.getSelectedValues()
				},
				type: 'POST',
				format: 'json',
				callback: function ( data ) {
					window.location.reload();
				}
			} );
		}
	};

}( this, jQuery, mediaWiki, Wikia ) );

/* </syntaxhighlight> */