/**
 * 07:24, April 28, 2015 (UTC)
 * @desc: Adds a button for easily null editing pages.
 * @author: UltimateSupreme (https://dev.wikia.com/wiki/User:UltimateSupreme)
 * @doc: https://dev.wikia.com/wiki/NullEditButton
 * @License: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 * Used files: [[File:Facebook throbber.gif]]
 */

(function($, mw, window) {
    'use strict';

    var $cc = $('#mw-content-text'),
        i18n, $throbber,
        config = mw.config.get([
            'wgPageName',
            'wgVersion',
            'wgArticleId'
        ]),
        isUCP = config.wgVersion !== '1.19.24',
        $sel = $('.page-header__actions .wds-list, .page-header__contribution-buttons .wds-list').first(),
        spinnerHTML = '<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width=""stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>';

    if (!$sel.length || !$('#ca-edit').length || config.wgArticleId === 0 || window.NullEditButtonLoaded) {
        return;
    }
    window.NullEditButtonLoaded = true;

    function finish(cls, msg) {
        $throbber.remove();
        $('#ca-null-edit').text(i18n.msg('text').plain());
        if (isUCP) {
            mw.loader.using('mediawiki.notification', function() {
                mw.notification.notify(i18n.msg(msg).escape(), {
                    tag: 'nullEditButton'
                });
            });
        } else {
            require(['BannerNotification'], function(BannerNotification) {
                new BannerNotification(i18n.msg(msg).escape(), cls).show();
            });
        }
    }

    // Get the page
    function getPage() {
        $('#null-edit-text').text(i18n.msg('getting').plain());
        $cc.load(window.location.href + ' #mw-content-text', function () {
            finish('confirm', 'success');
            // Fix collapsibles, sortables and tabber
            mw.hook('wikipage.content').fire($cc);
        });
    }

    function onError() {
        finish('error', 'failed');
    }

    // Ajax edit the page
    function edit() {
        $throbber = $('<div>', {
            id: 'null-edit-throbber',
            css: {
                background: 'rgba(255, 255, 255, 0.5)',
                position: 'fixed',
                height: '100%',
                width: '100%',
                left: '0',
                top: '0',
                'z-index': '1000000000'
            },
            html: spinnerHTML
        }).appendTo(document.body);
        $('#ca-null-edit').html(
            $('<img>', {
                id: 'null-edit-throbber',
                src: 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif'
            }),
            $('<span>', {
                id: 'null-edit-text',
                text: i18n.msg('editing').plain()
            })
        );
        new mw.Api().post({
            action: 'edit',
            title: config.wgPageName,
            token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
            prependtext: ''
        }).done(getPage).fail(onError);
        return false;
    }

    // Add the button
    function addButton(i18nData) {
        i18n = i18nData;
        i18n.useUserLang();
        $sel.append(
            $('<li>').append(
                $('<a>', {
                    href: '#',
                    accesskey: '0',
                    id: 'ca-null-edit',
                    text: i18n.msg('text').plain(),
                    title: i18n.msg('tooltip').plain()
                }).click(edit)
            )
        );
    }

    // Init
    if (!(window.dev && dev.i18n && dev.i18n.loadMessages)) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('NullEditButton'),
            mw.loader.using('mediawiki.api')
        ).then(addButton);
    });
})(jQuery, mediaWiki, this);