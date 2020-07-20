( function ( $, mw ) {

    'use strict';
 
    function addSonakoModule() {
        $( '<section>' )
            .attr( 'class', 'Sonako module' )
            .append(
                $( '<h1>' )
                    .css( {
                        'margin-top': '0px',
                        'margin-bottom': '10px'
                    } )
 
                    // Head text for module
                    .text( 'Hướng dẫn' )
            )
            .append(
                $( '<div>' )
                    .append(
                        $( '<p>' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href', '/wiki/Cẩm_nang_Sonako_(Dành_cho_bạn_đọc)' )
                                    //Tự thân vận động là nhất.
                                    .text( 'Cẩm nang Sonako dành cho bạn đọc và các thành viên của Sonako Light Novel Team' ),
                                '.'
                            )
                    )
            )
            .insertAfter( '.WikiaActivityModule' );
    }
 
    function init() {
        if ( $( ".WikiaActivityModule" ).length ) {
            addSonakoModule();
            return;
        }
 
        setTimeout( init, 500 );
    }
 
    init()

}( this.jQuery, this.mediaWiki ) );