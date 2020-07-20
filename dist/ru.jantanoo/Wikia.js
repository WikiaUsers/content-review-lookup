// Collapsiblе: [[ВП:СБ]]
 
function collapsibleTables() {
	var $btn,
		$a,
		tblIdx = 0,
		colTables = [];
 
	$( 'table.collapsible' ).each( function() {
		var $table = $( this ),
			$row = $table.find( 'tr' ).first(),
			$cell = $row.find( 'th' ).first();
		if ( !$cell.length ) {
			return;
		}
		$table.attr( 'id', 'collapsibleTable' + tblIdx );
		$btn = $( '<span>' )
			.css( {
				'float': 'right',
				'font-weight': 'normal',
				'font-size': 'smaller'
			} );
		$a = $( '<a>' )
			.attr( 'id', 'collapseButton' + tblIdx )
			.attr( 'href', 'javascript:collapseTable(' + tblIdx + ');' )
			.css( 'color', $cell.css( 'color' ) )
			.text( NavigationBarHide )
			.appendTo( $btn );
		if ( $cell.contents().length ) {
			$btn.insertBefore( $cell.contents().first() );
		} else {
			$btn.appendTo( $cell );
		}
		colTables[tblIdx++] = $table;
	} );
	for ( var i = 0; i < tblIdx; i++ ) {
		if ( colTables[i].hasClass( 'collapsed' ) ||
			( tblIdx > NavigationBarShowDefault &&
				colTables[i].hasClass( 'autocollapse' )
			)
		) {
			collapseTable( i );
		}
	}
}
 
function collapseTable ( idx ) {
	var $table = $( '#collapsibleTable' + idx ),
		$rows = $table.find( 'tr' ),
		$btn = $( '#collapseButton' + idx );
	if ( !$table.length || !$rows.length || !$btn.length ) {
		return false;
	}
 
	var isShown = ( $btn.text() === NavigationBarHide ),
		cssDisplay = isShown ? 'none' : $rows.first().css( 'display' );
 
	$btn.text( isShown ? NavigationBarShow : NavigationBarHide );
	$rows.slice( 1 ).each( function() {
		$( this ).css( 'display', cssDisplay );
	} );
}
 
function collapsibleDivs() {
	var navIdx = 0,
		colNavs = [],
		i;
	$( '#mw-content-text div.NavFrame' ).each( function() {
		var $navFrame = $( this );
		$navFrame.attr( 'id', 'NavFrame' + navIdx );
		var $a = $( '<a>' )
			.addClass( 'NavToggle' )
			.attr( 'id', 'NavToggle' + navIdx )
			.attr( 'href', 'javascript:collapseDiv(' + navIdx + ');' )
			.text( NavigationBarHide );
		$navFrame.children( '.NavHead' ).append( $a );
		colNavs[navIdx++] = $navFrame;
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