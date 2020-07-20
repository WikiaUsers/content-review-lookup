/**
 * This is a modified version of [[u:dev:ListAdmins/code.js]]
 * created by [[u:dev:User:Pecoes|User:Pecoes]]
 **/
 
;(function(mw, $){
    mw.loader.using(['mediawiki', 'mediawiki.util'], function(){
        mw.hook('wikipage.content').add(function($content){
            "use strict";
            var $admin_list = ($content.is('.mw-content-text') ? $content : $('.mw-content-text')).find('#admin-list'),
                Api = new mw.Api();
            if (!$admin_list.exists()) return;
            Api.get({
                action: 'query',
                list: 'allusers',
                augroup: 'sysop',
                format: 'json'
            }).done(function(data){
                if (!data.error){
                    var $elem = $('<ul class="user-list" />');
                    data.query.allusers.forEach(function(user){
                        var $li = $('<li class="user-list-item" />'),
                            $img = $('<img class="avatar" />'),
                            $user_link = $('<a href="/wiki/User:' + encodeURIComponent(user.name) + '" class="profile-link" />'),
                            $links = $('<div class="user-links" />'),
                            _links = {
                                'Talk': '/wiki/User_talk:$1',
                                'Contributions': '/wiki/Special:Contributions/$1'
                            };
                            
                        $user_link.text(user.name);
                        
                        $links.html(
                            Object.keys(_links).map(function(name){
                                var link = '<a href="' + _links[name].replace('$1', encodeURIComponent(user.name)) + '" class="user-link">' + name + '</a>';
                                return link;
                            }).join('•')
                        );
                        
                        $.ajax({
                            method: 'GET',
                            dataType: 'json',
                            url: mw.util.wikiScript('wikia'),
                            data: {
                                controller: 'UserProfilePageController',
                                method: 'renderUserIdentityBox',
                                title: 'User:' + user.name,
                                format: 'json'
                            }
                        }).done(function(data){
                            var avatar = data.user.avatar;
                            avatar = avatar.replace(/\/scale-to-width-down\/(\d+)/g, '/scale-to-width-down/60');
                            $img.attr('src', avatar);
                        });
                        
                        $elem.append(
                            $li.html([
                                $img,
                                $user_link,
                                $links
                            ])
                        );
                    });
                    
                    $admin_list.html($elem);
                }
            });
        });
    });
})(this.mediaWiki, this.jQuery);