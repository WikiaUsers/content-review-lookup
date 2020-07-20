(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName'
    ]);
    if (window.SeenTellLoaded || config.wgCanonicalSpecialPageName !== 'Chat') {
        return;
    }
    var SeenTell = {
        events: {
            'chat:add': 'message',
            'join': 'join',
            'part': 'leave',
            'logout': 'leave'
        },
        commands: [
            'seen',
            'tell',
            'untell',
            'told'
        ],
        prefix: '!',
        logpage: 'Project:SeenTell',
        logInterval: 30000,
        wrapper: {
            open: '<syntaxhighlight lang="javascript" class="SeenTell">',
            close: '</syntaxhighlight>'
        },
        init: function(mainRoom) {
            this.mr = mainRoom;
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                titles: this.logpage,
                prop: 'revisions',
                rvprop: 'content',
                indexpageids: true,
                cb: Date.now()
            }).then($.proxy(this.callback, this))
            .fail($.proxy(this.error, this));
        },
        error: function(e) {
            console.error('[SeenTell] API error', e);
        },
        callback: function(d) {
            var q = d.query,
                id = q.pageids[0];
            if (!id || id === '-1') {
                this.data = {seen: {}, tell: {}};
            } else {
                try {
                    this.data = JSON.parse(
                        q.pages[id].revisions[0]['*'].replace(new RegExp(
                            '^' +
                            $.escapeRE(this.wrapper.open) +
                            '|' +
                            $.escapeRE(this.wrapper.close) +
                            '$',
                            'g'
                        ), '')
                    );
                    if (!this.data.seen) {
                        this.data.seen = {};
                    }
                    if (!this.data.tell) {
                        this.data.tell = {};
                    }
                } catch (e) {
                    console.error('[SeenTell] Content parsing error', e);
                    this.data = {seen: {}, tell: {}};
                }
            }
            mainRoom.model.users.map(function(m) {
                return m.get('name');
            }).forEach(function(user) {
                this.data.seen[user] = Date.now();
            }, this);
            setInterval($.proxy(this.save, this), this.logInterval);
            for (var e in this.events) {
                this.mr.socket.bind(e, $.proxy(this.event, this));
            }
            this.button = new dev.chat.Button({
                name: 'SeenTell',
                attr: {
                    click: $.proxy(this.save, this),
                    text: 'Update seen/tell data'
                }
            });
        },
        save: function() {
            var json = JSON.stringify(this.data);
            if (json === this.json) {
                return;
            }
            this.json = json;
            this.api.post({
                action: 'edit',
                title: this.logpage,
                token: mw.user.tokens.get('editToken'),
                text: this.wrapper.open +
                      json.replace(new RegExp(this.wrapper.close, 'g'), '') +
                      this.wrapper.close,
                summary: 'Updating seen/tell log list.',
                bot: true,
                minor: true
            }).fail($.proxy(this.error, this));
        },
        event: function(e) {
            try {
                var data = JSON.parse(e.data);
                this[this.events[e.event]](data.attrs);
            } catch (e) {
                console.error('[SeenTell] JSON parsing error', e);
            }
        },
        message: function(data) {
            var message = data.text,
                user = data.name;
            this.data.seen[user] = Date.now();
            if (message.indexOf(this.prefix) === 0) {
                this.commands.forEach(function(cmd) {
                    var fullcmd = this.prefix + cmd;
                    if (message.indexOf(fullcmd) === 0) {
                        this[cmd + 'Cmd'](
                            user,
                            message
                                .slice(fullcmd.length + 1)
                                .split(' ')
                        );
                    }
                }, this);
            }
        },
        join: function(data) {
            var user = data.name,
                normal = user.replace(/ /g, '_'),
                msg = this.data.tell[normal];
            this.data.seen[user] = Date.now();
            if (msg) {
                var str = 'You have ' + Object.keys(msg).length +
                          ' new message(s):';
                for (var m in msg) {
                    str += '\nFrom ' + this.user(m) + ': "' + msg[m] + '"';
                }
                this.replyTo(user, str);
                delete this.data.tell[normal];
            }
        },
        leave: function(data) {
            this.data.seen[data.name] = Date.now();
        },
        seenCmd: function(user, args) {
            var see = args.join(' ');
            if (see) {
                if (see === config.wgUserName) {
                    this.replyTo(user, 'I have not seen myself.');
                } else if (see === user) {
                    this.replyTo(user, 'Are you here?');
                } else if (this.mr.model.users.findByName(see)) {
                    this.replyTo(
                        user,
                        'They are currently here, so no need to do this ' +
                        'command for them.'
                    );
                } else if (this.data.seen[see]) {
                    this.replyTo(
                        user,
                        'I have last seen them at ' +
                        new Date(this.data.seen[see]).toLocaleString() +
                        '.'
                    );
                } else {
                    this.replyTo(
                        user,
                        'I have not seen ' + this.user(see) + '.'
                    );
                }
            } else {
                this.replyTo(
                    user,
                    'Please re-do this command but with a user specified.'
                );
            }
        },
        tellCmd: function(user, args) {
            var tellTo = args.shift(),
                message = args.join(' ');
            if (tellTo) {
                if (tellTo === config.wgUserName) {
                    this.replyTo(
                        user,
                        'Tell me, who is ' +
                        config.wgUserName +
                        '?'
                    );
                } else if (tellTo === user) {
                    this.replyTo(user, 'Tell me, who is ' + tellTo + '?');
                } else if (this.mr.model.users.findByName(tellTo)) {
                    this.replyTo(
                        user,
                        'They are currently here, so no need to do this ' +
                        'command for them.'
                    );
                } else if (message) {
                    if (!this.data.tell[tellTo]) {
                        this.data.tell[tellTo] = {};
                    }
                    this.data.tell[tellTo][user] = message;
                    this.replyTo(
                        user,
                        'Alright, I will tell them that when I see them.'
                    );
                } else {
                    this.replyTo(
                        user,
                        'Please re-do this command but with a message ' +
                        'specified.'
                    );
                }
            } else {
                this.replyTo(
                    user,
                    'Please re-do this command but with a user and message ' +
                    'specified.'
                );
            }
        },
        untellCmd: function(user, args) {
            var untell = args.join(' ');
            if (untell) {
                if (untell === config.wgUserName) {
                    this.replyTo(user, 'Wow, rude.');
                } else if (untell === user) {
                    this.replyTo(user, 'Ok.');
                } else if (
                    this.data.tell[untell] &&
                    this.data.tell[untell][user]
                ) {
                    delete this.data.tell[untell][user];
                    if ($.isEmptyObject(this.data.tell[untell])) {
                        delete this.data.tell[untell];
                    }
                    this.replyTo(
                        user,
                        'I have removed your message to ' + this.user(untell) +
                        '.'
                    );
                } else {
                    this.replyTo(
                        user,
                        'I cannot untell when there is nothing to be untold.'
                    );
                }
            } else {
                this.replyTo(
                    user,
                    'Please re-do this command but with a user specified.'
                );
            }
        },
        toldCmd: function(user, args) {
            var told = args.join(' ');
            if (told) {
                if (told === config.wgUserName) {
                    this.replyTo(user, 'I do not talk to myself.');
                } else if (told === user) {
                    this.replyTo(user, 'I told you what I had to.');
                } else if (
                    this.data.tell[told] &&
                    this.data.tell[told][user]
                ) {
                    this.replyTo(
                        user,
                        'I have not delievered your message to ' +
                        this.user(told) + '.'
                    );
                } else {
                    this.replyTo(
                        user,
                        'I have no messages from you to deliver to ' +
                        this.user(told) + '.'
                    );
                }
            } else {
                this.replyTo(
                    user,
                    'Please re-do this command but with a user specified.'
                );
            }
        },
        replyTo: function(user, text) {
            this.mr.socket.send(new models.ChatEntry({
                name: config.wgUserName,
                text: this.user(user) + ': ' + text,
                roomId: undefined // ha screw you Doru
            }).xport());
        },
        user: function(user) {
            return '[[User:' + user + '|' + user + ']]';
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Chat-js.js'
    });
    mw.loader.using('mediawiki.api').then(function() {
        mw.hook('dev.chat.socket').add($.proxy(SeenTell.init, SeenTell));
    });
})();