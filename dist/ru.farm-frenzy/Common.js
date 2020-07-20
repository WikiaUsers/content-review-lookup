importMW = function ( name ) {
	importScript( 'MediaWiki:' + name + '.js' );
};

importScript_ = importScript;
importScript = function ( page, proj ) {
	if ( !proj ) {
		importScript_( page );
	} else {
		if ( proj.indexOf( '.' ) === -1 ) {
			proj += '.farm-frenzy.wikia.com';
		}
		mw.loader.load( '//' + proj + '/w/index.php?title=' + mw.util.wikiUrlencode( page ) + '&action=raw&ctype=text/javascript' );
	}
};


mw.config.set( 'tableSorterCollation', { 'ё': 'е' } );


// Messages
var collapseCaption = 'скрыть',
	expandCaption = 'показать';
var NavigationBarHide = '[' + collapseCaption + ']',
	NavigationBarShow = '[' + expandCaption + ']',
	NavigationBarShowDefault = 1;

if ( /^en$/.test( mw.config.get( 'wgUserLanguage' ) ) ) {
	importMW( 'Common-' + mw.config.get( 'wgUserLanguage' ) );
}

// Collapsiblе: [[ВП:СБ]]

function collapsibleTables( $content ) {
	var $btn,
		$a,
		tblIdx = 0,
		navboxCount = 0,
		notNavboxCount = 0,
		colTables = [],
		$Tables = $content.find( 'table' );

    $Tables.each( function( i, table ) {
        if ( $(table).hasClass( 'collapsible' ) ) {
			var $table = $( this ),
				$row = $table.find( 'tr' ).first(),
				$cell = $row.find( 'th' ).first();
			if ( !$cell.length ) {
				return;
			}
			$table.attr( 'id', 'collapsibleTable' + tblIdx );
			$btn = $( '<span>' ).addClass('collapseButton');
			$a = $( '<a>' )
				.attr( 'id', 'collapseButton' + tblIdx )
				.attr( 'href', 'javascript:collapseTable(' + tblIdx + ');' )
				.css( 'color',  // изменяем цвет ссылки, только если цвет текста в навбоксе нестандартный
					($cell.css( 'color' ) == $('.mw-body').css('color'))
					? 'auto'
					: $cell.css( 'color' ) )
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
			if ( $table.hasClass( 'navbox-inner' ) ) {
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
				( ( colTables[i].hasClass( 'navbox-inner' ) &&
						navboxCount > NavigationBarShowDefault ) ||
					( !colTables[i].hasClass( 'navbox-inner' ) &&
						notNavboxCount > NavigationBarShowDefault ) ) ) )
		{
			collapseTable( i );
		}
	}
}

mw.hook( 'wikipage.content' ).add( collapsibleTables );

function collapseTable ( idx ) {
	var $table = $( '#collapsibleTable' + idx ),
		$rows = $table.children().children( 'tr' ),
		$btn = $( '#collapseButton' + idx );
	if ( !$table.length || !$rows.length || !$btn.length ) {
		return false;
	}

	var isShown = ( $btn.text() === collapseCaption ),
		cssDisplay = isShown ? 'none' : $rows.first().css( 'display' );

	$btn.text( isShown ? expandCaption : collapseCaption );
	$rows.slice( 1 ).each( function() {
		$( this ).css( 'display', cssDisplay );
	} );
}

function collapsibleDivs( $content ) {
	var navIdx = 0,
		colNavs = [],
		i,
		$Divs = $content.find( 'div' );
	
	$Divs.each( function( i, div ) {
        if ( $(div).hasClass( 'NavFrame' ) ) {	
			var $navFrame = $( this );
			$navFrame.attr( 'id', 'NavFrame' + navIdx );
			var $a = $( '<a>' )
				.addClass( 'NavToggle' )
				.attr( 'id', 'NavToggle' + navIdx )
				.attr( 'href', 'javascript:collapseDiv(' + navIdx + ');' )
				.text( NavigationBarHide );
			$navFrame.children( '.NavHead' ).append( $a );
			colNavs[navIdx++] = $navFrame;
        }
	} );
	for ( i = 0; i < navIdx; i++ ) {
		if ( colNavs[i].hasClass( 'collapsed' ) ||
			( navIdx > NavigationBarShowDefault &&
				!colNavs[i].hasClass( 'expanded' )
			)
		) {
			collapseDiv( i );
		}
	}
}

mw.hook( 'wikipage.content' ).add( collapsibleDivs );

function collapseDiv ( idx ) {
	var $div = $( '#NavFrame' + idx ),
		$btn = $( '#NavToggle' + idx );
	if ( !$div.length || !$btn.length ) {
		return false;
	}
	var isShown = ( $btn.text() === NavigationBarHide );
	$btn.text( isShown ? NavigationBarShow : NavigationBarHide );
	$div.children( '.NavContent,.NavPic' ).each( function() {
		$( this ).css( 'display', isShown ? 'none' : 'block' );
	} );
}

function checkEmptyCreatebox() {
	$( 'form.createbox' ).on( 'submit', function() {
		if ( !$( this ).find( 'input.createboxInput' ).val() ) {
			window.alert( 'Не указано название новой статьи!' );
			return false;
		}
		return true;
	} );
}


// Execution
mw.loader.using( 'mediawiki.util', function() {

	if ( mw.config.get( 'wgCanonicalNamespace' ) === 'Special' ) {
		if ( /^(Uplo|Sear|Stat|Spec|Abus|Prefe|Move|Watch|Newp|Log|Block$)/i.test( mw.config.get( 'wgCanonicalSpecialPageName' ) ) ) {
			importMW( mw.config.get( 'wgCanonicalSpecialPageName' ) );
		}

	} else {
		switch ( mw.config.get( 'wgAction' ) ) {

			case 'history':
		 		importMW( 'History' );
		 		break;

			case 'delete':
				importMW( 'Deletepage' );
				break;

			case 'edit':
			case 'submit':
				importMW( 'Editpage' );
				// and continue with the default: view, purge

			default:
				$( checkEmptyCreatebox );
				if ( navigator.platform.indexOf( 'Win' ) !== -1 ) {
					mw.util.addCSS( '.IPA, .Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; }' );
				}

				switch ( mw.config.get( 'wgNamespaceNumber' ) ) {
					case 0:
					case 100:
						if ( mw.config.get( 'wgIsMainPage' ) ) {
							importMW( 'Mainpage' );
						}
						break;
					case 6:
						importMW( 'Filepage' );
						break;
				}
		}
	}

	importMW( 'Sidebar-related' );

	if ( !mw.config.get( 'wgUserName' ) ) {
		mw.util.addCSS( '#mw-fr-revisiontag { display:none }' ); // hide FlaggedRevs
	}

	// Iwiki sorting
	mw.hook( 'resourceloader.loadEnd' ).add( function () {
		if ( mw.config.get( 'wgUserName' ) &&
			( mw.user.options.get( 'compact-language-links' ) != 1 &&
				( ( mw.config.get( 'wgLangPrefs' ) === null ? false : true ) ||
					( mw.config.get( 'wgAddLangHints' ) === null ? false : mw.config.get( 'wgAddLangHints' ) ) ||
					( mw.config.get( 'wgUseUserLanguage' ) === null ? false : mw.config.get( 'wgUseUserLanguage' ) ) ) ) )
		{
			importMW( 'Interwiki-links' );
		}
	} );

} );


// Extra scripts

var withJS = location.href.match( /[&?]withjs=((mediawiki:)?([^&#]+))/i );
if ( withJS ) {
	importScript_( 'MediaWiki:' + withJS[3] );
}

var execJS = document.getElementById( 'executeJS' );
if ( execJS ) {
	$.each( execJS.className.split( ' ' ), function ( i, sc ) {
		sc = $.trim( sc.replace( /[^\w ]/g, '' ) );
		if ( sc ) {
			importMW( 'Script/' + sc );
		}
	} );
}


// [[Шаблон:TOC hidden]]
function TOChidden(){
	$('.mw-tochidden > #toc').addClass('tochidden');
	$('.mw-tochidden #togglelink').text(mw.message('showtoc').text());
	$('.mw-tochidden > #toc > ul').css('display','none');
}

mw.loader.using( [ 'mediawiki.cookie' ], function () {
	if ( mw.cookie.get('hidetoc') === null ) {
		$.when( mw.loader.using( [ 'mediawiki.toc' ] ), $.ready ).then( TOChidden );
	}
});

// Отключение обтекания раздела примечаний, если в нём есть колонки
mw.hook( 'wikipage.content' ).add( function () {
	$('.references-small.columns').after('<div class="temporaryDiv"></div>').next()
		.prevUntil('h1, h2, h3, h4, h5, h6').last().prev().css('clear', 'both');
	
	// Этот элемент нужен на случай, если примечания — последний элемент
	// (потребность в next() возникает из-за невключительности prevUntil() jQuery)
	$('.temporaryDiv').remove();
} );

/* Авторазбиение списков на колонки. Будет работать только для однострочных списков. 35em (из Mediawiki:Common.css) является предварительным числом, а фактическое будет посчитано исходя из ширины элементов. Должно использоваться только для UL внутри DIV. Пример использования -- шаблон {{Wikidata/SisterCities}} */
mw.hook( 'wikipage.content' ).add( function () {
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
		if ( maxWidth == 0 ) return;
		// UL/LI bullet width + padding
		maxWidth += 22.5 * 2;

		var maxColumns = "" + Math.ceil( elements / 5 );
		$(div).css({"-moz-columns": maxWidth + "px " + maxColumns, "columns" : maxWidth + "px " + maxColumns});
	});
} );

// Чтобы ссылки на очистку кэша не требовали подтверждения (они должны быть помещены в тег
// с классом purgelink и именем страницы в параметре data-pagename, например как в шаблоне
// {{очистить кэш}})
$('.purgelink a').click(function (e) {
	e.preventDefault();
	var pagename = $(this).parent('.purgelink').data('pagename') || mw.config.get('wgPageName');
	$.post('//' + location.host + '/w/api.php', {
		'action': 'purge',
		'titles': pagename
	}).done(function () {
		var url = mw.util.getUrl(pagename);
		if (e.ctrlKey) {
			if (!window.open(url)) {
				location.assign(url);
            }
        } else {
			location.assign(url);
        }
	});
});