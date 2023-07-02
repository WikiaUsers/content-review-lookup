$(function() {
    var config = mw.config.get([
        'wgAction',
        'wgPageContentLanguage',
        'wgUserLanguage'
    ]);

    if (window.UseTranslator === false || config.wgAction !== 'view') {
        return;
    }

    window.UseTranslator = false;

    // Google Translator no longer translates pages that have the exact same
    // value in the first 3 parameters (sl, tl, and hl). Instead, it sends you
    // to an error page. To fix that, we'll use the browser's language by using
    // navigator.language as a fallback.
    // For example: in english, wgUserLanguge returns "en", while
    // navigator.language returns "en-US".
    if (config.wgPageContentLanguage === config.wgUserLanguage) config.wgUserLanguage = navigator.language;

    function click() {
        window.open(new mw.Uri('https://translate.google.com/translate').extend({
            sl: config.wgPageContentLanguage,
            tl: config.wgUserLanguage,
            hl: config.wgUserLanguage,
            u: location.href
        }).toString());

    }

    function handler($content) {
        if ($content.attr('id') !== 'mw-content-text') {
            return;
        }

        $content.prepend($('<button>', {
            id: 'TranslateButton',
            'class': 'wds-button',
            css: {
                'font-weight': 800,
                width: '6em'
            },
            click: click,
            text: 'A / 文'
        }));

        if (document.documentElement.getAttribute('dir') === 'rtl') {
            $('#TranslateButton').wrap('<div id="TranslateButtonContainer" style="display: flex; justify-content: center;"></div>');
        }

        mw.hook('wikipage.content').remove(handler);
    }
    mw.hook('wikipage.content').add(handler);
});