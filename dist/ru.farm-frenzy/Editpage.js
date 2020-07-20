// Helper function for toolbar buttons
// TODO: We gotta migrate _users_ to mw.toolbar.addButton, see [[mw:ResourceLoader/Migration guide (users)#Toolbar]]

function wgImg( img ) {
	return '//ru.farm-frenzy.wikia.com' + img;
}

function createFuncBtn( id, func, img, tip ) {
	$( '<img id="' + id + '" src="' + wgImg( img ) + '" style="cursor:pointer;" ' +
		'title="' + tip + '" alt="' + tip.substr( 0, 3 ) + '">' )
		.appendTo( '#gadget-toolbar' )
		.click( func );
}

// автоматическое заполнение полей при добавлении новых тем сверху
var summary = $('#wpSummary').val();
if (   decodeURIComponent(location.search).search(/[?&]summary=\/\*[+ ]*\*\//) != -1
	|| (   mw.config.get('wgAction') == 'submit'
		&& summary != undefined && summary.search(/\/\*\s*\*\//) != -1)) {
  	importMW( 'NewTopicOnTop' );
}


// Toolbar section for gadgets

if ( mw.user.options.get( 'usebetatoolbar' ) === 1 ) {
	var gadgetToolbarLocation = '#wikiEditor-ui-toolbar';
	mw.util.addCSS( '#gadget-toolbar img { padding:2px; }' +
		'#gadget-toolbar { height:26px; margin:3px; }' );
	$.when(
		mw.loader.using( 'ext.wikiEditor.toolbar' ),
		$.ready
	).then( function() {
		function addGadgetsGroup() {
			gadgetToolbar();
			
			$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
				'section': 'main',
				'groups': {
					'gadgets': {}
				}
			} );
			
			var $groupGadgets = $( '#wikiEditor-section-main .group-gadgets' ),
				$groupFormat = $( '#wikiEditor-section-main .group-format' );
			if ( $groupGadgets.length && $groupFormat.length ) {
				$groupGadgets.insertBefore( $groupFormat );
			}
			
			if ( $groupGadgets.length ) {
				mw.hook( 'wikieditor.toolbar.gadgetsgroup' ).fire();

				// Quickfix until https://phabricator.wikimedia.org/T150172 is resolved
				$newlineButton = $( '.wikiEditor-toolbar-spritedButton[rel="newline"]' );
				$newlineButton.off('click').on('click', function(e) {
					$.wikiEditor.modules.toolbar.fn.doAction($( '#wpTextbox1' ).data( 'wikiEditor-context' ), {
						type: 'encapsulate',
						options: {
							pre: '<br>\n'
						}
					}, $newlineButton);
					e.preventDefault();
					return false;
				} );
			}
		}
		
		addGadgetsGroup();
		if ( !$( '#wikiEditor-section-main .group-gadgets' ).length ) {
			// Лечение для случаев, когда панель инструментов поздно прорисовывается
			setTimeout( addGadgetsGroup, 0 );
		}
	} );
} else if ( mw.user.options.get( 'showtoolbar' ) === 1 ) {
	var gadgetToolbarLocation = '#toolbar';
	importMW( 'ToolbarOld' );
} else {
	var gadgetToolbarLocation = '#editform';
	importMW( 'ToolbarNone' );
}

function gadgetToolbar() {
	if ( !document.getElementById( 'gadget-toolbar' ) ) {
		var $where = $( gadgetToolbarLocation );
		if ( !$where.length ) {
			return;  // Beta toolbar not ready yet
		}
		$( '<div id="gadget-toolbar" style="float:left;"></div>' ).prependTo( $where );
	}
   
	for ( var id in mwCustomEditButtons ) {
		var btn = mwCustomEditButtons[id];
		if ( !btn.length ) {
			continue;
		}
		createFuncBtn( id, btn[0], btn[1], btn[2] );
		delete mwCustomEditButtons[id];
	}
}

if ( mw.user.options.get( 'usebetatoolbar' ) !== 1 ) {
	$( function() {
		gadgetToolbar();
		setTimeout( gadgetToolbar, 2000 );
		setTimeout( gadgetToolbar, 6000 );
	} );
}


// Summary buttons

function insertSummary( txt ) {
	if ( typeof txt !== 'string' ) {
		txt = this.title;
	}
	if (typeof summaryItemsSeparator == 'undefined') {
		window.summaryItemsSeparator = ',';
	}
	var val = $( '#wpSummary' ).val();
	var regExp = new RegExp( '(^|[,;.?!/]) ?' + mw.RegExp.escape(txt) );
	if ( regExp.test( val ) ) {
		return;
	}
	if ( /[^,; \/]$/.test( val ) ) {
		val += summaryItemsSeparator;
	}
	if ( /[^ ]$/.test( val ) ) {
		val += ' ';
	}
	$( '#wpSummary' ).val( val + txt );
}
 
function addSumButton( btn, txt ) {
	$( '<a title="' + txt + '">' + btn + '</a>' )
		.appendTo( '#userSummaryButtonsA' )
		.click( insertSummary );
}

$( function() {
	var frm = document.getElementById( 'editform' );
	if ( !mw.config.get( 'wgArticleId' ) || !frm || $( frm.wpSection ).val() === 'new' ) {
		return;
	}
	mw.util.addCSS( '\
		input#wpSummary { margin-bottom:0; }\
		#userSummaryButtonsA a { background:#cef; border:1px solid #adf; padding:0 2px;\
			margin:0 2px; cursor:pointer; font-size:86%; color:#666; }\
		#userSummaryButtonsA a:hover { background:#bdf; color:black; text-decoration:none; }' );
	$( '<div id="userSummaryButtonsA"></div>' ).insertAfter( '#wpSummary' );
	$.each(
		[
			'викиф|икация', 'оформл|ение', 'стил|евые правки', 'орфогр|афия',
			'пункт|уация', 'ответ', 'комм|ентарий', 'кат|егоризация', 'шаб|лон',
			'к удал|ению', 'иллюстрация', 'источ|ники', 'запр|ос источника',
			'доп|олнение', 'уточн|ение', 'обнов|ление', 'закр|ыто', 'итог'
		],
		function ( i, s ) {
			addSumButton( s.replace( /\|.*/, '' ), s.replace( /\|/, '' ) );
		}
	);
} );


// Wikificator
importMW( 'Wikificator' );


// Sig reminder
if ( mw.config.get( 'wgNamespaceNumber' ) % 2 ||
	mw.config.get( 'wgNamespaceNumber' ) === 4 ||
	mw.config.get( 'wgNamespaceNumber' ) === 104
) {
	$( function () {
		var copywarn = document.getElementById( 'editpage-copywarn' ),
			wpSave = document.getElementById( 'wpSave' );
		if ( !copywarn || !wpSave ) {
			return;
		}
		if ( ( mw.config.get( 'wgNamespaceNumber' ) === 4 || mw.config.get( 'wgNamespaceNumber' ) === 104 ) &&
			( !mw.config.get( 'wgTitle' ).match( '^(Форум[/ ]|Голосования/|Опросы/|Обсуждение правил/|Заявки на .*|Запросы.|Кандидаты в .*/|К (удалению|объединению|переименованию|разделению|улучшению)/|Рецензирование/|Проверка участников/|Инкубатор/(Мини-рецензирование|Форум[/ ])|Социальная ответственность/Форум|Водные объекты|Библиотека/Требуются книги|Добротные статьи/К лишению статуса|Фильтр правок/Срабатывания)' ) ||
				mw.config.get( 'wgTitle' ).match( '/Архив' ) )
		) {
			return;
		}
		var ins = '<a href="javascript:mw.toolbar.insertTags(\' ~~\~~\', \'\', \'\');">~~\~~</a>';
		copywarn.innerHTML += '&nbsp;&nbsp;Не забудьте добавить к вашему сообщению подпись с помощью ' + ins;
		if ( $.inArray( 'autoconfirmed', mw.config.get( 'wgUserGroups' ) ) !== -1 && !window.sigWarning ) {
			return;
		}
		// Unregistered/new users only
		var warningDone = false;
		wpSave.onclick = function() {
			try {
				if ( warningDone || document.editform.wpTextbox1.value.indexOf( '~~\~~' ) !== -1 ) {
					return true;
				}
				warningDone = true;
				cp.innerHTML = 'Пожалуйста, <b>подпишитесь</b>, добавив в конце' +
					' своего сообщения' + ins + ' (<a href="' + 
					mw.config.get( 'wgArticlePath' ).replace( /\$1/, 'Википедия:Подписывайтесь' ) +
					'" title="(ссылка откроется в новом окне)" target=_blank>подробнее&nbsp;↗</a>)';
				cp.style.background = '#FFD080';
				cp.style.border = '1px solid orange';
				return false;
			} catch ( e ) {
				return true;
			}
		};
	} );
}


// Hack for Opera 11.6
if ( window.opera && /11\.6[01]/.test( window.opera.version() ) ) {
	$( '#wpTextbox1' )
		.mousedown( function() {
			this.sT = this.scrollTop;
		} )
		.click( function() {
			if ( this.scrollTop === 0 ) {
				this.scrollTop = this.sT;
			}
		} );
}