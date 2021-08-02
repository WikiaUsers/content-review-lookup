/* I18n-js JSON editor
 *
 * Provides a specialized internationalization editor at Special:BlankPage/i18nEdit
 *
 * @authors
    - KockaAdmiralac
    - Dorumin
*/

;(function() {
    'use strict';
    // Configuration caching
    var conf = mw.config.get([
        'wgCityId',
        'wgPageName',
        'wgServer',
        'wgUserLanguage'
    ]);
    // Scope limiting
    if (
        // conf.wgCityId !== '7931' ||
        conf.wgPageName.slice(0, 26).toLowerCase() !== 'special:blankpage/i18nedit' ||
        (window.dev && window.dev.I18nEdit)
    ) {
        return;
    }
    window.dev = window.dev || {};
    /**
     * Main object
     * @class I18nEdit
     */
    var I18nEdit = window.dev.I18nEdit = {
        // Used during resource preloading
        _loadCounter: 0,
        languages: {},
        // List of languages not supported by Wikia. Correct per:
        // https://github.com/Wikia/app/blob/4cda276c23a154186ea27c686dbd1ff57a7039dd/languages/WikiaLanguage.php#L42-L89
        langBlacklist: [
            'als',
            'bat-smg',
            'be-x-old',
            'crh',
            'de2',
            'de-at',
            'de-ch',
            'de-formal',
            'de-weigsbrag',
            'dk',
            'en-gb',
            'eshelp',
            'fihelp',
            'fiu-vro',
            'frc',
            'frhelp',
            'gan',
            'hif',
            'ithelp',
            'iu',
            'jahelp',
            'kbd',
            'kh',
            'kk',
            'kohelp',
            'kp',
            'ks',
            'ku',
            'nb',
            'mu',
            'nlhelp',
            'pthelp',
            'pt-brhelp',
            'roa-rup',
            'ruhelp',
            'ruq',
            'shi',
            'simple',
            'sr',
            'tg',
            'tp',
            'tt',
            'ug',
            'zh',
            'zh-classical',
            'zh-cn',
            'zh-min-nan',
            'zh-mo',
            'zh-my',
            'zh-sg',
            'zh-yue'
        ],
        /**
         * Handles resource loading
         * Each of the resources that are being preloaded are
         * calling this method as a callback
         */
        preload: function() {
            if (++this._loadCounter === 5) {
                window.dev.i18n.loadMessages('I18nEdit').done($.proxy(this.init, this));
            }
        },
        /**
         * Initializes the script
         * @param {Object} i18n I18n object returned by I18n-js
         */
        init: function(i18n) {
            i18n.useUserLang();
            this.i18n = i18n;
            this.ui = window.dev.ui;
            this.api = new mw.Api();
            $('.page-header__title, #firstHeading').text(this.msg('title'));
            this.dispatchForm();
        },
        /**
         * Returns the part of the URL at the specified index
         * @param {Number} i Index of the URL part to return
         * @returns {String} URL part at the specified index
         */
        getUrlVar: function(i) {
            return conf.wgPageName.split('/').slice(2)[i];
        },
        /**
         * Safely handle tasks involving the browser's
         * localStorage object
         */
        storage: {
            get: function(key) {
                try {
                    return localStorage.getItem(key);
                } catch (ignore) {
                    return null;
                }
            },
            set: function(key, val) {
                try {
                    localStorage.setItem(key, val);
                } catch (ignore) {}
            },
            remove: function(key) {
                try {
                    localStorage.removeItem(key);
                } catch (ignore) {}
            },
        },
        /**
         * Checks the URL to determine which page of the
         * editor should be rendered
         */
        dispatchForm: function() {
            var title = this.getUrlVar(0),
            lang = this.getUrlVar(1);
            if (title) {
                this.page = decodeURIComponent(title);
                if (lang) {
                    this.lang = decodeURIComponent(lang);
                    if (lang === 'metadata') {
                        this.initMetadataEditor();
                    } else {
                        this.initTranslationEditor();
                    }
                } else {
                    this.initTranslationPicker();
                }
            } else {
                this.initSearch();
            }
        },
        /**
         * Sets the title of the page
         * @param {String} msg Message code of the title message
         */
        setTitle: function(msg) {
            document.title = 'I18nEdit | ' + this.i18n.msg('title-' + msg, this.page, this.lang).plain();
        },
        /**
         * Initializes the "script search" interface, which
         * lists translatable scripts
         */
        initSearch: function() {
            $('.page-header__title, #firstHeading').text(this.msg('search-title'));
            this.setTitle('search');
            $('#mw-content-text').html(
                this.ui({
                    type: 'div',
                    attr: { 'class': 'I18nEditMain I18nEditSearch loading' },
                    children: [
                        {
                            type: 'p',
                            attr: { id: 'I18nEditSearchText' },
                            text: this.msg('search-text')
                        },
                        {
                            type: 'fieldset',
                            attr: { 'class': 'collapsible' },
                            children: [
                                {
                                    type: 'legend',
                                    text: this.msg('search-legend')
                                },
                                {
                                    type: 'form',
                                    attr: {
                                        method: 'GET',
                                        id: 'I18nEditSearchForm'
                                    },
                                    children: [
                                        {
                                            type: 'select',
                                            attr: {
                                                id: 'I18nEditSearchFormSelect',
                                                name: 'page'
                                            }
                                        },
                                        {
                                            type: 'input',
                                            attr: {
                                                type: 'submit',
                                                value: this.msg('search-button')
                                            },
                                            events: {
                                                click: function(e) {
                                                    e.preventDefault();
                                                    var value = document.getElementById('I18nEditSearchFormSelect').value;
                                                    if (!value) {
                                                        return;
                                                    }
                                                    window.location.pathname += '/' + value;
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            );
            this.api.get({
                action: 'query',
                list: 'allpages',
                apnamespace: 8,
                apprefix: 'Custom-',
                aplimit: 'max'
            }).done($.proxy(this.cbAllpages, this));
        },
        /**
         * Callback after the API call to find all translatable scripts
         * @param {Object} d API call results
         */
        cbAllpages: function(d) {
            this.ui({
                children: d.query.allpages.filter(function(el) {
                    return el.title.slice(-10) === '/i18n.json' &&
                           el.title.slice(0, 17) === 'MediaWiki:Custom-';
                }).map(function(el) {
                    return {
                        type: 'option',
                        attr: {
                            'class': 'I18nEditSearchFormOption'
                        },
                        text: el.title.slice(17, -10)
                    };
                }),
                parent: '#I18nEditSearchFormSelect'
            });
            $('.I18nEditSearch').toggleClass('loading');
        },
        /**
         * Initializes the "translation picker" interface, which appears
         * after selecting a script to translate, lists all languages
         * the script is already translated to, allows adding new
         * translations and editing metadata
         */
        initTranslationPicker: function() {
            $('.page-header__title, #firstHeading').text(this.page);
            $('.page-header__page-subtitle, #contentSub').prepend(
                '< ',
                this.ui({
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('Special:BlankPage/I18nEdit')
                    },
                    text: this.msg('search-title')
                }),
                ' | '
            );
            this.setTitle('picker');
            $('#mw-content-text').html(
                this.ui({
                    type: 'div',
                    attr: { 'class': 'I18nEditMain I18nEditPicker loading script-' + this.page },
                    children: [
                        {
                            type: 'p',
                            attr: { id: 'I18nEditPickerText' },
                            text: this.msg('picker-text')
                        },
                        {
                            type: 'form',
                            attr: {
                                id: 'I18nEditPickerForm',
                                method: 'GET'
                            },
                            children: [
                                {
                                    type: 'input',
                                    attr: {
                                        name: 'page',
                                        type: 'hidden',
                                        value: this.page
                                    }
                                }
                            ]
                        }
                    ]
                })
            );
            this._loadCounter = 2;
            window.dev.i18n.loadMessages(this.i18nPage(this.page), { noCache: true }).done($.proxy(this.cbMessagesLoad, this));
            this.api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'languages'
            }).done($.proxy(this.cbLanguagesLoad, this));
        },
        /**
         * Callback after I18n-js loads messages for the
         * specified script
         * @param {Object} i18n I18n data for the specified script
         */
        cbMessagesLoad: function(i18n) {
            this.pickerI18n = i18n;
            this.finishPickerLoading();
        },
        /**
         * Callback after the API call to list all
         * available languages on Wikia
         * @param {Object} d API query result
         */
        cbLanguagesLoad: function(d) {
            d.query.languages.forEach(function(el) {
                if(!this.languages[el['*']]) {
                    this.languages[el['*']] = el.code;
                }
            }, this);
            this.finishPickerLoading();
        },
        /**
         * Synchronizes the two asynchronous calls from the
         * editor interface
         */
        finishPickerLoading: function() {
            if(--this._loadCounter !== 0) {
                return;
            }
            var children = this.formChildren = [],
                messages = I18nEdit.pickerI18n._messages;
            $.each(this.languages, $.proxy(function(i, val) {
                if (this.langBlacklist.indexOf(val) !== -1) {
                    return;
                }
                children.push({
                    type: 'li',
                    attr: { 'class': messages[val] ? 'exists' : 'noexist' },
                    children: [
                        {
                            type: 'input',
                            attr: {
                                'class': 'I18nEditPickerFormRadio',
                                type: 'radio',
                                name: 'lang',
                                value: val,
                                id: 'lang-' + val
                            }
                        },
                        {
                            type: 'label',
                            attr: {
                                'for': 'lang-' + val
                            },
                            text: i + ' (' + val + ')'
                        }
                    ]
                });
            }, this));
            this.ui({
                children: [
                    {
                        type: 'ul',
                        attr: { id: 'I18nEditPickerFormList' },
                        children: children
                    },
                    {
                        type: 'div',
                        attr: {
                            id: 'I18nEditButtonContainer'
                        },
                        children: [
                            {
                                type: 'button',
                                attr: {
                                    id: 'I18nEditLanguage',
                                    disabled: 'disabled'
                                },
                                events: {
                                    click: function(e) {
                                        e.preventDefault();
                                        if ($(this).attr('disabled') === 'disabled') {
                                            return;
                                        }
                                        var value = $('.I18nEditPickerFormRadio:checked').val();
                                        if (value) {
                                            window.location.pathname += '/' + value;
                                        }
                                    }
                                },
                                text: this.msg('edit-language')
                            },
                            {
                                type: 'button',
                                attr: {
                                    id: 'I18nEditAddLanguage'
                                },
                                events: {
                                    click: $.proxy(this.showLanguageModal, this)
                                },
                                text: this.msg('add-new-language')
                            },
                            {
                                type: 'button',
                                attr: {
                                    id: 'I18nEditMetadata'
                                },
                                events: {
                                    click: function(e) {
                                        e.preventDefault();
                                        window.location.pathname += '/metadata';
                                    }
                                },
                                text: this.msg('edit-metadata')
                            },
                            {
                                type: 'button',
                                attr: {
                                    id: 'I18nEditQQQ'
                                },
                                events: {
                                    click: function(e) {
                                        e.preventDefault();
                                        window.location.pathname += '/qqq';
                                    }
                                },
                                text: this.msg('edit-qqq')
                            }
                        ],
                        parent: '#I18nEditPickerForm'
                    }
                ],
                parent: '#I18nEditPickerForm'
            });
            $('#I18nEditPickerFormList input, #I18nEditPickerFormList label').click(function() {
                $('#I18nEditLanguage').removeAttr('disabled');
            });
            $('.I18nEditPicker').toggleClass('loading');
        },
        /**
         * Shows the modal with languages the script can be
         * additionally translated to
         * @param {Event} e Click event
         */
        showLanguageModal: function(e) {
            e.preventDefault();
            dev.showCustomModal(this.escaped('add-new-language'), this.ui({
                type: 'div',
                attr: {
                    'class': 'I18nEditModal'
                },
                children: [
                    {
                        type: 'span',
                        attr: {
                            'class': 'I18nEditFilterSpan'
                        },
                        text: this.msg('filter')
                    },
                    {
                        type: 'input',
                        attr: {
                            'class': 'I18nEditLanguageInput',
                            type: 'text',
                            value: this.storage.get('i18nEdit-filter') || conf.wgUserLanguage
                        },
                        events: {
                            input: $.proxy(this.filterLanguages, this)
                        }
                    },
                    {
                        type: 'div',
                        attr: {
                            'class': 'I18nEditNewLanguageList'
                        },
                        children: this.formChildren.map(function(elem) {
                            elem.children = elem.children.map(function(child) {
                                if (child.attr.id) {
                                    child.attr.id = 'modal-' + child.attr.id;
                                } else {
                                    child.attr['for'] = 'modal-' + child.attr['for'];
                                }
                                return child;
                            });
                            return elem;
                        })
                    }
                ]
            }), {
                id: 'I18nEditNewLanguageModal',
                buttons: [
                    {
                        id: 'I18nEditModalButtonClose',
                        message: this.escaped('close'),
                        handler: function() {
                            dev.showCustomModal.closeModal($('#I18nEditNewLanguageModal'));
                        }
                    },
                    {
                        id: 'I18nEditModalButtonAdd',
                        message: this.escaped('add-language'),
                        defaultButton: true,
                        handler: function() {
                            var $this = $(this);
                            if ($this.attr('disabled') === 'disabled') {
                                return;
                            }
                            var $radio = $('.I18nEditNewLanguageList input:checked'),
                            lang = $radio.attr('value');
                            if (!lang) {
                                return;
                            }
                            window.location.pathname += '/' + lang;
                        }
                    }
                ],
                callback: $.proxy(function() {
                    this.filterLanguages({ target: $('.I18nEditLanguageInput')[0] });
                    var $btn = $('#I18nEditModalButtonAdd');
                    $btn.attr('disabled', '');
                    $('.I18nEditNewLanguageList input, .I18nEditNewLanguageList label').click(function() {
                        $btn.removeAttr('disabled');
                    });
                    $('.I18nEditLanguageInput').popover({
                        content: this.ui({
                            type: 'div',
                            attr: {
                                'class': 'I18nEditFilterPopover'
                            },
                            text: this.msg('language-popover')
                        }),
                        placement: 'top'
                    });
                }, this)
            });
        },
        /**
         * Filters languages in the modal after using the
         * search bar
         * @param {Event} e Input event
         */
        filterLanguages: function(e) {
            var val = e.target.value.toLowerCase(),
            filters = val.split('|');
            $('.I18nEditNewLanguageList .noexist').hide().filter(function() {
                var $this = $(this),
                text = $this.text().toLowerCase(),
                indexes = 0;
                filters.forEach(function(lang) {
                    indexes += text.indexOf(lang);
                });
                return indexes !== -filters.length;
            }).show();
            this.storage.set('i18nEdit-filter', val);
        },
        /**
         * Initializes the metadata editor interface
         */
        initMetadataEditor: function() {
            $('.page-header__title, #firstHeading').text(this.page + ' - Metadata');
            this.setTitle('metadata');
            $('.page-header__page-subtitle, #contentSub').prepend(
                '< ',
                this.ui({
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('Special:BlankPage/I18nEdit')
                    },
                    text: this.msg('search-title')
                }),
                ' | ',
                this.ui({
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('Special:BlankPage/I18nEdit/' + this.page.replace(/ /g, '_'))
                    },
                    text: this.page
                }),
                ' | '
            );
            $('#mw-content-text').html(
                this.ui({
                    type: 'div',
                    attr: {
                        'class': 'I18nEditMetadata I18nEditEditor loading'
                    },
                    children: [
                        {
                            type: 'p',
                            attr: {
                                'class': 'I18nEditMetadataEditorWarning'
                            },
                            text: this.msg('warning-metadata')
                        },
                        {
                            type: 'p',
                            attr: {
                                'class': 'I18nEditMetadataEditorText'
                            },
                            text: this.msg('metadata-editor-text')
                        },
                        {
                            type: 'select',
                            attr: {
                                'class': 'I18nEditMetadataSelect'
                            }
                        },
                        {
                            type: 'button',
                            attr: {
                                'class': 'I18nEditMetadataAddMessage',
                                disabled: 'disabled'
                            },
                            events: {
                                click: $.proxy(function() {
                                    var $sel = $('.I18nEditMetadataSelect');
                                    if (!$sel.val()) {
                                        return;
                                    }
                                    var $opt = $sel.find(':selected'),
                                    val = $opt.val();
                                    this.ui({
                                        type: 'li',
                                        text: val,
                                        attr: {
                                            'class': 'I18nEditMetadataListItem'
                                        },
                                        data: {
                                            value: val
                                        },
                                        children: [' [', {
                                            type: 'a',
                                            attr: {
                                                href: '#',
                                                'class': 'I18nEditRemoveMessage'
                                            },
                                            events: {
                                                click: $.proxy(function(e) {
                                                    e.preventDefault();
                                                    var $li = $(e.target).closest('li');
                                                    this.ui({
                                                        type: 'option',
                                                        text: $li.data('value'),
                                                        parent: '.I18nEditMetadataSelect'
                                                    });
                                                    $('.I18nEditMetadataAddMessage').removeAttr('disabled');
                                                    $li.remove();
                                                }, this)
                                            },
                                            text: this.msg('remove')
                                        }, ']'],
                                        parent: '.I18nEditMetadataUL'
                                    });
                                    $opt.remove();
                                    if ($sel.children().length === 0) {
                                        $('.I18nEditMetadataAddMessage').attr('disabled', 'disabled');
                                    }
                                }, this)
                            },
                            text: this.msg('add-message')
                        },
                        {
                            type: 'ul',
                            attr: {
                                'class': 'I18nEditMetadataUL'
                            }
                        },
                        {
                            type: 'button',
                            attr: {
                                'class': 'I18nEditSaveMetadata'
                            },
                            events: {
                                click: $.proxy(function(e) {
                                    var $childs = $('.I18nEditMetadataUL').children();
                                    if (!$childs.length) {
                                        delete this.messages._metadata;
                                    } else {
                                        this.messages._metadata = {
                                            noTranslate: $childs.toArray().map(function(el) {
                                                return el.getAttribute('data-value');
                                            }).sort()
                                        };
                                    }
                                    this.saveTranslations(e);
                                }, this)
                            },
                            text: this.msg('save-metadata')
                        }
                    ]
                })
            );
            window.dev.i18n.loadMessages(this.i18nPage(this.page), { noCache: true }).done($.proxy(this.cbMessagesLoad3, this));
        },
        /**
         * Initializes the translation editor interface
         */
        initTranslationEditor: function() {
            var lang = this.lang = this.getUrlVar(1);
            $('.page-header__title, #firstHeading').text(this.page);
            $('.page-header__page-subtitle, #contentSub').prepend(
                '< ',
                this.ui({
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('Special:BlankPage/I18nEdit')
                    },
                    text: this.msg('search-title')
                }),
                ' | ',
                this.ui({
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('Special:BlankPage/I18nEdit/' + this.page.replace(/ /g, '_'))
                    },
                    text: this.page
                }),
                ' | '
            );
            this.setTitle('editor');
            $('#mw-content-text').html(
                this.ui({
                    type: 'div',
                    attr: {
                        'class': 'I18nEditMain I18nEditEditor loading script-' + this.page +
                                 ' lang-' + lang
                    },
                    children: [
                        {
                            type: 'p',
                            attr: { 'class': 'I18nEditEditorWarning' },
                            text: this.msg('warning-' + lang),
                            condition: ['en', 'qqq'].indexOf(lang) !== -1
                        },
                        {
                            type: 'table',
                            attr: {
                                id: 'I18nEditEditorTable',
                                'class': 'wikitable'
                            },
                            children: [
                                {
                                    type: 'tr',
                                    children: [
                                        'code',
                                        'description',
                                        'english',
                                        'translation'
                                    ].map(function(el) {
                                        return {
                                            type: 'th',
                                            text: this.msg('editor-table-' + el)
                                        };
                                    }, this)
                                }
                            ]
                        },
                        {
                            type: 'input',
                            attr: {
                                type: 'text',
                                placeholder: this.i18n.msg('summary', this.lang).plain(),
                                id: 'I18nEditSummary',
                                maxlength: '239'
                            },
                            events: {
                                keypress: function(e) {
                                    if (e.keyCode == 13) {
                                        $('#I18nEditEditorSubmit').click();
                                    }
                                }
                            }
                        },
                        {
                            type: 'button',
                            attr: { id: 'I18nEditEditorSubmit' },
                            events: { click: $.proxy(this.saveTranslations, this) },
                            text: this.msg('editor-save')
                        },
                        {
                            type: 'button',
                            attr: {
                                'class': 'I18nEditAddNewMessageButton'
                            },
                            events: {
                                click: $.proxy(function() {
                                    var key = prompt(this.msg('message-code'));
                                    if (!key) {
                                        return;
                                    }
                                    if (this.messages.qqq) {
                                        var qqq = prompt(this.msg('message-qqq'));
                                        if (qqq) {
                                            this.messages.qqq[key] = qqq;
                                        }
                                    }
                                    this.addTableRow(key, '');
                                }, this)
                            },
                            text: this.msg('add-new-message'),
                            condition: lang === 'en'
                        }
                    ]
                })
            );
            window.dev.i18n.loadMessages(this.i18nPage(this.page), { noCache: true }).done($.proxy(this.cbMessagesLoad2, this));
        },
        /**
         * Callback after the messages for a certain
         * script have been loaded by UI-js from the
         * editor interface
         * @param {Object} i18n I18n object
         */
        cbMessagesLoad2: function(i18n) {
            this.messages = i18n._messages;
            var lang = this.lang;
            this.messages[lang] = this.messages[lang] || {};
            if (lang === 'metadata') {
                this.messages.metadata = $.extend({
                    noTranslate: '[]'
                }, this.messages._metadata);
            }
            var trans = $.extend({}, this.messages.en, this.messages[lang]);
            if (this.messages._metadata && this.messages._metadata.noTranslate && lang !== 'en') {
                this.messages._metadata.noTranslate.forEach(function(l) {
                    delete trans[l];
                });
            }
            $.each(trans, $.proxy(this.addTableRow, this));
            $('.I18nEditEditor').toggleClass('loading');
        },
        /**
         * Adds a row to the editor table
         * @param {Number} i Number of the row
         * @param {Object} val Message in the row
         */
        addTableRow: function(i, val) {
            var key = 'I18nEdit/' + this.page,
            json = this.storage.get(key),
            obj = json ? JSON.parse(json) : {};
            this.ui({
                type: 'tr',
                data: { code: i },
                children: [
                    {
                        type: 'td',
                        children: [
                            {
                                type: 'code',
                                text: i
                            }
                        ]
                    },
                    {
                        type: 'td',
                        text: this.messages.qqq && this.messages.qqq[i] || 'N/A'
                    },
                    {
                        type: 'td',
                        text: this.messages.en[i] || 'N/A'
                    },
                    {
                        type: 'td',
                        children: [
                            {
                                type: 'textarea',
                                text: obj[i] || val,
                                attr: {
                                    'class': 'I18nEditTranslateInput'
                                },
                                events: {
                                    input: function() {
                                        var json = I18nEdit.storage.get(key),
                                        obj = json ? JSON.parse(json) : {};
                                        obj[i] = this.value;
                                        I18nEdit.storage.set(key, JSON.stringify(obj));
                                    }
                                }
                            }
                        ]
                    }
                ],
                parent: '#I18nEditEditorTable'
            });
        },
        /**
         * Callback after the messages for a certain
         * script have been loaded by UI-js from the
         * metadata editor interface
         * @param {Object} i18n I18n object
         */
        cbMessagesLoad3: function(i18n) {
            this.messages = i18n._messages;
            var meta = this.messages._metadata = $.extend({
                noTranslate: []
            }, this.messages._metadata),
            messages = Object.keys(this.messages.en);
            $.each(meta.noTranslate, $.proxy(function(i, val) {
                messages.splice(messages.indexOf(val), 1);
                this.ui({
                    type: 'li',
                    text: val,
                    attr: {
                        'class': 'I18nEditMetadataListItem'
                    },
                    data: {
                        value: val
                    },
                    children: [' [', {
                        type: 'a',
                        attr: {
                            href: '#',
                            'class': 'I18nEditRemoveMessage'
                        },
                        events: {
                            click: $.proxy(function(e) {
                                var $li = $(e.target).closest('li');
                                this.ui({
                                    type: 'option',
                                    text: $li.data('value'),
                                    parent: '.I18nEditMetadataSelect'
                                });
                                $('.I18nEditMetadataAddMessage').removeAttr('disabled');
                                $li.remove();
                            }, this)
                        },
                        text: this.msg('remove')
                    }, ']'],
                    parent: '.I18nEditMetadataUL'
                });
            }, this));
            $.each(messages, $.proxy(function(i, val) {
                this.ui({
                    type: 'option',
                    text: val,
                    parent: '.I18nEditMetadataSelect'
                });
            }, this));
            if (messages.length) {
                $('.I18nEditMetadataAddMessage').removeAttr('disabled');
            }
        },
        /**
         * Saves the translations to the respective JSON page
         * @param {Event} e Click event
         */
        saveTranslations: function(e) {
            e.preventDefault();
            var lang = this.lang,
            changedMessages = [];
            // Re-add removed translations by _metadata.noTranslate
            $.extend(this.messages[lang], lang === 'metadata' ? null : this.messages.en, this.messages[lang]);
            $('#I18nEditEditorTable .I18nEditTranslateInput').each($.proxy(function(_, el) {
                var $this = $(el),
                code = $this.parent().parent().data('code'),
                val = $this.val();
                if (this.messages[lang][code] === val) {
                    return;
                }
                if (this.messages[lang][code]) {
                    changedMessages.push(code);
                }
                if (lang !== 'metadata') {
                    this.messages[lang][code] = $this.val();
                }
            }, this));
            // If the user changed English messages already translated
            if (lang === 'en' && changedMessages.length) {
                var confirmation = confirm(this.msg('remove-translations-prompt'));
                if (confirmation) {
                    $.each(this.messages, $.proxy(function(i) {
                        if (i === '_metadata') {
                            return;
                        }
                        $.each(changedMessages, $.proxy(function(j, msg) {
                            if (
                                this.messages._metadata &&
                                this.messages._metadata.noTranslate instanceof Array &&
                                this.messages._metadata.noTranslate.indexOf(msg) === -1
                            ) {
                                this.messages[i][msg] = this.messages.en[msg];
                            }
                        }));
                    }, this));
                }
            }
            // Sort object keys, with exceptions
            var messages = {},
            specials = {
                _metadata: 1,
                en: 2,
                qqq: 3
            };
            Object.keys(this.messages).sort(function(a,b) {
                if (specials[a] && specials[b]) {
                    return specials[a] - specials[b];
                } else if (specials[a]) {
                    return -1;
                } else if (specials[b]) {
                    return 1;
                } else {
                    return a.localeCompare(b);
                }
            }).forEach(function(key) {
                messages[key] = this.messages[key];
            }, this);
            this.api.postWithEditToken({
                action: 'edit',
                title: 'MediaWiki:Custom-' + this.page + '/i18n.json',
                text: JSON.stringify(messages, null, 4),
                summary: '[I18nEdit] ' + (
                    $('#I18nEditSummary').val() ||
                    this.i18n.msg('summary', this.lang).plain()
                ),
                minor: true,
                bot: true
            }).then($.proxy(this.cbSave, this));
        },
        /**
         * Callback after the page has been saved
         * @param {Object} d API result
         */
        cbSave: function(d) {
            if(d.error) {
                new dev.banners.BannerNotification(this.escaped('error') + ': ' + d.error.code, 'error').show();
            } else {
                this.storage.remove('I18nEdit/' + this.page);
                new dev.banners.BannerNotification(this.escaped('success'), 'confirm').show();
                setTimeout($.proxy(function() {
                    window.location.pathname = '/wiki/Special:Blankpage/I18nEdit/' + this.page;
                }, this), 2000);
            }
        },
        /**
         * Returns a message with specified code as plain
         * @param {String} msg Code of the message
         * @returns {String} Translated message with the specified code
         */
        msg: function(msg) {
            return this.i18n.msg(msg).plain();
        },
        /**
         * Returns a message with specified code, escaped
         * @param {String} msg Code of the message
         * @returns {String} Translated message with the specified code, escaped
         */
        escaped: function(msg) {
            return this.i18n.msg(msg).escape();
        },
        /**
         * Gets the right i18n data page to load based on
         * the current wiki.
         * @param {String} page The page to load
         */
        i18nPage: function(page) {
            var server = conf.wgServer
                .match(/https?:\/\/([a-z0-9-]+)\.(?:fandom\.com|wikia\.org)/),
                toLoad = page;
            if (server && server[1] !== 'dev') {
                toLoad = 'u:' + server[1] + ':MediaWiki:Custom-' + page + '/i18n.json';
            }
            return toLoad;
        }
    };
    // Loading necessary resources
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:BannerNotification.js',
            'u:dev:MediaWiki:ShowCustomModal.js',
        ]
    });
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:I18nEdit.css'
        ]
    });
    // Run the main when scripts loads
    mw.hook('dev.ui').add($.proxy(I18nEdit.preload, I18nEdit));
    mw.hook('dev.i18n').add($.proxy(I18nEdit.preload, I18nEdit));
    mw.hook('dev.banners').add($.proxy(I18nEdit.preload, I18nEdit));
    mw.hook('dev.showCustomModal').add($.proxy(I18nEdit.preload, I18nEdit));
    mw.loader.using(['mediawiki.api.edit']).then($.proxy(I18nEdit.preload, I18nEdit));
})();