// ---
// @name         User Avatar Finder
// @version      1.5
// @description  Finds and adds the avatar image of a user into a template
// @author       Tsukinyama
// ---
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
    'use strict';

    var cache = {};

    // https://stackoverflow.com/a/43467144
    function isValidHttpUrl(string) {
        try {
            var url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    function addAvatar(_, element) {
        var $element = $(element);
        var username = $element.find('.avi-thisUsername').text();
        var avatar = cache[username];
        if (!avatar) {
            console.error('[UAF] Cannot find avatar for', username);
            return;
        }

        var size = Number($element.find('.avi-thisSize').text());
        var link = $element.find('.avi-thisLink').text();
        if (!isNaN(size)) {
            if (size > 150) {
                size = 150;
            } else if (size < 16) {
                size = 16;
            }
            avatar = avatar.replace(
                /\/thumbnail\/width\/\d+\/height\/\d+/,
                '/thumbnail/width/' + size + '/height/' + size
            );
        }

        var $avatar = $('<img>', {
            src: avatar,
            alt: username,
            css: {
                'height': size + 'px',
                'object-fit': 'cover',
                'vertical-align': 'initial',
                'width': size + 'px'
            }
        });

        if (link) {
            $avatar = $('<a>', {
                href: isValidHttpUrl(link) ? link : mw.util.getUrl(link)
            }).append($avatar);
        }
        $element
            .html($avatar)
            .addClass('loaded');
    }

    function addAvatars($content) {
        $content
            .find('.UserAvatarFetch:not(.loaded)')
            .each(addAvatar);
    }

    function getUserIds(users) {
        return new mw.Api().get({
            action: 'query',
            formatversion: 2,
            list: 'users',
            ususers: users
        }).then(function(data) {
            return data.query.users.map(function(user) {
                return user.userid;
            });
        });
    }

    function getUserAvatars(userIds) {
        var scriptPath = mw.config.get('wgScriptPath');
        return $.getJSON(scriptPath + '/api/v1/User/Details', {
            ids: userIds.join(',')
        }).then(function(data) {
            return data.items;
        });
    }

    function findAvatars($content) {
        if (!$content) {
            return;
        }

        var avatars = $content
            .find('.UserAvatarFetch:not(.loaded) .avi-thisUsername')
            .map(function(_, el) {
                return $(el).text();
            })
            .toArray()
            .filter(function(el) {
                return !cache[el];
            });
        if (avatars.length > 0) {
            // TODO: Over 50 user avatars per page is almost certainly not
            // going to work - implement some batching.
            getUserIds(avatars)
                .then(getUserAvatars)
                .then(function(users) {
                    users.forEach(function(user) {
                        cache[user.name] = user.avatar;
                    });
                    addAvatars($content);
                });
        } else {
            addAvatars($content);
        }
    }

    mw.hook('wikipage.content').add(findAvatars);
});