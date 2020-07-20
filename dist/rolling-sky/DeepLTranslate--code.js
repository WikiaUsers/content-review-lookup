(function () {
    function deepltranslate(i18n) {
        var supportedLangs = ["en","de","es","fr","it","nl","pl","pt","ru","ja","zh"],
            config = mw.config.get([
                'wgAction',
                'wgPageContentLanguage',
                'wgUserLanguage'
        ]);
 
        if (
            supportedLangs.indexOf(config.wgPageContentLanguage) === -1 ||
            supportedLangs.indexOf(config.wgUserLanguage) === -1 ||
            window.UseDeepL === false ||
            config.wgAction === 'edit'
        ) {
            return;
        }
        window.UseDeepL = false;
 
        var articleText = $('#mw-content-text p').text(),
            encodedText = encodeURIComponent(articleText);
 
        var $button = $('<a>', {
            id: 'DeepLButton',
            'class': 'wds-button wds-is-secondary',
            text: i18n.msg('translate').plain()
        });
 
        $('.page-header__contribution-buttons').append($button);
 
        $button.click(function() {
            window.open('https://www.deepl.com/translator#' + config.wgPageContentLanguage + '/' + config.wgUserLanguage + '/' + encodedText);
        });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('DeepLTranslate').then(deepltranslate);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();