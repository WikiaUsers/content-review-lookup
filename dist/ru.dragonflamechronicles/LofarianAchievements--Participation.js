/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.5 PARTICIPATION COPY / OPT-IN
Страница Fandom: MediaWiki:LofarianAchievements/Participation.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Лёгкий добровольный opt-in слой системы достижений. Он определяет, участвует ли
текущий зарегистрированный пользователь, показывает ненавязчивое приглашение
гостям/неучастникам и оформляет пользовательскую страницу Летопись Лофариана Вики:Достижения.

ДАННЫЕ / I/O
- Согласие зарегистрированного пользователя хранится штатным MediaWiki
  action=options в user-script preference `userjs-lofarian-achievements-participation`.
- Для НОВОГО участника там же сохраняется только Unix-время opt-in в
  `userjs-lofarian-achievements-started-at`; оно является нижней границей
  исторических метрик и не содержит содержимого действий пользователя.
- Для Discussions сохраняется только числовой общий postCount на момент opt-in
  (`userjs-lofarian-achievements-discussion-baseline-total`), чтобы вычесть
  старые сообщения из будущего общего счётчика.
- Временное «Не сейчас» хранится только локально в localStorage браузера.
- «Больше не показывать» для зарегистрированного пользователя дополнительно
  сохраняется в user-script preference `userjs-lofarian-achievements-invite`.
- Для одноразового распознавания участников старой версии может быть выполнен
  один пакетный read-only MediaWiki API запрос к одному Users-сегменту и одному
  Progress-сегменту текущего пользователя.

ПРИВАТНОСТЬ И БЕЗОПАСНОСТЬ
- Участие полностью добровольное; отказ не ограничивает чтение вики.
- Неучастники могут просматривать достижения других пользователей и Зал славы.
- Файл не получает пароль/email/cookie, не использует внешние серверы, трекеры,
  eval/new Function, обфускацию или удалённый исполняемый код.
- Он не выдаёт MediaWiki/Fandom rights и не скрывает рекламу.

