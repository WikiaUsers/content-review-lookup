// <nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Dynamic Tabs - Adapted from Liquipedia - http://wiki.teamliquid.net/dota2/MediaWiki:Common.js */
/* Tabs by FO-nTTaX */
$(document).ready (function() {
	$('div.tabs-dynamic ul.tabs > li').click(
		function () {
			var i = $(this).index() + 1;
			$(this).parent().children('li').removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().children('div.tabs-content').children('div').removeClass('active');
			$(this).parent().parent().children('div.tabs-content').children('div.content' + i).addClass('active');
		}
	);
	$('div.tabs-dynamic').each(function(index) {
		var h = $(this).children('ul.tabs').children('li.active').index() + 1;
		$(this).children('div.tabs-content').children('div.content' + h).addClass('active');
	});
	var hash = location.hash.slice(1);
	if (hash.substring(0, 4) == 'tab-') {
		var hasharr = hash.split('-scrollto-');
		var tabno = hasharr[0].replace('tab-', '');
    		$('div.tabs-dynamic ul.tabs > li').removeClass('active');
		$('div.tabs-dynamic ul.tabs > li.tab' + tabno).addClass('active');
		$('div.tabs-dynamic div.tabs-content div').removeClass('active');
		$('div.tabs-dynamic div.tabs-content div.content' + tabno).addClass('active');
		if (hasharr.length == 2) {
			var scrollto = '#' + hasharr[1];
			setTimeout(function(){$(window).scrollTop($(scrollto).offset().top)}, 500);
		}
	}
});
/* Dynamic Tabs - END */
/* Bracket Highlighting - Adapted from Liquipedia - http://wiki.teamliquid.net/dota2/MediaWiki:Common.js */
var bracketGame;
mw.hook('wikipage.content').add(function() {
	$('.match-row').each( function() {
		if ($(this).find('.bracket-game-details').length > 0 && $(this).find('.legend-table').length == 0) {
			$(this).find('td:eq(2)').prepend('<div style="position:relative"><div class="match-row-icon"></div></div>');
		}
	});
	$('.match-row').off('hover');
	$('.match-row').off('click');
	$('.match-row').hover(function () {
		$(this).addClass('bracket-hover');
		if ($(this).closest('.match-row').find('.bracket-game-details').length) {
			$(this).css('cursor', 'pointer');
		}
	},
	function () {
		$(this).removeClass('bracket-hover');
	});

	$('.match-row').click(function (event) {
		if (bracketGame != null) {
			bracketGame.find('.bracket-game-details').toggle();
			if (bracketGame[0] === $(this)[0]) {
				bracketGame = null;
				return;
			}
		}
		bracketGame = $(this);
		var height = bracketGame.find('.bracket-game-details').height();
		bracketGame.find('.bracket-game-details').css('margin-top', 3);
		bracketGame.find('.bracket-game-details').toggle();
		event.stopPropagation();
	});


	$('html').click(function () {
		if (bracketGame != null) {
			bracketGame.find('.bracket-game-details').toggle();
			bracketGame = null;
		}
	});

	$('.bracket-game-details').click(function (event) {
		event.stopPropagation();
	});
});
/* End Bracket Highlighting */

/* functions for gadgets */
window.displayColor = function(colorclass, id) {
	if (! id) id = 'p-cactions';
    $("#" + id).addClass(colorclass);
    return;
}

window.clearDisplayColor = function(id) {
	if (! id) id = 'p-cactions';
	$("#" + id).removeClass("gadget-action-fail gadget-action-incomplete gadget-action-success");
}

/* end functions for gadgets */


/* expiration of matches starting in schedule navboxes (and anything else) */

$.when(mw.loader.using('mediawiki.util'), $.ready).then( function () {
	var $expirationList = $('.upcoming-matches');
	if (!$expirationList.length) {
		return;
	}
	$expirationList.each( function() {
		var nowTime = Date.now();
		var expTime = parseInt($(this).attr('data-expiration')) * 1000;
		if (nowTime >= expTime) {
			$(this).css('display', 'none');
		}
	})
} );

/* end expiration of matches starting in schedule navboxes (and anything else) */

/* temp fix until tipping over disables hovers on edit buttons etc */
$(function() {
	var title = mw.config.get('wgTitle');
	$('[data-to-target-title="' + title + '"]').each(function () {
		$(this).removeClass('to_hasTooltip');
		$(this).attr('data-to-id','');
	});
});

$(function() {
	$('.to_hasTooltip[data-to-missing-page="false"]').removeAttr('title');
})


$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Module:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.config.get('wgServer') + '/' + target;
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
});

$(function() {
	if (mw.config.get('wgPageName') != 'MediaWiki:Gadgets-definition') return;
	var urlPrefix = mw.config.get('wgServer') + '/MediaWiki:Gadget-';
	function replaceWithLink(str) {
		var link = document.createElement('a');
		$(link).attr('href', urlPrefix + str);
		$(link).html(str);
		return link.outerHTML;
	}
	$('#mw-content-text li').each(function() {
		var html = $(this).html();
		var htmlParts = html.split('|');
		for (i in htmlParts) {
			if (htmlParts[i].endsWith('css') || htmlParts[i].endsWith('js')) {
				htmlParts[i] = replaceWithLink(htmlParts[i]);
			}
		}
		var text = htmlParts.join('|');
		var firstPart = text.match(/^([^\|\[]*)/)[0];
		if (firstPart) text = text.replace(firstPart, replaceWithLink(firstPart));
		$(this).html(text);
	});
	$('#mw-content-text h2 .mw-headline').each(function() {
		$(this).html(replaceWithLink('section-' + $(this).html()));
	});
});

// </nowiki>