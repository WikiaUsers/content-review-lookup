/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
    var tooltips = $('.type-chart td .tooltip-text');

    tooltips.each(function () {
        $(this).parent().on('mouseenter', function () {
            var tooltip = $(this).find('.tooltip-text');
            var arrow = tooltip.find('.tooltip-arrow');
            var tooltipRect = tooltip[0].getBoundingClientRect();
            var chartRect = $(this).closest('.type-chart')[0].getBoundingClientRect();
            var cellRect = $(this)[0].getBoundingClientRect();

            var excessRight = tooltipRect.right - chartRect.right;
            if (excessRight > 0) {
                tooltip.css('transform', 'translateX(calc(-50% - ' + excessRight + 'px))');
                arrow.css({
                    left: 'calc(50% + ' + excessRight + 'px)',
                    transform: 'translateX(-50%)',
                });
            } else {
                tooltip.css('transform', 'translateX(-50%)');
                arrow.css({
                    left: '50%',
                    transform: 'translateX(-50%)',
                });
            }
        });

        $(this).parent().on('mouseleave', function () {
            var tooltip = $(this).find('.tooltip-text');
            var arrow = tooltip.find('.tooltip-arrow');
            tooltip.css('transform', 'translateX(-50%)');
            arrow.css({
                left: '50%',
                transform: 'translateX(-50%)',
            });
        });
    });
});