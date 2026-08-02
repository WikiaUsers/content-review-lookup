/**
 * @name DiscordChat
 * @desc Based on the original script, but tweaked to show apx.
 *       server metrics; labels are pulled from system messages
 * @auth [[User:ClodaghelmC]]
 * @orig [[w:c:dev:DiscordChat]]
 *       [[w:c:dev:User:DuckeyD]], [[w:c:dev:User:KockaAdmiralac]]
 */

(function (window, $, mw) {
    'use strict';

    if (window.DiscordChatLoaded) return;
    window.DiscordChatLoaded = true;

    window.DiscordChat = {
        ready: false,
        messages: {},
        data: null,

        display: function (input) {
            var val = (input || '').trim().toLowerCase();
            switch (val) {
                case 'combine': return 'is-combined';
                case 'label': return 'is-label';
                case 'bullet':
                default: return 'is-bullet';
            }
        },

        countFormat: function (num) {
            if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
            return num;
        },

        shuffleAvatars: function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i]; a[i] = a[j]; a[j] = x;
            }
        },

        init: function () {
            window.DiscordChat.ready = true;
            var api = new mw.Api();

            api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: [
                    'Custom-DiscordChat-id',
                    'Custom-DiscordChat-header-label',
                    'Custom-DiscordChat-join-label',
                    'Custom-DiscordChat-online-label',
                    'Custom-DiscordChat-members-label',
                    'Custom-DiscordChat-display'
                ].join('|'),
                uselang: 'content',
                maxage: 300,
                smaxage: 300
            }).then(function (data) {
                if (data.error) return;

                data.query.allmessages.forEach(function (message) {
                    if (message['*']) {
                        window.DiscordChat.messages[message.name] = mw.html.escape(message['*']);
                    }
                });

                var serverId = window.DiscordChat.messages['Custom-DiscordChat-id'];
                if (!serverId) return;

                $.get('https://discord.com/api/guilds/' + serverId + '/widget.json', function (widgetData) {
                    window.DiscordChat.data = widgetData;

                    var inviteCode = widgetData.instant_invite.split('/').pop();
                    $.get('https://discord.com/api/v9/invites/' + inviteCode + '?with_counts=true', function (inviteData) {
                        window.DiscordChat.data.approx_members = inviteData.approximate_member_count;
                        window.DiscordChat.data.approx_online = inviteData.approximate_presence_count;

                        var $rail = $('#WikiaRail');
                        if (!$rail.length) return;

                        if ($rail.hasClass('loaded') || $rail.hasClass('is-ready')) {
                            window.DiscordChat.placement();
                        } else {
                            $rail.on('afterLoad.rail', window.DiscordChat.placement);
                        }
                    });
                });
            });
        },

        serverStats: function () {
            var totalOnline = window.DiscordChat.data.approx_online || 0;
            var totalMembers = window.DiscordChat.data.approx_members || 0;

            var activeClass = window.DiscordChat.display(window.DiscordChat.messages['Custom-DiscordChat-display']);
            var onlineLabel = window.DiscordChat.messages['Custom-DiscordChat-online-label'] || 'online';
            var membersLabel = window.DiscordChat.messages['Custom-DiscordChat-members-label'] || 'members';

            var fOnline = window.DiscordChat.countFormat(totalOnline);
            var fMembers = window.DiscordChat.countFormat(totalMembers);

            var showLabels = (activeClass === 'is-label' || activeClass === 'is-combined');

            var textOnline = fOnline + (showLabels ? ' ' + onlineLabel : '');
            var textMembers = fMembers + (showLabels ? ' ' + membersLabel : '');

            return '<div class="DiscordChat__statistics ' + activeClass + '">' +
                       '<span class="DiscordChat__statistics-members" title="' + fMembers + ' ' + membersLabel + '">' + textMembers + '</span>' +
                       '<span class="DiscordChat__statistics-online" title="' + fOnline + ' ' + onlineLabel + '">' + textOnline + '</span>' +
                   '</div>';
        },

        buildIcon: function () {
            return $('<span>', {
                'class': 'wds-icon wds-icon-small DiscordChat__icon',
                'id': 'dev-wds-icons-discord'
            });
        },

        // html
        buildModule: function () {
            var members = window.DiscordChat.data.members || [];
            window.DiscordChat.shuffleAvatars(members);

            var avatarContainer = $('<div class="wds-avatar-stack"></div>');
            var appended = 0, i = 0;
            while (appended < 5 && i < members.length) {
                if (!members[i].bot) {
                    avatarContainer.append(
                        '<span class="wds-avatar" data-status="' + members[i].status + '">' +
                            '<img class="wds-avatar__image" src="' + members[i].avatar_url + '" title="' + mw.html.escape(members[i].username) + '" loading="lazy">' +
                        '</span>'
                    );
                    appended++;
                }
                i++;
            }

            var headerLabel = ' ' + (window.DiscordChat.messages['Custom-DiscordChat-header-label'] || 'Community Chat').trim();
            var joinLabel = window.DiscordChat.messages['Custom-DiscordChat-join-label'] || 'Join';

            var $section = $('<section class="rail-module DiscordChat"></section>');
            var $header = $('<h2 class="rail-module__header has-icon"></h2>')
                .append(window.DiscordChat.buildIcon())
                .append(headerLabel);
            var $stats = $('<div class="DiscordChat__wrapper__statistics"></div>')
                .append(avatarContainer)
                .append(window.DiscordChat.serverStats());
            var $join = $('<a class="DiscordChat__button wds-button wds-is-secondary" target="_blank" data-label="' + joinLabel + '"></a>')
                .attr('href', window.DiscordChat.data.instant_invite)
                .append(window.DiscordChat.buildIcon());
            var $wrapper = $('<div class="DiscordChat__wrapper"></div>').append($stats).append($join);

            $section.append($header).append($wrapper);
            return $section;
        },

        placement: function () {
            mw.hook('dev.placement').add(function (placement) {
                placement.script('Custom-DiscordChat');
                var $anchor = $(placement.custom('#rail-boxad-wrapper'));
                if (!$anchor.length) return;

                var $section = window.DiscordChat.buildModule();
                $section[placement.type('insertAfter')]($anchor);

                mw.hook('dev.wds').add(function (wds) {
                    wds.render('.DiscordChat');
                });

                if (window.MutationObserver) {
                    var parent = $anchor.parent()[0];
                    if (parent) {
                        new MutationObserver(function () {
                            if ($anchor.next()[0] !== $section[0]) {
                                $section[placement.type('insertAfter')]($anchor);
                            }
                        }).observe(parent, { childList: true });
                    }
                }

                mw.hook('DiscordChat.added').fire($section);
            });
        }
    };

    mw.hook('dev.wds').add(function(wds) {
        // prevent race conditions
    });

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:WDSIcons/code.js'
            ]
        }, {
            type: 'style',
            article: 'u:clodaghelm:MediaWiki:DiscordChat.css'
        });

        if (window.DiscordChat && !window.DiscordChat.ready) {
            window.DiscordChat.init();
        }
    });

}(this, jQuery, mediaWiki));