// ---
// @name         User Avatar Finder
// @version      1.4
// @description  Finds and adds the avatar image of a user into a template
// @author       Static Whisper
// ---
(function() {
    'use strict';
    var cache = {};
    function addAvatar($content) {
        $content.find('.UserAvatarFetch:not(.loaded)').each(function() {
            var $this = $(this),
                username = $this.find('.avi-thisUsername').text(),
                avatar = cache[username],
                size = Number($this.find('.avi-thisSize').text());
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
            $this.html($('<img>', {
                src: avatar,
                alt: username,
                style: 'vertical-align: initial; width: ' + size + 'px; height: ' + size + 'px;'
            })).addClass('loaded');
        });
    }
    
    function findAvatars($content, original) {
        if ($content.is(mw.util.$content) && !original) {
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
            $.getJSON('/api/v1/User/Details', {
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
    
    findAvatars(mw.util.$content, true);
    mw.hook('wikipage.content').add(findAvatars);
})();