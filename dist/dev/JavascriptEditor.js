/** <nowiki>
 * 
 * @description             JavaScript and JSON Ace editor.
 * @module                  dev.codeeditor.js
 * @namespace               window.dev
 * @author                  Sophiedp
 * @author                  Speedit
 * @license                 CC-BY-SA 3.0
 * @todo                    Add error linting when there are JSON errors on VSTF Wiki.
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.browserDetect'], function (window, $, mw, browserDetect) {
    'use strict';
 
    // Script variables.
    var MODE_JS = 'javascript',
        MODE_JSON = 'json',
        PAGE_EXT = new mw.Title(wgPageName).getExtension() || 'mediawiki',
        EXT_JS,
        EXT_JSON;

    window.dev = window.dev || {};
    if (
        !mw.config.get('wgIsEditPage') ||
        browserDetect.isMobile() ||
        $(document.body).hasClass('codeeditor') ||
        [MODE_JS, MODE_JSON].indexOf(PAGE_EXT) === -1 ||
        window.dev.codeEditorJS
    ) {
        return;
    }
    window.dev.codeEditorJS = true;

    // VSTF Wiki support variables.
    // @notes JSON on the VSTF Wiki uses multi line opening comments.
    var VSTF = window.wgDBname === 'vstf',
        VSTF_EXT_RGX;

    // Generates a custom path regexp for VSTF Wiki JS(ON)? files.
    function vstfExtRgx() {
        return new RegExp(
            '\\.' + '(' +
            EXT_JS + '|' +
            EXT_JSON + ')' + '$'
        , 'gi');
    }

    // Script bootloader.
    // @notes 
    mw.hook('dev.codeeditor.library').add(function(codeEditor) {
        EXT_JS = codeEditor.modelist.modes
            [MODE_JS].extensions;
        EXT_JSON = codeEditor.modelist.modes
            [MODE_JSON].extensions;
        codeEditor.config({
            mode: VSTF
                ? MODE_JS
                : [MODE_JS, MODE_JSON],
            auto: !VSTF,
            rgx: VSTF ? vstfExtRgx() : {}
        });
    });

    // Library import.
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:CodeEditor/library.js'
    });

});