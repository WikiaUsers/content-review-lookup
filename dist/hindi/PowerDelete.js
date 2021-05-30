/////////////////////////////////////////////////////////////////////////////////
/////   PowerDelete - Recreates the former PowerDelete right               /////
////                         Author: Doork                                /////
///           Deletes and Protects pages/files in one click              /////
/////////////////////////////////////////////////////////////////////////////

mw.loader.using('mediawiki.api').then(function() {
    'use strict';
    const config = mw.config.get([
        'wgNamespaceNumber',
        'wgPageName',
        'wgUserGroups'
    ]);
    const ug = mw.config.get('wgUserGroups'),
          page = mw.config.get('wgPageName'),
          namespace = mw.config.get('wgNamespaceNumber');
    var toLoad = 3,
        i18n;

    if (
        !/sysop|content-moderator|staff|helper|content-volunteer|content-team-member|wiki-manager|soap/.test(config.wgUserGroups.join()) ||
        window.powerDelLoaded ||
        config.wgNamespaceNumber === -1 ||
        config.wgNamespaceNumber === 1200 ||
        config.wgNamespaceNumber === 1201
    ) {
        mw.log('PowerDelete: Script already imported, user rights requirements not met or unsupported namespace, skipping import.');
        return;
    }
    window.powerDelLoaded = true;

    // Preform deletion
    function doDelete() {
        var api = new mw.Api();
        const token = mw.user.tokens.get('editToken');
        api.post({
            action: 'delete',
            reason: $('#delete-reason').val(),
            title: page,
            token: token
        }).done(function(d) {
            if (d.error) {
                console.error(i18n.msg('delete-error', d.error.code).plain());
            } else {
                console.log(i18n.msg('delete-success', page).plain());
                api.post({
                    action: 'protect',
                    expiry: $('#protection-expiry').val() || $('#protection-expiry').attr('placeholder'),
                    protections: $('#protection-type').val(),
                    watchlist: 'nochange',
                    title: page,
                    reason: $('#protection-reason').val() || $('#delete-reason').val(),
                    token: token
                }).done(function(d) {
                    if (d.error) {
                        console.error(i18n.msg('protect-error', d.error.code).plain());
                    } else {
                        alert(i18n.msg('done').plain());
                        console.log(i18n.msg('protect-success', page).plain());
                        window.location.reload();
                    }
                }).fail(function(code) {
                    console.error(i18n.msg('protect-error', code).plain());
                });
            }
        }).fail(function(code) {
            console.error(i18n.msg('delete-error', code).plain());
        });
    }

    function init( i18no ) {
        i18n = i18no;
        const modal = new window.dev.modal.Modal({
            buttons: [
                {
                    event: 'execute',
                    id: 'startButton',
                    primary: true,
                    text: i18n.msg('execute').plain()
                }
            ],
            content: {
                type: 'form',
                attr: {
                    method: ''
                },
                children: [
                    {
                        type: 'fieldset',
                        children: [
                            {
                                type: 'p',
                                children: [
                                    i18n.msg('protection-type').plain(),
                                    {
                                        type: 'select',
                                        attr: {
                                            id: 'protection-type'
                                        },
                                        children: ['all', 'autoconfirmed', 'sysop'].map(function(type) {
                                            return {
                                                type: 'option',
                                                attr: {
                                                    value: 'create=' + type
                                                },
                                                text: i18n.msg('type-' + type).plain()
                                            };
                                        })
                                    }
                                ]
                            }
                        ].concat([
                            ['protection-expiry', 'indefinite'],
                            ['protection-reason', ''],
                            ['delete-reason', '']
                        ].map(function(arr) {
                            return {
                                type: 'p',
                                children: [
                                    i18n.msg(arr[0]).plain(),
                                    {
                                        type: 'input',
                                        attr: {
                                            id: arr[0],
                                            placeholder: arr[1],
                                            type: 'text',
                                            value: ''
                                        }
                                    }
                                ]
                            };
                        }))
                    }
                ]
            },
            events: {
                execute: doDelete
            },
            id: 'form-powerdel',
            size: 'large',
            title: i18n.msg('powerdelete').plain()
        });
        modal.create();

        $('.UserProfileActionButton .WikiaMenuElement, .page-header__contribution-buttons .wds-list')
            .first()
            .append(window.dev.ui({
                type: 'li',
                children: [
                    {
                        type: 'a',
                        attr: {
                            href: '#',
                            id: 'PowerDelete'
                        },
                        events: {
                            click: function(event) {
                                event.preventDefault();
                                modal.show();
                            }
                        },
                        text: i18n.msg('powerdelete').plain()
                    }
                ]
            }));
    }

    function preload() {
        if (--toLoad === 0) {
            $.when(
                window.dev.i18n.loadMessages('PowerDelete'),
                mw.loader.using(['mediawiki.user', 'mediawiki.api'])
            ).then(init);
        }
    }

    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.ui').add(preload);
    mw.hook('dev.modal').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:UI-js/code.js'
        ]
    });
});