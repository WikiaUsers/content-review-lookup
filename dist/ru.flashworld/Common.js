/**
 * Код MediaWiki:Common.js безусловно загружается всем пользователям на всех страницах. Во избежание
 * отправки лишних запросов по возможности не используйте здесь mw.loader.using с модулями, которые
 * не загружаются по умолчанию (см.
 * [[Обсуждение MediaWiki:Common.js#Список модулей, загружаемых по умолчанию]]). В таком случае
 * лучше создать скрытый гаджет, загружаемый по умолчанию, и добавить ему нужные модули в качестве
 * зависимостей.
 */

/**
 * Часто те или иные манипуляции со страницей нужно выполнить как можно раньше, но нет гарантии, что
 * к моменту выполнения кода нужный участок DOM готов, а событие полной загрузки страницы происходит
 * слишком поздно. В этой функции проверяется наличие элемента $testElement и в случае успеха
 * функция-колбэк выполняется, иначе же её выполнение поручается другой функции. Если элемент
 * в $testElement имеет содержимое, правильнее указать следующий за ним элемент, чтобы быть
 * уверенным, что он загрузился до конца. Имейте в виду, что разные скины часто используют разные
 * названия классов и идентификаторов.
 */
function runAsEarlyAsPossible( callback, $testElement, func ) {
	func = func || $;
	$testElement = $testElement || $( '#footer' );

	if ( $testElement.length ) {
		callback();
	} else {
		func( callback );
	}
}

/**
 * Настройка обработки «е» и «ё» при сортировке в таблицах
 */
mw.config.set( 'tableSorterCollation', { 'Ё': 'Е', 'ё': 'е' } );

/**
 * Строки. Иноязычный интерфейс предположительно включают весьма редко, поэтому раздувать этот
 * список не стоит. При необходимости добавить много сообщений во много языков можно использовать
 * механизм системных сообщений (= страниц в пространстве MediaWiki, у которых могут быть суффиксы
 * типа /en). См., как их получение реализовано в MediaWiki:Gadget-sidebarRelated.js.
 */
var expandCaption, collapseCaption, zeroSectionTip;
if ( mw.config.get( 'wgUserLanguage' ) === 'en' ) {
	expandCaption = 'show';
	collapseCaption = 'hide';
	zeroSectionTip = 'Edit lead section';
} else {
	expandCaption = 'показать';
	collapseCaption = 'скрыть';
	zeroSectionTip = 'Править преамбулу';
}

/**
 * [[ВП:Сворачиваемые блоки]]
 */
// Число раскрытых по умолчанию навигационных (и не только) шаблонов, если им задан параметр
// autocollapse. Участники могут переопределять это значение в личных JS.
var NavigationBarShowDefault;
if ( typeof NavigationBarShowDefault === 'undefined' ) {
	NavigationBarShowDefault = 1;
}

