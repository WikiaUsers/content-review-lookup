 !function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'CSStest'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Canon.css'
        });
    }
}( jQuery, mediaWiki );