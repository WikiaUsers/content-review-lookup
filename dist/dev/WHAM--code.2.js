/**
 * A variant of WHAM with a different modal
 * Includes functionality to delete forum/message wall threads and selective
 * deleting of pages, which the original lacks
 * Original "WHAM" - https://dev.fandom.com/wiki/MediaWiki:WHAM/code.js
 * @author KnazO
 * @uses [[File:Circle_throbber.gif]]
 */

;(function($, mw) {
    'use strict';

    const config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgPageName',
        'wgUserGroups',
        'wgVersion',
        'wgUserName'
    ]);
    if (
        (!['UserProfileActivity', 'Contributions'].includes(config.wgCanonicalSpecialPageName)) ||
        !/rollback|content-moderator|threadmoderator|sysop|soap|staff|global-discussions-moderator|wiki-specialist|global-edit-reviewer/.test(config.wgUserGroups.join()) ||
        window.WHAMLoaded
    ) {
        return;
    }
    window.WHAMLoaded = true;

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:WHAM.css'
    });

    const username = config.wgPageName.split('/')[1],
          delay = window.WHAMDelay || 100;

    var deleteReason,
        duration,
        blockReason,
        i18n,
        $button,
        windowManager,
        dialog,
        OO,
        Api;

    function apiDelete(page, reason) {
        Api.postWithToken('csrf', {
            action: 'delete',
            title: page,
            reason: reason
        }).done(function(d) {
            console.log(i18n.msg('do-delete-success', page).plain());
        }).fail(function(code) {
            console.log(
                i18n.msg(
                    'do-delete-fail',
                    page,
                    code === 'http' ?
                        i18n.msg('ajax-error').plain() :
                        code
                ).plain()
            );
        });
    }

    function doRollback() {
        const $links = $('.mw-rollback-link a'),
            len = $links.length;
        if (len === 0) {
            $('#status-wham').text(i18n.msg('do-rollback-done').plain());
            dialog.updateSize();
        }
        $links.each(function(i) {
            const url = new URL($(this).prop('href'));
            url.searchParams.append('bot', 1);
            const href = url.toString();
            setTimeout(function() {
                $.get(href);
                $('#status-wham').html(
                    i18n.msg('do-rollback-status').escape() +
                    $('<img>', {
                        src: 'https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif',
                        css: {
                            width: '15px'
                        }
                    }).prop('outerHTML')
                );
                if (i === len - 1) {
                    $('#status-wham').text(
                        i18n.msg('do-rollback-done').plain()
                        );
                    dialog.updateSize();
                }
            }, i * delay);
        });
    }

    function doDelete() {
        deleteReason = prompt(
            i18n.msg('do-delete-reason').plain(),
            window.WHAMDeleteReason || i18n
                .inContentLang()
                .msg('default-delete-reason')
                .plain()
        );
        if (!deleteReason) {
            return;
        }
        var deleteArray = [];

        $('#mw-content-text ul li').each(function() {
            const $links = $(this).find('a'),
                title = $links.first().attr('title'),
                href = $links.eq(1).prop('href');
            if (href === '') return;
            const url = new URL(href);
            if (
                // If it's not a thread...
                !title.match(/\/@comment-/) ||
                (
                    // ...or if it's a thread edit...
                    title.match(/\/@comment-/) &&
                    url.searchParams.get('diff') === 'prev'
                )
            ) {
                // ...don't process it.
                return;
            }
            deleteArray.push(title);
        });

        $('li .newpage ~ a, li .newpage ~ bdi a').each(function() {
            const title = new mw.Title($(this).attr('title'));
            if (
                title.namespace === 1200 ||
                title.namespace === 1201 &&
                title.getNamespacePrefix() < 9
            ) {
                return;
            }
            deleteArray.push(title.getPrefixedText());
        });

        $.each(deleteArray, function(i, v) {
            setTimeout(function() {
                $('#status-wham').html(
                    i18n.msg('do-delete-status').escape() +
                    $('<img>', {
                        src: 'https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif',
                        css: {
                            width: '15px'
                        }
                    }).prop('outerHTML')
                );
                apiDelete(v, deleteReason);
                if (i === deleteArray.length - 1) {
                    $('#status-wham').text(i18n.msg('do-delete-done').plain());
                    dialog.updateSize();
                }
            }, i * delay);
        });
    }

    function doBlock() {
        duration = prompt(
            i18n.msg('do-block-duration').plain(),
            window.WHAMBlockDuration || '2 weeks'
        );
        if (!duration) {
            return;
        }
        blockReason = prompt(
            i18n.msg('do-block-reason').plain(),
            window.WHAMBlockReason || i18n
                .inContentLang()
                .msg('default-block-reason')
                .plain()
        );
        if (!blockReason) {
            return;
        }
        Api.postWithToken('csrf', {
            action: 'block',
            user: username,
            expiry: duration,
            nocreate: 0,
            autoblock: 0,
            reason: blockReason
        }).done(function(d) {
            alert(i18n.msg('do-block-success', username).plain());
        }).fail(function(code) {
            alert(
                i18n.msg(
                    'do-block-fail',
                    username,
                    code === 'http' ?
                        i18n.msg('ajax-error').plain() :
                        code
                ).plain()
            );
        });
    }

    function doBot() {
        Api.get({
            action: 'query',
            format: 'json',
            meta: 'userinfo',
            uiprop: 'groups'
        }).done(function(data) {
            const resp = data.query;

            var params = {
                action: 'userrights',
                user: config.wgUserName,
                reason: window.WHAMBotReason || i18n
                    .inContentLang()
                    .msg('default-delete-reason')
                    .plain()
            };
            params[
                resp.userinfo.groups.indexOf('bot') === -1 ?
                    'add' :
                    'remove'
            ] = 'bot';
            Api.postWithToken('userrights', params).done(function(d) {
                alert(i18n.msg('bot-me-done').plain());

                // Change button label
                if (params.hasOwnProperty('add')) {
                    $('#wham-bot').text(
                        i18n.msg('unbot-me').plain()
                    );
                } else {
                    $('#wham-bot').text(
                        i18n.msg('bot-me').plain()
                    );
                }
            }).fail(function(code) {
                alert(i18n.msg('bot-me-fail', code).plain());
            });
        });
    }

    function doSelectiveDelete() {
        deleteReason = prompt(
            i18n.msg('do-delete-reason').plain(),
            window.WHAMDeleteReason || i18n
                .inContentLang()
                .msg('default-delete-reason')
                .plain()
        );
        if (!deleteReason) {
            return;
        }
        $('.selectiveDel').each(function() {
            var $this = $(this),
                title = new mw.Title($('.mw-revdelundel-link').length ?
                    (config.wgVersion === '1.39.7' ? $this.parent().children('a').eq(0).attr('title') : $this.parent().children('bdi').children('a').eq(0).attr('title')) :
                    $this.parent().find('a').first().attr('title'));
            if ($this.prop('checked') && title.namespace !== 1200) {
                apiDelete(title.getPrefixedText(), deleteReason);
                $this
                    .parent()
                    .addClass('wham-resolved')
                    .children()
                    .removeAttr('href')
                    .addClass('wham-resolved');
            }
        });
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    }

    function checkSelectiveDelete() {
        var $this = $(this),
        uncheck = $this.text() === i18n.msg('selective-delete-uncheck').plain();
        $('.selectiveDel').each(function() {
            const chkObj = $(this);
            if (uncheck) {
                chkObj.removeAttr('checked');
            } else {
                chkObj.attr('checked', 'checked');
            }
        });
        $this.text(
            i18n.msg(
                uncheck ?
                    'selective-delete-check' :
                    'selective-delete-uncheck'
            ).plain()
        );
    }

    function startSelectiveDelete() {
        dialog.close();
        if ($('#btn-wham-del').length && $('#btn-wham-check').length) {
            return;
        }
        const $chk = $('<input>', {
            'class': 'selectiveDel',
            'type': 'checkbox'
        });
        $('.mw-pager-body').before(
            $('<button>', {
                'class': 'button',
                'id': 'btn-wham-del',
                'text': i18n.msg('start-selective-delete').plain()
            }),
            ' ',
            $('<button>', {
                'class': 'button',
                'id': 'btn-wham-check',
                'text': i18n.msg('selective-delete-check').plain()
            })
        );

        $(config.wgVersion === '1.39.7' ? 'li .newpage ~ a' : 'li .newpage ~ bdi').each(function() {
            if (!$(this).parent().find('input').length) {
                $(this).parent().prepend($chk.clone());
            }
        });

        $('#mw-content-text ul li').each(function() {
        	var $children, title, url;
        	if (config.wgVersion === '1.39.7') {
        		$children = $(this).children('a');
                title = $children.first().attr('title');
                url = new URL($children.eq(1).prop('href'));
        	} else {
        		$children = $(this).children('bdi').children('a');
                title = $children.first().attr('title');
                url = new URL($children.eq(1).prop('href'));
        	}
            if (
                // If it's a thread...
                title.match(/\/@comment-/) &&
                // ...and not a thread edit...
                url.searchParams.get('diff') !== 'prev' &&
                // ...and there's no checkbox currently...
                !$(this).find('input').length
            ) {
                // ...append it.
                $(this).prepend($chk.clone());
            }
        });
        $('#btn-wham-del').click(doSelectiveDelete);
        $('#btn-wham-check').click(checkSelectiveDelete);
    }

    function doAll() {
        doBlock();
        if (duration || blockReason) {
            doDelete();
            if ($('.tabs li:first-child a:not(.new), .mw-contributions-user-tools > a:not(.new)').length) {
                if (confirm(i18n.msg('userpage-delete-confirm').plain())) {
                    apiDelete(config.wgFormattedNamespaces[2] + ':' + username, window.WHAMDeleteReason || i18n.inContentLang().msg('default-delete-reason').plain());
                }
            }
            if (deleteReason) {
                doRollback();
            }
        }
    }

    function canFlagBot() {
        return /soap|staff|wiki-specialist/.test(config.wgUserGroups.join());
    }

    function click() {
        const self = ((username === config.wgUserName) ? true : false),
              $self_warn_html = $('<p>', {
                html: i18n.msg('self-use-warn').parse(),
                id: 'wham-self-use-warn',
                class: 'error'
              });

        if (windowManager) {
            windowManager.openWindow(dialog);
        } else {
            function WHAMDialog(config) {
                WHAMDialog.super.call(this, config);
            }
            OO.inheritClass(WHAMDialog, OO.ui.ProcessDialog);
            WHAMDialog.static.name = 'WHAM';
            WHAMDialog.static.title = i18n.msg('title').escape();
            WHAMDialog.static.actions = [
                { label: i18n.msg('do-delete').escape(), flags: ['secondary'], action: 'doDelete' },
                { label: i18n.msg('start-selective-delete').escape(), flags: ['secondary'], action: 'startSelectiveDelete' },
                { label: i18n.msg('do-rollback').escape(), flags: ['secondary'], action: 'doRollback' },
                { label: i18n.msg('do-block').escape(), flags: ['secondary'], action: 'doBlock' },
                { label: i18n.msg('do-all').escape(), flags: ['secondary'], action: 'doAll' },
                { label: i18n.msg('close-wham').escape(), flags: ['safe', 'close'] }
            ];

            if (window.WHAMBotMe === true || canFlagBot()) {
                    WHAMDialog.static.actions.push({
                        label: i18n.msg(
                            config.wgUserGroups.indexOf('bot') === -1 ?
                            'bot-me' :
                            'unbot-me'
                        ).plain(),
                        flags: ['secondary'],
                        action: 'doBot'
                    });
            }

            // initialise dialog, append content
            WHAMDialog.prototype.initialize = function () {
                WHAMDialog.super.prototype.initialize.apply(this, arguments);
                this.content = new OO.ui.PanelLayout({
                    padded: true
                });
                this.content.$element.append((self ? $self_warn_html : ''));
                this.$foot.append(
                    $('<div>', {
                        id: 'status-wham'
                    }));
                this.$content.addClass('wham-Dialog');
                this.$body.append(this.content.$element);
            };

            // Handle actions
            WHAMDialog.prototype.getActionProcess = function (action) {
                switch (action) {
                    case 'doDelete': doDelete(); break;
                    case 'startSelectiveDelete': startSelectiveDelete(); break;
                    case 'doRollback': doRollback(); break;
                    case 'doBlock': doBlock(); break;
                    case 'doAll': doAll(); break;
                    case 'doBot': doBot(); break;
                }
                return WHAMDialog.super.prototype.getActionProcess.call(this, action);
            };

            // Create the Dialog and add the window manager.
            windowManager = new OO.ui.WindowManager({
                classes: ['wham']
            });
            $(document.body).append(windowManager.$element);
            // Create a new dialog window.
            dialog = new WHAMDialog({
                size: 'medium'
            });

            // Add window and open
            windowManager.addWindows([dialog]);
            windowManager.openWindow(dialog);

            // Close dialog when clicked outside the dialog
            dialog.$frame.parent().on('click', function(e) {
                if (!$(e.target).closest('.wham-Dialog').length) {
                    dialog.close();
                }
            });
            if (self) $(dialog.$content.find('.oo-ui-window-body').show());
        }

        // Bot button
        if (window.WHAMBotMe === true || canFlagBot()) {
            const form = $('#form-main .modalToolbar .wikia-button:nth-child(5)');
            $('#form-main .modalToolbar .wikia-button:nth-child(5)').after(
                $('<a>', {
                    'id': 'wham-bot',
                    'class': 'wikia-button',
                    'text': i18n.msg(
                        config.wgUserGroups.indexOf('bot') === -1 ?
                            'bot-me' :
                            'unbot-me'
                    ).plain()
                }).click(doBot)
            );
        }

        // Fire the hook to allow customization
        mw.hook('dev.wham').fire();
    }

    function qlIntegration(QuickLogs) {
        $button.remove();
        QuickLogs.addLink('wham', {
            click: click,
            message: i18n.msg('contribs-wham').plain()
        });
    }

    function init(require, i18no) {
        OO = require('oojs');
        Api = new mw.Api();
        i18n = i18no;
        $button = $('<a>', {
            id: 'contribs-wham',
            click: click,
            title: i18n.msg('contribs-wham-title').plain(),
            text: i18n.msg('contribs-wham').plain()
        });
        $('.mw-contributions-user-tools .mw-changeslist-links, .UserProfileActivityModeration .mw-changeslist-links').append($('<span>').append($button));
        mw.hook('dev.wham.button').fire($button);
        mw.hook('QuickLogs.loaded').add(qlIntegration);
    }

    function waitForI18n() {
        var $promise = $.Deferred();
        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('WHAM').then($promise.resolve);
        });
        return $promise;
    }
    $.when(mw.loader.using([
        'mediawiki.api',
        'oojs-ui-windows'
    ]), waitForI18n()).then(init);
})(window.jQuery, window.mediaWiki);