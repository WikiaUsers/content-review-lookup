(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Sandbox4'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Sandbox4.css'
        });
    }
})( jQuery, mediaWiki );