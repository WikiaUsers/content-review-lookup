
/* Пошук із виправленням розкладки клавіатури */
(function () {
    'use strict';
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Search') {
    return;
}
    var english = "`qwertyuiop[]asdfghjkl;'zxcvbnm,./";
    var ukrainian = "'йцукенгшщзхїфівапролджєячсмитьбю.";

    function convertLayout(text, from, to) {
        return Array.from(text).map(function (char) {
            var lower = char.toLowerCase();
            var index = from.indexOf(lower);

            if (index === -1) {
                return char;
            }

            var replacement = to.charAt(index);

            return char !== lower
                ? replacement.toUpperCase()
                : replacement;
        }).join('');
    }

    function getAlternative(query) {
        var hasLatin = /[a-z]/i.test(query);
        var hasCyrillic = /[а-яіїєґ]/i.test(query);

        if (hasLatin && !hasCyrillic) {
            return convertLayout(query, english, ukrainian);
        }

        if (hasCyrillic && !hasLatin) {
            return convertLayout(query, ukrainian, english);
        }

        return null;
    }

    function init() {
        var params = new URLSearchParams(window.location.search);

        var query = params.get('search') ||
            params.get('query') ||
            '';

        // Підтримка /Special:Search/запит
        if (!query) {
            var match = window.location.pathname.match(
                /(?:Special:Search|Спеціальна:Пошук)\/(.+)$/i
            );

            if (match) {
                try {
                    query = decodeURIComponent(match[1]);
                } catch (e) {
                    return;
                }
            }
        }

        query = query.trim();

        if (!query || query.length > 100) {
            return;
        }

        var alternative = getAlternative(query);

        if (!alternative || alternative === query) {
            return;
        }


        // Порівнюємо результати обох варіантів розкладки.
		var api = new mw.Api();
		
		function search(text) {
		    return api.get({
		        action: 'query',
		        list: 'search',
		        srsearch: text,
		        srnamespace: 0,
		        srlimit: 10
		    }).then(function (data) {
		        return data.query && data.query.search
		            ? data.query.search
		            : [];
		    });
		}
		
		function hasExactTitle(results, text) {
		    var normalized = text.trim().replace(/_/g, ' ').toLocaleLowerCase();
		
		    return results.some(function (result) {
		        return result.title
		            .replace(/_/g, ' ')
		            .toLocaleLowerCase() === normalized;
		    });
		}
		
		$.when(search(query), search(alternative)).done(function (
		    originalResults,
		    alternativeResults
		) {
		    var originalExact = hasExactTitle(originalResults, query);
		    var alternativeExact = hasExactTitle(alternativeResults, alternative);
		
		    if (originalExact) {
		        return;
		    }
		
		    if (!alternativeResults.length) {
		        return;
		    }
		
		    if (!alternativeExact && originalResults.length) {
		        return;
		    }
		
		    if (document.querySelector('.keyboard-layout-suggestion')) {
        return;
    }

            // Шукаємо область результатів пошуку.
            var container = document.querySelector(
                '.mw-search-results, .mw-search-createlink, .searchresults, #mw-content-text'
            );

            if (!container) {
                return;
            }

            var suggestion = document.createElement('div');
            suggestion.className = 'keyboard-layout-suggestion';

            suggestion.style.cssText =
                'padding:12px 16px;' +
                'margin:12px 0;' +
                'border-left:3px solid #8d6b2d;' +
                'background:rgba(141,107,45,0.10);' +
                'font-size:15px;';

            suggestion.appendChild(
                document.createTextNode(
                    'Можливо, ви мали на увазі: '
                )
            );

            var link = document.createElement('a');
            link.textContent = alternative;
            link.href = mw.util.getUrl('Special:Search', {
                search: alternative
            });

            suggestion.appendChild(link);
            suggestion.appendChild(
                document.createTextNode('?')
            );

            container.parentNode.insertBefore(
                suggestion,
                container
            );
		}).fail(function (jqXHR, textStatus, errorThrown) {
		    console.warn(
		        '[KeyboardLayoutSearch] Помилка API:',
		        textStatus,
		        errorThrown
		    );
		});
    }

	$(init);
})();