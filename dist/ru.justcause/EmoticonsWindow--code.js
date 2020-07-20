/**
 * Name:        EmoticonsWindow
 * Version:     v2.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Shows a window with all available emoticons
 */
require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
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
     * Главный объект.
     * @class EmoticonsWindow
     */
    var EmoticonsWindow = {
        // Список смайликов.
        emoticons: {},
        // Карта библиотек.
        deps: {
            'i18n': 'I18n-js/code',
            'colors': 'Colors/code',
            'ui': 'UI-js/code',
            'chat': 'Chat-js',
            'modal': 'Modal'
        },
        /**
         * Library hook listener.
         */
        hook: function(name, dep) {
            mw.hook('dev.' + name).add(this.preload.bind(this, name));
            if (!window.dev || !window.dev[name]) {
                importArticle({
                    type: 'script',
                    article: 'u:dev:MediaWiki:' + dep + '.js'
                });
            }
        },
        // Состояние загрузки библиотеки.
        _loaded: 0,
        /**
         * Проверка предварительной загрузки.
         */
        preload: function(name, dep) {
            var MSG = 'i18n-messages';
            if (name === 'i18n') {
                window.dev.i18n
                    .loadMessages('EmoticonsWindow')
                    .done(this.preload.bind(this, MSG));
                return;
            }
            if (name === MSG) {
                this.i18n = dep;
            }
            if (++this._loaded === Object.keys(this.deps).length) {
                this.init();
            }
        },
        /**
         * Инициализация и анализ смайликов.
         * @param {Object} i18n I18n-js translation accessor
         */
        init: function() {
            this.parseEmoticons();
            if (!$.isEmptyObject(this.emoticons)) {
                this.insertUI();
            }
        },
        /**
         * Разбор смайликов.
         * EmoticonMapping используется, потому что это способ анализа FANDOM'а
         * смайлики в системе по умолчанию.
         * Это также поддерживает сценарий AjaxEmoticons, если он установлен.
         */
        parseEmoticons: function() {
            var mapping = new EmoticonMapping();
            mapping.loadFromWikiText(mw.config.get('wgChatEmoticons'));
            $.each(mapping._settings, (function(k, v) {
                this.emoticons[v[0]] = k;
            }).bind(this));
        },
        /**
         * Инициализация элементов пользовательского интерфейса
.
         */
        insertUI: function() {
            this.insertCSS();
            this.initModal();
            this.insertButton();
        },
        /**
         * Вставки, необходимые для CSS.
         */
        insertCSS: function() {
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
        },
        /**
         * Инициализирует модальные смайлики.
         */
        initModal: function() {
            this.modal = new window.dev.modal.Modal({
                buttons: [
                    {
                        event: 'close',
                        id: 'EmoticonsWindowClose',
                        primary: true,
                        text: this.i18n.msg('close').plain()
                    }
                ],
                closeTitle: this.i18n.msg('close').plain(),
                content: {
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
                                    classes: ['EmoticonsWindowIcon'],
                                    attr: {
                                        src: k,
                                        title: v
                                    }
                                };
                            })
                        }
                    ]
                },
                context: this,
                id: 'EmoticonsWindowModal',
                size: 'small',
                title: this.i18n.msg('emoticons').plain()
            });
            // We don't need to wait for it to be created, it already does.
            this.modal.create();
        },
        /**
         * Вставка кнопки смайликов.
         */
        insertButton: function() {
            var button = new window.dev.chat.Button({
                name: 'EmoticonsWindow',
                attr: {
                    'class': 'EmoticonsWindowButton',
                    'click': this.clickButton.bind(this),
                    'text': this.i18n.msg('emoticons').plain()
                }
            });
            mw.hook('EmoticonsWindow.button').fire($(button.el));
        },
        /**
         * Обрабатывает нажатие на кнопку смайликов.
         */
        clickButton: function() {
            this.modal.show();
            $('.EmoticonsWindowIcon').click(this.clickIcon.bind(this));
        },
        /**
         * Обрабатывает нажатие на иконку смайлика.
         * @param {ClickEvent} e The click event
         */
        clickIcon: function(e) {
            var $this = $(e.target),
                ap = $('.message textarea').last();
            ap.val(ap.attr('value') + ' ' + $this.attr('title'));
            if (!e.shiftKey) {
                this.modal.close();
            }
        }
    };
    // Предварительная загрузка библиотек и стилей.
    importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:EmoticonsWindow.css'
    });
    $.each(EmoticonsWindow.deps, EmoticonsWindow.hook.bind(EmoticonsWindow));
});