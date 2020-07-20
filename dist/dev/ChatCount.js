/**
 * ChatCount
 * Allows to quickly take the count of all the users present in the chat
 * @Author Mario&LuigiBowser'sInsideStory
*/
require(['wikia.window', 'jquery'], function(window, $) {
    // Scoping + prevent double run
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== "Chat" ||
        window.chatCountLoaded
    ) {
        return;
    }
    window.chatCountLoaded = true;
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ChatCount').then(function(i18n) {
            function init() {
                mw.hook('dev.chat').add(function(chat) {
                    new chat.Button({
                        name: 'ChatCount',
                        attr: {
                            'class': 'chat-count-button',
                            text: i18n.msg('button-text').plain(),
                            click: showCount
                        }
                    });
                });
            }
            function showCount() {
                var count = mainRoom.model.users.length,
                    opts = {
                        id: 'uc-modal',
                        buttons: [
                            {
                                id: 'uc-modal-close',
                                defaultButton: false,
                                message: i18n.msg('modal-close').plain(),
                                handler: function() {
                                    $('#uc-modal').closeModal();
                                }
                            }
                        ]
                    };
                $.showCustomModal(i18n.msg('modal-title').plain(), (count !== 1 ? i18n.msg('count', count).parse() : i18n.msg('no-users').plain()), opts);
            }
            mw.hook('dev.chat.render').add(init);
        });
    });
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Chat-js.js',
            'u:dev:I18n-js/code.js'
        ]
    });
});