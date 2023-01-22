(function () {
    if (!$('.page__right-rail .content-review__widget').length || $('.page-side-tools #check-jsrt-status').length) {
        return;
    }
    var counter = 3;

    function run () {
        //svg under https://github.com/PKief/vscode-material-icon-theme/blob/master/LICENSE.md, style attribute added by me
        var sideTool = window.dev.addSideTool('<svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="fill: currentColor;"><path d="m5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1c0-.21-.07-.41-.18-.57l-5.82-10.08v-4.35h-2v4.35l-5.82 10.08c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1 -3 -3c0-.6.18-1.16.5-1.63l5.5-9.56v-1.81a1 1 0 0 1 -1 -1v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1a1 1 0 0 1 -1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1 -3 3h-12m7-6l1.34-1.34 1.93 3.34h-8.54l2.66-4.61 2.61 2.61m-.5-4a.5 .5 0 0 1 .5 .5 .5 .5 0 0 1 -.5 .5 .5 .5 0 0 1 -.5 -.5 .5 .5 0 0 1 .5 -.5z"/></svg>');
        sideTool.$tooltip.text($('.page__right-rail .content-review__widget__title').text());
        sideTool.$button.attr('id', 'check-jsrt');
        sideTool.$button.on('click', function () {
            new mw.libs.QDmodal('QuickJSRT').show({
                title: $('.page__right-rail .content-review__widget__title').text(),
                content: $('.page__right-rail .content-review__widget')
                    .find('h4:has(+ div), h4 + div')
                    .toArray() //https://stackoverflow.com/a/58190409
                    //following map and reduce is by doru, un-ES6-ify'd by me
                    .map(function (elem) {
                        return elem.outerHTML;
                    }).reduce(function (concat, html) {
                        return concat + html;
                    }, ''),
                buttons: [{
                    text: $('.page__right-rail .content-review__widget__test-mode > button').text(),
                    handler: function () {
                        $('.page__right-rail .content-review__widget__test-mode > button').click();
                    }
                }, {
                    text: $('.page__right-rail .content-review__widget__submit > button').text(),
                    handler: function () {
                        $('.page__right-rail .content-review__widget__submit > button').click();
                    },
                    attr: {
                        class: 'submit-button'
                    },
                    condition: function () {
                        return $('.page__right-rail .content-review__widget__submit > button').length;
                    }
                }, {
                    text: $('.page__right-rail .content-review__widget__help > a').text(),
                    href: $('.page__right-rail .content-review__widget__help > a').attr('href')
                }],
                onShow: function (modal) {
                    modal.$content.find('h4:first-child').css('margin-top', 'unset');
                }
            });
        });
    }

    function init () {
        if (--counter !== 0) {
            return;
        }
        mw.util.addCSS('\
            .qdmodal#QuickJSRT footer .submit-button {\
                border-color: var(--theme-accent-color);\
            }\
            .qdmodal#QuickJSRT footer .submit-button:hover {\
                background-color: unset;\
                border-color: var(--theme-accent-color--hover);\
            }\
        ');
        run();
    }

    mw.hook('dev.qdmodal').add(init);
    mw.hook('dev.addSideTool').add(init);
    mw.loader.using('mediawiki.util').then(init);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:QDmodal.js',
            'u:dev:MediaWiki:AddSideTool.js'
        ]
    });
})();