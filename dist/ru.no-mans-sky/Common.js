(function( $ ) {
    if ( !$( '.switcher-buttons' ).length ) return;
 
    $( '.switcher-buttons span' ).click( function() {
        var type = $( this ).attr( 'data-switch' );
 
        $( '.switcher-togglable' ).hide();
        $( '.switcher-togglable[data-type="' + type + '"]' ).show();
    });
})( this.jQuery );