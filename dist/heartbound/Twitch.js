/**
 * Name:        GoPirateSoftware
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds a sidebar module when Pirate Software is streaming
 */
(function() {
    'use strict';
    var $rail = $('#WikiaRail'), $module;
    if (window.GoPirateSoftwareLoaded || !$rail.exists()) {
        return;
    }
    window.GoPirateSoftwareLoaded = true;
    function insert() {
        var $modules = $('#top-right-boxad-wrapper, .content-review-module');
        if ($modules.exists()) {
            $module.insertAfter($modules);
        } else {
            $rail.prepend($module);
        }
    }
    function callback(data) {
        if (!data) {
            return;
        }
        $module = $('<section>', {
            'class': 'rail-module twitch-module'
        }).append(
            $('<h2>', {
                'class': 'has-icon'
            }).append(
                $('<span>', {
                    'class': 'fandom-icons icon-twitch'
                }),
                'Heartbound Livestream'
            ),
            $('<div>', {
                'class': 'twitch-module-content'
            }).append(
                $('<img>', {
                    'class': 'twitch-preview',
                    'src': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_gopiratesoftware-280x200.jpg?cb=' + Date.now()
                }),
                $('<div>', {
                    'class': 'twitch-stats'
                }).append(
                    $('<div>', {
                        'class': 'twitch-stats-title',
                        'text': data.title
                    }),
                    $('<div>', {
                        'class': 'twitch-stats-viewers',
                        'text': data.viewer_count + ' viewers'
                    })
                ),
                $('<a>', {
                    'class': 'twitch-button',
                    'href': 'https://twitch.tv/gopiratesoftware',
                    'target': '_blank',
                    'text': 'Watch'
                })
            )
        );
        if ($rail.hasClass('loaded')) {
            insert();
        } else {
            $rail.on('afterLoad.rail', insert);
        }
    }
    /**
     * CONTENT REVIEW NOTE:
     *   This just checks the stream information.
     *   It doesn't send any personal data along with it, so it cannot
     *   be used as a method of associating IP addresses with Wikia
     *   usernames like CheckUser does.
     */
    $.get('https://twitch.heartbound.wiki', {
        cb: Date.now()
    }, callback);
})();