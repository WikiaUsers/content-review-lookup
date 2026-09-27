/*
===============================================================================
LOFARIAN ACHIEVEMENTS — CHRONICLE INBOX / «НОВОСТИ ЛЕТОПИСИ»
Standalone add-on v. 5.8 Beta DFC News — 10 достижений участников + исправление изображений ступеней — 24.09.2026
Страница Fandom: MediaWiki:LofarianAchievementsChronicleInbox.js

НАЗНАЧЕНИЕ
Отдельная правая панель «Новостное агентство DFC» поверх существующей рабочей системы
Lofarian Achievements. Файл НЕ заменяет и НЕ переписывает Bootstrap/Core/UI и
может быть отключён простым удалением одной строки importArticles() из Common.js.

ЧТО ДЕЛАЕТ
- гостям показывает постоянное приглашение зарегистрироваться;
- зарегистрированным неучастникам показывает постоянное приглашение вступить;
- участникам хранит и показывает до 20 последних новостей;
- перехватывает локальные события выдачи достижения, не меняя выдачу/очки;
- отмечает публичные новые достижения каталога, не раскрывая hidden/secret;
- автоматически подхватывает новые достижения из основного каталога: список ID нигде
  в этом дополнении не дублируется и не требует ручного обновления Chronicle Inbox;
- в открытой вкладке периодически проверяет ревизии страниц каталога и при их
  изменении перечитывает каталог с сервера;
- хранит новости, значимые изменения места в Зале славы и редкие подсказки;
- при наведении/фокусе/тапе на уведомление о награде снимает «Новое» у этой
  награды в собственном профиле через уже существующий профильный механизм;
- синхронизирует чтение между вкладками и сохраняет компактное состояние в
  user-script preference зарегистрированного участника для переноса между
  устройствами;
- не вмешивается в системный колокольчик/панель уведомлений Fandom.

БЕЗОПАСНОСТЬ / REVIEW
- нет eval/new Function, обфускации, сторонних серверов и удалённого JS;
- нет чтения паролей, email или авторизационных cookie;
- нет изменения встроенной Global Navigation / Notifications / рекламы Fandom;
- официальный прогресс/награды не пишутся этим дополнением;
- localStorage и user-script preference используются только для UI-истории;
- hidden/secret не раскрываются заранее через каталог; после фактического получения награда может появиться в личной ленте;
- раздел «Участники» показывает 10 последних ПУБЛИЧНЫХ достижений других участников, по 5 на странице, и не создаёт уведомлений, непрочитанных событий или звуков; карточка открывает краткую сводку достижения без перехода со страницы.
- в недельной сводке строки достижений и опыта снова открывают краткую карточку достижения; переход в профиль выполняется только отдельной кнопкой внутри карточки.
===============================================================================
*/
(function (root) {
    'use strict';

    if (root.LofarianChronicleInbox && root.LofarianChronicleInbox.__standalone === true) {
        return;
    }

    var BUILD = 'Chronicle Inbox standalone 1.14.7 DFC HARVEST FALLBACK LAST';
    var MAX_VISIBLE_EVENTS = 20;
    var FEED_PAGE_SIZE = 5;

    /*
     * 1.12.0:
     * - до 50 обычных записей;
     * - до 100 избранных записей, которые не вытесняются обычной лентой.
     * Итого state.events может содержать до 150 записей.
     */
    var MAX_RECENT_EVENTS = 50;
    var MAX_FAVORITE_EVENTS = 100;
    var MAX_STORED_EVENTS = MAX_RECENT_EVENTS + MAX_FAVORITE_EVENTS;
    var FRESH_BADGE_MS = 3 * 60 * 1000;
    var WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    var SNOOZE_MS = 7 * 60 * 60 * 1000;
    var DAY_MS = 24 * 60 * 60 * 1000;
    var NEW_MARK_MAX_AGE_MS = 30 * DAY_MS;
    var NEAR_UNLOCK_COOLDOWN_MS = DAY_MS;
    var CATALOG_WATCH_INTERVAL_MS = 5 * 60 * 1000;
    var CATALOG_WATCH_MIN_GAP_MS = 45 * 1000;
    var UPDATES_WATCH_INTERVAL_MS = 2 * 60 * 1000;
    var UPDATES_WATCH_MIN_GAP_MS = 25 * 1000;
    var STATE_OPTION = 'userjs-lofarian-achievements-chronicle-inbox-v1';
    var PARTICIPATION_OPTION = 'userjs-lofarian-achievements-participation';
    var DISABLED_KEY = 'lof-chronicle-inbox-disabled-v1';
    var CATALOG_SNAPSHOT_PREFIX = 'lof-chronicle-inbox-catalog-v2:';
    var UPDATES_SNAPSHOT_PREFIX = 'lof-chronicle-inbox-updates-v1:';
    var LOCAL_STATE_PREFIX = 'lof-chronicle-inbox-state-v2:';
    var VIEWED_PREFIX = 'lof-achievements-profile-viewed-v1:user:';
    var SEEN_PREFIX = 'lof-achievements-seen:user:';
    var PANEL_ID = 'lof-chronicle-inbox-panel';
    var TAB_ID = 'lof-chronicle-inbox-tab';
    var ACHIEVEMENT_SUMMARY_ID = 'lof-ci-achievement-summary-overlay';
    var WEEKLY_SUMMARY_ID = 'lof-ci-weekly-summary-overlay';
    var ACHIEVEMENTS_PAGE = 'Летопись Лофариана Вики:Достижения';
    var UPDATES_PAGE = 'Летопись Лофариана Вики:Обновления';
    var HALL_PAGE = 'Project:Зал славы';

    /*
     * 1.14.0 — read-only раздел «Участники».
     * Никакие его элементы НЕ попадают в state.events, не имеют readAt,
     * не влияют на счётчик непрочитанного и никогда не запускают звук.
     */
    var PARTICIPANT_RECENT_LIMIT = 10;
    var PARTICIPANT_RECENT_CACHE_MS = 2 * 60 * 1000;
    var PARTICIPANT_RECENT_FRESH_MS = 5 * 60 * 1000;

    var runtime = null;
    var catalogCache = null;
    var currentAchievementMap = null;
    var persistTimer = null;
    var renderTimer = null;
    var wrappedPopup = false;
    var mutationFallbackInstalled = false;
    var channel = null;
    var touchStartX = null;
    var isReady = false;
    var catalogWatchTimer = null;
    var catalogWatchBusy = false;
    var catalogRevisionFingerprint = '';
    var catalogLastWatchAt = 0;
    var updatesWatchTimer = null;
    var updatesWatchBusy = false;
    var updatesLastWatchAt = 0;
    var updatesRevisionId = 0;
    var achievementOwnershipWatchTimer = null;
    var achievementOwnershipFingerprint = '';
    var snoozeTimer = null;
    var audioContext = null;
    var lastSoundAt = 0;

    var participantRecentAchievements = [];
    var participantRecentLoadedAt = 0;
    var participantRecentFreshAt = 0;
    var participantRecentLoading = false;
    var participantRecentError = '';
    var participantRecentPromise = null;

    /* Долгие подсказки: тот же принцип, что в общей системе достижений,
       задержка уменьшена до 1,5 секунды. */
    var CONTROL_TIP_DELAY_MS = 1500;
    var controlTipTimer = null;
    var controlTipPendingNode = null;

    var state = {
        schemaVersion: 2,
        updatedAt: 0,
        events: [],
        meta: {
            lastRank: 0,
            bestRank: 0,
            lastCount: 0,
            lastNearAt: 0,
            lastNearId: '',
            lastRankCheckAt: 0,
            catalogBaselineReady: false,
            snoozeUntil: 0
        },
        settings: {
            catalog: true,
            rank: true,
            near: true,
            news: true,
            dnd: false,
            sound: true,
            soundImportantOnly: false,
            soundVolume: 0.35,
            attention: true,
            compact: false,
            weekly: true,
            daily: true,
            hoverRead: true,
            freshBadge: true
        },
        ui: {
            collapsed: true,
            filter: 'all',
            archiveOpen: false,
            sort: 'newest',
            panelHeight: 0,
            page: 1
        }
    };

    function now() {
        return Date.now();
    }

    function unixNow() {
        return Math.floor(Date.now() / 1000);
    }

    function panelFixedTop() {
        return window.innerWidth <= 600 ? 55 : 64;
    }

    function panelHeightBounds() {
        var top = panelFixedTop();
        var bottomGap = window.innerWidth <= 600 ? 9 : 14;
        var max = Math.max(280, window.innerHeight - top - bottomGap);
        var min = Math.min(max, window.innerWidth <= 600 ? 300 : 340);
        return { min: min, max: max, top: top };
    }

    function clampPanelHeight(value) {
        var bounds = panelHeightBounds();
        value = Number(value);
        if (!isFinite(value) || value <= 0) {
            return bounds.max;
        }
        return Math.max(bounds.min, Math.min(bounds.max, value));
    }

    function applyPanelHeight(value, persist) {
        var bounds = panelHeightBounds();
        var raw = Number(value);
        var isAuto = !isFinite(raw) || raw <= 0;
        var height = isAuto ? bounds.max : clampPanelHeight(raw);

        document.documentElement.style.setProperty('--lof-ci-panel-top', String(bounds.top) + 'px');
        document.documentElement.style.setProperty('--lof-ci-panel-height', String(Math.round(height)) + 'px');

        /*
         * panelHeight === 0 означает «занять всю доступную высоту».
         * После первого ручного перетягивания сохраняется конкретная высота.
         */
        if (!isAuto) {
            state.ui.panelHeight = height;
        }

        var handle = document.querySelector('#' + PANEL_ID + ' .lof-ci-resize-handle');
        if (handle) {
            handle.setAttribute('aria-valuemin', String(Math.round(bounds.min)));
            handle.setAttribute('aria-valuemax', String(Math.round(bounds.max)));
            handle.setAttribute('aria-valuenow', String(Math.round(height)));
            handle.setAttribute(
                'aria-valuetext',
                'Высота панели ' + String(Math.round(height)) + ' пикселей'
            );
        }

        if (persist) {
            state.ui.panelHeight = height;
            schedulePersist();
        }
        return height;
    }

    function userId() {
        return Math.max(0, Number(root.mw && mw.config.get('wgUserId')) || 0);
    }

    function userName() {
        return String(root.mw && mw.config.get('wgUserName') || '').trim();
    }

    function isLoggedIn() {
        return userId() > 0 && !!userName();
    }

    function isParticipant() {
        try {
            if (root.LofarianAchievementsParticipation && typeof root.LofarianAchievementsParticipation.isActive === 'function') {
                return root.LofarianAchievementsParticipation.isActive() === true;
            }
            if (root.mw && mw.user && mw.user.options && typeof mw.user.options.get === 'function') {
                return String(mw.user.options.get(PARTICIPATION_OPTION) || '') === '1';
            }
        } catch (error) {}
        return false;
    }

    function localStateKey() {
        return LOCAL_STATE_PREFIX + (isLoggedIn() ? String(userId()) : 'anon');
    }

    function catalogSnapshotKey() {
        return CATALOG_SNAPSHOT_PREFIX + (isLoggedIn() ? String(userId()) : 'anon');
    }

    function updatesSnapshotKey() {
        return UPDATES_SNAPSHOT_PREFIX + (isLoggedIn() ? String(userId()) : 'anon');
    }


    function safeParse(raw, fallback) {
        try {
            var parsed = JSON.parse(String(raw || ''));
            return parsed && typeof parsed === 'object' ? parsed : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function clone(value) {
        return safeParse(JSON.stringify(value), value);
    }

    function normalizeSettings(input) {
        input = input && typeof input === 'object' ? input : {};
        var volume = Number(input.soundVolume);
        if (!isFinite(volume)) { volume = 0.35; }
        volume = Math.max(0.08, Math.min(0.75, volume));
        return {
            catalog: input.catalog !== false,
            rank: input.rank !== false,
            near: input.near !== false,
            news: input.news !== false,
            dnd: input.dnd === true,
            sound: true,
            soundImportantOnly: input.soundImportantOnly === true,
            soundVolume: volume,
            attention: input.attention !== false,
            compact: input.compact === true,
            weekly: input.weekly !== false,
            daily: input.daily !== false,
            hoverRead: input.hoverRead !== false,
            freshBadge: input.freshBadge !== false
        };
    }

    function isObsoleteDebugArtifact(event) {
        if (!event) { return false; }
        var id = String(event.id || '').trim().toLowerCase();
        var subtype = String(event.subtype || '').trim().toLowerCase();
        var title = String(event.title || '').trim().toLowerCase();

        /*
         * Одноразовая совместимость со старыми сборками:
         * удаляем уже сохранённые служебные debug-записи прошлых версий.
         * В том числе жёстко вычищаем legacy-событие «Тест уведомлений»
         * по заголовку, даже если у старой записи нет test-id/subtype.
         * Новых тестовых уведомлений эта версия создавать не умеет.
         */
        return event.preview === true ||
            id.indexOf('preview:') === 0 ||
            id.indexOf('test-notification') === 0 ||
            id.indexOf('test:notification') === 0 ||
            subtype === 'preview' ||
            subtype === 'preview-archive' ||
            subtype === 'test-notification' ||
            title === 'тест уведомлений' ||
            title === 'тест уведомления' ||
            title === 'тестовое уведомление' ||
            title === 'тестовое сообщение' ||
            title === 'test notification' ||
            title === 'test message';
    }

    function isLegacyTestEvent(event) {
        return isObsoleteDebugArtifact(event);
    }

    function isLegacyManualNewsEvent(event) {
        if (!event) { return false; }

        /*
         * Старые ручные новости основной системы импортировались сюда как
         * id "news:<id>", type "news", без subtype "article-update".
         * Официальный источник DFC News теперь — страница «Обновления».
         */
        return event.type === 'news' &&
            String(event.id || '').indexOf('news:') === 0 &&
            event.subtype !== 'article-update';
    }

    function retainStoredEvents(events) {
        var list = Array.isArray(events) ? events.filter(function (event) {
            return !!(event && event.id && event.type);
        }).slice() : [];

        list.sort(function (a, b) {
            return Number(b.createdAt || 0) - Number(a.createdAt || 0);
        });

        var favorites = [];
        var recent = [];

        list.forEach(function (event) {
            if (event.favorite === true) {
                if (favorites.length < MAX_FAVORITE_EVENTS) {
                    favorites.push(event);
                }
                return;
            }
            if (recent.length < MAX_RECENT_EVENTS) {
                recent.push(event);
            }
        });

        return favorites.concat(recent).sort(function (a, b) {
            return Number(b.createdAt || 0) - Number(a.createdAt || 0);
        });
    }

    function favoriteCount() {
        return state.events.reduce(function (count, event) {
            return count + (event && event.favorite === true ? 1 : 0);
        }, 0);
    }

    function notifyUi(message) {
        try {
            if (root.mw && typeof mw.notify === 'function') {
                mw.notify(String(message || ''), { type: 'warn', autoHide: true });
                return;
            }
        } catch (error) {}
        console.log('[Lofarian Chronicle Inbox] ' + String(message || ''));
    }

    function currentUpdatesSnapshot() {
        try {
            return safeParse(localStorage.getItem(updatesSnapshotKey()), null);
        } catch (error) {
            return null;
        }
    }

    function articleUpdateStillExists(event) {
        if (!event || event.subtype !== 'article-update' || !event.sourceKey) {
            return true;
        }
        var snapshot = currentUpdatesSnapshot();
        if (!snapshot || !Array.isArray(snapshot.items)) {
            return true;
        }
        return snapshot.items.some(function (item) {
            return item && String(item.key || '') === String(event.sourceKey || '');
        });
    }

    function normalizeState(input) {
        input = input && typeof input === 'object' ? input : {};
        var normalized = {
            schemaVersion: 2,
            updatedAt: Math.max(0, Number(input.updatedAt) || 0),
            events: Array.isArray(input.events) ? input.events.slice() : [],
            meta: Object.assign({
                lastRank: 0,
                bestRank: 0,
                lastCount: 0,
                lastNearAt: 0,
                lastNearId: '',
                lastRankCheckAt: 0,
                catalogBaselineReady: false,
                snoozeUntil: 0
            }, input.meta && typeof input.meta === 'object' ? input.meta : {}),
            settings: normalizeSettings(input.settings),
            ui: Object.assign({ collapsed: true, filter: 'all', archiveOpen: false, sort: 'newest', panelHeight: 0, page: 1 }, input.ui && typeof input.ui === 'object' ? input.ui : {})
        };
        normalized.settings.sound = true;
        normalized.ui.collapsed = normalized.ui.collapsed !== false;
        normalized.ui.panelHeight = Math.max(0, Number(normalized.ui.panelHeight) || 0);
        /* panelTop из 1.8.0 намеренно не используется: верх панели снова фиксирован. */
        delete normalized.ui.panelTop;
        if (['all', 'awards', 'community', 'chronicle', 'hall', 'updates', 'favorites', 'participants'].indexOf(normalized.ui.filter) === -1) {
            normalized.ui.filter = 'all';
        }
        normalized.ui.page = Math.max(1, Math.floor(Number(normalized.ui.page) || 1));
        normalized.ui.archiveOpen = false;
        /* 1.7.0: пользовательская «сортировка» выполняется рубриками
           Все / Награды / Сообщество / ...; внутри рубрики — всегда новые сверху. */
        normalized.ui.sort = 'newest';
        normalized.events = retainStoredEvents(normalized.events.filter(function (event) {
            return event &&
                event.id &&
                event.type &&
                !isObsoleteDebugArtifact(event) &&
                !isLegacyManualNewsEvent(event) &&
                articleUpdateStillExists(event);
        }));
        return normalized;
    }

    function mergeStates(a, b) {
        a = normalizeState(a);
        b = normalizeState(b);
        var newer = Number(b.updatedAt || 0) > Number(a.updatedAt || 0) ? b : a;
        var older = newer === b ? a : b;
        var byId = Object.create(null);

        older.events.concat(newer.events).forEach(function (event) {
            if (!event || !event.id) { return; }
            var existing = byId[event.id];
            if (!existing) {
                byId[event.id] = clone(event);
                return;
            }
            if (Number(event.readAt || 0) > Number(existing.readAt || 0)) {
                existing.readAt = Number(event.readAt || 0);
            }
            if (Array.isArray(event.items) && event.items.length > (existing.items || []).length) {
                existing.items = clone(event.items);
            }
            if (Number(event.starredAt || 0) > Number(existing.starredAt || 0)) {
                existing.starredAt = Number(event.starredAt || 0);
            }
            if (event.favorite === true) { existing.favorite = true; }
            if (event.favorite === false && Number(event.updatedAt || 0) >= Number(existing.updatedAt || 0)) { existing.favorite = false; }
            if (event.community === true) { existing.community = true; }
        });

        var merged = normalizeState({
            updatedAt: Math.max(Number(a.updatedAt || 0), Number(b.updatedAt || 0)),
            events: Object.keys(byId).map(function (id) { return byId[id]; }),
            meta: Object.assign({}, older.meta, newer.meta),
            settings: Object.assign({}, older.settings, newer.settings),
            ui: Object.assign({}, older.ui, newer.ui)
        });
        return merged;
    }

    function readServerOptionState() {
        if (!isLoggedIn() || !root.mw || !mw.user || !mw.user.options || typeof mw.user.options.get !== 'function') {
            return null;
        }
        var raw = String(mw.user.options.get(STATE_OPTION) || '');
        return raw ? safeParse(raw, null) : null;
    }


    function purgeObsoleteDebugStorage() {
        try {
            var removeKeys = [];
            for (var i = 0; i < localStorage.length; i += 1) {
                var key = String(localStorage.key(i) || '');
                if (
                    key.indexOf('lof-chronicle-inbox-preview') === 0 ||
                    key.indexOf('lof-chronicle-inbox-test-mode') === 0 ||
                    key.indexOf('lof-chronicle-inbox-test') === 0
                ) {
                    removeKeys.push(key);
                }
            }
            removeKeys.forEach(function (key) {
                localStorage.removeItem(key);
            });
        } catch (error) {}
    }

    function loadState() {
        var local = safeParse(root.localStorage && localStorage.getItem(localStateKey()), null);
        var server = readServerOptionState();
        state = mergeStates(local || {}, server || {});
        state.updatedAt = Math.max(state.updatedAt, now());
        purgeObsoleteDebugStorage();
        return state;
    }

    function serializableState() {
        var copy = normalizeState(state);
        copy.events = retainStoredEvents(copy.events.filter(function (event) {
            return !isObsoleteDebugArtifact(event) && !isLegacyManualNewsEvent(event);
        }));
        return copy;
    }

    function saveLocalState() {
        state.updatedAt = now();
        var persisted = serializableState();
        persisted.updatedAt = state.updatedAt;
        try {
            localStorage.setItem(localStateKey(), JSON.stringify(persisted));
        } catch (error) {}
        broadcastState();
    }

    function schedulePersist() {
        saveLocalState();
        if (!isLoggedIn() || !isParticipant()) {
            return;
        }
        if (persistTimer) {
            clearTimeout(persistTimer);
        }
        persistTimer = setTimeout(function () {
            persistTimer = null;
            persistServerState();
        }, 1600);
    }

    function persistServerState() {
        if (!isLoggedIn() || !isParticipant() || !root.mw || typeof mw.Api !== 'function') {
            return Promise.resolve(false);
        }
        var compact = serializableState();
        compact.events = retainStoredEvents(compact.events);
        var json = JSON.stringify(compact);

        /*
         * Серверная user-option остаётся компактной. Сначала убираем из
         * серверной копии самые старые ОБЫЧНЫЕ новости, но избранное
         * максимально сохраняем. Локальная копия при этом остаётся полной.
         */
        if (json.length > 58000) {
            var favoriteEvents = compact.events.filter(function (event) { return event.favorite === true; });
            var normalEvents = compact.events.filter(function (event) { return event.favorite !== true; });

            while (normalEvents.length && JSON.stringify(Object.assign({}, compact, {
                events: favoriteEvents.concat(normalEvents)
            })).length > 58000) {
                normalEvents.pop();
            }

            while (favoriteEvents.length > 1 && JSON.stringify(Object.assign({}, compact, {
                events: favoriteEvents.concat(normalEvents)
            })).length > 58000) {
                favoriteEvents.pop();
            }

            compact.events = favoriteEvents.concat(normalEvents).sort(function (a, b) {
                return Number(b.createdAt || 0) - Number(a.createdAt || 0);
            });
            json = JSON.stringify(compact);
        }
        var api = new mw.Api();
        return api.postWithToken('csrf', {
            action: 'options',
            optionname: STATE_OPTION,
            optionvalue: json,
            format: 'json'
        }).then(function () {
            if (mw.user && mw.user.options && typeof mw.user.options.set === 'function') {
                mw.user.options.set(STATE_OPTION, json);
            }
            return true;
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Не удалось сохранить UI-состояние в user option:', error);
            return false;
        });
    }

    function setupCrossTabSync() {
        try {
            if ('BroadcastChannel' in root) {
                channel = new BroadcastChannel('lof-chronicle-inbox-v2');
                channel.onmessage = function (event) {
                    if (!event || !event.data || event.data.userId !== userId() || !event.data.state) {
                        return;
                    }
                    state = mergeStates(state, event.data.state);
                    scheduleRender();
                };
            }
        } catch (error) {
            channel = null;
        }

        root.addEventListener('storage', function (event) {
            if (event.key !== localStateKey() || !event.newValue) {
                return;
            }
            state = mergeStates(state, safeParse(event.newValue, {}));
            scheduleRender();
        });
    }

    function broadcastState() {
        if (!channel) { return; }
        try {
            channel.postMessage({ userId: userId(), state: state });
        } catch (error) {}
    }

    function hashText(text) {
        text = String(text || '');
        var hash = 2166136261;
        for (var i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        }
        return (hash >>> 0).toString(36);
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function rarityWeight(key) {
        var order = ['common', 'uncommon', 'notable', 'rare', 'special', 'outstanding', 'superior', 'exceptional', 'unique', 'relic', 'legendary', 'mythic'];
        var index = order.indexOf(String(key || '').toLowerCase());
        return index < 0 ? 0 : index + 1;
    }

    function getRarityInfo(catalog, achievement) {
        try {
            if (runtime && runtime.has && runtime.has('getRarityInfo')) {
                return runtime.invoke('getRarityInfo', [catalog, achievement]);
            }
        } catch (error) {}
        var key = String(achievement && achievement.rarity || 'common').toLowerCase();
        var fallbackTitles = {
            relic: 'Реликтовое',
            legendary: 'Легендарное',
            mythic: 'Мифическое'
        };
        return { key: key, title: fallbackTitles[key] || key };
    }

    function achievementTitle(achievement) {
        try {
            if (runtime && runtime.has && runtime.has('getAchievementBaseTitle')) {
                return String(runtime.invoke('getAchievementBaseTitle', [achievement]) || achievement.title || achievement.id || 'Достижение');
            }
        } catch (error) {}
        return String(achievement && (achievement.title || achievement.name || achievement.id) || 'Достижение');
    }

    function achievementTierLabel(achievement) {
        try {
            if (runtime && runtime.has && runtime.has('getAchievementTierLabel')) {
                return String(runtime.invoke('getAchievementTierLabel', [achievement]) || '');
            }
        } catch (error) {}
        return '';
    }

    function achievementDisplayTitle(achievement) {
        var base = achievementTitle(achievement);
        var tier = achievementTierLabel(achievement);
        return tier ? base + ' ' + tier : base;
    }

    function achievementPoints(achievement) {
        try {
            if (runtime && runtime.has && runtime.has('getAchievementPoints')) {
                return Number(runtime.invoke('getAchievementPoints', [achievement]) || 0);
            }
        } catch (error) {}
        return Number(achievement && achievement.points || 0);
    }

    function getSeenEarnedAt(achievementId) {
        try {
            var map = safeParse(localStorage.getItem(SEEN_PREFIX + String(userId())), {});
            return Math.max(0, Number(map[String(achievementId)] || 0));
        } catch (error) {
            return 0;
        }
    }

    function normalizeEarnedStamp(value) {
        var stamp = Math.max(0, Number(value || 0));
        if (stamp > 1000000000000) { stamp = Math.floor(stamp / 1000); }
        return Math.floor(stamp);
    }

    function readCurrentSeenOwnershipMap() {
        if (!isLoggedIn()) { return null; }
        try {
            var raw = localStorage.getItem(SEEN_PREFIX + String(userId()));
            if (raw === null) { return null; }
            var parsed = safeParse(raw, null);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) { return null; }
            return parsed;
        } catch (error) { return null; }
    }

    function earnedItemStillOwned(item, ownershipMap) {
        if (!item || !item.id || !ownershipMap) { return false; }
        var currentAt = normalizeEarnedStamp(ownershipMap[String(item.id)] || 0);
        if (!currentAt) { return false; }
        var newsAt = normalizeEarnedStamp(item.earnedAt || 0);
        return !newsAt || currentAt === newsAt;
    }

    function refreshGroupedEarnedEvent(event, items) {
        if (!event || !Array.isArray(items) || !items.length) { return; }
        if (items.length === 1) {
            var only = items[0];
            var achievement = catalogCache && catalogCache.achievements ? catalogCache.achievements[String(only.id || '')] : null;
            event.items = null;
            event.achievementId = String(only.id || '');
            event.earnedAt = Number(only.earnedAt || 0);
            event.id = 'earned:' + event.achievementId + ':' + String(event.earnedAt || 0);
            event.title = String(only.title || (achievement ? achievementDisplayTitle(achievement) : '') || event.achievementId);
            event.description = String(achievement && achievement.description ? achievement.description : 'Новая награда заняла своё место в вашей коллекции.');
            event.rarity = String(only.rarity || event.rarity || 'common');
            event.points = Number(only.points || 0);
            event.secret = only.secret === true;
            event.hidden = only.hidden === true;
            event.createdAt = normalizeEarnedStamp(event.earnedAt) * 1000 || Number(event.createdAt || now());
            event.updatedAt = now();
            return;
        }
        event.items = items;
        event.achievementId = '';
        event.earnedAt = 0;
        event.id = 'earned-group:' + hashText(items.map(function (item) { return String(item.id || '') + ':' + String(item.earnedAt || 0); }).join('|'));
        event.title = 'Получено ' + String(items.length) + (items.length >= 5 ? ' достижений' : ' достижения');
        event.description = items.slice(0,4).map(function (item) { return String(item.title || item.id || ''); }).join(' · ');
        event.rarity = highestRarity(items);
        event.points = items.reduce(function (sum,item) { return sum + Number(item.points || 0); }, 0);
        event.secret = items.some(function (item) { return item.secret === true; });
        event.hidden = items.some(function (item) { return item.hidden === true; });
        var newestAt = items.reduce(function (best,item) { return Math.max(best, normalizeEarnedStamp(item.earnedAt || 0)); }, 0);
        if (newestAt) { event.createdAt = newestAt * 1000; }
        event.updatedAt = now();
    }

    function reconcileEarnedNewsWithOwnership(ownershipMap) {
        if (!ownershipMap || typeof ownershipMap !== 'object') { return false; }
        var changed = false;
        var nextEvents = [];
        state.events.forEach(function (event) {
            if (!event || event.type !== 'achievement-earned') { nextEvents.push(event); return; }
            if (Array.isArray(event.items) && event.items.length) {
                var keptItems = event.items.filter(function (item) { return earnedItemStillOwned(item, ownershipMap); });
                if (!keptItems.length) { changed = true; return; }
                if (keptItems.length !== event.items.length) { refreshGroupedEarnedEvent(event, keptItems); changed = true; }
                nextEvents.push(event); return;
            }
            if (!earnedItemStillOwned({id:event.achievementId, earnedAt:event.earnedAt}, ownershipMap)) { changed = true; return; }
            nextEvents.push(event);
        });
        if (!changed) { return false; }
        state.events = retainStoredEvents(nextEvents);
        currentAchievementMap = ownershipMap;
        schedulePersist();
        scheduleRender();
        var summary = document.getElementById(ACHIEVEMENT_SUMMARY_ID);
        if (summary) {
            var dialog = summary.querySelector('.lof-ci-ach-summary');
            var summaryId = dialog ? String(dialog.getAttribute('data-achievement-id') || '') : '';
            if (summaryId && !normalizeEarnedStamp(ownershipMap[summaryId] || 0)) { removeAchievementSummary(); }
        }
        return true;
    }

    function checkAchievementOwnershipNews() {
        var ownershipMap = readCurrentSeenOwnershipMap();
        if (!ownershipMap) { return false; }
        var fingerprint;
        try {
            fingerprint = JSON.stringify(Object.keys(ownershipMap).sort().map(function (id) { return [id, normalizeEarnedStamp(ownershipMap[id])]; }));
        } catch (error) { fingerprint = String(now()); }
        if (fingerprint === achievementOwnershipFingerprint) { return false; }
        achievementOwnershipFingerprint = fingerprint;
        currentAchievementMap = ownershipMap;
        return reconcileEarnedNewsWithOwnership(ownershipMap);
    }

    function startAchievementOwnershipWatch() {
        if (achievementOwnershipWatchTimer || !isParticipant()) { return; }
        checkAchievementOwnershipNews();
        achievementOwnershipWatchTimer = window.setInterval(function () {
            if (!document.hidden) { checkAchievementOwnershipNews(); }
        }, 1000);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) { checkAchievementOwnershipNews(); }
        });
        window.addEventListener('storage', function (event) {
            if (event && event.key === SEEN_PREFIX + String(userId())) {
                achievementOwnershipFingerprint = '';
                checkAchievementOwnershipNews();
            }
        });
    }

    function eventExists(id) {
        return state.events.some(function (event) { return event.id === id; });
    }

    function highestRarity(items) {
        var best = 'common';
        (items || []).forEach(function (item) {
            if (rarityWeight(item.rarity) > rarityWeight(best)) {
                best = item.rarity;
            }
        });
        return best;
    }

    function textLooksCommunity(value) {
        return /(?:discussion|community|comment|reply|like|голос|сообществ|бесед|разговор|обсужден|поддержк|одобрен|ответ|коммент|лайк|награ(?:д|жд))/i.test(String(value || ''));
    }

    function isCommunityAchievement(achievement) {
        if (!achievement) { return false; }
        var parts = [
            achievement.id, achievement.title, achievement.name, achievement.category,
            achievement.group, achievement.family, achievement.section, achievement.metric,
            achievement.description
        ];
        if (Array.isArray(achievement.tags)) { parts = parts.concat(achievement.tags); }
        return textLooksCommunity(parts.join(' '));
    }

    function eventIsCommunity(event) {
        if (!event) { return false; }
        if (event.community === true || String(event.category || '') === 'community') { return true; }
        if (event.type === 'achievement-earned' || event.type === 'catalog' || event.type === 'near-unlock') {
            if (event.achievementId && catalogCache && catalogCache.achievements && catalogCache.achievements[event.achievementId]) {
                return isCommunityAchievement(catalogCache.achievements[event.achievementId]);
            }
            if (Array.isArray(event.items) && event.items.some(function (item) { return item && item.community === true; })) { return true; }
        }
        return textLooksCommunity(String(event.title || '') + ' ' + String(event.description || ''));
    }

    function toggleFavorite(event) {
        if (!event) { return false; }

        if (event.favorite !== true && favoriteCount() >= MAX_FAVORITE_EVENTS) {
            notifyUi('Лимит избранного — 100 новостей. Уберите одну ★, чтобы сохранить новую.');
            return false;
        }

        event.favorite = event.favorite !== true;
        event.starredAt = event.favorite ? now() : 0;
        event.updatedAt = now();

        state.events = retainStoredEvents(state.events);

        schedulePersist();
        scheduleRender();
        return event.favorite;
    }

    function ensureAudioContext() {
        var AudioCtor = root.AudioContext || root.webkitAudioContext;
        if (!AudioCtor) { return null; }
        try {
            if (!audioContext) { audioContext = new AudioCtor(); }
            if (audioContext.state === 'suspended') {
                var resumed = audioContext.resume();
                if (resumed && typeof resumed.catch === 'function') { resumed.catch(function () {}); }
            }
            return audioContext;
        } catch (error) {
            return null;
        }
    }

    function notificationSoundAllowed(event, force) {
        if (!force && state.settings.dnd) { return false; }
        if (!force && state.settings.soundImportantOnly) {
            var priority = eventPriority(event || {});
            var rare = rarityWeight(event && event.rarity) >= rarityWeight('relic');
            if (priority === 'normal' && !rare && !(event && event.type === 'rank')) { return false; }
        }
        return true;
    }

    function playNotificationSound(event, force) {
        if (!notificationSoundAllowed(event, force === true)) { return false; }
        var stamp = now();
        if (!force && stamp - lastSoundAt < 1800) { return false; }
        var ctx = ensureAudioContext();
        if (!ctx || ctx.state !== 'running') { return false; }
        lastSoundAt = stamp;
        /*
         * 1.9.1 — slightly richer DFC chime.
         * Still soft and "vanilla", but with a more pleasant layered tone.
         */
        var volumeSetting = Number(state.settings.soundVolume);
        if (!isFinite(volumeSetting)) { volumeSetting = 0.35; }
        var volume = Math.max(0.02, Math.min(0.115, volumeSetting * 0.155));
        var priority = eventPriority(event || {});
        var rareWeight = rarityWeight(event && event.rarity);
        var tones = (priority === 'urgent' || rareWeight >= rarityWeight('legendary'))
            ? [659.25, 830.61, 987.77]
            : [587.33, 739.99, 880.00];
        var start = ctx.currentTime + 0.015;

        function playTone(freq, at, peak, duration) {
            var oscA = ctx.createOscillator();
            var oscB = ctx.createOscillator();
            var gain = ctx.createGain();

            oscA.type = 'triangle';
            oscB.type = 'sine';

            oscA.frequency.setValueAtTime(freq, at);
            oscB.frequency.setValueAtTime(freq * 2, at);

            gain.gain.setValueAtTime(0.0001, at);
            gain.gain.exponentialRampToValueAtTime(peak, at + 0.026);
            gain.gain.exponentialRampToValueAtTime(peak * 0.56, at + 0.085);
            gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

            oscA.connect(gain);
            oscB.connect(gain);
            gain.connect(ctx.destination);

            oscA.start(at);
            oscB.start(at);
            oscA.stop(at + duration + 0.02);
            oscB.stop(at + duration + 0.02);
        }

        try {
            tones.forEach(function (freq, index) {
                playTone(
                    freq,
                    start + index * 0.11,
                    volume * (index === 0 ? 1 : index === 1 ? 0.88 : 0.72),
                    index === 2 ? 0.34 : 0.28
                );
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    function addEvent(event, options) {
        if (isDisabled()) { return false; }
        options = options || {};
        if (!event || !event.id || !event.type || eventExists(event.id)) {
            return false;
        }
        event.createdAt = Math.max(1, Number(event.createdAt) || now());
        event.readAt = Math.max(0, Number(event.readAt) || 0);
        event.rarity = String(event.rarity || 'common');
        event.favorite = event.favorite === true;
        event.starredAt = Math.max(0, Number(event.starredAt) || 0);
        event.updatedAt = Math.max(Number(event.updatedAt || 0), event.createdAt);

        if (options.mergeEarned && event.type === 'achievement-earned') {
            var recent = state.events[0];
            if (recent && recent.type === 'achievement-earned' && !recent.readAt && event.createdAt - Number(recent.createdAt || 0) <= 60000) {
                var items = Array.isArray(recent.items) ? recent.items.slice() : [];
                if (!items.length && recent.achievementId) {
                    items.push({
                        id: recent.achievementId,
                        title: recent.title,
                        earnedAt: recent.earnedAt,
                        rarity: recent.rarity,
                        points: recent.points,
                        secret: recent.secret === true,
                        hidden: recent.hidden === true
                    });
                }
                if (!items.some(function (item) { return item.id === event.achievementId; })) {
                    items.push({
                        id: event.achievementId,
                        title: event.title,
                        earnedAt: event.earnedAt,
                        rarity: event.rarity,
                        points: event.points,
                        secret: event.secret === true,
                        hidden: event.hidden === true
                    });
                }
                recent.items = items;
                recent.achievementId = '';
                recent.id = 'earned-group:' + hashText(items.map(function (item) { return item.id + ':' + item.earnedAt; }).join('|'));
                recent.title = 'Получено ' + String(items.length) + ' достижения';
                if (items.length >= 5) {
                    recent.title = 'Получено ' + String(items.length) + ' достижений';
                }
                recent.description = items.slice(0, 4).map(function (item) { return item.title; }).join(' · ');
                recent.rarity = highestRarity(items);
                recent.points = items.reduce(function (sum, item) { return sum + Number(item.points || 0); }, 0);
                recent.createdAt = event.createdAt;
                state.events.sort(function (a, b) { return Number(b.createdAt || 0) - Number(a.createdAt || 0); });
                schedulePersist();
                scheduleRender();
                pulseTab();
                playNotificationSound(event, false);
                return true;
            }
        }

        state.events.unshift(event);
        state.events = retainStoredEvents(state.events);
        schedulePersist();
        scheduleRender();
        pulseTab();
        playNotificationSound(event, false);
        return true;
    }

    function markProfileAchievementViewed(achievementId, earnedAt) {
        achievementId = String(achievementId || '');
        if (!achievementId || !isLoggedIn()) { return; }

        try {
            if (runtime && runtime.has && runtime.has('markProfileAchievementViewed')) {
                runtime.invoke('markProfileAchievementViewed', [userId(), achievementId, Number(earnedAt || 0)]);
                return;
            }
        } catch (error) {}

        var key = VIEWED_PREFIX + String(userId());
        var rawViewed = null;
        try { rawViewed = localStorage.getItem(key); } catch (error) {}
        var viewed = rawViewed ? safeParse(rawViewed, null) : null;

        /*
         * Важно: если собственный профиль ещё ни разу не открывался после
         * появления системы маркеров «Новое», не создаём частичный viewed-map.
         * Иначе Profile.js посчитал бы всю старую коллекцию новой.
         */
        if (!viewed || typeof viewed !== 'object' || Array.isArray(viewed)) {
            viewed = {};
            var baseline = currentAchievementMap;
            if (!baseline || typeof baseline !== 'object') {
                try { baseline = safeParse(localStorage.getItem(SEEN_PREFIX + String(userId())), {}); } catch (error) { baseline = {}; }
            }
            Object.keys(baseline || {}).forEach(function (id) {
                viewed[id] = Math.max(1, Number(baseline[id] || 0) || 1);
            });
        }

        viewed[achievementId] = Math.max(1, Number(earnedAt || 0) || unixNow());
        try { localStorage.setItem(key, JSON.stringify(viewed)); } catch (error) {}

        document.querySelectorAll('[data-lof-achievement-id="' + achievementId.replace(/"/g, '\\"') + '"]').forEach(function (node) {
            node.classList.remove('is-new-achievement');
            node.querySelectorAll('.lof-profile-rail-new-mark,.lof-profile-achievement-new-mark').forEach(function (mark) {
                mark.remove();
            });
        });
    }

    function markEventRead(event, fromReadAll) {
        if (!event || event.readAt) { return; }
        event.readAt = now();

        if (event.type === 'achievement-earned') {
            if (Array.isArray(event.items) && event.items.length) {
                event.items.forEach(function (item) {
                    markProfileAchievementViewed(item.id, item.earnedAt);
                });
            } else if (event.achievementId) {
                markProfileAchievementViewed(event.achievementId, event.earnedAt);
            }
        }

        schedulePersist();
        if (!fromReadAll) {
            scheduleRender();
        }
    }

    function markAllRead() {
        state.events.forEach(function (event) {
            markEventRead(event, true);
        });
        schedulePersist();
        scheduleRender();
    }

    function openFeedFilter(filterKey) {
        /*
         * Если DFC уже открыт, rail Fandom уже закрыт и повторно его трогать нельзя:
         * нам важно сохранить факт, что он был открыт ДО запуска DFC.
         */
        if (state.ui.collapsed !== false) {
            closeFandomOverlaysRobust();
        } else {
            closeFandomOverlays();
        }
        resetSettingsView();
        state.ui.collapsed = false;
        state.ui.filter = String(filterKey || 'all');
        state.ui.archiveOpen = false;
        state.ui.page = 1;
        schedulePersist();
        scheduleRender();
        if (state.ui.filter === 'participants') {
            refreshRecentParticipantAchievements();
        }
        window.setTimeout(function () {
            var panel = document.getElementById(PANEL_ID);
            var body = panel && panel.querySelector('.lof-ci-scroll');
            if (body) {
                body.scrollTop = 0;
            }
        }, 24);
    }

    function unreadCount() {
        return state.events.reduce(function (count, event) {
            return count + (event.readAt ? 0 : 1);
        }, 0);
    }

    function achievementLink(id) {
        if (!isLoggedIn()) {
            return mw.util.getUrl(ACHIEVEMENTS_PAGE);
        }
        return mw.util.getUrl('User:' + userName(), {
            lofAchievements: 1,
            lofAchievement: id || ''
        });
    }

    function catalogAchievementLink(id) {
        return mw.util.getUrl(ACHIEVEMENTS_PAGE, {
            lofAchievement: id || ''
        });
    }

    function hallUserAnchorId(name) {
        return 'lof-hall-user-' + hashText(normalizedHallUser(name || 'unknown'));
    }

    function hallLink(name) {
        var target = String(name || userName() || '').trim();
        if (!target) { return mw.util.getUrl(HALL_PAGE); }
        return mw.util.getUrl(HALL_PAGE, {
            lofHallUser: target
        }) + '#' + hallUserAnchorId(target);
    }

    function participantAchievementLink(name, achievementId) {
        var target = String(name || '').trim();
        if (!target) { return mw.util.getUrl(ACHIEVEMENTS_PAGE); }
        return mw.util.getUrl('User:' + target, {
            lofAchievements: 1,
            lofAchievement: String(achievementId || '')
        });
    }

    function normalizeParticipantEarnedAt(value) {
        var stamp = Number(value || 0);
        if (!Number.isFinite(stamp) || stamp <= 0) { return 0; }
        /* achievementMap хранит Unix-секунды; терпимо принимаем миллисекунды. */
        if (stamp > 1000000000000) { stamp = Math.floor(stamp / 1000); }
        return Math.max(0, Math.floor(stamp));
    }

    function buildRecentParticipantAchievements(rows) {
        var ownId = Number(userId() || 0);
        var list = [];

        (Array.isArray(rows) ? rows : []).forEach(function (row) {
            if (!row || Number(row.userId || 0) === ownId) { return; }

            var name = String(row.name || '').trim();
            var map = row.achievementMap && typeof row.achievementMap === 'object'
                ? row.achievementMap
                : {};

            Object.keys(map).forEach(function (achievementId) {
                var earnedAt = normalizeParticipantEarnedAt(map[achievementId]);
                if (!earnedAt) { return; }

                var achievement = catalogCache && catalogCache.achievements
                    ? catalogCache.achievements[String(achievementId)]
                    : null;

                /*
                 * Скрытые/секретные награды других людей в публичной ленте
                 * никогда не раскрываем — даже если они уже кем-то получены.
                 */
                if (!achievement || achievement.hidden === true || achievement.secret === true) {
                    return;
                }

                var rarity = getRarityInfo(catalogCache, achievement);
                list.push({
                    userId: Number(row.userId || 0),
                    name: name,
                    achievementId: String(achievementId),
                    title: achievementDisplayTitle(achievement),
                    description: String(achievement.description || ''),
                    rarity: String(rarity && rarity.key || achievement.rarity || 'common'),
                    rarityTitle: String(rarity && rarity.title || ''),
                    points: achievementPoints(achievement),
                    image: String(achievement.image || ''),
                    earnedAt: earnedAt
                });
            });
        });

        list.sort(function (a, b) {
            var byTime = Number(b.earnedAt || 0) - Number(a.earnedAt || 0);
            if (byTime) { return byTime; }
            var byUser = String(a.name || '').localeCompare(String(b.name || ''), 'ru');
            if (byUser) { return byUser; }
            return String(a.title || '').localeCompare(String(b.title || ''), 'ru');
        });

        return list.slice(0, PARTICIPANT_RECENT_LIMIT);
    }

    function requestRecentParticipantAchievements(forceReload) {
        var stamp = now();
        var cacheFresh = participantRecentLoadedAt > 0 &&
            stamp - participantRecentLoadedAt < PARTICIPANT_RECENT_CACHE_MS;

        if (!forceReload && cacheFresh && participantRecentAchievements.length) {
            return Promise.resolve(participantRecentAchievements.slice());
        }
        if (participantRecentPromise) {
            return participantRecentPromise;
        }
        if (!runtime || typeof runtime.ensureFeature !== 'function' || !catalogCache) {
            return Promise.reject(new Error('Система достижений ещё не готова.'));
        }

        participantRecentLoading = true;
        participantRecentError = '';
        scheduleRender();

        participantRecentPromise = runtime.ensureFeature('leaderboard').then(function () {
            if (!runtime.has('getLeaderboardRowsCached')) {
                throw new Error('Модуль Зала славы не предоставляет список участников.');
            }
            return runtime.invoke('getLeaderboardRowsCached', [catalogCache, forceReload === true]);
        }).then(function (rows) {
            participantRecentAchievements = buildRecentParticipantAchievements(rows);
            participantRecentLoadedAt = now();
            if (forceReload === true) {
                participantRecentFreshAt = participantRecentLoadedAt;
            }
            participantRecentLoading = false;
            participantRecentError = '';
            participantRecentPromise = null;
            scheduleRender();
            return participantRecentAchievements.slice();
        }, function (error) {
            participantRecentLoading = false;
            participantRecentError = error && error.message
                ? String(error.message)
                : 'Не удалось получить последние достижения участников.';
            participantRecentPromise = null;
            scheduleRender();
            throw error;
        });

        return participantRecentPromise;
    }

    function refreshRecentParticipantAchievements() {
        /*
         * Сначала быстро показываем уже имеющийся leaderboard-кэш, затем не чаще
         * одного раза в 5 минут просим свежую серверную пересборку. Всё это
         * происходит ТОЛЬКО когда пользователь сам открыл раздел «Участники».
         */
        return requestRecentParticipantAchievements(false).then(function (items) {
            if (!participantRecentFreshAt || now() - participantRecentFreshAt >= PARTICIPANT_RECENT_FRESH_MS) {
                requestRecentParticipantAchievements(true).catch(function (error) {
                    console.warn('[Lofarian Chronicle Inbox] Свежая лента участников пока недоступна:', error);
                });
            }
            return items;
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Лента участников недоступна:', error);
            return [];
        });
    }

    function formatParticipantAchievementTime(unixTime) {
        unixTime = normalizeParticipantEarnedAt(unixTime);
        if (!unixTime) { return 'дата не указана'; }
        var date = new Date(unixTime * 1000);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        }) + ' · ' + date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function openParticipantAchievementSummary(item) {
        if (!item) { return; }

        /*
         * Та же краткая сводка, которую Chronicle Inbox уже показывает
         * для полученного достижения пользователя. Никакого перехода при
         * клике по строке: переносы текста разрешены уже ВНУТРИ сводки.
         */
        openEarnedAchievementSummary({
            id: 'participant-earned:' + String(item.userId || '') + ':' +
                String(item.achievementId || '') + ':' + String(item.earnedAt || ''),
            type: 'achievement-earned',
            achievementId: String(item.achievementId || ''),
            earnedAt: Number(item.earnedAt || 0),
            title: String(item.title || item.achievementId || 'Достижение'),
            description: String(item.description || ''),
            rarity: String(item.rarity || 'common'),
            rarityTitle: String(item.rarityTitle || ''),
            points: Number(item.points || 0),
            image: String(item.image || ''),
            createdAt: normalizeParticipantEarnedAt(item.earnedAt) * 1000,
            readAt: 1
        }, {
            profileName: String(item.name || '')
        });
    }

    function renderParticipantAchievementCard(item) {
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'lof-ci-participant-card';
        card.setAttribute('data-rarity', String(item.rarity || 'common'));
        card.setAttribute('data-lof-tip-title', 'Краткая сводка');
        card.setAttribute('data-lof-tip', 'Открыть краткую сводку достижения без перехода со страницы.');
        card.setAttribute('aria-label', String(item.name || 'Участник') + ': ' + String(item.title || item.achievementId || 'Достижение'));

        card.innerHTML =
            '<div class="lof-ci-participant-icon" data-rarity="' + escapeHtml(item.rarity || 'common') + '">' +
                '<span class="lof-ci-participant-icon-fallback" aria-hidden="true">◆</span>' +
                '<img alt="">' +
            '</div>' +
            '<div class="lof-ci-participant-copy">' +
                '<div class="lof-ci-participant-user">' + escapeHtml(item.name || 'Участник') + '</div>' +
                '<div class="lof-ci-participant-title" title="' + escapeHtml(item.title || item.achievementId || 'Достижение') + '">' +
                    escapeHtml(item.title || item.achievementId || 'Достижение') +
                '</div>' +
                '<div class="lof-ci-participant-meta">' +
                    (item.rarityTitle ? '<strong>' + escapeHtml(item.rarityTitle) + '</strong>' : '') +
                    (Number(item.points || 0) > 0 ? '<span>+' + escapeHtml(String(item.points)) + ' опыта</span>' : '') +
                    '<span>' + escapeHtml(formatParticipantAchievementTime(item.earnedAt)) + '</span>' +
                '</div>' +
            '</div>' +
            '<span class="lof-ci-participant-open" aria-hidden="true">›</span>';

        card.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            openParticipantAchievementSummary(item);
        });

        var image = card.querySelector('img');
        var fallback = card.querySelector('.lof-ci-participant-icon-fallback');
        if (image) {
            resolveAchievementDisplayImageUrl(
                item.achievementId,
                item.image,
                item.title
            ).then(function (url) {
                if (!url || !document.documentElement.contains(card)) { return; }
                image.onload = function () {
                    image.classList.add('is-ready');
                    if (fallback) { fallback.style.display = 'none'; }
                };
                image.onerror = function () {
                    image.classList.remove('is-ready');
                    if (fallback) { fallback.style.display = ''; }
                };
                image.src = url;
                if (image.complete && image.naturalWidth > 0) {
                    image.classList.add('is-ready');
                    if (fallback) { fallback.style.display = 'none'; }
                }
            });
        }
        return card;
    }

    function renderParticipantRecentFeed(panel, body) {
        var weekly = panel.querySelector('.lof-ci-weekly');
        var daily = panel.querySelector('.lof-ci-daily');
        var headline = panel.querySelector('.lof-ci-headline');
        var pager = panel.querySelector('.lof-ci-pagination');
        var archive = panel.querySelector('.lof-ci-archive-toggle');

        if (weekly) { weekly.innerHTML = ''; weekly.style.display = 'none'; }
        if (daily) { daily.innerHTML = ''; daily.style.display = 'none'; }
        if (headline) { headline.innerHTML = ''; headline.style.display = 'none'; }
        if (pager) { pager.hidden = true; pager.innerHTML = ''; }
        if (archive) { archive.style.display = 'none'; }

        body.innerHTML = '';

        var header = document.createElement('div');
        header.className = 'lof-ci-participant-head';
        header.innerHTML =
            '<div><div class="lof-ci-participant-kicker">Живая лента сообщества</div>' +
            '<strong>Последние достижения участников</strong>' +
            '<span>10 последних публичных наград других участников. По 5 на странице. Этот раздел не создаёт уведомлений.</span></div>' +
            '<button type="button" class="lof-ci-participant-refresh" aria-label="Обновить последние достижения">Обновить</button>';
        body.appendChild(header);

        var refresh = header.querySelector('.lof-ci-participant-refresh');
        if (refresh) {
            refresh.disabled = participantRecentLoading === true;
            refresh.addEventListener('click', function (event) {
                event.preventDefault();
                participantRecentFreshAt = 0;
                requestRecentParticipantAchievements(true).catch(function () {});
            });
        }

        if (participantRecentLoading && !participantRecentAchievements.length) {
            var loading = document.createElement('div');
            loading.className = 'lof-ci-participant-state';
            loading.innerHTML = '<span class="lof-ci-participant-spinner" aria-hidden="true">✦</span><strong>Собираем последние награды…</strong><span>Проверяем актуальные данные участников.</span>';
            body.appendChild(loading);
            return;
        }

        if (participantRecentError && !participantRecentAchievements.length) {
            var error = document.createElement('div');
            error.className = 'lof-ci-participant-state is-error';
            error.innerHTML = '<strong>Лента участников временно недоступна</strong><span>' + escapeHtml(participantRecentError) + '</span>';
            body.appendChild(error);
            return;
        }

        if (!participantRecentAchievements.length) {
            var empty = document.createElement('div');
            empty.className = 'lof-ci-participant-state';
            empty.innerHTML = '<strong>Пока нет публичных наград</strong><span>Когда другие участники получат новые открытые достижения, они появятся здесь.</span>';
            body.appendChild(empty);
            return;
        }

        var totalItems = Math.min(PARTICIPANT_RECENT_LIMIT, participantRecentAchievements.length);
        var pageCount = Math.max(1, Math.ceil(totalItems / FEED_PAGE_SIZE));
        var currentPage = Math.max(1, Math.min(pageCount, Math.floor(Number(state.ui.page) || 1)));
        state.ui.page = currentPage;

        var startIndex = (currentPage - 1) * FEED_PAGE_SIZE;
        var shown = participantRecentAchievements
            .slice(0, PARTICIPANT_RECENT_LIMIT)
            .slice(startIndex, startIndex + FEED_PAGE_SIZE);

        var list = document.createElement('div');
        list.className = 'lof-ci-participant-list';
        shown.forEach(function (item) {
            list.appendChild(renderParticipantAchievementCard(item));
        });
        body.appendChild(list);

        renderPagination(panel, totalItems);
        bindControlTips(body);
    }

    function eventLink(event) {
        if (!event) { return '#'; }
        if (event.href) { return event.href; }

        /*
         * Полученная награда / near-unlock -> собственный профиль.
         * Новое публичное достижение каталога -> общая страница достижений.
         */
        if (event.type === 'achievement-earned' || event.type === 'near-unlock') {
            var profileId = event.achievementId || (event.items && event.items[0] && event.items[0].id) || '';
            return profileId ? achievementLink(profileId) : achievementLink('');
        }

        if (event.type === 'catalog') {
            var catalogId = event.achievementId || (event.items && event.items[0] && event.items[0].id) || '';
            return catalogId ? catalogAchievementLink(catalogId) : mw.util.getUrl(ACHIEVEMENTS_PAGE);
        }

        if (event.type === 'rank') {
            return hallLink(userName());
        }
        return mw.util.getUrl(ACHIEVEMENTS_PAGE);
    }

    function recordAchievementEarned(catalog, achievement, retryCount) {
        if (!isParticipant() || !achievement || !achievement.id) { return false; }

        /*
         * 1.13.2:
         * hidden/secret по-прежнему НЕЛЬЗЯ раскрывать заранее как новое
         * достижение каталога. Но когда награда уже реально получена,
         * пользователь имеет право увидеть её в своей личной ленте.
         *
         * Поэтому здесь больше нет запрета по hidden/secret. Защита от
         * преждевременного раскрытия остаётся в publicCatalogSnapshot()
         * и в фильтре catalog/near-unlock.
         */
        /*
         * 1.13.4 — время берём ТОЛЬКО из свежего seen-map Core.
         *
         * Раньше здесь был fallback на currentAchievementMap. После revoke()
         * этот объект мог ещё держать старый earnedAt, поэтому новое получение
         * снова попадало в ленту со старым временем (например, всё время 21:38).
         *
         * Core при обычной автоматической выдаче записывает seen-map ДО popup,
         * а при admin.grant() — сразу ПОСЛЕ popup. Поэтому для admin.grant()
         * просто коротко ждём появления свежего значения и не используем
         * старый кэш вообще.
         */
        var earnedAt = getSeenEarnedAt(achievement.id);

        if (!earnedAt) {
            retryCount = Math.max(0, Number(retryCount || 0));
            if (retryCount < 12) {
                window.setTimeout(function () {
                    recordAchievementEarned(catalog, achievement, retryCount + 1);
                }, 90 + retryCount * 70);
            }
            return false;
        }

        var rarity = getRarityInfo(catalog, achievement);
        var event = {
            id: 'earned:' + String(achievement.id) + ':' + String(earnedAt),
            type: 'achievement-earned',
            achievementId: String(achievement.id),
            earnedAt: earnedAt,
            title: achievementDisplayTitle(achievement),
            description: String(achievement.description || 'Новая награда заняла своё место в вашей коллекции.'),
            rarity: String(rarity.key || 'common'),
            rarityTitle: String(rarity.title || ''),
            points: achievementPoints(achievement),
            image: String(achievement.image || ''),
            secret: achievement.secret === true,
            hidden: achievement.hidden === true,
            community: isCommunityAchievement(achievement),
            createdAt: earnedAt > 1000000000 ? earnedAt * 1000 : now(),
            readAt: 0
        };
        return addEvent(event, { mergeEarned: true });
    }

    function wrapAchievementPopupWhenReady() {
        if (wrappedPopup) { return; }
        var attempts = 0;
        var timer = setInterval(function () {
            attempts += 1;
            runtime = root.__LofarianAchievementsInternal || runtime;
            if (!runtime || !runtime.functions || typeof runtime.functions.showAchievementPopup !== 'function') {
                if (attempts > 240) { clearInterval(timer); }
                return;
            }
            var original = runtime.functions.showAchievementPopup;
            if (original.__chronicleInboxWrapped) {
                wrappedPopup = true;
                clearInterval(timer);
                return;
            }
            function wrapped(catalog, achievement) {
                var result = original.apply(this, arguments);
                try { recordAchievementEarned(catalog, achievement); } catch (error) {
                    console.warn('[Lofarian Chronicle Inbox] Ошибка записи награды:', error);
                }
                return result;
            }
            wrapped.__chronicleInboxWrapped = true;
            wrapped.__chronicleInboxOriginal = original;
            runtime.functions.showAchievementPopup = wrapped;
            wrappedPopup = true;
            clearInterval(timer);
        }, 100);
    }

    function installPopupMutationFallback() {
        if (mutationFallbackInstalled || !root.MutationObserver) { return; }
        mutationFallbackInstalled = true;
        var observer = new MutationObserver(function (records) {
            if (!isParticipant() || !catalogCache) { return; }
            records.forEach(function (record) {
                Array.prototype.forEach.call(record.addedNodes || [], function (node) {
                    if (!node || node.nodeType !== 1) { return; }
                    var popup = node.matches && node.matches('.lof-achievement-popup') ? node : node.querySelector && node.querySelector('.lof-achievement-popup');
                    if (!popup || popup.classList.contains('lof-achievement-news-popup')) { return; }
                    var titleNode = popup.querySelector('.lof-achievement-title');
                    var title = titleNode ? String(titleNode.textContent || '').trim() : '';
                    if (!title) { return; }
                    Object.keys(catalogCache.achievements || {}).some(function (id) {
                        var achievement = catalogCache.achievements[id];
                        if (achievementTitle(achievement) === title) {
                            recordAchievementEarned(catalogCache, achievement);
                            return true;
                        }
                        return false;
                    });
                });
            });
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function publicCatalogSnapshot(catalog) {
        var snapshot = { version: 3, at: now(), items: {} };
        Object.keys(catalog && catalog.achievements || {}).sort().forEach(function (id) {
            var achievement = catalog.achievements[id];
            if (!achievement || achievement.hidden === true || achievement.secret === true) {
                return;
            }
            var rarity = getRarityInfo(catalog, achievement);
            snapshot.items[id] = {
                title: achievementDisplayTitle(achievement),
                rarity: String(rarity.key || 'common'),
                points: achievementPoints(achievement),
                community: isCommunityAchievement(achievement),
                signature: hashText([
                    achievementDisplayTitle(achievement),
                    String(rarity.key || ''),
                    String(achievementPoints(achievement)),
                    String(achievement.description || ''),
                    isCommunityAchievement(achievement) ? 'community' : ''
                ].join('|'))
            };
        });
        snapshot.hash = hashText(Object.keys(snapshot.items).map(function (id) {
            return id + ':' + snapshot.items[id].signature;
        }).join('|'));
        return snapshot;
    }

    function inspectCatalogChanges(catalog) {
        if (!catalog) { return; }
        var current = publicCatalogSnapshot(catalog);
        var previous = safeParse(localStorage.getItem(catalogSnapshotKey()), null);
        try { localStorage.setItem(catalogSnapshotKey(), JSON.stringify(current)); } catch (error) {}

        if (!previous || !previous.items || Number(previous.version || 0) !== Number(current.version || 0)) {
            /* Новая версия формата снимка = новая безопасная базовая точка, без лавины анонсов. */
            state.meta.catalogBaselineReady = true;
            schedulePersist();
            return;
        }

        if (!state.settings.catalog) {
            /* Настройка выключает показ, но базовая точка всё равно движется вперёд. */
            return;
        }

        var newItems = [];
        Object.keys(current.items).forEach(function (id) {
            if (!previous.items[id]) {
                newItems.push({ id: id, data: current.items[id] });
            } else if (String(previous.items[id].rarity || '') !== String(current.items[id].rarity || '')) {
                var rarityEventId = 'rarity-change:' + id + ':' + String(previous.items[id].rarity || '') + '>' + String(current.items[id].rarity || '');
                addEvent({
                    id: rarityEventId,
                    type: 'catalog',
                    subtype: 'rarity-change',
                    achievementId: id,
                    title: 'Редкость награды изменилась',
                    description: current.items[id].title + ': теперь ' + String(current.items[id].rarity || 'новая редкость') + '.',
                    rarity: current.items[id].rarity || 'common',
                    points: current.items[id].points || 0,
                    community: current.items[id].community === true,
                    createdAt: now(),
                    readAt: 0
                });
            }
        });

        if (!newItems.length) { return; }
        if (newItems.length === 1) {
            var one = newItems[0];
            addEvent({
                id: 'catalog-new:' + one.id + ':' + current.hash,
                type: 'catalog',
                subtype: 'new-achievement',
                achievementId: one.id,
                title: 'В Летописи появилось новое достижение',
                description: one.data.title + (one.data.points > 0 ? ' · ' + String(one.data.points) + ' опыта' : ''),
                rarity: one.data.rarity || 'common',
                points: one.data.points || 0,
                community: one.data.community === true,
                createdAt: now(),
                readAt: 0
            });
            return;
        }
        addEvent({
            id: 'catalog-new-group:' + current.hash,
            type: 'catalog',
            subtype: 'new-achievements',
            title: newItems.length >= 5 ? ('Большое пополнение Летописи: ' + String(newItems.length) + ' новых достижений') : 'В Летописи появились новые достижения',
            description: 'Добавлено: ' + newItems.slice(0, 5).map(function (item) { return item.data.title; }).join(' · ') + (newItems.length > 5 ? ' · и ещё ' + String(newItems.length - 5) : ''),
            rarity: highestRarity(newItems.map(function (item) { return { rarity: item.data.rarity }; })),
            priority: newItems.length >= 10 ? 'important' : 'normal',
            items: newItems.map(function (item) {
                return { id: item.id, title: item.data.title, rarity: item.data.rarity, points: item.data.points, community: item.data.community === true };
            }),
            community: newItems.some(function (item) { return item.data.community === true; }),
            createdAt: now(),
            readAt: 0
        });
    }

    function normalizePageTitle(value) {
        return String(value || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function isUpdatesArticlePage() {
        return normalizePageTitle(mw.config.get('wgPageName')) === normalizePageTitle(UPDATES_PAGE) ||
            normalizePageTitle(mw.config.get('wgTitle')) === normalizePageTitle(UPDATES_PAGE.split(':').pop());
    }

    function makeUpdateSectionKey(section) {
        return hashText([
            String(section && section.level || ''),
            String(section && section.line || '').trim().toLowerCase(),
            String(section && section.anchor || '').trim().toLowerCase()
        ].join('|'));
    }

    function fetchUpdatesArticleSections() {
        if (!root.mw || typeof mw.Api !== 'function') {
            return Promise.resolve(null);
        }

        var api = new mw.Api();
        return api.get({
            action: 'parse',
            page: UPDATES_PAGE,
            prop: 'sections|revid',
            formatversion: 2
        }).then(function (data) {
            var parsed = data && data.parse;
            if (!parsed) { return null; }

            var sections = Array.isArray(parsed.sections) ? parsed.sections : [];
            var items = sections.map(function (section, index) {
                var item = {
                    number: index + 1,
                    level: Math.max(2, Number(section.level || section.toclevel || 2)),
                    line: String(section.line || '').replace(/<[^>]*>/g, '').trim(),
                    anchor: String(section.anchor || '').trim()
                };
                item.key = makeUpdateSectionKey(item);
                return item;
            }).filter(function (item) {
                return !!item.line;
            });

            return {
                version: 1,
                revid: Math.max(0, Number(parsed.revid || 0)),
                at: now(),
                items: items
            };
        }).catch(function (error) {
            /*
             * Если страница ещё не создана, просто ждём её появления.
             * Никаких ошибочных новостей не создаём.
             */
            console.warn('[Lofarian Chronicle Inbox] Страница «Обновления» пока недоступна:', error);
            return null;
        });
    }

    function updateArticleHref(item) {
        var base = mw.util.getUrl(UPDATES_PAGE);
        var anchor = String(item && item.anchor || '').trim();
        return anchor ? base + '#' + anchor : base;
    }

    function updateArticleEventTitle(item) {
        return String(item && item.line || 'Новое обновление').trim();
    }

    function syncUpdateArticleEvents(snapshot, previous) {
        if (!snapshot || !Array.isArray(snapshot.items)) { return false; }

        var currentKeys = Object.create(null);
        snapshot.items.forEach(function (item) {
            currentKeys[String(item.key)] = item;
        });

        var changed = false;

        /*
         * Удалили заголовок из статьи -> соответствующая новость удаляется
         * даже из ★ Избранного, потому что статья является источником истины.
         */
        var beforeLength = state.events.length;
        state.events = state.events.filter(function (event) {
            if (!event || event.subtype !== 'article-update') { return true; }
            return !!currentKeys[String(event.sourceKey || '')];
        });
        if (state.events.length !== beforeLength) {
            changed = true;
        }

        /*
         * Номера вычисляются заново по ТЕКУЩЕМУ порядку заголовков.
         * Перестановка заголовков не создаёт новую новость — только меняет номер.
         */
        state.events.forEach(function (event) {
            if (!event || event.subtype !== 'article-update') { return; }
            var item = currentKeys[String(event.sourceKey || '')];
            if (!item) { return; }

            var nextTitle = updateArticleEventTitle(item);
            var nextHref = updateArticleHref(item);

            if (
                String(event.title || '') !== nextTitle ||
                String(event.href || '') !== nextHref
            ) {
                event.updateHeading = nextTitle;
                event.title = nextTitle;
                event.href = nextHref;
                delete event.updateNumber;
                event.updatedAt = now();
                changed = true;
            }
        });

        var previousKeys = Object.create(null);
        if (previous && Array.isArray(previous.items)) {
            previous.items.forEach(function (item) {
                previousKeys[String(item.key || '')] = true;
            });
        }

        /*
         * Первый запуск = безопасная базовая точка.
         * Уже существующие заголовки не превращаются в лавину старых уведомлений.
         */
        if (previous && Array.isArray(previous.items) && isParticipant() && state.settings.news !== false) {
            /*
             * Обрабатываем новые заголовки СНИЗУ ВВЕРХ.
             *
             * На странице «Обновления» свежая версия находится сверху:
             *   v. 5.0
             *   v. 4.0
             *   ...
             *   v. 0.1
             *
             * addEvent() присваивает время в момент добавления, а лента
             * показывает более новые события выше. Поэтому при массовом
             * импорте сначала добавляем нижний заголовок, а верхний — последним.
             * В результате порядок в окне совпадает с порядком на странице.
             */
            snapshot.items.slice().reverse().forEach(function (item) {
                if (previousKeys[String(item.key || '')]) { return; }

                var added = addEvent({
                    id: 'article-update:' + String(item.key),
                    type: 'news',
                    subtype: 'article-update',
                    sourcePage: UPDATES_PAGE,
                    sourceKey: String(item.key),
                    updateHeading: updateArticleEventTitle(item),
                    title: updateArticleEventTitle(item),
                    description: 'Новая запись опубликована на странице «Обновления».',
                    rarity: 'notable',
                    priority: 'normal',
                    href: updateArticleHref(item),
                    createdAt: now(),
                    readAt: 0
                });
                if (added) { changed = true; }
            });
        }

        state.events = retainStoredEvents(state.events);
        return changed;
    }

    function decorateUpdatesArticleHeadings(snapshot) {
        /*
         * 1.12.1 — заголовок статьи полностью принадлежит автору.
         * Никаких автоматических №1 / №2 / №7 скрипт не добавляет.
         *
         * Если нужно:
         *   == Обновление №7 ==
         *   == Обновление 7.1 ==
         *   == Новая система достижений ==
         *
         * В новостях появится ровно тот же текст.
         */
        return;
    }

    function saveUpdatesSnapshot(snapshot) {
        try {
            localStorage.setItem(updatesSnapshotKey(), JSON.stringify(snapshot));
        } catch (error) {}
    }

    function checkUpdatesArticleForNews(forceCheck) {
        if (updatesWatchBusy || document.hidden) { return Promise.resolve(false); }

        var stamp = now();
        if (!forceCheck && stamp - updatesLastWatchAt < UPDATES_WATCH_MIN_GAP_MS) {
            return Promise.resolve(false);
        }

        updatesLastWatchAt = stamp;
        updatesWatchBusy = true;

        return fetchUpdatesArticleSections().then(function (snapshot) {
            if (!snapshot) { return false; }

            var previous = currentUpdatesSnapshot();

            /*
             * Если ревизия не изменилась, всё равно можно обновить визуальную
             * нумерацию статьи, но feed не трогаем.
             */
            if (
                previous &&
                Number(previous.revid || 0) > 0 &&
                Number(previous.revid || 0) === Number(snapshot.revid || 0)
            ) {
                decorateUpdatesArticleHeadings(snapshot);
                updatesRevisionId = Number(snapshot.revid || 0);
                return false;
            }

            var changed = syncUpdateArticleEvents(snapshot, previous);
            saveUpdatesSnapshot(snapshot);
            updatesRevisionId = Number(snapshot.revid || 0);
            decorateUpdatesArticleHeadings(snapshot);

            if (changed) {
                schedulePersist();
                scheduleRender();
            }
            return changed;
        }).then(function (changed) {
            updatesWatchBusy = false;
            return changed;
        }, function (error) {
            updatesWatchBusy = false;
            console.warn('[Lofarian Chronicle Inbox] Проверка статьи «Обновления» завершилась ошибкой:', error);
            return false;
        });
    }

    function startUpdatesArticleAutoIngest() {
        if (updatesWatchTimer) { return; }

        /*
         * Статья «Обновления» является источником истины:
         * каждый новый MediaWiki-заголовок = отдельная новость.
         */
        setTimeout(function () {
            checkUpdatesArticleForNews(true);
        }, 2500);

        updatesWatchTimer = setInterval(function () {
            checkUpdatesArticleForNews(false);
        }, UPDATES_WATCH_INTERVAL_MS);

        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                checkUpdatesArticleForNews(false);
            }
        });
    }


    function inspectRank(catalog) {
        if (!state.settings.rank || !runtime || typeof runtime.ensureFeature !== 'function') {
            return Promise.resolve(null);
        }
        if (now() - Number(state.meta.lastRankCheckAt || 0) < 6 * 60 * 60 * 1000) {
            return Promise.resolve(null);
        }
        state.meta.lastRankCheckAt = now();
        schedulePersist();
        return runtime.ensureFeature('leaderboard').then(function () {
            if (!runtime.has('getLeaderboardRowsCached')) { return null; }
            return runtime.invoke('getLeaderboardRowsCached', [catalog, false]);
        }).then(function (rows) {
            if (!Array.isArray(rows)) { return null; }
            var own = rows.filter(function (row) { return Number(row && row.userId) === userId(); })[0];
            if (!own || !own.rank) { return null; }
            var newRank = Number(own.rank);
            var oldRank = Number(state.meta.lastRank || 0);
            var bestRank = Number(state.meta.bestRank || 0);
            state.meta.lastRank = newRank;
            if (!bestRank || newRank < bestRank) { state.meta.bestRank = newRank; }

            if (!oldRank) {
                schedulePersist();
                return own;
            }

            var improved = newRank < oldRank;
            var crossed = (
                (newRank === 1 && oldRank > 1) ||
                (newRank <= 10 && oldRank > 10) ||
                (newRank <= 100 && oldRank > 100) ||
                (newRank <= 500 && oldRank > 500) ||
                (improved && oldRank - newRank >= 10)
            );
            if (crossed) {
                addEvent({
                    id: 'rank:' + String(oldRank) + '>' + String(newRank) + ':' + String(Math.floor(now() / DAY_MS)),
                    type: 'rank',
                    title: 'Новая строка в Зале славы',
                    description: 'Вы поднялись с #' + String(oldRank) + ' на #' + String(newRank) + '.',
                    rarity: newRank <= 10 ? 'legendary' : (newRank <= 100 ? 'relic' : 'notable'),
                    oldRank: oldRank,
                    newRank: newRank,
                    rankGain: Math.max(0, oldRank - newRank),
                    createdAt: now(),
                    readAt: 0
                });
            } else {
                schedulePersist();
            }
            return own;
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Проверка Зала славы пропущена:', error);
            return null;
        });
    }

    function countEarnedMap(map) {
        if (!map || typeof map !== 'object') { return 0; }
        return Object.keys(map).filter(function (id) { return Number(map[id] || 0) > 0; }).length;
    }

    function inspectCollectionMilestones(map) {
        var count = countEarnedMap(map);
        var old = Number(state.meta.lastCount || 0);
        var milestones = [10, 25, 50, 100, 150, 200, 300, 500];
        if (!old) {
            state.meta.lastCount = count;
            schedulePersist();
            return;
        }
        milestones.forEach(function (threshold) {
            if (old < threshold && count >= threshold) {
                addEvent({
                    id: 'collection-milestone:' + String(threshold),
                    type: 'chronicle',
                    subtype: 'milestone',
                    title: 'Запись вошла в Летопись',
                    description: 'В вашей коллекции уже ' + String(threshold) + ' достижений. Ещё одна заметная глава пути завершена.',
                    rarity: threshold >= 100 ? 'legendary' : (threshold >= 50 ? 'relic' : 'notable'),
                    createdAt: now(),
                    readAt: 0
                });
            }
        });
        state.meta.lastCount = count;
        schedulePersist();
    }

    function inspectNearUnlockFromDom() {
        if (!state.settings.near || now() - Number(state.meta.lastNearAt || 0) < NEAR_UNLOCK_COOLDOWN_MS) {
            return;
        }
        var profileName = String(mw.config.get('wgTitle') || '');
        if (Number(mw.config.get('wgNamespaceNumber')) !== 2 || profileName !== userName()) {
            return;
        }
        var candidates = Array.prototype.slice.call(document.querySelectorAll(
            '.lof-profile-achievement.is-unearned-achievement[data-lof-progress-percent][data-lof-achievement-id], ' +
            '.lof-profile-rail-badge.is-unearned-achievement[data-lof-progress-percent][data-lof-achievement-id]'
        )).map(function (node) {
            return {
                node: node,
                id: String(node.getAttribute('data-lof-achievement-id') || ''),
                percent: Number(node.getAttribute('data-lof-progress-percent') || 0)
            };
        }).filter(function (item) {
            return item.id && item.percent >= 90 && item.percent < 100;
        }).sort(function (a, b) { return b.percent - a.percent; });

        if (!candidates.length) { return; }
        var target = candidates[0];
        if (target.id === state.meta.lastNearId) { return; }
        var titleNode = target.node.querySelector('.lof-profile-achievement-title,.lof-profile-rail-title');
        var title = titleNode ? String(titleNode.textContent || '').trim() : target.id;
        addEvent({
            id: 'near:' + target.id + ':' + String(Math.floor(now() / DAY_MS)),
            type: 'near-unlock',
            achievementId: target.id,
            title: 'До новой награды совсем немного',
            description: title + ' · готово примерно ' + String(Math.floor(target.percent)) + '%.',
            rarity: 'notable',
            createdAt: now(),
            readAt: 0
        });
        state.meta.lastNearAt = now();
        state.meta.lastNearId = target.id;
        schedulePersist();
    }

    function expireOldNewMarkers(map) {
        if (!map || typeof map !== 'object') { return; }
        Object.keys(map).forEach(function (id) {
            var earnedAt = Number(map[id] || 0);
            if (earnedAt > 1000000000 && now() - earnedAt * 1000 > NEW_MARK_MAX_AGE_MS) {
                markProfileAchievementViewed(id, earnedAt);
            }
        });
        state.events.forEach(function (event) {
            if (!event.readAt && event.type === 'achievement-earned' && now() - Number(event.createdAt || 0) > NEW_MARK_MAX_AGE_MS) {
                markEventRead(event, true);
            }
        });
        schedulePersist();
    }

    function getCatalogSourcePages() {
        runtime = root.__LofarianAchievementsInternal || runtime;
        var config = runtime && runtime.config || {};
        var pages = [];
        var rootPage = String(config.CATALOG_PAGE || 'Project:LofarianAchievementsData').trim();
        if (rootPage) { pages.push(rootPage); }
        (Array.isArray(config.CATALOG_PART_PAGES) ? config.CATALOG_PART_PAGES : []).forEach(function (page) {
            page = String(page || '').trim();
            if (page && pages.indexOf(page) === -1) { pages.push(page); }
        });
        return pages;
    }

    function fetchCatalogRevisionFingerprint() {
        if (!root.mw || !mw.Api) { return Promise.resolve(''); }
        var pages = getCatalogSourcePages();
        if (!pages.length) { return Promise.resolve(''); }
        var api = new mw.Api();
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: pages.join('|'),
            rvprop: 'ids',
            formatversion: 2
        }).then(function (data) {
            var result = [];
            var rows = data && data.query && Array.isArray(data.query.pages) ? data.query.pages : [];
            rows.forEach(function (page) {
                var title = String(page && page.title || '').replace(/_/g, ' ').trim();
                var rev = page && Array.isArray(page.revisions) && page.revisions[0] ? Number(page.revisions[0].revid || 0) : 0;
                result.push(title + ':' + String(rev));
            });
            result.sort();
            return hashText(result.join('|'));
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Не удалось проверить ревизии каталога:', error);
            return '';
        });
    }

    function refreshCatalogFromSource(reason) {
        runtime = root.__LofarianAchievementsInternal || runtime;
        if (!isParticipant() || !runtime || !runtime.has || !runtime.has('readCatalog')) {
            return Promise.resolve(false);
        }
        return Promise.resolve(runtime.invoke('readCatalog', [true])).then(function (freshCatalog) {
            if (!freshCatalog) { return false; }
            catalogCache = freshCatalog;
            inspectCatalogChanges(freshCatalog);
            scheduleRender();
            console.log('[Lofarian Chronicle Inbox] Каталог автоматически обновлён' + (reason ? ' (' + reason + ')' : '') + '.');
            return true;
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Автообновление каталога пропущено:', error);
            return false;
        });
    }

    function checkCatalogForUpdates(forceCheck) {
        if (!isParticipant() || catalogWatchBusy || document.hidden) { return Promise.resolve(false); }
        var stamp = now();
        if (!forceCheck && stamp - catalogLastWatchAt < CATALOG_WATCH_MIN_GAP_MS) {
            return Promise.resolve(false);
        }
        catalogLastWatchAt = stamp;
        catalogWatchBusy = true;
        return fetchCatalogRevisionFingerprint().then(function (fingerprint) {
            if (!fingerprint) { return false; }
            if (!catalogRevisionFingerprint) {
                catalogRevisionFingerprint = fingerprint;
                return false;
            }
            if (fingerprint === catalogRevisionFingerprint) { return false; }
            catalogRevisionFingerprint = fingerprint;
            return refreshCatalogFromSource('обнаружена новая ревизия страниц каталога');
        }).then(function (changed) {
            catalogWatchBusy = false;
            return changed;
        }, function (error) {
            catalogWatchBusy = false;
            console.warn('[Lofarian Chronicle Inbox] Проверка обновлений каталога завершилась ошибкой:', error);
            return false;
        });
    }

    function startCatalogAutoIngest() {
        if (catalogWatchTimer || !isParticipant()) { return; }
        /*
         * Chronicle Inbox не хранит собственный список достижений. Источник истины —
         * основной catalog/readCatalog. Поэтому новые ID автоматически появляются
         * после обычной правки Project:LofarianAchievementsData или его частей.
         */
        setTimeout(function () { checkCatalogForUpdates(true); }, 12000);
        catalogWatchTimer = setInterval(function () {
            checkCatalogForUpdates(false);
        }, CATALOG_WATCH_INTERVAL_MS);

        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) { checkCatalogForUpdates(false); }
        });
    }

    function resolveRuntimeAndInspect() {
        if (!isParticipant()) { return; }
        runtime = root.__LofarianAchievementsInternal || runtime;
        if (!runtime || !runtime.has || !runtime.has('readCatalog')) { return; }

        Promise.resolve(runtime.invoke('readCatalog', [false])).then(function (catalog) {
            catalogCache = catalog;
            inspectCatalogChanges(catalog);
            installPopupMutationFallback();

            /*
             * Не запускаем второй тяжёлый расчёт effective map: основной Engine/Events
             * сам поддерживает локальный seen-map перед показом новых наград. Для UI-
             * статистики и срока «Новое» этого уже достаточно.
             */
            currentAchievementMap = safeParse(localStorage.getItem(SEEN_PREFIX + String(userId())), {});
            if (currentAchievementMap && typeof currentAchievementMap === 'object') {
                reconcileEarnedNewsWithOwnership(currentAchievementMap);
                inspectCollectionMilestones(currentAchievementMap);
                expireOldNewMarkers(currentAchievementMap);
            }
            return Promise.resolve(null);
        }).then(function () {
            scheduleIdle(function () { inspectRank(catalogCache); }, 7000);
            scheduleIdle(function () { inspectNearUnlockFromDom(); }, 3500);
            setTimeout(function () {
                var refreshed = safeParse(localStorage.getItem(SEEN_PREFIX + String(userId())), {});
                if (refreshed && typeof refreshed === 'object') {
                    currentAchievementMap = refreshed;
                    reconcileEarnedNewsWithOwnership(refreshed);
                    inspectCollectionMilestones(refreshed);
                    expireOldNewMarkers(refreshed);
                    scheduleRender();
                }
            }, 3200);
            startCatalogAutoIngest();
            startAchievementOwnershipWatch();
            scheduleRender();
        }).catch(function (error) {
            console.warn('[Lofarian Chronicle Inbox] Дополнительная проверка пропущена:', error);
        });
    }

    function scheduleIdle(fn, timeout) {
        if (typeof root.requestIdleCallback === 'function') {
            root.requestIdleCallback(function () { fn(); }, { timeout: timeout || 5000 });
        } else {
            setTimeout(fn, Math.min(timeout || 5000, 5000));
        }
    }

    function formatTime(timestamp) {
        timestamp = Number(timestamp || 0);
        if (!timestamp) { return ''; }
        var date = new Date(timestamp);
        var today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });
    }

    function dayBucket(timestamp) {
        var date = new Date(Number(timestamp || 0));
        var today = new Date();
        return date.toDateString() === today.toDateString() ? 'Сегодня' : 'Ранее';
    }

    function formatAgencyStamp(timestamp) {
        timestamp = Number(timestamp || 0);
        if (!timestamp) { return 'Агентство DFC'; }
        var date = new Date(timestamp);
        var day = String(date.getDate());
        var month = date.toLocaleDateString('ru-RU', { month: 'long' });
        var time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        return 'DFC • ' + day + ' ' + month + ' • ' + time;
    }

    function kindIcon(event) {
        if (!event) { return '✦'; }
        if (event.type === 'achievement-earned') { return '◆'; }
        if (event.type === 'catalog') { return '✧'; }
        if (event.type === 'rank') { return '♛'; }
        if (event.type === 'near-unlock') { return '◇'; }
        if (event.type === 'news') { return event.priority === 'urgent' ? '!' : '✦'; }
        if (event.subtype === 'milestone') { return '✎'; }
        return '✦';
    }

    function eventPriority(event) {
        if (!event) { return 'normal'; }
        if (String(event.priority || '') === 'urgent') { return 'urgent'; }
        if (String(event.priority || '') === 'important' || event.pinned === true) { return 'important'; }
        if (event.type === 'rank' && Number(state.meta.lastRank || 0) > 0 && Number(state.meta.lastRank || 0) <= 10) { return 'important'; }
        return 'normal';
    }

    function isAgencyHeadlineCandidate(event) {
        if (!event) { return false; }
        if (event.pinned === true || eventPriority(event) === 'urgent') { return true; }
        return event.type === 'news' || event.type === 'catalog' || event.type === 'rank' || event.subtype === 'milestone';
    }

    function selectHeadlineEvent(events) {
        var candidates = (events || []).filter(isAgencyHeadlineCandidate);
        if (!candidates.length) { return null; }
        candidates.sort(function (a, b) {
            var ap = eventPriority(a) === 'urgent' ? 4 : (a.pinned === true ? 3 : (eventPriority(a) === 'important' ? 2 : 1));
            var bp = eventPriority(b) === 'urgent' ? 4 : (b.pinned === true ? 3 : (eventPriority(b) === 'important' ? 2 : 1));
            if (bp !== ap) { return bp - ap; }
            if (!!a.readAt !== !!b.readAt) { return a.readAt ? 1 : -1; }
            return Number(b.createdAt || 0) - Number(a.createdAt || 0);
        });
        return candidates[0] || null;
    }

    function isSnoozed() {
        return Number(state.meta.snoozeUntil || 0) > now();
    }

    function scheduleSnoozeWake() {
        if (snoozeTimer) {
            clearTimeout(snoozeTimer);
            snoozeTimer = null;
        }
        var until = Number(state.meta.snoozeUntil || 0);
        if (!until || until <= now()) { return; }
        snoozeTimer = setTimeout(function () {
            snoozeTimer = null;
            state.meta.snoozeUntil = 0;
            schedulePersist();
            scheduleRender();
        }, Math.min(Math.max(1000, until - now() + 100), 2147483000));
    }

    function snoozeForSevenHours() {
        state.meta.snoozeUntil = now() + SNOOZE_MS;
        state.ui.collapsed = true;
        schedulePersist();
        scheduleSnoozeWake();
        scheduleRender();
    }

    function cancelSnooze() {
        state.meta.snoozeUntil = 0;
        schedulePersist();
        scheduleSnoozeWake();
        scheduleRender();
    }

    function filterMatchesFor(event, filterKey) {
        filterKey = String(filterKey || 'all');
        if (filterKey === 'all') { return true; }
        if (filterKey === 'favorites') { return event.favorite === true; }
        /* «Участники» — отдельная read-only лента, она не строится из state.events. */
        if (filterKey === 'participants') { return false; }

        /*
         * 1.11.2 — основные рубрики больше не дублируют друг друга.
         *
         * Награды:
         *   achievement-earned + near-unlock.
         *
         * Сообщество:
         *   только community-события.
         *
         * Летопись:
         *   только type=chronicle — личные вехи пути пользователя,
         *   например milestones коллекции.
         *
         * Зал славы:
         *   только type=rank.
         *
         * Обновления:
         *   catalog + официальные news, кроме community.
         *
         * Избранное намеренно остаётся сквозным фильтром.
         */
        if (filterKey === 'awards') {
            return event.type === 'achievement-earned' || event.type === 'near-unlock';
        }
        if (filterKey === 'community') {
            return eventIsCommunity(event);
        }
        if (filterKey === 'chronicle') {
            return event.type === 'chronicle' && !eventIsCommunity(event);
        }
        if (filterKey === 'hall') {
            return event.type === 'rank';
        }
        if (filterKey === 'updates') {
            return (event.type === 'catalog' || event.type === 'news') && !eventIsCommunity(event);
        }
        return true;
    }

    function filterMatches(event) {
        return filterMatchesFor(event, state.ui.filter);
    }

    function eventIsUnsafeCatalogReveal(event) {
        if (!event || !catalogCache) { return false; }

        /*
         * Скрытое достижение нельзя раскрывать ДО получения:
         * - catalog: не показываем;
         * - near-unlock: не показываем.
         *
         * achievement-earned здесь намеренно разрешён: после фактического
         * получения скрытая награда уже раскрыта самому владельцу.
         */
        if (
            event.type !== 'catalog' &&
            event.type !== 'near-unlock'
        ) {
            return false;
        }

        var ids = [];
        if (event.achievementId) { ids.push(event.achievementId); }
        (event.items || []).forEach(function (item) {
            if (item && item.id) { ids.push(item.id); }
        });

        return ids.some(function (id) {
            var achievement = catalogCache.achievements && catalogCache.achievements[id];
            return achievement && (achievement.hidden === true || achievement.secret === true);
        });
    }

    function eventImportanceForSort(event) {
        if (!event) { return 0; }
        var score = 0;
        var priority = eventPriority(event);
        if (priority === 'urgent') { score += 10000; }
        else if (priority === 'important') { score += 6000; }
        score += Math.max(0, rarityWeight(event.rarity)) * 700;
        score += Math.min(1200, Math.max(0, Number(event.points || 0)));
        if (event.type === 'rank') { score += 1800 + rankGainFromEvent(event) * 10; }
        if (event.type === 'achievement-earned') { score += 900 + ((event.items || []).length * 90); }
        if (event.favorite === true) { score += 450; }
        if (!event.readAt) { score += 180; }
        return score;
    }

    function sortEventList(list) {
        var mode = String(state.ui.sort || 'newest');
        return list.sort(function (a, b) {
            var at = Number(a.createdAt || 0);
            var bt = Number(b.createdAt || 0);
            if (mode === 'oldest') { return at - bt; }
            if (mode === 'unread') {
                if (!!a.readAt !== !!b.readAt) { return a.readAt ? 1 : -1; }
                return bt - at;
            }
            if (mode === 'important') {
                var d = eventImportanceForSort(b) - eventImportanceForSort(a);
                return d || (bt - at);
            }
            if (mode === 'favorites') {
                if (!!a.favorite !== !!b.favorite) { return a.favorite ? -1 : 1; }
                if (!!a.readAt !== !!b.readAt) { return a.readAt ? 1 : -1; }
                return bt - at;
            }
            return bt - at;
        });
    }

    function visibleEvents() {
        return sortEventList(state.events.filter(function (event) {
            return filterMatches(event) && !eventIsUnsafeCatalogReveal(event);
        })).slice(0, MAX_STORED_EVENTS);
    }

    function rankGainFromEvent(event) {
        if (!event || event.type !== 'rank') { return 0; }
        if (Number(event.rankGain || 0) > 0) { return Number(event.rankGain || 0); }
        var match = String(event.description || '').match(/#(\d+)\s+на\s+#(\d+)/i);
        return match ? Math.max(0, Number(match[1]) - Number(match[2])) : 0;
    }

    function weeklySummaryData(events) {
        var cutoff = now() - WEEK_MS;
        var achievements = 0;
        var points = 0;
        var places = 0;
        var community = 0;
        (events || state.events).forEach(function (event) {
            if (!event || Number(event.createdAt || 0) < cutoff) { return; }
            if (event.type === 'achievement-earned') {
                achievements += Array.isArray(event.items) && event.items.length ? event.items.length : 1;
                points += Number(event.points || 0);
            }
            if (event.type === 'rank') { places += rankGainFromEvent(event); }
            if (eventIsCommunity(event)) { community += 1; }
        });
        return { achievements: achievements, points: points, places: places, community: community };
    }

    function dailyEventScore(event) {
        if (!event || Number(event.createdAt || 0) < now() - DAY_MS) { return -1; }
        if (event.type === 'news' || event.type === 'catalog' || event.type === 'near-unlock') { return -1; }
        var score = rarityWeight(event.rarity) * 30 + Math.min(200, Number(event.points || 0));
        if (event.type === 'rank') { score += 160 + rankGainFromEvent(event) * 3; }
        if (event.subtype === 'milestone') { score += 130; }
        if (event.type === 'achievement-earned') { score += 80 + ((event.items || []).length * 15); }
        if (event.favorite === true) { score += 10; }
        return score;
    }

    function selectDailyEvent(events) {
        var best = null;
        var bestScore = -1;
        (events || []).forEach(function (event) {
            var score = dailyEventScore(event);
            if (score > bestScore) { best = event; bestScore = score; }
        });
        return best;
    }

    function weeklySummaryWindowEvents(events) {
        var cutoff = now() - WEEK_MS;
        return (events || state.events || []).filter(function (event) {
            return !!event && Number(event.createdAt || 0) >= cutoff && !eventIsUnsafeCatalogReveal(event);
        }).sort(function (a, b) {
            return Number(b.createdAt || 0) - Number(a.createdAt || 0);
        });
    }

    function removeWeeklySummary() {
        var existing = document.getElementById(WEEKLY_SUMMARY_ID);
        if (existing) { existing.remove(); }
    }

    function weeklySummaryAchievementItems(events) {
        var result = [];
        weeklySummaryWindowEvents(events).forEach(function (event) {
            if (event.type !== 'achievement-earned') { return; }
            var items = achievementSummaryItems(event);
            if (!items.length) {
                result.push({
                    id: String(event.achievementId || ''),
                    title: String(event.title || 'Получено достижение'),
                    points: Number(event.points || 0),
                    earnedAt: Number(event.createdAt || 0)
                });
                return;
            }
            items.forEach(function (item) {
                result.push({
                    id: String(item.id || event.achievementId || ''),
                    title: String(item.title || 'Получено достижение'),
                    points: Number(item.points || 0),
                    earnedAt: Number(item.earnedAt || event.createdAt || 0)
                });
            });
        });
        return result;
    }

    function openWeeklySummary(kind, data, events) {
        removeWeeklySummary();

        var list = weeklySummaryWindowEvents(events);
        var achievementItems = weeklySummaryAchievementItems(events);
        var title = 'Сводка за 7 дней';
        var kicker = 'НЕДЕЛЬНАЯ СВОДКА';
        var metric = '';
        var intro = '';
        var rows = [];

        if (kind === 'achievements') {
            title = 'Достижения за 7 дней';
            metric = String(data.achievements || 0);
            intro = 'Все награды, которые попали в вашу ленту DFC за последние семь дней.';
            rows = achievementItems.map(function (item) {
                return {
                    title: item.title,
                    meta: (Number(item.points || 0) > 0 ? '+' + Number(item.points || 0) + ' опыта · ' : '') +
                        (formatAchievementSummaryDate(item.earnedAt, 0) || 'за последние 7 дней'),
                    achievementId: String(item.id || ''),
                    earnedAt: Number(item.earnedAt || 0),
                    points: Number(item.points || 0)
                };
            });
        } else if (kind === 'points') {
            title = 'Опыт за 7 дней';
            metric = '+' + String(data.points || 0);
            intro = 'Опыт, полученный именно из событий о новых достижениях за последние семь дней.';
            rows = achievementItems.filter(function (item) {
                return Number(item.points || 0) !== 0;
            }).map(function (item) {
                return {
                    title: item.title,
                    meta: '+' + Number(item.points || 0) + ' опыта · ' +
                        (formatAchievementSummaryDate(item.earnedAt, 0) || 'за последние 7 дней'),
                    achievementId: String(item.id || ''),
                    earnedAt: Number(item.earnedAt || 0),
                    points: Number(item.points || 0)
                };
            });
        } else if (kind === 'places') {
            title = 'Изменение места за 7 дней';
            metric = '+' + String(data.places || 0);
            intro = 'Суммарный подъём по событиям Зала славы, зафиксированным DFC за последние семь дней.';
            rows = list.filter(function (event) {
                return event.type === 'rank';
            }).map(function (event) {
                var gain = rankGainFromEvent(event);
                return {
                    title: String(event.title || 'Изменение места'),
                    meta: (gain > 0 ? '+' + gain + ' мест · ' : '') +
                        String(event.description || formatAchievementSummaryDate(event.createdAt, 0) || ''),
                    href: hallLink(userName())
                };
            });
        }

        var overlay = document.createElement('div');
        overlay.id = WEEKLY_SUMMARY_ID;
        overlay.className = 'lof-ci-ach-summary-overlay';
        overlay.setAttribute('role', 'presentation');

        var dialog = document.createElement('section');
        dialog.className = 'lof-ci-ach-summary lof-ci-weekly-summary-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', title);

        var visibleRows = rows.slice(0, 30);
        var rowsHtml = visibleRows.length
            ? visibleRows.map(function (row, rowIndex) {
                if (row.achievementId) {
                    return '<button type="button" class="lof-ci-weekly-summary-row is-link" ' +
                        'data-weekly-achievement-row="' + escapeHtml(String(rowIndex)) + '">' +
                        '<strong>' + escapeHtml(row.title) + '</strong>' +
                        '<span>' + escapeHtml(row.meta || '') + '</span>' +
                        '<i class="lof-ci-weekly-summary-open" aria-hidden="true">›</i>' +
                    '</button>';
                }

                if (row.href) {
                    return '<a href="' + escapeHtml(row.href) + '" class="lof-ci-weekly-summary-row is-link">' +
                        '<strong>' + escapeHtml(row.title) + '</strong>' +
                        '<span>' + escapeHtml(row.meta || '') + '</span>' +
                        '<i class="lof-ci-weekly-summary-open" aria-hidden="true">›</i>' +
                    '</a>';
                }

                return '<div class="lof-ci-weekly-summary-row">' +
                    '<strong>' + escapeHtml(row.title) + '</strong>' +
                    '<span>' + escapeHtml(row.meta || '') + '</span>' +
                '</div>';
            }).join('')
            : '<div class="lof-ci-weekly-summary-empty">За последние 7 дней здесь пока нет событий.</div>';

        dialog.innerHTML =
            '<div class="lof-ci-ach-summary-head">' +
                '<div class="lof-ci-ach-summary-head-copy">' +
                    '<div class="lof-ci-ach-summary-kicker"><span>' + escapeHtml(kicker) + '</span></div>' +
                    '<h3 class="lof-ci-ach-summary-title">' + escapeHtml(title) + '</h3>' +
                '</div>' +
            '</div>' +
            '<div class="lof-ci-ach-summary-body">' +
                '<div class="lof-ci-weekly-summary-metric">' + escapeHtml(metric) + '</div>' +
                '<div class="lof-ci-weekly-summary-intro">' + escapeHtml(intro) + '</div>' +
                '<div class="lof-ci-weekly-summary-list">' + rowsHtml + '</div>' +
                '<div class="lof-ci-ach-summary-actions">' +
                    '<button type="button" class="lof-ci-ach-summary-close">Закрыть</button>' +
                '</div>' +
            '</div>';

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        var keyHandler = null;

        function closeSummary() {
            removeWeeklySummary();
            if (keyHandler) {
                document.removeEventListener('keydown', keyHandler, true);
                keyHandler = null;
            }
        }

        /*
         * 1.14.6 — восстановлено старое поведение недельной сводки:
         * клик по достижению НЕ уводит со страницы. Сначала открывается
         * та же краткая карточка, что и у новости/профиля, а уже внутри неё
         * остаётся отдельная кнопка «Показать в профиле».
         */
        dialog.querySelectorAll('[data-weekly-achievement-row]').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var rowIndex = Number(button.getAttribute('data-weekly-achievement-row'));
                var row = visibleRows[rowIndex];
                if (!row || !row.achievementId) { return; }

                closeSummary();
                openEarnedAchievementSummary({
                    id: 'weekly-earned:' + String(row.achievementId) + ':' + String(row.earnedAt || 0),
                    type: 'achievement-earned',
                    achievementId: String(row.achievementId),
                    earnedAt: Number(row.earnedAt || 0),
                    title: String(row.title || row.achievementId || 'Достижение'),
                    points: Number(row.points || 0),
                    createdAt: achievementSummaryTimestamp(row.earnedAt, now()),
                    readAt: 1
                });
            });
        });

        var close = dialog.querySelector('.lof-ci-ach-summary-close');
        if (close) { close.addEventListener('click', closeSummary); }
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) { closeSummary(); }
        });

        keyHandler = function (event) {
            if (event.key === 'Escape' && document.getElementById(WEEKLY_SUMMARY_ID)) {
                event.preventDefault();
                closeSummary();
            }
        };
        document.addEventListener('keydown', keyHandler, true);
    }


    function renderWeeklySummary(panel, events) {
        var box = panel.querySelector('.lof-ci-weekly');
        if (!box) { return; }
        if (!isParticipant() || state.settings.weekly === false) { box.style.display = 'none'; box.innerHTML = ''; return; }
        var data = weeklySummaryData(events);
        box.style.display = '';
        box.innerHTML = '<div class="lof-ci-weekly-kicker">Сводка за 7 дней</div>' +
            '<div class="lof-ci-weekly-values">' +
                '<button type="button" class="lof-ci-weekly-link" data-weekly-summary="achievements" data-lof-tip-title="Достижения за неделю" data-lof-tip="Открыть сводку прямо здесь, без перехода на другую страницу."><strong>' + escapeHtml(String(data.achievements)) + '</strong> достижений</button>' +
                '<button type="button" class="lof-ci-weekly-link" data-weekly-summary="points" data-lof-tip-title="Опыт за неделю" data-lof-tip="Открыть подробную сводку опыта прямо здесь."><strong>+' + escapeHtml(String(data.points)) + '</strong> опыта</button>' +
                '<button type="button" class="lof-ci-weekly-link" data-weekly-summary="places" data-lof-tip-title="Место за неделю" data-lof-tip="Открыть сводку изменений места, не покидая DFC."><strong>+' + escapeHtml(String(data.places)) + '</strong> места</button>' +
                (data.community ? '<button type="button" class="lof-ci-weekly-link is-feed" data-weekly-filter="community" data-lof-tip-title="События сообщества" data-lof-tip="Показать внутри агентства только новости сообщества."><strong>' + escapeHtml(String(data.community)) + '</strong> событий сообщества</button>' : '') +
            '</div>';

        /*
         * 1.14.5 — WEEKLY CLICK FIX
         *
         * Недельная сводка регулярно перерисовывается через innerHTML.
         * Поэтому обработчик висит на постоянном контейнере .lof-ci-weekly,
         * а не на отдельных кнопках, которые могут быть заменены очередным
         * renderPanel() между обновлениями ленты.
         */
        box.style.pointerEvents = 'auto';
        box.onclick = function (event) {
            var target = event && event.target;
            var button = target && target.closest
                ? target.closest('[data-weekly-summary],[data-weekly-filter]')
                : null;

            if (!button || !box.contains(button)) { return; }

            event.preventDefault();
            event.stopPropagation();
            hideControlTip();

            if (button.hasAttribute('data-weekly-summary')) {
                openWeeklySummary(
                    button.getAttribute('data-weekly-summary') || 'achievements',
                    data,
                    events
                );
                return;
            }

            if (button.hasAttribute('data-weekly-filter')) {
                openFeedFilter(button.getAttribute('data-weekly-filter') || 'all');
            }
        };
        bindControlTips(box);
    }

    function cssText() {
        return `
:root{--lof-ci-panel-width:min(446px,calc(100vw - 44px));--lof-ci-panel-right:12px;--lof-ci-panel-top:64px;--lof-ci-panel-height:calc(100vh - 78px);--lof-ci-gold:rgba(155,123,57,.56);--lof-ci-ink:#392d24}
#${TAB_ID}{position:fixed;right:0;top:calc(var(--lof-ci-panel-top) + 81px);z-index:922;width:90px;min-height:184px;border:1px solid rgba(68,45,27,.76);border-right:0;border-radius:30px 0 0 30px;background:radial-gradient(circle at 18% 8%,rgba(255,226,167,.34),transparent 31%),linear-gradient(180deg,#8b6848 0%,#64442e 48%,#3b281d 100%);box-shadow:-13px 19px 44px rgba(33,20,12,.38),inset 0 1px 0 rgba(255,255,255,.24),inset 1px 0 0 rgba(243,217,166,.12);font:700 13px/1.1 Georgia,"Times New Roman",serif;letter-spacing:.045em;color:#fff8ec;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;padding:16px 8px;writing-mode:vertical-rl;transform:translateZ(0);transform-origin:right center;transition:right .30s cubic-bezier(.2,.75,.25,1),transform .18s ease,filter .18s ease,box-shadow .18s ease,border-color .18s ease;isolation:isolate;overflow:visible}
#${TAB_ID}::before{content:"✦";writing-mode:horizontal-tb;display:flex;align-items:center;justify-content:center;width:31px;height:31px;border-radius:50%;font:700 16px/1 Georgia,serif;color:#f7dda6;background:rgba(25,14,8,.18);border:1px solid rgba(245,219,169,.24);text-shadow:0 1px 2px rgba(0,0,0,.34),0 0 12px rgba(238,199,128,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
#${TAB_ID}.is-open{opacity:0;visibility:hidden;pointer-events:none;transform:translateX(24px) scale(.94);box-shadow:none}
#${TAB_ID}:hover,#${TAB_ID}:focus-visible{transform:scale(1.025);filter:brightness(1.10);border-color:rgba(235,201,137,.86);outline:none;box-shadow:-16px 20px 48px rgba(35,22,14,.42),0 0 0 5px rgba(155,123,57,.12),0 0 28px rgba(221,177,94,.15),inset 0 1px 0 rgba(255,255,255,.25)}
#${TAB_ID}.is-open:hover,#${TAB_ID}.is-open:focus-visible{transform:translateX(24px) scale(.94)}
#${TAB_ID}.is-attention:not(.is-open):not(.is-dnd){animation:lof-ci-attention 7.2s ease-in-out infinite}
#${TAB_ID}.has-unread:not(.is-open):not(.is-dnd){animation:lof-ci-attention-unread 4.8s ease-in-out infinite}
#${TAB_ID} .lof-ci-tab-label{display:block;text-shadow:0 1px 2px rgba(0,0,0,.34);font-size:15px;letter-spacing:.06em}
#${TAB_ID} .lof-ci-tab-mini{display:block;writing-mode:horizontal-tb;font:900 9px/1 Arial,sans-serif;letter-spacing:.15em;color:#f7dda6;padding:5px 8px;border:1px solid rgba(240,215,166,.32);border-radius:999px;background:rgba(21,12,8,.22);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
#${TAB_ID} .lof-ci-tab-new{display:none;writing-mode:horizontal-tb;position:absolute;right:7px;bottom:8px;padding:4px 6px;border-radius:999px;background:#a14d3e;color:#fff8ee;font:900 7px/1 Arial,sans-serif;letter-spacing:.10em;box-shadow:0 3px 9px rgba(0,0,0,.20),0 0 0 2px rgba(255,241,218,.45)}
#${TAB_ID}.has-unread .lof-ci-tab-new{display:block}
#${TAB_ID} .lof-ci-count{writing-mode:horizontal-tb;position:absolute;left:8px;top:8px;min-width:26px;height:26px;padding:0 7px;border-radius:999px;background:#a3473e;color:#fff;font:900 12px/26px Arial,sans-serif;text-align:center;box-shadow:0 3px 12px rgba(0,0,0,.30),0 0 0 3px #f3e4cb}
#${TAB_ID}.is-pulsing:not(.is-dnd){animation:lof-ci-tab-pulse 1.15s ease 1}
@keyframes lof-ci-tab-pulse{0%,100%{transform:translateX(0)}35%{transform:translateX(-8px)}65%{transform:translateX(-3px)}}
@keyframes lof-ci-attention{0%,78%,100%{box-shadow:-13px 19px 44px rgba(33,20,12,.38),inset 0 1px 0 rgba(255,255,255,.24)}86%{box-shadow:-16px 22px 52px rgba(33,20,12,.43),0 0 0 5px rgba(197,154,82,.08),0 0 30px rgba(222,178,97,.12),inset 0 1px 0 rgba(255,255,255,.24)}}
@keyframes lof-ci-attention-unread{0%,100%{filter:brightness(1);box-shadow:-13px 19px 44px rgba(33,20,12,.38),0 0 0 0 rgba(161,71,62,0)}50%{filter:brightness(1.07);box-shadow:-16px 22px 52px rgba(33,20,12,.42),0 0 0 7px rgba(161,71,62,.10),0 0 32px rgba(224,174,90,.14)}}
#${PANEL_ID}{position:fixed;z-index:921;right:var(--lof-ci-panel-right);top:var(--lof-ci-panel-top);width:var(--lof-ci-panel-width);height:var(--lof-ci-panel-height);min-height:280px;background:radial-gradient(circle at 14% -4%,rgba(255,255,255,.84),transparent 31%),radial-gradient(circle at 100% 0,rgba(200,165,102,.19),transparent 28%),repeating-linear-gradient(0deg,rgba(109,78,40,.018) 0 1px,transparent 1px 6px),linear-gradient(180deg,rgba(252,248,241,.998),rgba(232,219,197,.997));border:1px solid rgba(101,74,50,.34);border-radius:32px;box-shadow:-24px 22px 68px rgba(0,0,0,.28),0 1px 0 rgba(255,255,255,.86) inset,0 0 0 1px rgba(255,255,255,.24),inset 6px 0 24px rgba(255,243,218,.26);color:var(--lof-ci-ink);font-family:Arial,sans-serif;display:flex;flex-direction:column;transform:translateX(0);transition:transform .30s cubic-bezier(.2,.75,.25,1),opacity .22s ease;overflow:hidden;backdrop-filter:blur(7px)}
#${PANEL_ID}.is-collapsed{transform:translateX(calc(100% + 36px));opacity:.12;pointer-events:none}#${PANEL_ID}.is-booting,#${TAB_ID}.is-booting{transition:none!important;animation:none!important}#${PANEL_ID}.is-booting * ,#${TAB_ID}.is-booting *{transition:none!important;animation:none!important}
.lof-ci-head{padding:18px 18px 15px;border-bottom:1px solid rgba(86,63,44,.14);background:radial-gradient(circle at 10% 0,rgba(255,255,255,.92),transparent 32%),radial-gradient(circle at 95% 10%,rgba(201,164,102,.12),transparent 28%),linear-gradient(180deg,rgba(255,255,255,.62),rgba(255,255,255,.10));position:relative}.lof-ci-head::after{content:"";position:absolute;left:18px;right:18px;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent,rgba(155,123,57,.34),transparent)}
.lof-ci-head-row{display:flex;align-items:center;gap:12px}.lof-ci-agency-seal{flex:0 0 50px;width:50px;height:50px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 20%,rgba(255,244,220,.28),transparent 35%),linear-gradient(145deg,#7a583d,#4b3426);border:1px solid rgba(75,50,33,.46);box-shadow:0 8px 20px rgba(54,34,22,.17),inset 0 1px 0 rgba(255,255,255,.20);color:#f4dcae;font:800 15px/1 Georgia,"Times New Roman",serif;letter-spacing:.10em;position:relative}.lof-ci-agency-seal::after{content:"✦";position:absolute;right:4px;top:3px;font-size:9px;color:#ffe7b4}.lof-ci-title-wrap{flex:1;min-width:0}.lof-ci-title-kicker{display:flex;align-items:center;gap:7px;font:900 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.16em;color:#967653;margin-bottom:6px}.lof-ci-live-dot{width:7px;height:7px;border-radius:50%;background:#9b3f39;box-shadow:0 0 0 4px rgba(155,63,57,.09)}.lof-ci-title{font:700 22px/1.10 Georgia,"Times New Roman",serif;letter-spacing:.005em;max-width:290px}.lof-ci-collapse,.lof-ci-settings,.lof-ci-read-all,.lof-ci-archive-toggle{appearance:none;border:1px solid rgba(103,76,47,.20);background:linear-gradient(180deg,rgba(255,255,255,.80),rgba(245,235,218,.70));color:#4b3829;border-radius:14px;cursor:pointer;padding:9px 11px;font-weight:800;box-shadow:0 4px 12px rgba(57,41,28,.06),inset 0 1px 0 rgba(255,255,255,.72);transition:border-color .17s ease,background .17s ease,transform .17s ease,box-shadow .17s ease}.lof-ci-collapse:hover,.lof-ci-collapse:focus-visible,.lof-ci-settings:hover,.lof-ci-settings:focus-visible,.lof-ci-read-all:hover,.lof-ci-read-all:focus-visible,.lof-ci-archive-toggle:hover,.lof-ci-archive-toggle:focus-visible{transform:translateY(-2px);border-color:rgba(155,123,57,.56);background:linear-gradient(180deg,rgba(255,255,255,.90),rgba(234,214,174,.65));box-shadow:0 10px 24px rgba(25,20,14,.10),0 0 0 3px rgba(155,123,57,.07);outline:none}.lof-ci-collapse{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(145deg,#735039,#4f3524);color:#fff5e4;border-color:rgba(91,62,35,.30);padding:9px 12px;white-space:nowrap}.lof-ci-collapse:hover,.lof-ci-collapse:focus-visible{background:linear-gradient(145deg,#805b40,#573925);color:#fffaf0}.lof-ci-collapse-icon{font:900 12px/1 Arial,sans-serif}.lof-ci-collapse-text{font:900 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.055em}
.lof-ci-stats{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px;min-height:27px}.lof-ci-stat-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border:1px solid rgba(91,68,47,.14);border-radius:999px;background:rgba(255,255,255,.52);color:#6f5b49;font:700 11px/1 Arial,sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 2px 7px rgba(62,42,20,.03)}.lof-ci-stat-chip strong{color:#4b3829;font-weight:800}.lof-ci-stat-chip.is-unread{border-color:rgba(143,72,57,.18);background:rgba(143,72,57,.055);color:#7f473b}.lof-ci-chip-link,.lof-ci-weekly-link{position:relative;cursor:pointer;text-decoration:none;transition:transform .16s ease,background .16s ease,border-color .16s ease,box-shadow .16s ease,color .16s ease}.lof-ci-chip-link::after,.lof-ci-weekly-link::after{content:"↗";display:inline-flex;align-items:center;justify-content:center;margin-left:3px;color:#9a7546;font:900 10px/1 Arial,sans-serif;opacity:.86}.lof-ci-chip-link.is-feed::after,.lof-ci-weekly-link.is-feed::after{content:"››";letter-spacing:-1px;font-size:11px}.lof-ci-chip-link:hover,.lof-ci-chip-link:focus-visible,.lof-ci-weekly-link:hover,.lof-ci-weekly-link:focus-visible{transform:translateY(-2px);background:linear-gradient(145deg,#fffaf0,#eed9ae);border-color:rgba(142,102,49,.38);box-shadow:0 10px 20px rgba(62,42,20,.10),0 0 0 3px rgba(155,123,57,.06);color:#4b3829;outline:none}.lof-ci-chip-link:hover strong,.lof-ci-chip-link:focus-visible strong,.lof-ci-weekly-link:hover strong,.lof-ci-weekly-link:focus-visible strong{color:#3d2d21}.lof-ci-chip-link.is-unread:hover,.lof-ci-chip-link.is-unread:focus-visible{background:linear-gradient(145deg,#fff5f2,#f3d5cc)}.lof-ci-actions{display:flex;gap:7px;margin-top:10px;align-items:center;flex-wrap:wrap;min-height:34px}.lof-ci-read-all,.lof-ci-archive-toggle{font-size:11px;padding:8px 11px}.lof-ci-read-all{margin-left:auto;transition:opacity .16s ease,visibility .16s ease,transform .17s ease,border-color .17s ease,background .17s ease,box-shadow .17s ease}.lof-ci-read-all.is-hidden{visibility:hidden;opacity:0;pointer-events:none}
.lof-ci-ticker{display:flex;align-items:stretch;min-height:44px;border-bottom:1px solid rgba(86,63,44,.12);background:linear-gradient(90deg,rgba(103,72,48,.09),rgba(255,255,255,.34));overflow:hidden;position:relative}.lof-ci-ticker-badge{display:flex;align-items:center;flex:0 0 auto;padding:0 12px;background:linear-gradient(180deg,#745339,#5e412d);color:#fff8ec;font:900 10px/44px Arial,sans-serif;letter-spacing:.11em;z-index:2;box-shadow:7px 0 14px rgba(69,45,28,.10)}.lof-ci-ticker-window{overflow-x:auto;overflow-y:hidden;display:flex;align-items:center;flex:1;min-width:0;scrollbar-width:none;mask-image:linear-gradient(90deg,#000 0,#000 calc(100% - 24px),transparent 100%)}.lof-ci-ticker-window::-webkit-scrollbar{display:none}.lof-ci-ticker-track{display:flex;align-items:center;gap:7px;width:max-content;white-space:nowrap;padding:5px 26px 5px 8px;transform:none!important;animation:none!important}.lof-ci-ticker-item{appearance:none;border:1px solid rgba(103,78,54,.14);border-radius:999px;background:rgba(255,255,255,.52);color:#624d3b;padding:7px 10px;font:700 11px/1 Arial,sans-serif;cursor:pointer;max-width:245px;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 7px rgba(51,36,25,.04),inset 0 1px 0 rgba(255,255,255,.50);transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease,color .16s ease}.lof-ci-ticker-item:hover,.lof-ci-ticker-item:focus-visible{transform:translateY(-1px);border-color:rgba(155,123,57,.48);background:#fff9ee;color:#4d392a;box-shadow:0 6px 14px rgba(46,31,20,.09),0 0 0 3px rgba(155,123,57,.05);outline:none}.lof-ci-ticker-item.is-urgent{border-color:rgba(161,71,62,.28);color:#8f4037;background:rgba(161,71,62,.055)}.lof-ci-ticker-item.is-urgent:hover,.lof-ci-ticker-item.is-urgent:focus-visible{border-color:rgba(161,71,62,.50);background:rgba(161,71,62,.09)}
.lof-ci-filters{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));align-items:stretch;gap:8px;padding:11px 13px 12px;border-bottom:1px solid rgba(86,63,44,.11);background:linear-gradient(180deg,rgba(255,255,255,.34),rgba(241,229,207,.26));overflow:visible}.lof-ci-filter{position:relative;min-width:0;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:38px;border:1px solid rgba(112,82,48,.15);background:rgba(255,252,244,.60);color:#715e4c;padding:8px 9px;border-radius:14px;cursor:pointer;font:700 10px/1.08 Arial,sans-serif;white-space:normal;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.62);transition:border-color .16s ease,background .16s ease,transform .16s ease,box-shadow .16s ease,color .16s ease}.lof-ci-filter-main{grid-column:span 2;min-width:0;padding:9px 8px;border-color:rgba(126,91,46,.22);background:radial-gradient(circle at 15% 0,rgba(255,255,255,.88),transparent 38%),linear-gradient(145deg,#f8eed8,#e8d2a6);color:#5b4129;font:800 11px/1.08 Arial,sans-serif;box-shadow:0 5px 13px rgba(71,48,26,.07),inset 0 1px 0 rgba(255,255,255,.76)}.lof-ci-filter:not(.lof-ci-filter-main){grid-column:span 3}.lof-ci-filter-icon{flex:0 0 auto;font-size:12px;color:#9a713c}.lof-ci-filter-count{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:rgba(105,74,45,.09);color:#806246;font:900 8px/1 Arial,sans-serif}.lof-ci-filter-link-mark{display:inline-flex;align-items:center;justify-content:center;margin-left:1px;color:#9b7547;font:900 10px/1 Arial,sans-serif;transition:transform .14s ease,color .14s ease}.lof-ci-filter-link:hover .lof-ci-filter-link-mark,.lof-ci-filter-link:focus-visible .lof-ci-filter-link-mark{transform:translate(1px,-1px);color:#65472f}.lof-ci-filter:hover,.lof-ci-filter:focus-visible{transform:translateY(-2px);background:radial-gradient(circle at 18% 0,rgba(255,255,255,.94),transparent 42%),linear-gradient(145deg,#fff7df,#ead4a5);border-color:rgba(104,72,28,.38);box-shadow:0 10px 22px rgba(58,39,17,.11),0 0 0 2px rgba(155,123,57,.045),inset 0 1px 0 rgba(255,255,255,.82);color:#4b331a;outline:none}.lof-ci-filter.is-active{background:radial-gradient(circle at 20% 0,rgba(255,232,181,.22),transparent 38%),linear-gradient(145deg,#75543b,#513723);color:#fff8ea;font-weight:900;border-color:#684a34;box-shadow:0 7px 17px rgba(77,53,36,.22),inset 0 1px 0 rgba(255,255,255,.16)}.lof-ci-filter.is-active .lof-ci-filter-icon{color:#f5d69a}.lof-ci-filter.is-active .lof-ci-filter-count{background:rgba(255,255,255,.14);color:#fff2d6}.lof-ci-filter-separator{grid-column:1/-1;height:1px;margin:1px 0;background:linear-gradient(90deg,transparent,rgba(101,73,44,.18),transparent)}
.lof-ci-filter-participants{grid-column:1/-1!important;background:linear-gradient(145deg,rgba(255,250,238,.88),rgba(226,211,181,.74))!important;border-color:rgba(115,84,48,.22)!important}.lof-ci-filter-participants.is-active{background:radial-gradient(circle at 20% 0,rgba(255,232,181,.18),transparent 42%),linear-gradient(145deg,#75543b,#513723)!important}
.lof-ci-participant-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:2px 0 12px;padding:14px 14px;border:1px solid rgba(104,76,47,.16);border-radius:18px;background:radial-gradient(circle at 92% 0,rgba(210,174,104,.16),transparent 34%),linear-gradient(145deg,rgba(255,255,255,.76),rgba(238,225,201,.72));box-shadow:0 7px 18px rgba(58,39,22,.06)}.lof-ci-participant-head>div{min-width:0}.lof-ci-participant-kicker{margin-bottom:5px;color:#947350;font:900 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.14em}.lof-ci-participant-head strong{display:block;color:#4b3829;font:700 16px/1.18 Georgia,"Times New Roman",serif}.lof-ci-participant-head span{display:block;margin-top:5px;color:#7e6a58;font:500 10px/1.35 Arial,sans-serif}.lof-ci-participant-refresh{appearance:none;flex:0 0 auto;border:1px solid rgba(103,76,47,.18);border-radius:999px;background:rgba(255,255,255,.72);color:#674c35;padding:8px 10px;cursor:pointer;font:900 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em}.lof-ci-participant-refresh:hover,.lof-ci-participant-refresh:focus-visible{border-color:rgba(151,108,52,.52);background:#fff8e8;outline:none}.lof-ci-participant-refresh:disabled{opacity:.48;cursor:default}.lof-ci-participant-list{display:flex;flex-direction:column;gap:8px;padding-bottom:8px}.lof-ci-participant-card{appearance:none;width:100%;display:grid;grid-template-columns:48px minmax(0,1fr) auto;align-items:center;gap:11px;padding:10px 11px;border:1px solid rgba(96,70,45,.12);border-left:4px solid rgba(155,123,57,.38);border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.74),rgba(245,235,217,.66));color:#453529;text-decoration:none!important;text-align:left;cursor:pointer;overflow:hidden;box-shadow:0 5px 14px rgba(58,39,22,.05);transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease}.lof-ci-participant-card:hover,.lof-ci-participant-card:focus-visible{transform:translateY(-2px);border-color:rgba(151,108,52,.38);background:linear-gradient(145deg,#fffaf0,#edd9b7);box-shadow:0 10px 22px rgba(58,39,22,.10);outline:none}.lof-ci-participant-icon{position:relative;width:46px;height:46px;border-radius:14px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#76573d,#4d3728);border:1px solid rgba(89,61,40,.32);box-shadow:inset 0 1px 0 rgba(255,255,255,.15)}.lof-ci-participant-icon img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .16s ease}.lof-ci-participant-icon img.is-ready{opacity:1}.lof-ci-participant-icon-fallback{color:#f0d59d;font:900 16px/1 Georgia,serif}.lof-ci-participant-copy{min-width:0;overflow:hidden;white-space:nowrap}.lof-ci-participant-user{margin-bottom:3px;color:#8a6a49;font:900 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lof-ci-participant-title{color:#4a382b;font:700 13px/1.2 Georgia,"Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lof-ci-participant-meta{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;min-width:0;overflow:hidden;white-space:nowrap;margin-top:5px;color:#887460;font:700 8px/1.15 Arial,sans-serif}.lof-ci-participant-meta>*{flex:0 0 auto;white-space:nowrap}.lof-ci-participant-meta strong{color:#765634}.lof-ci-participant-open{color:#9b7547;font:900 20px/1 Georgia,serif}.lof-ci-participant-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:150px;padding:22px;border:1px dashed rgba(103,76,47,.19);border-radius:18px;background:rgba(255,255,255,.38);color:#806b58;text-align:center}.lof-ci-participant-state strong{color:#584433;font:700 14px/1.2 Georgia,"Times New Roman",serif}.lof-ci-participant-state span{max-width:300px;font:500 10px/1.4 Arial,sans-serif}.lof-ci-participant-state.is-error{border-color:rgba(137,71,58,.26);background:rgba(154,80,67,.05)}.lof-ci-participant-spinner{font-size:18px!important;color:#a27b49;animation:lof-ci-participant-spin 1.6s linear infinite}@keyframes lof-ci-participant-spin{to{transform:rotate(360deg)}}
.lof-ci-headline{padding:11px 12px 0;background:rgba(255,255,255,.08)}.lof-ci-headline:empty{display:none!important}.lof-ci-headline .lof-ci-card{margin-bottom:4px}
.lof-ci-scroll{flex:1 1 auto;min-height:0;overflow:auto;padding:4px 12px 8px;overscroll-behavior:contain;scroll-behavior:auto;scrollbar-width:thin;scrollbar-color:rgba(138,103,61,.72) rgba(255,255,255,.12)}.lof-ci-scroll::-webkit-scrollbar{width:10px}.lof-ci-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,.12);border-radius:999px}.lof-ci-scroll::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(176,138,83,.90),rgba(119,84,47,.88));border-radius:999px;border:2px solid rgba(248,241,229,.72)}.lof-ci-scroll::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,rgba(188,149,92,.96),rgba(127,90,51,.94))}.lof-ci-pagination{flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:6px;min-height:45px;padding:7px 12px 9px;border-top:1px solid rgba(92,67,46,.11);background:linear-gradient(180deg,rgba(247,238,220,.64),rgba(231,215,189,.88));box-shadow:0 -5px 15px rgba(57,41,28,.035);overflow:hidden}.lof-ci-pagination[hidden]{display:none!important}.lof-ci-page-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;min-width:31px;height:31px;padding:0 8px;border:1px solid rgba(98,70,43,.16);border-radius:10px;background:rgba(255,252,244,.72);color:#66503c;font:800 10px/1 Arial,sans-serif;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.70),0 2px 7px rgba(57,41,28,.04);transition:transform .14s ease,border-color .14s ease,background .14s ease,box-shadow .14s ease}.lof-ci-page-btn:hover,.lof-ci-page-btn:focus-visible{transform:translateY(-1px);border-color:rgba(133,94,43,.40);background:#fff8e8;box-shadow:0 6px 13px rgba(57,41,28,.08);outline:none}.lof-ci-page-btn.is-active{background:linear-gradient(145deg,#745239,#513724);color:#fff6e6;border-color:#67472f;box-shadow:0 5px 12px rgba(62,41,24,.17),inset 0 1px 0 rgba(255,255,255,.13)}.lof-ci-page-btn[disabled]{opacity:.36;cursor:default;transform:none;box-shadow:none}.lof-ci-page-gap{display:inline-flex;align-items:center;justify-content:center;width:18px;color:#9a8168;font:800 10px/1 Arial,sans-serif}.lof-ci-page-info{margin-left:4px;padding-left:8px;border-left:1px solid rgba(98,70,43,.12);color:#8b735d;font:700 9px/1 Arial,sans-serif;white-space:nowrap}.lof-ci-hall-jump-target{scroll-margin-top:120px!important;position:relative!important;outline:2px solid rgba(151,108,52,.72)!important;outline-offset:4px!important;border-radius:10px!important;background:linear-gradient(90deg,rgba(255,235,180,.28),rgba(255,250,233,.14))!important;box-shadow:0 0 0 6px rgba(151,108,52,.08),0 9px 26px rgba(75,50,25,.12)!important;transition:outline-color .25s ease,box-shadow .25s ease,background .25s ease!important}.lof-ci-day{font:800 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.11em;color:#8b7662;padding:7px 5px 5px}
.lof-ci-card{position:relative;display:block;width:100%;box-sizing:border-box;text-align:left;border:1px solid rgba(91,67,46,.17);border-left:4px solid rgba(101,76,54,.42);border-radius:16px;background:radial-gradient(circle at 100% 0,rgba(198,162,100,.07),transparent 24%),linear-gradient(145deg,rgba(255,255,255,.68),rgba(255,255,255,.42));padding:10px 13px 9px 13px;margin:0 0 7px;color:inherit;cursor:pointer;box-shadow:0 4px 12px rgba(57,42,21,.05),inset 0 1px 0 rgba(255,255,255,.58);transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease,opacity .16s ease;overflow:hidden}.lof-ci-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 0%,transparent 38%,rgba(255,241,205,.20) 49%,transparent 60%);transform:translateX(-120%);transition:transform .55s ease}.lof-ci-card:hover::before,.lof-ci-card:focus-visible::before{transform:translateX(120%)}.lof-ci-card:hover,.lof-ci-card:focus-visible{transform:translateY(-1px) scale(1.003);border-color:rgba(155,123,57,.58);background:linear-gradient(145deg,rgba(255,255,255,.73),rgba(195,160,96,.08));box-shadow:0 13px 30px rgba(42,29,18,.11),0 0 0 3px rgba(155,123,57,.055);outline:none}.lof-ci-card.is-read{opacity:.76}.lof-ci-card.is-read:hover,.lof-ci-card.is-read:focus-visible{opacity:.95}.lof-ci-card:not(.is-read)::after{content:"";position:absolute;right:10px;top:10px;width:7px;height:7px;border-radius:50%;background:#8c4a38;box-shadow:0 0 0 4px rgba(140,74,56,.10)}.lof-ci-card.is-fresh{animation:lof-ci-fresh-in .34s ease both}@keyframes lof-ci-fresh-in{from{opacity:0;transform:translateY(-7px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}
.lof-ci-card.is-headline{padding:19px 17px 16px;border-width:1px;border-left-width:6px;background:radial-gradient(circle at 88% 8%,rgba(184,145,86,.14),transparent 38%),rgba(255,255,255,.64);box-shadow:0 10px 26px rgba(57,41,28,.11)}.lof-ci-card.is-headline .lof-ci-card-title{font-size:19px}.lof-ci-headline-ribbon{display:inline-flex;align-items:center;margin:0 0 8px;padding:5px 8px;border-radius:999px;background:#654832;color:#fff7eb;font:800 9px/1 Arial,sans-serif;letter-spacing:.11em;box-shadow:0 3px 9px rgba(57,41,28,.10)}.lof-ci-card[data-priority="urgent"]{border-color:rgba(139,49,42,.34);border-left-color:#a23f38;background:linear-gradient(90deg,rgba(162,63,56,.105),rgba(255,255,255,.55))}.lof-ci-card[data-priority="urgent"] .lof-ci-headline-ribbon{background:#8d3731;box-shadow:0 0 0 4px rgba(141,55,49,.08)}.lof-ci-card[data-priority="important"]:not([data-priority="urgent"]){border-left-color:#a8793e}
.lof-ci-kind{display:flex;align-items:center;gap:6px;font:800 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.075em;color:#8a735f;margin-bottom:4px}.lof-ci-kind-icon{display:inline-flex;align-items:center;justify-content:center;width:17px;height:17px;border-radius:50%;background:rgba(155,123,57,.08);color:#86683e;font:800 10px/1 Georgia,serif}.lof-ci-card-title{font:700 14px/1.20 Georgia,"Times New Roman",serif;padding-right:35px}.lof-ci-card-desc{font-size:11px;line-height:1.35;color:#685544;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.lof-ci-meta{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px;color:#88715c;font-size:9px}.lof-ci-meta strong{font-size:9px}.lof-ci-agency-stamp{font-weight:700;color:#8a7056}
.lof-ci-card[data-rarity="relic"]{border-left-color:#a63e38;background:linear-gradient(90deg,rgba(166,62,56,.08),rgba(255,255,255,.50))}.lof-ci-card[data-rarity="legendary"]{border-left-color:#b68c45;background:linear-gradient(90deg,rgba(182,140,69,.12),rgba(255,255,255,.52));box-shadow:0 3px 13px rgba(182,140,69,.13)}.lof-ci-card[data-rarity="mythic"]{border-left-color:#8c5da5;background:linear-gradient(110deg,rgba(112,82,169,.10),rgba(208,97,133,.08),rgba(90,154,174,.09),rgba(255,255,255,.50));background-size:220% 220%}.lof-ci-card[data-rarity="mythic"] .lof-ci-card-title{background:linear-gradient(90deg,#8754a6,#b55781,#a17b3f,#448c92,#8754a6);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:lof-ci-mythic 5s linear infinite}@keyframes lof-ci-mythic{to{background-position:220% 0}}
.lof-ci-empty{padding:48px 25px;text-align:center;color:#806c59}.lof-ci-empty-mark{font:42px/1 Georgia,serif;margin-bottom:10px;color:#6a5039}.lof-ci-empty strong{display:block;font:700 17px/1.25 Georgia,serif;color:#4e3a2a;margin-bottom:7px}
.lof-ci-invite{margin:14px;border:1px solid rgba(90,65,44,.20);border-radius:22px;padding:21px;background:radial-gradient(circle at top right,rgba(255,255,255,.72),transparent 42%),linear-gradient(145deg,#f5eddf,#deccb0);box-shadow:0 8px 28px rgba(64,45,31,.13);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}.lof-ci-invite:hover{transform:translateY(-2px);border-color:rgba(155,123,57,.42);box-shadow:0 12px 30px rgba(25,20,14,.10)}.lof-ci-invite-mark{font:38px/1 Georgia,serif;color:#6b4c35}.lof-ci-invite-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.11em;color:#8c7159;margin-top:10px}.lof-ci-invite h3{font:700 21px/1.15 Georgia,serif;margin:6px 0 9px}.lof-ci-invite p{font-size:13px;line-height:1.55;color:#65513f}.lof-ci-invite-features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}.lof-ci-invite-feature{font-size:11px;padding:9px;border-radius:13px;background:rgba(255,255,255,.48);border:1px solid rgba(91,68,47,.11);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}.lof-ci-invite-feature:hover{transform:translateY(-2px);border-color:rgba(155,123,57,.36);box-shadow:0 7px 16px rgba(25,20,14,.06)}.lof-ci-primary,.lof-ci-secondary{display:inline-block;text-decoration:none!important;border-radius:13px;padding:10px 13px;font-weight:700;font-size:12px;margin:3px 4px 0 0;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.lof-ci-primary{background:#604631;color:#fff!important;box-shadow:0 3px 9px rgba(64,45,31,.16)}.lof-ci-secondary{border:1px solid rgba(86,62,43,.25);color:#4c3728!important;background:rgba(255,255,255,.42)}.lof-ci-primary:hover,.lof-ci-secondary:hover{transform:translateY(-1px);box-shadow:0 7px 17px rgba(25,20,14,.10);border-color:rgba(155,123,57,.46)}
.lof-ci-settings-pane{position:absolute;z-index:45;left:0;right:0;top:0;bottom:0;box-sizing:border-box;display:block;overflow-y:auto;overflow-x:hidden;padding:10px 16px 28px;border:0;border-radius:29px 29px 20px 20px;background:radial-gradient(circle at 10% -4%,rgba(255,255,255,.90),transparent 32%),linear-gradient(180deg,#fbf5e9 0%,#eee1ca 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.88);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(18px) scale(.985);transform-origin:50% 8%;transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.24,1),visibility 0s linear .34s;scrollbar-width:thin;scrollbar-color:rgba(138,103,61,.78) rgba(255,255,255,.10)}.lof-ci-settings-pane::-webkit-scrollbar{width:10px}.lof-ci-settings-pane::-webkit-scrollbar-track{background:rgba(255,255,255,.10);border-radius:999px}.lof-ci-settings-pane::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(179,142,87,.92),rgba(120,85,48,.90));border-radius:999px;border:2px solid rgba(248,241,229,.76)}.lof-ci-settings-pane::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,rgba(190,152,95,.98),rgba(128,92,52,.95))}.lof-ci-settings-pane.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1);transition:opacity .30s ease .02s,transform .36s cubic-bezier(.2,.78,.24,1),visibility 0s linear 0s}
#${PANEL_ID}.is-settings-open>.lof-ci-head,#${PANEL_ID}.is-settings-open>.lof-ci-filters,#${PANEL_ID}.is-settings-open>.lof-ci-weekly,#${PANEL_ID}.is-settings-open>.lof-ci-daily,#${PANEL_ID}.is-settings-open>.lof-ci-headline,#${PANEL_ID}.is-settings-open>.lof-ci-scroll{opacity:.08;filter:blur(2px);pointer-events:none;transform:scale(.988);transition:opacity .24s ease,filter .24s ease,transform .28s ease}
.lof-ci-settings-grid{display:grid;grid-template-columns:1fr;gap:8px}.lof-ci-sound-fixed{cursor:default}.lof-ci-sound-fixed:hover{transform:none}.lof-ci-sound-status{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;margin-left:auto;padding:7px 10px;border:1px solid rgba(91,68,47,.18);border-radius:999px;background:linear-gradient(145deg,#6f5037,#4f3424);color:#fff4dd;font:900 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em;box-shadow:0 4px 11px rgba(62,40,22,.15),inset 0 1px 0 rgba(255,255,255,.14)}.lof-ci-sound-status::before{content:"";width:7px;height:7px;border-radius:50%;background:#dfc17d;box-shadow:0 0 0 3px rgba(223,193,125,.12),0 0 10px rgba(223,193,125,.20)}.lof-ci-setting{display:flex;align-items:center;gap:12px;min-height:54px;padding:13px 14px;border:1px solid rgba(91,68,47,.13);border-radius:18px;background:radial-gradient(circle at 100% 0,rgba(196,160,99,.08),transparent 28%),linear-gradient(145deg,rgba(255,255,255,.66),rgba(255,255,255,.40));font-size:13px;cursor:pointer;box-shadow:0 5px 13px rgba(57,41,28,.04),inset 0 1px 0 rgba(255,255,255,.55);transition:border-color .18s ease,background .18s ease,transform .18s ease,box-shadow .18s ease}.lof-ci-setting:hover,.lof-ci-setting:focus-within{transform:translateY(-3px);border-color:rgba(155,123,57,.52);background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(178,139,75,.08));box-shadow:0 12px 27px rgba(25,20,14,.09),0 0 0 3px rgba(155,123,57,.05)}.lof-ci-setting input{appearance:none;-webkit-appearance:none;flex:0 0 auto;width:40px;height:23px;margin:0;border:1px solid rgba(92,67,46,.24);border-radius:999px;background:#cbbca8;position:relative;cursor:pointer;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease}.lof-ci-setting input::after{content:"";position:absolute;width:17px;height:17px;left:2px;top:2px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.22);transition:transform .18s ease}.lof-ci-setting input:checked{background:#6b4c35;border-color:#6b4c35;box-shadow:0 0 0 3px rgba(107,76,53,.08)}.lof-ci-setting input:checked::after{transform:translateX(17px)}.lof-ci-setting input:focus-visible{outline:2px solid rgba(107,76,53,.34);outline-offset:3px}.lof-ci-setting-text{display:flex;flex-direction:column;gap:3px;min-width:0}.lof-ci-setting-text strong{font:700 13px/1.25 Arial,sans-serif;color:#4f3a2b}.lof-ci-setting-text small{font:400 11px/1.35 Arial,sans-serif;color:#866f5b}.lof-ci-setting-note{font-size:10px;color:#826e5b;margin-top:10px;line-height:1.4;padding:0 2px}
.lof-ci-weekly{position:relative;z-index:6;pointer-events:auto;margin:11px 13px 0;padding:12px 13px;border:1px solid rgba(92,67,46,.13);border-radius:19px;background:linear-gradient(145deg,rgba(255,255,255,.62),rgba(155,123,57,.06));box-shadow:0 5px 14px rgba(57,41,28,.05)}.lof-ci-weekly-kicker{font:800 10px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:#967653;margin-bottom:8px}.lof-ci-weekly-values{position:relative;z-index:7;display:flex;gap:7px;flex-wrap:wrap}.lof-ci-weekly-values span,.lof-ci-weekly-values a,.lof-ci-weekly-values button{padding:7px 9px;border-radius:999px;background:rgba(255,255,255,.56);border:1px solid rgba(91,68,47,.10);font:700 11px/1 Arial,sans-serif;color:#715d4a}.lof-ci-weekly-values a,.lof-ci-weekly-values button{appearance:none}.lof-ci-weekly-values button{font-family:Arial,sans-serif}.lof-ci-weekly-values strong{color:#4d392a}.lof-ci-daily{padding:10px 12px 0}.lof-ci-daily:empty{display:none}.lof-ci-daily-label{display:flex;align-items:center;gap:7px;margin:0 3px 7px;font:800 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.12em;color:#947350}.lof-ci-daily-label::before{content:"✦";font-size:12px}.lof-ci-card.is-daily{border-left-width:5px;border-color:rgba(171,132,62,.38);background:radial-gradient(circle at 92% 5%,rgba(226,191,122,.18),transparent 34%),linear-gradient(145deg,rgba(255,255,255,.72),rgba(177,139,77,.08));box-shadow:0 10px 25px rgba(67,45,25,.11)}.lof-ci-card.is-daily .lof-ci-card-title{font-size:16px}.lof-ci-favorite{position:absolute;right:8px;top:8px;z-index:4;width:27px;height:27px;border:1px solid rgba(91,68,47,.16);border-radius:50%;background:rgba(255,255,255,.74);color:#8a735e;font:700 15px/24px Georgia,serif;text-align:center;cursor:pointer;box-shadow:0 3px 9px rgba(57,41,28,.07);transition:transform .16s ease,color .16s ease,background .16s ease,border-color .16s ease}.lof-ci-favorite:hover,.lof-ci-favorite:focus-visible{transform:scale(1.10) rotate(-6deg);color:#a6762f;border-color:rgba(166,118,47,.42);background:#fff8e9;outline:none}.lof-ci-favorite.is-active{color:#a66d20;background:linear-gradient(145deg,#fff7d9,#f3ddb0);border-color:rgba(166,109,32,.34);text-shadow:0 1px 5px rgba(166,109,32,.16)}.lof-ci-card-title{padding-right:44px}.lof-ci-fresh-badge{display:inline-flex;align-items:center;padding:3px 6px;border-radius:999px;background:#7f473b;color:#fff8ed;font:800 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;box-shadow:0 2px 7px rgba(112,55,45,.16)}.lof-ci-community-badge{display:inline-flex;align-items:center;padding:3px 6px;border-radius:999px;background:rgba(88,105,78,.12);color:#5d7255;border:1px solid rgba(88,105,78,.16);font:800 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.07em}.lof-ci-card[data-community="1"]{border-right:1px solid rgba(87,113,75,.16)}.lof-ci-card-action{display:flex;align-items:center;justify-content:flex-end;margin-top:6px;padding-top:5px;border-top:1px solid rgba(98,70,43,.075);color:#86643f;font:900 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.055em;opacity:.82}.lof-ci-card:hover .lof-ci-card-action,.lof-ci-card:focus-visible .lof-ci-card-action{opacity:1;color:#63452d}.lof-ci-catalog-jump-target{scroll-margin-top:110px!important;outline:2px solid rgba(151,108,52,.74)!important;outline-offset:5px!important;border-radius:12px!important;box-shadow:0 0 0 7px rgba(151,108,52,.09),0 12px 28px rgba(75,50,25,.13)!important;transition:outline-color .25s ease,box-shadow .25s ease!important}

.lof-ci-tooltip{position:fixed;z-index:930;max-width:270px;padding:10px 12px;border:1px solid rgba(95,70,48,.28);border-radius:13px;background:linear-gradient(180deg,rgba(61,43,31,.985),rgba(43,30,22,.985));color:#fff8ed;font:600 11px/1.38 Arial,sans-serif;letter-spacing:.005em;box-shadow:0 12px 32px rgba(0,0,0,.27),inset 0 1px 0 rgba(255,255,255,.08);pointer-events:none;opacity:0;transform:translateY(5px) scale(.985);transition:opacity .14s ease,transform .14s ease;white-space:normal}.lof-ci-tooltip.is-visible{opacity:1;transform:translateY(0) scale(1)}.lof-ci-tooltip strong{display:block;color:#f4dba9;font:800 10px/1.2 Arial,sans-serif;text-transform:uppercase;letter-spacing:.09em;margin-bottom:3px}.lof-ci-tooltip::after{content:"";position:absolute;width:8px;height:8px;background:#302219;border-left:1px solid rgba(95,70,48,.28);border-top:1px solid rgba(95,70,48,.28);transform:rotate(45deg);left:18px;top:-5px}.lof-ci-control-hint{font-weight:400;color:#e6d9c9}.lof-ci-settings,.lof-ci-collapse,.lof-ci-read-all,.lof-ci-archive-toggle,.lof-ci-filter,.lof-ci-favorite,#${TAB_ID}{-webkit-tap-highlight-color:transparent}

/* 1.6.0 — polished help cards, sort and sound settings */
#${TAB_ID}{width:104px;min-height:222px;padding:17px 10px;gap:10px;border-radius:36px 0 0 36px;background:radial-gradient(circle at 22% 8%,rgba(255,235,193,.52),transparent 30%),radial-gradient(circle at 78% 20%,rgba(255,202,106,.18),transparent 22%),linear-gradient(180deg,#9a7450 0%,#6d4a31 45%,#38251a 100%);box-shadow:-16px 22px 54px rgba(32,19,11,.42),inset 0 1px 0 rgba(255,255,255,.25),inset 0 0 22px rgba(255,226,167,.08)}
#${TAB_ID}::before{display:none!important}
#${TAB_ID} .lof-ci-tab-emblem{writing-mode:horizontal-tb;display:flex;align-items:flex-start;justify-content:center;position:relative;width:51px;height:44px;border-radius:10px 10px 13px 13px;background:radial-gradient(circle at 25% 15%,rgba(255,255,255,.55),transparent 32%),linear-gradient(145deg,#fff4d6,#d7b980);border:1px solid rgba(70,45,26,.56);box-shadow:0 8px 19px rgba(24,14,8,.32),inset 0 1px 0 rgba(255,255,255,.78);transform:rotate(-2deg);overflow:hidden;color:#5d4028}
#${TAB_ID} .lof-ci-tab-emblem::before{content:"";position:absolute;left:9px;right:9px;top:22px;height:2px;background:#866344;box-shadow:0 5px 0 rgba(134,99,68,.78),0 10px 0 rgba(134,99,68,.55)}
#${TAB_ID} .lof-ci-tab-emblem::after{content:"";position:absolute;right:0;top:0;border-style:solid;border-width:0 0 11px 11px;border-color:transparent transparent #b18b56 transparent;filter:drop-shadow(-1px 1px 0 rgba(80,51,28,.28))}
#${TAB_ID} .lof-ci-tab-emblem span{position:relative;z-index:2;margin-top:6px;padding:2px 6px;border-radius:999px;background:#6a4930;color:#fff1cb;font:900 8px/1 Arial,sans-serif;letter-spacing:.10em}
#${TAB_ID}.has-unread .lof-ci-tab-emblem{box-shadow:0 8px 20px rgba(24,14,8,.34),0 0 0 4px rgba(230,187,104,.14),0 0 28px rgba(236,191,107,.30),inset 0 1px 0 rgba(255,255,255,.78)}
#${TAB_ID} .lof-ci-tab-label{font-size:18px;letter-spacing:.08em}
#${TAB_ID} .lof-ci-tab-mini{font-size:8px;letter-spacing:.13em;padding:6px 8px;background:rgba(27,15,10,.26)}
.lof-ci-sort-wrap{display:flex;align-items:center;gap:7px;min-width:0;padding:4px 7px 4px 9px;border:1px solid rgba(91,68,47,.13);border-radius:13px;background:rgba(255,255,255,.48);font:800 8px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#8b725b}.lof-ci-sort-wrap span{white-space:nowrap}.lof-ci-sort{max-width:138px;border:0;background:transparent;color:#5a4331;font:700 10px/1.2 Arial,sans-serif;outline:none;cursor:pointer;text-transform:none;letter-spacing:0}.lof-ci-sort option{color:#3f3025;background:#fffaf0}
.lof-ci-settings-slides{position:relative;display:block;min-height:0}.lof-ci-settings-section{display:none;padding:2px 0 9px}.lof-ci-settings-section.is-active{display:block}.lof-ci-settings-section.is-sound .lof-ci-settings-grid{grid-template-columns:1fr}.lof-ci-settings-section.is-sound .lof-ci-setting{min-height:58px}.lof-ci-settings-section.is-sound .lof-ci-sound-fixed{align-items:center}.lof-ci-settings-section.is-sound .lof-ci-setting-volume{grid-template-columns:minmax(0,1fr);gap:11px}.lof-ci-settings-section.is-sound .lof-ci-volume-actions{justify-content:flex-start}.lof-ci-settings-section.is-sound .lof-ci-volume-pills{justify-content:flex-start}.lof-ci-settings-title{margin:0 2px 10px;font:900 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.13em;color:#8c6b49}.lof-ci-settings-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.lof-ci-setting{min-height:62px;align-items:flex-start}.lof-ci-settings-nav{position:sticky;z-index:13;bottom:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;gap:7px;margin:12px 0 0;padding:10px 0 2px;background:linear-gradient(180deg,rgba(244,234,215,0),rgba(244,234,215,.96) 24%,rgba(244,234,215,.995) 100%)}.lof-ci-settings-nav-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;min-width:0;min-height:36px;border:1px solid rgba(103,76,47,.20);border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,.84),rgba(238,222,193,.82));color:#5f4733;padding:8px 8px;cursor:pointer;font:900 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.045em;box-shadow:0 4px 11px rgba(57,41,28,.07),inset 0 1px 0 rgba(255,255,255,.72);transition:transform .15s ease,border-color .15s ease,background .15s ease,box-shadow .15s ease,color .15s ease}.lof-ci-settings-nav-btn:hover,.lof-ci-settings-nav-btn:focus-visible{transform:translateY(-1px);border-color:rgba(155,123,57,.48);background:linear-gradient(180deg,#fffaf0,#ead2a8);box-shadow:0 7px 15px rgba(57,41,28,.10);outline:none}.lof-ci-settings-nav-btn.is-active{background:linear-gradient(145deg,#735039,#4f3524);border-color:#684a34;color:#fff5e4;box-shadow:0 7px 17px rgba(65,42,24,.18),inset 0 1px 0 rgba(255,255,255,.14)}
.lof-ci-setting-volume{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:14px;min-height:90px}.lof-ci-volume-actions{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:8px}
.lof-ci-setting-volume .lof-ci-setting-text{min-width:0}
.lof-ci-volume-pills{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:8px}
.lof-ci-volume-pill{appearance:none;border:1px solid rgba(108,77,40,.18);border-radius:999px;background:linear-gradient(145deg,rgba(255,252,243,.96),rgba(234,216,183,.88));color:#5e4330;padding:9px 12px;min-width:84px;cursor:pointer;font:800 10px/1 Arial,sans-serif;box-shadow:0 4px 12px rgba(60,41,22,.07),inset 0 1px 0 rgba(255,255,255,.80);transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease,color .16s ease}
.lof-ci-volume-pill:hover,.lof-ci-volume-pill:focus-visible{transform:translateY(-1px);border-color:rgba(126,87,38,.42);background:linear-gradient(145deg,#fff8e7,#efd7ac);box-shadow:0 8px 16px rgba(60,41,22,.11),0 0 0 2px rgba(151,108,52,.06);outline:none}
.lof-ci-volume-pill.is-active{background:radial-gradient(circle at 20% 0,rgba(255,232,181,.18),transparent 42%),linear-gradient(145deg,#75543b,#513723);color:#fff6e8;border-color:#684a34;box-shadow:0 7px 17px rgba(77,53,36,.18),inset 0 1px 0 rgba(255,255,255,.15)}
.lof-ci-settings-top{position:sticky;z-index:14;top:0;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr);gap:11px;width:100%;max-width:100%;margin:0 0 14px;padding:14px 14px 13px;border:1px solid rgba(117,82,42,.22);border-radius:20px;background:radial-gradient(circle at 8% 0,rgba(255,255,255,.97),transparent 42%),linear-gradient(145deg,rgba(249,238,214,.998),rgba(230,204,157,.998));box-shadow:0 8px 20px rgba(59,40,20,.11),inset 0 1px 0 rgba(255,255,255,.86);backdrop-filter:blur(9px);overflow:hidden}
.lof-ci-settings-top-copy{min-width:0}.lof-ci-settings-top-kicker{margin:0 0 4px;color:#9b774a;font:900 7px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.13em}.lof-ci-settings-top-title{color:#4d351f;font:700 19px/1.12 Georgia,"Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lof-ci-settings-top-actions{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:8px;width:100%;min-width:0}.lof-ci-settings-top-actions button{box-sizing:border-box;justify-content:center;min-width:0;width:100%;max-width:100%;overflow:hidden}.lof-ci-settings-top-actions button span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lof-ci-settings-close,.lof-ci-settings-panel-close{appearance:none;flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(91,62,35,.28);border-radius:12px;background:linear-gradient(145deg,#735039,#4f3524);color:#fff5e4;padding:9px 11px;cursor:pointer;font:900 9px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.055em;box-shadow:0 6px 15px rgba(65,42,24,.16),inset 0 1px 0 rgba(255,255,255,.14);transition:transform .16s ease,box-shadow .16s ease,background .16s ease}.lof-ci-settings-panel-close{background:linear-gradient(145deg,#8a4e43,#63362f);border-color:rgba(111,54,46,.34)}.lof-ci-settings-close:hover,.lof-ci-settings-close:focus-visible,.lof-ci-settings-panel-close:hover,.lof-ci-settings-panel-close:focus-visible{transform:translateY(-2px);background:linear-gradient(145deg,#805b40,#573925);box-shadow:0 10px 21px rgba(65,42,24,.22),0 0 0 3px rgba(151,108,52,.08);outline:none}.lof-ci-settings-panel-close:hover,.lof-ci-settings-panel-close:focus-visible{background:linear-gradient(145deg,#99594d,#6d3a32)}
#${PANEL_ID}.is-settings-open .lof-ci-settings{background:linear-gradient(145deg,#75543b,#513723);color:#fff4df;border-color:#684a34;box-shadow:0 7px 18px rgba(77,53,36,.20),inset 0 1px 0 rgba(255,255,255,.14)}.lof-ci-sound-test-mini{appearance:none;display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(112,78,38,.24);border-radius:999px;background:linear-gradient(145deg,rgba(255,250,237,.96),rgba(231,211,171,.94));color:#62472d;padding:8px 11px;cursor:pointer;font:800 8px/1 Arial,sans-serif;letter-spacing:.035em;box-shadow:0 4px 10px rgba(60,41,22,.07),inset 0 1px 0 rgba(255,255,255,.76);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}.lof-ci-sound-test-mini:hover,.lof-ci-sound-test-mini:focus-visible{transform:translateY(-1px);border-color:rgba(126,87,38,.46);background:linear-gradient(145deg,#fff8e7,#e8cea0);box-shadow:0 7px 15px rgba(60,41,22,.11),0 0 0 2px rgba(151,108,52,.06);outline:none}
.lof-ci-resize-handle{position:absolute;z-index:80;left:0;right:0;bottom:0;height:14px;cursor:ns-resize;touch-action:none;user-select:none;background:linear-gradient(180deg,transparent,rgba(96,67,39,.055));outline:none}.lof-ci-resize-handle::before{content:"";position:absolute;left:50%;bottom:4px;width:48px;height:4px;border-radius:999px;background:linear-gradient(90deg,rgba(128,91,47,.16),rgba(111,75,39,.58),rgba(128,91,47,.16));box-shadow:0 1px 0 rgba(255,255,255,.65),0 -1px 4px rgba(72,45,23,.08);transform:translateX(-50%);transition:width .16s ease,background .16s ease,box-shadow .16s ease}.lof-ci-resize-handle:hover::before,.lof-ci-resize-handle:focus-visible::before,#${PANEL_ID}.is-resizing .lof-ci-resize-handle::before{width:68px;background:linear-gradient(90deg,rgba(128,91,47,.22),rgba(92,57,28,.78),rgba(128,91,47,.22));box-shadow:0 1px 0 rgba(255,255,255,.70),0 0 0 3px rgba(155,123,57,.07),0 -2px 7px rgba(72,45,23,.13)}.lof-ci-resize-handle:focus-visible{outline:none}#${PANEL_ID}.is-resizing{transition:none!important}#${PANEL_ID}.is-resizing .lof-ci-scroll{pointer-events:none}

#${PANEL_ID}.is-compact .lof-ci-card{padding-top:10px;padding-bottom:10px}.is-compact .lof-ci-card-desc{display:none}.is-compact .lof-ci-meta{margin-top:5px}.is-compact .lof-ci-card-title{font-size:13px}
.lof-ci-tooltip{position:fixed;z-index:100120;box-sizing:border-box;width:max-content;max-width:min(320px,calc(100vw - 24px));padding:12px 14px 13px;border:1px solid rgba(104,72,28,.30);border-radius:12px;color:#493722;background:radial-gradient(circle at 92% 14%,rgba(142,103,45,.09),transparent 32%),repeating-linear-gradient(0deg,rgba(120,86,39,.022) 0 1px,transparent 1px 5px),linear-gradient(145deg,rgba(255,249,226,.99) 0%,rgba(239,220,174,.99) 100%);box-shadow:0 14px 34px rgba(58,39,17,.18),0 3px 8px rgba(58,39,17,.09),inset 0 1px 0 rgba(255,255,255,.78),inset 3px 0 0 rgba(139,94,35,.16);font-family:inherit;line-height:1.35;text-align:left;pointer-events:none;opacity:0;visibility:hidden;transform:translateY(5px) scale(.985);transform-origin:center bottom;transition:opacity .14s ease,transform .14s ease,visibility .14s ease;white-space:normal}
.lof-ci-tooltip.is-visible{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
.lof-ci-tooltip-kicker{display:block;margin:0 0 5px;color:#9a7847;font-size:6.8px;font-weight:900;line-height:1.1;letter-spacing:1.15px;text-transform:uppercase}
.lof-ci-tooltip-kicker::before{content:"✦";display:inline-block;margin-right:5px;color:#7c5524;font-size:7px}
.lof-ci-tooltip strong{display:block;margin:0;color:#4b331a;font-family:Georgia,"Times New Roman",serif;font-size:12.5px;font-weight:700;line-height:1.22;letter-spacing:0;text-transform:none}
.lof-ci-control-hint{display:block;margin-top:6px;padding-top:6px;border-top:1px solid rgba(112,78,32,.12);color:#65523b;font-size:9.5px;font-weight:600;line-height:1.5;letter-spacing:0}
.lof-ci-tooltip::after{content:"";position:absolute;left:50%;bottom:-5px;width:8px;height:8px;border-right:1px solid rgba(116,85,39,.34);border-bottom:1px solid rgba(116,85,39,.34);background:#ead7a8;box-shadow:2px 2px 4px rgba(58,39,17,.05);transform:translateX(-50%) rotate(45deg)}
.lof-ci-tooltip.is-below{transform-origin:center top}.lof-ci-tooltip.is-below::after{top:-5px;bottom:auto;border:0;border-left:1px solid rgba(116,85,39,.34);border-top:1px solid rgba(116,85,39,.34);background:#fff5d6}
.lof-ci-tooltip.is-side::after{left:auto;right:-5px;top:50%;bottom:auto;transform:translateY(-50%) rotate(-45deg);border:0;border-right:1px solid rgba(116,85,39,.34);border-bottom:1px solid rgba(116,85,39,.34);background:#ead7a8}
.lof-ci-tooltip.is-side-right::after{left:-5px;right:auto;top:50%;bottom:auto;transform:translateY(-50%) rotate(135deg);border:0;border-right:1px solid rgba(116,85,39,.34);border-bottom:1px solid rgba(116,85,39,.34);background:#fff5d6}


.lof-ci-weekly-values button.lof-ci-weekly-link{position:relative;z-index:8;pointer-events:auto!important;touch-action:manipulation;font:inherit;appearance:none;-webkit-appearance:none}

.lof-ci-ach-summary-overlay{
    position:fixed;
    inset:0;
    z-index:100090;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:22px;
    box-sizing:border-box;
    background:rgba(15,12,9,.60);
    backdrop-filter:blur(4px);
    animation:lof-profile-overlay-in .20s ease both
}
.lof-ci-ach-summary{
    position:relative;
    width:min(650px,100%);
    max-height:min(88vh,920px);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    border:1px solid rgba(155,123,57,.40);
    border-radius:15px;
    background:#f1e8ce!important;
    color:#2a241c;
    box-shadow:0 24px 76px rgba(0,0,0,.34);
    animation:lof-profile-dialog-in .24s cubic-bezier(.2,.75,.2,1) both
}
.lof-ci-weekly-summary-dialog{width:min(620px,100%)}
.lof-ci-weekly-summary-metric{margin:2px 0 7px;font:900 34px/1 Georgia,"Times New Roman",serif;color:#6d512c}
.lof-ci-weekly-summary-intro{margin:0 0 14px;color:#665746;font-size:12px;line-height:1.45}
.lof-ci-weekly-summary-list{display:grid;gap:8px;max-height:48vh;overflow:auto;padding-right:3px}
.lof-ci-weekly-summary-row{position:relative;display:grid;gap:3px;padding:10px 12px;border:1px solid rgba(120,100,65,.16);border-radius:10px;background:rgba(255,255,255,.32)}
.lof-ci-weekly-summary-row strong{color:#3e3025;font-size:12px;line-height:1.3}
.lof-ci-weekly-summary-row span{color:#7a6855;font-size:10px;line-height:1.35}
.lof-ci-weekly-summary-row.is-link{padding-right:34px;color:inherit;text-decoration:none!important;cursor:pointer;transition:transform .15s ease,border-color .15s ease,background .15s ease,box-shadow .15s ease}
.lof-ci-weekly-summary-row[type="button"]{width:100%;font:inherit;text-align:left;appearance:none;-webkit-appearance:none}
.lof-ci-weekly-summary-row.is-link:hover,.lof-ci-weekly-summary-row.is-link:focus-visible{transform:translateY(-1px);border-color:rgba(151,108,52,.42);background:linear-gradient(145deg,#fffaf0,#edd9b7);box-shadow:0 7px 16px rgba(58,39,22,.08);outline:none}
.lof-ci-weekly-summary-open{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#9b7547;font:900 20px/1 Georgia,serif;font-style:normal}
.lof-ci-weekly-summary-empty{padding:16px 12px;border:1px dashed rgba(120,100,65,.25);border-radius:10px;color:#7a6855;text-align:center;font-size:11px}
@keyframes lof-profile-overlay-in{from{opacity:0}to{opacity:1}}
@keyframes lof-profile-dialog-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}

.lof-ci-ach-summary[data-rarity="common"]{border-color:rgba(139,129,118,.58)}
.lof-ci-ach-summary[data-rarity="unusual"],
.lof-ci-ach-summary[data-rarity="uncommon"]{border-color:rgba(95,140,104,.68)}
.lof-ci-ach-summary[data-rarity="notable"]{border-color:rgba(47,150,142,.72)}
.lof-ci-ach-summary[data-rarity="rare"]{border-color:rgba(82,122,163,.72)}
.lof-ci-ach-summary[data-rarity="exceptional"]{border-color:rgba(128,96,160,.74)}
.lof-ci-ach-summary[data-rarity="unique"]{border-color:rgba(191,61,103,.76)}
.lof-ci-ach-summary[data-rarity="exotic"]{border-color:rgba(208,120,47,.80)}
.lof-ci-ach-summary[data-rarity="relic"]{border-color:rgba(181,72,64,.84)}
.lof-ci-ach-summary[data-rarity="legendary"]{border-color:rgba(182,140,69,.82)}
.lof-ci-ach-summary[data-rarity="mythic"]{
    border-color:#8060a0;
    box-shadow:
        0 24px 76px rgba(0,0,0,.34),
        0 0 0 1px rgba(198,93,150,.30)
}

.lof-ci-ach-summary-head{
    display:block;
    padding:17px 19px 14px;
    border-bottom:1px solid rgba(120,100,65,.18);
    background:linear-gradient(135deg,rgba(155,123,57,.08),rgba(155,123,57,.015))
}
.lof-ci-ach-summary-head-copy{min-width:0}
.lof-ci-ach-summary-kicker{
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:8px;
    margin-bottom:3px;
    font-size:9px;
    font-weight:800;
    letter-spacing:.85px;
    text-transform:uppercase;
    opacity:.74
}
.lof-ci-ach-summary-kicker .lof-ci-ach-summary-rarity{font-weight:900}
.lof-ci-ach-summary-kicker .lof-ci-ach-summary-rarity[data-rarity="mythic"]{color:#8060a0;opacity:1}
.lof-ci-ach-summary-title{
    margin:0;
    font-family:Georgia,"Times New Roman",serif;
    font-size:24px;
    line-height:1.15
}
.lof-ci-ach-summary-subtitle{
    margin-top:5px;
    font-size:11px;
    line-height:1.45;
    opacity:.66
}
.lof-ci-ach-summary-x,
.lof-ci-ach-summary-close,
.lof-ci-ach-summary-profile{
    flex:0 0 auto;
    min-width:88px;
    height:34px;
    padding:0 13px;
    border:1px solid #a99562;
    border-radius:7px;
    background:#dfd2ae;
    color:#332b20;
    font:inherit;
    font-size:11px;
    font-weight:900;
    line-height:1;
    cursor:pointer;
    box-shadow:0 2px 5px rgba(43,33,20,.10)
}
.lof-ci-ach-summary-x:hover,
.lof-ci-ach-summary-x:focus-visible,
.lof-ci-ach-summary-close:hover,
.lof-ci-ach-summary-close:focus-visible,
.lof-ci-ach-summary-profile:hover,
.lof-ci-ach-summary-profile:focus-visible{
    background:#d6c69d;
    border-color:#897445;
    outline:none
}
.lof-ci-ach-summary-profile{min-width:150px}

.lof-ci-ach-summary-body{
    overflow:auto;
    padding:18px 19px 20px
}
.lof-ci-ach-summary-main{
    display:grid;
    grid-template-columns:150px minmax(0,1fr);
    gap:20px;
    align-items:start
}
.lof-ci-ach-summary-medal{
    min-height:148px;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    padding-top:38px
}
/*
 * Здесь используется РЕАЛЬНАЯ рамка иконки из профиля:
 * .lof-profile-rail-badge-image-wrap + её rarity pseudo-elements.
 * Мы только увеличиваем весь готовый узел transform'ом.
 */
.lof-ci-ach-summary-medal .lof-profile-rail-badge{
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:50px;
    padding:0;
    border:0;
    background:transparent;
    color:inherit;
    pointer-events:none
}
.lof-ci-ach-summary-medal .lof-profile-rail-badge-image-wrap{
    transform:scale(2.25);
    transform-origin:center center
}
.lof-ci-ach-summary-medal .lof-profile-rail-badge-image{
    opacity:0
}
.lof-ci-ach-summary-medal .lof-profile-rail-badge-image.is-ready{
    opacity:1;
    transform:scale(1)
}

.lof-ci-ach-summary-copy{min-width:0}
.lof-ci-ach-summary-description{
    margin-top:3px;
    font-size:12px;
    line-height:1.45;
    min-width:0;
    max-width:100%;
    overflow-wrap:anywhere;
    word-break:break-word
}
.lof-ci-ach-summary-secret{
    display:inline-flex;
    align-items:center;
    width:fit-content;
    margin-top:9px;
    padding:4px 7px;
    border:1px solid currentColor;
    border-radius:999px;
    color:#a36e8f;
    font-size:9px;
    font-weight:800;
    line-height:1;
    letter-spacing:.35px;
    text-transform:uppercase
}
.lof-ci-ach-summary-condition{
    margin-top:14px;
    padding:11px 13px;
    border-left:3px solid #9b7b39;
    background:rgba(155,123,57,.07)
}
.lof-ci-ach-summary-condition-label{
    margin-bottom:6px;
    font-size:9px;
    font-weight:800;
    letter-spacing:.75px;
    text-transform:uppercase;
    opacity:.62
}
.lof-ci-ach-summary-condition-text{
    font-size:10px;
    font-weight:750;
    line-height:1.45;
    overflow-wrap:anywhere;
    word-break:break-word
}
.lof-ci-ach-summary[data-achievement-id="znaet_sudbu_kevar"] .lof-ci-ach-summary-condition-text{
    color:#a44543;
    font-weight:900;
    letter-spacing:.55px
}
.lof-ci-ach-summary-footer{
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:6px;
    margin-top:12px
}
.lof-ci-ach-summary-points{
    color:#9b7b39;
    font-size:12px;
    font-weight:700
}
.lof-ci-ach-summary-rarity-pill,
.lof-ci-ach-summary-secret-pill{
    display:inline-flex;
    align-items:center;
    width:fit-content;
    padding:4px 7px;
    border:1px solid currentColor;
    border-radius:999px;
    font-size:9px;
    font-weight:800;
    line-height:1;
    letter-spacing:.35px;
    text-transform:uppercase
}
.lof-ci-ach-summary-rarity-pill[data-rarity="common"]{color:#8b8176}
.lof-ci-ach-summary-rarity-pill[data-rarity="uncommon"],
.lof-ci-ach-summary-rarity-pill[data-rarity="unusual"]{color:#5f8c68}
.lof-ci-ach-summary-rarity-pill[data-rarity="notable"]{color:#2f968e}
.lof-ci-ach-summary-rarity-pill[data-rarity="rare"]{color:#527aa3}
.lof-ci-ach-summary-rarity-pill[data-rarity="exceptional"]{color:#8060a0}
.lof-ci-ach-summary-rarity-pill[data-rarity="unique"]{color:#bf3d67}
.lof-ci-ach-summary-rarity-pill[data-rarity="exotic"]{color:#d0782f}
.lof-ci-ach-summary-rarity-pill[data-rarity="relic"]{color:#b54840}
.lof-ci-ach-summary-rarity-pill[data-rarity="legendary"]{color:#b68c45}
.lof-ci-ach-summary-rarity-pill[data-rarity="mythic"]{color:#8060a0}
.lof-ci-ach-summary-date,
.lof-ci-ach-summary-prevalence{
    font-size:11px;
    font-weight:700;
    opacity:.72;
    white-space:nowrap
}
.lof-ci-ach-summary-group{
    margin-top:16px;
    padding-top:13px;
    border-top:1px solid rgba(120,100,65,.22)
}
.lof-ci-ach-summary-group-title{
    margin-bottom:8px;
    font-family:Georgia,"Times New Roman",serif;
    font-size:14px;
    font-weight:700
}
.lof-ci-ach-summary-group-item{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    padding:8px 9px;
    margin-top:6px;
    border:1px solid rgba(120,100,65,.25);
    border-radius:8px;
    background:rgba(0,0,0,.025)
}
.lof-ci-ach-summary-group-item span{font-size:11px;font-weight:800}
.lof-ci-ach-summary-group-item small{font-size:9px;opacity:.68;text-align:right}

.lof-ci-ach-summary-actions{
    display:flex;
    justify-content:flex-end;
    gap:9px;
    margin-top:18px;
    padding-top:14px;
    border-top:1px solid rgba(120,100,65,.28)
}
@media(max-width:700px){
    .lof-ci-ach-summary-overlay{padding:8px}
    .lof-ci-ach-summary{max-height:94vh}
    .lof-ci-ach-summary-head,.lof-ci-ach-summary-body{padding-left:13px;padding-right:13px}
    .lof-ci-ach-summary-main{grid-template-columns:1fr}
    .lof-ci-ach-summary-medal{min-height:120px;padding-top:32px}
    .lof-ci-ach-summary-actions{flex-direction:column}
    .lof-ci-ach-summary-profile,.lof-ci-ach-summary-close{width:100%}
}

@media(prefers-reduced-motion:reduce){#${PANEL_ID},#${TAB_ID},.lof-ci-card,.lof-ci-setting,.lof-ci-card[data-rarity="mythic"] .lof-ci-card-title,.lof-ci-ticker-track,.lof-ci-ach-summary-overlay,.lof-ci-ach-summary{transition:none!important;animation:none!important}}
`;
    }

    function installStyles() {
        if (document.getElementById('lof-chronicle-inbox-style')) { return; }
        if (root.mw && mw.util && typeof mw.util.addCSS === 'function') {
            var node = mw.util.addCSS(cssText());
            if (node) { node.id = 'lof-chronicle-inbox-style'; }
            return;
        }
        var style = document.createElement('style');
        style.id = 'lof-chronicle-inbox-style';
        style.textContent = cssText();
        document.head.appendChild(style);
    }

    function renderInvite(panelBody) {
        var logged = isLoggedIn();
        var invite = document.createElement('div');
        invite.className = 'lof-ci-invite';
        if (logged) {
            invite.innerHTML =
                '<div class="lof-ci-invite-mark">✦</div>' +
                '<div class="lof-ci-invite-kicker">Летопись достижений</div>' +
                '<h3>Ваша Летопись ждёт первой записи</h3>' +
                '<p>Исследуйте Лофариан, читайте статьи, помогайте вики расти и участвуйте в разговорах. Летопись будет отмечать ваш путь наградами — от первых маленьких открытий до Реликтовых, Легендарных и Мифических достижений.</p>' +
                '<div class="lof-ci-invite-features"><div class="lof-ci-invite-feature">✦ Собирайте собственную коллекцию</div><div class="lof-ci-invite-feature">◆ Набирайте опыт и место в Зале славы</div><div class="lof-ci-invite-feature">◇ Открывайте скрытые награды</div><div class="lof-ci-invite-feature">✧ Следите за новыми достижениями</div></div>' +
                '<a class="lof-ci-primary" href="' + escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) + '">Начать свою Летопись</a>';
        } else {
            var signup = mw.util.getUrl('Special:Signup', { returnto: ACHIEVEMENTS_PAGE });
            var login = mw.util.getUrl('Special:UserLogin', { returnto: ACHIEVEMENTS_PAGE });
            invite.innerHTML =
                '<div class="lof-ci-invite-mark">✦</div>' +
                '<div class="lof-ci-invite-kicker">Летопись достижений</div>' +
                '<h3>Оставьте своё имя в Летописи</h3>' +
                '<p>Сейчас ваши открытия проходят мимо Летописи. Создайте учётную запись Fandom, а затем присоединитесь к программе — и награды, опыт, необычные открытия и ваша собственная коллекция смогут сохраняться за вами.</p>' +
                '<div class="lof-ci-invite-features"><div class="lof-ci-invite-feature">✦ Личная коллекция наград</div><div class="lof-ci-invite-feature">◆ Место в Зале славы</div><div class="lof-ci-invite-feature">◇ Редкие и скрытые открытия</div><div class="lof-ci-invite-feature">✧ Новости о новых достижениях</div></div>' +
                '<a class="lof-ci-primary" href="' + escapeHtml(signup) + '">Создать аккаунт и начать</a>' +
                '<a class="lof-ci-secondary" href="' + escapeHtml(login) + '">Уже есть аккаунт? Войти</a>';
        }
        panelBody.appendChild(invite);
    }

    function kindLabel(event) {
        if (event.type === 'achievement-earned') { return 'Получено достижение'; }
        if (event.type === 'catalog') { return event.subtype === 'rarity-change' ? 'Изменение награды' : 'Обновление каталога'; }
        if (event.type === 'rank') { return 'Зал славы'; }
        if (event.type === 'near-unlock') { return 'Почти открыто'; }
        if (event.type === 'news') {
            if (event.subtype === 'article-update') {
                return 'Обновление';
            }
            return eventIsCommunity(event) ? 'Сообщество' : (eventPriority(event) === 'urgent' ? 'Срочная новость' : 'Новость агентства');
        }
        if (event.type === 'chronicle') { return event.subtype === 'milestone' ? 'Запись Летописи' : 'Личная Летопись'; }
        return 'Новостное агентство DFC';
    }

    function safeEventCopyForRender(event) {
        var copy = clone(event);
        if (!copy || copy.type !== 'catalog' || !catalogCache) {
            return copy || event;
        }
        var ids = [];
        if (copy.achievementId) { ids.push(copy.achievementId); }
        (copy.items || []).forEach(function (item) { if (item && item.id) { ids.push(item.id); } });
        if (ids.length && ids.every(function (id) { return !(catalogCache.achievements && catalogCache.achievements[id]); })) {
            copy.title = 'Достижение больше недоступно';
            copy.description = 'Эта старая запись сохранена в архиве агентства, но соответствующей награды больше нет в текущем каталоге.';
            copy.rarity = 'common';
            copy.rarityTitle = '';
            copy.points = 0;
        }
        return copy;
    }

    function removeAchievementSummary() {
        var existing = document.getElementById(ACHIEVEMENT_SUMMARY_ID);
        if (existing) {
            existing.remove();
        }
    }

    function achievementSummaryTimestamp(value, fallback) {
        var stamp = Number(value || 0);
        if (stamp > 1000000000 && stamp < 1000000000000) {
            stamp *= 1000;
        }
        if (!stamp) {
            stamp = Number(fallback || 0);
        }
        return stamp;
    }

    function formatAchievementSummaryDate(value, fallback) {
        var stamp = achievementSummaryTimestamp(value, fallback);
        if (!stamp) { return ''; }
        var date = new Date(stamp);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) + ' · ' + date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function achievementSummaryItems(event) {
        if (!event) { return []; }

        var rawItems = Array.isArray(event.items) && event.items.length
            ? event.items
            : [{
                id: event.achievementId,
                title: event.title,
                earnedAt: event.earnedAt,
                rarity: event.rarity,
                points: event.points,
                secret: event.secret === true,
                hidden: event.hidden === true
            }];

        return rawItems.filter(function (item) {
            return item && item.id;
        }).map(function (item) {
            var id = String(item.id || '');
            var achievement = catalogCache && catalogCache.achievements
                ? catalogCache.achievements[id]
                : null;
            var rarity = achievement && catalogCache
                ? getRarityInfo(catalogCache, achievement)
                : {
                    key: String(item.rarity || event.rarity || 'common'),
                    title: String(event.rarityTitle || '')
                };

            return {
                id: id,
                title: achievement
                    ? achievementDisplayTitle(achievement)
                    : String(item.title || event.title || id),
                description: achievement
                    ? String(achievement.description || '')
                    : String(event.description || ''),
                rarity: String(rarity.key || item.rarity || event.rarity || 'common'),
                rarityTitle: String(rarity.title || event.rarityTitle || ''),
                points: achievement
                    ? achievementPoints(achievement)
                    : Number(item.points || event.points || 0),
                image: achievement
                    ? String(achievement.image || '')
                    : String(event.image || ''),
                secret: achievement
                    ? achievement.secret === true
                    : (item.secret === true || event.secret === true),
                hidden: achievement
                    ? achievement.hidden === true
                    : (item.hidden === true || event.hidden === true),
                earnedAt: Number(item.earnedAt || event.earnedAt || 0)
            };
        });
    }

    function normalizeSummaryFileName(fileName) {
        fileName = String(fileName || '').trim();
        if (!fileName) { return ''; }
        if (/^https?:\/\//i.test(fileName)) { return fileName; }
        return fileName.replace(/^(?:File|Файл):/i, '').trim();
    }

    function resolveSummaryImageUrl(fileName, achievementTitle, includeDefaultFallback) {
        var requested = normalizeSummaryFileName(fileName);
        var cleanTitle = String(achievementTitle || '').trim();
        var titleCandidate = normalizeSummaryFileName(
            cleanTitle ? cleanTitle + '.png' : ''
        );
        var fallback = normalizeSummaryFileName(catalogCache && catalogCache.defaultImage);
        var candidates = [];

        function pushUnique(candidate) {
            candidate = normalizeSummaryFileName(candidate);
            if (!candidate) { return; }
            var key = candidate.toLocaleLowerCase('ru');
            var exists = candidates.some(function (value) {
                return String(value || '').toLocaleLowerCase('ru') === key;
            });
            if (!exists) { candidates.push(candidate); }
        }

        function romanToArabic(value) {
            var map = {
                I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10
            };
            return Object.prototype.hasOwnProperty.call(map, value) ? map[value] : 0;
        }

        /*
         * 1.14.5: изображение ступени не должно теряться в DFC.
         * Сначала — ТОЧНОЕ image из каталога (например «Урожайный день I.png»).
         * Затем — точное отображаемое название, вариант с арабским номером и
         * базовое имя серии («Урожайный день.png»). Только после этого — default.
         * Это повторяет устойчивое поведение основного UI/Cards.js и не заменяет
         * существующую картинку универсальным ромбом, если файл реально есть.
         */
        pushUnique(requested);
        pushUnique(titleCandidate);

        var tierMatch = cleanTitle.match(/^(.*?)\s+(I|II|III|IV|V|VI|VII|VIII|IX|X|\d+)$/i);
        if (tierMatch) {
            var baseTitle = String(tierMatch[1] || '').trim();
            var tierToken = String(tierMatch[2] || '').toUpperCase();
            var arabicTier = /^\d+$/.test(tierToken)
                ? Math.max(0, Number(tierToken) || 0)
                : romanToArabic(tierToken);

            if (baseTitle && arabicTier > 0) {
                pushUnique(baseTitle + ' ' + String(arabicTier) + '.png');
                pushUnique(baseTitle + '.png');
            }
        }

        /*
         * Универсальная картинка каталога — строго ПОСЛЕДНИЙ резерв.
         * Для «Урожайного дня» и любых других ступеней сначала проверяются
         * собственное image и все производные варианты имени файла.
         */
        if (includeDefaultFallback !== false) {
            pushUnique(fallback);
        }
        if (!candidates.length || !root.mw || typeof mw.Api !== 'function') {
            return Promise.resolve('');
        }

        var api = new mw.Api();

        function resolveCandidate(candidate) {
            if (/^https?:\/\//i.test(candidate)) {
                return Promise.resolve(candidate);
            }

            return api.get({
                action: 'query',
                titles: ['File:' + candidate, 'Файл:' + candidate].join('|'),
                prop: 'imageinfo',
                iiprop: 'url',
                iiurlwidth: 180,
                redirects: 1,
                formatversion: 2
            }).then(function (data) {
                var pages = data && data.query && data.query.pages;
                pages = Array.isArray(pages) ? pages : [];

                for (var i = 0; i < pages.length; i += 1) {
                    var page = pages[i];
                    var info = page && Array.isArray(page.imageinfo) ? page.imageinfo[0] : null;
                    var url = info ? String(info.thumburl || info.url || '') : '';
                    if (url) { return url; }
                }
                return '';
            }).catch(function () {
                return '';
            });
        }

        function tryCandidate(index) {
            if (index >= candidates.length) { return Promise.resolve(''); }
            return resolveCandidate(candidates[index]).then(function (url) {
                return url || tryCandidate(index + 1);
            });
        }

        return tryCandidate(0);
    }

    function resolveAchievementDisplayImageUrl(achievementId, fileName, achievementTitle) {
        var id = String(achievementId || '');
        var achievement = catalogCache && catalogCache.achievements
            ? catalogCache.achievements[id]
            : null;

        /*
         * 1.14.7: универсальная картинка используется ТОЛЬКО если не найдено
         * ни одного собственного изображения достижения.
         *
         * Порядок для «Урожайного дня» и остальных достижений:
         * 1) точное image из полного каталога;
         * 2) файл по отображаемому названию/ступени и варианты имени;
         * 3) штатный resolver основного runtime;
         * 4) и лишь затем catalog.defaultImage (универсальная картинка).
         */
        if (achievement && achievement.image) {
            fileName = String(achievement.image);
        }

        return resolveSummaryImageUrl(fileName, achievementTitle, false)
            .then(function (specificUrl) {
                if (specificUrl) {
                    return specificUrl;
                }

                if (
                    achievement &&
                    runtime &&
                    typeof runtime.has === 'function' &&
                    typeof runtime.invoke === 'function' &&
                    runtime.has('resolveAchievementImage')
                ) {
                    try {
                        return Promise.resolve(
                            runtime.invoke('resolveAchievementImage', [catalogCache, achievement])
                        ).then(function (result) {
                            var url = result
                                ? String(result.url || result.thumbUrl || result.originalUrl || '')
                                : '';
                            if (url) {
                                return url;
                            }
                            return resolveSummaryImageUrl(fileName, achievementTitle, true);
                        }).catch(function () {
                            return resolveSummaryImageUrl(fileName, achievementTitle, true);
                        });
                    } catch (error) {
                        return resolveSummaryImageUrl(fileName, achievementTitle, true);
                    }
                }

                return resolveSummaryImageUrl(fileName, achievementTitle, true);
            });
    }

    function openEarnedAchievementSummary(event, summaryOptions) {
        summaryOptions = summaryOptions || {};
        var items = achievementSummaryItems(event);
        if (!items.length) {
            var fallbackProfile = String(summaryOptions.profileName || '').trim();
            root.location.assign(
                fallbackProfile
                    ? participantAchievementLink(fallbackProfile, event && event.achievementId || '')
                    : eventLink(event)
            );
            return;
        }

        removeAchievementSummary();

        var main = items[0];
        var overlay = document.createElement('div');
        overlay.id = ACHIEVEMENT_SUMMARY_ID;
        overlay.className = 'lof-ci-ach-summary-overlay';
        overlay.setAttribute('role', 'presentation');

        var dialog = document.createElement('section');
        dialog.className = 'lof-ci-ach-summary';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', 'Сводка полученного достижения');
        dialog.setAttribute('data-rarity', main.rarity || 'common');
        dialog.setAttribute('data-achievement-id', main.id || '');

        var conditionText = String(main.description || '').trim();
        var rarityTitle = String(main.rarityTitle || main.rarity || '').trim();
        var earnedText = formatAchievementSummaryDate(main.earnedAt, event.createdAt) || 'только что';

        var groupHtml = '';
        if (items.length > 1) {
            groupHtml =
                '<div class="lof-ci-ach-summary-group">' +
                    '<div class="lof-ci-ach-summary-group-title">Получено одновременно: ' +
                        escapeHtml(String(items.length)) +
                    '</div>' +
                    items.map(function (item) {
                        return '<div class="lof-ci-ach-summary-group-item">' +
                            '<span>' + escapeHtml(item.title) + '</span>' +
                            '<small>' +
                                escapeHtml(item.rarityTitle || item.rarity || '') +
                                (Number(item.points || 0) > 0 ? ' · +' + escapeHtml(String(item.points)) + ' опыта' : '') +
                            '</small>' +
                        '</div>';
                    }).join('') +
                '</div>';
        }

        dialog.innerHTML =
            '<div class="lof-ci-ach-summary-head">' +
                '<div class="lof-ci-ach-summary-head-copy">' +
                    '<div class="lof-ci-ach-summary-kicker">' +
                        '<span>ОСОБОЕ</span>' +
                        (rarityTitle
                            ? '<span class="lof-ci-ach-summary-rarity" data-rarity="' +
                                escapeHtml(main.rarity || 'common') + '">' +
                                escapeHtml(rarityTitle) +
                              '</span>'
                            : '') +
                        '<span>ПОЛУЧЕНО</span>' +
                    '</div>' +
                    '<h3 class="lof-ci-ach-summary-title">' + escapeHtml(main.title) + '</h3>' +
                    (
                        (main.secret || main.hidden)
                            ? '<div class="lof-ci-ach-summary-subtitle">' +
                                'Есть сведения, которые почти никогда не лежат на поверхности. ' +
                                'Если эта награда открылась — значит, вы коснулись одной из самых спрятанных нитей мира Лофариан.' +
                              '</div>'
                            : ''
                    ) +
                '</div>' +
            '</div>' +

            '<div class="lof-ci-ach-summary-body">' +
                '<div class="lof-ci-ach-summary-main">' +
                    '<div class="lof-ci-ach-summary-medal">' +
                        '<div class="lof-profile-rail-badge" data-rarity="' +
                            escapeHtml(main.rarity || 'common') + '">' +
                            '<span class="lof-profile-rail-badge-image-wrap">' +
                                '<img class="lof-profile-rail-badge-image lof-ci-ach-summary-image" alt="">' +
                            '</span>' +
                        '</div>' +
                    '</div>' +

                    '<div class="lof-ci-ach-summary-copy">' +
                        (
                            (main.secret || main.hidden)
                                ? '<span class="lof-ci-ach-summary-secret">✦ Скрытое достижение</span>'
                                : ''
                        ) +

                        '<div class="lof-ci-ach-summary-condition">' +
                            '<div class="lof-ci-ach-summary-condition-label">УСЛОВИЕ</div>' +
                            '<div class="lof-ci-ach-summary-condition-text">' +
                                escapeHtml(conditionText || 'Условие выполнено.') +
                            '</div>' +
                        '</div>' +

                        '<div class="lof-ci-ach-summary-footer">' +
                            (Number(main.points || 0) > 0
                                ? '<span class="lof-ci-ach-summary-points">' +
                                    escapeHtml(String(main.points)) + ' опыта</span>'
                                : '') +
                            (rarityTitle
                                ? '<span class="lof-ci-ach-summary-rarity-pill" data-rarity="' +
                                    escapeHtml(main.rarity || 'common') + '">' +
                                    escapeHtml(rarityTitle) +
                                  '</span>'
                                : '') +
                            '<span class="lof-ci-ach-summary-date">Получено: ' +
                                escapeHtml(earnedText) +
                            '</span>' +
                            '<span class="lof-ci-ach-summary-prevalence">Получили: 100%</span>' +
                        '</div>' +

                        groupHtml +
                    '</div>' +
                '</div>' +

                '<div class="lof-ci-ach-summary-actions">' +
                    '<button type="button" class="lof-ci-ach-summary-profile">Показать в профиле</button>' +
                    '<button type="button" class="lof-ci-ach-summary-close">Закрыть</button>' +
                '</div>' +
            '</div>';

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        var image = dialog.querySelector('.lof-ci-ach-summary-image');
        resolveAchievementDisplayImageUrl(main.id, main.image, main.title).then(function (url) {
            if (!url || !image || !document.body.contains(overlay)) { return; }
            image.onload = function () {
                image.classList.add('is-ready');
            };
            image.src = url;
        });

        function closeSummary() {
            removeAchievementSummary();
        }

        function showInProfile() {
            var targetId = main.id || '';
            var targetProfile = String(summaryOptions.profileName || '').trim();
            removeAchievementSummary();
            root.location.assign(
                targetProfile
                    ? participantAchievementLink(targetProfile, targetId)
                    : (targetId ? achievementLink(targetId) : achievementLink(''))
            );
        }

        var close = dialog.querySelector('.lof-ci-ach-summary-close');
        var profile = dialog.querySelector('.lof-ci-ach-summary-profile');

        if (close) { close.addEventListener('click', closeSummary); }
        if (profile) { profile.addEventListener('click', showInProfile); }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { closeSummary(); }
        });

        var keyHandler = function (e) {
            if (e.key === 'Escape' && document.getElementById(ACHIEVEMENT_SUMMARY_ID)) {
                e.preventDefault();
                closeSummary();
                document.removeEventListener('keydown', keyHandler, true);
            }
        };
        document.addEventListener('keydown', keyHandler, true);
    }

    function cardActionLabel(event) {
        if (!event) { return 'Подробнее ›'; }
        if (event.type === 'achievement-earned') { return 'Открыть сводку ›'; }
        if (event.type === 'near-unlock') { return 'Посмотреть в профиле ›'; }
        if (event.type === 'catalog') {
            return event.achievementId ? 'Посмотреть достижение ›' : 'Все достижения ›';
        }
        if (event.type === 'rank') { return 'Моё место в Зале славы ›'; }
        if (event.type === 'news' && event.subtype === 'article-update') {
            return 'Читать обновление ›';
        }
        if (event.type === 'chronicle') { return 'Открыть коллекцию ›'; }
        return 'Подробнее ›';
    }

    function renderEventCard(event, options) {
        options = options || {};
        var sourceEvent = event;
        var displayEvent = safeEventCopyForRender(event);
        var card = document.createElement('article');
        card.className = 'lof-ci-card' + (sourceEvent.readAt ? ' is-read' : '') +
            (options.headline ? ' is-headline' : '') +
            (options.daily ? ' is-daily' : '') +
            ((!sourceEvent.readAt && now() - Number(sourceEvent.createdAt || 0) < 8000) ? ' is-fresh' : '');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('data-rarity', String(displayEvent.rarity || 'common'));
        card.setAttribute('data-priority', eventPriority(displayEvent));
        card.setAttribute('data-community', eventIsCommunity(displayEvent) ? '1' : '0');
        card.setAttribute('data-event-id', sourceEvent.id);
        card.setAttribute('aria-label', kindLabel(displayEvent) + ': ' + String(displayEvent.title || ''));
        var points = Number(displayEvent.points || 0);
        var groupCount = Array.isArray(displayEvent.items) ? displayEvent.items.length : 0;
        var isFresh = state.settings.freshBadge !== false && now() - Number(displayEvent.createdAt || 0) <= FRESH_BADGE_MS;
        card.innerHTML =
            '<button type="button" class="lof-ci-favorite' + (sourceEvent.favorite === true ? ' is-active' : '') + '" aria-label="' + (sourceEvent.favorite === true ? 'Убрать из избранного' : 'Добавить в избранное') + '" data-lof-tip-title="Избранное" data-lof-tip="' + (sourceEvent.favorite === true ? 'Убрать эту новость из избранного.' : 'Сохранить эту новость в отдельной вкладке ★ Избранное.') + '">' + (sourceEvent.favorite === true ? '★' : '☆') + '</button>' +
            (options.headline ? '<div class="lof-ci-headline-ribbon">' + (eventPriority(displayEvent) === 'urgent' ? 'СРОЧНО' : (displayEvent.pinned ? 'ГЛАВНАЯ НОВОСТЬ' : 'ГЛАВНОЕ')) + '</div>' : '') +
            '<div class="lof-ci-kind"><span class="lof-ci-kind-icon">' + escapeHtml(kindIcon(displayEvent)) + '</span>' + escapeHtml(kindLabel(displayEvent)) + '</div>' +
            '<div class="lof-ci-card-title">' + escapeHtml(displayEvent.title || 'Новость агентства') + '</div>' +
            '<div class="lof-ci-card-desc">' + escapeHtml(displayEvent.description || '') + '</div>' +
            '<div class="lof-ci-meta">' +
                (isFresh ? '<span class="lof-ci-fresh-badge">Только что</span>' : '') +
                (eventIsCommunity(displayEvent) ? '<span class="lof-ci-community-badge">Сообщество</span>' : '') +
                (displayEvent.rarityTitle ? '<strong>' + escapeHtml(displayEvent.rarityTitle) + '</strong>' : '') +
                (points > 0 ? '<span>+' + escapeHtml(String(points)) + ' опыта</span>' : '') +
                (groupCount > 1 ? '<span>' + escapeHtml(String(groupCount)) + ' нагр.</span>' : '') +
                '<span class="lof-ci-agency-stamp">' + escapeHtml(formatAgencyStamp(displayEvent.createdAt)) + '</span>' +
            '</div>' +
            '<div class="lof-ci-card-action">' + escapeHtml(cardActionLabel(displayEvent)) + '</div>';

        var favorite = card.querySelector('.lof-ci-favorite');
        if (favorite) {
            favorite.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(sourceEvent);
            });
            favorite.addEventListener('keydown', function (e) { e.stopPropagation(); });
        }

        function markByInteraction() {
            markEventRead(sourceEvent, false);
        }
        function openEvent() {
            markEventRead(sourceEvent, false);
            if (sourceEvent.type === 'achievement-earned') {
                openEarnedAchievementSummary(sourceEvent);
                return;
            }
            root.location.assign(eventLink(sourceEvent));
        }
        card.addEventListener('mouseenter', function () {
            if (state.settings.hoverRead !== false) { markByInteraction(); }
        }, { once: true });
        card.addEventListener('focus', markByInteraction, { once: true });
        card.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') { markByInteraction(); }
        }, { once: true });
        card.addEventListener('click', function (e) {
            if (e.target && e.target.closest && e.target.closest('.lof-ci-favorite')) { return; }
            openEvent();
        });
        card.addEventListener('keydown', function (e) {
            if (e.target && e.target.closest && e.target.closest('.lof-ci-favorite')) { return; }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEvent();
            }
        });
        bindControlTips(card);
        return card;
    }

    function renderTicker(panel, events) {
        /* 1.11.1 — «Сводка DFC» удалена из интерфейса. */
        return;
    }

    function renderSettings(panel) {
        state.settings.sound = true;
        var pane = panel.querySelector('.lof-ci-settings-pane');
        if (!pane) { return; }
        pane.innerHTML =
            '<div class="lof-ci-settings-top">' +
                '<div class="lof-ci-settings-top-copy"><div class="lof-ci-settings-top-kicker">Новостное агентство DFC</div><div class="lof-ci-settings-top-title">Настройки агентства</div></div>' +
                '<div class="lof-ci-settings-top-actions">' +
                    '<button type="button" class="lof-ci-settings-close" data-lof-tip-title="Вернуться к новостям" data-lof-tip="Закрыть настройки и вернуться к основной ленте агентства."><span aria-hidden="true">←</span><span>К новостям</span></button>' +
                    '<button type="button" class="lof-ci-settings-panel-close" data-lof-tip-title="Закрыть агентство" data-lof-tip="Закрыть всю панель. При следующем открытии сразу откроются новости, а не настройки."><span aria-hidden="true">×</span><span>Закрыть</span></button>' +
                '</div>' +
            '</div>' +
            '<div class="lof-ci-settings-slides">' +
            '<div class="lof-ci-settings-section is-active" data-settings-slide="0" data-settings-label="Содержание"><div class="lof-ci-settings-title">Содержание</div><div class="lof-ci-settings-grid">' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="catalog"><span class="lof-ci-setting-text"><strong>Новые достижения</strong><small>Новости о новых публичных наградах</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="rank"><span class="lof-ci-setting-text"><strong>Зал славы</strong><small>Значимые изменения места и рекорды</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="near"><span class="lof-ci-setting-text"><strong>Почти открыто</strong><small>Редкие подсказки о близких достижениях</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="news"><span class="lof-ci-setting-text"><strong>Новости агентства</strong><small>Объявления и важные сообщения DFC</small></span></label>' +
            '</div></div>' +
            '<div class="lof-ci-settings-section" data-settings-slide="1" data-settings-label="Интерфейс"><div class="lof-ci-settings-title">Интерфейс</div><div class="lof-ci-settings-grid">' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="attention"><span class="lof-ci-setting-text"><strong>Привлекать внимание</strong><small>Мягкая анимация закрытой вкладки при новостях</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="compact"><span class="lof-ci-setting-text"><strong>Компактная лента</strong><small>Скрывать описания и уменьшить карточки</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="weekly"><span class="lof-ci-setting-text"><strong>Сводка за 7 дней</strong><small>Показывать недельную статистику сверху</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="daily"><span class="lof-ci-setting-text"><strong>Событие дня</strong><small>Выделять самое заметное событие суток</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="hoverRead"><span class="lof-ci-setting-text"><strong>Читать при наведении</strong><small>Наведение снимает «Новое» у соответствующей награды</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="freshBadge"><span class="lof-ci-setting-text"><strong>Бейдж «Только что»</strong><small>Показывать его у совсем свежих событий</small></span></label>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="dnd"><span class="lof-ci-setting-text"><strong>Тихий режим</strong><small>Отключить анимацию внимания и звук</small></span></label>' +
            '</div></div>' +
            '<div class="lof-ci-settings-section is-sound" data-settings-slide="2" data-settings-label="Звук"><div class="lof-ci-settings-title">Звук</div><div class="lof-ci-settings-grid">' +
                '<div class="lof-ci-setting lof-ci-sound-fixed"><span class="lof-ci-setting-text"><strong>Звуковое уведомление</strong><small>Звук включён постоянно. «Тихий режим» временно отключает его.</small></span><span class="lof-ci-sound-status">Включено</span></div>' +
                '<label class="lof-ci-setting"><input type="checkbox" data-setting="soundImportantOnly"><span class="lof-ci-setting-text"><strong>Только важные</strong><small>Звук только для важных, редких и рекордных событий</small></span></label>' +
                '<div class="lof-ci-setting lof-ci-setting-volume"><span class="lof-ci-setting-text"><strong>Громкость уведомлений</strong><small>Выберите громкость и сразу проверьте текущий звук DFC.</small></span><span class="lof-ci-volume-actions"><span class="lof-ci-volume-pills" role="group" aria-label="Громкость уведомления"><button type="button" class="lof-ci-volume-pill" data-setting-volume="0.18">Тихо</button><button type="button" class="lof-ci-volume-pill" data-setting-volume="0.35">Средне</button><button type="button" class="lof-ci-volume-pill" data-setting-volume="0.58">Громко</button></span><button type="button" class="lof-ci-sound-test-mini" data-lof-tip-title="Проверить звук" data-lof-tip="Воспроизвести текущий сигнал DFC с выбранной громкостью."><span aria-hidden="true">♪</span><span>Проверить</span></button></span></div>' +
            '</div></div>' +
            '</div>' +
            '<div class="lof-ci-settings-nav" role="tablist" aria-label="Разделы настроек">' +
                '<button type="button" class="lof-ci-settings-nav-btn is-active" role="tab" aria-selected="true" data-settings-tab="0">Содержание</button>' +
                '<button type="button" class="lof-ci-settings-nav-btn" role="tab" aria-selected="false" data-settings-tab="1">Интерфейс</button>' +
                '<button type="button" class="lof-ci-settings-nav-btn" role="tab" aria-selected="false" data-settings-tab="2">Звук</button>' +
            '</div>' +
            '<div class="lof-ci-setting-note">Полученные награды показываются всегда. Звук уведомлений постоянно включён; «Тихий режим» временно отключает его вместе с анимацией внимания. Браузер разрешит звук после первого обычного взаимодействия со страницей.</div>';
        var settingsSlides = Array.prototype.slice.call(pane.querySelectorAll('[data-settings-slide]') || []);
        var settingsTabs = Array.prototype.slice.call(pane.querySelectorAll('[data-settings-tab]') || []);
        var settingsSlideIndex = 0;

        function showSettingsSlide(index) {
            if (!settingsSlides.length) { return; }
            settingsSlideIndex = Math.max(0, Math.min(settingsSlides.length - 1, Number(index) || 0));

            settingsSlides.forEach(function (section, i) {
                var active = i === settingsSlideIndex;
                section.classList.toggle('is-active', active);
                section.setAttribute('aria-hidden', active ? 'false' : 'true');
            });

            settingsTabs.forEach(function (button, i) {
                var active = i === settingsSlideIndex;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-selected', active ? 'true' : 'false');
                button.tabIndex = active ? 0 : -1;
            });

            /* Переключение мгновенное, без smooth-scroll. */
            pane.scrollTop = 0;
        }

        settingsTabs.forEach(function (button) {
            button.addEventListener('click', function () {
                showSettingsSlide(Number(button.getAttribute('data-settings-tab')) || 0);
            });
        });

        showSettingsSlide(0);

        pane.querySelectorAll('input[data-setting]').forEach(function (input) {
            var key = input.getAttribute('data-setting');
            input.checked = state.settings[key] === true;
            input.addEventListener('change', function () {
                state.settings[key] = input.checked;
                if (key === 'sound' && input.checked) { ensureAudioContext(); }
                schedulePersist();
                scheduleRender();
            });
        });
        var volumeButtons = Array.prototype.slice.call(pane.querySelectorAll('[data-setting-volume]') || []);
        if (volumeButtons.length) {
            function refreshVolumeButtons() {
                var target = Number(state.settings.soundVolume || 0.35);
                var nearest = volumeButtons.slice().sort(function (a, b) {
                    return Math.abs(Number(a.getAttribute('data-setting-volume')) - target) -
                        Math.abs(Number(b.getAttribute('data-setting-volume')) - target);
                })[0];
                volumeButtons.forEach(function (button) {
                    button.classList.toggle('is-active', button === nearest);
                });
            }
            refreshVolumeButtons();
            volumeButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    state.settings.soundVolume = Number(button.getAttribute('data-setting-volume')) || 0.35;
                    refreshVolumeButtons();
                    schedulePersist();
                });
            });
        }
        var soundTest = pane.querySelector('.lof-ci-sound-test-mini');
        if (soundTest) {
            soundTest.addEventListener('click', function () {
                ensureAudioContext();
                playNotificationSound({ type: 'news', priority: 'normal' }, true);
            });
        }
        var closeSettings = pane.querySelector('.lof-ci-settings-close');
        if (closeSettings) {
            closeSettings.addEventListener('click', function () {
                pane.classList.remove('is-open');
                var panelNode = document.getElementById(PANEL_ID);
                if (panelNode) { panelNode.classList.remove('is-settings-open'); }
                pane.scrollTop = 0;
                var gear = panelNode && panelNode.querySelector('.lof-ci-settings');
                if (gear) { gear.setAttribute('aria-expanded', 'false'); }
            });
        }

        var closePanelFromSettings = pane.querySelector('.lof-ci-settings-panel-close');
        if (closePanelFromSettings) {
            closePanelFromSettings.addEventListener('click', function () {
                resetSettingsView();
                togglePanel(false);
            });
        }
        bindControlTips(pane);
    }

    function ensureControlTooltip() {
        var tip = document.getElementById('lof-ci-control-tooltip');
        if (tip) { return tip; }
        tip = document.createElement('div');
        tip.id = 'lof-ci-control-tooltip';
        tip.className = 'lof-ci-tooltip';
        tip.setAttribute('role', 'tooltip');
        tip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tip);
        return tip;
    }

    function hideControlTip() {
        if (controlTipTimer) {
            window.clearTimeout(controlTipTimer);
            controlTipTimer = null;
        }
        controlTipPendingNode = null;
        var tip = document.getElementById('lof-ci-control-tooltip');
        if (tip) {
            tip.classList.remove('is-visible', 'is-below', 'is-side', 'is-side-right');
            tip.setAttribute('aria-hidden', 'true');
        }
    }

    function showControlTip(node) {
        if (!node || !node.getAttribute) { return; }
        var message = String(node.getAttribute('data-lof-tip') || '').trim();
        if (!message) { return; }
        var title = String(node.getAttribute('data-lof-tip-title') || '').trim();
        var kicker = String(node.getAttribute('data-lof-tip-kicker') || 'DFC · ПОДСКАЗКА').trim();
        var tip = ensureControlTooltip();
        tip.className = 'lof-ci-tooltip';
        tip.innerHTML = '<div class="lof-ci-tooltip-kicker">' + escapeHtml(kicker) + '</div>' +
            (title ? '<strong>' + escapeHtml(title) + '</strong>' : '') +
            '<span class="lof-ci-control-hint">' + escapeHtml(message) + '</span>';
        tip.setAttribute('aria-hidden', 'false');
        tip.classList.add('is-visible');
        tip.style.left = '-9999px';
        tip.style.top = '-9999px';
        var rect = node.getBoundingClientRect();
        var tr = tip.getBoundingClientRect();
        var left;
        var top;
        if (node.id === TAB_ID) {
            left = rect.left - tr.width - 12;
            if (left < 8) {
                left = rect.right + 12;
                tip.classList.add('is-side-right');
            } else {
                tip.classList.add('is-side');
            }
            top = rect.top + Math.max(0, (rect.height - tr.height) / 2);
            top = Math.min(Math.max(8, top), Math.max(8, window.innerHeight - tr.height - 8));
        } else {
            left = rect.left + (rect.width - tr.width) / 2;
            left = Math.min(Math.max(8, left), Math.max(8, window.innerWidth - tr.width - 8));
            top = rect.top - tr.height - 11;
            if (top < 8) {
                top = rect.bottom + 11;
                tip.classList.add('is-below');
            }
        }
        tip.style.left = Math.round(left) + 'px';
        tip.style.top = Math.round(top) + 'px';
    }

    function scheduleControlTip(node) {
        hideControlTip();
        if (!node || !node.getAttribute || !String(node.getAttribute('data-lof-tip') || '').trim()) { return; }
        controlTipPendingNode = node;
        controlTipTimer = window.setTimeout(function () {
            controlTipTimer = null;
            if (controlTipPendingNode !== node || !document.documentElement.contains(node)) { return; }
            controlTipPendingNode = null;
            showControlTip(node);
        }, CONTROL_TIP_DELAY_MS);
    }

    function bindControlTips(scope) {
        (scope || document).querySelectorAll('[data-lof-tip]').forEach(function (node) {
            if (node.getAttribute('data-lof-tip-bound') === '1') { return; }
            node.setAttribute('data-lof-tip-bound', '1');
            node.addEventListener('mouseenter', function () { scheduleControlTip(node); });
            node.addEventListener('mouseleave', hideControlTip);
            node.addEventListener('focus', function () { scheduleControlTip(node); });
            node.addEventListener('blur', hideControlTip);
            node.addEventListener('click', hideControlTip);
        });
    }

    function renderPanel() {
        if (!isReady || isDisabled()) { return; }
        installStyles();
        var tab = document.getElementById(TAB_ID);
        var panel = document.getElementById(PANEL_ID);
        if (!tab || !panel) {
            mountUi();
            return;
        }

        scheduleSnoozeWake();
        if (isSnoozed()) {
            state.ui.collapsed = true;
            tab.style.display = 'none';
            panel.classList.add('is-collapsed');
            return;
        }
        tab.style.display = '';
        applyPanelHeight(state.ui.panelHeight, false);

        var count = isParticipant() ? unreadCount() : 1;
        var badge = tab.querySelector('.lof-ci-count');
        if (badge) {
            badge.textContent = count > 99 ? '99+' : String(count);
            badge.style.display = count > 0 ? '' : 'none';
        }
        tab.classList.toggle('is-dnd', state.settings.dnd === true || state.settings.attention === false);
        tab.classList.toggle('is-open', state.ui.collapsed === false);
        tab.classList.toggle('is-attention', state.ui.collapsed !== false && state.settings.attention !== false);
        panel.classList.toggle('is-compact', state.settings.compact === true);
        tab.classList.toggle('has-unread', count > 0);
        panel.classList.toggle('is-collapsed', state.ui.collapsed !== false);
        tab.setAttribute('aria-expanded', state.ui.collapsed === false ? 'true' : 'false');
        tab.setAttribute('aria-label', state.ui.collapsed === false ? 'Закрыть Новостное агентство DFC' : 'Открыть Новостное агентство DFC');
        tab.setAttribute('data-lof-tip-title', state.ui.collapsed === false ? 'Закрыть агентство' : 'Новостное агентство DFC');
        tab.setAttribute('data-lof-tip', state.ui.collapsed === false ? 'Свернуть панель новостей. Все записи останутся на месте.' : (count > 0 ? ('У вас ' + String(count) + ' непрочитанных новостей. Нажмите, чтобы открыть ленту.') : 'Открыть новости, достижения, сводку недели и события сообщества.'));

        var stats = panel.querySelector('.lof-ci-stats');
        if (stats) {
            if (isParticipant()) {
                var earnedCount = currentAchievementMap ? countEarnedMap(currentAchievementMap) : Number(state.meta.lastCount || 0);
                var bestRank = Number(state.meta.lastRank || 0);
                var unread = unreadCount();
                stats.innerHTML =
                    '<a class="lof-ci-stat-chip lof-ci-chip-link" href="' + escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) + '" data-lof-tip-title="Ваши достижения" data-lof-tip="Перейти к полной странице достижений и прогресса.">✦ <strong>' + escapeHtml(String(earnedCount || 0)) + '</strong> достижений</a>' +
                    (bestRank ? '<a class="lof-ci-stat-chip lof-ci-chip-link" href="' + escapeHtml(hallLink(userName())) + '" data-lof-tip-title="Зал славы" data-lof-tip="Открыть Зал славы и автоматически перейти к вашей строке.">♛ <strong>#' + escapeHtml(String(bestRank)) + '</strong> Зал славы</a>' : '') +
                    '<button type="button" class="lof-ci-stat-chip lof-ci-chip-link is-feed is-unread" data-stat-filter="all" data-lof-tip-title="Непрочитанные новости" data-lof-tip="Показать в агентстве ленту новостей, где есть непрочитанные записи.">● <strong>' + escapeHtml(String(unread)) + '</strong> непрочит.</button>';
                stats.querySelectorAll('[data-stat-filter]').forEach(function (button) {
                    button.addEventListener('click', function () {
                        openFeedFilter(button.getAttribute('data-stat-filter') || 'all');
                    });
                });
                bindControlTips(stats);
            } else {
                stats.innerHTML = '<span class="lof-ci-stat-chip">' + escapeHtml(isLoggedIn() ? 'Программа пока не подключена' : 'Гостевой просмотр') + '</span>';
            }
        }

        var settingsButton = panel.querySelector('.lof-ci-settings');
        var filters = panel.querySelector('.lof-ci-filters');
        var readAllButton = panel.querySelector('.lof-ci-read-all');
        var archiveButton = panel.querySelector('.lof-ci-archive-toggle');
        if (settingsButton) { settingsButton.style.display = isParticipant() ? '' : 'none'; }
        if (filters) { filters.style.display = isParticipant() ? '' : 'none'; }
        if (readAllButton) {
            var showReadAll = isParticipant() && unreadCount() > 0;
            readAllButton.classList.toggle('is-hidden', !showReadAll);
            readAllButton.setAttribute('aria-hidden', showReadAll ? 'false' : 'true');
            readAllButton.tabIndex = showReadAll ? 0 : -1;
        }

        var countableEvents = state.events.filter(function (event) {
            return event && !eventIsUnsafeCatalogReveal(event);
        });
        panel.querySelectorAll('.lof-ci-filter').forEach(function (button) {
            var key = button.getAttribute('data-filter') || 'all';
            button.classList.toggle('is-active', key === state.ui.filter);
            var countNode = button.querySelector('[data-filter-count]');
            if (countNode) {
                if (key === 'participants') {
                    countNode.textContent = (!participantRecentLoadedAt || (participantRecentLoading && !participantRecentAchievements.length))
                        ? '…'
                        : String(participantRecentAchievements.length || 0);
                } else {
                    var totalForFilter = countableEvents.filter(function (event) {
                        return filterMatchesFor(event, key);
                    }).length;
                    countNode.textContent = totalForFilter > 99 ? '99+' : String(totalForFilter);
                }
            }
        });

        var body = panel.querySelector('.lof-ci-scroll');
        body.innerHTML = '';
        var headlineWrap = panel.querySelector('.lof-ci-headline');
        if (headlineWrap) { headlineWrap.innerHTML = ''; headlineWrap.style.display = 'none'; }

        if (!isParticipant()) {
            renderTicker(panel, []);
            if (archiveButton) { archiveButton.style.display = 'none'; }
            var pagerForInvite = panel.querySelector('.lof-ci-pagination');
            if (pagerForInvite) { pagerForInvite.hidden = true; pagerForInvite.innerHTML = ''; }
            renderInvite(body);
            return;
        }

        if (state.ui.filter === 'participants') {
            renderTicker(panel, []);
            renderParticipantRecentFeed(panel, body);
            if (!participantRecentLoading &&
                (!participantRecentLoadedAt || now() - participantRecentLoadedAt >= PARTICIPANT_RECENT_CACHE_MS)) {
                refreshRecentParticipantAchievements();
            }
            return;
        }

        var events = visibleEvents();
        renderTicker(panel, events);
        renderWeeklySummary(panel, state.events);

        var dailyWrap = panel.querySelector('.lof-ci-daily');
        if (dailyWrap) { dailyWrap.innerHTML = ''; }

        if (!events.length) {
            if (archiveButton) { archiveButton.style.display = 'none'; }
            var pagerEmpty = panel.querySelector('.lof-ci-pagination');
            if (pagerEmpty) { pagerEmpty.hidden = true; pagerEmpty.innerHTML = ''; }
            state.ui.page = 1;
            body.innerHTML = '<div class="lof-ci-empty"><div class="lof-ci-empty-mark">✦</div><strong>Пока здесь тихо</strong><span>Новые записи появятся, когда Летопись отметит ваши достижения или агентство опубликует важную новость.</span></div>';
            return;
        }

        /*
         * 1.11.0 — страничная лента.
         * Никакой плавной прокрутки длинного списка: ровно 5 записей на странице.
         * Событие дня / отдельная headline-карточка здесь не вынимаются из потока,
         * чтобы на каждой странице было предсказуемо ровно до пяти новостей.
         */
        if (dailyWrap) { dailyWrap.innerHTML = ''; dailyWrap.style.display = 'none'; }
        if (headlineWrap) { headlineWrap.innerHTML = ''; headlineWrap.style.display = 'none'; }
        state.ui.archiveOpen = false;
        if (archiveButton) { archiveButton.style.display = 'none'; }

        var totalItems = events.length;
        var pageCount = Math.max(1, Math.ceil(totalItems / FEED_PAGE_SIZE));
        var currentPage = Math.max(1, Math.min(pageCount, Math.floor(Number(state.ui.page) || 1)));
        state.ui.page = currentPage;

        var startIndex = (currentPage - 1) * FEED_PAGE_SIZE;
        var shown = events.slice(startIndex, startIndex + FEED_PAGE_SIZE);

        var lastBucket = '';
        shown.forEach(function (event) {
            var bucket = dayBucket(event.createdAt);
            if (bucket !== lastBucket) {
                var heading = document.createElement('div');
                heading.className = 'lof-ci-day';
                heading.textContent = bucket;
                body.appendChild(heading);
                lastBucket = bucket;
            }
            body.appendChild(renderEventCard(event));
        });

        renderPagination(panel, totalItems);
        bindControlTips(panel);
    }

    function paginationTokens(currentPage, pageCount) {
        var tokens = [];
        if (pageCount <= 7) {
            for (var p = 1; p <= pageCount; p += 1) { tokens.push(p); }
            return tokens;
        }

        tokens.push(1);

        var start = Math.max(2, currentPage - 1);
        var end = Math.min(pageCount - 1, currentPage + 1);

        if (currentPage <= 3) {
            start = 2;
            end = 4;
        } else if (currentPage >= pageCount - 2) {
            start = pageCount - 3;
            end = pageCount - 1;
        }

        if (start > 2) { tokens.push('gap-left'); }
        for (var i = start; i <= end; i += 1) { tokens.push(i); }
        if (end < pageCount - 1) { tokens.push('gap-right'); }

        tokens.push(pageCount);
        return tokens;
    }

    function renderPagination(panel, totalItems) {
        var wrap = panel.querySelector('.lof-ci-pagination');
        if (!wrap) { return; }

        var pageCount = Math.max(1, Math.ceil(Math.max(0, totalItems) / FEED_PAGE_SIZE));
        var current = Math.max(1, Math.min(pageCount, Math.floor(Number(state.ui.page) || 1)));
        state.ui.page = current;

        if (pageCount <= 1) {
            wrap.hidden = true;
            wrap.innerHTML = '';
            return;
        }

        wrap.hidden = false;
        wrap.innerHTML = '';

        function makeButton(label, page, disabled, active, title) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'lof-ci-page-btn' + (active ? ' is-active' : '');
            button.textContent = label;
            button.disabled = !!disabled;
            button.setAttribute('aria-label', title || ('Страница ' + String(page)));
            if (active) { button.setAttribute('aria-current', 'page'); }

            if (!disabled && !active) {
                button.addEventListener('click', function () {
                    state.ui.page = page;
                    schedulePersist();
                    var body = panel.querySelector('.lof-ci-scroll');
                    if (body) { body.scrollTop = 0; }
                    scheduleRender();
                });
            }
            return button;
        }

        wrap.appendChild(makeButton('‹', current - 1, current <= 1, false, 'Предыдущая страница'));

        paginationTokens(current, pageCount).forEach(function (token) {
            if (typeof token === 'string') {
                var gap = document.createElement('span');
                gap.className = 'lof-ci-page-gap';
                gap.textContent = '…';
                gap.setAttribute('aria-hidden', 'true');
                wrap.appendChild(gap);
                return;
            }
            wrap.appendChild(makeButton(String(token), token, false, token === current, 'Страница ' + String(token)));
        });

        wrap.appendChild(makeButton('›', current + 1, current >= pageCount, false, 'Следующая страница'));

        var info = document.createElement('span');
        info.className = 'lof-ci-page-info';
        info.textContent = String(current) + ' / ' + String(pageCount);
        wrap.appendChild(info);
    }

    function normalizedHallUser(value) {
        return String(value || '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function requestedHallUser() {
        try {
            var params = new URLSearchParams(root.location.search || '');
            return String(params.get('lofHallUser') || '').trim();
        } catch (error) {
            return '';
        }
    }

    function requestedCatalogAchievement() {
        try {
            var params = new URLSearchParams(root.location.search || '');
            return String(params.get('lofAchievement') || '').trim();
        } catch (error) {
            return '';
        }
    }

    function decorateVisibleHallRows() {
        var hallRoot = document.getElementById('lof-achievements-leaderboard');
        if (!hallRoot) { return 0; }

        var count = 0;
        hallRoot.querySelectorAll('.lof-leaderboard-user a[href]').forEach(function (link) {
            var name = String(link.textContent || '').trim();
            if (!name) { return; }

            var row = link.closest('tr,[role="row"],li');
            if (!row) { return; }

            row.id = hallUserAnchorId(name);
            row.setAttribute('data-lof-hall-user', name);
            count += 1;
        });
        return count;
    }

    function findVisibleHallUserRow(targetName) {
        var wanted = normalizedHallUser(targetName);
        var hallRoot = document.getElementById('lof-achievements-leaderboard');
        if (!wanted || !hallRoot) { return null; }

        var rows = Array.prototype.slice.call(hallRoot.querySelectorAll('[data-lof-hall-user],tr'));
        for (var i = 0; i < rows.length; i += 1) {
            var row = rows[i];
            var explicit = normalizedHallUser(row.getAttribute('data-lof-hall-user'));
            var link = row.querySelector && row.querySelector('.lof-leaderboard-user a[href]');
            var linkName = normalizedHallUser(link && link.textContent);

            if (explicit === wanted || linkName === wanted) {
                return row;
            }
        }
        return null;
    }

    function highlightHallRow(row) {
        if (!row) { return false; }

        row.classList.add('lof-ci-hall-jump-target');
        try {
            row.scrollIntoView({
                block: 'center',
                inline: 'nearest',
                behavior: 'auto'
            });
        } catch (error) {
            try { row.scrollIntoView(); } catch (ignored) {}
        }

        window.setTimeout(function () {
            row.classList.remove('lof-ci-hall-jump-target');
        }, 6500);

        return true;
    }

    function installHallAnchorObserver() {
        var hallRoot = document.getElementById('lof-achievements-leaderboard');
        if (!hallRoot || hallRoot.__lofChronicleHallObserver) { return; }

        decorateVisibleHallRows();

        if (!root.MutationObserver) { return; }
        var observer = new MutationObserver(function () {
            decorateVisibleHallRows();
        });
        observer.observe(hallRoot, { childList: true, subtree: true });
        hallRoot.__lofChronicleHallObserver = observer;
    }

    function jumpToHallUserIfRequested() {
        var targetName = requestedHallUser();
        if (!targetName) {
            /*
             * Даже без перехода по параметру добавляем устойчивые id
             * всем видимым строкам Зала славы.
             */
            var idleAttempts = 0;
            var idleTimer = window.setInterval(function () {
                idleAttempts += 1;
                var hallRoot = document.getElementById('lof-achievements-leaderboard');
                if (hallRoot) {
                    installHallAnchorObserver();
                    window.clearInterval(idleTimer);
                } else if (idleAttempts >= 50) {
                    window.clearInterval(idleTimer);
                }
            }, 180);
            return;
        }

        var attempts = 0;
        var maxAttempts = 70;
        var timer = window.setInterval(function () {
            attempts += 1;

            var hallRoot = document.getElementById('lof-achievements-leaderboard');
            if (!hallRoot) {
                if (attempts >= maxAttempts) { window.clearInterval(timer); }
                return;
            }

            installHallAnchorObserver();

            /*
             * Текущий Зал славы имеет собственный поиск и пагинацию.
             * Вводим ник в поиск: нужный пользователь оказывается на первой
             * странице независимо от исходного места (например #437).
             */
            var search = hallRoot.querySelector('.lof-hall-search');
            if (search && normalizedHallUser(search.value) !== normalizedHallUser(targetName)) {
                search.value = targetName;
                try {
                    search.dispatchEvent(new Event('input', { bubbles: true }));
                } catch (error) {
                    var legacyEvent = document.createEvent('Event');
                    legacyEvent.initEvent('input', true, true);
                    search.dispatchEvent(legacyEvent);
                }
            }

            decorateVisibleHallRows();
            var row = findVisibleHallUserRow(targetName);

            if (row) {
                window.clearInterval(timer);
                row.id = hallUserAnchorId(targetName);
                row.setAttribute('data-lof-hall-user', targetName);
                highlightHallRow(row);
                return;
            }

            if (attempts >= maxAttempts) {
                window.clearInterval(timer);
            }
        }, 180);
    }

    function jumpToCatalogAchievementIfRequested() {
        var achievementId = requestedCatalogAchievement();
        if (!achievementId) { return; }

        if (normalizePageTitle(mw.config.get('wgPageName')) !== normalizePageTitle(ACHIEVEMENTS_PAGE)) {
            return;
        }

        var attempts = 0;
        var timer = window.setInterval(function () {
            attempts += 1;

            var selector = '[data-lof-achievement-id="' + String(achievementId).replace(/"/g, '\\"') + '"]';
            var node = document.querySelector(selector);

            if (!node) {
                if (attempts >= 60) { window.clearInterval(timer); }
                return;
            }

            window.clearInterval(timer);

            var target = node.closest(
                '.lof-achievement-card,.lof-profile-achievement,.lof-profile-rail-badge,[data-lof-achievement-id]'
            ) || node;

            target.classList.add('lof-ci-catalog-jump-target');
            try {
                target.scrollIntoView({
                    block: 'center',
                    inline: 'nearest',
                    behavior: 'auto'
                });
            } catch (error) {
                try { target.scrollIntoView(); } catch (ignored) {}
            }

            window.setTimeout(function () {
                target.classList.remove('lof-ci-catalog-jump-target');
            }, 6500);
        }, 180);
    }

    function scheduleRender() {
        if (renderTimer) { return; }
        renderTimer = setTimeout(function () {
            renderTimer = null;
            renderPanel();
        }, 40);
    }

    function pulseTab() {
        if (state.settings.dnd || state.settings.attention === false) { return; }
        var tab = document.getElementById(TAB_ID);
        if (!tab) { return; }
        tab.classList.remove('is-pulsing');
        void tab.offsetWidth;
        tab.classList.add('is-pulsing');
        setTimeout(function () { tab.classList.remove('is-pulsing'); }, 1300);
    }

    var foreignOverlayCloseTimer = 0;
    var foreignOverlayCloseTimer2 = 0;
    var fandomPageToolsRestore = null;
    var fandomPageToolsWasOpen = false;
    var fandomPageToolsPanel = null;
    var fandomPageToolsPanelSnapshot = null;
    var fandomPageToolsRectSnapshot = null;
    var fandomToolsSuppressObserver = null;
    var fandomToolsSuppressInterval = 0;
    var fandomToolsSuppressed = [];
    var fandomToolsSuppressionActive = false;

    /* Exact Fandom rail control supplied from the live DOM by the user. */
    var fandomOverviewRailWasOpen = false;
    var fandomOverviewRailRestorePending = false;
    var fandomOverviewRailRestoreTimers = [];
    var fandomOverviewRailClosedByDFC = false;

    function elementIsVisible(node) {
        if (!node || !node.getBoundingClientRect) { return false; }
        var style;
        try { style = window.getComputedStyle(node); } catch (e) { style = null; }
        if (style && (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0)) {
            return false;
        }
        var rect = node.getBoundingClientRect();
        return rect.width > 4 && rect.height > 4 &&
            rect.bottom > 0 && rect.right > 0 &&
            rect.top < window.innerHeight && rect.left < window.innerWidth;
    }

    function normalizedUiText(node) {
        return String(node && node.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function findFandomPageToolsContext() {
        /*
         * Ищем именно открытую правую панель со скрина:
         * «Инструменты для страницы» / Page tools.
         */
        var all = Array.prototype.slice.call(document.querySelectorAll(
            'h1,h2,h3,h4,h5,strong,b,[role="heading"],div,span'
        ));
        var heading = null;

        for (var i = 0; i < all.length; i += 1) {
            var label = normalizedUiText(all[i]);
            if (
                (label === 'инструменты для страницы' ||
                 label === 'page tools' ||
                 label.indexOf('инструменты для страницы') === 0) &&
                elementIsVisible(all[i])
            ) {
                heading = all[i];
                break;
            }
        }
        if (!heading) { return null; }

        /*
         * Поднимаемся к визуальному контейнеру. Он должен содержать не только
         * заголовок, но и ссылки «Ссылки сюда / Связанные правки / ...».
         */
        var panel = heading;
        var bestPanel = null;

        for (var depth = 0; depth < 10 && panel && panel.parentElement; depth += 1) {
            panel = panel.parentElement;
            if (!elementIsVisible(panel)) { continue; }

            var rect = panel.getBoundingClientRect();
            var label = normalizedUiText(panel);

            var hasToolsText =
                label.indexOf('инструменты для страницы') !== -1 ||
                label.indexOf('page tools') !== -1;

            var hasKnownLinks =
                label.indexOf('ссылки сюда') !== -1 ||
                label.indexOf('связанные правки') !== -1 ||
                label.indexOf('служебные страницы') !== -1 ||
                label.indexOf('what links here') !== -1 ||
                label.indexOf('related changes') !== -1;

            if (
                hasToolsText &&
                rect.width >= 220 &&
                rect.width <= 620 &&
                rect.height >= 180 &&
                rect.height <= Math.max(900, window.innerHeight * 1.2)
            ) {
                bestPanel = panel;
                if (hasKnownLinks) { break; }
            }
        }

        panel = bestPanel || heading.parentElement;
        if (!panel || !panel.getBoundingClientRect) { return null; }

        var panelRect = panel.getBoundingClientRect();
        var targetX = panelRect.right - 26;
        var targetY = panelRect.top + 27;

        /*
         * Ищем квадратную кнопку в правом верхнем углу.
         * На Fandom это как раз кнопка с четырьмя квадратиками.
         */
        var candidates = Array.prototype.slice.call(document.querySelectorAll(
            'button,[role="button"],a[role="button"]'
        )).filter(function (button) {
            if (!elementIsVisible(button)) { return false; }
            if (button.closest && button.closest('#' + PANEL_ID + ',#' + TAB_ID)) { return false; }

            var r = button.getBoundingClientRect();
            return (
                r.width >= 22 && r.width <= 100 &&
                r.height >= 22 && r.height <= 100 &&
                r.left >= panelRect.left - 70 &&
                r.right <= panelRect.right + 70 &&
                r.top >= panelRect.top - 55 &&
                r.bottom <= panelRect.top + 120
            );
        });

        var best = null;
        var bestScore = -Infinity;

        candidates.forEach(function (button) {
            var r = button.getBoundingClientRect();
            var cx = r.left + r.width / 2;
            var cy = r.top + r.height / 2;
            var distance = Math.hypot(cx - targetX, cy - targetY);

            var desc = [
                button.getAttribute && button.getAttribute('aria-label'),
                button.getAttribute && button.getAttribute('title'),
                button.getAttribute && button.getAttribute('data-testid'),
                button.id,
                button.className && typeof button.className === 'string' ? button.className : '',
                button.innerHTML && button.innerHTML.length < 800 ? button.innerHTML : ''
            ].filter(Boolean).join(' ').toLowerCase();

            var score = 260 - distance * 2.4;

            if (button.getAttribute && button.getAttribute('aria-expanded') === 'true') { score += 120; }
            if (/(инструмент|tools|page.tool|utility|utilities|widget|grid|more)/i.test(desc)) { score += 85; }

            var svg = button.querySelector && button.querySelector('svg');
            if (svg) {
                score += 15;
                var tinyShapes = svg.querySelectorAll('rect,path,circle');
                if (tinyShapes && tinyShapes.length >= 4) { score += 28; }
            }

            /* Бонус именно за положение в правом верхнем углу панели. */
            if (Math.abs(cx - targetX) < 40 && Math.abs(cy - targetY) < 45) {
                score += 100;
            }

            if (score > bestScore) {
                bestScore = score;
                best = button;
            }
        });

        /*
         * Если DOM-кнопку не нашли — берём реальный элемент прямо в точке,
         * где на скрине расположен значок 2x2.
         */
        if (!best && document.elementFromPoint) {
            var hit = document.elementFromPoint(
                Math.max(0, Math.min(window.innerWidth - 1, targetX)),
                Math.max(0, Math.min(window.innerHeight - 1, targetY))
            );
            if (hit) {
                best = hit.closest ? hit.closest('button,[role="button"],a[role="button"]') : null;
            }
        }

        return {
            panel: panel,
            heading: heading,
            toggle: best,
            rect: {
                left: panelRect.left,
                top: panelRect.top,
                right: panelRect.right,
                bottom: panelRect.bottom,
                width: panelRect.width,
                height: panelRect.height
            }
        };
    }

    function snapshotPanelInlineState(panel) {
        if (!panel) { return null; }
        return {
            display: panel.style.display || '',
            visibility: panel.style.visibility || '',
            opacity: panel.style.opacity || '',
            pointerEvents: panel.style.pointerEvents || '',
            maxHeight: panel.style.maxHeight || '',
            overflow: panel.style.overflow || '',
            ariaHidden: panel.getAttribute('aria-hidden')
        };
    }

    function forceHideFandomPageToolsPanel(panel) {
        if (!panel) { return false; }
        if (!fandomPageToolsPanelSnapshot) {
            fandomPageToolsPanelSnapshot = snapshotPanelInlineState(panel);
        }
        fandomPageToolsPanel = panel;

        panel.style.setProperty('display', 'none', 'important');
        panel.style.setProperty('visibility', 'hidden', 'important');
        panel.style.setProperty('pointer-events', 'none', 'important');
        panel.setAttribute('aria-hidden', 'true');

        return true;
    }

    function restoreForcedFandomPageToolsPanel() {
        var panel = fandomPageToolsPanel;
        var snapshot = fandomPageToolsPanelSnapshot;

        fandomPageToolsPanel = null;
        fandomPageToolsPanelSnapshot = null;

        if (!panel || !snapshot || !document.documentElement.contains(panel)) {
            return false;
        }

        panel.style.display = snapshot.display;
        panel.style.visibility = snapshot.visibility;
        panel.style.opacity = snapshot.opacity;
        panel.style.pointerEvents = snapshot.pointerEvents;
        panel.style.maxHeight = snapshot.maxHeight;
        panel.style.overflow = snapshot.overflow;

        if (snapshot.ariaHidden == null) {
            panel.removeAttribute('aria-hidden');
        } else {
            panel.setAttribute('aria-hidden', snapshot.ariaHidden);
        }

        return true;
    }

    function dispatchRealisticClick(node) {
        if (!node || !document.documentElement.contains(node)) { return false; }
        try {
            var rect = node.getBoundingClientRect();
            var cx = rect.left + Math.max(1, rect.width / 2);
            var cy = rect.top + Math.max(1, rect.height / 2);

            ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function (type) {
                var EventCtor = type.indexOf('pointer') === 0 && window.PointerEvent ? PointerEvent : MouseEvent;
                node.dispatchEvent(new EventCtor(type, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: cx,
                    clientY: cy,
                    button: 0,
                    buttons: type.indexOf('down') !== -1 ? 1 : 0
                }));
            });
            return true;
        } catch (e) {
            try {
                node.click();
                return true;
            } catch (e2) {}
        }
        return false;
    }

    function captureAndCloseFandomPageTools() {
        fandomPageToolsRestore = null;
        fandomPageToolsWasOpen = false;
        fandomPageToolsPanel = null;
        fandomPageToolsPanelSnapshot = null;
        fandomPageToolsRectSnapshot = null;

        var context = findFandomPageToolsContext();
        if (!context || !context.panel || !elementIsVisible(context.panel)) {
            return false;
        }

        fandomPageToolsWasOpen = true;
        fandomPageToolsRestore = context.toggle || null;
        fandomPageToolsPanel = context.panel;
        fandomPageToolsPanelSnapshot = snapshotPanelInlineState(context.panel);
        fandomPageToolsRectSnapshot = context.rect || null;

        /*
         * 1) Сначала пробуем штатную кнопку Fandom.
         */
        if (context.toggle) {
            try { context.toggle.click(); } catch (e) {}
        }

        /*
         * 2) Через кадр проверяем результат. Если панель осталась —
         *    шлём полноценную последовательность mouse/pointer событий.
         */
        window.setTimeout(function () {
            var stillOpen = findFandomPageToolsContext();
            if (!stillOpen || !stillOpen.panel || !elementIsVisible(stillOpen.panel)) { return; }

            var toggle = stillOpen.toggle || fandomPageToolsRestore;
            if (toggle) {
                dispatchRealisticClick(toggle);
            }
        }, 45);

        /*
         * 3) Если Fandom проигнорировал клики — гарантированный fallback:
         *    временно скрываем только найденный контейнер.
         *    При закрытии DFC его исходные стили будут восстановлены.
         */
        window.setTimeout(function () {
            var stillOpen = findFandomPageToolsContext();
            if (stillOpen && stillOpen.panel && elementIsVisible(stillOpen.panel)) {
                forceHideFandomPageToolsPanel(stillOpen.panel);
            } else if (fandomPageToolsPanel && elementIsVisible(fandomPageToolsPanel)) {
                forceHideFandomPageToolsPanel(fandomPageToolsPanel);
            }
        }, 140);

        return true;
    }

    function restoreFandomPageToolsIfNeeded() {
        if (fandomToolsSuppressionActive) { return; }
        if (!fandomPageToolsWasOpen) { return; }

        var toggle = fandomPageToolsRestore;
        fandomPageToolsWasOpen = false;
        fandomPageToolsRestore = null;

        /*
         * Если мы применяли fallback display:none — сначала возвращаем DOM
         * в исходное состояние. Это само по себе восстанавливает панель,
         * если она была статическим виджетом правой колонки.
         */
        var restoredByStyle = restoreForcedFandomPageToolsPanel();

        window.setTimeout(function () {
            /*
             * Если панель уже видна — всё готово.
             */
            if (findFandomPageToolsContext()) { return; }

            /*
             * Если штатное закрытие действительно переключило состояние,
             * повторно нажимаем ту же кнопку, чтобы вернуть панель.
             */
            if (toggle && document.documentElement.contains(toggle)) {
                try { toggle.click(); } catch (e) {}
            }

            /*
             * Последний шанс — реалистичный клик, если обычный .click()
             * Fandom проигнорировал.
             */
            window.setTimeout(function () {
                if (findFandomPageToolsContext()) { return; }
                if (toggle && document.documentElement.contains(toggle)) {
                    dispatchRealisticClick(toggle);
                }
            }, 90);
        }, restoredByStyle ? 40 : 80);
    }

    function pageToolsTextScore(node) {
        if (!node) { return 0; }
        var t = normalizedUiText(node);
        var score = 0;
        if (t.indexOf('инструменты для страницы') !== -1 || t.indexOf('page tools') !== -1) { score += 100; }

        [
            'ссылки сюда',
            'связанные правки',
            'загрузить файл',
            'служебные страницы',
            'версия для печати',
            'постоянная ссылка',
            'сведения о странице',
            'what links here',
            'related changes',
            'upload file',
            'special pages',
            'printable version',
            'permanent link',
            'page information'
        ].forEach(function (needle) {
            if (t.indexOf(needle) !== -1) { score += 12; }
        });

        return score;
    }

    function findRadicalPageToolsPanel() {
        /*
         * Берём самый маленький видимый контейнер, который явно содержит
         * заголовок «Инструменты для страницы» и несколько характерных ссылок.
         * Это радикальнее и надёжнее, чем попытки нажать кнопку Fandom.
         */
        var headings = Array.prototype.slice.call(document.querySelectorAll(
            'h1,h2,h3,h4,h5,strong,b,[role="heading"],div,span'
        )).filter(function (node) {
            if (!elementIsVisible(node)) { return false; }
            var t = normalizedUiText(node);
            return t === 'инструменты для страницы' ||
                t === 'page tools' ||
                t.indexOf('инструменты для страницы') === 0;
        });

        var best = null;
        var bestArea = Infinity;
        var bestScore = 0;

        headings.forEach(function (heading) {
            var node = heading;
            for (var depth = 0; depth < 12 && node; depth += 1, node = node.parentElement) {
                if (!node || !node.getBoundingClientRect) { continue; }
                if (node.closest && node.closest('#' + PANEL_ID + ',#' + TAB_ID)) { continue; }

                var rect = node.getBoundingClientRect();
                if (rect.width < 220 || rect.height < 160) { continue; }
                if (rect.width > 700 || rect.height > Math.max(1050, window.innerHeight * 1.35)) { continue; }

                var score = pageToolsTextScore(node);
                if (score < 124) { continue; }

                var area = rect.width * rect.height;
                if (score > bestScore || (score === bestScore && area < bestArea)) {
                    best = node;
                    bestArea = area;
                    bestScore = score;
                }
            }
        });

        return best;
    }

    function rememberSuppressedNode(node) {
        if (!node) { return; }
        for (var i = 0; i < fandomToolsSuppressed.length; i += 1) {
            if (fandomToolsSuppressed[i].node === node) { return; }
        }
        fandomToolsSuppressed.push({
            node: node,
            styleAttribute: node.getAttribute('style'),
            ariaHidden: node.getAttribute('aria-hidden')
        });
    }

    function radicallyHidePageToolsNow() {
        if (!fandomToolsSuppressionActive) { return false; }

        var panel = findRadicalPageToolsPanel();
        if (!panel) { return false; }

        rememberSuppressedNode(panel);

        /*
         * Тут уже без церемоний: панель Fandom насильно убирается из layout.
         * !important нужен, потому что React/Fandom может прописывать display
         * или visibility своими стилями после нашего кода.
         */
        panel.style.setProperty('display', 'none', 'important');
        panel.style.setProperty('visibility', 'hidden', 'important');
        panel.style.setProperty('opacity', '0', 'important');
        panel.style.setProperty('pointer-events', 'none', 'important');
        panel.style.setProperty('height', '0', 'important');
        panel.style.setProperty('min-height', '0', 'important');
        panel.style.setProperty('max-height', '0', 'important');
        panel.style.setProperty('overflow', 'hidden', 'important');
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('data-lof-ci-force-hidden', '1');

        return true;
    }

    function startRadicalPageToolsSuppression() {
        /* Deprecated in 1.10.7: exact #rail-tab-overview is used instead. */
        return;
        if (fandomToolsSuppressionActive) {
            radicallyHidePageToolsNow();
            return;
        }

        fandomToolsSuppressionActive = true;
        radicallyHidePageToolsNow();

        /*
         * React может пересоздать блок после того, как мы его спрятали.
         * Поэтому следим за DOM и ещё дублируем проверку таймером.
         */
        if (window.MutationObserver && document.body) {
            fandomToolsSuppressObserver = new MutationObserver(function () {
                if (!fandomToolsSuppressionActive) { return; }
                window.clearTimeout(foreignOverlayCloseTimer);
                foreignOverlayCloseTimer = window.setTimeout(radicallyHidePageToolsNow, 20);
            });

            try {
                fandomToolsSuppressObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style', 'class', 'aria-expanded', 'aria-hidden']
                });
            } catch (e) {}
        }

        window.clearInterval(fandomToolsSuppressInterval);
        fandomToolsSuppressInterval = window.setInterval(function () {
            if (fandomToolsSuppressionActive) {
                radicallyHidePageToolsNow();
            }
        }, 180);
    }

    function stopRadicalPageToolsSuppression(restore) {
        fandomToolsSuppressionActive = false;

        if (fandomToolsSuppressObserver) {
            try { fandomToolsSuppressObserver.disconnect(); } catch (e) {}
            fandomToolsSuppressObserver = null;
        }

        window.clearInterval(fandomToolsSuppressInterval);
        fandomToolsSuppressInterval = 0;

        if (restore !== false) {
            fandomToolsSuppressed.forEach(function (entry) {
                var node = entry && entry.node;
                if (!node || !document.documentElement.contains(node)) { return; }

                if (entry.styleAttribute == null) {
                    node.removeAttribute('style');
                } else {
                    node.setAttribute('style', entry.styleAttribute);
                }

                if (entry.ariaHidden == null) {
                    node.removeAttribute('aria-hidden');
                } else {
                    node.setAttribute('aria-hidden', entry.ariaHidden);
                }

                node.removeAttribute('data-lof-ci-force-hidden');
            });
        }

        fandomToolsSuppressed = [];
    }

    function getFandomOverviewRailButton() {
        return document.getElementById('rail-tab-overview');
    }

    function getFandomOverviewRailPanel(button) {
        button = button || getFandomOverviewRailButton();
        if (!button) { return null; }

        var panelId = button.getAttribute('aria-controls') || 'rail-tab-panel-overview';
        return document.getElementById(panelId);
    }

    function fandomOverviewRailIsOpen(button) {
        button = button || getFandomOverviewRailButton();
        if (!button) { return false; }

        /*
         * Fandom может оставлять is-active / aria-selected="true",
         * даже когда правая панель уже визуально свернута.
         * Поэтому смотрим НЕ на кнопку, а на реальный controlled panel:
         * #rail-tab-panel-overview
         */
        var panel = getFandomOverviewRailPanel(button);
        if (!panel) { return false; }

        var style;
        try { style = window.getComputedStyle(panel); } catch (e) { style = null; }

        if (style) {
            if (style.display === 'none' || style.visibility === 'hidden') { return false; }
            if (Number(style.opacity) === 0) { return false; }
        }

        if (panel.getAttribute('aria-hidden') === 'true') { return false; }
        if (panel.hidden === true) { return false; }

        var rect = panel.getBoundingClientRect();
        if (rect.width <= 4 || rect.height <= 4) { return false; }

        /*
         * Панель должна реально занимать место на экране.
         * Это защищает от случая, когда DOM есть, но rail свернут.
         */
        return rect.right > 0 &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.top < window.innerHeight;
    }

    function closeExactFandomOverviewRail() {
        var button = getFandomOverviewRailButton();
        if (!button) { return false; }

        /*
         * Нажимаем #rail-tab-overview ТОЛЬКО если его controlled panel
         * (#rail-tab-panel-overview) реально сейчас открыт и видим.
         *
         * Если rail уже свернут — вообще не трогаем кнопку.
         * Это исправляет ситуацию, когда открытие DFC само раскрывает
         * уже закрытую панель Fandom.
         */
        var currentlyOpen = fandomOverviewRailIsOpen(button);

        if (!currentlyOpen || fandomOverviewRailClosedByDFC) {
            return false;
        }

        fandomOverviewRailWasOpen = true;
        fandomOverviewRailRestorePending = true;

        try {
            button.click();
            fandomOverviewRailClosedByDFC = true;
            return true;
        } catch (e) {
            return false;
        }
    }

    function clearOverviewRailRestoreTimers() {
        fandomOverviewRailRestoreTimers.forEach(function (timer) {
            window.clearTimeout(timer);
        });
        fandomOverviewRailRestoreTimers = [];
    }

    function restoreExactFandomOverviewRail() {
        /*
         * Ключевое исправление 1.10.9:
         * если МЫ закрыли #rail-tab-overview одним кликом,
         * то при закрытии DFC МЫ просто нажимаем ЕГО ЕЩЁ РАЗ.
         *
         * Никаких проверок is-active / aria-selected при возврате.
         * Они у Fandom могут оставаться true даже у свернутого rail.
         */
        if (!fandomOverviewRailClosedByDFC) {
            fandomOverviewRailWasOpen = false;
            fandomOverviewRailRestorePending = false;
            return false;
        }

        clearOverviewRailRestoreTimers();

        var restored = false;

        function attemptRestore() {
            if (restored || !fandomOverviewRailClosedByDFC) { return true; }

            var button = getFandomOverviewRailButton();
            if (!button) { return false; }

            try {
                button.click();
                restored = true;
                fandomOverviewRailClosedByDFC = false;
                fandomOverviewRailWasOpen = false;
                fandomOverviewRailRestorePending = false;
                clearOverviewRailRestoreTimers();
                return true;
            } catch (e) {
                return false;
            }
        }

        /*
         * Первая попытка сразу. Остальные нужны только если Fandom в момент
         * закрытия DFC перерисовал кнопку и её ещё нет в DOM.
         * После первого успешного click остальные таймеры отменяются.
         */
        if (attemptRestore()) { return true; }

        [60, 140, 300, 650, 1100].forEach(function (delay) {
            var timer = window.setTimeout(attemptRestore, delay);
            fandomOverviewRailRestoreTimers.push(timer);
        });

        return true;
    }

    function closeFandomOverlays() {
        /*
         * Закрываем только уже открытые элементы интерфейса Fandom:
         * уведомления, утилиты/виджеты, dropdown/popover-панели.
         * Ничего не скрываем стилями и не меняем саму систему Fandom.
         */
        var ownPanel = document.getElementById(PANEL_ID);
        var ownTab = document.getElementById(TAB_ID);
        var ownSummary = document.getElementById(ACHIEVEMENT_SUMMARY_ID);
        var ownWeeklySummary = document.getElementById(WEEKLY_SUMMARY_ID);

        function isOwn(node) {
            return !!(node && (
                node === ownPanel ||
                node === ownTab ||
                node === ownSummary ||
                node === ownWeeklySummary ||
                (ownPanel && ownPanel.contains(node)) ||
                (ownTab && ownTab.contains(node)) ||
                (ownSummary && ownSummary.contains(node)) ||
                (ownWeeklySummary && ownWeeklySummary.contains(node))
            ));
        }

        function descriptiveText(node) {
            if (!node || !node.getAttribute) { return ''; }
            var parts = [
                node.getAttribute('aria-label'),
                node.getAttribute('title'),
                node.getAttribute('data-testid'),
                node.id,
                node.className && typeof node.className === 'string' ? node.className : '',
                node.textContent && node.textContent.length < 180 ? node.textContent : ''
            ];
            return parts.filter(Boolean).join(' ').toLowerCase();
        }

        var uiPattern = /(уведом|notification|виджет|widget|утилит|utilities|utility|инструмент|tools|popover|dropdown|drawer|global.navigation)/i;

        /* Сначала сворачиваем открытые триггеры Fandom. */
        var triggers = Array.prototype.slice.call(document.querySelectorAll(
            'button[aria-expanded="true"],[role="button"][aria-expanded="true"],.wds-dropdown.wds-is-active>.wds-dropdown__toggle'
        ));
        triggers.forEach(function (trigger) {
            if (isOwn(trigger)) { return; }
            if (trigger.id === 'rail-tab-overview') { return; }
            if (fandomPageToolsRestore && trigger === fandomPageToolsRestore) { return; }
            var desc = descriptiveText(trigger);
            var parent = trigger.closest ? trigger.closest('[class],[id],[role]') : null;
            if (uiPattern.test(desc) || uiPattern.test(descriptiveText(parent))) {
                try { trigger.click(); } catch (e) {}
            }
        });

        /* Затем ищем кнопки закрытия только внутри явно подходящих панелей. */
        var containers = Array.prototype.slice.call(document.querySelectorAll(
            '[role="dialog"],[aria-modal="true"],.wds-dropdown__content,[class*="popover"],[class*="drawer"],[class*="notification"],[class*="widget"],[class*="utility"]'
        ));
        containers.forEach(function (container) {
            if (isOwn(container)) { return; }
            if (container.id === 'rail-tab-panel-overview') { return; }
            if (fandomPageToolsPanel && (
                container === fandomPageToolsPanel ||
                container.contains(fandomPageToolsPanel) ||
                fandomPageToolsPanel.contains(container)
            )) { return; }
            var desc = descriptiveText(container);
            if (!uiPattern.test(desc)) { return; }
            var close = container.querySelector(
                'button[aria-label*="закры" i],button[aria-label*="close" i],button[title*="закры" i],button[title*="close" i],[role="button"][aria-label*="закры" i],[role="button"][aria-label*="close" i]'
            );
            if (close && !isOwn(close)) {
                try { close.click(); } catch (e) {}
            }
        });

        /*
         * Escape помогает штатным Fandom-панелям, которые закрываются
         * через общий обработчик. Наш код игнорирует synthetic Escape.
         */
        try {
            var esc = new KeyboardEvent('keydown', {
                key: 'Escape',
                code: 'Escape',
                keyCode: 27,
                which: 27,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(esc);
        } catch (e) {}
    }

    function closeFandomOverlaysRobust() {
        /*
         * 1.10.7:
         * Сначала закрываем ТОЧНО известную кнопку правой панели Fandom.
         * Селектор получен прямо из DOM:
         * #rail-tab-overview
         */
        closeExactFandomOverviewRail();

        /*
         * Остальной generic-close оставляем только для уведомлений /
         * других popover Fandom. Он больше не отвечает за overview rail.
         */
        closeFandomOverlays();

        window.clearTimeout(foreignOverlayCloseTimer);
        window.clearTimeout(foreignOverlayCloseTimer2);

        foreignOverlayCloseTimer = window.setTimeout(closeFandomOverlays, 140);
        foreignOverlayCloseTimer2 = window.setTimeout(closeFandomOverlays, 360);
    }

    function resetSettingsView() {
        var panel = document.getElementById(PANEL_ID);
        if (!panel) { return; }
        var pane = panel.querySelector('.lof-ci-settings-pane');
        if (pane) {
            pane.classList.remove('is-open');
            pane.scrollTop = 0;
        }
        panel.classList.remove('is-settings-open');
        var gear = panel.querySelector('.lof-ci-settings');
        if (gear) { gear.setAttribute('aria-expanded', 'false'); }
    }

    function togglePanel(forceOpen) {
        var open = typeof forceOpen === 'boolean' ? forceOpen : state.ui.collapsed === true;
        /* При любом новом открытии/закрытии настройки сбрасываются к ленте. */
        resetSettingsView();
        if (open) {
            /*
             * Новое открытие DFC.
             * Если rail Fandom уже закрыт — оставляем его закрытым и
             * НЕ выполняем click по #rail-tab-overview.
             */
            if (!fandomOverviewRailClosedByDFC) {
                fandomOverviewRailWasOpen = false;
                fandomOverviewRailRestorePending = false;
            }
            closeFandomOverlaysRobust();
        }
        state.ui.collapsed = !open;
        schedulePersist();
        scheduleRender();

        if (open) {
            setTimeout(function () {
                var panel = document.getElementById(PANEL_ID);
                var focus = panel && panel.querySelector('.lof-ci-collapse');
                if (focus) { focus.focus(); }
            }, 40);
        } else {
            window.clearTimeout(foreignOverlayCloseTimer);
            window.clearTimeout(foreignOverlayCloseTimer2);
            foreignOverlayCloseTimer = 0;
            foreignOverlayCloseTimer2 = 0;

            /*
             * На всякий случай выключаем старый suppression-код,
             * но НЕ восстанавливаем его guessed DOM-снимки.
             */
            stopRadicalPageToolsSuppression(false);

            /*
             * Возвращаем только тот rail, который был реально открыт
             * до запуска Новостного агентства DFC.
             */
            restoreExactFandomOverviewRail();
        }
    }

    function mountUi() {
        if (isDisabled() || document.getElementById(PANEL_ID)) { return; }
        installStyles();

        var tab = document.createElement('button');
        tab.id = TAB_ID;
        tab.type = 'button';
        tab.classList.add('is-booting');

        /*
         * Сразу создаём вкладку в правильном состоянии.
         * Раньше она сначала рисовалась как закрытая/обычная, а renderPanel()
         * менял классы уже ПОСЛЕ вставки в DOM — отсюда короткая вспышка.
         */
        if (state.ui.collapsed === false) {
            tab.classList.add('is-open');
        }
        tab.setAttribute('aria-controls', PANEL_ID);
        tab.setAttribute('aria-label', 'Открыть Новостное агентство DFC');
        tab.setAttribute('data-lof-tip-title', 'Новостное агентство DFC');
        tab.setAttribute('data-lof-tip', 'Открыть новости, достижения, сводку недели и события сообщества.');
        tab.innerHTML = '<span class="lof-ci-tab-emblem" aria-hidden="true"><span>DFC</span></span><span class="lof-ci-tab-label">Новости</span><span class="lof-ci-tab-mini">АГЕНТСТВО</span><span class="lof-ci-tab-new">НОВОЕ</span><span class="lof-ci-count" aria-label="Непрочитанные"></span>';
        tab.addEventListener('click', function () { togglePanel(); });
        document.body.appendChild(tab);

        var panel = document.createElement('aside');
        panel.id = PANEL_ID;
        panel.classList.add('is-booting');

        /*
         * Критично: is-collapsed ставится ДО appendChild().
         * Поэтому при F5 браузер ни одного кадра не видит открытую панель,
         * которую потом приходится молниеносно задвигать за экран.
         */
        if (state.ui.collapsed !== false) {
            panel.classList.add('is-collapsed');
        }
        if (state.settings.compact === true) {
            panel.classList.add('is-compact');
        }

        panel.setAttribute('aria-label', 'Новостное агентство DFC');
        panel.innerHTML =
            '<div class="lof-ci-head">' +
                '<div class="lof-ci-head-row">' +
                    '<div class="lof-ci-agency-seal" aria-hidden="true">DFC</div>' +
                    '<div class="lof-ci-title-wrap"><div class="lof-ci-title-kicker"><span class="lof-ci-live-dot"></span> DFC сообщает</div><div class="lof-ci-title">Новостное агентство DFC</div></div>' +
                    '<button type="button" class="lof-ci-settings" aria-label="Настройки новостей" aria-expanded="false" data-lof-tip-title="Настройки" data-lof-tip="Открыть настройки содержания, интерфейса и звука Новостного агентства DFC.">⚙</button>' +
                    '<button type="button" class="lof-ci-collapse" aria-label="Закрыть Новостное агентство DFC" data-lof-tip-title="Закрыть новости" data-lof-tip="Закрыть панель агентства. После закрытия у края экрана снова появится вкладка «Новости»."><span class="lof-ci-collapse-icon" aria-hidden="true">×</span><span class="lof-ci-collapse-text">Закрыть</span></button>' +
                '</div>' +
                '<div class="lof-ci-stats"></div>' +
                '<div class="lof-ci-actions">' +
                    '<button type="button" class="lof-ci-archive-toggle" data-lof-tip-title="Архив новостей" data-lof-tip="Посмотреть более старые записи Новостного агентства DFC.">Архив</button>' +
                    '<button type="button" class="lof-ci-read-all" data-lof-tip-title="Прочитать всё" data-lof-tip="Пометить все текущие новости прочитанными. Для наград также снимутся маркеры «Новое» в профиле.">Прочитать всё</button>' +
                '</div>' +
            '</div>' +
            '<div class="lof-ci-settings-pane"></div>' +
            '<div class="lof-ci-filters" aria-label="Рубрики новостей">' +
                '<button type="button" class="lof-ci-filter lof-ci-filter-main" data-filter="all" data-lof-tip-title="Все новости" data-lof-tip="Общая лента DFC: награды, сообщество, Летопись, Зал славы и обновления системы."><span class="lof-ci-filter-icon">✦</span><span>Все</span><span class="lof-ci-filter-count" data-filter-count="all">0</span></button>' +
                '<button type="button" class="lof-ci-filter lof-ci-filter-main" data-filter="awards" data-lof-tip-title="Награды" data-lof-tip="Полученные достижения и редкие подсказки о наградах, к которым вы уже близки."><span class="lof-ci-filter-icon">◆</span><span>Награды</span><span class="lof-ci-filter-count" data-filter-count="awards">0</span></button>' +
                '<button type="button" class="lof-ci-filter lof-ci-filter-main" data-filter="community" data-lof-tip-title="Сообщество" data-lof-tip="Обсуждения, ответы, поддержка, одобрения и другие события сообщества."><span class="lof-ci-filter-icon">●</span><span>Сообщество</span><span class="lof-ci-filter-count" data-filter-count="community">0</span></button>' +
                '<span class="lof-ci-filter-separator" aria-hidden="true"></span>' +
                '<button type="button" class="lof-ci-filter lof-ci-filter-participants" data-filter="participants" data-lof-tip-title="Последние достижения участников" data-lof-tip="Показать 10 последних публичных достижений других участников, по 5 на странице. Это read-only раздел: он не создаёт уведомлений и не влияет на непрочитанные новости."><span class="lof-ci-filter-icon">◈</span><span>Участники</span><span class="lof-ci-filter-count" data-filter-count="participants">…</span></button>' +
                '<button type="button" class="lof-ci-filter" data-filter="favorites" data-lof-tip-title="Избранное" data-lof-tip="Новости, которые вы сами отметили звёздочкой ★.">★ Избранное <span class="lof-ci-filter-count" data-filter-count="favorites">0</span></button>' +
                '<button type="button" class="lof-ci-filter" data-filter="chronicle" data-lof-tip-title="Летопись" data-lof-tip="Личные вехи вашего пути: этапы коллекции и памятные записи. Здесь нет обновлений каталога, сообщества и Зала славы.">Летопись <span class="lof-ci-filter-count" data-filter-count="chronicle">0</span></button>' +
                '<button type="button" class="lof-ci-filter" data-filter="hall" data-lof-tip-title="Зал славы" data-lof-tip="Значимые изменения вашего места, вход в новые рубежи и личные рекорды.">Зал славы <span class="lof-ci-filter-count" data-filter-count="hall">0</span></button>' +
                '<button type="button" class="lof-ci-filter lof-ci-filter-link" data-filter="updates" data-lof-tip-title="Страница обновлений" data-lof-tip="Открыть отдельную страницу «Обновления», где публикуются изменения системы, новые достижения и официальные сообщения DFC.">Обновления <span class="lof-ci-filter-count" data-filter-count="updates">0</span><span class="lof-ci-filter-link-mark" aria-hidden="true">↗</span></button>' +
            '</div>' +
            '<div class="lof-ci-weekly"></div>' +
            '<div class="lof-ci-daily"></div>' +
            '<div class="lof-ci-headline"></div>' +
            '<div class="lof-ci-scroll"></div>' +
            '<div class="lof-ci-pagination" aria-label="Страницы новостей" hidden></div>' +
            '<div class="lof-ci-resize-handle" role="separator" tabindex="0" aria-orientation="horizontal" aria-label="Изменить высоту панели" data-lof-tip-title="Высота панели" data-lof-tip="Потяните нижний край вверх, чтобы сделать панель короче. Потяните вниз, чтобы снова увеличить её."></div>';
        document.body.appendChild(panel);
        applyPanelHeight(state.ui.panelHeight, false);

        panel.querySelector('.lof-ci-collapse').addEventListener('click', function () { togglePanel(false); });
        panel.querySelector('.lof-ci-read-all').addEventListener('click', markAllRead);
        panel.querySelector('.lof-ci-archive-toggle').style.display = 'none';
        panel.querySelector('.lof-ci-archive-toggle').addEventListener('click', function () {
            state.ui.archiveOpen = false;
            state.ui.page = 1;
            schedulePersist();
            scheduleRender();
        });

        var resizeHandle = panel.querySelector('.lof-ci-resize-handle');
        if (resizeHandle) {
            var resizing = false;
            var resizeStartY = 0;
            var resizeStartHeight = 0;

            resizeHandle.addEventListener('pointerdown', function (event) {
                if (event.button != null && event.button !== 0) { return; }
                resizing = true;
                resizeStartY = event.clientY;
                resizeStartHeight = panel.getBoundingClientRect().height;
                panel.classList.add('is-resizing');
                hideControlTip();
                try { resizeHandle.setPointerCapture(event.pointerId); } catch (e) {}
                event.preventDefault();
            });

            resizeHandle.addEventListener('pointermove', function (event) {
                if (!resizing) { return; }
                /*
                 * Верх остаётся неподвижным.
                 * Двигается только нижняя граница:
                 * вверх = панель ниже по высоте, вниз = выше по высоте.
                 */
                var nextHeight = resizeStartHeight + (event.clientY - resizeStartY);
                applyPanelHeight(nextHeight, false);
                event.preventDefault();
            });

            function finishResize(event) {
                if (!resizing) { return; }
                resizing = false;
                panel.classList.remove('is-resizing');
                try {
                    if (event && event.pointerId != null) {
                        resizeHandle.releasePointerCapture(event.pointerId);
                    }
                } catch (e) {}
                state.ui.panelHeight = panel.getBoundingClientRect().height;
                applyPanelHeight(state.ui.panelHeight, true);
            }

            resizeHandle.addEventListener('pointerup', finishResize);
            resizeHandle.addEventListener('pointercancel', finishResize);

            resizeHandle.addEventListener('keydown', function (event) {
                var current = panel.getBoundingClientRect().height;
                var step = event.shiftKey ? 48 : 20;
                if (event.key === 'ArrowUp') {
                    applyPanelHeight(current - step, true);
                    event.preventDefault();
                } else if (event.key === 'ArrowDown') {
                    applyPanelHeight(current + step, true);
                    event.preventDefault();
                } else if (event.key === 'Home') {
                    applyPanelHeight(panelHeightBounds().min, true);
                    event.preventDefault();
                } else if (event.key === 'End') {
                    applyPanelHeight(panelHeightBounds().max, true);
                    event.preventDefault();
                }
            });
        }
        panel.querySelector('.lof-ci-settings').addEventListener('click', function () {
            var pane = panel.querySelector('.lof-ci-settings-pane');
            var opened = !pane.classList.contains('is-open');
            pane.classList.toggle('is-open', opened);
            panel.classList.toggle('is-settings-open', opened);
            this.setAttribute('aria-expanded', opened ? 'true' : 'false');
            if (opened) {
                var scroller = panel.querySelector('.lof-ci-scroll');
                if (scroller) { scroller.scrollTop = 0; }
                pane.scrollTop = 0;
                hideControlTip();
            }
        });
        panel.querySelectorAll('.lof-ci-filter').forEach(function (button) {
            button.addEventListener('click', function () {
                var filterKey = button.getAttribute('data-filter') || 'all';

                if (filterKey === 'updates') {
                    window.location.assign(mw.util.getUrl(UPDATES_PAGE));
                    return;
                }

                state.ui.filter = filterKey;
                state.ui.archiveOpen = false;
                state.ui.page = 1;
                var scroller = panel.querySelector('.lof-ci-scroll');
                if (scroller) { scroller.scrollTop = 0; }
                schedulePersist();
                scheduleRender();
                if (filterKey === 'participants') {
                    refreshRecentParticipantAchievements();
                }
            });
        });
        renderSettings(panel);
        bindControlTips(document);
        document.addEventListener('pointerdown', function () {
            ensureAudioContext();
        }, { passive: true, capture: true });
        document.addEventListener('keydown', function () {
            ensureAudioContext();
        }, { capture: true });

        window.addEventListener('resize', function () {
            applyPanelHeight(state.ui.panelHeight, false);
        }, { passive: true });

        panel.addEventListener('touchstart', function (event) {
            if (event.touches && event.touches.length === 1) {
                touchStartX = event.touches[0].clientX;
            }
        }, { passive: true });
        panel.addEventListener('touchend', function (event) {
            if (touchStartX == null || !event.changedTouches || !event.changedTouches.length) { return; }
            var delta = event.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (delta > 75) { togglePanel(false); }
        }, { passive: true });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && event.isTrusted !== false && state.ui.collapsed === false) {
                togglePanel(false);
                tab.focus();
            }
        });

        renderPanel();

        /*
         * Два requestAnimationFrame дают браузеру сначала отрисовать уже
         * правильное конечное состояние. Только после этого возвращаем
         * обычные анимации для реального открытия/закрытия пользователем.
         */
        var finishInitialPaint = function () {
            var mountedPanel = document.getElementById(PANEL_ID);
            var mountedTab = document.getElementById(TAB_ID);
            if (mountedPanel) { mountedPanel.classList.remove('is-booting'); }
            if (mountedTab) { mountedTab.classList.remove('is-booting'); }
        };

        if (typeof root.requestAnimationFrame === 'function') {
            root.requestAnimationFrame(function () {
                root.requestAnimationFrame(finishInitialPaint);
            });
        } else {
            window.setTimeout(finishInitialPaint, 0);
        }
    }

    function isDisabled() {
        try { return localStorage.getItem(DISABLED_KEY) === '1'; } catch (error) { return false; }
    }

    function removeUi() {
        var panel = document.getElementById(PANEL_ID);
        var tab = document.getElementById(TAB_ID);
        if (panel) { panel.remove(); }
        if (tab) { tab.remove(); }
    }


    function status() {
        var result = {
            build: BUILD,
            enabled: !isDisabled(),
            loggedIn: isLoggedIn(),
            participant: isParticipant(),
            events: state.events.length,
            unread: unreadCount(),
            collapsed: state.ui.collapsed,
            filter: state.ui.filter,
            page: state.ui.page,
            pageSize: FEED_PAGE_SIZE,
            panelHeight: Math.round(document.getElementById(PANEL_ID) ? document.getElementById(PANEL_ID).getBoundingClientRect().height : clampPanelHeight(state.ui.panelHeight)),
            runtimeReady: !!runtime,
            popupHook: wrappedPopup,
            catalogHash: catalogCache ? publicCatalogSnapshot(catalogCache).hash : null,
            autoCatalog: true,
            autoUpdatesArticle: true,
            updatesPage: UPDATES_PAGE,
            updatesWatchIntervalMinutes: Math.round(UPDATES_WATCH_INTERVAL_MS / 60000),
            updatesRevisionId: updatesRevisionId || null,
            participantFeed: {
                limit: PARTICIPANT_RECENT_LIMIT,
                pageSize: FEED_PAGE_SIZE,
                loaded: participantRecentAchievements.length,
                loading: participantRecentLoading === true,
                loadedAt: participantRecentLoadedAt || null,
                freshAt: participantRecentFreshAt || null,
                notifications: false
            },
            recentLimit: MAX_RECENT_EVENTS,
            favoriteLimit: MAX_FAVORITE_EVENTS,
            catalogWatchIntervalMinutes: Math.round(CATALOG_WATCH_INTERVAL_MS / 60000),
            catalogRevisionFingerprint: catalogRevisionFingerprint || null,
            archiveOpen: state.ui.archiveOpen === true,
            favorites: favoriteCount(),
            sort: 'rubrics:newest',
            sound: state.settings.sound === true,
            weekly: weeklySummaryData(state.events),
            snoozedUntil: Number(state.meta.snoozeUntil || 0) || null,
            settings: clone(state.settings)
        };
        console.log('[Lofarian Chronicle Inbox] status:', result);
        return result;
    }

    function selfTest() {
        var checks = [];

        function check(name, condition, details) {
            checks.push({
                test: name,
                ok: condition === true,
                details: details || ''
            });
        }

        var dummyEarned = { type: 'achievement-earned', achievementId: 'demo-id' };
        var dummyCatalog = { type: 'catalog', subtype: 'new-achievement', achievementId: 'demo-id' };
        var dummyRank = { type: 'rank' };
        var dummyUpdate = {
            type: 'news',
            subtype: 'article-update',
            title: 'Обновление 7.1 — пример',
            href: mw.util.getUrl(UPDATES_PAGE) + '#Demo'
        };

        check(
            'Полученная награда ведёт в профиль',
            eventLink(dummyEarned).indexOf('User:') !== -1 && eventLink(dummyEarned).indexOf('lofAchievement=demo-id') !== -1,
            eventLink(dummyEarned)
        );

        check(
            'Новое достижение ведёт на общую страницу',
            eventLink(dummyCatalog).indexOf('lofAchievement=demo-id') !== -1 &&
                eventLink(dummyCatalog).indexOf('User:') === -1,
            eventLink(dummyCatalog)
        );

        check(
            'Рейтинг ведёт к пользователю в Зале славы',
            eventLink(dummyRank).indexOf('lofHallUser=') !== -1,
            eventLink(dummyRank)
        );

        check(
            'Обновление ведёт к разделу статьи',
            eventLink(dummyUpdate).indexOf('#Demo') !== -1,
            eventLink(dummyUpdate)
        );

        check(
            'Заголовок обновления не переписывается',
            dummyUpdate.title === 'Обновление 7.1 — пример' && kindLabel(dummyUpdate) === 'Обновление',
            dummyUpdate.title + ' / ' + kindLabel(dummyUpdate)
        );

        var demoEvents = [];
        var i;
        for (i = 0; i < 80; i += 1) {
            demoEvents.push({
                id: 'normal-' + String(i),
                type: 'news',
                createdAt: 100000 - i,
                favorite: false
            });
        }
        for (i = 0; i < 110; i += 1) {
            demoEvents.push({
                id: 'fav-' + String(i),
                type: 'news',
                createdAt: 200000 - i,
                favorite: true
            });
        }
        var retained = retainStoredEvents(demoEvents);
        var retainedFavorites = retained.filter(function (event) { return event.favorite === true; }).length;
        var retainedNormal = retained.filter(function (event) { return event.favorite !== true; }).length;

        check('Лимит обычных = 50', retainedNormal === 50, String(retainedNormal));
        check('Лимит избранных = 100', retainedFavorites === 100, String(retainedFavorites));
        check('Звук включён', state.settings.sound === true, String(state.settings.sound));

        var result = {
            build: BUILD,
            passed: checks.filter(function (item) { return item.ok; }).length,
            total: checks.length,
            checks: checks
        };

        try { console.table(checks); } catch (error) { console.log(checks); }
        console.log('[Lofarian Chronicle Inbox] selfTest:', result);
        return result;
    }

    root.LofarianChronicleInbox = {
        __standalone: true,
        build: BUILD,
        open: function () { togglePanel(true); },
        close: function () { togglePanel(false); },
        toggle: function () { togglePanel(); },
        readAll: markAllRead,
        status: status,
        snooze7h: snoozeForSevenHours,
        showNow: cancelSnooze,
        rescanCatalog: function () { return refreshCatalogFromSource('ручной rescan'); },
        checkCatalog: function () { return checkCatalogForUpdates(true); },
        checkUpdates: function () { return checkUpdatesArticleForNews(true); },
        selfTest: selfTest,
        testSound: function () {
            ensureAudioContext();
            return playNotificationSound({ type: 'news', priority: 'important', rarity: 'legendary' }, true);
        },
        disable: function () {
            try { localStorage.setItem(DISABLED_KEY, '1'); } catch (error) {}
            removeUi();
            console.log('[Lofarian Chronicle Inbox] Отключено только дополнение «Новостное агентство DFC».');
        },
        enable: function () {
            try { localStorage.removeItem(DISABLED_KEY); } catch (error) {}
            console.log('[Lofarian Chronicle Inbox] Дополнение включено. Перезагрузка страницы завершит подключение обработчиков.');
            if (root.location && typeof root.location.reload === 'function') { root.location.reload(); }
        },
        settings: function (next) {
            if (next && typeof next === 'object') {
                state.settings = Object.assign(state.settings, next);
                schedulePersist();
                scheduleRender();
            }
            return clone(state.settings);
        }
    };

    function exposeAdminAliases() {
        try {
            if (root.LofarianAchievements && root.LofarianAchievements.admin) {
                if (!root.LofarianAchievements.admin.inboxStatus) {
                    root.LofarianAchievements.admin.inboxStatus = status;
                }
                if (!root.LofarianAchievements.admin.inboxRescanCatalog) {
                    root.LofarianAchievements.admin.inboxRescanCatalog = function () {
                        return refreshCatalogFromSource('admin rescan');
                    };
                }
            }
        } catch (error) {}
    }

    function bootstrap() {
        loadState();
        scheduleSnoozeWake();
        setupCrossTabSync();
        isReady = true;
        if (!isDisabled()) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    mountUi();
                    jumpToHallUserIfRequested();
                    jumpToCatalogAchievementIfRequested();
                    checkUpdatesArticleForNews(true);
                }, { once: true });
            } else {
                mountUi();
                jumpToHallUserIfRequested();
                jumpToCatalogAchievementIfRequested();
                checkUpdatesArticleForNews(true);
            }
        }
        if (isDisabled()) {
            console.log('[Lofarian Chronicle Inbox] Дополнение отключено аварийным переключателем.');
            return;
        }

        wrapAchievementPopupWhenReady();
        startUpdatesArticleAutoIngest();

        var waitRuntime = 0;
        var runtimeTimer = setInterval(function () {
            waitRuntime += 1;
            runtime = root.__LofarianAchievementsInternal || runtime;
            exposeAdminAliases();
            if (isParticipant() && runtime && runtime.has && runtime.has('readCatalog')) {
                clearInterval(runtimeTimer);
                resolveRuntimeAndInspect();
                return;
            }
            if (!isParticipant() && waitRuntime > 35) {
                clearInterval(runtimeTimer);
                scheduleRender();
                return;
            }
            if (waitRuntime > 240) {
                clearInterval(runtimeTimer);
            }
        }, 150);
    }

    if (!root.mw || !mw.loader || typeof mw.loader.using !== 'function') {
        console.warn('[Lofarian Chronicle Inbox] MediaWiki loader недоступен.');
        return;
    }

    mw.loader.using(['mediawiki.api', 'mediawiki.util', 'user.options']).then(bootstrap).catch(function (error) {
        console.error('[Lofarian Chronicle Inbox] Не удалось запустить дополнение:', error);
    });
})(window);