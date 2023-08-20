/**
 * @Name            MassProtect
 * @Version         v2.3
 * @Author          KnazO
 * @Author          TheGoldenPatrik1
 * @Description     Protect listed pages.
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.user'
], function () {
    if (
        !/sysop|content-moderator|staff|wiki-representative|wiki-specialist|soap/.test(mw.config.get('wgUserGroups').join()) ||
        window.MassProtectLoaded
    ) {
      return;
    }
    window.MassProtectLoaded = true;
    var Api = new mw.Api(),
        i18n,
        placement,
        preloads = 3,
        protectModal,
        paused = true;
    /**
     * @method generateElement
     * @description Creates a select dropdown menu.
     * @parama {String} type - The protection type.
     */
    function generateElement (type) {
        return  $('<p>', {
            text: i18n.msg(type).plain()
        }).append(
            $('<select>', {
                id: 'protect-' + type
            }).append(
                $('<option>', {
                    value: '',
                    text: i18n.msg('unset').plain()
                }),
                $('<option>', {
                    value: type + '=all',
                    text: i18n.msg('all').plain()
                }),
                $('<option>', {
                    value: type + '=autoconfirmed',
                    text: i18n.msg('autoconfirmed').plain()
                }),
                $('<option>', {
                    value: type + '=sysop',
                    text: i18n.msg('sysop').plain()
                })
            )
        );
    }
    /**
     * @method formHtml
     * @description The modal's HTML.
     */
    function formHtml () {
        return $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>', {
                    text: i18n.msg('protection').plain(),
                    id: 'protection-bold'
                }),
                generateElement('edit'),
                generateElement('move'),
                generateElement('upload'),
                generateElement('create'),
                generateElement('comment'),
                $('<hr/>'),
                $('<p>', {
                    text: i18n.msg('expiry').plain(),
                    id: 'protection-bold'
                }).append(
                    $('<input>', {
                        type: 'text',
                        id: 'protect-expiry',
                        placeholder: 'indefinite'
                    })
                ),
                $('<hr/>'),
                $('<p>', {
                    text: i18n.msg('reason').plain(),
                    id: 'protection-bold'
                }).append(
                    $('<input>', {
                        type: 'text',
                        id: 'protect-reason'
                    })
                ),
                $('<hr/>'),
                $('<p>', {
                    text: i18n.msg('instructions').plain()
                }),
                $('<textarea/>', {
                    id: 'text-mass-protect'
                }),
                $('<hr/>'),
                $('<div>', {
                    id: 'text-error-output',
                    text: i18n.msg('error').plain()
                }).append(
                    $('<br/>')
                )
            )
        ).prop('outerHTML');
    }
    /**
     * @method preload
     * @description Preloads the script and the hooks.
     */
    function preload () {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('MassProtect').then(init);
        }
    }
    /**
     * @method init
     * @description Initiates the script and adds the button.
     * @param {String} i18nData - Variable for I18n-js
     */
    function init (i18nData) {
        i18n = i18nData;
        placement.script('MassProtect');
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>', {
                'class': 'custom'
            }).append (
                $('<a>',{
                    id: 't-mp',
                    text: i18n.msg('title').plain(),
                    click: click
                })
            )
        );
    }
    /**
     * @method click
     * @description Shows the MassProtect modal.
     */
    function click () {
        if (protectModal) {
            protectModal.show();
            return;
        }
        protectModal = new window.dev.modal.Modal({
            content: formHtml(),
            id: 'form-mass-protect',
            size: 'medium',
            title: i18n.msg('title').escape(),
            buttons: [
                {
                    id: 'mp-start',
                    text: i18n.msg('initiate').escape(),
                    primary: true,
                    event: 'start'
                },
                {
                    id: 'mp-pause',
                    text: i18n.msg('pause').escape(),
                    primary: true,
                    event: 'pause',
                    disabled: true
                },
                {
                    text: i18n.msg('addCategory').escape(),
                    primary: true,
                    event: 'addCategoryContents'
                },
                {
                    text: i18n.msg('cancel').escape(),
                    event: 'close'
                }
            ],
            events: {
                addCategoryContents: addCategoryContents,
                pause: pause,
                start: start
            }
        });
        protectModal.create();
        protectModal.show();
    }
    /**
     * @method pause
     * @description Pauses the operation.
     */
    function pause () {
        paused = true;
        document.getElementById('mp-pause').setAttribute('disabled', '');
        document.getElementById('mp-start').removeAttribute('disabled');
    }
    /**
     * @method start
     * @description Initiates the operation.
     */
    function start () {
        paused = false;
        document.getElementById('mp-start').setAttribute('disabled', '');
        document.getElementById('mp-pause').removeAttribute('disabled');
        process();
    }
    /**
     * @method process
     * @description Performs the process.
     */
    function process () {
        if (paused) {
            return;
        }
        var txt = document.getElementById('text-mass-protect'),
            pages = txt.value.split('\n'),
            currentPage = pages[0];
        if (!currentPage) {
            pause();
            $('#text-error-output').append(
                i18n.msg('finished').escape() +
                ' ' +
                i18n.msg('done').escape() +
                '<br/>'
            );
        } else {
            protectPage(currentPage);
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
    }
    /**
     * @method addCategoryContents
     * @description Inputs the contents of a category.
     */
    function addCategoryContents () {
        var category = prompt(i18n.msg('categoryPrompt').plain());
        if (!category) {
            return;
        }
        Api.get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 'max'
        })
        .done(function (d) {
            var data = d.query;
            for (var i in data.categorymembers) {
                var currTitles = $('#text-mass-protect').val();
                $('#text-mass-protect').val(currTitles + data.categorymembers[i].title + '\n');
            }
        })
        .fail(function (code) {
            $('#text-error-output').append(i18n.msg('categoryFail').escape() + category + ' : ' + code + '<br/>');
        });
    }
    /**
     * @method protectPage
     * @description Performs the protection.
     * @param {String} page - The page to protect.
     */
    function protectPage (page) {
        Api.post({
            action: 'protect',
            expiry: $('#protect-expiry').val() || $('#protect-expiry').attr('placeholder'),
            protections: $('#protect-create').val() || [$('#protect-edit').val(), $('#protect-move').val(), $('#protect-upload').val(), $('#protect-comment').val()].filter(Boolean).join('|'),
            watchlist: 'preferences',
            title: page,
            reason: $('#protect-reason').val(),
            token: mw.user.tokens.get('csrfToken')
        })
        .done(function (d) {
            console.log(i18n.msg('success', page).plain());
        })
        .fail(function (code) {
            console.log(i18n.msg('fail').escape() + page + ': ' + code);
            $('#text-error-output').append(i18n.msg('fail').escape() + page + ': ' + code + '<br/>');
        });
        setTimeout(process, window.massProtectDelay || 1000);
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
            articles: ['u:dev:MediaWiki:MassProtect.css']
        }
    );
});