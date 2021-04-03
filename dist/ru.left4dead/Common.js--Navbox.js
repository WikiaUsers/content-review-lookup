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