/* CustomLandingPage
 *
 * Author: WooperIsBest
 * Other Attributions: Thundercraft5
 *
 * Configuration:
 * document.cookie = 'landingpage=YOURPAGE';
*/

;(function ($, mw) {
	'use strict';
	var config = mw.config.get([
		'wgIsMainPage',
		'wgPageName',
		'wgSiteName'
	]);
	var page = window.location;

	function getCookie(cname) { //https://www.w3schools.com/js/js_cookies.asp
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i <ca.length; i++) {
			var c = ca[i];
			c = c.replace(/^\s*/gm, '');
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	if (config.wgIsMainPage && !page.toString().includes('?redirect=no') && getCookie('landingpage')) {
		page.replace('/wiki/' + getCookie('landingpage'));
	}

	function init() {
		if (config.wgPageName === getCookie('landingpage')) {
			var header = document.getElementsByClassName('page-header__title-wrapper');
			var href ='<div id="CustomLandingPageBack">' +
				'<a href="'+ (config.wgSiteName).replace(/\s/gm, '_') + '?redirect=no">' +
					'   ' + mw.msg('back') +
				'</a>' +
			'</div>';
			$(href).appendTo(header);
		}
	}

	mw.loader.using(['mediawiki.api']).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'back'
		]);
	}).then(init);
}(window.jQuery, window.mediaWiki));