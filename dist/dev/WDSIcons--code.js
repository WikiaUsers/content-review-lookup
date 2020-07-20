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
        badge: 18
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
        company: []
    };

    /**
     * Identifier prefix map for asset types.
     * @type        {Object.<String>}
     * @private
     */
    var prefix = {
        icon: 'wds-icons-',
        badge: 'wds-avatar-badges-',
        company: 'wds-company-'
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
    var spriteUri = mw.config.get('wgScriptPath') + '/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/sprite.svg?t=' +
                    Date.now();

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
                    'class': 'wds-hidden-svg',
                });
            // Restriction to valid assets.
            $sprite.children([
                'symbol[id^="wds-avatar-icon"]',
                'symbol#wds-player-icon-play'
            ].join(',')).remove();
            // Mask IDs need to be unique - temp fix issue by renaming the problematic mask.
            $sprite.find('symbol#wds-icons-external-small g mask').attr('id', 'mask-3');
            $sprite.find('symbol#wds-icons-external-small g g').attr('mask', 'url(#mask-3)');
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
            localStorage.wdsIconsCache = JSON.stringify({
                'age': new Date().getTime(),
                'data': { 'rootElement': $sprite.prop('outerHTML') }
            });
            // Globally expose library.
            window.dev.wds = {
                registry: registry,
                iconset: iconset,
                sizemap: sizemap,
                icon: icon,
                badge: badge,
                company: company,
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
        var s = sizemap.badge,
            i = prefix.badge + n;
        return asset(i, $.extend({}, {
                'data-id': i,
                'viewBox': [0, 0, s, s].join(' ')
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
        var i = prefix.company + n,
            a = $.extend({}, {
                'data-id': i
            }, (o || {}));
        return asset(i, a);
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
        var i = prefix.icon + n,
            c = (o || {}).class ? (o || {}).class : '',
            sn = n.split('-').slice(-1)[0],
            sv = sizemap.icon.hasOwnProperty(sn),
            s = sv ? sizemap.icon[sn] : sizemap.icon.standard;
        delete (o || {}).class;
        var a = $.extend({}, {
                'height': s,
                'width': s,
                'viewBox': [0, 0, s, s].join(' '),
                'class':
                    ((sv && s !== 'standard') ? 'wds-icon wds-icon-' + sn : 'wds-icon') +
                    (!c.length ? '' : ' ' + c),
                'data-id': prefix.icon + n
            }, (o || {}));
        return asset(i, a);
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