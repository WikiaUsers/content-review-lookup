/**
 * Mass Rename
 * @description Rename pages quickly.
 * @author Ozuzanna
 */

(function ($, mw) {
    // Load protection
    if (window.MassRenameLoaded) {
        return;
    }
    window.MassRenameLoaded = true;
    // Variables
    var Api,
        i18n,
        FormHTML,
        moveSummary,
        delay = window.massRenameDelay || 1000;
    /**
     * @method closeModal
     * @description Closes the MassRename modal
     */
    function closeModal () {
        $('#form-rename').closeModal();
    }
    /**
     * @method click
     * @description Opens the MassRename modal
     */
    function click () {
        $.showCustomModal(i18n.msg('title').escape(), FormHTML, {
            id: 'form-rename',
            width: 500,
            buttons: [{
                id: 'start-button',
                message: i18n.msg('initiate').escape(),
                defaultButton: true,
                handler: init
            }, {
                message: i18n.msg('cancel').escape(),
                handler: closeModal
            }]
        });
    }
    /**
     * @method init
     * @description Analyzes the inputted data
     */
    function init () {
        var txt = document.getElementById('text-rename'),
            pages = txt.value.split('\n'),
            page = pages[0];
        document.getElementById('start-button').setAttribute('disabled', 'disabled');
        if (!page) {
            document.getElementById('start-button').removeAttribute('disabled');
            $.showCustomModal(i18n.msg('finished').escape(), i18n.msg('nothingLeftToDo').escape(), {
                id: 'form-complete',
                width: 200,
                buttons: [{
                    message: i18n.msg('close').escape(),
                    defaultButton: true,
                    handler: closeModal
                }]
            });
        } else {
            rename(page);
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
    }
    /**
     * @method rename
     * @description Renames the page
     * @param {String} name - The rename data
     */
    function rename (name) {
        if (name.split(' ').length !== 2) {
            $('#text-error-output').append(i18n.msg('invalidInput', name).escape() + '<br/>');
        } else {
            var oldName = name.split(' ')[0],
                newName = name.split(' ')[1],
                config = {
                action: 'move',
                from: oldName.replace('_', ' '),
                to: newName.replace('_', ' '),
                noredirect: '',
                reason: moveSummary,
                bot: true,
                token: mw.user.tokens.get('editToken')
            };
            if (document.getElementById('redirect-check').checked) {
                delete config.noredirect;
            }
            Api.post(config)
            .done(function (d) {
                if (!d.error) {
                    console.log(i18n.msg('renameDone', oldName, newName).plain());
                } else {
                    console.log(i18n.msg('renameFail', oldName, newName).escape() + ': ' + d.error.code);
                    $('#text-error-output').append(i18n.msg('renameFail', oldName, newName).escape() + ': ' + d.error.code + '<br/>');
                }
            })
            .fail(function () {
                console.log(i18n.msg('renameFail2', oldName, newName).plain());
                $('#text-error-output').append(i18n.msg('renameFail2', oldName, newName).escape() + '<br/>');
            });
        }
        setTimeout(init, delay);
    }
    // I18n-js
    mw.hook('dev.i18n').add(function (i18no) {
        $.when(
            i18no.loadMessages('MassRename'),
            mw.loader.using('mediawiki.api')
        ).then(function (i18nData) {
            Api = new mw.Api();
            i18n = i18nData;
            moveSummary = window.massRenameSummary || i18n.inContentLang().msg('summary').plain();
            FormHTML =
                $('<form>', {
                    'class': 'WikiaForm'
                }).append(
                    $('<fieldset>').append(
                        $('<p>', {
                            text: i18n.msg('instructions').plain()
                        }),
                        $('<p>', {
                            text: i18n.msg('instructions2').plain()
                        }),
                        $('<label>', {
                            'for': 'redirect-check',
                            text: i18n.msg('redirect').plain()
                        }).append(
                            $('<input>', {
                                type: 'checkbox',
                                id: 'redirect-check'
                            })
                        ),
                        $('<textarea>', {
                            id: 'text-rename',
                            placeholder: 'old_name new_name'
                        }),
                        $('<div>', {
                            id: 'text-error-output',
                            text: i18n.msg('outputInitial').plain()
                        })
                    )
                );
 
            $('#my-tools-menu').prepend(
                $('<li>').append(
                    $('<a>', {
                        id: 't-mr',
                        text: i18n.msg('title').plain(),
                        click: click
                    })
                )
            );
        });
    });
    // Imports
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:MassRename.css'
        }
    );
})(this.jQuery, this.mediaWiki);