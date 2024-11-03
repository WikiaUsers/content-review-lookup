/**
 * Mass Rename
 * @description Rename pages quickly.
 * @author KnazO
 */
mw.loader.using('mediawiki.api', function () {
    if (
        window.MassRenameLoaded ||
        !/sysop|content-moderator|bot|bot-global|staff|global-discussions-moderator|content-volunteer|wiki-specialist|soap|global-edit-reviewer/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }
    window.MassRenameLoaded = true;
    var i18n,
        placement,
        renameModal,
        preloads = 3,
        paused = false;
    /**
     * @method formHtml
     * @description Creates the modal HTML
     */
    function formHtml () {
        return $('<form>', {
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
                $('<br>'),
                $('<label>', {
                    'for': 'custom-summary',
                    text: i18n.msg('custom-summary').plain()
                }).append(
					$('<input>', {
					    id: 'custom-summary'
					})
                ),
                $('<textarea>', {
                    id: 'text-rename',
                    placeholder: 'old_name new_name'
                }),
                $('<div>', {
                    id: 'text-error-output',
                    text: i18n.msg('outputInitial').plain(),
                    append: '<br/>'
                })
            )
        ).prop('outerHTML');
    }
    /**
     * @method preload
     * @description Loads the hooks and I18n messages
     */
    function preload () {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('MassRename').then(init);
        }
    }
    /**
     * @method init
     * @description Initiates the script
     * @param {String} i18nData - Variable for I18n-js
     */
    function init (i18nData) {
        i18n = i18nData;
        placement.script('MassRename');
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 't-mr',
                    text: i18n.msg('title').plain(),
                    click: click
                })
            )
        );
    }
    /**
     * @method click
     * @description Opens the MassRename modal
     */
    function click () {
        if (renameModal) {
            renameModal.show();
            return;
        }
        renameModal = new window.dev.modal.Modal({
            content: formHtml(),
            id: 'form-mass-rename',
            size: 'medium',
            title: i18n.msg('title').escape(),
            buttons: [
                {
                    id: 'mr1-start',
                    text: i18n.msg('initiate').escape(),
                    primary: true,
                    event: 'start'
                },
                {
                    id: 'mr1-pause',
                    text: i18n.msg('pause').escape(),
                    primary: true,
                    event: 'pause',
                    disabled: true
                },
                {
                    text: i18n.msg('close').escape(),
                    event: 'close'
                }
            ],
            events: {
                pause: pause,
                start: start
            }
        });
        renameModal.create();
        renameModal.show();
    }
    /**
     * @method pause
     * @description Pauses the operation
     */
    function pause () {
        paused = true;
        document.getElementById('mr1-pause').setAttribute('disabled', '');
        document.getElementById('mr1-start').removeAttribute('disabled');
    }
    /**
     * @method start
     * @description Starts the operation
     */
    function start () {
        paused = false;
        document.getElementById('mr1-start').setAttribute('disabled', '');
        document.getElementById('mr1-pause').removeAttribute('disabled');
        process();
    }
    /**
     * @method process
     * @description Analyzes the inputted data
     */
    function process () {
        if (paused) {
            return;
        }
        var txt = document.getElementById('text-rename'),
            pages = txt.value.split('\n'),
            page = pages[0];
        if (!page) {
            $('#text-error-output').append(
                i18n.msg('finished').escape() +
                ' ' +
                i18n.msg('nothingLeftToDo').escape() +
                '<br/>'
            );
            pause();
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
                    reason:
                    	($('#custom-summary')[0].value.length > 0 && $('#custom-summary')[0].value) ||
                        window.massRenameSummary ||
                        i18n.inContentLang().msg('summary').plain(),
                    bot: true,
                    token: mw.user.tokens.get('csrfToken')
                };
            if (document.getElementById('redirect-check').checked) {
                delete config.noredirect;
            }
            new mw.Api().post(config)
            .done(function (d) {
                if (!d.error) {
                    console.log(i18n.msg('renameDone', oldName, newName).plain());
                } else {
                    console.error(i18n.msg('renameFail', oldName, newName).escape() + ': ' + d.error.code);
                    $('#text-error-output').append(i18n.msg('renameFail', oldName, newName).escape() + ': ' + d.error.code + '<br/>');
                }
            })
            .fail(function (error) {
                console.error(i18n.msg('renameFail', oldName, newName).plain() + ': ' + error);
                $('#text-error-output').append(i18n.msg('renameFail2', oldName, newName).escape() + '<br/>');
            });
        }
        setTimeout(process, window.massRenameDelay || 1000);
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
            articles: ['u:dev:MediaWiki:MassRename.css']
        }
    );
});