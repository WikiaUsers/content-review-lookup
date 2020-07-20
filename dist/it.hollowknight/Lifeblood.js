!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Lifeblood',
        'Cavaliere dell’Alveare'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Lifeblood.css'
        });
    }
}( jQuery, mediaWiki );