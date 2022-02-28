/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
//кунгра
!function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Кунгра',
        'Заварухи Кунгры',
        'Первая Заваруха Кунгры',
        'Яррихи',
        'Плохиния',
        'Гур',
        'Гурочка'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Kungra.css'
        });
    }
}( jQuery, mediaWiki );