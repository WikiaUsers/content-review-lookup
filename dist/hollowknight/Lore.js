!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
    var categories = mw.config.get('wgCategories');
    
    a = [
        'Lore',
        
        'Abyss Creature',   
        'Ancient Civilisation',
        'Bees',
        'Boon',
        'Dream Realm',
        'Dreamers',
        'Ellina',
        'Five Great Knights',
        'Flukes',
        'Fools',
        'Fungal Tribe',
        'Godseekers',
        'Hallownest',
        'Higher Beings',
        'Infection',
        'Lord Fool',
        'Mantis Tribe',
        'Mosskin Tribe',
        'Moth Tribe',
        'Nest',
        'Pale King',
        'Pharloom',
        'Snail Shamans',
        'Soul Sanctum%27s Scholars',
        'The Grimm Troupe (Lore)',
        'The Nightmare%27s Heart',
        'Vessels',
        'Void',
        'Void Entity',
        'Weavers',
        'Wyrms'
        
    ];
 
    function containsLore(cat) {
        return cat.indexOf("Lore") != -1
    }
 
    if ( a.indexOf( p ) !== -1 || containsLore(p) || categories.some(containsLore)) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Lore.css'
        });
    }
}( jQuery, mediaWiki );