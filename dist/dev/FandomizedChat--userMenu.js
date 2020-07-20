$(document).ready(function(){
    function parseDate(date, showWeekday){
        var months = 'January February March April May June July August September October November December'.split(/\s+/g),
            days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(/\s+/g),
            res = '';
        function pad(n){
            if (!isNaN(n)){
                if (n < 10){
                    return '0' + n;
                }
                return n;
            }
            return NaN;
        }
        if (typeof showWeekday !== 'undefined' && showWeekday){
            res += date.weekday + ' ';
        }
        res += months[date.mon] + ' ' + pad(date.mday) + ', ' + date.year;
        return res;
    }
    $('#ChatHeader .User img').on('click', function(event){
        if (!$('#UserMenu').length){
            var $menu = $('<nav />', {
                    'class': 'UserMenu user-menu',
                    'id': 'UserMenu'
                });
            $menu.html(function(){
                var user_data = mainRoom.model.users.findByName(
                        mw.config.get('wgUserName', wgUserName)
                    ),
                    avatar = user_data.attributes.avatarSrc,
                    editCount = user_data.attributes.editCount,
                    since = user_data.attributes.since,
                    links = {
                        'View Profile': wgServer + mw.util.wikiGetlink('User:' + mw.config.get('wgUserName', wgUserName)),
                        'User Talk': wgServer + mw.util.wikiGetlink('User talk:' + mw.config.get('wgUserName', wgUserName)),
                        'User Blog': wgServer + mw.util.wikiGetlink('User blog:' + mw.config.get('wgUserName', wgUserName)),
                        'Contributions': wgServer + mw.util.wikiGetlink('Special:Contributions/' + mw.config.get('wgUserName', wgUserName)),
                        'User Activity': '//community.wikia.com/' + mw.util.wikiGetlink('Special:UserActivity')
                    };
                if (typeof window.customMenuLinks == 'object'){
                    links = $.extend(links, window.customMenuLinks);
                }
                var $html = [
                        $('<header />', {
                            'class': 'UserMenuHeader user-menu--header',
                            'id': 'UserMenuHeader'
                        }).html([
                            $('<div />', {
                                'class': 'UserMenuAvatarWrapper user-menu--avatar-wrapper column-one',
                                html: $('<img />', {
                                    'class': 'UserMenuAvatar user-menu--avatar avatar',
                                    'src': avatar
                                })
                            }),
                            $('<div />', {
                                'class': 'UserMenuInfoWrapper user-menu-info--wrapper',
                                html: [
                                    $('<h2 />', {
                                        'class': 'UserMenuName user-menu--name username',
                                        'id': 'UserMenuName',
                                        text: mw.config.get('wgUserName', wgUserName)
                                    }),
                                    $('<h3 />', {
                                        'class': 'UserMenuStats user-menu--stats',
                                        'id': 'UserMenuStats',
                                        html: [
                                            $('<span />', {
                                                'class': 'user-menu--edits',
                                                text: editCount + ' edits'
                                            }),
                                            $('<span />', {
                                                'class': 'user-menu--since',
                                                text: 'Member since ' + parseDate(since)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ])
                    ],
                    $list = $('<ul />', {
                        'class': 'UserMenuList user-menu--list',
                        'id': 'UserMenuList',
                        html: $.map(links, function(link, item_name){
                            var $item = $('<li />', {
                                'class': 'UserMenuItem user-menu--item',
                                'data-name': item_name,
                                html: $('<a />', {
                                    'href': typeof link == 'string' ? link : '#UserMenu',
                                    'class': 'UserMenuLink user-menu--link',
                                    text: item_name
                                }).on('click', (typeof link == 'function' ? link : $.noop))
                            });
                            return $item;
                        })
                    });
                $html[$html.length] = $list;
                return $html;
            });
            $(event.target).parents('.User').append($menu);
        } else {
            $('#UserMenu').remove();
        }
    });
});