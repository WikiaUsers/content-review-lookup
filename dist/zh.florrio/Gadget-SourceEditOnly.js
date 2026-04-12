(function() {
    // 强制关闭可视化编辑，永远打开源代码编辑
    function switchToSourceEdit() {
        const url = new URL(window.location.href);
        
        // 如果正在使用可视化编辑
        if (url.searchParams.get('veaction') === 'edit') {
            // 移除可视化参数
            url.searchParams.delete('veaction');
            // 切换为源代码编辑
            url.searchParams.set('action', 'edit');
            url.searchParams.set('veswitched', '1');
            // 跳转到新地址（强制刷新）
            window.location.replace(url.toString());
        }
    }

    // 页面一加载就执行
    switchToSourceEdit();

    // 监听 Fandom 动态页面跳转（关键！解决不生效问题）
    window.addEventListener('wikipage.content', switchToSourceEdit);
    window.addEventListener('popstate', switchToSourceEdit);
})();