/* =========================================================
 * CZAS CZYTANIA
 *
 * PEŁNY:
 * {{Czas czytania}}
 * {{Czas czytania|Strona=Nazwa strony}}
 * {{Czas czytania|Czas=12}}
 *
 * KRÓTKI:
 * {{Czas czytania/krótko}}
 * {{Czas czytania/krótko|Strona=Nazwa strony}}
 * {{Czas czytania/krótko|Czas=12}}
 *
 * Można również bezpośrednio:
 * {{Czas czytania|Krótko=tak}}
 *
 * Metoda:
 * 1 APW (Average Polish Word) = 6 znaków
 * średnia prędkość = 176 APW/min
 * ========================================================= */

(function () {
	'use strict';

	var CHARACTERS_PER_APW = 6;
	var APW_PER_MINUTE = 176;

	/*
	 * Cache stron pobieranych przez API.
	 * Ta sama strona jest pobierana tylko raz.
	 */
	var pageCache = {};


	/* =====================================================
	 * CZYSZCZENIE TREŚCI
	 * ===================================================== */

	function prepareContent($content) {
		var $clone = $content.clone();

		$clone.find([
			/* nasze własne szablony czasu czytania */
			'.fanon-reading-time',

			/* infoboksy i tabele */
			'table',
			'.infobox',
			'.portable-infobox',

			/* spis treści */
			'.toc',
			'#toc',

			/* nawigacja */
			'.navbox',
			'.vertical-navbox',

			/* komunikaty i metadane */
			'.metadata',
			'.ambox',
			'.mbox-small',
			'.hatnote',

			/* grafiki i galerie */
			'figure',
			'.thumb',
			'.gallery',
			'.mw-gallery-traditional',

			/* przypisy */
			'.mw-references-wrap',
			'.references',
			'.reference',
			'sup.reference',

			/* elementy techniczne */
			'.mw-editsection',
			'.noprint',

			'script',
			'style',
			'noscript'
		].join(',')).remove();

		return $clone;
	}


	/* =====================================================
	 * LICZENIE CZASU
	 * ===================================================== */

	function getReadingStats($content) {
		var $clone = prepareContent($content);

		var text = $clone
			.text()
			.replace(/\s+/g, ' ')
			.trim();

		if (!text) {
			return null;
		}

		/*
		 * Liczymy litery i cyfry.
		 *
		 * Zakres obejmuje:
		 * - alfabet ASCII,
		 * - polskie znaki,
		 * - większość rozszerzonych znaków łacińskich.
		 *
		 * Nie liczymy spacji ani interpunkcji.
		 */
		var characters = text.match(
			/[0-9A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02AF\u1E00-\u1EFF]/g
		);

		var characterCount = characters
			? characters.length
			: 0;

		if (!characterCount) {
			return null;
		}

		var apw =
			characterCount / CHARACTERS_PER_APW;

		var rawMinutes =
			apw / APW_PER_MINUTE;

		return {
			characters: characterCount,
			apw: apw,
			rawMinutes: rawMinutes
		};
	}


	/* =====================================================
	 * ZAOKRĄGLANIE
	 * ===================================================== */

	function roundedMinutes(rawMinutes) {
		return Math.max(
			1,
			Math.round(rawMinutes)
		);
	}


	/* =====================================================
	 * FORMAT PEŁNY
	 * ===================================================== */

	function formatFull(rawMinutes) {
		if (rawMinutes < 1) {
			return 'Mniej niż minuta czytania';
		}

		var minutes = roundedMinutes(rawMinutes);

		if (minutes === 1) {
			return 'Około minuty czytania';
		}

		if (minutes < 60) {
			return (
				'Około ' +
				minutes +
				' minut czytania'
			);
		}

		var hours = Math.floor(minutes / 60);
		var remainingMinutes = minutes % 60;

		/*
		 * Dokładna godzina.
		 */
		if (remainingMinutes === 0) {
			if (hours === 1) {
				return 'Około godziny czytania';
			}

			return (
				'Około ' +
				hours +
				' godzin czytania'
			);
		}

		/*
		 * Godziny + minuty.
		 */
		var hourPart;

		if (hours === 1) {
			hourPart = '1 godziny';
		} else {
			hourPart = hours + ' godzin';
		}

		var minutePart;

		if (remainingMinutes === 1) {
			minutePart = '1 minuty';
		} else {
			minutePart =
				remainingMinutes + ' minut';
		}

		return (
			'Około ' +
			hourPart +
			' i ' +
			minutePart +
			' czytania'
		);
	}


	/* =====================================================
	 * FORMAT KRÓTKI
	 * ===================================================== */

	function formatShort(rawMinutes) {
		if (rawMinutes < 1) {
			return '<1 min';
		}

		var minutes = roundedMinutes(rawMinutes);

		if (minutes < 60) {
			return minutes + ' min';
		}

		var hours = Math.floor(minutes / 60);
		var remainingMinutes = minutes % 60;

		if (remainingMinutes === 0) {
			return hours + ' h';
		}

		return (
			hours +
			' h ' +
			remainingMinutes +
			' min'
		);
	}


	/* =====================================================
	 * CZY UŻYĆ FORMATU KRÓTKIEGO?
	 * ===================================================== */

	function isShortFormat($element) {
		var value = $element
			.find('.fanon-reading-time-short')
			.first()
			.text()
			.trim()
			.toLowerCase();

		if (!value) {
			return false;
		}

		/*
		 * Pozwala używać np.
		 * |Krótko=tak
		 * |Krótko=1
		 * |Krótko=yes
		 *
		 * A te wartości wyłączają format krótki.
		 */
		if (
			value === '0' ||
			value === 'nie' ||
			value === 'no' ||
			value === 'false'
		) {
			return false;
		}

		return true;
	}


	/* =====================================================
	 * FORMATOWANIE WYNIKU
	 * ===================================================== */

	function getFormattedTime(
		$element,
		rawMinutes
	) {
		if (isShortFormat($element)) {
			return formatShort(rawMinutes);
		}

		return '⏱ ' + formatFull(rawMinutes);
	}


	/* =====================================================
	 * WYŚWIETLANIE
	 * ===================================================== */

	function displayStats($element, stats) {
		if (!stats) {
			displayError($element);
			return;
		}

		$element
			.find('.fanon-reading-time-value')
			.text(
				getFormattedTime(
					$element,
					stats.rawMinutes
				)
			);

		/*
		 * Informacja diagnostyczna po
		 * najechaniu kursorem.
		 */
		$element.attr(
			'title',
			'Około ' +
			Math.round(stats.apw)
				.toLocaleString('pl-PL') +
			' APW (' +
			stats.characters
				.toLocaleString('pl-PL') +
			' znaków tekstu); ' +
			APW_PER_MINUTE +
			' APW/min'
		);
	}


	function displayManualTime(
		$element,
		minutes
	) {
		$element
			.find('.fanon-reading-time-value')
			.text(
				getFormattedTime(
					$element,
					minutes
				)
			);

		$element.attr(
			'title',
			'Czas podany ręcznie'
		);
	}


	function displayError($element) {
		var message;

		if (isShortFormat($element)) {
			message = '—';
		} else {
			message = '⏱ brak danych';
		}

		$element
			.find('.fanon-reading-time-value')
			.text(message);

		$element.attr(
			'title',
			'Nie udało się obliczyć czasu czytania'
		);
	}


	/* =====================================================
	 * ZNAJDOWANIE TREŚCI BIEŻĄCEJ STRONY
	 * ===================================================== */

	function findCurrentContent($root) {
		var $content;

		if (
			$root &&
			$root.length &&
			$root.is('.mw-parser-output')
		) {
			return $root.first();
		}

		if ($root && $root.length) {
			$content = $root
				.find('.mw-parser-output')
				.first();

			if ($content.length) {
				return $content;
			}
		}

		return $('.mw-parser-output').first();
	}


	/* =====================================================
	 * BIEŻĄCA STRONA
	 * ===================================================== */

	function calculateCurrentPage(
		$element,
		$root
	) {
		var $content =
			findCurrentContent($root);

		if (!$content.length) {
			displayError($element);
			return;
		}

		var stats =
			getReadingStats($content);

		displayStats(
			$element,
			stats
		);
	}


	/* =====================================================
	 * POBIERANIE INNEJ STRONY
	 * ===================================================== */

	function getOtherPageStats(pageName) {
		pageName = pageName.trim();

		if (pageCache[pageName]) {
			return pageCache[pageName];
		}

		/*
		 * mediawiki.api ładujemy dopiero,
		 * gdy naprawdę jest potrzebne.
		 */
		pageCache[pageName] = mw.loader
			.using('mediawiki.api')
			.then(function () {
				var api = new mw.Api();

				return api.get({
					action: 'parse',
					page: pageName,
					prop: 'text',
					formatversion: 2
				});
			})
			.then(function (data) {
				if (
					!data ||
					!data.parse ||
					!data.parse.text
				) {
					return null;
				}

				var $content = $('<div>')
					.html(data.parse.text);

				return getReadingStats(
					$content
				);
			});

		return pageCache[pageName];
	}


	function calculateOtherPage(
		$element,
		pageName
	) {
		getOtherPageStats(pageName).then(
			function (stats) {
				displayStats(
					$element,
					stats
				);
			},
			function () {
				displayError($element);
			}
		);
	}


	/* =====================================================
	 * INICJALIZACJA
	 * ===================================================== */

	function initializeReadingTimes($content) {
		var $elements;

		if (
			!$content ||
			!$content.length
		) {
			$content = $(document);
		}

		if (
			$content.is('.fanon-reading-time')
		) {
			$elements = $content;
		} else {
			$elements = $content.find(
				'.fanon-reading-time'
			);
		}

		$elements.each(function () {
			var $element = $(this);

			/*
			 * Nie liczymy dwa razy tego samego
			 * egzemplarza szablonu.
			 */
			if (
				$element.data(
					'fanon-reading-time-loaded'
				)
			) {
				return;
			}

			$element.data(
				'fanon-reading-time-loaded',
				true
			);


			/*
			 * |Czas=
			 */
			var manual = $element
				.find(
					'.fanon-reading-time-manual'
				)
				.first()
				.text()
				.trim();


			/*
			 * |Strona=
			 */
			var pageName = $element
				.find(
					'.fanon-reading-time-page'
				)
				.first()
				.text()
				.trim();


			/* ---------------------------------
			 * 1. Wartość ręczna
			 * --------------------------------- */

			if (manual) {
				var manualMinutes =
					parseFloat(
						manual.replace(
							',',
							'.'
						)
					);

				if (
					isFinite(manualMinutes) &&
					manualMinutes >= 0
				) {
					displayManualTime(
						$element,
						manualMinutes
					);

					return;
				}
			}


			/* ---------------------------------
			 * 2. Inna strona
			 * --------------------------------- */

			if (pageName) {
				calculateOtherPage(
					$element,
					pageName
				);

				return;
			}


			/* ---------------------------------
			 * 3. Bieżąca strona
			 * --------------------------------- */

			calculateCurrentPage(
				$element,
				$content
			);
		});
	}


	/* =====================================================
	 * START
	 * ===================================================== */

	mw.hook('wikipage.content')
		.add(initializeReadingTimes);


	/*
	 * Fallback dla Fandomu / nietypowej
	 * kolejności ładowania strony.
	 */
	$(function () {
		initializeReadingTimes(
			$('#mw-content-text')
		);
	});

}());