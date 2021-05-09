// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#title-eraicons' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );

 /* May the Fourth 2021 fun! */
   $(function () {
        $('#fourth').append("<iframe width='100%'  height='1200px' style='background-color:transparent!important' src='https://gleam.io/Rz3FG/win-stars-wars-day-prizes-with-fanatical'></iframe>");
    });