!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Hidden Dreams',
        'Difensore Bianco',
        'Grigio Principe Zote',
        'Zotelide Saltellante',
        'Zotelide Alato',
        'Zotelide Instabile',
        'Portale dei Sogni'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:HiddenDreams.css'
        });
    }
}( jQuery, mediaWiki );