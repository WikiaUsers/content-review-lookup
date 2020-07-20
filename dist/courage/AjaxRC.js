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

;( function ( window, $, mw, Wikia, dev ) {
	'use strict';

	var mwconfig = mw.config.get( [
		'stylepath',
		'wgAction',
		'wgCanonicalSpecialPageName',
		'wgPageName'
	] ),
	// use common file as it's very likely to be already cached by user
	// used in oasis sidebar loading, preview modal, etc.
	ajaxTimer,
	RecentChangesLocal,
	config = dev.ajaxRC || {},
	ns = {},
	// don't load on these values of wgAction
	// @todo check if markpatrolled should be here
	disallowActions = [
		'delete',
		'edit',
		'protect',
		'revisiondelete'
	];

	// AjaxRC config
	// Maintain backwards compatibility with older configuration options
	config = {
		pages: config.pages || window.ajaxPages || [ 'Special:RecentChanges' ],
		indicator: config.indicator || window.ajaxIndicator || mwconfig.stylepath + '/common/images/ajax.gif',
		refresh: config.refresh || window.ajaxRefresh || 60000,
		text: config.text || window.AjaxRCRefreshText || 'Auto-refresh',
		hovertext: config.hovertext ||  window.AjaxRCRefreshHoverText || 'Update page contents automatically'
	};

	/**
	 * ns.storage function to save checkbox value for future use
	 */
	ns.storage = function ( setTo ) {
		if ( localStorage.getItem( 'AjaxRC-refresh' ) === null ) {
			localStorage.setItem( 'AjaxRC-refresh', true );
		}

		if ( typeof setTo === 'boolean' ) {
			localStorage.setItem( 'AjaxRC-refresh', setTo );
		}

		return JSON.parse( localStorage.getItem( 'AjaxRC-refresh' ) );
	};


	/**
	 * Main function to start the Auto-refresh process
	 */
	ns.preloadAJAXRL = function () {
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
						.attr( 'title', config.hovertext ).text( config.text + ':' ),
					$( '<input type="checkbox" id="ajaxToggle">' ).css( { 'margin-bottom': 0 } ),
					$( '<span id="ajaxLoadProgress"></span>' ).css( 'display', 'none' ).append(
						$( '<img>' ).css( { 'vertical-align': 'baseline', 'float': 'none', 'border': 0 } )
							.attr( 'src', config.indicator ).attr( 'alt', 'Refreshing page' )
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
				i;

			config.ajCallAgain = dev.ajaxRC.ajaxCallAgain || window.ajaxCallAgain || [];

			if ( location.href === settings.url ) {
				$throbber.hide();
				if ( $collapsibleElements.length ) {
					$collapsibleElements.makeCollapsible();
				}
				if ( mwconfig.wgCanonicalSpecialPageName === 'Recentchanges' ) {
					mw.special.recentchanges.init();
					if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
						RecentChangesLocal.init();
					}
				}
				if ( mwconfig.wgCanonicalSpecialPageName === 'WikiActivity' ) {
					window.WikiActivity.init();
				}
				for ( i = 0; i < config.ajCallAgain.length; i++ ) {
					config.ajCallAgain[i]();
				}
			}
		} );
		$( '#ajaxToggle' ).click( ns.toggleAjaxReload );
		$( '#ajaxToggle' ).attr( 'checked', ns.storage() );
		if ( ns.storage() ) {
			ns.loadPageData();
		}
	};

	/**
	 * Turn refresh on and off by toggling the checkbox
	 */
	ns.toggleAjaxReload = function () {
		if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
			ns.storage( true );
			ns.loadPageData();
		} else {
			ns.storage( false );
			clearTimeout( ajaxTimer );
		}
	};

	/**
	 * Does the actual refresh
	 */
	ns.loadPageData = function () {
		var $temp = $( '<div>' );

		$temp.load( location.href + ' #mw-content-text', function () {
			var $newContent = $temp.children( '#mw-content-text' );

			if ( $newContent.length ) {
				$( '#mw-content-text' ).replaceWith( $newContent );
                $( '.mw-rc-openarrow img' ).attr( 'src', 'https://images.wikia.nocookie.net/dev/images/a/ad/Arr_r.png' );
			}

			ajaxTimer = setTimeout( ns.loadPageData, config.refresh );
		} );
		$temp.remove();
	};

	/**
	 * Load the script on specific pages
	 * and only on certain values for wgAction (see disallowActions above)
	 */
	ns.init = function () {
		if (
			$.inArray( mwconfig.wgPageName, config.pages ) !== -1 && $( '#ajaxToggle' ).length === 0 &&
			$.inArray( mwconfig.wgAction, disallowActions ) === -1
		) {
			ns.preloadAJAXRL();
		}
	};

	/* Expose ajaxRC to the world */
	dev.ajaxRC = $.extend( ns, {
		config: config
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

	$( ns.init ); //load script

}( this, jQuery, mediaWiki, Wikia, window.dev = window.dev || {} ) );