$( function() {
	const range = document.createElement( 'input' );
	range.min = 1;
	range.max = 15;
	range.step = 1;
	range.type = 'range';
	range.value = 15;

	const statsTable = document.getElementById( 'stats-table' );
	range.addEventListener( 'input', function ( input ) {
		const value = input.target.value;
		statsTable.querySelectorAll( 'td' ).forEach( function ( td ) {
			const options = td.querySelectorAll( '.stat-value' );
			const previousValue = parseInt( td.innerText );
			const selectedOption = options[ value - 1 ];
			const newValue = selectedOption
				? parseInt( selectedOption.innerText )
				: undefined;

			if ( options.length !== 15 ) return;
			options.forEach( function ( option, idx ) {
				option.querySelectorAll( 'span' ).forEach( function ( child ) { option.removeChild( child ) } );
				if ( idx === value - 1 ) {
					option.style.display = '';
					if ( previousValue && selectedOption ) {
						const diff = document.createElement( 'span' );
						const sign = Math.sign( newValue - previousValue ) > 0 ? '+' : '';
						diff.classList.add( 'stat-change', 'stat-change-' + ( sign === '+' ? 'plus' : 'minus' ) );
						diff.innerText = ' (' + sign + ( newValue - previousValue ) + ')';
						option.appendChild( diff );
					}
				} else {
					option.style.display = 'none';
				}
			} )
		} )
	} )

	document.getElementById( 'stats-slider' ).appendChild( range );
} )