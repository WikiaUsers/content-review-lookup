// --- Veil Wiki Tooltip System (v22 - 黄金延迟组合) ---
(function($) {
    'use strict';

    var $activeTooltip = null;
    var showTimeout; // 新增：用于延迟显示的计时器
    var hideTimeout;
    var isAnimating = false;

    // --- 推荐的黄金延迟时间 ---
    var SHOW_DELAY = 100; // (ms) 鼠标移入后，延迟多久显示。防止路过触发。
    var HIDE_DELAY = 200; // (ms) 鼠标移出后，延迟多久隐藏。用于移动到Tooltip本身。
    var ANIMATION_DURATION = 300; // (ms) 必须与你的CSS动画时长保持一致！

    function showTooltip($trigger) {
        if (isAnimating) return; // 如果正在播放动画，则不执行任何操作

        var tooltipId = $trigger.data('tooltip-id');
        if (!tooltipId) return;

        var $tooltip = $('#' + tooltipId);
        if ($tooltip.length === 0) return;

        // 如果要显示的已经是当前激活的，则什么都不做
        if ($activeTooltip && $activeTooltip.attr('id') === tooltipId) {
            clearTimeout(hideTimeout); // 如果鼠标移出又快速移回，取消隐藏
            return;
        }

        // 如果有其他Tooltip是激活的，立即隐藏它（无动画）
        if ($activeTooltip) {
            $activeTooltip.removeClass('visible').css('display', 'none');
        }

        $activeTooltip = $tooltip;
        $('body').append($tooltip);

        // --- 以下是你的优秀定位逻辑，保持不变 ---
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
                }, ANIMATION_DURATION);
            });
        });
    }
    
    // 修改：隐藏函数现在只负责一件事：在延迟后移除 'visible' 类
    function scheduleHideTooltip() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(function() {
            if ($activeTooltip) {
                $activeTooltip.removeClass('visible');
            }
        }, HIDE_DELAY);
    }

    var $document = $(document);

    // 修改：mouseenter 事件现在会延迟触发 showTooltip
    $document.on('mouseenter', '.veil-tooltip-trigger', function() {
        var $trigger = $(this);
        // 如果鼠标在显示延迟期间移到另一个触发器，清除上一个待显示的计时
        clearTimeout(showTimeout);
        // 清除可能存在的隐藏计时（例如从tooltip移回到trigger）
        clearTimeout(hideTimeout);
        
        showTimeout = setTimeout(function() {
            showTooltip($trigger);
        }, SHOW_DELAY);
    });

    // 修改：mouseleave 事件现在需要清除“待显示”的计时器
    $document.on('mouseleave', '.veil-tooltip-trigger', function() {
        // 重要：如果鼠标在显示延迟期间就移走了，必须清除待显示的计时器！
        clearTimeout(showTimeout);
        scheduleHideTooltip();
    });
    
    // 以下逻辑保持不变，它们是正确的
    $document.on('mouseenter', '.veil-tooltip', function() {
        clearTimeout(hideTimeout);
    });

    $document.on('mouseleave', '.veil-tooltip', function() {
        scheduleHideTooltip();
    });

    $document.on('transitionend', '.veil-tooltip', function(event) {
        var $tooltip = $(this);
        if (event.originalEvent.propertyName === 'opacity' && !$tooltip.hasClass('visible')) {
            $tooltip.css('display', 'none');
            // 只有当被隐藏的是当前激活的tooltip时，才清空$activeTooltip
            if ($activeTooltip && $activeTooltip.attr('id') === $tooltip.attr('id')) {
                $activeTooltip = null;
            }
        }
    });

    $(document).ready(function() {
        $('.veil-tooltip-trigger, .veil-tooltip-trigger *').removeAttr('title');
    });

})(jQuery);