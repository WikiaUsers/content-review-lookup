/**
 * Name:        Modal
 * Version:     v2.2
 * Author:      KockaAdmiralac
 * Description: Abstracts modal logic for native Fandom modals and OOUI.
 */
/* eslint {"max-statements": "off"} */
(function() {
    'use strict';
    window.dev = window.dev || {};
    // Double-load protection.
    if (window.dev.modal) {
        return;
    }
    
    importArticle({
    	article: 'u:dev:MediaWiki:Modal.css'
    });

    /**
     * Module exports.
     */
    var module = {
        modals: {}
    };

    /**
     * All possible sizes a modal can effectively have.
     * @constant
     */
    var MODAL_SIZES = [
        'small',
        'medium',
        'large',
        'larger',
        'content-size',
        'full'
    ];

    /**
     * All possible modal button types.
     * link - Renders as a simple link
     * input - Renders as <input type="button">
     * button - Renders as <button>
     * @constant
     */
    var BUTTON_TYPES = [
        'link',
        'input',
        'button'
    ];

    /**
     * Callback after the modal component has been initialized.
     * @param {UIComponent} modal Modal component creator
     */
    function init(modal) {
        module._windowManager = new OO.ui.WindowManager({
            classes: ['modal-js-window']
        });
        $(document.body).append(module._windowManager.$element);
        mw.hook('dev.modal').fire(module);
    }

    /**
     * Modal button constructor.
     * @constructor
     * @param {Object} options Button options
     */
    function ModalButton(options) {
        this.primary = Boolean(options.primary);
        this.safe = Boolean(options.close || options.safe);
        this.back = Boolean(options.back);
        this.close = Boolean(options.close);
        this.setText(options.text || options.value)
            .setEvent(options.event)
            .setClasses(options.classes)
            .setID(options.id)
            .setDisabled(options.disabled)
            .setSprite(options.sprite || options.imageClass)
        // Link-specific methods
            .setHref(options.href)
            .setTitle(options.title)
            .setTarget(options.target)
        // Input-specific methods
            .setName(options.name);
    }

    /**
     * Sets button classes, including normal and primary ones.
     * @param {String|Array} classes Classes to set
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setClasses = function(classes) {
        this.classes = classes instanceof Array ? classes : [];
        return this;
    };

    /**
     * Sets whether the button is disabled or not.
     * @param {Boolean} disabled Whether the button is disabled
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setDisabled = function(disabled) {
        this.disabled = Boolean(disabled);
        return this;
    };

    /**
     * Sets event data.
     * @param {String} event Event to assign to the button
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setEvent = function(event) {
        if (typeof event === 'string') {
            this.event = event;
        }
        return this;
    };

    /**
     * Sets the location the button links to if it's a link.
     * @param {String} href Location the button points to
     * @returns {ModalButton} Current instance
     * @throws {Error} If not validly specified when the button is a link
     */
    ModalButton.prototype.setHref = function(href) {
        if (this.type === 'link'&& typeof href === 'string') {
            this.href = href;
        }
        return this;
    };

    /**
     * Sets the button ID.
     * @param {String} id Button's ID.
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setID = function(id) {
        if (typeof id === 'string') {
            this.id = id;
        }
        return this;
    };

    /**
     * Sets the input name of the button is an input element.
     * @param {String} name Input button name
     * @returns {ModalButton} Current instance
     * @throws {Error} If not validly specified when the button is an input
     */
    ModalButton.prototype.setName = function(name) {
        if (this.type === 'input') {
            if (typeof name === 'string') {
                this.name = name;
            } else {
                throw new Error('`name` parameter required!');
            }
        }
        return this;
    };

    /**
     * Sets button text.
     * @param {String} text Text on the button
     * @returns {ModalButton} Current instance
     * @throws {Error} If not validly specified
     */
    ModalButton.prototype.setText = function(text) {
        if (typeof text !== 'string') {
            throw new Error('No text specified!');
        }
        this.text = text;
        return this;
    };

    /**
     * Sets the button type.
     * @param {String} type Button type
     * @see BUTTON_TYPES
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setType = function(type) {
        return this;
    };

    /**
     * Sets the button's sprite image. Doesn't work if it's an input button.
     * @param {String} sprite Sprite class of the sprite.
     * @todo Sprite class validation
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setSprite = function(sprite) {
        if (
            (this.type === 'link' || this.type === 'button') &&
            typeof sprite === 'string'
        ) {
            this.sprite = sprite;
        }
        return this;
    };

    /**
     * Sets the target of the link if the button is a link.
     * @param {String} target Button's link target.
     * @returns {ModalButton} Current instance
     */
    ModalButton.prototype.setTarget = function(target) {
        if (
            this.type === 'link' &&
            typeof target === 'string'
        ) {
            this.target = target;
        }
        return this;
    };

    /**
     * Sets the title of the link if the button is a link.
     * @param {String} title Button's link title
     * @returns {ModalButton} Current instance
     * @throws {Error} If not validly specified when the button is a link
     */
    ModalButton.prototype.setTitle = function(title) {
        if (this.type === 'link' && typeof title === 'string') {
            this.title = title;
        }
        return this;
    };

    /**
     * Converts instance variables to Mustache variables.
     * @returns {Object} Mustache variables for rendering the button
     */
    ModalButton.prototype.create = function() {
        var flags = [];
        ['primary', 'safe', 'back', 'close'].forEach(function(flag) {
            if (this[flag]) {
                flags.push(flag);
            }
        }, this);
        return {
            action: this.event,
            classes: this.classes,
            disabled: this.disabled,
            flags: flags,
            href: this.href,
            icon: this.sprite,
            id: this.id,
            label: this.text,
            title: this.title
        };
    };

    /**
     * Creates a button out of button configuration.
     * @param {Object} options Button options
     * @returns {ModalButton|false} Modal button object
     */
    function createButton(options) {
        if (typeof options !== 'object') {
            return false;
        }
        return new ModalButton(options);
    }

    /**
     * Gets Mustache variables required to render a button.
     * @param {ModalButton} button Button to get Mustache variables from
     * @returns {Object} Mustache variables for rendering the button
     */
    function buttonComponent(button) {
        return button.create();
    }

    /**
     * Modal constructor.
     * @constructor
     * @param {Object} options Modal options
     * @throws {Error} If ID is not specified or already used
     */
    function Modal(options) {
        if (typeof options.id !== 'string') {
            throw new Error('Modal ID must be specified!');
        }
        if (module.modals[options.id]) {
            throw new Error('Modal with same ID already registered!');
        }
        this.id = options.id;
        this.context = options.context || this;
        this.setSize(options.size)
            .setContent(options.content)
            .setTitle(options.title, options.isHTML)
            .setCloseTitle(options.closeTitle)
            .setButtons(options.buttons)
            .setEvents(options.events)
            .setClass(options.class || options.classes)
            .setClose(options.close)
            .setCloseEscape(options.closeEscape);
        module.modals[this.id] = this;
    }

    /**
     * Sets the modal's buttons.
     * @param {Array} buttons Modal's buttons
     * @returns {Modal} Current instance
     */
    Modal.prototype.setButtons = function(buttons) {
        this.buttons = buttons instanceof Array ?
            buttons
                .map(createButton)
                .filter(Boolean) :
            [];
        this.buttons.push(new ModalButton({
            close: true,
            text: this.closeTitle,
            title: this.closeTitle
        }));
        return this;
    };

    /**
     * Sets the modal's class(es).
     * @param {String|Array} classes Modal's class(es)
     * @returns {Modal} Current instance
     */
    Modal.prototype.setClass = function(classes) {
        if (classes instanceof Array) {
            this.classes = classes;
        } else if (typeof classes === 'string') {
            this.classes = [classes];
        }
        return this;
    };

    /**
     * Sets the modal's class(es).
     * @param {String|Array} classes Modal's class(es)
     * @returns {Modal} Current instance
     */
    Modal.prototype.setClasses = Modal.prototype.setClass;

    /**
     * Sets the function to be executed on closing.
     * @param {Function} close On close function
     * @returns {Modal} Current instance
     */
    Modal.prototype.setClose = function(close) {
        if (typeof close === 'function') {
            this.closeFunc = close;
        }
        return this;
    };

    /**
     * Sets whether the modal should be closed when
     * the Escape button is pressed.
     * @param {Boolean} escape Whether the Escape button closes the modal
     * @returns {Modal} Current instance
     */
    Modal.prototype.setCloseEscape = function(escape) {
        this.closeEscape = escape !== false;
        return this;
    };

    /**
     * Sets the title on the closing link (X).
     * @param {String} title Closing link title
     * @returns {Modal} Current instance
     */
    Modal.prototype.setCloseTitle = function(title) {
        this.closeTitle = typeof title === 'string' ? title : mw.message('ooui-dialog-message-reject').plain();
        return this;
    };

    /**
     * Sets modal content.
     * @param {String} content Modal content
     * @returns {Modal} Current instance
     * @throws {Error} If not validly specified
     */
    Modal.prototype.setContent = function(content) {
        if (
            typeof content === 'string' ||
            typeof content === 'object' &&
            content instanceof OO.ui.Layout
        ) {
            this.content = content;
        } else if (content instanceof Node) {
            this.content = content;
        } else if (
            typeof content === 'object' &&
            typeof window.dev.ui === 'function'
        ) {
            this.content = window.dev.ui(content);
        } else {
            throw new Error('Modal content not specified!');
        }
        if (this._modal) {
            if (this.content instanceof OO.ui.Layout) {
                this._modal.content.$element.remove();
                this._modal.content = this.content;
                this._modal.$body.append(this.content.$element);
            } else {
                this._modal.content.$element.html(this.content);
            }
        }
        return this;
    };

    /**
     * Sets an event handler.
     * @param {String} name Event name
     * @param {Function|String} listener Event listener or its name in context
     * @returns {Modal} Current instance
     */
    Modal.prototype.setEvent = function(name, listener) {
        this.events[name] = this.events[name] || [];
        if (typeof listener === 'function') {
            this.events[name].push(listener.bind(this.context));
        } else if (
            typeof listener === 'string' &&
            this.context &&
            typeof this.context[listener] === 'function'
        ) {
            this.events[name].push(
                (this.context[listener]).bind(this.context)
            );
        }
        return this;
    };

    /**
     * Sets event handlers.
     * @param {Object} events Event handlers
     * @returns {Modal} Current instance
     */
    Modal.prototype.setEvents = function(events) {
        this.events = {};
        if (typeof events !== 'object') {
            return this;
        }
        for (var e in events) {
            if (events[e] instanceof Array) {
                for (var i = 0, l = e.length; i < l; ++i) {
                    this.setEvent(e, events[e][i]);
                }
            } else {
                this.setEvent(e, events[e]);
            }
        }
        return this;
    };

    /**
     * Sets the modal size.
     * @param {String} size Modal's size
     * @see MODAL_SIZES
     * @returns {Modal} Current instance
     */
    Modal.prototype.setSize = function(size) {
        if (MODAL_SIZES.indexOf(size) === -1) {
            this.size = 'medium';
        } else if (size === 'content-size') {
            this.size = 'full';
        } else {
            this.size = size;
        }
        if (this._modal) {
            this._modal.setSize(this.size);
        }
        return this;
    };

    /**
     * Sets the modal title.
     * @param {String} title The modal's title
     * @param {Boolean} isHTML Whether the modal's title should be HTML
     * @returns {Modal} Current instance
     */
    Modal.prototype.setTitle = function(title, isHTML) {
        this.title = typeof title === 'string' ?
            title :
            'Modal';
        this.titleIsHTML = Boolean(isHTML);
        if (this._modal && !isHTML) {
            this._modal.$head
                .find('.oo-ui-processDialog-title')
                .text(title);
        }
        return this;
    };

    /**
     * Creates a modal component.
     * @returns {$.Deferred} Promise to wait on for the modal to get created
     */
    Modal.prototype.create = function() {
        this._loading = new $.Deferred();
        var OOUIModal = function(config) {
            this._modal = config.modal;
            delete config.modal;
            OOUIModal.super.call(this, config);
        };
        OO.inheritClass(OOUIModal, OO.ui.ProcessDialog);
        var superclass = OOUIModal.super.prototype;
        OOUIModal.static.name = this.id;
        OOUIModal.static.title = this.title;
        OOUIModal.static.actions = this.buttons.map(buttonComponent);
        OOUIModal.prototype.initialize = function() {
            superclass.initialize.apply(this, arguments);
            if (this._modal.content instanceof OO.ui.Layout) {
                this.content = this._modal.content;
            } else {
                this.content = new OO.ui.PanelLayout({
                    expanded: false,
                    padded: false
                });
            }
            this.content.$element.append(this._modal.content);
            this.$body.append(this.content.$element);
        };
        OOUIModal.prototype.getActionProcess = function(action) {
            var handlers = this._modal.events[action];
            if (action === 'close') {
                return new OO.ui.Process((function() {
                    this.close();
                }).bind(this));
            }
            if (this._modal.events[action]) {
                return new OO.ui.Process((function() {
                    handlers.forEach(function(handle) {
                        handle();
                    }, this);
                }).bind(this));
            }
            return superclass.getActionProcess.call(this, action);
        };
        this._modal = new OOUIModal({
            classes: this.classes,
            id: this.id,
            modal: this,
            size: this.size
        });
        module._windowManager.addWindows([this._modal]);
        /*
         * Close modal when clicked outside of the modal
         * (by [[User:Noreplyz]] for [[WHAM]]).
         */
        this._modal.$frame.parent().prepend('<div class="oo-ui-window-backdrop"></div>');
        this._modal.$frame.prev().click((function(event) {
            if ($(event.target).parent().attr('id') === this.id) {
                this._modal.close();
            }
        }).bind(this));
        this._loading.resolve(this);
        return this._loading;
    };

    /**
     * Modal closing handler.
     * @returns {Boolean} Whether the modal should close
     * @private
     */
    Modal.prototype._close = function() {
        this._modal = null;
        this.create();
        /*
         * This is a hack around the bug with scrollbar not restoring
         * upon closing the modal. Fandom's modal that should
         * automatically do this assumes that, when the .modal-blackout
         * class is present in the document, a modal is still showing
         * and the scrollbar needs not be removed. However, due to Modal's
         * caching behavior, this is no longer true and we have to
         * supply our own implementation of the code that restores the
         * scrollbar, as seen below.
         */
        if ($('body').children('.modal-blackout.visible').length) {
            $('body').removeClass('with-blackout');
            $('.WikiaSiteWrapper')
                .removeClass('fake-scrollbar')
                .css('top', 'auto');
            $(window).scrollTop(this.wScrollTop);
        }
        if (this.closeFunc) {
            return this.closeFunc.bind(this.context)();
        }
        return true;
    };

    /**
     * Callback after the modal has been created.
     * @param {wikia.ui.factory.Modal} modal Created modal
     * @private
     */
    Modal.prototype._created = function(modal) {
        this._modal = modal;
        for (var e in this.events) {
            for (var i = 0, l = this.events[e].length; i < l; ++i) {
                modal.bind(e, this.events[e][i]);
            }
        }
        this._loading.resolve(this);
    };

    /**
     * Shows the modal.
     */
    Modal.prototype.show = function() {
        this.wScrollTop = $(window).scrollTop();
        if (this._modal) {
            module._windowManager.openWindow(this._modal);
        } else if (this._loading) {
            this._loading.then((function() {
                this._modal.show();
            }).bind(this));
        } else {
            throw new Error('Modal not created!');
        }
    };

    /**
     * Proxy certain methods to the modal component.
     */
    ['activate', 'deactivate'].forEach(function(method) {
        Modal.prototype[method] = function() {
            return; // Not supported on UCP yet.
            if (method === 'show') {
                this.wScrollTop = $(window).scrollTop();
            }
            if (this._modal) {
                this._modal[method]();
            } else if (this._loading) {
                this._loading.then((function() {
                    this._modal[method]();
                }).bind(this));
            } else {
                throw new Error('Modal not created!');
            }
        };
    });

    /**
     * Closes the modal
     */
    Modal.prototype.close = function() {
        if (this._modal) {
            this._modal.close();
        } else {
            throw new Error('Modal not created!');
        }
    };

    /**
     * Closes the modal
     */
    Modal.prototype.hide = Modal.prototype.close;

    // Prepare exports.
    module.Modal = Modal;
    module.ModalButton = ModalButton;
    module._init = init;
    window.dev.modal = module;
    // This must be done before wikia.ui.modal is loaded in chat
    if (typeof $.msg !== 'function') {
        $.msg = function() {
            return mw.message.call(this, arguments).text();
        };
    }
    // Begin initialization.
    mw.loader.using(['oojs-ui-windows']).then(init);
})();