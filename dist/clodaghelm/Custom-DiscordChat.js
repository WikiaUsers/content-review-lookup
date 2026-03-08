/**
 * @name:             Custom-DiscordChat
 * @original-authors: [[w:c:dev:User:DuckeyD]], [[w:c:dev:User:KockaAdmiralac]]
 * @fork-author:      [[User:ClodaghelmC]]
 * @original-script:  [[w:c:dev:DiscordChat]]
 * @description:      Based on the original script, but tweaked to show apx.
 *                    server stats with custom labels pulled from MediaWiki
 *                    system messages.
**/

/* global mw, $ */
(function (window, $, mw) {
    'use strict';
    
    if (window.DiscordChatLoaded) {
        return;
    }
    window.DiscordChatLoaded = true;

    window.DiscordChat = {
        ready: false,
        messages: {},
        data: null,
        modes: {
            'default': { rail: 'is-bullet',   other: 'is-label'    },
            'invert':  { rail: 'is-label',    other: 'is-bullet'   },
            'compact': { rail: 'is-bullet',   other: 'is-bullet'   },
            'expand':  { rail: 'is-label',    other: 'is-label'    },
            'combine': { rail: 'is-combined', other: 'is-combined' }
        },
        svgPath: 'm20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z',

        init: function (i18n) {
            window.DiscordChat.ready = true;
            var api = new mw.Api();
            
            $.when(
                api.get({
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: [
                        'Custom-DiscordChat-header-label', 
                        'Custom-DiscordChat-id', 
                        'Custom-DiscordChat-join-label',
                        'Custom-DiscordChat-online-label',
                        'Custom-DiscordChat-members-label',
                        'Custom-DiscordChat-display'
                    ].join('|'),
                    amlang: mw.config.get('wgUserLanguage'),
                    uselang: 'content',
                    maxage: 300,
                    smaxage: 300
                }),
                i18n.loadMessages('DiscordChat')
            ).then(function (data) {
                if (data[0].error) return;
                
                data[0].query.allmessages.forEach(function (message) {
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
                        
                        window.DiscordChat.mainPage();
                        if ($('#WikiaRail').length) {
                            if ($('#WikiaRail').hasClass('loaded') || $('#WikiaRail').hasClass('is-ready')) {
                                window.DiscordChat.rightRail();
                            } else {
                                $('#WikiaRail').on('afterLoad.rail', window.DiscordChat.rightRail);
                            }
                        }
                    });
                });
            });
        },
        
        formatCount: function(num) {
            if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.$0.00 (0$)/, '') + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.$0.00 (0$)/, '') + 'K';
            return num;
        },
        
        shuffleAvatars: function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
        },
        
        serverStats: function (type) {
            var totalOnline = window.DiscordChat.data.approx_online || 0;
            var totalMembers = window.DiscordChat.data.approx_members || 0;
            var displayMode = (window.DiscordChat.messages['Custom-DiscordChat-display'] || 'default').toLowerCase();
            
            var modeCfg = window.DiscordChat.modes[displayMode] || window.DiscordChat.modes['default'];
            var activeClass = (type === 'rightRail') ? modeCfg.rail : modeCfg.other;

            var onlineLabel = window.DiscordChat.messages['Custom-DiscordChat-online-label'] || 'online';
            var membersLabel = window.DiscordChat.messages['Custom-DiscordChat-members-label'] || 'members';
            
            var fOnline = window.DiscordChat.formatCount(totalOnline);
            var fMembers = window.DiscordChat.formatCount(totalMembers);
            
            var showLabels = (activeClass === 'is-label' || activeClass === 'is-combined');
            
            var textOnline = fOnline + (showLabels ? ' ' + onlineLabel : '');
            var textMembers = fMembers + (showLabels ? ' ' + membersLabel : '');
            
            return '<div class="stats-column ' + activeClass + '">' +
                       '<span class="stat-members" title="' + fMembers + ' ' + membersLabel + '">' + textMembers + '</span>' +
                       '<span class="stat-online" title="' + fOnline + ' ' + onlineLabel + '">' + textOnline + '</span>' +
                   '</div>';
        },
        
        rightRail: function () {
            var members = window.DiscordChat.data.members || [];
            window.DiscordChat.shuffleAvatars(members);
            
            var avatarContainer = $('<div class="wds-avatar-stack"></div>');
            var appended = 0, i = 0;
            while (appended < 5 && i < members.length) {
                if (!members[i].bot) {
                    avatarContainer.append('<span class="wds-avatar" data-status="' + members[i].status + '"><img class="wds-avatar__image" src="' + members[i].avatar_url + '" title="' + mw.html.escape(members[i].username) + '" loading="lazy"></span>');
                    appended++;
                }
                i++;
            }
            
            var headerLabel = window.DiscordChat.messages['Custom-DiscordChat-header-label'] || 'Community Chat';
            var joinLabel = window.DiscordChat.messages['Custom-DiscordChat-join-label'] || 'Join';
            
            var element = $('<section class="chat-module rail-module DiscordChat">' +
                               '<h2 class="rail-module__header has-icon">' +
                                 '<svg xmlns="http://www.w3.org/2000/svg" class="discord-svg" width="18" height="16" viewBox="0 0 28 20"><path d="' + window.DiscordChat.svgPath + '"/></svg>' +
                                 headerLabel +
                               '</h2>' +
                               '<div class="chat-container-capsule">' +
                                 '<div class="stats-wrapper">' +
                                   avatarContainer.prop('outerHTML') +
                                   window.DiscordChat.serverStats('rightRail') +
                                 '</div>' +
                                 '<a href="' + window.DiscordChat.data.instant_invite + '" target="_blank" class="wds-is-secondary wds-button wds-is-squished">' + joinLabel + '</a>' +
                               '</div>' +
                             '</section>');
                             
            var $target = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            if ($target.length) {
            	$target.after(element);
            } 
            else {
            	$('#WikiaRail').prepend(element);
            }
            
            $('.chat-module:not(.DiscordChat)').css('display', 'none');
            mw.hook('DiscordChat.added').fire(element);
        },
        
        mainPage: function() {
            var $anchor = $('.discord-thrift-anchor');
            if (!$anchor.length || !window.DiscordChat.data) return;
            
            var members = window.DiscordChat.data.members || [];
            window.DiscordChat.shuffleAvatars(members);
            var avatarStack = $('<div class="wds-avatar-stack"></div>');
            var count = 0, i = 0;
            
            while (count < 5 && i < members.length) {
                if (!members[i].bot) {
                    avatarStack.append('<span class="wds-avatar" data-status="' + members[i].status + '"><img class="wds-avatar__image" src="' + members[i].avatar_url + '" title="' + mw.html.escape(members[i].username) + '" loading="lazy"></span>');
                    count++;
                }
                i++;
            }
            
            var joinLabel = window.DiscordChat.messages['Custom-DiscordChat-join-label'] || 'Join';
            
            $anchor.html(
                '<section class="DiscordChat chat-module mpDiscordChat">' +
                    '<div class="chat-container-capsule">' +
                        '<div class="stats-wrapper">' + 
                            avatarStack.prop('outerHTML') + 
                            window.DiscordChat.serverStats('other') +
                        '</div>' +
                        '<a href="' + window.DiscordChat.data.instant_invite + '" target="_blank" class="wds-is-secondary wds-button wds-is-squished">' + joinLabel + '</a>' +
                    '</div>' +
                '</section>'
            );
        }
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        importArticles({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        }, {
            type: 'style',
            article: 'MediaWiki:Custom-DiscordChat.css'
        });
        
        mw.hook('dev.i18n').add(function(i18n) {
            if (window.DiscordChat && !window.DiscordChat.ready) {
                window.DiscordChat.init(i18n);
            }
        });
    });

}(this, jQuery, mediaWiki));