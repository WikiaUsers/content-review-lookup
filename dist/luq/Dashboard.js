require([
    'jquery',
    'mw',
    require.optional('wikia.tracker'),
    'wikia.window',
    require.optional('ext.wikia.design-system.loading-spinner'),
    'BannerNotification',
    'wikia.geo'
], function($, mw, tracker, window, spinner, banner, geo) {
    // Load protection
    if (window.DashboardLoaded) {
        return;
    }
    window.DashboardLoaded = true;

    /**
     * DashboardSection constructor
     * @constructor
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.description]
     * @param {boolean} [options.collapsible=false]
     * @param {DashboardCard[]} [options.cards=[]]
     */
    function DashboardSection(options) {
        this.id = options.id;
        this.title = options.title || this.id && Dashboard.i18n.msg(this.id + '-title').exists && Dashboard.i18n.msg(this.id + '-title').plain();
        this.description = options.description || this.id && Dashboard.i18n.msg(this.id + '-description').exists && Dashboard.i18n.msg(this.id + '-description').plain();
        this.collapsible = options.collapsible === true;
        this.cards = options.cards instanceof Array ? options.cards : [];
    }

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardSection.prototype.getRenderData = function() {
        var cardNodes = [];
        for (var i = 0; i < this.cards.length; ++i) {
            var card = this.cards[i];
            if (card instanceof DashboardCard) {
                cardNodes.push(card.getRenderData());
            }
        }

        return {
            type: 'div',
            attr: this.id ? {
                id: this.id
            } : {},
            classes: ['dashSection'],
            children: [{
                type: 'h2',
                text: this.title,
            }, {
                type: 'p',
                text: this.description,
                condition: this.description
            }, {
                type: 'div',
                classes: ['boxes'],
                children: cardNodes
            }]
        };
    };

    /**
     * Renders section
     * @returns {Node}
     */
    DashboardSection.prototype.render = function() {
        return window.dev.ui(this.getRenderData());
    };

    /**
     * DashboardCard constructor
     * @constructor
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.description]
     * @param {string} [options.help]
     * @param {boolean} [options.track=true]
     * @param {Object} options.action
     * @param {string} [options.action.text]
     * @param {string} [options.action.href]
     * @param {string} [options.action.icon]
     * @param {boolean} [options.action.primary=false]
     * @param {Function} [options.action.handler]
     * @param {Object} options.secondaryAction
     * @param {string} [options.secondaryAction.href]
     * @param {string} [options.secondaryAction.icon]
     * @param {string} [options.secondaryAction.tooltip]
     * @param {Function} [options.secondaryAction.handler]
     */
    function DashboardCard(options) {
        this.id = options.id;
        this.title = options.title || this.id && Dashboard.i18n.msg(this.id + '-title').exists && Dashboard.i18n.msg(this.id + '-title').plain();
        this.description = options.description || this.id && Dashboard.i18n.msg(this.id + '-description').exists && Dashboard.i18n.msg(this.id + '-description').plain();
        this.help = options.help || this.id && Dashboard.i18n.msg(this.id + '-help').exists && Dashboard.i18n.msg(this.id + '-help').plain();
        this.track = options.track === true || options.track === undefined;

        options.action = options.action || {};
        this.action = {
            text: options.action.text || this.id && Dashboard.i18n.msg(this.id + '-action').exists && Dashboard.i18n.msg(this.id + '-action').plain(),
            href: options.action.href,
            icon: options.action.icon,
            primary: options.action.primary === true,
            handler: options.action.handler instanceof Function ? options.action.handler : new Function()
        };

        options.secondaryAction = options.secondaryAction || {};
        this.secondaryAction = {
            href: options.secondaryAction.href,
            icon: options.secondaryAction.icon,
            tooltip: options.secondaryAction.tooltip,
            handler: options.secondaryAction.handler instanceof Function ? options.secondaryAction.handler : new Function()
        };
    }

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardCard.prototype.getRenderData = function() {
        var self = this;
        return {
            type: 'div',
            attr: this.id ? {
                id: this.id
            } : {},
            classes: ['dash-box'],
            children: [{
                type: 'header',
                classes: ['top'],
                children: [{
                    type: 'div',
                    classes: ['dashHeader'],
                    children: [{
                        type: '#text',
                        text: this.title
                    }]
                }],
            }, {
                type: 'p',
                text: this.description,
                condition: this.description
            }, {
                type: 'footer',
                children: [{
                    type: 'div',
                    classes: ['wds-dropdown'],
                    children: [{
                        type: 'div',
                        classes: ['wds-dropdown__toggle'],
                        children: [window.dev.wds.icon('question-small')]
                    }, {
                        type: 'div',
                        classes: ['wds-dropdown__content', 'wds-is-left-aligned'],
                        text: this.help
                    }],
                    events: {
                        pointerenter: function() {
                            if (self.track) {
                                Dashboard.track({
                                    action: tracker.ACTIONS.HOVER,
                                    label: 'cardHelp-' + self.id
                                });
                            }
                        }
                    },
                    condition: this.help
                }, {
                    type: 'a',
                    attr: Object.assign(
                        this.secondaryAction.href ? { href: this.secondaryAction.href } : {},
                        this.secondaryAction.tooltip ? { title: this.secondaryAction.tooltip } : {}
                    ),
                    classes: ['wds-button', 'wds-is-text', 'wds-is-secondary'],
                    children: this.secondaryAction.icon ? [window.dev.wds.icon(this.secondaryAction.icon)] : [],
                    events: {
                        click: function(e) {
                            if (self.track) {
                                Dashboard.track({
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'card-secondary-' + self.id
                                });
                            }
                            self.secondaryAction.handler(e);
                        }
                    },
                    condition: this.secondaryAction.icon
                }, {
                    type: 'a',
                    attr: this.action.href ? {
                        href: this.action.href
                    } : {},
                    classes: this.action.primary ? ['wds-button'] : ['wds-button', 'wds-is-text'],
                    children: this.action.icon ? [
                        window.dev.wds.icon(this.action.icon),
                        {
                            type: 'span',
                            text: this.action.text
                        }
                    ] : [this.action.text],
                    events: {
                        click: function(e) {
                            if (self.track) {
                                Dashboard.track({
                                    action: tracker.ACTIONS.CLICK,
                                    label: 'card-' + self.id
                                });
                            }
                            self.action.handler(e);
                        }
                    },
                    condition: this.action.text
                }]
            }]
        };
    };

    /**
     * Renders card
     * @returns {Node}
     */
    DashboardCard.prototype.render = function() {
        return window.dev.ui(this.getRenderData());
    };

    /**
     * DashboardContributeCard constructor
     * @constructor
     * @extends DashboardCard
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.description]
     * @param {string} [options.help]
     * @param {string} [options.type]
     * @param {boolean} [options.track=true]
     * @param {Object} options.action
     * @param {string} [options.action.text]
     * @param {string} [options.action.href]
     * @param {boolean} [options.action.primary=false]
     * @param {Function} [options.action.handler]
     * @param {Object} options.secondaryAction
     * @param {string} [options.secondaryAction.href]
     * @param {string} [options.secondaryAction.icon]
     * @param {string} [options.secondaryAction.tooltip]
     * @param {Function} [options.secondaryAction.handler]
     */
    function DashboardContributeCard(options) {
        if (options.action && options.action.text === undefined) {
            options.action.text = Dashboard.i18n.msg('dashboardHelp-showpagelist').plain();
        }
        DashboardCard.call(this, options);
        this.type = options.type;
    }

    DashboardContributeCard.prototype = Object.create(DashboardCard.prototype);

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardContributeCard.prototype.getRenderData = function() {
        var renderData = DashboardCard.prototype.getRenderData.call(this);
        if (this.type) {
            renderData.children[0].children.unshift({
                type: 'b',
                text: this.type
            });
        }

        renderData.data = {
            type: 'contribute'
        };

        return renderData;
    };

    /**
     * DashboardProfileCard constructor
     * @constructor
     * @extends DashboardCard
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.description]
     * @param {string} [options.help]
     * @param {string} [options.avatar] Avatar URL
     * @param {boolean} [options.track=true]
     * @param {Object} options.action
     * @param {string} [options.action.text]
     * @param {string} [options.action.href]
     * @param {boolean} [options.action.primary=false]
     * @param {Function} [options.action.handler]
     * @param {Object} options.secondaryAction
     * @param {string} [options.secondaryAction.href]
     * @param {string} [options.secondaryAction.icon]
     * @param {string} [options.secondaryAction.tooltip]
     * @param {Function} [options.secondaryAction.handler]
     */
    function DashboardProfileCard(options) {
        DashboardCard.call(this, options);
        this.avatar = options.avatar;
    }

    DashboardProfileCard.prototype = Object.create(DashboardCard.prototype);

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardProfileCard.prototype.getRenderData = function() {
        var renderData = DashboardCard.prototype.getRenderData.call(this);
        if (this.avatar) {
            renderData.children[0].children[0].children.unshift({
                type: 'div',
                classes: ['wds-avatar'],
                children: [{
                    type: 'img',
                    classes: ['wds-avatar__image'],
                    attr: {
                        src: this.avatar
                    }
                }]
            });
        }

        renderData.data = {
            type: 'profile'
        };

        return renderData;
    };

    /**
     * DashboardDialog constructor
     * @constructor
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.content]
     * @param {string} [options.close=Close]
     * @param {boolean} [options.track=true]
     */
    function DashboardDialog(options) {
        this.id = options.id;
        this.title = options.title || options.id && Dashboard.i18n.msg(options.id + '-title').exists && Dashboard.i18n.msg(options.id + '-title').plain();
        this.content = options.content || options.id && Dashboard.i18n.msg(options.id + '-content').exists && Dashboard.i18n.msg(options.id + '-content').plain();
        this.close = options.close || options.id && Dashboard.i18n.msg(options.id + '-cancel').exists && Dashboard.i18n.msg(options.id + '-cancel').plain();
        this.track = options.track !== undefined ? options.track === true : true;
        this.node = null;
    }

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardDialog.prototype.getRenderData = function() {
        var self = this;

        if (this.track) {
            Dashboard.track({
                action: tracker.ACTIONS.OPEN,
                label: this.id
            });
        }

        return {
            type: 'div',
            attr: this.id ? {
                id: this.id
            } : {},
            classes: ['wds-dialog__curtain', 'dashboardDialog'],
            children: [{
                type: 'div',
                classes: ['wds-dialog__wrapper'],
                children: [{
                    type: 'div',
                    classes: ['wds-dialog__title'],
                    text: this.title,
                    condition: this.title
                }, {
                    type: 'div',
                    classes: ['wds-dialog__content'],
                    text: this.content
                }, {
                    type: 'div',
                    classes: ['wds-dialog__actions'],
                    children: [{
                        type: 'a',
                        classes: ['wds-button', 'wds-is-text', 'wds-dialog__actions-button'],
                        text: this.close || Dashboard.i18n.msg('dialog-close').plain(),
                        events: {
                            click: function() {
                                if (self.track) {
                                    Dashboard.track({
                                        action: tracker.ACTIONS.CLOSE,
                                        label: self.id
                                    });
                                }

                                self.node.remove();
                                self.node = null;
                            }
                        }
                    }]
                }]
            }]
        };
    };

    /**
     * Renders dialog and appends it to the document.body
     * @returns {Node}
     */
    DashboardDialog.prototype.render = function() {
        this.node = document.body.appendChild(window.dev.ui(this.getRenderData()));
        return this.node;
    };

    /**
     * DashboardConfirmDialog constructor
     * @constructor
     * @extends DashboardDialog
     * @param {Object} options
     * @param {string} options.id
     * @param {string} [options.title]
     * @param {string} [options.content]
     * @param {string} [options.action]
     * @param {string} [options.close=Cancel]
     * @param {string} [options.confirm=Confirm]
     * @param {Function} [options.callback]
     * @param {Function} options.dataCallback
     * @param {boolean} [options.track=true]
     */
    function DashboardConfirmDialog(options) {
        DashboardDialog.call(this, options);

        this.action = options.action;
        this.confirm = options.confirm || options.id && Dashboard.i18n.msg(options.id + '-confirm').exists && Dashboard.i18n.msg(options.id + '-confirm').plain();
        this.callback = options.callback;
    }

    DashboardConfirmDialog.prototype = Object.create(DashboardDialog.prototype);

    /**
     * Returns render data for UI-js
     * @returns {Object}
     */
    DashboardConfirmDialog.prototype.getRenderData = function() {
        var renderData = DashboardDialog.prototype.getRenderData.call(this);
        var self = this;

        renderData.children[0].children[2].children[0].text =  this.close || Dashboard.i18n.msg('dialog-cancel').plain();
        renderData.children[0].children[2].children.push({
            type: 'a',
            attr: {
                href: this.action
            },
            classes: ['wds-button', 'wds-dialog__actions-button'],
            text: this.confirm || Dashboard.i18n.msg('dialog-confirm').plain(),
            events: {
                click: function() {
                    if (self.track) {
                        Dashboard.track({
                            action: tracker.ACTIONS.CONFIRM,
                            label: self.id
                        });
                    }

                    if (self.callback instanceof Function) {
                        self.callback();
                    }

                    self.node.remove();
                    self.node = null;
                }
            }
        });

        return renderData;
    };

    var Dashboard = {
        config: mw.config.get([
            'wgNamespaceNumber',
            'wgSiteName',
            'wgTitle',
            'wgUserId',
            'wgUserName',
            'wgUserLanguage',
            'wgWikiaPageActions',
            'wgVisualEditorPreferred'
        ]),
        loading: 4,
        preload: function() {
            if (--this.loading === 0) {
                window.dev.i18n.overrides.Dashboard = {
                    "dashboardSelf-encentraluserpage-title": "A profile you can load on all wikis",
                    "dashboardSelf-encentraluserpage-description": "Create a templated user page you can reuse on every wiki on the English-language community central. Make sure to make one in the language you edit most often. You can add this to your userpage using '{{w::user:$1}}'.",
                    "dashboardSelf-langcentraluserpage-title": "Introduce yourself to your fellow $1 editors",
                    "dashboardSelf-langcentraluserpage-description": "Get in contact with other $1 editors! Create your userpage on the $2 and tell people which $1 wikis you edit!",
                    "lang-en": "English",
                    "central-en": "Community Central",
                    "lang-de": "German",
                    "central-de": "Community-Wiki",
                    "lang-es": "Spanish",
                    "central-es": "Comunidad Central",
                    "lang-fr": "French",
                    "central-fr": "Centre des communautés",
                    "lang-it": "Italian",
                    "central-it": "Wiki della Community",
                    "lang-ja": "Japanese",
                    "central-ja": "コミュニティセントラル",
                    "lang-pl": "Polish",
                    "central-pl": "Centrum Społeczności",
                    "lang-pt": "Portugese",
                    "central-pt": "Central da Comunidade",
                    "lang-ru": "Russian",
                    "central-ru": "Вики Сообщества",
                    "lang-zh": "Chinese",
                    "central-zh": "社区中心",
                };
                window.dev.i18n.loadMessages('Dashboard').then(this.init.bind(this));
            }
        },
        init: function(i18n) {
            this.api = new mw.Api();
            this.i18n = i18n;

            if (this.config.wgUserId === null) {
                this.addUserBenefits();
                this.track({
                    action: tracker.ACTIONS.IMPRESSION,
                    label: 'avatarpulse'
                });
            } else {
                if (localStorage.getItem('Dashboard-trackRegister')) {
                    this.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'benefits-register'
                    });
                    localStorage.removeItem('Dashboard-trackRegister');
                }

                this.addUserMenuShortcuts();
            }

            if (this.config.wgNamespaceNumber === -1 && this.config.wgTitle === 'Dashboard') {
                $('.page-header__title').text(this.i18n.msg('dashboard').plain());
                document.title = this.i18n.msg('dashboard').plain() + ' | ' + this.config.wgSiteName + ' | Fandom';

                if (this.config.wgUserId === null) {
                    mw.util.$content.html(this.i18n.msg('dashboard-anon').plain());
                    this.track({
                        action: tracker.ACTIONS.VIEW,
                        label: 'anon'
                    });
                    return;
                }

                mw.hook('Dashboard.loading').fire();
                this.renderDashboardLoading();

                $.when(
                    this.getUserInfo(),
                    $.getScript('/extensions/wikia/UserProfilePageV3/js/UserProfilePage.js')
                ).done(this.renderDashboard.bind(this));
            } else if (this.config.wgUserId !== null) {
                if ( !localStorage.getItem('Dashboard-notificationDismissed') ) {
                    this.displayNotification();
                }

                if (
                    localStorage.getItem('Dashboard-trackAddEmail') ||
                    localStorage.getItem('Dashboard-trackConfirmEmail') ||
                    localStorage.getItem('Dashboard-trackCentralUserPage') ||
                    localStorage.getItem('Dashboard-trackLocalUserPage')
                ) {
                    this.getUserInfo();
                }
            }
        },
        track: tracker.buildTrackingFunction({
            category: 'dashboard',
            action: tracker.ACTIONS.CLICK,
            trackingMethod: 'analytics'
        }),
        addUserBenefits: function() {
            var self = this;
            $('.wds-global-navigation__user-menu > .wds-dropdown__content > .wds-list').append(
                window.dev.ui({
                    type: 'li',
                    children: [{
                        type: 'div',
                        classes: ['wds-global-navigation__user-menu-dropdown-caption'],
                        text: this.i18n.msg('benefits-caption').plain()
                    }, {
                        type: 'a',
                        classes: ['wds-button', 'wds-is-full-width', 'wds-is-secondary'],
                        attr: {
                            href: '#'
                        },
                        text: this.i18n.msg('benefits').plain(),
                        events: {
                            click: function() {
                                new DashboardConfirmDialog({
                                    id: 'benefitsDialog',
                                    action: 'https://www.fandom.com/register?redirect=' + encodeURIComponent(window.location.href),
                                    callback: function() {
                                        localStorage.setItem('Dashboard-trackRegister', true);
                                    }
                                }).render();
                            }
                        }
                    }]
                })
            ).parent().parent().on( 'mouseenter', function() {
                self.track({
                    action: tracker.ACTIONS.IMPRESSION,
                    label: 'benefits'
                })
            });
        },
        addUserMenuShortcuts: function() {
            var self = this;
            function userMenuShortcut(options) {
                return {
                    type: 'li',
                    children: [{
                        type: 'a',
                        attr: {
                            href: options.url
                        },
                        text: self.i18n.msg(options.label).plain()
                    }],
                    events: {
                        click: function() {
                            self.track({
                                action: tracker.ACTIONS.CLICK,
                                label: options.label
                            });
                        }
                    }
                };
            }

            $('.wds-global-navigation__user-menu > .wds-dropdown__content').addClass('wds-is-not-scrollable');
            var $menu = $('.wds-global-navigation__user-menu a[data-tracking-label="account.preferences"]')
                .attr({
                    'data-tracking-label': 'Dashboard',
                    href: mw.util.getUrl('Special:Dashboard')
                })
                .empty()
                .append(
                    window.dev.ui({
                        type: 'div',
                        classes: ['wds-dropdown-level-2__toggle'],
                        children: [{
                                type: 'span',
                                text: this.i18n.msg('dashboard').plain()
                            },
                            window.dev.wds.icon('menu-control-tiny', {
                                class: 'wds-dropdown-chevron'
                            })
                        ],
                        events: {
                            pointerenter: function() {
                                self.track({
                                    action: tracker.ACTIONS.HOVER,
                                    label: 'usermenu'
                                });
                            }
                        }
                    })
                )
                .parent()
                .append(
                    window.dev.ui({
                        type: 'div',
                        classes: ['wds-dropdown-level-2__content'],
                        children: [{
                            type: 'ul',
                            classes: ['wds-list', 'wds-is-linked'],
                            children: [
                                userMenuShortcut({
                                    url: mw.util.getUrl('Special:Dashboard'),
                                    label: 'usermenu-dashboard'
                                }),
                                userMenuShortcut({
                                    url: mw.util.getUrl('Special:Preferences'),
                                    label: 'usermenu-preferences'
                                }),
                                userMenuShortcut({
                                    url: mw.util.getUrl('Special:Contributions/' + this.config.wgUserName),
                                    label: 'usermenu-contributions'
                                }),
                                userMenuShortcut({
                                    url: mw.util.getUrl('Special:Watchlist/' + this.config.wgUserName),
                                    label: 'usermenu-watchlist'
                                })
                            ]
                        }]
                    })
                )
                .addClass(function() {
                    var $firstLevelItem = $(this);
                    var index = $firstLevelItem.index();
                    var numSecondLevelItems = $firstLevelItem.find('.wds-list li').length;
                    return (index > numSecondLevelItems - 1) ? 'wds-is-sticked-to-parent wds-dropdown-level-2' : 'wds-dropdown-level-2';
                });

            mw.hook('Dashboard.usermenu').fire($menu);
        },
        displayNotification: function() {
            var notification = new banner(this.i18n.msg( 'notification' ).parse(), 'notify');
            var self = this;

            notification.onClose(function() {
                self.track({
                    action: tracker.ACTIONS.CLOSE,
                    label: 'notification'
                });
                localStorage.setItem('Dashboard-notificationDismissed', true);
            });
            notification.show();
            notification.$element.find( '.wds-banner-notification__text a' )
                .attr('target', '_blank')
                .on('click', function() {
                    self.track({
                        action: tracker.ACTIONS.CLICK,
                        label: 'notification-link'
                    });
                    localStorage.setItem('Dashboard-notificationDismissed', true);
                });

            this.track({
                action: tracker.ACTIONS.IMPRESSION,
                label: 'notification'
            });
        },
        addProfileEditTracking: function(modal) {
            this.track({
                action: tracker.ACTIONS.OPEN,
                label: 'profileedit'
            });
            var self = this;
            var submitted = false;
            var data = {
                name: undefined,
                location: undefined,
                occupation: undefined,
                gender: undefined,
                website: undefined,
                twitter: undefined,
                fbPage: undefined,
                discordHandle: undefined,
                year: undefined,
                month: undefined,
                day: undefined
            };
            Object.keys(data).forEach(function(key) {
                if (document.userData[key]) {
                    data[key] = document.userData[key].value;
                }
            });
            var $modal = $(modal);
            var avatar = $modal.find('.avatar').attr('src');

            function onSave() {
                var changed = 0;
                if (avatar !== $modal.find('.avatar').attr('src')) {
                    ++changed;
                }
                Object.keys(data).forEach(function(key) {
                    if (document.userData[key] && data[key] !== document.userData[key].value) {
                        ++changed;
                    }
                });

                if (changed) {
                    submitted = true;
                    self.track({
                        action: tracker.ACTIONS.SUBMIT,
                        label: 'profileedit',
                        value: changed
                    });
                }
            }

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(addedNode) {
                        if (addedNode.id !== 'blackout_UPPLightboxCloseWrapper') {
                            return;
                        }

                        $(addedNode).find('button[data-event=save]').on('click', onSave);
                    });
                    mutation.removedNodes.forEach(function(removedNode) {
                        if (removedNode.id !== 'blackout_UPPLightboxWrapper') {
                            return;
                        }

                        if (!submitted) {
                            self.track({
                                action: tracker.ACTIONS.CLOSE,
                                label: 'profileedit'
                            });
                        }
                        observer.disconnect();
                    });
                });
            });
            observer.observe(document.body, {
                childList: true
            });

            $modal.find('button[data-event=save]').on('click', onSave);
        },
        renderDashboardLoading: function() {
            mw.util.$content
                .empty()
                .append(
                    window.dev.ui({
                        type: 'div',
                        attr: {
                            id: 'Dashboard',
                        },
                        children: [{
                                type: 'input',
                                attr: {
                                    id: 'user',
                                    type: 'hidden',
                                    value: this.config.wgUserId
                                }
                            },
                            {
                                type: 'input',
                                attr: {
                                    id: 'reloadUrl',
                                    type: 'hidden',
                                    value: ''
                                }
                            },
                            {
                                type: 'input',
                                attr: {
                                    id: 'userIdentityBoxEdit',
                                    type: 'hidden'
                                }
                            }
                        ]
                    }),
                    spinner ? new spinner(38, 2).html.replace('wds-block', 'wds-spinner__block').replace('wds-path', 'wds-spinner__stroke') : ''
                );
        },
        renderDashboard: function() {
            this.track({
                action: tracker.ACTIONS.VIEW,
                label: this.user.globaleditcount > 20 ? 'olduser' : 'newuser'
            });

            var $dashboard = $('#Dashboard');
            mw.util.$content.find('.wds-spinner').remove();
            this.getSections().forEach(function(section) {
                $dashboard.append(section.render());
            });
            mw.hook('Dashboard.ui').fire($dashboard);
        },
        getSections: function() {
            var sections = [
                this.getSelfSection(),
                this.getCommunitySection(),
                this.getHelpSection()
            ];
            mw.hook('Dashboard.sections').fire(sections);
            return sections;
        },
        getSelfSection: function() {
            var self = this;
            return new DashboardSection({
                id: 'dashboardSelf',
                collapsible: true,
                cards: [
                    new DashboardProfileCard({
                        id: 'dashboardSelf-profile',
                        title: this.user.name,
                        avatar: this.user.options.avatar,
                        action: {
                            handler: function(e) {
                                var observer = new MutationObserver(function(mutations) {
                                    mutations.forEach(function(mutation) {
                                        mutation.addedNodes.forEach(function(addedNode) {
                                            if (addedNode.id !== 'blackout_UPPLightboxWrapper') {
                                                return;
                                            }

                                            observer.disconnect();
                                            self.addProfileEditTracking(addedNode);
                                        });
                                    });
                                });
                                observer.observe(document.body, {
                                    childList: true
                                });
                                $('#userIdentityBoxEdit').trigger('click', e);
                            }
                        }
                    }),
                    new DashboardCard({
                        id: this.user.email ? this.user.emailauthenticated ? 'dashboardSelf-email' : 'dashboardSelf-unconfirmedemail' : 'dashboardSelf-noemail',
                        title: this.user.email ? this.user.email : this.i18n.msg('dashboardSelf-noemail-title').plain(),
                        action: {
                            href: mw.util.getUrl(this.user.email ? this.user.emailauthenticated ? 'Special:Preferences' : 'Special:ConfirmEmail' : 'Special:ChangeEmail') + (this.user.emailauthenticated ? '#mw-prefsection-emailv2' : ''),
                            primary: !this.user.emailauthenticated,
                            handler: function(e) {
                                if (self.user.emailauthenticated) {
                                    return;
                                }

                                e.preventDefault();

                                new DashboardConfirmDialog({
                                    id: self.user.email ? 'dashboardSelf-unconfirmedemail-dialog' : 'dashboardSelf-noemail-dialog',
                                    action: mw.util.getUrl(self.user.email ? 'Special:ConfirmEmail' : 'Special:ChangeEmail'),
                                    callback: function() {
                                        localStorage.setItem(self.user.email ? 'Dashboard-trackConfirmEmail' : 'Dashboard-trackAddEmail', true);
                                    }
                                }).render();
                            }
                        }
                    }),
                    this.user.langcentral ? new DashboardCard({
                        id: this.user.langcentraluserpage ? 'dashboardSelf-langcentraluserpage' : 'dashboardSelf-nolangcentraluserpage',
                        title: this.i18n.msg('dashboardSelf-langcentraluserpage-title', this.i18n.msg('lang-' + this.user.langcentral).plain()).plain(),
                        description: this.i18n.msg('dashboardSelf-langcentraluserpage-description', this.i18n.msg('lang-' + this.user.langcentral).plain(), this.i18n.msg('central-' + this.user.langcentral).plain()).plain(),
                        action: {
                            href: 'https://community.fandom.com/' + this.user.langcentral + '/wiki/User:' + mw.util.wikiUrlencode(this.user.name) + (this.user.langcentraluserpage ? '' : this.config.wgVisualEditorPreferred ? '?veaction=edit' : '?action=edit'),
                            primary: !this.user.langcentraluserpage,
                            text: this.i18n.msg('dashboardSelf-' + (this.user.centraluserpage ? '' : 'no') + 'centraluserpage-action').plain()
                        }
                    }) : null,
                    new DashboardCard({
                        id: 'dashboardSelf-' + (this.user.centraluserpage ? '' : 'no') + (this.user.langcentral ? 'en' : '') + 'centraluserpage',
                        description: this.i18n.msg('dashboardSelf-' + (this.user.langcentral ? 'en' : '') + 'centraluserpage-description', this.user.name).plain(),
                        action: {
                            href: 'https://community.fandom.com/wiki/User:' + mw.util.wikiUrlencode(this.user.name) + (this.user.centraluserpage ? '' : this.config.wgVisualEditorPreferred ? '?veaction=edit' : '?action=edit'),
                            primary: !this.user.centraluserpage,
                            text: this.i18n.msg('dashboardSelf-' + (this.user.centraluserpage ? '' : 'no') + 'centraluserpage-action').plain(),
                            handler: function(e) {
                                if (self.user.centraluserpage) {
                                    return;
                                }

                                e.preventDefault();

                                new DashboardConfirmDialog({
                                    id: 'dashboardSelf-nocentraluserpage-dialog',
                                    action: 'https://community.fandom.com/wiki/User:' + mw.util.wikiUrlencode(self.user.name) + (self.config.wgVisualEditorPreferred ? '?veaction=edit' : '?action=edit'),
                                    callback: function() {
                                        localStorage.setItem('Dashboard-trackCentralUserPage', true);
                                    }
                                }).render();
                            }
                        }
                    }),
                    new DashboardCard({
                        id: 'dashboardSelf-preferences',
                        action: {
                            href: mw.util.getUrl('Special:Preferences')
                        }
                    })
                ]
            });
        },
        getCommunitySection: function() {
            var self = this;
            return new DashboardSection({
                id: 'dashboardCommunity',
                cards: [
                    new DashboardCard({
                        id: this.user.localuserpage ? 'dashboardCommunity-localuserpage' : 'dashboardCommunity-nolocaluserpage',
                        description: this.i18n.msg('dashboardCommunity-localuserpage-description').plain(),
                        action: {
                            href: mw.util.getUrl('User:' + this.user.name, (!this.user.localuserpage ? this.config.wgVisualEditorPreferred ? {
                                veaction: 'edit'
                            } : {
                                action: 'edit'
                            } : {})),
                            primary: !this.user.localuserpage,
                            handler: function() {
                                if ( !self.user.localuserpage ) {
                                    localStorage.setItem('Dashboard-trackLocalUserPage', true);
                                }
                            }
                        }
                    }),
                    new DashboardCard({
                        id: 'dashboardCommunity-admins',
                        action: {
                            href: mw.util.getUrl('Special:ListAdmins')
                        }
                    }),
                    this.config.wgWikiaPageActions.find(function(e) {
                        return e.id === 'special:community';
                    }) ? new DashboardCard({
                        id: 'dashboardCommunity-communitypage',
                        action: {
                            href: mw.util.getUrl('Special:Community')
                        }
                    }) : null
                ]
            });
        },
        getHelpSection: function() {
            return new DashboardSection({
                id: 'dashboardHelp',
                cards: [
                    new DashboardContributeCard({
                        id: 'dashboardHelp-wantedpages',
                        type: this.i18n.msg('dashboardHelp-addcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:WantedPages') // or Special:Insights/wantedpages
                        }
                    }),
                    new DashboardContributeCard({
                        id: 'dashboardHelp-shortpages',
                        type: this.i18n.msg('dashboardHelp-addcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:ShortPages')
                        }
                    }),
                    new DashboardContributeCard({
                        id: 'dashboardHelp-deadendpages',
                        type: this.i18n.msg('dashboardHelp-linkcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:DeadendPages') // or Special:Insights/deadendpages
                        }
                    }),
                    new DashboardContributeCard({
                        id: 'dashboardHelp-lonelypages',
                        type: this.i18n.msg('dashboardHelp-linkcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:LonelyPages')
                        }
                    }),
                    new DashboardContributeCard({
                        id: 'dashboardHelp-withoutimages',
                        type: this.i18n.msg('dashboardHelp-addcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:WithoutImages') // or Special:Insights/withoutimages
                        }
                    }),
                    new DashboardContributeCard({
                        id: 'dashboardHelp-uncategorizedpages',
                        type: this.i18n.msg('dashboardHelp-linkcontent').plain(),
                        action: {
                            href: mw.util.getUrl('Special:UncategorizedPages') // or Special:Insights/uncategorizedpages
                        }
                    }),
                ]
            });
        },
        getUserInfo: function() {
            var deferred = new $.Deferred();
            var self = this;

            var LANGCENTRALS = ['de', 'es', 'fr', 'it', 'ja', 'pl', 'pt', 'ru', 'zh'];
            var search = LANGCENTRALS.indexOf( this.config.wgUserLanguage.split( '-' )[0] );
            if (search === -1) {
                search = LANGCENTRALS.indexOf( geo.getCountryCode().toLowerCase().split( '-' )[0] );
            }

            var langcentral = search !== -1 ? LANGCENTRALS[search] : false;

            $.when(
                this.api.get({
                    action: 'query',
                    meta: 'userinfo',
                    uiprop: 'email|options'
                }),
                this.api.get({
                    action: 'query',
                    titles: 'User:' + this.config.wgUserName
                }),
                $.ajax({
                    type: 'GET',
                    url: 'https://community.fandom.com/api.php',
                    data: {
                        action: 'query',
                        titles: 'User:' + this.config.wgUserName,
                        format: 'json'
                    },
                    dataType: 'jsonp'
                }),
                $.ajax({
                    type: 'GET',
                    url: mw.util.getUrl('Special:Editcount/' + this.config.wgUserName)
                }),
                langcentral ? $.ajax({
                    type: 'GET',
                    url: 'https://community.fandom.com/' + langcentral + '/api.php',
                    data: {
                        action: 'query',
                        titles: 'User:' + this.config.wgUserName,
                        format: 'json'
                    },
                    dataType: 'jsonp'
                }) : new $.Deferred().resolve([{ error: true }])
            ).done(function(userinfo, localuserpage, centraluserpage, globaleditcount, langcentraluserpage) {
                var result = !userinfo[0].error ? userinfo[0].query.userinfo : {};
                result.localuserpage = !localuserpage[0].error && localuserpage[0].query.pages && !Object.values(localuserpage[0].query.pages)[0].hasOwnProperty('missing');
                result.centraluserpage = !centraluserpage[0].error && centraluserpage[0].query.pages && !Object.values(centraluserpage[0].query.pages)[0].hasOwnProperty('missing');
                result.globaleditcount = Number.parseInt($('.TablePager > tbody > tr:nth-child(2) > th:nth-child(4)', globaleditcount[0]).text().replace(/,/g, ''));
                result.langcentral = langcentral;
                result.langcentraluserpage = !langcentraluserpage[0].error && langcentraluserpage[0].query.pages && !Object.values(langcentraluserpage[0].query.pages)[0].hasOwnProperty('missing');

                if (localStorage.getItem('Dashboard-trackAddEmail') && result.emailauthenticated) {
                    self.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'addemail'
                    });
                    localStorage.removeItem('Dashboard-trackAddEmail');
                }
                if (localStorage.getItem('Dashboard-trackConfirmEmail') && result.emailauthenticated) {
                    self.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'confirmemail'
                    });
                    localStorage.removeItem('Dashboard-trackConfirmEmail');
                }
                if (localStorage.getItem('Dashboard-trackCentralUserPage') && result.centraluserpage) {
                    self.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'centraluserpage'
                    });
                    localStorage.removeItem('Dashboard-trackCentralUserPage');
                }
                if (localStorage.getItem('Dashboard-trackLocalUserPage') && result.localuserpage) {
                    self.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'localuserpage'
                    });
                    localStorage.removeItem('Dashboard-trackLocalUserPage');
                }
                if (localStorage.getItem('Dashboard-trackLangCentralUserPage') && result.langcentraluserpage) {
                    self.track({
                        action: tracker.ACTIONS.SUCCESS,
                        label: 'langcentraluserpage'
                    });
                    localStorage.removeItem('Dashboard-trackLangCentralUserPage');
                }

                self.user = result;
                deferred.resolve(result);
            });

            return deferred;
        }
    };

    mw.hook('dev.ui').add(Dashboard.preload.bind(Dashboard));
    mw.hook('dev.i18n').add(Dashboard.preload.bind(Dashboard));
    mw.hook('dev.wds').add(Dashboard.preload.bind(Dashboard));
    mw.loader.using(['mediawiki.util', 'mediawiki.api']).done(Dashboard.preload.bind(Dashboard));

    // Load dependencies
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:Dashboard.css'
    });

    window.Dashboard = {
        Section: DashboardSection,
        Card: DashboardCard,
        ProfileCard: DashboardProfileCard,
        ContributeCard: DashboardContributeCard
    };
});