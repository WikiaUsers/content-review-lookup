!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Rêves Cachés',
        'Protecteur Blanc',
        'Prince Gris Zote',
        'Zoteling Sautant',
        'Zoteling Ailé',
        'Zoteling Instable',
        'Portail des Rêves'
      ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:RevesCaches.css'
        });
    }
}( jQuery, mediaWiki );