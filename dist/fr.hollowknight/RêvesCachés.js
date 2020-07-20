 
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Rêves Cachés',
        'Protecteur Blanc',
        'Zote le Prince Gris',
        'Zoteling Sautant',
        'Zoteling Ailé',
        'Zoteling Instable',
        'Portail des Rêves'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:RêvesCachés.css'
        });
    }
}( jQuery, mediaWiki );