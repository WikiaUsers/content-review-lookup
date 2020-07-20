/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

function embedXMLimage() // alternative to Azliq7's code
{                        // complement Template:EmbedXMLimage 
    $('.embedXMLimage[id]').each( function() {
        var url = $(this).attr('id');
        url = url.replace(/\.2F/gi, "/");
        url = url.replace(/\.3D/gi, "=");
        url = url.replace(/\.3F/gi, "?");
        $(this).append("<IMG src='http://" + url + "'>");
    });
}
addOnloadHook(embedXMLimage);

/* drop-downs for cactions tabs and whatnot */
importScript('User:Lyrithya/dropdown.js');
 

/* Счётчик Рамблера */
var ramblerURL = "http://counter.rambler.ru/top100.scn?2320167" +
	"&rn=" + Math.round(Math.random() * 2147483647) +
	"&rf=" + encodeURIComponent(document.referrer) +
	"&pt=" + encodeURIComponent(document.title.split(" — ")[0]) + 
	"&en=" + (document.characterSet || document.charset || "") +
	"&fv=" +
	"&ja=" + (navigator.javaEnabled() ? 1 : 0) +
	"&cd=" + (screen ? screen.colorDepth + "-bit" : "") + 
	"&sr=" + (screen ? screen.width + "x" + screen.height : "") +
	"&la=" + (navigator && navigator.language ? navigator.language : "") +
	"&tz=" + (new Date).getTimezoneOffset();
document.write('<div id="top100Counter"><img src="' + ramblerURL + '" /></div>');
/* /Счётчик Рамблера */

(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

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

importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
        // ...
    ]
});

/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Embeds IRC in pages */
importScript('MediaWiki:Common.js/embedirc.js');

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
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove", "Forum:Clan_Chat", "RuneScape:Page_maintenance", "Special:AbuseLog", "Special:NewFiles", "Category:Speedy_deletion_candidates", "Category:Speedy_move_candidates", "Special:Statistics"];

var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxrefresh.js');

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Embedding hack for multi-media files */
importScript('MediaWiki:Common.js/embedding.js');

/* Copyright notice for Oasis */
importScript('MediaWiki:Common.js/copyright.js');

/* Site Meter */
importScript('MediaWiki:Common.js/sitemeter.js');

/* Chat advertisement */
importScript('MediaWiki:Common.js/chat.js');

/* Added SiteNotice Functionality */
importScript('MediaWiki:Common.js/sitenotice.js');

/* Add MyContributions to AccountNavigation */
importScript('MediaWiki:Common.js/accountNavigation.js');

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

/* Autosort code */
importScript('MediaWiki:Common.js/autosort.js');

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

/* CVU report script */
importScript('User:Suppa_chuppa/cvu.js');

/* Joey's Monster Calc added per [[Forum:Calculators in infoboxes]] */

importScript('User:Joeytje50/monstercalc.js');

/* Show the message bubble for anons */
importScript('User:Suppa_chuppa/bubble.js');

/* Calculator script [[Forum:New javascript calculators]] */
$(function(){
if ($('.jcInput').length||$('[class*="jcPane"]').length) {
	importScript('User:Stewbasic/calc.js');
}});

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

//temporary fix for talk page comments bug
if ($('.wikia-button.comments.secondary').attr('href') == '#WikiaArticleComments' && skin == 'oasis') {
    $(document).ready(function() {
        $('.wikia-button.comments.secondary').attr('href', '/wiki/Talk:' + wgPageName).html($('.wikia-button.comments.secondary').html().replace('Comments', 'Discussion'))
    })
}

/* </pre> */