/** <nowiki>
 *
 * @description             Fandom code editing library for Ace.
 * @module                  dev.codeeditor.library
 * @namespace               window.dev.codeEditor
 * @author                  Speedit
 * @version                 0.9.4
 * @license                 CC-BY-SA 3.0
 * @todo                    Use web notifications when MAIN-18542
 *                          is merged.
 *                          Make code escapes not appear in diffs.
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.browserDetect', 'wikia.loader'], function(window, $, mw, browserDetect, loader) {
    'use strict';

    /**
     * Editor preferences at Fandom (for syntax highlighting).
     * @var                 {RegExp} PREF_OPT_IN
     * @see                 [[Special:Preferences#mw-prefsection-editing]]
     *                      [[github:Wikia/app/blob/dev/extensions/wikia/EditorSyntaxHighlighting/EditorSyntaxHighlighting.hooks.php#L12]]
     * @private
     */
    var PREF_OPT_IN = window.enableWikitextSyntaxHighlighting;

    // Scope limiting.
    window.dev = window.dev || {};
    if (
        !window.wgIsEditPage ||
        browserDetect.isMobile() ||
        (PREF_OPT_IN === false && !window.CodeEditorUserPrefOverride) ||
        $(document.body).hasClass('codeeditor') ||
        window.dev.codeEditor
    ) {
        return;
    }
    window.dev.codeEditor = {};

    // MediaWiki title object.
    var title = new mw.Title(window.wgPageName);

    // MediaWiki URI object.
    var uri = new mw.Uri(window.location.href);

    // WikiaEditor & RTE variable.
    var WE = window.WikiaEditor.getInstance(),
        RTE = window.RTE ? window.RTE.getInstance() : {};
    if (!WE) return;

    // Editor elements.
    var widemode = WE.plugins.sourcewidemode || {},
        $editpage = widemode.$editpage || $('#EditPage'),
        $editform = WE.plugins.pagecontrols.editform || $('#editform'),
        $rail = widemode.$rail || $('#EditPageRail'),
        $editarea = $('#editarea'),
        $toolbar = $('#EditPageToolbar'),
        triggerCls = widemode.triggerClassName || 'editpage-widemode-trigger',
        $trigger = $editpage.find('.' + triggerCls);

    // Editor selectors & configuration.
    var wideCls = widemode.wideClassName || 'editpage-sourcewidemode-on',
        RTE_ELEMENTS = '.EditPageTabs, *[class*="cke"]',
        RAIL_CLASS = 'rail-auto-height',
        TOOLBAR_EXPANDED = 'toolbar-expanded',
        USE_SOURCE = { useeditor: 'source' };
        
    // Code block escape regexp.
    var ESCAPE_REGEX = /^[^\n]*<(nowiki|pre|syntaxhighlight)[^\n]*/;

    // CodeEditor boot success event.
    var LOADING = $.Deferred();

    // CodeEditor boot rejection event.
    var FATAL = $.Deferred().reject({
        error: $.msg('oasis-generic-error')
    });

    // CodeEditor event namespace.
    var EV_NS = '.dev_codeeditor';

    /**
     * Library bootloader.
     * @param               {object} modelist Modelist submodule for CodeEdtitor.
     * @private
     */
    function codeEditorInit(modelist) {
        window.dev.codeEditor = new CodeEditor(modelist);
    }

    /**
     * Script constructor.
     * @class               CodeEditor
     * @param               {object} modelist Modelist submodule for CodeEdtitor.
     * @exports             dev.codeeditor.library
     */
    function CodeEditor(modelist) {
        /**
         * @property       {object} modelist Modelist submodule for CodeEditor.
         * @method         valid Validator for CodeEditor modes.
         */
        this.modelist = modelist;
        this.valid = modelist.modes.hasOwnProperty
            .bind(modelist.modes);

        /**
         * @property       {string} path Current path of wiki page
         *                 (FULLPAGENAME).
         * @property       {string=} automode.name Name of automatic mode.
         * @property       {object} automode Automatic mode object determined
         *                 by modelist.
         * @property       {string} html Name of Ace's 'ace/mode/html'
         *                 submodule.
         */
        this.path = title.toText();
        this.automode = modelist.getModeForPath(this.path) || {};
        this.html = modelist.modes.html.name;

        mw.hook('dev.codeeditor.library').fire(this);
    }

    /**
     * Conditional, configurable boot handler.
     * Initialises editor when all conditionals are valid.
     * @method              config
     * @param               {Object.<Boolean>} opts Configuration object.
     * @param               {String|Array} opts.mode
     *                      Mode(s) for Ace to initialise, by descending priority.
     *                      Fallbacks to automatic mode name based on
     *                      SUBPAGENAME.
     * @param               {String|Array} opts.auto
     *                      Whether CodeEditor should auto-detect file
     *                      language mode (to compare against script
     *                      mode/s).
     *                      A mode array can be supplied in automatic mode.
     * @param               {String|Array} opts.pages
     *                      Page name to test against FULLPAGENAME.
     * @param               {RegExp} opts.regexp
     *                      Regular expression tested against FULLPAGENAME.
     * @returns             {jQuery.Deferred} Script bootloading event; thenable.
     */
    CodeEditor.prototype.config = function(opts) {
        if (typeof opts !== 'object') {
        return this._fail();
        }
        if (opts instanceof Array) {
            opts.forEach(this.config.bind(this));
            return this._success();
        }
        var ext = title.getExtension(),
            auto = this.automode.name,
            modes = opts.modes || opts.mode || auto,
            bools = {},
            mode;

        modes = this._toArray(modes).filter(this.valid);

        mode = modes[0] || auto;

        if (opts.auto === true) {
            var m_i = modes.indexOf(auto);
            bools.auto = Boolean(auto) && m_i !== -1;
            if (bools.auto) mode = modes[m_i];
        }

        bools.mode = Boolean(mode);

        opts.extensions = this._toArray(opts.extensions || opts.ext);
        if (opts.extensions.length !== 0) {
            bools.extensions = !!ext && opts.extensions.some(this._equals(ext));
        }

        opts.pages = this._toArray(opts.pages || opts.page);
        if (opts.pages.length !== 0) {
            bools.pages = opts.pages.some(this._equals(this.path));
        }

        opts.regexp = opts.regexp || opts.rgx;
        if ((opts.regexp || {}) instanceof RegExp) {
            bools.regexp = opts.regexp.test(this.path);
        }

        for (var i in bools) {
            if (!bools[i]) return this._fail();
        }
        return this.boot(mode);

    };

    /** Code editing bootloader.
     * @method              boot
     * @param               {string} mode Mode Ace submodule key.
     * @returns             {jQuery.Deferred} Script bootloading event; thenable.
     */
    CodeEditor.prototype.boot = function(mode) {
        var _ = arguments[1];
        if (
            window.wgEnableCodePageEditor ||
            !$editarea.exists() ||
            typeof mode !== 'string' ||
            !this.modelist.modes[mode]
        ) {
            return this._fail();
        }

        if (window.RTE) {
            var SOURCE = Object.keys(USE_SOURCE)[0];
            if (!$.getUrlVar(SOURCE)) {
                window.location = uri.extend(USE_SOURCE).toString();
            }
            if (!window.RTE.loadTime) {
                this._reboot = setTimeout.bind(window, this.boot.bind(this, mode), 0);
                this._rteWait = true;
                GlobalTriggers.on('WikiaEditorReady', this._reboot);
                return this._success();
            }
            if (this._reboot) {
                if (this._rteWait) {
                    GlobalTriggers.un('WikiaEditorReady', this._reboot);
                    delete this._rteWait;
                }
                delete this._reboot;
            }
            $(RTE_ELEMENTS).addClass('wds-is-hidden');
        }

        /**
         * @property        {string} mode Mode that Ace has booted into.
         */
        this.mode = window.codePageType = mode;

        /**
         * @property        {boolean} _preview Whether the script displays a
         *                  preview.
         * @private
         */
        this._preview = window.showPagePreview = mode === 'html';

        window.wgEnableCodePageEditor = true;
        window.WikiaAutostartDisabled = true;
        window.aceScriptsPath =
            '/__am/' + window.wgStyleVersion + '/one/' +
            encodeURIComponent('minify=1') +
            '/resources/Ace';
        window.showPagePreview = false;

        $rail.find('[id^="wp"]:not(#wpMinoredit)').off();
        $editform.off('submit').on('submit' + EV_NS, this._exit.bind(this));
        $rail.children('.' + RAIL_CLASS).remove();

        $trigger.off().removeAttr('style');

        if (!this._preview) {
            var $nav = $('<nav>', {
                'class': 'wikia-menu-button wikia-menu-button-submit',
                'append': [
                    $('#wpSave').attr({
                        'class': 'codepage-publish-button'
                    }),
                    $('<span>', {
                        'class': 'drop',
                        append: '<img class="chevron">'
                    }),
                    $('<ul>', {
                        'class': 'WikiaMenuElement',
                        append: $('<li>', {
                            append: $('#wpDiff').removeAttr('class')
                        })
                    })
                ]
            });
            $rail.find('.preview_box').replaceWith($nav);
            window.WikiaButtons.add($nav);
        }

        $(document.body).addClass('codeeditor');
        var lib = document.createElement('script');
        lib.addEventListener('load', this._load.bind(this));
        lib.type = 'text/javascript';
        lib.src = window.wgServer + window.aceScriptsPath + '/ace.js';
        document.head.appendChild(lib);

        return this._success();
    };

    /**
     * AssetManager loader for Ace script group.
     * @method              _load
     * @private
     */
    CodeEditor.prototype._load = function() {
        loader({
            type: loader.AM_GROUPS,
            resources: ['ace_editor_js']
        }).then(
            require.bind(
                window,
                [
                    'wikia.ace.editor',
                    'wikia.editpage.ace.editor'
                ],
                this._init.bind(this)
            )
        );
    };

    /**
     * Ace editor initialiser (post-loading).
     * @method              _init
     * @private
     */
    CodeEditor.prototype._init = function(ace, aceEditor) {
        this._we_methods.forEach(this._we_off, this);

        $toolbar = (mw.toolbar && mw.toolbar.$toolbar) ? mw.toolbar.$toolbar.parent() : $toolbar;
        $toolbar.empty();

        if (window.RTE) {
            $(window).off('resize mouseenter', window.RTE.repositionRTEOverlay);
            $(document.body).removeClass('rte rte_source');
        }
        $editpage
            .off('resize mouseenter')
            .on('resize' + EV_NS, $.debounce(100, this._resize))
            .resize();

        // Initialise Ace.
        aceEditor.init();

        // Support 'editwidth' preference.
        if (
            window.wgEditPageWideSourceMode &&
            $editpage.hasClass(wideCls)
        ) {
            $trigger.click();
        }

        /**
         * @property        {Editor} editor Boolean for whether the script has booted.
         * @see             https://ace.c9.io/#nav=api&api=edit_session
         * @property        {EditSession} session Boolean for whether the script has
         *                  booted.
         * @see             https://ace.c9.io/api/editor.html
         */
        this.editor = window.ace.edit('editarea');
        this.session = this.editor.session;
        this._start();

        /**
         * @property {boolean} ready Boolean for whether the script has booted.
         */
        this.ready = true;

        LOADING.resolve(this, ace, aceEditor);
        mw.hook('dev.codeeditor.session').fire(this, ace, aceEditor);
    };

    /**
     * Edit session start handler.
     * Conditional extraction of escape sequences & malformed text.
     * @method              _start
     * @private
     */
    CodeEditor.prototype._start = function() {
        var v = this.session.getValue();

        if (ESCAPE_REGEX.test(v)) {
            /**
             * @property {string} _prefix Prefix of the script's raw code.
             * @private
             */
            this._prefix = v.match(ESCAPE_REGEX)[0];

            this.session.setValue((v = v.replace(ESCAPE_REGEX, '')));
        }

        this.session.setValue((v = v.trim()));

    };

    /**
     * Edit session exit handler.
     * Performs error checking
     * @method              _exit
     * @param               {object} e jQuery form submission event.
     * @todo                Add linting.
     * @private
     */
    CodeEditor.prototype._exit = function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!this.ready) {
            return;
        }

        var $a = (this.session.$annotations || []);
        var err = $a.filter(this._annotationIsError)[0];

        if (!err) {
            if (this._prefix) {
                var v = this.session.getValue();
                v = this._prefix + '\n' + v.trim();
                this.session.setValue(v);
                delete this._prefix;
            }
            $editform.off('submit' + EV_NS).submit();
        } else {
            window.alert('[CodeEditor @L' + err.row-1 + '] ' + err.text);
            this.editor.scrollToRow(err.row-1);
        }
    };

    /**
     * Boot success event getter.
     * @method              _success
     * @see                 http://api.jquery.com/deferred.resolve/
     * @returns             {jQuery.Deferred.promise} Read-only boot success event.
     * @private
     */
    CodeEditor.prototype._success = function() {
        return LOADING.promise();
    };

    /**
     * Failure success event getter.
     * @method              _fail
     * @see                 http://api.jquery.com/deferred.resolve/
     * @returns             {jQuery.Deferred.promise} Read-only boot failure event.
     * @private
     */
    CodeEditor.prototype._fail = function() {
        return FATAL.promise();
    };

    /**
     * Array option mapping & validation utility.
     * @method              _toArray
     * @param               {Array|string} opt Options to map.
     * @returns             {Array} Mapped, filtered options.
     * @private
     */
    CodeEditor.prototype._toArray = function(opt) {
        opt = $.isArray(opt) ? opt : [opt];
        opt = opt.filter(Boolean).map(String);
        return opt;
    };

    /**
     * Equality conditional function generator.
     * @method              _equals
     * @private
     */
    CodeEditor.prototype._equals = function(eq) {
        return function(str) { return str === eq; };
    };

    /**
     * WikiaEditor plugin method removal utility.
     * @method              _we_off
     * @param               {String} path Dot-delimited path to plugin method.
     * @returns             Whether the method was removed.
     * @private
     */
    CodeEditor.prototype._we_off = function(path) {
        path = typeof path === 'string'
            ? path.split('.')
            : [];
        var id = path[0],
            fn = path[1],
            plugin = id ? window.WikiaEditor.plugins[id] : $.noop;
        if (fn && plugin) {
            plugin.prototype[fn] = $.noop;
            return true;
        }
    };
    CodeEditor.prototype._we_methods = [
        'noticearea.initDom',
        'sourcewidemode.sizeChanged'
    ];

    /**
     * Ace annotation error filter.
     * @method              _annotationIsError
     * @param               {Object} a Ace annotation.
     * @param               {Object} a.type Ace annotation type.
     * @private
     */
    CodeEditor.prototype._annotationIsError = function(a) {
        return a.type === 'error';
    };

    /**
     * Resize handler to fix the resize.
     * @method              _resize
     * @param               {Object} e Ace annotation.
     * @param               {Object} a.type Ace annotation type.
     * @private
     */
    CodeEditor.prototype._resize = function(e) {
        $editpage.removeClass(TOOLBAR_EXPANDED);
    };

    // Script bootloader.
    mw.hook('dev.codeeditor.modelist').add(codeEditorInit);
    importArticle(
        {
            type: 'style',
            article: 'u:dev:MediaWiki:CodeEditor/library.css'
        },
        {
            type: 'script',
            article: 'u:dev:MediaWiki:CodeEditor/modelist.js'
        }
    );

});