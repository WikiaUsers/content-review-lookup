/* ClickyNavigation
 *
 * Makes the local wiki navigation clicky
 * Don't take it personal use, kid
 */

(function() {
    function makeStyle(selectors, rules) {
        return selectors.join(',\n') + ' {\n' + Object.keys(rules).map(function(key) {
            return '\t' + key + ': ' + rules[key] + ';';
        }).join('\n') + '\n}\n';
    }

    function getLabels() {
        return Array.from(document.querySelectorAll('.wds-tabs__tab-label'));
    }

    function getDefaultTabColor() {
        return getComputedStyle(
            getLabels().filter(function(label) {
                return !label.matches(':hover');
            })[0]
        ).color;
    }

    $('.wds-community-header__local-navigation .wds-dropdown')
        .click(function(e) {
            var $this = $(this);
            if ($this.hasClass('hovered')) return;
            e.preventDefault();
            $this.addClass('hovered');
        }).mouseleave(function() {
            $(this).removeClass('hovered');
        });

    mw.util.addCSS([
        makeStyle(
            [
                '.wds-community-header__local-navigation .wds-dropdown__toggle',
                '.wds-community-header__local-navigation .wds-dropdown__toggle a'
            ],
            {
                cursor: 'pointer'
            }
        ),
        makeStyle(
            [
                '.wds-community-header__local-navigation .wds-dropdown:not(.hovered):not(.wds-is-touch-device):not(.wds-is-not-hoverable):hover .wds-dropdown__content',
                '.wds-community-header__local-navigation .wds-dropdown:not(.hovered):not(.wds-is-touch-device):not(.wds-is-not-hoverable):hover:not(.wds-no-chevron)::before',
                '.wds-community-header__local-navigation .wds-dropdown:not(.hovered):not(.wds-is-touch-device):not(.wds-is-not-hoverable):hover:not(.wds-no-chevron)::after'
            ],
            {
                display: 'none'
            }
        ),
        makeStyle(
            [
                '.wds-community-header__local-navigation .wds-tabs__tab:not(.hovered):hover .wds-tabs__tab-label'
            ],
            {
                color: getDefaultTabColor()
            }
        ),
        makeStyle(
            [
                '.wds-community-header__local-navigation .wds-dropdown:not(.hovered):not(.wds-is-touch-device):not(.wds-is-not-hoverable):hover .wds-dropdown__toggle-chevron'
            ],
            {
                transform: 'none',
                opacity: '.5'
            }
        ),
    ].join('\n'));
})();