$(function () {
	$('.ed-home__quotes').each(function () {
		var $panel = $(this);
		var $quotes = $panel.find('.ed-home__quote-item');

		if (!$quotes.length) {
			return;
		}

		var currentQuote = -1;

		function showQuote(index) {
			var $quote = $quotes.eq(index);
			var quotation = $.trim($quote.text());
			var speaker = $quote.attr('data-speaker') || '';

			$panel.find('.ed-home__quote-text').text(quotation);
			$panel.find('.ed-home__quote-speaker')
				.empty()
				.append(document.createTextNode('— '));

			if (speaker) {
				var article = speaker.replace(/ /g, '_');
				var $link = $('<a>')
					.attr('href', mw.util.getUrl(article))
					.text(speaker);

				$panel.find('.ed-home__quote-speaker').append($link);
			}

			currentQuote = index;
		}

		function showRandomQuote() {
			var nextQuote;

			if ($quotes.length === 1) {
				nextQuote = 0;
			} else {
				do {
					nextQuote = Math.floor(Math.random() * $quotes.length);
				} while (nextQuote === currentQuote);
			}

			showQuote(nextQuote);
		}

		$panel.find('.ed-home__quote-refresh')
			.on('click', showRandomQuote)
			.on('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					showRandomQuote();
				}
			});

		showRandomQuote();
	});
});