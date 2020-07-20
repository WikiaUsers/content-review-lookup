/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution
 * by [[User:Grunny|Grunny]] (for bug fixes)
 */
 
var ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
var ajaxPages = new Array("Special:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
var refreshHover = 'Automatically refresh the page';
var doRefresh = true;
var ajaxBC = ($('#WikiaArticle').length ) ? '#WikiaArticle' : '#bodyContent';
 
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}
 
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
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
 
function preloadAJAXRL() {
	var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
	var appTo = ($('#WikiaPageHeader' ).length) ? $('#WikiaPageHeader > h1') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading')); 
 
	appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="float: none; vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
 
	$('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
		if (location.href == settings.url) {
			$(this).show();
		}
	} ).ajaxComplete(function(event, xhr, settings) {
		if (location.href == settings.url) {
			$(this).hide();
 
			// Re-run certain functions
			if ($(ajaxBC + ' .mw-collapsible').length) {
				$(ajaxBC + ' .mw-collapsible').makeCollapsible();
			}
 
			if (mw.config.get("wgNamespaceNumber") == -1 
				&& mw.config.get("wgCanonicalSpecialPageName") == "Recentchanges") {
				mw.special.recentchanges.init();
			}
		}
	});
 
	$('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
	if (getCookie("ajaxload-" + wgPageName) == "on") {
		loadPageData();
	}
}
 
function toggleAjaxReload() {
	if ($('#ajaxToggle').prop('checked') === true) {
		setCookie("ajaxload-" + wgPageName, "on", 30);
		doRefresh = true;
		loadPageData();
	} else {
		setCookie("ajaxload-" + wgPageName, "off", 30);
		doRefresh = false;
		clearTimeout(ajaxTimer);
	}
}
 
function loadPageData() {
	$(ajaxBC).load(location.href + " " + ajaxBC + " > *", function (data) {
		if (doRefresh) {
			ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
		}
	});
}
 
$(function() {
	for (var x in ajaxPages) {
		if (wgPageName == ajaxPages[x] && $('#ajaxToggle').length===0) {
			preloadAJAXRL();
		}
	}
});