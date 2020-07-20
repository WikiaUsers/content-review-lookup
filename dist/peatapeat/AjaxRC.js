//Modified by Seaside98 and ShermanTheMythran

/*<source lang="javascript">*/
/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny) and Kangaroopower (http://community.wikia.com/wiki/User:Kangaroopower)
 */
( function ( $, mw, window ) {
	'use strict';

	var	ajaxIndicator = window.ajaxIndicator || 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
		ajaxTimer,
		refreshText = typeof window.AjaxRCRefreshText === 'string' ? window.AjaxRCRefreshText : 'AJAX',
		refreshHover = typeof window.AjaxRCRefreshHoverText === 'string' ? window.AjaxRCRefreshHoverText : 'Enable auto-refreshing page loads',
		ajRefresh = window.ajaxRefresh || 60000,
		ajPages = window.ajaxPages || [ 'Special:RecentChanges' ];


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
		var	$appTo = ( $( '#WikiaPageHeader' ).length ) ? ( $('.activity-nav ul').length ? $( '#WikiaPageHeader > h2 .activity-nav ul' ) : $( '#WikiaPageHeader > h2' ) ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
		$appTo.append( '<li style="border-left:solid 1px #CACACA;height:16px;margin-left:6px;padding-left:3px;list-style:none;display:inline" id="ajaxRefresh"><input type="checkbox" style="margin-top:1px;position:absolute" id="ajaxToggle"><span id="ajaxLoadProgress" style="position:absolute;height:16px;width:16px;background-image:url(' + ajaxIndicator + ');margin:-4px 0 0 20px;display:none"></span><style type="text/css">#WikiaPageHeader{padding-bottom:9px}.activity-nav #ajaxRefresh{bottom:3px;}</style></li>' );
		$( document ).ajaxSend( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$( '#ajaxLoadProgress' ).show();
			}
		} ).ajaxComplete ( function ( event, xhr, settings ) {
			var	$collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' ),
				ajCallAgain = window.ajaxCallAgain || [];
			if ( location.href === settings.url ) {
				$( '#ajaxLoadProgress' ).hide();
				for ( var i = 0; i < ajCallAgain.length; i++ ) {
					ajCallAgain[i]();
				}
				if ( $collapsibleElements.length ) {
					$collapsibleElements.makeCollapsible();
				}
				if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
					mw.special.recentchanges.init();
					if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
						RecentChangesLocal.init();
					}
				}
				if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity' ) {
					window.WikiActivity.init();
				}
			}
		} );
		$( '#ajaxToggle' ).click( toggleAjaxReload );
		$( '#ajaxToggle' ).attr( 'checked', storage());
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
		$temp.load( location.href + " #mw-content-text", function () {
			var $newContent = $temp.children( '#mw-content-text' );
			if ( $newContent.length ) {
				$( '#mw-content-text' ).replaceWith( $newContent );
			}
			ajaxTimer = setTimeout( loadPageData, ajRefresh );
		} );
	}

	/**
	 * Load the script on specific pages
	 * Should we make it load only on view or just not on edit....
	 */
	$( function () {
		if ( $.inArray( mw.config.get( 'wgPageName' ), ajPages ) !== -1 && $( '#ajaxToggle' ).length === 0 && mw.config.get( 'wgAction' ) !== 'edit' ) {
			preloadAJAXRL();
		}
	} );

	/**
	 * Temp Hack: copy the RC filter JS since it can't be accessed
	 */
	var RecentChangesLocal = {
		init: function() {
			this.$table = $('.mw-recentchanges-table');
			this.$dropdown = this.$table.find('.WikiaDropdown');
			this.$submit = this.$table.find('input[type="submit"]');
			this.$submit.on('click.RecentChangesDropdown', $.proxy(this.saveFilters, this));
			this.$submit.removeAttr('disabled'); //FF clean

			this.dropdown = new Wikia.MultiSelectDropdown(this.$dropdown);
			this.dropdown.on('change', $.proxy(this.onChange, this));

		},

		saveFilters: function(event) {
			var self = this;

			event.preventDefault();

			self.dropdown.disable();
			self.$submit.attr('disabled', 'disabled');

			if(self.dropdown.getSelectedValues().length == 0) {
				self.dropdown.doSelectAll(true);
			}

			$.nirvana.sendRequest({
				controller: 'RecentChangesController',
				method: 'saveFilters',
				data: {
					filters: self.dropdown.getSelectedValues()
				},
				type: 'POST',
				format: 'json',
				callback: function(data) {
					window.location.reload();
				}
			});
		}
	};
}( jQuery, mediaWiki, this ) );

/*</source>*/