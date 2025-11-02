// javascript for expanding overflowing abilities on click, mostly for accessibility
;(function ($) {
    $(function () {
        var COLLAPSED_H = 80, TRANS_MS = 250;
        function isScrollableEl(el) {
            if (!el || !el.length) return false;
            var n = el[0];
            return n.scrollHeight > n.clientHeight;
        }
        function initAbilityToggles() {
            $('.ability-container').each(function () {
                var $c = $(this), $t = $c.find('.ability-title').first(), $d = $c.find('.ability-desc').first();
                if (!$t.length) return;
                $t.off('.abilityToggle');
                $c.css({ height: COLLAPSED_H + 'px', overflow: 'auto', transition: 'height ' + TRANS_MS + 'ms ease' });
                var canExpand = isScrollableEl($d) || isScrollableEl($c);
                if (!canExpand) {
                    $t.css('cursor', '');
                    $c.data('abilityExpanded', false);
                    return;
                }
                $t.css('cursor', 'pointer');
                if ($c.data('abilityExpanded') === undefined) $c.data('abilityExpanded', false);
                $t.on('click.abilityToggle', function (e) {
                    e.preventDefault();
                    var expanded = $c.data('abilityExpanded') === true;
                    if (expanded) {
                        var curH = $c[0].scrollHeight;
                        $c.css('height', curH + 'px');
                        $c[0].offsetHeight;
                        $c.css('height', COLLAPSED_H + 'px');
                        $c.data('abilityExpanded', false);
                    } else {
                        $c.css('height', 'auto');
                        var fullH = $c[0].scrollHeight;
                        $c.css('height', COLLAPSED_H + 'px');
                        $c[0].offsetHeight;
                        $c.css('height', fullH + 'px');
                        $c.data('abilityExpanded', true);
                        setTimeout(function () {
                            if ($c.data('abilityExpanded')) $c.css('height', 'auto');
                        }, TRANS_MS + 10);
                    }
                });
            });
        }
        initAbilityToggles();
        $(window).on('resize.abilityToggle', function () {
            $('.ability-container').each(function () {
                var $c = $(this);
                if ($c.data('abilityExpanded') === true) {
                    var h = $c[0].scrollHeight;
                    $c.css('height', h + 'px');
                    setTimeout(function () {
                        if ($c.data('abilityExpanded')) $c.css('height', 'auto');
                    }, 50);
                } else $c.css('height', COLLAPSED_H + 'px');
            });
        });
        $('.ability-container img').on('load', function () { initAbilityToggles(); });
        window.rexInitAbilityToggles = initAbilityToggles;
    });
})(jQuery);