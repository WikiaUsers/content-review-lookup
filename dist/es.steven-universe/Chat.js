/* global mw, $, dev, importArticles */

'use strict';

document.title = 'Chat - Steven Universe Wiki';
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
$('head').append($('<meta>', {
    name: 'theme-color',
    content: mw.config.get('wgSassParams')['color-community-header']
}));
$('body').addClass('user-' + mw.config.get('wgUserName'));

mw.hook('dev.chat').add(function (chat) {
    console.log('[Chat-js] Chat-js loaded');
});

mw.hook('dev.chat.socket').add(function (mainRoom) {
    console.log('[Chat-js] Connected to chat socket');
});

mw.hook('dev.chat').add(function (chat) {
    var $messageBoxContainer = $('.Write'),
        $messageBox = $('.Write [name="message"]'),
        $sendButton = $('<span>', {
            class: 'button',
            id: 'ChatSendButton',
            text: 'Enviar'
        }).appendTo($messageBoxContainer);
    $sendButton.click(function () {
        $messageBox.trigger({
            type: 'keypress',
            which: 13
        });
    });
});

mw.hook('dev.chat.render').add(function (mainRoom) {
    console.log('[Chat-js] Chat UI rendering finished');

    $('[name="message"]').keypress(function (e) {
        if (e.which === 13 && !e.shiftKey) {
            var message = this.value;
            if (!message.trim()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
            }
            if (/[\/[:]Especial:Chat|Special:Chat/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Debido a las reglas de la comunidad, no puedes enviar enlaces de chats de Fandom.', mainRoom.activeRoom);
            }
            if (/(http(s)?:\/\/)?(www\.)?(60484617|54176365|794488387260435|kat\.cr|thepiratebay|toonget|worldofsteven|twosu|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|seriesflv|seodiv|ustream|cartooncrazy)/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Tu mensaje no puede enviarse porque contiene un enlace prohibido por la política de derechos de autor de la comunidad.', mainRoom.activeRoom);
            }
            if (/(http(s)?:\/\/)?(www\.)?((xvideos|pornhub|brazzers|redtube|serviporno|petardas|cerdas)\.com)/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Tu mensaje no puede enviarse porque contiene un enlace prohibido por las reglas de la comunidad.', mainRoom.activeRoom);
            }
        }
    });

    var mod_alert = new Audio('https://vignette.wikia.nocookie.net/universosteven/es/images/9/9b/Res-mod_alert.ogg');
    var groups = mw.config.get('wgUserGroups').join(' ');
    mainRoom.model.chats.bind("afteradd", function (c) {
        if (typeof mainRoom.roomId === "undefined") return;
        if (mainRoom.userMain.attributes.isModerator || /(moderator|commentcontrol|rollback|contentmoderator|diseñador)/.test(groups)) {
            var user = c.attributes.name,
                msg = c.attributes.text;
            if (user && msg && /^(?:!|@)(?:mod|admin|staff)/i.test(msg)) {
                mod_alert.play();
                if (Notification.permission === 'granted') {
                    if (!document.hasFocus() || !/main|null/.test(mainRoom.activeRoom)) {
                        var notif = new Notification('¡' + user + ' solicita un moderador!', {
                            body: msg
                        });
                        notif.addEventListener('click', function () {
                            if (!document.hasFocus()) {
                                parent.focus();
                                window.focus();
                            }
                            if (!/main|null/.test(mainRoom.activeRoom)) {
                                mainRoom.showRoom('main');
                            }
                            this.close();
                        });
                    }
                }
            }
        }
    });

});

var util = {
    blankMsgTextarea: function blankMsgTextarea() {
        return $('[name="message"]').val('').removeAttr('disabled').focus();
    }
};

var IsTyping = {
    noStyle: true
};

var ExtendedPrivateMessaging = {
    enableExperimentalGroupIcons: true
};

var Pings = {
    maxRecentPings: 10,
    storage: {
        whitelist: false,
        notifications: true,
        casesensitive: false,
        'word-boundary': false,
        'audio-enabled': true,
        'inline-alerts': false,
        'highlight-ping': true,
        blacklist: '',
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        pings: mw.config.get('wgUserName'),
        color: 'red',
    }
};

var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/universosteven/es/images/1/14/Res-pm_alert.ogg',
    notifications: true,
    alertWhileFocused: true
};

var ChatLinkPreview = {
    previewLocalLinks: true
};

