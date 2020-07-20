//__NOWYSIWYG__ <source lang="javascript">
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, 
 bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, 
 unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
if (wgNamespaceNumber === -1) {
	(function (module, $, window) {

		'use strict';

		var translations = {
			ca: {
				question: 'No trobes el que estàs buscant? Intenta-ho amb: '
			},
			en: {
				question: 'Not what you were looking for? Try: '
			},
			es: {
				question: '¿No encuentras lo que estás buscando? Prueba con: '
			},
			de: {
				question: 'Nicht wonach Du gesucht hast? Versuche: '
			},
			hu: {
				question: 'Nem ezt kerested? Nézd meg ezek valamelyikét: '
			},
			it: {
				question: 'Non è quello che cercavi? Prova: '
			},
			pl: {
				question: 'Nie tego szukałeś? Zobacz: '
			},
			nl: {
				question: 'Geen resultaten? Zoek in plaats daarvan naar: '
			},
			ru: {
				question: 'Нет того, что вы искали? Просмотрите это: '
			}
		};

		var MAX_RESULTS = module.maxResults || 10;

		if (!module.loaded && window.wikiaPageType === 'search') {
			module.loaded = true;

			var searchBox = $('.SearchInput'),
				input = $('#search-v2-input'),
				i18n = translations[
					module.lang || mw.config.get('wgContentLanguage')
				] || translations.en;

			$.getJSON('/api.php?action=opensearch&search=' + encodeURIComponent(input.val()))
				.done(function (data) {
					if ($.isArray(data[1]) && data[1].length) {
						var terms = data[1].slice(0, MAX_RESULTS),
							sanitize = mw.html.escape;
						for (var i = 0; i < terms.length; i++) {
							terms[i] = '<a href="/wiki/' +
								encodeURIComponent(terms[i]) + '">' +
								sanitize(terms[i]) +
								'</a>';
						}
						searchBox.append(
							'<p id="suggestions" style="font-size: 80%; font-weight: normal; margin: 10px 40px 0 160px;">' +
							i18n.question + terms.join(', ') +
							'</p>');
					}
				});
		}

	}((window.dev = window.dev || {}).searchSuggest = window.dev.searchSuggest || {}, jQuery, window));
	//</source>
}