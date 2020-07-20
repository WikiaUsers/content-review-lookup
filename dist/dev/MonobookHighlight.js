/* MonobookHighlight - use syntax highlighting in the MonoBook skin */

/*jslint browser */
/*global window, jQuery, mediaWiki, require */

(function ($, mw) {
    'use strict';

    // check for MonoBook skin in edit mode + only run once
    if (
        mw.config.get('skin') !== 'monobook' ||
        $.inArray(mw.config.get('wgAction'), ['edit', 'submit']) === -1 ||
        window.monobookHighlightLoaded
    ) {
        return;
    }
    window.monobookHighlightLoaded = true;

    function runSyntaxHighlighter() {
        // source: https://github.com/Wikia/app/blob/dev/extensions/wikia/EditPageLayout/js/plugins/WikitextSyntaxHighlighterQueueInit.js
        require(['WikiTextSyntaxHighlighter'], function (syntaxHighlighter) {
            var textarea = document.getElementById('wpTextbox1');
            var config = {
                // using light theme colours
                boldOrItalicColor: '#e4e5f3',
                commentColor: '#f8dbda',
                entityColor: '#e8ebda',
                externalLinkColor: '#dbeceb',
                headingColor: '#e4e5f3',
                hrColor: '#e4e5f3',
                listOrIndentColor: '#f8dbda',
                parameterColor: '#f5e0d8',
                signatureColor: '#f5e0d8',
                tagColor: '#f6dde9',
                tableColor: '#f0ebdb',
                templateColor: '#f0ebdb',
                wikilinkColor: '#d9eaf6'
            };
            syntaxHighlighter.init(textarea, config);
        });
    }

    var resources = [
        mw.config.get('wgExtensionsPath') + '/wikia/EditPageLayout/js/plugins/WikitextSyntaxHighlighter.js',
        $.getSassCommonURL('extensions/wikia/EditPageLayout/css/core/syntaxhighlighting.scss')
    ];
    $.getResources(resources, runSyntaxHighlighter);

}(jQuery, mediaWiki));