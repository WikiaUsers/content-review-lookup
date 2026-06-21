/* 浮动球快捷菜单 - 完整版 */
$(function () {
    if (document.getElementById('fab-menu')) return;

    var $fab = $('<div>').attr('id', 'fab-menu').css({
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        fontFamily: 'sans-serif'
    });

    var $mainBtn = $('<div>').css({
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#3366cc',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '56px',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'transform 0.2s',
        userSelect: 'none'
    }).html('⚡').appendTo($fab);

    var $container = $('<div>').css({
        position: 'absolute',
        bottom: '70px',
        right: '0',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        display: 'none',
        overflow: 'hidden',
        width: '320px',
        flexDirection: 'column'
    }).appendTo($fab);

    // 顶部时间栏
    var $timeBar = $('<div>').css({
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }).appendTo($container);

    var $timeInfo = $('<div>').css({
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    }).appendTo($timeBar);

    var $dateDisplay = $('<div>').css({
        fontSize: '11px',
        opacity: '0.85'
    }).appendTo($timeInfo);

    var $timeDisplay = $('<div>').css({
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }).appendTo($timeInfo);

    // 暗色模式切换按钮
    var $darkModeBtn = $('<div>').css({
        width: '28px',
        height: '28px',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.25)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        transition: 'all 0.2s',
        userSelect: 'none',
        flexShrink: 0
    }).html('🌙').appendTo($timeBar);

    // 内容主体
    var $body = $('<div>').css({
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '55vh',
        overflow: 'hidden'
    }).appendTo($container);

    // 侧边栏
    var $sidebar = $('<div>').css({
        width: '40px',
        background: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 0',
        gap: '8px',
        flexShrink: 0
    }).appendTo($body);

    var $scrollTopBtn = $('<div>').css({
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        background: '#e9ecef',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.15s',
        userSelect: 'none'
    }).html('⬆').attr('title', '回到顶部').appendTo($sidebar);

    var $scrollBottomBtn = $('<div>').css({
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        background: '#e9ecef',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.15s',
        userSelect: 'none'
    }).html('⬇').attr('title', '回到底部').appendTo($sidebar);

    $('<div>').css({
        width: '24px',
        height: '1px',
        background: '#dee2e6'
    }).appendTo($sidebar);

    var $notepadBtn = $('<div>').css({
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        background: '#e9ecef',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.15s',
        userSelect: 'none'
    }).html('📝').attr('title', '记事本').appendTo($sidebar);

    // 内容区域
    var $contentArea = $('<div>').css({
        flex: '1',
        overflowY: 'auto',
        maxHeight: '55vh'
    }).appendTo($body);

    // 全屏记事本覆盖层
    var $notepadOverlay = $('<div>').css({
        display: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: '#fff',
        zIndex: 20,
        flexDirection: 'column',
        borderRadius: '12px'
    }).appendTo($container);

    var $notepadHeader = $('<div>').css({
        padding: '10px 16px',
        background: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#495057'
    }).html('<span>📝 记事本</span>').appendTo($notepadOverlay);

    var $closeNotepad = $('<div>').css({
        cursor: 'pointer',
        fontSize: '20px',
        color: '#6c757d',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        transition: 'background 0.15s'
    }).html('×').appendTo($notepadHeader);

    var $notepadTextarea = $('<textarea>').css({
        flex: '1',
        border: 'none',
        outline: 'none',
        resize: 'none',
        padding: '16px',
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#333',
        background: '#fff'
    }).attr('placeholder', '在这里输入文本...').appendTo($notepadOverlay);

    var $notepadActions = $('<div>').css({
        padding: '10px',
        background: '#f8f9fa',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
    }).appendTo($notepadOverlay);

    var $copyBtn = $('<button>').css({
        padding: '6px 16px',
        border: '1px solid #dee2e6',
        borderRadius: '6px',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        color: '#495057',
        transition: 'all 0.15s'
    }).text('复制').appendTo($notepadActions);

    var $cutBtn = $('<button>').css({
        padding: '6px 16px',
        border: '1px solid #dee2e6',
        borderRadius: '6px',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        color: '#495057',
        transition: 'all 0.15s'
    }).text('剪切').appendTo($notepadActions);

    var $clearBtn = $('<button>').css({
        padding: '6px 16px',
        border: '1px solid #dee2e6',
        borderRadius: '6px',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        color: '#dc3545',
        transition: 'all 0.15s'
    }).text('清空').appendTo($notepadActions);

    var pageName = mw.config.get('wgPageName');
    var namespace = mw.config.get('wgNamespaceNumber');
    var isTemplate = (namespace === 10);
    var isSpecial = (namespace === -1);
    var canEdit = mw.config.get('wgIsProbablyEditable');

    function isDarkMode() {
        return localStorage.getItem('fab-dark-mode') === 'true';
    }

    function setDarkMode(dark) {
        localStorage.setItem('fab-dark-mode', dark ? 'true' : 'false');
        applyTheme();
    }

    function applyTheme() {
        var dark = isDarkMode();
        
        $container.css({
            background: dark ? '#2d2d2d' : '#fff',
            boxShadow: dark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.2)'
        });

        $sidebar.css({
            background: dark ? '#333' : '#f8f9fa',
            borderRight: dark ? '1px solid #555' : '1px solid #e0e0e0'
        });

        $scrollTopBtn.css('background', dark ? '#555' : '#e9ecef');
        $scrollBottomBtn.css('background', dark ? '#555' : '#e9ecef');
        $notepadBtn.css('background', dark ? '#555' : '#e9ecef');

        $sidebar.find('div').eq(2).css('background', dark ? '#555' : '#dee2e6');

        $contentArea.css('background', dark ? '#2d2d2d' : '#fff');

        $notepadOverlay.css('background', dark ? '#2d2d2d' : '#fff');
        $notepadHeader.css({
            background: dark ? '#333' : '#f8f9fa',
            borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0',
            color: dark ? '#ddd' : '#495057'
        });
        $notepadTextarea.css({
            background: dark ? '#2d2d2d' : '#fff',
            color: dark ? '#ddd' : '#333'
        });
        $notepadActions.css({
            background: dark ? '#333' : '#f8f9fa',
            borderTop: dark ? '1px solid #555' : '1px solid #e0e0e0'
        });

        $copyBtn.css({
            background: dark ? '#444' : '#fff',
            border: dark ? '1px solid #555' : '1px solid #dee2e6',
            color: dark ? '#ddd' : '#495057'
        });
        $cutBtn.css({
            background: dark ? '#444' : '#fff',
            border: dark ? '1px solid #555' : '1px solid #dee2e6',
            color: dark ? '#ddd' : '#495057'
        });
        $clearBtn.css({
            background: dark ? '#444' : '#fff',
            border: dark ? '1px solid #555' : '1px solid #dee2e6',
            color: '#dc3545'
        });

        $darkModeBtn.html(dark ? '☀️' : '🌙');

        renderPage1();
    }

    function getCurrentTime() {
        var now = new Date();
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        var utc8 = new Date(utc + (3600000 * 8));
        var hours = utc8.getHours().toString().padStart(2, '0');
        var minutes = utc8.getMinutes().toString().padStart(2, '0');
        var seconds = utc8.getSeconds().toString().padStart(2, '0');
        return hours + ':' + minutes + ':' + seconds;
    }

    function getCurrentDate() {
        var now = new Date();
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        var utc8 = new Date(utc + (3600000 * 8));
        var year = utc8.getFullYear();
        var month = (utc8.getMonth() + 1).toString().padStart(2, '0');
        var day = utc8.getDate().toString().padStart(2, '0');
        var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        var weekday = weekdays[utc8.getDay()];
        return year + '-' + month + '-' + day + ' 星期' + weekday;
    }

    function updateTimeDisplay() {
        $dateDisplay.text(getCurrentDate());
        $timeDisplay.text(getCurrentTime());
    }

    function getCustomLinks() {
        try {
            var stored = localStorage.getItem('fab-custom-links');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCustomLinks(links) {
        try {
            localStorage.setItem('fab-custom-links', JSON.stringify(links));
        } catch (e) {
            mw.notify('保存失败，请检查浏览器存储空间', { type: 'error' });
        }
    }

    function getFavorites() {
        try {
            var stored = localStorage.getItem('fab-favorites');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    function saveFavorites(favorites) {
        try {
            localStorage.setItem('fab-favorites', JSON.stringify(favorites));
        } catch (e) {
            mw.notify('保存失败', { type: 'error' });
        }
    }

    function isFavorite(label) {
        var favorites = getFavorites();
        return favorites.some(function (f) { return f.label === label; });
    }

    function addFavorite(item) {
        var favorites = getFavorites();
        if (!isFavorite(item.label)) {
            favorites.push(item);
            saveFavorites(favorites);
            mw.notify('已收藏：' + item.label, { type: 'success' });
        }
    }

    function removeFavorite(label) {
        var favorites = getFavorites();
        var newFavorites = favorites.filter(function (f) { return f.label !== label; });
        saveFavorites(newFavorites);
        mw.notify('已取消收藏：' + label, { type: 'success' });
    }

    function addCustomLink() {
        var title = prompt('请输入链接名称：');
        if (!title) return;
        var url = prompt('请输入链接地址（支持相对路径和完整URL）：');
        if (!url) return;
        if (!url.startsWith('http') && !url.startsWith('/')) {
            url = mw.util.getUrl(url);
        }
        var currentLinks = getCustomLinks();
        currentLinks.push({ title: title, url: url });
        saveCustomLinks(currentLinks);
        mw.notify('快捷链接已添加', { type: 'success' });
        renderPage1();
    }

    function editCustomLink(index) {
        var currentLinks = getCustomLinks();
        if (index < 0 || index >= currentLinks.length) return;
        var title = prompt('请输入新的链接名称：', currentLinks[index].title);
        if (title === null) return;
        if (!title) {
            mw.notify('链接名称不能为空', { type: 'error' });
            return;
        }
        var url = prompt('请输入新的链接地址：', currentLinks[index].url);
        if (url === null) return;
        if (!url) {
            mw.notify('链接地址不能为空', { type: 'error' });
            return;
        }
        if (!url.startsWith('http') && !url.startsWith('/')) {
            url = mw.util.getUrl(url);
        }
        currentLinks[index] = { title: title, url: url };
        saveCustomLinks(currentLinks);
        mw.notify('快捷链接已更新', { type: 'success' });
        renderPage1();
    }

    function deleteCustomLink(index) {
        if (!confirm('确定要删除这个快捷链接吗？')) return;
        var currentLinks = getCustomLinks();
        currentLinks.splice(index, 1);
        saveCustomLinks(currentLinks);
        mw.notify('快捷链接已删除', { type: 'success' });
        renderPage1();
    }

    function performNullEdit() {
        var api = new mw.Api();
        api.postWithToken('csrf', {
            action: 'edit',
            title: pageName,
            summary: '空编辑（刷新缓存）',
            minor: true,
            bot: true,
            nocreate: true,
            appendtext: ''
        }).done(function () {
            mw.notify('空编辑完成，页面缓存已刷新', { type: 'success' });
        }).fail(function (error) {
            mw.notify('空编辑失败：' + error, { type: 'error' });
        });
    }

    var menuGroups = [
        {
            label: '📄 页面操作',
            items: [
                { label: '查看页面源代码', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('action', 'raw');
                    window.open(url.toString(), '_blank');
                }, show: !isSpecial },
                { label: '查看页面信息', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('action', 'info');
                    window.location.href = url.toString();
                }, show: !isSpecial },
                { label: '查看最新差异', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('diff', 'cur');
                    window.location.href = url.toString();
                }, show: !isSpecial },
                { label: '复制页面纯文本', action: function () {
                    var api = new mw.Api();
                    api.get({
                        action: 'parse',
                        page: pageName,
                        prop: 'text',
                        format: 'json'
                    }).done(function (data) {
                        if (data.parse && data.parse.text) {
                            var tempDiv = document.createElement('div');
                            tempDiv.innerHTML = data.parse.text['*'];
                            var plainText = tempDiv.textContent || tempDiv.innerText || '';
                            navigator.clipboard.writeText(plainText).then(function () {
                                mw.notify('页面纯文本已复制到剪贴板', { type: 'success' });
                            }).catch(function () {
                                var textarea = document.createElement('textarea');
                                textarea.value = plainText;
                                document.body.appendChild(textarea);
                                textarea.select();
                                document.execCommand('copy');
                                document.body.removeChild(textarea);
                                mw.notify('页面纯文本已复制到剪贴板', { type: 'success' });
                            });
                        }
                    });
                }, show: !isSpecial },
                { label: '空编辑（刷新缓存）', action: performNullEdit, show: canEdit && !isSpecial }
            ]
        },
        {
            label: '🔗 链接与引用',
            items: [
                { label: '链入页面', url: mw.util.getUrl('Special:WhatLinksHere/' + pageName), show: !isSpecial },
                { label: '查看页面模板', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('action', 'edit');
                    window.location.href = url.toString();
                }, show: isTemplate }
            ]
        },
        {
            label: '🛠 开发工具',
            items: [
                { label: 'API 沙盒', url: mw.util.getUrl('Special:ApiSandbox'), show: true },
                { label: '系统消息列表', url: mw.util.getUrl('Special:AllMessages'), show: true },
                { label: '查看用户权限', url: mw.util.getUrl('Special:ListGroupRights'), show: true }
            ]
        },
        {
            label: '📝 样式与脚本',
            items: [
                { label: 'MediaWiki:Common.css', url: mw.util.getUrl('MediaWiki:Common.css', { action: 'edit' }), show: canEdit },
                { label: 'MediaWiki:Common.js', url: mw.util.getUrl('MediaWiki:Common.js', { action: 'edit' }), show: canEdit }
            ]
        },
        {
            label: '⚙️ 维护操作',
            items: [
                { label: '进入参数设置', url: mw.util.getUrl('Special:参数设置'), show: true },
                { label: '更改内容模型', url: mw.util.getUrl('Special:ChangeContentModel/' + pageName), show: canEdit && !isSpecial },
                { label: '清除页面缓存', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('action', 'purge');
                    window.location.href = url.toString();
                }, show: !isSpecial },
                { label: '查看修订历史', action: function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set('action', 'history');
                    window.location.href = url.toString();
                }, show: !isSpecial }
            ]
        }
    ];

    function renderPage1() {
        $contentArea.empty();
        var dark = isDarkMode();

        // 我的收藏
        var favorites = getFavorites();
        if (favorites.length > 0) {
            var $favGroup = $('<div>').css({
                borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
            }).appendTo($contentArea);

            var $favHeader = $('<div>').css({
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 'bold',
                color: dark ? '#bbb' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.15s',
                userSelect: 'none'
            }).html('<span>⭐ 我的收藏</span><span style="font-size:10px;transition:transform 0.2s;">▼</span>').appendTo($favGroup);

            var $favSubMenu = $('<div>').css({
                display: 'none',
                background: dark ? '#444' : '#f0f0f0'
            }).appendTo($favGroup);

            favorites.forEach(function (fav) {
                var $favItem = $('<div>').css({
                    padding: '8px 16px 8px 32px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: dark ? '#ddd' : '#333',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: dark ? '#444' : '#f0f0f0',
                    borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
                }).appendTo($favSubMenu);

                var $favText = $('<span>').text(fav.label).css('flex', '1');
                var $favActions = $('<span>').css({
                    display: 'flex',
                    gap: '4px',
                    opacity: '0',
                    transition: 'opacity 0.15s'
                });

                var $removeFavBtn = $('<span>').css({
                    cursor: 'pointer',
                    padding: '2px 4px',
                    fontSize: '12px',
                    color: '#dc3545',
                    borderRadius: '3px'
                }).html('🗑️').click(function (e) {
                    e.stopPropagation();
                    removeFavorite(fav.label);
                    renderPage1();
                });

                $favActions.append($removeFavBtn);
                $favItem.append($favText).append($favActions);

                $favItem.hover(
                    function () {
                        $(this).css('background', dark ? '#555' : '#e0e0e0');
                        $favActions.css('opacity', '1');
                    },
                    function () {
                        $(this).css('background', dark ? '#444' : '#f0f0f0');
                        $favActions.css('opacity', '0');
                    }
                );

                $favItem.click(function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    $this.css({
                        'transform': 'scale(0.95)',
                        'background': dark ? '#666' : '#d0d0d0'
                    });
                    setTimeout(function () {
                        $this.css({
                            'transform': 'scale(1)',
                            'background': dark ? '#444' : '#f0f0f0'
                        });
                    }, 150);

                    // 执行收藏项的功能
                    if (fav.url) {
                        window.open(fav.url, '_blank');
                    } else if (fav.action) {
                        fav.action();
                    } else {
                        // 如果既没有url也没有action，尝试从菜单中查找对应项
                        var found = false;
                        menuGroups.forEach(function (group) {
                            group.items.forEach(function (item) {
                                if (item.label === fav.label) {
                                    found = true;
                                    if (item.url) {
                                        window.open(item.url, '_blank');
                                    } else if (item.action) {
                                        item.action();
                                    }
                                }
                            });
                        });
                        if (!found) {
                            mw.notify('无法执行该功能', { type: 'error' });
                        }
                    }
                    $container.hide();
                    $mainBtn.css('transform', 'rotate(0deg)');
                });
            });

            $favHeader.click(function (e) {
                e.stopPropagation();
                var $arrow = $(this).find('span:last');
                $contentArea.find('.sub-menu').not($favSubMenu).slideUp(200);
                $contentArea.find('.group-header span:last').not($arrow).css('transform', 'rotate(0deg)');
                $favSubMenu.slideToggle(200);
                if ($favSubMenu.is(':visible')) {
                    $arrow.css('transform', 'rotate(180deg)');
                } else {
                    $arrow.css('transform', 'rotate(0deg)');
                }
            });

            $favHeader.hover(
                function () { $(this).css('background', dark ? '#3a3a3a' : '#f9f9f9'); },
                function () { $(this).css('background', 'transparent'); }
            );
        }

        // 自定义链接和功能菜单合并
        var customLinks = getCustomLinks();
        var $combinedGroup = $('<div>').css({
            borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
        }).appendTo($contentArea);

        var $combinedHeader = $('<div>').addClass('group-header').css({
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 'bold',
            color: dark ? '#bbb' : '#666',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.15s',
            userSelect: 'none',
            borderTop: dark ? '1px solid #555' : '1px solid #e0e0e0'
        }).html('<span>📋 快捷功能</span><span style="font-size:10px;transition:transform 0.2s;">▼</span>').appendTo($combinedGroup);

        var $combinedSubMenu = $('<div>').addClass('sub-menu').css({
            display: 'none',
            background: dark ? '#444' : '#f0f0f0'
        }).appendTo($combinedGroup);

        // 自定义链接
        customLinks.forEach(function (link, index) {
            var $linkItem = $('<div>').css({
                padding: '8px 16px 8px 32px',
                cursor: 'pointer',
                fontSize: '13px',
                color: dark ? '#ddd' : '#333',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: dark ? '#444' : '#f0f0f0',
                borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
            }).appendTo($combinedSubMenu);

            var $linkText = $('<span>').text('🔗 ' + link.title).css('flex', '1');
            var $linkActions = $('<span>').css({
                display: 'flex',
                gap: '4px',
                opacity: '0',
                transition: 'opacity 0.15s'
            });

            var $editBtn = $('<span>').css({
                cursor: 'pointer',
                padding: '2px 4px',
                fontSize: '12px',
                color: dark ? '#bbb' : '#666',
                borderRadius: '3px'
            }).html('✏️').click(function (e) {
                e.stopPropagation();
                editCustomLink(index);
            });

            var $deleteBtn = $('<span>').css({
                cursor: 'pointer',
                padding: '2px 4px',
                fontSize: '12px',
                color: dark ? '#bbb' : '#666',
                borderRadius: '3px'
            }).html('🗑️').click(function (e) {
                e.stopPropagation();
                deleteCustomLink(index);
            });

            $linkActions.append($editBtn).append($deleteBtn);
            $linkItem.append($linkText).append($linkActions);

            $linkItem.hover(
                function () {
                    $(this).css('background', dark ? '#555' : '#e0e0e0');
                    $linkActions.css('opacity', '1');
                },
                function () {
                    $(this).css('background', dark ? '#444' : '#f0f0f0');
                    $linkActions.css('opacity', '0');
                }
            );

            $linkItem.click(function (e) {
                e.stopPropagation();
                var $this = $(this);
                $this.css({
                    'transform': 'scale(0.95)',
                    'background': dark ? '#666' : '#d0d0d0'
                });
                setTimeout(function () {
                    $this.css({
                        'transform': 'scale(1)',
                        'background': dark ? '#444' : '#f0f0f0'
                    });
                }, 150);

                window.open(link.url, '_blank');
                $container.hide();
                $mainBtn.css('transform', 'rotate(0deg)');
            });
        });

        // 添加快捷链接按钮
        var $addBtn = $('<div>').css({
            padding: '8px 16px 8px 32px',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#3366cc',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
            background: dark ? '#444' : '#f0f0f0',
            borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
        }).text('+ 添加快捷链接').appendTo($combinedSubMenu);

        $addBtn.hover(
            function () { $(this).css('background', dark ? '#555' : '#e0e0e0'); },
            function () { $(this).css('background', dark ? '#444' : '#f0f0f0'); }
        );

        $addBtn.click(function (e) {
            e.stopPropagation();
            var $this = $(this);
            $this.css({
                'transform': 'scale(0.95)',
                'background': dark ? '#666' : '#d0d0d0'
            });
            setTimeout(function () {
                $this.css({
                    'transform': 'scale(1)',
                    'background': dark ? '#444' : '#f0f0f0'
                });
            }, 150);
            addCustomLink();
        });

        // 功能菜单
        menuGroups.forEach(function (group) {
            var visibleItems = group.items.filter(function (item) {
                return item.show !== false;
            });

            if (visibleItems.length === 0) return;

            var $groupHeader = $('<div>').addClass('group-header').css({
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 'bold',
                color: dark ? '#bbb' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.15s',
                userSelect: 'none',
                borderTop: dark ? '1px solid #555' : '1px solid #e0e0e0'
            }).html('<span>' + group.label + '</span><span style="font-size:10px;transition:transform 0.2s;">▼</span>').appendTo($combinedSubMenu);

            var $subMenu = $('<div>').addClass('sub-menu').css({
                display: 'none',
                background: dark ? '#444' : '#f0f0f0'
            }).appendTo($combinedSubMenu);

            visibleItems.forEach(function (item) {
                var $menuItem = $('<div>').css({
                    padding: '8px 16px 8px 32px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: dark ? '#ddd' : '#333',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: dark ? '#444' : '#f0f0f0',
                    borderBottom: dark ? '1px solid #555' : '1px solid #e0e0e0'
                }).appendTo($subMenu);

                var $itemText = $('<span>').text(item.label).css('flex', '1');
                var $itemActions = $('<span>').css({
                    display: 'flex',
                    gap: '4px',
                    opacity: '0',
                    transition: 'opacity 0.15s'
                });

                var $favBtn = $('<span>').css({
                    cursor: 'pointer',
                    padding: '2px 4px',
                    fontSize: '12px',
                    borderRadius: '3px'
                });

                if (isFavorite(item.label)) {
                    $favBtn.css('color', '#dc3545').html('−').click(function (e) {
                        e.stopPropagation();
                        removeFavorite(item.label);
                        renderPage1();
                    });
                } else {
                    $favBtn.css('color', dark ? '#bbb' : '#666').html('+').click(function (e) {
                        e.stopPropagation();
                        // 保存完整的item信息，包括url和action
                        addFavorite({
                            label: item.label,
                            url: item.url || null,
                            action: item.action ? item.action.toString() : null
                        });
                        renderPage1();
                    });
                }

                $itemActions.append($favBtn);
                $menuItem.append($itemText).append($itemActions);

                $menuItem.hover(
                    function () {
                        $(this).css('background', dark ? '#555' : '#e0e0e0');
                        $itemActions.css('opacity', '1');
                    },
                    function () {
                        $(this).css('background', dark ? '#444' : '#f0f0f0');
                        $itemActions.css('opacity', '0');
                    }
                );

                $menuItem.click(function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    $this.css({
                        'transform': 'scale(0.95)',
                        'background': dark ? '#666' : '#d0d0d0'
                    });
                    setTimeout(function () {
                        $this.css({
                            'transform': 'scale(1)',
                            'background': dark ? '#444' : '#f0f0f0'
                        });
                    }, 150);

                    if (item.url) {
                        window.open(item.url, '_blank');
                    } else if (item.action) {
                        item.action();
                    }
                    $container.hide();
                    $mainBtn.css('transform', 'rotate(0deg)');
                });
            });

            $groupHeader.click(function (e) {
                e.stopPropagation();
                var $arrow = $(this).find('span:last');
                $combinedSubMenu.find('.sub-menu').not($subMenu).slideUp(200);
                $combinedSubMenu.find('.group-header span:last').not($arrow).css('transform', 'rotate(0deg)');
                $subMenu.slideToggle(200);
                if ($subMenu.is(':visible')) {
                    $arrow.css('transform', 'rotate(180deg)');
                } else {
                    $arrow.css('transform', 'rotate(0deg)');
                }
            });

            $groupHeader.hover(
                function () { $(this).css('background', dark ? '#3a3a3a' : '#f9f9f9'); },
                function () { $(this).css('background', 'transparent'); }
            );
        });

        $combinedHeader.click(function (e) {
            e.stopPropagation();
            var $arrow = $(this).find('span:last');
            $combinedSubMenu.slideToggle(200);
            if ($combinedSubMenu.is(':visible')) {
                $arrow.css('transform', 'rotate(180deg)');
            } else {
                $arrow.css('transform', 'rotate(0deg)');
            }
        });

        $combinedHeader.hover(
            function () { $(this).css('background', dark ? '#3a3a3a' : '#f9f9f9'); },
            function () { $(this).css('background', 'transparent'); }
        );
    }

    // 事件绑定
    setInterval(updateTimeDisplay, 1000);

    $scrollTopBtn.click(function (e) {
        e.stopPropagation();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    $scrollBottomBtn.click(function (e) {
        e.stopPropagation();
        $('html, body').animate({ scrollTop: $(document).height() }, 500);
    });

    $scrollTopBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#666' : '#dee2e6'); },
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); }
    );

    $scrollBottomBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#666' : '#dee2e6'); },
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); }
    );

    $notepadBtn.click(function (e) {
        e.stopPropagation();
        $notepadOverlay.css('display', 'flex');
    });

    $notepadBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#666' : '#dee2e6'); },
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); }
    );

    $closeNotepad.click(function (e) {
        e.stopPropagation();
        $notepadOverlay.hide();
    });

    $closeNotepad.hover(
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); },
        function () { $(this).css('background', 'transparent'); }
    );

    $copyBtn.click(function (e) {
        e.stopPropagation();
        var text = $notepadTextarea.val();
        if (text) {
            navigator.clipboard.writeText(text).then(function () {
                mw.notify('文本已复制到剪贴板', { type: 'success' });
            }).catch(function () {
                $notepadTextarea.select();
                document.execCommand('copy');
                mw.notify('文本已复制到剪贴板', { type: 'success' });
            });
        }
    });

    $cutBtn.click(function (e) {
        e.stopPropagation();
        var text = $notepadTextarea.val();
        if (text) {
            navigator.clipboard.writeText(text).then(function () {
                $notepadTextarea.val('');
                mw.notify('文本已剪切到剪贴板', { type: 'success' });
            }).catch(function () {
                $notepadTextarea.select();
                document.execCommand('cut');
                mw.notify('文本已剪切到剪贴板', { type: 'success' });
            });
        }
    });

    $clearBtn.click(function (e) {
        e.stopPropagation();
        if ($notepadTextarea.val()) {
            if (confirm('确定要清空所有文本吗？')) {
                $notepadTextarea.val('');
                mw.notify('文本已清空', { type: 'success' });
            }
        }
    });

    $copyBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); },
        function () { $(this).css('background', isDarkMode() ? '#444' : '#fff'); }
    );

    $cutBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#555' : '#e9ecef'); },
        function () { $(this).css('background', isDarkMode() ? '#444' : '#fff'); }
    );

    $clearBtn.hover(
        function () { $(this).css('background', isDarkMode() ? '#5a3a3a' : '#fff5f5'); },
        function () { $(this).css('background', isDarkMode() ? '#444' : '#fff'); }
    );

    $darkModeBtn.click(function (e) {
        e.stopPropagation();
        setDarkMode(!isDarkMode());
    });

    $darkModeBtn.hover(
        function () { $(this).css('background', 'rgba(255,255,255,0.5)'); },
        function () { $(this).css('background', 'rgba(255,255,255,0.25)'); }
    );

    // 初始化
    updateTimeDisplay();
    applyTheme();
    renderPage1();

    // 主按钮
    $mainBtn.click(function (e) {
        e.stopPropagation();
        if ($container.is(':visible')) {
            $container.hide();
            $mainBtn.css('transform', 'rotate(0deg)');
            $notepadOverlay.hide();
        } else {
            $container.css('display', 'flex');
            $mainBtn.css('transform', 'rotate(90deg)');
            updateTimeDisplay();
            renderPage1();
        }
    });

    // 点击外部关闭
    $(document).click(function (e) {
        if ($container.is(':visible') && !$(e.target).closest('#fab-menu').length) {
            $container.hide();
            $mainBtn.css('transform', 'rotate(0deg)');
            $notepadOverlay.hide();
        }
    });

    // 键盘快捷键
    $(document).keydown(function (e) {
        if (!$container.is(':visible')) return;
        
        if (e.key === 'n' || e.key === 'N') {
            e.preventDefault();
            $notepadOverlay.css('display', 'flex');
        } else if (e.key === 'Escape') {
            if ($notepadOverlay.is(':visible')) {
                e.preventDefault();
                $notepadOverlay.hide();
            }
        }
    });

    $fab.appendTo('body');
});