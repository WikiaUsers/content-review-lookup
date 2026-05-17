(function() {
    'use strict';

    // 替换规则：选择器 → 新文本
    var rules = [
        { selector: '[class*="CommentList_empty-state-title"]', newText: '快来抢沙发' },
        { selector: '[class*="FormEntryPoint_text"]',          newText: '我也来插一嘴...' },
        { selector: '[class*="page-counter__label"]',          newText: '个文案' },
        { selector: '[class*="wds-button wds-is-text page-header__action-button has-label has-ripple collapsible"]',          newText: '查漏补缺' },
        { selector: '[class*="oo-ui-inputWidget-input oo-ui-buttonElement-button has-ripple"]',          newText: '公开文案' }
    ];

    function applyRule(el, newText) {
        function replace(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = newText;
            } else if (node.nodeType === Node.ELEMENT_NODE &&
                       node.nodeName !== 'SCRIPT' &&
                       node.nodeName !== 'STYLE') {
                node.childNodes.forEach(replace);
            }
        }
        replace(el);
    }

    function processAll() {
        rules.forEach(function(rule) {
            document.querySelectorAll(rule.selector).forEach(function(el) {
                applyRule(el, rule.newText);
            });
        });
    }

    processAll();

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    rules.forEach(function(rule) {
                        if (node.className && node.className.includes(rule.selector.slice(9, -1))) {
                            applyRule(node, rule.newText);
                        }
                        var innerEls = node.querySelectorAll ? node.querySelectorAll(rule.selector) : [];
                        innerEls.forEach(function(el) {
                            applyRule(el, rule.newText);
                        });
                    });
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();