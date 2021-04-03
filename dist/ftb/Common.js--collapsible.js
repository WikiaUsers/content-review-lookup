		var $toggle = $( 'th > .mw-collapsible-toggle' ),
			$this,
			$rows,
			$table,
			expand,
			collapse;

		console.log('.');
		$toggle.unbind( 'click.mw-collapsible keypress.mw-collapsible' )
			.bind( 'click.mw-collapsible keypress.mw-collapsible', function( e ) {
			console.log('st');
			// stop scrolling to the top of the page
			e.preventDefault();
	
			$this = $( this );
			$table = $( this ).closest( '.mw-collapsible' );
	
			// check for defined expand/collapse text
			expand = $table.attr( 'data-expandtext' ) || 'show';
			collapse = $table.attr( 'data-collapsetext' ) || 'hide';
	
			// make sure we aren't selecting any nested navboxes
			$rows = $table.find( '> tbody > tr' );
	
			if ( $table.hasClass( 'mw-collapsed' ) ) {
	
				$table.removeClass( 'mw-collapsed' );
	
				$this.children().text( collapse );
	
				$this.addClass( 'mw-collapsible-toggle-expanded' )
					.removeClass( 'mw-collapsible-toggle-collapsed' );
	 
				$rows.each( function ( i ) {
					// first row is the header
					if ( i === 0 ) {
						return;
					}
	
					$( this ).css({
						'display': 'table-row'
					});
				} );
	
			} else {
	
				$table.addClass( 'mw-collapsed' );
	
				// this is only added by default if already collapsed
				if ( !$table.hasClass( 'mw-made-collapsible' ) ) {
					$table.addClass( 'mw-made-collapsible' );
				}
	
				$this.children().text( expand );
	
				$this.addClass( 'mw-collapsible-toggle-collapsed' )
					.removeClass( 'mw-collapsible-toggle-expanded' );
				 
				$rows.each( function ( i ) {
					// first row is the header
					if ( i === 0 ) {
						return;
					}
	
					$( this ).hide();
				} );
			}
		} );