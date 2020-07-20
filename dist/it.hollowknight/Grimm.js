
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'The Grimm Troupe',
        'Grimm',
        'Grimm Re dell’Incubo',
        'Grimmorio Novizio',
        'Grimmorio Maestro',
        'Grimmorio Incubo',
        'Brumm',
        'Brumm',
        'Divina',
        'Destriero di Grimm',
        'Nymm',
        'Creatura di Grimm',
        'Scudo dei Sogni',
        'Maestro della Corsa',
        'Canto della Tessitrice',
        'Melodia Scanzonata',
        'Forza indistruttibile',
        'Cuore indistruttibile',
        'Avidità indistruttibile',
        'Sentiero del Dolore',
        'Sigillo del Legame',
        'Il Cuore dell’Incubo'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Grimm.css'
        });
    }
}( jQuery, mediaWiki );