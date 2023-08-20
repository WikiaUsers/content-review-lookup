// <nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

mw.loader.load('/load.php?lang=en&modules=u%3Adev%3AMediaWiki%3ASpriteEditor.js&skin=fandomdesktop&version=ztntf');

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
	});
} );

/* temp fix until tipping over disables hovers on edit buttons etc */
$(function() {
	$('.mw-editsection .to_hasTooltip').each(function () {
		$(this).removeClass('to_hasTooltip');
		$(this).attr('data-to-id','');
	});
	$('.to_hasTooltip[data-to-flags="fiem"]').removeAttr('title');
});

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
	if (mw.config.get('wgPageName') !== 'MediaWiki:Gadgets-definition') return;
	if (window.location.href.indexOf("history") > 0) return;
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
		for (var i in htmlParts) {
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
	$('.ci-loading-text').css('display','none');
});

$(function() {
	var $cargoFields = $('.mw-special-CargoTables #mw-content-text > ul');
	if (!$cargoFields.length) return;
	var tableName = mw.config.get('wgTitle').match(/\/([^\/]+)$/)[1];
	if (!tableName) return;
	return new mw.Api().postWithToken('csrf', {
		action : 'expandtemplates',
		prop : 'wikitext',
		text : '{{#invoke:CargoDeclare|main|' + tableName + '|forgadget=yes}}'
	}).then(function(data) {
		var wikitext = data.expandtemplates.wikitext;
		var dict = wikitext.split(';!;!;');
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

$(function() {
	if (!$('.mw-special-Movepage').length) return;
	var title = mw.config.get('wgTitle').replace('MovePage/', '');
	return new mw.Api().get({
		action : 'query',
		prop:'info',
		titles:'Data:' + title
	}).then(function(data) {
		if (data.query.pages["-1"] !== undefined) return;
		var el = document.createElement('div');
		var url = mw.config.get('wgServer') + '/Data:' + title;
		$(el).html('Warning! A <a href="' + url + '">Data page</a> exists for this page!');
		$(el).addClass('important-notice');
		$(el).insertAfter(document.getElementById('wpReason'));
	});
});

// </nowiki>