/* ArrowNavigation
 *
 * Allows to navigate through threads using the arrow keys.
 * Can potentially work for other pages too by modifying ArrowNavigation.selector
 *
 * @todo it's definitely not as flexible as it could be. Make it flex.
 *
 * @author Dorumin
 */

(function() {
    var config = window.ArrowNavigation || {};
    config.selector = config.selector || '#mw-content-text #Wall .SpeechBubble';
    var $items = $(config.selector);
    if (!$items.length) return;
    function isFullyVisible(el) { // true if full element in screen, 1 if top over top of screen, 2 if bottom below bottom of screen
        var rekt = el.getBoundingClientRect(),
        elemTop = rekt.top - ($('#globalNavigation').hasClass('headroom--pinned') ? 55 : 0),
        elemBottom = rekt.bottom + 30;
        return elemTop >= 0 ? (elemBottom <= window.innerHeight ? true : (rekt.height > window.innerHeight ? 1 : 2)) : 1;
    }
    $(document).click(function(e) {
        var $target = $(e.target);
        if ($target.closest(config.selector)) {
            if ($target.closest('a').length) return;
            $('.arrow-navigation-highlighted').removeClass('arrow-navigation-highlighted');
            $target.closest(config.selector).addClass('arrow-navigation-highlighted');
        }
        if ($target.closest('#mw-content-text').exists()) return;
        $('.arrow-navigation-highlighted').removeClass('arrow-navigation-highlighted');
    }).keydown(function(e) {
        var $highlight = $('.arrow-navigation-highlighted'),
        kc = e.keyCode,
        $next;
        if (!$highlight.length || !{38:1,40:1}[kc]) return;
        if (kc == 38) {
            if ($highlight.attr('id') == '2') {
                $next = $('#1');
            } else {
                $next = $highlight.prev(config.selector);
            }
            if (!$next.length) return;
            e.preventDefault();
        } else if (kc == 40) {
            if ($highlight.attr('id') == '1') {
                $next = $('#2');
            } else {
                $next = $highlight.next(config.selector);
            }
            if (!$next.length) return;
            e.preventDefault();
        } else {
            return;
        }
        $highlight.removeClass('arrow-navigation-highlighted');
        $next.addClass('arrow-navigation-highlighted');
        var offset = $next.offset(),
        rekt = $next[0].getBoundingClientRect(),
        visib = isFullyVisible($next.get(0));
        if (visib === true) return;
        if (visib === 1) {
            document.scrollingElement.scrollTop = offset.top - (kc == 38 ? 55 : 0);
        } else {
            document.scrollingElement.scrollTop = offset.top - window.innerHeight + rekt.height + 30;
        }
        if ($next.is('.new-reply')) {
            $next.removeClass('arrow-navigation-highlighted');
            $next.find('textarea').focus();
            document.scrollingElement.scrollTop += 400;
        }
    });
    if (location.hash && $(location.hash).is(config.selector)) {
        $(location.hash).addClass('arrow-navigation-highlighted');
    }
    if (!config.noStyles) {
        var selectors = config.selector
            .split(',')
            .map($.trim)
            .map(function(selector) {
                return selector + '.arrow-navigation-highlighted:not(.message-main),\n' +
                       selector + '.arrow-navigation-highlighted:not(.message-main) + *';
            }).join(',\n');
        mw.util.addCSS(selectors + ' {\n\
            border-top: 1px solid rgba(81, 203, 238, 1);\n\
        }');
    }
})();