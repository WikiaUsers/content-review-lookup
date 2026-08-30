/* Test version */
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
                        <div class="cwa-rc__title-actions">
                            <button v-if="canPatrol && hasUnpatrolled" class="wds-button wds-is-secondary cwa-rc__refresh" @click="patrolAll" :disabled="isPatrolling || isLoading">
                                <i class="fa-solid cwa-rc__btn-icon" :class="isPatrolling ? 'fa-spinner fa-spin' : 'fa-check-double'"></i> {{ isPatrolling ? 'Патрулирование...' : 'Отпатрулировать видимые' }}
                            </button>
                            <button class="wds-button wds-is-secondary cwa-rc__refresh" @click="fetchData" :disabled="isLoading || isPatrolling">
                                <i class="fa-solid fa-rotate-right cwa-rc__btn-icon" :class="{'fa-spin': isLoading}"></i> Обновить
                            </button>
                        </div>
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
                        <strong><i class="fa-solid fa-triangle-exclamation"></i> Ошибка загрузки с этих Вики. Возможно, неправильно указаны ссылки в Модуле или данные проекты внесены в реестр запрещённых ресурсов РКН:</strong>
                        <ul><li v-for="w in failedWikis" :key="w">{{ w }}</li></ul>
                    </div>
                    
                    <div v-if="isLoading && edits.length === 0" class="cwa-rc__loader">
                        <i class="fa-solid fa-spinner fa-spin-pulse"></i> Сбор данных с Википроектов...
                    </div>
                    
                    <div v-else-if="editsByDate.length === 0" class="cwa-rc__empty">
                        В этой категории пока нет новых изменений.
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
                                        <img :src="group.items[0].wikiFavicon" class="cwa-rc__favicon" :title="group.items[0].wikiName">
                                    </div>
                                    <div class="cwa-rc__main-info">
                                        <div class="cwa-rc__meta">
                                            <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                            <span v-if="group.items[0].unpatrolled" class="cwa-rc__unpatrolled" title="Неотпатрулированная правка">!</span>
                                            <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                            <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank">{{ group.items[0].title }}</a>
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
                                            <span class="cwa-rc__user-wrap">
                                                <a :href="group.items[0].userUrl" class="cwa-rc__user" target="_blank">{{ group.items[0].user }}</a>
                                                <span class="cwa-rc__user-actions">
                                                    <button class="cwa-rc__action-btn" title="Стена обсуждения" @click.stop="openInNewTab(group.items[0].userTalkUrl)"><i class="fa-solid fa-comment-dots"></i></button>
                                                    <button class="cwa-rc__action-btn" title="Вклад" @click.stop="openInNewTab(group.items[0].userContribsUrl)"><i class="fa-solid fa-list-ul"></i></button>
                                                    <button v-if="canBlock" class="cwa-rc__action-btn" title="Заблокировать" @click.stop="openInNewTab(group.items[0].userBlockUrl)"><i class="fa-solid fa-user-slash"></i></button>
                                                </span>
                                            </span>
                                            <span class="cwa-rc__summary" v-html="group.items[0].parsedComment"></span>
                                        </div>
                                    </div>
                                    <div class="cwa-rc__actions">
                                        <button v-if="canPatrol && group.items[0].unpatrolled" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать" @click="doPatrol(group.items[0])">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-if="group.items[0].pageid || group.items[0].type === 'discussion'" class="cwa-rc__action-btn" title="Предпросмотр" @click="openPreviewModal(group.items[0])">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                        <button v-if="group.items[0].old_revid" class="cwa-rc__action-btn" title="Показать изменения" @click="openDiffModal(group.items[0].wikiDomain, group.items[0].old_revid, group.items[0].revid, group.items[0].title)">
                                            <i class="fa-solid fa-code-compare"></i>
                                        </button>
                                        <button v-if="group.items[0].undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" @click.stop="openInNewTab(group.items[0].undoUrl)">
                                            <i class="fa-solid fa-rotate-left"></i>
                                        </button>
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
                                            <img :src="group.wikiFavicon" class="cwa-rc__favicon" :title="group.wikiName">
                                        </div>
                                        <div class="cwa-rc__main-info">
                                            <div class="cwa-rc__meta">
                                                <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                                <i class="fa-solid fa-chevron-right cwa-rc__toggle-icon" :class="{'cwa-rc__toggle-icon--expanded': expandedGroups[group.key]}"></i>
                                                <span v-if="group.items.some(i => i.unpatrolled)" class="cwa-rc__unpatrolled" title="Есть неотпатрулированные правки">!</span>
                                                <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                                <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank" @click.stop>{{ group.title }}</a>
                                                <span v-if="group.items[0].actionText" class="cwa-rc__action-text">({{ group.items[0].actionText }})</span>
                                                <span class="cwa-rc__group-count">{{ pluralize(group.items.length, ['изменение', 'изменения', 'изменений']) }}</span>
                                                <span v-if="group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(group.totalSizeDiff)">
                                                    ({{ group.totalSizeDiff > 0 ? '+' : '' }}{{ group.totalSizeDiff }})
                                                </span>
                                            </div>
                                            <div class="cwa-rc__details">
                                                <span class="cwa-rc__summary">Авторы: {{ Array.from(new Set(group.items.map(i => i.user))).join(', ') }}</span>
                                            </div>
                                        </div>
                                        <div class="cwa-rc__actions">
                                            <button v-if="canPatrol && group.items.some(i => i.unpatrolled)" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать группу" @click.stop="doPatrolGroup(group)">
                                                <i class="fa-solid fa-check-double"></i>
                                            </button>
                                            <button v-if="group.items[0].pageid || group.items[0].type === 'discussion'" class="cwa-rc__action-btn" title="Предпросмотр" @click.stop="openPreviewModal(group.items[0])">
                                                <i class="fa-solid fa-eye"></i>
                                            </button>
                                            <button v-if="getGroupDiff(group)" class="cwa-rc__action-btn" title="Все изменения" @click.stop="openDiffModal(group.wikiDomain, getGroupDiff(group).from, getGroupDiff(group).to, group.title)">
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
                                                    <i :class="getIconForType(subEdit)" class="cwa-rc__type-icon cwa-rc__sub-icon" :title="subEdit.actionTitle || subEdit.logaction || subEdit.type"></i>
                                                    <span v-if="subEdit.unpatrolled" class="cwa-rc__unpatrolled" title="Неотпатрулированная правка">!</span>
                                                    <span class="cwa-rc__time">{{ subEdit.time }}</span>
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
                                                    <span class="cwa-rc__user-wrap">
                                                        <a :href="subEdit.userUrl" class="cwa-rc__user" target="_blank">{{ subEdit.user }}</a>
                                                        <span class="cwa-rc__user-actions">
                                                            <button class="cwa-rc__action-btn" title="Стена обсуждения" @click.stop="openInNewTab(subEdit.userTalkUrl)"><i class="fa-solid fa-comment-dots"></i></button>
                                                            <button class="cwa-rc__action-btn" title="Вклад" @click.stop="openInNewTab(subEdit.userContribsUrl)"><i class="fa-solid fa-list-ul"></i></button>
                                                            <button v-if="canBlock" class="cwa-rc__action-btn" title="Заблокировать" @click.stop="openInNewTab(subEdit.userBlockUrl)"><i class="fa-solid fa-user-slash"></i></button>
                                                        </span>
                                                    </span>
                                                    <span class="cwa-rc__summary" v-html="subEdit.parsedComment"></span>
                                                </div>
                                            </div>
                                            <div class="cwa-rc__actions">
                                                <button v-if="canPatrol && subEdit.unpatrolled" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать" @click="doPatrol(subEdit)">
                                                    <i class="fa-solid fa-check"></i>
                                                </button>
                                                <button v-if="subEdit.old_revid" class="cwa-rc__action-btn" title="Показать изменения" @click="openDiffModal(subEdit.wikiDomain, subEdit.old_revid, subEdit.revid, subEdit.title)">
                                                    <i class="fa-solid fa-code-compare"></i>
                                                </button>
                                                <button v-if="subEdit.undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" @click.stop="openInNewTab(subEdit.undoUrl)">
                                                    <i class="fa-solid fa-rotate-left"></i>
                                                </button>
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
            const hasPatrol = uGroups.some(g => ['sysop', 'content-moderator', 'staff', 'wiki-representative', 'soap', 'wiki-specialist'].includes(g));
            const hasBlock = uGroups.some(g => ['sysop', 'staff', 'wiki-representative', 'soap'].includes(g));

            let cachedPatrolled = [];
            try {
                const stored = localStorage.getItem('cwa-patrolled-cache');
                if (stored) cachedPatrolled = JSON.parse(stored);
            } catch(e) {}

            return {
                canRollback: hasRollback,
                canPatrol: hasPatrol,
                canBlock: hasBlock,
                isLoading: false,
                isPatrolling: false,
                activeTab: 'content',
                settings: { limit: 4000, days: 3, showBots: false, showMinor: true, autoRefresh: 60 },
                refreshInterval: null, 
                wikis: [], 
                edits: [], 
                failedWikis: [],
                expandedGroups: {},
                patrolledIds: cachedPatrolled,
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
            hasUnpatrolled() {
                return this.edits.some(e => e.unpatrolled && e.category === this.activeTab);
            },
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
                            key: groupKey, 
                            wikiDomain: edit.wikiDomain, 
                            wikiName: edit.wikiName, 
                            wikiFavicon: edit.wikiFavicon,
                            title: edit.title, 
                            totalSizeDiff: edit.sizeDiff, 
                            items: [edit]
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
            savePatrolledId(id) {
                if (!id) return;
                if (!this.patrolledIds.includes(id)) {
                    this.patrolledIds.push(id);
                    if (this.patrolledIds.length > 2000) {
                        this.patrolledIds = this.patrolledIds.slice(-2000);
                    }
                    try {
                        localStorage.setItem('cwa-patrolled-cache', JSON.stringify(this.patrolledIds));
                    } catch (e) {}
                }
            },
            openInNewTab(url) {
                window.open(url, '_blank');
            },
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
                // Добавляем протокол для корректного парсинга через нативный URL API
                const urlToParse = inputUrl.startsWith('http') ? inputUrl : 'https://' + inputUrl;
                let parsed;
                try {
                    parsed = new URL(urlToParse);
                } catch (e) {
                    throw new Error('Security Error: Invalid URL format.');
                }

                // Извлекаем реальный хост (URL API автоматически отсекает логины/пароли вида user:pass@)
                const hostname = parsed.hostname;

                if (!hostname.endsWith('.fandom.com') && hostname !== 'fandom.com') {
                    throw new Error('Security Error: Only fandom.com domains are allowed.');
                }

                // Формируем чистую строку без протокола, аутентификации и лишних слешей
                let url = parsed.host + parsed.pathname;
                url = url.replace(/\/$/, '');

                // Поддержка преобразования старого формата (ru.hazbinhotel.fandom.com -> hazbinhotel.fandom.com/ru)
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
                        if (!this.isLoading && !this.isPatrolling) {
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
                    const editsMap = new Map();

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
                                let currentWikiName = cleanDomain;
                                
                                try {
                                    const baseParams = {
                                        action: 'query', list: 'recentchanges',
                                        meta: 'siteinfo', siprop: 'general',
                                        rclimit: this.settings.limit || 4000,
                                        rctype: 'edit|new|log', rcend: rcend, formatversion: 2,
                                        _: Date.now() 
                                    };
                                    if (rcshow.length > 0) baseParams.rcshow = rcshow.join('|');
                                    
                                    let rcPromise;
                                    
                                    if (this.canPatrol) {
                                        const apiAuth = new mw.ForeignApi(`https://${cleanDomain}/api.php`);
                                        rcPromise = apiAuth.get({ ...baseParams, rcprop: 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags|patrolled' })
                                            .catch(() => {
                                                const apiAnon = new mw.ForeignApi(`https://${cleanDomain}/api.php`, { anonymous: true });
                                                return apiAnon.get({ ...baseParams, rcprop: 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags' }).catch(() => null);
                                            });
                                    } else {
                                        const apiAnon = new mw.ForeignApi(`https://${cleanDomain}/api.php`, { anonymous: true });
                                        rcPromise = apiAnon.get({ ...baseParams, rcprop: 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags' }).catch(() => null);
                                    }
                                    
                                    const discLimit = Math.min(this.settings.limit || 100, 100); 
                                    const discPromise = fetch(`https://${cleanDomain}/wikia.php?controller=DiscussionPost&method=getPosts&limit=${discLimit}&viewableOnly=true&format=json&cb=${Date.now()}`, { mode: 'cors' })
                                        .then(r => r.ok ? r.json() : null)
                                        .catch(() => null);

                                    const [res, discData] = await Promise.all([rcPromise, discPromise]);
                                    
                                    if (res) {
                                        if (res?.query?.general?.sitename) {
                                            currentWikiName = res.query.general.sitename;
                                        }
                                        if (res?.query?.recentchanges) {
                                            let rcEdits = res.query.recentchanges;
                                            
                                            // --- УМНАЯ ПРОВЕРКА ПРАВ АВТОРОВ (ИГНОРИРОВАНИЕ ДОВЕРЕННЫХ) ---
                                            if (this.canPatrol && rcEdits.length > 0) {
                                                const trustedGroups = ['sysop', 'content-moderator', 'rollback', 'staff', 'wiki-representative', 'soap', 'wiki-specialist', 'bot', 'autopatrolled', 'vanguard', 'voldev', 'global-discussions-moderator'];
                                                const systemUsers = ['GlobalJSReviewer', 'Fandom', 'Fandombot', 'Wikia', 'WikiaBot', 'Default'];
                                                const uniqueUsers = [...new Set(rcEdits.map(rc => rc.user))];
                                                const trustedUsers = new Set();
                                                
                                                // Дробим юзеров на пачки по 50 для API
                                                const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
                                                const userChunks = chunkArray(uniqueUsers, 50);
                                                
                                                const uApi = new mw.ForeignApi(`https://${cleanDomain}/api.php`, { anonymous: true });
                                                const userPromises = userChunks.map(chunk => 
                                                    uApi.get({ action: 'query', list: 'users', ususers: chunk.join('|'), usprop: 'groups', formatversion: 2 }).catch(() => null)
                                                );
                                                
                                                const uResults = await Promise.all(userPromises);
                                                uResults.forEach(uRes => {
                                                    if (uRes?.query?.users) {
                                                        uRes.query.users.forEach(u => {
                                                            if (u.groups && u.groups.some(g => trustedGroups.includes(g))) {
                                                                trustedUsers.add(u.name);
                                                            }
                                                        });
                                                    }
                                                });
                                                
                                                rcEdits.forEach(rc => {
                                                    if (trustedUsers.has(rc.user) || systemUsers.includes(rc.user) || rc.user === mw.config.get('wgUserName')) {
                                                        delete rc.unpatrolled;
                                                    }
                                                });
                                            }
                                            // -----------------------------------------------------------

                                            wikiEdits.push(...rcEdits.map(rc => this.normalizeData(rc, cleanDomain, currentWikiName)));
                                        } else {
                                            if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                                        }
                                    } else {
                                        if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                                    }
                                    
                                    if (discData) {
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
                                                wikiEdits.push(this.normalizeDiscussion(p, cleanDomain, articleData, currentWikiName));
                                            } catch(err) {}
                                        });
                                    }
                                    
                                    resolve(wikiEdits);
                                } catch (e) {
                                    if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                                    resolve([]);
                                }
                            }, index * 50); 
                        });
                    });
                    
                    const results = await Promise.all(fetchPromises);
                    
                    this.edits.forEach(e => editsMap.set(e.id, e));
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
            
            normalizeData(rc, wikiDomain, wikiName) {
                const serverUrl = `https://${wikiDomain}`;
                const articlePath = `${serverUrl}/wiki/`;
                
                let category = 'content';
                let groupWithID = rc.title; 
                let isBot = !!rc.bot; 
                
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
                        const logActMap = {
                            'delete': 'Удаление',
                            'restore': 'Восстановление',
                            'protect': 'Закрытие',
                            'unprotect': 'Открытие'
                        };
                        act = logActMap[rc.logaction] || 'Изменение';
                    }

                    let cType = isTalk ? 'talk' : isBlog ? 'blog' : isMessage ? 'message' : 'post';
                    let isReply = false;
                    if (isBlog) isReply = (rc.ns === 501 || rc.ns === 503);
                    if (isMessage) isReply = (rc.ns === 1201);
                    if (isPost) isReply = (rc.ns === 2001);

                    const socialTitleMap = {
                        'talk': { 'Новый': 'Новое обсуждение', 'Удаление': 'Удаление обсуждения', 'Восстановление': 'Восстановление обсуждения', 'Закрытие': 'Закрытие обсуждения', 'Открытие': 'Открытие обсуждения', 'Изменение': 'Изменение обсуждения' },
                        'blog': { 'Новый': isReply ? 'Ответ на блог' : 'Новый блог', 'Удаление': 'Удаление блога', 'Восстановление': 'Восстановление блога', 'Закрытие': 'Закрытие блога', 'Открытие': 'Открытие блога', 'Изменение': 'Изменение блога' },
                        'message': { 'Новый': isReply ? 'Ответ на сообщение' : 'Новое сообщение', 'Удаление': 'Удаление сообщения', 'Восстановление': 'Восстановление сообщения', 'Закрытие': 'Закрытие сообщения', 'Открытие': 'Открытие сообщения', 'Изменение': 'Изменение сообщения' },
                        'post': { 'Новый': isReply ? 'Ответ на пост' : 'Новый пост', 'Удаление': 'Удаление поста', 'Восстановление': 'Восстановление поста', 'Закрытие': 'Закрытие поста', 'Открытие': 'Открытие поста', 'Изменение': 'Изменение поста' }
                    };

                    actionTitle = socialTitleMap[cType][act] || 'Изменение';
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

                const logNamesMap = {
                    'move': 'Журнал переименований',
                    'rights': 'Журнал прав участника',
                    'delete': 'Журнал удалений',
                    'block': 'Журнал блокировок',
                    'protect': 'Журнал защиты',
                    'upload': 'Журнал загрузок',
                    'contentmodel': 'Журнал изменения модели',
                    'newusers': 'Журнал регистрации',
                    'patrol': 'Журнал патрулирования',
                    'import': 'Журнал импорта',
                    'merge': 'Журнал объединений',
                    'create': 'Журнал создания страниц'
                };
                
                const targetId = rc.rcid || rc.logid || rc.revid;

                return Object.freeze({
                    id: rc.rcid || rc.logid || Math.random().toString(36).substring(2, 9),
                    revid: rc.revid, rcid: rc.rcid, old_revid: rc.old_revid, pageid: rc.pageid,
                    unpatrolled: rc.unpatrolled !== undefined && !this.patrolledIds.includes(targetId),
                    type: rc.type, logtype: rc.logtype, logaction: rc.logaction,
                    ns: rc.ns, title: rc.title, user: rc.user, timestamp: rc.timestamp,
                    time: new Date(rc.timestamp).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                    parsedComment: rc.parsedcomment || (rc.type === 'log' ? (logNamesMap[rc.logtype] || `Журнал: ${rc.logtype} (${rc.logaction})`) : ''),
                    sizeDiff: rc.newlen !== undefined && rc.oldlen !== undefined ? rc.newlen - rc.oldlen : 0,
                    flags: flagsArr, wikiDomain: wikiDomain,
                    wikiName: wikiName || wikiDomain,
                    wikiFavicon: `${serverUrl}/wiki/Special:FilePath/Site-favicon.ico`,
                    pageUrl: `${articlePath}${encodeURIComponent(rc.title)}`,
                    userUrl: `${articlePath}User:${encodeURIComponent(rc.user)}`,
                    userTalkUrl: `${articlePath}User_talk:${encodeURIComponent(rc.user)}`,
                    userContribsUrl: `${articlePath}Special:Contributions/${encodeURIComponent(rc.user)}`,
                    userBlockUrl: `${articlePath}Special:Block/${encodeURIComponent(rc.user)}`,
                    undoUrl: rc.revid && rc.old_revid ? `${articlePath}${encodeURIComponent(rc.title)}?action=edit&undo=${rc.revid}&undoafter=${rc.old_revid}` : null,
                    category: category, groupWithID: groupWithID,
                    actionTitle: actionTitle
                });
            },
            
            normalizeDiscussion(post, wikiDomain, articleData, wikiName) {
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

                let summary = post.snippet || post.rawContent || post.body;
                
                if (!summary && post.jsonModel) {
                    try {
                        let texts = [];
                        JSON.parse(post.jsonModel, (key, value) => {
                            if (key === 'text' && typeof value === 'string') texts.push(value);
                            return value;
                        });
                        summary = texts.join(' ').replace(/\s+/g, ' ').trim();
                    } catch (e) {}
                }

                summary = summary || '(Вложение / Опрос)';
                if (summary.length > 85) summary = summary.substring(0, 85) + '...';

                let act = 'Новый';
                if (post.isDeleted) act = 'Удаление';
                else if (post.isLocked) act = 'Закрытие';

                const discTitleMap = {
                    'comment': { 'Новый': isReply ? 'Ответ на комментарий' : 'Новый комментарий', 'Удаление': 'Удаление комментария', 'Закрытие': 'Закрытие комментария', 'Изменение': 'Изменение комментария' },
                    'message': { 'Новый': isReply ? 'Ответ на сообщение' : 'Новое сообщение', 'Удаление': 'Удаление сообщения', 'Закрытие': 'Закрытие сообщения', 'Изменение': 'Изменение сообщения' },
                    'blog': { 'Новый': isReply ? 'Ответ на блог' : 'Новый блог', 'Удаление': 'Удаление блога', 'Закрытие': 'Закрытие блога', 'Изменение': 'Изменение блога' },
                    'post': { 'Новый': isReply ? 'Ответ на пост' : 'Новый пост', 'Удаление': 'Удаление поста', 'Закрытие': 'Закрытие поста', 'Изменение': 'Изменение поста' }
                };

                let safeContentType = discTitleMap[contentType] ? contentType : 'post';
                let actionTitle = discTitleMap[safeContentType][act] || 'Изменение';

                return Object.freeze({
                    id: 'disc-' + post.id,
                    revid: null, rcid: null, old_revid: null, pageid: null,
                    unpatrolled: false,
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
                    wikiName: wikiName || wikiDomain,
                    wikiFavicon: `https://${wikiDomain}/wiki/Special:FilePath/Site-favicon.ico`,
                    pageUrl: pageUrl,
                    userUrl: `https://${wikiDomain}/wiki/User:${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    userTalkUrl: `https://${wikiDomain}/wiki/User_talk:${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    userContribsUrl: `https://${wikiDomain}/wiki/Special:Contributions/${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    userBlockUrl: `https://${wikiDomain}/wiki/Special:Block/${encodeURIComponent(post.createdBy?.name || 'Аноним')}`,
                    category: 'social', groupWithID: 'disc-' + post.threadId,
                    socialContext: { activityType: post.isDeleted ? 'delete' : 'create', contentType: contentType + (isReply ? '-reply' : '') },
                    jsonModel: post.jsonModel,
                    rawContent: post.rawContent
                });
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
                
                const nsIconMap = {
                    '-1': 'fa-solid fa-code', '8': 'fa-solid fa-code', '828': 'fa-solid fa-code',
                    '10': 'fa-solid fa-gears',
                    '14': 'fa-solid fa-tags',
                    '6': 'fa-solid fa-image',
                    '4': 'fa-solid fa-flag',
                    '2': 'fa-solid fa-user',
                    '500': 'fa-solid fa-message', '502': 'fa-solid fa-message',
                    '400': 'fa-solid fa-video', '1100': 'fa-solid fa-video',
                    '420': 'fa-solid fa-map-location-dot'
                };
                
                return nsIconMap[edit.ns] || 'fa-solid fa-pen-to-square';
            },
            
            getSizeClass(diff) {
                if (diff > 500) return 'cwa-rc__size--large-plus';
                if (diff > 0) return 'cwa-rc__size--plus';
                if (diff < -500) return 'cwa-rc__size--large-minus';
                if (diff < 0) return 'cwa-rc__size--minus';
                return 'cwa-rc__size--zero';
            },

            async doPatrol(edit) {
                try {
                    const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`);
                    const params = { action: 'patrol', formatversion: 2 };
                    
                    if (edit.rcid) params.rcid = edit.rcid;
                    else if (edit.revid) params.revid = edit.revid;
                    else throw new Error('No ID');
                    
                    await api.postWithToken('patrol', params);
                    mw.notify(`Правка на странице "${edit.title}" отпатрулирована.`, { type: 'success' });
                    
                    this.savePatrolledId(edit.rcid || edit.logid || edit.revid);

                    const index = this.edits.findIndex(e => e.id === edit.id);
                    if (index !== -1) {
                        this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                    }
                } catch (e) {
                    mw.notify('Ошибка при патрулировании: ' + (e.info || 'Нет прав.'), { type: 'error' });
                }
            },

            async doPatrolGroup(group) {
                const unpatrolled = group.items.filter(i => i.unpatrolled);
                if (!unpatrolled.length) return;

                try {
                    const api = new mw.ForeignApi(`https://${group.wikiDomain}/api.php`);
                    for (const edit of unpatrolled) {
                        const params = { action: 'patrol', formatversion: 2 };
                        if (edit.rcid) params.rcid = edit.rcid;
                        else if (edit.revid) params.revid = edit.revid;
                        else continue;

                        await api.postWithToken('patrol', params);
                        
                        this.savePatrolledId(edit.rcid || edit.logid || edit.revid);

                        const index = this.edits.findIndex(e => e.id === edit.id);
                        if (index !== -1) {
                            this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                        }
                    }
                    mw.notify('Группа правок отпатрулирована.', { type: 'success' });
                } catch (e) {
                    mw.notify('Ошибка при патрулировании группы: ' + (e.info || 'Нет прав.'), { type: 'error' });
                }
            },
            
            async patrolAll() {
                const unpatrolled = this.edits.filter(e => e.unpatrolled && e.category === this.activeTab);
                if (!unpatrolled.length) return;
                
                if (!confirm(`Найдено действий для патрулирования на текущей вкладке: ${unpatrolled.length}. Начать процесс?`)) return;

                this.isPatrolling = true;
                let successCount = 0;
                let errorCount = 0;

                const byDomain = {};
                unpatrolled.forEach(edit => {
                    if (!byDomain[edit.wikiDomain]) byDomain[edit.wikiDomain] = [];
                    byDomain[edit.wikiDomain].push(edit);
                });

                for (const domain of Object.keys(byDomain)) {
                    const api = new mw.ForeignApi(`https://${domain}/api.php`);
                    const items = byDomain[domain];
                    
                    for (let i = 0; i < items.length; i += 4) {
                        const chunk = items.slice(i, i + 4);
                        const chunkPromises = chunk.map(async (edit) => {
                            try {
                                const params = { action: 'patrol', formatversion: 2 };
                                if (edit.rcid) params.rcid = edit.rcid;
                                else if (edit.revid) params.revid = edit.revid;
                                else return;

                                await api.postWithToken('patrol', params);
                                
                                this.savePatrolledId(edit.rcid || edit.logid || edit.revid);

                                const index = this.edits.findIndex(e => e.id === edit.id);
                                if (index !== -1) {
                                    this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                                }
                                successCount++;
                            } catch (e) {
                                errorCount++;
                            }
                        });

                        await Promise.all(chunkPromises);
                        await new Promise(r => setTimeout(r, 250));
                    }
                }
                
                this.isPatrolling = false;
                mw.notify(`Готово! Успешно: ${successCount}` + (errorCount > 0 ? `, Ошибок: ${errorCount}` : ''), { type: errorCount > 0 ? 'warn' : 'success' });
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

            cleanUpRemoteResources() {
                ['cwa-remote-styles', 'cwa-remote-scripts', 'cwa-remote-inline', 'cwa-remote-styles-preload'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.remove();
                });
            },

            closeModal() {
                this.cleanUpRemoteResources();
                this.modal.isOpen = false;
                this.modal.content = '';
            },
            
            openDiffModal(wikiDomain, fromRev, toRev, title) {
                this.modal.isOpen = true; this.modal.isLoading = true;
                this.modal.title = `Сравнение версий: ${title}`;
                
                const siteStylesUrl = `https://${wikiDomain}/load.php?lang=ru&modules=mediawiki.diff.styles|site.styles&only=styles&skin=fandomdesktop`;
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'style';
                preloadLink.href = siteStylesUrl;
                preloadLink.id = 'cwa-remote-styles-preload';
                document.head.appendChild(preloadLink);
                
                const api = new mw.ForeignApi(`https://${wikiDomain}/api.php`, { anonymous: true });
                api.get({ action: 'compare', fromrev: fromRev, torev: toRev, prop: 'diff|ids|title|user|timestamp|parsedcomment', formatversion: 2 }).then(data => {
                    if (data?.compare?.body) {
                        const c = data.compare;
                        const serverUrl = `https://${wikiDomain}`;
                        const articleUrl = `${serverUrl}/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
                        
                        const formatTime = (ts) => {
                            if (!ts) return '';
                            const d = new Date(ts);
                            const time = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                            const date = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');
                            return `${time}, ${date}`;
                        };

                        const fromTs = formatTime(c.fromtimestamp);
                        const toTs = formatTime(c.totimestamp);
                        const fromUser = mw.html.escape(c.fromuser || 'Аноним');
                        const toUser = mw.html.escape(c.touser || 'Аноним');
                        
                        const headerHtml = `
                            <tr class="diff-header" valign="top">
                                <td class="diff-otitle" colspan="2">
                                    <div class="mw-diff-otitle1"><strong><a href="${articleUrl}?oldid=${c.fromrevid}" target="_blank" data-action="revision-link-before">Версия от ${fromTs}</a> <span class="mw-rev-head-action">(<a href="${articleUrl}?oldid=${c.fromrevid}&action=edit" target="_blank" data-action="edit-revision-before">править</a>)</span></strong></div>
                                    <div class="mw-diff-otitle2"><span class="mw-usertoollinks"><a href="${serverUrl}/wiki/User:${encodeURIComponent(fromUser)}" target="_blank" data-username="${fromUser}">${fromUser}</a> (<a href="${serverUrl}/wiki/User_talk:${encodeURIComponent(fromUser)}" target="_blank">обсуждение</a> | <a href="${serverUrl}/wiki/Special:Contributions/${encodeURIComponent(fromUser)}" target="_blank">вклад</a>)</span></div>
                                    <div class="mw-diff-otitle3 cwa-rc__summary">${c.fromparsedcomment || ''}</div>
                                </td>
                                <td class="diff-ntitle" colspan="2">
                                    <div class="mw-diff-ntitle1"><strong><a href="${articleUrl}?oldid=${c.torevid}" target="_blank" data-action="revision-link-after">Версия от ${toTs}</a> <span class="mw-rev-head-action">(<a href="${articleUrl}?oldid=${c.torevid}&action=edit" target="_blank" data-action="edit-revision-after">править</a>)</span><span class="mw-rev-head-action">(<a href="${articleUrl}?action=edit&undoafter=${c.fromrevid}&undo=${c.torevid}" target="_blank" data-action="undo">отменить</a>)</span></strong></div>
                                    <div class="mw-diff-ntitle2"><span class="mw-usertoollinks"><a href="${serverUrl}/wiki/User:${encodeURIComponent(toUser)}" target="_blank" data-username="${toUser}">${toUser}</a> (<a href="${serverUrl}/wiki/User_talk:${encodeURIComponent(toUser)}" target="_blank">обсуждение</a> | <a href="${serverUrl}/wiki/Special:Contributions/${encodeURIComponent(toUser)}" target="_blank">вклад</a>)</span></div>
                                    <div class="mw-diff-ntitle3 cwa-rc__summary">${c.toparsedcomment || ''}</div>
                                </td>
                            </tr>
                        `;

                        const linkNode = document.createElement('link');
                        linkNode.id = 'cwa-remote-styles';
                        linkNode.rel = 'stylesheet';
                        linkNode.href = siteStylesUrl;

                        const finishLoading = () => {
                            this.modal.content = `
                                <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                                    <table class="diff"><colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup><tbody>${headerHtml}${data.compare.body}</tbody></table>
                                </div>
                            `;
                            this.modal.isLoading = false;
                        };

                        linkNode.onload = finishLoading;
                        linkNode.onerror = finishLoading;
                        document.body.appendChild(linkNode);

                    } else { 
                        this.modal.content = '<em>Изменения скрыты или не найдены.</em>'; 
                        this.modal.isLoading = false; 
                    }
                }).catch(() => {
                    this.modal.content = '<em>Не удалось загрузить изменения.</em>';
                    this.modal.isLoading = false;
                });
            },

            parseProseMirror(jsonString, fallbackText) {
                if (!jsonString) return fallbackText ? `<p>${mw.html.escape(fallbackText)}</p>` : '<em>Нет содержимого</em>';
                try {
                    const doc = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
                    
                    const renderMarks = (text, marks) => {
                        if (!marks || !marks.length) return mw.html.escape(text);
                        let res = mw.html.escape(text);
                        marks.forEach(m => {
                            if (m.type === 'strong') res = `<strong>${res}</strong>`;
                            else if (m.type === 'em') res = `<em>${res}</em>`;
                            else if (m.type === 'code') res = `<code>${res}</code>`;
                            else if (m.type === 'underline') res = `<u>${res}</u>`;
                            else if (m.type === 'strike') res = `<s>${res}</s>`;
                            else if (m.type === 'link') res = `<a href="${mw.html.escape(m.attrs?.href || '#')}" target="_blank">${res}</a>`;
                        });
                        return res;
                    };

                    const renderNode = (n) => {
                        if (n.type === 'text') return renderMarks(n.text, n.marks);
                        if (n.type === 'hardBreak') return '<br>';
                        
                        const innerHTML = (n.content || []).map(renderNode).join('');
                        
                        switch (n.type) {
                            case 'doc': return innerHTML;
                            case 'paragraph': return `<p>${innerHTML}</p>`;
                            case 'blockquote': return `<blockquote>${innerHTML}</blockquote>`;
                            case 'bulletList': return `<ul>${innerHTML}</ul>`;
                            case 'orderedList': return `<ol>${innerHTML}</ol>`;
                            case 'listItem': return `<li>${innerHTML}</li>`;
                            case 'heading': return `<h${n.attrs?.level || 2}>${innerHTML}</h${n.attrs?.level || 2}>`;
                            case 'code_block': return `<pre><code>${innerHTML}</code></pre>`;
                            case 'mention': return `<em>@${mw.html.escape(n.attrs?.text || 'User')}</em>`;
                            default: return innerHTML;
                        }
                    };

                    return renderNode(doc);
                } catch (e) {
                    return fallbackText ? `<p>${mw.html.escape(fallbackText)}</p>` : '<em>Ошибка обработки содержимого</em>';
                }
            },

            openPreviewModal(edit) {
                this.cleanUpRemoteResources();

                this.modal.isOpen = true; this.modal.isLoading = true;
                this.modal.title = `Предпросмотр: ${edit.title}`;

                if (edit.type === 'discussion') {
                    const parsedHtml = this.parseProseMirror(edit.jsonModel, edit.rawContent);
                    
                    const siteStylesUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.styles&only=styles&skin=fandomdesktop`;
                    const linkNode = document.createElement('link');
                    linkNode.id = 'cwa-remote-styles';
                    linkNode.rel = 'stylesheet';
                    linkNode.href = siteStylesUrl;

                    const finishLoading = () => {
                        this.modal.content = `
                            <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                                <div class="mw-parser-output">
                                    ${parsedHtml}
                                </div>
                            </div>
                        `;
                        this.modal.isLoading = false;
                    };

                    linkNode.onload = finishLoading;
                    linkNode.onerror = finishLoading; 
                    document.body.appendChild(linkNode);
                    
                    return;
                }
                
                if (edit.ns !== 6) {
                    const siteStylesUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.styles&only=styles&skin=fandomdesktop`;
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'preload';
                    preloadLink.as = 'style';
                    preloadLink.href = siteStylesUrl;
                    preloadLink.id = 'cwa-remote-styles-preload';
                    document.head.appendChild(preloadLink);
                }

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

                const api = new mw.ForeignApi(`https://${edit.wikiDomain}/api.php`, { anonymous: true });
                const parseParams = edit.pageid ? { pageid: edit.pageid } : { page: edit.title };
                
                api.get({ action: 'parse', ...parseParams, prop: 'text|modules|headhtml', useskin: 'fandomdesktop', disabletoc: true, formatversion: 2 }).then(data => {
                    if (data?.parse?.text) {
                        let html = data.parse.text;
                        html = html.replace(/(href|src)="(\/(?!\/).*?)"/g, `$1="https://${edit.wikiDomain}$2"`);

                        let inlineStyles = '';
                        if (data.parse.headhtml) {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = data.parse.headhtml;
                            tempDiv.querySelectorAll('style').forEach(st => {
                                inlineStyles += st.textContent + '\n';
                            });
                        }

                        if (inlineStyles) {
                            const styleNode = document.createElement('style');
                            styleNode.id = 'cwa-remote-inline';
                            styleNode.textContent = inlineStyles;
                            document.body.appendChild(styleNode);
                        }

                        const siteStylesUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.styles&only=styles&skin=fandomdesktop`;
                        const siteScriptsUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.scripts&only=scripts&skin=fandomdesktop`;

                        const linkNode = document.createElement('link');
                        linkNode.id = 'cwa-remote-styles';
                        linkNode.rel = 'stylesheet';
                        linkNode.href = siteStylesUrl;

                        const scriptNode = document.createElement('script');
                        scriptNode.id = 'cwa-remote-scripts';
                        scriptNode.src = siteScriptsUrl;

                        const finishLoading = () => {
                            this.modal.content = `
                                <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                                    <div class="mw-parser-output">
                                        ${html}
                                    </div>
                                </div>
                            `;
                            this.modal.isLoading = false; 

                            this.$nextTick(() => {
                                const modules = [
                                    ...(data.parse.modules || []),
                                    ...(data.parse.modulestyles || [])
                                ];
                                const safeModules = modules.filter(m => m.startsWith('ext.') || m.startsWith('mediawiki.'));
                                if (safeModules.length > 0) {
                                    mw.loader.load(safeModules);
                                }

                                document.body.appendChild(scriptNode);

                                setTimeout(() => {
                                    const contentElement = document.querySelector('.cwa-remote-container .mw-parser-output');
                                    if (contentElement && window.mw && window.mw.hook && window.$) {
                                        window.mw.hook('wikipage.content').fire(window.$(contentElement));
                                    }
                                }, 100);
                            });
                        };

                        linkNode.onload = finishLoading;
                        linkNode.onerror = finishLoading; 
                        document.body.appendChild(linkNode);

                    } else {
                        throw new Error('No content');
                    }
                }).catch(() => {
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
            this.cleanUpRemoteResources();
        }
    };
    const targetContainer = document.querySelector('#cwa-app-container');
    if (targetContainer) { 
        document.body.classList.add('CrossWikiActivity');
        Vue.createMwApp(App).mount(targetContainer); 
    }
})();