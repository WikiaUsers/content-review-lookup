/*
* MassCategorization
*
* Lets you update the categories of multiple pages en masse
*
* @author Dorumin
* @author Ozuzanna
*/

(function() {
    if (window.MassCategorization && window.MassCategorization.loaded) return;

    window.MassCategorization = $.extend({
        loaded: true,

        // Config options and defaults
        delay: null,

        // Globals
        wg: mw.config.get([
            'wgUserGroups',
            'wgNamespaceIds',
            'wgArticlePath',
            'wgContentLanguage',
            'wgFormattedNamespaces',
            'wgNamespaceNumber',
        ]),
        modal: null,
        typemap: {
            '1': 'add',
            '2': 'remove',
            '3': 'replace'
        },

        // Whether the categorization is taking place
        running: false,

        // Modal content element references
        // These will only be populated after the modal is shown at least once
        // Regarding memory leaks, they're not a problem, because modals are kept in the DOM even when hidden...
        // So memory leaks are happening regardless!
        // Fuck you, OOUI
        refs: {},

        // Resource management
        loading: [
            'css',
            'api',
            'i18n',
            'i18n-js',
            'modal-js',
            'banners-js',
            'dorui'
        ],
        onload: function(key, arg) {
            switch (key) {
                case 'i18n-js':
                    var lib = arg;
                    lib.loadMessages('MassCategorization').then(this.onload.bind(this, 'i18n'));
                    break;
                case 'i18n':
                    var i18n = arg;
                    this.i18n = i18n;
                    break;
                case 'api':
                    this.api = new mw.Api();
                    break;
                case 'banners-js':
                    var BannerNotification = arg;
                    this.BannerNotification = BannerNotification;
                    break;
                case 'dorui':
                    ui = arg;
                    break;
            }

            var index = this.loading.indexOf(key);
            if (index === -1) throw new Error('Unregistered dependency loaded: ' + key);

            this.loading.splice(index, 1);

            if (this.loading.length !== 0) return;

            this.init();
        },
        shouldRun: function() {
            return this.hasRights([
                'autoconfirmed',
                'bot',
                'sysop'
            ]);
        },
        hasRights: function(rights) {
            var len = rights.length;
            while (len--) {
                if (this.wg.wgUserGroups.indexOf(rights[len]) !== -1) return true;
            }

            return false;
        },
        getPrefixedModule: function(name) {
            var modules = mw.loader.getModuleNames();
            var prefix = name + '-';
            var len = prefix.length;
            var moduleName = modules.find(function(mod) {
                return mod.slice(0, len) === prefix;
            });

            return mw.loader.using(moduleName).then(function(require) {
                return require(moduleName);
            });
        },
        preload: function() {
            // Styles
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:MassCategorization.css'
            }).then(this.onload.bind(this, 'css'));

            // Dev libs
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:BannerNotification.js',
                    'u:dev:MediaWiki:Modal.js',
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:Dorui.js',
                ]
            });

            mw.hook('dev.banners').add(this.onload.bind(this, 'banners-js'));
            mw.hook('dev.modal').add(this.onload.bind(this, 'modal-js'));
            mw.hook('dev.i18n').add(this.onload.bind(this, 'i18n-js'));
            mw.hook('doru.ui').add(this.onload.bind(this, 'dorui'));

            // Loader modules
            mw.loader.using('mediawiki.api').then(this.onload.bind(this, 'api'));
        },

        // Functions

        // UI-js build functions

        // "Update" refers to an element that describes a category update, like add/rm/replace
        buildCategoryUpdate: function() {
            function onSelectChange(e) {
                this.onSelectChange(update, e);
            }

            var update = ui.div({
                classes: ['MassCat-category-update', 'MassCat-category-update-add'],
                children: [
                    ui.div({
                        class: 'MassCat-mode-select-wrapper',
                        events: {
                            input: onSelectChange.bind(this)
                        },
                        children: [
                            this.i18n.msg('mode-dropdown-label').plain() + ' ',
                            ui.select({
                                class: 'MassCat-mode-select',
                                children: [
                                    ui.option({ value: 1, text: this.i18n.msg('mode-dropdown-add').plain()     }),
                                    ui.option({ value: 2, text: this.i18n.msg('mode-dropdown-remove').plain()  }),
                                    ui.option({ value: 3, text: this.i18n.msg('mode-dropdown-replace').plain() }),
                                ]
                            })
                        ]
                    }),
                    ui.div({
                        classes: ['MassCat-category-inputs'],
                        child: ui.div({
                            class: 'MassCat-category-input-wrapper',
                            children: [
                                this.i18n.msg('category-label').plain() + ' ',
                                ui.input({
                                    type: 'text',
                                    class: 'MassCat-category-input',
                                    events: {
                                        input: function() {
                                            this.running = false;
                                        }.bind(this)
                                    }
                                })
                            ]
                        })
                    })
                ]
            });

            return update;
        },

        onSelectChange: function(elem, e) {
            this.running = false;

            var typecat = elem.classList.item(1);
            var from = typecat.replace('MassCat-category-update-', '');
            var to = this.typemap[e.target.value];
            var inputs = elem.querySelector('.MassCat-category-inputs');

            // Redundancy in these if checks because I don't trust the `input` event
            if (to === 'replace' && from !== 'replace') {
                // To replace
                inputs.appendChild(
                    this.fadeIn(
                        ui.div({
                            classes: ['MassCat-category-input-wrapper', 'MassCat-replacement-category-input-wrapper'],
                            children: [
                                this.i18n.msg('category-replace-label').plain() + ' ',
                                ui.input({
                                    type: 'text',
                                    classes: ['MassCat-category-input', 'MassCat-replacement-category-input'],
                                    events: {
                                        change: function() {
                                            this.running = false;
                                        }.bind(this)
                                    }
                                })
                            ]
                        }),
                        300
                    )
                );

                this.reflowModal();
            } else if (to !== 'replace' && from === 'replace') {
                // From replace
                var wrapper = inputs.querySelector('.MassCat-replacement-category-input-wrapper');

                console.assert(wrapper === inputs.lastElementChild);

                this.fadeOut(wrapper, 300, function() {
                    this.reflowModal();
                }.bind(this));
            }

            elem.classList.remove(typecat);
            elem.classList.add('MassCat-category-update-' + to);
        },

        fadeIn: function(elem, delay) {
            elem.classList.add('MassCat-fading-in');

            setTimeout(function() {
                elem.classList.remove('MassCat-fading-in');
            }, delay);

            return elem;
        },

        fadeOut: function(elem, delay, callback) {
            elem.classList.add('MassCat-fading-out');

            setTimeout(function() {
                elem.classList.remove('MassCat-fading-out');
                elem.parentNode.removeChild(elem);

                if (callback) {
                    callback();
                }
            }, delay);
        },

        // Builds the two buttons to add or remove updates
        buildCategoryAdder: function() {
            return ui.div({
                id: 'MassCat-category-adder',
                children: [
                    ui.span({
                        id: 'MassCat-add-category',
                        text: '+',
                        events: {
                            click: this.addUpdate.bind(this)
                        }
                    }),
                    ui.br(),
                    this.refs.removeButton = ui.span({
                        id: 'MassCat-remove-category',
                        class: ['disabled'],
                        text: '-',
                        events: {
                            click: this.removeUpdate.bind(this)
                        }
                    })
                ]
            });
        },

        // Callback for adding a category update
        addUpdate: function(e) {
            e.preventDefault();

            this.running = false;

            this.refs.updatesList.appendChild(
                this.fadeIn(
                    this.buildCategoryUpdate(),
                    300
                )
            );

            this.refs.removeButton.classList.remove('disabled');

            this.reflowModal();
        },
        // Callback for removing the last category update
        removeUpdate: function(e) {
            e.preventDefault();

            this.running = false;

            var children = this.refs.updatesList.querySelectorAll('.MassCat-category-update:not(.MassCat-fading-out)');
            var last = children[children.length - 1];

            // Removed, this should reduce clientHeight to 0, but... it doesn't work
            // I'm not sure what OOUI uses to measure modal content for reflow
            // But padding 0, height 0 elements still have some height, somehow
            // What the fuck, OOUI?
            //
            // last.style.padding = '0';
            // last.style.height = '0';
            // last.style.overflow = 'visible';
            // this.reflowModal();

            if (children.length === 2) {
                this.refs.removeButton.classList.add('disabled');
            }

            this.fadeOut(last, 300, function() {
                this.reflowModal();
            }.bind(this));
        },

        // Builds the modal contents
        buildModalContent: function() {
            this.refs.pagesTextarea = ui.textarea({
                class: 'MassCat-pages-textarea',
                events: {
                    input: function() {
                        this.running = false;
                    }.bind(this)
                }
            });

            // Reflow the modal when the user resizes the textarea
            // You'd expect you could do this easier without observers. ¯\_(ツ)_/¯
            new MutationObserver(
                this.reflowModal.bind(this)
            )
                .observe(this.refs.pagesTextarea, {
                    attributes: true,
                    attributeFilter: ['style']
                });

            return ui.div({
                id: 'MassCat-content-container',
                children: [
                    ui.div({
                        id: 'MassCat-updates-container',
                        children: [
                            this.refs.updatesList = ui.div({
                                id: 'MassCat-updates-list',
                                child: this.buildCategoryUpdate()
                            }),
                            this.buildCategoryAdder()
                        ]
                    }),
                    ui.div({
                        id: 'MassCat-options-container',
                        children: [
                            this.i18n.msg('options-section-label').plain(),
                            ui.label({
                                class: 'MassCat-options-label',
                                children: [
                                    this.refs.noIncludeCheckbox = ui.input({
                                        type: 'checkbox',
                                        events: {
                                            change: function() {
                                                this.running = false;
                                            }.bind(this)
                                        }
                                    }),
                                    this.i18n.msg('options-no-include-label').plain()
                                ]
                            }),
                            ui.label({
                                class: 'MassCat-options-label',
                                children: [
                                    this.refs.caseSensitiveCheckbox = ui.input({
                                        type: 'checkbox',
                                        events: {
                                            change: function() {
                                                this.running = false;
                                            }.bind(this)
                                        }
                                    }),
                                    this.i18n.msg('options-case-sensitive-label').plain()
                                ]
                            }),
                            ui.label({
                                class: 'MassCat-options-label',
                                children: [
                                    this.refs.suppressAutomaticCheckbox = ui.input({
                                        type: 'checkbox',
                                        events: {
                                            change: function() {
                                                this.running = false;
                                            }.bind(this)
                                        }
                                    }),
                                    this.i18n.msg('options-suppress-automatic-label').plain()
                                ]
                            })
                        ]
                    }),
                    ui.div({
                        id: 'MassCat-pages-container',
                        children: [
                            this.i18n.msg('pages-section-label').plain(),
                            this.refs.pagesTextarea
                        ]
                    }),
                    this.refs.statusContainer = ui.div({
                        id: 'MassCat-status-container',
                        class: 'MassCat-logger MassCat-hidden'
                    }),
                    this.refs.errorsContainer = ui.div({
                        id: 'MassCat-errors-container',
                        class: 'MassCat-logger MassCat-hidden',
                        child: this.refs.errorsText = ui.div({
                            id: 'MassCat-errors-text'
                        })
                    }),
                ]
            });
        },

        // Hydrates the modal stored in [this.modal] and shows it
        // OOUI patterns seem to indicate that in order to actually have fresh modal contents each time,
        // you have to .set them explicitly before showing it
        // Sure would be handy if .show's usage supported or even mentioned how this would be handled
        showModal: function() {
            this.modal.setContent(
                this.buildModalContent()
            );
            this.modal.setEvents({
                addCategoryContents: this.addCategoryContents.bind(this),
                start: this.start.bind(this)
            });
            this.modal.setButtons([
                {
                    text: this.i18n.msg('start-button').plain(),
                    event: 'start',
                    primary: true
                },
                {
                    text: this.i18n.msg('cancel-button').plain(),
                    event: 'close',
                    primary: false
                },
                {
                    text: this.i18n.msg('add-category-contents-button').plain(),
                    event: 'addCategoryContents',
                    primary: false
                }
            ]);
            this.modal.create();
            this.modal.show();
        },

        escapeRegex: function(s) {
            return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        upcaseFirst: function(s) {
            return s[0].toUpperCase() + s.slice(1);
        },

        categorize: function(title, updates) {
            var currentStep = this.addStatus(this.i18n.msg('status-fetching', title).plain());

            this.api.get({
                action: 'query',
                titles: title,
                prop: 'revisions|categories',
                rvprop: 'content'
            }).done(function(data) {
                var page = Object.values(data.query.pages)[0];

                if (page.missing === '') {
                    this.logError(this.i18n.msg('error-page-does-not-exist', title).plain());
                    return;
                }

                var content = page.revisions[0]['*'];
                var newContent = content;
                var categories = !page.categories ? [] : page.categories.map(function(category) {
                    return category.title.slice(category.title.indexOf(':') + 1).toLowerCase();
                });
                var changes = [];

                var updateMap = {
                    add: [],
                    remove: [],
                    replace: []
                };

                updates.forEach(function(update) {
                    updateMap[update.mode].push(update);
                });

                updateMap.replace.forEach(function(update) {
                    var category = update.category;
                    var replacement = update.replacement;

                    var cSens = this.refs.caseSensitiveCheckbox.checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = this.escapeRegex(category);
                    var categoryNamespaceGroup = '(' + this.categoryAliases.join('|') + ')';
                    // TODO: Simplify
                    var sRegEx = '(\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\]\\]|\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\|.*?\\]\\])';
                    var regex = new RegExp(sRegEx, flags);
                    var newCat = this.categoryLocal + ':' + this.upcaseFirst(replacement);

                    if (regex.test(newContent)) {
                        changes.push(this.i18n.msg('change-replaced', category, replacement).plain());
                        newContent = newContent.replace(regex, '[[' + newCat + ']]');

                        var index = categories.indexOf(category.toLowerCase());
                        if (index !== -1) {
                            categories.splice(index, 1, replacement.toLowerCase());
                        }
                    }
                }.bind(this));

                updateMap.remove.forEach(function(update) {
                    var category = update.category;

                    var cSens = this.refs.caseSensitiveCheckbox.checked;
                    var flags = 'g' + (cSens ? '' : 'i');
                    var escapedCat = this.escapeRegex(category);
                    var categoryNamespaceGroup = '(' + this.categoryAliases.join('|') + ')';
                    // TODO: Simplify
                    var sRegEx = '(\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\]\\]|\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\|.*?\\]\\])';
                    var regex = new RegExp(sRegEx, flags);

                    if (regex.test(newContent)) {
                        changes.push(this.i18n.msg('change-removed', category).plain());
                        newContent = newContent.replace(regex, '');

                        var index = categories.indexOf(category.toLowerCase());
                        if (index !== -1) {
                            categories.splice(index, 1);
                        }
                    }
                }.bind(this));

                var shouldAdd = updateMap.add.some(function(update) {
                    return !categories.includes(update.category.toLowerCase());
                });

                if (shouldAdd) {
                    var addingCategories = updateMap.add.map(function(update) {
                        return update.category;
                    });
                    var appendContent = '\n';

                    addingCategories.forEach(function(category) {
                        if (!categories.includes(category.toLowerCase())) {
                            changes.push(this.i18n.msg('change-added', category).plain());

                            appendContent += '[[' + this.categoryLocal + ':' + category + ']]\n'
                        }
                    }.bind(this));

                    if (this.refs.noIncludeCheckbox.checked) {
                        var noInclude = '</noinclude>';

                        if (newContent.slice(-noInclude.length) === noInclude) {
                            // Template ends with </noinclude>, we can reuse that tag
                            newContent = newContent.slice(0, -noInclude.length);
                            appendContent = appendContent + '</noinclude>'

                            if (newContent.slice(-1) === '\n') {
                                // We don't want a double newline between categories in <noinclude>
                                appendContent = appendContent.trimStart();
                            }
                        } else {
                            appendContent = '\n<noinclude>' + appendContent + '</noinclude>'
                        }
                    }

                    newContent += appendContent;
                }

                if (content !== newContent) {
                    currentStep = this.replaceStatus(currentStep, this.i18n.msg('status-publishing', title).plain());

                    var summary = this.i18n.msg('summary', changes.join(', ')).plain();

                    if (!this.refs.suppressAutomaticCheckbox.checked) {
                        summary += ' (' + this.i18n.msg('automatic').plain() + ')';
                    }

                    this.api.post({
                        action: 'edit',
                        watchlist: 'nochange',
                        title: title,
                        summary: summary,
                        nocreate: '',
                        text: newContent,
                        bot: true,
                        minor: true,
                        token: mw.user.tokens.get('csrfToken')
                    }).then(function(res) {
                        this.removeStatus(currentStep, this.i18n.msg('status-published-waiting', title).plain());

                        if (res.error && res.error.code) {
                            this.logError(this.i18n.msg('error-publishing', title).plain() + ': ' + res.error.code);
                        }
                    }.bind(this)).fail(function(code) {
                        this.removeStatus(currentStep, this.i18n.msg('status-failed-publish-waiting', title).plain());

                        if (typeof code === 'string') {
                            this.logError(this.i18n.msg('error-publishing', title).plain() + ': ' + code);
                        } else {
                            this.logError(this.i18n.msg('error-publishing', title).plain());
                        }
                    }.bind(this));
                } else {
                    this.removeStatus(currentStep, this.i18n.msg('status-no-changes-waiting', title).plain());
                }
            }.bind(this));
        },

        pluckNextLine: function() {
            var val = this.refs.pagesTextarea.value;
            var index = val.indexOf('\n');
            if (index === -1) {
                index = val.length;
            }

            var title = val.slice(0, index).trim();

            this.refs.pagesTextarea.value = val.slice(index + 1);

            return title;
        },

        getUpdates: function() {
            var children = Array.from(this.refs.updatesList.children);

            return children.map(function(elem) {
                var select = elem.querySelector('.MassCat-mode-select');
                var inputs = elem.querySelectorAll('.MassCat-category-input');
                var value = {
                    mode: this.typemap[select.value],
                    category: inputs[0].value.trim(),
                    invalid: inputs[0].value.trim() === ''
                };

                if (value.mode == 'replace') {
                    value.replacement = inputs[1].value.trim();
                    value.invalid = value.invalid || value.replacement.trim() === '';
                }

                return value;
            }.bind(this));
        },

        start: function() {
            if (this.running) return;

            var updates = this.getUpdates();

            for (var i = 0; i < updates.length; i++) {
                var update = updates[i];

                if (update.invalid) {
                    if (update.category === '') {
                        alert(this.i18n.msg('error-missing-category', i + 1).plain());
                        return;
                    } else if (update.replacement === '') {
                        alert(this.i18n.msg('error-missing-replacement', i + 1).plain());
                        return;
                    }

                    alert('This code is unreachable. If you can see this, wat');
                    return;
                }
            }

            this.running = true;

            var deleteNext = function() {
                if (!this.running) {
                    this.logError(this.i18n.msg('interrupted').plain());
                    return;
                }

                var next = this.pluckNextLine();

                if (!next) {
                    this.running = false;
                    alert(this.i18n.msg('nothing-left-to-do-prompt').plain());
                    this.addStatus(this.i18n.msg('status-finished').plain(), true);
                    return;
                }

                this.categorize(next, updates);

                setTimeout(deleteNext.bind(this), this.delay);
            }.bind(this);

            deleteNext.call(this);
        },

        addCategoryContents: function() {
            var category = prompt(this.i18n.msg('add-category-prompt').plain());
            if (category === null || category.trim() === '') return;

            this.streamCategoryMembers(category, function(members) {
                if (members.length === 0) {
                    this.logError(this.i18n.msg('error-category-does-not-exist', category).plain());
                    return;
                }

                var textarea = this.refs.pagesTextarea;
                var needsNewline = textarea.value.length !== 0 && textarea.value.charAt(textarea.value.length - 1) !== '\n';
                var toAdd = needsNewline
                    ? '\n'
                    : '';

                toAdd += members.join('\n');

                textarea.value += toAdd;
            }.bind(this));
        },

        streamCategoryMembers: function(category, callback) {
            var params = {
                action: 'query',
                list: 'categorymembers',
                // Hardcoded Category: namespace, namespace redirect will always be there
                cmtitle: 'Category:' + category,
                cmprop: 'title',
                cmlimit: 'max',
                cachebuster: Date.now()
            };

            var doFetch = function() {
                this.api.get(params).then(function(data) {
                    if (data.hasOwnProperty('continue')) {
                        Object.assign(params, data['continue']);

                        doFetch();
                    }

                    if (data.hasOwnProperty('query-continue')) {
                        // Deep merge, query-continue is just whack
                        var args = [
                            params
                        ].concat(Object.values(data['query-continue']));

                        Object.assign.apply(undefined, args);

                        doFetch();
                    }

                    var titles = data.query.categorymembers.map(function(page) {
                        return page.title;
                    });

                    callback(titles);
                }.bind(this)).fail(function() {
                    this.logError(this.i18n.msg('error-failed-to-get-contents', category).plain());
                }.bind(this));
            }.bind(this);

            doFetch();
        },

        addStatus: function(msg, temp) {
            var status = this.buildStatus(msg, temp);
            var old = this.refs.statusContainer.querySelector('.MassCat-temp');

            if (old !== null) {
                this.refs.statusContainer.replaceChild(status, old);
            } else {
                this.refs.statusContainer.appendChild(status);
            }

            this.refs.statusContainer.classList.remove('MassCat-hidden');

            this.reflowModal();

            return status;
        },

        removeStatus: function(status, ifEmpty) {
            this.refs.statusContainer.removeChild(status);

            if (ifEmpty && this.refs.statusContainer.children.length === 0) {
                this.addStatus(ifEmpty, true);
            }
        },

        replaceStatus: function(oldStatus, msg) {
            var status = this.buildStatus(msg);

            this.refs.statusContainer.replaceChild(status, oldStatus);

            return status;
        },

        buildStatus: function(msg, temp) {
            return ui.div({
                classes: {
                    'MassCat-status-message': true,
                    'MassCat-temp': temp
                },
                text: msg
            });
        },

        logError: function(msg) {
            console.error(msg);

            this.refs.errorsContainer.classList.remove('MassCat-hidden');
            this.refs.errorsText.appendChild(
                ui.div({
                    classes: ['MassCat-log', 'MassCat-error'],
                    text: msg
                })
            );

            this.reflowModal();
        },

        // Updates the size for the modal
        // Essentially "reflows" it, useful after you update it, or its content size changes
        reflowModal: function() {
            var $frame = this.modal._modal.$frame;
            var $body = this.modal._modal.$body;

            // Save the scrollTop position as this function call resets it to 0
            // If you haven't gotten a feel as to why I hate OOUI yet, here's one reason
            var stop = $body.prop('scrollTop');

            dev.modal._windowManager.updateWindowSize(this.modal._modal);

            var $frame = this.modal._modal.$frame;
            var $body = this.modal._modal.$body;
            if (!$frame || !$body) return console.error('OOUI is dumb');

            var frame = $frame.get(0);
            var body = $body.get(0);

            body.scrollTop = stop;

            frame.addEventListener('transitionend', function() {
                // Contents here must be idempotent
                // If reflowModal is called multiple times, multiple transitionend listeners may be registered
                var height = body.clientHeight;
                var contentsHeight = body.scrollHeight;

                if (contentsHeight > height) {
                    body.classList.add('overflow-allowed');
                } else {
                    body.classList.remove('overflow-allowed');
                }
            }, {
                once: true
            });
        },

        // Sets the [this.delay] property to a reasonable default if it's not set
        // Called on init
        setDefaultDelay: function() {
            if (!this.delay) {
                if (this.wg.wgUserGroups.includes('bot')) {
                    this.delay = 2000;
                } else {
                    this.delay = 4000;
                }
            }
        },
        // Creates the script modal and keeps a reference to it in [this.modal]
        // Called on init
        createModal: function() {
            this.modal = new dev.modal.Modal({
                id: 'MassCatModal',
                size: 'medium',
                title: this.i18n.msg('modal-title').plain(),
                content: 'You should never see this because .setContent is used to override the content on .showModal. SOPHIE SUCKS! HAHA!',
                // We don't want people accidentally closing it
                closeEscape: false,
                close: function() {
                    if (!this.running) return true;

                    // Confirm used as OOUI modals can't stand more than one modal at once
                    var shouldClose = confirm(this.i18n.msg('close-modal-prompt').plain());

                    // It DID make writing this logic easier than with ShowCustomModal, but...
                    // I'd still prefer stackable modals
                    if (shouldClose) {
                        this.running = false;

                        return true;
                    }

                    return false;
                }
            });
        },
        // Adds the toolbar button to the document
        // Called on init
        addToolbarButton: function() {
            var menu = document.getElementById('my-tools-menu');
            if (menu === null) return;

            menu.insertBefore(
                ui.li({
                    class: 'custom',
                    child: ui.a({
                        id: 'MassCat-tools-button',
                        // To show a pointer cursor, should probably be on css but eh
                        href: '#',
                        text: this.i18n.msg('my-tools-button').plain(),
                        events: {
                            click: this.showModal.bind(this)
                        }
                    })
                }),
                menu.firstElementChild
            );
        },
        init: function() {
            this.categoryLocal = this.wg.wgFormattedNamespaces['14'];
            this.categoryAliases = Object.keys(this.wg.wgNamespaceIds)
                .filter(function(key) {
                    return this.wg.wgNamespaceIds[key] === 14
                }.bind(this))
                .map(function(namespace) {
                    var ns = namespace.replace(/_/g, ' ');

                    return this.upcaseFirst(ns);
                }.bind(this));

            this.setDefaultDelay();

            this.createModal();

            this.addToolbarButton();
        }
    }, window.MassCategorization);

    if (!window.MassCategorization.shouldRun()) return;

    window.MassCategorization.preload();
})();