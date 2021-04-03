!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Hollow Knight: Silksong',
        'Personaggi non Giocanti di Pharloom',
        'Boss di Pharloom',
        'Nemici di Pharloom',
        'Aree di Pharloom',
        'Shakra',
        'Garmond e Zaza',
        'Sherma',
        'Trobbio',
        'Carmelita',
        'Lace',
        'Sharpe',
        'Hornet (Silksong)',
        'Huntress'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Silksong.css'
        });
    }
}( jQuery, mediaWiki );