/* ==================== 讨论版智能预加载 ==================== */
$(function () {
    'use strict';
    var head = document.head;
    var discussionsPath = '/f';

    // ========== 智能感知开关 ==========

    // 1. 检测非 Wi-Fi 环境：移动网络下直接关闭预加载
    var isCellular = false;
    if (navigator.connection) {
        var type = navigator.connection.type || navigator.connection.effectiveType;
        isCellular = type === 'cellular' || type === 'slow-2g' || type === '2g';
    }

    // 2. 检测弱网：下行速度估值 < 1.5Mbps 视为弱网
    var isWeakNetwork = false;
    if (navigator.connection && navigator.connection.downlink !== undefined) {
        isWeakNetwork = navigator.connection.downlink < 1.5;
    }

    // 3. 检测服务器压力：ResourceTiming 分析最近 5 次同域请求的响应时间
    var isServerBusy = false;
    if (window.performance && performance.getEntriesByType) {
        try {
            var entries = performance.getEntriesByType('resource');
            var sameOrigin = entries.filter(function (e) {
                return e.name.indexOf(location.host) !== -1;
            });
            var recent = sameOrigin.slice(-5);
            if (recent.length > 0) {
                var avgDuration = recent.reduce(function (sum, e) {
                    return sum + e.duration;
                }, 0) / recent.length;
                isServerBusy = avgDuration > 3000; // 平均响应 > 3 秒视为服务器压力大
            }
        } catch (e) {
            // 兼容降级，不阻断预加载
        }
    }

    // 如果任一条件触发，跳过预加载
    if (isCellular) {
        console.log('[讨论版预加载] 检测到移动网络，已跳过预加载以节省流量');
        return;
    }
    if (isWeakNetwork) {
        console.log('[讨论版预加载] 检测到弱网环境，已跳过预加载');
        return;
    }
    if (isServerBusy) {
        console.log('[讨论版预加载] 检测到服务器响应缓慢，已跳过预加载');
        return;
    }

    // ========== 通过检测，开始预加载 ==========

    // 预连接（仅建立 TCP + TLS，零流量副作用）
    var preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = discussionsPath;
    head.appendChild(preconnect);

    // 预取讨论版首页
    var prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.href = discussionsPath;
    head.appendChild(prefetch);

    // 鼠标悬停预渲染
    var $discussionsLink = $('a[href$="/f"], a[href*="/f?"]');
    if ($discussionsLink.length) {
        $discussionsLink.on('mouseenter', function () {
            var prerender = document.createElement('link');
            prerender.rel = 'prerender';
            prerender.href = discussionsPath;
            head.appendChild(prerender);
        });
    }

    console.log('[讨论版预加载] 环境检测通过，预加载已启动');
});