// table.collapsible
function collapsibleTables( $content ) {
	var $btn,
		$a,
		tblIdx = 0,
		navboxCount = 0,
		notNavboxCount = 0,
		colTables = [],
		$Tables = $content.find( 'table' );

	$Tables.each( function ( i, table ) {
		if ( $( table ).hasClass( 'collapsible' ) ) {
			var $table = $( this ),
				$row = $table.find( 'tr' ).first(),
				$cell = $row.find( 'th' ).first();
			if ( !$cell.length ) {
				return;
			}
			$table.attr( 'id', 'collapsibleTable' + tblIdx );
			$btn = $( '<span>' ).addClass( 'collapseButton' );
			$a = $( '<a>' )
				.attr( 'id', 'collapseButton' + tblIdx )
				.attr( 'href', 'javascript:collapseTable(' + tblIdx + ');' )
				// Изменяем цвет ссылки, только если цвет текста в навбоксе нестандартный
				.css( 'color', $cell.css( 'color' ) === $( '.mw-body' ).css( 'color' ) ? 'auto' :
					$cell.css( 'color' ) )
				.text( collapseCaption );
			$btn
				.append( '[' )
				.append( $a )
				.append( ']' );
			if ( $cell.contents().length ) {
				$btn.insertBefore( $cell.contents().first() );
			} else {
				$btn.appendTo( $cell );
			}
			// hasClass( 'navbox' ) — временное решение для навшаблонов, ещё не переведённых
			// на {{Навигационная таблица}} (также ниже)
			if ( $table.hasClass( 'navbox-inner' ) || $table.hasClass( 'navbox' ) ) {
				navboxCount++;
			} else {
				notNavboxCount++;
			}
			colTables[tblIdx++] = $table;
		}
	} );
	for ( var i = 0; i < tblIdx; i++ ) {
		if ( colTables[i].hasClass( 'collapsed' ) ||
			( colTables[i].hasClass( 'autocollapse' ) &&
				( ( ( colTables[i].hasClass( 'navbox-inner' ) || colTables[i].hasClass( 'navbox' ) ) &&
						navboxCount > NavigationBarShowDefault ) ||
					( !( colTables[i].hasClass( 'navbox-inner' ) || colTables[i].hasClass( 'navbox' ) ) &&
						notNavboxCount > NavigationBarShowDefault ) ) ) )
		{
			collapseTable( i );
		}
	}
}

mw.hook( 'wikipage.content' ).add( collapsibleTables );

function collapseTable( idx ) {
	var $table = $( '#collapsibleTable' + idx ),
		$rows = $table.children().children( 'tr' ),
		$btn = $( '#collapseButton' + idx );
	if ( !$table.length || !$rows.length || !$btn.length ) {
		return false;
	}

	var isExpanded = ( $btn.text() === collapseCaption ),
		cssDisplay = isExpanded ? 'none' : $rows.first().css( 'display' );

	$btn.text( isExpanded ? expandCaption : collapseCaption );
	$rows.slice( 1 ).each( function () {
		$( this ).css( 'display', cssDisplay );
	} );
}

// div.NavFrame
var navFrameExpandCaption = '[' + expandCaption + ']',
	navFrameCollapseCaption = '[' + collapseCaption + ']';

// Изолируем код из глобальной области видимости
( function () {
	function collapsibleDivs( $content ) {
		var navFrameIndex = 0,
			navFrames = [],
			i;

		$content.find( 'div' ).each( function () {
			var $div = $( this );
			if ( $div.hasClass( 'NavFrame' ) ) {
				var $div = $( this );
				var $btn = $( '<a>' )
					.addClass( 'NavToggle' )
					.attr( 'href', 'javascript:' )
					.text( navFrameCollapseCaption )
					.click( navToggleClickHandler );
				$div.children( '.NavHead' ).append( $btn );
				navFrames[ navFrameIndex++ ] = $div;
			}
		} );
		for ( i = 0; i < navFrameIndex; i++ ) {
			if ( navFrames[ i ].hasClass( 'collapsed' ) ||
				( navFrameIndex > NavigationBarShowDefault &&
					!navFrames[ i ].hasClass( 'expanded' )
				)
			) {
				toggleDiv( navFrames[ i ] );
			}
		}
	}

	mw.hook( 'wikipage.content' ).add( collapsibleDivs );

	function navToggleClickHandler() {
		var $btn = $( this );
		toggleDiv( $btn.closest( '.NavFrame' ), $btn );
	}

	function toggleDiv( $div, $btn ) {
		$btn = $btn || $div.find( '.NavToggle' ).first();
		if ( !$div.length || !$btn.length ) return false;
		var isExpanded = ( $btn.text() === navFrameCollapseCaption );
		$btn.text( isExpanded ? navFrameExpandCaption : navFrameCollapseCaption );
		$div.children( '.NavContent, .NavPic' ).each( function () {
			$( this ).css( 'display', isExpanded ? 'none' : 'block' );
		} );
	}

	/**
	 * Загрузка скриптов через систему подгаджетов
	 */
	var namespaceNumber = mw.config.get( 'wgNamespaceNumber' );

	// Скрипты для служебных страниц
	if ( namespaceNumber === -1 ) {
		var specialGadgets = [
			'Abusefilter',
			'Block',
			'Log',
			'Movepage',
			'Newpages',
			'Search',
			'Upload'
		];
		var canonicalSpecialPageName = mw.config.get( 'wgCanonicalSpecialPageName' );
		if ( specialGadgets.indexOf( canonicalSpecialPageName ) > -1 ) {
			mw.loader.load( 'ext.gadget.common-special-' + canonicalSpecialPageName.toLowerCase() );
		}
	} else {
		// Скрипты для действий
		var action = mw.config.get( 'wgAction' );
		var actionGadgets = {
			'edit': [ 'ext.gadget.common-action-edit', 'ext.gadget.wikificator', 'ext.gadget.summaryButtons' ]
		};
		actionGadgets[ 'submit' ] = actionGadgets[ 'edit' ];
		// Удалить после исчезновения ссылки «Редактировать с инструментом переезда на новый парсер» в сайдбаре
		actionGadgets[ 'parsermigration-edit' ] = actionGadgets[ 'edit' ];

		if ( actionGadgets[ action ] ) {
			mw.loader.load( actionGadgets[ action ] );
		}

		// Скрипты для пространств
		var namespaceGadgets = {
			6: [ 'ext.gadget.common-namespace-file' ]
		};

		if ( namespaceGadgets[ namespaceNumber ] ) {
			mw.loader.load( namespaceGadgets[ namespaceNumber ] );
		}
	}
}() );

