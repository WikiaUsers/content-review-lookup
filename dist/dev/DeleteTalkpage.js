(function () {
    if (mw.config.get('wgAction') !== 'delete' || $('#wpTalkDelete').length) {
        return;
    }
    var msgs;
    var preloads = 3;

    function buildUI () {
        $('#wpDeleteReasonRow').after(
            window.dev.ui({
                type: 'tr',
                children: [
                    {
                        type: 'td'
                    },
                    {
                        type: 'td',
                        classes: [
                            'mw-input'
                        ],
                        children: [
                            {
                                type: 'input',
                                attr: {
                                    tabindex: '3',
                                    id: 'wpTalkDelete',
                                    value: '1',
                                    type: 'checkbox',
                                    name: 'wpTalkDelete'
                                }
                            },
                            {
                                type: 'label',
                                attr: {
                                    'for': 'wpTalkDelete'
                                },
                                html: '&nbsp;' + msgs[0]
                            }
                        ]
                    }
                ]
            })
        );
    }

    function handler (d) {
        var page = d.query.pages[mw.config.get('wgArticleId')];
        var ucp = mw.config.get('wgVersion') !== '1.19.24';
        if (!page.talkid) {
            return;
        }
        if (ucp) {
            var checkbox = new OO.ui.CheckboxInputWidget({
                id: 'wpTalkDelete'
            });
            var line = new OO.ui.FieldLayout(checkbox, {
                label: msgs[0],
                align: 'inline'
            });
            $('.oo-ui-fieldLayout:nth-child(2)').after(line.$element);
        } else {
            buildUI();
        }
        var params = {
            action: 'delete',
            format: 'json',
            pageid: page.talkid,
            reason: msgs[1],
            token: mw.user.tokens.get('editToken')
        };
        $('#deleteconfirm').click(function (e) {
            if (e.target.id === 'wpConfirmB' || $(e.target).closest('#wpConfirmB').length) {
                var watch = ucp ? OO.ui.infuse($('#wpWatch').parent()).isSelected() : $('#wpWatch').attr('checked');
                if (watch) {
                    params.watchlist = 'watch';
                }
                var checked = ucp ? checkbox.isSelected() : $('#wpTalkDelete').attr('checked');
                if (checked) {
                    new mw.Api().post(params);
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
            });
            init();
        }
    }

    mw.hook('dev.ui').add(preload);
    mw.hook('dev.i18n').add(preload);
    mw.loader.using('mediawiki.api').then(preload);

    importArticles({
        type: 'script',
        article: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js'
        ]
    });
})();