ПРОИЗВОДИТЕЛЬНОСТЬ
На обычной странице для гостя/неучастника после этого модуля тяжёлый движок
Achievements не загружается. Полный runtime подключается только участникам либо
в viewer-mode на профилях/Зале славы, чтобы просмотр чужих достижений оставался
доступен всем.
===============================================================================
*/
(function (root) {
    'use strict';

    var I = root.__LofarianAchievementsInternal;
    if (!I) {
        throw new Error('[Lofarian Achievements] Bootstrap runtime отсутствует: Participation');
    }

    var PARTICIPATION_PAGE = 'Летопись Лофариана Вики:Достижения';
    var PARTICIPATION_OPTION = 'userjs-lofarian-achievements-participation';
    var PARTICIPATION_STARTED_OPTION = 'userjs-lofarian-achievements-started-at';
    var DISCUSSION_BASELINE_OPTION = 'userjs-lofarian-achievements-discussion-baseline-total';
    var INVITE_OPTION = 'userjs-lofarian-achievements-invite';
    var JOIN_SESSION_KEY = 'lof-achievements-just-joined-v1';
    var INVITE_STORAGE_PREFIX = 'lof-achievements-invite-state-v1:';

    /*
     * Первый отказ — 7 часов. Каждый следующий отказ увеличивает паузу.
     * Отдельная кнопка «Больше не показывать» отключает приглашение бессрочно.
     */
    var SNOOZE_HOURS = [7, 24, 72, 168, 720, 2160];



    function nowUnix() {
        return Math.floor(Date.now() / 1000);
    }

    function normalizeStartedAt(value) {
        value = Math.floor(Number(value) || 0);
        return value >= 946684800 ? value : 0;
    }

    function discussionApiUrl() {
        var scriptPath = String(mw.config.get('wgScriptPath') || '').replace(/\/$/, '');
        return scriptPath + '/wikia.php';
    }

    /*
     * Снимок общего Discussion postCount в момент вступления.
     * Он нужен только как baseline: старые сообщения до opt-in не должны
     * засчитываться в серию «Голос Летописи». Если endpoint недоступен,
     * сохраняется -1 и Metrics/Discussions переходит в безопасный режим,
     * где учитывает только подтверждённые посты после даты вступления.
     */
    function readDiscussionBaselineTotal() {
        if (!isLoggedIn() || !window.jQuery || typeof window.jQuery.ajax !== 'function') {
            return Promise.resolve(-1);
        }

        return window.jQuery.ajax({
            url: discussionApiUrl(),
            method: 'GET',
            dataType: 'json',
            cache: true,
            data: {
                controller: 'DiscussionContribution',
                method: 'getPosts',
                userId: currentUserId(),
                limit: 1,
                responseGroup: 'full',
                viewableOnly: true,
                canViewHiddenPosts: false,
                canViewHiddenPostsInContainer: false,
                containerType: 'FORUM'
            }
        }).then(function (data) {
            var embeddedCount = data && data._embedded && data._embedded.count;
            var total = Number(
                data && data.postCount ||
                embeddedCount && embeddedCount.FORUM ||
                0
            );
            return Number.isFinite(total) && total >= 0 ? Math.floor(total) : -1;
        }).catch(function () {
            return -1;
        });
    }

    function currentUserId() {
        return Math.max(0, Number(mw.config.get('wgUserId')) || 0);
    }

    function currentUserName() {
        return String(mw.config.get('wgUserName') || '').trim();
    }

    function isLoggedIn() {
        return currentUserId() > 0 && !!currentUserName();
    }

    function isInfoPage() {
        var title = String(mw.config.get('wgTitle') || '').trim();
        var ns = String(mw.config.get('wgCanonicalNamespace') || '');
        return title === 'Достижения' && (ns === 'Project' || Number(mw.config.get('wgNamespaceNumber')) === 4);
    }

    function isOrdinaryView() {
        if (String(mw.config.get('wgAction') || 'view') !== 'view') {
            return false;
        }
        return Number(mw.config.get('wgNamespaceNumber')) !== -1;
    }

    function optionValue(name) {
        if (!root.mw || !mw.user || !mw.user.options || typeof mw.user.options.get !== 'function') {
            return '';
        }
        return String(mw.user.options.get(name) || '');
    }

    function updateLocalOption(name, value) {
        if (root.mw && mw.user && mw.user.options && typeof mw.user.options.set === 'function') {
            mw.user.options.set(name, value);
        }
    }

    function setUserOption(name, value) {
        if (!isLoggedIn()) {
            return Promise.reject(new Error('Для изменения настройки требуется вход в аккаунт.'));
        }
        return I.api.postWithToken('csrf', {
            action: 'options',
            optionname: name,
            optionvalue: String(value),
            format: 'json'
        }).then(function (result) {
            updateLocalOption(name, String(value));
            return result;
        });
    }

    function localInviteKey() {
        return INVITE_STORAGE_PREFIX + (isLoggedIn() ? String(currentUserId()) : 'anon');
    }

    function loadInviteState() {
        var value = {};
        try {
            value = JSON.parse(localStorage.getItem(localInviteKey()) || '{}');
        } catch (error) {
            value = {};
        }
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            value = {};
        }
        return {
            dismissCount: Math.max(0, Math.floor(Number(value.dismissCount) || 0)),
            snoozeUntil: Math.max(0, Math.floor(Number(value.snoozeUntil) || 0)),
            never: value.never === true
        };
    }

    function saveInviteState(state) {
        try {
            localStorage.setItem(localInviteKey(), JSON.stringify(state));
        } catch (error) {
            /* localStorage недоступен — просто не сохраняем локальную паузу. */
        }
    }

    function dismissTemporarily() {
        var state = loadInviteState();
        state.dismissCount += 1;
        var index = Math.min(state.dismissCount - 1, SNOOZE_HOURS.length - 1);
        state.snoozeUntil = Date.now() + SNOOZE_HOURS[index] * 60 * 60 * 1000;
        state.never = false;
        saveInviteState(state);
        removeInvite();
        return state;
    }

    function dismissForever() {
        var state = loadInviteState();
        state.never = true;
        state.snoozeUntil = 0;
        saveInviteState(state);
        removeInvite();

        if (isLoggedIn()) {
            return setUserOption(INVITE_OPTION, 'never').catch(function (error) {
                console.warn('[Lofarian Achievements] Не удалось синхронизировать постоянный отказ:', error);
                return null;
            });
        }
        return Promise.resolve(null);
    }

    function shouldShowInvite(active) {
        if (active || isInfoPage() || !isOrdinaryView()) {
            return false;
        }
        if (isLoggedIn() && optionValue(INVITE_OPTION) === 'never') {
            return false;
        }
        var state = loadInviteState();
        if (state.never) {
            return false;
        }
        return Date.now() >= state.snoozeUntil;
    }

    function infoUrl() {
        return mw.util.getUrl(PARTICIPATION_PAGE);
    }

    function openInfoPage() {
        window.location.assign(infoUrl());
    }

    function removeInvite() {
        var node = document.getElementById('lof-participation-invite');
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }

    function makeButton(label, className, handler) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.textContent = label;
        button.addEventListener('click', handler);
        return button;
    }

    function showInvite() {
        if (document.getElementById('lof-participation-invite')) {
            return;
        }

        var popup = document.createElement('aside');
        popup.id = 'lof-participation-invite';
        popup.className = 'lof-participation-invite';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Приглашение в систему достижений');

        var mark = document.createElement('div');
        mark.className = 'lof-participation-invite-mark';
        mark.textContent = '✦';

        var body = document.createElement('div');
        body.className = 'lof-participation-invite-body';

        var eyebrow = document.createElement('div');
        eyebrow.className = 'lof-participation-eyebrow';
        eyebrow.textContent = 'Летопись достижений';

        var title = document.createElement('div');
        title.className = 'lof-participation-invite-title';
        title.textContent = 'Откройте Лофариан по-новому';

        var text = document.createElement('div');
        text.className = 'lof-participation-invite-text';
        text.textContent = 'Исследуйте статьи, открывайте новые уголки мира, участвуйте в жизни вики и получайте достижения за своё путешествие. Участие полностью добровольное. Если захотите, система начнёт сохранять ваш прогресс и собирать собственную коллекцию наград.';

        var actions = document.createElement('div');
        actions.className = 'lof-participation-actions';
        actions.appendChild(makeButton('Узнать больше', 'lof-participation-primary', openInfoPage));
        actions.appendChild(makeButton('Не сейчас', 'lof-participation-secondary', dismissTemporarily));
        actions.appendChild(makeButton('Больше не показывать', 'lof-participation-tertiary', dismissForever));

        body.appendChild(eyebrow);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(actions);
        popup.appendChild(mark);
        popup.appendChild(body);
        document.body.appendChild(popup);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                popup.classList.add('is-visible');
            });
        });
    }

    function getProgressSegmentNumber(username) {
        var name = String(username || '').replace(/_/g, ' ').trim().toLowerCase();
        var hash = Array.from(name).length * 71;
        var weights = {
            'a': 3, 'e': 5, 'i': 7, 'o': 11, 'u': 13, 'y': 17,
            'а': 19, 'е': 23, 'ё': 29, 'и': 31, 'о': 37, 'у': 41,
            'ы': 43, 'э': 47, 'ю': 53, 'я': 59,
            '0': 61, '1': 67, '2': 71, '3': 73, '4': 79,
            '5': 83, '6': 89, '7': 97, '8': 101, '9': 103, ' ': 107
        };
        Object.keys(weights).forEach(function (character) {
            var count = 0;
            Array.from(name).forEach(function (item) {
                if (item === character) { count += 1; }
            });
            hash += count * weights[character];
        });
        return ((hash % 256) + 256) % 256;
    }

    function escapeRegExp(text) {
        return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function pageContent(page) {
        var revision = page && page.revisions && page.revisions[0];
        if (!revision) { return ''; }
        if (revision.slots && revision.slots.main && revision.slots.main.content !== undefined) {
            return String(revision.slots.main.content || '');
        }
        return String(revision.content || revision['*'] || '');
    }

    function detectLegacyParticipation() {
        if (!isLoggedIn()) {
            return Promise.resolve(false);
        }

        var seenKey = 'lof-achievements-seen:user:' + currentUserId();
        try {
            var seen = JSON.parse(localStorage.getItem(seenKey) || '{}');
            if (seen && typeof seen === 'object' && Object.keys(seen).length > 0) {
                return Promise.resolve(true);
            }
        } catch (error) {
            /* Идём к read-only серверной проверке. */
        }

        var userSegment = (currentUserId() % 256).toString(16).padStart(2, '0');
        var progressSegment = getProgressSegmentNumber(currentUserName());
        var titles = [
            'Project:LofarianAchievementsUsers/' + userSegment,
            'Project:LofarianAchievementsProgress/' + String(progressSegment)
        ];

        return I.api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: titles.join('|'),
            formatversion: 2,
            format: 'json'
        }).then(function (data) {
            var pages = (data.query && data.query.pages) || [];
            var all = pages.map(pageContent).join('\n');
            var protectedPattern = new RegExp('"' + String(currentUserId()) + '"\\s*:\\s*\\{');
            var normalizedName = String(currentUserName()).replace(/_/g, ' ').trim();
            var progressPattern = new RegExp('(?:^|\\n)(?:L7|L6|L5|LOFREAD[1-4])\\|' + escapeRegExp(normalizedName) + '\\|');
            return protectedPattern.test(all) || progressPattern.test(all);
        }).catch(function (error) {
            console.warn('[Lofarian Achievements] Legacy participation check пропущен:', error);
            return false;
        });
    }

    function resolveActiveState() {
        if (!isLoggedIn()) {
            return Promise.resolve(false);
        }

        var stored = optionValue(PARTICIPATION_OPTION);
        if (stored === '1') {
            return Promise.resolve(true);
        }
        if (stored === '0') {
            return Promise.resolve(false);
        }

        return detectLegacyParticipation().then(function (legacy) {
            if (!legacy) {
                /*
                 * Одноразово фиксируем, что миграция старой системы проверена.
                 * Это НЕ отказ от приглашения и не мешает позже нажать
                 * «Принять участие», зато на следующих страницах не требуется
                 * повторно читать технические сегменты.
                 */
                return setUserOption(PARTICIPATION_OPTION, '0').then(function () {
                    return false;
                }).catch(function () {
                    return false;
                });
            }
            return setUserOption(PARTICIPATION_OPTION, '1').then(function () {
                return true;
            }).catch(function () {
                /* Даже если preference не сохранилась, в этой сессии не выключаем старого участника. */
                return true;
            });
        });
    }

    /*
     * RC11.9.29 — ДОБРОВОЛЬНЫЙ ПОЛНЫЙ ОТКАЗ ОТ УЧАСТИЯ.
     *
     * НАЗНАЧЕНИЕ
     * Позволяет участнику самостоятельно и необратимо выйти из программы.
     * При подтверждённом отказе удаляются текущие персональные записи системы:
     * - запись достижений пользователя из Project:LofarianAchievementsUsers/*;
     * - запись прогресса пользователя из Project:LofarianAchievementsProgress/*;
     * - пользовательская страница настроек паспорта;
     * - participation preferences и локальные клиентские следы системы.
     *
     * ВАЖНО
     * Сегменты Project/* являются общими для нескольких пользователей, поэтому
     * удаляется только собственная запись участника, а не весь технический
     * сегмент. Это защищает данные остальных участников.
     *
     * История правок MediaWiki физически не стирается обычным пользовательским
     * API. Если удаление пользовательской страницы паспорта недоступно текущим
     * правам, текущие настройки всё равно будут заменены пустым содержимым;
     * отказ не отменяется из-за этой технической особенности.
     */
    function clearLocalParticipationData() {
        var userId = currentUserId();
        var username = currentUserName().replace(/ /g, '_').toLowerCase();
        var exactKeys = [
            'lof-achievements-seen:user:' + String(userId),
            'lof-achievements-news-seen-v1:user:' + String(userId),
            'lof-achievements-profile-viewed-v1:user:' + String(userId),
            'lof-achievements-reading-progress-v3:user:' + String(userId),
            'lof-achievements-invite-state-v1:' + String(userId),
            'lof-chronicler-stat-passport-v2:' + username,
            'lof-chronicler-passport-id-v2:' + username
        ];

        [window.localStorage, window.sessionStorage].forEach(function (storage) {
            if (!storage) { return; }
            exactKeys.forEach(function (key) {
                try { storage.removeItem(key); } catch (error) {}
            });
            try { storage.removeItem(JOIN_SESSION_KEY); } catch (error) {}
        });
    }

    function deletePassportPage(api, username) {
        var title = 'User:' + String(username || '').trim().replace(/ /g, '_') + '/LofarianChroniclerCard';
        if (!username) { return Promise.resolve(false); }

        return api.get({
            action: 'query',
            prop: 'info',
            titles: title,
            formatversion: 2
        }).then(function (response) {
            var page = response && response.query && response.query.pages && response.query.pages[0];
            if (!page || page.missing) { return false; }
            return api.postWithToken('csrf', {
                action: 'delete',
                title: title,
                reason: 'Добровольный отказ от участия в программе достижений',
                watchlist: 'nochange',
                formatversion: 2
            }).then(function () {
                return true;
            }).catch(function (error) {
                /*
                 * Обычный участник не всегда имеет право физически удалить
                 * собственную страницу. Тогда очищаем её содержимое. Если API
                 * удаления упал по иной причине, повторная запись пустого текста
                 * всё равно убирает действующие настройки паспорта из системы.
                 */
                return api.postWithToken('csrf', {
                    action: 'edit',
                    title: title,
                    text: '',
                    summary: 'Добровольный отказ от участия: удаление настроек паспорта',
                    minor: true,
                    watchlist: 'nochange',
                    assert: 'user',
                    formatversion: 2
                }).then(function () {
                    return true;
                });
            });
        });
    }

    function removeOwnAchievementRecord() {
        var userId = currentUserId();
        if (!userId) { return Promise.resolve(false); }

        return I.invoke('readUserSegment', [userId, true]).then(function (loaded) {
            if (!loaded || !loaded.exists || !loaded.data || !loaded.data.users) {
                return false;
            }
            var key = String(userId);
            if (!Object.prototype.hasOwnProperty.call(loaded.data.users, key)) {
                return false;
            }
            delete loaded.data.users[key];
            return I.invoke('saveSegment', [loaded]).then(function () { return true; });
        });
    }

    function removeOwnProgressRecord() {
        var username = currentUserName();
        if (!username) { return Promise.resolve(false); }

        return I.invoke('readProgressSegment', [username, true]).then(function (loaded) {
            if (!loaded || !loaded.exists || !loaded.segment) {
                return false;
            }
            var key = String(username).replace(/_/g, ' ');
            var index = loaded.segment.indexes[key];
            if (index === undefined || index === null) {
                return false;
            }
            var lines = loaded.segment.lines.slice();
            lines.splice(index, 1);
            var text = lines.join('\n');
            return I.invoke('postProgressSegmentText', [loaded, text]).then(function () {
                I.invoke('clearProgressSegmentCache', [username]);
                return true;
            });
        });
    }

    /*
     * Красивое модальное подтверждение вместо нативных confirm/prompt/alert.
     * Нативные окна браузера визуально выбивались из оформления Летописи и
     * не давали нормально объяснить необратимость действия.
     */
    function ensureRefusalModalStyles() {
        if (document.getElementById('lof-refusal-modal-styles')) { return; }
        var style = document.createElement('style');
        style.id = 'lof-refusal-modal-styles';
        style.textContent = [
            '.lof-refusal-overlay{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(35,29,20,.48);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);opacity:0;transition:opacity .2s ease}',
            '.lof-refusal-overlay.is-visible{opacity:1}',
            '.lof-refusal-modal{width:min(560px,calc(100vw - 32px));box-sizing:border-box;background:linear-gradient(145deg,#f7efd9 0%,#eee1c2 100%);color:#382f23;border:1px solid rgba(112,87,39,.42);border-radius:18px;box-shadow:0 22px 70px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.55);position:relative;overflow:hidden;transform:translateY(12px) scale(.985);transition:transform .22s ease}',
            '.lof-refusal-overlay.is-visible .lof-refusal-modal{transform:none}',
            '.lof-refusal-modal:before{content:"";position:absolute;inset:9px;border:1px solid rgba(126,101,54,.22);border-radius:12px;pointer-events:none}',
            '.lof-refusal-content{position:relative;padding:34px 38px 30px}',
            '.lof-refusal-mark{width:48px;height:48px;margin:0 0 18px;border:1px solid rgba(126,101,54,.45);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;color:#7b6434;background:rgba(255,250,235,.52);box-shadow:inset 0 0 0 5px rgba(126,101,54,.06)}',
            '.lof-refusal-eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a744a;margin-bottom:7px}',
            '.lof-refusal-title{font:700 27px/1.15 Georgia,serif;margin:0 0 11px;color:#332b20}',
            '.lof-refusal-text{font-size:14px;line-height:1.55;color:#665b49;margin:0 0 17px}',
            '.lof-refusal-list{margin:0 0 22px;padding:13px 16px 13px 33px;border-radius:11px;background:rgba(255,251,239,.55);border:1px solid rgba(126,101,54,.16);font-size:13px;line-height:1.7;color:#514735}',
            '.lof-refusal-warning{margin:0 0 22px;padding:11px 13px;border-left:3px solid #b86b62;background:rgba(184,107,98,.08);border-radius:0 9px 9px 0;font-size:12px;line-height:1.5;color:#6c433e}',
            '.lof-refusal-label{display:block;font-size:12px;font-weight:700;color:#66583e;margin:0 0 7px}',
            '.lof-refusal-input{width:100%;box-sizing:border-box;padding:11px 13px;border-radius:9px;border:1px solid rgba(126,101,54,.38);background:rgba(255,253,245,.86);color:#382f23;font:700 14px Georgia,serif;outline:none;transition:border-color .15s,box-shadow .15s}',
            '.lof-refusal-input:focus{border-color:#9a7b3e;box-shadow:0 0 0 3px rgba(154,123,62,.13)}',
            '.lof-refusal-error{min-height:18px;margin:7px 0 0;font-size:12px;color:#a34e46}',
            '.lof-refusal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:20px}',
            '.lof-refusal-btn{appearance:none;border-radius:9px;padding:10px 16px;border:1px solid rgba(126,101,54,.34);font:700 12px/1.2 Arial,sans-serif;cursor:pointer;transition:transform .12s,background .12s,box-shadow .12s}',
            '.lof-refusal-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(70,54,30,.1)}',
            '.lof-refusal-btn:disabled{opacity:.58;cursor:wait;transform:none;box-shadow:none}',
            '.lof-refusal-cancel{background:rgba(255,251,239,.7);color:#594c38}',
            '.lof-refusal-next{background:#dfcf9f;color:#3f3321}',
            '.lof-refusal-danger{background:#9c5b52;color:#fff8ef;border-color:#844a43}',
            '.lof-refusal-status{font-size:13px;line-height:1.5;color:#6a5d49;padding:13px 0 2px}',
            '@media(max-width:600px){.lof-refusal-content{padding:29px 25px 25px}.lof-refusal-title{font-size:23px}.lof-refusal-actions{flex-direction:column-reverse}.lof-refusal-btn{width:100%;padding:12px 14px}}'
        ].join('');
        document.head.appendChild(style);
    }

    function closeRefusalModal(overlay, resolve) {
        if (!overlay) { resolve(false); return; }
        overlay.classList.remove('is-visible');
        window.setTimeout(function () {
            if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
            resolve(false);
        }, 190);
    }

    function showRefusalConfirmation() {
        ensureRefusalModalStyles();

        return new Promise(function (resolve) {
            var overlay = document.createElement('div');
            overlay.className = 'lof-refusal-overlay';
            overlay.setAttribute('role', 'presentation');

            var modal = document.createElement('section');
            modal.className = 'lof-refusal-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'lof-refusal-title');

            var content = document.createElement('div');
            content.className = 'lof-refusal-content';

            var mark = document.createElement('div');
            mark.className = 'lof-refusal-mark';
            mark.textContent = '✦';

            var eyebrow = document.createElement('div');
            eyebrow.className = 'lof-refusal-eyebrow';
            eyebrow.textContent = 'Летопись достижений';

            var title = document.createElement('h2');
            title.id = 'lof-refusal-title';
            title.className = 'lof-refusal-title';
            title.textContent = 'Выход из программы';

            var text = document.createElement('p');
            text.className = 'lof-refusal-text';
            text.textContent = 'Вы собираетесь прекратить участие в программе. После подтверждения персональные данные Летописи будут удалены.';

            var list = document.createElement('ul');
            list.className = 'lof-refusal-list';
            ['достижения и текущий прогресс','статистика участия и дата вступления','паспорт летописца и его настройки','связанные локальные данные программы'].forEach(function (item) {
                var li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });

            var warning = document.createElement('div');
            warning.className = 'lof-refusal-warning';
            warning.textContent = 'Статьи, правки, изображения, сообщения и ваш аккаунт Fandom не затрагиваются. Удаление данных программы нельзя отменить автоматически.';

            var actions = document.createElement('div');
            actions.className = 'lof-refusal-actions';

            var cancel = document.createElement('button');
            cancel.type = 'button';
            cancel.className = 'lof-refusal-btn lof-refusal-cancel';
            cancel.textContent = 'Остаться в программе';

            var next = document.createElement('button');
            next.type = 'button';
            next.className = 'lof-refusal-btn lof-refusal-next';
            next.textContent = 'Продолжить';

            actions.appendChild(cancel);
            actions.appendChild(next);
            content.appendChild(mark);
            content.appendChild(eyebrow);
            content.appendChild(title);
            content.appendChild(text);
            content.appendChild(list);
            content.appendChild(warning);
            content.appendChild(actions);
            modal.appendChild(content);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            var finished = false;
            function finish(value) {
                if (finished) { return; }
                finished = true;
                overlay.classList.remove('is-visible');
                window.setTimeout(function () {
                    if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
                    resolve(value);
                }, 190);
            }

            cancel.addEventListener('click', function () { finish(false); });
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) { finish(false); }
            });
            next.addEventListener('click', function () {
                content.innerHTML = '';

                var mark2 = document.createElement('div');
                mark2.className = 'lof-refusal-mark';
                mark2.textContent = '⚠';
                var eyebrow2 = document.createElement('div');
                eyebrow2.className = 'lof-refusal-eyebrow';
                eyebrow2.textContent = 'Последнее подтверждение';
                var title2 = document.createElement('h2');
                title2.className = 'lof-refusal-title';
                title2.textContent = 'Подтвердите окончательный отказ';
                var text2 = document.createElement('p');
                text2.className = 'lof-refusal-text';
                text2.textContent = 'Чтобы продолжить, введите слово ОТКАЗ. Это защищает от случайного удаления данных.';
                var label = document.createElement('label');
                label.className = 'lof-refusal-label';
                label.textContent = 'Введите ОТКАЗ';
                var input = document.createElement('input');
                input.className = 'lof-refusal-input';
                input.type = 'text';
                input.autocomplete = 'off';
                input.spellcheck = false;
                input.setAttribute('aria-label', 'Введите слово ОТКАЗ');
                var error = document.createElement('div');
                error.className = 'lof-refusal-error';
                var actions2 = document.createElement('div');
                actions2.className = 'lof-refusal-actions';
                var back = document.createElement('button');
                back.type = 'button';
                back.className = 'lof-refusal-btn lof-refusal-cancel';
                back.textContent = 'Назад';
                var confirm = document.createElement('button');
                confirm.type = 'button';
                confirm.className = 'lof-refusal-btn lof-refusal-danger';
                confirm.textContent = 'Удалить данные и выйти';
                actions2.appendChild(back);
                actions2.appendChild(confirm);
                label.htmlFor = 'lof-refusal-confirm-input';
                input.id = 'lof-refusal-confirm-input';
                content.appendChild(mark2);
                content.appendChild(eyebrow2);
                content.appendChild(title2);
                content.appendChild(text2);
                content.appendChild(label);
                content.appendChild(input);
                content.appendChild(error);
                content.appendChild(actions2);
                back.addEventListener('click', function () {
                    finish(false);
                });
                confirm.addEventListener('click', function () {
                    if (String(input.value || '').trim().toLocaleUpperCase('ru') !== 'ОТКАЗ') {
                        error.textContent = 'Введите слово «ОТКАЗ», чтобы подтвердить действие.';
                        input.focus();
                        return;
                    }
                    finish(true);
                });
                input.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') { confirm.click(); }
                    if (event.key === 'Escape') { finish(false); }
                });
                window.setTimeout(function () { input.focus(); }, 30);
            });

            document.addEventListener('keydown', function escapeHandler(event) {
                if (event.key === 'Escape' && !finished) {
                    document.removeEventListener('keydown', escapeHandler);
                    finish(false);
                }
            });

            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () { overlay.classList.add('is-visible'); });
            });
        });
    }

    function refuseParticipation(onConfirmed) {
        if (!isLoggedIn()) {
            return Promise.reject(new Error('Для отказа от участия необходимо войти в аккаунт.'));
        }

        return showRefusalConfirmation().then(function (confirmed) {
            if (!confirmed) { return false; }

            if (typeof onConfirmed === 'function') { onConfirmed(); }

            var api = new mw.Api();
            var username = currentUserName();

            return Promise.all([
                removeOwnAchievementRecord(),
                removeOwnProgressRecord(),
                deletePassportPage(api, username),
                setUserOption(PARTICIPATION_OPTION, '0'),
                setUserOption(PARTICIPATION_STARTED_OPTION, ''),
                setUserOption(DISCUSSION_BASELINE_OPTION, ''),
                setUserOption(INVITE_OPTION, '')
            ]).then(function () {
                clearLocalParticipationData();
                I.participation.active = false;
                I.participation.startedAt = 0;
                I.participation.discussionBaselineTotal = -1;
                window.location.reload();
                return true;
            });
        });
    }

    function buildInfoPanel(target, state, compact) {
        if (!target) { return; }
        target.innerHTML = '';
        target.classList.add('lof-participation-page-panel');
        if (compact) { target.classList.add('is-compact'); }

        var eyebrow = document.createElement('div');
        eyebrow.className = 'lof-participation-eyebrow';
        eyebrow.textContent = 'Летопись достижений';

        var title = document.createElement('h2');
        var text = document.createElement('p');
        var note = document.createElement('p');
        note.className = 'lof-participation-note';
        var actions = document.createElement('div');
        actions.className = 'lof-participation-actions';

        if (state.active) {
            if (compact) {
                title.textContent = 'Спасибо, что вы с нами';
                text.textContent = 'Система достижений создана специально для пользователей и читателей, которые исследуют мир Лофариан, возвращаются к его страницам и помогают вики становиться больше и интереснее.';
                note.textContent = 'Спасибо, что стали частью этой небольшой системы внутри нашего мира. Надеемся, она сделает чтение, исследование и участие в жизни вики немного приятнее.';
            } else {
                title.textContent = 'Ваш путь уже отмечен';
                text.textContent = 'Вы участвуете в системе достижений, поэтому новые открытия, вклад в статьи, активность в обсуждениях и другие события на вики могут становиться частью вашей коллекции наград.';
                note.textContent = 'Исследуйте Лофариан в своём темпе: часть достижений видна заранее, другие остаются скрытыми до самого момента открытия. Полученные награды сохраняются в профиле, а ниже можно посмотреть всю систему, редкости и ещё не открытые достижения.';
                if (!compact) {
                    var refuseButton = makeButton('Отказаться от участия', 'lof-participation-secondary', function () {
                        refuseParticipation(function () {
                            refuseButton.disabled = true;
                            refuseButton.textContent = 'Удаляем данные…';
                        }).catch(function (error) {
                            refuseButton.disabled = false;
                            refuseButton.textContent = 'Отказаться от участия';
                            console.error('[Lofarian Achievements] Не удалось полностью обработать отказ:', error);
                            alert('Не удалось завершить отказ полностью. Данные не считаются удалёнными — попробуйте ещё раз.');
                        });
                    });
                    actions.appendChild(refuseButton);
                }
            }
        } else if (state.loggedIn) {
            title.textContent = compact ? 'Принять участие' : 'Хотите присоединиться к Летописи достижений?';
            text.textContent = 'Участие полностью добровольное. После подключения система начнёт учитывать подходящие действия на этой вики и открывать достижения.';
            note.textContent = 'Если достижения вам неинтересны — ничего включать не нужно. Читать, редактировать вики и смотреть достижения других участников можно без участия в программе.';
            var joinButton = makeButton('Принять участие', 'lof-participation-primary', function () {
                joinButton.disabled = true;
                joinButton.textContent = 'Подключаем…';
                joinAchievementsProgram().catch(function (error) {
                    joinButton.disabled = false;
                    joinButton.textContent = 'Принять участие';
                    console.error('[Lofarian Achievements] Не удалось включить участие:', error);
                    alert('Не удалось подключить систему достижений. Попробуйте ещё раз.');
                });
            });
            actions.appendChild(joinButton);
        } else {
            title.textContent = compact ? 'Нужна учётная запись' : 'Хотите принять участие?';
            text.textContent = 'Чтобы Летопись могла сохранять ваши достижения и прогресс, понадобится бесплатная учётная запись Fandom.';
            note.textContent = 'Регистрация нужна только для участия в системе достижений. Читать вики и смотреть награды других участников можно без аккаунта.';
            var signup = makeButton('Создать аккаунт Fandom', 'lof-participation-primary', function () {
                window.location.assign(mw.util.getUrl('Special:Signup', { returnto: PARTICIPATION_PAGE }));
            });
            var login = makeButton('Войти', 'lof-participation-secondary', function () {
                window.location.assign(mw.util.getUrl('Special:UserLogin', { returnto: PARTICIPATION_PAGE }));
            });
            actions.appendChild(signup);
            actions.appendChild(login);
        }

        target.appendChild(eyebrow);
        target.appendChild(title);
        target.appendChild(text);
        target.appendChild(note);
        if (actions.childNodes.length) {
            target.appendChild(actions);
        }
    }

    function renderInfoPage(state) {
        if (!isInfoPage()) { return; }

        function render() {
            buildInfoPanel(document.getElementById('lof-achievements-participation-hero'), state, false);
            buildInfoPanel(document.getElementById('lof-achievements-participation-cta'), state, true);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', render, { once: true });
        } else {
            render();
        }
    }

    function joinAchievementsProgram() {
        if (!isLoggedIn()) {
            openInfoPage();
            return Promise.resolve(false);
        }

        var startedAt = nowUnix();

        /*
         * Сначала фиксируем серверную дату opt-in и Discussion baseline,
         * и только затем включаем participation=1. Поэтому после перезагрузки
         * тяжёлый runtime уже знает точную нижнюю границу истории.
         */
        return readDiscussionBaselineTotal().then(function (discussionBaseline) {
            return setUserOption(PARTICIPATION_STARTED_OPTION, String(startedAt))
                .then(function () {
                    return setUserOption(DISCUSSION_BASELINE_OPTION, String(discussionBaseline));
                })
                .then(function () {
                    return setUserOption(PARTICIPATION_OPTION, '1');
                });
        }).then(function () {
            try {
                sessionStorage.setItem(JOIN_SESSION_KEY, '1');
            } catch (error) {}
            I.participation.active = true;
            I.participation.startedAt = startedAt;
            I.participation.justJoined = true;
            window.location.reload();
            return true;
        });
    }

    function initParticipationGate() {
        return resolveActiveState().then(function (active) {
            var justJoined = false;
            try {
                justJoined = sessionStorage.getItem(JOIN_SESSION_KEY) === '1';
            } catch (error) {}

            /*
             * Для новых RC10-участников это точный Unix-time нажатия
             * «Принять участие». У старых участников option отсутствует —
             * им оставляем startedAt=0, чтобы не обнулить уже заработанную
             * историческую статистику при миграции.
             */
            var startedAt = active
                ? normalizeStartedAt(optionValue(PARTICIPATION_STARTED_OPTION))
                : 0;
            var baselineOptionValue = active
                ? optionValue(DISCUSSION_BASELINE_OPTION)
                : '';
            var discussionBaselineTotal = baselineOptionValue !== ''
                ? Math.floor(Number(baselineOptionValue))
                : -1;
            if (!Number.isFinite(discussionBaselineTotal)) {
                discussionBaselineTotal = -1;
            }

            I.participation = {
                active: active,
                loggedIn: isLoggedIn(),
                startedAt: startedAt,
                discussionBaselineTotal: discussionBaselineTotal,
                justJoined: justJoined,
                infoPage: isInfoPage(),
                pageTitle: PARTICIPATION_PAGE,
                optionKey: PARTICIPATION_OPTION,
                startedAtOptionKey: PARTICIPATION_STARTED_OPTION,
                discussionBaselineOptionKey: DISCUSSION_BASELINE_OPTION,
                openInfoPage: openInfoPage,
                join: joinAchievementsProgram,
                dismissTemporarily: dismissTemporarily,
                dismissForever: dismissForever
            };

            root.LofarianAchievementsParticipation = {
                isActive: function () { return I.participation.active === true; },
                state: function () {
                    return {
                        active: I.participation.active === true,
                        loggedIn: I.participation.loggedIn === true,
                        startedAt: Number(I.participation.startedAt || 0),
                        infoPage: I.participation.infoPage === true
                    };
                },
                openInfoPage: openInfoPage,
                join: joinAchievementsProgram,
                dismissForNow: dismissTemporarily,
                neverShowInvite: dismissForever
            };

            renderInfoPage(I.participation);
            if (shouldShowInvite(active)) {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', showInvite, { once: true });
                } else {
                    showInvite();
                }
            }
            return I.participation;
        });
    }

    I.registerFunctions('Participation', {
        initParticipationGate: initParticipationGate,
        joinAchievementsProgram: joinAchievementsProgram,
        refuseAchievementsProgram: refuseParticipation,
        openAchievementsInfoPage: openInfoPage,
        dismissParticipationInviteTemporarily: dismissTemporarily,
        dismissParticipationInviteForever: dismissForever
    }, []);
})(window);