/**
 * Старые коды
 */
if ( navigator.platform.indexOf( 'Win' ) !== -1 ) {
	mw.loader.using( 'mediawiki.util' ).done( function () {
		mw.util.addCSS( '.IPA, .Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; }' );
	} );
}

/**
 * Дополнительный функционал для заглавной страницы
 */
if ( mw.config.get( 'wgIsMainPage' ) && mw.config.get( 'wgAction' ) === 'view' ) {
	runAsEarlyAsPossible( function () {
		if ( window.scrollY === 0 ) {
			$( '#searchInput' ).focus();
		}
	}, $( '#searchInput' ), mw.hook( 'wikipage.content' ).add );

	mw.hook( 'wikipage.content' ).add( function () {
		mw.loader.using( 'mediawiki.util' ).done( function () {
			var el = mw.util.addPortletLink(
				'p-lang',
				mw.config.get( 'wgArticlePath' ).replace( /\$1/, 'Википедия:Список_Википедий' ),
				'Полный список',
				'interwiki-completelist'
			);
			if ( el ) {
				el.style.fontWeight = 'bold';
			}

			$( '#p-wikibase-otherprojects li.wb-otherproject-link a' ).each( function () {
				var $link = $( this ),
					url = $link.attr( 'href' ).replace( '/Main_Page', mw.util.wikiUrlencode( '/Заглавная_страница' ) );
				if ( $link.parent().hasClass( 'wb-otherproject-mediawiki' ) ) {
					url = $link.attr( 'href' ) + '/ru';
				}
				$link.attr( 'href', url );
			} );
		} );
	} );
}

/**
 * Выполнение скриптов из пространства MediaWiki, указанных в URL
 * См. также https://www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 */
