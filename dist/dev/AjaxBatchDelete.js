/**
 * Ajax Batch Delete
 * @description Delete listed multiple pages
 * Does not need to go to Special:BlankPage to use
 * Includes the option to protect after deleting
 * Includes the option to grab a whole category's contents
 * @author Ozank Cx
 */

mw.loader.using('mediawiki.api', function() {
    'use strict';
    
    if (
        window.AjaxBatchDeleteLoaded ||
        !/sysop|vstf|staff|helper|wiki-manager|content-team-member|content-volunteer|content-moderator/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }
    window.AjaxBatchDeleteLoaded = true;
 
    var api = new mw.Api(),
        i18n,
        placement,
        preloads = 3,
        deleteModal,
        paused = true;

    function preload() {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('AjaxBatchDelete').then(init);
        }
    }
    
    function init(i18nData) {
        i18n = i18nData;
        placement.script('AjaxBatchDelete');
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 't-bd',
                    text: i18n.msg('toolsTitle').plain(),
                    click: click
                })
            )
        );
    }
    
    function click() {
        if (deleteModal) {
            deleteModal.show();
            return;
        }
        deleteModal = new window.dev.modal.Modal({
            content: formHtml(),
            id: 'form-batch-delete',
            size: 'medium',
            title: i18n.msg('modalTitle').escape(),
            buttons: [
                {
                    id: 'abd-start',
                    text: i18n.msg('initiate').escape(),
                    primary: true,
                    event: 'start'
                },
                {
                    id: 'abd-pause',
                    text: i18n.msg('pause').escape(),
                    primary: true,
                    event: 'pause',
                    disabled: true
                },
                {
                    text: i18n.msg('addCategoryContents').escape(),
                    primary: true,
                    event: 'addCategoryContents'
                },
                {
                    text: i18n.msg('close').escape(),
                    event: 'close'
                }
            ],
            events: {
                addCategoryContents: addCategoryContents,
                pause: pause,
                start: start
            }
        });
        deleteModal.create();
        deleteModal.show();
    }
 
    function formHtml() {
        return $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>').append(
                    $('<label>', {
                        'for': 'delete-reason',
                        text: i18n.msg('inputReason').plain()
                    }),
                    $('<input>', {
                        type: 'text',
                        name: 'delete-reason',
                        id: 'delete-reason'
                    }),
                    $('<br>'),
                    $('<label>', {
                        'for': 'protect-check',
                        text: i18n.msg('inputProtect').plain()
                    }),
                    $('<input>', {
                        type: 'checkbox',
                        id: 'protect-check',
                        name: 'protect-check'
                    })
                ),
                $('<p>', {
                    text: i18n.msg('inputPages').plain() + ':'
                }),
                $('<textarea>', {
                    id: 'text-mass-delete'
                }),
                $('<p>', {
                    text: i18n.msg('errorsForm').plain() + ':'
                }),
                $('<div>', {
                    id: 'text-error-output'
                })
            )
        ).prop('outerHTML');
    }
    
    function pause() {
        paused = true;
        document.getElementById('abd-pause').setAttribute('disabled', '');
        document.getElementById('abd-start').removeAttribute('disabled');
    }
    
    function start() {
        if (!document.getElementById('delete-reason').value) {
            alert(i18n.msg('stateReason').plain());
            return;
        }
        paused = false;
        document.getElementById('abd-start').setAttribute('disabled', '');
        document.getElementById('abd-pause').removeAttribute('disabled');
        process();
    }
 
    function process() {
        if (paused) {
            return;
        }
        var txt = document.getElementById('text-mass-delete'),
            pages = txt.value.split('\n'),
            currentPage = pages[0];
        if (!currentPage) {
            $('#text-error-output').append(
                i18n.msg('endTitle').escape() + ' ' + i18n.msg('endMsg').escape() + '<br />'
            );
            pause();
        } else {
            performAction(currentPage, document.getElementById('delete-reason').value);
        }
        pages = pages.slice(1,pages.length);
        txt.value = pages.join('\n');
    }
 
    function addCategoryContents() {
        var category = prompt(i18n.msg('enterCategory').plain() + ':');
        if (!category) {
            return;
        }
        api.get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 5000
        }).done(function(d) {
            if (!d.error) {
                var data = d.query;
                for (var i in data.categorymembers) {
                    $('#text-mass-delete').append(data.categorymembers[i].title + '\n');
                }
            } else {
                outputError('GetContents', category, d.error.code);
            }
        }).fail(function() {
            outputError('GetContents', category, i18n.msg('ajaxError').plain());
        });
    }
 
    function outputError(error, param1, param2) {
        $('#text-error-output').append(i18n.msg('error' + error, param1, param2).escape(), '<br />');
    }
 
    function performAction(page,reason) {
        var token = mw.user.tokens.get('editToken');
        api.post({
            action: 'delete',
            watchlist: 'preferences',
            title: page,
            reason: reason,
            token: token,
            bot: true
        }).done(function(d) {
            if (!d.error) {
                console.log(i18n.msg('deleteSuccess', page).plain());
                if (document.getElementById('protect-check').checked) {
                    api.post({
                        action: 'protect',
                        expiry: 'infinite',
                        protections: 'create=sysop',
                        watchlist: 'preferences',
                        title: page,
                        reason: reason,
                        token: token
                    }).done(function(d) {
                        if (!d.error) {
                            console.log(i18n.msg('protectSuccess', page).plain());
                        } else {
                            console.log(i18n.msg('errorProtect', page, d.error.code).plain());
                            outputError('Protect', page, d.error.code);
                        }
                    }).fail(function() {
                        console.log(i18n.msg('errorProtect', page, i18n.ajaxError).plain());
                        outputError('Protect', page, i18n.msg('ajaxError').plain());
                    });
                }
            } else {
                console.log(i18n.msg('errorDelete', page, d.error.code).plain());
                outputError('Delete', page, d.error.code);
            }
        }).fail(function() {
            console.log(i18n.msg('errorDelete', page, i18n.msg('ajaxError').plain()).plain());
            outputError('Delete', page, i18n.msg('ajaxError').plain());
        });
        setTimeout(process, window.batchDeleteDelay || 1000);
        $('.banner-notifications-placeholder').remove();
    }
 
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
    mw.hook('dev.placement').add(preload);
 
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js'
            ]
        },
        {
            type: 'style',
            articles: ['u:dev:MediaWiki:AjaxBatchDelete.css']
        }
    );
    
});