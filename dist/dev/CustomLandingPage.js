/* CustomLandingPage
 *
 * Author: WooperIsBest
 * Other Attributions: Thundercraft5
 *
 * Configuration:
 * document.cookie = 'landingpage=YOURPAGE';
*/

;(function (window, $, mw) {
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
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	if(config.wgIsMainPage && !page.toString().includes('?redirect=no')){
		page.replace('/wiki/' + getCookie('landingpage'));
	}

	if(config.wgPageName == getCookie('landingpage')){
		var header = document.getElementsByClassName('page-header__title-wrapper');
		var href = '<div id="CustomLandingPageBack"><a href="'+ config.wgSiteName + '?redirect=no">   Back</a></div>';
		while(href.includes('%20')){
			href = href.replace(' ', '_');
		}
		
		$(href).appendTo(header);
	}

}(window, window.jQuery, window.mediaWiki));