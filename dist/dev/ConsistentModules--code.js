/**
 * 
 * @module                  ConsistentModules
 * @description             Makes Rail modules more consistent with WDS.
 * @author                  KockaAdmiralac <wikia@kocka.tech>
 * @author                  Speedit
 * @version                 1.3.2
 * @license                 CC-BY-SA 3.0
 * 
 */
(function() {
    'use strict';

    // Global scoping & double run protection
    var $rail = $('#WikiaRail');
    window.dev = window.dev || {};
    if (
        window.dev.railcm ||
        !$rail.exists() ||
        mw.config.get('wgVersion') !== '1.19.24'
    ) {
        return;
    }
    window.dev.railcm = true;

    /** 
     * Module configuration class for custom redesigns.
     * Object keys:
     *  • 'iconname' - wds icon name:
     *                 wikiadesignsystem.com/#/components/assets
     *  • 'buttons'  - button selector
     *  • 'ext'      - extension function
     * @var                 modules
     * @private
     */
    var modules = {
        '.WikiaLatestEarnedBadgesModule, .UserProfileAchievementsModule:first': {
            iconname: 'heart',
            buttons: [
                '.badges-prev',
                '.badges-next',
                '.more'
            ]
        },
        '.UserProfileAchievementsModule + .UserProfileAchievementsModule': {
            iconname: 'clipboard-small',
            buttons: [
                '.more'
            ]
        },
        '.chat-module': {
            iconname: 'comment-small'
        },
        '.CommunityCornerModule': {
            iconname: 'users-small',
            buttons: [
                '.more'
            ]
        },
        '.content-review-module': {
            iconname: 'gear-small',
            buttons: [
                '.content-review-module-submit-container button',
                '.content-review-module-test-mode button',
                '.content-review-module-help a'
            ]
        },
        '.FollowedPagesModule': {
            iconname: 'bookmark-small',
            buttons: [
                '.more'
            ],
            ext: function($module) {
                $module.find('li div').each(function() {
                    $(this).prepend(window.dev.wds.icon('pages-small'));
                });
            }
        },
        '#ForumActivityModule': {
            iconname: 'activity-small'
        },
        '#ForumRelatedThreadsModule': {
            iconname: 'tag-small'
        },
        '.HotSpotsModule': {
            iconname: 'activity-small',
            ext: function($module) {
                $module.find('.myhome-hot-spots-fire').each(function() {
                    $(this).append(window.dev.wds.icon('page'));
                });
                $module.find('li > span:only-child').each(function() {
                    $(this).prepend(window.dev.wds.icon('pages-small'));
                });
            }
        },
        '.insights-module': {
            iconname: 'dashboard-small',
            buttons: [
                '.more'
            ]
        },
        '.templatedraft-module': {
            iconname: 'bell',
            buttons: [
                '> a'
            ],
            ext: function($module) {
                var $l = $module.children('a'),
                    c = $l.attr('class');
                $l.removeClass(c).children().first().addClass(c);
            }
        },
        '.WikiaBlogListingBox': {
            iconname: 'quote-small',
            buttons: [
                '.wikia-button',
                '.more'
            ],
            ext: function($module) {
                $module.find('h2.has-icon br').replaceWith(' ');
                $module.find('.WikiaBlogListingPost').each(function() {
                    var $post = $(this);
                    $post.find('.commentslikes a')
                        .prependTo($post)
                        .append($post.find('.avatar'));
                    $post.find('.commentsbubble').attr('class', 'wds-button comments-dot');
                    $post.find('.read-more, .commentslikes').remove();
                });
            }
        },
    };

    /**
     * Script executor for module redesigns
     * @function            execute
     * @private
     */
    function execute() {
        // Module configuration iterator
        $.each(modules, function(m, c) {
            var $module = $rail.children(m);
            if (!$module.exists()) {
                return;
            }
            // Icon addition
            if (c.iconname) {
                // Fetch header and icon
                var $header =
                        !$module.hasClass('chat-module') ?
                            $module.children('h2:first') :
                            $module.find('h2.chat-headline'),
                    icon = window.dev.wds.icon(c.iconname);
                // Class fix for standard-size icons
                if (c.iconname.split('-').indexOf('small') === -1) {
                    icon.classList.add('wds-icon-small');
                }
                // Append icon
                $header.attr('class', 'has-icon').prepend(icon);
            }
            // Button redesign
            if (c.buttons) {
                // Button container creation
                var $buttons =
                    $('<div>', {
                        'class': 'rail-module-details'
                    }).appendTo($module),
                    exists = function(b) {
                        return $module.find(b).exists();
                    };
                // Button redesign loop
                var selmap = c.buttons.filter(exists);
                selmap.forEach(function(s, i) {
                    if (i >= 2) {
                        // Remove >2nd button
                        $module.find(s).remove();
                        selmap.splice(i, 1);
                    } else {
                        // Class addition
                        var $b = $module.find(s).detach();
                        $b.addClass([
                            'wds-button',
                            'wds-is-squished',
                            'wds-is-secondary'
                        ].join(' ')).removeClass([
                            'button',
                            'wikia-button',
                            'wikia-single-button',
                            'secondary'
                        ].join(' '));
                        // Remove ugly '>'
                        $b.text(function(i, text) {
                            return text.replace(' >', '');
                        });
                        // Remove image sprite
                        $b.find('img').remove();
                        // Move button position
                        $b.appendTo($buttons);
                    }
                });
                // Visual border for individual buttons
                if (selmap.length === 1) {
                    $buttons.prepend($('<div>'));
                    $buttons.append($('<div>'));
                }
            }
            // Redesign extension
            if (c.ext) {
                c.ext($module);
            }
        });
        // Class modification
        $rail
            .children('.module')
            .removeClass('module')
            .addClass('rail-module');
    }

    /**
     * Script initialiser
     * @function            init
     * @private
     */
    function init() {
        if ($rail.hasClass('loaded')) {
            execute();
        } else {
            $rail.on('afterLoad.rail', execute);
        }
    }

    // Import dependencies
    importArticle(
        {
            type: 'script',
            article: 'u:dev:WDSIcons/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:ConsistentModules.css'
        }
    );

    // Script bootloader
    mw.hook('dev.wds').add(init);

})();