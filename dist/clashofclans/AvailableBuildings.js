/* Any JavaScript here will be loaded for all users on every page load. */

!function( $ ) {
    if ( !$( '.can-template-body' ).length ) return;
 
    var _b_img = 'https://images.wikia.nocookie.net/clashofclans/images/1/12/AvailableBuildingsBackground.png',
        _i = 1;
 
    $( '.can-template-body' ).each( function() {
        var _img = $( this ).find( 'img' ).attr( 'data-src' ),
            _l = $( this ).find( 'a' ).attr( 'href' ),
            _t = $( this ).attr( 'data-text' ),
            _id = 'canvas_tml_' + _i;

        if ( typeof _img == 'undefined' ) {
            _img = $( this ).find( 'img' ).attr( 'src' );
        }
 
        $( this ).append( '<canvas id="' + _id + '" style="display: inline;"></canvas>' );
 
        var _can = document.getElementById( _id ),
            _ctx = _can.getContext( '2d' );
 
        var _img1 = new Image(),
            _img2 = new Image();
 
        _img1.addEventListener( 'load', function() {
            _img2.addEventListener( 'load', function() {
                _can.width = _can.height = 80;
 
                _ctx.globalAlpha = 1.0;
                _ctx.drawImage( _img1, 0, 0, 80, 80 );
                _ctx.drawImage( _img2, 0, 0, 80, 80 );
 
                _ctx.font = "12px 'Clash'";
                _ctx.lineWidth = 3;
                _ctx.strokeStyle = "black";
                _ctx.fillStyle = "white";
                _ctx.strokeText( _t, 7, 17 );
                _ctx.fillText( _t, 7, 17 );
            });
            _img2.src = _img;
        });
        _img1.src = _b_img;
 
        // If link (_l) is not image:
        if ( !/(.+)\/\/(vignette|img|images)/.test( _l ) ) {
            _can.style.cursor = 'pointer';

            _can.addEventListener( 'click', function() {
                window.location = _l;
            });
        }
 
        $( this ).find( 'a' ).remove();

        _i = _i + 1;
    });
}( jQuery );