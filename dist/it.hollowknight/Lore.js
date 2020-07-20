!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Creatura dell’Abisso',     
        'Nidosacro',        
        'Folle Signore',
        'Falene',
        'L’Infezione',        
        'Ricettacoli',
        'Vuoto',
        'Urovermi',
        'Entità del Vuoto',
        'I Cinque Grandi Cavalieri',
        'Il Re Pallido',
        'Unn',
        'Tessitrici',
        'Vespa',
        'Boon',
        'Regno del Sogno',
        'Gruppi di Nidosacro',
        'Esseri Superiori',
        'Antica Civiltà',
        'Ellina',
        'Lore'
 
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Lore.css'
        });
    }
}( jQuery, mediaWiki );