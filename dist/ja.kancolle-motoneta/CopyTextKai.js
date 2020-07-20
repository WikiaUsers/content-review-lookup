// CopyTextKai - dev:CopyText with BannerNotification display timeout after 2000ms added
// https://dev.fandom.com/wiki/BannerNotification
(function () {
    if (window.CopyTextLoaded) {
        return;
    }
 
    window.CopyTextLoaded = true;
 
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('CopyText').done(function (i18n) {
            $('body').on('click', '.copy-to-clipboard-button', function(e){
                var text = $(this).data('text'),
                $input = $('<textarea>', { type: 'text' })
                    .val($('.copy-to-clipboard-text').filter(function() {
                        return $(this).data('text') == text;
                    }).first().text())
                    .appendTo('body')
                    .select();
                var success = document.execCommand('Copy');
                $input.remove();
                if (success) {
                    new BannerNotification(i18n.msg('success').escape(), 'confirm', null, 2000).show();
                } else {
                    if (window.navigator && navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(function() {
                            new BannerNotification(i18n.msg('success').escape(), 'confirm', null, 2000).show();
                        });
                    }
                }
            });
        });
    });
 
    importArticle({
        type: 'script',
        article: 'u:dev:I18n-js/code.js'
    });
})();