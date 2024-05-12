/* ATT Site JS by GethN7 */

/* Change "View History" to "History" */

$(function() {
    var tab = document.getElementById('ca-history');
    if(!tab) return;
    var tablink = tab.getElementsByTagName('a')[0]
 
    if(!tablink) return;
    tablink.firstChild.nodeValue = 'History';
    if( skin == "monobook" ) {
      tablink.style.paddingLeft = ".4em";
      tablink.style.paddingRight = ".4em";
    }
});


/* Change "Discussion" to "Talk" */

$(function() {
    var tab = document.getElementById('ca-talk');
    if(!tab) return;
    var tablink = tab.getElementsByTagName('a')[0]
 
    if(!tablink) return;
    tablink.firstChild.nodeValue = 'Talk';
    if( skin == "monobook" ) {
      tablink.style.paddingLeft = ".4em";
      tablink.style.paddingRight = ".4em";
    }
});

/* Change "Add section" to "+" */

$(function() {
    var tab = document.getElementById('ca-addsection');
    if(!tab) return;
    var tablink = tab.getElementsByTagName('a')[0]
 
    if(!tablink) return;
    tablink.firstChild.nodeValue = '+';
    if( skin == "monobook" ) {
      tablink.style.paddingLeft = ".4em";
      tablink.style.paddingRight = ".4em";
    }
});


/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Adds a check box at the top of the Recent Changes that auto-refreshes every 30 seconds. 
 */
( function ( $, mw, window ) {
    'use strict';
 
	var	ajaxIndicator = window.ajaxIndicator || 'http://images2.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
		ajaxTimer,
		refreshText = typeof window.AjaxRCRefreshText === 'string' ? window.AjaxRCRefreshText : 'AJAX',
		refreshHover = typeof window.AjaxRCRefreshHoverText === 'string' ? window.AjaxRCRefreshHoverText : 'Enable auto-refreshing page loads',
		ajRefresh = window.ajaxRefresh || 30000,
		ajCallAgain = window.ajaxCallAgain || [],
		ajPages = window.ajaxPages || [ 'Special:RecentChanges' ];
 
 
	function storage( setTo ) {
		if ( localStorage.getItem( 'refresh' ) === null ) {
			localStorage.setItem( 'refresh', true );
		}
		if ( setTo === false ) {
			localStorage.setItem( 'refresh', false );
		} else if ( setTo === true ) {
			localStorage.setItem( 'refresh', true );
		}
		return JSON.parse( localStorage.getItem( 'refresh' ) );
	}
 
 
	/**
	 * Main function to start the Auto-refresh process
	 */
	function preloadAJAXRL() {
		var	appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
		appTo.append( '&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
		$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
			if ( location.href === settings.url ) {
				$( this ).show();
			}
		} ).ajaxComplete ( function ( event, xhr, settings ) {
			var	$collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
			if ( location.href === settings.url ) {
				$( this ).hide();
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
		if ( storage() === true ) {
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
		var cC = '#mw-content-text';
		$( cC ).load( location.href + " " + cC + " > *", function () {
			if ( storage() ) {
				ajaxTimer = setTimeout( loadPageData, ajRefresh );
			}
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