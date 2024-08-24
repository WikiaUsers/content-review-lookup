/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * Helper script for .hlist class in Common.css
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 3.1 (2013-01-16)
 * @maintainer [[User:Edokter]]
 */
/* Fix wrapping issue in IE 8 and up for hlist in table; put a soft-hyphen in front of list items. */
if ( $.client.profile().versionNumber > 7 ) {
    mw.util.addCSS( 'table.hlist li:before { content: "\\ad"; }' );
}
/* Add pseudo-selector class to last-child list items in IE 8 */
if ( $.client.profile().versionNumber === 8 ) {
    $( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
        .addClass( 'hlist-last-child' );
}
/* Generate interpuncts and parentheses for IE < 8 */
if ( $.client.profile().versionNumber < 8 ) {
    var hlists = $( '.hlist' );
    hlists.find( 'dt:not(:last-child)' )
        .append( ': ' );
    hlists.find( 'dd:not(:last-child)' )
        .append( '<b>·</b> ' );
    hlists.find( 'li:not(:last-child)' )
        .append( '<b>·</b> ' );
    hlists.find( 'dl dl, dl ol, dl ul, ol dl, ol ol, ol ul, ul dl, ul ol, ul ul' )
        .prepend( '( ' ).append( ') ' );