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

    function click() {
        window.open(new mw.Uri('https://translate.google.com/translate').extend({
            hl: config.wgUserLanguage,
            sl: config.wgPageContentLanguage,
			tl: config.wgUserLanguage,
            u: location.href
        }).toString());
    }

    $('#content').prepend(
        $('<button>', {
            id: 'TranslateButton',
            'class': 'wds-button',
            css: {
                'font-weight': 800,
                width: '6em',
                margin: '-11px 0 11px'
            },
            click: click,
            text: 'A / 文'
        })
    );
});