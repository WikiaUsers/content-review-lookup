/** <nowiki>
 *
 * @module          Chat-js
 * @description     Library for FANDOM Chat.
 * @author          Speedit
 * @version         1.3.2
 * @license         CC-BY-SA 3.0
 *
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    // Variables and double-run protection.
    'use strict';
    window.dev = window.dev || {};
    if (window.dev.chat) {
        return;
    }

    /**
     * Chat-js constructor.
     * @class       Chat
     * @this        window.dev.chat
     */
    function Chat() {
        // Event conditionals.
        this.socket = false;
        this.render = false;
        this._controller.init();
        // Chat toolbar.
        this.toolbar = (function(d) {
            d.className = 'wds-button-group chat-toolbar';
            d.style.display = 'none';
            $('.ChatHeader .User').before(d);
            return d;
        }(document.createElement('div')));
        // Toolbar dropdown.
        var l = '12';
        this.dropdown = $('<div>', {
            'class': [
                'wds-dropdown',
                'wds-is-hidden',
                'chat-toolbar__dropdown'
            ].join(' '),
            'append': [
                $('<div>', {
                    'class': [
                        'wds-dropdown__toggle',
                        'wds-button',
                        'chat-toolbar__toggle'
                    ].join(' '),
                    append: $('<svg>', {
                        attr: {
                            'xmlns': 'http://www.w3.org/2000/svg',
                            'height' : l,
                            'width': l,
                            'class': 'wds-icon wds-icon-tiny',
                            'id': 'wds-icons-dropdown-tiny',
                            'viewBox': '0 0 ' + l + ' ' + l
                        },
                        append: $('<path>', {
                            'd': 'M6 9l4-5H2',
                            'fill-rule': 'evenodd'
                        })
                    }).prop('outerHTML')
                }),
                $('<div>', {
                    'class': [
                        'wds-dropdown__content',
                        'wds-is-not-scrollable',
                        'wds-is-right-aligned'
                    ].join(' '),
                    append: $('<ul>', {
                        'class': 'wds-list wds-is-linked'
                    })
                })
            ]
        }).appendTo(this.toolbar).get(0);
        // Toolbar dropdown reflow.
        mw.hook('dev.chat.render').add(this._reflow.bind(this));
        window.addEventListener('resize', $.debounce(100, this._reflow.bind(this)));
        // Event hooks.
        $.when(
            mw.loader.using('mediawiki.api'),
            this._controller.$ready,
            $.ready
        ).then(this._main.bind(this));
    }

    /**
     * Chat-js event dispatcher.
     * @method      _main
     * @this        window.dev.chat
     * @see         https://github.com/Wikia/app/blob/dev/extensions/wikia/Chat2/js/controllers/controllers.js#L1034
     * @private
     */
    Chat.prototype._main = function() {
        // Failsafe for JS execution stack.
        if (!(window.mainRoom || {}).socket) {
            return (this.failsafe = !this.failsafe)
                ? setTimeout(this._main.bind(this), 0)
                : false; // Don't double-run failsafe.
        }
        // Dispatch script hook.
        mw.hook('dev.chat').fire(this);
        // Dispatch socket event.
        this._socket();
        // Chat model bootstrapper.
        if (window.mainRoom.isInitialized) {
            this._render();
        } else {
            window.mainRoom.socket.bind('initial', this._render.bind(this));
        }
    };
    /**
     * Chat socket availability and hook.
     * @method      _socket
     * @this        window.dev.chat
     * @private
     */

    Chat.prototype._socket = function() {
        this.socket = true;
        mw.hook('dev.chat.socket').fire(window.mainRoom, this);
    };

    /**
     * Chat view availability and hook.
     * Also displays the Chat-js toolbar.
     * @method      _render
     * @this        window.dev.chat
     * @private
     */
    Chat.prototype._render = function() {
        this.render = true;
        this.toolbar.removeAttribute('style');
        mw.hook('dev.chat.render').fire(window.mainRoom, this);
    };

    /**
     * UI cache for cross-script button creation.
     * @method      buttons
     * @this        window.dev.chat
     * @param       {string} script Script name.
     * @returns     {HTMLElement} buttons
     */
    Chat.prototype.buttons = function(script) {
        var btn = '.chat-toolbar__button';
        if (typeof script !== 'string') {
            return this.toolbar.querySelectorAll(btn);
        }
        btn += '[data-name="' + script + '"]';
        var b = this.toolbar.querySelector(btn);
        if (b !== null) {
            return { el: b, exists: true };
        }
        return { exists: false };
    };

    /**
     * Button creation utility.
     * @method      button
     * @param       {Object} opts Button options.
     * @param       {string} opts.name Script name.
     * @param       {Object} opts.attr jQuery element attributes.
     * @constructor
     */
    Chat.prototype.Button = function(opts) {
        if (
            !opts.name ||
            window.dev.chat.buttons(opts.name).exists
        ) {
            return;
        }
        // Option setup
        opts.attr = opts.attr || {};
        $.extend(opts.attr, {
            'data-name': opts.name,
            'title': opts.name
        });
        opts.attr.class =
            [
                'wds-button',
                'wds-is-secondary',
                'chat-toolbar__button'
            ].join(' ') +
            (typeof opts.attr.class === 'string'
                ? ' ' + opts.attr.class
                : ''
            );
        // Button generation
        $.extend(this, opts);
        this.el = $('<a>', this.attr)
            .appendTo(window.dev.chat.toolbar);
        window.dev.chat.toolbar
            .appendChild(window.dev.chat.dropdown);
        // Reinitiate reflow calculation.
        if (window.dev.chat.render) {
            window.dev.chat._reflow.bind(window.dev.chat)();
        }
    };

    /**
     * Reflow support for chat dropdown.
     * @method      _reflow
     * @this        window.dev.chat
     */
    Chat.prototype._reflow = function() {
        // Expand list, set up variables and hide dropdown.
        this.dropdown.classList.remove('wds-is-hidden');
        var x = {},
            t = this.toolbar,
            d = this.dropdown,
            w = d.offsetWidth,
            b = this.buttons(),
            l = d.querySelector('.wds-list'),
            i;
        for (i = 0; i < b.length; i++) {
            if (d.contains(b[i])) {
                b[i].className = 'wds-button ' + b[i].className;
                t.insertBefore(b[i], d);
            }
        }
        l.innerHTML = '';
        d.classList.add('wds-is-hidden');
        // Determine whether only expansion is necessary.
        ['scroll', 'offset'].forEach(function(wt) {
            x[wt] = t[wt + 'Width'];
        });
        if (
            (window.dev.mobilechat || {}).state ||
            (Math.abs(x.scroll - x.offset) - 1) <= 0
        ) {
            return;
        }
        // Move buttons from dropdown to reduce overflow.
        var m = [],
            e;
        for (i = 0; i < b.length; i++) {
            w += b[i].offsetWidth;
            if (w > x.offset) {
                m.push(b[i]);
            }
        }
        for (i = 0; i < m.length; i++) {
            m[i].classList.remove('wds-button');
            m[i] = m[i].parentNode
                .removeChild(m[i]);
            e = document.createElement('li');
            e.appendChild(m[i]);
            m[i] = e;
            d.querySelector('.wds-list')
                .appendChild(m[i]);
        }
        d.classList.remove('wds-is-hidden');
        // Fire reflow hook.
        mw.hook('dev.chat.reflow').fire(this);
    };

    /**
     * Adds an inline alert message to a chatroom.
     * @method      inlineAlert
     * @this        window.dev.chat
     * @param       {string} text Inline alert text value (can be multi-line).
     * @param       {=string|number} roomId Target room ID for private chat (or 'main').
     */
    Chat.prototype.inlineAlert = function(text, roomId) {
        if (typeof text !== 'string' || !text.trim().length) {
            return [];
        }
        // Fetch room from identifier.
        var room = (roomId || 'main') !== 'main'
            ? window.mainRoom.chats.privates[roomId] || window.mainRoom
            : window.mainRoom.chats.main;
        var c = room.model.chats;
        // Add the messages.
        var m = text.split('\n').filter(Boolean).map(function(line) {
            return new window.models.InlineAlert({
                text: line,
                synthetic: 'chat-js'
            });
        });
        m.forEach(c.add.bind(c));
        room.viewDiscussion.scrollToBottom();

        return m;
    };

    /**
     * Chat-js stylesheet (useful for disabling).
     * @member      {HTMLLinkElement} stylesheet
     */
    Chat.prototype.stylesheet = importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:Chat-js.css'
    })[0];
    Chat.prototype.stylesheet.id = 'chat_css';

    /**
     * Chat-js mainRoom delegator.
     * @member      {Object} _controller
     * @see         https://github.com/Wikia/app/blob/dev/extensions/wikia/Chat2/js/controllers/controllers.js#L5
     */
    Chat.prototype._controller = {};
    Chat.prototype._controller.init = function() {
        var $r = this.$ready;
        if (window.NodeChatSocketWrapper) {
            $r.resolve();
        } else {
            document.querySelector('script[src$="chat_js2"]')
                .addEventListener('load', $r.resolve.bind($r));
        }
    };
    Chat.prototype._controller.$ready = $.Deferred();

    // Load MediaWiki API module.
    mw.loader.load('mediawiki.api');

    // Library bootloader.
    window.dev.chat = new Chat();

});