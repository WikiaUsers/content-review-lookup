!function( $ ) {
    if ( !$( '.navbox_wrapper' ).length ) return;

    var pers_object = {},
        list = [],
        ids = {};

    $( '.navbox_content a' ).each( function() {
        var _l = $( this );

        if ( 
            _l.hasClass( 'image' ) ||
            _l.hasClass( 'image-thumbnail' ) ||
            _l.hasClass( 'new' )
        ) return;

        var _t = _l.attr( 'title' );

        list.push( _t.replace( /\s/g, '_' ) );

        _l
        .on( 'mouseover', function( _e ) {
            hoverTooltip( _l, _t, _e );
        })
        .on( 'mouseout', function() {
            $( '.hovertooltip' ).css({
                top: -100,
                left: -100,
                visibility: 'hidden'
            });
        });
    });

    $( 'body' ).append(
        '<div class="hovertooltip">' +
            '<div class="hovertooltip-body">' +
                '<div class="hovertooltip-title" />' +
                '<div class="hovertooltip-text" />' +
            '</div>' +
        '</div>'
    );

    collectPagesID( 0 );

    function collectPagesID( _i ) {
        var _a = [],
            _s = true;

        for ( var i = _i; i < _i + 50; i++ ) {
            if ( typeof list[ i ] === 'undefined' ) {
                _s = false;
                break;
            }
            _a.push( list[ i ] );
        }

        // Проверка, если следующий массив - пустой
        if ( typeof list[ i + 1 ] === 'undefined' ) _s = false;

        $.get( '/api.php', {
            action: 'query',
            titles: _a.join( '|' ),
            redirects: '',
            format: 'json'
        }, function( _r ) {
            // Объект для перенаправлений
            var _localr = {};

            // Сбор заголовков с какой статьи на какую было перенаправление,
            // чтобы потом вернуться к ней в шаблоне.
            // _localr[ на_которую ] = с_которой;
            if ( typeof _r.query.redirects !== 'undefined' ) {
                $.each( _r.query.redirects, function( i, v ) {
                    _localr[ v.to ] = v.from;
                });
            }

            $.each( _r.query.pages, function( k, v ) {
                var _t = v.title,
                    _id = v.pageid;

                // Если статья значится в перенаправлениях
                if ( typeof _localr[ _t ] !== 'undefined' ) _t = _localr[ _t ];

                // Присваиваем к id страницы название страницы из шаблона.
                ids[ _id ] = _t;
            });

            if ( _s ) {
                collectPagesID( _i + 50 );
            } else {
                collectData();
            }
        });
    }

    function collectData() {
        $.get( "http://ru.fanonsmesh.wikia.com/api/v1/Articles/Details", {
            ids: Object.keys( ids ).join( ',' ),
            abstract: 150,
            heigth: 109
        }, function( d ) {
            $.each( d.items, function( k, v ) {
                var _n = ids[ k ],
                    _t = v.abstract,
                    _i = v.thumbnail;

                pers_object[ _n ] = {
                    img: _i,
                    text: _t
                };
            });
        });
    }

    function hoverTooltip( _o, _t, _e ) {
        var _offX = _e.pageX - 175,
            _offY = _e.pageY - 160;

        if ( typeof pers_object[ _t ] === 'undefined' ) {
            $( '.hovertooltip-title' ).text( _t );
            $( '.hovertooltip-text' ).text( 'Пожауйста, подождите, информация всё ещё загружается, либо для данной статьи недоступна.' );
        } else {
            $( '.hovertooltip-title' ).text( _t );
            $( '.hovertooltip-text' )
                .text( pers_object[ _t ].text )
                .append( 
                    $( '<img />', {
                        class: 'hovertooltip-img',
                        src: pers_object[ _t ].img
                    })
                );
        }

        var _addH = $( '.hovertooltip-title' ).outerHeight( true );

        if ( _addH > 26 ) {
            _offY = _offY - ( _addH - 26 );
        }

        $( '.hovertooltip' ).css({
            top: _offY,
            left: _offX,
            visibility: 'visible'
        });
    }
}( jQuery );