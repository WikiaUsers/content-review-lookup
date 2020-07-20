$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '.headerek' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '.headerek' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );

$(function() { 
    $('#era').addClass('page-header__page-subtitle').attr('id', null).insertAfter('.page-header__title');
    $('.page-header__page-subtitle').appendTo('.firstHeading');
});