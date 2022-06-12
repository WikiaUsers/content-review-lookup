/**
 * I18nEdit
 *
 * All-in-one editor for editing i18n files for JavaScript and Lua.
 * Designed with usage on Fandom Developers Wiki in mind, but there is no wiki lock-in put in place.
 *
 * Some things that will be useful when trying to figure out what is going on:
 * - `build*` methods return new Node objects
 * - `render*` methods actually display stuff on the page and perform side effects
 * - `replace*` methods replace sections of the DOM with refreshed elements
 * - `fetch*` methods fetch stuff from the network and usually call back to on* methods for side effects
 * - `on*` methods are called after events and they perform side effects
 * - `get*` methods parse data and return them synchronously for usage in other functions
 * - `set*` methods update the state given some input
 * - `read*` methods parse data and update the state, basically getset
 *
 * @author Dorumin
 * @author KockaAdmiralac
 */
/**
 * An object representing an i18n page
 * @typedef {Object} Page
 * @property {string} title The page full title
 * @property {string} name The script name, stripping MediaWiki:Custom- and /i18n.json from the  full title
 * @property {number?} id The page id, may be missing
 * @property {I18n?} json The page content, may be missing
 * @property {I18n?} draft Draft content of the page that the user is editing
 * @property {Object} filter Statistics about which languages are missing, incomplete or outdated
 * @property {string[]} filter.missing Languages which are missing from the translation (out of currently filtered)
 * @property {string[]} filter.incomplete Languages whose translations aren't complete
 * @property {stirng[]} filter.outdated Languages whose translations are outdated
 * @property {boolean} final Whether the current information about the page is final, fetched from the page itself
 * @property {boolean} nonexistent Whether the page does not actually exist but was rather added through the creator
 */
/**
 * An object representing user's I18nEdit settings.
 * @typedef {Object} Settings
 * @property {string[]} langs Languages that the user prefers to translate into
 */
/**
 * Metadata section of an i18n page.
 * @typedef {Object} Metadata
 * @property {string[]} noTranslate Message codes to not translate
 * @property {Object<string, string[]>} outdated Outdated translations by language
 */
/**
 * The format in which I18n-js stores messages.
 * @typedef {Object<string, (Object<string, string>|Metadata)>} I18n
 * @property {Metadata} _metadata The translation's metadata
 */
/**
 * Wiki global variable cache used by the script.
 * @typedef {Object} WikiGlobals
 * @property {string} wgArticlePath URL path used to access pages
 * @property {string} wgCanonicalSpecialPageName Canonical name of the current special page
 * @property {string} wgPageName Title of the current page
 * @property {string} wgScriptPath URL path to where the script files like api.php are located
 * @property {string} wgSiteName Current wiki name
 * @property {string} wgUserLanguage Language of the current user
 */
