(function ($, mw) {
	'use strict';

	var SVG_NS = 'http://www.w3.org/2000/svg';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';

	/**
	 * Tworzy ikonę SVG używaną przez Fandom
	 * w dolnym panelu kategorii.
	 */
	function utworzStrzalke() {
		var svg = document.createElementNS(SVG_NS, 'svg');
		var use = document.createElementNS(SVG_NS, 'use');

		svg.setAttribute(
			'class',
			'wds-icon wds-icon-small dolna-sekcja__strzałka'
		);

		svg.setAttribute('aria-hidden', 'true');
		svg.setAttribute('focusable', 'false');

		/*
		 * href — nowsze przeglądarki;
		 * xlink:href — zgodność ze starszym sposobem
		 * używanym przez część kodu Fandomu.
		 */
		use.setAttribute(
			'href',
			'#wds-icons-menu-control-small'
		);

		use.setAttributeNS(
			XLINK_NS,
			'xlink:href',
			'#wds-icons-menu-control-small'
		);

		svg.appendChild(use);

		return svg;
	}

	/**
	 * Aktualizuje opisy dostępności po rozwinięciu
	 * albo zwinięciu sekcji.
	 */
	function aktualizujStan(sekcja, naglowek) {
		var jestZwinieta = sekcja.classList.contains(
			'mw-collapsed'
		);

		naglowek.setAttribute(
			'aria-expanded',
			jestZwinieta ? 'false' : 'true'
		);

		naglowek.setAttribute(
			'title',
			jestZwinieta
				? 'Rozwiń sekcję'
				: 'Zwiń sekcję'
		);
	}

	/**
	 * Inicjalizuje pojedynczą rozwijaną sekcję.
	 */
	function inicjalizujSekcje(sekcja) {
		var naglowek = sekcja.querySelector(
			'.dolna-sekcja__nagłówek'
		);

		var miejsceNaIkone = sekcja.querySelector(
			'.dolna-sekcja__przełącznik'
		);

		if (!naglowek || !miejsceNaIkone) {
			return;
		}

		/*
		 * Zabezpieczenie przed wielokrotnym uruchomieniem
		 * skryptu dla tej samej sekcji.
		 */
		if (sekcja.getAttribute('data-dolna-sekcja-js') === 'tak') {
			aktualizujStan(sekcja, naglowek);
			return;
		}

		sekcja.setAttribute(
			'data-dolna-sekcja-js',
			'tak'
		);

		/*
		 * Dodajemy strzałkę tylko wtedy,
		 * gdy nie została już wcześniej dodana.
		 */
		if (
			!miejsceNaIkone.querySelector(
				'.dolna-sekcja__strzałka'
			)
		) {
			miejsceNaIkone.appendChild(
				utworzStrzalke()
			);
		}

		naglowek.setAttribute('role', 'button');

		if (!naglowek.hasAttribute('tabindex')) {
			naglowek.setAttribute('tabindex', '0');
		}

		aktualizujStan(sekcja, naglowek);

		/*
		 * Obsługa klawiatury.
		 *
		 * Kliknięcie myszą jest obsługiwane przez mechanizm
		 * mw-customtoggle MediaWiki. Naciśnięcie Entera albo
		 * spacji wywołuje takie samo kliknięcie.
		 */
		naglowek.addEventListener(
			'keydown',
			function (event) {
				var klawisz = event.key || event.keyCode;

				if (
					klawisz === 'Enter' ||
					klawisz === ' ' ||
					klawisz === 13 ||
					klawisz === 32
				) {
					event.preventDefault();
					naglowek.click();
				}
			}
		);

		/*
		 * MediaWiki zmienia klasę mw-collapsed po kliknięciu.
		 * Observer aktualizuje aria-expanded oraz podpowiedź.
		 */
		if (window.MutationObserver) {
			var observer = new MutationObserver(
				function (mutacje) {
					var zmienionoKlase = false;

					$.each(
						mutacje,
						function (_, mutacja) {
							if (
								mutacja.type === 'attributes' &&
								mutacja.attributeName === 'class'
							) {
								zmienionoKlase = true;
							}
						}
					);

					if (zmienionoKlase) {
						aktualizujStan(
							sekcja,
							naglowek
						);
					}
				}
			);

			observer.observe(
				sekcja,
				{
					attributes: true,
					attributeFilter: ['class']
				}
			);
		} else {
			/*
			 * Awaryjnie dla przeglądarek bez MutationObserver.
			 */
			naglowek.addEventListener(
				'click',
				function () {
					window.setTimeout(
						function () {
							aktualizujStan(
								sekcja,
								naglowek
							);
						},
						0
					);
				}
			);
		}
	}

	/**
	 * Wyszukuje rozwijane sekcje w aktualnie
	 * wyrenderowanej zawartości strony.
	 */
	function inicjalizujWszystkie($content) {
		var $sekcje = $content.find('.dolna-sekcja');

		if ($content.is('.dolna-sekcja')) {
			$sekcje = $sekcje.add($content);
		}

		$sekcje.each(function () {
			inicjalizujSekcje(this);
		});
	}

	/*
	 * Hook działa zarówno przy zwykłym otwarciu strony,
	 * jak i przy dynamicznie doładowanej treści.
	 */
	mw.hook('wikipage.content').add(
		inicjalizujWszystkie
	);

}(jQuery, mediaWiki));