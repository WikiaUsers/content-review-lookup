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
        'Esseri Superiori',
        'Antica Civiltà',
        'Ellina',
        'Api',
        'Folli',
        'Maranidi',
        'La Compagnia di Grimm',
        'Cercatori di Dei',
        'Sciamani Lumaca',
        'Studiosi del Sacrario delle Anime',
        'Tribù dei Funghi',
        'Tribù delle Falene',
        'Tribù dei Muschiosi',
        'Tribù delle Mantidi',
        'Tribù dei Ragni',
        'Lore'
 
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Lore.css'
        });
    }
}( jQuery, mediaWiki );