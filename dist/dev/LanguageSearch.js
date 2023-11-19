/** <nowiki>
 * 
 * @module                  LanguageSearch.js
 * @description             Language search filter for FANDOM.
 * @author                  Speedit
 * @version                 1.0.2
 * @license                 CC-BY-SA 3.0
 * @notes                   Experimental.
 * 
 */
(function($, mw) {
    'use strict';

    // Scope limiting & double-run protection.
    window.dev = window.dev || {};
    var $ph = $('.page-header__languages');
    if (
        !$ph.length ||
        window.dev.langSearch
    ) {
        return;
    }
    window.dev.langSearch = {};

    /**
     * Script initialiser.
     * @function            langSearchInit
     */
    function langSearchInit() {
        if (++this.loaded === 4) {
            window.dev.langSearch = new LangSearch();
        }
    }
    langSearchInit.loaded = 0;

    /**
     * Main LanguagesSearch class.
     * @class
     */
    function LangSearch() {
        $ph
            .on('mouseenter.langSearch', this.load.bind(this))
            .find('.wds-list').prepend(this.ui.bind(this));
        if ($ph.children('.wds-dropdown__content').is(':visible')) {
            this.load.bind(this)();
        }
    }
    /**
     * Language data loading.
     * @method              load
     */
    LangSearch.prototype.load = function() {
        // Prevent reloading & fix width.
        var $dc = $ph.children('.wds-dropdown__content');
        $dc.css('min-width', $dc.width());
        $ph.off('mouseenter.langSearch');
        // Load data upon hover.
        this.api = new mw.Api({ ajax: {
            url: 'https://dev.fandom.com/api.php',
            dataType: 'jsonp'
        }});
        var c;
        try {
            c = JSON.parse(localStorage.langSearchCache || '{}');
        } catch(e) {
            delete localStorage.langSearchCache;
            this.$content.remove();
            window.dev.langSearch = new this.constructor();
            return;
        }
        var t = Date.now(),
            a = Number(c.cb || +t-21600000),
            s = (!c.d || !c.cb);
        // API or cache query.
        if (s || +t >= +a+21600000) {
            this.api.get({
                action: 'query',
                format: 'json',
                prop: 'revisions',
                rvprop: 'content',
                titles: 'MediaWiki:Custom-LanguageSearch/registry.json',
                indexpageids: 1
            }).always(this.store.bind(this));
        } else {
            this.render.bind(this)(c.d);
        }
    };
    /**
     * Script data storage.
     * @method              store
     * @param               d
     */
    LangSearch.prototype.store = function(d) {
        d = d.query.pages[d.query.pageids[0]].revisions[0]['*']
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .trim();
        localStorage.langSearchCache = JSON.stringify({ 'd': d, 'cb': Date.now() });
        this.render.bind(this)(d);
    };
    /**
     * Searchbar renderer.
     * @method              render
     */
    LangSearch.prototype.render = function(d) {
        this.data = JSON.parse(d);
        $ph.find('.wds-list')
            .children().not(this.$content)
            .each(this.attr.bind(this));
        this.$content.find('.wikiaThrobber')
            .replaceWith(window.dev.wds.icon('magnifying-glass-tiny'));
        this.$content.find('textarea')
            .prop('disabled', false)
            .on('input.langSearch', this.view.bind(this));
    };
    /**
     * Language attribute handler for search filter.
     * @method              attr
     */
    LangSearch.prototype.attr = function(i, li) {
        var l;
        if (mw.config.get('skin') === 'oasis') {
            l = li.firstElementChild
                .getAttribute('data-tracking')
                .match(/top-([\s\S]+)$/)[1];
        } else {
            l = li.firstElementChild
                .getAttribute('data-tracking-label')
                .match(/lang-([\s\S]+)$/)[1];
        }
        var d = this.data;
        if (!d[l]) {
            throw new Error('Unrecognized language code: ' + l);
        }
        $(li).attr({
             'data-code': l,
             'data-latn': (d[l].latn || '').normalize().toLowerCase(),
             'data-name': (d[l].name || '').normalize().toLowerCase(),
             'data-alt':  (d[l].alt || []).join('|').normalize().toLowerCase()
        });
    };
    /**
     * Script user interface.
     * @method              ui
     * @returns {jQuery} searchbar element
     */
    LangSearch.prototype.ui = function() {
        this.$content = $(window.dev.ui({
            type: 'li',
            classes: [
                'page-header__languages-search',
                'wds-button',
                'wds-is-text'
            ],
            children: [
                {
                    type: 'a',
                    children: [
                        {
                            type: 'div',
                            classes: [
                                'wikiaThrobber'
                            ]
                        },
                        {
                            type: 'textarea',
                            attr: {
                                disabled: 'disabled'
                            }
                        }
                    ]
                }
            ]
        }));
        return this.$content;
    };
    /**
     * Searchbar view cotroller.
     * @method              view
     */
    LangSearch.prototype.view = function() {
        var search = this.$content.find('textarea').val().toLowerCase().trim();
        this.$style.text(function() {
            return !search.length
            ? ''
            : (function(s) {
                var ret = '.page-header__languages-search ~ li';
                ret += $.map(['name', 'code', 'latn', 'alt'], function(v) {
                    return ':not([data-' + v + '*="' + s + '"])';
                }).join('');
                ret += '{ display: none !important; }';
                return ret;
            }(search));
        });
    };
    /**
     * Inline style node.
     * @member {jQuery}     $style
     */
    LangSearch.prototype.$style = $('<style>', {
        type: 'text/css',
        id: 'languageSearchStyles'
    }).appendTo(document.head);

    // Library dependencies (w:c:dev).
    mw.hook('dev.ui').add(langSearchInit.bind(langSearchInit));
    mw.hook('dev.wds').add(langSearchInit.bind(langSearchInit));
    ['UI-js/code', 'WDSIcons/code'].forEach(function(s) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:' + s + '.js'
        });
    });

    // Script styling.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:LanguageSearch.css'
    }).then(langSearchInit.bind(langSearchInit));

    // MediaWiki API module.
    mw.loader.using('mediawiki.api').then(langSearchInit.bind(langSearchInit));

})(jQuery, mediaWiki);