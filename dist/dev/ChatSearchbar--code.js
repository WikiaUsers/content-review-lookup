/** <nowiki>
 * 
 * @module              ChatSearchbar
 * @description         Search bar for FANDOM Chat.
 * @author              M D N S
 * @author              Speedit <speeditwikia@gmail.com>
 * @version             1.3.0
 * @license             CC-BY-SA 3.0
 *  
 */
require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    'use strict';
    // Scoping and double run protection
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.dev || {}).hasOwnProperty('chatsearchbar')
    ) {
        return;
    }
    (window.dev = window.dev || {}).chatsearchbar = {};
    // Script variable.
    var loaded = 0;
    /**
     * Script bootloading.
     * @function        init
     */
    function boot() {
        if (++loaded === 5) {
            window.dev.chatsearchbar = new SearchBar();
        }
    }
    /**
     * Main ChatSearchbar class (API i18n query).
     * @class           SearchBar
     */
    function SearchBar() {
        window.dev.fetch([
            'global-navigation-search-placeholder-inactive',
            'global-navigation-search-placeholder-in-wiki',
            'global-navigation-search-cancel'
        ]).then($.proxy(this.setup, this));
    }
    /**
     * Search bar interface and data setup.
     * @method          setup
     * @this            SearchBar
     */
    SearchBar.prototype.setup = function(i18no) {
        var msg = i18no();
        /**
         * Cache for our I18n messages.
         * @member      {Object} messages
         * @extends     i18n
         */
        this.i18n = {
            'inactive': msg[0],
            'in-wiki':  msg[1]
                .replace(/\$1/, mw.config.get('wgSitename')),
            'cancel':   msg[2],
        };
        /**
         * Main search bar element.
         * @member      {jQuery} $el
         * @extends     view
         */
        this.view.prototype.$el = window.dev.wds.render(new window.dev.chat.Button({
            name: 'ChatSearchbar',
            attr: {
                'class': 'chat-searchbar__search-input-wrapper',
                'id': 'searchInputWrapper',
                'tabindex': '0',
                append: this.ui()
            }
        }).el);
        // Initiate our view controller.
        this.view(this.view.prototype.$el);
    };
    /**
     * 
     */
    /**
     * Search bar view controller.
     * Delegates event handlers and models.
     * @method          ui
     * @this            SearchBar
     */
    SearchBar.prototype.ui = function() {
        return [
            // Search bar label.
            {
                type: 'label',
                classes: [
                    'chat-searchbar__search-label'
                ],
                children: [
                    // Search bar magnifying glass icon.
                    {
                        type: 'div',
                        attr: {
                            id: 'dev-wds-icons-magnifying-glass-tiny',
                        },
                        classes: [
                            'dev-wds-icon',
                            'wds-icon-small',
                            'chat-searchbar__search-label-icon'
                        ]
                    },
                    // Search input field.
                    {
                        type: 'input',
                        attr: {
                            autocomplete: 'off',
                            placeholder: this.i18n.inactive,
                            name: 'query',
                            id: 'searchInput'
                        },
                        data: {
                            'active-placeholder': this.i18n['in-wiki'],
                        },
                        classes: [
                            'chat-searchbar__search-input'
                        ]
                    }
                ]
            },
            // Search bar close button.
            {
                type: 'button',
                attr: {
                    type: 'reset'
                },
                classes: [
                    'wds-button',
                    'wds-is-text',
                    'chat-searchbar__search-close'
                ],
                children: [
                    // Search cross icon.
                    {
                        type: 'div',
                        attr: {
                            id: 'dev-wds-icons-cross-tiny',
                            alt: this.i18n.cancel
                        },
                        classes: [
                            'dev-wds-icon',
                            'wds-icon-small',
                            'chat-searchbar__search-close-icon'
                        ],
                    }
                ]
            },
            // Search bar submit button.
            {
                type: 'button',
                attr: {
                    type: 'submit'
                },
                classes: [
                    'wds-button',
                    'chat-searchbar__search-submit'
                ],
                children: [
                    // Search arrow icon.
                    {
                        type: 'div',
                        attr: {
                            id: 'dev-wds-icons-arrow'
                        },
                        classes: [
                            'dev-wds-icon',
                            'wds-icon-small',
                            'chat-searchbar__search-submit-icon'
                        ]
                    }
                ]
            }
        ].map(window.dev.ui);
    };
    /**
     * Search bar view controller.
     * Delegates event handlers and models.
     * @method          view
     * @this            SearchBar
     */
    SearchBar.prototype.view = function($view) {
        // Generate our models.
        $.extend(this.models, {
            /**
             * Text models to alias/cache.
             * @memberof models
             */
            text: {
                placeholder: this.i18n.inactive,
                active: 'chat-search-is-active'
            },
            /**
             * Input element for view mapping.
             * @memberof models
             */
            $input: $view.find('.chat-searchbar__search-input'),
            /**
             * Submit element for view mapping.
             * @memberof models
             */
            $submit: $view.find('.chat-searchbar__search-submit')
        });
        // Delegate our event handlers.
        $view
            .children('.chat-searchbar__search-label')
            .on('focusin', $.proxy(this.view.activate, this));
        $view
            .on('focus', $.proxy(this.view.activate, this));
        this.models.$input
            .on('input',   $.proxy(this.view.content, this))
            .on('keydown', $.proxy(this.view.escape, this))
            .on('keydown', $.proxy(this.view.enter, this));
        this.models.$submit
            .on('click', $.proxy(this.view.search, this));
        $('.chat-searchbar__search-close')
            .on('click', $.proxy(this.view.deactivate, this));
        // Initiate our event handlers if needed.
        if (this.models.$input.is(':focus')) {
            this.view.activate({ currentTarget: this.models.$input.get(0) });
        }
        if (!this.models.$input.val().length) {
            this.models.$submit.prop('disabled', true);
        }
    };
    /** 
     * Search bar activation controller.
     * @method          activate
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.activate = function(e) {
        if (!$(document.body).hasClass(this.models.text.active)) {
            $(document.body).addClass(this.models.text.active);
            this.models.$input.attr('placeholder', this.models.$input.data('active-placeholder'));
            $(e.currentTarget).click();
        }
    };
    /** 
     * Search bar closure controller.
     * @method          deactivate
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.deactivate = function(e) {
        this.models.$submit.prop('disabled', true);
        $(document.body).removeClass(this.models.text.active);
        this.models.$input.attr('placeholder', this.models.text.placeholder).val('');
    };
    /** 
     * Search input content-based modification controller.
     * @method          content
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.content = function(e) {
        var l = e.currentTarget.value.length;
        if (!!l && this.models.$submit.prop('disabled')) {
            this.models.$submit.prop('disabled', false);
        } else if (!l) {
            this.models.$submit.prop('disabled', true);
        }
    };
    /** 
     * Search input content-based modification controller.
     * @method          search
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.search = function(e) {
        var v = this.models.$input.val();
        if (!v.length) {
            return;
        }
        window.open((new mw.Uri(
            mw.util.wikiGetlink('Special:Search')
        )).extend({
            query: v
        }).getRelativePath());
    };
    /** 
     * Search escape keyboard sequence.
     * @method          escape
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.escape = function(e) {
        if (e.which !== 27) {
            return;
        }
        e.currentTarget.blur();
        $.proxy(this.view.search, deactivate)();
    };
    /** 
     * Search entry keyboard sequence.
     * @method          enter
     * @extends         view
     * @this            window.dev.searchbar
     */
    SearchBar.prototype.view.enter = function(e) {
        if (e.which === 13) {
            $.proxy(this.view.search, this)();
        }
    };
    /** 
     * Search bar node/text models.
     * @member          {Object} models
     */
    SearchBar.prototype.models = {};
    // Import dependencies.
    $.each({
        'chat':  'Chat-js.js',
        'fetch': 'Fetch.js',
        'wds':   'WDSIcons/code.js',
        'ui':    'UI-js/code.js'
    }, function(l, s) {
        // Import scripts.
        if (!window.dev.hasOwnProperty(l)) {
            importArticle({ type: 'script', article: 'u:dev:' + s });
        }
        // Fetch dependencies.
        mw.hook('dev.' + l).add(boot);
    });
    // Style import.
    $(importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ChatSearchbar.css'
    })).load(boot);
});