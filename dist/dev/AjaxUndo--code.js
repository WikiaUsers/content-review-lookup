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
 *
 * Used files: [[File:Facebook throbber.gif]]
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
        'wgVersion',
        'wgCanonicalSpecialPageName',
    ]);

    if (!(window.dev && dev.i18n && dev.i18n.loadMessages)) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }

    var i18n, api;

    function msg(message) {
        return i18n.msg(message).plain();
    }

    function undoEdit() {
        var $this = $(this),
            url = $this.data().url,
            page = $this.data().page,
            undoId = /&undo=([^&]*)/.exec(url)[1],
            summaryPromise,
            defaultSummary = window.AjaxUndoSummary || '';

        if (window.AjaxUndoPrompt) {
            summaryPromise = OO.ui.prompt(msg('summaryprompt'), {
                textInput: {
                    value: defaultSummary
                }
            });
        } else {
            summaryPromise = $.Deferred();
            summaryPromise.resolve(defaultSummary);
        }

        summaryPromise.then(function(summary) {
            if (summary === null) {
                return;
            }
            $this.html(
                $('<img>')
                    .attr({
                        src: 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
                        alt: msg('undoing'),
                        border: '0'
                    })
                    .css('vertical-align', 'baseline')
            );
            return api.post({
                action: 'edit',
                title: page,
                undo: undoId,
                bot: '1',
                minor: window.AjaxUndoMinor ? undefined : '1',
                summary: summary === '' ? undefined : summary,
                token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken')
            });
        }).then(function (data) {
            if (!data) {
                return;
            }
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
        var uri = new URL(url),
        	title = uri.searchParams.get('title');
        return $('<a>', {
            href: '#ajaxundo', // For integration
            'data-url': url,
            'data-page': decodeURIComponent(title ||
                uri.pathname.substring(
                    conf.wgArticlePath
                        .replace('$1', '')
                        .length
                )
            ),
            text: msg('buttontext'),
            click: undoEdit,
            title: msg('undotitle'),
        });
    }

    function init(i18nData) {
        i18n = i18nData;
        api = new mw.Api();
        if (conf.wgAction === 'history' && $('.mw-history-undo > a').length) {
            $('.mw-history-undo > a').each(function () {
                var $this = $(this),
                    url = $(this).prop( 'href' ),
                    $link = createUndoLink(url);

                $this.parent().parent().after($('<span>').append($link));
            });
        } else if ($('table.diff').length && mw.util.getParamValue('diff') !== undefined) {
            const $undoLink = $('table.diff').find('.diff-ntitle .mw-diff-undo a:first'),
                url = $undoLink.prop('href'),
                $link = createUndoLink(url);

            $undoLink.parent().after(' (', $link, ')');
        } else if (conf.wgCanonicalSpecialPageName === 'Contributions'){
        	$('.mw-contributions-list > li:has(.mw-changeslist-diff)').each(function () {
        		const url = $(this).find('.mw-changeslist-diff').prop('href').replace('?diff=prev&oldid=', '?action=edit&undo=');
        		const $link = createUndoLink(url);
                $(this).append($('<span>').append(' (', $link, ')'));
        	});
        }
        mw.hook('quickdiff.ready').add(function() {
            const $undoLink = $('#quickdiff-modal table.diff').find('.diff-ntitle .mw-diff-undo a:first'),
                url = $undoLink.prop('href'),
                $link = createUndoLink(url);

            $undoLink.parent().after(' (', $link, ')');
        });
    }

    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('AjaxUndo'),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.user',
                'mediawiki.util',
                'oojs-ui-windows'
            ])
        ).then(init);
    });
}(jQuery, mediaWiki));