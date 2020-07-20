!function( $, mw ) {
    if ( !$( '.WikiStats' ).length ) return;

    var f = { wikies: {} };

    f.init = function() {
        $( '.WikiStats' ).each(function() {
            var box = $( this ),
                add_rights = box.attr( 'data-rights' ).split( /\s*,\s*/ ),
                hide_rights = box.attr( 'data-hide' ).split( /\s*,\s*/ ),
                w = box.attr( 'data-wiki' ).replace( /(https?:..|\.wikia\.com.*)/g, '' );

            f.wikies[ w ] = {
                standart: [
                    'Администраторы',
                    'Откатчики',
                    'Модераторы чата',
                    'Модераторы обсуждений',
                    'Модераторы контента'
                ],
                groups: [
                    'bureaucrat',
                    'sysop',
                    'content-moderator',
                    'threadmoderator',
                    'chatmoderator',
                    'rollback'
                ],
                fill: {
                    'bureaucrat': [],
                    'sysop': [],
                    'content-moderator': [],
                    'threadmoderator': [],
                    'chatmoderator': [],
                    'rollback': []
                },
                def: {
                    'sysop': 'Администраторы',
                    'rollback': 'Откатчики',
                    'chatmoderator': 'Модераторы чата',
                    'threadmoderator': 'Модераторы обсуждений',
                    'content-moderator': 'Модераторы контента'
                },
                allusers: [],
                counter: 0
            };

            $.each( add_rights, function( i, v ) {
                if ( v === "" || hide_rights.indexOf( v ) !== -1 ) return;

                var name = v.replace( /[^:]+\s*:\s*(.+)/, '$1' ),
                    group_name = v.replace( /([^:]+)\s*:\s*.*/, '$1' );

                f.wikies[ w ].fill[ group_name ] = [];
                f.wikies[ w ].def[ group_name ] = name;
                f.wikies[ w ].groups.push( group_name );
            });

            $.each( hide_rights, function( i, v ) {
                var ind = f.wikies[ w ].groups.indexOf( v );
                if ( ind === -1 || v === 'sysop' ) return;

                f.wikies[ w ].groups.splice( ind, 1 );
            });

            f.wikies[ w ].count = f.wikies[ w ].groups.length;

            $.each( f.wikies[ w ].groups, function( i, v ) {
                f.getGroupStats( w, v );
            });
        });
    };

    f.getGroupStats = function( w, g ) {
        $.ajax({
            url: 'http://' + w + '.wikia.com/api.php',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'callback',
            type: 'GET',
            data: {
                action :'query',
                list: 'allusers',
                aulimit: '50',
                format: 'json',
                augroup: g
            },
            success: function( d ) {
                $.each( d.query.allusers, function( k, user ) {
                    if ( user.id === '0' ) {
                        return false;
                    }

                    f.wikies[ w ].allusers.push( user.name );
                    f.wikies[ w ].fill[ g ].push( user.name );
                });

                f.wikies[ w ].counter = f.wikies[ w ].counter + 1;

                if ( f.wikies[ w ].counter == f.wikies[ w ].count ) {
                    f.createForm( w );
                }
            },
            error: function( err ) {
                f.getGroupStats( w, g );
            }
        });
    };

    f.createForm = function( w ) {
        $.each( f.wikies[ w ].fill, function( k, v ) {
            if ( k == 'bureaucrat' || v.length === 0 ) return;
            var list = [],
                title = f.wikies[ w ].def[ k ];

            $.each( v, function( i, user ) {
                var c = '';

                if ( k == 'sysop' && f.wikies[ w ].fill.bureaucrat.indexOf( user ) !== -1 ) {
                    c = ' <span class="bureaucrat" title="Этот участник - бюрократ">[б]</span>';
                }

                list.push( '<a class="user" href="/wiki/' + encodeURIComponent( user ) + '" data-user="' + user + '">' + user + '</a>' + c );
            });

            if ( f.wikies[ w ].standart.indexOf( title ) !== -1 ) {
                title = '<a href="/wiki/' + title + '">' + title + '</a>'; 
            }

            var html =
                '<tr style="display: none;">' +
                    '<td style="text-align: right; width: 20%; font-weight: bold;">' + title + '</td>' +
                    '<td style="text-align: center; background:white;">' + list.join( ' • ' ) + '</td>' +
                '</tr>';

            if ( $( '.WikiStats[ data-wiki="' + w + '" ] .wikistats-default' ).length ) {
                $( '.WikiStats[ data-wiki="' + w + '" ] .wikistats-default' ).before( html );
            } else {
                $( '.WikiStats[ data-wiki="' + w + '" ]' ).append( html );
            }
        });

        f.setRedLinks( w );
    };

    f.setRedLinks = function( w ) {
        $.get( '/api.php', {
            action: 'query',
            prop: 'info',
            titles: f.wikies[ w ].allusers.join( '|' ),
            format: 'json'
        }, function( data ) {
            $.each( data.query.pages, function( k, v ) {
                if ( typeof ( v.missing ) === 'undefined' ) return;
                $( '.WikiStats[ data-wiki="' + w + '" ] .user[ data-user="' + v.title + '" ]' ).addClass( 'new' );
            });
        });
    };

    $( f.init );
}( jQuery, mediaWiki );