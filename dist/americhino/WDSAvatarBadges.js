/* <nowiki>
 * 
 * @module          WDSIcons
 * @description     Wikia Design System icon library for userscripts.
 * @author          TK-999
 * @author          Speedit
 * @version         1.2.5
 * @license         CC-BY-SA 3.0
 * 
 */
;(function (window, $, mw, undefined) {
    'use strict';
 
    // Double-run protection
    window.dev = window.dev || {};
    if (window.dev.wds) {
        return;
    }
 
    /**
     * Numeric size map for iconsets.
     * @type        {Object.<Number>}
     */
    var sizemap = {
        'standard': 24,
        'small': 18,
        'tiny': 12
    };
 
    /**
     * Library list for use in validation
     * @type        {Array.<String>}
     */
    var iconset = [];
 
    /**
     * Validator function for icons
     * @param        {String} n icon name
     * @returns      {boolean} validation status
     * @private
     */
    function validate(n) {
        var filename = 'wds-avatar-badges-' + n;
        if (iconset.indexOf(filename) > -1) {
            return true;
        } else {
            console.error('WDSIcons: Invalid asset name "' + n + '" supplied.');
            return false;
        }
    }
 
    /**
     * Initialiser to fetch and prepare WDS sprite.
     * @function    init
     * @private
     */
    function init() {
        $.get('https://images.wikia.nocookie.net/common/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/sprite.svg', function(d) {
            // Initialize icon system
            var $sprite = $(d.rootElement)
                .removeAttr('style')
                .attr({
                    'id': 'dev-wds-sprite',
                    'class': 'wds-hidden-svg',
                });
            // Restriction to icon assets
            $sprite.children([
                'defs',                                 // Unneeded definitions
                'symbol:not([id^="wds-avatar-badges"])'         // Non-icon asset types
            ].join(',')).remove();
            // Populate registry
            iconset = iconset.slice.call($sprite.children())
                .map(function(s) {
                    return s.id.split('.')[0];
                });
            // Sprite embedding
            $sprite.prependTo(document.body);
            // Globally expose library
            window.dev.wds = {
                iconset: iconset,
                sizemap: sizemap,
                icon: icon,
                render: render
            };
            // Dispatch hook
            mw.hook('dev.wds').fire(window.dev.wds);
        });
    }
 
    /**
     * @method       icon
     * @param        {String} n icon name
     * @returns      {SVGElement}
     */
    function icon(n) {
        if (!validate(n)) {
            return;
        }
        var sn = n.split('-').slice(-1)[0],
            sv = sizemap.hasOwnProperty(sn),
            s = sv ? sizemap[sn] : sizemap.standard;
        return $($('<svg>').attr({
            'xmlns': 'http://www.w3.org/2000/svg',
            'height': s,
            'width': s,
            'viewBox': [0, 0, s, s].join(' '),
            'class': function() {
                    return 'wds-avatar-badges';
            },
            'id': 'wds-avatar-badges-' + n
        }).append(
            $('<use>', {
                'xlink:href': '#wds-avatar-badges-' + n
            })
        ).prop('outerHTML')).get(0);
    }
 
    /**
     * Renderer for WDS icons
     * @method       render
     * @param        {DOMString|DOMNode} selector or node
     * @returns      {jQuery.<Node>}
     */
    function render(selector) {
        $(selector).find('.dev-wds-icon').each(function() {
            var name = this.id.match(/^dev-wds-icons-([\s\S]+)/)[1];
            if (!!name.length) {
                // Remove 'dev' class and identifier.
                this.classList.remove('dev-wds-icon');
                this.removeAttribute('id');
                // Generate our icon node.
                var asset_inject = icon(name);
                // Pass through attributes.
                $.each(this.attributes, function(i, m) {
                    var n = m.name,
                        v = m.value;
                    // Failsafe for classes
                    if (n === 'class') {
                        var cL = v.split(/\s+/);
                        if (cL.indexOf('wds-icon') === -1) {
                            cL.unshift('wds-icon');
                        }
                        ['small', 'tiny'].forEach(function(s) {
                            if (
                                name.split('-').slice(-1)[0] === s &&
                                cL.indexOf(s) === -1
                            ) {
                                cL.unshift('wds-icon-' + s);
                            }
                        });
                        v = cL.join(' ');
                    }
                    // Modify attributes
                    asset_inject.setAttribute(n, v);
                });
                // Node replacement
                $(this).replaceWith(asset_inject);
            }
        });
        return $(selector);
    }
 
    // Library bootloader
    mw.loader.using(['mediawiki.util', 'jquery']).then(init);
 
}(this, jQuery, mediaWiki));
/* </nowiki> */