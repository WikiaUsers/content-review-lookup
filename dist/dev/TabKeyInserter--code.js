/**
 * 12:41, April 12, 2017 (UTC)
 * <tab> Key Inserter
 * Enables Addition of tab key to code pages (.js/.css/templates)
 * https://dev.wikia.com/wiki/MediaWiki:TabKeyInserter/code.js
 * @author: UltimateSupreme (https://dev.wikia.com/wiki/User:UltimateSupreme)
 * License: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 */
if (({edit: 1, editredlink: 1, submit: 1})[mediaWiki.config.get('wgAction')] === 1) { // Edit pages only
    if ((/\.(?:js|css)$/i).test(mw.config.get('wgPageName')) || mediaWiki.config.get('wgNamespaceNumber') === mediaWiki.config.get('wgNamespaceIds').template) {
        jQuery(function ($) {
            'use strict';
            var $box;
            if (mw.config.get('skin') === 'oasis') {
                $box = $('textarea.cke_source'); // CKE Source mode
            }
            if (!$box || !$box.length) {
                $box = $('#wpTextbox1'); // Monobook Editing / Oasis Raw Source mode
            }

            $box.keydown(function (e) {
                if (e.keyCode === 9) {

                    // get caret position/selection
                    var start = this.selectionStart,
                        end = this.selectionEnd,
                        $this = $(this),
                        value = $this.val();

                    // text before caret + tab + text after caret
                    $this.val(value.substring(0, start) + "\t" + value.substring(end));

                    // put caret at right position again (add one for the tab)
                    this.selectionStart = this.selectionEnd = start + 1;

                    // prevent the focus lose
                    e.preventDefault();
                }
            });
        });
    }
}