var withJS = location.href.match( /[&?]withjs=((mediawiki:)?([^&#]+))/i );
if ( withJS ) {
	importScript_( 'MediaWiki:' + withJS[3] );
}

/**
 * Код, который нужно выполнить как можно раньше. Он выполняется, если загружен подвал страницы,
 * иначе же ждёт наступления события wikipage.content (см. выше определение runAsEarlyAsPossible
 * и ниже про wikipage.content).
 */
runAsEarlyAsPossible( function () {
	/**
	 * {{выполнить скрипт}}
	 */
	var $execJS = $( '.executeJS' );
	if ( $execJS.length ) {
		$execJS.each( function () {
			$.each( $( this ).data( 'scriptnames' ).split( ' ' ), function ( i, sc ) {
				sc = $.trim( sc.replace( /[^\w ]/g, '' ) );
				if ( sc ) {
					importScript( 'MediaWiki:Script/' + sc + '.js' );
				}
			} );
		} );
	}

	/**
	 * Чтобы ссылки на очистку кэша не требовали подтверждения (они должны быть помещены в тег с классом
	 * purgelink и именем страницы в параметре data-pagename, например как в шаблоне {{очистить кэш}})
	 */
	$( '.purgelink a' ).click( function ( e ) {
		mw.loader.using( [ 'mediawiki.api', 'mediawiki.util', 'mediawiki.notify' ] ).done( function () {
			var pageName = $( this ).parent( '.purgelink' ).data( 'pagename' ) || mw.config.get( 'wgPageName' );
			new mw.Api().post( {
				action: 'purge',
				titles: pageName
			} ).then( function () {
				var url = mw.util.getUrl( pageName );
				if ( e.ctrlKey ) {
					if ( !window.open( url ) ) {
						location.assign( url );
					}
				} else {
					location.assign( url );
				}
			}, function () {
				mw.notify( 'Не удалось очистить кэш.', { type: 'error' } );
			} );
			e.preventDefault();
		} );
	} );
}, $( '#footer' ), mw.hook( 'wikipage.content' ).add );

// По какой-то причине фикс для FlaggedRevs работает только при использовании then(), но не done().
mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init' ).then( function () {
	/**
	 * Исправление поведения FlaggedRevs в сочетании с визуальным редактором, чтобы
	 * в стабилизированных статьях на правку в визреде открывалась последняя версия, что
	 * соответствует поведению обычного редактора. См. [[phab:T165283]],
	 * [[Википедия:Форум/Архив/Общий/2017/12#Серьёзная проблема с анонимными правками в стабилизированных статьях]].
	 */
	runAsEarlyAsPossible( function () {
		function fixEditLinksForStableRevs( removeClickHandlers ) {
			if ( $( '#ca-view.selected' ).length ) {
				// При выходе из визреда (сохранении или переключении) ссылки работают правильно,
				// и убирать обработчики событий нет нужды — только исправить URL’ы на случай
				// открытия правки в новой вкладке.
				if ( removeClickHandlers ) {
					$( '#ca-ve-edit, .mw-editsection-visualeditor' ).off( 'click' );
				}
				$( '#ca-ve-edit a, .mw-editsection-visualeditor' ).each( function () {
					var href = $( this ).attr( 'href' );
					if ( !/[?&]stable=0/.test( href ) ) {
						$( this ).attr( 'href',
							href
								.replace( /&veaction=edit/, '&stable=0&veaction=edit' )
								.replace( /&oldid=\d+/,  '' )
						);
					}
				} );
			}
		}

		// Не включаем сюда проверку на наличие #ca-view.selected, чтобы не вычёркивать случай,
		// когда визред открыт без Ajax и по выходу из него нужно заменить URL’ы в ссылках.
		if ( $( '#ca-current' ).length &&
			!/[?&](oldid|diff)=\d+/.test( location.search ) &&
			// В нестабилизированных статьях ссылка «Править код» ведёт на правку открытой версии —
			// такое же поведение оставим и у визреда.
			!/&oldid=\d+/.test( $( '#ca-edit a' ).attr( 'href' ) )
		) {
			fixEditLinksForStableRevs( true );
		
			mw.hook( 've.deactivationComplete' ).add( function () {
				fixEditLinksForStableRevs( false );
			} );
		}
	} );
	
	/**
	 * Поддержка Викификатора в новом режиме вики-текста aka 2017 wikitext editor
	 */
	mw.libs.ve.addPlugin( function () {
		return mw.loader.using( [ 'ext.visualEditor.core', 'ext.visualEditor.mwwikitext',
			'ext.visualEditor.mwtransclusion', 'ext.gadget.wikificator' ] )
				.then( function () {
					createVEWikificatorTool();
				} );
	} );
} );

/**
 * {{TOC hidden}}
 */
function TOChidden() {
	$( '.tochidden-wrapper > #toc' ).addClass( 'tochidden' );
	$( '.tochidden-wrapper .togglelink' ).text( mw.msg( 'showtoc' ) );
	$( '.tochidden-wrapper > #toc > ul' ).css( 'display', 'none' );
}

runAsEarlyAsPossible( function () {
	if ( $( '.tochidden-wrapper' ).length ) {
		mw.loader.using( [ 'mediawiki.cookie' ] ).done( function () {
			if ( mw.cookie.get( 'hidetoc' ) === null ) {
				$.when( mw.loader.using( [ 'mediawiki.toc' ] ), $.ready ).then( TOChidden );
			}
		} );
	}
}, $( '#toc' ), mw.hook( 'wikipage.content' ).add );

/**
 * Код, выполняемый по событию wikipage.content (его обработчики выполняются раньше колбэков для $,
 * хотя в глубине это одно и то же событие, просто колбэк, инициирующий wikipage.content, становится
 * в очередь раньше). Так как wikipage.content инициируется после обновления страницы в результате
 * Ajax-запросов (например, гаджетом быстрого предпросмотра), не добавляйте сюда коды, которые
 * должны гарантированно выполниться один раз на странице.
 */
mw.hook( 'wikipage.content' ).add( function () {
	/**
	 * Отключение обтекания раздела примечаний, если в нём есть колонки
	 */
	$( '.references-small.columns' ).each( function () {
		$( this )
			.prevUntil( 'h1, h2, h3, h4, h5, h6' )
			.addBack()
			.first()
			.prev()
			.css( 'clear', 'both' );
	} );

	/**
	 * Imagemap Highlight
	 */
	// На странице есть как минимум один элемент .imageMapHighlighter, а браузер поддерживает <canvas>
	if ( $( '.imageMapHighlighter' ).length && $( '<canvas>' )[ 0 ].getContext ) {
		importScript( 'MediaWiki:Imagemap-Highlight.js' );
	}

	/**
	 * imgToggle
	 */
	// На странице есть как минимум один элемент div.img_toggle
	if ( $( 'div.img_toggle' ).length ) {
		mw.loader.load( 'ext.gadget.imgToggle' );
	}

	/**
	 * Авторазбиение списков на колонки. Будет работать только для однострочных списков. 35em
	 * (из Mediawiki:Common.css) является предварительным числом, а фактическое будет посчитано исходя
	 * из ширины элементов. Должно использоваться только для UL внутри DIV. Пример использования —
	 * шаблон {{Wikidata/SisterCities}}.
	 */
	$("div.autocolumns").each(function(d, div) {
		var parentWidth = $(div).parent()[0].offsetWidth;
		if (!parentWidth) return;

		var maxWidth = 0;
		var elements = 0;
		$(div).find("ul>li").each(function(l, li) {
			elements++;
			var jLi = $(li);
			if (jLi.children().length != jLi.contents().length)
				jLi.wrapInner(document.createElement("span"));

			var liWidth = 0;
			jLi.children().each(function(c, child) {
				liWidth += child.offsetWidth;
			});
			if (liWidth > maxWidth)
				maxWidth = liWidth;
		});
		if ( maxWidth === 0 ) return;
		// UL/LI bullet width + padding
		maxWidth += 22.5 * 2;

		var maxColumns = "" + Math.ceil( elements / 5 );
		$(div).css({"-moz-columns": maxWidth + "px " + maxColumns, "columns" : maxWidth + "px " + maxColumns});
	});
});

/**
 * Кнопки описания правок для визуального редактора
 */
mw.hook( 've.activationComplete' ).add( function () {
	mw.loader.load( 'ext.gadget.summaryButtons' );
} );