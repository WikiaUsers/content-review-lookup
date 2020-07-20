
/**
 * Name:        ChatLoggerRemote
 * Version:     v3.0
 * Author:    WindWolf19  
 * 
 * Based on code by:
 *              Joeytje50
 *              KockaAdmiralac <1405523@gmail.com>
 * Description: Logs the chat automatically and on
 *              a press of a button to a Project page on a different wiki
 * 
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgMonthNames'
    ]);
    var username = "";
    var time = "";
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        window.ChatLoggerLoaded
    ) {
        return;
    }
    window.ChatLoggerLoaded = true;
    var ChatLogger = {
        _loaded: 0,
        events: [
            'chat:add',
            'join',
            'part',
            'logout',
            'kick',
            'ban'
        ],
        preload: function() {
            if (++this._loaded === 2) {
                $.when(
                    window.dev.i18n.loadMessages('ChatLogger'),
                    mw.loader.using('mediawiki.api')
                ).then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            i18n.useContentLang();
            this.i18n = i18n;
            this.initButton();
            this.initIntervals();
            this.log = '';
            this.initEvents();
            this.api = new mw.Api();
        },
        initButton: function() {
            // eslint-disable-next-line
            this.button = new window.dev.chat.button({
                name: 'ChatLogger',
                attr: {
                    click: $.proxy(this.submit, this),
                    id: 'ChatLoggerButton',
                    text: this.i18n.inUserLang().msg('submit').plain()
                }
            });
        },
        initIntervals: function() {
            setInterval(
                $.proxy(this.submit, this),
                window.logInterval || 3600000
            );
            // Make sure chat is logged on midnight to prevent log overflow
            var d = new Date();
            setTimeout(
                $.proxy(this.submit, this),
                (23 - d.getUTCHours()) * 60 * 60000 +
                (59 - d.getUTCMinutes()) * 60000 +
                (60 - d.getUTCSeconds()) * 1000
            );
            
        },
        pad: function(num) {
            if (num < 10) {
                return '0' + num;
            }
            return String(num);
        },
        initEvents: function() {
            this.events.forEach(function(e) {
                window.mainRoom.socket.bind(e, $.proxy(function(d) {
                    var event = e,
                        date = new Date();
                    
                    
                    if (e === 'chat:add') {
                        event = 'message';
                    } else if (e === 'logout') {
                        event = 'part';
                    }
                    var ts = '[' +
                            date.getUTCFullYear() + '-' +
                            this.pad(date.getUTCMonth() + 1) + '-' +
                            this.pad(date.getUTCDate()) + ' ' +
                            this.pad(date.getUTCHours()) + ':' +
                            this.pad(date.getUTCMinutes()) + '-' +
                            this.pad(date.getUTCSeconds()) + '] ';
                    this.log += this[event + 'Event'](
                        JSON.parse(d.data).attrs,
                        ts
                    ) + '\n';
                }, this));
            }, this);
        },
        messageEvent: function(e, ts) {
            return e.text.split('\n').map(function(line) {
                return ts + '<' + e.name + '> ' + line;
            }).join('\n');
        },
        kickEvent: function(e, ts) {
            return ts + '~ ' +
                   this.plain('kick', e.kickedUserName, e.moderatorName) +
                   ' ~';
        },
        banEvent: function(e, ts) {
            return ts + '~ ' + this.plain(
                'ban',
                e.kickedUserName,
                e.moderatorName,
                e.reason || this.plain('ban-reason')
            ) + ' ~';
        },
        joinEvent: function(e, ts) {
            return ts + '~ ' + this.plain('join', e.name) + ' ~';
        },
        partEvent: function(e, ts) {
            return ts + '~ ' + this.plain('leave', e.name) + ' ~';
        },
        getLogs: function(date) {
            return this.api.get({
                action: 'query',
                titles: 'Project:Chat/Logs/' + date,
                prop: 'info|revisions',
                intoken: 'edit',
                rvprop: 'content',
                rvlimit: 1
            });
        },
        submitLogs: function(token, content, date, timestamp) {
            username = mw.config.get('wgUserName');
            timestamp = String(timestamp);
            var log = this.log
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            /*return this.api.post({
                action: 'edit',
                title: 'Project:Chat/Logs/' + date,
                text: content ?
                    content.replace(/<\/pre>$/, log + '</pre>') :
                    '<pre class="ChatLog">\n' + log + '</pre>',
                token: token,
                summary: '',
                bot: true,
                minor: true*/
            $.ajax({
                type: 'POST',
                dataType: 'text',
                url: 'https://welcometothewolfden.wikia.com/api.php',
                method: 'POST',
            data: {
                action: 'edit',
                token: mw.user.tokens.get('editToken'),
                title: "Chat/Logs " + date + " " + timestamp + " " + username,
                text: content
                    ? content.replace(/<\/pre>$/, log + '</pre>')
                    :'<pre class="ChatLog">\n' + "Title: Chat Log " + date + "\n" + "Author: " + username + "\n" + "Time: " + timestamp + "\n" + log + '</pre>',
                bot: true,
                minor:true
            },
                xhrFields: {
                    withCredentials: true
            },
                dataType: 'text',
                crossdomain: true
            }).always(function(d) {
                console.log('Success');
                window.location.reload();
            });
        },
        submit: function() {
            // Don't you dare double-submit the logs
            var timestamp = "";
            
            if (this.submitting) {
                return;
            }
            this.submitting = true;
            var dt = new Date(),
                date = dt.getUTCDate() + '_' +
                       config.wgMonthNames[dt.getUTCMonth() + 1] + '_' +
                       dt.getUTCFullYear();
                timestamp = String(dt.getUTCHours()) + ":" + String(dt.getUTCMinutes());
            this.getLogs(date).then($.proxy(function(d) {
                if (!d || !d.query || !d.query.pages || d.error) {
                    console.error(
                        '[ChatLogger] ' + this.plain2('fetch-fail'),
                        d.error
                    );
                    return;
                }
                var pages = d.query.pages,
                    id = Object.keys(pages)[0],
                    page = pages[id],
                    content = '';
                if (
                    Number(id) !== -1 &&
                    page.revisions instanceof Array &&
                    page.revisions.length
                ) {
                    content = page.revisions[0]['*'];
                }
                this.submitLogs(
                    page.edittoken,
                    content,
                    date,
                    timestamp
                ).then($.proxy(function(data) {
 
                    window.location.reload();
 
                }, this)).fail($.proxy(function(error) {
                    console.error(
                        '[ChatLogger] ' + this.plain2('submit-fail'),
                        error
                    );
                }, this));
            }, this)).fail($.proxy(function(e) {
                console.error(
                    '[ChatLogger] ' + this.plain2('fetch-fail'),
                    e
                );
            }, this));
            
        },
        plain: function(msg, arg1, arg2, arg3) {
            return this.i18n.msg(msg, arg1, arg2, arg3).plain();
        },
        plain2: function(msg) {
            return this.i18n.inUserLang().msg(msg).plain();
        }
        
        
    };
    mw.hook('dev.chat').add($.proxy(ChatLogger.preload, ChatLogger));
    mw.hook('dev.i18n').add($.proxy(ChatLogger.preload, ChatLogger));
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
})();