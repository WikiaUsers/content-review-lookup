/**
 * !pm
 * Creates a command that users can use to open PMs in the chat
 * @Author Mario&LuigiBowser'sInsideStory
 */
require(['wikia.window', 'jquery'], function(context, $) {
    // Scoping + double run protection
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== "Chat" ||
        (context.dev || {}).pmc
    ) {
        return;
    }
    function init() {
        mw.hook('dev.i18n').add(function(i18n) {
            (window.dev = window.dev || {}).pmc = new Pmc();
            Pmc.i18n = i18n;
            i18n.loadMessages('!pm').then($.proxy(function(i18no){
                $.extend(Pmc.i18n, i18no);
            }, this));
        });
    }
    function Pmc() {
        $('textarea[name="message"]').on('keydown', $.proxy(this.handler, this));
    }
    Pmc.prototype.handler = function(e) {
        var val = $('textarea[name="message"]').val();
        if (e.which == 13 && val.startsWith('!pm')) {
            e.preventDefault();
            var user = val.split("!pm ")[1];
            if (user) {
                if (!context.mainRoom.model.users.findByName(user)) {
                    context.mainRoom.model.chats.add(new models.InlineAlert({
                        text: Pmc.i18n.msg('user-not-present').plain()
                    }));
                } 
                else if (context.mainRoom.model.privateUsers.findByName(user)) {
                    context.mainRoom.model.chats.add(new models.InlineAlert({
                        text: Pmc.i18n.msg('room-exists').plain()
                    }));
                }
                else {
                    this.openPm(user);
                }
            }
            else {
                this.showUsers();
            }
            // Clear textarea
            $('textarea[name="message"]').val('');
        }
    }; 
    Pmc.prototype.openPm = function(user) {
        context.mainRoom.openPrivateChat(Array(user));
    };
    Pmc.prototype.showUsers = function() {
        var $modalHtml = $('<ul></ul>');
        context.mainRoom.model.users.filter(function(usr) {
            return usr.attributes.name !== config.wgUserName;
        }).forEach(function(i) {
            $modalHtml.append(
                $('<li>', {
                    'class': 'pmc-users-user',
                    'data-user': i.attributes.name,
                    click: $.proxy(function() {
                        if (context.mainRoom.model.privateUsers.findByName(i.attributes.name)) {
                            context.mainRoom.model.chats.add(new models.InlineAlert({
                                text: Pmc.i18n.msg('room-exists').plain()
                            }));
                        }
                        else {
                            context.mainRoom.openPrivateChat(Array(i.attributes.name));
                        }
                        $('#pmc-users').closeModal();
                    }, this)
                }).html(
                    $('<img>', {
                        src: i.attributes.avatarSrc.replace('/scale-to-width-down/28', '')
                    }).after(i.attributes.name)
                )
            );
        });
        $.showCustomModal(Pmc.i18n.msg('user-modal-title').escape(), $modalHtml, {
            id: 'pmc-users',
            buttons: [
                {
                    id: 'pmc-users-close',
                    defaultButton: false,
                    message: Pmc.i18n.msg('modal-close').escape(),
                    handler: function() {
                        $('#pmc-users').closeModal();
                    }
                }
            ]
        });
    };
    mw.hook('dev.chat.render').add(init);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Chat-js.js',
            'u:dev:I18n-js/code.js'
        ]
    }, {
        type: 'style',
        articles: ['u:dev:MediaWiki:!pm.css']
    });
});