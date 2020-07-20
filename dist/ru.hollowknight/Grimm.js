!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'The Grimm Troupe',
        'Беспечная песнь',
        'Брумм',
        'Гримм',
        'Король кошмара',
        'Ловкач',
        'Мрачное дитя',
        'Мрачный кошмар',
        'Мрачный мастер',
        'Мрачный ученик',
        'Мрачный скакун',
        'Нимм',
        'Песнь ткача',
        'Святая',
        'Щит грёз',
        'Сердце кошмара'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Grimm.css'
        });
    }
}( jQuery, mediaWiki );