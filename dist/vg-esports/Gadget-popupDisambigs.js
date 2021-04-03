// <nowiki>
$(function() {
	$('.catlink-disambiguations').each(function() {
		var el = this;
		$(this).click(function(e) {
			if (e.pageX > $(el).offset().left + $(el).outerWidth()) {
				e.preventDefault();
				return new mw.Api().get({
					action: 'parse',
					prop: 'text',
					disablelimitreport: 1,
					disableeditsection: 1,
					text: '{{#invoke:DisambigPopup|main|' + $(this).html() + '}}'
				}).then(function(data) {
					var wikitext = data.parse.text['*'];
					$(el).addClass('catlink-disambiguations-activated');
					$(el).wrap('<span class="disambig-link-wrapper"></span>');
					var newEl = document.createElement('span');
					$(newEl).html($(wikitext).html());
					$(newEl).insertAfter(el);
					mw.hook('wikipage.content').fire($('.popup-button-action, .copy-button'));
					popupButton.bind(newEl)(new MouseEvent('click'));
				});
			}
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