

!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Sueños Ocultos',
        'Defensor Blanco',
        'Príncipe Gris Zote',
        'Zotito Saltarín',
        'Zotito Alado',
        'Zotito Volátil',
        'Portal Onírico'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:HiddenDreams.css'
        });
    }
}( jQuery, mediaWiki );