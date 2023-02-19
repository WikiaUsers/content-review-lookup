/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/*** Cookie accessor functions ***/
function setCookie(name, value, expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);
	document.cookie = name + '=' + escape(value) + ';path=/';
}
 
function getCookie(name) {
	if (document.cookie.length > 0) {
		var start = document.cookie.indexOf(name + '=');
		if (start != -1) { 
			start = start + name.length + 1; 
			var end = document.cookie.indexOf(';', start);
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		} 
	}
	return '';
}

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Embeds IRC in pages */
importScript('MediaWiki:Common.js/embedirc.js‎');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Intro for Exchange Namespace */
importScript('MediaWiki:Common.js/exchangeintro.js');

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
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove", "Forum:Clan_Chat", "RuneScape:Page_maintenance", "Special:AbuseLog", "Special:NewFiles"];

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
importScript('MediaWiki:Common.js/accountNavigation.js‎');

/* HighlightTables */
importScript('MediaWiki:Common.js/highlightTable.js');

/* PengLocations */
importScript('MediaWiki:Common.js/pengLocations.js');

/* Pagetitle rewrite */
importScript('MediaWiki:Common.js/pagetitle.js');

/* GEMW updating interface on exchange pages and item infoboxes */
importScript('User:Quarenon/gemwupdate.js');

/* Konami code: added per [[Forum:Add Konami code]] */
importScript('MediaWiki:Common.js/Konami.js');

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

/* CVU report script */
importScript('User:Suppa_chuppa/cvu.js');

// ==================================================================
// Item Compare Overlays
// ==================================================================
$(function() {
	if ($('#WikiaArticle .cioCompareLink,#bodyContent .cioCompareLink').size() > 0) {
		importScript('User:Quarenon/compare.js');
		importStylesheet('User:Quarenon/compare.css');
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
// Hide Auto-uploads
// ==================================================================
if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Log") {
    importScript('User:AzBot/HideBotUploads.js');
}

// ==================================================================
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: Cacycle
// ==================================================================
if (wgArticleId == 0 && wgUserName) {
	var slash = wgPageName.indexOf('/');
	var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
	var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
	var ext = null;
	if (norm == test + 'js') ext = 'js';
	else if (norm == test + 'css') ext = 'css';
	if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
}

/* </pre> */