/* Search Enhancements - by ShermanTheMythran */

$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Search this wiki');
 
/* External Links - by ShermanTheMythran */
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');
 
/* Fix Domain Namespace - by ShermanTheMythran */
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');
 
/* Spoilers - by ShermanTheMythran */
$('#spoiler-button').click(function(){
	$('#spoiler-text').toggle('slow');
});
$('#spoiler-button').toggle(function(){
	$('#spoiler-button').html('Hide spoiler');},
	function(){
	$('#spoiler-button').html('Show spoiler');}
);
 
/*Various Fixes - by ShermanTheMythran*/
$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
 
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {
 
	var pluses = /\+/g;
 
	function raw(s) {
		return s;
	}
 
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
 
	var config = $.cookie = function (key, value, options) {
 
		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);
 
			if (value === null) {
				options.expires = -1;
			}
 
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
 
			value = config.json ? JSON.stringify(value) : String(value);
 
			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
 
		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
 
		return null;
	};
 
	config.defaults = {};
 
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};
 
})(jQuery, document);
 
/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
    else
        $('#p-personal ul').prepend('<li class="Date" id="displayClock" style="float:right;"><a id="showdate"></a></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
});
 
/*AjaxUndo*/
importScriptPage( 'AjaxUndo/code.js', 'dev' );
 
/*AjaxRefresh*/
importScriptPage('MediaWiki:AjaxRC.js','lmbtest'); //heavily modified by ShermanTheMythran
 
/*Skin Switch - by ShermanTheMythran*/
$('.WikiaBarWrapper .tools').append('<span id="SkinSwitch" class="button" style="font-weight: bold; padding: 1px 5px 3px !important; margin: 0 5px; height: 16px !important;">Lia</span>');
var activateLia = function() {
	$('head').append('<p id="liaScript"><script type="text/javascript">importScriptPage("MediaWiki:Lia.js","lmbtest");importStylesheetPage("MediaWiki:Lia.css","lmbtest");</script></p>');
};
var deactivateLia = function() {
	$('#SkinSwitch.button').html('refreshing...').css({'opacity':'.5','filter':'alpha(opacity=50)','cursor':'default'}).unbind();
	$.removeCookie('skinLia');
	$('#liaScript').remove();
	location.reload();
};
var liaCookie = $.cookie('skinLia');
if(liaCookie == "active") {
	$(activateLia);
	$('#SkinSwitch.button').html('Default').unbind().click(deactivateLia);
}
else {
	$('#SkinSwitch.button').click(function() {
		$(this).html('Default').unbind().click(deactivateLia);
		$(activateLia);
		$.cookie('skinLia','active',{expires: 365}); }
	);
}