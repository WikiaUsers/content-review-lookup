(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Sandbox3'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Sandbox3.css'
        });
    }
})( jQuery, mediaWiki );