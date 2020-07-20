
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'The Grimm Troupe',
        'Grimm',
        'Nightmare King',
        'Grimmkin Novice',
        'Grimmkin Master',
        'Grimmkin Nightmare',
        'Brumm',
        'Brumm',
        'Divine',
        'Grimmsteed',
        'Nymm',
        'Grimmchild',
        'Dreamshield',
        'Sprintmaster',
        'Weaversong',
        'Carefree Melody',
        'Unbreakable Strength',
        'Unbreakable Heart',
        'Unbreakable Greed',
        'Path of Pain',
        'Seal of Binding',
        'Nightmare King Grimm',
        'The Nightmare’s Heart'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Grimm.css'
        });
    }
}( jQuery, mediaWiki );