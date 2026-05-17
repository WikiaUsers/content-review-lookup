mw.hook('wikipage.content').add(function($content) {
    var $parseroutput = $content.children('.mw-parser-output');

    var configEl = document.querySelector('.collapsible-headers');
    var styles = configEl ? getComputedStyle(configEl) : null;

    function getProp(prop, fallback) {
        if (!styles) return fallback;
        var val = styles.getPropertyValue(prop).trim();
        return val || fallback;
    }

    var isDark       = document.body.classList.contains('theme-fandomdesktop-dark');
    var defaultColor = isDark ? 'white' : 'black';

    var color      = getProp('--ch-color', defaultColor);
    var arrow      = getProp('--ch-arrow', '▼');
    var duration   = getProp('--ch-animation-duration', '0s');
    var easing     = getProp('--ch-easing-style', 'linear');
    var durationMs = parseFloat(duration) * 1000;

    if (!window.CollapsibleHeadersCSSLoaded) {
        window.CollapsibleHeadersCSSLoaded = true;

        mw.util.addCSS([
            '.ch-toggle {',
            '    cursor: pointer;',
            '    font-size: var(--ch-size, 12px);',
            '    float: right;',
            '    margin-right: 8px;',
            '    user-select: none;',
            '    display: inline-block;',
            '}',
            '.ch-toggle--collapsed {',
            '    transform: rotate(-90deg);',
            '}',
            '.ch-outer-wrapper {',
            '    width: 100%;',
            '	 overflow: clip;',
            '}'
        ].join('\n'));
    }

    $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .each(function() {

        var headline = $(this);
        var header = headline.parent();
        if (!header.is('h2, h3, h4, h5, h6')) return;

        var customEl = headline.find('.ch-custom')[0];
        var customData = customEl ? customEl.dataset : {};

        if (customData.chCollapse === 'false') return;

        var headerColor        = customData.chColor              || color;
        var headerArrow        = customData.chArrow              || arrow;
        var headerDuration     = customData.chAnimationDuration  || duration;
        var headerEasing       = customData.chEasingStyle        || easing;
        var headerDurationMs   = parseFloat(headerDuration) * 1000;
        var startCollapsed     = customData.chStartCollapsed === 'true';

        var level = parseInt(header.prop('tagName').substring(1));
        var contentEls = [];
        var next = header.next();

        while (next.length) {
            if (next.is('h2, h3, h4, h5, h6')) {
                var nextLevel = parseInt(next.prop('tagName').substring(1));
                if (nextLevel <= level) break;
            }
            contentEls.push(next[0]);
            next = next.next();
        }

        if (contentEls.length === 0) return;

        var inner = document.createElement('div');
        inner.className = 'ch-inner-wrapper';

        var outer = document.createElement('div');
        outer.className = 'ch-outer-wrapper';

        var parent = contentEls[0].parentNode;
        parent.insertBefore(outer, contentEls[0]);
        contentEls.forEach(function(el) { inner.appendChild(el); });
        outer.appendChild(inner);

        var animating = false;

        var toggle = $('<span>')
            .addClass('ch-toggle')
            .text(headerArrow)
            .attr('role', 'button')
            .attr('tabindex', '0')
            .css({
                'color':      headerColor,
                'transition': 'transform ' + headerDuration + ' ' + headerEasing
            })
            .on('click', function() {
                if (animating) return;

                var collapsed = $(this).data('collapsed');
                animating = true;

                outer.style.transition  = 'height ' + headerDuration + ' ' + headerEasing;
                inner.style.transition  = 'transform ' + headerDuration + ' ' + headerEasing;

                if (collapsed) {
                    var expandHeight = outer.scrollHeight;
                    outer.style.height = expandHeight + 'px';
                    inner.style.transform = 'translateY(0)';
                    $(this).toggleClass('ch-toggle--collapsed', false);
                    $(this).attr('aria-expanded', 'true');

                    setTimeout(function() {
                        outer.style.height = 'auto';
                        animating = false;
                    }, headerDurationMs);

                } else {
                    var currentHeight = outer.scrollHeight;
                    outer.style.height = currentHeight + 'px';
                    outer.offsetHeight;
                    outer.style.height = '0px';
                    inner.style.transform = 'translateY(-' + currentHeight + 'px)';
                    $(this).toggleClass('ch-toggle--collapsed', true);
                    $(this).attr('aria-expanded', 'false');

                    setTimeout(function() {
                        animating = false;
                    }, headerDurationMs);
                }

                $(this).data('collapsed', !collapsed);
            })
            .data('collapsed', false);

        header.prepend(toggle);

        if (startCollapsed) {
            var currentHeight = outer.scrollHeight;
            outer.style.height = '0px';
            inner.style.transform = 'translateY(-' + currentHeight + 'px)';
            toggle.addClass('ch-toggle--collapsed');
            toggle.attr('aria-expanded', 'false');
            toggle.data('collapsed', true);
        } else {
            outer.style.height = 'auto';
        }
    });
});