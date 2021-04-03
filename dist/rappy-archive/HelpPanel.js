require([
    require.optional('ext.wikia.design-system.loading-spinner'),
    'jquery',
    'mw',
    require.optional('wikia.tracker'),
    'wikia.window'
], function(Spinner, $, mw, tracker, window) {
    // Load protection
    if (window.helpPanelLoaded) {
        return;
    }
    window.helpPanelLoaded = true;

    var HelpPanel = {
        config: mw.config.get([
            'wgIsEditPage',
            'wgSassParams',
            'wgSiteName',
            'wgUserName'
        ]),
        helpPages: [
            'general-editing-help',
            'infoboxes',
            'adding-images',
            'adding-links',
            'source-editor'
        ],
        loading: 3,
        preload: function() {
            if (--this.loading === 0) {
                window.dev.i18n.loadMessages('u:rappy:MediaWiki:Custom-HelpPanel/i18n.json')
                    .then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.addCSS();
            this.addTracking();
            this.ipPromise = this.config.wgUserName ?
                $.Deferred().resolve() :
                this.fetchIP();
            if (this.config.wgIsEditPage) {
                this.initEditor();
            } else {
                mw.hook('ve.activationComplete')
                    .add($.proxy(this.initEditor, this));
                mw.hook('ve.deactivationComplete')
                    .add($.proxy(this.destroyVisualEditor, this));
            }
        },
        addCSS: function() {
            var background = $('#EditPage').css('background-color');
            if (!$('#EditPage').exists()) {
                // Probably VisualEditor
                background = $('#WikiaPage').css('background-color');
            }
            mw.util.addCSS(
                'html {' +
                '--helpPanel-bgcolor:' + background + ';' +
                '--helpPanel-color:' + this.config.wgSassParams['color-body'] + ';' +
                '--helpPanel-header-bgcolor:' + this.config.wgSassParams['color-header'] + ';' +
                '}'
            );
        },
        fetchIP: function() {
            return $.get(mw.util.wikiScript('api'), {
                action: 'query',
                meta: 'userinfo',
                format: 'json'
            });
        },
        togglePanelOpen: function() {
            $('#helpPanel')
                .toggleClass('hideHelpPanel')
                .toggleClass('showHelpPanel');
        },
        togglePanelClose: function() {
            $('#helpPanel')
                .toggleClass('hideHelpPanel')
                .toggleClass('showHelpPanel');
        },
        submitPost: function() {
            if ($('#hp-forum-textarea').val() === '') {
                $('#helpPanel-forum .error-msg').css('display','block');
                return;
            }
            $.ajax({
                type: 'POST',
                // PROD: Change to community.fandom.com
                url: 'https://' + this.i18n.msg('community-wiki-url').plain() + '/wikia.php?' + $.param({
                    controller: 'WallExternal',
                    method: 'postNewMessage',
                    format: 'jsonp'
                }),
                data: {
                    body: $('#hp-forum-textarea').val() + (
                          $('#helpPanel-check').attr('checked') === 'checked' ?
                              ('\n\n\n' + new mw.Uri(mw.util.getUrl()).toString()) :
                              ''
                          ),
                    messagetitle: $('#helpPanel-check').attr('checked') == 'checked' ?
                        this.i18n.msg('need-help-on', this.config.wgSiteName).plain() :
                        this.i18n.msg('need-help').plain(),
                    // PROD: Change to board name
                    pagetitle: this.config.wgUserName === 'KockaAdmiralac' ?
                        'KockaAdmiralac' :
                        'Rappy 4187',
                    // PROD: Change to 2000
                    pagenamespace: 1200,
                    token: mw.user.tokens.get('editToken')
                },
                xhrFields: {
                    withCredentials: true
                },
                complete: $.proxy(this.checkPost, this)
            });
            $('#helpPanel-spinner').addClass('show');
            $('#helpPanel-forum .error-msg').css('display','none');
        },
        checkPost: function() {
            $.ajax({
                type: 'GET',
                // PROD: Change to community.fandom.com
                url: 'https://rappy.fandom.com/api.php',
                data: {
                    action: 'query',
                    list: 'usercontribs',
                    ucuser: this.config.wgUserName || this.ip,
                    // PROD: Change to 2001
                    ucnamespace: 1201,
                    ucprop: 'ids',
                    uclimit: 1,
                    format: 'json'
                },
                dataType: 'jsonp',
                success: $.proxy(this.submittedPost, this),
                error: $.proxy(this.submittedFail, this)
            });
        },
        submittedPost: function(data) {
            if (
                // If the user posted no posts...
                data.query.usercontribs.length === 0 ||
                // ...or the last post was over an hour ago...
                new Date(data.query.usercontribs[0].timestamp) < new Date() - 60 * 60 * 1000
            ) {
                // ...something failed to submit.
                return this.submittedFail(data);
            }
            $('#helpPanel-post-link').attr(
                'href',
                // PROD: Change to community.fandom.com
                'https://rappy.fandom.com/wiki/Thread:' +
                data.query.usercontribs[0].pageid
            );
            $('#helpPanel-spinner').removeClass('show');
            $('#hp-step3')
                .addClass('showHP-step')
                .removeClass('hideHP-step');
            $('#hp-step1, #hp-step2')
                .addClass('hideHP-step')
                .removeClass('showHP-step');
        },
        submittedFail: function(data) {
            // TODO: How do we handle this?
            console.error(data);
        },
        toggleStep1: function() {
            $('#hp-step1')
                .addClass('showHP-step')
                .removeClass('hideHP-step');
            $('#hp-step2, #hp-step3')
                .addClass('hideHP-step')
                .removeClass('showHP-step');
        },
        toggleStep2: function() {
            $('#hp-step2')
                .addClass('showHP-step')
                .removeClass('hideHP-step');
            $('#hp-step1, #hp-step3')
                .addClass('hideHP-step')
                .removeClass('showHP-step');
        },
        done: function() {
            $('#hp-forum-textarea').val('');
            this.toggleStep1();
        },
        waitForIP: function() {
            this.ipPromise.then($.proxy(this.gotIP, this));
        },
        gotIP: function(data) {
            if (this.config.wgUserName) {
                $('#helpPanel-post-text').html(
                    this.i18n.msg(
                        'ask-intro',
                        this.i18n.msg('username').plain(),
                        this.config.wgUserName
                    ).parse()
                );
            } else {
                this.ip = data.query.userinfo.name;
                $('#helpPanel-post-text').html(
                    this.i18n.msg(
                        'ask-intro',
                        this.i18n.msg('ip').plain(),
                        this.ip
                    ).parse()
                );
            }
            $('#hp-step2')
                .addClass('showHP-step')
                .removeClass('hideHP-step');
            $('#hp-step1, #hp-step3')
                .addClass('hideHP-step')
                .removeClass('showHP-step');
        },
        initEditor: function() {
            if (!$('#WikiaNotifications').exists()) {
                var notifications = window.dev.ui({
                    type: 'ul',
                    attr: {
                        id: 'WikiaNotifications'
                    },
                    classes: ['WikiaNotifications']
                });
                if ($('#WikiaBar').exists()) {
                    $('#WikiaBar').append(notifications);
                } else {
                    $(document.body).append(notifications);
                }
            }
            $('#WikiaNotifications').append(
                window.dev.ui({
                    type: 'li',
                    children: [{
                        type: 'div',
                        attr: {
                            id: 'helpPanelCTA',
                        },
                        events: {
                            click: $.proxy(this.togglePanelOpen, this)
                        },
                        children: [{
                            type: 'p',
                            text: this.i18n.msg('get-help').plain()
                        }, {
                            type: 'a',
                            classes: ['sprite', 'close-notification']
                        }]
                    }]
                }),
                window.dev.ui({
                    type: 'div',
                    attr: {
                        id: 'helpPanel',
                    },
                    classes: ['hideHelpPanel'],
                    children: [{
                        type: 'div',
                        attr: {
                            id: 'helpPanel-spinner'
                        },
                        html: Spinner ?
                            new Spinner(38, 2).html
                                .replace('wds-block', 'wds-spinner__block')
                                .replace('wds-path', 'wds-spinner__stroke') :
                            ''
                    }, {
                        type: 'div',
                        classes: ['helpPanel-close'],
                        events: {
                            click: $.proxy(this.togglePanelClose, this)
                        },
                        children: [window.dev.wds.icon('close')],
                    }, {
                        type: 'div',
                        classes: ['helpPanel-contents'],
                        children: [
                            this.renderStepOne(),
                            this.renderStepTwo(),
                            this.renderStepThree()
                        ]
                    }]
                })
            );
            mw.hook('HelpPanel.ui').fire();
        },
        renderStepOne: function() {
            return {
                type: 'div',
                attr: {
                    id: 'hp-step1'
                },
                classes: ['showHP-step'],
                children: [{
                    type: 'div',
                    attr: {
                        id: 'helpPanelHead'
                    },
                    children: [{
                        type: 'div',
                        classes: ['helpPanel-question'],
                        children: [window.dev.wds.icon('question')],
                    }, {
                        type: 'h3',
                        text: this.i18n.msg('get-help2').plain()
                    }]
                }, {
                    type: 'div',
                    attr: {
                        id: 'helpPanel-main'
                    },
                    children: [{
                        type: 'h4',
                        text: this.i18n.msg('top-help-pages').plain()
                    }, {
                        type: 'ul',
                        children: this.helpPages.map(this.mapHelpPage, this)
                    }, {
                        type: 'p',
                        children: [this.mapHelpPage('more-help-articles')]
                    }]
                }, {
                    type: 'div',
                    attr: {
                        id: 'helpPanel-forum'
                    },
                    children: [{
                        type: 'div',
                        html: this.i18n.msg('not-here').parse()
                    }, {
                        type: 'div',
                        attr: {
                            id: 'helpPanel-buttons'
                        },
                        children: [{
                            type: 'button',
                            classes: ['wikia-button'],
                            data: {
                                tracking: 'ask-on-forum'
                            },
                            events: {
                                click: $.proxy(this.waitForIP, this)
                            },
                            text: this.i18n.msg('ask').plain()
                        }]
                    }]
                }]
            };
        },
        renderStepTwo: function() {
            return {
                type: 'div',
                attr: {
                    id: 'hp-step2'
                },
                children: [{
                    type: 'div',
                    attr: {
                        id: 'helpPanelHead'
                    },
                    children: [{
                        type: 'div',
                        classes: ['helpPanel-question'],
                        children: [window.dev.wds.icon('question')]
                    }, {
                        type: 'h3',
                        text: this.i18n.msg('ask').plain()
                    }]
                }, {
                    type: 'div',
                    attr: {
                        id: 'helpPanel-main'
                    },
                    children: [{
                        type: 'p',
                        attr: {
                            id: 'helpPanel-post-text'
                        }
                    }]
                }, {
                    type: 'div',
                    classes: ['helpPanel-forumForm'],
                    attr: {
                        id: 'helpPanel-forum'
                    },
                    children: [{
                        type: 'p',
                        html: this.i18n.msg(
                            this.config.wgUserName ?
                                'reply-info' :
                                'reply-info-anon'
                        ).parse()
                        // For security reasons
                        .replace('$1', window.dev.wds.icon('message').outerHTML),
                    }, {
                        type: 'h4',
                        text: this.i18n.msg('ask-header').plain()
                    }, {
                        type: 'div',
                        text: this.i18n.msg('question-error').plain(),
                        classes: ['error-msg']
                    }, {
                        type: 'textarea',
                        attr: {
                            id: 'hp-forum-textarea',
                            tabindex: '0',
                            data: {
                                tracking: 'post-done'
                            },
                            'aria-disabled': 'false',
                            rows: '3',
                            placeholder: this.i18n.msg('ask-placeholder').plain()
                        }
                    }, {
                        type: 'input',
                        attr: {
                            type: 'checkbox',
                            id: 'helpPanel-check',
                            name: 'include-title',
                            checked: 'checked'
                        }
                    }, {
                        type: 'label',
                        attr: {
                            'for': 'helpPanel-check'
                        },
                        text: this.i18n.msg('include-title').plain()
                    }, {
                        type: 'div',
                        attr: {
                            id: 'helpPanel-buttons'
                        },
                        children: [{
                            type: 'button',
                            classes: ['wikia-button', 'secondary'],
                            text: this.i18n.msg('back').plain(),
                            data: {
                                tracking: 'forum-question-back'
                            },
                            events: {
                                click: $.proxy(this.toggleStep1, this)
                            }
                        }, {
                            type: 'button',
                            classes: ['wikia-button'],
                            text: this.i18n.msg('submit').plain(),
                            data: {
                                tracking: 'forum-question-submitted'
                            },
                            events: {
                                click: $.proxy(this.submitPost, this)
                            }
                        }]
                    }]
                }]
            };
        },
        renderStepThree: function() {
            return {
                type: 'div',
                attr: {
                    id: 'hp-step3'
                },
                children: [{
                    type: 'div',
                    attr: {
                        id: 'helpPanelHead'
                    },
                    children: [{
                        type: 'div',
                        classes: ['helpPanel-question'],
                        children: [window.dev.wds.icon('question')]
                    }, {
                        type: 'h3',
                        text: this.i18n.msg('ask').plain()
                    }]
                }, {
                    type: 'div',
                    attr: {
                        id: 'helpPanel-main'
                    },
                    children: [{
                        type: 'h4',
                        children: [{
                            type: 'span',
                            children: [window.dev.wds.icon('checkmark')]
                        }, {
                            type: 'span',
                            classes: ['successmsg'],
                            text: this.i18n.msg('success-header').plain()
                        }]
                    }, {
                        type: 'p',
                        text: this.i18n.msg('success-message-intro').plain()
                    }, {
                        type: 'p',
                        html: this.i18n.msg(
                            this.config.wgUserName ?
                                'success-message' :
                                'success-message-anon'
                        ).parse()
                        // For security reasons
                        .replace('$1', window.dev.wds.icon('message').outerHTML),
                    }, {
                        type: 'p',
                        children: [{
                            type: 'a',
                            attr: {
                                href: '#',
                                id: 'helpPanel-post-link',
                                target: '_blank'
                            },
                            data: {
                                tracking: 'post-link'
                            },
                            text: this.i18n.msg('forum-link').plain()
                        }]
                    }]
                }, {
                    type: 'div',
                    attr: {
                        id: 'helpPanel-forum'
                    },
                    children: [{
                        type: 'div',
                        attr: {
                            id: 'helpPanel-buttons'
                        },
                        children: [{
                            type: 'button',
                            classes: ['wikia-button'],
                            attr: {
                                'aria-diabled': 'false',
                                tabindex: '0',
                            },
                            text: this.i18n.msg('done').plain(),
                            events: {
                                click: $.proxy(this.done, this)
                            }
                        }]
                    }]
                }]

            };
        },
        mapHelpPage: function(page) {
            var linkMsg = page === 'general-editing-help' ?
                this.config.wgIsEditPage ?
                    'classic-page' :
                    'visual-page' :
                page + '-page';
            return {
                type: 'li',
                children: [{
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl(this.i18n.inContentLang().msg(linkMsg).plain()),
                        target: '_blank',
                        // Also used for tracking purposes
                        title: page
                    },
                    classes: ['helpPanel-help-page-link'],
                    text: this.i18n.msg(page).plain()
                }]
            };
        },
        destroyVisualEditor: function() {
            $('#helpPanelCTA').remove();
        },
        track: function(action, label, args) {
            tracker.track($.extend({
                trackingMethod: 'analytics',
                category: 'help-panel',
                action: action,
                label: label +
                       (this.config.wgUserName ? '' : '-anon')
            }, args));
        },
        addTracking: function() {
            if (!tracker) {
                // wikia.tracker failed to load, perhaps tracking
                // is disabled?
                return;
            }
            this.track(tracker.ACTIONS.VIEW, this.config.wgUserName ? 'editor-loaded' : 'editor-loaded-anon', {
                noninteraction: true
            });
            $('body')
                .on('click', '#helpPanelCTA', $.proxy(this.trackOpenModal, this))
                .on('click', '#helpPanel .helpPanel-close', $.proxy(this.trackCloseModal, this))
                .on('click', '#helpPanel [data-tracking]', $.proxy(this.trackButtonClick, this))
                .on('click', '#helpPanel .helpPanel-help-page-link', $.proxy(this.trackHelpPageClick, this));
        },
        trackOpenModal: function() {
            this.track(tracker.ACTIONS.CLICK, 'toggle-panel-open');
        },
        trackCloseModal: function() {
            this.track(tracker.ACTIONS.CLICK, 'toggle-panel-close');
        },
        trackButtonClick: function(event) {
            this.track(tracker.ACTIONS.CLICK, 'button-' + $(event.target).attr('data-tracking'));
        },
        trackHelpPageClick: function(event) {
            this.track(tracker.ACTIONS.CLICK, 'article-' + $(event.target).attr('title'));
        }
    };
    mw.hook('dev.ui').add($.proxy(HelpPanel.preload, HelpPanel));
    mw.hook('dev.i18n').add($.proxy(HelpPanel.preload, HelpPanel));
    mw.hook('dev.wds').add($.proxy(HelpPanel.preload, HelpPanel));

    // Load dependencies
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    }, {
        type: 'style',
        articles: [
            'u:rappy:MediaWiki:HelpPanel.css'
        ]
    });
});