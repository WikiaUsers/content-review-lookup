/* Ajax, AutoRefresh */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Modernizes BackToTopButton */
window.BackToTopModern = true;

/* Cross-Wiki Block log check */
TBL_GROUP = "roblox-en";

//To help avoid confusion over the Fanon: pages, this message will be displayed under the title's of all pages in the fanon namespace
$('.ns-112 .page-header__bottom').each(function() {
  $(this).after($('<span>').html("<h3><b><i>This is not real game content, it is fan made!</i></b></h3>"));
});


/* Adds altered translator button. Script credited to Deadcoder. https://dev.fandom.com/wiki/Translator */
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