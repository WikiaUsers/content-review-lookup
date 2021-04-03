// Навигация на заглавной
!function( $ ) {
    if ( !$( '.main-page-navigation' ).length ) return;
 
    $( '.navigation-switcher:first-of-type' ).toggleClass( 'navigation-switcher-selected' );
 
    $( '.navigation-switcher' ).click( function() {
        if ( $( this ).hasClass( 'navigation-switcher-selected' ) ) return;
 
        var type = $( this ).attr( 'data-type' );
 
        $( '.navigation-switcher-selected' ).toggleClass( 'navigation-switcher-selected' );
        $( this ).toggleClass( 'navigation-switcher-selected' );
 
        $( '.navigation-info-image' ).hide();
        $( '.navigation-info-image[data-type="' + type + '"]' ).show();
 
        $( '.navigation-body-gallery-item' ).hide( 500 );
        $( '.navigation-body-gallery-item[data-type="' + type + '"]' ).show( 800 );
    });
}( jQuery );