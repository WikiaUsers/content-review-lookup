$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#noncanon' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#noncanon' ) );
        $( '#noncanon' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );