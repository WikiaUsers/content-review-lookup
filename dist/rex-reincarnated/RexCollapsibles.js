/* custom-coded collapsibles for desktop, for infoboxes and skins */
$(document).ready(function() {
    $('.rex-collapse-toggle-btn').each(function() {
        var $toggle = $(this);
        var $content = $toggle.closest('.abilities-inner').find('.rex-collapsible-content');

        if ($content.length) {
            $content.show();
            $toggle.closest('.abilities-inner').removeClass('rex-collapsed');

            $toggle.on('click', function() {
                var $inner = $toggle.closest('.abilities-inner');
                var isCollapsed = $inner.hasClass('rex-collapsed');

                if (isCollapsed) {
                    $content.slideDown(200);
                    $inner.removeClass('rex-collapsed');
                } else {
                    $content.slideUp(200);
                    $inner.addClass('rex-collapsed');
                }
            });
        }
    });
    $('.rex-collapse-toggle-btn').each(function() {
        var $toggle = $(this);
        var $wrapper = $toggle.closest('.skins-wrapper');
        var $content = $wrapper.find('.skins-labels.rex-collapsible-content, .skins-entry.rex-collapsible-content');

        if ($content.length) {
            $content.show();
            $wrapper.removeClass('rex-collapsed');

            $toggle.on('click', function() {
                var isCollapsed = $wrapper.hasClass('rex-collapsed');

                if (isCollapsed) {
                    $content.slideDown(200);
                    $wrapper.removeClass('rex-collapsed');
                } else {
                    $content.slideUp(200);
                    $wrapper.addClass('rex-collapsed');
                }
            });
        }
    });
});