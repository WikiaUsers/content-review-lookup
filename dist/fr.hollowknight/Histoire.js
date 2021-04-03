!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Histoire d’Hallownest',
 
        'Créature des Abysses',   
        'Civilisation Ancienne',
        'Les Abeilles',
        'Boon',
        'Royaume du Rêve',
        'Rêveurs',
        'Ellina la Chroniqueuse',
        'Les Cinq Grands Chevaliers',
        'Les Flukes',
        'Les Fous',
        'Le Clan Champignon',
        'Les Chercheurs de Dieux',
        'Êtres supérieurs',
        'L’Infection',
        'Seigneur Fou',
        'La Tribu des Mantes',
        'La Tribu des Moussues',
        'La Tribu des Papillons de Nuit',
        'La Tribu des Araignées',
        'Le Roi Pâle',
        'Pharloom',
        'Les Shamans Escargot',
        'Les Érudits du Sanctuaire de l’Âme',
        'La Troupe Grimm (Groupe)',
        'Le Coeur du Cauchemar',
        'Reine des Abeilles Vespa',
        'Vaisseaux',
        'Vide',
        'Entité du Vide',
        'Unn',
        'Tisserands',
        'Wyrms',
        'Le Seigneur Fou',
        'Hallownest',
        'Histoire d’Hallownest',
        'Sceaux',
 
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Histoire.css'
        });
    }
}( jQuery, mediaWiki );