/*
 * @description: Add template quick and easily on page
 * @author: Shodai Tsuchi
 */
// <nowiki>
(function() {
    if (window.QuickTemplateLoaded) {
        return;
    }
    window.QuickTemplateLoaded = true;

    var preloads = 2, modal;

    function notification(msg, type) {
        mw.notify(msg.plain(), {
            type: type
        });
    }

    function template(i18n) {
        new mw.Api().post({
            action: 'edit',
            title: mw.config.get('wgPageName'),
            summary: i18n.inContentLang().msg('summary').plain(),
            prependtext: '{{' + $('#QuickTemplateInput').val() + '}}',
            token: mw.user.tokens.get('editToken')
        }).done(function(d) {
            if (d.error) {
                notification(i18n.msg('fail', d.error.code), 'error');
            } else {
                notification(i18n.msg('success'), 'confirm');
                window.location.reload();
            }
        }).fail(function(code) {
            notification(i18n.msg('fail', code || 'http'), 'error');
        });
    }

    function createModal(i18n) {
        modal = new window.dev.modal.Modal({
            buttons: [
                {
                    event: 'execute',
                    primary: true,
                    text: i18n.msg('save').plain()
                }
            ],
            content: $('<div>', {
                id: 'QuickTemplateForm'
            }).append(
                $('<p>', {
                    id: 'QuickTemplateHelp',
                    text: i18n.msg('help').plain()
                }),
                $('<input>', {
                    id: 'QuickTemplateInput',
                    placeholder: i18n.msg('placeholder').plain()
                })
            ).prop('outerHTML'),
            events: {
                execute: template.bind(this, i18n)
            },
            id: 'QuickTemplateModal',
            size: 'medium',
            title: i18n.msg('title').plain()
        });
        modal.create();
    }

    function click(event) {
        event.preventDefault();
        modal.show();
    }

    // Add in Toolbar
    function init(i18n) {
        mw.util.addCSS(
            '#QuickTemplateInput {' +
                'font-size: 16px;'  +
                'width: 100%;'      +
            '}'
        );
        createModal(i18n);
        $('#my-tools-menu').append(
            $('<li>', {
                id: 'QuickTemplateButton'
            }).append(
                $('<a>', {
                    click: click,
                    text: i18n.msg('title').plain()
                })
            )
        );
    }

    function preload() {
        if (--preloads === 0) {
            $.when(
                window.dev.i18n.loadMessages('QuickTemplate'),
                mw.loader.using([
                    'mediawiki.api',
                    'mediawiki.notify',
                    'mediawiki.user',
                    'mediawiki.util'
                ])
            ).then(init);
        }
    }

    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
})();
// </nowiki>