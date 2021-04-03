(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Sandbox2'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Sandbox2.css'
        });
    }
})( jQuery, mediaWiki );