(function() {
    'use strict';
    var ui;
    /**
     * Main object of the script.
     * @namespace I18nEdit
     */
    var I18nEdit = {
        /**
         * Keeps state from the current screen. When the screen changes, this state is popped or pushed,
         * so all screen-specific data is kept here.
         * In general, screen-specific state is reset **at the beginning of that screen's rendering**,
         * so it doesn't erroneously carry over to other screens of same type but with different parameters.
         */
        state: {
            /**
             * Name of the script, used in checking the page name.
             * @type {string}
             */
            name: 'I18nEdit',
            /**
             * Languages known by the user, and kept for shortcuts.
             * @type {string[]}
             */
            userLangs: ['en'],
            /**
             * Name of the page for which the translations are currently being changed.
             * @param {string}
             */
            page: '',
            /**
             * Language codes mapped by name.
             * @type {Object<string, string>}
             */
            languageNames: {},
            /**
             * Language names mapped by code. (There is probably a better way to do this.)
             * @type {Object<string, string>}
             */
            codes: {},
            /**
             * Language codes that are being translated to right now (empty if not translating).
             * @type {string[]}
             */
            langs: [],
            /**
             * Language code that is being translated from right now.
             * @type {string}
             */
            from: '',
            /**
             * JavaScript i18n page data.
             * @type {Object<string, Page>}
             */
            i18nPages: {},
            /**
             * JavaScript i18n page list.
             * @type {Page[]}
             */
            i18nPageList: null,
            /**
             * Lua i18n page data.
             * @type {Object<string, Page}
             */
            luaPages: {},
            /**
             * Lua i18n page list.
             * @type {Page[]}
             */
            luaPageList: null,
            /**
             * Selected language to translate from.
             * @type {string}
             */
            selectedLang: '',
            /**
             * Currently selected languages on the language picker screen,
             * moved to state.langs when entering the editor.
             * @type {string[]}
             */
            selectedLangs: [],
            /**
             * Currently selected language to translate from on the language picker screen,
             * moved to state.from when entering the editor.
             */
            selectedFrom: '',
            /**
             * Picker search value to restore when switching screens back.
             * @type {string}
             */
            pickerSearch: '',
            /**
             * Languages filtered by the language picker search.
             * @type {string[]}
             */
            filteredLangs: [],
            /**
             * Translation picker search filter state.
             */
            filter: {
                /**
                 * Which languages is the current search filtered to.
                 * @type {string[]}
                 */
                langs: [],
                /**
                 * Current picker search value.
                 * @type {string}
                 */
                search: '',
                /**
                 * Whether the user is currently typing into a language chip.
                 * @type {boolean}
                 */
                typing: false
            },
            /**
             * Code of the currently selected message in the translator.
             * @type {string}
             */
            selectedMessage: '',
            /**
             * Index of the option that will happen to messages in other languages after changing English translations
             * in the I18nEdit.messageFutureOptions array
             * @type {number}
             */
            selectedMessageFutureOption: 0,
            /**
             * Whether we're currently in a Lua context.
             * @type {boolean}
             */
            lua: false,
            /**
             * JSON translation object which was validated in the creator.
             * @type {I18n}
             */
            newJson: {},
            /**
             * Error that occured and should be displayed instead of the spinner.
             *
             * Currently valid values are:
             * - `nonexistent`: The translation we're accessing does not exist.
             * @type {string}
             */
            error: '',
            /**
             * Whether we are currently in the creator screen.
             * @type {boolean}
             */
            create: false,
            /**
             * Stores the current name of Special:BlankPage.
             * @type {string}
             */
            blankpage: 'Special:BlankPage'
        },
        /**
         * A Lua script to fetch JSON contents of all /i18n subpages in the Module namespace.
         * @type {string}
         * @see I18nEdit.fetchAllLuaPages
         */
        luaFetcher: [
            'local p = {}                                           ',
            'require(\'Dev:No globals\')                            ',
            'function p.main()                                      ',
            '    local frame = mw.getCurrentFrame()                 ',
            '    local list = frame:preprocess(table.concat({       ',
            '        \'{{#dpl:\',                                   ',
            '        \'| namespace = Module\',                      ',
            '        \'| titleregexp = .*\\/i18n$\',                ',
            '        \'| nottitleregexp = ^Sandbox\',               ',
            '        \'| format         = ,%PAGE%{{!}},,\',         ',
            '        \'}}\'                                         ',
            '    }, \'\\n\'))                                       ',
            '    local data = {}                                    ',
            '    for page in mw.text.gsplit(list, \'|\', true) do   ',
            '        if page == \'\' then                           ',
            '            break                                      ',
            '        end                                            ',
            '        data[page] = mw.loadData(page)                 ',
            '    end                                                ',
            '    return mw.text.jsonEncode(data)                    ',
            'end                                                    ',
            'return p                                               '
        ].join('\n'),
        /**
         * Options for what will happen to messages in other languages when a translation is updated.
         * @type {string[]}
         */
        messageFutureOptions: [
            'mark-as-outdated',
            'remove-changed',
            'do-nothing'
        ],
        /**
         * List of languages supported by Fandom. Last updated 2021-07-25.
         * Please note that some languages use different locale file from its code.
         * @type {string[]}
         * @see https://c.fandom.com/wiki/Help:Language_code
         * @see wikimedia/translatewiki b52f4b4 /mw-config/TranslateSettings.php#L161
         */
        whitelist: [
            'ar',
            'bg',
            'ca',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'es',
            'et',
            'fa',
            'fi',
            'fr',
            'he',
            'hi',
            'hr',
            'hu',
            'id',
            'it',
            'ja',
            'ko',
            'ms',
            'nl',
            'no',
            'pl',
            'pt-br',
            'ro',
            'ru',
            // wikimedia/translatewiki b52f4b4 /mw-config/TranslateSettings.php#L198
            // 'sr', // This language code should remain unused. Localise in sr-ec please.
            // These variants exist, but aren't selectable in the language dropdown
            'sr-ec', // For sr
            'sr-el', // For sr
            'sv',
            'th',
            'tl',
            'tr',
            'uk',
            'vi',
            // wikimedia/translatewiki b52f4b4 /mw-config/TranslateSettings.php#L202
            // 'zh', // This language code should remain unused. Localise in zh-hans or zh-hant please.
            'zh-hans', // For zh
            'zh-hant', // For zh, zh-tw, zh-hk
            'zh-hk'
            // 'zh-tw' // This language code should remain unused. Localise in zh-hant please.
        ],
        /**
         * Wiki global variable cache
         * @type {WikiGlobals}
         */
        wg: mw.config.get([
            'wgArticlePath',
            'wgCanonicalSpecialPageName',
            'wgPageName',
            'wgScriptPath',
            'wgSiteName',
            'wgUserLanguage'
        ]),
        /**
         * The set of dependencies yet to be loaded.
         * @type {string[]}
         */
        loading: [
            'i18n',
            'lang',
            'api',
            'wds',
            'settings',
            'dorui',
            'sitelangs',
            'styles',
            'banners'
        ],
        /**
         * Called each time a dependency is loaded.
         *
         * It is an error to call it without a type.
         * @param {string} type A string that identifies which dependency was loaded, included in [this.loading]
         * @param {*} arg Argument passed to be handled by this function
         * @this I18nEdit
         */
        onload: function(type, arg) {
            switch (type) {
                case 'i18n':
                    arg.loadMessages('I18nEdit', {
                        cacheVersion: 2
                    }).then(this.onload.bind(this, 'lang'));
                    break;
                case 'lang':
                    this.i18n = arg;
                    break;
                case 'api':
                    this.api = new mw.Api();
                    this.fetchLanguages();
                    break;
                case 'wds':
                    this.wds = arg;
                    break;
                case 'dorui':
                    ui = arg;
                    break;
                case 'banners':
                    this.BannerNotification = arg;
                    break;
                case 'settings':
                    if (arg.langs) {
                        this.state.userLangs = arg.langs;
                    }
                    break;
                default:
                    break;
            }
            this.loading.splice(this.loading.indexOf(type), 1);
            if (this.loading.length === 0) {
                this.init();
            }
        },
        /**
         * Utility function to chunk an array into smaller arrays with a set size or lower.
         * @param {any[]} arr The array to split up
         * @param {number} size The size of the array slices
         * @returns {any[]} Array of smaller arrays
         */
        chunk: function(arr, size) {
            var final = [];
            var i = 0;
            while (arr.length > i) {
                final.push(arr.slice(i, i += size));
            }
            return final;
        },
        /**
         * Gets the current path from the current state.
         * @todo Extract the path generating code into getPathFromState so we can use these instead of `#` hrefs.
         * @returns {string} Full path name of the current page
         */
        getPath: function() {
            var path = [
                this.state.blankpage,
                this.state.name,
                this.state.lua ? 'Lua' : null,
                this.state.create ? 'create' : null,
                this.state.page ? this.state.page.replace(/ /g, '_') : null,
                this.state.from === 'en' ? null : this.state.from,
                this.state.langs.join('.')
            ].filter(Boolean).join('/');
            this.wg.wgPageName = path;
            return this.wg.wgScriptPath + this.wg.wgArticlePath.replace('$1', path) + location.search + location.hash;
        },
        /**
         * Modifies the state and changes the current path based on the state changes.
         * @param {State} state State changes to perform
         */
        setPath: function(state) {
            var oldPath = this.getPath();
            $.extend(this.state, state);
            var newPath = this.getPath();
            history.pushState(state, null, newPath);
            if (oldPath !== newPath) {
                this.onURLChange();
            }
        },
        /**
         * Reads the current path into the state.
         * @param {string} path The current path
         * @returns {State} The current state
         */
        readPath: function(path) {
            var parts = path.split('/');
            if (parts[0] === '') {
                parts.shift();
            }
            if (parts[0] === 'wiki') {
                parts.shift();
            }
            this.state.blankpage = parts.shift();
            // Discard /I18nEdit
            parts.shift();
            this.state.lua = parts[0] === 'Lua';
            if (this.state.lua) {
                parts.shift();
            }
            this.state.create = parts[0] === 'create';
            if (this.state.create) {
                parts.shift();
            }
            this.state.page = parts.shift();
            if (typeof this.state.page === 'string') {
                this.state.page = decodeURIComponent(this.state.page).replace(/_/g, ' ');
            }
            var from = parts.shift();
            var lang = parts.shift();
            if (!lang) {
                lang = from;
                if (from) {
                    from = 'en';
                }
            }
            if (from) {
                this.state.from = from;
            } else {
                this.state.from = 'en';
            }
            if (lang) {
                this.state.langs = lang.split('.');
            } else {
                this.state.langs = [];
            }
            return this.state;
        },
        /**
         * Sets the user's preferred translation languages.
         * @todo This is unused, but should be used when remembering preferred languages
         * @param {string} langs The new languages
         */
        setUserLangs: function(langs) {
            this.state.userLangs = langs;
            this.saveSettings();
        },
        /**
         * Called whenever the URL changes, updates the UI based on new state.
         */
        onURLChange: function() {
            this.readPath(location.pathname);
            this.buildUI();
            this.scrollToTop();
        },
        /**
         * Scrolls to the top of the document, used when the URL changes.
         */
        scrollToTop: function() {
            document.scrollingElement.scrollTop = 0;
        },
        /**
         * Converts a script or Lua module name into the title where translations for that script or Lua module
         * are stored.
         * @param {string} page Page name to convert into a title
         * @returns {string} Title of the page where the translation currently being edited is stored
         */
        pageToTitle: function(page) {
            if (this.state.lua) {
                return 'Module:' + page + '/i18n';
            }
            return 'MediaWiki:Custom-' + page + '/i18n.json';
        },
        /**
         * Gets the name of the script or Lua module whose translations are currently being looked at.
         * @returns {string?} The page name, or null if not looking at a translation
         */
        getPage: function() {
            return (this.getPages() || {})[this.state.page] || null;
        },
        /**
         * Checks whether the script should run.
         * @returns {boolean} Whether the script should run
         */
        shouldRun: function() {
            if (window.dev && window.dev.I18nEdit && window.dev.I18nEdit.init) {
                // Double-load protection
                return false;
            }
            if (this.wg.wgCanonicalSpecialPageName !== 'Blankpage') {
                // We're not on the right Special page
                return false;
            }
            var subpage = this.wg.wgPageName.split('/')[1];
            if (!subpage || subpage.toLowerCase() !== this.state.name.toLowerCase()) {
                // We're not at the right subpage
                return false;
            }
            return true;
        },
        /**
         * Binds window events required by the script.
         *
         * Currently, only bound event is `popstate`, which lets us know when the user moves through their page
         * history and update the state accordingly.
         */
        bindEvents: function() {
            window.addEventListener('popstate', this.onURLChange.bind(this));
        },
        /**
         * Builds the UI depending on the current state.
         */
        buildUI: function() {
            if (this.state.create) {
                this.renderCreator();
            } else if (this.state.langs && this.state.langs.length) {
                this.renderTranslator();
            } else if (this.state.page) {
                this.renderLanguageList();
            } else {
                this.renderPageListing();
            }
        },
        /**
         * Render method for the translation creator.
         * @route /I18nEdit/create
         */
        renderCreator: function() {
            delete this.state.newJson;
            this.setTitle('creator');
            this.setEditButtons(null);
            this.setBreadcrumbs([
                ui.a({
                    href: '#',
                    text: this.i18n.msg('breadcrumbs-list').plain(),
                    events: {
                        click: function(event) {
                            event.preventDefault();
                            this.setPath({
                                create: false
                            });
                        }.bind(this)
                    }
                }),
                this.i18n.msg('breadcrumbs-label').plain()
            ]);
            this.setContent(
                ui.div({
                    classes: ['I18nEdit-route', 'I18nEdit-creator'],
                    child: this.getPages() ?
                        this.buildCreatorContent() :
                        this.buildSpinner()
                })
            );
            // This is so we can detect duplicates
            if (this.state.lua) {
                this.getAllLuaPages();
            } else {
                this.getAllI18nPages();
            }
        },
        /**
         * Render method for the translation interface.
         * @route /I18nEdit/$page/$lang
         */
        renderTranslator: function() {
            // Reset initial state
            this.state.selectedMessage = '';
            this.state.selectedMessageFutureOption = 0;
            if (this.isEditingEnglish()) {
                this.setTitle('manager');
            } else {
                this.setTitle('translator');
            }
            var page = this.getPage();
            if (page) {
                this.loadCurrentDraft(page);
            }
            this.setEditButtons(null);
            this.setBreadcrumbs([
                ui.a({
                    href: '#',
                    text: this.i18n.msg('breadcrumbs-list').plain(),
                    events: {
                        click: function(event) {
                            event.preventDefault();
                            this.setPath({
                                page: null,
                                langs: [],
                                from: 'en'
                            });
                        }.bind(this)
                    }
                }),
                ui.a({
                    href: '#',
                    text: this.state.page,
                    events: {
                        click: function(event) {
                            event.preventDefault();
                            this.setPath({
                                langs: [],
                                from: 'en'
                            });
                        }.bind(this)
                    }
                }),
                this.i18n.msg('breadcrumbs-label').plain()
            ]);
            this.setContent(
                ui.div({
                    classes: ['I18nEdit-route', 'I18nEdit-translator'],
                    child: page ?
                        this.buildTranslatorContent() :
                        this.buildSpinner()
                })
            );
            if (page) {
                this.selectMessage(this.getMessageList(page)[0]);
            } else if (this.state.lua) {
                this.getCurrentLuaPage();
            } else {
                this.getCurrentPageI18n();
            }
        },
        /**
         * Render method for the language picker.
         * @route /I18nEdit/$page
         */
        renderLanguageList: function() {
            var page = this.getPage();
            // Reset state
            this.state.selectedLangs = [];
            this.state.selectedFrom = 'en';
            this.setTitle('languages');
            this.setBreadcrumbs([
                ui.a({
                    href: '#',
                    text: this.i18n.msg('breadcrumbs-list').plain(),
                    events: {
                        click: function(event) {
                            event.preventDefault();
                            this.setPath({
                                page: null
                            });
                        }.bind(this)
                    }
                }),
                this.i18n.msg('breadcrumbs-label').plain()
            ]);
            this.setEditButtons({
                main: {
                    text: this.i18n.msg('edit').plain(),
                    icon: 'pencil-small',
                    classes: ['wds-is-disabled'],
                    attrs: {
                        href: '#',
                        id: 'language-edit'
                    },
                    events: {
                        click: this.onClickOpenEditor.bind(this)
                    }
                },
                buttons: [
                    {
                        text: this.i18n.msg('manage-messages').plain(),
                        attrs: {
                            href: '#'
                        },
                        events: {
                            click: function(event) {
                                this.setPath({
                                    langs: ['en', 'qqq']
                                });
                                event.preventDefault();
                            }.bind(this)
                        }
                    }
                ]
            });
            this.setContent(
                ui.div({
                    classes: ['I18nEdit-route', 'I18nEdit-languagePicker'],
                    children: [
                        page ?
                            this.buildPickerContent() :
                            this.buildSpinner()
                    ]
                })
            );
            if (!page) {
                if (this.state.lua) {
                    this.getCurrentLuaPage();
                } else {
                    this.getCurrentPageI18n();
                }
            }
        },
        /**
         * Render method for the translation picker.
         * @route /I18nEdit
         */
        renderPageListing: function() {
            this.setTitle('listing');
            this.setBreadcrumbs([
                this.i18n.msg('breadcrumbs-label').plain()
            ]);
            this.setEditButtons({
                main: {
                    text: this.i18n.msg('create').plain(),
                    icon: 'pencil-small',
                    attrs: {
                        href: '#',
                        id: 'translation-create'
                    },
                    events: {
                        click: function(event) {
                            event.preventDefault();
                            this.setPath({
                                create: true
                            });
                        }.bind(this)
                    }
                },
                buttons: [
                    {
                        attrs: {
                            href: '#'
                        },
                        events: {
                            click: this.switchLang.bind(this)
                        },
                        text: this.i18n.msg('switch-to-' + (
                            this.state.lua ?
                                'javascript' :
                                'lua'
                        )).plain()
                    }
                ]
            });
            this.setContent(
                ui.div({
                    classes: ['I18nEdit-route', 'I18nEdit-pageListing'],
                    children: [
                        this.buildPageListingFilter(),
                        this.buildPageListingList()
                    ]
                })
            );
            if (this.state.lua) {
                this.getAllLuaPages();
            } else {
                this.getAllI18nPages();
            }
        },
        /**
         * Builds the contents of the translation creator screen.
         * @returns {Node} Contents of the creator screen
         */
        buildCreatorContent: function() {
            var template = this.pageToTitle('');
            return ui.div({
                classes: ['I18nEdit-route', 'I18nEdit-creator'],
                children: [
                    ui.h2({
                        text: this.i18n.msg('creator-step-1-title').plain()
                    }),
                    ui.div({
                        attrs: {
                            id: 'I18nEdit-creator-titleInput'
                        },
                        classes: ['wds-textarea'],
                        children: [
                            ui.div({
                                classes: ['wds-textarea__field-wrapper'],
                                child: ui.textarea({
                                    attrs: {
                                        id: 'I18nEdit-creator-name',
                                        maxlength: 255 - template.length,
                                        placeholder: this.i18n.msg('creator-step-1-placeholder').plain(),
                                        rows: 1
                                    },
                                    classes: ['wds-textarea__field'],
                                    events: {
                                        input: this.onInputNewTranslationTitle.bind(this)
                                    }
                                })
                            }),
                            ui.span({
                                classes: ['wds-textarea__hint'],
                                children: [
                                    ui.span({
                                        attrs: {
                                            id: 'I18nEdit-creator-createdAt'
                                        },
                                        html: this.i18n.msg('creator-step-1-hint', template).parse()
                                    }),
                                    ' ',
                                    !this.state.lua && ui.span({
                                        html: this.i18n.msg('creator-step-1-javascript-note').parse()
                                    })
                                ]
                            })
                        ]
                    }),
                    ui.h2({
                        text: this.i18n.msg('creator-step-2-title').plain()
                    }),
                    ui.p({
                        html: this.i18n.msg('creator-step-2-description').parse()
                    }),
                    ui.p({
                        children: [
                            ui.textarea({
                                attrs: {
                                    id: 'I18nEdit-creator-json',
                                    rows: 20
                                }
                            }),
                            ui.button({
                                classes: ['wds-button'],
                                events: {
                                    click: this.onClickCheckForErrors.bind(this)
                                },
                                text: this.i18n.msg('check-json').plain()
                            }),
                            ui.ul({
                                attrs: {
                                    id: 'I18nEdit-creator-jsonErrors'
                                }
                            })
                        ]
                    }),
                    ui.h2({
                        text: this.i18n.msg('creator-step-3-title').plain()
                    }),
                    ui.p({
                        text: this.i18n.msg('creator-step-3-description').plain()
                    }),
                    ui.p({
                        child: ui.button({
                            classes: ['wds-button'],
                            events: {
                                click: this.onClickEnterTranslator.bind(this)
                            },
                            text: this.i18n.msg('enter-translator').plain()
                        })
                    })
                ]
            });
        },
        /**
         * Event triggered when the entered new translation title changes in the creator.
         *
         * Also manually triggered upon clicking the button to enter the translator, for validation.
         */
        onInputNewTranslationTitle: function() {
            var page = $('#I18nEdit-creator-name').val();
            if (!page) {
                $('#I18nEdit-creator-titleInput').addClass('wds-has-error');
                $('#I18nEdit-creator-createdAt')
                    .html(this.i18n.msg('translation-must-have-title').parse());
            } else if (this.getPages()[page] && !this.getPages()[page].nonexistent) {
                $('#I18nEdit-creator-titleInput').addClass('wds-has-error');
                $('#I18nEdit-creator-createdAt')
                    .html(this.i18n.msg('translation-exists').parse());
            } else {
                $('#I18nEdit-creator-titleInput').removeClass('wds-has-error');
                $('#I18nEdit-creator-createdAt').html(this.i18n.msg(
                    'creator-step-1-hint',
                    this.pageToTitle(page)
                ).parse());
            }
        },
        /**
         * Reports errors or warnings during validation of entered JSON while creating a new translation.
         * @param {"error"|"warning"} type Type of the status to report
         * @param {string} message Message to report alongside the status
         */
        addCreatorStatus: function(type, message) {
            $('#I18nEdit-creator-jsonErrors').append(ui.li({
                classes: ['I18nEdit-creator-' + type],
                children: [
                    this.wds.icon(type === 'warning' ? 'alert-tiny' : 'close-tiny'),
                    ui.span({
                        text: message
                    })
                ]
            }));
        },
        /* eslint-disable max-statements */
        /* eslint-disable complexity */
        /**
         * Event triggered upon clicking the JSON validation button in the creator.
         */
        onClickCheckForErrors: function() {
            $('#I18nEdit-creator-jsonErrors').empty();
            var json = $('#I18nEdit-creator-json').val().trim();
            if (!json) {
                this.addCreatorStatus('warning', this.i18n.msg('creator-warning-no-json').plain());
                return;
            }
            try {
                this.state.newJson = JSON.parse(json);
            } catch (error) {
                this.addCreatorStatus('error', this.i18n.msg('creator-error-invalid-json', error.message).plain());
                return;
            }
            var obj = this.state.newJson;
            if (!$.isPlainObject(obj)) {
                this.addCreatorStatus('error', this.i18n.msg('creator-error-not-object').plain());
                return;
            }
            if (!$.isPlainObject(obj.en) || $.isEmptyObject(obj.en)) {
                this.addCreatorStatus('error', this.i18n.msg('creator-error-no-en').plain());
                return;
            }
            for (var lang in obj) {
                if (!$.isPlainObject(obj[lang])) {
                    this.addCreatorStatus('error', this.i18n.msg('creator-error-lang-not-object', lang).plain());
                    continue;
                }
                if (lang === '_metadata') {
                    // Metadata should not contain invalid keys
                    for (var key in obj[lang]) {
                        if (key !== 'noTranslate' && key !== 'outdated') {
                            this.addCreatorStatus(
                                'warning',
                                this.i18n.msg('creator-warning-invalid-metadata', key).plain()
                            );
                        } else if (key === 'noTranslate' && !Array.isArray(obj._metadata.noTranslate)) {
                            this.addCreatorStatus(
                                'error',
                                this.i18n.msg('creator-warning-notranslate-not-array').plain()
                            );
                        } else if (key === 'outdated' && !$.isPlainObject(obj._metadata.outdated)) {
                            this.addCreatorStatus(
                                'error',
                                this.i18n.msg('creator-warning-outdated-not-object').plain()
                            );
                        }
                    }
                    continue;
                }
                if (lang !== 'qqq' && !this.state.codes[lang]) {
                    this.addCreatorStatus('error', this.i18n.msg('creator-error-nonexistent-lang', lang).plain());
                    continue;
                }
                if (lang !== 'qqq' && this.whitelist.indexOf(lang) === -1) {
                    this.addCreatorStatus('warning', this.i18n.msg(
                        'creator-warning-unsupported-lang',
                        this.getLanguageFromCode(lang)
                    ).plain());
                }
                for (var msg in obj[lang]) {
                    if (typeof obj[lang][msg] !== 'string') {
                        this.addCreatorStatus('error', this.i18n.msg('creator-error-message-not-string', msg).plain());
                        continue;
                    }
                    if (lang !== 'en') {
                        if (!obj.en[msg]) {
                            this.addCreatorStatus(
                                'warning',
                                this.i18n.msg('creator-warning-no-en-message', msg).plain()
                            );
                        }
                        if (
                            lang !== 'qqq' &&
                            obj._metadata &&
                            Array.isArray(obj._metadata.noTranslate) &&
                            obj._metadata.noTranslate.indexOf(msg) !== -1
                        ) {
                            this.addCreatorStatus(
                                'warning',
                                this.i18n.msg(
                                    'creator-warning-message-translated',
                                    this.getLanguageFromCode(lang),
                                    msg
                                ).plain()
                            );
                        }
                    }
                }
            }
        },
        /* eslint-enable complexity */
        /* eslint-enable max-statements */
        /**
         * Event triggered when the user attempts to enter the translator from the creator.
         */
        onClickEnterTranslator: function() {
            this.onInputNewTranslationTitle();
            this.onClickCheckForErrors();
            var $title = $('#I18nEdit-creator-titleInput');
            var json = $('#I18nEdit-creator-json').val().trim();
            if (
                $title.hasClass('wds-has-error') ||
                json && $('#I18nEdit-creator-jsonErrors li.I18nEdit-creator-error').length > 0
            ) {
                new this.BannerNotification(this.i18n.msg('errors-present').escape(), 'error').show();
                return;
            }
            var page = $title.find('textarea').val();
            this.saveCurrentDraft({
                draft: JSON.parse(json || '{"en": {}, "qqq": {}}'),
                title: this.pageToTitle(page)
            });
            this.setPath({
                create: false,
                langs: ['en', 'qqq'],
                page: page,
                from: 'en'
            });
        },
        /**
         * Triggered when the user clicks the edit button after picking languages to translate to.
         * @param {ClickEvent} event The triggered click event
         */
        onClickOpenEditor: function(event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains('wds-is-disabled')) {
                // User somehow clicked the disabled button
                return;
            }
            this.setPath({
                langs: this.state.selectedLangs,
                from: this.state.selectedFrom
            });
        },
        /**
         * Builds a WDS dropdown.
         * @param {Object} props Options for the dropdown
         * @param {string|Node} props.toggle Contents of the toggle button
         * @param {string} props.id ID of the dropdown
         * @param {Node[]} props.children Dropdown contents, each wrapped in a list element
         * @param {Function} props.click A click event handler for dropdown elements
         * @returns {Node} Newly created WDS dropdown
         */
        buildDropdown: function(props) {
            /** @type props */
            var newProps = $.extend({
                children: []
            }, props);
            var chevron = this.wds.icon('dropdown-tiny');
            chevron.classList.add('wds-dropdown__toggle-chevron');
            return ui.div({
                attrs: newProps.id ? {
                        id: newProps.id
                    } :
                    {},
                classes: ['wds-dropdown'],
                children: [
                    ui.div({
                        classes: ['wds-dropdown__toggle'],
                        children: [
                            newProps.toggle,
                            ' ',
                            chevron
                        ]
                    }),
                    ui.div({
                        classes: {
                            'wds-dropdown__content': true,
                            'wds-is-left-aligned': newProps.alignment === 'left',
                            'wds-is-right-aligned': newProps.alignment === 'right'
                        },
                        child: ui.ul({
                            classes: ['wds-list', 'wds-is-linked'],
                            children: newProps.children.map(function(child, index) {
                                return ui.li({
                                    attrs: {
                                        'data-index': index
                                    },
                                    events: {
                                        click: newProps.click
                                    },
                                    child: child
                                });
                            })
                        })
                    })
                ]
            });
        },
        /**
         * Builds a route Node object for the content in `/I18nEdit/$page`.
         * @returns {Node} The built node
         */
        buildPickerContent: function() {
            var page = this.getPage();
            var lang = this.getFirstValidLanguage(page);
            if (!lang) {
                return ui.div({
                    classes: ['I18nEdit-pickerContent', 'I18nEdit-pickerError'],
                    child: ui.div({
                        classes: ['I18n-pickerErrorMessage'],
                        html: this.i18n.msg('picker-error-empty', page.name).parse()
                    })
                });
            }
            return ui.div({
                classes: ['I18nEdit-pickerContent'],
                children: [
                    ui.div({
                        classes: ['I18nEdit-pickerTranslatingFrom', 'I18nEdit-pickerColumn'],
                        children: [
                            ui.div({
                                classes: ['I18nEdit-pickerFromHint'],
                                text: this.i18n.msg('translate-from').plain()
                            }),
                            this.buildPickerFrom(page, lang)
                        ]
                    }),
                    ui.div({
                        classes: ['I18nEdit-pickerTranslateTo', 'I18nEdit-pickerColumn'],
                        children: [
                            ui.div({
                                classes: ['I18nEdit-pickerToHint'],
                                text: this.i18n.msg('translate-to').plain()
                            }),
                            ui.div({
                                classes: ['I18nEdit-pickerToSearch'],
                                children: [
                                    this.buildPickerSearch()
                                ]
                            }),
                            ui.div({
                                classes: ['I18nEdit-pickerToContainer'],
                                children: this.buildPickerLanguages({
                                    page: page,
                                    click: this.onClickChangeTo,
                                    lang: lang
                                })
                            })
                        ]
                    })
                ]
            });
        },
        /**
         * Builds the dropdown for selecting a language to translate from.
         * @param {Page} page Translation whose languages are being picked
         * @param {string} firstValidLang Language code of the first valid language to translate
         * @returns {Node} The built node
         */
        buildPickerFrom: function(page, firstValidLang) {
            var completeLangs = Object.keys(page.json).filter(function(lang) {
                return lang === 'en' ||
                       // You can't translate from message descriptions or metadata
                       this.notSpecialKey(lang) &&
                       // You can't translate from a language with no translations
                       !$.isEmptyObject(page.json[lang]) &&
                       // You can't translate from a language with missing translations
                       !this.isTranslationIncomplete(page.json[lang], page.json.en, page.json._metadata) &&
                       // You can't translate from a language with outdated translations
                       (!page.json._metadata || !page.json._metadata.outdated || !page.json._metadata.outdated[lang]);
            }, this).sort(this.sortLanguages.bind(this, page));
            if (completeLangs.length === 0) {
                return ui.span({
                    html: this.i18n.msg('error-no-complete-langs').parse()
                });
            }
            this.state.selectedFrom = completeLangs.indexOf(firstValidLang) === -1 ?
                'en' :
                firstValidLang;
            completeLangs.splice(completeLangs.indexOf(this.state.selectedFrom), 1);
            return ui.div({
                classes: ['I18nEdit-pickerElement', 'I18nEdit-hoverableListElement'],
                children: [
                    completeLangs.length === 0 ?
                        this.getLanguageFromCode(this.state.selectedFrom) :
                        this.buildDropdown({
                            toggle: this.getLanguageFromCode(this.state.selectedFrom),
                            id: 'I18nEdit-picker-fromDropdown',
                            alignment: 'left',
                            click: this.onClickChangeFrom.bind(this, page),
                            children: completeLangs.map(function(lang) {
                                return ui.a({
                                    attrs: {
                                        'data-lang': lang,
                                        'href': '#'
                                    },
                                    text: this.getLanguageFromCode(lang)
                                });
                            }, this)
                        })
                ]
            });
        },
        /**
         * Gets the first language you can translate from, using state.from, fallbacking to en, then to the first prop.
         * @param {Page} page The i18n page object with a json property
         * @returns {string?} The first language you can translate from
         */
        getFirstValidLanguage: function(page) {
            var obj = page.json;
            if (Object.prototype.hasOwnProperty.call(obj, this.state.selectedFrom)) {
                return this.state.selectedFrom;
            }
            for (var i in this.state.userLangs) {
                var lang = this.state.userLangs[i];
                if (Object.prototype.hasOwnProperty.call(obj, lang)) {
                    return lang;
                }
            }
            if (Object.prototype.hasOwnProperty.call(obj, 'en')) {
                return 'en';
            }
            return null;
        },
        /**
         * Event handler for changing the language to translate from.
         * @param {Page} page The page whose languages are currently being picked
         * @param {ClickEvent} event The click event
         */
        onClickChangeFrom: function(page, event) {
            event.preventDefault();
            this.state.selectedFrom = $(event.currentTarget).find('a').attr('data-lang');
            $('#I18nEdit-picker-fromDropdown')
                .parent()
                .replaceWith(this.buildPickerFrom(page, this.state.selectedFrom));
            this.replacePickerLanguages();
        },
        /**
         * Builds a Node object for a language element on either side of an i18n picker.
         * @param {Object} options The options to build the list
         * @param {Page} options.page The page being handled
         * @param {String} options.lang The language being translated from, passed to [click]
         * @param {Function} options.click The function called when an element is called
         * @returns {Node[]} An array of valid picker element nodes
         */
        buildPickerLanguages: function(options) {
            var children = [];
            var page = options.page;
            var from = options.lang;
            var click = options.click;
            var langs = this.removeDuplicates(
                this.state.filteredLangs
                    .concat(this.state.selectedLangs, this.state.userLangs, Object.keys(page.json))
                    .sort(this.sortLanguages.bind(this, page))
            );
            for (var i in langs) {
                var lang = langs[i];
                var data = page.json[lang];
                if (lang !== from && this.notSpecialKey(lang) && lang !== 'en') {
                    children.push(
                        this.buildPickerElement({
                            click: click.bind(this, lang),
                            lang: lang,
                            data: data,
                            en: page.json.en,
                            metadata: page.json._metadata
                        })
                    );
                }
            }
            return children;
        },
        /**
         * Replaces the language picker after filtered languages have changed.
         */
        replacePickerLanguages: function() {
            var lang = this.getFirstValidLanguage(this.getPage());
            $('.I18nEdit-pickerToContainer').empty().append(
                ui.frag(
                    this.buildPickerLanguages({
                        page: this.getPage(),
                        click: this.onClickChangeTo,
                        lang: lang
                    })
                )
            );
        },
        /**
         * Sorts the languages rendered in the picker's right column
         * Goes from userLangs, to selectedLangs
         * @param {Page} page Page object
         * @param {string} a First language
         * @param {string} b Second language
         * @returns {number} Comparison result
         */
        sortLanguages: function(page, a, b) {
            var langs = Object.keys(page.json).sort(this.alphabeticalSort);
            return this.includeCompare(this.state.filteredLangs, a, b) ||
                   this.includeCompare(this.state.userLangs, a, b) ||
                   this.includeCompare(langs, a, b) ||
                   this.includeCompare(this.state.selectedLangs, a, b);
        },
        /**
         * Sorts strings alphabetically
         * @param {string} a First string
         * @param {string} b Second string
         * @returns {number} Comparison result
         */
        alphabeticalSort: function(a, b) {
            return b.localeCompare(a);
        },
        /**
         * Compares two elements based on whether they are included in a specified array.
         * @param {any[]} array Array based on which the elements should be compared
         * @param {*} a First element to find
         * @param {*} b Second element to find
         * @returns {number} Comparison result
         */
        includeCompare: function(array, a, b) {
            var ia = array.indexOf(a);
            var ib = array.indexOf(b);
            if (ia !== -1) {
                if (ib !== -1) {
                    return 0;
                }
                return -1;
            }
            if (ib !== -1) {
                if (ia !== -1) {
                    return 0;
                }
                return 1;
            }
            return 0;
        },
        /**
         * Removes duplicate entries from an array.
         * @param {string[]} array Array to be filtered
         * @returns {string[]} Filtered array
         */
        removeDuplicates: function(array) {
            var seen = {};
            return array.filter(function(item) {
                if (seen[item]) {
                    return false;
                }
                seen[item] = true;
                return true;
            });
        },
        /**
         * Event handler for changing the languages to translate to.
         * @param {string} code The language code to translate to
         * @param {ClickEvent} event The click event
         * @sideeffects
         */
        onClickChangeTo: function(code, event) {
            var index = this.state.selectedLangs.indexOf(code);
            if (index === -1) {
                this.state.selectedLangs.push(code);
                this.state.selectedLangs.sort();
                event.currentTarget.classList.add('I18nEdit-selectedListElement');
            } else {
                this.state.selectedLangs.splice(index, 1);
                event.currentTarget.classList.remove('I18nEdit-selectedListElement');
            }
            if (this.state.selectedLangs.length) {
                $('#language-edit').removeClass('wds-is-disabled');
            } else {
                $('#language-edit').addClass('wds-is-disabled');
            }
        },
        /**
         * Builds a language element on either side of an i18n picker.
         * @param {Options} options The options for the element
         * @returns {Node} The built node
         */
        buildPickerElement: function(options) {
            var lang = options.lang;
            var data = options.data;
            var en = options.en;
            var missing = !data;
            var metadata = options.metadata;
            var incomplete = !missing && en && this.isTranslationIncomplete(data, en, metadata);
            var outdated = !missing && metadata && metadata.outdated &&
                           metadata.outdated[lang] &&
                           metadata.outdated[lang].length > 0;
            var flags = $.map({
                missing: missing,
                incomplete: incomplete,
                outdated: outdated
            }, function(v, k) {
                return v && this.i18n.msg(k).plain();
            }.bind(this)).filter(Boolean).join(', ');
            return ui.div({
                classes: {
                    'I18nEdit-pickerElement': true,
                    'I18nEdit-hoverableListElement': true,
                    'I18nEdit-selectedListElement': this.state.selectedLangs.indexOf(lang) !== -1
                },
                attrs: {
                    'data-lang': lang
                },
                events: {
                    click: options.click
                },
                children: [
                    ui.span({
                        classes: ['I18nEdit-pickerElementSpan'],
                        text: this.getLanguageFromCode(lang)
                    }),
                    flags && ui.span({
                        classes: ['I18nEdit-details'],
                        text: ' (' + flags + ')'
                    })
                ]
            });
        },
        /**
         * Builds the search input on top of the language list to translate to.
         * @returns {Node} The built node
         */
        buildPickerSearch: function() {
            return ui.input({
                classes: ['I18nEdit-input', 'I18nEdit-pickerSearch'],
                props: {
                    value: this.state.pickerSearch
                },
                events: {
                    input: this.onPickerSearchChange.bind(this)
                },
                attrs: {
                    placeholder: this.i18n.msg('picker-search-placeholder').plain()
                }
            });
        },
        /**
         * Event handler for the input event, which fires when the picker search changes.
         * @param {Event} event The input event
         * @sideeffects
         */
        onPickerSearchChange: function(event) {
            this.state.pickerSearch = event.currentTarget.value;
            var query = this.state.pickerSearch.toLowerCase();
            this.state.filteredLangs = query.trim() ?
                Object.keys(this.state.codes).filter(function(code) {
                    return this.whitelist.indexOf(code) !== -1 && (
                        code.toLowerCase().indexOf(query) !== -1 ||
                        this.state.codes[code].toLowerCase().indexOf(query) !== -1
                    );
                }, this) :
                [];
            this.replacePickerLanguages();
        },
        /**
         * Builds the translation filter for the translation listing page.
         * @todo Perist filters
         * @todo Use WDS pills instead of our custom ones
         * @returns {Node} The built node
         */
        buildPageListingFilter: function() {
            return ui.fieldset({
                classes: ['I18nEdit-listingFilter'],
                children: [
                    ui.legend({
                        text: this.i18n.msg('search-filter-legend').plain()
                    }),
                    ui.input({
                        classes: ['I18nEdit-listingFilterTitleInput', 'I18nEdit-input'],
                        attrs: {
                            type: 'search'
                        },
                        props: {
                            value: this.state.filter.search
                        },
                        events: {
                            input: this.filterListingSearch.bind(this)
                        }
                    }),
                    ui.div({
                        classes: ['I18nEdit-listingFilterLanguages'],
                        children: [
                            ui.frag(this.state.filter.langs.map(this.buildFilterChip.bind(this))),
                            this.state.filter.typing ?
                            ui.span({
                                classes: ['I18nEdit-listingFilterLanguageChip', 'I18nEdit-listingFilterAddingLanguage'],
                                children: [
                                    ui.input({
                                        classes: ['I18nEdit-listingFilterAddingLanguageInput']
                                    })
                                ]
                            }) :
                            ui.span({
                                classes: ['I18nEdit-listingFilterLanguageChip', 'I18nEdit-listingFilterAddLanguage'],
                                text: this.i18n.msg('add-language').plain(),
                                events: {
                                    click: function() {
                                        this.state.filter.typing = true;
                                        this.replaceListingFilter();
                                    }.bind(this)
                                }
                            })
                        ]
                    })
                ]
            });
        },
        /**
         * Event triggered when switching between JavaScript and Lua translations on the translation listing page.
         * @param {ClickEvent} event The click event arguments
         */
        switchLang: function(event) {
            event.preventDefault();
            this.setPath({
                lua: !this.state.lua
            });
        },
        /**
         * Gets a language name from its code based on state.codes.
         * @param {string} code The ISO 639-1 language code to get the name of
         * @returns {string} Language name, or the corresponding i18n message for it grabbed from I18nEdit translations
         */
        getLanguageFromCode: function(code) {
            return this.state.codes[code] || this.i18n.msg('lang-' + code).plain();
        },
        /**
         * Gets a language code from its name based on state.languageNames.
         * @param {string} name The language name to get the code of
         * @returns {string?} Language code, or `null`
         */
        getCodeFromLanguage: function(name) {
            return this.state.languageNames[name] || null;
        },
        /**
         * Builds a chip for the translations listing page filter.
         * @todo Use WDS pills
         * @param {string} lang The language for which the chip is being built
         * @returns {Node} The built node
         */
        buildFilterChip: function(lang) {
            return ui.span({
                classes: ['I18nEdit-listingFilterLanguageChip'],
                events: {
                    click: this.onRemoveLangFilter.bind(this, lang)
                },
                children: [
                    ui.span({
                        classes: ['I18nEdit-listingFilterChipLabel'],
                        text: this.getLanguageFromCode(lang)
                    }),
                    ui.span({
                        classes: ['I18nEdit-listingFilterChipClose']
                    })
                ]
            });
        },
        /**
         * Builds the page list on the translation listing page.
         * @returns {Node} The built node
         */
        buildPageListingList: function() {
            return ui.div({
                classes: ['I18nEdit-pageListingList'],
                children: this.getPageList() ?
                    this.getPageList()
                        .filter(this.filterElementList.bind(this))
                        .map(this.buildListingElement.bind(this)) :
                    this.buildSpinner()
            });
        },
        /**
         * Builds an element of the translation listing list.
         * @param {Page} page The page the element is being built for
         * @returns {Node} The built node
         */
        buildListingElement: function(page) {
            return ui.div({
                classes: ['I18nEdit-listingElement', 'I18nEdit-hoverableListElement'],
                attrs: {
                    'data-title': page.title
                },
                events: {
                    click: this.onElementClick.bind(this, page)
                },
                children: [
                    ui.span({
                        classes: ['I18nEdit-elementTitle'],
                        text: page.name
                    }),
                    page.json && ui.span({
                        classes: ['I18nEdit-elementLanguages', 'I18nEdit-details'],
                        text: this.getLanguageText(page)
                    })
                ]
            });
        },
        /**
         * Build the text that appears after each page name on the translation listing page, about whether the
         * translation is missing, incomplete or outdated.
         * @param {Page} page The page the text is being built for
         * @returns {string} Text appearing after the page name of the translation listing
         */
        getLanguageText: function(page) {
            if (!page.json) {
                return '';
            }
            if (
                page.filter && (
                    page.filter.missing.length ||
                    page.filter.incomplete.length ||
                    page.filter.outdated.length
                )
            ) {
                var flags = [];
                page.filter.missing.forEach(function(code) {
                    flags.push(this.i18n.msg('lang-missing', this.getLanguageFromCode(code)).parse());
                }, this);
                page.filter.incomplete.forEach(function(code) {
                    flags.push(this.i18n.msg('lang-incomplete', this.getLanguageFromCode(code)).parse());
                }, this);
                page.filter.outdated.forEach(function(code) {
                    flags.push(this.i18n.msg('lang-outdated', this.getLanguageFromCode(code)).parse());
                }, this);
                return ' (' + flags.join(', ') + ')';
            }
            return ' (' + this.i18n.msg(
                'language-count',
                Object.keys(page.json)
                    .filter(this.notSpecialKey.bind(this)).length
            ).parse() + ')';
        },
        /**
         * Determines whether a given key corresponds to a language, and isn't used for internal translator purposes.
         * @param {string} key Translation object key
         * @returns {boolean} Whether the key corresponds to a language
         */
        notSpecialKey: function(key) {
            return key !== 'qqq' && key !== '_metadata';
        },
        /**
         * Builds a spinner that shows up while resources required for the script to work are being loaded.
         * @returns {Node} The built node
         */
        buildSpinner: function() {
            if (this.state.error) {
                return ui.frag([
                    ui.div({
                        text: this.i18n.msg('error-' + this.state.error).plain()
                    }),
                    ui.button({
                        classes: ['wds-button'],
                        events: {
                            click: function() {
                                this.setPath({
                                    langs: [],
                                    from: 'en',
                                    create: true,
                                    page: null
                                });
                            }.bind(this)
                        },
                        text: this.i18n.msg('switch-to-creator').plain()
                    })
                ]);
            }
            return ui.div({
                child: ui.svg({
                    'class': 'wds-spinner wds-spinner__block',
                    'width': '78',
                    'height': '78',
                    'viewBox': '0 0 78 78',
                    'xmlns': 'http://www.w3.org/2000/svg',
                    'child': ui.g({
                        transform: 'translate(39, 39)',
                        child: ui.circle({
                            'class': 'wds-spinner__stroke',
                            'fill': 'none',
                            'stroke-width': '',
                            'stroke-dasharray': '238.76104167282426',
                            'stroke-dashoffset': '238.76104167282426',
                            'stroke-linecap': 'round',
                            'r': '38'
                        })
                    })
                })
            });
        },
        /**
         * Event triggered when a translation is selected from the translation picker.
         * @param {Page} page Page that was clicked
         */
        onElementClick: function(page) {
            this.setPath({
                page: page.name
            });
        },
        /**
         * Re-focuses and re-hooks the page filter on the translations listing after it has been replaced.
         * @todo Use WDS dropdowns
         */
        onStartLangTyping: function() {
            var input = document.querySelector('.I18nEdit-listingFilterAddingLanguageInput');
            var autocomplete;
            input.focus();
            var onSelect = function(match) {
                autocomplete.disconnect();
                this.state.filter.typing = false;
                var code = match.code;
                if (this.getLanguageFromCode(code) && this.state.filter.langs.indexOf(code) === -1) {
                    this.state.filter.langs.push(code);
                }
                this.replaceListingFilter();
                this.replaceListingList();
            }.bind(this);
            autocomplete = this.addAutocomplete({
                input: input,
                limit: 6,
                state: Object.keys(this.state.codes)
                    .filter(function(code) {
                        return this.whitelist.indexOf(code) !== -1;
                    }, this)
                    .map(function(code) {
                        var language = this.state.codes[code];
                        return {
                            code: code,
                            language: language,
                            lowerLang: language.toLowerCase()
                        };
                    }, this),
                findMatches: function(state, query, done) {
                    if (query.trim() === '') {
                        done([]);
                        return;
                    }
                    var lowerQuery = query.trim().toLowerCase();
                    var matches = state.filter(function(entry) {
                        return entry.lowerLang.includes(lowerQuery);
                    });
                    if (Object.prototype.hasOwnProperty.call(this.state.codes, lowerQuery)) {
                        matches = matches.filter(function(entry) {
                            return entry.code !== lowerQuery;
                        });
                        matches.unshift({
                            code: lowerQuery,
                            language: this.state.codes[lowerQuery],
                            exact: true
                        });
                    }
                    done(matches);
                }.bind(this),
                onSelect: onSelect,
                buildList: function(matches) {
                    if (input.value.trim() === '') {
                        return null;
                    }
                    if (matches === null) {
                        return null;
                    }
                    var bounds = input.getBoundingClientRect();
                    if (matches.length === 0) {
                        // ¯\_(ツ)_/¯
                        return ui.div({
                            classes: ['I18nEdit-autocomplete'],
                            style: {
                                left: bounds.left + scrollX + 'px',
                                top: bounds.top + bounds.height + scrollY + 'px'
                            },
                            text: '¯\\_(ツ)_/¯'
                        });
                    }
                    return ui.div({
                        classes: ['I18nEdit-autocomplete'],
                        style: {
                            left: bounds.left + scrollX + 'px',
                            top: bounds.top + bounds.height + scrollY + 'px'
                        },
                        children: matches.map(function(match) {
                            return ui.div({
                                classes: ['selectable'],
                                title: match.code,
                                events: {
                                    click: function() {
                                        onSelect(match);
                                    }
                                },
                                children: [
                                    match.language + ' (' + match.code + ')',
                                    match.exact && ui.div({
                                        classes: ['I18nEdit-exact-match'],
                                        text: I18nEdit.i18n.msg('exact-match').plain()
                                    })
                                ]
                            });
                        })
                    });
                }
            });
        },
        addAutocomplete: function(args) {
            var input = args.input;
            var state = args.state;
            var limit = args.limit;
            var findMatches = args.findMatches;
            var onSelect = args.onSelect;
            var buildList = args.buildList;
            var list;
            var matches;
            var selectables;
            var selectedIndex = -1;
            var onInput = function() {
                var value = input.value;
                findMatches(state, value, function(_matches) {
                    // Early return if input has changed since
                    if (value !== input.value) {
                        return;
                    }
                    // Copy to outer scope
                    matches = _matches;
                    if (matches.length > limit) {
                        matches = matches.slice(0, limit);
                    }
                    if (list) {
                        list.remove();
                    }
                    list = buildList(matches, input);
                    if (!list) {
                        return;
                    }
                    selectables = list.querySelectorAll('.selectable');
                    if (selectedIndex !== -1) {
                        var selected = selectables[selectedIndex];
                        if (selected) {
                            selected.classList.add('selected');
                        }
                    }
                    document.body.appendChild(list);
                });
            };
            onInput();
            input.addEventListener('input', onInput);
            var onKeyDown = function(event) {
                // Navigate results
                switch (event.key) {
                    case 'Enter':
                        if (selectedIndex !== -1) {
                            onSelect(matches[selectedIndex]);
                        }
                        break;
                    case 'ArrowUp':
                        if (selectedIndex > -1) {
                            selectables[selectedIndex].classList.remove('selected');
                            selectedIndex--;
                            if (selectedIndex !== -1) {
                                selectables[selectedIndex].classList.add('selected');
                            }
                        }
                        break;
                    case 'ArrowDown':
                        if (selectedIndex < selectables.length - 1) {
                            if (selectedIndex !== -1) {
                                selectables[selectedIndex].classList.remove('selected');
                            }
                            selectedIndex++;
                            selectables[selectedIndex].classList.add('selected');
                        }
                        break;
                    default:
                        break;
                }
            };
            input.addEventListener('keydown', onKeyDown);
            var autocomplete = {
                disconnect: function() {
                    input.removeEventListener('input', onInput);
                    input.removeEventListener('keydown', onKeyDown);
                    if (list) {
                        list.remove();
                    }
                }
            };
            return autocomplete;
        },
        /**
         * Event triggered when a language is removed from the filters on the translation listing.
         * @param {string} lang Language code that was removed
         */
        onRemoveLangFilter: function(lang) {
            this.state.filter.langs.splice(this.state.filter.langs.indexOf(lang), 1);
            this.replaceListingFilter();
            this.replaceListingList();
        },
        /**
         * Replaces the translation listing filter.
         */
        replaceListingFilter: function() {
            $('.I18nEdit-listingFilter').replaceWith(this.buildPageListingFilter());
            if (this.state.filter.typing) {
                this.onStartLangTyping();
            }
        },
        /**
         * Checks whether a translation is incomplete, meaning that all messages that should be translated,
         * are translated.
         * @param {Object<string, string>} lang Translations of the given language
         * @param {Object<string, string>} en English translations
         * @param {Metadata} metadata Translation metadata
         * @returns {boolean} Whether the translation is incomplete
         */
        isTranslationIncomplete: function(lang, en, metadata) {
            return !Object.keys(en).filter(function(key) {
                return !metadata || !metadata.noTranslate || metadata.noTranslate.indexOf(key) === -1;
            }).every(function(key) {
                return Boolean(lang[key]);
            });
        },
        /**
         * Filters the list of translations upon changing the filters.
         *
         * If languages are set, it will filter to only incomplete, missing and outdated translations,
         * and if they are not it will only filter by specified name.
         * @param {Page} page Page currently being filtered
         * @returns {boolean} Whether the page should be filtered
         */
        filterElementList: function(page) {
            if (this.state.filter.search) {
                var lcs = this.state.filter.search.toLowerCase();
                if (page.name.toLowerCase().indexOf(lcs) === -1) {
                    return false;
                }
            }
            page.filter = {
                missing: [],
                incomplete: [],
                outdated: []
            };
            if (this.state.filter.langs.length && page.json) {
                var found = false;
                var i = this.state.filter.langs.length;
                while (i--) {
                    var code = this.state.filter.langs[i];
                    var metadata = page.json._metadata;
                    if (Object.prototype.hasOwnProperty.call(page.json, code)) {
                        if (this.isTranslationIncomplete(page.json[code], page.json.en, metadata)) {
                            page.filter.incomplete.push(code);
                            found = true;
                        }
                        if (
                            metadata && metadata.outdated &&
                            metadata.outdated[code] &&
                            metadata.outdated[code].length > 0
                        ) {
                            page.filter.outdated.push(code);
                            found = true;
                        }
                    } else {
                        page.filter.missing.push(code);
                        found = true;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        },
        /**
         * Event triggered upon changing the filter by name on the translations listing page.
         * @param {InputEvent} event Input event arguments
         */
        filterListingSearch: function(event) {
            this.state.filter.search = event.target.value;
            this.replaceListingList();
        },
        /**
         * Replaces the current translations list after changing the filters.
         */
        replaceListingList: function() {
            $('.I18nEdit-pageListingList').replaceWith(this.buildPageListingList());
        },
        /**
         * Builds the content for the translator screen.
         * @returns {Node} The built node
         */
        buildTranslatorContent: function() {
            var page = this.getPage();
            return ui.frag([
                this.isEditingEnglish() && ui.div({
                    html: this.i18n.msg('warning-manage').parse()
                }),
                ui.div({
                    attrs: {
                        id: 'I18nEdit-translator'
                    },
                    children: [
                        this.buildMessageList(page),
                        this.buildTranslationPane(page)
                    ]
                })
            ]);
        },
        /**
         * Gets the text that should appear in the translator message list, which is either the text in the language
         * that is being translated from, or English.
         * @param {Page} page Page whose message is being operated on
         * @param {string} code Message code of the message
         * @returns {string} Text that should appear in the translator message list
         */
        getMessageListTextForMessage: function(page, code) {
            return this.isEditingEnglish() ?
                ((page.draft || {}).en || {})[code] || page.json.en[code] || '' :
                (page.json[this.state.from] || {})[code] || page.json.en[code] || '';
        },
        /**
         * List of messages to display in the translator message list.
         * @param {Page} page Page for which the message list is being created
         * @returns {string[]} List of messages to display
         */
        getMessageList: function(page) {
            var englishDraft = (page.draft || {}).en;
            // Original messages + added messages
            var messageList = $.extend({}, page.json.en, englishDraft);
            // -removed messages
            for (var message in englishDraft) {
                if (englishDraft[message] === null) {
                    delete messageList[message];
                }
            }
            if (!this.isEditingEnglish()) {
                // -messages to not translate
                var noTranslate = page.draft && page.draft._metadata && page.draft._metadata.noTranslate ||
                                  page.json._metadata && page.json._metadata.noTranslate ||
                                  [];
                noTranslate.forEach(function(messageCode) {
                    delete messageList[messageCode];
                });
            }
            return Object.keys(messageList);
        },
        /**
         * Builds the left page of the translator interface, the message list.
         * @param {Page} page Page for which the message list is being built
         * @returns {Node} The built node
         */
        buildMessageList: function(page) {
            var messageManagement = this.isEditingEnglish();
            var messages = this.getMessageList(page);
            return ui.div({
                attrs: {
                    id: 'I18nEdit-translator-messageList'
                },
                children: $.isEmptyObject(messages) ?
                    [
                        ui.div({
                            attrs: {
                                id: 'I18nEdit-translator-emptyList'
                            },
                            children: [
                                ui.p({
                                    text: this.i18n.msg(
                                        messageManagement ?
                                            'no-messages-english' :
                                            'no-messages-other'
                                    ).plain()
                                }),
                                messageManagement ?
                                    ui.button({
                                        classes: ['wds-button'],
                                        events: {
                                            click: this.onClickAddMessage.bind(this, this.getPage())
                                        },
                                        text: this.i18n.msg('add-message').plain()
                                    }) :
                                    ui.button({
                                        classes: ['wds-button'],
                                        events: {
                                            click: function() {
                                                this.setPath({
                                                    langs: ['en']
                                                });
                                            }.bind(this)
                                        }
                                    })
                            ]
                        })
                    ] :
                    messages.map(function(code) {
                        return ui.div({
                            attrs: {
                                'data-code': code
                            },
                            classes: ['I18nEdit-messageElement', 'I18nEdit-hoverableListElement'],
                            events: {
                                click: this.selectMessage.bind(this, code)
                            },
                            children: [
                                this.buildTranslationIndicator(page, code),
                                ui.span({
                                    attrs: {
                                        title: code
                                    },
                                    text: this.getMessageListTextForMessage(page, code)
                                })
                            ]
                        });
                    }, this)
            });
        },
        /**
         * Builds an indicator icon of whether a translation is missing, outdated or done.
         * @param {Page} page Page for which the messages are being changed
         * @param {string} code Message for which the indicator is being built
         * @returns {Node} The built node
         */
        buildTranslationIndicator: function(page, code) {
            var done = this.state.langs.every(function(lang) {
                return page.json[lang] && page.json[lang][code] ||
                       page.draft && page.draft[lang] && page.draft[lang][code];
            });
            var outdated = this.state.langs.some(function(lang) {
                return page.json._metadata && page.json._metadata.outdated &&
                       page.json._metadata.outdated[lang] &&
                       page.json._metadata.outdated[lang].indexOf(code) !== -1 &&
                       (
                           !page.draft ||
                           !page.draft[lang] ||
                           !page.draft[lang][code]
                       );
            });
            return window.dev.wds.icon(
                outdated ?
                    'clock-tiny' :
                    done ?
                        'checkmark-tiny' :
                        'close-tiny'
            );
        },
        /**
         * Builds the right pane of the translator, the translation interface and the toolbar.
         * @param {Page} page Page for which the messages are being changed
         * @returns {Node} The built node
         */
        buildTranslationPane: function(page) {
            var code = this.state.selectedMessage;
            var messageManagement = this.isEditingEnglish();
            var noTranslate = page.draft && page.draft._metadata &&
                              page.draft._metadata.noTranslate &&
                              page.draft._metadata.noTranslate.indexOf(code) !== -1;
            var messages = this.getMessageList(page);
            var nextMessage = messages.indexOf(code) + 1;
            return ui.div({
                attrs: {
                    id: 'I18nEdit-translator-rightPane'
                },
                children: [
                    ui.div({
                        attrs: {
                            id: 'I18nEdit-translator-editor'
                        },
                        children: code ? [
                            ui.div({
                                attrs: {
                                    id: 'I18nEdit-translator-context'
                                },
                                children: [
                                    ui.div({
                                        attrs: {
                                            id: 'I18nEdit-translator-original'
                                        },
                                        child: messageManagement ?
                                            ui.code({
                                                text: code
                                            }) :
                                            ui.span({
                                                text: (page.json[this.state.from] || {})[code] || page.json.en[code]
                                            })
                                    }),
                                    page.json.qqq && page.json.qqq[code] && ui.div({
                                        attrs: {
                                            id: 'I18nEdit-translator-description'
                                        },
                                        text: page.json.qqq[code]
                                    })
                                ]
                            }),
                            ui.frag(
                                this.state.langs.map(
                                    this.buildTranslationArea.bind(this, page, code)
                                )
                            )
                        ] : []
                    }),
                    ui.div({
                        attrs: {
                            id: 'I18nEdit-translator-toolbar'
                        },
                        children: [
                            ui.button({
                                classes: ['wds-button'],
                                events: {
                                    click: this.onClickSaveTranslations.bind(this, page)
                                },
                                text: this.i18n.msg('save').plain()
                            }),
                            ui.button({
                                classes: {
                                    'wds-button': true,
                                    'wds-is-secondary': true,
                                    'wds-is-disabled': nextMessage === messages.length
                                },
                                events: {
                                    click: this.onClickNextMessage.bind(this, messages[nextMessage])
                                },
                                text: this.i18n.msg('next').plain()
                            }),
                            ui.button({
                                attrs: {
                                    id: 'I18nEdit-translator-discard'
                                },
                                classes: {
                                    'wds-button': true,
                                    'wds-is-secondary': true,
                                    'wds-is-disabled': $.isEmptyObject(page.draft)
                                },
                                events: {
                                    click: this.onClickDiscardTranslations.bind(this, page)
                                },
                                text: this.i18n.msg('discard').plain()
                            }),
                            messageManagement && ui.button({
                                classes: ['wds-button', 'wds-is-secondary'],
                                events: {
                                    click: this.onClickAddMessage.bind(this, page)
                                },
                                text: this.i18n.msg('add-message').plain()
                            }),
                            messageManagement && ui.button({
                                classes: ['wds-button', 'wds-is-secondary'],
                                events: {
                                    click: this.onClickRemoveMessage.bind(this, page)
                                },
                                text: this.i18n.msg('remove-message').plain()
                            }),
                            messageManagement && this.buildDropdown({
                                toggle: ui.span({
                                    attrs: {
                                        id: 'I18nEdit-translator-messageFutureSelected'
                                    },
                                    text: this.i18n.msg(
                                        this.messageFutureOptions[this.state.selectedMessageFutureOption]
                                    ).plain()
                                }),
                                click: this.onClickMessageFutureOption.bind(this),
                                children: this.messageFutureOptions.map(function(option) {
                                    return ui.a({
                                        attrs: {
                                            href: '#'
                                        },
                                        text: this.i18n.msg(option).plain()
                                    });
                                }, this)
                            }),
                            messageManagement && ui.input({
                                classes: ['wds-toggle__input'],
                                attrs: {
                                    id: 'I18nEdit-translator-outdated',
                                    name: 'I18nEdit-translator-outdated',
                                    type: 'checkbox'
                                },
                                events: {
                                    change: this.onChangeNoTranslate.bind(this, page, code)
                                },
                                props: {
                                    checked: typeof noTranslate === 'boolean' ?
                                                 noTranslate :
                                                 page.json._metadata && page.json._metadata.noTranslate &&
                                                 page.json._metadata.noTranslate.indexOf(code) !== -1
                                }
                            }),
                            messageManagement && ui.label({
                                classes: ['wds-toggle__label'],
                                attrs: {
                                    'for': 'I18nEdit-translator-outdated'
                                },
                                text: this.i18n.msg('no-translate').plain()
                            })
                        ]
                    })
                ]
            });
        },
        /**
         * Event triggered when the button for saving translations is clicked.
         * @param {Page} page Page for which the translations are being changed
         */
        onClickSaveTranslations: function(page) {
            var editSummary;
            var defaultSummary = this.i18n
                .inContentLang()
                .msg(this.isEditingEnglish() ? 'summary-manager' : 'summary-translator', this.state.langs.join(', '))
                .plain();
            OO.ui.prompt(this.i18n.msg('prompt-summary').plain(), {
                textInput: {
                    placeholder: defaultSummary
                }
            }).then(function(summary) {
                if (summary === null) {
                    return null;
                }
                editSummary = summary || defaultSummary;
                delete page.json;
                // Re-fetch content before applying our changes
                if (this.state.lua) {
                    return this.fetchAllLuaPages();
                }
                return this.getPageJSON(page.title);
            }.bind(this)).then(function(data) {
                if (data === null) {
                    return null;
                }
                if (this.state.lua) {
                    page.json = JSON.parse(data.return)[page.title];
                } else if (data) {
                    page.json = JSON.parse(data);
                }
                if (!page.json) {
                    // We created this translation from the creator so it does not have a page.
                    page.json = {
                        en: {},
                        qqq: {}
                    };
                }
                this.applyMessageFutureChanges(page);
                this.applyMessageChanges(page);
                return this.saveTranslation(page, editSummary);
            }.bind(this)).then(function(data) {
                if (data === null) {
                    return null;
                }
                page.draft = {};
                page.nonexistent = false;
                this.saveCurrentDraft(page);
                this.setPath({
                    langs: [],
                    from: 'en'
                });
                new this.BannerNotification(this.i18n.msg('success').escape(), 'confirm').show();
            }.bind(this));
        },
        /**
         * Applies changes to changed messages in other languages as specified by the user before saving,
         * with either marking them as outdated, removing them or doing nothing about them.
         * @param {Page} page Page for which the messages are being changed
         */
        applyMessageFutureChanges: function(page) {
            var option = this.state.selectedMessageFutureOption;
            if (!this.isEditingEnglish() || !page.draft.en || option === 2) {
                return;
            }
            for (var lang in page.json) {
                if (this.state.langs.indexOf(lang) !== -1 || !this.notSpecialKey(lang)) {
                    continue;
                }
                for (var code in page.draft.en) {
                    if (option === 0) {
                        // Mark outdated
                        if (!page.json[lang][code]) {
                            // There is no message to mark as outdated
                            continue;
                        }
                        page.json._metadata = page.json._metadata || {};
                        page.json._metadata.outdated = page.json._metadata.outdated || {};
                        page.json._metadata.outdated[lang] = page.json._metadata.outdated[lang] || [];
                        if (page.json._metadata.outdated[lang].indexOf(code) === -1) {
                            page.json._metadata.outdated[lang].push(code);
                        }
                    } else {
                        // Remove message
                        delete page.json[lang][code];
                    }
                }
            }
        },
        /**
         * Applies changes from the draft into the full translation object.
         * @param {Page} page Page for which the messages are being changed
         */
        applyMessageChanges: function(page) {
            for (var lang in page.draft) {
                if (lang === '_metadata') {
                    this.applyMetadataChanges(page);
                    continue;
                }
                page.json[lang] = page.json[lang] || {};
                for (var code in page.draft[lang]) {
                    if (page.draft[lang][code] === null) {
                        if (page.json[lang][code]) {
                            // We removed a message
                            delete page.json[lang][code];
                        }
                    } else {
                        page.json[lang][code] = page.draft[lang][code];
                    }
                    var metadata = page.json._metadata;
                    if (!metadata || !metadata.outdated || !metadata.outdated[lang]) {
                        continue;
                    }
                    // There are outdated messages
                    var index = metadata.outdated[lang].indexOf(code);
                    if (index === -1) {
                        continue;
                    }
                    // The update message is one of them, remove it
                    metadata.outdated[lang].splice(index, 1);
                    if (metadata.outdated[lang].length > 0) {
                        continue;
                    }
                    // There are no more outdated messages in that language
                    delete metadata.outdated[lang];
                    if (!$.isEmptyObject(metadata.outdated)) {
                        continue;
                    }
                    // There are no more outdated messages in any language
                    delete metadata.outdated;
                    if (!$.isEmptyObject(metadata)) {
                        continue;
                    }
                    // There is no more metadata
                    delete page.json._metadata;
                }
            }
        },
        /**
         * Applies changes to metadata upon saving.
         * @param {Page} page Page for which the translations are being changed
         */
        applyMetadataChanges: function(page) {
            if (page.draft._metadata.noTranslate instanceof Array) {
                page.json._metadata = page.json._metadata || {};
                page.json._metadata.noTranslate = page.draft._metadata.noTranslate;
            }
        },
        /**
         * Makes the edit to translations.
         * @param {Page} page Page for which the translations are being changed
         * @param {string} summary Summary to use while editing
         * @returns {$.Deferred<object>} A promise to wait on for API response
         */
        saveTranslation: function(page, summary) {
            var sorted = this.sortObjectKeys(page.json);
            var content = this.state.lua ?
                '-- <nowiki>\nreturn ' + this.formatJSONIntoLua(sorted) :
                JSON.stringify(sorted);
            return this.api.postWithToken('csrf', {
                action: 'edit',
                title: page.title,
                text: content,
                summary: '[I18nEdit] ' + summary
            }).fail(this.onGenericAPIError.bind(this));
        },
        /**
         * Sorts keys in a translation object and puts metadata, English and descriptions on the top.
         * @param {I18n} obj Object whose keys should be sorted
         * @returns {I18n} Object with sorted keys
         */
        sortObjectKeys: function(obj) {
            var messages = {};
            var specials = {
                _metadata: 1,
                en: 2,
                qqq: 3
            };
            Object.keys(obj).sort(function(a, b) {
                if (specials[a] && specials[b]) {
                    return specials[a] - specials[b];
                } else if (specials[a]) {
                    return -1;
                } else if (specials[b]) {
                    return 1;
                }
                return a.localeCompare(b);
            }).forEach(function(key) {
                messages[key] = obj[key];
            });
            return messages;
        },
        /**
         * Event triggered when the user clicks on the "Discard" button in the translator.
         * @param {Page} page Page for which the translations are being changed
         * @param {ClickEvent} event Click event arguments
         */
        onClickDiscardTranslations: function(page, event) {
            if (event.currentTarget.classList.contains('wds-is-disabled')) {
                return;
            }
            OO.ui.confirm(this.i18n.msg('confirm-discard').plain()).done(function(confirmed) {
                if (confirmed) {
                    page.draft = {};
                    var currentMessages = this.getMessageList(page);
                    this.replaceTranslationPane(page);
                    this.replaceMessageList(page);
                    if (currentMessages.indexOf(this.state.selectedMessage) === -1) {
                        this.selectMessage(currentMessages[0]);
                    } else {
                        this.selectMessage(this.state.selectedMessage);
                    }
                    this.saveCurrentDraft(page);
                }
            }.bind(this));
        },
        /**
         * Event triggered when the user clicks on the "Next" button in the translator.
         * @param {string} nextMessage Message to switch to
         * @param {ClickEvent} event Click event arguments
         */
        onClickNextMessage: function(nextMessage, event) {
            if (event.currentTarget.classList.contains('wds-is-disabled')) {
                return;
            }
            this.selectMessage(nextMessage);
        },
        /**
         * Event triggered when the user clicks on the "Add message" button in the translator.
         * @param {Page} page Page for which the translations are being changed
         */
        onClickAddMessage: function(page) {
            OO.ui.prompt(this.i18n.msg('enter-message-code').plain(), {
                textInput: {
                    // Does not need to be translated (the code should be written in English).
                    placeholder: 'new-message-code'
                }
            }).done(function(code) {
                if (!code) {
                    return;
                }
                page.draft = page.draft || {};
                page.draft.en = page.draft.en || {};
                if (typeof page.draft.en[code] === 'string' || typeof page.json.en[code] === 'string') {
                    new this.BannerNotification(this.i18n.msg('code-already-added').escape(), 'error').show();
                } else {
                    page.draft.en[code] = '';
                    this.replaceMessageList(page);
                    this.selectMessage(code);
                    this.saveCurrentDraft(page);
                }
            }.bind(this));
        },
        /**
         * Event triggered when the user clicks on the "Remove message" button in the translator.
         * @param {Page} page Page for which the translations are being changed
         */
        onClickRemoveMessage: function(page) {
            OO.ui.confirm(this.i18n.msg('confirm-remove').plain()).done(function(confirmed) {
                if (confirmed) {
                    for (var lang in page.json) {
                        page.draft = page.draft || {};
                        page.draft[lang] = page.draft[lang] || {};
                        page.draft[lang][this.state.selectedMessage] = null;
                    }
                    this.replaceMessageList(page);
                    this.selectMessage(this.getMessageList(page)[0]);
                    this.saveCurrentDraft(page);
                }
            }.bind(this));
        },
        /**
         * Event triggered when the user changes what will happen to changed messages in other languages.
         * @param {ClickEvent} event Click event arguments
         */
        onClickMessageFutureOption: function(event) {
            event.preventDefault();
            var index = Number($(event.currentTarget).attr('data-index'));
            this.state.selectedMessageFutureOption = index;
            $('#I18nEdit-translator-messageFutureSelected')
                .text(this.i18n.msg(this.messageFutureOptions[index]).plain());
        },
        /**
         * Event triggered when the user changes the checkbox for whether a message should be translatable.
         * @param {Page} page Page for which the translations are being changed
         * @param {string} code Message code of the message whose translation status is being changed
         * @param {ClickEvent} event Click event arguments
         */
        onChangeNoTranslate: function(page, code, event) {
            page.draft = page.draft || {};
            page.draft._metadata = page.draft._metadata || {};
            page.draft._metadata.noTranslate = page.draft._metadata.noTranslate ||
                                               (page.json._metadata || {}).noTranslate ||
                                               [];
            var index = page.draft._metadata.noTranslate.indexOf(code);
            if (event.target.checked) {
                if (index === -1) {
                    page.draft._metadata.noTranslate.push(code);
                }
            } else if (index !== -1) {
                page.draft._metadata.noTranslate.splice(index, 1);
            }
            $('#I18nEdit-translator-discard').removeClass('wds-is-disabled');
        },
        /**
         * Returns a string from a page's working draft, falling back to grabbing from the JSON, or an empty string
         * @param {Page} page The page for which translations are being changed
         * @param {string} lang The languae code
         * @param {string} code The message code
         * @returns {string} The message string
         */
        getWorkingString: function(page, lang, code) {
            if (page.draft && page.draft[lang] && page.draft[lang][code]) {
                return page.draft[lang][code];
            }
            if (page.json && page.json[lang] && page.json[lang][code]) {
                return page.json[lang][code];
            }
            return '';
        },
        /**
         * Builds a collapsible section of the right pane with a text area for inputting translations.
         * @param {Page} page The page for which translations are being changed
         * @param {string} code Code of the currently selected message
         * @param {string} lang Code of the language that is being translated to
         * @returns {Node} The built node
         */
        buildTranslationArea: function(page, code, lang) {
            return ui.div({
                classes: ['wds-collapsible-panel'],
                children: [
                    ui.header({
                        classes: ['wds-collapsible-panel__header'],
                        children: [
                            this.getLanguageFromCode(lang),
                            this.wds.icon('menu-control-small')
                        ]
                    }),
                    ui.div({
                        classes: ['wds-collapsible-panel__content'],
                        child: ui.textarea({
                            classes: ['I18nEdit-translator-textarea'],
                            props: {
                                value: this.getWorkingString(page, lang, code)
                            },
                            events: {
                                blur: function() {
                                    this.saveCurrentDraft(page);
                                    $('.I18nEdit-messageElement.I18nEdit-selectedListElement svg')
                                        .replaceWith(this.buildTranslationIndicator(page, code));
                                    $('.I18nEdit-messageElement.I18nEdit-selectedListElement span')
                                        .text(this.getMessageListTextForMessage(page, code));
                                }.bind(this),
                                input: function(event) {
                                    page.draft = page.draft || {};
                                    page.draft[lang] = page.draft[lang] || {};
                                    page.draft[lang][code] = event.target.value;
                                    $('#I18nEdit-translator-discard').removeClass('wds-is-disabled');
                                }
                            }
                        })
                    })
                ]
            });
        },
        /**
         * Rebuilds the translator message list after state of these messages has changed.
         * @param {Page} page Page for which the translations are being changed
         */
        replaceMessageList: function(page) {
            $('#I18nEdit-translator-messageList')
                .replaceWith(this.buildMessageList(page));
        },
        /**
         * Rebuilds the right pane of the translator after changing the currently selected message.
         * @param {Page} page Page for which the translations are being changed
         */
        replaceTranslationPane: function(page) {
            var collapseStates = $('#I18nEdit-translator-editor .wds-collapsible-panel').map(function(_, el) {
                return $(el).hasClass('wds-is-collapsed');
            }).toArray();
            $('#I18nEdit-translator-rightPane').replaceWith(this.buildTranslationPane(page));
            $('#I18nEdit-translator-editor .wds-collapsible-panel').each(function(i, el) {
                if (collapseStates[i]) {
                    $(el).addClass('wds-is-collapsed');
                }
            });
        },
        /**
         * Selects a specified message in the left sidebar of the translator.
         * @param {string} key Code of the message being selected
         */
        selectMessage: function(key) {
            this.state.selectedMessage = key;
            this.replaceTranslationPane(this.getPage());
            if (!key) {
                // There are no messages at this point.
                $('#I18nEdit-translator-emptyList .wds-button').focus();
                return;
            }
            $('.I18nEdit-messageElement.I18nEdit-selectedListElement').removeClass('I18nEdit-selectedListElement');
            $('.I18nEdit-messageElement[data-code="' + key + '"]').addClass('I18nEdit-selectedListElement');
            $('#I18nEdit-translator-editor textarea').first().focus();
        },
        /**
         * Loads the draft translations of the current page from localStorage.
         * @param {Page} page Page for which the translations are being changed
         */
        loadCurrentDraft: function(page) {
            /** @type {Object<string, I18n>} */
            var drafts = JSON.parse(localStorage.getItem('I18nEdit-drafts') || '{}');
            page.draft = drafts[page.title] || {};
        },
        /**
         * Saves the draft translations of the current page to localStorage.
         * @param {Page} page Page for which the translations are being changed
         */
        saveCurrentDraft: function(page) {
            /** @type {Object<string, I18n>} */
            var drafts = JSON.parse(localStorage.getItem('I18nEdit-drafts') || '{}');
            if ($.isEmptyObject(page.draft)) {
                delete drafts[page.title];
            } else {
                drafts[page.title] = page.draft;
            }
            localStorage.setItem('I18nEdit-drafts', JSON.stringify(drafts));
        },
        /**
         * Sets breadcrumbs for the current page in the page subtitle.
         * @param {Node[]} crumbs Nodes to separate with "|" in the subtitle
         */
        setBreadcrumbs: function(crumbs) {
            var subtitle = document.querySelector('.page-header__page-subtitle');
            if (subtitle === null) {
                return;
            }
            subtitle.innerHTML = '';
            if (crumbs.length > 1) {
                // <&nbsp;
                subtitle.appendChild(
                    document.createTextNode('<\xa0')
                );
            }
            for (var i = 0; i < crumbs.length; i++) {
                subtitle.appendChild(
                    ui.frag([
                        crumbs[i]
                    ])
                );
                if (i !== crumbs.length - 1) {
                    subtitle.appendChild(
                        document.createTextNode('\xa0|\xa0')
                    );
                }
            }
        },
        /**
         * Continues making API calls after the MediaWiki API returns parameters for continuation.
         * @param {Object} params Parameters of the API call
         * @param {Object} query Results of the API call so far
         * @returns {$.Deferred<Object>} Promise to wait on for API response
         */
        listAll: function(params, query) {
            $.extend(params, {
                action: 'query'
            });
            return this.api.get(params).then(function(result) {
                var key;
                if (query) {
                    for (key in query) {
                        result.query[key] = (result.query[key] || []).concat(query[key]);
                    }
                }
                if (result['query-continue']) {
                    for (key in result['query-continue']) {
                        $.extend(params, result['query-continue'][key]);
                    }
                    return this.listAll(params, result.query);
                }
                return result;
            }.bind(this)).fail(this.onGenericAPIError.bind(this));
        },
        /**
         * Fetches JSON from a I18n-js-compliant MediaWiki page.
         * @param {boolean} force Whether to forcibly fetch the translations
         * @returns {$.Deferred} Promise to listen on for when everything is done
         */
        getCurrentPageI18n: function(force) {
            if (this.state.error) {
                // This is a hack...
                delete this.state.error;
                return;
            }
            var name = this.state.page;
            var page = this.state.i18nPages[name];
            if (page && page.final && !force) {
                return;
            }
            return this.getPageJSON(this.pageToTitle(this.state.page))
                .then(this.onLoadedPageJson.bind(this, this.state.page));
        },
        /**
         * Callback after fetching a single page's JSON that parses it and rebuilds the UI.
         * @param {string} name Name of the page whose JSON was being fetched
         * @param {string} str JSON of the fetched page
         */
        onLoadedPageJson: function(name, str) {
            var json;
            if (str) {
                json = JSON.parse(str);
            } else {
                // We're switching from the creator to the translator, so the JSON is in the draft.
                var page = {
                    title: this.pageToTitle(this.state.page)
                };
                this.loadCurrentDraft(page);
                if (!$.isEmptyObject(page.draft)) {
                    json = page.draft;
                }
            }
            if (json) {
                this.state.i18nPages[name] = {
                    'nonexistent': !str,
                    'json': json,
                    'name': name,
                    'ns': 8,
                    'title': this.pageToTitle(name),
                    'final': true
                };
            } else {
                this.state.error = 'notfound';
            }
            this.buildUI();
        },
        /**
         * Fetches all I18n-js-compliant MediaWiki JSON pages.
         * @returns {$.Deferred} Promise to listen on for when everything is done
         */
        getAllI18nPages: function() {
            if (this.state.i18nPageList) {
                return;
            }
            return this.listAll({
                list: 'allpages',
                apnamespace: 8,
                apprefix: 'Custom-',
                aplimit: 'max'
            })
                .then(this.mapWithContent.bind(this))
                .then(this.onLoadedI18n.bind(this));
        },
        /**
         * Fetches translations from all /i18n Module subpages on the wiki in JSON form.
         *
         * FishTank, please don't kill me for this.
         * @returns {$.Deferred<Object>} Promise to listen on for MediaWiki API response
         */
        fetchAllLuaPages: function() {
            return this.api.get({
                action: 'scribunto-console',
                question: '=p.main()',
                title: 'Module:I18nEdit',
                content: this.luaFetcher
            }).then(function(data) {
                var pages = JSON.parse(data.return);
                for (var title in pages) {
                    var page = pages[title];
                    for (var lang in page) {
                        // Handle mw.text.jsonEncode limitation of empty tables.
                        // Ensure language entries are always objects.
                        if (Array.isArray(page[lang])) {
                            page[lang] = {};
                        }
                    }
                }
                data.return = JSON.stringify(pages);
                return data;
            }).fail(this.onGenericAPIError.bind(this));
        },
        /**
         * Same as getAllLuaPages, but reports when we're trying to fetch a nonexistent translation.
         * @returns {$.Deferred} Promise to listen on for when everything is finished
         */
        getCurrentLuaPage: function() {
            if (this.state.error) {
                // This is a hack...
                delete this.state.error;
                return;
            }
            if (this.state.luaPageList) {
                this.state.error = 'notfound';
                this.buildUI();
                return;
            }
            return this.getAllLuaPages();
        },
        /**
         * Fetches all Lua i18n pages and updates the state.
         * @returns {$.Deferred} Promise to listen on for when everything is finished
         */
        getAllLuaPages: function() {
            if (this.state.luaPageList) {
                return;
            }
            return this.fetchAllLuaPages()
                .then(this.onLoadedLua.bind(this));
        },
        /**
         * Fetches I18n-js-compliant translations from a specified page.
         * @param {string} title Title of the page from which JSON should be fetched
         * @returns {$.Deferred<Object>} Promise to listen on for MediaWiki API response
         */
        getPageJSON: function(title) {
            return this.api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: title
            }).then(function(data) {
                var pages = data.query.pages;
                for (var id in pages) {
                    var revs = pages[id].revisions;
                    return Array.isArray(revs) && revs.length > 0 && revs[0]['*'];
                }
            }).fail(this.onGenericAPIError.bind(this));
        },
        /**
         * Callback after fetching all Lua module translations, updates the state and rebuilds the UI.
         * @param {Object} data MediaWiki API response
         */
        onLoadedLua: function(data) {
            var pages = JSON.parse(data.return);
            this.state.luaPages = {};
            for (var title in pages) {
                var name = title.replace(/^Module:(.*)\/i18n$/, '$1');
                this.state.luaPages[name] = {
                    'json': pages[title],
                    'name': name,
                    'ns': 828,
                    'title': title,
                    'final': true
                };
            }
            this.state.luaPageList = Object.values(this.state.luaPages);
            this.buildUI();
        },
        /**
         * Gets the list of translations of JavaScript or Lua pages, depending on which ones are being looked at.
         * @returns {I18n[]} Relevant list of translation page contents
         */
        getPageList: function() {
            return this.state.lua ?
                this.state.luaPageList :
                this.state.i18nPageList;
        },
        /**
         * Gets a map of translations of JavaScript or Lua pages, depending on which ones are being looked at.
         * @returns {Object<string, I18n>} Relevant mapping of translation page contents
         */
        getPages: function() {
            return this.state.lua ?
                this.state.luaPages :
                this.state.i18nPages;
        },
        /**
         * Get JSON content of specified pages.
         * @param {string[]} titles Pages to fetch
         * @returns {$.Deferred} Promise that resolves when everthing is fetched
         */
        getJsonContent: function(titles) {
            var chunks = this.chunk(titles, 50);
            return $.when.apply(this,
                chunks.map(function(chunk) {
                    return this.api.get({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        titles: chunk.join('|')
                    }).then(function(data) {
                        return data.query.pages;
                    }).fail(this.onGenericAPIError.bind(this));
                }.bind(this))
            );
        },
        /**
         * Maps fetched content into Page objects.
         * @param {Object} query MediaWiki API response
         * @returns {Page[]} All fetched pages, with content
         */
        mapWithContent: function(query) {
            var allpages = query.query.allpages.filter(function(page) {
                return page.title.slice(-10) === '/i18n.json';
            });
            var titles = allpages.map(function(page) {
                return page.title;
            });
            this.onLoadedI18n(allpages);
            return this.getJsonContent(titles).then(function() {
                var pageChunks = Array.from(arguments);
                var indices = {};
                var page;
                for (var i in allpages) {
                    page = allpages[i];
                    indices[page.title] = i;
                }
                for (var chunkIndex in pageChunks) {
                    var chunk = pageChunks[chunkIndex];
                    for (var pageIndex in chunk) {
                        page = chunk[pageIndex];
                        var json = page.revisions[0]['*'];
                        var index = indices[page.title];
                        try {
                            allpages[index].json = JSON.parse(json);
                        } catch (error) {
                            new this.BannerNotification(
                                this.i18n.msg('json-parse-error', page.title, error.message).escape(),
                                'error'
                            ).show();
                        }
                    }
                }
                return allpages;
            }.bind(this));
        },
        /**
         * Callback after fetching all I18n-js-compliant MediaWiki pages, updates the state and rebuilds the UI.
         * @param {Page[]} allpages All fetched pages, with content
         */
        onLoadedI18n: function(allpages) {
            this.state.i18nPageList = allpages
                .filter(function(page) {
                    return page.title.slice(-10) === '/i18n.json';
                })
                .map(function(page) {
                    page.name = page.title.slice(17, -10);
                    return page;
                });
            this.state.i18nPageList.forEach(function(page) {
                this.state.i18nPages[page.name] = page;
            }, this);
            if (this.state.create) {
                this.buildUI();
            } else {
                this.replaceListingList();
            }
        },
        /**
         * Replaces the edit buttons in the page header.
         * @todo Use buildDropdown here
         * @param {Object} buttons Buttons to set
         * @param {Object} buttons.main Main button configuration
         * @param {Object} buttons.main.text Text on the main button
         * @param {Object<string, any>} buttons.main.attrs Additional attributes of the main button
         * @param {string[]} buttons.main.classes Additional classes to apply to the main button
         * @param {Object<string, Function>} buttons.main.events Events to be handled for the main button
         * @param {Node} buttons.main.icon Optional icon for the main button
         * @param {Object[]} buttons.buttons Buttons in the dropdown, to be passed to Dorui
         */
        setEditButtons: function(buttons) {
            var $wrapper = $('.page-header__actions');
            $wrapper.empty();
            if (buttons) {
                buttons.main = buttons.main || {};
                buttons.buttons = buttons.buttons || [];
                var main = buttons.main.text && ui.a({
                    attrs: buttons.main.attrs,
                    classes: ['wds-button'].concat(buttons.main.classes || []),
                    events: buttons.main.events,
                    children: [
                        buttons.main.icon && this.wds.icon(buttons.main.icon),
                        ui.span({
                            text: buttons.main.text
                        })
                    ]
                });
                $wrapper.append(ui.div({
                    classes: ['wds-button-group', 'I18nEdit-editButtonMock'],
                    children: [
                        main,
                        buttons.buttons.length && ui.div({
                            classes: ['wds-dropdown'],
                            children: [
                                ui.div({
                                    classes: ['wds-button', 'wds-dropdown__toggle'],
                                    children: [
                                        this.wds.icon('dropdown-tiny')
                                    ]
                                }),
                                ui.div({
                                    classes: ['wds-dropdown__content', 'wds-is-not-scrollable', 'wds-is-right-aligned'],
                                    child: ui.ul({
                                        classes: ['wds-list', 'wds-is-linked'],
                                        children: buttons.buttons.map(this.buildDropdownButton.bind(this))
                                    })
                                })
                            ]
                        })
                    ]
                }));
            }
        },
        /**
         * Builds an edit dropdown button.
         * @param {Object} button Button object to be passed to Dorui
         * @returns {Node} The built node
         */
        buildDropdownButton: function(button) {
            return ui.li({
                classes: ['I18nEdit-dropdownButton'],
                children: [
                    ui.a(button)
                ]
            });
        },
        /**
         * Replaces the content of the page.
         * @param {Node} content Node to replace the content with
         */
        setContent: function(content) {
            $('#mw-content-text').empty().append(content);
        },
        /**
         * Checks whether the user is currently managing messages (editing the English translations).
         * @returns {boolean} Whether the user is currently managing messages
         */
        isEditingEnglish: function() {
            return this.state.langs.indexOf('en') !== -1;
        },
        /**
         * Indents a text by a specified string.
         * @param {string} text Text to indent
         * @param {string} indentation Text to prepend to each line
         * @returns {string} Indented text
         */
        indent: function(text, indentation) {
            return text.split('\n').map(function(line) {
                return indentation + line;
            }).join('\n');
        },
        /**
         * Formats a given JavaScript data type into a Lua table.
         *
         * Does not support formatting `undefined`, symbols, BigInts and functions.
         * @param {Object} data Data to format into a Lua table
         * @returns {string} Formatted Lua table
         */
        formatJSONIntoLua: function(data) {
            switch (typeof data) {
                case 'boolean':
                case 'number':
                case 'string':
                    return JSON.stringify(data);
                case 'object':
                    var isArray = Array.isArray(data);
                    return '{\n' + this.indent(
                        Object.keys(data).map(function(key) {
                            if (isArray) {
                                return this.formatJSONIntoLua(data[key]);
                            }
                            return '[' + JSON.stringify(key) + '] = ' + this.formatJSONIntoLua(data[key]);
                        }, this).join(',\n'),
                        '    '
                    ) + '\n}';
                default:
                    throw new TypeError('Unserializable data type.');
            }
        },
        /**
         * Sets the title of the page when changing pages.
         * @param {string} msg I18n message to use when setting the title
         */
        setTitle: function(msg) {
            var langList = (this.state.langs || [])
                .map(this.getLanguageFromCode, this)
                .join(', ');
            var langFrom = this.getLanguageFromCode(this.state.from);
            var title = this.i18n.msg(msg + '-title', this.state.page, langFrom, langList).plain();
            $('#firstHeading').text(this.i18n.msg('page-title', title).plain());
            document.title = this.i18n.msg('document-title', title, this.wg.wgSiteName).plain();
        },
        /**
         * Fetches languages that exist on Fandom (includes some unsupported languages).
         */
        fetchLanguages: function() {
            this.api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'languages',
                siinlanguagecode: this.wg.wgUserLanguage
            })
                .then(this.onLoadedLanguages.bind(this))
                .fail(this.onGenericAPIError.bind(this));
        },
        /**
         * Callback after fetching language names.
         * @param {Object} query MediaWiki API response
         */
        onLoadedLanguages: function(query) {
            query.query.languages.forEach(function(el) {
                this.state.languageNames[el['*']] = el.code;
                this.state.codes[el.code] = el['*'];
            }, this);
            this.onload('sitelangs');
        },
        /**
         * Initializes the script after dependencies have loaded.
         */
        init: function() {
            this.readPath(location.pathname);
            this.bindEvents();
            this.buildUI();
        },
        /**
         * Abstract settings loading, even though its completely sync right now.
         * @returns {$.Deferred<Settings>} Promise to listen on for when the settings have loaded
         */
        loadSettings: function() {
            /** @type {string[]} */
            var langs = JSON.parse(localStorage.getItem('I18nEdit-langs'));
            return $.Deferred().resolve({
                langs: langs
            });
        },
        /**
         * Abstract saving settings, same as for loadSettings.
         * @returns {$.Deferred<boolean>} Promise to listen on when the settings were saved
         */
        saveSettings: function() {
            localStorage.setItem('I18nEdit-langs', JSON.stringify(this.state.userLangs));
            return $.Deferred().resolve(true);
        },
        /**
         * Starts importing necessary resources for the script to function.
         */
        importResources: function() {
            mw.hook('doru.ui').add(this.onload.bind(this, 'dorui'));
            mw.hook('dev.wds').add(this.onload.bind(this, 'wds'));
            mw.hook('dev.i18n').add(this.onload.bind(this, 'i18n'));
            mw.hook('dev.banners').add(this.onload.bind(this, 'banners'));
            mw.loader.using([
                'mediawiki.api',
                'oojs-ui-windows'
            ]).then(this.onload.bind(this, 'api'));
            this.loadSettings().then(this.onload.bind(this, 'settings'));
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:BannerNotification.js',
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:Dorui.js',
                    'u:dev:MediaWiki:WDSIcons/code.js'
                ]
            });
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:I18nEdit.css'
            }).then(this.onload.bind(this, 'styles'));
        },
        /**
         * Generic MediaWiki API error handler that reports the error to the user.
         * @param {string} code Error code
         * @param {Object} response Whole MediaWiki API response
         */
        onGenericAPIError: function(code, response) {
            new this.BannerNotification(
                this.i18n.msg(
                    'api-error',
                    code,
                    response && response.info || this.i18n.msg('api-error-no-info').plain()
                ).escape(),
                'error'
            ).show();
        }
    };
    if (!I18nEdit.shouldRun()) {
        return;
    }
    $.extend(I18nEdit, window.I18nEdit || {});
    I18nEdit.importResources();
    window.I18nEdit = I18nEdit;
    window.dev = window.dev || {};
    window.dev.I18nEdit = I18nEdit;
})();