!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Godmaster',
        'Fratelli Oro e Mato',
        'Maranide Eremita',
        'Megamaranide',
        'Modalità Cercatore di Dei',
        'Sala degli Dei',
        'Maestro Artista Sheo',
        'Spia Pallida',
        'Pantheon di Nidosacro',
        'Pantheon dell’Artista',
        'Pantheon del Cavaliere',
        'Pantheon del Maestro',
        'Pantheon del Gran Maestro',
        'Ricettacolo Puro',
        'L’Eterna Ordalia',
        'Cercatrice di Dei',
        'Idolo del Vuoto',
        'Maschera Invecchiata',
        'Sintonizzatore Divino',
        'Casa degli Dei',
        'Pantheon',
        'Sorelle della Battaglia',
        'Nosk Alato',
        'Splendore Assoluto',
        'Gran Maestro d’Aculeo Sly'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Godmaster.css'
        });
    }
}( jQuery, mediaWiki );