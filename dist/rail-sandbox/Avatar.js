// ---
// @name         User Avatar Finder
// @version      1.5
// @description  Finds and adds the avatar image of a user into a template
// @author       Static Whisper
// ---
mw.loader.using(['jquery.client', 'mediawiki.base', 'mediawiki.util']).then(function() {
    'use strict';

    var cache = {};
    function addAvatar($content) {
        $content.find('.UserAvatarFetch:not(.loaded)').each(function() {
            var $this = $(this),
                username = $this.find('.avi-thisUsername').text(),
                avatar = cache[username],
                size = Number($this.find('.avi-thisSize').text()),
                link = $this.find('.avi-thisLink').text();
            if (!avatar) {
                return;
            }
            if (!isNaN(size)) {
                if (size > 150) {
                    size = 150;
                } else if (size < 16) {
                    size = 16;
                }
                avatar = avatar.replace(/\/scale-to-width-down\/\d+/, '/scale-to-width-down/' + size);
            }

            var img = $('<img>', {
                src: avatar,
                alt: username,
                style: 'vertical-align: initial; width: ' + size + 'px; height: ' + size + 'px;'
            });

            // https://stackoverflow.com/a/43467144
            function isValidHttpUrl(string) {
                var url;

                try {
                    url = new URL(string);
                } catch (_) {
                    return false;
                }

                return url.protocol === 'http:' || url.protocol === 'https:';
            }

            if (link) {
                var linkElement = $('<a>', {
                    href: isValidHttpUrl(link) ? link : mw.util.getUrl(link)
                }).append(img);

                $this.html(linkElement);
            } else {
                $this.html(img);
            }

            $this.addClass('loaded');
        });
    }

    function findAvatars($content, original) {
        if (!$content || ($content.is(mw.util.$content) && !original)) {
            return;
        }

        var avatars = $content.find('.UserAvatarFetch:not(.loaded) .avi-thisUsername')
            .map(function(_, el) {
                return $(el).text();
            })
            .toArray()
            .filter(function(el) {
                return !cache[el];
            });
        if (avatars.length > 0) {
            $.getJSON(mw.config.get('wgScriptPath') + '/api/v1/User/Details', {
                ids: avatars.join(',')
            }, function(d) {
                d.items.forEach(function(el) {
                    cache[el.name] = el.avatar;
                });
                addAvatar($content);
            });
        } else {
            addAvatar($content);
        }
    }

    mw.hook('wikipage.content').add(function(content) {
    	findAvatars(content, false);
    });
});