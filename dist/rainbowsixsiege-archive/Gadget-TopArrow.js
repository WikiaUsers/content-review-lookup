/*
 * Authors : Marc Mongenet, Lgd 
 * from french Wikipedia
 */

jQuery( function ( $ ) {
    var lien = $( '<a class="noprint" href="#" title="Page top">↑</a>' ).click( function ( e ) {
        e.preventDefault();
        window.scrollTo( 0, 0 );
    } );
    $( '#mw-content-text' ).find( 'h2, h3, h4, h5, h6' ).append( ' ', lien );
} );