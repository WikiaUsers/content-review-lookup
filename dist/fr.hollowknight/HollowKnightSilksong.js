!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
    var categories = mw.config.get('wgCategories');
 
    a = [
        'Silksong',
        'Hollow Knight: Silksong',
        ':Catégorie:Hollow Knight: Silksong','Hollow Knight: Silksong',
        ':Catégorie:Zones de Pharloom','Zones de Pharloom',
        'Fond Osseux',
        'Greymoor',
        'Grotte Moussue',
        'Bonebottom',
        ':Catégorie:Personnages non jouables (Silksong)','Personnages non jouables (Silksong)',
        'Ballow',
        'Church Keeper',
        'Flea',
        'Forge-Daughter',
        'Garmond et Zaza',
        'Shakra',
        'Sherma',
        'Trobbio',
        ':Catégorie:Boss (Silksong)','Boss (Silksong)',
        'Carmelita',
        'Lace',
        'La Chasseresse',
        'Mère Moussue',
        'Sharpe l’Assassin d’Acier',
        ':Catégorie:Ennemis (Silksong)','Ennemis (Silksong)',
        'Crawbug',
        'Dustroach',
        'Mask Piece',
        'Chapelet',
        'Shell Shards',
        'Soie',
        'Tool Pouch',
        'Skills',
        'Bind',
        'Outils',
        'Tablette d’Histoire (Silksong)',
        'Hornet (Silksong)',
        'Succès (Hollow Knight: Silksong)',
        'Fins (Silksong)',
        'Grindle',
        'Caravane',
        'Banc (Silksong)',
        'Druide du Temple Moussu',
        
    ];
 
    function containsSilksong(cat) {
        return cat.indexOf("Silksong") != -1
    }
 
    if ( a.indexOf( p ) !== -1 || containsSilksong(p) || categories.some(containsSilksong)) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Silksong.css'
        });
    }
 
}( jQuery, mediaWiki );