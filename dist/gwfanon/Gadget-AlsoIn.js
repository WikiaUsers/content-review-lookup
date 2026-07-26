/**
 * Rozdzielanie kategorii nagłówkowych:
 *
 * w: zwykłe kategorie
 * także w: kategorie wskazane w module Lua
 *
 * Skrypt działa wyłącznie:
 * - w przestrzeni nazw 0,
 * - w przestrzeni nazw 114,
 * - gdy strona należy łącznie do więcej niż 4 kategorii.
 */
(function ($, mw) {
	'use strict';

	/**
	 * Nazwa modułu Lua bez prefiksu „Moduł:”.
	 */
	var LUA_MODULE_NAME = 'Kategorie także w';

	/**
	 * Przestrzenie nazw, w których działa skrypt.
	 */
	var ALLOWED_NAMESPACES = [0, 114];

	/**
	 * Minimalna liczba kategorii potrzebna do rozdzielenia.
	 *
	 * 5 oznacza: rozdzielaj tylko wtedy,
	 * gdy kategorii jest więcej niż 4.
	 */
	var MINIMUM_CATEGORY_COUNT = 5;

	/**
	 * Pamięć podręczna zapytania do Lua i API.
	 */
	var alsoInCategoriesPromise = null;

	/**
	 * Normalizuje nazwę kategorii do porównania.
	 */
	function normalizeCategoryName(value) {
		return String(value || '')
			.replace(/^(?:Kategoria|Category)\s*:\s*/i, '')
			.replace(/_/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.toLocaleLowerCase('pl-PL');
	}

	/**
	 * Dodaje prefiks „Kategoria:”, jeśli go nie podano.
	 */
	function makeCategoryTitle(categoryName) {
		var name = String(categoryName || '')
			.replace(/_/g, ' ')
			.trim();

		if (!/^(?:Kategoria|Category)\s*:/i.test(name)) {
			name = 'Kategoria:' + name;
		}

		return name;
	}

	/**
	 * Pobiera nazwę kategorii z linku.
	 */
	function getCategoryName(link) {
		return normalizeCategoryName(
			link.getAttribute('title') ||
			link.textContent ||
			''
		);
	}

	/**
	 * Zwraca pustą konfigurację.
	 */
	function emptyConfiguration() {
		return {
			categories: [],
			sourceCategories: []
		};
	}

	/**
	 * Pobiera konfigurację z modułu Lua.
	 *
	 * Moduł powinien zwracać JSON:
	 *
	 * {
	 *     "categories": [
	 *         "Mężczyźni"
	 *     ],
	 *     "sourceCategories": [
	 *         "Kategorie fanonów",
	 *         "Kategorie chronologii",
	 *         "Twórczość według autorów"
	 *     ]
	 * }
	 */
	function loadConfiguration(api) {
		return api.get({
			action: 'expandtemplates',
			text:
				'{{#invoke:' +
				LUA_MODULE_NAME +
				'|json}}',
			prop: 'wikitext',
			formatversion: 2
		}).then(
			function (data) {
				var rawConfiguration = '{}';

				if (
					data &&
					data.expandtemplates &&
					typeof data.expandtemplates.wikitext === 'string'
				) {
					rawConfiguration =
						data.expandtemplates.wikitext.trim();
				}

				try {
					var configuration =
						JSON.parse(rawConfiguration);

					return {
						categories:
							Array.isArray(configuration.categories)
								? configuration.categories
								: [],

						sourceCategories:
							Array.isArray(
								configuration.sourceCategories
							)
								? configuration.sourceCategories
								: []
					};
				} catch (error) {
					console.error(
						'Nie udało się odczytać JSON-u z modułu „' +
							LUA_MODULE_NAME +
							'”.',
						error,
						rawConfiguration
					);

					return emptyConfiguration();
				}
			},
			function (error) {
				console.error(
					'Nie udało się wywołać modułu „' +
						LUA_MODULE_NAME +
						'”.',
					error
				);

				return emptyConfiguration();
			}
		);
	}

	/**
	 * Pobiera wszystkie bezpośrednie podkategorie
	 * jednej kategorii źródłowej.
	 *
	 * Obsługuje kontynuację API.
	 */
	function loadSubcategories(
		api,
		sourceCategory,
		cmcontinue,
		collected
	) {
		collected = collected || [];

		var parameters = {
			action: 'query',
			list: 'categorymembers',
			cmtitle: makeCategoryTitle(sourceCategory),
			cmtype: 'subcat',
			cmprop: 'title',
			cmlimit: 'max',
			formatversion: 2
		};

		if (cmcontinue) {
			parameters.cmcontinue = cmcontinue;
		}

		return api.get(parameters).then(
			function (data) {
				var members = [];

				if (
					data &&
					data.query &&
					Array.isArray(data.query.categorymembers)
				) {
					members = data.query.categorymembers;
				}

				members.forEach(function (member) {
					if (member && member.title) {
						collected.push(member.title);
					}
				});

				if (
					data &&
					data.continue &&
					data.continue.cmcontinue
				) {
					return loadSubcategories(
						api,
						sourceCategory,
						data.continue.cmcontinue,
						collected
					);
				}

				return collected;
			},
			function (error) {
				console.error(
					'Nie udało się pobrać podkategorii kategorii „' +
						sourceCategory +
						'”.',
					error
				);

				return collected;
			}
		);
	}

	/**
	 * Dodaje tablicę nazw kategorii do zbioru.
	 */
	function addCategoriesToSet(categorySet, categoryNames) {
		if (!Array.isArray(categoryNames)) {
			return;
		}

		categoryNames.forEach(function (categoryName) {
			var normalizedName =
				normalizeCategoryName(categoryName);

			if (normalizedName) {
				categorySet.add(normalizedName);
			}
		});
	}

	/**
	 * Pobiera kompletny zbiór kategorii
	 * przeznaczonych do wiersza „także w:”.
	 *
	 * Zbiór obejmuje:
	 * - categories z Lua,
	 * - bezpośrednie podkategorie sourceCategories z Lua.
	 */
	function loadAlsoInCategories() {
		if (alsoInCategoriesPromise) {
			return alsoInCategoriesPromise;
		}

		alsoInCategoriesPromise =
			mw.loader.using('mediawiki.api').then(
				function () {
					var api = new mw.Api();

					return loadConfiguration(api).then(
						function (configuration) {
							var result = new Set();

							/**
							 * Kategorie wpisane bezpośrednio
							 * w tablicy categories.
							 */
							addCategoriesToSet(
								result,
								configuration.categories
							);

							/**
							 * Kategorie źródłowe są przetwarzane
							 * kolejno dla zgodności z Fandomem.
							 */
							var sequence =
								$.Deferred()
									.resolve()
									.promise();

							configuration.sourceCategories.forEach(
								function (sourceCategory) {
									sequence = sequence.then(
										function () {
											return loadSubcategories(
												api,
												sourceCategory
											).then(
												function (
													subcategories
												) {
													addCategoriesToSet(
														result,
														subcategories
													);
												},
												function (error) {
													console.error(
														'Błąd podczas pobierania kategorii źródłowej „' +
															sourceCategory +
															'”.',
														error
													);
												}
											);
										}
									);
								}
							);

							return sequence.then(function () {
								return result;
							});
						},
						function (error) {
							console.error(
								'Nie udało się odczytać konfiguracji kategorii.',
								error
							);

							return new Set();
						}
					);
				},
				function (error) {
					console.error(
						'Nie udało się załadować mediawiki.api.',
						error
					);

					return new Set();
				}
			);

		return alsoInCategoriesPromise;
	}

	/**
	 * Buduje pojedynczy wiersz kategorii.
	 *
	 * Do czterech kategorii pokazuje wszystkie.
	 * Przy większej liczbie pokazuje trzy pierwsze
	 * i rozwijane „X więcej…”.
	 */
	function buildNewCategoryLine(
		$node,
		categories,
		prefix
	) {
		if (!categories.length) {
			return;
		}

		$node.append(
			$('<span>', {
				class: 'page-header__categories-in',
				text: prefix + ' '
			})
		);

		if (categories.length <= 4) {
			for (var i = 0; i < categories.length; i++) {
				if (i > 0) {
					$node.append(', ');
				}

				$node.append(categories[i]);
			}

			return;
		}

		/**
		 * Pokazuje pierwsze trzy kategorie.
		 */
		for (var j = 0; j < 3; j++) {
			if (j > 0) {
				$node.append(', ');
			}

			$node.append(categories[j]);
		}

		var remaining = categories.length - 3;

		var $dropdown = $(
			'<div class="wds-dropdown ' +
				'page-header__categories-dropdown">' +

				'<span>&nbsp;i&nbsp;</span>' +

				'<a class="wds-dropdown__toggle" ' +
					'data-tracking="categories-more">' +
					remaining + ' więcej…' +
				'</a>' +

				'<div class="wds-dropdown__content ' +
					'page-header__categories-dropdown-content ' +
					'wds-is-left-aligned">' +

					'<ul class="wds-list wds-is-linked"></ul>' +
				'</div>' +
			'</div>'
		);

		var $list = $dropdown.find('ul');

		for (var k = 3; k < categories.length; k++) {
			$list.append(
				$('<li>').append(categories[k])
			);
		}

		$node.append($dropdown);
	}

	/**
	 * Wyszukuje linki kategorii wygenerowane
	 * w nagłówku przez Fandom.
	 */
	function findCategoryLinks(header) {
		var links = header.querySelectorAll(
			'[data-tracking-label^="categories-top-more"]'
		);

		/**
		 * Selektor zapasowy na wypadek zmian
		 * po stronie Fandomu.
		 */
		if (!links.length) {
			links = header.querySelectorAll(
				'a[title^="Kategoria:"], ' +
				'a[title^="Category:"]'
			);
		}

		return links;
	}

	/**
	 * Zmienia etykietę „in:” na „w:”
	 * bez przebudowywania nagłówka.
	 */
	function changePrefixToPolish($header) {
		$header
			.find('.page-header__categories-in')
			.first()
			.text('w: ');
	}

	/**
	 * Główna funkcja rozdzielająca kategorie.
	 */
	function rearrangeFanonpediaCategories() {
		var namespaceNumber =
			Number(mw.config.get('wgNamespaceNumber'));

		/**
		 * Skrypt nie robi niczego poza
		 * przestrzeniami nazw 0 i 114.
		 */
		if (
			ALLOWED_NAMESPACES.indexOf(
				namespaceNumber
			) === -1
		) {
			return;
		}

		var $header =
			$('.page-header__categories').first();

		if (!$header.length) {
			return;
		}

		/**
		 * Zabezpieczenie przed ponownym wykonaniem.
		 */
		if (
			$header.attr('data-takze-w-ready') === 'true' ||
			$header.attr('data-takze-w-loading') === 'true'
		) {
			return;
		}

		var links = findCategoryLinks($header[0]);

		if (!links.length) {
			return;
		}

		/**
		 * Przy maksymalnie czterech kategoriach:
		 * - nie dzielimy nagłówka,
		 * - zmieniamy jedynie „in:” na „w:”.
		 */
		if (links.length < MINIMUM_CATEGORY_COUNT) {
			changePrefixToPolish($header);

			$header.attr(
				'data-takze-w-ready',
				'true'
			);

			return;
		}

		/**
		 * Dopiero od pięciu kategorii pobieramy
		 * konfigurację z Lua.
		 */
		$header.attr(
			'data-takze-w-loading',
			'true'
		);

		loadAlsoInCategories().then(
			function (alsoInCategoryNames) {
				var mainCategories = [];
				var alsoCategories = [];

				for (var i = 0; i < links.length; i++) {
					var categoryName =
						getCategoryName(links[i]);

					if (
						alsoInCategoryNames.has(
							categoryName
						)
					) {
						alsoCategories.push(links[i]);
					} else {
						mainCategories.push(links[i]);
					}
				}

				/**
				 * Gdy żadna kategoria nie należy
				 * do „także w:”, zachowujemy jeden wiersz.
				 */
				if (!alsoCategories.length) {
					$header
						.removeAttr(
							'data-takze-w-loading'
						)
						.attr(
							'data-takze-w-ready',
							'true'
						);

					changePrefixToPolish($header);

					return;
				}

				/**
				 * Usuwa pierwotny nagłówek
				 * i buduje dwa nowe wiersze.
				 */
				$header
					.empty()
					.removeAttr(
						'data-takze-w-loading'
					)
					.attr(
						'data-takze-w-ready',
						'true'
					);

				if (mainCategories.length) {
					var $mainLine = $('<div>', {
						id: 'main-category-header'
					});

					buildNewCategoryLine(
						$mainLine,
						mainCategories,
						'w:'
					);

					$header.append($mainLine);
				}

				if (alsoCategories.length) {
					var $alsoLine = $('<div>', {
						id: 'also-category-header'
					});

					buildNewCategoryLine(
						$alsoLine,
						alsoCategories,
						'także w:'
					);

					$header.append($alsoLine);
				}
			},
			function (error) {
				console.error(
					'Nie udało się przebudować kategorii.',
					error
				);

				/**
				 * Przy błędzie zostawiamy pierwotny
				 * układ i zmieniamy tylko etykietę.
				 */
				$header
					.removeAttr(
						'data-takze-w-loading'
					)
					.attr(
						'data-takze-w-ready',
						'true'
					);

				changePrefixToPolish($header);
			}
		);
	}

	/**
	 * Zwykłe załadowanie strony.
	 */
	$(rearrangeFanonpediaCategories);

	/**
	 * Treści ładowane dynamicznie.
	 */
	mw.hook('wikipage.content').add(
		rearrangeFanonpediaCategories
	);

}(jQuery, mediaWiki));