// Random New Year wordmark
!function( $ ) {
    if ( !$( '.fandom-community-header__image' ).length ) return;

    var _img1, _img3, _can, _ctx, _i1, _i2, _i3;

    $( '.fandom-community-header__image' ).html( 
        '<canvas id="canvas_wordmark" style="display: inline; width: 150px; height: 65px;"></canvas>'
    );

    _i1 = new Image();
    _i2 = new Image();
    _i3 = new Image();

    _img1 = [
        [ 'd/d6/Right_1.png', 90, 0 ],
        [ '8/8c/Right_3.png', 65, 0 ],
        [ 'd/d9/Right_4.png', 90, -10 ],
        [ '9/96/Right_5.png', 95, 2 ],
        [ '5/5f/Right_6.png', 50, 8 ],
        [ '4/46/Right_7.png', 90, 0 ]
    ];

    _img3 = [
        [ '2/2a/Left_1.png', 0, 0 ],
        [ '6/67/Left_2.png', 0, 0 ],
        [ 'e/e5/Left_3.png', 0, 3 ],
        [ 'b/b5/Left_4.png', 0, 4 ],
        [ '3/3f/Left_5.png', 0, 0 ],
        [ '7/77/Left_6.png', 0, 0 ],
        [ '2/2e/Right_2.png', 0, 0 ] // RIGHT IN THE LEFT COMPANY, SO WOW
    ];

    var _i1_img = Math.floor( _img1.length * Math.random() ),
        _i3_img = Math.floor( _img3.length * Math.random() );

    _can = document.getElementById( 'canvas_wordmark' );
    _ctx = _can.getContext( '2d' );

    _i1.addEventListener( 'load', function() {
        _i2.addEventListener( 'load', function() {
            _i3.addEventListener( 'load', function() {
                _can.width = 150;
                _can.height = 65;
 
                _ctx.globalAlpha = 1.0;
                _ctx.drawImage( _i1, _img1[ _i1_img ][ 1 ], _img1[ _i1_img ][ 2 ] );
                _ctx.drawImage( _i2, 0, 0 );
                _ctx.drawImage( _i3, _img3[ _i3_img ][ 1 ], _img3[ _i3_img ][ 2 ] );
            });
            _i3.src = 'https://images.wikia.nocookie.net/mlptest/ru/images/' + _img3[ _i3_img ][ 0 ];
        });
        _i2.src = 'https://images.wikia.nocookie.net/mlptest/ru/images/4/4e/Snow.png';
    });
    _i1.src = 'https://images.wikia.nocookie.net/mlptest/ru/images/' + _img1[ _i1_img ][ 0 ];

    // Restoring link function
    _can.addEventListener( 'click', function() {
        window.location = '/ru';
    });
}( jQuery );