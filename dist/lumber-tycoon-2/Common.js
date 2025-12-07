
/* Ajax, AutoRefresh */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Modernizes BackToTopButton */
window.BackToTopModern = true;

/* Cross-Wiki Block log check */
TBL_GROUP = "roblox-en";

/* Modified Translator.js from dev.fandom.com by Deadcoder (https://dev.fandom.com/wiki/MediaWiki:Translator/Translator.js) */
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
    
    if (config.wgPageContentLanguage === config.wgUserLanguage) config.wgUserLanguage = navigator.language;

    function click() {
        window.open(new mw.Uri('https://translate.google.com/translate').extend({
            sl: config.wgPageContentLanguage,
			tl: config.wgUserLanguage,
			hl: config.wgUserLanguage,
            u: location.href
        }).toString());
    }

    $('.page-side-tools').prepend(
        $('<button>', {
            id: 'TranslateButton',
            'class': 'page-side-tool',
            css: {
                'font-size': 18,
            },
            click: click,
            text: '文'
        })
    );
});

/* Custom placeholder image for link previews */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lumber-tycoon-2/images/4/4a/Site-favicon.ico/revision/latest?cb=20210601183622&format=original';
window.pPreview.tlen = 500;
window.pPreview.scale = {r: '?', t: '/scale-to-height-down/175?'};