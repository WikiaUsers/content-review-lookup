/** <nowiki>
 * 
 * @description             Automatic code editor using Ace.
 * @module                  dev.codeeditor.standalone
 * @namespace               window.dev.codeEditorStandalone
 * @author                  Speedit
 * @version                 0.9.4
 * @license                 CC-BY-SA 3.0
 * @notes                   Use CodeEditorTextFallback window variable to
                            consistently run Ace as your desktop editor.
 * 
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.browserDetect'], function (window, $, mw, browserDetect) {
    'use strict';
    window.dev = window.dev || {};
    var conf = mw.config.get([
        'wgNamespaceNumber',
        'wgIsEditPage'
    ]);

    if (
        [2, 4, 8, 10].indexOf(conf.wgNamespaceNumber) === -1 ||
        !conf.wgIsEditPage ||
        browserDetect.isMobile() ||
        $(document.body).hasClass('codeeditor') ||
        window.dev.codeEditorStandalone
    ) {
        return;
    }
    window.dev.codeEditorStandalone = true;

    mw.hook('dev.codeeditor.library').add(function(codeEditor) {
        var fbk = window.CodeEditorHTMLFallback,
            auto = codeEditor.automode.name,
            mode = !fbk ? auto : (auto || codeEditor.html);
        if (mode) {
            codeEditor.boot(mode);
        }
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:CodeEditor/library.js'
    });

});