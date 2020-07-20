/**
 * A variant of WHAM with a different modal
 * Includes functionality to delete forum/message wall threads and selective
 * deleting of pages, which the original lacks
 * Original "WHAM" - https://dev.wikia.com/wiki/MediaWiki:WHAM/code.js
 * @author Ozank Cx
 */
mw.loader.using('mediawiki.api').then(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgPageName',
        'wgUserGroups',
        'wgUserName'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Contributions' ||
        !/rollback|content-moderator|threadmoderator|sysop|bureaucrat|vstf|staff|helper|global-discussions-moderator|wiki-manager|content-team-member/.test(config.wgUserGroups.join()) ||
        window.WHAMLoaded
    ) {
        return;
    }
    window.WHAMLoaded = true;
 
    if (!window.dev || !window.dev.i18n) {   
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:WHAM.css'
    });
    var username = config.wgPageName.split('/')[1],
        token = mw.user.tokens.get('editToken'),
        delay = window.WHAMDelay || 100,
        deleteReason,
        duration,
        blockReason,
        deleteArray,
        Api = new mw.Api(),
        i18n,
        progress = 'https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif',
        $button;
 
    function apiDelete(page, reason) {
        Api.post({
            action: 'delete',
            title: page,
            reason: reason,
            bot: true,
            token: token
        }).done(function(d) {
            if (d.error) {
                console.log(
                    i18n.msg('do-delete-fail', page, d.error.code).plain()
                );
            } else {
                console.log(i18n.msg('do-delete-success', page).plain());
            }
        }).fail(function() {
            console.log(
                i18n.msg(
                    'do-delete-fail',
                    page,
                    i18n.msg('ajax-error').plain()
                ).plain()
            );
        });
    }
 
    function doRollback() {
        var $links = $('.mw-rollback-link a'),
            len = $links.length;
        if (len === 0) {
            $('#status-wham').text(i18n.msg('do-rollback-done').plain());
        }
        $links.each(function(i) {
            var href = new mw.Uri($(this).attr('href')).extend({
                bot: 1
            }).toString();
            setTimeout(function() {
                $.get(href);
                $('#status-wham').html(
                    i18n.msg('do-rollback-status').escape() +
                    $('<img>', {
                        src: progress
                    }).prop('outerHTML')
                );
                if (i === len - 1) {
                    $('#status-wham').text(
                        i18n.msg('do-rollback-done').plain()
                    );
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
        deleteArray = [];
 
        $('#mw-content-text ul li').each(function() {
            var title = $(this).children('a').first().attr('title');
            if (!title.match(/\/@comment-/)) {
                return;
            }
            deleteArray.push(title);
        });
 
        $('li .newpage ~ a').each(function() {
            var title = new mw.Title($(this).attr('title'));
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
                        src: progress
                    }).prop('outerHTML')
                );
                apiDelete(v, deleteReason);
                if (i === deleteArray.length - 1) {
                    $('#status-wham').text(i18n.msg('do-delete-done').plain());
                }
            }, i * delay);
        });
    }
 
    function doBlock() {
        duration = prompt(
            i18n.msg('do-block-duration').plain(),
            window.WHAMBlockDuration || 'infinite'
        );
        if (!duration) {
            return;
        }
        blockReason = prompt(
            i18n.msg('do-block-reason').plain(),
            window.WHAMBlockReason || i18n
                .inContentLang()
                .msg('[[Help:Sockpuppet|Socking]]/ban evasion.')
                .plain()
        );
        if (!blockReason) {
            return;
        }
        Api.post({
            action: 'block',
            user: username,
            expiry: duration,
            nocreate: 0,
            autoblock: 0,
            reason: blockReason,
            bot: true,
            token: token
        }).done(function(d) {
            if (d.error) {
                alert(
                    i18n.msg('do-block-fail', username, d.error.code).plain()
                );
            } else {
                console.log(i18n.msg('do-block-success', username).plain());
            }
        }).fail(function() {
            alert(
                i18n.msg(
                    'do-block-fail',
                    username,
                    i18n.msg('ajax-error').plain()
                ).plain()
            );
        });
    }
 
    function doBot() {
        Api.get({
            action: 'query',
            list: 'users',
            ustoken: 'userrights',
            ususers: config.wgUserName
        }).done(function(data) {
            var params = {
                action: 'userrights',
                user: config.wgUserName,
                reason: window.WHAMBotReason || i18n
                    .inContentLang()
                    .msg('default-delete-reason')
                    .plain(),
                bot: true,
                token: data.query.users[0].userrightstoken
            };
            params[
                config.wgUserGroups.indexOf('bot') === -1 ?
                    'add' :
                    'remove'
            ] = 'bot';
            Api.post(params).done(function(d) {
                if (d.error) {
                    console.log(i18n.msg('bot-me-fail', d.error.code).plain());
                } else {
                    console.log(i18n.msg('bot-me-done').plain());
                }
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
                title = new mw.Title($('.mw-revdelundel-link').exists() ?
                    $this.parent().children('a').eq(0).attr('title') :
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
            location.reload();
        }, 5000);
    }
 
    function checkSelectiveDelete() {
        var $this = $(this),
        uncheck = $this.text() === i18n.msg('selective-delete-uncheck').plain();
        $('.selectiveDel').each(function() {
            var chkObj = $(this);
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
        $('#form-main').closeModal();
        if ($('#btn-wham-del').exists() && $('#btn-wham-check').exists()) {
            return;
        }
        var $chk = $('<input>', {
            'class': 'selectiveDel',
            'type': 'checkbox'
        });
        $('#mw-content-text')
            .find('ul')
            .last()
            .before(
                $('<a>', {
                    'class': 'button',
                    'id': 'btn-wham-del',
                    'text': i18n.msg('start-selective-delete').plain()
                }),
                ' ',
                $('<a>', {
                    'class': 'button',
                    'id': 'btn-wham-check',
                    'text': i18n.msg('selective-delete-check').plain()
                })
            );
 
        $('li .newpage ~ a').each(function() {
            if (!$(this).parent().find('input').length) {
                $(this).parent().prepend($chk.clone());
            }
        });
 
        $('#mw-content-text ul li').each(function() {
            var $this = $(this),
                title = $this.children('a').first().attr('title');
            if (title.match(/-|\/@comment/) && !$this.find('input').length) {
                $this.prepend($chk.clone());
            }
        });
        $('#btn-wham-del').click(doSelectiveDelete);
        $('#btn-wham-check').click(checkSelectiveDelete);
    }
 
    function doAll() {
        doBlock();
        if (duration || blockReason) {
            doDelete();
            if ($('.tabs li:first-child a:not(.new)').exists()) {
                if (confirm(i18n.msg('userpage-delete-confirm').plain())) {
                    apiDelete(config.wgFormattedNamespaces[2] + ':' + username, window.WHAMDeleteReason || i18n.inContentLang().msg('default-delete-reason').plain());
                }
            }
            if (deleteReason) {
                doRollback();
            }
        }
    }
 
    function click() {
        $.showCustomModal(i18n.msg('title').escape(), '', {
            id: 'form-main',
            width: 260,
            height: 190,
            buttons: [{
                message: i18n.msg('do-delete').escape(),
                defaultButton: true,
                handler: doDelete
            }, {
                message: i18n.msg('start-selective-delete').escape(),
                defaultButton: true,
                handler: startSelectiveDelete
            }, {
                message: i18n.msg('do-rollback').escape(),
                defaultButton: true,
                handler: doRollback
            }, {
                message: i18n.msg('do-block').escape(),
                defaultButton: true,
                handler: doBlock
            }, {
                message: i18n.msg('do-all').escape(),
                defaultButton: true,
                handler: doAll
            }, {
                message: i18n.msg('close-wham').escape(),
                id: 'close-wham'
            }]
        });
        $('#close-wham').after($('<div>', {
            id: 'status-wham'
        }));
        $('#close-wham,.close').click(function() {
            $('#form-main').closeModal();
            location.reload();
        });
 
        // Bot button
        if (
            window.WHAMBotMe === true ||
            /vstf|staff|helper/.test(config.wgUserGroups.join())
        ) {
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
    }
 
    function qlIntegration(QuickLogs) {
        $button.remove();
        QuickLogs.addLink('wham', {
            click: click,
            message: i18n.msg('contribs-wham').plain()
        });
    }
 
    function init(i18no) {
        i18n = i18no;
        $button = $('<a>', {
            id: 'contribs-wham',
            click: click,
            title: i18n.msg('contribs-wham-title').plain(),
            text: i18n.msg('contribs-wham').plain()
        });
        $('#contentSub').append(' ', $button);
        mw.hook('QuickLogs.loaded').add(qlIntegration);
    }
 
    function preload(i18no) {
        i18no.loadMessages('WHAM').then(init);
    }
 
    mw.hook('dev.i18n').add(preload);
});