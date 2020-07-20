!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Seal the Deal',
        'Смертельное желание'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Seal the Deal.css'
        });
    }
}( jQuery, mediaWiki );