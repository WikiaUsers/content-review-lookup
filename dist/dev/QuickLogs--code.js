/* QuickLogs
 *
 * Displays user logs on Special:Contributions
 * 
 * @author Slyst
 */
 
(function() {
    // Scoping and double runs
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' ||
        (window.QuickLogs && window.QuickLogs.loaded)
    ) {
        return;
    }
 
    var QuickLogs = {
        /// The name of the user whose contributions you're looking at
        user: $('#UserProfileMasthead h1[itemprop="name"]').text(),
        /// The wikia user ID of the user you're looking at
        /// Only is defined when the current user is a chat moderator or above,
        /// but that's fine because you only need it in those cases
        userId: $('.chat-change-ban').data('user-id'),
        /// Plain object holding mediawiki config values (and stylepath :P)
        cfg: mw.config.get([
            'wgMonthNames',
            'wgUserGroups',
            'wgUserName',
            'stylepath'
        ]),
        /// Reference to #quicklogs-ul
        ul: null,
        /// Double-run safety net
        loaded: true,
        /// Whether render was called or not
        built: false,
        /// Whether message walls are enabled in the current wiki
        walls: false,
        /// Whether Abuse Filter is enabled in the current wiki
        abuseFilter: false,
        /// Whether the current user can checkUser, this is defined at runtime by checking if there was a CU link before loading
        checkUser: $('#contentSub [title="Special:CheckUser"]').exists(),
        /// Whether chat exists on the wiki
        chat: $('.chat-ban-log').exists(),
        /// Internal variable for handling preloading
        _loads: 0,
        /// Called each time a resource is fetched
        preload: function() {
            if (++this._loads === 3) {
                this.init();
            }
        },
        /// Returns whether you're looking at your own contributions
        ownPage: function() {
            return this.user == this.cfg.wgUserName;
        },
        /// Returns whether you're not looking at your contribs and another function of passed
        notOwnPageAnd: function(check) {
            return !this.ownPage() && $.proxy(check, this)();
        },
        /// Returns whether the current user has any of the rights provided
        hasRights: function(rights) {
            var len = rights.length;
            while (len--) {
                if (this.cfg.wgUserGroups.indexOf(rights[len]) != -1) return true;
            }
            return false;
        },
        /// Returns whether the user has classic admin rights
        isAdmin: function() {
            return this.hasRights([
                'bureaucrat',
                'sysop',
                'helper',
                'vstf',
                'staff',
                'global-discussions-moderator',
                'content-team-member',
                'wiki-manager',
            ]);
        },
        /// Returns whether the user can view deleted contributions
        canViewDeletedRevs: function() {
            return this.isAdmin() || this.hasRights(['content-moderator']);
        },
        /// Returns whether the user has classic chat mod rights
        isChatMod: function() {
            return this.chat && this.hasRights([
                    'chatmoderator',
                    'threadmoderator',
                    'sysop',
                    'helper',
                    'staff',
                    'vstf',
                    'content-team-member',
                    'wiki-manager',
               ]);
        },
        /// Returns whether the user has any roles that could be self-removed, or a helper/staff/vstf
        hasNotableRoles: function() {
            return this.hasRights([
                'bureaucrat',
                'sysop',
                'content-moderator',
                'threadmoderator',
                'chatmoderator',
                'rollback',
                'bot',
                'global-discussions-moderator',
                'wiki-manager',
                'vanguard',
                'helper',
                'staff',
                'vstf'
            ]);
        },
        /// Returns an anchor element with the supplied href and text, optionally striked-through
        makeLink: function(href, text, striked, attr) {
            return {
                type: 'a',
                classes: striked === false ? [] : ['link'],
                attr: $.extend({
                    href: href
                }, attr),
                text: text
            };
        },
        /// Returns an anchor element that calls this.load on click
        makeLogLink: function(logType) {
            var log = this.logTypes[logType];
            return {
                type: 'a',
                classes: ['quicklogs'].concat(log.classes || []),
                attr: {
                    'data-log': logType
                },
                events: {
                    click: this.load.bind(this, logType),
                },
                text: log.message || this.i18n.msg(log.key || logType + '-log').plain()
            };
        },
        /// Toggles the selected class and calls the custom click handler or the default this.loadLogs
        load: function(logType, e) {
            if (e.target.classList && e.target.classList.contains('selected')) return;
            var log = this.logTypes[logType];
            if (log.click) {
                return log.click(logType, log);
            }
            return this.loadLogs(logType, log);
        },
        /// Removes all currently selected quicklogs links and selects the one with the provided data-log attribute
        setSelectedLog: function(logType) {
            this.ul.className = 'displaying-' + logType;
            $('.quicklogs.selected').removeClass('selected');
            $('.quicklogs[data-log="' + logType + '"]').addClass('selected');
        },
        /// Clears the content of this.ul, begins a loading animation and sets the header text to loading
        startLoading: function() {
            this.ul.innerHTML = '';
            this.header.textContent = this.i18n.msg('loading').plain();
            dev.ui({
                type: 'img',
                style: {
                    display: 'block',
                    margin: '0 auto'
                },
                attr: {
                    src: this.cfg.stylepath + '/common/images/ajax.gif'
                },
                parent: this.ul
            });
        },
        /// Loads classic log events by type
        loadLogs: function(logType, log) {
            this.startLoading();
            this.setSelectedLog(logType);
            var obj = {
                action: 'query',
                list: 'logevents',
                leprop: 'title|user|timestamp|type|parsedcomment|details',
                lelimit: 'max'
            };
            if (logType != 'logs') {
                obj.letype = logType;
            }
            if (log.by) {
                obj.leuser = log.by;
            }
            if (log.title) {
                obj.letitle = 'User:' + log.title;
            }
            return this.api.get(obj)
                .then(this.displayLogs.bind(this, logType, log));
        },
        /// Loads abuse log entries
        loadAbuseLog: function(logType, log) {
            this.startLoading();
            this.setSelectedLog(logType);
            this.api.get({
                action: 'query',
                list: 'abuselog',
                afluser: this.user,
                afllimit: 'max',
                aflprop: 'ids|filter|user|title|action|result|timestamp|hidden'
            })
            .then(this.displayLogs.bind(this, logType, log));
        },
        /// Loads deletedrevs entries
        loadDeletedContribs: function(logType, log) {
            this.startLoading();
            this.setSelectedLog(logType);
            this.api.get({
                action: 'query',
                list: 'deletedrevs',
                druser: this.user,
                drlimit: 'max',
                drprop: 'parsedcomment'
            })
            .then(this.displayLogs.bind(this, logType, log));
        },
        /// Displays any kind of log event
        displayLogs: function(logType, log, data) {
            var le = data.query && data.query.logevents || data.query.abuselog || data.query.deletedrevs,
            children = [];
            
            if (this.ul.className != 'displaying-' + logType) return;
 
            if (data.error) {
                children.push({
                    type: 'li',
                    text: this.i18n.msg('error', data.error.info, data.error.code).plain()
                });
                this.header.textContent = this.i18n.msg('error-header', logType).plain();
            } else if ($.isEmptyObject(le)) {
                children.push({
                    type: 'li',
                    text: this.i18n.msg('no-logs').plain()
                });
                this.header.textContent = this.i18n.msg('logs-header-selected', logType).plain();
            } else {
                for (var i in le) {
                    var html = this.format(le[i]);
                    if (html) {
                        children.push({
                            type: 'li',
                            html: this.format(le[i])
                        });
                    }
                }
                if (data['query-continue']) {
                    children.push({
                        type: 'li',
                        children: [
                            {
                                type: 'a',
                                attr: {
                                    href: {
                                        logs: mw.util.getUrl('Special:Log/' + this.user),
                                        upload: mw.util.getUrl('Special:ListFiles/' + this.user),
                                        abuse: mw.util.getUrl('Special:AbuseLog', {
                                            wpSearchUser: this.user
                                        })
                                    }[logType] ||
                                        mw.util.getUrl('Special:Logs/' + logType, {
                                            user: log.by,
                                            title: log.title
                                        }),
                                },
                                text: this.i18n.msg('see-more').plain()
                            }
                        ]
                    });
                }
                this.header.textContent = this.i18n.msg('logs-header-selected', logType).plain();
            }
 
            this.ul.innerHTML = '';
            dev.ui({
                children: children,
                parent: this.ul
            });
        },
        /// Formats a log event into an HTML string
        format: function(ev) {
            if (ev.move && ev.move.suppressedredirect) {
                ev.action += '-without-redirect';
            }
 
            if (ev.action == 'move_redir') {
                ev.action = 'move';
            }
 
            if (ev.action == 'patrol' && ev.patrol.auto) {
                ev.action += '-auto';
            }
 
            if (ev.filter) {
                ev.action = 'abuse';
            }
 
            if (!this.hasMessage('format-' + ev.action)) {
                console.log('Missing format for ' + ev.action + '. Consider reporting this on w:dev:Talk:QuickLogs');
                return '';
            }
 
            var date = this.date(ev.timestamp || ev.revisions[0].timestamp),
            userLinks = this.userLinks(ev.user, true),
            target = dev.ui({
                type: 'a',
                attr: {
                    href: mw.util.getUrl('User:' + this.user)
                },
                text: this.user
            }).outerHTML,
            page = dev.ui({
                type: 'a',
                attr: {
                    href: mw.util.getUrl(ev.title)
                },
                text: ev.title
            }).outerHTML,
            newTitle = !ev.move ? '' : dev.ui({
                type: 'a',
                attr: {
                    href: mw.util.getUrl(ev.move.new_title)
                },
                text: ev.move.new_title
            }).outerHTML,
            revision = !ev.patrol ? '' : dev.ui({
                type: 'a',
                attr: {
                    href: '/?diff=' + ev.patrol.cur
                },
                text: ev.patrol.cur.toString()
            }).outerHTML,
            comment = !ev.parsedcomment ? '' : dev.ui({
                type: 'span',
                classes: ['comment'],
                html: '(' + ev.parsedcomment + ')'
            }).outerHTML,
            list = !ev.filter ? '' : dev.ui({
                type: 'ul',
                children: [
                    {
                        type: 'li',
                        text: this.i18n.msg('action', ev.action).plain()
                    },
                    {
                        type: 'li',
                        text: this.i18n.msg('actions-taken', ev.result).plain()
                    },
                    {
                        type: 'li',
                        text: this.i18n.msg('description', ev.filter).plain()
                    }
                ]
            }).outerHTML,
            rights = ev.rights ? this.parseRights(ev.rights) : {},
            oldrights = rights.oldstr,
            newrights = rights.newstr,
            before = ev[1],
            after = ev[0],
            expiry = ev.action.indexOf('chatban') === 0 && ev[2] ? ev[2] : '',
            ends = ev.action.indexOf('chatban') === 0 && ev[3] ? this.date(ev[3] * 1000) : '',
            duration = ev.block && ev.block.duration ? ev.block.duration : '',
            flags = ev.block && ev.block.flags ? ' (' + ev.block.flags.replace(/,/g, ', ') + ') ' : '';
            
            if (ev.block || ev.type == 'chatban') {
                target = page;
            }
 
            return this.parse('format-' + ev.action, {
                date: date,
                userLinks: userLinks,
                target: target,
                page: page,
                newTitle: newTitle,
                revision: revision,
                comment: comment,
                oldrights: oldrights,
                newrights: newrights,
                expiry: expiry,
                duration: duration,
                flags: flags,
                list: list,
                ends: ends,
                before: before,
                after: after
            });
        },
        /// Parses named parameters that aren't currently supported in i18n-js
        parse: function(msg, obj) {
            return this.i18n.msg(msg).escape().replace(/\$([a-z]+)/gi, function(fullMatch, identifier) {
                return obj[identifier] || '';
            }).trim().replace(/(\s)+/g, function(_, first) {
                return first;
            });
        },
        /// Returns an object with old and new user rights strings, with changed groups highlighted
        parseRights: function(rights) {
            var oldarr = rights.old.split(', '),
            newarr = rights['new'].split(', ');
 
            return {
                oldstr: oldarr.map(function(group) {
                    if (group && newarr.indexOf(group) == -1) return '<span class="quicklogs-group-diff">' + group + '</span>';
                    return group;
                }).join(', ') || this.i18n.msg('none').escape(),
                newstr: newarr.map(function(group) {
                    if (group && oldarr.indexOf(group) == -1) return '<span class="quicklogs-group-diff">' + group + '</span>';
                    return group;
                }).join(', ') || this.i18n.msg('none').escape()
            };
        },
        /// Returns whether the provided key is missing completely in translation. This does not include fallbacks to en.
        hasMessage: function(key) {
            return this.i18n.msg(key).plain() != '<' + key + '>';
        },
        /// Returns a date string defined by the specification in format-date
        date: function(timestamp) {
            var date = new Date(timestamp),
            pad = function(n) {
                return ('0' + n).slice(-2);
            };
            return this.parse('format-date', {
                hours: pad(date.getUTCHours()),
                minutes: pad(date.getUTCMinutes()),
                seconds: pad(date.getUTCSeconds()),
                date: date.getUTCDate(),
                year: date.getUTCFullYear(),
                month: this.cfg.wgMonthNames[date.getUTCMonth() + 1]
            });
        },
        /// Generates a link to {user}'s userpage
        /// If subpages is true then there will be additional talk, contribs, and block (if admin) links.
        userLinks: function(user, subpages) {
            nodes = [
                {
                    type: 'a',
                    attr: {
                        href: mw.util.getUrl('User:' + user)
                    },
                    text: user
                }
            ];
            if (subpages) {
                nodes.push(
                    ' (',
                    this.walls
                      ? {
                            type: 'a',
                            attr: {
                                href: mw.util.getUrl('Message Wall:' + user)
                            },
                            text: this.i18n.msg('wall').plain()
                        }
                      : {
                            type: 'a',
                            attr: {
                                href: mw.util.getUrl('User talk:' + user)
                            },
                            text: this.i18n.msg('talk').plain()
                        },
                    ' | ',
                    {
                        type: 'a',
                        attr: {
                            href: mw.util.getUrl('Special:Contributions/' + user)
                        },
                        text: this.i18n.msg('contribs').plain()
                    }
                );
                if (this.isAdmin()) {
                    nodes.push(
                        ' | ',
                        {
                            type: 'a',
                            attr: {
                                href: mw.util.getUrl('Special:Block/' + user)
                            },
                            text: this.i18n.msg('block').plain()
                        }
                    );
                }
                nodes.push(')');
            }
            return dev.ui({
                type: 'div', // Document fragments don't implement innerHTML, much sad
                children: nodes
            }).innerHTML;
        },
        /// ext.Chat2.ChatBanModal but it's faster
        /// FIXME: Try opening, closing, and opening it again
        showBanModal: function() {
            if (this.modal) {
                this.modal.show();
            }
        },
        preloadModal: function(uiFactory) {
            $.when(
                this.getModalData(),
                uiFactory.init(['modal'])
            ).then($.proxy(this.createModal, this));
        },
        getModalData: function() {
            return $.get(mw.util.wikiScript('index'), {
                action: 'ajax',
                rs: 'ChatAjax',
                method: 'BanModal'
            });
        },
        createModal: function(data, uiModal) {
            this.modalHTML = data[0].template;
            this.uiModal = uiModal;
            this.modal = this.initModal();
        },
        initModal: function() {
            this.uiModal.createComponent({
                type: 'default',
                vars: {
                    id: 'ChatBanModal',
                    size: 'small',
                    content: this.modalHTML,
                    title: mw.message('chat-ban-modal-change-ban-heading').plain(),
                    buttons: [
                        {
                            vars: {
                                value: mw.message('chat-ban-modal-button-ok').escaped(),
                                classes: ['normal', 'primary'],
                                data: [
                                    {
                                        key: 'event',
                                        value: 'ok'
                                    }
                                ]
                            }
                        },
                        {
                            vars: {
                                value: mw.message('chat-ban-modal-button-cancel').escaped(),
                                data: [
                                    {
                                        key: 'event',
                                        value: 'close'
                                    }
                                ]
                            }
                        }
                    ]
                }
            }, $.proxy(this.cbInitModal, this));
        },
        cbInitModal: function(modal) {
            this.modal = modal;
            modal.$element
                .find('input[name=reason]')
                .placeholder()
                .keydown($.proxy(this.cbKeydown, this));
            modal.bind('ok', $.proxy(this.cbModal, this));
        },
        cbModal: function(event) {
            event.preventDefault();
            var $element = this.modal.$element;
            $.post(mw.util.wikiScript('index'), {
                action: 'ajax',
                rs: 'ChatAjax',
                method: 'blockOrBanChat',
                userToBanId: this.userId,
                time: $element.find('select[name=expires]').val(),
                reason: $element.find('input[name=reason]').val(),
                mode: 'global',
                token: mw.user.tokens.get('editToken')
            }, $.proxy(this.cbBan, this));
            this.modal.trigger('close');
            this.modal = null;
            setTimeout($.proxy(this.initModal, this), 500);
        },
        cbBan: function() {
            window.location.reload();
        },
        cbKeydown: function(event) {
            if (event.which === 13) {
                this.cbModal(event);
            }
        },
        /// Renders the QuickLogs UI inside #contentSub
        /// IMPORTANT: This function has the potential of being called multiple times, in case new quick links are registered,
        /// or called directly by another script to refresh the UI.
        render: function() {
            var i = 0,
            children = [
                this.i18n.msg('for').plain() + ' ',
                this.makeLink(mw.util.getUrl('User:' + this.user), this.user),
                ' ('
            ],
            contentSub = document.getElementById('contentSub'),
            logType,
            log;
 
            if (!contentSub) return; // wot
 
            while (logType = this.logOrder[i++]) {
                log = this.logTypes[logType];
 
                if (!log.check || log.check()) {
                    if (log.href) {
                        children.push(this.makeLink(log.href, log.message || this.i18n.msg(log.key).plain(), log.striked, log.attr));
                    } else {
                        children.push(this.makeLogLink(logType));
                    }
                    children.push(' | ');
                }
            }
 
            contentSub.innerHTML = '';
            contentSub.className += ' quicklogs__content-sub';
            children[children.length - 1] = ')';
            dev.ui({
                children: children,
                parent: contentSub
            });
 
            if (!this.built) {
                this.ul = dev.ui({
                    type: 'ul',
                    children: [
                        {
                            type: 'li',
                            text: this.i18n.msg('select-logs').plain()
                        }
                    ]
                });
                this.header = dev.ui({
                    type: 'div',
                    attr: {
                        id: 'quicklogs-head'
                    },
                    text: this.i18n.msg('logs-header').plain()
                });
                contentSub.parentElement.insertBefore(
                    dev.ui({
                        type: 'div',
                        attr: {
                            // This is dumb, this class is already used in contentSub, but I'm keeping it for legacy reasons
                            // Just make sure you use the ID to get this element
                            'class': 'quicklogs__content-sub',
                            id: 'quicklogs-container'
                        },
                        children: [
                            this.header,
                            {
                                type: 'div',
                                attr: {
                                    // SYKE IT WASNT AN UL, IT WAS JUST A CONTAINER
                                    id: 'quicklogs-ul'
                                },
                                children: [this.ul]
                            }
                        ]
                    }),
                    contentSub.nextElementSibling
                );
            }
 
            var built = this.built;
            this.built = true;
            
            mw.hook('QuickLogs.render').fire(QuickLogs);
            if (!built) {
                mw.hook('QuickLogs.render.first').fire(QuickLogs);
            }
        },
        /// For usage in other scripts, registers a new link for the QuickLogs toolbar and re-renders in necessary
        addLink: function(key, obj, index) {
            if (this.logTypes[key]) return false;
            this.logTypes[key] = obj;
            this.logOrder.splice(index === undefined ? this.logOrder.length : index, 0, key);

            if (this.built) {
                this.render();
            }
            return true;
        },
        /// For usage in other scripts, removes a registered link for the toolbar and re-renders
        removeLink: function(keyOrIndex, render) {
            var key,
            removed,
            index;
            if (typeof keyOrIndex === 'number') {
                key = this.logOrder.splice(keyOrIndex, 1)[0];
                removed = delete this.logTypes[key];
            } else {
                key = keyOrIndex;
                removed = delete this.logTypes[key];
                index = this.logOrder.indexOf(key);
                if (index != -1) {
                    this.logOrder.splice(index, 1);
                }
            }
            
            if (removed && this.built && render !== false) {
                this.render();
            }

            return removed;
        },
        // For usage in other scripts, removes multiple links
        removeLinks: function() {
            var i = arguments.length,
            removed;
            while (i--) {
                removed = removed || this.removeLink(arguments[i], false);
            }
            
            if (removed && this.built) {
                this.render();
            }
            
            return removed;
        },
        /// Function to be called after all necessary resources have been fetched
        init: function() {
            this.api = new mw.Api();
            this.render();
        },
        /// Check if AbuseFilter is enabled
        checkAF: function() {
            var promise = $.Deferred();
            $.get(mw.util.wikiScript('api'), {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'extensions',
                format: 'json'
            }).done(function(d) {
                promise.resolve(d.query.extensions.filter(function(ext) {
                    return ext.name == 'Abuse Filter';
                }).length > 0);
            });
            return promise;
        },
        /// Fork from WgMessageWallsExist because such script does not provide suitable bindings
        checkWall: function() {
            var promise = $.Deferred(),
            stupidWikis = ['177'];
            if (stupidWikis.indexOf(wgCityId) !== -1) return promise.resolve(true);
            $.nirvana.getJson('WikiFeaturesSpecialController', 'index').done(function(d) {
                var disabled =
                    d.features.filter(function (t) {
                        return t.name === 'wgEnableWallExt' && t.enabled;
                    }).length === 0;
 
                if (disabled) {
                    promise.resolve(false);
                } else {
                    promise.resolve(true);
                }
            }).error(function() {
                var wall = '.wds-global-navigation__dropdown-link[data-tracking-label="account.message-wall"]';
 
                if (document.querySelector(wall) === null) {
                    promise.resolve(false);
                } else {
                    promise.resolve(true);
                }
            });
            return promise;
        },
        i18n: function(i18n) {
            i18n.loadMessages('QuickLogs').then($.proxy(QuickLogs.cbI18n, QuickLogs));
        },
        cbI18n: function(i18nd) {
            this.i18n = i18nd;
            this.preload();
        },
        cbData: function(af, wall) {
            this.abuseFilter = af;
            this.walls = wall;
            if (this.logTypes.wall) {
                this.logTypes.wall.key = wall ? 'wall' : 'talk';
                this.logTypes.wall.href = mw.util.getUrl((wall ? 'Message Wall:' : 'User talk:') + this.user);
            }
            this.preload();
        }
    };
 
    QuickLogs.logTypes = $.extend({
        wall: {
            href: mw.util.getUrl('User talk:' + QuickLogs.user),
            key: 'talk'
        },
        blockLink: {
            check: QuickLogs.notOwnPageAnd.bind(QuickLogs, QuickLogs.isAdmin),
            href: mw.util.getUrl('Special:Block/' + QuickLogs.user),
            key: 'block'
        },
        block: {
            title: QuickLogs.user
        },
        upload: {
            by: QuickLogs.user
        },
        move: {
            by: QuickLogs.user
        },
        logs: {
            by: QuickLogs.user,
            key: 'logs'
        },
        checkUserLink: {
            check: function() { return !QuickLogs.ownPage() && QuickLogs.checkUser },
            href: mw.util.getUrl('Special:CheckUser', {
                user: QuickLogs.user
            }),
            key: 'check-user-ip'
        },
        abuse: {
            check: function() { return QuickLogs.abuseFilter },
            click: QuickLogs.loadAbuseLog.bind(QuickLogs)
        },
        rights: {
            title: QuickLogs.user
        },
        deletedcontribs: {
            check: QuickLogs.canViewDeletedRevs.bind(QuickLogs),
            click: QuickLogs.loadDeletedContribs.bind(QuickLogs)
        },
        rightsLink: {
            check: function() {
                return QuickLogs.isAdmin() ||
                    QuickLogs.ownPage() && QuickLogs.hasNotableRoles();
            },
            href: mw.util.getUrl('Special:UserRights/' + QuickLogs.user),
            key: 'rights-management'
        },
        chatban: {
            check: function() {
                return QuickLogs.chat;
            },
            title: QuickLogs.user
        },
        chatbanLink: {
            check: QuickLogs.notOwnPageAnd.bind(QuickLogs, QuickLogs.isChatMod),
            click: QuickLogs.showBanModal.bind(QuickLogs),
            striked: false,
            key: 'ban-from-chat'
        }
    }, (window.QuickLogs || {}).logTypes);
    QuickLogs.logOrder = ['wall', 'blockLink', 'block', 'upload', 'move', 'logs', 'checkUserLink', 'abuse', 'rights', 'deletedcontribs', 'rightsLink', 'chatban', 'chatbanLink'];
 
    // Expose resources
    window.QuickLogs = QuickLogs;
    mw.hook('QuickLogs.loaded').fire(QuickLogs);
 
    // Loading necessary resources
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        },
        {
            type: 'style',
            articles: [
                'u:dev:MediaWiki:QuickLogs.css'
            ]
        }
    );
 
    mw.hook('dev.ui').add(QuickLogs.preload.bind(QuickLogs));
    mw.hook('dev.i18n').add(QuickLogs.i18n.bind(QuickLogs));
    $.when(
        QuickLogs.checkAF(),
        QuickLogs.checkWall(),
        mw.loader.using([
            'mediawiki.api',
            'mediawiki.user',
            'mediawiki.util'
        ])
    ).then($.proxy(QuickLogs.cbData, QuickLogs));
    require(['wikia.ui.factory'], $.proxy(QuickLogs.preloadModal, QuickLogs));
})();