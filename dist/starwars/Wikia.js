/*<pre><nowiki>*/

// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
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

// Add clickable skin to Instant Expert: The Force Awakens page (temporary)
if(mw.config.get('wgPageName') === "Instant_Expert:The_Force_Awakens") {
    var targetURL = 'http://ow.ly/W5KxR';
    $('body').prepend('<a href="' + targetURL + '"><div class="clickable-skin"></div></a>');
    $('.clickable-skin').css({
        'height': '100%',
        'position': 'absolute',
        'width': '100%',
        'z-index': '1'
    });
}
/*</nowiki></pre>*/