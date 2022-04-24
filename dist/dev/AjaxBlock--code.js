/*
 * AjaxBlock ([[w:c:dev:AjaxBlock]])
 *
 * @author: Dorumin (https://dev.fandom.com/wiki/User:Dorumin)
 * @scope: Personal use
 * @description: Allows user blocking without leaving the current page.
 * @update 2016-05-04 Doru: Now detects block and unblock links that were added after window onload.
 * @update 2016-05-22 Doru: Now supports unblocking IDs + a few minor changes.
 * @update 2016-06-03 Doru: Now supports the incredibly rare and useless Special:Block?wpTarget=<user> links,
 *                          This script will not run if it was initialized already, or if you right click the link,
 *                          You now have retry, unblock, and re-block links on banner notifications,
 *                          Fixed bug while blocking IDs.
 * @update 2017-09-01 Doru: Adding i18n, option group support, and some code clean-up.
 * @update 2020-10-20 Thundercraft5: Adding UCP support, some new features, as well as general improvements.
 *
 * @update 2020-10-25 Doru: Rewrite, remove badly thought out features, remove QDModal in favor of Modal-js, fix bugs, implement new loader
 */

(function() {
    if (window.AjaxBlock && window.AjaxBlock.loaded) return;

    var ui;

    window.AjaxBlock = $.extend({
        loaded: true,

        // Config options and defaults
        expiryTimes: null,
        blockReasons: null,
        unblockReasons: null,
        check: {
            talk: false,
            autoBlock: false,
            override: true,
            noCreate: true
        },

        // Globals
        wg: mw.config.get([
            'wgUserGroups',
            'wgNamespaceIds',
            'wgArticlePath'
        ]),
        $currentModal: null,

        // Resource management
        loading: [
            'css',
            'api',
            'i18n',
            'i18n-js',
            'scm',
            'banners',
            'dorui',
            'expiry-times',
            'block-reasons',
            'aliases'
        ],
        onload: function(key, arg) {
            switch (key) {
                case 'i18n-js':
                    arg.loadMessages('AjaxBlock').then(this.onload.bind(this, 'i18n'));
                    break;
                case 'i18n':
                    this.i18n = arg;
                    break;
                case 'api':
                    this.api = new mw.Api();
                    this.ensureBlockSelects();
                    this.loadSpecialPageAliases();
                    break;
                case 'dorui':
                    ui = arg;
                    break;
                case 'banners':
                    this.BannerNotification = arg;
                    break;
            }

            var index = this.loading.indexOf(key);
            if (index === -1) throw new Error('Unregistered dependency loaded: ' + key);

            this.loading.splice(index, 1);

            if (this.loading.length !== 0) return;

            this.init();
        },
        canRun: function() {
            return this.hasRights([
                'sysop',
                'staff',
                'helper',
                'global-discussions-moderator',
                'wiki-representative',
                'wiki-specialist',
                'soap'
            ]);
        },
        hasRights: function(rights) {
            var len = rights.length;
            while (len--) {
                if (this.wg.wgUserGroups.indexOf(rights[len]) !== -1) return true;
            }

            return false;
        },
        preload: function() {
            // Styles
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:AjaxBlock.css'
            }).then(this.onload.bind(this, 'css'));

            // Libraries
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:ShowCustomModal.js',
                    'u:dev:MediaWiki:BannerNotification.js',
                    'u:dev:MediaWiki:Dorui.js',
                ]
            });

            mw.hook('dev.showCustomModal').add(this.onload.bind(this, 'scm'));
            mw.hook('dev.banners').add(this.onload.bind(this, 'banners'));
            mw.hook('dev.i18n').add(this.onload.bind(this, 'i18n-js'));
            mw.hook('doru.ui').add(this.onload.bind(this, 'dorui'));

            // Loader modules
            mw.loader.using('mediawiki.api').then(this.onload.bind(this, 'api'));
        },
        ensureBlockSelects: function() {
            var pagesToLoad = [];

            if (this.expiryTimes === null) {
                pagesToLoad.push('Ipboptions');
            } else {
                this.onload('expiry-times');
            }

            if (this.blockReasons === null) {
                pagesToLoad.push('Ipbreason-dropdown');
            } else {
                this.onload('block-reasons');
            }

            if (pagesToLoad.length === 0) return;

            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: pagesToLoad.join('|')
            }).then(function(data) {
                data.query.allmessages.forEach(function(message) {
                    var wikitext = message['*'];

                    switch (message.name) {
                        case 'Ipboptions':
                            this.expiryTimes = this.parseExpiryTimes(wikitext);
                            this.onload('expiry-times');
                            break;
                        case 'Ipbreason-dropdown':
                            this.blockReasons = this.parseBlockReasons(wikitext);
                            this.onload('block-reasons');
                            break;
                    }
                }.bind(this));
            }.bind(this));
        },
        parseExpiryTimes: function(wikitext) {
            var expiryTimes = {};

            wikitext.split(',').forEach(function(item) {
                var pair = item.split(':');
                var label = pair[0];
                var value = pair[1];

                expiryTimes[value] = label;
            });

            return expiryTimes;
        },
        parseBlockReasons: function(wikitext) {
            var lines = wikitext.split('\n');
            var reasons = {};
            var currentGroup = null;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                if (line.trim() === '') continue;

                var type = '';

                if (line.charAt(0) === '*') {
                    if (line.charAt(1) === '*') {
                        type = 'sub';
                    } else {
                        type = 'group';
                    }
                } else {
                    type = 'reason';
                }

                switch (type) {
                    case 'reason':
                        if (currentGroup !== null && !this.isEmptyObject(currentGroup.reasons)) {
                            reasons[currentGroup.label] = currentGroup.reasons;
                        }

                        currentGroup = null;

                        var value = line.trim();
                        reasons[value] = value;
                        break;
                    case 'group':
                        if (currentGroup !== null && !this.isEmptyObject(currentGroup.reasons)) {
                            reasons[currentGroup.label] = currentGroup.reasons;
                        }

                        var label = line.slice(1).trim();

                        currentGroup = {
                            label: label,
                            reasons: {}
                        };
                        break;
                    case 'sub':
                        var value = line.slice(2).trim();

                        if (currentGroup !== null) {
                            currentGroup.reasons[value] = value;
                        } else {
                            reasons[value] = value;
                        }
                        break;
                }
            }

            if (currentGroup !== null && !this.isEmptyObject(currentGroup.reasons)) {
                reasons[currentGroup.label] = currentGroup.reasons;
            }

            return reasons;
        },
        isEmptyObject: function(obj) {
            for (var _ in obj) {
                return false;
            }

            return true;
        },
        loadSpecialPageAliases: function() {
            this.api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'specialpagealiases'
            }).then(function(data) {
                this.blockAliases = this.getPageAliases(data.query.specialpagealiases, 'Block');
                this.unblockAliases = this.getPageAliases(data.query.specialpagealiases, 'Unblock');

                this.onload('aliases');
            }.bind(this));
        },
        getPageAliases: function(aliases, name) {
            return aliases.find(function(page) {
                return page.realname === name;
            }).aliases.map(function(alias) {
                return alias.toLowerCase();
            });
        },
        onDocumentClick: function(e) {
            // Left click
            if (e.which !== 1) return;

            // Bail out of meta keys
            if (e.ctrlKey || e.shiftKey) return;

            // Only if a link was clicked
            var anchor = e.target.closest('a[href]');
            if (anchor === null) return;

            var uri = new mw.Uri(anchor.href);
            var target = this.getPageName(uri.path);
            if (target === '') return;

            var specialNamespace = this.specialNamespaceAliases.find(function(alias) {
                return target.slice(0, alias.length + 1).toLowerCase() == alias + ':';
            });
            if (specialNamespace === undefined) return;

            var title = target.slice(specialNamespace.length + 1);
            var lowerTitle = title.toLowerCase();
            var isBlocking = this.blockAliases.some(this.isRootPage.bind(this, lowerTitle));
            var isUnblocking = this.unblockAliases.some(this.isRootPage.bind(this, lowerTitle));

            if (!isBlocking && !isUnblocking) return;

            var userTarget = this.getBlockTarget(uri, title);
            // It was a regular Special:Block link, ignore it
            if (!userTarget) return;

            e.preventDefault();

            if (isBlocking) {
                this.showBlockModal(userTarget);
            } else {
                this.showUnblockModal(userTarget);
            }
        },
        getPageName: function(path) {
            var root = this.wg.wgArticlePath.replace('$1', '');
            if (path.slice(0, root.length) !== root) return '';

            return path.slice(root.length);
        },
        isRootPage: function(title, alias) {
            // Special:Block
            if (title === alias) return true;

            // Special:Block/Something
            if (title.slice(0, alias.length + 1) === alias + '/') return true;

            return false;
        },
        getBlockTarget: function(uri, title) {
            // wpTarget query parameter takes priority
            if (uri.query.wpTarget) {
                return uri.query.wpTarget;
            }

            var parts = title.split('/');

            // Block link with no target
            if (parts.length === 1) {
                return undefined;
            }

            return decodeURIComponent(parts[1]).replace(/_/g, ' ');
        },
        buildSelectChildren: function(data) {
            var children = [
                ui.option({
                    value: 'other',
                    text: this.i18n.msg('other').plain()
                })
            ];

            for (var key in data) {
                var value = data[key];

                if (typeof value === 'string') {
                    children.push(
                        ui.option({
                            value: key,
                            text: value
                        })
                    );
                } else {
                    var subChildren = [];

                    for (var subKey in value) {
                        var subValue = value[subKey];

                        subChildren.push(
                            ui.option({
                                value: subKey,
                                text: subValue
                            })
                        );
                    }

                    var group = ui.optgroup({
                        label: key,
                        children: subChildren
                    });

                    children.push(group);
                }
            }

            return children;
        },
        buildCheckbox: function(data) {
            var attrs = {
                type: 'checkbox',
                id: data.id
            };

            if (data.checked) {
                attrs.checked = 'checked';
            }

            return ui.div({
                children: [
                    ui.input({
                        attrs: attrs
                    }),
                    ui.label({
                        'for': data.id,
                        text: data.label
                    })
                ]
            });
        },
        showBlockModal: function(username) {
            var $modal = this.showModal(this.i18n.msg('block-title', username).escape(), {
                id: 'BlockModal',
                content: ui.div({
                    id: 'AjaxBlockModalContent',
                    children: [
                        ui.div({
                            id: 'AjaxBlockExpiryWrapper',
                            children: [
                                this.i18n.msg('expiry').plain(),
                                ui.select({
                                    id: 'AjaxBlockExpirySelect',
                                    children: this.buildSelectChildren(this.expiryTimes)
                                }),
                                ui.input({
                                    id: 'AjaxBlockExpiryInput'
                                })
                            ]
                        }),
                        ui.div({
                            id: 'AjaxBlockReasonWrapper',
                            children: [
                                this.i18n.msg('reason').plain(),
                                ui.select({
                                    id: 'AjaxBlockReasonSelect',
                                    children: this.buildSelectChildren(this.blockReasons)
                                }),
                                ui.input({
                                    id: 'AjaxBlockReasonInput'
                                })
                            ]
                        }),
                        ui.div({
                            id: 'AjaxBlockCheckers',
                            children: [
                                this.buildCheckbox({
                                    id: 'AjaxBlockDisableWall',
                                    checked: this.check.talk,
                                    label: this.i18n.msg('label-disable-wall').plain()
                                }),
                                this.buildCheckbox({
                                    id: 'AjaxBlockAutoBlock',
                                    checked: this.check.autoblock || this.check.autoBlock,
                                    label: this.i18n.msg('label-auto-block').plain()
                                }),
                                this.buildCheckbox({
                                    id: 'AjaxBlockDisableAccount',
                                    checked: this.check.nocreate || this.check.noCreate,
                                    label: this.i18n.msg('label-no-create').plain()
                                }),
                                this.buildCheckbox({
                                    id: 'AjaxBlockOverrideBlock',
                                    checked: this.check.override,
                                    label: this.i18n.msg('label-override').plain()
                                })
                            ]
                        })
                    ]
                }),
                buttons: [
                    {
                        defaultButton: true,
                        message: this.i18n.msg('block-button').escape(),
                        handler: function() {
                            var state = this.getModalState(username);

                            if (state.expiry === '') {
                                this.notify({
                                    type: 'warn',
                                    text: this.i18n.msg('error-no-expiry').plain()
                                });
                                return;
                            }

                            this.block(state).then(function(data) {
                                dev.showCustomModal.closeModal($modal);

                                if (data.error) {
                                    this.notify({
                                        type: 'error',
                                        text: this.i18n.msg('error-block', username, data.error.info).plain()
                                    });
                                } else {
                                    this.notify({
                                        type: 'confirm',
                                        text: this.i18n.msg('success-block', username).plain()
                                    });

                                    setTimeout(function() {
                                        dev.showCustomModal.closeModal($modal);
                                    }, 3000);
                                }
                            }.bind(this)).fail(function(code, data) {
                                var error = data.error && data.error.info || code;

                                this.notify({
                                    type: 'error',
                                    text: this.i18n.msg('error-block', username, error).plain()
                                });
                            }.bind(this));
                        }.bind(this)
                    },
                    {
                        message: this.i18n.msg('cancel-button').escape(),
                        handler: function() {
                            dev.showCustomModal.closeModal($modal);
                        }
                    }
                ]
            });
        },
        showUnblockModal: function(username) {
            var $modal = this.showModal(this.i18n.msg('unblock-title', username).escape(), {
                id: 'UnblockModal',
                content: ui.div({
                    id: 'AjaxUnblockModalContent',
                    children: [
                        ui.div({
                            id: 'AjaxBlockReasonWrapper',
                            children: [
                                this.i18n.msg('reason').plain(),
                                this.unblockReasons && ui.select({
                                    id: 'AjaxUnblockReasonSelect',
                                    children: this.buildSelectChildren(this.unblockReasons)
                                }),
                                ui.input({
                                    id: 'AjaxUnblockReasonInput'
                                })
                            ]
                        })
                    ]
                }),
                buttons: [
                    {
                        defaultButton: true,
                        message: this.i18n.msg('unblock-button').escape(),
                        handler: function() {
                            var state = this.getModalState(username);

                            this.unblock(state).then(function(data) {

                                if (data.error) {
                                    this.notify({
                                        type: 'error',
                                        text: this.i18n.msg('error-unblock', username, data.error.info).plain()
                                    });
                                } else {
                                    this.notify({
                                        type: 'confirm',
                                        text: this.i18n.msg('success-unblock', username).plain()
                                    });

                                    setTimeout(function() {
                                        dev.showCustomModal.closeModal($modal);
                                    }, 3000);
                                }
                            }.bind(this)).fail(function(code, data) {
                                var error = data.error && data.error.info || code;

                                this.notify({
                                    type: 'error',
                                    text: this.i18n.msg('error-unblock', username, error).plain()
                                });
                            }.bind(this));
                        }.bind(this)
                    },
                    {
                        message: this.i18n.msg('cancel-button').escape(),
                        handler: function() {
                            dev.showCustomModal.closeModal($modal);
                        }
                    }
                ]
            });
        },
        showModal: function(title, options) {
            var $modal = dev.showCustomModal(title, options);

            this.$currentModal = $modal;

            return $modal;
        },
        getModalState: function(username) {
            var $modal = this.$currentModal;
            var $reason = $modal.find('#AjaxBlockReasonWrapper');
            var $expiry = $modal.find('#AjaxBlockExpiryWrapper');
            var $checkboxes = $modal.find('input[type="checkbox"]');
            var data = {
                username: username,
                checkboxes: {}
            };

            if ($reason.length) {
                var $select = $reason.find('select');
                var $input = $reason.find('input');

                if ($select.length === 0 || $select.val() === 'other') {
                    data.reason = $input.val();
                } else {
                    if ($input.val().trim() === '') {
                        data.reason = $select.val();
                    } else {
                        data.reason = $select.val() + ': ' + $input.val().trim();
                    }
                }
            }

            if ($expiry.length) {
                var $select = $expiry.find('select');
                var $input = $expiry.find('input');
                data.expiry = $select.val() === 'other'
                    ? $input.val()
                    : $select.val();
            }

            $checkboxes.each(function() {
                data.checkboxes[this.id] = this.checked;
            });

            return data;
        },
        notify: function(data) {
            new this.BannerNotification(data.text, data.type).show();
        },
        block: function(data) {
            var query = {
                action: 'block',
                user: data.username,
                expiry: data.expiry,
                reason: data.reason,
                token: mw.user.tokens.get('csrfToken'),
            };

            if (!data.checkboxes.AjaxBlockDisableWall) {
                query.allowusertalk = true;
            }

            if (data.checkboxes.AjaxBlockAutoBlock) {
                query.autoblock = true;
            }

            if (data.checkboxes.AjaxBlockOverrideBlock) {
                query.reblock = true;
            }

            if (data.checkboxes.AjaxBlockDisableAccount) {
                query.nocreate = true;
            }

            if (!data.checkboxes.AjaxBlockAutoBlock) {
                query.anononly = true;
            }

            return this.api.post(query);
        },
        unblock: function(data) {
            var query = {
                action: 'unblock',
                reason: data.reason,
                token: mw.user.tokens.get('csrfToken')
            };

            if (data.username.charAt(0) == '#') {
                query.id = data.username.slice(1);
            } else {
                query.user = data.username;
            }

            return this.api.post(query);
        },

        // Entrypoint
        init: function() {
            this.specialNamespaceAliases = Object.keys(this.wg.wgNamespaceIds).filter(function(key) {
                return this.wg.wgNamespaceIds[key] === -1;
            }.bind(this));

            document.addEventListener('click', this.onDocumentClick.bind(this));
        }
    }, window.AjaxBlock);

    if (!AjaxBlock.canRun()) return;

    AjaxBlock.preload();
})();