// Authors: http://www.rbeamer.com/cbg/index.php
 
!function( $ ) {
    if ( !$( '#clan-selector').length ) return;
 
    $( '#canvas-body' ).append(
        '<canvas id="canvas_gen" width="210" height="210"></canvas>' +
        '<img src="" id="canvas_mirror" />' +
        '<center>' +
            '<a href="#" class="button" id="dwn-clanbadge" download="clan-badge.png">Скачать</a>' +
        '</center>'
    );
 
    var img_base = 'https://images.wikia.nocookie.net/clashofclans/images/',
        o = {},
        currentlvl = 1;
 
    o.blank = 'd/d2/Blank.png';
 
    o.tags = {
        'background': 'Фон',
        'pg': 'Символ',
        'border': 'Рамка'
    };
 
    o.background = {
        0: 'e/ee/Background1.png',
        1: '3/33/Background2.png',
        2: 'c/cf/Background3.png',
        3: '0/07/Background4.png',
        4: 'a/aa/Background5.png',
        5: '4/49/Background6.png',
        6: 'c/c7/Background7.png',
        7: 'f/fe/Background8.png',
        8: '5/59/Background9.png',
        9: 'b/bb/Background10.png',
        10: '9/94/Background11.png',
        11: '7/77/Background12.png',
        12: '8/8c/Background13.png'
    };
 
    o.lvl = {
        0: 'e/e7/Level1.png',
        1: '0/0f/Level2.png',
        2: 'd/d5/Level3.png',
        3: 'c/c6/Level4.png',
        4: '9/9d/Level5.png',
        5: 'c/c0/Level6.png',
        6: '9/99/Level7.png',
        7: 'b/bf/Level8.png',
        8: '4/4f/Level9.png',
        9: '5/54/Level10.png',
        10: '0/0f/Level11.png',
        11: 'a/a0/Level12.png',
        12: '0/05/Level13.png',
        13: '5/50/Level14.png',
        14: 'e/e6/Level15.png',
        15: '8/81/Level16.png',
        16: '8/8e/Level17.png',
        17: '8/84/Level18.png',
        18: '4/45/Level19.png',
        19: '4/4e/Level20.png'
    };
 
    o.pg = {
        0: '4/48/Layer1.png',
        1: '4/4e/Layer2.png',
        2: '3/3b/Layer3.png',
        3: 'a/a7/Layer4.png',
        4: '5/58/Layer5.png',
        5: 'f/f3/Layer6.png',
        6: '9/9a/Layer7.png',
        7: '9/9c/Layer8.png',
        8: '9/94/Layer9.png',
        9: '2/27/Layer10.png',
        10: '3/3b/Layer11.png',
        11: 'c/c5/Layer12.png',
        12: '1/19/Layer13.png',
        13: 'a/a6/Layer14.png',
        14: 'c/c8/Layer15.png',
        15: '7/73/Layer16.png',
        16: '5/58/Layer17.png',
        17: '5/5b/Layer18.png',
        18: '0/0d/Layer19.png',
        19: '6/6c/Layer20.png',
        20: '2/23/Layer21.png',
        21: '5/5d/Layer22.png',
        22: '8/89/Layer23.png',
        23: 'f/fe/Layer24.png',
        24: '7/71/Layer25.png',
        25: '6/6f/Layer26.png',
        26: 'c/cb/Layer27.png',
        27: 'c/c6/Layer28.png',
        28: '1/1d/Layer29.png',
        29: 'e/ef/Layer30.png',
        30: 'c/cd/Layer31.png',
        31: 'd/de/Layer32.png',
        32: 'f/fc/Layer33.png',
        33: '3/3b/Layer34.png',
        34: '1/19/Layer35.png',
        35: '6/6d/Layer36.png',
        36: '2/24/Layer37.png',
        37: 'b/b6/Layer38.png',
        38: '4/4a/Layer39.png',
        39: 'e/e0/Layer40.png',
        40: '1/10/Layer41.png',
        41: 'e/eb/Layer42.png',
        42: '5/5a/Layer43.png',
        43: '9/9d/Layer44.png',
        44: '2/24/Layer45.png',
        45: '7/7e/Layer46.png',
        46: '5/52/Layer47.png',
        47: '4/40/Layer48.png',
        48: 'd/df/Layer49.png',
        49: 'c/c4/Layer50.png',
        50: 'c/c1/Layer51.png',
        51: '0/06/Layer52.png',
        52: 'e/e5/Layer53.png',
        53: '8/86/Layer54.png',
        54: 'c/cf/Layer55.png',
        55: 'f/ff/Layer56.png',
        56: '3/33/Layer57.png',
        57: 'c/c8/Layer58.png',
        58: '8/82/Layer59.png',
        59: 'c/c2/Layer60.png',
        60: '5/5b/Layer61.png',
        61: '2/2f/Layer62.png',
        62: '0/06/Layer63.png',
        63: '1/11/Layer64.png',
        64: '7/72/Layer65.png',
        65: 'b/b9/Layer66.png',
        66: 'c/c9/Layer67.png',
        67: 'e/e3/Layer68.png',
        68: 'c/c0/Layer69.png',
        69: '2/29/Layer70.png',
        70: '3/32/Layer71.png',
        71: 'd/d5/Layer72.png',
        72: '8/8f/Layer73.png',
        73: '0/0a/Layer74.png',
        74: '3/31/Layer75.png',
        75: '1/1d/Layer76.png',
        76: '0/08/Layer77.png',
        77: 'a/ae/Layer78.png',
        78: 'f/f7/Layer79.png',
        79: '5/52/Layer80.png'
    };
 
    o.border = {
        0: '3/31/Border1.png',
        1: '8/8e/Border2.png',
        2: '4/45/Border3.png',
        3: 'd/dc/Border4.png',
        4: '9/91/Border5.png',
        5: 'b/bc/Border6.png',
        6: '1/1c/Border7.png',
        7: 'b/b1/Border8.png'
    };
 
    o.hexagon = {
        0: '9/98/Hexagon1.png',
        1: '7/7c/Hexagon2.png',
        2: 'c/c4/Hexagon3.png',
        3: '0/0e/Hexagon4.png',
        4: '8/8f/Hexagon5.png',
        5: '9/9e/Hexagon6.png',
        6: '7/73/Hexagon7.png',
        7: '9/9d/Hexagon8.png'
    };
 
    o.levels = {
        0: [ 1, 2, 3, 4 ],
        1: [ 5, 6, 7, 8, 9 ],
        2: [ 10, 11 ],
        3: [ 12, 13 ],
        4: [ 14, 15 ],
        5: [ 16, 17 ],
        6: [ 18, 19 ],
        7: [ 20 ]
    };
 
    $.each( o, function( k, v ) {
        if ( [ 'blank', 'tags', 'lvl', 'hexagon', 'levels' ].indexOf( k ) !== -1 ) return;
 
        var _t = k,
            _id = 'container-' + k;
 
        $( '#options-container' ).append(
            '<div id="' + _id + '" class="container">' +
                '<div class="container-header">' + o.tags[ k ] + '</div>' +
            '</div>'
        );
 
        if ( k == 'pg' ) {
            $( '#' + _id ).append(
                '<div class="container-scroll">' +
                    '<div class="container-values" />' +
                '</div>'
            );
        } else {
            $( '#' + _id ).append( '<div class="container-values" />' );
        }
 
        $.each( v, function( i, val ) {
            var _c = ( i == 0 ) ? ' img-selected' : '';
 
            $( '#' + _id + ' .container-values' ).append(
                '<img class="img-toggler' + _c + '" src="' + c_base( _t, i ) + '" width="50" height="50" data-type="' + _t + '" data-id="' + i + '" />'
            );
        });
    });
 
    $( '#options-container' ).append(
        '<div id="container-lvl" class="container">' +
            '<div class="container-header">Уровень</div>' +
            '<div class="container-values" />' +
        '</div>'
    );
 
    for ( var i = 1; i < 22; i++ ) {
        var _i = i - 1,
            _n = ( i == 21 ) ? 'Убрать': i;
 
        $( '#container-lvl .container-values' ).append(
            '<span class="level-toggler-body">' +
                _n + '<input class="level-toggler" type="radio" value="' + _i + '"> ' +
            '</span>'
        );
    }
 
    $( '.level-toggler[value=0]' ).attr( 'checked', 'checked' );
 
    $( '.img-toggler' ).on( 'click', function() {
        var _t = $( this ).attr( 'data-type' ),
            _i = $( this ).attr( 'data-id' ),
            _p = $( this ).parents( '.container' ).attr( 'id' );
 
        $( '#' + _p + ' .img-selected' ).toggleClass( 'img-selected' );
        $( this ).addClass( 'img-selected' );
 
        switch( _t ) {
            case 'border':
                setBorder( _i );
                break;
            case 'background':
                setBG( _i );
                break;
            case 'pg':
                setPattern( _i );
                break;
            default:
                break;
        }
    });
 
    $( '.level-toggler' ).on( 'click', function() {
        var _i = $( this ).val();
        currentlvl = _i;
 
        $( '.level-toggler' ).attr( 'checked', false );
        $( this ).attr( 'checked', 'checked' );
 
        setLevel( _i );
    });
 
    hideLvl( 0 );
 
    $( '.container-header' ).on( 'click', function() {
        var _t = $( this ),
            _h = _t.hasClass( 'is-hidden' ),
            _p = _t.next();
 
        if ( _h ) {
            _p.show( 400 );
            _t.toggleClass( 'is-hidden' );
        } else {
            _p.hide( 400 );
            _t.toggleClass( 'is-hidden' );
        }
    });
 
    var canvas = document.getElementById( 'canvas_gen' ),
        mirror = document.getElementById( 'canvas_mirror' ),
        dwnbutton = document.getElementById('dwn-clanbadge'),
        context = canvas.getContext( '2d' );
 
    var img1 = new Image(), //border
        img2 = new Image(), //bg
        img3 = new Image(), //pattern
        img4 = new Image(), //level shadow
        img5 = new Image(); //level
 
    img1.crossOrigin = "anonymous";
    img2.crossOrigin = "anonymous";
    img3.crossOrigin = "anonymous";
    img4.crossOrigin = "anonymous";
    img5.crossOrigin = "anonymous";
 
    dwnbutton.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        dwnbutton.href = dataURL;
    });
 
    img1.addEventListener( 'load', loadimg2 );
    img1.src = c_base( 'border', 0 );
 
    function loadimg2() {    
        img2.addEventListener( 'load', loadimg3 );
        img2.src = c_base( 'background', 0 );
    }
 
    function loadimg3() {    
        img3.addEventListener( 'load', loadimg4 );
        img3.src = c_base( 'pg', 0 );
    }
 
    function loadimg4() {    
        img4.addEventListener( 'load', loadimg5 );
        img4.src = c_base( 'hexagon', 0 );
    }
 
    function loadimg5() {    
        img5.addEventListener( 'load', paintshield );
        img5.src = c_base( 'lvl', 0 );
    }
 
    function paintshield(){
        canvas.width = mirror.width = img1.width;
        canvas.height = mirror.height = img1.height;
 
        context.globalAlpha = 1.0;
        context.drawImage( img1, 0, 0 );
        context.drawImage( img2, 0, 0 );
        context.drawImage( img3, 0, 0 );
        context.drawImage( img4, 0, 0 );
        context.drawImage( img5, 0, 0 );
 
        img1.removeEventListener( 'load', loadimg2 );
        img2.removeEventListener( 'load', loadimg3 );
        img3.removeEventListener( 'load', loadimg4 );
        img4.removeEventListener( 'load', loadimg5 );
        img1.removeEventListener( 'load', paintshield );
        img2.removeEventListener( 'load', paintshield );
        img3.removeEventListener( 'load', paintshield );
        img5.removeEventListener( 'load', paintshield );
 
        var dataURL = canvas.toDataURL( 'image/png' );
        mirror.src = dataURL;
    }
 
    function setBorder( i ) {
        img1.addEventListener( 'load', paintshield );
        img1.src = c_base( 'border', i );
        img4.addEventListener( 'load', paintshield );
        img4.src = c_base( 'hexagon', i );
        if ( o.levels[ i ].indexOf( currentlvl ) == -1 ) {
            currentlvl = o.levels[ i ][ 0 ];
 
            $( '.level-toggler' ).attr( 'checked', false );
            $( '.level-toggler[value=' + ( currentlvl - 1 ) + ']' ).attr( 'checked', 'checked' );
 
            hideLvl( i );
            setLevel( currentlvl - 1 );
        }
    }
 
    function setBG( i ) {
        img2.addEventListener( 'load', paintshield );
        img2.src = c_base( 'background', i );
    }
 
    function setPattern( i ) {
        img3.addEventListener( 'load', paintshield );
        img3.src = c_base( 'pg', i );
    }
 
    function setLevel( i ) {
        if ( i < 20 ){
            img5.addEventListener( 'load', paintshield );
            img5.src = c_base( 'lvl', i );
        } else {
            img5.addEventListener( 'load', paintshield );
            img5.src = c_base( 'blank', null );
        }
    }
 
    function hideLvl( i ) {
        $( '.level-toggler' ).each( function() {
            var _v = parseInt( $( this ).val(), 10 ) + 1;
            if ( _v == 21 ) return;
 
            if ( o.levels[ i ].indexOf( _v ) == -1 ) {
                $( this ).parent().hide();
            } else {
                $( this ).parent().show();
            }
        });
    }
 
    function c_base( n, i ) {
        if ( n == 'blank' ) { return img_base + o.blank; }
        return img_base + o[ n ][ i ];
    }
}( jQuery );