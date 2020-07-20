
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Hidden Dreams',
        'White Defender',
        'Grey Prince Zote',
        'Hopping Zoteling',
        'Winged Zoteling',
        'Volatile Zoteling',
        'Dreamgate'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:HiddenDreams.css'
        });
    }
}( jQuery, mediaWiki );