/** <nowiki>
 * ChatBanMessage
 * Allows a moderator to automatically message a user about their chat ban
 * @Author Mario&LuigiBowser'sInsideStory
*/
require(['wikia.window', 'jquery', 'mw', 'wikia.nirvana'], function (window, $, mw, nirvana) {
    // Scoping and double run protection
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.dev || {}).cbm
    ) {
        return;
    }
    (window.dev = window.dev || {}).cbm = {};
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ChatBanMessage').then(function(i18n) {
            var chatBanMessage = $.extend({
                title: i18n.msg('ban').escape(),
                body: i18n.msg('body').escape()
           }, (window.chatBanMessage || {}));
            // Script logic
            function init() {
                mw.hook('dev.chat.socket').add(function(mainRoom) {
                    (window.dev = window.dev || {}).cbm = new Cbm(mainRoom);
                });
                importArticle({ type: 'script', article: 'u:dev:Chat-js.js' });
           }
            function Cbm(mainRoom) {
            mainRoom.socket.bind('ban', $.proxy(this.handler, this));
            }
            Cbm.prototype.handler = function(event) {
                this.attrs = JSON.parse(event.data).attrs;
                this.elem = $('#entry-' + mainRoom.model.chats.last().cid);
               if (
                    Number(this.attrs.time) > 0 &&
                    this.attrs.moderatorName === mw.config.get('wgUserName')
                ) {
                    $('.chat-ban-message-button').remove(); // So that a previous button cannot be accidentally clicked
                    this.ui();
                }
            };
            Cbm.prototype.ui = function(mod) {
                this.elem.append(
                    $('<button>', {
                       'class': 'chat-ban-message-button',
                        text: i18n.msg('message-user').plain(),
                        click: $.proxy(this.click, this)
                    })
                );
            };
            Cbm.prototype.click = function() {
                this.api = new mw.Api();
                this.api.get({
                    action: 'query',
                    format: 'json',
                    list: 'logevents',
                    letype: 'chatban',
                    lelimit: 1,
                }).done($.proxy(function(d) {
                    this.attrs.expiry = d.query.logevents[0]['2'];
                    mw.config.get('wgMessageWallsExist').then(
                        $.proxy(this.wall, this),
                        $.proxy(this.talk, this)
                    );
                }, this));
            };
            Cbm.prototype.wall = function(user) {
                this.wgMessageWallsExist = true;
                nirvana.postJson(
                    'WallExternal',
                    'postNewMessage',
                    {
                        method: 'postNewMessage',
                        pagenamespace: 1200,
                        pagetitle: this.attrs.kickedUserName,
                        messagetitle: chatBanMessage.title,
                        body: chatBanMessage.body.replace(/\$1|\$2/g, $.proxy(function(s) {
                            return {
                                '$1': this.attrs.expiry,
                                '$2': this.attrs.reason
                            }[s];
                        },this)),
                        format: 'json',
                        token: mw.user.tokens.get('editToken')
                    },
                    $.proxy(this.call, this)
                );
            };
            Cbm.prototype.talk = function() {
                this.wgMessageWallsExist = false;
                this.api = new mw.Api();
                this.api.post({
                    action: 'edit',
                    format: 'json',
                    title: 'User talk:' + this.attrs.kickedUserName,
                    section: 'new',
                    sectiontitle: chatBanMessage.title,
                    text: chatBanMessage.body.replace(/\$1|\$2/g, function(s){
                        return {
                            '$1': this.attrs.expiry,
                            '$2': this.attrs.reason
                        }[s];
                    }) + '\n\n~~~~',
                    token: mw.user.tokens.get('editToken')
                }).done($.proxy(this.call, this));
            };
            Cbm.prototype.call = function(d) {
                if (
                    (this.wgMessageWallsExist &&
                    d.status === false) ||
                    (!this.wgMessageWallsExist &&
                    d.error)
                ) {
                    mainRoom.model.chats.add(new models.InlineAlert({
                        text: i18n.msg('message-error').plain().replace(/\$1|\$2/, $.proxy(function(s) {
                            return {
                                $1: this.attrs.kickedUserName,
                                $2: this.wgMessageWallsExist ?
                                    mw.messages.get('chat-err-communicating-with-mediawiki') :
                                    d.error.info
                            }[s];
                        }, this))
                    }));
                } else {
                    mainRoom.model.chats.add(new models.InlineAlert({
                        text: i18n.msg('message-success').plain()
                    }));
                    $('.chat-ban-message-button').remove();
                }
            };
            if (mw.config.get('wgMessageWallsExist') === null) {
                $(importArticle({
                    type: 'script',
                    article: 'u:dev:WgMessageWallsExist.js'
                })).load(init);
            } else {
                init();
            }
        });
    });
    importArticles({
        type: 'script',
        articles: 'u:dev:I18n-js/code.js'
    });
});