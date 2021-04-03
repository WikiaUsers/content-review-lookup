!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'NPCs',
        'Noise',
        'Knock',
        'Nobel',
        'Michael',
        'Micaela',
        'Mika',
        'Rita',
        'Barry Arthur',
        'Gloria',
        'Eclipse',
        'Crescent',
        'Brandon',
        'Bonds',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:NPCs.css'
        });
    }
}( jQuery, mediaWiki );