/**
 * Rollback
 * @description Perform rollbacks without needing to be in the usergroup
 * @author Ozank
 */
(function() {
    'use strict';
    // Exit if normal rollback links are present or the wiki disabled the script
    if ($('.mw-rollback-link').length || window.RollbackWikiDisable) {
        return;
    }
    var Rollback = $.extend(window.Rollback, {
        config: mw.config.get([
            'wgAction',
            'wgCanonicalSpecialPageName',
            'wgPageName'
        ]),
        _preload: 2,
        getPageType: function() {
            if (
                this.config.wgAction === 'history' &&
                $('#pagehistory li').length > 1
            ) {
                return 'history';
            } else if (
                this.config.wgCanonicalSpecialPageName === 'Contributions'
            ) {
                return 'contributions';
            } else if (
                mw.util.getParamValue('diff') &&
                $('#differences-nextlink').length === 0
            ) {
                return 'diff';
            }
        },
        preload: function() {
            if (--this._preload === 0) {
                window.dev.i18n.loadMessages('Rollback')
                    .then(this.init.bind(this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            this.performRollbackCallback = this.performRollbackCallback
                .bind(this);
            var type = this.getPageType();
            if (type) {
                this[type]();
            }
            mw.hook('quickdiff.ready').add(this.quickDiff.bind(this));
        },
        getLink: function(page, user) {
            return $('<a>', {
                'click': this.click.bind(this),
                'data-id': page,
                'data-user': user,
                'href': '#',
                'text': this.i18n.msg('rollback').plain(),
                'title': this.i18n.msg('description').plain()
            });
        },
        history: function() {
            $('#pagehistory li:first .mw-history-undo a').before(
                $('<span>', {
                    'class': 'mw-custom-rollback-link'
                }).append(this.getLink(
                    this.config.wgPageName,
                    $('.mw-userlink:first').text()
                )),
                ' | '
            );
        },
        contributions: function() {
            $('#mw-content-text ul li').each(function(_, el) {
                // Fix context
                var $this = $(el);
                if ($this.find('.mw-uctop').length) {
                    $this.append(
                        ' ',
                        $('<span>', {
                            'class': 'mw-custom-rollback-link'
                        }).append(
                            '[',
                            this.getLink(
                                $this.find('a:first').attr('title'),
                                this.config.wgPageName.split('/')[1]
                            ),
                            ']'
                        )
                    );
                }
            }.bind(this));
        },
        diff: function() {
            $('.mw-usertoollinks:last').after(
                '&nbsp;&nbsp;&nbsp;&nbsp;',
                $('<span>', {
                    'class': 'mw-custom-rollback-link'
                }).append(
                    '[',
                    this.getLink(
                        this.config.wgPageName,
                        $('#mw-diff-ntitle2 .mw-userlink').text()
                    ),
                    ']'
                )
            );
        },
        quickDiff: function(modal) {
            // See getDiffTitle from QuickDiff.
            var prevTitle = modal.data.content
                .find('#mw-diff-otitle1 a')
                .attr('title'),
                currTitle = modal.data.content
                .find('#mw-diff-ntitle1 a')
                .attr('title');
            if (prevTitle !== currTitle) {
                // This is a Special:ComparePages diff.
                return;
            }
            modal.$content.find('.mw-usertoollinks:last').after(
                '&nbsp;&nbsp;&nbsp;&nbsp;',
                $('<span>', {
                    'class': 'mw-custom-rollback-link'
                }).append(
                    '[',
                    this.getLink(
                        currTitle,
                        modal.$content
                            .find('#mw-diff-ntitle2 .mw-userlink')
                            .text()
                    ),
                    ']'
                )
            );
        },
        click: function(event) {
            event.preventDefault();
            if (this.confirm && !confirm(this.i18n.msg('confirm').plain())) {
                return;
            }
            var $this = $(event.target);
            this.getRevisionIdAndContent(
                $this.data('id'),
                $this.data('user').replace(/_/g, ' ')
            );
            $this.parent().remove();
        },
        getRevisionIdAndContent: function(title, target) {
            this.api.get({
                action: 'query',
                cb: Date.now(),
                indexpageids: 1,
                prop: 'revisions',
                rvlimit: 'max',
                rvprop: 'user|ids',
                titles: title
            }).done(this.getRevisionIdCallback.bind(this, target)).fail(
                this.outputError.bind(this, 'revisionError', undefined)
            );
        },
        getRevisionIdCallback: function(target, data) {
            if (data.error) {
                this.outputError('revisionFail', data.error.code);
                return;
            }
            var revisions = data.query.pages[data.query.pageids[0]].revisions;
            // Don't rollback if the page has been edited by somebody else
            if (target !== revisions[0].user) {
                this.outputError('editConflict');
                return;
            }
            var lastUser, revId;
            for (var i in revisions) {
                if (revisions[i].user !== target) {
                    // Remember last author
                    lastUser = revisions[i].user;
                    // Get revision to revert to
                    revId = revisions[i].revid;
                    break;
                }
            }
            if (!lastUser) {
                this.outputError('singleEditor');
                return;
            }
            this.api.get({
                action: 'query',
                cb: Date.now(),
                indexpageids: 1,
                prop: 'revisions',
                revids: revId,
                rvprop: 'content'
            }).done(
                this.getRevisionContentCallback.bind(this, target, lastUser)
            ).fail(
                this.outputError.bind(this, 'contentFail', undefined)
            );
        },
        getRevisionContentCallback: function(target, lastUser, data) {
            if (data.error) {
                this.outputError('contentFail', data.error.code);
                return;
            }
            // Can be no content on page
            var page = data.query.pages[data.query.pageids[0]],
                content = page.revisions ? page.revisions[0]['*'] : '';
            this.performRollback(page.title, content, target, lastUser);
        },
        performRollback: function(page, text, user, user2) {
            var summary = this.i18n
                .inContentLang()
                .msg('summary', user, user2)
                .plain();
            if (summary.length > 255) {
                summary = this.i18n
                    .inContentLang()
                    .msg('summaryShort', user)
                    .plain();
            }
            this.api.post({
                action: 'edit',
                bot: true,
                minor: true,
                summary: summary,
                text: text,
                title: page,
                token: mw.user.tokens.get('editToken')
            }).done(this.performRollbackCallback).fail(
                this.outputError.bind(this, 'editFail', undefined)
            );
        },
        performRollbackCallback: function(data) {
            if (data.error) {
                this.outputError('editFail', data.error.code);
            } else {
                new BannerNotification(
                    this.i18n.msg('success').escape(),
                    'confirm'
                ).show();
            }
        },
        outputError: function(message, code) {
            new BannerNotification(
                this.i18n.msg(
                    message,
                    code || this.i18n.msg('ajaxError').plain()
                ).escape(),
                'error'
            ).show();
        }
    });
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user',
        'mediawiki.util',
        'ext.bannerNotifications'
    ], Rollback.preload.bind(Rollback));
    mw.hook('dev.i18n').add(Rollback.preload.bind(Rollback));
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();