!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Hidden Dreams',
        'Белый защитник',
        'Взрывной зотлинг',
        'Врата грёз',
        'Крылатый зотлинг',
        'Прыгучий зотлинг',
        'Серый принц Зот'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:HiddenDreams.css'
        });
    }
}( jQuery, mediaWiki );