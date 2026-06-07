(function() {
    'use strict';

    // 1. 获取 MediaWiki 的语言和变体设置
    var mwConfig = window.mw && window.mw.config;
    
    var wgUserLanguage = mwConfig ? (mwConfig.get('wgUserLanguage') || 'en') : 'en';
    var wgUserVariant  = mwConfig ? (mwConfig.get('wgUserVariant')  || '')   : '';

    // 【核心修复】：确定最终使用的语言
    // 如果用户把界面设成了英文(或其他非中文)，就无视繁简变体，直接用英文。
    // 只有当用户的界面语言是中文(zh开头)时，我们才去读取 wgUserVariant 看看他到底切了简体还是繁体。
    var effectiveLang = wgUserLanguage;
    if (wgUserLanguage.toLowerCase().indexOf('zh') === 0) {
        if (wgUserVariant && wgUserVariant.toLowerCase().indexOf('zh') === 0) {
            effectiveLang = wgUserVariant;
        }
    }

    var langKey = 'en'; // 默认回退英文
    var langLower = effectiveLang.toLowerCase();

    // 判定简繁
    if (['zh-hans', 'zh-cn', 'zh-sg', 'zh-my'].indexOf(langLower) !== -1 || langLower === 'zh') {
        langKey = 'zh-hans';
    } else if (['zh-hant', 'zh-tw', 'zh-hk', 'zh-mo'].indexOf(langLower) !== -1) {
        langKey = 'zh-hant';
    }

    // 2. 多语言配置
    var i18n = {
        'zh-hans': {
            emptyComment: '快来抢沙发',
            formEntry: '我也来插一嘴...',
            pageCounter: '个文案',
            editBtn: '查漏补缺',
            publishBtn: '公开文案'
        },
        'zh-hant': {
            emptyComment: '快來搶沙發',
            formEntry: '我也來插一嘴...',
            pageCounter: '個文案',
            editBtn: '查漏補缺',
            publishBtn: '公開文案'
        },
        'en': {
            emptyComment: 'Grab the sofa!',
            formEntry: 'Let me chime in...',
            pageCounter: ' copies',
            editBtn: 'Refine page',
            publishBtn: 'Publish copy'
        }
    };

    var texts = i18n[langKey];

    // 3. 替换规则
    var rules = [
        { selector: '[class*="CommentList_empty-state-title"]', newText: texts.emptyComment },
        { selector: '[class*="FormEntryPoint_text"]',            newText: texts.formEntry },
        { selector: '.page-counter__label',                      newText: texts.pageCounter },
        
        // Fandom 顶部的编辑按钮
        { selector: '#ca-edit',                                  newText: texts.editBtn },
        
        // 保存/公开按钮：涵盖传统编辑器(#wpSave)与现代可视化编辑器/OOUI
        { selector: '#wpSave, #wpSaveWidget .oo-ui-labelElement-label, .ve-ui-toolbar-saveButton .oo-ui-labelElement-label', newText: texts.publishBtn }
    ];

    // 4. 安全地替换文本
    function applyRule(el, newText) {
        // 处理 input 类型的按钮
        if (el.tagName === 'INPUT') {
            if (el.value !== newText) el.value = newText;
            return;
        }

        // 寻找第一个包含有效文本的节点（保护 SVG 等内部图标结构）
        var textNodeToReplace = null;
        function findTextNode(node) {
            if (textNodeToReplace) return;
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                textNodeToReplace = node;
            } else if (node.nodeType === Node.ELEMENT_NODE &&
                       node.nodeName !== 'SCRIPT' &&
                       node.nodeName !== 'STYLE') {
                node.childNodes.forEach(findTextNode);
            }
        }
        
        findTextNode(el);

        // 如果找到了文本节点，并且文本还没被替换过，则替换（避免死循环）
        if (textNodeToReplace && textNodeToReplace.nodeValue.trim() !== newText) {
            // 在文本前后加个空格，避免文字与旁边的 SVG 图标贴得太近
            textNodeToReplace.nodeValue = ' ' + newText + ' ';
        }
    }

    // 5. 初始化
    function processAll() {
        rules.forEach(function(rule) {
            document.querySelectorAll(rule.selector).forEach(function(el) {
                applyRule(el, rule.newText);
            });
        });
    }

    processAll();

    // 6. 监控 DOM 变动
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            
            // 应对前端框架直接修改文字（如按钮文字刷新）
            if (mutation.type === 'characterData') {
                var parent = mutation.target.parentNode;
                if (parent && parent.nodeType === Node.ELEMENT_NODE) {
                    rules.forEach(function(rule) {
                        if (parent.matches && parent.matches(rule.selector)) {
                            applyRule(parent, rule.newText);
                        } else if (parent.closest && parent.closest(rule.selector)) {
                            applyRule(parent.closest(rule.selector), rule.newText);
                        }
                    });
                }
                return;
            }

            // 处理新增的 DOM 节点
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        rules.forEach(function(rule) {
                            if (node.matches && node.matches(rule.selector)) {
                                applyRule(node, rule.newText);
                            }
                            if (node.querySelectorAll) {
                                var innerEls = node.querySelectorAll(rule.selector);
                                innerEls.forEach(function(el) {
                                    applyRule(el, rule.newText);
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();