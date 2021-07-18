/** <nowiki>
 *
 * @module                  LangSelect
 * @description             Amends UX of Template:LangSelect.
 * @author                  Speedit
 * @version                 1.7.1
 * @license                 CC-BY-SA 3.0
 *
 */
mw.loader.using('mediawiki.util').then(function () {
    'use strict';

    // Variable caching and script scoping
    window.dev = window.dev || {};
    var $ld = $('.lang-select-data'),
        $ph = $('.page-header__languages'),
        $tn = $('.transclude-notice'),
        $int = $('.WikiaArticleInterlang ul, .page-footer__languages div'),
        conf = mw.config.get([
            'wgAction',
            'wgArticlePath',
            'wgContentLanguage',
            'wgFormattedNamespaces',
            'wgIsArticle',
            'wgNamespaceNumber',
            'wgRelevantPageName',
            'wgUserLanguage'
        ]);
    if (
        window.dev.langSelect ||
        !conf.wgIsArticle ||
        conf.wgAction !== 'view' ||
        !$ld.length ||
        (
            conf.wgNamespaceNumber === 10 &&
            mw.util.$content.find('.template-documentation').length
        )
    ) {
        return;
    }
    window.dev.langSelect = {};

    /**
     * Script initialiser.
     * @function            langSelectInit
     */
    function langSelectInit() {
        window.dev.langSelect = new LangSelect();
    }

    /**
     * @class               LangSelect
     * @classdesc           The main LangSelect class.
     *                      Method determines language variable from the
     *                      DOM, passes the appropriate subpage wikilink
     *                      and fetches i18n.
     * @this                window.dev.langSelect
     */
    function LangSelect() {
        mw.hook('dev.langselect').fire(this);
        // Page arguments.
        var $links = $ph.find('.wds-list a[href]');
        $.extend(this, $ld.data());
        this.userlangExists = Boolean(this.userlangExists);
        this.path = $tn.length
            ? new mw.Uri($tn.children('.text').attr('href')).path
            : window.location.pathname;
        this.parent = this.path.replace(new RegExp('/' + this.lang + '$'), '');
        // Interlanguage navigation styling.
        $int.find('a[data-tracking="' + this.lang + '"]')
            .parent().addClass('selected');
        // LangSelect modifications.
        if ($tn.length) {
            // Link overrides.
            $(this._elements)
                .each(this._edit.bind(this));
            $links.add($int.find('a[href]'))
                .attr('href', this._uselang.bind(this));
            // Base page links.
            if (
                this.path !== window.location.pathname &&
                this._base !== $.noop
            ) {
                window.dev.i18n.loadMessages('LangSelect')
                    .done(this._base.bind(this));
            }
        }
        // Page header modifications.
        if (
            $ph.length &&
            Array.prototype.slice.call($links)
                .every(this._isLocalInterwiki)
        ) {
            $('#ca-talk[href]').attr('href', this._talk.bind(this));
            this._interwiki.bind(this)();
        }
    }
    /**
     * @method              _edit
     * @description         Method assigns the wikilink variable from the
     *                      constructor to any edit buttons.
     */
    LangSelect.prototype._edit = function(i, link) {
        var $link = $(link);
        var uri = new mw.Uri($link.attr('href'));
        uri.path = this.path;
        $link.attr('href', uri.toString()).off('click');
    };
    /**
     * @method              _base
     * @description         Method creates buttons for the base page
     *                      and appends them to the page header.
     * @param               {Object} i18n I18n object.
     * @notes               Please do not remove Monobook support
     *                      (cross-platform portability).
     */
    LangSelect.prototype._base = function(i18n) {
        this._i18n = i18n;
        // URI building from base page.
        var uri = {};
        ['edit', 'history'].forEach(function(a) {
            uri[a] = new mw.Uri(mw.util.getUrl(conf.wgRelevantPageName));
        });
        uri.edit.extend({ action: 'edit' });
        uri.history.extend({ action: 'history' });
        // Create buttons.
        $.each(uri, this._addBaseButton.bind(this));
    };
    /**
     * @method              _addBaseButton
     * @description         Utility method for adding page header links.
     * @param               {string} a Identifier key for button type.
     * @param               {Object} u MediaWiki Uri for button target.
     */
    LangSelect.prototype._addBaseButton = function(a, u) {
        $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list')
            .find('a[id$="-' + a + '"]')
            .parent()
        .after(
            $('<li>', {
                append: $('<a>', {
                    'href': u.getRelativePath(),
                    'id': 'ca-base-' + a,
                    text: this._i18n.msg(a + 'Base').plain()
                })
            })
        );
    };
    /**
     * @method              _interwiki
     * @description         Method updates and extends interwiki, then
     *                      appends new links to the language dropdown.
     * @param               {jQuery} $ph page language dropdown
     * @this                window.dev.langSelect
     */
    LangSelect.prototype._interwiki = function() {
        var $label = $ph.find('.wds-dropdown__toggle span');
        // Add content language link.
        if (this.lang !== conf.wgContentLanguage) {
            this._addInterwikiLink({
                'id': 'i18ndoc-parent',
                'path': new mw.Uri(this.parent).extend({
                    uselang: conf.wgContentLanguage
                }).toString(),
                'lang': conf.wgContentLanguage,
                'text': $label.text()
            });
        }
        // Text override for interwiki dropdown.
        $label.text(this.langName);
        // Add preload link if user language is missing.
        if (!this.userlangExists) {
            var userPath = this.parent + '/' + conf.wgUserLanguage,
                userUri = this._preloadUri(userPath);
            this._addInterwikiLink({
                'id': 'i18ndoc-preload',
                'path': decodeURIComponent(userUri),
                'lang': conf.wgUserLanguage,
                'text': this.userlangName
            });
        }
        // Move languages to the top by order of precedence.
        [conf.wgContentLanguage, this.lang, conf.wgUserLanguage]
            .forEach(this._prefixInterwikiLink, this);
    };
    /**
     * @method              _addInterwikiLink
     * @description         Utility method for adding interwiki links.
     * @param               {Object} opts Link configuration options.
     * @param               {string} opts.class Link class.
     * @param               {string} opts.path Link target path.
     * @param               {string} opts.lang Interwiki language.
     */
    LangSelect.prototype._addInterwikiLink = function(opts) {
        // Fetch interlanguage & page header link.
        var selc = 'a[data-tracking="top-' + opts.lang + '"], a[data-tracking-label="lang-' + opts.lang + '"]';
        // Check if the link exists.
        if (!$ph.find(selc).length) {
            this._linkGenerator(opts);
        }
        var $phEl = $ph.find('.wds-list ' + selc),
            $intEl = $int.find(selc.replace(/top-/, '')),
            $links = $phEl.add($intEl);
        // Move link to the top of the list.
        $links
            .attr('href', opts.path)
            .parent().each(this._prependInterwikiLink);
    };
    /**
     * @method              _prependInterwikiLink
     * @description         Utility method for moving interwiki links to the top.
     * @param               {HTMLLIElement} l Element for interwiki list item.
     */
    LangSelect.prototype._prependInterwikiLink = function(_, l) {
        var p = l.parentNode;
        p.insertBefore(l, p.querySelector('li:not([class])'));
    };
    /**
     * @method              _preloadUri
     * @description         Utility method for gnenerating preload links.
     * @param               {String} path Path to non-existent wiki article.
     */
    LangSelect.prototype._preloadUri = function(path) {
        return new mw.Uri(path).extend({
            'action': 'edit',
            'preload': 'Template:I18ndoc',
            'editintro': 'Template:I18ndoc/editintro',
            'summary': mw.util.wikiUrlencode(this._preloadText)
                .replace(/_/g, '+')
        }).toString();
    };
    /**
     * @method              _linkGenerator
     * @description         Generator for missing links.
     * @param               {Object} opts _addInterwikiLink options.
     * @see                 _addInterwikiLink
     */
    LangSelect.prototype._linkGenerator = function(opts) {
        var selc = 'li:not([class])',
            $link = $('<li>', {
                append: $('<a>', {
                    'id': opts.id,
                    'data-tracking': opts.lang,
                    'data-tracking-label': 'lang-' + opts.lang,
                    'href': opts.path,
                    'text': opts.text
                })
            });
        $link
            .clone().prependTo($int)
            .children().first()
                .attr('data-tracking', function(_, l) {
                    return 'top-' + l;
                })
            .parent()
            .clone().insertBefore(
                $ph.find('.wds-list ' + selc).first()
            );
    };
    /**
     * @method              _prefixInterwikiLink
     * @description         Utility to prefix interwiki links inside lists.
     * @param               {string} lang Language code.
     * @see                 _interwiki
     */
    LangSelect.prototype._prefixInterwikiLink = function(lang) {
        $ph.add($int)
            .find('a[data-tracking$="' + lang + '"]')
            .parent()
            .each(this._prependInterwikiLink);
    };
    /**
     * @method              _uselang
     * @description         Uselang override for documentation base
     *                      pages.
     * @param               {number} h Language link href.
     * @returns             {string} Language subpage link via ?uselang.
     */
    LangSelect.prototype._uselang = function(_, h) {
        return h.replace(/\/([^/]+)$/g, '?uselang=$1');
    };
    /**
     * @method              _talk
     * @description         Talk page redirection for language
     *                      subpages.
     * @param               {string} h talkpage link element
     * @returns             {string}
     * @this                window.dev.langSelect
     */
    LangSelect.prototype._talk = function(_, h) {
        var uri = new mw.Uri(h),
            pageRgx = new RegExp(conf.wgArticlePath.replace('$1','([\\s\\S]+)'));
        uri.path = uri.path.replace(conf.wgRelevantPageName, this.parent.match(pageRgx)[1]);
        return uri.toString();
    };
    /**
     * @method              _isLocalInterwiki
     * @param               {HTMLAnchorElement} a Interwiki link.
     * @returns             {boolean} Whether the link is local.
     */
    LangSelect.prototype._isLocalInterwiki = function(a) {
        return a.getAttribute('href').indexOf('w:c:') === -1;
    };
    /**
     * @member          {string} _preloadText
     * @description     Text to use when preloading the page.
     */
    LangSelect.prototype._preloadText = 'Automatic generation of i18n documentation';
    /**
     * @member          {Object} string
     * @description     Selectors to apply subpage override to.
     */
    LangSelect.prototype._elements = [
        '#ca-edit',
        '#ca-ve-edit',
        '#ca-viewsource',
        '#ca-history'
    ].join(', ');

    mw.hook('dev.i18n').add(langSelectInit);
    if (!(window.dev && window.dev.i18n)) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }

});