/*
 * <nowiki>
 * Mark for deletion
 *
 * Adds a button to the toolbar that automatically adds {{delete|reason}} to the top of a page
 * so that users can quickly mark spam or inappropriate pages for deletion
 *
 * https://dev.fandom.com/wiki/MarkForDeletion
 */

/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mw, BannerNotification, importArticle */

(function () {
    'use strict';
    var config = mw.config.get([
        'wgAction',
        'wgNamespaceNumber',
        'wgPageName',
        'wgUserGroups',
        'wgUserName',
        'wgVersion'
    ]);
    if (
        config.wgAction !== 'view' ||
        config.wgNamespaceNumber === -1 ||
        config.wgUserName === null ||
        /content-moderator|sysop|helper|staff|wiki-manager|content-team-member|soap/.test(config.wgUserGroups.join('|')) ||
        window.MarkForDeletionLoaded
    ) {
        return;
    }
    window.MarkForDeletionLoaded = true;
    var i18n, isUCP = config.wgVersion !== '1.19.24';
 
    function setDeleteNotice(deleteReason) {
        var params = {
                action: 'edit',
                title: config.wgPageName,
                summary: i18n.inContentLang().msg('summaryPrefix').plain() + ': ' + deleteReason,
                token: mw.user.tokens.get('editToken'),
                format: 'json'
            };
            params[
                (window.MarkForDeletion || {}).replace ?
                    'text' :
                    'prependtext'
            ] = '{{delete|' + deleteReason + '}}';
        $.ajax({
            type: 'POST',
            url: mw.util.wikiScript('api'),
            data: params,
            success: function (d) {
                if (d && d.error && d.error.code) {
                    if (isUCP) {
                        mw.loader.using('mediawiki.notify').then(function () {
                            mw.notify(i18n.msg('error').plain() + ': ' + d.error.code);
                        });
                    } else {
                        new BannerNotification(
                            i18n.msg('error').escape() + ': ' + d.error.code, 'error'
                        ).show();
                    }
                } else {
                    window.location.reload();
                }
            },
            error: function (code) {
                if (isUCP) {
                    mw.loader.using('mediawiki.notify').then(function () {
                        mw.notify(i18n.msg('error').plain() + ': ' + (code || 'http'));
                    });
                } else {
                    new BannerNotification(i18n.msg('error').escape(), 'error').show();
                }
            }
        });
    }
 
    function click(event) {
        event.preventDefault();
        var promptedDeleteReason = i18n.inContentLang().msg('spam').plain();
        if (window.MarkForDeletion && typeof window.MarkForDeletion.promptedDeleteReason === 'string') {
            promptedDeleteReason = window.MarkForDeletion.promptedDeleteReason;
        }
 
        // TODO: Switch to [[mw:OOUI/Windows/Simple messages]] after UCP Phase 1.
        var deleteReason = window.prompt(i18n.msg('prompt').plain(), promptedDeleteReason);
 
        if (typeof deleteReason === 'string' && deleteReason.length > 0) {
            setDeleteNotice(deleteReason);
        }
    }
 
    function initDeleteNoticeButton(i18na) {
        i18n = i18na;
        var $button = $('<li>').append(
            $('<a>', {
                click: click,
                href: '#',
                id: 'mark-for-deletion-link',
                text: i18n.msg('buttonTitle').plain()
            })
        ), $toolbar = $('#WikiaBarWrapper'),
            $tools = $toolbar.find('li.mytools'),
            $dropdown = $('.page-header__contribution-buttons .wds-list');
 
        if (window.MarkForDeletionEditDropdown && $dropdown.length) {
            // insert link in edit dropdown if user wants that
            $dropdown.append($button);
        } else if ($tools.length) {
            // insert link before My Tools
            $tools.before($button);
        } else {
            // try to insert link before Customize
            $toolbar.find('a.tools-customize').parent().before($button);
        }
    }
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('MarkForDeletion').done(initDeleteNoticeButton);
    });
})();
// </nowiki>