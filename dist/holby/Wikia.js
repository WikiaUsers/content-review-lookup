/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
 *
 */
 
// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#title-eraicons' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );

/* REDUCES WIDTH OF DAB BOX IF AN INFOBOX IS PRESENT */
$(document).ready(function(){
    $('.portable-infobox').parent('#mw-content-text').children('#dabtag').css('width', 'calc(100% - 277px)');
});

window.AddRailModule = [{prepend: true}];