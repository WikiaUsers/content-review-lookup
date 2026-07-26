/* jshint esversion: 11 */
(async () => {
    'use strict';
    const localRequire = await mw.loader.using(["mediawiki.api", "mediawiki.ForeignApi", "mediawiki.util", "vue"]);
    const Vue = localRequire("vue");
    const App = {
        template: `
            <div class="cwa-rc">
                <header class="cwa-rc__header">
                    <div class="cwa-rc__title">
                        <h2><i class="fa-solid fa-globe"></i> CrossWiki Activity</h2>
                        <button class="wds-button wds-is-secondary cwa-rc__refresh" @click="fetchData" :disabled="isLoading">
                            <i class="fa-solid fa-rotate-right" :class="{'fa-spin': isLoading}"></i> Обновить
                        </button>
                    </div>
                    <nav class="cwa-rc__tabs">
                        <div v-for="tab in tabs" :key="tab.id" 
                             class="cwa-rc__tab" 
                             :class="{'cwa-rc__tab--active': activeTab === tab.id}"
                             @click="activeTab = tab.id">
                             <i :class="tab.icon"></i> {{ tab.name }}
                             <span class="cwa-rc__badge" v-if="getEditsByTab(tab.id).length">{{ getEditsByTab(tab.id).length }}</span>
                        </div>
                    </nav>
                </header>
                <main class="cwa-rc__content">
                    
                    <div v-if="failedWikis.length > 0" class="cwa-rc__error-box">
                        <strong><i class="fa-solid fa-triangle-exclamation"></i> Ошибка загрузки с этих Вики (проверьте ссылки в Модуле):</strong>
                        <ul><li v-for="w in failedWikis" :key="w">{{ w }}</li></ul>
                    </div>
                    <div v-if="isLoading" class="cwa-rc__loader">
                        <i class="fa-solid fa-spinner fa-spin-pulse"></i> Сбор данных с Википроектов...
                    </div>
                    
                    <div v-else-if="editsByDate.length === 0" class="cwa-rc__empty">
                        В этой категории пока нет новых действий.
                    </div>
                    
                    <ul v-else class="cwa-rc__list">
                        <!-- РАЗБИВКА ПО ДНЯМ -->
                        <template v-for="dateGroup in editsByDate" :key="dateGroup.date">
                            <li class="cwa-rc__date-header" style="text-align:center; font-weight:bold; font-size:15px; color:var(--theme-page-text-color); margin:20px 0 10px; border-bottom:1px solid var(--theme-border-color); padding-bottom:5px;">
                                {{ dateGroup.date }}
                            </li>
                            
                            <li v-for="group in dateGroup.groups" :key="group.key" class="cwa-rc__group-container">
                                
                                <!-- ОДИНОЧНАЯ ПРАВКА -->
                                <div v-if="group.items.length === 1" 
                                     class="cwa-rc__item"
                                     :data-type="group.items[0].type"
                                     :data-ns="group.items[0].ns"
                                     :data-logtype="group.items[0].logtype"
                                     :data-activity-type="group.items[0].socialContext ? group.items[0].socialContext.activityType : null"
                                     :data-content-type="group.items[0].socialContext ? group.items[0].socialContext.contentType : null">
                                     
                                    <div class="cwa-rc__favicon-wrap">
                                        <img :src="group.items[0].wikiFavicon" class="cwa-rc__favicon" :title="group.items[0].wikiDomain">
                                    </div>
                                    <div class="cwa-rc__main-info">
                                        <div class="cwa-rc__meta">
                                            <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                            <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].logaction || group.items[0].type"></i>
                                            <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank">{{ group.items[0].title }}</a>
                                            <!-- Действие для социальной активности -->
                                            <span v-if="group.items[0].actionText" style="color:var(--theme-page-text-color-secondary); margin-left:4px; font-size:13px;">({{ group.items[0].actionText }})</span>
                                            <span v-if="group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(group.items[0].sizeDiff)">
                                                ({{ group.items[0].sizeDiff > 0 ? '+' : '' }}{{ group.items[0].sizeDiff }})
                                            </span>
                                            <span v-if="group.items[0].flags && group.items[0].flags.length" class="cwa-rc__flags">
                                                ( <template v-for="(flag, index) in group.items[0].flags" :key="index">
                                                    <abbr class="cwa-rc__flag-abbr" :title="flag.title">{{ flag.text }}</abbr><span v-if="index < group.items[0].flags.length - 1"> | </span>
                                                </template> )
                                            </span>
                                        </div>
                                        <div class="cwa-rc__details">
                                            <a :href="group.items[0].userUrl" class="cwa-rc__user" target="_blank">{{ group.items[0].user }}</a>
                                            <span class="cwa-rc__summary" v-html="group.items[0].parsedComment"></span>
                                        </div>
                                    </div>
                                    <div class="cwa-rc__actions">
                                        <button v-if="group.items[0].pageid" class="cwa-rc__action-btn" title="Предпросмотр страницы" @click="openPreviewModal(group.items[0])">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                        <button v-if="group.items[0].old_revid" class="cwa-rc__action-btn" title="Показать дифф" @click="openDiffModal(group.items[0].wikiDomain, group.items[0].old_revid, group.items[0].revid, group.items[0].title)">
                                            <i class="fa-solid fa-code-compare"></i>
                                        </button>
                                        <a v-if="group.items[0].undoUrl" :href="group.items[0].undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" target="_blank">
                                            <i class="fa-solid fa-rotate-left"></i>
                                        </a>
                                        <button v-if="canRollback && group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__action-btn cwa-rc__action-btn--danger" title="Быстрый откат" @click="doRollback(group.items[0])">
                                            <i class="fa-solid fa-clock-rotate-left"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- СГРУППИРОВАННЫЕ ПРАВКИ -->
                                <div v-else class="cwa-rc__group">
                                    <div class="cwa-rc__item cwa-rc__item--group-header" 
                                         @click="toggleGroup(group.key)"
                                         :data-type="group.items[0].type"
                                         :data-ns="group.items[0].ns"
                                         :data-logtype="group.items[0].logtype"
                                         :data-activity-type="group.items[0].socialContext ? group.items[0].socialContext.activityType : null"
                                         :data-content-type="group.items[0].socialContext ? group.items[0].socialContext.contentType : null">
                                         
                                        <div class="cwa-rc__favicon-wrap">
                                            <img :src="group.wikiFavicon" class="cwa-rc__favicon" :title="group.wikiDomain">
                                        </div>
                                        <div class="cwa-rc__main-info">
                                            <div class="cwa-rc__meta">
                                                <i :class="expandedGroups[group.key] ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'" class="cwa-rc__toggle-icon"></i>
                                                <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                                <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon"></i>
                                                <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank" @click.stop>{{ group.title }}</a>
                                                <!-- Действие для социальной активности -->
                                                <span v-if="group.items[0].actionText" style="color:var(--theme-page-text-color-secondary); margin-left:4px; font-size:13px;">({{ group.items[0].actionText }})</span>
                                                <span class="cwa-rc__group-count">{{ pluralize(group.items.length, ['действие', 'действия', 'действий']) }}</span>
                                                <span v-if="group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(group.totalSizeDiff)">
                                                    ({{ group.totalSizeDiff > 0 ? '+' : '' }}{{ group.totalSizeDiff }})
                                                </span>
                                            </div>
                                            <div class="cwa-rc__details">
                                                <span class="cwa-rc__summary">Авторы: {{ Array.from(new Set(group.items.map(i => i.user))).join(', ') }}</span>
                                            </div>
                                        </div>
                                        <div class="cwa-rc__actions">
                                            <button v-if="group.items[0].pageid" class="cwa-rc__action-btn" title="Предпросмотр страницы" @click.stop="openPreviewModal(group.items[0])">
                                                <i class="fa-solid fa-eye"></i>
                                            </button>
                                            <button v-if="getGroupDiff(group)" class="cwa-rc__action-btn" title="Дифф всех изменений" @click.stop="openDiffModal(group.wikiDomain, getGroupDiff(group).from, getGroupDiff(group).to, group.title)">
                                                <i class="fa-solid fa-code-compare"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <ul v-if="expandedGroups[group.key]" class="cwa-rc__sublist">
                                        <li v-for="subEdit in group.items" :key="subEdit.id" 
                                            class="cwa-rc__item cwa-rc__item--sub"
                                            :data-type="subEdit.type"
                                            :data-ns="subEdit.ns"
                                            :data-logtype="subEdit.logtype"
                                            :data-activity-type="subEdit.socialContext ? subEdit.socialContext.activityType : null"
                                            :data-content-type="subEdit.socialContext ? subEdit.socialContext.contentType : null">
                                            
                                            <div class="cwa-rc__main-info">
                                                <div class="cwa-rc__meta">
                                                    <span class="cwa-rc__time">{{ subEdit.time }}</span>
                                                    <span v-if="subEdit.type !== 'log' && subEdit.type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(subEdit.sizeDiff)">
                                                        ({{ subEdit.sizeDiff > 0 ? '+' : '' }}{{ subEdit.sizeDiff }})
                                                    </span>
                                                    <!-- Действие для социальной активности внутри группы -->
                                                    <span v-if="subEdit.actionText" style="color:var(--theme-page-text-color-secondary); margin-left:4px; font-size:13px;">({{ subEdit.actionText }})</span>
                                                    <span v-if="subEdit.flags && subEdit.flags.length" class="cwa-rc__flags">
                                                        ( <template v-for="(flag, index) in subEdit.flags" :key="index">
                                                            <abbr class="cwa-rc__flag-abbr" :title="flag.title">{{ flag.text }}</abbr><span v-if="index < subEdit.flags.length - 1"> | </span>
                                                        </template> )
                                                    </span>
                                                </div>
                                                <div class="cwa-rc__details">
                                                    <a :href="subEdit.userUrl" class="cwa-rc__user" target="_blank">{{ subEdit.user }}</a>
                                                    <span class="cwa-rc__summary" v-html="subEdit.parsedComment"></span>
                                                </div>
                                            </div>
                                            <div class="cwa-rc__actions">
                                                <button v-if="subEdit.old_revid" class="cwa-rc__action-btn" title="Показать дифф" @click="openDiffModal(subEdit.wikiDomain, subEdit.old_revid, subEdit.revid, subEdit.title)">
                                                    <i class="fa-solid fa-code-compare"></i>
                                                </button>
                                                <a v-if="subEdit.undoUrl" :href="subEdit.undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" target="_blank">
                                                    <i class="fa-solid fa-rotate-left"></i>
                                                </a>
                                                <button v-if="canRollback && subEdit.type !== 'log' && subEdit.type !== 'discussion'" class="cwa-rc__action-btn cwa-rc__action-btn--danger" title="Быстрый откат" @click="doRollback(subEdit)">
                                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </template>
                    </ul>
                </main>
                <!-- МОДАЛЬНОЕ ОКНО -->
                <div v-if="modal.isOpen" class="cwa-modal-overlay" @click.self="closeModal">
                    <div class="cwa-modal">
                        <header class="cwa-modal__header">
                            <h3>{{ modal.title }}</h3>
                            <button class="cwa-modal__close" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                        </header>
                        <div class="cwa-modal__body">
                            <div v-if="modal.isLoading" class="cwa-modal__loader">
                                <i class="fa-solid fa-spinner fa-spin-pulse"></i> Загрузка...
                            </div>
                            <div v-else class="cwa-modal__content mw-parser-output" v-html="modal.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        data() {
            const uGroups = mw.config.get('wgUserGroups') || [];
            const hasRollback = uGroups.some(g => ['sysop', 'content-moderator', 'rollback', 'staff', 'wiki-representative', 'soap'].includes(g));

            return {
                canRollback: hasRollback,
                isLoading: false,
                activeTab: 'content',
                wikis: [], 
                edits: [], 
                failedWikis: [],
                expandedGroups: {},
                tabs: [
                    { id: 'content', name: 'Статьи и Шаблоны', icon: 'fa-solid fa-file-lines' },
                    { id: 'social', name: 'Общение', icon: 'fa-solid fa-comments' },
                    { id: 'media', name: 'Медиа', icon: 'fa-solid fa-image' },
                    { id: 'system', name: 'Служебное и Боты', icon: 'fa-solid fa-robot' }
                ],
                modal: { isOpen: false, isLoading: false, title: '', content: '' }
            };
        },
        computed: {
            // Вычисляемое свойство для разбивки правок по Дням
            editsByDate() {
                const filtered = this.getEditsByTab(this.activeTab);
                const groups = [];
                
                // Первичная группировка по страницам (как было)
                filtered.forEach(edit => {
                    const dateKey = new Date(edit.timestamp).toDateString();
                    const groupKey = `${edit.wikiDomain}-${edit.groupWithID}-${dateKey}`;
                    
                    let existingGroup = groups.find(g => g.key === groupKey);
                    if (existingGroup) {
                        existingGroup.items.push(edit);
                        existingGroup.totalSizeDiff += edit.sizeDiff;
                    } else {
                        groups.push({
                            key: groupKey, wikiDomain: edit.wikiDomain, wikiFavicon: edit.wikiFavicon,
                            title: edit.title, totalSizeDiff: edit.sizeDiff, items: [edit]
                        });
                    }
                });

                // Вторичная группировка по датам
                const result = [];
                groups.forEach(g => {
                    const d = new Date(g.items[0].timestamp);
                    // Форматируем: "20 июля 2026"
                    const dateStr = d.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');
                    
                    let lastDateGroup = result[result.length - 1];
                    if (lastDateGroup && lastDateGroup.date === dateStr) {
                        lastDateGroup.groups.push(g);
                    } else {
                        result.push({ date: dateStr, groups: [g] });
                    }
                });
                return result;
            }
        },
        methods: {
            pluralize(count, words) {
                const cases = [2, 0, 1, 1, 1, 2];
                return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
            },
            getEditsByTab(tabId) { return this.edits.filter(edit => edit.category === tabId); },
            toggleGroup(key) { this.expandedGroups[key] = !this.expandedGroups[key]; },
            
            getGroupDiff(group) {
                const diffableEdits = group.items.filter(i => i.revid && i.old_revid);
                if (diffableEdits.length === 0) return null;
                return { from: diffableEdits[diffableEdits.length - 1].old_revid, to: diffableEdits[0].revid };
            },
            
            formatWikiUrl(inputUrl) {
                let url = inputUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
                const oldFormatMatch = url.match(/^([a-z\-]{2,3})\.([^\.]+)\.fandom\.com$/);
                if (oldFormatMatch) {
                    let wikiName = oldFormatMatch[2].replace(/-/g, '');
                    url = `${wikiName}.fandom.com/${oldFormatMatch[1]}`;
                }
                return url; 
            },
            async fetchConfig() {
                try {
                    const api = new mw.Api();
                    const res = await api.get({
                        action: 'expandtemplates', text: '{' + '{#invoke:CrossWikiActivity|toJSON}}', prop: 'wikitext', formatversion: 2
                    });
                    if (res?.expandtemplates?.wikitext) {
                        this.wikis = JSON.parse(res.expandtemplates.wikitext.trim()).wikis || [];
                    }
                } catch (e) { console.error('[CWA] Ошибка загрузки конфига:', e); }
            },
            async fetchData() {
                if (this.wikis.length === 0) await this.fetchConfig();
                this.isLoading = true; this.edits = []; this.failedWikis = [];
                let allEdits = [];
                const fetchPromises = this.wikis.map((rawDomain, index) => {
                    return new Promise((resolve) => {
                        setTimeout(async () => {
                            const cleanDomain = this.formatWikiUrl(rawDomain);
                            let wikiEdits = [];
                            
                            try {
                                // 1. Стандартные правки
                                const api = new mw.ForeignApi(`https://${cleanDomain}/api.php`, { anonymous: true });
                                const res = await api.get({
                                    action: 'query', list: 'recentchanges',
                                    rcprop: 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags',
                                    rclimit: 100, rctype: 'edit|new|log', formatversion: 2
                                });
                                
                                if (res?.query?.recentchanges) {
                                    wikiEdits.push(...res.query.recentchanges.map(rc => this.normalizeData(rc, cleanDomain)));
                                } else {
                                    this.failedWikis.push(rawDomain);
                                }
                                
                                // 2. Дискуссии Фэндома с подтягиванием названий статей
                                try {
                                    const discRes = await fetch(`https://${cleanDomain}/wikia.php?controller=DiscussionPost&method=getPosts&limit=50&responseGroup=small&viewableOnly=true&format=json`, { mode: 'cors' });
                                    if (discRes.ok) {
                                        const discData = await discRes.json();
                                        const posts = discData?._embedded?.['doc:posts'] || [];
                                        
                                        // Запрашиваем реальные названия статей для комментариев
                                        const articleIds = posts.filter(p => p._embedded?.thread?.[0]?.containerType === 'ARTICLE_COMMENT').map(p => p.forumId).filter(Boolean);
                                        let articleData = {};
                                        if (articleIds.length > 0) {
                                            try {
                                                const uniqueIds = [...new Set(articleIds)];
                                                const artRes = await fetch(`https://${cleanDomain}/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=${uniqueIds.join(',')}&format=json`, { mode: 'cors' });
                                                if (artRes.ok) {
                                                    const artJson = await artRes.json();
                                                    articleData = artJson.articleNames || {};
                                                }
                                            } catch(e) {}
                                        }

                                        wikiEdits.push(...posts.map(p => this.normalizeDiscussion(p, cleanDomain, articleData)));
                                    }
                                } catch (e) {
                                }
                                
                                resolve(wikiEdits);
                            } catch (e) {
                                if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                                resolve([]);
                            }
                        }, index * 250); 
                    });
                });
                const results = await Promise.all(fetchPromises);
                results.forEach(wikiEdits => allEdits.push(...wikiEdits));
                allEdits.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                this.edits = allEdits;
                this.isLoading = false;
            },
            normalizeData(rc, wikiDomain) {
                const serverUrl = `https://${wikiDomain}`;
                const articlePath = `${serverUrl}/wiki/`;
                
                let category = 'content';
                let groupWithID = rc.title; 
                if (rc.type === 'log') {
                    groupWithID = rc.logtype; 
                    if (['upload'].includes(rc.logtype) || rc.ns === 6) category = 'media';
                    else if (rc.ns % 2 !== 0 || [119, 500, 501, 1200, 1201, 1202, 2000, 2001, 2002].includes(rc.ns)) category = 'social';
                    else category = 'system';
                } else {
                    if (rc.ns === 6) category = 'media';
                    else if (rc.ns % 2 !== 0 || [119, 500, 501, 1200, 1201, 1202, 2000, 2001, 2002].includes(rc.ns)) category = 'social';
                    else if ([2, 8, 828].includes(rc.ns)) category = 'system'; 
                    else category = 'content'; 
                }
                
                let flagsArr = [];
                if (rc.type === 'new') flagsArr.push({ text: 'Н', title: 'Новая страница' });
                if (rc.minor) flagsArr.push({ text: 'м', title: 'Малая правка' });
                if (rc.bot) flagsArr.push({ text: 'б', title: 'Правка бота' });

                return {
                    id: rc.rcid || rc.logid || Math.random().toString(36).substring(2, 9),
                    revid: rc.revid, old_revid: rc.old_revid, pageid: rc.pageid,
                    type: rc.type, logtype: rc.logtype, logaction: rc.logaction,
                    ns: rc.ns, title: rc.title, user: rc.user, timestamp: rc.timestamp,
                    time: new Date(rc.timestamp).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                    parsedComment: rc.parsedcomment || (rc.type === 'log' ? `Журнал: ${rc.logtype} (${rc.logaction})` : ''),
                    sizeDiff: rc.newlen !== undefined && rc.oldlen !== undefined ? rc.newlen - rc.oldlen : 0,
                    flags: flagsArr, wikiDomain: wikiDomain,
                    wikiFavicon: `${serverUrl}/wiki/Special:FilePath/Site-favicon.ico`,
                    pageUrl: `${articlePath}${encodeURIComponent(rc.title)}`,
                    userUrl: `${articlePath}User:${encodeURIComponent(rc.user)}`,
                    undoUrl: rc.revid && rc.old_revid ? `${articlePath}${encodeURIComponent(rc.title)}?action=edit&undo=${rc.revid}&undoafter=${rc.old_revid}` : null,
                    category: category, groupWithID: groupWithID,
                    actionText: null
                };
            },
            normalizeDiscussion(post, wikiDomain, articleData) {
                const thread = post._embedded?.thread?.[0] || {};
                const date = new Date((post.modificationDate?.epochSecond || post.creationDate?.epochSecond) * 1000);
                const isReply = post.position > 1;
                const containerType = thread.containerType || "FORUM";
                
                let pageUrl = '';
                let contentType = 'post';
                let contentText = 'пост';
                let displayTitle = thread.title || post.title;
                
                // Распределяем типы контента и правильные ссылки
                if (containerType === 'ARTICLE_COMMENT') {
                    const info = articleData[post.forumId];
                    if (info) {
                        pageUrl = `https://${wikiDomain}${info.relativeUrl}?commentId=${post.threadId}${isReply ? '&replyId=' + post.id : ''}`;
                        displayTitle = info.title;
                    } else {
                        pageUrl = `https://${wikiDomain}/f/p/${post.threadId}`;
                        displayTitle = post.forumName || 'Комментарий к статье';
                    }
                    contentType = 'comment';
                    contentText = 'комментарий';
                } else if (containerType === 'WALL' || containerType === 'MESSAGE_WALL') {
                    const cleanWallName = (post.forumName || "").replace(/ Message Wall$/, "").replace(/^Стена обсуждения:/, "");
                    pageUrl = `https://${wikiDomain}/wiki/Message_Wall:${encodeURIComponent(cleanWallName)}?threadId=${post.threadId}${isReply ? '#' + post.id : ''}`;
                    if (!displayTitle || displayTitle.startsWith("@")) displayTitle = 'Стена обсуждения';
                    contentType = 'message';
                    contentText = 'сообщение на стене';
                } else {
                    pageUrl = `https://${wikiDomain}/f/p/${post.threadId}${isReply ? '/r/' + post.id : ''}`;
                    if (!displayTitle) displayTitle = 'Обсуждение на форуме';
                }

                let summary = post.rawContent || '(Вложение / Опрос)';
                if (summary.length > 85) summary = summary.substring(0, 85) + '...';

                // Формируем текстовое действие (actionText)
                let actionPrefix = 'Новый';
                if (post.isDeleted) actionPrefix = 'Удалён';
                else if (post.isLocked) actionPrefix = 'Закрыт';
                
                let actionText = isReply ? `${actionPrefix === 'Новый' ? 'Новый ответ на' : actionPrefix} ${contentText}` : `${actionPrefix} ${contentText}`;

                return {
                    id: 'disc-' + post.id,
                    revid: null, old_revid: null, pageid: null,
                    type: 'discussion', logtype: '', logaction: '',
                    ns: -5234, 
                    title: displayTitle,
                    actionText: actionText,
                    user: post.createdBy?.name || 'Аноним',
                    timestamp: date.toISOString(),
                    time: date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                    parsedComment: summary, sizeDiff: 0,
                    flags: [{ text: isReply ? 'Ответ' : 'Пост', title: isReply ? 'Ответ в обсуждении' : 'Новое обсуждение' }],
                    wikiDomain: wikiDomain,
                    wikiFavicon: `https://${wikiDomain}/wiki/Special:FilePath/Site-favicon.ico`,
                    pageUrl: pageUrl,
                    userUrl: `https://${wikiDomain}/wiki/User:${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    category: 'social', groupWithID: 'disc-' + post.threadId,
                    socialContext: { activityType: post.isDeleted ? 'delete' : 'create', contentType: contentType + (isReply ? '-reply' : '') }
                };
            },
            getIconForType(edit) {
                if (edit.type === 'discussion') return 'fa-solid fa-comment-dots';
                if (edit.type === 'log') {
                    const action = `${edit.logtype}/${edit.logaction}`;
                    const map = {
                        'delete/delete': 'fa-solid fa-trash', 'delete/restore': 'fa-solid fa-trash-arrow-up',
                        'block/block': 'fa-solid fa-ban', 'block/unblock': 'fa-solid fa-unlock',
                        'protect/protect': 'fa-solid fa-lock', 'protect/unprotect': 'fa-solid fa-lock-open',
                        'upload/upload': 'fa-solid fa-upload', 'move/move': 'fa-solid fa-arrow-right-arrow-left'
                    };
                    return map[action] || 'fa-solid fa-clipboard-list';
                }
                if (edit.type === 'new') return 'fa-solid fa-file-circle-plus';
                if ([2, 8, 828].includes(edit.ns)) return 'fa-solid fa-code'; 
                return 'fa-solid fa-pen';
            },
            getSizeClass(diff) {
                if (diff > 500) return 'cwa-rc__size--large-plus';
                if (diff > 0) return 'cwa-rc__size--plus';
                if (diff < -500) return 'cwa-rc__size--large-minus';
                if (diff < 0) return 'cwa-rc__size--minus';
                return 'cwa-rc__size--zero';
            },

            async doRollback(edit) {
                if (!confirm(`Откатить правки участника ${edit.user} на странице "${edit.title}"?`)) return;
                try {
                    const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`);
                    await api.postWithToken('rollback', { action: 'rollback', title: edit.title, user: edit.user, formatversion: 2 });
                    mw.notify(`Правки участника ${edit.user} успешно откачены.`, { type: 'success' });
                    this.edits = this.edits.filter(e => e.id !== edit.id);
                } catch (e) {
                    mw.notify('Ошибка при откате: ' + (e.info || 'Недостаточно прав или правка уже откачена.'), { type: 'error' });
                }
            },

            closeModal() {
                this.modal.isOpen = false;
                this.modal.content = '';
            },
            openDiffModal(wikiDomain, fromRev, toRev, title) {
                this.modal.isOpen = true; this.modal.isLoading = true;
                this.modal.title = `Сравнение версий: ${title}`;
                
                const api = new mw.ForeignApi(`https://${wikiDomain}/api.php`, { anonymous: true });
                api.get({ action: 'compare', fromrev: fromRev, torev: toRev, formatversion: 2 }).then(data => {
                    if (data?.compare?.body) {
                        this.modal.content = `<table class="diff"><colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup><tbody>${data.compare.body}</tbody></table>`;
                    } else { this.modal.content = '<em>Изменения скрыты или не найдены.</em>'; }
                    this.modal.isLoading = false;
                }).catch(() => {
                    this.modal.content = '<em>Не удалось загрузить дифф.</em>';
                    this.modal.isLoading = false;
                });
            },
            openPreviewModal(edit) {
                this.modal.isOpen = true; this.modal.isLoading = true;
                this.modal.title = `Предпросмотр: ${edit.title}`;
                
                const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`, { anonymous: true });
                api.get({ action: 'parse', pageid: edit.pageid, prop: 'text', disabletoc: true, formatversion: 2 }).then(data => {
                    if (data?.parse?.text) {
                        this.modal.content = data.parse.text.replace(/href="\//g, `target="_blank" href="https://${edit.wikiDomain}/`);
                    } else { this.modal.content = '<em>Не удалось загрузить содержимое.</em>'; }
                    this.modal.isLoading = false;
                }).catch(() => {
                    this.modal.content = '<em>Ошибка при загрузке страницы.</em>';
                    this.modal.isLoading = false;
                });
            }
        },
        mounted() { this.fetchData(); }
    };
    const targetContainer = document.querySelector('#cwa-app-container');
    if (targetContainer) { Vue.createMwApp(App).mount(targetContainer); }
})();