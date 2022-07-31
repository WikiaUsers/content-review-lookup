/** <nowiki>
 * 
 * @module          WDSIcons
 * @description     Wikia Design System icon library for userscripts.
 * @author          TK-999
 * @author          Speedit
 * @version         1.4.0
 * @license         CC-BY-SA 3.0
 * 
 */
;(function (window, $, mw) {
    'use strict';

    // Double-run protection
    window.dev = window.dev || {};
    if (window.dev.wds) {
        return;
    }
    window.dev.wds = {};
    
    /**
     * Numeric size map for iconsets.
     * @type        {Object.<Number>}
     */
    var sizemap = {
        icon: {
            'standard': 24,
            'small': 18,
            'tiny': 12
        },
        badge: {
            'standard': 18,
            'small': 14
        },
        vertical: 24
    };

    /**
     * Library list for use in scripts
     * @type        {Array.<String>}
     */
    var iconset = [];

    /**
     * Asset registry for use in validation.
     * @type        {Object.<Array>}
     */
    var registry = {
        icon: [],
        badge: [],
        company: [],
        brand: [],
        vertical: []
    };

    /**
     * Identifier prefix map for asset types.
     * @type        {Object.<String>}
     * @private
     */
    var prefix = {
        icon: 'wds-icons-',
        badge: 'wds-avatar-badges-',
        company: 'wds-company-',
        brand: 'wds-brand-',
        vertical: 'wds-verticals-'
    };

     /**
      * Validator function for icons.
      * @param        {String} n asset name
      * @param        {String} t asset type
      * @returns      {boolean} validation status
      * @private
      */
    function validate(n, t) {
        if (registry[t].indexOf(prefix[t] + n) > -1) {
            return true;
        } else {
            console.error('WDSIcons: Invalid ' + t + ' asset name "' + n + '" supplied.');
            return false;
        }
    }

    /**
     * Sprite URI path (from the FANDOM CDN).
     * @type        {String}
     * @private
     */
    var spriteUri = mw.config.get('wgScriptPath') + '/resources-ucp/v2/dist/svg/sprite.svg?t=' +
                    new Date().toISOString().slice(0,10);

    /**
     * Initialiser to fetch and prepare WDS sprite.
     * @function    init
     * @private
     */
    function init() {
        // Caching logic.
        var c = JSON.parse(localStorage.wdsIconsCache || '{}'),
            t = new Date().getTime(),
            a = Number(c.age || +t-21600000),
            s = (Object.keys(c).length === 0 || typeof c.data === 'undefined'),
            $spriteLoaded = $.Deferred();
        // Post-loading sprite logic.
        $spriteLoaded.done(function(d) {
            // Initialize icon system.
            var $sprite = $(d.rootElement)
                .removeAttr('style')
                .attr({
                    'id': 'dev-wds-sprite',
                    'style': 'position: absolute; height: 0px; width: 0px; overflow: hidden;',
                });
            // Restriction to valid assets.
            $sprite.children('symbol#wds-player-icon-play').remove();
            // Remove clipping paths for some icons that were being cut off.
            $sprite.find('symbol g[clip-path="url(#clip0)"]').attr('clip-path', null);
            // Populate registry.
            $.each(prefix, function(t, p) {
                registry[t] = [].slice.call($sprite.children())
                    .map(function(e) {
                        return e.id;
                    }).filter(function(i) {
                        var r = new RegExp('^' + p);
                        return r.test(i);
                    });
            });
            iconset = registry.icon;
            // Sprite embedding.
            $sprite.prependTo(document.body);
            // Sprite caching.
            try {
                localStorage.wdsIconsCache = JSON.stringify({
                    'age': new Date().getTime(),
                    'data': { 'rootElement': $sprite.prop('outerHTML') }
                });
            } catch (e) {}
            // Globally expose library.
            window.dev.wds = {
                registry: registry,
                iconset: iconset,
                sizemap: sizemap,
                icon: icon,
                badge: badge,
                company: company,
                brand: brand,
                vertical: vertical,
                render: render
            };
            // Dispatch hook.
            mw.hook('dev.wds').fire(window.dev.wds);
        });
        // Fetch sprite.
        if (s || t >= +a+21600000) {
            $.get(spriteUri, $spriteLoaded.resolve);
        } else {
            $spriteLoaded.resolve(c.data);
        }
    }


    /**
     * WDS asset generator.
     * @method       icon
     * @param        {String} i asset identifier
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     * @private
     */
    function asset(i, o) {
        o.xmlns = 'http://www.w3.org/2000/svg';
        return $($('<svg>').attr(o).append(
            $('<use>', {
                'xlink:href': '#' + i
            })
        ).prop('outerHTML')).get(0);
    }

    /**
     * WDS badge generator.
     * @method       badge
     * @param        {String} n badge name
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     */
    function badge(n, o) {
        if (!validate(n, 'badge')) {
            return;
        }
        var i = prefix.badge + n,
            sn = n.split('-').slice(-1)[0],
            sv = sizemap.badge.hasOwnProperty(sn),
            s = sv ? sizemap.badge[sn] : sizemap.badge.standard;
        return asset(i, $.extend({}, {
                'data-id': i,
                'viewBox': [0, 0, s, s].join(' ')
            }, (o || {})));
    }

    /**
     * WDS brand asset generator.
     * @method       brand
     * @param        {String} n icon name
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     */
    function brand(n, o) {
        if (!validate(n, 'brand')) {
            return;
        }
        var i = prefix.brand + n;
        return asset(i, $.extend({}, {
                'data-id': i
            }, (o || {})));
    }

    /**
     * WDS company asset generator.
     * @method       company
     * @param        {String} n icon name
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     */
    function company(n, o) {
        if (!validate(n, 'company')) {
            return;
        }
        var i = prefix.company + n;
        return asset(i, $.extend({}, {
                'data-id': i
            }, (o || {})));
    }

     /**
     * WDS icon generator.
     * @method       icon
     * @param        {String} n icon name
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     */
    function icon(n, o) {
        if (!validate(n, 'icon')) {
            return;
        }
        o = o || {};
        var i = prefix.icon + n,
            c = o.class ? o.class : '',
            sn = n.split('-').slice(-1)[0],
            sv = sizemap.icon.hasOwnProperty(sn),
            s = sv ? sizemap.icon[sn] : sizemap.icon.standard;
        delete o.class;
        return asset(i, $.extend({}, {
                'data-id': prefix.icon + n,
                'height': s,
                'width': s,
                'viewBox': [0, 0, s, s].join(' '),
                'class': 'wds-icon' + (!sv ? '' : ' wds-icon-' + sn) +
                    (!c.length ? '' : ' ' + c)
            }, o));
    }

    /**
     * WDS vertical asset generator.
     * @method       vertical
     * @param        {String} n badge name
     * @param        {Object} o attributes
     * @returns      {SVGElement}
     */
    function vertical(n, o) {
        if (!validate(n, 'vertical')) {
            return;
        }
        o = o || {};
        var i = prefix.vertical + n,
            c = o.class ? o.class : '',
            s = sizemap.vertical;
        delete o.class;
        return asset(i, $.extend({}, {
                'data-id': i,
                'viewBox': [0, 0, s, s].join(' '),
                'class': 'wds-icon wds-is-stroke-icon' + (!c.length ? '' : ' ' + c)
            }, o));
    }

    /**
     * Renderer for WDS assets.
     * @method       render
     * @param        {DOMString|DOMNode} s selector or node
     * @returns      {jQuery.<Node>}
     */
    function render(s) {
        $.each(prefix, function(t, p) {
            $(s).find('[id^="dev-' + p + '"]').each(function() {
                var r = new RegExp('^dev-' + p + '([\\s\\S]+)$'),
                    n = this.id.match(r)[1];
                // Remove developer class and identifier.
                if (t === 'icon') {
                    this.classList.remove('dev-wds-icon');
                }
                this.removeAttribute('id');
                // Attribute extraction.
                var o = {};
                $.each(this.attributes, function(i, m) {
                    o[m.name] = m.value;
                });
                // Asset injection
                $(this).replaceWith(window.dev.wds[t](n, o));
            });
        });
        return $(s);
    }

    // Library bootloader
    mw.loader.using(['mediawiki.util', 'jquery']).then(init);

}(this, jQuery, mediaWiki));
/** </nowiki> **/