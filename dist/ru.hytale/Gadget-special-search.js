runAsEarlyAsPossible( function () {
	// Таблица ключевых слов для поиска: привязываем обработчик к ссылке «Ключевые слова»,
	// дооформляем, делаем ключевые слова кликабельными
	( function () {
		var $pseudolinkWrapper = $( '#keywords-popup-pseudolink-wrapper' );
		if ( !$pseudolinkWrapper.length ) return;

		var $popup = $( '#keywords-popup' );
		var popupShownFirstTime = true;

		$pseudolinkWrapper
			.show()
			.find( 'a' )
			.removeAttr( 'title' )
			.click( function ( e ) {
				e.preventDefault();

				// Используем классы [[mw:Extension:Popups]] (работают даже при выключенных
				// всплывающих окнах)
				if ( !$popup.hasClass( 'mwe-popups-fade-in-up' ) ) {
					$popup
						.show()
						.removeClass( 'mwe-popups-fade-out-down' )
						.addClass( 'mwe-popups-fade-in-up' );
					if ( popupShownFirstTime ) {
						// Позиционируем «хвост» попапа
						var $populTailPart1 = $( '#keywords-popup-tail-part1' );
						var $populTailPart2 = $( '#keywords-popup-tail-part2' );
						var popupTailPart1Left = $pseudolinkWrapper.offset().left + ( $pseudolinkWrapper.width() / 2 ) -
							$popup.offset().left - (
								( $populTailPart1.outerWidth() / 2 ) - (
									(
										parseInt( $pseudolinkWrapper.find( 'a' ).css( 'padding-left' ) ) -
										$( '.dropdown-icon' ).outerWidth( true )
									) / 2
								)
							);
						$populTailPart1.css( 'left', popupTailPart1Left + 'px' );
						$populTailPart2.css( 'left', ( popupTailPart1Left - 3 ) + 'px' );
					}
					popupShownFirstTime = false;
				} else {
					$popup
						.removeClass( 'mwe-popups-fade-in-up' )
						.addClass( 'mwe-popups-fade-out-down' );
					setTimeout( function () {
						// Состояние не изменилось: ссылка «Ключевые слова» не была кликнута
						// в середине затухания
						if ( $popup.hasClass( 'mwe-popups-fade-out-down' ) ) {
							$popup.hide();
						}
					}, 150 );
				}
			} );
		$popup.find( 'a' ).attr( 'target', '_blank' );
		$( '#mw-indicator-mw-helplink a' ).text( 'Полная справка' );

		var $searchBox = $( '#searchText input' );
		$( '.keywords-popup-keyword' ).wrap( $( '<a>' )
			.attr( 'href', 'javascript:;' )
			.attr( 'title', 'Вставить ключевое слово в поле поиска' )
			.click( function( e ) {
				e.preventDefault();
				$searchBox.val( $searchBox.val() + $( this ).find( '.keywords-popup-keyword' )
					.data( 'keyword' ).replace( / /g, ' ' ) ).focus();
			} )
		);
	}() );

	// External search engines
	var searchInput = document.querySelector( '#searchText input' );
	var list = {
		'Google': 'https://google.com/search?q=%s+site:ru.wikipedia.org&hl=ru',
		'Яндексе': 'https://yandex.ru/yandsearch?text=%s&site=ru.wikipedia.org',
		'Bing': 'https://www.bing.com/search?q=%s+site:ru.wikipedia.org',
	};
	var listKeys = Object.keys( list );

	var searchEngines = document.createElement( 'p' );
	searchEngines.id = 'searchEngines';
	searchEngines.innerHTML = 'Искать&nbsp;в&nbsp;(';
	searchEngines.style.float = 'right';
	if(!searchInput) return;

	for ( var i in list ) {
		var link = document.createElement( 'a' );
		link.href = list[ i ].replace( '%s', searchInput.value );
		link.textContent = i;
		searchEngines.appendChild( link );

		if ( listKeys.indexOf( i ) < listKeys.length - 1 ) {
			searchEngines.appendChild( document.createTextNode( ' | ' ) );
		}
	}
	searchEngines.appendChild(document.createTextNode( ')' ));

	$( '.searchresults > .mw-search-visualclear:not(.mw-search-interwiki-header)' ).after( searchEngines );
}, $( '#footer' ), mw.hook( 'wikipage.content' ).add );