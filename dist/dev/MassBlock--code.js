/**
 * Mass Block
 * Block listed users
 * @author Ozank
 * @author KockaAdmiralac
 */
(function() {
    'use strict';
    if (
        !/(sysop|staff|helper|soap|global-discussions-moderator|wiki-representative)/.test(mw.config.get('wgUserGroups')) ||
        window.MassBlockLoaded
    ) {
        return;
    }
    window.MassBlockLoaded = true;
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        },
        {
            type: 'style',
            articles: [
                'u:dev:MediaWiki:MassBlock.css'
            ]
        }
    );
    var isLegacy = mw.config.get('wgVersion') === '1.19.24';
    var MassBlock = {
        _loading: 0,
        paused: true,
        hooks: function() {
            mw.hook('dev.i18n').add($.proxy(this.preload, this));
            mw.hook('dev.modal').add($.proxy(this.preload, this));
            mw.hook('dev.placement').add($.proxy(this.preload, this));
            mw.hook('dev.ui').add($.proxy(this.preload, this));
        },
        preload: function() {
            if (++this._loading === 4) {
                this.ui = window.dev.ui;
                window.dev.i18n.loadMessages('MassBlock').then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            this.generateForm();
            this.makeButton();
        },
        generateForm: function() {
            this.form = this.ui({
                type: 'form',
                attr: {
                    method: '',
                    name: ''
                },
                classes: ['WikiaForm'],
                children: [
                    {
                        type: 'fieldset',
                        children: [
                            this.inputField('expiry', 'expires', 'text', {
                                placeholder: 'infinite'
                            }),
                            this.inputField('reason', 'reason', 'text', {
                                placeholder: this.msg('reasonExample')
                            }),
                            this.inputField('rstrtp', 'talkPage', 'checkbox', {
                                checked: ''
                            }),
                            this.inputField('auto', 'autoblock', 'checkbox', {
                                checked: ''
                            }),
                            this.inputField('noCreate', 'noCreate', 'checkbox', {
                                checked: ''
                            }),
                            this.inputField('watch', 'watch', 'checkbox', {
                                checked: ''
                            }),
                            this.inputField('iw', 'ignoreWarnings', 'checkbox', $.extend({
                                checked: ''
                            }, isLegacy ? { disabled: '' } : null)),
                            {
                                type: 'p',
                                text: this.msg('instructions')
                            },
                            {
                                type: 'textarea',
                                attr: {
                                    id: 'text-mass-block'
                                }
                            },
                            {
                                type: 'div',
                                attr: {
                                    id: 'text-error-output'
                                },
                                text: this.msg('outputInitial')
                            }
                        ]
                    }
                ]
            });
        },
        inputField: function(name, msg, type, attr) {
            var prefixed = 'block-' + name;
            return {
                type: 'div',
                attr: {
                    id: prefixed + '-wrapper'
                },
                children: [
                    {
                        type: 'label',
                        attr: {
                            'for': prefixed
                        },
                        text: this.msg(msg)
                    },
                    {
                        type: 'input',
                        attr: $.extend({
                            type: type,
                            id: prefixed,
                            name: prefixed
                        }, attr)
                    }
                ]
            };
        },
        makeButton: function() {
            window.dev.placement.loader.util({
                script: 'MassBlock',
                content: {
                    type: 'li',
                    classes: ['custom'],
                    children: [
                        {
                            type: 'a',
                            attr: {
                                id: 't-bb'
                            },
                            text: this.msg('title')
                        }
                    ]
                },
                element: 'tools',
                type: 'prepend'
            });
            $('#t-bb').click($.proxy(this.click, this));
        },
        click: function() {
            if (this.blockModal) {
                this.blockModal.show();
                return;
            }
            this.blockModal = new window.dev.modal.Modal({
                content: this.form,
                id: 'form-mass-block',
                size: 'medium',
                title: this.i18n.msg('title').escape(),
                buttons: [
                    {
                        id: 'mb-start',
                        text: this.i18n.msg('initiate').escape(),
                        primary: true,
                        event: 'start'
                    },
                    {
                        id: 'mb-pause',
                        text: this.i18n.msg('pause').escape(),
                        primary: true,
                        event: 'pause',
                        disabled: true
                    },
                    {
                        text: this.i18n.msg('group').escape(),
                        primary: true,
                        event: 'addGroupContents'
                    },
                    {
                        text: this.i18n.msg('cancel').escape(),
                        event: 'close'
                    }
                ],
                events: {
                    addGroupContents: $.proxy(this.addGroupContents, this),
                    pause: $.proxy(this.pause, this),
                    start: $.proxy(this.start, this)
                }
            });
            this.blockModal.create();
            this.blockModal.show();
        },
		addGroupContents: function() {
            var group = prompt(this.i18n.msg('groupPrompt').escape());
            if (!group) {
                return;
            }
            this.api.get({
                action: 'query',
                list: 'allusers|groupmembers',
                augroup: group,
                aulimit: 'max',
                gmgroups: group,
                gmlimit: 'max',
                format: 'json'
            })
            .done($.proxy(function(d) {
                if (!d.error) {
                    (d.users || d.query.allusers).forEach(function(user) {
                        $('#text-mass-block').val($('#text-mass-block').val() + user.name + '\n');
                    });
                }
                else {
                    $('#text-error-output').append(this.i18n.msg('groupError').escape() + ' ' + group +' : '+ d.error.code +'<br/>');
                }
            }, this))
            .fail($.proxy(function(code) {
                if (isLegacy) {
                    $('#text-error-output').append(this.i18n.msg('groupError').escape() + ' ' + group +'!<br/>');
                } else {
                    $('#text-error-output').append(this.i18n.msg('groupError').escape() + ' ' + group +' : '+ code +'<br/>');
                }
            }, this));
        },
        pause: function() {
            this.paused = true;
            document.getElementById('mb-pause').setAttribute('disabled', '');
            document.getElementById('mb-start').removeAttribute('disabled');
        },
        start: function () {
            this.paused = false;
            document.getElementById('mb-start').setAttribute('disabled', '');
            document.getElementById('mb-pause').removeAttribute('disabled');
            this.process();
        },
        process: function() {
            if (this.paused) {
                return;
            }
            var $text = $('#text-mass-block'),
                pages = $text.val().split('\n'),
                user = pages.shift();
            if (user) {
                this.doBlock(user);
            } else {
                this.pause();
                $('#text-error-output').append(
                    '<br/>',
                    this.i18n.msg('finished').escape(),
                    ' ',
                    this.i18n.msg('nothingLeftToDo').escape()
                );
            }
            $text.val(pages.join('\n'));
        },
        doBlock: function(name) {
            var $reason = $('#block-reason'),
                $expiry = $('#block-expiry'),
                params = {
                    action: 'block',
                    user: name,
                    reason: $reason.val() || $reason.attr('placeholder'),
                    expiry: $expiry.val() || $expiry.attr('placeholder'),
                    token: mw.user.tokens.get('editToken')
                };
            if ($('#block-auto').prop('checked')) {
                params.autoblock = true;
            }
            if (!$('#block-auto').prop('checked')) {
                params.anononly = true;
            }
            if ($('#block-watch').prop('checked')) {
                params.watchuser = true;
            }
            if (!$('#block-rstrtp').prop('checked')) {
                params.allowusertalk = true;
            }
            if ($('#block-noCreate').prop('checked')) {
                params.nocreate = true;
            }
            // TODO: This won't work on 1.19 unless T34434 is backported.
            if ($('#block-iw').prop('checked')) {
                params.reblock = true;
            }
            this.api.post(params).done($.proxy(function(d) { 
                if (d.error) {
                    this.blockFail(d.error.code, name)();
                } else {
                    console.log(this.i18n.msg('blockDone', name).plain());
                }
            }, this)).fail(this.blockFail(this.msg('ajaxError'), name));        
            setTimeout(
                $.proxy(this.process, this),
                window.massBlockDelay || 1000
            );
        },
        blockFail: function(error, name) {
            return $.proxy(function(code) {
                if (!isLegacy) {
                    error = code;
                }
                var msg = this.i18n.msg('blockFail', name, error);
                console.error(msg.plain());
                $('#text-error-output').append('<br />', msg.escape());
            }, this);
        },
        msg: function(msg) {
            return this.i18n.msg(msg).plain();
        }
    };
    mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).then(
        $.proxy(MassBlock.hooks, MassBlock)
    );
})();