/** Load CssVars.js on IE **/
if (/Trident|MSIE/.test(navigator.userAgent)) {
    $.ajax({
        cache: true,
        dataType: "script",
        url: '/es/load.php?mode=articles&only=scripts&articles=MediaWiki:CssVars.js'
    }).done(function () {
        cssVars({
            include: 'style,link[href*="/load.php"]',
            onlyLegacy: true,
            watch: true
        });
    });
}

(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || !window.Promise) return;

    window.ChatMobileUI = $.extend({
        isMobile: null,
        store: {},

        ui: {
            privateList: document.querySelector('#PrivateChatList'),

            $unreadCount: null,
            $toggleRailButton: null,
        },

        detectMobile: function () {
            this.isMobile = window.matchMedia([
                'screen and (max-aspect-ratio: 3/4) and (min-resolution: 240dpi)',
                '(max-aspect-ratio: 3/4) and (max-width: 1080px) and (min-resolution: 200dpi)',
                '(max-aspect-ratio: 3/4) and (max-width: 720px) and (min-resolution: 150dpi)',
                '(max-width: 480px)'
            ].join(', ')).matches;
            this.isMobile ? document.body.classList.add('mobile') : document.body.classList.remove('mobile');
        },

        onToggleButtonClick: function (event) {
            if ($('.Rail').hasClass('closed')) {
                this.openRail();

            } else {
                this.closeRail();
            }
        },

        openRail: function () {
            $('#Rail, .Chat, .Write').removeClass('closed');
        },

        closeRail: function () {
            $('#Rail, .Chat, .Write').addClass('closed');
        },

        onPrivateRoomCreated: function (mutations, observer) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList' &&
                    mutation.addedNodes.length &&
                    mutation.addedNodes[0] instanceof HTMLElement &&
                    mutation.addedNodes[0].classList.contains('User')) {
                    var privateChat = mutation.addedNodes[0];
                    this.privateUpdateObserver.observe(privateChat, {
                        childList: true,
                        subtree: true
                    });
                    privateChat.addEventListener('click', function () {
                        if (!privateChat.classList.contains('selected')) {
                            this.updateUnreadCounter(privateChat.dataset.user, 0);
                        }
                    }.bind(this));
                }
            }.bind(this));
        },

        onPrivateRoomUpdated: function (mutations, observer) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList' &&
                    mutation.addedNodes.length &&
                    mutation.target instanceof HTMLElement &&
                    mutation.target.classList.contains('splotch')) {
                    if (!mutation.target.parentElement.classList.contains('selected')) {
                        this.updateUnreadCounter(mutation.target.parentElement.dataset.user, parseInt(mutation.target.innerText));
                    }
                }
            }.bind(this));
        },

        updateUnreadCounter: function (user, unreads) {
            if (this.store.hasOwnProperty(user) && this.store[user] === unreads) return;
            this.store[user] = unreads;
            var totalMessages = this.util.sumValues(this.store);
            this.ui.$unreadCount.text(totalMessages);
            if (totalMessages > 0) {
                this.ui.$unreadCount.addClass('unread');
            } else {
                this.ui.$unreadCount.removeClass('unread');
            }
        },

        init: function (mainRoom) {
            this.ui.$toggleRailButton = $('<span>', {
                    class: 'button toggle-chat-rail'
                })
                .append($('<div>', {
                    'class': 'unread-indicator'
                }))
                .appendTo($('.ChatHeader '));
            this.ui.$toggleRailButton.on('click', this.onToggleButtonClick.bind(this));
            this.ui.$unreadCount = this.ui.$toggleRailButton.children('.unread-indicator');

            this.privateCreationObserver = new MutationObserver(this.onPrivateRoomCreated.bind(this));
            this.privateUpdateObserver = new MutationObserver(this.onPrivateRoomUpdated.bind(this));
            this.privateCreationObserver.observe(this.ui.privateList, {
                childList: true
            });

            this.detectMobile();
            if (this.isMobile) this.closeRail();

            $(window).resize($.throttle(100, this.detectMobile.bind(this)));

            $(document).click(function (event) {
                var $target = $(event.target);
                if (!($target.closest('#Rail').length ||
                        $target.closest('#ChatHeader').length) && $target !== this.ui.$toggleRailButton) {
                    if ($('body').hasClass('mobile')) this.closeRail();
                }
            }.bind(this));
        },

        util: {
            sumValues: function (obj) {
                var sum = 0;
                for (var el in obj) {
                    if (obj.hasOwnProperty(el)) {
                        sum += parseFloat(obj[el]);
                    }
                }
                return sum;
            }
        }

    }, window.ChatMobileUI);

    mw.hook('dev.chat').add(ChatMobileUI.init.bind(ChatMobileUI));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:Chat-js.js'
        ]
    });

})();


