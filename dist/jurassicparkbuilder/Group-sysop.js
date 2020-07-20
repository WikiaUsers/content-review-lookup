/* see also [[wikipedia:MediaWiki:Group-sysop.js]] */
$( function() {
'use strict';
 
 
/**
 * Blank the "Other/additional reason" field when deleting pages
 *
 * This is so we don't get stupid vandalism and spam and whatnot
 * preserved for posterity in the delete log
 *
 * Disable by adding
 *   disableDeleteBlanking = true;
 * to [[Special:MyPage/common.js]]
 */
if ( !window.disableDeleteBlanking && mw.config.get( 'wgAction' ) == 'delete' ) {
    var summary = $( '#wpReason' ), summaryVal = summary.prop( 'value' );
    summary.prop( 'value', '' );
 
    if ( summaryVal.match( /\{\{\s*(?:template:)?delete\s*\|/i ) ) {
        var deleteReason = summaryVal.replace( /\|\s*quick\s*=\s*true/i , '' )
                .match( /\{\{\s*(?:template:)?delete\s*\|\s*reason\s*\=\s*([^}]*)(?:\}\})?/i )[1];
 
        if ( deleteReason ) {
            summary.prop( 'value', 'Tagged reason was: ' + deleteReason );
        }
    }
}
 
 
} );