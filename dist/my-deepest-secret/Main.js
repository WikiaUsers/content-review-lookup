// Credits to the Hollow Knight Wiki //
(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'My Deepest Secret Wiki'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Main.css'
        });
    }
})( jQuery, mediaWiki );