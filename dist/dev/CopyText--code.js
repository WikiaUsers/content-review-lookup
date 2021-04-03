(function () {
    if (window.CopyTextLoaded) {
        return;
    }
    window.CopyTextLoaded = true;
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('CopyText').done(function (i18n) {
            function showSuccess() {
                if (window.BannerNotification) {
                    new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
                } else {
                    mw.loader.using('mediawiki.notify').then(function () {
                        mw.notify(i18n.msg('success').plain());
                    });
                }
            }
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
                    showSuccess();
                } else {
                    if (window.navigator && navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(function() {
                            showSuccess();
                        });
                    }
                }
            });
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();