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
                        <h2><i class="fa-solid fa-globe"></i> Вся активность с любимых Вики в одном месте</h2>
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
                    
                    <!-- Изменение: лоадер показывается только если массив полностью пуст (исключает мигание) -->
                    <div v-if="isLoading && edits.length === 0" class="cwa-rc__loader">
                        <i class="fa-solid fa-spinner fa-spin-pulse"></i> Сбор данных с Википроектов...
                    </div>
                    
                    <div v-else-if="editsByDate.length === 0" class="cwa-rc__empty">
                        В этой категории пока нет новых действий.
                    </div>
                    
                    <ul v-else class="cwa-rc__list">
                        <!-- РАЗБИВКА ПО ДНЯМ -->
                        <template v-for="dateGroup in editsByDate" :key="dateGroup.date">
                            <li class="cwa-rc__date-header">
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
                                            <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                            <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank">{{ group.items[0].title }}</a>
                                            <!-- Действие для социальной активности -->
                                            <span v-if="group.items[0].actionText" class="cwa-rc__action-text">({{ group.items[0].actionText }})</span>
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
                                                <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                                <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank" @click.stop>{{ group.title }}</a>
                                                <!-- Действие для социальной активности -->
                                                <span v-if="group.items[0].actionText" class="cwa-rc__action-text">({{ group.items[0].actionText }})</span>
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
                                                    <i :class="getIconForType(subEdit)" class="cwa-rc__type-icon cwa-rc__sub-icon" :title="subEdit.actionTitle || subEdit.logaction || subEdit.type"></i>
                                                    <span v-if="subEdit.type !== 'log' && subEdit.type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(subEdit.sizeDiff)">
                                                        ({{ subEdit.sizeDiff > 0 ? '+' : '' }}{{ subEdit.sizeDiff }})
                                                    </span>
                                                    <!-- Действие для социальной активности внутри группы -->
                                                    <span v-if="subEdit.actionText" class="cwa-rc__action-text">({{ subEdit.actionText }})</span>
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
                            <!-- Изменение: добавлен id="mw-content-text" для корректных стилей инфобоксов Фэндома -->
                            <div v-else class="cwa-modal__content" id="mw-content-text">
                                <div class="mw-parser-output" v-html="modal.content"></div>
                            </div>
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
                settings: { limit: 4000, days: 3, showBots: false, showMinor: true, autoRefresh: 60 },
                refreshInterval: null, 
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
            editsByDate() {
                const filtered = this.getEditsByTab(this.activeTab);
                const groups = [];
                
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

                const result = [];
                groups.forEach(g => {
                    const d = new Date(g.items[0].timestamp);
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
                    let wikiName = oldFormatMatch[2];
                    url = `${wikiName}.fandom.com/${oldFormatMatch[1]}`;
                }
                return url; 
            },
            
            setupAutoRefresh() {
                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                }
                if (this.settings.autoRefresh && this.settings.autoRefresh > 0) {
                    this.refreshInterval = setInterval(() => {
                        if (!this.isLoading) {
                            this.fetchData();
                        }
                    }, this.settings.autoRefresh * 1000);
                }
            },
            
            async fetchConfig() {
                try {
                    const api = new mw.Api();
                    const res = await api.get({
                        action: 'expandtemplates', text: '{' + '{#invoke:CrossWikiActivity|toJSON}}', prop: 'wikitext', formatversion: 2, _: Date.now()
                    });
                    if (res?.expandtemplates?.wikitext) {
                        const parsed = JSON.parse(res.expandtemplates.wikitext.trim());
                        this.wikis = parsed.wikis || [];
                        if (parsed.settings) Object.assign(this.settings, parsed.settings);
                    }
                } catch (e) { console.error('[CWA] Ошибка загрузки конфига:', e); }
            },
            
            async fetchData() {
                if (this.wikis.length === 0) {
                    await this.fetchConfig();
                    this.setupAutoRefresh();
                }
                
                this.isLoading = true; this.failedWikis = [];
                
                try {
                    const editsMap = new Map(this.edits.map(e => [e.id, e]));

                    let endDate = new Date();
                    endDate.setDate(endDate.getDate() - (this.settings.days || 3));
                    const rcend = endDate.toISOString();
                    
                    let rcshow = [];
                    if (this.settings.showBots === false) rcshow.push('!bot');
                    if (this.settings.showMinor === false) rcshow.push('!minor');

                    const fetchPromises = this.wikis.map((rawDomain, index) => {
                        return new Promise((resolve) => {
                            setTimeout(async () => {
                                const cleanDomain = this.formatWikiUrl(rawDomain);
                                let wikiEdits = [];
                                
                                try {
                                    const api = new mw.ForeignApi(`https://${cleanDomain}/api.php`, { anonymous: true });
                                    
                                    const params = {
                                        action: 'query', list: 'recentchanges',
                                        rcprop: 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags',
                                        rclimit: this.settings.limit || 4000,
                                        rctype: 'edit|new|log', rcend: rcend, formatversion: 2,
                                        _: Date.now() 
                                    };
                                    if (rcshow.length > 0) params.rcshow = rcshow.join('|');
                                    
                                    const res = await api.get(params);
                                    
                                    if (res?.query?.recentchanges) {
                                        wikiEdits.push(...res.query.recentchanges.map(rc => this.normalizeData(rc, cleanDomain)));
                                    } else {
                                        this.failedWikis.push(rawDomain);
                                    }
                                    
                                    try {
                                        const discLimit = Math.min(this.settings.limit || 100, 100); 
                                        // Изменение: убран responseGroup=small, чтобы получить тексты постов (rawContent/snippet)
                                        const discRes = await fetch(`https://${cleanDomain}/wikia.php?controller=DiscussionPost&method=getPosts&limit=${discLimit}&viewableOnly=true&format=json&cb=${Date.now()}`, { mode: 'cors' });
                                        if (discRes.ok) {
                                            const discData = await discRes.json();
                                            const posts = discData?._embedded?.['doc:posts'] || [];
                                            
                                            const articleIds = posts.filter(p => p._embedded?.thread?.[0]?.containerType === 'ARTICLE_COMMENT').map(p => p.forumId).filter(Boolean);
                                            let articleData = {};
                                            if (articleIds.length > 0) {
                                                try {
                                                    const uniqueIds = [...new Set(articleIds)];
                                                    const artRes = await fetch(`https://${cleanDomain}/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=${uniqueIds.join(',')}&format=json&cb=${Date.now()}`, { mode: 'cors' });
                                                    if (artRes.ok) {
                                                        const artJson = await artRes.json();
                                                        articleData = artJson.articleNames || {};
                                                    }
                                                } catch(e) {}
                                            }

                                            posts.forEach(p => {
                                                try {
                                                    wikiEdits.push(this.normalizeDiscussion(p, cleanDomain, articleData));
                                                } catch(err) {}
                                            });
                                        }
                                    } catch (e) {}
                                    
                                    resolve(wikiEdits);
                                } catch (e) {
                                    if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                                    resolve([]);
                                }
                            }, index * 250); 
                        });
                    });
                    
                    const results = await Promise.all(fetchPromises);
                    
                    results.forEach(wikiEdits => {
                        wikiEdits.forEach(e => editsMap.set(e.id, e));
                    });
                    
                    let allEdits = Array.from(editsMap.values());
                    allEdits = allEdits.filter(edit => new Date(edit.timestamp) >= endDate);
                    allEdits.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    this.edits = allEdits;
                    
                } finally {
                    this.isLoading = false;
                }
            },
            
            normalizeData(rc, wikiDomain) {
                const serverUrl = `https://${wikiDomain}`;
                const articlePath = `${serverUrl}/wiki/`;
                
                let category = 'content';
                let groupWithID = rc.title; 
                let isBot = !!rc.bot; // Исправленная проверка на бота
                
                const mediaNs = [-2, 6];
                const systemNs = [-1, 2, 8, 828];
                const socialNs = [119, 500, 501, 502, 503, 1200, 1201, 1202, 2000, 2001, 2002]; 
                
                if (rc.type === 'log') {
                    groupWithID = rc.logtype; 
                    if (['upload'].includes(rc.logtype) || mediaNs.includes(rc.ns)) category = 'media';
                    else if (rc.ns % 2 !== 0 || socialNs.includes(rc.ns)) category = 'social';
                    else category = 'system';
                } else {
                    if (mediaNs.includes(rc.ns)) category = 'media';
                    else if (rc.ns % 2 !== 0 || socialNs.includes(rc.ns)) category = 'social';
                    else if (systemNs.includes(rc.ns)) category = 'system'; 
                    else category = 'content'; 
                }
                
                let flagsArr = [];
                if (rc.type === 'new') flagsArr.push({ text: 'Н', title: 'Новая страница' });
                if (rc.minor) flagsArr.push({ text: 'м', title: 'Малая правка' });
                if (isBot) flagsArr.push({ text: 'б', title: 'Правка бота' });

                let actionTitle = null;
                if (category === 'social') {
                    let isMessage = (rc.ns === 1200 || rc.ns === 1201 || rc.ns === 1202);
                    let isPost = (rc.ns === 2000 || rc.ns === 2001 || rc.ns === 2002);
                    let isBlog = (rc.ns === 500 || rc.ns === 501 || rc.ns === 502 || rc.ns === 503);
                    let isTalk = (!isMessage && !isPost && !isBlog);

                    let act = 'Изменение';
                    if (rc.type === 'new') act = 'Новый';
                    else if (rc.type === 'log') {
                        if (rc.logaction === 'delete') act = 'Удаление';
                        else if (rc.logaction === 'restore') act = 'Восстановление';
                        else if (rc.logaction === 'protect') act = 'Закрытие'; 
                        else if (rc.logaction === 'unprotect') act = 'Открытие'; 
                    }

                    if (isTalk) {
                        if (act === 'Новый') actionTitle = 'Новое обсуждение';
                        else if (act === 'Удаление') actionTitle = 'Удаление обсуждения';
                        else if (act === 'Восстановление') actionTitle = 'Восстановление обсуждения';
                        else if (act === 'Закрытие') actionTitle = 'Закрытие обсуждения';
                        else if (act === 'Открытие') actionTitle = 'Открытие обсуждения';
                        else actionTitle = 'Изменение обсуждения';
                    } else if (isBlog) {
                        let isReply = (rc.ns === 501 || rc.ns === 503);
                        if (act === 'Новый') actionTitle = isReply ? 'Ответ на блог' : 'Новый блог';
                        else if (act === 'Удаление') actionTitle = 'Удаление блога';
                        else if (act === 'Восстановление') actionTitle = 'Восстановление блога';
                        else if (act === 'Закрытие') actionTitle = 'Закрытие блога';
                        else if (act === 'Открытие') actionTitle = 'Открытие блога';
                        else actionTitle = 'Изменение блога';
                    } else if (isMessage) {
                        let isReply = rc.ns === 1201;
                        if (act === 'Новый') actionTitle = isReply ? 'Ответ на сообщение' : 'Новое сообщение';
                        else if (act === 'Удаление') actionTitle = 'Удаление сообщения';
                        else if (act === 'Восстановление') actionTitle = 'Восстановление сообщения';
                        else if (act === 'Закрытие') actionTitle = 'Закрытие сообщения';
                        else if (act === 'Открытие') actionTitle = 'Открытие сообщения';
                        else actionTitle = 'Изменение сообщения';
                    } else if (isPost) {
                        let isReply = rc.ns === 2001;
                        if (act === 'Новый') actionTitle = isReply ? 'Ответ на пост' : 'Новый пост';
                        else if (act === 'Удаление') actionTitle = 'Удаление поста';
                        else if (act === 'Восстановление') actionTitle = 'Восстановление поста';
                        else if (act === 'Закрытие') actionTitle = 'Закрытие поста';
                        else if (act === 'Открытие') actionTitle = 'Открытие поста';
                        else actionTitle = 'Изменение поста';
                    }
                } else {
                    if (rc.type === 'new') {
                        actionTitle = (rc.ns === 6) ? 'Загружен новый файл' : 'Создана новая страница';
                    } else if (rc.type === 'log') {
                        const logAct = rc.logtype + '/' + rc.logaction;
                        const logMap = {
                            'delete/delete': 'Страница удалена',
                            'delete/restore': 'Страница восстановлена',
                            'block/block': 'Участник заблокирован',
                            'block/unblock': 'Участник разблокирован',
                            'protect/protect': 'Страница защищена',
                            'protect/unprotect': 'Защита снята',
                            'upload/upload': 'Загружен новый файл',
                            'upload/overwrite': 'Перезаписан файл',
                            'move/move': 'Страница переименована',
                            'move/move_redir': 'Переименована поверх перенаправления',
                            'rights/rights': 'Изменены права участника',
                            'contentmodel/change': 'Изменена модель контента'
                        };
                        actionTitle = logMap[logAct] || (rc.logtype + ' / ' + rc.logaction);
                    } else {
                        actionTitle = (rc.ns === 6) ? 'Отредактирован файл' : 'Отредактирована страница';
                    }
                }

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
                    actionTitle: actionTitle
                };
            },
            
            normalizeDiscussion(post, wikiDomain, articleData) {
                const thread = post._embedded?.thread?.[0] || {};
                const date = new Date((post.modificationDate?.epochSecond || post.creationDate?.epochSecond) * 1000);
                const isReply = post.position > 1;
                const containerType = thread.containerType || "FORUM";
                
                let pageUrl = '';
                let contentType = 'post';
                let displayTitle = thread.title || post.title;
                
                if (containerType === 'ARTICLE_COMMENT') {
                    if (displayTitle && (displayTitle.startsWith('User blog:') || displayTitle.startsWith('Блог участника:'))) {
                        contentType = 'blog';
                    } else {
                        contentType = 'comment';
                    }
                    const info = articleData && articleData[post.forumId] ? articleData[post.forumId] : null;
                    if (info) {
                        pageUrl = `https://${wikiDomain}/wiki/${encodeURIComponent(info.title.replace(/ /g, '_'))}?commentId=${post.threadId}${isReply ? '&replyId=' + post.id : ''}`;
                        displayTitle = info.title;
                    } else {
                        pageUrl = `https://${wikiDomain}/f/p/${post.threadId}`;
                        displayTitle = post.forumName || 'Комментарий к статье';
                    }
                } else if (containerType === 'WALL' || containerType === 'MESSAGE_WALL') {
                    const cleanWallName = (post.forumName || "").replace(/ Message Wall$/, "").replace(/^Стена обсуждения:/, "");
                    pageUrl = `https://${wikiDomain}/wiki/Message_Wall:${encodeURIComponent(cleanWallName.replace(/ /g, '_'))}?threadId=${post.threadId}${isReply ? '#' + post.id : ''}`;
                    if (!displayTitle || displayTitle.startsWith("@")) displayTitle = 'Стена обсуждения';
                    contentType = 'message';
                } else {
                    pageUrl = `https://${wikiDomain}/f/p/${post.threadId}${isReply ? '/r/' + post.id : ''}`;
                    if (!displayTitle) displayTitle = 'Обсуждение на форуме';
                }

                let summary = post.snippet || post.rawContent || '(Вложение / Опрос)';
                if (summary.length > 85) summary = summary.substring(0, 85) + '...';

                let act = 'Новый';
                if (post.isDeleted) act = 'Удаление';
                else if (post.isLocked) act = 'Закрытие';

                let actionTitle = '';
                if (contentType === 'comment') {
                    if (act === 'Новый') actionTitle = isReply ? 'Ответ на комментарий' : 'Новый комментарий';
                    else if (act === 'Удаление') actionTitle = 'Удаление комментария';
                    else if (act === 'Закрытие') actionTitle = 'Закрытие комментария';
                    else actionTitle = 'Изменение комментария';
                } else if (contentType === 'message') {
                    if (act === 'Новый') actionTitle = isReply ? 'Ответ на сообщение' : 'Новое сообщение';
                    else if (act === 'Удаление') actionTitle = 'Удаление сообщения';
                    else if (act === 'Закрытие') actionTitle = 'Закрытие сообщения';
                    else actionTitle = 'Изменение сообщения';
                } else if (contentType === 'blog') {
                    if (act === 'Новый') actionTitle = isReply ? 'Ответ на блог' : 'Новый блог';
                    else if (act === 'Удаление') actionTitle = 'Удаление блога';
                    else if (act === 'Закрытие') actionTitle = 'Закрытие блога';
                    else actionTitle = 'Изменение блога';
                } else { 
                    if (act === 'Новый') actionTitle = isReply ? 'Ответ на пост' : 'Новый пост';
                    else if (act === 'Удаление') actionTitle = 'Удаление поста';
                    else if (act === 'Закрытие') actionTitle = 'Закрытие поста';
                    else actionTitle = 'Изменение поста';
                }

                return {
                    id: 'disc-' + post.id,
                    revid: null, old_revid: null, pageid: null,
                    type: 'discussion', logtype: '', logaction: '',
                    ns: -5234, 
                    title: displayTitle,
                    actionTitle: actionTitle,
                    user: post.createdBy?.name || 'Аноним',
                    timestamp: date.toISOString(),
                    time: date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                    parsedComment: summary, sizeDiff: 0,
                    flags: [], 
                    wikiDomain: wikiDomain,
                    wikiFavicon: `https://${wikiDomain}/wiki/Special:FilePath/Site-favicon.ico`,
                    pageUrl: pageUrl,
                    userUrl: `https://${wikiDomain}/wiki/User:${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    category: 'social', groupWithID: 'disc-' + post.threadId,
                    socialContext: { activityType: post.isDeleted ? 'delete' : 'create', contentType: contentType + (isReply ? '-reply' : '') }
                };
            },
            
            getIconForType(edit) {
                if (edit.type === 'discussion' && edit.socialContext) {
                    const act = edit.socialContext.activityType; 
                    const ctx = edit.socialContext.contentType;  

                    const socialMap = {
                        'create': {
                            'comment': 'fa-solid fa-comment-dots',      
                            'comment-reply': 'fa-solid fa-comments',    
                            'message': 'fa-solid fa-envelope',          
                            'message-reply': 'fa-solid fa-reply',       
                            'post': 'fa-solid fa-message',              
                            'post-reply': 'fa-solid fa-reply-all',
                            'blog': 'fa-solid fa-blog',
                            'blog-reply': 'fa-solid fa-comment-medical'
                        },
                        'update': {
                            'comment': 'fa-solid fa-pen-to-square',
                            'comment-reply': 'fa-solid fa-pen',
                            'message': 'fa-solid fa-envelope-open-text',
                            'message-reply': 'fa-solid fa-marker',
                            'post': 'fa-solid fa-pen-clip',
                            'post-reply': 'fa-solid fa-pencil',
                            'blog': 'fa-solid fa-pen-nib',
                            'blog-reply': 'fa-solid fa-pen-ruler'
                        },
                        'delete': {
                            'comment': 'fa-solid fa-trash-can',         
                            'comment-reply': 'fa-solid fa-eraser',      
                            'message': 'fa-solid fa-calendar-xmark',    
                            'message-reply': 'fa-solid fa-minus-square',
                            'post': 'fa-solid fa-ban',                  
                            'post-reply': 'fa-solid fa-trash',
                            'blog': 'fa-solid fa-trash-can',
                            'blog-reply': 'fa-solid fa-eraser'
                        },
                        'undelete': {
                            'comment': 'fa-solid fa-trash-arrow-up',    
                            'message': 'fa-solid fa-recycle',           
                            'post': 'fa-solid fa-trash-can-arrow-up',
                            'blog': 'fa-solid fa-trash-arrow-up'
                        },
                        'lock': {
                            'comment': 'fa-solid fa-lock',              
                            'message': 'fa-solid fa-user-lock',         
                            'post': 'fa-solid fa-clock',
                            'blog': 'fa-solid fa-lock'
                        },
                        'unlock': {
                            'comment': 'fa-solid fa-lock-open',         
                            'message': 'fa-solid fa-unlock',            
                            'post': 'fa-solid fa-key',
                            'blog': 'fa-solid fa-lock-open'
                        }
                    };

                    if (socialMap[act] && socialMap[act][ctx]) {
                        return socialMap[act][ctx];
                    }
                    return 'fa-solid fa-comment';
                }

                if (edit.type === 'log') {
                    const map = {
                        'delete': 'fa-solid fa-trash',          
                        'block': 'fa-solid fa-user-lock',       
                        'protect': 'fa-solid fa-shield-halved', 
                        'upload': 'fa-solid fa-upload',         
                        'move': 'fa-solid fa-copy',             
                        'rights': 'fa-solid fa-user-shield',    
                        'contentmodel': 'fa-solid fa-file-code' 
                    };
                    return map[edit.logtype] || 'fa-solid fa-clipboard-list';
                }

                if (edit.type === 'new') return 'fa-solid fa-folder-plus';
                if ([-1, 8, 828].includes(edit.ns)) return 'fa-solid fa-code'; 
                if (edit.ns === 10) return 'fa-solid fa-gears';
                if (edit.ns === 14) return 'fa-solid fa-tags';
                if (edit.ns === 6) return 'fa-solid fa-image';
                if (edit.ns === 4) return 'fa-solid fa-flag';
                if (edit.ns === 2) return 'fa-solid fa-user';
                if (edit.ns === 500 || edit.ns === 502) return 'fa-solid fa-message'; // Blogs
                if ([400, 1100].includes(edit.ns)) return 'fa-solid fa-video'; // RelatedVideos
                if (edit.ns === 420) return 'fa-solid fa-map-location-dot'; // GeoJson
                
                return 'fa-solid fa-pen-to-square';
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
                    this.modal.content = '<em>Не удалось загрузить изменения.</em>';
                    this.modal.isLoading = false;
                });
            },
            
            openPreviewModal(edit) {
                this.modal.isOpen = true; this.modal.isLoading = true;
                this.modal.title = `Предпросмотр: ${edit.title}`;
                
                // Предпросмотр файлов (изображений)
                if (edit.ns === 6) {
                    const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`, { anonymous: true });
                    api.get({ action: 'query', titles: edit.title, prop: 'imageinfo', iiprop: 'url', formatversion: 2 }).then(data => {
                        const pages = data?.query?.pages;
                        if (pages && pages[0] && pages[0].imageinfo && pages[0].imageinfo.length > 0) {
                            this.modal.content = `<div class="cwa-modal__img-wrap"><img src="${pages[0].imageinfo[0].url}" class="cwa-modal__img" /></div>`;
                        } else {
                            this.modal.content = '<em>Не удалось загрузить изображение. Возможно, файл удалён.</em>';
                        }
                        this.modal.isLoading = false;
                    }).catch(() => {
                        this.modal.content = '<em>Ошибка при загрузке файла.</em>';
                        this.modal.isLoading = false;
                    });
                    return;
                }

                // Предпросмотр обычных страниц
                const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`, { anonymous: true });
                const parseParams = edit.pageid ? { pageid: edit.pageid } : { page: edit.title };
                
                api.get({ action: 'parse', ...parseParams, prop: 'text', disabletoc: true, formatversion: 2 }).then(data => {
                    if (data?.parse?.text) {
                        this.modal.content = data.parse.text.replace(/href="\//g, `target="_blank" href="https://${edit.wikiDomain}/`);
                        this.modal.isLoading = false;
                    } else {
                        throw new Error('No content');
                    }
                }).catch(() => {
                    // Фоллбэк: попытка вытащить удаленный текст из логов
                    const authApi = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`);
                    authApi.get({ action: 'query', prop: 'deletedrevisions', titles: edit.title, drvprop: 'content', drvlimit: 1, formatversion: 2 }).then(data => {
                        const pages = data?.query?.pages;
                        if (pages && pages[0] && pages[0].deletedrevisions && pages[0].deletedrevisions.length > 0) {
                            const content = pages[0].deletedrevisions[0].content;
                            authApi.post({ action: 'parse', text: content, contentmodel: 'wikitext', disabletoc: true, formatversion: 2 }).then(parseData => {
                                this.modal.content = `<div class="cwa-modal__alert">Внимание: Это содержимое удалённой страницы</div>` + 
                                    (parseData?.parse?.text || '').replace(/href="\//g, `target="_blank" href="https://${edit.wikiDomain}/`);
                                this.modal.isLoading = false;
                            }).catch(() => {
                                this.modal.content = `<div class="cwa-modal__alert">Внимание: Это содержимое удалённой страницы</div><div class="cwa-modal__pre-wrap">${mw.html.escape(content)}</div>`;
                                this.modal.isLoading = false;
                            });
                        } else {
                            this.modal.content = '<em>Страница удалена или у вас нет прав для её просмотра.</em>';
                            this.modal.isLoading = false;
                        }
                    }).catch(() => {
                        this.modal.content = '<em>Ошибка при загрузке. Страница не существует или удалена.</em>';
                        this.modal.isLoading = false;
                    });
                });
            }
        },
        mounted() { 
            this.fetchData(); 
        },
        beforeUnmount() {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }
        }
    };
    const targetContainer = document.querySelector('#cwa-app-container');
    if (targetContainer) { Vue.createMwApp(App).mount(targetContainer); }
})();