!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'La Troupe Grimm',
        'Grimm Maître de la troupe',
        'Roi des Cauchemars Grimm',
        'Grimm Novice',
        'Grimm Despote',
        'Grimm Cauchemardesque',
        'Brumm',
        'Brumm',
        'Divine',
        'Grimmsteed',
        'Nymm',
        'L’héritier de Grimm',
        'Bouclier éthéré',
        'Maître de la vitesse',
        'Chant du Tisserand',
        'Mélodie insouciante',
        'Unbreakable Strength',
        'Unbreakable Heart',
        'Unbreakable Greed',
        'Path of Pain',
        'Sceau de Lien',
        'Roi des Cauchemars Grimm',
        'Le Coeur du Cauchemar'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Grimm.css'
        });
    }
}( jQuery, mediaWiki );