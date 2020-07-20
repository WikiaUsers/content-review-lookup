require(['wikia.ui.factory'], function(ui) {
    'use strict';
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:LastEdited/code.css'
    });
    /**
     * Main object
     * @class lastEdited
     */
    var lastEdited = {
        // Cached mw.config values
        config: mw.config.get([
            'stylepath',
            'skin',
            'wgAction',
            'wgArticleId',
            'wgFormattedNamespaces',
            'wgIsMainPage',
            'wgNamespaceNumber',
            'wgPageName',
            'wgUserGroups',
            'wgUserName'
        ]),
        // Configuration options
        options: $.extend({
            avatar: true,
            avatarsize: 15,
            size: true,
            diff: true,
            diffModal: true,
            comment: true,
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
        // If the user can rollback edits
        canRollback: /(bureaucrat|sysop|helper|vstf|staff|content-moderator|rollback)/.test(mw.config.get('wgUserGroups').join(' ')),
        /**
         * Initializes everything
         */
        init: function() {
            if (lastEdited.shouldRun()) {
                window.lastEditedLoaded = true;
                lastEdited.insert();
                mw.hook('dev.i18n').add(function(i18no) {
                    $.when(
                        lastEdited.fetch(),
                        i18no.loadMessages('LastEdited'),
                        ui.init(['modal']),
                        mw.loader.using('mediawiki.action.history.diff')
                    ).then(lastEdited.render);
                });
            }
        },
        /**
         * Checks whether the script should run further or not
         * @return {Boolean} If the script should run further
         */
        shouldRun: function() {
            var allowed = Object.keys(lastEdited.config.wgFormattedNamespaces).map(Number),
                ns = lastEdited.options.namespaces;
            if (ns && ns.exclude instanceof Array) {
                allowed = allowed.filter(function(elem) {
                    return ns.exclude.indexOf(elem) < 0;
                });
            }
            return !$.getUrlVar('diff') &&
                   !$.getUrlVar('oldid') &&
                   allowed.indexOf(lastEdited.config.wgNamespaceNumber) !== -1 &&
                   lastEdited.options.pages.indexOf(lastEdited.config.wgPageName) === -1 &&
                   !lastEdited.config.wgIsMainPage &&
                   lastEdited.config.wgAction === 'view' &&
                   !window.lastEditedLoaded &&
                   lastEdited.config.wgArticleId !== 0;
        },
        /**
         * Inserts the placeholder for last edit information
         */
        insert: function() {
            var $loader = $('<div>', {
                id: 'lastEdited',
                'class': 'lastEdited'
            }).append(
                $('<img>', {
                    id: 'lastEdited-loading',
                    src: lastEdited.config.stylepath + '//images.wikia.nocookie.net/speedit/images/a/a8/Spinner-white.svg'
                })
            );
            if (lastEdited.config.skin === 'oasis') {
                var pos = lastEdited.options.position;
                if (pos.element && pos.method) {
                    var $el = $(pos.element),
                        m = pos.method;
                    if ($el.length && (m === 'append' || m === 'prepend')) {
                        $el[m]($loader);
                    }
                } else {
                    $loader.insertAfter('#PageHeader .page-header__title, .UserProfileActionButton');
                }
            } else {
                $loader.insertBefore('#bodyContent');
            }
            lastEdited.$content = $loader;
        },
        /**
         * Fetches last edit information from the API
         * @returns {jQuery.Deferred} A Promise-like object
         */
        fetch: function() {
            var query = {
                action: 'query',
                titles: lastEdited.config.wgPageName,
                prop: 'revisions',
                rvprop: 'timestamp|user|userid|size|parsedcomment|flags',
                rvlimit: 2,
                rvdiffto: 'prev',
                format: 'json'
            };
            if (lastEdited.canRollback) {
                query.rvtoken = 'rollback';
            }
            return $.get(mw.util.wikiScript('api'), query);
        },
        /**
         * Renders last edited information
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @param {Object} modal Modal generator obtained from UI factory
         */
        render: function(data, i18n, modal) {
            if (lastEdited.options.lang) {
                i18n.useLang(lastEdited.options.lang);
            } else {
                i18n.useUserLang();
            }
            data = data[0].query.pages[lastEdited.config.wgArticleId].revisions;
            if (!data[1]) {
                lastEdited.$content.remove();
                return;
            }
            var prev = data[1];
            data = data[0];
            lastEdited.$content.html('');
            ['UserTime', 'Diff', 'Minor', 'Comment', 'Size'].forEach(function(el) {
                lastEdited.$content.append.apply(lastEdited.$content, lastEdited['render' + el](data, i18n, prev));
            });
            // In case the user doesn't have an avatar
            $('#lastEdited img').error(function() {
                $(this).attr('src', 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg');
            });
            lastEdited._i18n = i18n;
            lastEdited._data = data;
            lastEdited._modal = modal;
        },
        /**
         * Returns HTML for a link to a page
         * containing a user's username
         * Utility function for renderUserTime
         * @returns {String} HTML for an <a> tag
         */
        userLink: function(prefix, user, text) {
            return mw.html.element('a', { href: mw.util.wikiGetlink(prefix + user) }, text);
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
            links = lastEdited.userLink('User:', user, user) +
                    ' (' +
                    lastEdited.userLink('User talk:', user, i18n.msg('talk').plain()) +
                    ' | ' +
                    lastEdited.userLink('Special:Contributions/', user, i18n.msg('contribs').plain());
            if (/(bureaucrat|sysop|helper|vstf|staff)/.test(lastEdited.config.wgUserGroups.join(' '))) {
                links += ' | ' + lastEdited.userLink('Special:Block/', user, i18n.msg('block').plain());
            }
            if (lastEdited.options.avatar) {
                links = mw.html.element('img', {
                    src: 'https://services.wikia.com/user-avatar/user/' + data.userid + '/avatar',
                    width: lastEdited.options.avatarsize,
                    height: lastEdited.options.avatarsize
                }) + ' ' + links;
            }
            links += ')';
            // Build time
            var $time = $('<span>', {
                'class': 'lastEdited-timeago',
                title: data.timestamp
            });
            if (lastEdited.options.time === 'timestamp') {
                var date = new Date(data.timestamp).toString();
                if (lastEdited.options.timezone && lastEdited.options.timezone === 'UTC') {
                    date = new Date(data.timestamp).toUTCString();
                }
                $time.text(date.slice(0, 3) + ', ' + date.slice(4, 15) + ', ' + date.slice(16, 24));
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
            if (lastEdited.options.diff && data.diff.from) {
                var link = $('<a>', {
                    id: 'lastEdited-diff-link',
                    href: mw.util.wikiGetlink('Special:Diff/' + data.diff.to),
                    text: i18n.msg('diff').plain(),
                    title: 'Special:Diff/' + data.diff.to
                });
                if (lastEdited.options.diffModal && !window.quickDiffLoaded) {
                    link.click(function(e) {
                        e.preventDefault();
                        lastEdited.generateModal(lastEdited._i18n, lastEdited._data, lastEdited._modal);
                    });
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
            if (lastEdited.options.comment && comment) {
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
            if (lastEdited.options.size) {
                var bytes = data.size - prev.size,
                    classes = 'mw-plusminus-' + (bytes > 0 ?
                        'pos' :
                        bytes < 0 ?
                            'neg' :
                            'null');
                if (Math.abs(bytes) > 500) {
                    classes += ' lastEdited-diff-major';
                }
                return [
                    '<br />',
                    i18n.msg('size').escape(),
                    ': ',
                    data.size,
                    ' ',
                    i18n.msg('bytes').escape(),
                    ' ',
                    $('<span>', {
                        text: '(' + (bytes > 0 ? '+' : '') + bytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ')',
                        'class': classes
                    })
                ];
            }
            return [];
        },
        /**
         * (Re)generates the diff modal
         * @param {Object} data Edit information obtained from the API
         * @param {Object} i18n I18N object generated by I18n-js
         * @param {Object} modal Modal generator obtained from UI factory
         */
        generateModal: function(i18n, data, modal) {
            var config = {
                vars: {
                    id: 'lastEdited-diff',
                    size: 'large',
                    title: i18n.msg('changes').escape() + ': ' + lastEdited.config.wgPageName.replace(/_/g, ' '),
                    content: '<div id="lastEdited-diff-changes" class="WikiaArticle diff">' +
                                 '<table>' +
                                     data.diff['*'] +
                                 '</table>' +
                             '</div>',
                    buttons: [
                        {
                            vars: {
                                value: i18n.msg('cancel').plain(),
                                data: [{
                                    key: 'event',
                                    value: 'close'
                                }]
                            }
                        },
                        {
                            vars: {
                                value: i18n.msg('link').plain(),
                                classes: ['normal', 'primary'],
                                data: [{
                                    key: 'event',
                                    value: 'link'
                                }]
                            }
                        },
                        {
                            vars: {
                                value: i18n.msg('undo').plain(),
                                classes: ['normal', 'primary'],
                                data: [{
                                    key: 'event',
                                    value: 'undo'
                                }]
                            }
                        }
                    ]
                },
                confirmCloseModal: function() {
                    lastEdited.modal = null;
                    return true;
                }
            };
            if (lastEdited.canRollback && lastEdited.config.wgUserName !== data.user) {
                config.vars.buttons.push({
                    vars: {
                        value: i18n.msg('rollback').plain(),
                        classes: ['normal', 'primary'],
                        data: [{
                            key: 'event',
                            value: 'rollback'
                        }]
                    }
                });
            }
            modal.createComponent(config, function(diffModal) {
                diffModal.bind('link', function() {
                    diffModal.trigger('close');
                    window.open('/?diff=' + data.diff.to, '_blank');
                });
                diffModal.bind('undo', function() {
                    diffModal.trigger('close');
                    window.open('/wiki/' + mw.util.wikiUrlencode(lastEdited.config.wgPageName) +
                                '?action=edit&undoafter=' + data.diff.from +
                                '&undo=' + data.diff.to,
                    '_blank');
                });
                diffModal.bind('rollback', function() {
                    $.post(mw.util.wikiScript('api'), {
                        action: 'rollback',
                        title: lastEdited.config.wgPageName,
                        user: data.user,
                        token: data.rollbacktoken,
                        format: 'json'
                    }).done(function(d) {
                        if (!d.error) {
                            window.location.reload();
                        }
                    });
                });
                lastEdited.modal = diffModal;
                lastEdited.modal.show();
            });
        }
    };
    lastEdited.init();
});