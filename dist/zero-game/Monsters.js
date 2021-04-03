!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Monsters',
        'Booby Traps',
        'Crying Stuffed Toys',
        'Mutants',
        'Roamers',
        'Zombies',
        'Arachne',
        'Arachne%27s Monster',
        'Twilight',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Monsters.css'
        });
    }
}( jQuery, mediaWiki );