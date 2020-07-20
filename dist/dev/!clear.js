/**
 * @name   !clear
 * @desc   Allows to clear the messages history in Special:Chat
 * @author Kofirs2634
 * @docs   [[w:c:dev:!clear]]
 */
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || !window.mainRoom || window.ChatClear) return;
    window.ChatClear = true;
 
    var i18n;
 
    function init(i18np) {
        i18n = i18np;
        i18n.useUserLang();
        $(document).on('keydown', 'textarea[name="message"]', function(e) {
            var text = $(this).val();
            if (e.which == 13 && text.substr(0, 6) == '!clear') {
                $(this).val('');
                $('.Chat ul').empty();
                setTimeout(function() {
                    mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('cleared').plain() }));
                }, 100)
            }
        })
    }
 
    importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' })
    mw.hook('dev.i18n').add(function(i18np) {
        i18np.loadMessages('!clear').then(init)
    })
})