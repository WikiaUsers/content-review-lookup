// Random New Year wordmark
!function( $ ) {
    if ( !$( '.fandom-community-header__image' ).length ) return;

    var _img0, _img1, _img2, _img3, _can, _ctx, _b0, _m0, _p1, _p2;

    $( '.fandom-community-header__image' )
      .css({
      	width: 250,
      	height: 100
      })
      .html( '<canvas id="canvas_wordmark" style="display: none; width: 250px; height: 100px; cursor: pointer;"></canvas>' );

	_b0 = new Image();
    _p1 = new Image();
    _m0 = new Image();
    _p2 = new Image();

    // Фон
	_img0 = [
		'c/c6/RWM_back1.png', // снегопад_1
		'0/04/RWM_back2.png', // снегопад_2
		'b/b3/RWM_back3.png', // звёзды
		'c/c8/RWM_back4.png', // ёлки
	];

    // Персонаж 1
    _img1 = [
        [ '8/8e/RWM_right1.png', 180, 30 ], // Эпплблум
        [ '0/05/RWM_right2.png', 160, 15 ], // Луна
        [ '6/6d/RWM_right3.png', 160, 20 ], // Сансет
        [ 'f/f2/RWM_right4.png', 135, 20 ], // Дерпи
        [ 'b/bd/RWM_right5.png', 165, 20 ]  // Лира
    ];

    // Проставка
    _img2 = [
    	'2/2c/RWM_middle1.png',
    	'9/96/RWM_middle2.png',
    	'b/b6/RWM_middle3.png'
    ];

    // Персонаж 2
    _img3 = [
        [ 'b/b0/RWM_left1.png', 10, 20 ], // Флатти
        [ 'c/cc/RWM_left2.png', 20, 13 ], // ЭППЛДЖЕК!
        [ 'e/ec/RWM_left3.png', 15, 40 ], // РАЙНБОУДЭШ!11
        [ 'b/bb/RMW_left4.png', 10, 35 ], // Опять Сансет, опять в рандоме будут выпадать вместе
    ];

    var _i0_img = Math.floor( _img0.length * Math.random() )
      , _i1_img = Math.floor( _img1.length * Math.random() )
      , _i2_img = Math.floor( _img2.length * Math.random() )
      , _i3_img = Math.floor( _img3.length * Math.random() );

    _can = document.getElementById( 'canvas_wordmark' );
    _ctx = _can.getContext( '2d' );

	_b0.addEventListener( 'load', function() {
    	_m0.addEventListener( 'load', function() {
        	_p1.addEventListener( 'load', function() {
            	_p2.addEventListener( 'load', function() {
                	_can.width = 250;
                	_can.height = 100;
 
            		_ctx.globalAlpha = 1.0;
            		_ctx.drawImage( _b0, 0, 0 );
            		_ctx.drawImage( _m0, 0, 0 );
                	_ctx.drawImage( _p1, _img1[ _i1_img ][ 1 ], _img1[ _i1_img ][ 2 ]);
                	_ctx.drawImage( _p2, _img3[ _i3_img ][ 1 ], _img3[ _i3_img ][ 2 ]);

                    $( '#canvas_wordmark' ).fadeIn( 1000 );
            	});
            	_p2.src = 'https://images.wikia.nocookie.net/mlp/ru/images/' + _img3[ _i3_img ][ 0 ];
        	});
        	_p1.src = 'https://images.wikia.nocookie.net/mlp/ru/images/' + _img1[ _i1_img ][ 0 ];
    	});
    	_m0.src = 'https://images.wikia.nocookie.net/mlp/ru/images/' + _img2[ _i2_img ];
	});
	_b0.src = 'https://images.wikia.nocookie.net/mlp/ru/images/' + _img0[ _i0_img ];
}( jQuery );