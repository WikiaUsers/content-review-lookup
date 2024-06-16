// <nowiki>
$(function() {
	$('.catlink-disambiguations').click(function(e) {
		var el = this;
		if (e.pageX <= $(el).offset().left + $(el).innerWidth()) return;
		e.preventDefault();
		var disambigTitle = $(this).attr('title').replace(' (Disambiguation)', '');
		console.log(disambigTitle);
		return new mw.Api().get({
			action: 'parse',
			prop: 'text',
			disablelimitreport: 1,
			disableeditsection: 1,
			text: '{{#invoke:DisambigPopup|main|' + disambigTitle + '}}'
		}).then(function(data) {
			var wikitext = window.processParserOutput(data.parse.text['*']);
			$(el).addClass('catlink-disambiguations-activated');
			$(el).wrap('<span class="disambig-link-wrapper"></span>');
			var newEl = document.createElement('span');
			$(newEl).html($(wikitext).html());
			$(newEl).insertAfter(el);
			
			// tipping over doesn't hook into api parse action it seems
			// so, let's do it ourselves!
			// delete this eventually if this changes
			$(newEl).find('a').each(function() {
				var title = $(this).attr('title').replace(/ /g, '_');
				// we need to escape dashes that were previously in the title
				// but NOT escape dashes that we add
				// so instead of directly (\%\w\w) -> _$1- we'll use #_$1# as an intermediate step
				// then we do the -, (, ) replacements which aren't handled by encodeURIComponent
				// echoes encodeAllSpecial from https://github.com/oOeyes/TippingOver/blob/8f1dd018e57f284cc33db5cd1dbc967d24621fbf/includes/WikiTooltips.php
				var escapedTitle = encodeURIComponent(title)
					.replace(/\%(\w\w)/g, '#_$1#')
					.replace('-', '_2d-')
					.replace('(', '_28-')
					.replace(')', '_29-')
					.replace(/\#(_\w\w)\#/g, '$1-');
				// Tooltip id for Ziv (Chen Yi) looks like: Ziv__28-Chen_Yi_29- 
				$(this).addClass('to_hasTooltip')
					.attr('data-to-id', escapedTitle)
					.attr('data-to-titles', title + '||' + 'Tooltip:' + title)
					.attr('data-to-flags', 'fiem');
				$(this).removeAttr('title');
			});
			// end delete this eventually
			
			mw.hook('wikipage.content').fire($('.popup-button-action, .copy-button'));
			popupButton.bind(newEl)(new MouseEvent('click'));
			window.toWikiTooltips.beginInitialize(); // put tooltips into the pop-up
		});
	});
});

mw.hook('wikipage.content').add(function() {
	$('.popup-disambig .copy-button').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $el = $(this);
		var text = $el.parent().find('a').text();
		var copyEl = document.createElement('textarea');
		copyEl.value = text.replace(/_/g,' ');
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		document.execCommand('copy');
		$el.css('color','green');
		setTimeout(function() {
			$el.css('color','');
		}, 2000);
	});
});
// </nowiki>