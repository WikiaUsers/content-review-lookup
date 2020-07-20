///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////// BlockedByChatUsers - See who blocked your private messages. //////
/////                    Author: Doork                             /////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    'use strict';
    window.dev = window.dev || {};
    if (window.dev.blockedByChatUsers) {
        return;
    }
    window.dev.blockedByChatUsers = {};

    function chatBlockListInit() {
        if (++this.loaded === 2) {
            window.dev.blockedByChatUsers = new ChatBlockList();
        }
    }
    chatBlockListInit.loaded = 0;    

    function ChatBlockList() {
        window.dev.i18n.loadMessages('BlockedByChatUsers')
            .then($.proxy(this.render, this));
    }

    ChatBlockList.prototype.render = function(i18n) {
        this.i18n = i18n;
        this.button = new window.dev.chat.Button({
            name: 'BlockedByChatUsers',
            attr: {
                id: 'blockedByChatUsers',
                click: $.proxy(this.open, this),
                text: this.i18n.msg('privateBlocks').plain()
            }
        });
    };

    ChatBlockList.prototype.open = function () {
        $.get(mw.config.get('wgScript'), {
            action: 'ajax',
            rs: 'ChatAjax',
            method: 'getPrivateBlocks'
        })
            .done($.proxy(this.modal, this))
            .fail($.proxy(this.error, this));
    };

    ChatBlockList.prototype.modal = function(d) {
        var list = $('<ul>');
        list.append(d.blockedByChatUsers.map(function(txt) {
            return $('<li>', { text: txt });
        }));
        $.showCustomModal(
            this.i18n.msg('usersBlockingYou').escape(), 
            $('<p>', {
                text: this.i18n.msg('blockedUsersList').plain()
            }).prop('outerHTML') +
            list.prop('outerHTML')
        );
    };

    ChatBlockList.prototype.error = function() {
        alert(this.i18n.msg('errorAlert').plain());
    };

    $.each({
        'chat': 'Chat-js',
        'i18n': 'I18n-js/code'
    }, function(l, s) {
        // Import scripts.
        if (!window.dev.hasOwnProperty(l)) {
            importArticles({
                type: 'script',
                article: 'u:dev:' + s + '.js'
            });
        }
        // Register dependency.
        mw.hook('dev.' + l)
            .add($.proxy(chatBlockListInit, chatBlockListInit));
    });
});