/* Any JavaScript here will be loaded for all users on every page load. */

/****************************/
/* spoilers by User:Tierrie */
/****************************/

/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

var showSpoiler = new Array();
function showSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('show_warning','hide_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('hide_spoiler','show_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=1; path=/';
}
 
function hideSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
 
    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=0; path=/';
}
 
function toggleSpoilers(ev) {
  var splrType=this.className.split('_')[1];
  showSpoiler[splrType] = showSpoiler[splrType]?0:1;
  if(showSpoiler[splrType])
    showSpoilers(splrType);
  else 
    hideSpoilers(splrType);
  //ev.target.focus(); /* focus back on the element because large spoilers tend to move the page around */
}
 
function initSpoilers() {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    if (hasClass(Divs[i], 'splr')) {
      Divs[i].childNodes[0].onclick = toggleSpoilers;
 
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
 
  var cookies = document.cookie.split("; ");
  for (var i=0; i < cookies.length; i++) {
    // a name/value pair (a crumb) is separated by an equal sign
    if(cookies[i].indexOf('showspoiler')!=-1) {
      var crumbs = cookies[i].split("=");
      var splrType = crumbs[0].split('_')[1]; /* cookie="showspoiler_dao=1", crumbs[0] = "showspoiler_dao", splrType="dao" */
      var splrValue = parseInt(crumbs[1]);
 
      showSpoiler[splrType]=splrValue;
      if(splrValue)
        showSpoilers(splrType);
      else
        hideSpoilers(splrType);
    }
  }
}
 
var spoilers = true;
function loadSpoilers() {
  if(spoilers) initSpoilers();
}
addOnloadHook(loadSpoilers);

/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny)
 */
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Auto-Refresh',
	refreshHover = 'Enable auto-refreshing of this page' ,
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity' );
}
if ( !window.ajaxCallAgain ) {
	ajaxCallAgain = [];
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
		var c_start = document.cookie.indexOf( c_name + "=" )
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
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false,
		appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
	appTo.append( '&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).show();
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).hide();
			for( i in ajaxCallAgain ) {
				ajaxCallAgain[i]();
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
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
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
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );


importScriptPage('Standard_Edit_Summary/code.js', 'dev');

importScriptPage('RevealAnonIP/code.js', 'dev');