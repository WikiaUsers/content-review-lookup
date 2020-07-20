/* Any JavaScript here will be loaded for all users on every page load. *//*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code courtesy of "pcj" of Wowpedia.
 * Modified by Monchoman45
 */
if (!window.ajaxPages) {ajaxPages = ['Special:RecentChanges', 'Special:Watchlist', 'Special:WikiActivity', 'Jar_Locations'];}
if (!window.ajaxCallAgain) {ajaxCallAgain = [];}
var ajaxTimer;
var doRefresh = true;
function preloadAJAXRL() {
	ajaxRLCookie = (readCookie('ajaxload-' + wgPageName) == 'on') ? true : false;
	appTo = ($('#WikiaPageHeader').length) ? $('#WikiaPageHeader') : $('.firstHeading');
	appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span id="ajaxToggleText">AJAX:</span><input type="checkbox" style="position:relative; top:2px;" id="ajaxToggle"><a onclick="loadPageData()" style="cursor:pointer; margin-top:1px;" class="wikia-button secondary">Refresh now</a>&nbsp;&nbsp;<span style="display: none;" id="ajaxLoadProgress"><img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
	$('#ajaxLoadProgress').ajaxSend(function (event, xhr, settings){
		if (location.href == settings.url) {$(this).show();}
	}).ajaxComplete (function (event, xhr, settings){
		if (location.href == settings.url) {$(this).hide();}
		for(i in ajaxCallAgain) {ajaxCallAgain[i]();}
	});
	$('#ajaxToggle').click(toggleAjaxReload);
	$('#ajaxToggle').attr('checked', ajaxRLCookie);
	if (readCookie('ajaxload-' + wgPageName) == 'on') {loadPageData();}
}
function toggleAjaxReload() {
	if ($('#ajaxToggle').attr('checked') == true) {
		createCookie('ajaxload-' + wgPageName, 'on', 30);
		doRefresh = true;
		loadPageData();
	}
	else {
		createCookie('ajaxload-' + wgPageName, 'off', 30);
		doRefresh = false;
		clearTimeout(ajaxTimer);
	}
}
function loadPageData() {
	cC = ($('#WikiaArticle').length) ? '#WikiaArticle' : '#bodyContent';
	$(cC).load(location.href + ' ' + cC + ' > *', function (data) { 
		if (doRefresh) {ajaxTimer = setTimeout('loadPageData();', 60000);}
	});
}
addOnloadHook(function () { 
	for (i in ajaxPages) {
		if (wgPageName == ajaxPages[i] && $('#ajaxToggle').length == 0) {preloadAJAXRL();}
	}
});