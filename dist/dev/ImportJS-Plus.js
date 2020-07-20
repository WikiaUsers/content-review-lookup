(function () {
    'use strict';

    // Script variables
    var conf = mw.config.get([
        'wgIsEditPage',
        'wgPageName'
    ]),
    IMPORTJS_LANG = 'ruby',
    IMPORTJS_PAGE = 'MediaWiki:ImportJS',
    EXT_REGEXP = /(\/(?!span).*\.js|\.js)/g,
    SCRIPT = conf.wgIsEditPage ? 'CodeEditor/library.js' : 'Highlight-js.js';

    // Only run on MediaWiki:ImportJS once.
    if (
        conf.wgPageName !== IMPORTJS_PAGE ||
        (window.dev || {}).importJsPlus
    ) {
        return;
    }
    (window.dev = window.dev || {}).importJsPlus = {};

    // ImportJS-Plus constructor.
    function ImportJSP() {

        if (conf.wgIsEditPage) {
            mw.hook('dev.codeeditor.library').add(this.initEditor.bind(this));
        } else {
            mw.hook('dev.highlight').add(this.initHighlighting.bind(this));
        }

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:' + SCRIPT
        });

    }

    // Highlighting initialiser.
    ImportJSP.prototype.initHighlighting = function(hljs) {
        this.codeBlock = mw.util.$content.children('pre')
            .addClass(IMPORTJS_LANG);

        hljs.loadLanguage(IMPORTJS_LANG)
            .then(this.highlightReady.bind(this));
    };

    // Highlighting logic.
    ImportJSP.prototype.highlightReady = function(hljs) {
        if (Boolean(this.codeBlock.length)) {
            hljs.highlightBlock(this.codeBlock.get(0));
        }
    
        // Highlight the end of the line
        var HLJS_KEYWORD = '<span class="hljs-keyword">$1</span>';
        this.codeBlock.html(function(i, h) {
            return h.replace(EXT_REGEXP, HLJS_KEYWORD);
        });

        // Hide syntax colors in the middle of another color
        this.codeBlock.find('.hljs-number').replaceWith(function() {
            return this.textContent;
        });
    };

    // Ace editor initialization.
    ImportJSP.prototype.initEditor = function(codeEditor) {
        codeEditor.boot(IMPORTJS_LANG)
            .then(this.insertNowiki.bind(this));
    };

    ImportJSP.prototype.insertNowiki = function(codeEditor, ace, aceEditor) {
        var v = codeEditor.session.getValue(),
            NOWIKI = '# <nowiki>',
            NOWIKI_REGEXP = new RegExp(
                '^' + NOWIKI.replace(/\s+/, ' ?')
            );
        if (codeEditor._prefix || NOWIKI_REGEXP.test(v)) {
            return;
        }
        codeEditor._prefix = NOWIKI;
    };

    // ImportJS-Plus bootloader.
    window.dev.importJsPlus = new ImportJSP();
})();