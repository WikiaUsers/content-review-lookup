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
            document.execCommand('Copy');
            $input.remove();
            new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
        });
    });
});
importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });

// AjaxRC importation

window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/furthestextreme/images/8/88/9-0.gif/revision/latest?cb=20190103093219'
window.ajaxRefresh = 30000;


window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function1, function2, function3);

window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// register the hook before the import to avoid race conditions
mw.hook('dev.i18n').add(function (i18n) {
    // i18n is a shortcut to window.dev.i18n
});
 
importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });

$.getScript('/load.php?mode=articles&articles=u:dev:MediaWiki:I18n-js/code.js&only=scripts')
    .done(function() {
        // access window.dev.i18n here
    });

// name is the PAGENAME part of https://dev.wikia.com/wiki/Custom-PAGENAME/i18n.json
i18n.loadMessages(name).done(function (i18n) {
    // use your i18n instance here
});

// start with the user's language (let's say English)
i18n.msg('hello-world').plain(); // Hello World!
 
// output French for one message only
i18n.inLang('fr').msg('hello-world').plain(); // Bonjour le monde !
 
// and back to English again
i18n.msg('hello-world').plain(); // Hello World!

/* DO NOT ADD ANY CODES BELOW */