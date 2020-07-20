!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Godmaster',
        'Brothers Oro & Mato',
        'Fluke Hermit',
        'Flukemunga',
        'Godseeker Mode',
        'Great Nailsage Sly',
        'Hall of Gods',
        'Paintmaster Sheo',
        'Pale Lurker',
        'Pantheon of Hallownest',
        'Pantheon of the Artist',
        'Pantheon of the Knight',
        'Pantheon of the Master',
        'Pantheon of the Sage',
        'Pure Vessel',
        'The Eternal Ordeal', 'Eternal Ordeal',
        'The Godseeker', 'Godseeker',
        'Void Idol',
        'Weathered Mask',
        'Godtuner',
        'Eternal Ordeal',
        'Godhome',
        'Pantheons',
        'Sisters of Battle',
        'Winged Nosk',
        'Absolute Radiance',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Godmaster.css'
        });
    }
}( jQuery, mediaWiki );