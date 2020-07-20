!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
    var categories = mw.config.get('wgCategories');
 
    a = [
        'Silksong',
        'Hollow Knight: Silksong',
 
        ':Category:Areas (Silksong)','Areas (Silksong)',
        'Deep Docks',
        'Greymoor',
        'Moss Grotto',
        'Bonebottom',
 
        ':Category:NPCs (Silksong)','NPCs (Silksong)',
        'Ballow',
        'Church Keeper',
        'Flea',
        'Forge-Daughter',
        'Garmond and Zaza',
        'Huntress',
        'Shakra',
        'Sherma',
        'Trobbio',
 
        ':Category:Bosses (Silksong)','Bosses (Silksong)',
        'Carmelita',
        'Lace',
        'Moss Mother',
        'Sharpe',
 
        ':Category:Enemies (Silksong)','Enemies (Silksong)',
        'Crawbug',
        'Dustroach',
 
        'Mask Piece',
        'Rosary',
        'Rosaries',
        'Shell Shards',
        'Silk',
        'Tool Pouch',
 
        'Skills',
        'Bind',
        'Tools',
 
        'Lore Tablets (Silksong)',
 
        'Hornet (Silksong)'
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