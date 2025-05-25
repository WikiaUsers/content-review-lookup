(function() {
    'use strict';

    // 处理所有展开按钮
    document.querySelectorAll('[class*="custom-collapse-show-"]').forEach(showButton => {
        // 获取唯一标识符
        const suffix = showButton.className.match(/custom-collapse-show-(\S+)/)[1];
        
        // 获取对应元素
        const hideButton = document.querySelector(`.custom-collapse-hide-${suffix}`);
        const contentBody = document.querySelector(`.custom-collapse-body-${suffix}`);
        
        // 初始化状态
        if (hideButton) hideButton.style.display = 'none';
        
        // 展开功能
        showButton.addEventListener('click', function() {
            if (contentBody) contentBody.style.cssText = 'display: block !important';
            if (hideButton) hideButton.style.display = 'inline';
            this.style.display = 'none';
        });
    });

    // 处理所有关闭按钮
    document.querySelectorAll('[class*="custom-collapse-hide-"]').forEach(hideButton => {
        // 获取唯一标识符
        const suffix = hideButton.className.match(/custom-collapse-hide-(\S+)/)[1];
        
        // 获取对应元素
        const showButton = document.querySelector(`.custom-collapse-show-${suffix}`);
        const contentBody = document.querySelector(`.custom-collapse-body-${suffix}`);
        
        // 关闭功能
        hideButton.addEventListener('click', function() {
            if (contentBody) contentBody.style.cssText = 'display: none !important';
            if (showButton) showButton.style.display = 'inline';
            this.style.display = 'none';
        });
    });

})();