(function() {
    'use strict';
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:LastEdited.css'
    });
    /**
     * Main object
     * @class lastEdited
     */
    var lastEdited = {
        // Cached mw.config values
        config: mw.config.get([
            'stylepath',
            'wgAction',
            'wgArticleId',
            'wgFormattedNamespaces',
            'wgIsMainPage',
            'wgMainPageTitle',
            'wgNamespaceNumber',
            'wgPageName',
            'wgUserGroups',
            'wgUserName',
            'wgVersion'
        ]),
        // Configuration options
        options: $.extend({
            avatar: true,
            avatarsize: 15,
            size: true,
            diff: true,
            diffModal: true,
            comment: true,
            newpage: true,
            mainpage: true,
            time: 'timeago',
            position: {
                element: '',
                method: ''
            },
            namespaces: {
                exclude: [-1, 1201, 2001]
            },
            pages: []
        }, window.lastEdited),
        // The amount of dependencies to load
        loaded: 2,
        // If the user can rollback edits
        canRollback: /(bureaucrat|sysop|helper|soap|staff|content-moderator|rollback|wiki-manager|content-team-member)/.test(mw.config.get('wgUserGroups').join(' ')),
        /**
         * Initializes everything
         */
        init: function() {
            window.lastEditedLoaded = true;
            this.isUCP = this.config.wgVersion !== '1.19.24';
            this.api = new mw.Api();
            this.pageName = this.config.wgPageName.replace(/_/g, ' ');
            this.insert();
            var preload = $.proxy(this.preload, this);
            mw.hook('dev.modal').add(preload);
            mw.hook('dev.i18n').add(preload);
        },
        preload: function() {
            if (--this.loaded === 0) {
                var i18nOptions = {};
                if (this.options.lang) {
                    i18nOptions.language = this.options.lang;
                }
                $.when(
                    this.fetch(),
                    window.dev.i18n.loadMessages('LastEdited', i18nOptions),
                    mw.loader.using(
                        this.isUCP ?
                            [
                                'mediawiki.diff.styles',
                                'skin.oasis.diff.runtimeStyles'
                            ] :
                            'mediawiki.action.history.diff'
                    )
                ).then($.proxy(this.render, this));
            }
        },
        /**
         * Checks whether the script should run further or not
         * @return {Boolean} If the script should run further
         */
        shouldRun: function() {
            var allowed = Object.keys(this.config.wgFormattedNamespaces).map(Number),
                ns = this.options.namespaces;
            if (ns && ns.exclude instanceof Array) {
                allowed = allowed.filter(function(elem) {
                    return ns.exclude.indexOf(elem) < 0;
                });
            }
            return !mw.util.getParamValue('diff') &&
                   !mw.util.getParamValue('oldid') &&
                   allowed.indexOf(this.config.wgNamespaceNumber) !== -1 &&
                   this.options.pages.indexOf(this.config.wgPageName) === -1 &&
                   (
                       // The script is allowed to run on the main page.
                       this.options.mainpage ||
                       // The current page is not the main page
                       this.pageName !== this.config.wgMainPageTitle
                    ) &&
                   this.config.wgAction === 'view' &&
                   !window.lastEditedLoaded &&
                   this.config.wgArticleId !== 0;
        },
        /**
         * Inserts the placeholder for last edit information
         */
        insert: function() {
            var $loader = $('<div>', {
                id: 'lastEdited',
                'class': 'lastEdited'
            }).append(
                this.isUCP ?
                    $('<span>', {
                        'class': 'mw-ajax-loader',
                        'id': 'lastEdited-loading'
                    }) :
                    $('<img>', {
                        id: 'lastEdited-loading',
                        src: this.config.stylepath + '/common/images/ajax.gif'
                    })
            );
            var pos = this.options.position;
            if (pos.element && pos.method) {
                var $el = $(pos.element),
                    m = pos.method;
                if ($el.length && (m === 'append' || m === 'prepend')) {
                    $el[m]($loader);
                }
            } else {
                $loader.insertAfter('#PageHeader .page-header__title, .UserProfileActionButton');
            }
            this.$content = $loader;
            mw.hook('LastEdited.inserted').fire($loader);
        },
        /**
         * Fetches last edit information from the API
         * @returns {jQuery.Deferred} A Promise-like object
         */
        fetch: function() {
            var tokentype = this.canRollback ? 'rollback' : undefined;
            return this.api.get({
                action: 'query',
                titles: this.config.wgPageName,
                meta: 'tokens',
                prop: 'revisions',
                rvprop: 'timestamp|user|userid|size|parsedcomment|flags',
                // TODO: This has been deprecated.
                rvdiffto: 'prev',
                rvlimit: 2,
                rvtoken: tokentype,
                type: tokentype
            });
        },
        /**
         * Renders last edited information
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18n object generated by I18n-js
         * @param {Object} modal Modal generator obtained from UI factory
         */
        render: function(data, i18n) {
            var diffData = data[0].query.pages[this.config.wgArticleId].revisions;
            if (!diffData[1] && !this.options.newpage) {
                this.$content.remove();
                return;
            }
            var prev = diffData[1],
                curr = diffData[0];
            if (data[0].query.tokens) {
                curr.rollbacktoken = data[0].query.tokens.rollbacktoken;
            }
            if (prev) {
                this.createModal(i18n, curr);
            }
            this.$content.html('');
            ['UserTime', 'Diff', 'Minor', 'Comment', 'Size'].forEach(function(el) {
                this.$content.append(this['render' + el](curr, i18n, prev));
            }, this);
            // In case the user doesn't have an avatar
            $('#lastEdited img').on('error', function() {
                $(this).attr('src', 'https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg');
            });
            mw.hook('LastEdited.render').fire(this.$content);
        },
        /**
         * Returns HTML for a link to a page
         * containing a user's username
         * Utility function for renderUserTime
         * @returns {String} HTML for an <a> tag
         */
        userLink: function(prefix, user, text) {
            return mw.html.element('a', { href: mw.util.getUrl(prefix + user) }, text);
        },
        /**
         * Renders user and time links
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @returns {Array} Parts to append to last edited information
         */
        renderUserTime: function(data, i18n) {
            // Build user links
            var user = data.user,
            links = this.userLink('User:', user, user) +
                    '<span class="mw-usertoollinks"> (' +
                    this.userLink('User talk:', user, i18n.msg('talk').plain()) +
                    ' | ' +
                    this.userLink('Special:Contributions/', user, i18n.msg('contribs').plain());
            if (/(bureaucrat|sysop|helper|soap|staff)/.test(this.config.wgUserGroups.join(' '))) {
                links += ' | ' + this.userLink('Special:Block/', user, i18n.msg('block').plain());
            }
            if (this.options.avatar) {
                links = mw.html.element('img', {
                    src: 'https://services.fandom.com/user-avatar/user/' + data.userid + '/avatar',
                    width: this.options.avatarsize,
                    height: this.options.avatarsize
                }) + ' ' + links;
            }
            links += ')</span>';
            // Build time
            var $time = $('<span>', {
                'class': 'lastEdited-timeago',
                title: data.timestamp
            });
            if (this.options.time === 'timestamp') {
                var date = new Date(data.timestamp).toString();
                if (this.options.timezone && this.options.timezone === 'UTC') {
                    date = new Date(data.timestamp).toUTCString();
                }
                if (this.options.timezone && this.options.timezone === 'locale') {
                    date = new Date(data.timestamp).toLocaleString();
                    $time.text(date);
                }
                else {
                    $time.text(date.slice(0, 3) + ', ' + date.slice(4, 16) + ', ' + date.slice(17, 26));
                }
            } else {
                $time.timeago();
            }
            return [
                i18n.msg('lastEdited').escape()
                    .replace('$1', links)
                    .replace('$2', $time.prop('outerHTML'))
            ];
        },
        /**
         * Renders the diff link
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @returns {Array} Parts to append to last edited information
         */
        renderDiff: function(data, i18n) {
            if (this.options.diff && data.diff.from) {
                var link = $('<a>', {
                    id: 'lastEdited-diff-link',
                    href: '?diff=' + data.diff.to,
                    text: i18n.msg('diff').plain(),
                    title: 'Special:Diff/' + data.diff.to
                });
                if (this.options.diffModal) {
                    link.attr('data-disable-quickdiff', '');
                    link.click($.proxy(function(e) {
                        e.preventDefault();
                        this.modal.show();
                    }, this));
                }
                return [
                    ' (',
                    link,
                    ')'
                ];
            }
            return [];
        },
        /**
         * Renders the "m" sign next to minor edits
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @returns {Array} Parts to append to last edited information
         */
        renderMinor: function(data, i18n) {
            if (data.minor === '') {
                return [
                    ' ',
                    $('<span>', {
                        id: 'lastEdited-minor',
                        text: '[' + i18n.msg('minor').plain() + ']'
                    })
                ];
            }
            return [];
        },
        /**
         * Renders the last edit summary used
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @returns {Array} Parts to append to last edited information
         */
        renderComment: function(data, i18n) {
            var comment = data.parsedcomment;
            if (this.options.comment && comment) {
                return [
                    '<br />',
                    i18n.msg('comment').escape(),
                    ': ',
                    comment.indexOf('Created page with') === -1 ? comment : i18n.msg('created').escape()
                ];
            }
            return [];
        },
        /**
         * Renders the size of the last diff
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @param {Object} prev Information about the previous edit from the API
         * @returns {Array} Parts to append to last edited information
         */
        renderSize: function(data, i18n, prev) {
            if (!this.options.size) {
                return [];
            }
            var arr = [
                '<br />',
                i18n.msg('size').escape(),
                ': ',
                data.size,
                ' ',
                i18n.msg('bytes').escape()
            ];
            if (prev) {
                var bytes = data.size - prev.size,
                    classes = 'mw-plusminus-' + (bytes > 0 ?
                        'pos' :
                        bytes < 0 ?
                            'neg' :
                            'null');
                if (Math.abs(bytes) > 500) {
                    classes += ' lastEdited-diff-major';
                }
                arr.push(
                    ' ',
                    $('<span>', {
                        text: '(' + (bytes > 0 ? '+' : '') + bytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ')',
                        'class': classes
                    })
                );
            }
            return arr;
        },
        /**
         * (Re)generates the diff modal
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @param {Object} modal Modal generator obtained from UI factory
         */
        createModal: function(i18n, data) {
            var buttons = [
                {
                    event: 'close',
                    normal: true,
                    primary: true,
                    text: i18n.msg('cancel').plain()
                },
                {
                    event: 'link',
                    normal: true,
                    primary: true,
                    text: i18n.msg('link').plain()
                },
                {
                    event: 'undo',
                    normal: true,
                    primary: true,
                    text: i18n.msg('undo').plain()
                }
            ];
            if (this.canRollback && this.config.wgUserName !== data.user) {
                buttons.push({
                    event: 'rollback',
                    normal: true,
                    primary: true,
                    text: i18n.msg('rollback').plain()
                });
            }
            this.modal = new window.dev.modal.Modal({
                buttons: buttons,
                content: '<div id="lastEdited-diff-changes" class="WikiaArticle diff">' +
                             '<table class="diff">' +
                                 data.diff['*'] +
                             '</table>' +
                         '</div>',
                context: this,
                events: {
                    link: function() {
                        this.modal.close();
                        window.open(mw.util.getUrl('', {
                            diff: data.diff.to
                        }), '_blank');
                    },
                    rollback: function() {
                        this.api.post({
                            action: 'rollback',
                            title: this.config.wgPageName,
                            user: data.user,
                            token: data.rollbacktoken,
                            format: 'json'
                        }).done(function(d) {
                            if (!d.error) {
                                window.location.reload();
                            }
                        });
                    },
                    undo: function() {
                        this.modal.close();
                        window.open(mw.util.getUrl(this.config.wgPageName, {
                            action: 'edit',
                            undoafter: data.diff.from,
                            undo: data.diff.to
                        }), '_blank');
                    }
                },
                id: 'lastEdited-diff',
                size: this.isUCP ? 'larger' : 'large',
                title: i18n.msg('changes').escape() + ': ' + this.pageName
            });
            this.modal.create();
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        if (lastEdited.shouldRun()) {
            $($.proxy(lastEdited.init, lastEdited));
        }
    });
})();