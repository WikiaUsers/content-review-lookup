
// <source lang="JavaScript">  
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS  
 
function addMastheadTags() { 
var rights = {};
 
// BEGIN List of Accounts Given Extra User Rights Icons
 
 
rights['Catali2016'] = ["Proprietarul"];
 
// END List of Accounts Given Extra User Rights Icons  
 
// BEGIN Script to Remove Old Rights Icons & Insert New  
 
if (wgCanonicalSpecialPageName == "Contributions") { 
var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
 } else { var user = wgTitle; }
 
if (typeof rights[user] != "undefined") {  
 
// remove old rights
 
$('.UserProfileMasthead .masthead-info span.tag').remove();
 
for( var i=0, len=rights[user].length; i < len; i++) {
 
// add new rights 
$('<span class="tag" span style="margin-left: 10px !important">' + 
rights[user][i] + '</span>').appendTo('.masthead-info hgroup'); 
} 
}  
 
// END Script to Remove Old Rights Icons & Insert New  
 
};  
 
$(function() { 
if ($('#UserProfileMasthead')) { 
addMastheadTags(); 
} 
});  
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
 
// </source>End

/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Catali2016|Catali2016]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/// Title Rewrite ///
 
function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;
 
    var titleDiv = document.getElementById(className);
 
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite
 
/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/
 
document.write('<link REL="shortcut icon" HREF="/images/6/64/Favicon.ico" />')

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};
importScriptPage('SocialIcons/code.js','dev');

 
// Chat statement
var statement = 'Before entering, please read the <a href="http://mario.wikia.com/wiki/Help:Chat">help page for chat</a>.'
 
function chatStatement() {
    if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != statement) {
        $('p.chat-name').html(statement);
        setTimeout(chatStatement, 1);
    }
};
 
$(chatStatement);

/*** AJAX Auto-refresh on wiki activity ****************************/
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh this page',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
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