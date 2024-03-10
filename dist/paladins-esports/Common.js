// <nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

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

$(function() {
	$('.mw-charinsert-item').each(function() {
		$(this).html($(this).closest('div').attr('data-ci-label'));
		$(this).css('display', 'inline-block');
	});
});

$(function() {
	var $cargoFields = $('.mw-special-CargoTables #mw-content-text > ul');
	if (!$cargoFields) return;
	var tableName = mw.config.get('wgTitle').match(/\/([^\/]+)$/)[1];
	if (!tableName) return;
	return new mw.Api().postWithToken('csrf', {
		action : 'expandtemplates',
		prop : 'wikitext',
		text : '{{#invoke:CargoDeclare|main|' + tableName + '|forgadget=yes}}'
	}).then(function(data) {
		var wikitext = data.expandtemplates.wikitext;
		var dict = wikitext.split(';;;');
		var lookup = {};
		dict.forEach(function(entry) {
			var tbl = entry.split(':::');
			lookup[tbl[0]] = tbl[1];
		});
		$cargoFields.find('li').each(function() {
			var field = $(this).find('strong').html();
			var el = document.createElement('span');
			if (lookup[field] !== undefined) {
				$(el).html(' - ' + lookup[field]);
			}
			this.appendChild(el);
		});
	});
});

// </nowiki>