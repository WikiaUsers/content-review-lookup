if (mw.config.get('wgNamespaceNumber') === 112 || $("body").hasClass("mainpage")) {
    importScript('MediaWiki:PortalAvailability.js');
}

if ($(".babel0-toc").length) {
    $(".babel0-toc").find('a').attr('title', 0);
}

// for portal pages
;( function( $ ) {
    "use strict";

    $( '.to-hover' ).on( 'hover', function() {
        var get_data = $( this ).attr( 'data-page' );
        if ( $( '.page-' + get_data ).hasClass( 'active' ) ) return;

        // Selected tab
        $( '.active-tab' ).toggleClass( 'active-tab' );
        $( this ).toggleClass( 'active-tab' );

        // Tab switcher
        $( '.active' ).hide().toggleClass( 'active' );
        $( '.page-' + get_data ).show().toggleClass( 'active' );
   });
})( window.jQuery );