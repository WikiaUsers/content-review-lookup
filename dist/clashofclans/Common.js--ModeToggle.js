$(function() {
    if (!$('table.mode-toggle-mode-2')[0])
        return;
    $('table.mode-toggle-mode-2')[0].classList = "mode-toggle-mode-2 mode-toggle-hidden";
    $('.mode-toggle-button').on('click', function() {
        $('table.mode-toggle-mode-1').toggleClass("mode-toggle-hidden");
        $('table.mode-toggle-mode-2').toggleClass("mode-toggle-hidden");
    });
});

!function( $ ) {
    if ( !$( '.mode-toggle-button' ).length ) return;
 
    $( 'table[class*="mode-toggle-mode"]' ).each(function() {
        $( this ).find( 'img' ).each(function() {
            if ( !$( this ).hasClass( 'lzyLoaded' ) ) {
                var src = $( this ).attr( 'data-src' );
                $( this ).attr( 'src', src );
            }
        });
    });
}( jQuery );