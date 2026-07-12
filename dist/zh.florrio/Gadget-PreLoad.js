$(function () {
    var ENABLED = true;
    var failCount = 0;
    var MAX_FAILS = 3;
    var TIMEOUT = 3000;
    var prefetched = {};
    var RECT_WIDTH = 100;
    var RECT_HEIGHT = 100;

    // 检测网络环境
    function checkNetwork() {
        try {
            var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (!conn) return;
            function update() {
                var isCellular = conn.type === 'cellular';
                var isSlow = /slow-2g|2g|3g/.test(conn.effectiveType || '');
                ENABLED = !(isCellular || isSlow);
                if (ENABLED) failCount = 0;
            }
            update();
            conn.addEventListener('change', update);
        } catch (e) {}
    }
    checkNetwork();

    // 预加载单个链接
    function prefetch(url) {
        if (prefetched[url] || !ENABLED) return;
        prefetched[url] = true;

        var ctrl = new AbortController();
        var timeout = setTimeout(function () {
            ctrl.abort();
            failCount++;
            if (failCount >= MAX_FAILS) {
                ENABLED = false;
                console.warn('[Wiki] 服务器繁忙，预加载已自动关闭');
            }
        }, TIMEOUT);

        fetch(url, { signal: ctrl.signal })
            .then(function () {
                clearTimeout(timeout);
                failCount = Math.max(0, failCount - 1);
            })
            .catch(function () {
                clearTimeout(timeout);
                failCount++;
                if (failCount >= MAX_FAILS) {
                    ENABLED = false;
                    console.warn('[Wiki] 服务器繁忙，预加载已自动关闭');
                }
            });
    }

    // 获取矩形内所有链接
    function getLinksInRect(mx, my) {
        var links = [];
        $('a[href^="/wiki/"]').each(function () {
            var $el = $(this);
            var offset = $el.offset();
            if (!offset) return;
            var elX = offset.left + $el.outerWidth() / 2;
            var elY = offset.top + $el.outerHeight() / 2;
            if (Math.abs(elX - mx) <= RECT_WIDTH && Math.abs(elY - my) <= RECT_HEIGHT) {
                links.push(this.href);
            }
        });
        return links;
    }

    // 鼠标移动立即触发，无防抖
    $(document).on('mousemove', function (e) {
        if (!ENABLED) return;
        var links = getLinksInRect(e.clientX, e.clientY);
        links.forEach(function (url) {
            prefetch(url);
        });
    });
});