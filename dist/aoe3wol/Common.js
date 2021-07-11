/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Helper script for .hlist class in Common.css
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 */
( function ( mw, $ ) {
    var profile = $.client.profile();
    if ( profile.name === 'msie' && profile.versionNumber === 8 ) {
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            $content.find( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
                .addClass( 'hlist-last-child' );
        } );
    }
} ( mediaWiki, jQuery ) );

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
if( wgUserName ) {
	$('.insertusername').text(wgUserName);
}