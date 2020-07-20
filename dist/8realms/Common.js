//* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

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

/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Intro for Update Namespace */
importScript('MediaWiki:Common.js/updateintro.js');

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');

/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');

/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Standard Edit Summaries */
importScript('MediaWiki:Common.js/standardeditsummaries.js');

/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions",  "Special:AbuseLog", "Special:NewFiles", "Category:Speedy_deletion_candidates", "Category:Speedy_move_candidates", "Special:Statistics"];

var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxrefresh.js');

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Embedding hack for multi-media files */
importScript('MediaWiki:Common.js/embedding.js');

/* Site Meter */
importScript('MediaWiki:Common.js/sitemeter.js');

/* Added SiteNotice Functionality */
importScript('MediaWiki:Common.js/sitenotice.js');

/* Add MyContributions to AccountNavigation */
importScript('MediaWiki:Common.js/accountNavigation.js');

/* HighlightTables */
importScript('MediaWiki:Common.js/highlightTable.js');

/* Pagetitle rewrite */
importScript('MediaWiki:Common.js/pagetitle.js');

/* Konami code: added per [[Forum:Add Konami code]] */
importScript('MediaWiki:Common.js/Konami.js');

/* Autosort code */
importScript('MediaWiki:Common.js/autosort.js');

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

// ==================================================================
// Adding links to On the Wiki tab and change PHOTOS to FILES
// ==================================================================
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeaderRestyle ul li:first-child  a[href="/wiki/Special:NewFiles"]').replaceWith('<a class="subnav-2a" href="/wiki/Special:NewFiles">New Files</a>');
    }
});

// ==================================================================
// Dynamic Templates
// ==================================================================
$(function() {
	if ($('#WikiaArticle pre.jcConfig,#bodyContent pre.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});

// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

// ==================================================================
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// ==================================================================
if (wgPageName == 'User:' + wgUserName.replace(/ /g,'_') + '/skin.css' || wgPageName == 'User:' + wgUserName.replace(/ /g,'_') + '/skin.js') {
    window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + wgPageName.split('/')[1].split('.')[1]);
}

/* Hide edit button on Exchange pages for anons */
function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}
addOnloadHook(AnonMessage)

/* Redirect non-wikia skin users to the correct link for Special:Chat */

if(wgCanonicalSpecialPageName == 'Chat' && skin != 'oasis')
{
	window.location.search = window.location.search + (window.location.search? '&': '?') + 'useskin=oasis';
}

/* </pre> */