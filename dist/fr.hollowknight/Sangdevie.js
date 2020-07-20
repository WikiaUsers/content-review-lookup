!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Sang-de-vie',
        'Chevalier de la Ruche'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Sangdevie.css'
        });
    }
}( jQuery, mediaWiki );