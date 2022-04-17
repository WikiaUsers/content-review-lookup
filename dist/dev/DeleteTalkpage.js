(function () {
    if (mw.config.get('wgAction') !== 'delete' || $('#wpTalkDelete').length) {
        return;
    }
    var msgs;
    var preloads = 2;

    function handler (d) {
        var page = d.query.pages[mw.config.get('wgArticleId')];
        if (!page.talkid) {
            return;
        }
        var checkbox = new OO.ui.CheckboxInputWidget({
            id: 'wpTalkDelete'
        });
        var line = new OO.ui.FieldLayout(checkbox, {
            label: msgs[0],
            align: 'inline'
        });
        $('.oo-ui-fieldLayout:nth-child(2)').after(line.$element);
        var params = {
            action: 'delete',
            format: 'json',
            pageid: page.talkid,
            reason: msgs[1]
        };
        $('#deleteconfirm').click(function (e) {
            if (e.target.id === 'wpConfirmB' || $(e.target).closest('#wpConfirmB').length) {
                if (OO.ui.infuse($('#wpWatch').parent()).isSelected()) {
                    params.watchlist = 'watch';
                }
                if (checkbox.isSelected()) {
                    new mw.Api().postWithEditToken(params);
                }
            }
        });
    }

    function init () {
        new mw.Api().get({
            action: 'query',
            format: 'json',
            prop: 'info',
            titles: mw.config.get('wgPageName'),
            inprop: 'talkid'
        }).done(handler);
    }

    function preload () {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('DeleteTalkpage').then(function (i18n) {
                msgs = [i18n.msg('label').escape(), i18n.msg('reason').plain()];
                init();
            });
        }
    }

    mw.hook('dev.i18n').add(preload);
    mw.loader.using('mediawiki.api').then(preload);

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();