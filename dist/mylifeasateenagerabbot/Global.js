// adds a page count function to Special:AllPages
$( function () {
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'AllPages' &&
        $.getUrlVar( 'from' ) !== undefined ||
        $.getUrlVar( 'to' ) !== undefined ) {
            if ( $( '.mw-allpages-table-chunk' ).length !== 0 ) {
                $( '.mw-allpages-nav' ).eq( 0 ).append( ' | <span class="mw-allpages-count">Page count: <span class="count"></span></span>' );
                $( '.mw-allpages-count .count' ).text( $( '.mw-allpages-table-chunk tbody td' ).length );
            }
    }
} );