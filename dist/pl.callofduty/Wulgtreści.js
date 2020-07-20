/**
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * Modified: Vuh
 * Zerżnięte z Gothicpedii, dzięki :)! 
 * __NOWYSIWYG__
 */
/*jshint curly:false jquery:true browser:true */
$(function () {
	"use strict";
	window.SpoilerAlert = (function (my, console, Math) {
		my = $.extend({
			question: 'Artykuł lub grafika zawiera treści powszechnie uznane za wulgarne, niemoralne, propagujące rasizm lub/i budzące obrazę społeczną jak i osobową. Mimo tego chcesz je zobaczyć?',
			yes: 'Nie',
			no: 'Tak',
			isSpoiler: function () {
				return(/^Spoiler\:/.test(document.title));
			},
			back: false
		}, my); // If my is undefined/null/not-object then jQuery will ignore it
		var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;
		var dialog =
			'<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
			'<tr>' +
			'<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' +
			my.question +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="padding: 0px 30px 20px; text-align: center; border-style: none;">' +
			'<button id="no">' + my.no + '</button>' +
			'</td>' +
			'<td style="padding: 0px 30px 20px; text-align: center; border-style: none;">' +
			'<button id="yes">' + my.yes + '</button>' +
			'</td>' +
			'</tr>' +
			'</table>';
		// Use LocalStorage, it doesn't get sent to the server every HTTP request
		var ids = $.storage.get('SpoilerAlertJS');
		// Backwards compatibility. This block can be removed after a week or so
		if(!ids) {
			ids = $.cookies.get('spoilers');
			if(ids) { // Old cookie found, convert to local storage
				ids = ids.split(',');
				$.cookies.del('spoilers', {
					hoursToLive: 0,
					path: '/',
					domain: location.host
				});
				$.storage.set('SpoilerAlertJS', ids);
			} else {
				ids = [];
			}
		}
		if(-1 < $.inArray("Wulgarne treści", wgCategories) || my.isSpoiler() && -1 === $.inArray(wgArticleId, ids)) {
			var article = $('article#WikiaMainContent');
			var articleHeight = article.height();
			var dialogHeight;
			$('<div id="blackout">' + dialog + '</div>').appendTo(article).css({
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 2000000001,
				backgroundColor: '#000000',
				minHeight: (dialogHeight = $('#dialog').height())
			});
			var dialogPadding = 100;
			var topRelativeToWindow = Math.round(
				($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
			);
			var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
			console.log(
				'window.height: ', $(window).height(),
				', WikiaArticle.offset.top: ', $('#WikiaArticle').offset().top,
				', articleHeight:', articleHeight,
				', dialogHeight:', dialogHeight,
				', topRelativeToWindow:', topRelativeToWindow,
				', topRelativeToArticle: ', topRelativeToArticle
			);
			$('#dialog').css({
				position: 'relative',
				left: '0px',
				right: '0px',
				margin: '0px auto',
				top: Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
			});
			$('#no').click(function () {
				$('#dialog').remove();
				if(my.back) {
					if(history.length) {
						history.back();
					} else {
						location.href = location.protocol + '//' + location.host;
					}
				}
			});
			$('#yes').click(function () {
				$('#dialog').remove();
				$('#blackout').fadeOut(1600, function () {
					$(this).remove();
				});
				ids.push(wgArticleId);
				$.storage.set('SpoilerAlertJS', ids);
			});
		}
		return my;
	})(window.SpoilerAlert, window.console || {
		log: $.noop
	}, Math);
});