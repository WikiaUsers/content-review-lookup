/* ==================== GPU 硬件加速自动注入 ==================== */
$(function () {
    'use strict';

    // 需要加速的 CSS 选择器（按需增减）
    var SELECTORS = [
        '.modal', '.popup', '.overlay', '.dialog',            // 弹窗遮罩
        '.fandom-sticky-header',                               // Fandom 固定顶栏
        '.article-content',                     // 主内容区
        '[class*="animation"]', '[class*="transition"]'        // 动画元素
    ];

    // 注入的加速属性
    var ACCEL_STYLES = {
        'will-change': 'transform, opacity',
        'transform': 'translateZ(0)',
        'backface-visibility': 'hidden'
    };

    var accelerated = new WeakSet();

    function accelerate(el) {
        if (!el || accelerated.has(el)) return;
        accelerated.add(el);
        var style = el.style;
        Object.keys(ACCEL_STYLES).forEach(function (prop) {
            if (!style[prop]) {
                style[prop] = ACCEL_STYLES[prop];
            }
        });
    }

    function scanAndAccelerate() {
        SELECTORS.forEach(function (sel) {
            try {
                var els = document.querySelectorAll(sel);
                for (var i = 0; i < els.length; i++) {
                    accelerate(els[i]);
                }
            } catch (e) {
                // 选择器无效则跳过
            }
        });
    }

    // 初始扫描
    scanAndAccelerate();

    // 监听 DOM 变化（动态加载的弹窗等）
    if (window.MutationObserver) {
        var observer = new MutationObserver(function (mutations) {
            var shouldScan = false;
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    shouldScan = true;
                    break;
                }
            }
            if (shouldScan) scanAndAccelerate();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 暴露手动加速方法
    window.wikiGPUAccelerate = function (el) {
        accelerate(el);
    };
});