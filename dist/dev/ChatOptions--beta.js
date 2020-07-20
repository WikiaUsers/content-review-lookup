/**
 * ChatOptions
 * Change how Special:Chat looks and functions using an interface.
 * Uses cookies to store the changes.
 * A potential solution to all your chathacks problems.
 *
 * Many thanks to the Call of Duty Wiki Chat,
 * who supported and helped this the whole way through.
 * It has been much appreciated. Thank you!
 *
 * @version 2.0.0
 * @author Callofduty4
 * @author M D N S
 * @author Kerri Amber <sactage@gmail.com>
 * @author KockaAdmiralac <1405223@gmail.com>
 * @todo Improve user interface
 * @todo Live preview?
 * @todo Color picker
 * @todo Add fallback colors for text and surround
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'wikia.ui.factory'
], function(window, $, mw, uiFactory) {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgSassParams',
        'wgUserGroups'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        window.ChatOptionsLoaded
    ) {
        return;
    }
    window.ChatOptionsLoaded = true;
    if (!window.dev || !window.dev.i18n || !window.dev.ui || !window.dev.chat) {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:UI-js/code.js',
                'u:dev:MediaWiki:Chat-js.js',
                'u:dev:MediaWiki:I18n-js/code.js'
            ]
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ChatOptions.css'
    });
    // God damnit Wikia
    $.msg = function() {
        return mw.message.call(this, arguments).text();
    };
    var ChatOptions = {
        isChatMod: /chatmoderator|threadmoderator|sysop|vstf|helper|staff/.test(config.wgUserGroups.join('|')),
        modules: {
            chatHacks: {
                script: 'ChatHacks',
                extloaded: function() {
                    return window.ChatHacks;
                }
            },
            tabComplete: {
                script: 'Tabinsert'
            },
            multiKick: {
                script: 'Multikick',
                show: function() {
                    return this.isChatMod;
                }
            },
            xpm: {
                script: 'ExtendedPrivateMessaging/code',
                extloaded: function() {
                    return window.ExtendedPrivateMessaging &&
                           window.ExtendedPrivateMessaging.init;
                }
            },
            emoticons: {
                script: 'EmoticonsWindow/code',
                extloaded: function() {
                    return window.EmoticonsWindowLoaded;
                }
            },
            searchBar: {
                script: 'ChatSearchbar/code'
            },
            fasterBan: {
                script: 'FasterBanModule/code',
                show: function() {
                    return this.isChatMod;
                }
            },
            qmt: {
                script: 'QuickModTools/code',
                extloaded: function() {
                    return window.QuickModTools;
                },
                show: function() {
                    return this.isChatMod;
                }
            }
        },
        look: {
            surroundColor: 'background-color',
            backgroundColor: 'background-color',
            fontColor: 'color',
            fontFamily: 'font-family',
            selfPostColor: 'background-color'
        },
        css: {
            'body': ['surroundColor'],
            '.WikiaPage': [
                'backgroundColor',
                'fontColor',
                'fontFamily'
            ],
            '.Chat': ['fontFamily'],
            '.Rail': ['fontFamily'],
            '.ChatHeader': ['backgroundColor'],
            '.Chat .you': ['selfPostColor'],
            '.Write [name="message"]': ['fontColor'],
            '.Write .message': ['backgroundColor'],
            '.ChatHeader .User .username': ['fontColor']
        },
        fonts: [
            'Arial',
            'Courier New',
            'Georgia',
            'Palatino Linotype',
            'Comic Sans',
            'Rubik',
            'Tahoma',
            'Trebuchet MS',
            'Verdana',
            'Lucida Console'
        ].concat(window.customFonts || []),
        colors: [
            'background',
            'selfPost',
            'surround',
            'font'
        ],
        fallbacks: {
            background: 'color-page',
            surround: 'color-body'
        },
        _loading: 0,
        preload: function() {
            if (++this._loading === 3) {
                $.when(
                    window.dev.i18n.loadMessages('ChatOptions'),
                    uiFactory.init(['modal'])
                ).then($.proxy(this.init, this));
            }
        },
        init: function(i18n, modal) {
            this.i18n = i18n;
            this.uiModal = modal;
            this.load();
            this.apply();
            this.createModal();
            this.insertButton();
        },
        load: function() {
            this.storage = $.storage.get('ChatOptions') || {};
            this.storage.look = this.storage.look || {};
            this.storage.modules = this.storage.modules || [];
        },
        save: function() {
            $.storage.set('ChatOptions', this.storage);
        },
        apply: function() {
            var look = this.storage.look,
                css = '',
                $style = this.style,
                toImport = this.storage.modules.map(function(module) {
                    return this.modules[module];
                }, this).filter(function(module) {
                    return !module.loaded &&
                        (
                            typeof module.extloaded !== 'function' ||
                            !module.extloaded()
                        ) &&
                        (
                            typeof module.show !== 'function' ||
                            module.show()
                        );
                }, this).map(function(module) {
                    module.loaded = true;
                    return 'u:dev:MediaWiki:' + module.script + '.js';
                });
            if (!$style) {
                $style = $('<style>', {
                    id: 'ChatOptionsStyle'
                }).insertBefore($('style')[0]);
            }
            $.each(this.css, $.proxy(function(k, v) {
                var elCSS = '';
                v.forEach(function(el) {
                    if (look[el]) {
                        elCSS += this.look[el] + ':' + look[el] + ';';
                    }
                }, this);
                if (elCSS) {
                    css += k + '{' + elCSS + '}';
                }
            }, this));
            if (css) {
                $style.text(css);
            }
            if (toImport.length) {
                importArticles({
                    type: 'script',
                    articles: toImport
                });
            }
        },
        createModal: function() {
            this.uiModal.createComponent({
                vars: {
                    id: 'ChatOptionsModal',
                    content: this.buildUI().outerHTML,
                    size: 'medium',
                    title: this.escape('options'),
                    buttons: [
                        {
                            vars: {
                                value: this.escape('save'),
                                id: 'ChatOptionsSave',
                                classes: ['normal', 'primary'],
                                data: [{
                                    key: 'event',
                                    value: 'save'
                                }]
                            }
                        },
                        {
                            vars: {
                                value: this.escape('cancel'),
                                id: 'ChatOptionsCancel',
                                data: [{
                                    key: 'event',
                                    value: 'close'
                                }]
                            }
                        }
                    ]
                },
                confirmCloseModal: $.proxy(this.closeModal, this)
            }, $.proxy(this.cbCreateModal, this));
        },
        closeModal: function() {
            this.modal = null;
            this.createModal();
            return true;
        },
        cbCreateModal: function(modal) {
            modal.bind('save', $.proxy(this.clickSave, this));
            this.modal = modal;
        },
        insertButton: function() {
            this.button = new window.dev.chat.Button({
                name: 'ChatOptions',
                attr: {
                    id: 'ChatOptionsButton',
                    text: this.plain('options')
                }
            });
            $(this.button.el).click($.proxy(this.click, this));
        },
        click: function() {
            this.modal.show();
        },
        close: function() {
            $('#ChatOptionsModal').closeModal();
        },
        clickSave: function() {
            $('#ChatOptionsColors input').each($.proxy(function(_, el) {
                var $el = $(el);
                this.storage.look[$el.attr('name')] = $el.val();
            }, this));
            this.storage.look.fontFamily = $('#ChatOptionsFont').val();
            this.storage.modules = $('#ChatOptionsModules input')
                .filter(function() {
                    return $(this).prop('checked');
                }).map(function() {
                    return $(this).attr('name');
                }).toArray();
            this.save();
            this.apply();
            this.modal.trigger('close');
        },
        buildUI: function() {
            return window.dev.ui({
                type: 'form',
                attr: {
                    id: 'ChatOptionsForm'
                },
                classes: ['WikiaForm'],
                children: [
                    {
                        type: 'fieldset',
                        children: [
                            {
                                type: 'legend',
                                text: this.plain('color-changes')
                            },
                            {
                                type: 'p',
                                html: this.i18n.msg('color-changes-subtitle')
                                    .parse()
                            },
                            {
                                type: 'ul',
                                attr: {
                                    id: 'ChatOptionsColors'
                                },
                                children: this.colors
                                    .map(this.buildUIColorLI, this)
                            }
                        ]
                    },
                    {
                        type: 'fieldset',
                        children: [
                            {
                                type: 'legend',
                                text: this.plain('font')
                            },
                            {
                                type: 'label',
                                attr: {
                                    'for': 'ChatOptionsFont'
                                },
                                text: this.plain('font-family')
                            },
                            {
                                type: 'select',
                                attr: {
                                    id: 'ChatOptionsFont'
                                },
                                children: this.fonts
                                    .map(this.buildUIFontOption, this),
                                selected: this.fonts
                                    .indexOf(this.storage.look.fontFamily)
                            }
                        ]
                    },
                    {
                        type: 'fieldset',
                        children: [
                            {
                                type: 'legend',
                                text: this.plain('functionality')
                            },
                            {
                                type: 'ul',
                                attr: {
                                    id: 'ChatOptionsModules'
                                },
                                children: Object
                                    .keys(this.modules)
                                    .map(this.buildUIModule, this)
                            }
                        ]
                    }
                ]
            });
        },
        buildUIColorLI: function(color) {
            var name = color + 'Color';
            return {
                type: 'li',
                children: [
                    {
                        type: 'label',
                        attr: {
                            'for': name
                        },
                        text: this.plain('color-' + color)
                    },
                    {
                        type: 'input',
                        attr: {
                            type: 'text',
                            name: name,
                            id: name,
                            value: this.storage.look[name] ||
                                   config.wgSassParams[
                                       this.fallbacks[name.slice(0, -5)]
                                   ] || ''
                        }
                    }
                ]
            };
        },
        buildUIFontOption: function(font) {
            return {
                type: 'option',
                attr: {
                    value: font
                },
                style: {
                    'font-family': font
                },
                text: font.charAt(0).toUpperCase() + font.substring(1)
            };
        },
        buildUIModule: function(mod) {
            var child = {
                type: 'li',
                children: [
                    {
                        type: 'input',
                        attr: {
                            type: 'checkbox',
                            name: mod,
                            id: mod
                        }
                    },
                    {
                        type: 'label',
                        attr: {
                            'for': mod
                        },
                        html: this.i18n.msg('functionality-' + mod)
                            .parse()
                    }
                ],
                condition: typeof this.modules[mod].show !== 'function' ||
                           this.modules[mod].show()
            };
            if (this.storage.modules.indexOf(mod) !== -1) {
                child.children[0].attr.checked = true;
            }
            return child;
        },
        plain: function(msg) {
            return this.i18n.msg(msg).plain();
        },
        escape: function(msg) {
            return this.i18n.msg(msg).escape();
        }
    };
    mw.hook('dev.i18n').add($.proxy(ChatOptions.preload, ChatOptions));
    mw.hook('dev.ui').add($.proxy(ChatOptions.preload, ChatOptions));
    mw.hook('dev.chat.render').add($.proxy(ChatOptions.preload, ChatOptions));
});