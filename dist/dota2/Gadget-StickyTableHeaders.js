/**
 * Find all header rows in a thead-less table and put them in a <thead> tag.
 * This only treats a row as a header row if it contains only <th>s (no <td>s)
 * and if it is preceded entirely by header rows. The algorithm stops when
 * it encounters the first non-header row.
 *
 * After this, it will look at all rows at the bottom for footer rows
 * And place these in a tfoot using similar rules.
 * 
 * This function was copied from MediaWiki's jquery.tablesorter module
 * @param {jQuery} $table object for a <table>
 */
function emulateTHeadAndFoot( $table ) {
	var $thead, $tfoot, i, len,
		$rows = $table.find( '> tbody > tr' );
	if ( !$table.get( 0 ).tHead ) {
		$thead = $( '<thead>' );
		// T289817
		$thead.addClass('mw-sticky-header-element');
		$rows.each( function () {
			if ( $( this ).children( 'td' ).length ) {
				// This row contains a <td>, so it's not a header row
				// Stop here
				return false;
			}
			$thead.append( this );
		} );
		$table.find( ' > tbody:first' ).before( $thead );
	}
	if ( !$table.get( 0 ).tFoot ) {
		$tfoot = $( '<tfoot>' );
		len = $rows.length;
		for ( i = len - 1; i >= 0; i-- ) {
			if ( $( $rows[ i ] ).children( 'td' ).length ) {
				break;
			}
			$tfoot.prepend( $( $rows[ i ] ) );
		}
		$table.append( $tfoot );
	}
}

mw.hook('wikipage.content').add( function( $content ) {
	// Do this for wikitable, but sortable does it on it's own already
	$content.find('.wikitable:not(.sortable) ').each( function ( i, table ) {
		if ( table.tBodies && !table.tHead ) {
			// No thead found. Look for rows with <th>s and
			// move them into a <thead> tag or a <tfoot> tag
			emulateTHeadAndFoot( $(table).addClass('mw-sticky-header') );
		}
	} );
} );