(function() {
    // 动态加载opencc-js库
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.js';
    script.onload = initConverter;
    document.head.appendChild(script);

    function initConverter() {
        // 创建简体转繁体转换器
        const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

        // 转换现有页面内容
        convertPage(converter);

        // 监听DOM变化转换新内容
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => convertNode(node, converter));
            });
        });
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            characterData: true
        });
    }

    // 转换整个页面
    function convertPage(converter) {
        convertNode(document.body, converter);
    }

    // 转换单个节点
    function convertNode(node, converter) {
        // 跳过特定元素
        const excludeTags = ['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE'];
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (excludeTags.includes(node.tagName)) return;
            
            // 特殊处理输入框的placeholder
            if (node.tagName === 'INPUT' && node.placeholder) {
                node.placeholder = converter(node.placeholder);
            }
            
            // 递归处理子节点
            node.childNodes.forEach(child => convertNode(child, converter));
        } 
        // 转换文本节点
        else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = converter(node.textContent);
        }
    }
})();