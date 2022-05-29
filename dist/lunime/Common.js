/* Any JavaScript here will be loaded for all users on every page load. */
/* Translator Credit. Dev Fandom*/
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
                margin: '5px 0 11px',
                background: 'linear-gradient(to right, #00c3ff, #7fe1ff, #00c3ff)',
                color:'white',
                textShadow:'0 0 5px #ffffff, 0 0 5px #00c3ff'
            },
            click: click,
            text: 'Translate'
        })
    );
});