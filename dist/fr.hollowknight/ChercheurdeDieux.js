!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Chercheur de Dieux',
        'Frères Oro et Mato',
        'Fluke Ermite',
        'Flukemunga',
        'Mode Chercheur de Dieux',
        'Grand Maître d’Aiguillons Sly',
        'Salle des Dieux',
        'Maître Peintre Sheo',
        'Rôdeuse Pâle',
        'Panthéon d’Hallownest',
        'Panthéon des Artistes',
        'Panthéon du Chevalier',
        'Panthéon du Maître',
        'Panthéon du Grand Maître',
        'Vaisseau Pur',
        'L’Éternelle Ordalie', 'L’Éternelle Ordalie',
        'Chercheur de Dieux (PNJ)',
        'Idole du Vide',
        'Masque Effrité',
        'Syntoniseur Divin',
        'L’Éternelle Ordalie',
        'Maison des Dieux',
        'Panthéons',
        'Soeurs d’Armes',
        'Nosk Ailé',
        'Radiance Véritable',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:ChercheurdeDieux.css'
        });
    }
}( jQuery, mediaWiki );