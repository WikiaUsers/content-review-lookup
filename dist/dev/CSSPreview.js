/**
 * @file CSSPreview.js ([[w:c:dev:MediaWiki:CSSPreview.js]])
 * @author 0.Phixley ([[User:0.Phixley]])
 * @description Provides CSS preview functionality on CSS pages.
 * @version 1.0.0
 *
 * @requires MediaWiki
 * @requires jQuery
 *
 * @license CC BY-SA 3.0
 */

(() => {
    'use strict';

    const pageName = mw.config.get('wgPageName');
    if (
        !pageName ||
        !['css', 'sanitized-css'].includes(mw.config.get('wgPageContentModel')) ||
        document.querySelector(`style[data-injected-from="${CSS.escape(pageName)}"]`)
    ) return;

    $(() => {
        const pre = $('.mw-parser-output .mw-highlight-lang-css>pre')[0];
        if (!pre) return;

        const style = $('<style>', {
            text: pre.textContent,
            'data-injected-from': pageName
        }).appendTo('head')[0],
            $link = $('<a>', {
                id: 'ca-csspreview',
                href: '#'
            }).on('click', e => {
                e.preventDefault();
                style.disabled = !style.disabled;
            });
        $('<li>').append($link).prependTo('#p-cactions > ul');

        $.getScript('/load.php?mode=articles&only=scripts&articles=u:dev:MediaWiki:I18n-js/code.js')
            .done(() => {
                window.dev.i18n.loadMessages('CSSPreview', {
                    cacheVersion: 1
                })
                    .done(i18n => {
                        const msg = key => i18n.msg(key).plain();

                        $link.text(msg(style.disabled ? 'enable-preview' : 'disable-preview'))
                            .on('click', () => $link.text(msg(style.disabled ? 'enable-preview' : 'disable-preview')));
                    });
            });
    });
})();