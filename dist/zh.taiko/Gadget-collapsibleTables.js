/**
 * Collapsible tables
 *
 * @version 2.0.1 (2013-03-26)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */

var autoCollapse = 2;
var collapseCaption = wgULS('隐藏', '隱藏');
var expandCaption = wgULS('显示', '顯示');

function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );

	if ( !Table || !Button ) {
		return false;
	}

	var Rows = Table.rows;

	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}

function createClickHandler( tableIndex ) {
	return function ( e ) {
		e.preventDefault();
		collapseTable( tableIndex );
	}
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = {};
	var Tables = document.getElementsByTagName( 'table' );

	for ( var i = 0; i < Tables.length; i++ ) {
		if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}

			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );

			// oldid=31233076 fix: moving to MediaWiki:Common.css
			// Button.style.styleFloat = 'right';
			// Button.style.cssFloat = 'right';
			// Button.style.fontWeight = 'normal';
			// Button.style.textAlign = 'right';
			// Button.style.width = '8em';
			Button.setAttribute( 'class', 'collapseButton' );
			// end oldid=31233076 fix

			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			$( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
			ButtonLink.appendChild( ButtonText );

			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );

			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}

	for ( var i = 0; i < tableIndex; i++ ) {
		if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
			( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
		) {
			collapseTable( i );
		}
		else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ((element = element.parentNode)) {
				if ( $( element ).hasClass( 'outercollapse' ) ) {
					collapseTable ( i );
					break;
				}
			}
		}
	}
}

$( createCollapseButtons );