!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Seal the Deal',
        'Смертельное желание',
        'Арктический круиз',
        'Морское дно'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Seal_the_Deal.css'
        });
    }
}( jQuery, mediaWiki );