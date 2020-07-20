$( '.insertusername' ).on( 'click', function () {
    if ( mw.config.get( 'wgUserName' ) ) {
        $( this ).html( mw.config.get( 'wgUserName' ) );
    }
} );