require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
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
     * Main object.
     * @class EmoticonsWindow
     */
    var EmoticonsWindow = {
        // List of emoticons.
        emoticons: {},
        // Map of libraries.
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
        hook: function (name, dep) {
            mw.hook('dev.' + name).add(this.preload.bind(this, name));
            if (!window.dev || !window.dev[name]) {
                importArticle({
                    type: 'script',
                    article: 'u:dev:MediaWiki:' + dep + '.js'
                });
            }
        },
        // Library loading status.
        _loaded: 0,
        /**
         * Preload checks.
         */
        preload: function (name, dep) {
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
         * Initialize and parse emoticons.
         * @param {Object} i18n I18n-js translation accessor
         */
        init: function () {
            this.parseEmoticons();
            if (!$.isEmptyObject(this.emoticons)) {
                this.insertUI();
            }
        },
        /**
         * Parse emoticons.
         * EmoticonMapping is used because that's a way FANDOM parses
         * emoticons in the default system.
         * This also supports the AjaxEmoticons script, if installed.
         */
        parseEmoticons: function () {
            var mapping = new EmoticonMapping();
            mapping.loadFromWikiText(mw.config.get('wgChatEmoticons'));
            $.each(mapping._settings, (function (k, v) {
                this.emoticons[v[0]] = k;
            }).bind(this));
        },
        /**
         * Initialize UI elements.
         */
        insertUI: function () {
            this.insertCSS();
            this.initModal();
            this.insertButton();
        },
        /**
         * Inserts required CSS.
         */
        insertCSS: function () {
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
         * Initializes the emoticons modal.
         */
        initModal: function () {
            this.modal = new window.dev.modal.Modal({
                buttons: [{
                    event: 'close',
                    id: 'EmoticonsWindowClose',
                    primary: true,
                    text: this.i18n.msg('close').plain()
                }],
                closeTitle: this.i18n.msg('close').plain(),
                content: {
                    type: 'div',
                    attr: {
                        id: 'EmoticonsWindowModalMain'
                    },
                    children: [{
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
                            children: $.map(this.emoticons, function (k, v) {
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
         * Insert the Emoticons button.
         */
        insertButton: function () {
            var button = $('<span>', {
                class: 'button emoji-picker-button',
                text: this.i18n.msg('emoticons').plain()
            });
            button.prependTo($('.Write .message'));
            button.on('click', this.clickButton.bind(this));
            mw.hook('EmoticonsWindow.button').fire($(button.el));
        },
        /**
         * Handles clicking on the Emoticons button.
         */
        clickButton: function () {
            this.modal.show();
            $('.EmoticonsWindowIcon').click(this.clickIcon.bind(this));
        },
        /**
         * Handles clicking on an emoticon icon.
         * @param {ClickEvent} e The click event
         */
        clickIcon: function (e) {
            var $this = $(e.target),
                ap = $('.message textarea').last();
            ap.val(ap.attr('value') + ' ' + $this.attr('title'));
            if (!e.shiftKey) {
                this.modal.close();
            }
        }
    };
    // Preload libraries & styling.
    importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:EmoticonsWindow.css'
    });
    $.each(EmoticonsWindow.deps, EmoticonsWindow.hook.bind(EmoticonsWindow));
});

importArticles({
    type: 'script',
    articles: [
        // libraries
        'u:dev:Chat-js.js',
        'u:dev:UI-js/code.js',
        'u:dev:Modal.js',
        // script imports
        'u:es.steven-universe:MediaWiki:Chat.js/Pings.js',
        'u:es.steven-universe:MediaWiki:Chat.js/ChatRules.js',
        'u:es.steven-universe:MediaWiki:Chat.js/CustomChatStatus.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:IsTyping.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!ban/code.js',
        'u:dev:Tabinsert.js',
        'u:es.steven-universe:MediaWiki:Chat.js/ChatLinkPreview.js',
        'u:dev:ChatSyntaxHighlight.js',
        'u:es.halflife:Tags-import-SU.js',
        'u:dev:EmoticonDragAndDrop.js',
        'u:dev:FaviconNotifier/code.js',
        'u:dev:FixChatEscaping.js',
        'u:dev:AjaxEmoticons/code.js'
    ]
});