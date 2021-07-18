(function (module, $, window) {
    'use strict';
    if (
        module.loaded ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Search'
    ) {
        return;
    }
    module.loaded = true;
    var api;
    var lastSearch = 0;
    var timeout;
    var MIN_ELAPSED_TIME = 200;

	function searchResults(query) {
		var $dropdown = $('#article-search-dropdown'),
			$list = $dropdown.find('.wds-list'),
			$box = $('.unified-search__input__query');

		lastSearch = Date.now();
		
		$.get(mw.util.wikiScript('wikia'), {
		    controller: 'UnifiedSearchSuggestionsController',
		    method: 'getSuggestions',
		    format: 'json',
		    query: query
	    }, function(data) {
			var suggestions = data.suggestions;
			$list.empty();
			
			for (var index in suggestions) {
				$list.append(
					$('<li>').append(
						$('<a>', {
						    href: mw.util.getUrl(suggestions[index]),
							text: suggestions[index]
						})
					)
				);
			}
			
			if (suggestions.length) {
				$dropdown.addClass('wds-is-active');
			} else {
				$dropdown.removeClass('wds-is-active');
			}
		});
	}

    function init() {
        api = new mw.Api();
        var $box = $('.unified-search__input__query');
        $('.unified-search__input__query').wrap($('<div>', {
			id: 'article-search-dropdown',
			'class': 'wds-dropdown wds-has-dark-shadow wds-no-chevron wds-is-not-hoverable',
			css: {
			    width: '100%'
			}
        })).after($('<div>', {
			'class': 'wds-dropdown__content'
		}).append(
			$('<div>', {
				'class': 'wds-list wds-is-linked'
			})
		));
		var $dropdown = $('#article-search-dropdown'),
			$list = $dropdown.find('.wds-list');
		$box.on('input', function() {
			var query = $(this).val(),
				elapsed = Date.now() - lastSearch;

			if (timeout) {
			    clearTimeout(timeout);
			}
			if (elapsed > MIN_ELAPSED_TIME) {
				searchResults(query);
			} else {
				timeout = setTimeout(function() {
					searchResults(query);
				}, MIN_ELAPSED_TIME - elapsed);
			}
		});
		$box.on('blur', function() {
			if (!$box.parent().is(':hover')) {
			    $dropdown.removeClass('wds-is-active');
			}
		});
		$box.on('focus', function() {
			if ($list.children().length) {
			    $dropdown.addClass('wds-is-active');
			}
		});
    }

    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(init);
}((window.dev = window.dev || {}).searchSuggest = window.dev.searchSuggest || {}, jQuery, window));