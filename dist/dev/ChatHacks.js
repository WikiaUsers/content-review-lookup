/*
 * ChatHacks.js, by Monchoman45 and FANDOM Open Source Library.
 * Version 8.0
 *
 * Features:
 *   Ability to clear your chat window
 *   A host of slash commands
 *   Ability to create multi user private chats
 *   Inline alerts every time your away status changes
 *   Icons next to messages by staff and chat mods in the room
 *   Pings when someone mentions your name or any other specified phrases
 */
(function(mw) {
    'use strict';
    if (window.ChatHacks) {
        return;
    }
    var config = mw.config.get([
        'wgChatMyAvatarUrl',
        'wgCanonicalSpecialPageName',
        'wgSassParams',
        'wgSiteName',
        'wgUserName'
    ]), ChatHacks = {
        /* eslint-disable max-len */
        staffIcon: window.ChatHacksIconStaff || 'https://images.wikia.nocookie.net/wikiaglobal/images/6/6c/Staff_icon.png',
        modIcon: window.ChatHacksIconMod || 'https://images.wikia.nocookie.net/monchbox/images/6/6b/Icon-chatmod.png',
        pingSound: window.ChatHacksPingSound || 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        /* eslint-enable max-len */
        _loaded: 0,
        handleIcon: function(msg) {
            var icon,
                vd = window.mainRoom.viewDiscussion,
                user = vd.model.users.findByName(msg.get('name'));
            if (!user) {
                return;
            }
            if (user.get('isStaff')) {
                icon = $('<img>', {
                    'class': 'stafficon',
                    'src': this.staffIcon
                });
            } else if (user.get('isModerator')) {
                icon = $('<img>', {
                    'class': 'modicon',
                    'src': this.modIcon
                });
            }
            if (icon && window.ChatHacksNoStar !== true) {
                vd.chatUL
                  .children()
                  .last()
                  .children('.username')
                  .append(' ', icon);
            }
        },
        handlePing: function(msg) {
            if (
                !window.mainRoom.isInitialized ||
                msg.get('name') === config.wgUserName ||
                msg.get('isInlineAlert')
            ) {
                return;
            }
            var text = msg.get('text').toLowerCase();
            if (
                this.$pings
                    .val()
                    .trim()
                    .split('\n')
                    .some(function(ping) {
                        var p = ping.trim().toLowerCase();
                        return p && text.indexOf(p) !== -1;
                    })
            ) {
                if (!this.hasFocus) {
                    if (window.ChatHacksPingSound !== false) {
                        this.$sound.html(
                            $('<audio>', {
                                autoplay: true,
                                src: this.pingSound
                            })
                        );
                    }
                    if (!this.dinged) {
                        this.dinged = true;
                        this.titleorig = document.title;
                        this.ding = setInterval(
                            $.proxy(this.flashTitle, this),
                            500
                        );
                    }
                }
                this.vd.scrollToBottom();
                this.vd.chatUL
                    .children()
                    .last()
                    .children('.message')
                    .addClass('ping');
            }
        },
        iconPing: function(msg) {
            this.handleIcon(msg);
            this.handlePing(msg);
        },
        setAway: function() {
            this.inlineAlert(ChatHacks.i18n.msg('away').escape());
            window.mainRoom.socket.send(new window.models.SetStatusCommand({
                statusState: window.STATUS_STATE_AWAY,
                statusMessage: ''
            }).xport());
        },
        setBack: function() {
            /**
             * If we have sent this command (but just haven't finished coming
             * back yet), don't keep spamming the server with this command
             */
            if (this.comingBackFromAway) {
                return;
            }
            this.comingBackFromAway = true;
            this.inlineAlert(ChatHacks.i18n.msg('back').escape());
            window.mainRoom.socket.send(new window.models.SetStatusCommand({
                statusState: window.STATUS_STATE_PRESENT,
                statusMessage: ''
            }).xport());
        },
        sendMessage: function(event) {
            if (!this.active) {
                return true;
            }
            if (event.which !== 13 || event.shiftKey) {
                return false;
            }
            event.preventDefault();
            window.mainRoom.resetActivityTimer();
            var $input = this.viewDiscussion.getTextInput(),
                send = ChatHacks.preparse($input.val().trim()),
                value = $input.val().trim();
            if (value && send && value.length <= this.maxCharacterLimit) {
                var entry = new window.models.ChatEntry({
                    name: config.wgUserName,
                    text: value
                });
                if (this.isMain()) {
                    this.socket.send(entry.xport());
                } else {
                    if (
                        this.afterInitQueue.length < 1 ||
                        this.model.users.length < 2
                    ) {
                        this.mainController.socket.send(
                            this.model.privateRoom.xport()
                        );
                    }
                    if (this.isInitialized) {
                        this.socket.send(entry.xport());
                    } else {
                        this.afterInitQueue.push(entry.xport());
                        // temp chat entry in case of slow connection time
                        entry.set({
                            avatarSrc: config.wgChatMyAvatarUrl,
                            temp: true
                        });
                        this.model.chats.add(entry);
                    }
                }
            }
            $input.val('').focus();
            $('body').removeClass('warn limit-near limit-reached');
        },
        inlineAlert: function(text) {
            text.split('\n').forEach(function(line) {
                window.mainRoom.model.chats.add(
                    new window.models.InlineAlert({
                        text: line
                    })
                );
            });
            window.mainRoom.viewDiscussion.scrollToBottom();
        },
        flashTitle: function() {
            if (document.title === this.titleorig) {
                document.title = this.i18n.msg(
                    'activity', config.wgSiteName
                ).plain();
            } else if (this.titleorig) {
                document.title = this.titleorig;
            }
        },
        preparse: function(input) {
            var commands = this.commands,
                com = input.slice(1)
                    .trim()
                    .replace(/\s+/g, ' ')
                    .split(' '),
                ref = com.shift();

            if (input.charAt(0) === '/' && ref.length > 0) {
                while (typeof commands[ref] === 'string') {
                    ref = commands[ref];
                }
                if (
                    typeof commands[ref] === 'object' &&
                    // /me does not have a handler
                    typeof commands[ref].handler === 'function'
                ) {
                    var param = com.join(' ');
                    if (commands[ref].user && !param.trim()) {
                        this.inlineAlert(this.i18n.msg(
                            'erruser', input.split(' ')[0]
                        ).escape());
                        return false;
                    }
                    var ret = commands[ref].handler.call(this, param);
                    if (typeof ret === 'string') {
                        $('#Write [name="message"]').val(ret);
                        return true;
                    }
                    return ret;
                }
            }
            return true;
        },
        baseMod: function(user, action) {
            $.getJSON(mw.util.wikiScript('api'), {
                action: 'query',
                list: 'users',
                ustoken: 'userrights',
                ususers: user,
                format: 'json'
            }, $.proxy(function(token) {
                var params = {
                    format: 'json',
                    action: 'userrights',
                    user: user,
                    token: token.query.users[0].userrightstoken
                };
                params[action] = 'chatmoderator';
                $.post(
                    mw.util.wikiScript('api'),
                    params,
                    $.proxy(
                        function(result) {
                            this.inlineAlert(this.i18n.msg.apply(
                                this.i18n,
                                this.getModMsg(result, action, user)
                            ).escape());
                        },
                        this
                    )
                );
            }, this));
        },
        getModMsg: function(result, action, user) {
            if (action === 'remove') {
                if (result.userrights.removed[0] === 'chatmoderator') {
                    return ['demodded', user];
                }
                return ['notmod', result.userrights.user];
            } else if (result.userrights.added[0] === 'chatmoderator') {
                return ['modded', user];
            }
            return ['alreadymod', result.userrights.user];
        },
        commands: {
            // Contains data about the /me command
            'me': {
                msg: true
            },
            'away': 'afk',
            'afk': {
                handler: function() {
                    // If you're away, hitting enter has already sent you back
                    if (!$('#ChatHeader .User').hasClass('away')) {
                        this.toggleAway();
                    }
                }
            },
            // Clear the active chat window
            'clear': {
                handler: function() {
                    this.clearWindow();
                }
            },
            // Nobody cares
            'nc': {
                msg: true,
                handler: function(com) {
                    return '[[' + this.i18n.msg('uncyc').plain() +
                           '|' + (com || this.i18n.msg('nobodycares').plain()) +
                           ']]';
                }
            },
            // IRCpwnt
            'devoice': {
                handler: function(com) {
                    return '* ChanServ set channel mode -v ' +
                           (com || config.wgUserName);
                }
            },
            // Too young
            'coppa': {
                handler: function(com) {
                    return 'http://en-wp.org/wiki/COPPA ' +
                           (com || this.i18n.msg('coppa').plain());
                }
            },
            // Idle
            'silence': function() {
                return 'People idle, enjoy the silence. ' +
                       'https://youtu.be/diT3FvDHMyo';
            },
            // ¯\_(ツ)_/¯
            'shrug': {
                handler: function(com) {
                    return (com || '') + ' ¯\\_(ツ)_/¯';
                }
            },
            // Kick a user
            'kick': {
                user: true,
                handler: function(com) {
                    window.mainRoom.kick({
                        name: com
                    });
                }
            },
            'kickban': 'ban',
            'kb': 'ban',
            // Ban a user
            'ban': {
                user: true,
                handler: function(com) {
                    window.mainRoom.socket.send(new window.models.BanCommand({
                        userToBan: com,
                        // 1 day is enough, idk, no time specified
                        time: '36400',
                        // TODO: i18n
                        reason: 'Misbehaving in chat'
                    }).xport());
                }
            },
            // Unban a user
            'unban': {
                user: true,
                handler: function(com) {
                    window.mainRoom.socket.send(new window.models.BanCommand({
                        // Empty ban command === unban
                        userToBan: com
                    }).xport());
                }
            },
            // Make a user a mod
            'mod': {
                handler: function(com) {
                    this.baseMod(com, 'add');
                }
            },
            // Remove a user's mod right
            'demod': {
                user: true,
                handler: function(com) {
                    this.baseMod(com, 'remove');
                }
            },
            // Block a user from private chatting you
            'block': {
                user: true,
                handler: function(com) {
                    window.mainRoom.blockPrivate({name: com});
                }
            },
            // Unblock a user from private chatting you
            'unblock': {
                user: true,
                handler: function(com) {
                    window.mainRoom.allowPrivate({name: com});
                }
            },
            'chat': 'private',
            'room': 'private',
            // Invoke a private room
            'private': {
                user: true,
                handler: function(com) {
                    var users = com.replace(/\s*,\s*/g, ',').split(','),
                        curRoom = window.mainRoom.model.privateUsers
                            .findByName(users[0]);
                    if (curRoom) {
                        window.mainRoom.showRoom(curRoom.attributes.roomId);
                    } else {
                        window.mainRoom.openPrivateChat(users);
                    }
                }
            },
            'roomid': 'id',
            'id': {
                handler: function() {
                    this.inlineAlert(
                        this.i18n.msg('id', window.mainRoom.roomId).escape()
                    );
                }
            },
            // Send a message to yourself
            'self': {
                handler: function(com) {
                    var ar = window.mainRoom.activeRoom,
                        room = ar === null ?
                            window.mainRoom :
                            window.mainRoom.chats.privates[ar];
                    room.model.chats.add(new window.models.ChatEntry({
                        name: config.wgUserName,
                        text: this.i18n.msg('self').plain() + ' ' + com,
                        avatarSrc: config.wgChatMyAvatarUrl
                    }));
                    this.viewDiscussion.scrollToBottom();
                }
            },
            'help': {
                handler: function(com) {
                    if (com) {
                        var ref = com;
                        while (typeof this.commands[ref] === 'string') {
                            ref = this.commands[ref];
                        }
                        var cmd = this.commands[ref];
                        if (this.i18n.msg('help-' + ref).exists && cmd) {
                            var example = '/' + ref;
                            if (cmd.msg) {
                                example += ' ' +
                                           this.i18n.msg(
                                               'help-' + ref + '-example'
                                           ).plain();
                            } else if (cmd.user) {
                                example += ' ' +
                                           this.i18n.msg('exampleuser').plain();
                            }
                            this.inlineAlert(
                                this.i18n.msg(
                                    'help',
                                    ref,
                                    this.i18n.msg('help-' + ref).plain()
                                ).parse() +
                                '\n' +
                                this.i18n.msg('example').escape() +
                                ': ' +
                                $('<span>', {
                                    'class': 'chathacks-example',
                                    'text': example
                                }).prop('outerHTML')
                            );
                            window.mainRoom.viewDiscussion.chatUL
                                .children('li')
                                .last()
                                .children('span.chathacks-example')
                                .click(this.exampleClick);
                        } else {
                            this.inlineAlert(
                                this.i18n.msg('nohelp', ref).escape()
                            );
                        }
                    } else {
                        var str = [];
                        for (var i in this.commands) {
                            if (typeof this.commands[i] === 'object') {
                                str.push(i);
                            }
                        }
                        this.inlineAlert(
                            this.i18n.msg('commands', str.join(', ')).escape()
                        );
                    }
                }
            }
        },
        focus: function() {
            if (this.ding) {
                clearInterval(this.ding);
                this.ding = 0;
            }
            if (this.titleorig) {
                document.title = this.titleorig;
            }
            this.hasFocus = true;
            this.dinged = false;
        },
        blur: function() {
            this.hasFocus = false;
        },
        toggleAway: function(msg) {
            if ($('#ChatHeader .User').hasClass('away')) {
                window.mainRoom.setBack();
            } else {
                window.mainRoom.setAway(msg || '');
            }
        },
        clearWindow: function() {
            this.vd.chatUL.empty();
            window.mainRoom.inlineAlert(this.i18n.msg('cleared').escape());
            this.vd.chatUL.find(
                '#entry-' +
                window.mainRoom.model.chats.models.slice(-1)[0].cid
            ).removeClass('continued');
        },
        openPings: function() {
            this.$pings.removeClass('hidden');
        },
        closePings: function() {
            this.$pings.addClass('hidden');
            $.storage.set('pingphrases', $('#pings').val().split('\n'), {
                expires: 99999,
                path: '/'
            });
        },
        initVars: function() {
            this.hasFocus = document.hasFocus();
            this.dinged = false;
            this.ding = 0;
            if (document.title) {
                this.titleorig = document.title;
            }
            this.vd = window.mainRoom.viewDiscussion;
        },
        initBinding: function() {
            window.mainRoom.model.chats.bind(
                'afteradd',
                $.proxy(this.iconPing, this)
            );
            window.NodeChatController.prototype.setAway = this.setAway;
            window.NodeChatController.prototype.setBack = this.setBack;
            window.NodeChatController.prototype.sendMessage = this.sendMessage;
            window.NodeChatController.prototype.inlineAlert = this.inlineAlert;
            this.vd.unbind('sendMessage');
            this.vd.bind(
                'sendMessage',
                $.proxy(window.mainRoom.sendMessage, window.mainRoom)
            );
        },
        initExamples: function() {
            mw.util.addCSS(
                '.inline-alert span.chathacks-example {' +
                    'color: ' + config.wgSassParams['color-links'] + ';' +
                '}'
            );
        },
        exampleClick: function() {
            window.mainRoom.viewDiscussion
                .getTextInput()
                .val($(this).text());
        },
        initButtons: function() {
            this.buttons = {
                toggleAway: new window.dev.chat.Button({
                    name: 'ChatHacks AFK',
                    attr: {
                        click: $.proxy(this.toggleAway, this),
                        text: this.i18n.msg('afk').plain()
                    }
                }),
                clearWindow: new window.dev.chat.Button({
                    name: 'ChatHacks clear',
                    attr: {
                        click: $.proxy(this.clearWindow, this),
                        text: this.i18n.msg('clear').plain()
                    }
                }),
                pingPhrases: new window.dev.chat.Button({
                    name: 'ChatHacks ping phrases',
                    attr: {
                        id: 'pingspan',
                        text: this.i18n.msg('pingphrases').plain(),
                        append: [
                            $('<textarea>', {
                                'id': 'pings',
                                'class': 'hidden',
                                'text': $.storage.get('pingphrases') ?
                                    $.storage.get('pingphrases').join('\n') :
                                    config.wgUserName
                            })
                        ]
                    }
                })
            };
        },
        initPings: function() {
            this.$pings = $('#pings');
            $('#pingspan')
                .on('mouseover', $.proxy(this.openPings, this))
                .on('mouseout', $.proxy(this.closePings, this));
        },
        initialized: function() {
            this.initVars();
            this.initBinding();
            this.initExamples();
            this.initButtons();
            this.initPings();
            window.mainRoom.inlineAlert(this.i18n.msg('init').parse());
            mw.hook('chathacks.loaded').fire(this);
        },
        initImports: function() {
            importArticles(
                {
                    type: 'script',
                    articles: [
                        'u:dev:MediaWiki:Chat-js.js',
                        'u:dev:MediaWiki:I18n-js/code.js'
                    ]
                },
                {
                    type: 'style',
                    articles: ['u:dev:MediaWiki:ChatHacks.css']
                }
            );
        },
        initWindow: function() {
            $(window)
                .unbind('mousemove')
                .unbind('focus')
                .unbind('keypress')
                .bind('focus', $.proxy(this.focus, this))
                .bind('blur', $.proxy(this.blur, this));
        },
        initSound: function() {
            this.$sound = $('<span>', {
                id: 'sound'
            }).appendTo(document.body);
        },
        initPreload: function() {
            mw.hook('dev.i18n').add($.proxy(this.preloadI18n, this));
            mw.hook('dev.chat.render').add($.proxy(this.preload, this));
        },
        preloadI18n: function(i18n) {
            i18n.loadMessages('ChatHacks').then(
                $.proxy(this.preloadedI18n, this)
            );
        },
        preloadedI18n: function(i18n) {
            this.i18n = i18n;
            this.preload();
        },
        preload: function() {
            if (++this._loaded === 2) {
                this.initialized();
            }
        },
        initChat: function() {
            this.initImports();
            this.initWindow();
            this.initSound();
            this.initPreload();
            mw.hook('chathacks.commands').fire(this.commands);
        },
        chatCheck: function(e) {
            if (
                typeof e === 'object' &&
                Object.prototype.hasOwnProperty.call(e, 'preventDefault')
            ) {
                e.preventDefault();
            }
            $(document.body)
                .find('.WikiaChatLink, .start-a-chat-button')
                .each($.proxy(this.convertChatLink, this));
        },
        convertChatLink: function(_, el) {
            $(el)
                .removeClass('WikiaChatLink start-a-chat-button')
                .removeAttr('href')
                .click($.proxy(this.openChatWindow, this));
        },
        openChatWindow: function() {
            this.chatwindow = window.open(
                mw.util.getUrl('Special:Chat'),
                'chat'
            );
            this.chatwindow.onload = $.proxy(this.onChatWindowLoad, this);
        },
        onChatWindowLoad: function() {
            this.chatwindow.importArticles({
                type: 'script',
                articles: [
                    'u:c:User:' + config.wgUserName + '/global.js',
                    'User:' + config.wgUserName + '/wikia.js'
                ]
            });
        },
        initNotChat: function() {
            var check = $.proxy(this.chatCheck, this);
            $(document.body).on(
                'click',
                'a[href^="' + mw.util.getUrl('Special:Chat') + '"]',
                check
            );
            mw.hook('wikipage.content').add(check);
            $('#WikiaRail').on('afterLoad.rail', check);
            mw.hook('chathacks.loaded').fire(this);
        }
    };
    window.ChatHacks = ChatHacks;
    if (config.wgCanonicalSpecialPageName === 'Chat') {
        ChatHacks.initChat();
    } else {
        ChatHacks.initNotChat();
    }
})(mediaWiki);