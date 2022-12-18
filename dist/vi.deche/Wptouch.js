/* check if the user is scrolling */
var dragging = false;
$('body').on('touchmove', function(){
	/* set to true when the user is scrolling */
	dragging = true;
});
/* reset dragging to false when a touchevent starts */
$('body').on('touchstart', function(){
	dragging = false;
});

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license 
Full license: https://raw.githubusercontent.com/paulirish/matchMedia.js/master/LICENSE.txt */

window.matchMedia || (window.matchMedia = function() {
	"use strict";

	// For browsers that support matchMedium api such as IE 9 and webkit
	var styleMedia = (window.styleMedia || window.media);

	// For those that don't support matchMedium
	if (!styleMedia) {
		var style       = document.createElement('style'),
			script      = document.getElementsByTagName('script')[0],
			info        = null;

		style.type  = 'text/css';
		style.id    = 'matchmediajs-test';

		script.parentNode.insertBefore(style, script);

		// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
		info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

		styleMedia = {
			matchMedium: function(media) {
				var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

				// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
				if (style.styleSheet) {
					style.styleSheet.cssText = text;
				} else {
					style.textContent = text;
				}

				// Test if media query is true or false
				return info.width === '1px';
			}
		};
	}

	return function(media) {
		return {
			matches: styleMedia.matchMedium(media || 'all'),
			media: media || 'all'
		};
	};
}());

/* Scale brackets to screenwidth */
function scalebrackets () {
	$('.bracket-wrapper').css('position', 'relative');
	var windowwidth = window.innerWidth;
	var bracketscale;
	var bracketheight;
	var bracketwidth;
	var bracketscalestr;
	$('.bracket-wrapper').each(function() {
		if ($(this).parents('.tabs-content').length) {
			return;
		}
		$(this).children('.bracket').css('position', 'absolute');
		$(this).children('.bracket-push').data('padding-top', $(this).children('.bracket').height());
		$(this).children('.bracket-wrapper').data('width', $(this).children('.bracket').width());
		$(this).children('.bracket-push').css('padding-top', $(this).children('.bracket').height()+'px');
		$(this).css('width', parseInt($(this).children('.bracket').css('width'))+'px');
		bracketscale = windowwidth / parseInt($(this).children('.bracket').css('width'));
		if (bracketscale < 1) {
			bracketheight = parseInt($(this).children('.bracket').css('height')) * bracketscale;
			bracketwidth = parseInt($(this).children('.bracket').css('width')) * bracketscale;
			bracketscalestr = 'scale('+bracketscale+')';
			$(this).children('.bracket').css('-webkit-transform', bracketscalestr);
			$(this).children('.bracket').css('transform', bracketscalestr);
			$(this).children('.bracket-push').css('padding-top', bracketheight+'px');
			$(this).css('width', bracketwidth+'px');
		}
	});
}
$('.bracket-wrapper').bind('touchend', function(){
	/* only trigger the resize, when the user is not scrolling */
	if (dragging) {
		return;
	}
	$(this).children('.bracket').css('-webkit-transform', 'scale(1)');$(this).children('.bracket').css('transform', 'scale(1)');
	$(this).children('.bracket-push').css('padding-top', $(this).children('.bracket-push').data('padding-top')+'px');
	$(this).children('.bracket-wrapper').css('width', $(this).data('width')+'px');
});

/* Main Page specific */
jQuery(document).ready( function($) {
	if (matchMedia("screen and (max-width : 1000px)").matches
		&& $('.page-Main_Page').length > 0) {
		var boxesOrder = [
			'#infobox_tournaments',
			'#infobox_portals',
			'#infobox_game_news',
			'#infobox_transfers',
			'#infobox_liquipedia_news'
		];

		$('.content > .post > h2').hide();
		$('.content > .post > h2 + hr').hide();

		$.each(boxesOrder, function(i, value) {
			$(value).detach().appendTo($('.infoboxes'));
		});
		
		$('.infobox_news_2').css('height', 'inherit');
		$('.infobox_news_2 .mpboxtitle').click(function() {
			$(this).parent().toggleClass('open-section');
		});
	}
	/* Scale brackets to screenwidth */
	scalebrackets();
});