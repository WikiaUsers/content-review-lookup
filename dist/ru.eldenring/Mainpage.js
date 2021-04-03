!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Eldenring Вики',
        'Elden Ring',
        'FromSoftware',
        'Хидэтака Миядзаки',
        'Мартин, ДжорджРеймонд Ричард',
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Mainpage.css'
        });
    }
}( jQuery, mediaWiki );