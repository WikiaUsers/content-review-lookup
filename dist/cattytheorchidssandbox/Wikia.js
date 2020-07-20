/* Slay ~ Avin's WB */
 
$(function() {
    if ( $( '.clickMe' ).length ) {
        $( '.clickMe:not(.bound)' ).click( function () {
            $( this ).find( '.clickMeTarget' ).toggle( 'slow' );
        }).addClass( 'bound' );
    }
    var target = document.querySelector( '#WikiaArticleComments' ),
        observer = new MutationObserver( function ( mutations ) {
            if ( $( '#WikiaArticleComments .mw-collapsible' ) ) {
                console.log( 'Comment(s) loaded. Collapsing tables.' );
                $( '#WikiaArticleComments .mw-collapsible' ).makeCollapsible();
                $( '#WikiaArticleComments .mw-collapsible-toggle' ).css( 'float', 'right' );
            }
 
            if ( $( '.clickMe' ).length ) {
                $( '.clickMe:not(.bound)' ).click( function () {
                    $( this ).find( '.clickMeTarget' ).toggle( 'slow' );
                }).addClass( 'bound' );
            }
        }),
        config = { childList: true, subtree: true };
    if ( target == null )
        return;
 
    observer.observe( target, config );
});