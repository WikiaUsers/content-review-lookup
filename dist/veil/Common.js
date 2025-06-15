// --- Veil Wiki Tooltip System (v21 - 首次动画+防卡顿+移除title) ---
(function($) {
    'use strict';

    var $activeTooltip = null;
    var hideTimeout;
    var isAnimating = false;

    function showTooltip($trigger) {
        if (isAnimating) return;
        clearTimeout(hideTimeout);

        var tooltipId = $trigger.data('tooltip-id');
        if (!tooltipId) return;

        var $tooltip = $('#' + tooltipId);
        if ($tooltip.length === 0) return;

        if ($activeTooltip && $activeTooltip.attr('id') === tooltipId && $tooltip.hasClass('visible')) {
            return;
        }

        if ($activeTooltip && $activeTooltip.attr('id') !== tooltipId) {
            $activeTooltip.removeClass('visible');
        }

        var isCurrentlyVisible = $tooltip.hasClass('visible');
        if (isCurrentlyVisible) {
            $tooltip.removeClass('visible slide-from-left slide-from-right');
        }

        $activeTooltip = $tooltip;
        $('body').append($tooltip);

        $tooltip.css({
            display: 'block',
            left: '-9999px',
            top: '-9999px'
        });

        var triggerRect = $trigger[0].getBoundingClientRect();
        var tooltipHeight = $tooltip.outerHeight();
        var tooltipWidth = $tooltip.outerWidth();
        var scrollLeft = window.pageXOffset;
        var scrollTop = window.pageYOffset;

        var baseOffset = 5;
        var rightSideOffset = 30;

        var newLeft = triggerRect.left + scrollLeft + triggerRect.width + rightSideOffset;
        var newTop = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipHeight / 2);

        var slideClass;
        if (newLeft + tooltipWidth > window.innerWidth + scrollLeft) {
            newLeft = triggerRect.left + scrollLeft - tooltipWidth - baseOffset;
            slideClass = 'slide-from-right';
        } else {
            slideClass = 'slide-from-left';
        }

        if (newTop < scrollTop) {
            newTop = scrollTop;
        } else if (newTop + tooltipHeight > window.innerHeight + scrollTop) {
            newTop = scrollTop + window.innerHeight - tooltipHeight;
        }

        $tooltip.css({
            top: newTop + 'px',
            left: newLeft + 'px'
        });

        $tooltip.removeClass('slide-from-left slide-from-right').addClass(slideClass);

        // 触发动画 + 加锁
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                $tooltip.addClass('visible');
                isAnimating = true;
                setTimeout(() => {
                    isAnimating = false;
                }, 300); // CSS 动画时间一致
            });
        });
    }

    function scheduleHideTooltip() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(function() {
            if ($activeTooltip) {
                $activeTooltip.removeClass('visible');
            }
        }, 350);
    }

    var $document = $(document);

    $document.on('mouseenter', '.veil-tooltip-trigger', function() {
        showTooltip($(this));
    });

    $document.on('mouseleave', '.veil-tooltip-trigger', function() {
        scheduleHideTooltip();
    });

    $document.on('mouseenter', '.veil-tooltip', function() {
        clearTimeout(hideTimeout);
    });

    $document.on('mouseleave', '.veil-tooltip', function() {
        scheduleHideTooltip();
    });

    $document.on('transitionend', '.veil-tooltip', function(event) {
        var $tooltip = $(this);
        if (event.originalEvent.propertyName === 'opacity' && !$tooltip.hasClass('visible')) {
            if ($activeTooltip && $activeTooltip.attr('id') === $tooltip.attr('id')) {
                $tooltip.css('display', 'none');
                $activeTooltip = null;
            }
        }
    });

    // 移除所有带 title 的悬浮提示，避免原生气泡干扰
    $(document).ready(function() {
        $('.veil-tooltip-trigger, .veil-tooltip-trigger *').removeAttr('title');
    });

})(jQuery);