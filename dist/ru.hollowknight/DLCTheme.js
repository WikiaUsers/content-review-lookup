//Hidden Dreams
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

//The Grimm Troupe

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


//Godmaster
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Godmaster',
        'Бледный соглядатай',
        'Мастер кисти Шео',
        'Богоискательница',
        'Треможор',
        'Чистый Сосуд',
        'Мастера гвоздя Оро и Мато',
        'Великий гуру гвоздей Слай',
        'Крылатый Носк',
        'Боевые сёстры',
        'Божий кров',
        'Глас Божий',
        'Трем-отшельница',
        'Пантеон Мастера',
        'Пантеон Художника',
        'Пантеон Гуру',
        'Пантеон Рыцаря',
        'Пантеон Халлоунеста',
        'Вечные муки',
        'Чертоги богов',
        'Всевышняя Лучезарность'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Godmaster.css'
        });
    }
}( jQuery, mediaWiki );