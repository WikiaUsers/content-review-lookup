// <nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

/* tournament participant logos */

$(function() {
	$('.tournament-roster-logo-cell > figure').each(function() {
		$(this).replaceWith($(this).html());
	});
	$('.tournament-roster-logo-cell > a, .sections-toggler > a').each(function() {
		$(this).replaceWith($(this).html());
	});
	$('.tournament-roster-logo-cell > img.article-media-placeholder').each(function() {
		$(this).removeClass("article-media-placeholder");
	});
});
 
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

$(function() {
    $('.mw-special-CargoTables .cargoTable tr:first-of-type > th:first-of-type').html('_pageName');
});

// display navboxes in mobile and collapse them

$(function() {
	$(".navbox").each(function(i, e) {
		if (!$(e).find("table:first-child").hasClass("mw-collapsed")) {
			$(e).css("display", "table");
		}
	});
});

$.when(mw.loader.using('mediawiki.util'), $.ready).then(function () {
	$(".navbox span.mw-collapsible-toggle").each(function(i, e) {
			if ($(e).attr("aria-expanded") === "true") {
				$(e).click();
			}
	});
});

// </nowiki>