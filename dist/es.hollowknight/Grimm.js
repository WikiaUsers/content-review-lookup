
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'La Compañía de Grimm',
        'Grimm',
        'Rey Pesadilla',
        'Grimario Novato',
        'Grimario Maestro',
        'Grimario Pesadilla',
        'Brumm',
        'Divine',
        'Grimmsteed',
        'Nymm',
        'Niño de Grimm',
        'Escudo Onírico',
        'Maestro de Sprints',
        'Canción de Tejedora',
        'Melodía Despreocupada',
        'Fuerza irrompible',
        'Corazón irrompible',
        'Codicia irrompible',
        'Sendero del Dolor',
        'Sello vinculante',
        'Corazón de la Pesadilla'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Grimm.css'
        });
    }
}( jQuery, mediaWiki );