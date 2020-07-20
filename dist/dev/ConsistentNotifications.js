/**
 * 
 * @module                  ConsistentModules
 * @description             Makes threaded notifications consistent with WDS.
 * @author                  Speedit
 * @version                 1.2.2
 * @license                 CC-BY-SA 3.0
 * 
 */
require(['jquery', 'wikia.window', 'wikia.nirvana', 'ext.wikia.design-system.loading-spinner'], function($, window, nirvana, Spinner) {
    'use strict';
    // Script variables
    var conf = mw.config.get([
        'wgCityId',
        'skin'
    ]);
    // Double-run protection
    window.dev = window.dev || {};
    if ((window.dev || {}).consistentnotifications) {
        return;
    }
    (window.dev = window.dev || {}).consistentnotifications = true;
    /**
     * Main ConsistentNotifications class.
     * @class cn
     */
    var cn = {};
    /**
     * Threaded notifications dropdown.
     * @member {jQuery} $dropdown
     */
    cn.$dropdown = $('.wds-global-navigation #notificationsEntryPoint');
    /**
     * Threaded notifications bubble.
     * @member {jQuery} $bubble
     */
    cn.$bubble = cn.$dropdown.find('.bubbles');
    /**
     * Threaded notifications menu counter.
     * @member {jQuery} $counter
     */
    cn.$counter = cn.$dropdown.find('.notifications-count');
    /**
     * Threaded notifications content.
     * @member {jQuery} $content
     */
    cn.$content = cn.$dropdown.find('#notifications');
    /** 
     * Threaded notifications cache.
     * @member {jQuery} $cache
     */
    cn.$cache = $('<ul>', {
        id: 'consistentNotificationsCache',
        class: 'cn-entrypoint__cache'
    });
    /** 
     * Threaded notifications data.
     * @member {Array} data
     */
     cn.data = [];
    /**
     * ConsistentNotifications initialiser.
     * @method init
     */
    cn.init = function() {
        // Replace threaded notif dropdown id
        cn.$dropdown.attr('id', 'cn-entrypoint');
        // Override threaded notifications UI
        cn.$content.replaceWith(cn.ui.render({
            type: 'div',
            attr: {
                id: 'notifications',
                class: [
                    'wds-dropdown__content',
                    'wds-is-right-aligned',
                    'wds-notifications__dropdown-content'
                ].join(' ')
            },
            children: [
                {
                    type: 'div',
                    attr: {
                        id: 'cn-entrypoint_mark-all-as-read',
                        class: 'wds-notifications__mark-all-as-read-button'
                    },
                    events: {
                        click: cn.markread
                    },
                    children: [{
                        type: 'a',
                        attr: {
                            class: 'wds-notifications__mark-all-as-read'
                        },
                        text: mw.messages.get('notifications-mark-all-as-read')
                    }]
                },
                {
                    type: 'p',
                    attr: {
                        class: 'wds-notifications__zero-state wds-is-hidden'
                    },
                    text: mw.messages.get('notifications-no-notifications-message')
                },
                {
                    type: 'ul',
                    attr: {
                        class: [
                            'wds-notifications__notification-list',
                            'wds-list wds-has-lines-between'
                        ].join(' '),
                        id: 'cn-entrypoint__list'
                    },
                    children: [{
                        type: 'li',
                        attr: {
                            class: 'wds-is-hidden',
                            id: 'on-site-notifications-loader'
                        },
                        html: (function() {
                            // Class fix for WDS spinner
                            var $s = $((new Spinner(14, 2)).html
                                .replace('wds-block', 'wds-spinner__block')
                                .replace('wds-path', 'wds-spinner__stroke'));
                            // Stroke fix for WDS spinner
                            $s.find('circle').attr('stroke-width', '2');
                            // Return spinner as HTMLString
                            return $s.prop('outerHTML');
                        }())
                    }]
                }
            ]
        }));
        // Assigning elements as members
        $.extend(cn, {
            /** 
             * Threaded notifications content.
             * @member {jQuery} $content
             * @memberof cn
             */
            $content: cn.$dropdown.find('#notifications'),
            /** 
             * Zero notification indicator.
             * @member {jQuery} $zero
             * @memberof cn
             */
            $markread: cn.$dropdown.find('#cn-entrypoint_mark-all-as-read'),
            /** 
             * Zero notification indicator.
             * @member {jQuery} $zero
             * @memberof cn
             */
            $zero: cn.$dropdown.find('.wds-notifications__zero-state'),
            /** 
             * Threaded notification list.
             * @member {jQuery} notifs
             * @memberof cn
             */
            $notifs: cn.$dropdown.find('#cn-entrypoint__list'),
            /** 
             * ConsistentNotifications spinner.
             * @member {jQuery} $spinner
             * @memberof cn
             */
            $spinner: cn.$dropdown.find('#on-site-notifications-loader')
        });
        // Override threaded notifications UI
        cn.$dropdown.off('mouseenter').on('mouseenter', cn.load);
    };
    /**
     * ConsistentNotifications loader.
     * Is initialised on any mouse interation with notifications. 
     * @method load
     */
    cn.load = function() {
        // Load indicator
        cn.$spinner.removeClass('wds-is-hidden');
        cn.$zero.addClass('wds-is-hidden');
        // Controller query
        var data = cn.params();
        nirvana.sendRequest({
            controller: 'WallNotificationsExternalController',
            method:     'getUpdateCounts',
            format:     'json',
            type:       'GET',
            data:       data,
            callback:   cn.fetch
        });
    };
    /**
     * Threaded notification data callback.
     * Updates counter and fetches per-wiki notifications.
     * @method fetch
     * @param {Object} d WallNotificationsExternalController 'getUpdateCounts'
     */
    cn.fetch = function(d) {
        if (!d.status) {
            return;
        }
        // Update bubble count
        if (!d.count) {
            cn.$bubble.removeClass('show');
            cn.$counter.empty();
        } else {
            cn.$bubble.addClass('show');
            cn.$counter.text(d.count);
        }
        // Clear existing notifications list
        cn.$notifs.children(':not(#on-site-notifications-loader)').remove();
        // Cache validity test (notification count)
        if (d.count === cn.data.filter(function(d) {
            return !d.read
        }).length && cn.ready) {
            // Render if there are no new notifications
            cn.render(cn.data);
        } else {
            // Reset notification cache and count
            cn.data = [];
            cn.$cache.empty();
            cn.count = d.count;
            cn.$cache.append($(d.html).find('.notifications-for-wiki'));
            // Fetching per-wiki notifications
            cn.$cache.children().each(function() {
                var id = $(this).attr('data-wiki-id'),
                    cw = (id === conf.wgCityId) ? '0' : '1',
                    data = $.extend({
                        wikiId: id,
                        isCrossWiki: cw
                    }, cn.params());
                nirvana.sendRequest({
                    controller: 'WallNotificationsExternalController',
                    method:     'getUpdateWiki',
                    type:       'GET',
                    data:       data,
                    callback:   $.proxy(cn.wiki, { $wiki: $(this), id: id })
                });
            });
        }
    };
    /**
     * Threaded notification wiki data method.
     * Fetches data, caches it and handles final render.
     * @method wiki
     * @param {Object} d WallNotificationsExternalController 'getUpdateWiki'
     * @this {Object} wiki element & id
     */
    cn.wiki = function(d) {
        // Restrict caching to valid notification data
        if (!d.status || !d.html.length) {
            return;
        } else if (d.html.indexOf('notification empty') > -1) {
            // Empty the wiki cache list
            this.$wiki.find('.notifications-for-wiki-list').empty();
        } else {
            // Store data in the DOM
            this.$wiki.find('.notifications-for-wiki-list').html($(d.html));
            // Notification data extraction
            cn.data = [].slice.call(cn.$cache.find('.notification:not(.empty)'))
                .map(cn.serializer)
                .sort(cn.chronological);
        }
        // Notification rendering
        if (!cn.$cache.find('.empty').exists()) {
            // Admin notification check
            var a = cn.data.filter(function(n) {
                return n.type === 'admin-notification';
            }).map(function(n) {
                return n.actor.name;
            });
            if (!a.length) {
                // Render if negative
                cn.render(cn.data);
            } else {
                // Retrieve avatar data
                nirvana.getJson('UserApi', 'getDetails', { ids: a.join(',') }, function(d) {
                    // Build admin avatar cache
                    var av = {};
                    $.each(d.items, function(i, u) {
                        av[u.name] = u.avatar.replace(/\d+$/, '50');
                    });
                    // Amend admin avatar data
                    $.each(cn.data, function(i, n) {
                        if (a.indexOf(n.actor.name) > -1) {
                            cn.data[i].actor.img = av[n.actor.name];
                        }
                    });
                    // Post-caching render
                    cn.render(cn.data);
                });
            }
        }
    };
    /**
     * Consistent notification renderer.
     * Accepts data from serialized notification data cache.
     * @method render
     * @param {Array} d data cache (cn.data) 
     */
    cn.render = function(d) {
        cn.ready = cn.ready || true;
        cn.$spinner.addClass('wds-is-hidden');
        if (!d.length) {
            cn.$zero.removeClass('wds-is-hidden');
            cn.$markread.addClass('wds-is-hidden');
        } else {
            if (!cn.count) {
                cn.$markread.addClass('wds-is-hidden');
            } else {
                cn.$markread.removeClass('wds-is-hidden');
            }
            cn.$notifs.append(d.map(function(n) {
                return cn.ui.render(cn.view(n));
            }));
        }
    };
    /**
     * Threaded notification data serializer.
     * Extracts data from wall notifications cache.
     * @method serializer
     * @param {jQuery} n notification element
     * @returns {Object} notification data
     */
    cn.serializer = function(n) {
        var $n = $(n);
        return {
            community: {
                id: $n.closest('.notifications-for-wiki').data('wiki-id'),
                name: $n.closest('.notifications-for-wiki')
                    .find('.notifications-wiki-header').text().trim()
            },
            when: $n.find('time').attr('datetime'),
            actor: {
                name: (function() {
                    var highlightRgx = new RegExp(cn.i18n.msg('highlight-regex', '([\\s\\S]+)').plain());
                    return $n.hasClass('admin-notification') ?
                        $n.find('.notification-message p').text()
                            .match(highlightRgx)[1] :
                        $n.find('.avatars img').attr('alt');
                }()),
                img: $n.find('.avatars img').attr('src')
            },
            read: $n.hasClass('read'),
            uri: $n.children('a').attr('href'),
            title: $n.find('h4').text(),
            type: (function() {
                if ($n.hasClass('admin-notification')) {
                    return 'admin-notification';
                } else if (
                    $n.children('a').attr('href')
                        .split('/').slice(-1)[0].indexOf('#') > -1
                ) {
                    return 'thread-reply';
                } else {
                    return 'thread-creation';
                }
            }())
        };
    };
    /**
     * Threaded notification chronological sorter.
     * @method chronological
     * @param {Object} a notification object
     * @param {Object} b notification object
     */
    cn.chronological = function(a, b) {
        var d = {
            a: new Date(a.when).getTime(),
            b: new Date(b.when).getTime()
        };
        return d.b - d.a;
    };
    /**
     * Consistent notification card renderer.
     * @method view
     * @param {Object} n notification data
     * @returns {Object} UI-js notification card
     */
    cn.view = function(n) {
        return {
            type: 'li',
            attr: {
                class: n.read ?
                    'wds-notification-card' :
                    'wds-notification-card wds-is-unread',
                'data-type': n.type,
                'data-uri': n.uri
            },
            children: [{
                type: 'a',
                attr: {
                    class: 'wds-notification-card__outer-body',
                    href: n.uri
                },
                children: [
                    {
                        type: 'div',
                        attr: {
                            class: 'wds-avatar',
                            title: n.actor.name
                        },
                        children: [{
                            type: 'img',
                            attr: {
                                class: 'wds-avatar__image',
                                src: n.actor.img
                            }
                        }]
                    },
                    {
                        type: 'div',
                        attr: {
                            class: 'wds-notification-card__body',
                        },
                        children: [
                            {
                                type: 'p',
                                attr: {
                                    class: 'wds-notification-card__text'
                                },
                                html: cn.i18n.msg(n.type, n.actor.name, n.title).parse()
                            },
                            {
                                type: 'ul',
                                attr: {
                                    class: 'wds-notification-card__context-list'
                                },
                                children: cn.context(n)
                            }
                        ]
                    }
                ]
            }]
        };
    };
    /**
     * Threaded notification chronological sorter.
     * @method context
     * @param {Object} n notification data
     * @returns {Array} UI-js notification context list
     */
    cn.context = function(n) {
        return [
            {
                type: 'li',
                attr: {
                    class: 'wds-notification-card__context-item'
                },
                text: $.timeago(n.when)
            },
            {
                type: 'li',
                attr: {
                    class: 'wds-notification-card__context-separator'
                },
                text: '\u00B7'
            },
            {
                type: 'li',
                attr: {
                    class: 'wds-notification-card__context-item wds-notification-card__community'
                },
                text: n.community.name
            }
        ];
    };
    /**
     * Threaded notification "mark all as read" handler
     * @method markread
     */
    cn.markread = function() {
        nirvana.sendRequest({
            controller: 'WallNotificationsExternalController',
            method: 'markAllAsRead',
            format: 'json',
            data: {
                forceAll: 'FORCE'
            },
            callback: $.proxy(function(data) {
                if (!data.status) {
                    return;
                }
                cn.$bubble.removeClass('show');
                cn.$counter.empty();
                cn.$notifs.find('.wds-notification-card')
                    .removeClass('wds-is-unread');
                cn.$markread.addClass('wds-is-hidden');
            })
        });
    };
    /**
     * Parameter utility
     * @method params
     * @returns {Object} query string parameters
     */
    cn.params = function() {
        var data = {},
            qs = Wikia.Querystring();
        ['useskin', 'uselang'].forEach(function(u) {
            if (qs.getVal(u)) {
                data[u] = qs.getVal(u);
            }
        });
        return data;
    };
    /**
     * I18n message handling
     * @member {Object} i18n
     */
    cn.i18n = {
        /**
         * Message & utility loader
         * @method handler
         * @param {Object} i18no i18n library
         */
        handler: function(i18no) {
            i18no.loadMessages('ConsistentNotifications').done(cn.i18n.store);
        },
        /**
         * Message data handler
         * @method store
         * @param {Object} i18n message utilities
         */
        store: function(i18n) {
            // Cache our msg data, utils
            $.extend(cn.i18n, i18n);
            // Message loading done
            cn.i18n.$loaded.resolve(cn.i18n);
        },
        /**
         * Load event
         * @member {Object} $loaded
         */
        $loaded: $.Deferred()
    };
    /**
     * UI library
     * @member {Object} ui
     */
    cn.ui = {
        /**
         * WDS utility handler
         * @method handler
         * @param {Function} ui UI library
         */
        handler: function(ui) {
            // Cache UI utility
            cn.ui.render = ui;
            // Asset loading done
            cn.ui.$loaded.resolve(cn.ui);
        },
        /**
         * Load event
         * @member {Object} $loaded
         */
        $loaded: $.Deferred()
    };
    // Import dependencies
    $.each({
        'i18n': 'u:dev:I18n-js/code.js',
        'ui': 'u:dev:UI-js/code.js'
    }, function(l, s) {
        // Import scripts
        if (!window.dev.hasOwnProperty(l)) {
            importArticles({ type: 'script', article: s });
        }
        // Fetch dependencies
        mw.hook('dev.' + l).add(cn[l].handler);
    });
    // Script bootloader
    $(importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:ConsistentNotifications.css'
    })).load(function() {
        $.when(cn.i18n.$loaded, cn.ui.$loaded).then(cn.init);
    });
});