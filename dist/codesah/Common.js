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
		url: '/api.php' + (addurl?addurl:''),
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
var ajaxPages = ["Especial:CambiosRecientes", "Especial:Seguimiento", "Especial:Registro", "Especial:Contribuciones", "Subforo:General", "CoDeSaH Wiki:Mantenimiento", "Especial:NuevasImágenes", "Especial:Estadísticas", "Especial:PáginasNuevas", "Especial:ListaImágenes", "Especial:Registro/move", "Categoría:Speedy_deletion_candidates", "Categoría:Speedy_move_candidates"];
var AjaxRCRefreshText = 'Auto-refresh';
 
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/ajaxrefresh.js",		//Auto Refresh
		"MediaWiki:Common.js/CEB.js",			//Custom edit buttons
		"MediaWiki:Common.js/collapsibletables.js",	//Collapse Table - deprecated: replaced by mw-collapsible
		"MediaWiki:Common.js/countdowntimer.js",	//Count-down Timer
		"MediaWiki:Common.js/displayTimer.js",		//UTC Clock
		"MediaWiki:Common.js/embedding.js",		//Embed Media Hack
		"MediaWiki:Common.js/embedirc.js",		//Embed IRC
		"MediaWiki:Common.js/exchangeintro.js",		//Exchange Intro
		"MediaWiki:Common.js/highlightTable.js",	//Hilite Tables
		"MediaWiki:Common.js/histats.js",		//HiStats
		"MediaWiki:Common.js/Konami.js",		//Konami Code
		"MediaWiki:Common.js/navigationbars.js",	//Dynamic Nav Bars
		"MediaWiki:Common.js/navigationbars2.js",	//Dynamic Nav (2)
		"MediaWiki:Common.js/pagetitle.js",		//Title Rewrite
		"MediaWiki:Common.js/pengLocations.js",		//Peng. Locations
		"MediaWiki:Common.js/preload.js",		//Template preloads
		"MediaWiki:Common.js/sitenotice.js",		//SiteNotice Add.
		"MediaWiki:Common.js/spreport.js",		//Special Page Report
		"MediaWiki:Common.js/standardeditsummaries.js",	//Edit Summary
		"MediaWiki:Common.js/updateintro.js",		//Update NS Intro
		"MediaWiki:Common.js/WLH_edit.js",		//Add edit links to WhatLinksHere
		"MediaWiki:Common.js/namespaceNumbersList.js",  //Namespace numbers list
		"MediaWiki:Common.js/Dropadd.js",		//DropAdd Script
		"MediaWiki:Common.js/monstercalc.js",		//Monster Calc
		"MediaWiki:Common.js/survey.js",		//CoDeSaH:Encuestas
		"MediaWiki:Common.js/cvu.js",			//CVU Report
		"MediaWiki:Common.js/autosort.js",		//Autosort Code
		"MediaWiki:Common.js/signature.js",		//Sig. Reminder
		"MediaWiki:Common.js/SwitchInfobox.js",	        //Switch infobox
		"MediaWiki:Common.js/ggpcatering.js"		//GGP catering
	]
});

/**
 * Add custom price input for Exchange pages
 * To be used when GED is not working correctly
 * Remember to update [[MediaWiki:Group-autoconfirmed.js]]
 * If GED stops working completely add Quarenon's script to importArticles() statement above
 * See [[RuneScape:Exchange namespace]] for more details
 */
importScript('MediaWiki:Common.js/gemwupdate.js');

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
if(mw.config.get('wgPageName') === 'Patrulla de CR') {
	importScript('MediaWiki:Common.js/rcpatrol.js');
	importStylesheet('MediaWiki:Common.css/rcp.css');
}

// Automatic link fixing
// only loads in mainspace.
if (mw.config.get('wgNamespaceNumber') === 0) {
	importScript('MediaWiki:Common.js/linkfix.js');
}


// Calculator script [[Forum:New javascript calculators]]
$(function() {
	if ($('.jcInput').length||$('[class*="jcPane"]').length) {
		importScript('MediaWiki:Common.js/calc.js');
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
if (mw.config.get('wgCanonicalNamespace') === "Especial" && mw.config.get('wgCanonicalSpecialPageName') === "Registro") {
	importScript('MediaWiki:Common.js/HideBotUploads.js');
}

// Description: Redirects from /Usuario:UserName/skin.js or .css to the
// user's actual skin page.
// Needs support for ?action=edit
if (mw.config.get('wgUserName') !== null && (mw.config.get('wgPageName') === 'Usuario:' + mw.config.get('wgUserName').replace(/ /g,'_') + '/skin.css' || mw.config.get('wgPageName') == 'Usuario:' + mw.config.get('wgUserName').replace(/ /g,'_') + '/skin.js')) {
	window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + mw.config.get('wgPageName').split('/')[1].split('.')[1]);
}

// Hide edit button on Exchange pages for anons
function AnonMessage() {
	if(mw.config.get('wgUserGroups') === null) {
		$('.anonmessage').css('display', 'inline');
	}
}
addOnloadHook(AnonMessage)

/**
 * Podomatic, hosts of Jagex podcasts, is blocked by Wikia spam filters
 * This adds some text below the spam block notice directing them to the template to be used instead
 */
if ($('#spamprotected').text().search('podomatic') > -1) {
	$('#spamprotected').append('<hr><p>Para agregar enlaces a comunicados de Jagex, por favor use <a href="/wiki/Plantilla:Atl_podcast">Plantilla:Atl podcast</a>. Si el tipo de comunicado que desea enviar no se encuentra en esta plantilla, por favor deje un mensaje <a href="/wiki/CoDeSaH Wiki:Ayuda">aquí</a>.</p>');
}