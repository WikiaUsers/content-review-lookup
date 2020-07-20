/**
 * Ajax Undo links
 *
 * Adds an Ajax undo link next to the normal undo link on page histories
 * and on diff pages
 *
 * @author Grunny
 * @author Cqm
 *
 * @version 0.5
 */

;(function ($, mw) {
    'use strict';
    if (window.AjaxUndoLoaded) {
        return;
    }
    window.AjaxUndoLoaded = true;

    var conf = mw.config.get([
        'wgArticlePath',
        'wgAction',
        'wgVersion'
    ]);

    var isUCP = conf.wgVersion !== '1.19.24';

    if (!window.dev || !window.dev.i18n) {
        if (isUCP) {
            mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js');
        } else {
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }
    }

    var i18n, api;

    function msg(message) {
        return i18n.msg(message).plain();
    }

    function undoEdit() {
        var $this = $(this),
            url = $this.data().url,
            page = $this.data().page,
            undoId = /&undo=([^&]*)/.exec(url)[1];

        $this.html(
            $('<img>')
                .attr({
                    src: 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
                    alt: msg('undoing'),
                    border: '0'
                })
                .css('vertical-align', 'baseline')
        );
        api.post({
            action: 'edit',
            title: page,
            undo: undoId,
            bot: '1',
            minor: window.AjaxUndoMinor ? undefined : '1',
            summary: window.AjaxUndoSummary,
            token: mw.user.tokens.get(isUCP ? 'csrfToken' : 'editToken')
        }).done(function (data) {
            if (data.edit && data.edit.result === 'Success') {
                $this.text( '(' + msg('undone') + ')' );
            } else {
                $this.text('(' + msg('error') + ')');

                alert(data.error && data.error.code === 'undofailure' ?
                    data.error.info :
                    msg('unknownerror')
                );
            }
        });
    }

    function createUndoLink(url) {
        var uri = new mw.Uri(url);
        return $('<a>', {
            href: '#ajaxundo', // For integration
            'data-url': url,
            'data-page': decodeURIComponent(
                uri.query &&
                    uri.query.title ||
                    uri.path.substring(
                        conf.wgArticlePath
                            .replace('$1', '')
                            .length
                    )
            ),
            text: msg('buttontext'),
            click: undoEdit
        });
    }

    function init(i18nData) {
        i18n = i18nData;
        api = new mw.Api();
        i18n.useUserLang();
        if (conf.wgAction === 'history' && $('.mw-history-undo > a').length) {
            $('.mw-history-undo > a').each(function () {
                var $this = $(this),
                    url = $(this).attr( 'href' ),
                    $link = createUndoLink(url);

                $this.parent().after(' | ', $link);
            });
        } else if ($('table.diff').length && mw.util.getParamValue('diff') !== undefined) {
            var $undoLink = $('table.diff').find('.diff-ntitle > #mw-diff-ntitle1 a:last'),
                url = $undoLink.attr('href'),
                $link = createUndoLink(url);

            $undoLink.parent().append('(', $link, ')');
        }
        mw.hook('quickdiff.ready').add(function() {
            var $undoLink = $('#quickdiff-modal table.diff').find('.diff-ntitle > #mw-diff-ntitle1 a:last'),
                url = $undoLink.attr('href'),
                $link = createUndoLink(url);

            $undoLink.parent().append('(', $link, ')');
        });
    }

    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('AjaxUndo'),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.user',
                'mediawiki.util',
                'mediawiki.Uri'
            ])
        ).then(init);
    });
}(jQuery, mediaWiki));