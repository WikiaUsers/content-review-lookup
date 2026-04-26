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
    var easing     = getProp('--ch-easing-style', 'ease');
    var durationMs = parseFloat(duration) * 1000;

    if (!window.CollapsibleHeadersCSSLoaded) {
        window.CollapsibleHeadersCSSLoaded = true;

        mw.util.addCSS([
            '.ch-toggle {',
            '    cursor: pointer;',
            '    font-size: var(--ch-size, 12px);',
            '    color: ' + color + ';',
            '    float: right;',
            '    margin-right: 8px;',
            '    user-select: none;',
            '    display: inline-block;',
            '    transition: transform ' + duration + ' ' + easing + ';',
            '    transform: rotate(0deg);',
            '}',
            '.ch-toggle--collapsed {',
            '    transform: rotate(-90deg);',
            '}',
            '.ch-outer-wrapper {',
            '    overflow: hidden;',
            '    transition: height ' + duration + ' ' + easing + ';',
            '}',
            '.ch-inner-wrapper {',
            '    transition: transform ' + duration + ' ' + easing + ';',
            '}'
        ].join('\n'));
    }

    $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .each(function() {

        var headline = $(this);
        var header = headline.parent();
        if (!header.is('h2, h3, h4, h5, h6')) return;

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

        outer.style.height = 'auto';

        var animating = false;

        var toggle = $('<span>')
            .addClass('ch-toggle')
            .text(arrow)
            .attr('role', 'button')
            .attr('tabindex', '0')
            .attr('aria-expanded', 'true')
            .on('click', function() {
                if (animating) return;

                var collapsed = $(this).data('collapsed');
                animating = true;

                if (collapsed) {
                    var expandHeight = outer.scrollHeight;
                    outer.style.height = expandHeight + 'px';
                    inner.style.transform = 'translateY(0)';
                    $(this).toggleClass('ch-toggle--collapsed', false);
                    $(this).attr('aria-expanded', 'true');

                    setTimeout(function() {
                        outer.style.height = 'auto';
                        animating = false;
                    }, durationMs);

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
                    }, durationMs);
                }

                $(this).data('collapsed', !collapsed);
            })
            .data('collapsed', false);

        header.prepend(toggle);
    });
});