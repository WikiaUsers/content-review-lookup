// MLP Movie
// Random background && wordmark
!function( $ ) {
    if ( !$( '.wds-community-header__wordmark, #EditPageHeader .wordmark' ).length ) return;

    var h_img = [
            '6/63/AppleJack',
            'e/ed/Capper',
            'd/de/Cpt._Celaeno',
            'b/bb/Fluttershy',
            '6/65/Grubber',
            'e/ea/Pinkie_Pie',
            'f/fc/Princess_Skystar',
            'a/a7/Quee_Novo',
            'd/d8/Rainbow_Dash',
            '3/3d/Rarity',
            'a/a0/Spike',
            '4/44/Tempest_Shadow',
            'e/e8/The_Storm_king',
            '7/7c/TS'
        ],
        bg_img = [
            '4/45/BG-1.jpg',
            '5/5b/BG-2.jpg',
            '8/84/BG-3.jpg',
            '7/73/BG-4.jpg',
            '5/5c/BG-5.jpg',
            '1/1f/BG-7.jpg',
            '5/52/BG-8.jpg',
            'a/af/BG-9.jpg'
        ], 
        i = Math.floor( ( h_img.length ) * Math.random() ),
        b = Math.floor( ( bg_img.length ) * Math.random() );

    $( '.wds-community-header__wordmark a, #EditPageHeader .wordmark a' ).html(
        '<img src="https://images.wikia.nocookie.net/mlp/ru/images/' + h_img[ i ] + '_header.png" style="transform: scale( 2 );" alt="Дружба – это Чудо Вики" />' 
    );

    $( 'body.skin-oasis' ).attr( 'style', 'background-image: url("https://images.wikia.nocookie.net/mlp/ru/images/' + bg_img[ b ] + '") !important');
}( jQuery );