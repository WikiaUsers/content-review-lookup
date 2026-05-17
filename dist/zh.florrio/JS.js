$(function() {
    // ========== 禁止函数列表 ==========
    var forbiddenFunctions = [
        'document.write',
        'document.writeln',
        'window.open',
        'eval',
        'setTimeout',
        'setInterval',
        'Function',
        'location.replace',
        'location.assign',
        'document.cookie',
        'localStorage',
        'sessionStorage',
        'indexedDB',
        'fetch',
        'XMLHttpRequest',
        'WebSocket',
        'navigator.sendBeacon'
    ];

    // ========== 安全检查函数 ==========
    function checkSafety(code) {
        var forbidden = [];
        forbiddenFunctions.forEach(function(fn) {
            if (code.indexOf(fn) !== -1) {
                forbidden.push(fn);
            }
        });
        return forbidden;
    }

    // ========== 显示错误信息 ==========
    function showError(container, message) {
        var errorBox = document.createElement('div');
        errorBox.style.cssText = 'border:2px solid #e74c3c;background:#fdf2f2;padding:12px 16px;margin:8px 0;border-radius:6px;color:#c0392b;font-family:monospace;font-size:14px;';
        errorBox.textContent = message;
        container.parentNode.insertBefore(errorBox, container.nextSibling);
    }

    // ========== 处理外部JS页面导入 ==========
    $('.js-import').each(function() {
        var $this = $(this);
        var page = $this.data('js-page');
        if (!page) return;

        // 验证页面名称格式
        if (!page.match(/\.js$/)) {
            showError(this, '错误：JS页面名称必须以 .js 结尾');
            return;
        }

        // 检查页面是否存在
        var apiUrl = mw.util.wikiScript('api') + '?action=query&titles=' + encodeURIComponent(page) + '&format=json&origin=*';
        $.getJSON(apiUrl, function(data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages);
            if (pageId === '-1') {
                showError($this, '错误：JS页面 "' + page + '" 不存在');
                return;
            }
            // 加载JS页面
            mw.loader.load('/index.php?title=' + encodeURIComponent(page) + '&action=raw&ctype=text/javascript');
        }).fail(function() {
            showError($this, '错误：无法验证JS页面 "' + page + '" 是否存在');
        });
    });

    // ========== 处理内联JS代码 ==========
    $('.js-inline').each(function() {
        var $this = $(this);
        var code = $this.data('js-code');
        if (!code) return;

        // 安全检查
        var forbidden = checkSafety(code);
        if (forbidden.length > 0) {
            showError(this, '安全阻止：包含禁止的函数: ' + forbidden.join(', '));
            return;
        }

        // 执行代码
        try {
            new Function(code)();
        } catch(e) {
            showError(this, 'JS执行错误: ' + e.message);
            console.error('JS模板执行错误:', e);
        }
    });
});