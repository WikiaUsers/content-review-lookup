/**
 * Name:        EmoticonsWindow
 * Version:     v1.6
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Shows a window with all available emoticons
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgChatEmoticons',
        'wgSassParams'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        window.EmoticonsWindowLoaded
    ) {
        return;
    }
    window.EmoticonsWindowLoaded = true;
    /**
     * Main object
     * @class EmoticonsWindow
     */
    var EmoticonsWindow = {
        // List of emoticons
        emoticons: {},
        // List of libraries
        libs: [
            'i18n',
            'colors',
            'ui',
            'chat'
        ],
        // Library loading status
        _loaded: 0,
        /**
         * Preload library
         */
        preload: function() {
            if (++this._loaded === this.libs.length) {
                window.dev.i18n.loadMessages('EmoticonsWindow')
                    .done($.proxy(this.init, this));
            }
        },
        /**
         * Initialize and parse emoticons
         */
        init: function(i18n) {
            i18n.useUserLang();
            this.i18n = i18n;
            this.ui = window.dev.ui;
            this.parseEmoticons();
            if (!$.isEmptyObject(this.emoticons)) {
                this.insertUI();
            }
        },
        /**
         * Parse emoticons
         * EmoticonMapping is used because that's a way Wikia parses
         * emoticons in the default system.
         */
        parseEmoticons: function() {
            var mapping = new EmoticonMapping();
            mapping.loadFromWikiText(config.wgChatEmoticons);
            $.each(mapping._settings, $.proxy(function(k, v) {
                this.emoticons[v[0]] = k;
            }, this));
        },
        /**
         * Initialize UI elements
         */
        insertUI: function() {
            var color = config.wgSassParams['color-buttons'];
            mw.util.addCSS(
                '.EmoticonsWindowIcon {' +
                    'background-color: ' + color + ';' +
                '}' +
                '.EmoticonsWindowIcon:hover {' +
                    'background-color: ' +
                        window.dev.colors
                            .parse(color)
                            .lighten(20)
                            .hex() +
                            ';' +
                '}'
            );
            this.insertElements();
            this.insertButton();
        },
        /**
         * Create elements to be displayed in the modal
         */
        insertElements: function() {
            this.mainElement = this.ui({
                type: 'div',
                attr: {
                    id: 'EmoticonsWindowModalMain'
                },
                children: [
                    {
                        type: 'span',
                        attr: {
                            'class': 'EmoticonsWindowHelp'
                        },
                        text: this.i18n.msg('help').plain()
                    },
                    {
                        type: 'div',
                        attr: {
                            id: 'EmoticonsWindowList'
                        },
                        children: $.map(this.emoticons, function(k, v) {
                            return {
                                type: 'img',
                                attr: {
                                    'class': 'EmoticonsWindowIcon',
                                    src: k,
                                    title: v
                                }
                            };
                        })
                    }
                ]
            });
        },
        /**
         * Insert the Emoticons button
         */
        insertButton: function() {
            var button = new window.dev.chat.Button({
                name: 'EmoticonsWindow',
                attr: {
                    'class': 'EmoticonsWindowButton',
                    text: this.i18n.msg('emoticons').plain(),
                    click: $.proxy(this.clickButton, this)
                }
            });
            mw.hook('EmoticonsWindow.button').fire($(button.el));
        },
        /**
         * Handles clicking on the Emoticons button
         */
        clickButton: function() {
            this.showModal();
            $('.EmoticonsWindowIcon').click($.proxy(this.clickIcon, this));
        },
        /**
         * Show the emoticons window
         */
        showModal: function() {
            try {
                $.showCustomModal(this.i18n.msg('emoticons').escape(), this.mainElement.outerHTML, {
                    id: 'EmoticonsWindowModal',
                    buttons: [{
                        id: 'EmoticonsWindowClose',
                        defaultButton: true,
                        message: this.i18n.msg('close').escape(),
                        handler: $.proxy(this.closeModal, this)
                    }]
                });
            } catch (e) {
                console.warn('[EmoticonsWindow] Opening the modal threw an error', e);
            }
        },
        /**
         * Closes the emoticons window modal
         */
        closeModal: function() {
            $('#EmoticonsWindowModal').closeModal();
        },
        /**
         * Handles clicking on an emoticon icon
         * @param {ClickEvent} e The click event
         */
        clickIcon: function(e) {
            var $this = $(e.target),
                ap = $('.message textarea').last();
            ap.val(ap.attr('value') + ' ' + $this.attr('title'));
            this.closeModal();
        }
    };
    EmoticonsWindow.libs.forEach(function(lib) {
        mw.hook('dev.' + lib).add($.proxy(this.preload, this));
    }, EmoticonsWindow);
    if (!window.dev || EmoticonsWindow.libs.some(function(l) {
        return !window.dev[l];
    })) {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Chat-js.js',
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Colors/code.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        });
    }
    importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:EmoticonsWindow.css'
    });
})();