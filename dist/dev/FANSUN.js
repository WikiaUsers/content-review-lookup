/* <nowiki>
 * 
 * @module                  FANSUN.js
 * @description             Script for official wiki dark theming.
 * @author                  Speedit
 * @version                 1.2.10
 * @license                 CC-BY-SA 3.0
 * @notes                   Install FANSUN.css stylesheet(s) on the official
                            wiki(s) to use this script.
 * 
 */
;(function (window, mw, $) {

    // Double-run protection
    window.dev = window.dev || {};
    if (window.dev.dark) {
        return;
    }

    /**
     * @class               FANSUN
     * @classdesc           The main FANSUN class. Contains script logic
     *                      for post-render dark theming.
     */
    function FANSUN () {
        // Scoping to official wikis + FANSUN CSS import
        this.active =
            this.wikis.indexOf(mw.config.get('wgDBname')) > -1 &&
            $(document.body).css('color').match(/\d+/g).slice(0, 3)
                .map(Number).reduce(this.add) > 459;
        if (!this.active) {
            return;
        }
        // Set up cache array
        this.cache = this.cache || [];
        // Override sassParams
        mw.config.set('wgSassParams', this.sassParams);
        $.extend(window.sassParams, this.sassParams);
        // Dark theme class
        $(document.body).addClass(window.dev.colors
            ? 'oasis-dark-theme ' +
              'menu-dark ' +
              'page-dark'
            : 'oasis-dark-theme'
        ).removeClass('menu-bright page-bright');
        // Editor dark theme
        if (this.darkHighlight.bool) {
            $(document.body).on('animationstart.fansun', $.proxy(this.darkHighlight, this));
        }
        // QDmodal dark theming
        if (mw.libs.QDmodal) {
            mw.libs.QDmodal.loadTheme();
        }
        // Override post-render MediaWiki imports
        $([document.head, document.body]).each($.proxy(this.postRender, this));
    }

    /**
     * Helper method for numeric addition.
     * @method          add
     */
    FANSUN.prototype.add = function(a, c) {
        return +a+c;
    };

    /**
     * SASS parameters for use in JavaScript.
     * @type            {Object.<String>}
     */
    FANSUN.prototype.sassParams = {
        'background-dynamic': 'false',
        'background-image': '',
        'background-image-height': '801',
        'background-image-width': '1700',
        'color-body': '#2c343d',
        'color-body-middle': '#2c343d',
        'color-buttons': '#00b7e0',
        'color-community-header': '#404a57',
        'color-header': '#404a57',
        'color-links': '#00c8e0',
        'color-page': '#39424d',
        'oasisTypography': 1,
        'page-opacity': '100',
        'widthType': 0,
        'wordmark-font': 'cpmono'
    };

    /**
     * Database names for official wikis.
     * @type            {Array.<String>}
     */
    FANSUN.prototype.wikis = [
        'wikia',
        'ca',
        'de',
        'es',
        'fiwikia',
        'frfr',
        'it',
        'ja',
        'kowikia',
        'nlwikia',
        'plwikia',
        'ptcommunity',
        'ruwikia',
        'vicommunity',
        'zh',
        'dev',
        'infobox',
        'vstf',
        'communitycouncil'
    ];

    /**
     * Dark highlighting in Source mode.
     * @method          darkHighlight
     * @see             https://kocka.wikia.com/index.php?title=MediaWiki:Minimalism/VSTF.js&action=raw
     * @see             https://github.com/Wikia/app/blob/dev/extensions/wikia/EditPageLayout/js/plugins/WikitextSyntaxHighlighterQueueInit.js
     */
    FANSUN.prototype.darkHighlight = function(e) {
        if (e.originalEvent.animationName !== this.darkHighlight.animation) {
            return;
        }
        $(document.body).off('animationstart.fansun');
        setTimeout($.proxy(require, null, ['WikiTextSyntaxHighlighter'], this.darkHighlight.syntax, 0));
    };
    FANSUN.prototype.darkHighlight.bool = (
        mw.config.get('wgIsEditPage') &&
        typeof window.ace !== 'object' &&
        typeof window.RTE !== 'object'
    );
    FANSUN.prototype.darkHighlight.syntax = function(sh) {
        sh.reset();
        var $t = $('#wpTextbox1'),
            $p = $t.parent();
        $p.parent().children('#toolbar').after($t);
        $p.remove();
        sh.init($t.get(0), WikiaEditor.plugins.syntaxhighlighterqueueinit.prototype.initDarkThemeColors());
    };
    FANSUN.prototype.darkHighlight.animation = 'fansun__textbox';

    /**
     * Post render MediaWiki import replacement.
     * @method          postRender
     */
    FANSUN.prototype.postRender = function(i, docNode) {
        var o = new MutationObserver($.proxy(function(M) {
            M.forEach($.proxy(function(R) {
                [].slice.call(R.addedNodes).filter(this.isSASS).forEach($.proxy(function(s) {
                    var url = s.getAttribute('href');

                    if (
                        typeof url === 'string' &&
                        !this.cache.includes(url)  &&
                        (url.includes("ffffff%") || url.includes("fff%"))
                    ) {
                        Object.keys(this.sassUtil).forEach($.proxy(function(mode) {
                            $.proxy(this.sassUtil[mode], this)(mode, url, s);
                        }, this));
                    }
                }, this));
            }, this));
        }, this));
        o.observe(docNode, { childList: true });
    };

    /**
     * SASS filter for CSS imports.
     * @method          isSass
     */
    FANSUN.prototype.isSASS = function(n) {
        return (
            n.nodeName.toLowerCase() === 'link' &&
            n.getAttribute('rel') === 'stylesheet' &&
            n.getAttribute('href').indexOf('sass') > -1 &&
            n.getAttribute('href').indexOf('background-dynamic') > -1
        );
    };

    /**
     * SASS filter for CSS imports.
     * @member          sassUtil
     */
    FANSUN.prototype.sassUtil = {};

    /**
     * AssetManager imports.
     * @method      __am
     */
    FANSUN.prototype.sassUtil.__am = function(mode, url, s) {
        if (url.indexOf(mode) === -1 && (url.includes("ffffff%") || url.includes("fff%"))) {
            return;
        }

        // Caching for our unparsed URL
        this.cache.push(url);

        // Array processing for AssetManager link
        // https://slot1-images.wikia.nocookie.net/__am/<StyleVersion>/sasses/<mwSassParams>/<scss>
        var url_a = url.split('/'),
            sass_i = +url_a.indexOf(mode)+3,
            sass_s_new = encodeURIComponent($.param(this.sassParams));

        // URL insertion for new SASS parameters
        url_a.splice(sass_i, 1, sass_s_new);
        var url_new = url_a.join('/');

        // Import override stylesheet
        var newStyle = document.createElement('link');
            newStyle.setAttribute('href', url_new);
            newStyle.setAttribute('rel', 'stylesheet');

        document.head.appendChild(newStyle);
    };

    /**
     * ResourceLoader imports.
     * @method      __load
     */
    FANSUN.prototype.sassUtil.__load = function(mode, url, s) {
        if (url.indexOf(mode) === -1) {
            return;
        }

        // Caching for our unparsed URL
        this.cache.push(url);

        // Array processing for ResourceLoader asset
        // https://slot1-images.wikia.nocookie.net/__load/-/cb%3D1518765819%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26<sassParams>%26sass_wordmark-font%3D<font>%26skin%3D<skin>/<scss>
        var url_a = url.split('/'),
            sass_bounds = [
                'only%3Dstyles%26',
                '%26sass_wordmark-font'
            ],
            sass_p_mw = {},
            sass_i = +url_a.indexOf(mode)+2,
            sass_s_mw;

        // Convert MediaWiki 'mwSassParams' into 'sassParams' format
        for (var k in this.sassParams) {
            sass_p_mw['sass_' + k] = this.sassParams[k];
        }
        sass_s_mw = $.param(sass_p_mw);

        // URL parsing logic to replace SASS parameters
        var sass_rgx = new RegExp(sass_bounds.join('|'));
        var sass_a_url = url.split(sass_rgx);
        sass_a_url.splice(1, 1, sass_bounds[0], sass_s_mw, sass_bounds[1]);

        // Creating new URL
        var sass_s_new = sass_a_url.join('');
        url_a.splice(sass_i, 1, sass_s_new);
        var url_new = url_a.join('/');

        // Import override stylesheet
        var newStyle = document.createElement('link');
            newStyle.setAttribute('href', url_new);
            newStyle.setAttribute('rel', 'stylesheet');

        document.head.appendChild(newStyle);
    };

    // Script bootloader
    $(window).on('load', function () {
        window.dev.dark = new FANSUN();
    });

}(window, mediaWiki, jQuery));