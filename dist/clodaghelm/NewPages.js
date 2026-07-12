/**
 * @name NewPages
 * @desc Displays a list of the most recent new pages on the wiki
 * @auth [[User:ClodaghelmC]]
 */
(function(window, $, mw) {
    'use strict';

    if (window.NewPagesLoaded) return;
    window.NewPagesLoaded = true;

    /**
     * i18n helper
     * @static
     */
    var i18n = {
        /**
         * Fetches wiki messages to match the user's language.
         * @param {string} key
         * @param {string|number} [val]
         * @returns {string}
         */
        msg: function(key, val) {
            return mw.message(key, val).text();
        }
    };

    /**
     * Configuration options
     * @property {Array} namespaces
     * @property {boolean} showIcon
     */
    window.NewPages = $.extend({
        namespaces: [0],
        showIcon: true
    }, window.NewPages || {});

    /**
     * Main object
     * @static
     */
    window.NewPages.data = {
        lastData: null,

        /**
         * Initializes the script.
         */
        init: function() {
            var self = this;
            // Make sure namespaces is always an array
            if (!Array.isArray(window.NewPages.namespaces)) {
                window.NewPages.namespaces = [0];
            }
            // Fetch data once and keep it in cache
            self.fetchData();
            // Make sure the rail exists
            var $rail = $('#WikiaRail');
            if ($rail.hasClass('is-ready')) {
                self.setupPlacement();
            } else {
                $rail.on('afterLoad.rail', function() {
                    self.setupPlacement();
                });
            }
        },

        /**
         * Hooks into Placement.js once the rail is ready.
         */
        setupPlacement: function() {
            var self = this;
            mw.hook('dev.placement').add(function(placement) {
                self.inject(placement);
            });
        },

        /**
         * Injects module shell into the sticky rail.
         * Allowed per Kirkburn, but pending future policy changes.
         */
        inject: function(placement) {
            var self = this;
            // Target check
            var target = placement.custom('#wikia-recent-activity');
            if (!target.length) return;

            var section = $('<section>', {
                'class': 'rail-module new-pages-module',
                'id': 'new-pages'
            });

            var header = $('<h2>', {
                'class': 'rail-module__header' + (window.NewPages.showIcon ? ' has-icon' : ''),
                'css': { 'text-transform': 'capitalize' }
            }).append(window.NewPages.showIcon ? $('<span>', { 'class': 'wds-pages-icon' }) : '')
              .append(' ' + i18n.msg('newpages'));

            section.append(header).append('<ul class="rail-module__list activity-items"></ul>');

            // Place using Placement.js
            $('#new-pages').remove();
            $(section)[placement.type('insertBefore')](target);

            if (window.NewPages.showIcon) {
                mw.hook('dev.wds').add(function(wds) {
                    var $icon = $('.wds-pages-icon');
                    $icon.html(wds.icon('pages-small', { 'class': 'wds-icon wds-icon-small' }));
                    $icon.find('svg').css('transform', 'scaleX(-1)');
                });
            }
            // Render current cache if available
            if (self.lastData) self.render(self.lastData);
        },

        /**
         * Gets the latest pages from the wiki.
         * Limited to 5 results for a balanced
         * composition while also following
         * height limits.
         */
        fetchData: function() {
            var self = this;
            new mw.Api().get({
                action: 'query',
                list: 'recentchanges',
                rcnamespace: window.NewPages.namespaces.join('|'),
                rclimit: 5,
                rcprop: 'title|timestamp|user',
                rctype: 'new'
            }).done(function(data) {
            	// Error handling:
                // 1) Only proceed if there are actual results.
                if (data.query && data.query.recentchanges && data.query.recentchanges.length > 0) {
                    self.lastData = data;
                    self.render(data);
                } else {
                    // Remove the module if it's already in the DOM 
                    // but no pages were found.
                    $('#new-pages').remove();
                }
            // 2) Catch errors.
            }).fail(function() {
                console.warn('NewPages: Failed to load data.');
            });
        },

        /**
         * Formats UTC timestamps to user preferences.
         * @param {string} timestamp
         * @returns {string}
         */
        dateFormat: function(timestamp) {
            var date = new Date(timestamp);
            var pref = mw.user.options.get('date');
            var Y = date.getUTCFullYear();
            var m = ('0' + (date.getUTCMonth() + 1)).slice(-2);
            var d = ('0' + date.getUTCDate()).slice(-2);
            var h = ('0' + date.getUTCHours()).slice(-2);
            var i = ('0' + date.getUTCMinutes()).slice(-2);
            var s = ('0' + date.getUTCSeconds()).slice(-2);
            var time = h + ':' + i;
            var F = date.toLocaleString('default', {
                month: 'long',
                timeZone: 'UTC'
            });

            var formats = {
                'mdy': time + ', ' + F + ' ' + d + ', ' + Y,
                'dmy': time + ', ' + d + ' ' + F + ' ' + Y,
                'ymd': time + ', ' + Y + ' ' + F + ' ' + d,
                'ISO 8601': Y + '-' + m + '-' + d + 'T' + h + ':' + i + ':' + s
            };
            // Fandom default to 'dmy'
            return formats[pref] || formats['dmy'];
        },

        /**
         * Builds the module reusing classes from RC.
         * @param {Object} data
         * @todo Fix minor conflict with CommunityPageRailModule
         */
        render: function(data) {
            var $module = $('#new-pages');
            if (!$module.length) return;

            var container = $('<ul>', {
                'class': 'rail-module__list activity-items'
            });

            var now = new Date();

            data.query.recentchanges.forEach(function(page) {
                // Calculate time difference ...
                var diff = Math.floor((now - new Date(page.timestamp)) / 60000);

                var li = $('<li>', {
                    'class': 'activity-item'
                });
                li.append($('<div>', {
                    'class': 'page-title'
                }).append($('<a>', {
                    href: mw.util.getUrl(page.title),
                    text: page.title,
                    'class': 'recent-wiki-activity__page-title page-title-link'
                })));

                var details = $('<div>', {
                    'class': 'recent-wiki-activity__details edit-info'
                });
                details.append($('<a>', {
                    href: mw.util.getUrl('User:' + page.user),
                    text: page.user,
                    'class': 'recent-wiki-activity__username edit-info-user'
                }));

                // ... only show timestamp if page is less than 30 days old
                if (diff <= 43200) {
                    details.append($('<time>', {
                        'class': 'timeago recent-wiki-activity__timeago edit-info-time',
                        'datetime': page.timestamp,
                        'title': window.NewPages.data.dateFormat(page.timestamp)
                    }));
                }

                li.append(details);
                container.append(li);
            });
            // Update inner content while keeping header
            $module.find('.rail-module__list').replaceWith(container);
            // Use Fandom TimeAgo to handle localization and live updates
            if ($.fn.timeago) {
                $('.timeago').timeago();
            }
        }
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function() {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:WDSIcons/code.js'
            ]
        });

        // Wait for local messages to load before initializing
        new mw.Api().loadMessagesIfMissing(['newpages']).done(function() {
            window.NewPages.data.init();
        });
    });
}(this, jQuery, mediaWiki));