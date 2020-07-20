/** <nowiki>
 * Loader for chat CSS and Js
 *
 * Hopefully this will eventually be replaced by <https://github.com/Wikia/app/pull/966>
 */

;( function ( window, mw ) {
    var conf = mw.config.get( [
        'wgUserName'
    ] );

    importStylesheetURI( '/load.php?debug=true&lang=en&mode=articles&skin=oasis&articles=MediaWiki:Chat.css&only=styles' );
    importScriptURI( '/load.php?debug=true&lang=en&mode=articles&skin=oasis&articles=MediaWiki:Chat.js&only=scripts' );

    window.onNewMessage = [];
    window.onStatusMessage = [];
}( this, this.mediaWiki ) );