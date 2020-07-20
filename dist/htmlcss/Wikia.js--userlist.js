;(function(mw, $){
    var $list = $('div.userlist');
    if (!$list.length) return;
    $(document).ready(function(){
        $list.each(function(){
            var $l = $(this),
                group = (typeof $.fn.data !== 'undefined') ? $l.data('group') : $l.attr('data-group'),
                avatar_size = (typeof $.fn.data !== 'undefined') ? $l.data('avatar-size') : $l.attr('data-avatar-size') || 100,
                $user_list = $('<nav />', {
                    'class': 'UserList user-portal'
                });
            if (group == 'admin'){
                group = 'sysop';
            }
            
            mw.loader.using('mediawiki.api').then(function(){
                var $user_list = $('<nav />', {
                        'class': 'UserListContainer user-portal'
                    }),
                    Api = new mw.Api();
                Api.get({
                    action: 'query',
                    list: 'allusers',
                    augroup: group,
                    format: 'json'
                }).done(function(data){
                    var $list = $('<ul />', {
                        'class': 'UserList user-list'
                    });
                    $list.html($.map(data.query.allusers, function(u){
                        var $li = $('<li />', {
                                'class': 'user-item'
                            }),
                            name = u.name;
                        $li.attr('data-user', name);
                        $li.html(function(){
                            var $avatar = $('<img />', {
                                    'class': 'user-avatar avatar'
                                }),
                                $name = $('<span />', {
                                    'class': 'user-name username',
                                    html: name
                                }),
                                $l = $('<a />', {
                                    'class': 'user-link userlink',
                                    'href': '/wiki/User:' + encodeURIComponent(name)
                                });
                            $.ajax({
                                method: 'GET',
                                dataType: 'json',
                                url: mw.util.wikiScript('wikia'),
                                data: {
                                    controller: 'UserProfilePageController',
                                    method: 'renderUserIdentityBox',
                                    title: 'User:' + name,
                                    format: 'json'
                                }
                            }).done(function(d){
                                var avatar_src = null;
                                if (!d.error){
                                    avatar_src = d.user.avatar.replace(/\/scale-to-width-down\/(\d)/, '/scale-to-width-down/' + avatar_size);
                                } else {
                                    avatar_src = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/' + avatar_size;
                                }
                                $avatar.attr('src', avatar_src);
                            }).fail(function(e){
                                var avatar_src = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/' + avatar_size;
                                $avatar.attr('src', avatar_src);
                            });
                            
                            $l.html([$avatar, $name]);
                            return $l;
                        });
                        return $li;
                    }));
                    $user_list.html($list);
                });
                $list.replaceWith($user_list);
            });
        });
    });
})(this.mediaWiki, this.jQuery);