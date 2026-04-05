// MediaWiki:Gadget-UsernameStyleRemover.js
(function() {
    // 核心样式重置函数
    const resetStyles = (element) => {
        element.style.setProperty('background', 'none', 'important');
        element.style.setProperty('color', 'inherit', 'important');
        element.style.setProperty('font-size', 'inherit', 'important');
        element.style.setProperty('font-weight', 'normal', 'important');
        element.style.setProperty('padding', '0', 'important');
        element.style.setProperty('border', '0', 'important');
        element.style.setProperty('border-radius', '0', 'important');
        element.style.setProperty('text-shadow', 'none', 'important');
        element.style.setProperty('text-decoration', 'none', 'important');
        
        // 清除伪元素内容
        element.style.setProperty('--before-content', 'none', 'important');
        element.style.setProperty('--after-content', 'none', 'important');
    };

    // 用户名关键词列表
    const usernameKeywords = [
        "Baichen2022", "F12-2023", "F12-2024", "InihilityI", 
        "同或", "%E5%90%8C%E6%88%96", 
        "Bbl15-Antagonisms", "Wofenhaodiula", "TerraCalamit", "Guest114514",
        "苍山如海", "%E8%8B%8D%E5%B1%B1%E5%A6%82%E6%B5%B7", 
        "你干嘛", "%E4%BD%A0%E5%B9%B2%E5%98%9B", 
        "Silvefish", "Xxx6QaQ9", "WanYiFan", "Florrgod", "XianglangaFriend", 
        "Lxl1017", "Hsk121212", "Xianglanga", "EtCoder",
        "滥用过滤器", "%E6%BB%A5%E7%94%A8%E8%BF%87%E6%BB%A4%E5%99%A8", 
        "CheeseGivesUUltimatum", "QQ3596388288"
    ];

    // 创建全局伪元素清除样式
    const createPseudoElementStyles = () => {
        const style = document.createElement('style');
        style.id = 'username-pseudo-reset';
        style.textContent = `
            /* 清除所有用户名的 ::before 和 ::after 伪元素 */
            .username::before,
            .username::after,
            .userLink::before,
            .userLink::after,
            .user a::before,
            .user a::after,
            .user-identity-header__title::before,
            .user-identity-header__title::after {
                content: none !important;
                display: none !important;
                background: none !important;
                width: 0 !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
            }
            
            /* 清除特殊前缀/后缀容器 */
            .username-prefix, 
            .username-suffix,
            .prefix,
            .suffix,
            .user-identity-header__attributes {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                font-size: 0 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // 主处理函数
    const processElements = () => {
        // 基础选择器处理
        const baseSelectors = [
            '.user a', 
            '.userLink', 
            '.username',
            '.username a',
            '.user-identity-header__title'
        ];
        
        baseSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.dataset.styleReset) {
                    resetStyles(element);
                    element.dataset.styleReset = 'true';
                }
            });
        });
        
        // 用户名关键词处理
        usernameKeywords.forEach(keyword => {
            const selector = `a[href*="${keyword}"]`;
            document.querySelectorAll(selector).forEach(element => {
                if (!element.dataset.styleReset) {
                    resetStyles(element);
                    element.dataset.styleReset = 'true';
                }
            });
        });
    };

    // 初始执行
    $(function() {
        // 防止重复加载
        if (window.usernameStyleRemoverLoaded) return;
        window.usernameStyleRemoverLoaded = true;
        
        // 创建全局伪元素清除样式
        createPseudoElementStyles();
        
        // 首次执行
        processElements();
        
        // 监听动态内容加载
        mw.hook('wikipage.content').add(function() {
            setTimeout(processElements, 300);
        });
        
        // DOM变动观察
        const observer = new MutationObserver(processElements);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    });
})();