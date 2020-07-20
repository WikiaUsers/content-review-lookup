/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny)
 */
 
/* Heavily modified by both Seaside98 and ShermanTheMythran */
 
var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/legouniversestories/images/b/ba/29.gif',
	ajaxTimer,
	ajaxRefresh = 4000,
	refreshText = 'Refresh',
	refreshHover = 'Check to automatically refresh the content of the page',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = [ 'Special:RecentChanges', 'Special:Log', 'Special:WikiActivity', 'Special:WikiActivity/activity', 'Special:WikiActivity/watchlist' ];
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" );
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		}
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false;
     if ( wgPageName == "Special:WikiActivity" || wgPageName == "Special:WikiActivity/watchlist" || wgPageName == "Special:WikiActivity/activity" ) { appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader .activity-nav ul' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstheading' ) ); } else { appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader > h2' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstheading' ) ); };
	appTo.append( '<li style="border-left:1px solid silver;height:17px;list-style:none;display:inline;margin:0 0 0 6px;padding:2px 0 0 3px" id="ajaxRefresh"><input type="checkbox" style="margin-top:1px;position:absolute" id="ajaxToggle"><span id="ajaxLoadProgress" style="opacity:0;filter:alpha(opacity=0);position:absolute;height:24px;width:24px;transition:opacity .5s;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;-o-transition:opacity .5s;background-image:url(' + ajaxIndicator + ');margin:-4px 0 0 20px"></span><style type="text/css">#WikiaPageHeader{padding-bottom:9px}.AdminDashboardHeader #ajaxRefresh{margin-top:9px !important;position:absolute}</style></li>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).css({'opacity':'1','filter':'alpha(opacity=100)'});
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		var	$collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
		if ( location.href == settings.url ) {
			$( this ).css({'opacity':'0','filter':'alpha(opacity=0)'});
			for ( var i = 0; i < ajaxCallAgain.length; i++ ) {
				ajaxCallAgain[i]();
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
		}
	} );
	$( '#ajaxToggle' ).click( toggleAjaxReload );
	$( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
	if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
		loadPageData();
	}
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = '#mw-content-text';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( loadPageData, ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () {
	for ( var x = 0; x < ajaxPages.length; x++ ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
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