/* RefreshThreads
 *
 * Allows to periodically check for new thread replies using AJAX
 * Contribute to translations in https://dev.wikia.com/wiki/Special:Blankpage/i18nedit/RefreshThreads
 *
 * @author Dorumin
 */

(function() {
    if (mw.config.get('wgNamespaceNumber') != 1201 || window.RefreshThreadsInit) return;
    window.RefreshThreadsInit = true;
    var config = window.RefreshThreads || {},
    i18n;
    config.interval = config.interval || 15000;


    function update_title(count) {
        document.title = document.title.replace(/^\(\d+\) /, '');
        if (count) {
            document.title = '(' + count + ') ' + document.title;
        }
    }

    function add_messages(new_messages) {
        update_title(0);
        $('.new-reply').before(new_messages);
        new_messages.hide().fadeIn('slow').find('.timeago').timeago().end().each(function() {
            WikiaButtons.init($(this));
        });
    }
    
    function display_view_more(new_messages) {
        var count = new_messages.length,
        class_name = 'refresh-threads-view-more-button';
        if ($('.' + class_name + '[data-count="' + count + '"]').length) return;
        update_title(count);
        $('.' + class_name).remove();
        $('<li>', {
            class: class_name,
            'data-count': count,
            append: $('<a>', {
                class: class_name + '-link',
                text: i18n.msg('show-new-message' + (count == 1 ? '' : 's'), count).plain(),
                css: {
                    cursor: 'pointer'
                }
            })
        }).click(function() {
            var $this = $(this);
            $this.fadeOut(400, function() {
                $this.remove();
                add_messages(new_messages);
            });
        }).hide().fadeIn().insertBefore('.new-reply');
    }
    
    function query_content() {
        var uri = new mw.Uri(location.href);
        uri.query.action = 'render';
        $.get(uri.toString(), function(page) {
            var $page = $(page),
            cur_last_id = $('.SpeechBubble.message').last().attr('id'),
            new_messages = cur_last_id == '1' ? 
                $page.find('.replies').children('.message') :
                $page.find('#' + cur_last_id).nextUntil('.new-reply');
            setTimeout(query_content, config.interval);
            if (!new_messages.length) return;
            if (config.auto_add) {
                add_messages(new_messages);
                return;
            }
            display_view_more(new_messages);
        });
    }

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('RefreshThreads').done(function(lang) {
            i18n = lang;
            i18n.useUserLang();
            setTimeout(query_content, config.interval);
    });
    mw.util.addCSS('.refresh-threads-view-more-button {\
        text-align: center;\
        font-size: 11px;\
        cursor: pointer;\
    }\
    .refresh-threads-view-more-button-link {\
        width: 100%;\
        height: 100%;\
        display: block;\
        padding: .5em;\
    }');
});
})();