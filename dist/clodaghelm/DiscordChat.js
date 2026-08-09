/**
 * @name DiscordChat
 * @desc Based on the original script, but tweaked to show apx.
 *       server metrics
 * @auth [[User:ClodaghelmC]]
 * @orig [[w:c:dev:DiscordChat]]
 *       [[w:c:dev:User:DuckeyD]] [[w:c:dev:User:KockaAdmiralac]]
 */
(function (window, $, mw) {
    'use strict';

    if (window.DiscordChatLoaded) return;
    window.DiscordChatLoaded = true;
    
    var configPage = 'MediaWiki:Custom-DiscordChat.json';
    var cacheDuration = 10 * 60 * 1000; // 10 minutes

    /**
     * Default config settings.
     * @constant
     */
    var defaultConfig = {
        id: null,
        labels: {
            header: 'Community Chat',
            join: 'Join Chat'
        }
    };

    window.DiscordChat = {
        ready: false,
        config: null,
        data: null,

        /**
         * Randomizes the order of the members array to avoid showing
         * the same five avatars every single time.
         * @param {Array} a Array of user objects
         */
        shuffleAvatars: function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i]; a[i] = a[j]; a[j] = x;
            }
        },

        /**
         * Merges parsed config over the default config.
         * @param {Object} parsed Parsed JSON config
         * @returns {Object} Merged config object
         */
        mergeConfig: function (parsed) {
            var cfg = $.extend(true, {}, defaultConfig, parsed || {});
            return cfg;
        },

        /**
         * Fetches config settings from configPage.
         * @param {Function} callback receiving the merged config
         */
        fetchConfig: function (callback) {
            var api = new mw.Api();

            api.get({
                action: 'query',
                titles: configPage,
                prop: 'revisions',
                rvprop: 'content',
                rvslots: 'main',
                formatversion: 2
            }).then(function (data) {
                var cfg = null;

                try {
                    var page = data.query.pages[0];
                    var content = page.revisions[0].slots.main.content;
                    cfg = JSON.parse(content);
                } catch (e) {
                    mw.log.warn('[DiscordChat] Could not load/parse ' + configPage + ', using defaults.', e);
                }

                callback(window.DiscordChat.mergeConfig(cfg));
            }).catch(function () {
                mw.log.warn('[DiscordChat] Config page fetch failed, using defaults.');
                callback(window.DiscordChat.mergeConfig(null));
            });
        },

        /**
         * Fetches invite data from Discord API.
         * Cached for 10 min to avoid hitting Discord's API on every page load.
         * @param {String} serverId Discord server ID
         * @param {Function} callback Callback function receiving widget data
         */
        fetchDiscordData: function (serverId, callback) {
            var cacheKey = 'DiscordChat_data_' + serverId;

            try {
                var cached = JSON.parse(localStorage.getItem(cacheKey));
                if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
                    callback(cached.data);
                    return;
                }
            } catch (e) {
                // 
            }

            $.get('https://discord.com/api/guilds/' + serverId + '/widget.json?_=' + Date.now())
                .done(function (widgetData) {
                    var inviteCode = widgetData.instant_invite.split('/').pop();

                    $.get('https://discord.com/api/v9/invites/' + inviteCode + '?with_counts=true')
                        .done(function (inviteData) {
                            widgetData.approx_members = inviteData.approximate_member_count;
                            widgetData.approx_online = inviteData.approximate_presence_count;

                            // Cache to avoid extra API requests
                            try {
                                localStorage.setItem(cacheKey, JSON.stringify({
                                    timestamp: Date.now(),
                                    data: widgetData
                                }));
                            } catch (e) {
                                // 
                            }

                            callback(widgetData);
                        })
                        .fail(function () {
                            mw.log.warn('[DiscordChat] Invite lookup failed.');
                        });
                })
                .fail(function () {
                    mw.log.warn('[DiscordChat] Widget fetch failed. Is the widget enabled for this server?');
                });
        },

        /**
         * Initializes everything.
         */
        init: function () {
            window.DiscordChat.ready = true;

            window.DiscordChat.fetchConfig(function (cfg) {
                window.DiscordChat.config = cfg;

                if (!cfg.id) {
                    mw.log.warn('[DiscordChat] No "id" set in ' + configPage + ', aborting.');
                    return;
                }

                window.DiscordChat.fetchDiscordData(cfg.id, function (widgetData) {
                    window.DiscordChat.data = widgetData;

                    var $rail = $('#WikiaRail');
                    if (!$rail.length) return;

                    if ($rail.hasClass('loaded') || $rail.hasClass('is-ready')) {
                        window.DiscordChat.placement();
                    } else {
                        $rail.on('afterLoad.rail', window.DiscordChat.placement);
                    }
                });
            });
        },

        /**
         * Add commas to big numbers.
         */
        formatWithCommas: function (num) {
            return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        /**
         * Builds the modal for online members.
         * @returns {String} HTML string of the grid
         */
        buildMembersList: function () {
            var data = window.DiscordChat.data;
            var members = data.members || [];
            var onlineCount = data.approx_online || members.length;

            var html = '<div class="DiscordChat__memberGrid">';
            for (var i = 0; i < members.length; i++) {
                var m = members[i];
                html += '<div class="DiscordChat__memberGrid-item" data-status="' + mw.html.escape(m.status) + '">' +
                            '<img src="' + mw.html.escape(m.avatar_url) + '" width="32" height="32" loading="lazy">' +
                            '<span class="DiscordChat__memberGrid-tooltip">' + mw.html.escape(m.nick || m.username) + '</span>' +
                        '</div>';
            }
            html += '<span class="DiscordChat__badge DiscordChat__memberGrid-online">+' +
                        window.DiscordChat.formatWithCommas(onlineCount) +
                    '</span>';
            html += '</div>';
            return html;
        },

        /**
         * Opens the modal for online members.
         */
        openMembersModal: function () {
            if (window.DiscordChat._usersModal) {
                window.DiscordChat._usersModal.show();
                return;
            }

            mw.hook('dev.modal').add(function (modal) {
                if (window.DiscordChat._usersModal) {
                    window.DiscordChat._usersModal.show();
                    return;
                }
                

                var data = window.DiscordChat.data;
                window.DiscordChat._usersModal = new modal.Modal({
                    content: window.DiscordChat.buildMembersList(),
                    id: 'DiscordChat-members',
                    size: 'medium',
                    title: mw.html.escape(data.name),
                    buttons: [
                        {
                            text: 'Close',
                            event: 'close'
                        }
                    ],
                    events: {
                        join: function () {
                            if (data.instant_invite) {
                                window.open(data.instant_invite, '_blank', 'noopener,noreferrer');
                            }
                        }
                    }
                });
                window.DiscordChat._usersModal.create();

                // Tooltip behavior that mimics Discord's
                var $modalElem = $('#DiscordChat-members');
                if ($modalElem.length) {
                    $modalElem.on('mouseenter', '.DiscordChat__memberGrid-item', function () {
                        var $item = $(this);
                        var rect = $item[0].getBoundingClientRect();
                        var modalRect = $item.closest('.DiscordChat__memberGrid')[0].getBoundingClientRect();

                        if (rect.right + 140 > modalRect.right) {
                            $item.addClass('is-flipped');
                        } else {
                            $item.removeClass('is-flipped');
                        }
                    });
                }

                window.DiscordChat._usersModal.show();
            });
        },

        /**
         * Discord icon used in a couple spots so it's its own fn.
         * @returns {jQuery} Icon element
         */
        buildIcon: function () {
            return $('<span>', {
                'class': 'wds-icon wds-icon-small DiscordChat__icon',
                'id': 'dev-wds-icons-discord'
            });
        },

        /**
         * Builds the module DOM.
         * @returns {jQuery}
         */
        buildModule: function () {
            var data = window.DiscordChat.data;
            var members = data.members || [];
            window.DiscordChat.shuffleAvatars(members);

            var avatarContainer = $('<div class="wds-avatar-stack"></div>');
            var appended = 0, i = 0;
            while (appended < 5 && i < members.length) {
                if (!members[i].bot) {
                    avatarContainer.append(
                        '<span class="wds-avatar" data-status="' + mw.html.escape(members[i].status) + '">' +
                            '<img class="wds-avatar__image" src="' + mw.html.escape(members[i].avatar_url) + '" title="' + mw.html.escape(members[i].username) + '" loading="lazy">' +
                        '</span>'
                    );
                    appended++;
                }
                i++;
            }

            var totalMembers = data.approx_members || members.length;
            var remaining = totalMembers - appended;
            if (remaining > 0) {
                var $badge = $('<a>', {
                    'class': 'DiscordChat__badge',
                    href: '#',
                    text: '+' + window.DiscordChat.formatWithCommas(remaining)
                }).on('click', function (e) {
                    e.preventDefault();
                    window.DiscordChat.openMembersModal();
                });
                avatarContainer.append($badge);
            }

            var labels = window.DiscordChat.config.labels;
            var headerLabel = ' ' + (labels.header || defaultConfig.labels.header).trim();
            var joinLabel = labels.join || defaultConfig.labels.join;

            var $section = $('<section class="rail-module DiscordChat"></section>');
            var $header = $('<h2 class="rail-module__header has-icon"></h2>')
                .append(window.DiscordChat.buildIcon())
                .append(mw.html.escape(headerLabel));
            var $stats = $('<div class="DiscordChat__wrapper__statistics"></div>')
                .append(avatarContainer);
            var $join = $('<a class="DiscordChat__button wds-button wds-is-secondary" target="_blank"></a>')
                .attr('href', data.instant_invite)
                .attr('data-label', joinLabel)
                .append(window.DiscordChat.buildIcon());
            var $wrapper = $('<div class="DiscordChat__wrapper"></div>').append($stats).append($join);

            $section.append($header).append($wrapper);
            return $section;
        },

        /**
         * Injects the module into the rail.
         */
        placement: function () {
            mw.hook('dev.placement').add(function (placement) {
                placement.script('Custom-DiscordChat');
        
                var $anchor = $('#rail-boxad-wrapper');
                if (!$anchor.length) return;
        
                var $section = window.DiscordChat.buildModule();
        
                // Helper to keep DiscordChat below
                // the ad, but above ARM.
                function placeModule() {
                    var $arm = $anchor.nextAll('.railModule[data-add-rail-module-page], .rail-module[data-add-rail-module-page]').first();
                    if ($arm.length) {
                        $section.insertBefore($arm);
                    } else {
                        $section.insertAfter($anchor);
                    }
                }
        
                // First attempt
                placeModule();
        
                // If ARM finishes late, reassert
                // DiscordChat's position above ARM.
                mw.hook('AddRailModule.module').add(function () {
                    placeModule();
                });
        
                mw.hook('dev.wds').add(function (wds) {
                    wds.render('.DiscordChat');
                });
        
                mw.hook('DiscordChat.added').fire($section);
            });
        }
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:WDSIcons/code.js',
                'u:dev:MediaWiki:Modal.js'
            ]
        }, {
            type: 'style',
            articles: [
                'u:clodaghelm:MediaWiki:DiscordChat.css'
            ]
        });

        if (window.DiscordChat && !window.DiscordChat.ready) {
            window.DiscordChat.init();
        }
    });

}(this, jQuery, mediaWiki));