// Any JavaScript here will be loaded for all users on every page load.
// <pre>

/**
 * Todo:
 *  Remove deprecated addonloadhook
 *  Move wgVariable to mw.config.get('wgVariable')
 *  Remove deprecated importScriptURI
 */

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ";path=/" + ((expiredays === null)?"":";expires=" + exdate.toGMTString());
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie(c_name) {
	if (document.cookie.length) {
		var c_start = document.cookie.indexOf(c_name + "=")
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return "";
}
 
/**
 * Calls wiki API and returns the response in the callback
 * @param data named array List of parameters to send along with the request. {'format':'json'} is set automatically.
 * @param method string Either POST or GET.
 * @param callback function Thing to run when request is complete
 * @param addurl string (optional) Anything you may want to add to the request url, in case you need it.
 */
 
function callAPI(data, method, callback, addurl) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: mw.config.get('wgScriptPath') + '/api.php' + (addurl?addurl:''),
		type: method,
		cache: false,
		success: function(response) {
			if (response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) {alert('AJAX error: ' + error)}
	});
}
 
// http://www.mredkj.com/javascript/numberFormat.html#addcommas
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
 
// Variables for Dynamic Navigation Bars
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Variables for Ajax Auto-Refresh (courtesy pcj)
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove", "RuneScape:Active_discussions", "Special:AbuseLog", "Special:NewFiles", "Category:Speedy_deletion_candidates", "Category:Speedy_move_candidates", "Special:Statistics", "Special:NewPages", "Special:ListFiles", "Special:Log/move"];
var AjaxRCRefreshText = 'Auto-refresh';
 
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/accountNavigation.js",	//Add Contribs
		"MediaWiki:Common.js/ajaxrefresh.js",		//Auto Refresh
		"MediaWiki:Common.js/CEB.js",			//Custom edit buttons
		"MediaWiki:Common.js/chat.js",			//Chat Notice
		"MediaWiki:Common.js/collapsibletables.js",	//Collapse Table - deprecated: replaced by mw-collapsible
		"MediaWiki:Common.js/countdowntimer.js",	//Count-down Timer
		"MediaWiki:Common.js/displayTimer.js",		//UTC Clock
		"MediaWiki:Common.js/embedding.js",		//Embed Media Hack
		"MediaWiki:Common.js/embedirc.js",		//Embed IRC
		"MediaWiki:Common.js/exchangeintro.js",		//Exchange Intro
		"MediaWiki:Common.js/highlightTable.js",	//Hilite Tables
		"MediaWiki:Common.js/histats.js",		//HiStats
		"MediaWiki:Common.js/Konami.js",		//Konami Code
		"MediaWiki:Common.js/mastheadBoxes.js",		//Masthead Script
		"MediaWiki:Common.js/navigationbars.js",	//Dynamic Nav Bars
		"MediaWiki:Common.js/navigationbars2.js",	//Dynamic Nav (2)
		"MediaWiki:Common.js/pagetitle.js",		//Title Rewrite
		"MediaWiki:Common.js/pengLocations.js",		//Peng. Locations
		"MediaWiki:Common.js/preload.js",		//Template preloads
		"MediaWiki:Common.js/sitenotice.js",		//SiteNotice Add.
		"MediaWiki:Common.js/standardeditsummaries.js",	//Edit Summary
		"MediaWiki:Common.js/updateintro.js",		//Update NS Intro
		"User:Joeytje50/Dropadd.js",			//DropAdd Script
		"User:Joeytje50/monstercalc.js",		//Monster Calc
		"User:Quarenon/survey.js",			//RuneScape:Survey
		"User:Suppa_chuppa/cvu.js",			//CVU Report
		"User:Tyilo/autosort.js",			//Autosort Code
		"User:Tyilo/signature.js",			//Sig. Reminder
		"User:Matthew2602/SwitchInfobox.js",	        //Switch infobox
		"User:Tyilo/ggpcatering.js"			//GGP catering
	]
});

//GE Charts Script
if ($('.GEdatachart').length) {
	importScriptURI('http://code.highcharts.com/stock/highstock.js').onload = function() {
		addOnloadHook(function() {
			importScript('MediaWiki:Common.js/GECharts.js');
		});
	}
	if ($.browser.msie && parseFloat($.browser.version) < 9) {
		addOnloadHook(function() {
			importScript('MediaWiki:Common.js/GECharts.js');
		});
	}
}

// RC Patrol script
if(mw.config.get('wgPageName') === 'RuneScape:RC_Patrol') {
	importScript('User:Suppa_chuppa/rcpatrol.js');
	importStylesheet('User:Suppa_chuppa/rcp.css');
}

// Automatic link fixing
// only loads in mainspace and beta.
if (mw.config.get('wgNamespaceNumber') === 0 || mw.config.get('wgNamespaceNumber') === 120) {
	importScript('MediaWiki:Common.js/linkfix.js');
}


// Calculator script [[Forum:New javascript calculators]]
$(function() {
	if ($('.jcInput').length||$('[class*="jcPane"]').length) {
		importScript('User:Stewbasic/calc.js');
	}
});

// Disable the button to add images to existing galleries
$(function() {
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

// Item Compare Overlays
// Original by Quarenon
$(function() {
	if ($('#WikiaArticle .cioCompareLink,#bodyContent .cioCompareLink').length) {
		importScript('MediaWiki:Common.js/compare.js');
		importStylesheet('MediaWiki:Common.css/compare.css');
	}
});

// Dynamic Templates
$(function() {
	if ($('#WikiaArticle .jcConfig,#bodyContent .jcConfig').length) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});

// Insert username 
$(function() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$("span.insertusername").text(mw.config.get('wgUserName'));
});

// Hide Auto-uploads
if (mw.config.get('wgCanonicalNamespace') === "Special" && mw.config.get('wgCanonicalSpecialPageName') === "Log") {
	importScript('User:AzBot/HideBotUploads.js');
}

// Description: Redirects from /User:UserName/skin.js or .css to the
// user's actual skin page.
// Support for ?action=edit
if (mw.config.get('wgUserName') !== null && (mw.config.get('wgPageName') === 'User:' + mw.config.get('wgUserName').replace(/ /g,'_') + '/skin.css' || mw.config.get('wgPageName') == 'User:' + mw.config.get('wgUserName').replace(/ /g,'_') + '/skin.js')) {
	window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + mw.config.get('wgPageName').split('/')[1].split('.')[1]);
}

// Hide edit button on Exchange pages for anons
function AnonMessage() {
	if(mw.config.get('wgUserGroups') === null) {
		$('.anonmessage').css('display', 'inline');
	}
}
addOnloadHook(AnonMessage)