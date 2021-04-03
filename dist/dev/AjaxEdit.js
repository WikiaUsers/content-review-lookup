/**
 * @name            AjaxEdit
 * @version         v1.4
 * @author          TheGoldenPatrik1
 * @description     Edit without opening the editor.
 * @protect         <nowiki>
 */
if (mw.config.get('wgVersion') === '1.19.24') require([
    'wikia.window',
    'jquery',
    'mw',
    'BannerNotification',
    'ext.wikia.design-system.loading-spinner',
    'wikia.browserDetect'
], function (window, $, mw, BannerNotification, Spinner, browserDetect) {
    'use strict';
    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgCurRevisionId',
        'wgPageName',
        'wgScript',
        'wgUserGroups',
        'wgUserLanguage'
    ]);
    if (
        window.AjaxEditLoaded ||
        !$('#ca-edit').exists() ||
        $('.UserProfileActionButton').find('img').first().attr('class') === 'sprite lock' ||
        config.wgAction !== 'view' ||
        config.wgUserGroups.indexOf('autoconfirmed') === -1
    ) {
        return;
    }
    window.AjaxEditLoaded = true;
    var $button;
    var $edit;
    var $text;
    var $minor;
    var $summary;
    var $spinner;
    var $article = $('#mw-content-text');
    var $sections = $article.find('.editsection');
    var $rail = $('#WikiaRail');
    var $wrapper = $('#WikiaMainContent');
    /**
     * @class Main
     * @description Central AjaxEdit class
     */
    var Main = {
        /**
         * @method publish
         * @description Publishes the edit
         * @returns {void}
         */
        publish: function () {
            if (this.diffModal) {
                this.diffModal.close();
            }
            if (this.previewModal) {
                this.previewModal.close();
            }
            $spinner.show();
            this.api.post({
                action: 'edit',
                title: config.wgPageName,
                summary: $summary.cleanedVal(),
                text: $text.val(),
                minor: $minor.prop('checked') ? true : false,
                token: mw.user.tokens.get('editToken'),
                watchlist: this.options.watchlist,
                section: this.section
            })
            .done(this.success.bind(this))
            .fail(this.fail.bind(this));
        },
        /**
         * @method success
         * @description Outputs .done results
         * @param {JSON} d - Data retured from .done
         * @returns {void}
         */
        success: function (d) {
            $spinner.hide();
            if (d.error) {
                this.notif(
                    this.i18n('errorKnown', d.error.code).escape(),
                    'error'
                );
            } else {
                if (
                    this.options.reload ||
                    mw.util.getParamValue('diff') ||
                    mw.util.getParamValue('oldid') ||
                    config.wgArticleId === 0 ||
                    this.section
                ) {
                    this.reload();
                } else {
                    $article.load(
                        window.location.href + ' #mw-content-text',
                        this.refresh.bind(this)
                    );
                }
            }
        },
        /**
         * @method fail
         * @description Outputs .fail results
         * @returns {void}
         */
        fail: function () {
            $spinner.hide();
            this.notif(
                this.i18n('errorUnknown').escape(),
                'error'
            );
        },
        /**
         * @method reload
         * @description Reloads the page
         * @returns {void}
         */
        reload: function () {
            window.location.href = mw.util.getUrl(config.wgPageName);
        },
        /**
         * @method refresh
         * @description Reloads the page without reloading
         * @returns {void}
         */
        refresh: function () {
            this.back();
            $edit.remove();
            this.rev += 1;
            this.content = $text.val();
            this.fireHook();
            this.notif(
                this.i18n('success').escape(),
                'confirm'
            );
        },
        /**
         * @method back
         * @description Returns to viewing the article
         * @returns {void}
         */
        back: function () {
            $edit.hide();
            $article.show();
            this.changeButton();
            if (this.options.hideRail) {
                $rail.show();
                if (!this.mobile) {
                    $wrapper.css(
                        'width',
                        ($('.WikiaPageContentWrapper').width() - 330) + 'px'
                    );
                }
            }
        },
        /**
         * @method restart
         * @description Reverts all changes
         * @returns {void}
         */
        restart: function () {
            $text.val(this.content);
            $summary.val('');
            $minor.prop('checked', this.options.minor);
        },
        /**
         * @method diff
         * @description Gets the diff
         * @returns {void}
         */
        diff: function () {
            $spinner.show();
            $.post(
                config.wgScript + '?' + $.param({
                    action: 'ajax',
                    rs: 'EditPageLayoutAjax',
                    title: config.wgPageName
                }),
                {
                    page: 'SpecialCustomEditPage',
                    method: 'diff',
                    content: $text.val(),
                    section: this.section || 0
                },
                this.loadDiff.bind(this)
            );
        },
        /**
         * @method loadDiff
         * @description Outputs the diff in a modal
         * @param {JSON} d - The diff data
         * @returns {void}
         */
        loadDiff: function (d) {
            var diffModalContent = $('<div>', {
                'class': 'ajax-edit__diff-modal',
                'append': d.html
            }).prop('outerHTML');
            if (this.diffModal) {
                this.diffModal.setContent(diffModalContent).show();
                $spinner.hide();
                return;
            }
            this.diffModal = new this.modal({
                content: diffModalContent,
                id: 'ajax-edit__diff',
                size: 'large',
                title: this.i18n('diffButton').escape(),
                buttons: [
                    {
                        text: this.i18n('publishButton').escape(),
                        primary: true,
                        event: 'publish'
                    },
                    {
                        text: this.i18n('close').escape(),
                        event: 'close'
                    }
                ],
                events: {
                    publish: this.publish.bind(this)
                }
            });
            this.diffModal.create();
            this.diffModal.show();
            $spinner.hide();
        },
        /**
         * @method preview
         * @description Gets the preview data
         * @returns {void}
         */
        preview: function () {
            $spinner.show();
            $.post(
                config.wgScript + '?' + $.param({
                    action: 'ajax',
                    rs: 'EditPageLayoutAjax',
                    title: config.wgPageName
                }),
                {
                    page: 'SpecialCustomEditPage',
                    method: 'preview',
                    summary: $summary.cleanedVal(),
                    content: $text.val(),
                    section: this.section || ''
                },
                $.proxy(this.loadPreview, this)
            );
        },
        /**
         * @method loadPreview
         * @description Outputs the preview in a modal
         * @param {JSON} d - The preview data
         * @returns {void}
         */
        loadPreview: function (d) {
            var previewModalContent = $('<div>', {
                'class': 'ajax-edit__preview-modal',
                'append': d.html
            }).prop('outerHTML');
            if (this.previewModal) {
                this.previewModal.setContent(previewModalContent).show();
                this.fireHook(true);
                $spinner.hide();
                return;
            }
            this.previewModal = new this.modal({
                content: previewModalContent,
                id: 'ajax-edit__preview',
                size: 'large',
                title: this.i18n('previewButton').escape(),
                buttons: [
                    {
                        text: this.i18n('publishButton').escape(),
                        primary: true,
                        event: 'publish'
                    },
                    {
                        text: this.i18n('close').escape(),
                        event: 'close'
                    }
                ],
                events: {
                    publish: this.publish.bind(this)
                }
            });
            this.previewModal.create().then(
                this.displayPreview.bind(this)
            );
        },
        /**
         * @method displayPreview
         * @description Displays the preview modal
         * @returns {void}
         */
        displayPreview: function () {
            this.previewModal.show();
            this.fireHook(true);
            $spinner.hide();
        },
        /**
         * @method replace
         * @description Outputs the replace modal
         * @returns {void}
         */
        replace: function () {
            if (this.replaceModal) {
                this.replaceModal.show();
                return;
            }
            var replaceModalContent = $('<div>', {
                'class': 'ajax-edit__replace-modal'
            }).append(
                $('<p>').append(
                    this.i18n('farFind').escape(),
                    $('<textarea>', {
                        'rows': '4',
                        'wrap': 'off',
                        'id': 'ajax-edit__replace-find'
                    })
                ),
                $('<p>').append(
                    this.i18n('farReplace').escape(),
                    $('<textarea>', {
                        'rows': '4',
                        'wrap': 'off',
                        'id': 'ajax-edit__replace-replace',
                    })
                ),
                $('<p>').append(
                    this.i18n('farGlobal').escape(),
                    '<input type="checkbox" id="ajax-edit__replace-global"' +
                    (this.options.replaceGlobal ? 'checked' : 'unchecked') +
                    '/>'
                ),
                $('<p>').append(
                    this.i18n('farCase').escape(),
                    '<input type="checkbox" id="ajax-edit__replace-case"' +
                    (this.options.replaceCase ? 'checked' : 'unchecked') +
                    '/>'
                ),
                $('<p>').append(
                    this.i18n('farRegex').escape(),
                    '<input type="checkbox" id="ajax-edit__replace-regex"' +
                    (this.options.replaceRegex ? 'checked' : 'unchecked') +
                    '/>'
                )
            ).prop('outerHTML');
            this.replaceModal = new this.modal({
                content: replaceModalContent,
                id: 'ajax-edit__replace',
                size: 'medium',
                title: this.i18n('replaceButton').escape(),
                buttons: [
                    {
                        text: this.i18n('farExecute').escape(),
                        primary: true,
                        event: 'execute'
                    },
                    {
                        text: this.i18n('close').escape(),
                        event: 'close'
                    }
                ],
                events: {
                    execute: this.loadReplace.bind(this)
                }
            });
            this.replaceModal.create();
            this.replaceModal.show();
        },
        /**
         * @method loadReplace
         * @description Performs the replace action
         * @returns {void}
         */
        loadReplace: function () {
            var searchfor = '',
                searchexp,
                $find = $('#ajax-edit__replace-find').val(),
                replacewith = $('#ajax-edit__replace-replace').val().replace(/\r/gi, ''),
                text = $text.val().replace(/\r/gi, ''),
                flagg = 'g',
                flagi = 'i',
                enableregex = false;
            if ($('#ajax-edit__replace-global').prop('checked') === false) {
                flagg = '';
            }
            if ($('#ajax-edit__replace-case').prop('checked') === true) {
                flagi = '';
            }
            if ($('#ajax-edit__replace-regex').prop('checked') === true) {
                enableregex = true;
            }
            var flags = flagg + flagi + 'm';
            if (enableregex) {
               searchfor = $find;
            } else {
                searchfor = $find.replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
            }
            searchexp = new RegExp(searchfor, flags);
            var rcount = 0;
            var matched = text.match(searchexp);
            if (matched !== null) {
                rcount = matched.length;
            }
            text = text.replace(searchexp, replacewith);
            $text.val(text);
            $('#ajax-edit__replace-tally').empty().append(
                $('<br/>'),
                this.i18n('farFound', rcount).plain()
            );
            this.replaceModal.close();
        },
        /**
         * @method notif
         * @description Outputs a BannerNotification
         * @param {String} text - The notif text
         * @param {String} type - The notif type
         * @returns {void}
         */
        notif: function (text, type) {
            new BannerNotification(
                text,
                type
            ).show();
        },
        /**
         * @method fireHook
         * @description Fires the wikipage.content hook for display purposes
         * @param {Boolean} type - What the hook should be fire on
         * @returns {void}
         */
        fireHook: function (type) {
            mw.hook('wikipage.content').fire(
                type ?
                $('.ajax-edit__preview-modal #' + mw.util.$content[0].id) :
                $article
            );
        },
        /**
         * @method create
         * @description Creates the AjaxEdit interface
         * @returns {void}
         */
        create: function () {
            $('#WikiaArticle').prepend(
                $('<div>', {
                    'class': 'ajax-edit__edit ajax-edit__' + (this.mobile ? 'mobile' : 'desktop')
                }).append(
                    $('<div>', {
                        'id': 'ajax-edit__edit-publisharea'
                    }).append(
                        $('<label>', {
                            'for': 'ajax-edit-minor',
                            'text': this.i18n('minor').plain()
                        }),
                        $('<input>', {
                            'type': 'checkbox',
                            'id': 'ajax-edit__edit-minor',
                            'name': 'ajax-edit-minor'
                        }),
                        $('<label>', {
                            'for': 'ajax-edit-summary',
                            'text': this.i18n('summary').plain()
                        }),
                        $('<input>', {
                            'type': 'text',
                            'id': 'ajax-edit__edit-summary',
                            'name': 'ajax-edit-summary'
                        }),
                        $('<br/>'),
                        $('<div>', {
                            'id': 'ajax-edit__edit-buttons'
                        }).append(
                            this.button('back'),
                            this.button('restart'),
                            this.button('diff'),
                            this.button('preview'),
                            this.button('replace'),
                            this.button('publish')
                        ),
                        $('<span>', {
                            'id': 'ajax-edit__replace-tally'
                        })
                    ),
                    $('<textarea>', {
                        'id': 'ajax-edit__edit-text',
                        'css': {
                            'height': this.options.height
                        }
                    })
                )
            );
            $edit = $('.ajax-edit__edit');
            $text = $('#ajax-edit__edit-text');
            $minor = $('#ajax-edit__edit-minor');
            $summary = $('#ajax-edit__edit-summary');
            $summary.cleanedVal = function () {
                return (
                    this.options.summaryNotice ? '[AjaxEdit] ' : ''
                ) +
                $summary.val().trim();
            }.bind(this);
            $text.val(this.content);
            if ($article.find('#mw-clearyourcache').length === 0) {
                $edit.addClass('ajax-edit__codepage');
                $text.linksuggest();
            } else {
                $edit.addClass('ajax-edit__articlepage');
                $('#ajax-edit__buttons-preview').remove();
            }
            $minor.prop('checked', this.options.minor);
            var keys = {};
            $summary.on('keydown', function (e) {
                keys[e.which] = true;
                if (keys[13]) {
                    this.publish();
                }
            }.bind(this))
            .on('keyup', function (e) {
                keys[e.which] = false;
            });
            if (this.options.summaries) {
                $summary.after(
                    $('<select>', {
                        'id': 'ajax-edit__edit-summaries',
                        'change': function () {
                            $summary.val(
                                $(this).val()
                            );
                        }
                    }).append(
                        $('<option>', {
                            'disabled': true,
                            'text': this.i18n('summaries').plain()
                        })
                    )
                );
                $.each(this.options.summaries, function (k, v) {
                    $('#ajax-edit__edit-summaries').append(
                        $('<option>', {
                            'value': v,
                            'text': k
                        })
                    );
                });
            }
            if (this.options.buttons) {
                if (this.options.buttons === 'defaults') {
                    this.options.buttons = [
                        {
                            label: this.i18n('inputBold').plain(),
                            open: '\'\'\'',
                            close: '\'\'\''
                        },
                        {
                            label: this.i18n('inputItalics').plain(),
                            open: '\'\'',
                            close: '\'\''
                        },
                        {
                            label: this.i18n('inputLink').plain(),
                            open: '[[',
                            close: ']]'
                        },
                        {
                            label: this.i18n('inputHeader').plain(),
                            open: '== ',
                            close: ' =='
                        },
                        {
                            label: this.i18n('inputNowiki').plain(),
                            open: '<nowiki>',
                            close: '</' + 'nowiki>'
                        },
                        {
                            label: this.i18n('inputSig').plain(),
                            middle: '~~~~'
                        },
                    ];
                }
                $.each(this.options.buttons, function (k, v) {
                    $('#ajax-edit__edit-buttons').append(
                        $('<a>', {
                            'class': this.mobile ? '' : 'button',
                            'click': function () {
                                var textarea = document.getElementById('ajax-edit__edit-text');
                                var start = textarea.selectionStart;
                                var stop = textarea.selectionEnd;
                                var selectedText = textarea.value.slice(start, stop);
                                textarea.value =
                                    textarea.value.slice(0, start) +
                                    (v.open || '') +
                                    (v.middle || selectedText) +
                                    (v.close || '') +
                                    textarea.value.slice(stop);
                            },
                            'text': v.label
                        })
                    );
                });
                $('#ajax-edit__buttons-publish').after('<br/>');
            }
            $spinner.hide();
            mw.hook('AjaxEdit.session').fire(this);
        },
        /**
         * @method button
         * @description Creates a button
         * @param {String} name - The button name
         * @returns {function}
         */
        button: function (name) {
           return $('<a>', {
                'class': this.mobile ? '' : 'button',
                'id': 'ajax-edit__buttons-' + name,
                'click': this[name].bind(this),
                'text': this.i18n(name + 'Button').plain(),
                'title': this.i18n(name + 'Title').plain()
            });
        },
        /**
         * @method loadData
         * @description Processes the data from the API
         * @param {String} d - The page source
         * @returns {void}
         */
        loadData: function (d) {
            this.content = d;
            this.create();
        },
        /**
         * @method returnData
         * @description Processes the data
         * @param {JSON} d - The data from the API request
         * @returns {void}
         */
        returnData: function (d) {
            if (d.error) {
                this.reload();
            } else {
                this.loadData(
                    typeof d === 'object' ? d.query.pages[config.wgArticleId].revisions[0]['*'] : d
                );
            }
        },
        /**
         * @method click
         * @description Gets the content and loads the interface
         * @param {String} url - Section API request URL
         * @returns {void}
         */
        click: function (url) {
            if (url) {
                this.loadSpinner();
                $.get(url)
                .done(this.returnData.bind(this))
                .fail(this.reload.bind(this));
            } else if (this.rev !== 0) {
                $spinner.show();
                this.create();
            } else if (this.content && !this.options.reloadContent  && !this.section) {
                $edit.show();
                if (this.options.restart) {
                    $text.val(this.content);
                }
            } else {
                this.loadSpinner();
                if (config.wgArticleId === 0) {
                    this.loadData('');
                } else {
                    this.api.get({
                        smaxage: 0,
                        maxage: 0,
                        action: 'query',
                        revids:
                            mw.util.getParamValue('diff') ||
                            mw.util.getParamValue('oldid') ||
                            config.wgCurRevisionId,
                        prop: 'revisions',
                        rvprop: 'content'
                    })
                    .done(this.returnData.bind(this))
                    .fail(this.reload.bind(this));
                }
            }
            $article.hide();
            this.changeButton();
            if (this.options.hideRail) {
                $rail.hide();
                if (!this.mobile) {
                    $wrapper.css('width', '100%');
                }
            }
        },
        /**
         * @method sectionClick
         * @description Gets data about the section being edited
         * @param {Object} that - jQuery object of the section
         * @returns {void}
         */
        sectionClick: function (that) {
            var url = that.parent().find('a').attr('href').replace('edit', 'raw');
            this.section = url.match(/section=\d+/g)[0].replace('section=', '');
            this.click(url);
        },
        /**
         * @method loadSpinner
         * @description Creates and displays WDS spinner
         * @returns {void}
         */
        loadSpinner: function () {
            if ($spinner) {
                $spinner.show();
            } else {
                $('<div>', {
                    'id': 'ajax-edit__throbber',
                    'html':
                        new Spinner(38, 2).html
                            .replace('wds-block', 'wds-spinner__block')
                            .replace('wds-path', 'wds-spinner__stroke')
                            .replace('stroke-width=""', 'stroke-width="3"')
                }).appendTo(document.body);
                $spinner = $('#ajax-edit__throbber');
            }
        },
        /**
         * @method changeButton
         * @description Changes the AjaxEdit button
         */
        changeButton: function () {
            var isEdit = false;
            if ($button.data('id') === 'edit') {
                isEdit = true;
            }
            $button.text(
                this.i18n(isEdit ? 'backButton' : 'buttonText').plain()
            );
            $button.attr(
                'title',
                this.i18n(isEdit ? 'backTitle' : 'buttonTitle').plain()
            );
            $button.data(
                'id',
                isEdit ? 'back' : 'edit'
            );
        },
        /**
         * @method init
         * @description Initiates the script
         * @param {String} i18n - Variable for I18n-js
         * @returns {void}
         */
        init: function (i18n) {
            this.i18n = i18n.msg;
            if (this.options.button) {
                var action = '.UserProfileActionButton';
                var $action = $(action).length === 0;
                $(
                    $action ?
                    '.page-header__contribution-buttons .wds-button-group' :
                    action
                )[
                    $action ?
                    'after' :
                    'append'
                ](
                    $('<a>', {
                       'class':
                            $action ?
                            'wds-button wds-is-squished wds-is-secondary' :
                            'button',
                        'id': 'ca-ajax-edit',
                        'data-id': 'edit',
                        'text': this.i18n('buttonText').plain(),
                        'title': this.i18n('buttonTitle').plain()
                   })
                );
            } else {
                window.dev.placement.loader.util({
                    script: 'AjaxEdit',
                    element: 'editdropdown',
                    type: 'append',
                    content: $('<li>').append(
                        $('<a>', {
                            id: 'ca-ajax-edit',
                            'data-id': 'edit',
                            'text': this.i18n('buttonText').plain(),
                            'title': this.i18n('buttonTitle').plain()
                        })
                    )
                });
            }
            $button = $('#ca-ajax-edit');
            $button.click(function () {
                if ($button.data('id') === 'edit') {
                    this.click();
                } else {
                    this.back();
                }
            }.bind(this));
            if (mw.util.getParamValue('ajaxedit') !== null) {
                this.click();
            }
            if ($sections.length && this.options.sections) {
                var queue = [];
                $sections.each(function () {
                    if ($(this).has('a').length) {
                        queue.push($(this));
                    }
                });
                $.each(queue, function (k, v) {
                    v.append(
                        ' | ',
                        $('<a>', {
                            'text': this.i18n('buttonText').plain(),
                            'title': this.i18n('sectionTitle').plain(),
                            'css': {
                                'cursor': 'pointer'
                            },
                            'click': this.sectionClick.bind(this, v)
                        })
                    );
                }.bind(this));
            }
        },
        /**
         * @method preload
         * @description Preloads the script
         * @returns {void}
         */
        preload: function () {
            if (--this.preloads === 0) {
                this.modal = window.dev.modal.Modal;
                window.dev.i18n.loadMessages('AjaxEdit').then(
                    this.init.bind(this)
                );
            }
        },
        /**
         * @method hooks
         * @description Preloads the hooks and imports
         * @returns {void}
         */
        hooks: function () {
            this.preloads = 3;
            this.rev = 0;
            this.mobile = browserDetect.isMobile();
            this.api = new mw.Api();
            this.options = $.extend(
                {
                    minor: mw.user.options.get('minordefault') === '1',
                    reloadContent: false,
                    restart: false,
                    watchlist: 'preferences',
                    hideRail: false,
                    height: this.mobile ? '750px' : '500px',
                    replaceGlobal: true,
                    replaceCase: false,
                    replaceRegex: false,
                    summaries: false,
                    summaryNotice: false,
                    buttons: false,
                    reload: false,
                    button: false,
                    sections: true
                },
                window.AjaxEdit
            );
            mw.hook('dev.i18n').add(this.preload.bind(this));
            mw.hook('dev.modal').add(this.preload.bind(this));
            mw.hook('dev.placement').add(this.preload.bind(this));
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
                    articles: [
                        'u:dev:MediaWiki:AjaxEdit.css'
                    ]
                }
            );
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util',
        'mediawiki.user',
        'ext.wikia.LinkSuggest'
    ]).then(
        Main.hooks.bind(Main)
    );
});