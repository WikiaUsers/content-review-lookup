mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function () {
// ==UserScript==
// @name         Fandom/MediaWiki VSCode Edit Button
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  在编辑按钮旁添加“使用VSCode编辑”的选项
// @author       Based on Frederisk's Wikitext Extension Gadget
// @match        *://*.fandom.com/*
// @match        *://*.wikia.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 配置 - 可根据需要修改
    var config = {
        webText: "在线编辑",
        webDropdownText: "在线编辑",
        vscText: "VSC编辑",
        vscDropdownText: "VSC编辑",
        // 如果您的VSCode扩展ID不同，请修改此处
        vscodeExtensionID: 'rowewilsonfrederiskholme.wikitext'
    };

    // 等待页面加载完成
    $(document).ready(function() {
        // 初始尝试添加按钮
        addVSCodeButton();
        
        // 监听DOM变化，防止按钮被动态内容覆盖
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // 检查编辑按钮区域是否被修改
                    var editButton = $('#ca-edit');
                    var vscButton = $('#ca-vsc-edit');
                    
                    // 如果编辑按钮存在但VSC按钮不存在，重新添加
                    if (editButton.length > 0 && vscButton.length === 0) {
                        console.log('检测到DOM变化，重新添加VSCode按钮');
                        addVSCodeButton();
                    }
                }
            });
        });

        // 开始观察页面主体变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 添加一个定时检查作为备用方案
        setInterval(function() {
            var editButton = $('#ca-edit');
            var vscButton = $('#ca-vsc-edit');
            
            if (editButton.length > 0 && vscButton.length === 0) {
                console.log('定时检查：重新添加VSCode按钮');
                addVSCodeButton();
            }
        }, 3000); // 每3秒检查一次
    });

    // 主函数：添加VSCode编辑按钮
    function addVSCodeButton() {
        // 获取编辑按钮
        var editButton = $('#ca-edit');
        var editButtonVE = $('#ca-ve-edit'); // 可视化编辑器按钮
        
        // 如果没有任何编辑按钮，退出
        if (editButton.length === 0 && editButtonVE.length === 0) {
            console.log('未找到编辑按钮');
            return;
        }

        // 确定使用哪个编辑按钮作为基准
        var targetButton = editButton.length > 0 ? editButton : editButtonVE;
        
        // 检查是否已存在VSCode按钮
        if ($('#ca-vsc-edit').length > 0) {
            return; // 按钮已存在，无需重复添加
        }

        // 生成VSCode链接
        var vsclink = generateVSCodeLink();
        if (!vsclink) {
            console.error('无法生成VSCode链接');
            return;
        }

        // 判断按钮类型并相应添加VSCode按钮
        if (targetButton.parent().is('li')) {
            // 下拉菜单样式
            targetButton.html(config.webDropdownText);
            
            // 创建VSCode下拉项
            var vscListItem = $('<li>').append(
                $('<a>')
                    .attr('href', vsclink)
                    .attr('id', 'ca-vsc-edit')
                    .attr('title', '在Visual Studio Code中编辑此页面')
                    .html(config.vscDropdownText)
            );
            
            targetButton.parent().after(vscListItem);
        } else {
            // 独立按钮样式
            targetButton.html('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small" /></svg>' + config.webText);
            
            // 创建VSCode按钮
            var vscButton = $('<a>')
                .addClass('wds-button wds-is-text page-header__action-button has-label')
                .attr('href', vsclink)
                .attr('id', 'ca-vsc-edit')
                .attr('title', '在Visual Studio Code中编辑此页面')
                .html('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small" /></svg>' + config.vscText);
            
            targetButton.after(vscButton);
        }

        console.log('VSCode编辑按钮已添加');
    }

    // 生成VSCode链接
    function generateVSCodeLink() {
        try {
            // 获取当前页面信息
            var pageTitle = mw.config.get('wgPageName');
            var server = mw.config.get('wgServer');
            var apiPath = mw.util.wikiScript('api');
            
            if (!pageTitle || !server || !apiPath) {
                console.error('缺少必要的页面信息');
                return null;
            }

            // 构建参数
            var args = {
                RemoteBot: 'true',
                TransferProtocol: window.location.protocol,
                SiteHost: server.replace(/^[\w-]*?:(?=\/\/)/, ''),
                APIPath: apiPath,
                Title: pageTitle
            };

            // 生成链接
            var scheme = 'vscode';
            var extensionID = config.vscodeExtensionID;
            var actionPath = '/PullPage';
            
            return scheme + '://' + extensionID + actionPath + '?' + new URLSearchParams(args).toString();
        } catch (error) {
            console.error('生成VSCode链接时出错:', error);
            return null;
        }
    }

    // 添加样式（可选）
    function addStyles() {
        var css = `
            #ca-vsc-edit:hover {
                background-color: #007acc;
                color: white;
            }
            #ca-vsc-edit svg {
                margin-right: 4px;
            }
        `;
        
        $('<style>').html(css).appendTo('head');
    }

    // 初始化样式
    addStyles();
})();

});