// Создаёт списки участников со статусами (Kopcap94, Fngplg, Rendann)
!function( $, mw ) {
    var f = {},
        pn = mw.config.get( 'wgPageName' ).replace( /_/g, ' ' ),
        template = {
            excluded: [
                '*',
                'bot',
                'user',
                'autoconfirmed',
                'chatmoderator'
            ],
            standart: [
                'Администраторы',
                'Откатчики',
                'Модераторы обсуждений',
                'Модераторы контента'
            ],
            groups: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'threadmoderator',
                'rollback'
            ],
            fill: {
                'bureaucrat': [],
                'sysop': [],
                'content-moderator': [],
                'threadmoderator': [],
                'rollback': []
            },
            def: {
                'sysop': 'Администраторы',
                'rollback': 'Откатчики',
                'threadmoderator': 'Модераторы обсуждений',
                'content-moderator': 'Модераторы контента'
            },
            allusers: []
        };
 
    f.init = function($c) {
        var wikies = {};
        $c.find( '.WikiStats' ).each(function() {
            var box = $( this ),
                add_rights = box.attr( 'data-rights' ).split( /\s*,\s*/ ),
                hide_rights = box.attr( 'data-hide' ).split( /\s*,\s*/ ),
                w = box.attr( 'data-wiki' ).replace( /(https?:..|\.wikia\.com.*|\.fandom\.com.*|\.wikia\.org.*)/g, '' ),
                awiki = w.split('.'),
                wiki = encodeURIComponent(awiki.length > 1 ? awiki[1] : awiki[0]),
                lang = awiki.length > 1 ? '/' + encodeURIComponent(awiki[0]) : '';
 
            wikies[w] = $.extend(true, {}, template);
 
            $.each( add_rights, function( i, v ) {
                if ( v === "" || hide_rights.indexOf( v ) !== -1 ) return;
 
                var name = v.replace( /[^:]+\s*:\s*(.+)/, '$1' ),
                    group_name = v.replace( /([^:]+)\s*:\s*.*/, '$1' );
 
                wikies[ w ].fill[ group_name ] = [];
                wikies[ w ].def[ group_name ] = name;
                wikies[ w ].groups.push( group_name );
            });
 
            $.each( hide_rights, function( i, v ) {
                var ind = wikies[ w ].groups.indexOf( v );
                if ( ind === -1 || v === 'sysop' ) return;
 
                wikies[ w ].groups.splice( ind, 1 );
            });
 
            f.getGroupStats( w, {wiki: wiki, lang: lang}, wikies[ w ].groups.join( '|' ), $c, wikies );
        });
    };
 
    f.getGroupStats = function( id, data, g, $c, wikies ) {
        $.ajax({
            url: 'https://' + data.wiki + '.fandom.com' + data.lang +'/api.php',
            dataType: 'jsonp',
            crossDomain: true,
            type: 'GET',
            data: {
                action :'query',
                list: 'allusers',
                aulimit: '50',
                format: 'json',
				auwitheditsonly: 'true',
                auprop: 'groups',
                augroup: g
            },
            success: function( d ) {
                $.each( d.query.allusers, function( i, user ) {
                    if ( user.userid === '0' ) {
                        return false;
                    }

                    wikies[ id ].allusers.push( user.name );
 
                    $.each( user.groups, function( i, group ) {
                        if (wikies[ id ].excluded.indexOf( group ) === -1) {
                            wikies[ id ].fill[ group ].push( user.name );
                        }
                    });
                });
 
                f.createForm( id, $c, wikies );
            },
            error: function( err ) {
                f.getGroupStats( id, data, g, $c, wikies );
            }
        });
    };
 
    f.createForm = function( w, $c, wikies ) {
        $.each( wikies[ w ].fill, function( k, v ) {
            if ( k == 'bureaucrat' || v.length === 0 ) return;
            var list = [],
                title = wikies[ w ].def[ k ];
 
            $.each( v, function( i, user ) {
                var c = '';
 
                if ( k == 'sysop' && wikies[ w ].fill.bureaucrat.indexOf( user ) !== -1 ) {
                    c = ' <span class="bureaucrat" title="Этот участник - бюрократ">[б]</span>';
                }
 
                if ( pn == user ) {
                    list.push( '<strong class="selflink">' + user + '</strong>' + c );
                    return;
                }
 
                list.push( '<a class="user" href="/wiki/' + encodeURIComponent( user ) + '" data-user="' + user + '">' + user + '</a>' + c );
            });
 
            if ( wikies[ w ].standart.indexOf( title ) !== -1 ) {
                title = '<a href="/wiki/' + title + '">' + title + '</a>'; 
            }
 
            var html =
                '<tr style="display: none;">' +
                    '<td class="navbox_t">' + title + '</td>' +
                    '<td>' + list.join( ' • ' ) + '</td>' +
                '</tr>';
 
            var $target = $c.find( '.WikiStats[ data-wiki="' + w + '" ]' );
 
            if ( $target.find('.wikistats-default').length ) {
                $target = $target.find( '.wikistats-default' );
                $target.before( html );
            } else {
                $target.append( html );
            }
            $target.addClass('wss-done');
        });
 
        f.setRedLinks( w, $c, wikies );
    };
 
    f.setRedLinks = function( w, $c, wikies ) {
        $.get( mw.config.get( 'wgScriptPath' ) + '/api.php', {
            action: 'query',
            prop: 'info',
            titles: wikies[ w ].allusers.join( '|' ),
            format: 'json'
        }, function( data ) {
            $.each( data.query.pages, function( k, v ) {
                if ( typeof ( v.missing ) === 'undefined' ) return;
                $c.find( '.WikiStats[ data-wiki="' + w + '" ] .user[ data-user="' + v.title + '" ]' ).addClass( 'new' );
            });
        });
    };
 
    mw.hook('wikipage.content').add(function ($content) {
        if ( !$content.find( '.WikiStats' ).length ) return;
        f.init($content);
    });
}( jQuery, mediaWiki );