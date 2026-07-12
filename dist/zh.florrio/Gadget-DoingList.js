/**
 * Gadget-DoingList.js
 * 增强版：调试日志 + 容错 + 未读角标 + 位置持久化 + 折叠 + 过期标记
 * 在控制台输入 __doingListDebug() 可查看运行状态
 */
(function () {
    'use strict';

    var DEBUG = true;
    var CONFIG_PAGE = 'MediaWiki:Gadget-DoingList.js/活动设置';
    var TOGGLE_TEXT = '🎯 活动列表';
    var TOGGLE_TEXT_ACTIVE = '🎯 活动列表 ✕';
    var DRAG_THRESHOLD = 5;
    var STORAGE_KEY_URLS = 'doing-list-clicked-urls';
    var STORAGE_KEY_POS = 'doing-list-panel-pos';
    var STORAGE_KEY_COLLAPSED = 'doing-list-collapsed-acts';

    var debugLogs = [];
    function log(tag, msg, data) {
        var entry = { time: new Date().toISOString(), tag: tag, msg: msg, data: data };
        debugLogs.push(entry);
        if (DEBUG) console.log('[DoingList] [' + tag + ']', msg, data || '');
    }
    window.__doingListDebug = function () {
        console.table(debugLogs);
        console.log('面板元素:', document.getElementById('doing-list-panel'));
        console.log('样式元素:', document.getElementById('doing-list-styles'));
        console.log('localStorage:', {
            urls: localStorage.getItem(STORAGE_KEY_URLS),
            pos: localStorage.getItem(STORAGE_KEY_POS),
            collapsed: localStorage.getItem(STORAGE_KEY_COLLAPSED)
        });
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
        log('init', '依赖加载完成');
        if (mw.config.get('wgAction') !== 'view') {
            log('init', '非 view 页面，跳过');
            return;
        }
        init();
    }, function (err) {
        log('error', '依赖加载失败', err);
    });

    function init() {
        log('init', '开始初始化');
        var api = new mw.Api();
        api.get({
            action: 'parse',
            page: CONFIG_PAGE,
            prop: 'wikitext',
            formatversion: 2
        }).then(function (data) {
            log('api', '配置页面获取成功');
            if (!data.parse || !data.parse.wikitext) {
                log('error', '配置页面返回空内容');
                return;
            }
            var activities = parseActivities(data.parse.wikitext);
            log('parse', '解析到活动数', activities.length);
            if (activities.length === 0) {
                log('warn', '没有解析到任何活动');
                return;
            }
            injectStyles();
            createPanel(activities);
            log('init', '面板创建完成');
        }).catch(function (err) {
            log('error', 'API请求失败', err);
            console.error('[DoingList] 无法获取配置页面，请检查页面是否存在且有读取权限');
        });
    }

    function parseActivities(wikitext) {
        var lines = wikitext.split('\n');
        var activities = [];
        var currentActivity = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) continue;
            var activityMatch = line.match(/^##\d+\s+(.+?)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(\d{4}-\d{2}-\d{2}))?$/);
            if (activityMatch) {
                if (currentActivity) activities.push(currentActivity);
                currentActivity = {
                    name: (activityMatch[1] || '').trim(),
                    desc: (activityMatch[2] || '').trim(),
                    deadline: (activityMatch[3] || '').trim(),
                    links: []
                };
                log('parse', '解析活动', currentActivity.name);
                continue;
            }
            var linkMatch = line.match(/^###\d+\s+(.+?)\s*\|\s*(.+)/);
            if (linkMatch && currentActivity) {
                currentActivity.links.push({
                    url: (linkMatch[1] || '').trim(),
                    text: (linkMatch[2] || '').trim()
                });
            }
        }
        if (currentActivity) activities.push(currentActivity);
        return activities;
    }

    function getClickedUrls() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY_URLS) || '[]'); }
        catch (e) { log('error', '读取 clickedUrls 失败', e); return []; }
    }
    function markUrlAsClicked(url) {
        try {
            var clicked = getClickedUrls();
            if (clicked.indexOf(url) === -1) {
                clicked.push(url);
                localStorage.setItem(STORAGE_KEY_URLS, JSON.stringify(clicked));
            }
        } catch (e) { log('error', '写入 clickedUrls 失败', e); }
    }
    function getCollapsedActs() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY_COLLAPSED) || '[]'); }
        catch (e) { log('error', '读取 collapsed 失败', e); return []; }
    }
    function setCollapsedActs(list) {
        try { localStorage.setItem(STORAGE_KEY_COLLAPSED, JSON.stringify(list)); }
        catch (e) { log('error', '写入 collapsed 失败', e); }
    }
    function getSavedPos() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY_POS) || '{}'); }
        catch (e) { log('error', '读取 pos 失败', e); return {}; }
    }
    function savePos(left, top) {
        try { localStorage.setItem(STORAGE_KEY_POS, JSON.stringify({ left: left, top: top })); }
        catch (e) { log('error', '写入 pos 失败', e); }
    }
    function isExpired(deadline) {
        if (!deadline) return false;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var dl = new Date(deadline + 'T23:59:59');
        return dl < today;
    }
    function countUnread(activities) {
        var clicked = getClickedUrls();
        var count = 0;
        for (var i = 0; i < activities.length; i++) {
            var links = activities[i].links;
            for (var j = 0; j < links.length; j++) {
                if (clicked.indexOf(links[j].url) === -1) count++;
            }
        }
        return count;
    }

    function injectStyles() {
        if (document.getElementById('doing-list-styles')) {
            log('style', '样式已存在，跳过注入');
            return;
        }
        var css = [
            ':root{--dl-primary:#6366f1;--dl-primary-hover:#4f46e5;--dl-primary-light:#eef2ff;--dl-accent:#f59e0b;--dl-bg:#ffffff;--dl-text:#1e293b;--dl-text-secondary:#64748b;--dl-border:#e2e8f0;--dl-shadow:0 8px 32px rgba(99,102,241,0.12),0 2px 8px rgba(0,0,0,0.06);--dl-radius:12px}',
            /* 替换原来的 #doing-list-panel 样式 */
'#doing-list-panel{position:fixed;top:12px;left:12px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans SC",sans-serif;font-size:14px}',
/* 移动端：默认底部居中，左右留边距 */
'@media (max-width:768px){#doing-list-panel{top:auto;bottom:16px;left:50%;transform:translateX(-50%);right:auto}}',

            '#doing-list-toggle-wrap{position:relative;display:inline-block}',
            '#doing-list-toggle{display:flex;align-items:center;gap:6px;background:linear-gradient(135deg,var(--dl-primary) 0%,#8b5cf6 100%);color:#fff;border:none;padding:10px 18px;border-radius:24px;cursor:grab;font-size:14px;font-weight:600;letter-spacing:0.3px;box-shadow:0 4px 16px rgba(99,102,241,0.35);transition:box-shadow 0.25s,transform 0.15s;white-space:nowrap;user-select:none}',
            '#doing-list-toggle:active{cursor:grabbing}',
            '#doing-list-toggle.dragging{cursor:grabbing;box-shadow:0 8px 28px rgba(99,102,241,0.5);transform:scale(1.04)}',
            '#doing-list-toggle:hover{box-shadow:0 6px 24px rgba(99,102,241,0.45)}',
            '#doing-list-badge{position:absolute;top:-8px;right:-8px;min-width:20px;height:20px;padding:0 6px;background:#ef4444;color:#fff;font-size:11px;font-weight:700;line-height:20px;text-align:center;border-radius:10px;border:2px solid #fff;box-shadow:0 2px 6px rgba(239,68,68,0.4);z-index:2;pointer-events:none;transition:transform 0.2s,opacity 0.2s}',
            '#doing-list-badge.hidden{transform:scale(0);opacity:0}',
            '#doing-list-content{display:none;background:var(--dl-bg);border:1px solid var(--dl-border);border-radius:var(--dl-radius);padding:18px;margin-top:10px;box-shadow:var(--dl-shadow);max-width:360px;min-width:260px;max-height:70vh;overflow-y:auto;backdrop-filter:blur(20px)}',
            '#doing-list-content.expanded{display:block;animation:dl-fade-in 0.3s cubic-bezier(0.4,0,0.2,1)}',
            '@keyframes dl-fade-in{from{opacity:0;transform:translateY(-8px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}',
            '.doing-activity{margin-bottom:12px;padding:10px 12px;background:#f8fafc;border-radius:var(--dl-radius);border:1px solid #f1f5f9;transition:box-shadow 0.2s,opacity 0.3s}',
            '.doing-activity:last-child{margin-bottom:0}',
            '.doing-activity.expired{opacity:0.5;background:#f1f5f9;border-color:#e2e8f0}',
            '.doing-activity.expired .doing-activity-name{color:#94a3b8}',
            '.doing-activity.expired .doing-link{color:#94a3b8;pointer-events:none}',
            '.doing-activity-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;cursor:pointer;user-select:none;gap:8px}',
            '.doing-activity-header-left{display:flex;align-items:center;gap:6px;flex:1;min-width:0}',
            '.doing-activity-name{font-weight:700;font-size:14px;color:var(--dl-text);line-height:1.4}',
            '.doing-activity-name::before{content:"✦ ";color:var(--dl-accent);font-size:11px}',
            '.doing-activity-arrow{flex-shrink:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:12px;transition:transform 0.25s}',
            '.doing-activity.collapsed .doing-activity-arrow{transform:rotate(-90deg)}',
            '.doing-expired-tag{flex-shrink:0;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;background:#f1f5f9;color:#94a3b8;border:1px solid #e2e8f0;white-space:nowrap}',
            '.doing-activity-desc{font-size:12px;color:var(--dl-text-secondary);margin-top:2px;margin-bottom:6px;line-height:1.5;padding-left:18px}',
            '.doing-activity-links{overflow:hidden;transition:max-height 0.3s ease,opacity 0.3s ease;max-height:500px;opacity:1}',
            '.doing-activity.collapsed .doing-activity-links{max-height:0;opacity:0}',
            '.doing-activity.collapsed .doing-activity-desc{display:none}',
            '.doing-link-wrapper{position:relative;display:block}',
            '.doing-link{display:block;padding:6px 10px 6px 14px;margin:2px 0;color:var(--dl-primary);text-decoration:none;font-size:13px;font-weight:500;border-radius:6px;background:var(--dl-bg);border:1px solid transparent;transition:all 0.2s}',
            '.doing-link::before{content:"→ ";color:var(--dl-accent);font-size:11px;opacity:0;transition:opacity 0.2s,margin 0.2s;margin-right:-8px}',
            '.doing-link:hover{background:var(--dl-primary-light);border-color:var(--dl-primary);color:var(--dl-primary-hover);text-decoration:none;padding-left:16px}',
            '.doing-link:hover::before{opacity:1;margin-right:2px}',
            '.doing-unread-dot{position:absolute;top:-3px;right:-3px;width:8px;height:8px;background:#ef4444;border:2px solid #fff;border-radius:50%;z-index:2;pointer-events:none;animation:dl-dot-pulse 2s ease-in-out infinite}',
            '@keyframes dl-dot-pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(239,68,68,0.7)}50%{transform:scale(1.3);box-shadow:0 0 0 4px rgba(239,68,68,0)}}',
            '#doing-list-content::-webkit-scrollbar{width:5px}',
            '#doing-list-content::-webkit-scrollbar-track{background:transparent}',
            '#doing-list-content::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}',
            '.theme-fandomdesktop-dark #doing-list-content,.skin-fandomdesktop-dark #doing-list-content,.theme-dark #doing-list-content{--dl-bg:#1e1e2e;--dl-text:#e2e8f0;--dl-text-secondary:#94a3b8;--dl-border:#334155;background:var(--dl-bg);border-color:var(--dl-border)}',
            '.theme-fandomdesktop-dark .doing-activity,.skin-fandomdesktop-dark .doing-activity,.theme-dark .doing-activity{background:#252537;border-color:#334155}',
            '.theme-fandomdesktop-dark .doing-activity.expired,.skin-fandomdesktop-dark .doing-activity.expired,.theme-dark .doing-activity.expired{background:#1a1a2a}',
            '.theme-fandomdesktop-dark .doing-link,.skin-fandomdesktop-dark .doing-link,.theme-dark .doing-link{background:#1e1e2e;color:#a5b4fc}',
            '.theme-fandomdesktop-dark .doing-link:hover,.skin-fandomdesktop-dark .doing-link:hover,.theme-dark .doing-link:hover{background:#2d2d44;border-color:#818cf8;color:#c7d2fe}',
            '.theme-fandomdesktop-dark .doing-unread-dot,.skin-fandomdesktop-dark .doing-unread-dot,.theme-dark .doing-unread-dot{border-color:#1e1e2e}',
            '.theme-fandomdesktop-dark #doing-list-badge,.skin-fandomdesktop-dark #doing-list-badge,.theme-dark #doing-list-badge{border-color:#1e1e2e}',
            '.theme-fandomdesktop-dark .doing-expired-tag,.skin-fandomdesktop-dark .doing-expired-tag,.theme-dark .doing-expired-tag{background:#2d2d44;color:#64748b;border-color:#3d3d5c}',
            '@media (max-width:480px){#doing-list-content{max-width:calc(100vw - 24px);min-width:auto}}',
            /* 移动端触控优化 */
'@media (max-width:768px){',
'  #doing-list-toggle{padding:12px 22px;font-size:15px;border-radius:28px;min-height:48px}',  /* 更大的按钮 */
'  .doing-activity-header{padding:6px 0;min-height:40px}',  /* 点击区域加高 */
'  .doing-activity-arrow{width:28px;height:28px;font-size:14px}',  /* 箭头加宽方便点击 */
'  .doing-link{padding:8px 10px 8px 14px;font-size:14px;margin:4px 0}',  /* 链接间距加大 */
'  .doing-activity{padding:10px 12px;margin-bottom:14px}',
'  #doing-list-content{max-width:calc(100vw - 16px);border-radius:16px;padding:14px}',  /* 内容区撑满 */
'  .doing-act-badge{right:10px;min-width:20px;height:20px;line-height:20px;font-size:10px}',  /* 角标微调 */
'  .doing-activity.collapsed .doing-act-badge{right:38px}',
'}',
'@media (max-width:480px){',
'  #doing-list-panel{left:0;right:0;bottom:8px;transform:none}',  /* 更小屏铺满宽度 */
'  #doing-list-toggle{border-radius:22px;margin:0 auto;display:flex;width:fit-content}',
'  #doing-list-content{max-width:100%;border-radius:12px 12px 0 0}',
'}'

        ].join('\n');
        var styleEl = document.createElement('style');
        styleEl.id = 'doing-list-styles';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
        log('style', '样式注入成功');
    }

    function createPanel(activities) {
        var existing = document.getElementById('doing-list-panel');
        if (existing) {
            log('warn', '面板已存在，移除旧面板');
            existing.remove();
        }
        var clickedUrls = getClickedUrls();
        var collapsedActs = getCollapsedActs();
        var listHtml = '';
        for (var i = 0; i < activities.length; i++) {
            var act = activities[i];
            var expired = isExpired(act.deadline);
            var collapsed = collapsedActs.indexOf(act.name) !== -1;
            var actClass = 'doing-activity';
            if (expired) actClass += ' expired';
            if (collapsed) actClass += ' collapsed';
            listHtml += '<div class="' + actClass + '" data-act-name="' + mw.html.escape(act.name) + '">';
            listHtml += '<div class="doing-activity-header">';
            listHtml += '<div class="doing-activity-header-left">';
            listHtml += '<span class="doing-activity-arrow">▼</span>';
            listHtml += '<span class="doing-activity-name">' + mw.html.escape(act.name) + '</span>';
            if (expired) listHtml += '<span class="doing-expired-tag">已结束</span>';
            listHtml += '</div></div>';
            if (act.desc) listHtml += '<div class="doing-activity-desc">' + mw.html.escape(act.desc) + '</div>';
            listHtml += '<div class="doing-activity-links">';
            for (var j = 0; j < act.links.length; j++) {
                var link = act.links[j];
                var isUnread = clickedUrls.indexOf(link.url) === -1;
                listHtml += '<span class="doing-link-wrapper">';
                listHtml += '<a class="doing-link" href="' + mw.html.escape(link.url) + '" data-url="' + mw.html.escape(link.url) + '">' + mw.html.escape(link.text) + '</a>';
                if (isUnread) listHtml += '<span class="doing-unread-dot" data-url="' + mw.html.escape(link.url) + '"></span>';
                listHtml += '</span>';
            }
            listHtml += '</div></div>';
        }
        var panel = document.createElement('div');
        panel.id = 'doing-list-panel';
        panel.innerHTML = '<div id="doing-list-toggle-wrap"><button id="doing-list-toggle" title="拖拽可移动面板，点击展开活动列表">' + TOGGLE_TEXT + '</button></div><div id="doing-list-content">' + listHtml + '</div>';
        document.body.appendChild(panel);
        log('panel', '面板已插入DOM');
        restorePosition();
        bindDragEvents();
        bindLinkClickEvents();
        bindToggleEvents();
        bindCollapseEvents();
        log('panel', '所有事件绑定完成');
    }

    function restorePosition() {
        var panel = document.getElementById('doing-list-panel');
        if (!panel) return;
        var saved = getSavedPos();
        if (saved.left !== undefined) {
            panel.style.left = saved.left + 'px';
            panel.style.top = saved.top + 'px';
            log('pos', '恢复位置', saved);
        }
    }

    function bindDragEvents() {
    var toggleBtn = document.getElementById('doing-list-toggle');
    var panel = document.getElementById('doing-list-panel');
    if (!toggleBtn || !panel) return;

    var isDragging = false, startX, startY, startLeft, startTop, moved = false;

    function onStart(clientX, clientY) {
        isDragging = true;
        moved = false;
        startX = clientX;
        startY = clientY;
        startLeft = panel.offsetLeft;
        startTop = panel.offsetTop;
        toggleBtn.classList.add('dragging');
    }

    function onMove(clientX, clientY) {
        if (!isDragging) return;
        var dx = clientX - startX;
        var dy = clientY - startY;
        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            moved = true;
            var newLeft = Math.max(0, Math.min(startLeft + dx, window.innerWidth - panel.offsetWidth));
            var newTop = Math.max(0, Math.min(startTop + dy, window.innerHeight - 40));
            panel.style.left = newLeft + 'px';
            panel.style.top = newTop + 'px';
        }
    }

    function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        toggleBtn.classList.remove('dragging');
        if (moved) {
            savePos(panel.offsetLeft, panel.offsetTop);
            setTimeout(function () { moved = false; }, 0);
        }
    }

    // 鼠标事件
    toggleBtn.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        onStart(e.clientX, e.clientY);
        e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
        onMove(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', onEnd);

    // 触屏事件
    toggleBtn.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        onStart(e.touches.clientX, e.touches.clientY);
    }, { passive: false });
    document.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        onMove(e.touches.clientX, e.touches.clientY);
        if (moved) e.preventDefault();
    }, { passive: false });
    document.addEventListener('touchend', onEnd);

    // 阻止拖拽触发 click
    toggleBtn.addEventListener('click', function (e) {
        if (moved) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }, true);
}


    function bindLinkClickEvents() {
        var content = document.getElementById('doing-list-content');
        if (!content) return;
        content.addEventListener('click', function (e) {
            var link = e.target.closest('.doing-link');
            if (!link) return;
            var url = link.getAttribute('data-url');
            if (!url) return;
            markUrlAsClicked(url);
            var wrapper = link.parentNode;
            if (wrapper && wrapper.classList.contains('doing-link-wrapper')) {
                var dot = wrapper.querySelector('.doing-unread-dot');
                if (dot) {
                    dot.style.opacity = '0';
                    dot.style.transition = 'opacity 0.3s ease';
                    setTimeout(function () {
                        if (dot.parentNode) dot.parentNode.removeChild(dot);
                    }, 300);
                }
            }
            updateBadge();
        });
    }

    function updateBadge() {
        var badge = document.getElementById('doing-list-badge');
        if (!badge) return;
        var content = document.getElementById('doing-list-content');
        if (!content) return;
        var dots = content.querySelectorAll('.doing-unread-dot');
        var count = dots.length;
        if (count === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
            badge.textContent = count;
        }
    }

    function bindToggleEvents() {
        var toggleBtn = document.getElementById('doing-list-toggle');
        var content = document.getElementById('doing-list-content');
        if (!toggleBtn || !content) return;
        var isExpanded = false;
        toggleBtn.addEventListener('click', function (e) {
            if (toggleBtn.classList.contains('dragging')) return;
            isExpanded = !isExpanded;
            if (isExpanded) {
                content.classList.add('expanded');
                toggleBtn.innerHTML = TOGGLE_TEXT_ACTIVE;
            } else {
                content.classList.remove('expanded');
                toggleBtn.innerHTML = TOGGLE_TEXT;
            }
        });
        document.addEventListener('click', function (e) {
            if (isExpanded) {
                var panel = document.getElementById('doing-list-panel');
                if (panel && !panel.contains(e.target)) {
                    isExpanded = false;
                    content.classList.remove('expanded');
                    toggleBtn.innerHTML = TOGGLE_TEXT;
                }
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isExpanded) {
                isExpanded = false;
                content.classList.remove('expanded');
                toggleBtn.innerHTML = TOGGLE_TEXT;
            }
        });
    }

    function bindCollapseEvents() {
        var content = document.getElementById('doing-list-content');
        if (!content) return;
        content.addEventListener('click', function (e) {
            var header = e.target.closest('.doing-activity-header');
            if (!header) return;
            var activity = header.closest('.doing-activity');
            if (!activity) return;
            if (activity.classList.contains('expired')) return;
            var actName = activity.getAttribute('data-act-name');
            var collapsedActs = getCollapsedActs();
            activity.classList.toggle('collapsed');
            if (activity.classList.contains('collapsed')) {
                if (collapsedActs.indexOf(actName) === -1) collapsedActs.push(actName);
            } else {
                var idx = collapsedActs.indexOf(actName);
                if (idx !== -1) collapsedActs.splice(idx, 1);
            }
            setCollapsedActs(collapsedActs);
        });
    }

})();