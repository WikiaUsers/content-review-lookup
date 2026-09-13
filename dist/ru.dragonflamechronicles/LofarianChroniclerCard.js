/*
===============================================================================
LOFARIAN CHRONICLER CARD v1.3.5 — FANDOM JS REVIEW NOTE
Страница Fandom: MediaWiki:LofarianChroniclerCard.js

НАЗНАЧЕНИЕ ФАЙЛА
Основная логика отдельной системы «Личная карточка летописца» — статистического
паспорта участника программы Lofarian Achievements. Файл не является частью
runtime достижений и не изменяет механику их выдачи.

ЧТО ПОКАЗЫВАЕТ КАРТОЧКА
- дату первого найденного действия пользователя на этой вики;
- дату выдачи паспорта — первое подтверждённое подключение к программе достижений;
- стаж на Википедии мира Лофариан и текущий статус активности;
- общее количество правок;
- количество созданных статей (отдельный usercontribs-фильтр ucshow=new в namespace 0);
- количество загруженных изображений/файлов;
- активность за текущий месяц;
- календарь активности;
- текущую серию дней активности и личный рекорд серии;
- дату последнего действия;
- статистический «почерк летописца»: профиль работы, охват статей, активные дни, среднее и рекорд;
- первый след: первая/последняя созданная статья и самая редактируемая статья;
- ритм активности: самый активный месяц, день недели и распределение деятельности;
- до трёх любимых разделов;
- одну любимую категорию;
- до пяти любимых достижений, выбранных самим пользователем. При выборе доступны только уже полученные награды.
- короткую подпись летописца длиной до 10 символов;
- отметку «Удостоверение действительно» с декоративной печатью Википедии мира Лофариан;
- уникальные локальные роли показываются только внутри паспорта и скрываются из штатной шапки профиля, чтобы не дублироваться рядом с административными группами.
- только уникальные локальные роли сообщества рядом со статусом участника; каждая роль и статус программы имеют собственное описание;
- паспортную серию и номер участника: Phaynipe — PHAY 0001; обычная выдача начинается с AAAA 0001;
- отличающийся от штатной шапки профиля компактный «паспортный» блок;
- улучшенные hover/focus-состояния кликабельных элементов без системных tooltip.
- v1.3.4: единые плавающие hover-подсказки для всех работающих элементов открытого паспорта.
- v1.3.5: подсказки стали долгими (2,4 с) и объясняют не только действие, но и куда ведёт каждая кнопка паспорта.
- кликабельные показатели, календарь, разделы, категория и любимые достижения;
- любимое достижение открывает штатное мини-окно Lofarian Achievements с уже существующим описанием награды.

УЧАСТИЕ В ПРОГРАММЕ
Карточка отображается только для участников программы Lofarian Achievements.
Система достижений используется только как источник признака участия и,
при выборе любимых достижений, как локальный источник каталога/публичных данных.
Карточка не выдаёт награды и не изменяет их состояние.

ДАННЫЕ / I/O
- Статистика читается через стандартный MediaWiki API этой же вики.
- Предпочтения паспорта сохраняются отдельно от базы достижений на личной
  пользовательской подстранице, предназначенной только для настроек карточки.
- Для записи используется стандартный MediaWiki API с CSRF token и текущими
  правами авторизованного пользователя.
- Кэш применяется только для уменьшения повторных запросов и не является
  официальным источником прогресса или наград.

ЧТО ФАЙЛ НЕ ИЗМЕНЯЕТ
- Project:LofarianAchievementsUsers/*;
- Project:LofarianAchievementsProgress/*;
- каталог Project:LofarianAchievementsData/*;
- очки опыта;
- редкости;
- Зал славы;
- правила выдачи достижений;
- AbuseFilter;
- роли и права пользователей;
- рекламу или штатные механизмы Fandom.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Код открыт и человекочитаем.
- eval, new Function, обфускация и удалённый исполняемый код не используются.
- Сторонние серверы, внешние трекеры и аналитика отсутствуют.
- Пароли, email и содержимое авторизационных cookie не читаются.
- Внешняя передача пользовательских данных отсутствует.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Карточка запускается только там, где есть профиль пользователя.
- Повторные инициализации защищены guard-механизмами.
- API-данные временно кэшируются, чтобы не повторять одинаковые запросы.
- Серия/номер вычисляются чтением публичных Users-сегментов Lofarian Achievements и не записываются в них.
- Тяжёлая статистика не записывается в систему достижений.

СОВМЕСТИМОСТЬ
Этот файл является самостоятельной системой и может быть отключён удалением
его подключения из MediaWiki:Common.js без изменения файлов LofarianAchievements.
===============================================================================
*/
(function (mw) {
    'use strict';

    if (!mw || !mw.config || !mw.Api) {
        return;
    }

    var VERSION = '1.3.5';
    var CARD_ID = 'lof-chronicler-card';
    var MODAL_ID = 'lof-chronicler-card-modal';
    var PREFS_MODAL_ID = 'lof-chronicler-preferences-modal';
    var PREFS_MARKER = 'LOFARIAN_CHRONICLER_CARD_PREFS_V1';
    var CATALOG_PAGES = [
        'Project:LofarianAchievementsData',
        'Project:LofarianAchievementsData/Reading',
        'Project:LofarianAchievementsData/Editing',
        'Project:LofarianAchievementsData/Creation',
        'Project:LofarianAchievementsData/Activity',
        'Project:LofarianAchievementsData/Discussions',
        'Project:LofarianAchievementsData/Special',
        'Project:LofarianAchievementsData/Hidden'
    ];
    var STANDARD_SECTIONS = ['Статьи','Обсуждения статей','Участники','Проект','Файлы','Интерфейс','Шаблоны','Справка','Категории','Модули'];
    var ROLE_DATA_PAGE = 'Project:LofarianRolesData';
    var PROGRAM_PARTICIPANT_DESCRIPTION = 'Добровольный участник программы Lofarian Achievements. Для этого пользователя система достижений ведёт подтверждённый прогресс и коллекцию наград на Википедии мира Лофариан.';
    var ROLE_DESCRIPTIONS = {
        developer: 'Разработчик — создаёт, поддерживает и улучшает технические системы Википедии мира Лофариан: интерфейсы, модули и служебные инструменты.',
        chronicler: 'Хронист — работает с содержанием энциклопедии, помогает поддерживать качество, структуру и целостность статей мира Лофариан.',
        cartographer: 'Картограф — специализируется на географии мира, картах, территориях, поселениях и пространственных связях Лофариана.',
        herald: 'Глашатай — помогает вести публичное общение сообщества, обсуждения и информационные разделы Википедии мира Лофариан.',
        sentinel: 'Дозорный — следит за правками и порядком на вики, помогает быстро исправлять нежелательные или ошибочные изменения.'
    };
    var ACHIEVEMENT_USERS_PREFIX = 'Project:LofarianAchievementsUsers/';
    var ACHIEVEMENT_USERS_SEGMENTS = 256;
    var PASSPORT_OWNER = 'phaynipe';
    var PASSPORT_OWNER_SERIES = 'PHAY';
    var PASSPORT_OWNER_NUMBER = 1;
    var PASSPORT_SERIES_CAPACITY = 9999;
    var PASSPORT_ID_CACHE_TTL = 24 * 60 * 60 * 1000;
    var WATCH_TIMEOUT = 25000;
    var CACHE_TTL = 15 * 60 * 1000;
    var observer = null;
    var watchTimer = null;
    var currentData = null;
    var currentUsername = '';
    var loadingPromise = null;
    var catalogChoicesPromise = null;

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function normalizeUser(value) {
        return String(value || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function profileUsername() {
        var relevant = mw.config.get('wgRelevantUserName');
        if (relevant) {
            return normalizeUser(relevant);
        }
        if (Number(mw.config.get('wgNamespaceNumber')) === 2) {
            return normalizeUser(String(mw.config.get('wgTitle') || '').split('/')[0]);
        }
        return '';
    }

    function isOwnProfile(username) {
        var current = normalizeUser(mw.config.get('wgUserName'));
        return !!current && current.toLowerCase() === normalizeUser(username).toLowerCase();
    }

    function ownParticipationActive(username) {
        if (!isOwnProfile(username)) {
            return false;
        }
        try {
            return !!(
                window.LofarianAchievementsParticipation &&
                typeof window.LofarianAchievementsParticipation.isActive === 'function' &&
                window.LofarianAchievementsParticipation.isActive()
            );
        } catch (error) {
            return false;
        }
    }

    function participantAllowed(module, username) {
        if (ownParticipationActive(username)) {
            return true;
        }
        /*
         * На чужом профиле сам официальный модуль достижений является
         * публичным подтверждением участия. Карточка не читает награды из него.
         */
        return !!module;
    }

    function getAvatar() {
        var candidates = [
            '.user-profile-avatar img',
            '.profile-header__avatar img',
            '.user-identity-avatar img',
            '.wds-avatar img',
            '.user-profile-header__avatar img'
        ];
        var src = '';
        candidates.some(function (selector) {
            var node = document.querySelector(selector);
            if (node && node.src) {
                src = node.src;
                return true;
            }
            return false;
        });
        return src;
    }

    function initial(username) {
        return normalizeUser(username || '?').charAt(0).toLocaleUpperCase('ru') || '?';
    }

    function formatNumber(value) {
        try {
            return new Intl.NumberFormat('ru-RU').format(Number(value) || 0);
        } catch (error) {
            return String(Number(value) || 0);
        }
    }


    function padPassportNumber(value) {
        return String(Math.max(1, Math.floor(Number(value) || 1))).padStart(4, '0');
    }

    function passportIdentityCacheKey(username) {
        return 'lof-chronicler-passport-id-v2:' + normalizeUser(username).toLowerCase();
    }

    function readPassportIdentityCache(username) {
        try {
            var raw = localStorage.getItem(passportIdentityCacheKey(username));
            if (!raw) { return null; }
            var parsed = JSON.parse(raw);
            if (!parsed || !parsed.savedAt || Date.now() - Number(parsed.savedAt) > PASSPORT_ID_CACHE_TTL) {
                localStorage.removeItem(passportIdentityCacheKey(username));
                return null;
            }
            if (!parsed.identity || !parsed.identity.series || !parsed.identity.number) { return null; }
            return parsed.identity;
        } catch (error) {
            return null;
        }
    }

    function writePassportIdentityCache(username, identity) {
        try {
            localStorage.setItem(passportIdentityCacheKey(username), JSON.stringify({
                savedAt: Date.now(),
                identity: identity
            }));
        } catch (error) {
            /* Необязательный клиентский кэш. */
        }
    }

    function alphaSeriesFromIndex(index) {
        index = Math.max(0, Math.floor(Number(index) || 0));
        var chars = ['A', 'A', 'A', 'A'];
        for (var pos = 3; pos >= 0; pos--) {
            chars[pos] = String.fromCharCode(65 + (index % 26));
            index = Math.floor(index / 26);
        }
        return chars.join('');
    }

    function alphaSeriesToIndex(series) {
        series = String(series || 'AAAA').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4).padEnd(4, 'A');
        var value = 0;
        for (var i = 0; i < 4; i++) {
            value = value * 26 + Math.max(0, series.charCodeAt(i) - 65);
        }
        return value;
    }

    function normalPassportIdentity(ordinal) {
        ordinal = Math.max(1, Math.floor(Number(ordinal) || 1));
        var zero = ordinal - 1;
        var seriesIndex = Math.floor(zero / PASSPORT_SERIES_CAPACITY);
        var number = zero % PASSPORT_SERIES_CAPACITY + 1;
        var reservedSeriesIndex = alphaSeriesToIndex(PASSPORT_OWNER_SERIES);
        var actualSeriesIndex = seriesIndex >= reservedSeriesIndex ? seriesIndex + 1 : seriesIndex;
        var series = alphaSeriesFromIndex(actualSeriesIndex);

        return {
            series: series,
            number: number,
            numberText: padPassportNumber(number),
            display: series + ' ' + padPassportNumber(number),
            ordinal: ordinal,
            special: false
        };
    }

    function specialPassportIdentity(username) {
        if (normalizeUser(username).toLowerCase() !== PASSPORT_OWNER) { return null; }
        return {
            series: PASSPORT_OWNER_SERIES,
            number: PASSPORT_OWNER_NUMBER,
            numberText: padPassportNumber(PASSPORT_OWNER_NUMBER),
            display: PASSPORT_OWNER_SERIES + ' ' + padPassportNumber(PASSPORT_OWNER_NUMBER),
            ordinal: 1,
            special: true
        };
    }

    function participationTimestampFromAchievementMap(map) {
        if (!map || typeof map !== 'object') { return 0; }
        var direct = Math.floor(Number(map.first_login) || 0);
        if (direct >= 946684800) { return direct; }
        var earliest = 0;
        Object.keys(map).forEach(function (key) {
            var value = Math.floor(Number(map[key]) || 0);
            if (value >= 946684800 && (!earliest || value < earliest)) { earliest = value; }
        });
        return earliest;
    }

    function chunkSimple(items, size) {
        var chunks = [];
        for (var i = 0; i < items.length; i += size) {
            chunks.push(items.slice(i, i + size));
        }
        return chunks;
    }

    function fetchPassportParticipants(api) {
        var titles = [];
        for (var i = 0; i < ACHIEVEMENT_USERS_SEGMENTS; i++) {
            titles.push(ACHIEVEMENT_USERS_PREFIX + i.toString(16).padStart(2, '0'));
        }

        return Promise.all(chunkSimple(titles, 50).map(function (batch) {
            return api.get({
                action: 'query',
                prop: 'revisions',
                titles: batch.join('|'),
                rvprop: 'content',
                rvslots: 'main',
                formatversion: 2
            }).then(function (response) {
                var result = [];
                (response && response.query && response.query.pages || []).forEach(function (page) {
                    var rev = page && page.revisions && page.revisions[0];
                    var content = rev && rev.slots && rev.slots.main && rev.slots.main.content;
                    var parsed = extractCatalogJson(content) || {};
                    Object.keys(parsed.users || {}).forEach(function (userId) {
                        var map = parsed.users[userId];
                        if (!map || typeof map !== 'object' || !Object.keys(map).length) { return; }
                        result.push({
                            userId: Number(userId) || 0,
                            startedAt: participationTimestampFromAchievementMap(map)
                        });
                    });
                });
                return result;
            }).catch(function () {
                return [];
            });
        })).then(function (groups) {
            var byId = Object.create(null);
            groups.forEach(function (group) {
                group.forEach(function (item) {
                    if (!item.userId) { return; }
                    var key = String(item.userId);
                    if (!byId[key] || (item.startedAt && (!byId[key].startedAt || item.startedAt < byId[key].startedAt))) {
                        byId[key] = item;
                    }
                });
            });

            var items = Object.keys(byId).map(function (key) { return byId[key]; });
            var ids = items.map(function (item) { return String(item.userId); });
            if (!ids.length) { return []; }

            return Promise.all(chunkSimple(ids, 50).map(function (batch) {
                return api.get({
                    action: 'query',
                    list: 'users',
                    ususerids: batch.join('|'),
                    formatversion: 2
                }).then(function (response) {
                    return response && response.query && response.query.users || [];
                }).catch(function () {
                    return [];
                });
            })).then(function (userGroups) {
                var names = Object.create(null);
                userGroups.forEach(function (group) {
                    group.forEach(function (user) {
                        if (user && user.userid && !user.missing && !user.invalid) {
                            names[String(user.userid)] = normalizeUser(user.name);
                        }
                    });
                });

                return items.map(function (item) {
                    return {
                        userId: item.userId,
                        username: names[String(item.userId)] || '',
                        startedAt: item.startedAt || 0
                    };
                }).filter(function (item) {
                    return !!item.username;
                });
            });
        });
    }

    function fetchPassportIdentity(api, username, userId, fallbackTimestamp) {
        var cached = readPassportIdentityCache(username);
        if (cached && Object.prototype.hasOwnProperty.call(cached, 'issuedAt')) {
            return Promise.resolve(cached);
        }

        return fetchPassportParticipants(api).then(function (participants) {
            var wanted = normalizeUser(username).toLowerCase();
            var targetParticipant = participants.filter(function (item) {
                return normalizeUser(item.username).toLowerCase() === wanted;
            })[0] || null;
            var fallbackUnix = Math.floor(new Date(fallbackTimestamp || 0).getTime() / 1000);
            var issuedUnix = targetParticipant && Number(targetParticipant.startedAt) || (fallbackUnix >= 946684800 ? fallbackUnix : 0);
            if (isOwnProfile(username)) {
                try {
                    var exactOwnStartedAt = Number(window.__LofarianAchievementsInternal && window.__LofarianAchievementsInternal.participation && window.__LofarianAchievementsInternal.participation.startedAt || 0);
                    if (exactOwnStartedAt >= 946684800) { issuedUnix = exactOwnStartedAt; }
                } catch (ignoreParticipationDateError) { /* публичный fallback уже найден выше */ }
            }
            var special = specialPassportIdentity(username);
            if (special) {
                special.issuedAt = issuedUnix >= 946684800 ? new Date(issuedUnix * 1000).toISOString() : '';
                writePassportIdentityCache(username, special);
                return special;
            }

            var targetExists = !!targetParticipant;
            if (!targetExists) {
                participants.push({
                    userId: Number(userId) || 0,
                    username: normalizeUser(username),
                    startedAt: issuedUnix || Math.floor(Date.now() / 1000)
                });
            }

            participants = participants.filter(function (item) {
                return normalizeUser(item.username).toLowerCase() !== PASSPORT_OWNER;
            });

            participants.sort(function (a, b) {
                var at = Number(a.startedAt) || Number.MAX_SAFE_INTEGER;
                var bt = Number(b.startedAt) || Number.MAX_SAFE_INTEGER;
                if (at !== bt) { return at - bt; }
                if (Number(a.userId) !== Number(b.userId)) { return Number(a.userId) - Number(b.userId); }
                return a.username.localeCompare(b.username, 'ru');
            });

            var index = participants.findIndex(function (item) {
                return normalizeUser(item.username).toLowerCase() === wanted;
            });

            var identity = normalPassportIdentity(index >= 0 ? index + 1 : participants.length + 1);
            identity.issuedAt = issuedUnix >= 946684800 ? new Date(issuedUnix * 1000).toISOString() : '';
            writePassportIdentityCache(username, identity);
            return identity;
        }).catch(function () {
            var fallback = specialPassportIdentity(username) || normalPassportIdentity(Math.max(1, Number(userId) || 1));
            var fallbackUnix = Math.floor(new Date(fallbackTimestamp || 0).getTime() / 1000);
            fallback.issuedAt = fallbackUnix >= 946684800 ? new Date(fallbackUnix * 1000).toISOString() : '';
            return fallback;
        });
    }

    function formatDate(value) {
        if (!value) {
            return '—';
        }
        var date = new Date(value);
        if (isNaN(date.getTime())) {
            return '—';
        }
        try {
            return new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
            }).format(date);
        } catch (error) {
            return date.toISOString().slice(0, 10);
        }
    }

    function formatMonthLabel(date) {
        try {
            var label = new Intl.DateTimeFormat('ru-RU', {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
            }).format(date);
            return label.charAt(0).toLocaleUpperCase('ru') + label.slice(1);
        } catch (error) {
            return 'Текущий месяц';
        }
    }

    function dayKeyFromDate(date) {
        return date.toISOString().slice(0, 10);
    }

    function dayKey(timestamp) {
        var date = new Date(timestamp);
        return isNaN(date.getTime()) ? '' : dayKeyFromDate(date);
    }

    function cacheKey(username) {
        return 'lof-chronicler-stat-passport-v2:' + normalizeUser(username).toLowerCase();
    }


    function formatTenure(fromValue, toValue) {
        var from = new Date(fromValue || 0);
        var to = new Date(toValue || Date.now());
        if (isNaN(from.getTime()) || isNaN(to.getTime()) || to < from) { return '—'; }
        var years = to.getUTCFullYear() - from.getUTCFullYear();
        var months = to.getUTCMonth() - from.getUTCMonth();
        if (to.getUTCDate() < from.getUTCDate()) { months -= 1; }
        if (months < 0) { years -= 1; months += 12; }
        var parts = [];
        function plural(n, one, few, many) {
            var mod10 = n % 10, mod100 = n % 100;
            if (mod10 === 1 && mod100 !== 11) { return one; }
            if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) { return few; }
            return many;
        }
        if (years > 0) { parts.push(years + ' ' + plural(years, 'год', 'года', 'лет')); }
        if (months > 0 || !parts.length) { parts.push(months + ' ' + plural(months, 'месяц', 'месяца', 'месяцев')); }
        return parts.slice(0, 2).join(' ');
    }

    function activityStatus(lastActivity) {
        var last = new Date(lastActivity || 0);
        if (isNaN(last.getTime())) {
            return { key: 'unknown', title: 'Нет данных', description: 'Последнее действие определить не удалось.' };
        }
        var days = Math.max(0, Math.floor((Date.now() - last.getTime()) / 86400000));
        if (days === 0) { return { key: 'today', title: 'Активен сегодня', description: 'Сегодня на вики уже было зафиксировано действие пользователя.' }; }
        if (days <= 7) { return { key: 'active', title: 'Активен', description: 'Последнее действие было не более семи дней назад.' }; }
        if (days <= 30) { return { key: 'regular', title: 'Регулярно появляется', description: 'Последнее действие было в течение последних тридцати дней.' }; }
        if (days <= 90) { return { key: 'rare', title: 'Редко появляется', description: 'С момента последнего действия прошло больше месяца, но меньше трёх месяцев.' }; }
        return { key: 'inactive', title: 'Давно не появлялся', description: 'Последнее действие было более трёх месяцев назад.' };
    }

    function formatPercent(value) {
        value = Number(value) || 0;
        return String(Math.round(value * 10) / 10).replace('.', ',') + '%';
    }

    function buildActivityInsights(contributions, createdRows, uploadCount) {
        contributions = Array.isArray(contributions) ? contributions : [];
        createdRows = Array.isArray(createdRows) ? createdRows : [];
        var dayCounts = Object.create(null);
        var monthCounts = Object.create(null);
        var weekdayCounts = [0,0,0,0,0,0,0];
        var articleCounts = Object.create(null);
        var uniqueArticles = Object.create(null);
        var mainEdits = 0;
        var technicalEdits = 0;

        contributions.forEach(function (item) {
            var date = new Date(item.timestamp || 0);
            if (!isNaN(date.getTime())) {
                var day = dayKeyFromDate(date);
                var month = day.slice(0, 7);
                dayCounts[day] = (dayCounts[day] || 0) + 1;
                monthCounts[month] = (monthCounts[month] || 0) + 1;
                weekdayCounts[date.getUTCDay()] += 1;
            }
            if (Number(item.ns) === 0) {
                mainEdits += 1;
                var title = String(item.title || '').trim();
                if (title) {
                    uniqueArticles[normalizeTitle(title)] = title;
                    articleCounts[title] = (articleCounts[title] || 0) + 1;
                }
            } else {
                technicalEdits += 1;
            }
        });

        var activeDays = Object.keys(dayCounts).length;
        var recordDay = { key: '', count: 0 };
        Object.keys(dayCounts).forEach(function (key) {
            if (dayCounts[key] > recordDay.count) { recordDay = { key: key, count: dayCounts[key] }; }
        });
        var bestMonth = { key: '', count: 0 };
        Object.keys(monthCounts).forEach(function (key) {
            if (monthCounts[key] > bestMonth.count) { bestMonth = { key: key, count: monthCounts[key] }; }
        });
        var weekdayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
        var bestWeekdayIndex = 0;
        weekdayCounts.forEach(function (count, index) {
            if (count > weekdayCounts[bestWeekdayIndex]) { bestWeekdayIndex = index; }
        });
        var mostEdited = { title: '—', count: 0 };
        Object.keys(articleCounts).forEach(function (title) {
            if (articleCounts[title] > mostEdited.count) { mostEdited = { title: title, count: articleCounts[title] }; }
        });
        var createdCount = createdRows.length;
        var existingArticleEdits = Math.max(0, mainEdits - createdCount);
        var actionBase = existingArticleEdits + createdCount + technicalEdits + Math.max(0, Number(uploadCount) || 0);
        var distribution = [
            { key: 'editing', title: 'Правки статей', count: existingArticleEdits },
            { key: 'creation', title: 'Создание статей', count: createdCount },
            { key: 'technical', title: 'Другие разделы', count: technicalEdits },
            { key: 'uploads', title: 'Файлы', count: Math.max(0, Number(uploadCount) || 0) }
        ].map(function (item) {
            item.percent = actionBase ? (item.count / actionBase) * 100 : 0;
            return item;
        });
        var sortedProfile = distribution.slice().sort(function (a,b) { return b.count - a.count; });
        var profileTitle = 'Универсал';
        if (sortedProfile[0] && sortedProfile[0].count > 0) {
            if (sortedProfile[0].key === 'creation') { profileTitle = 'Автор статей'; }
            else if (sortedProfile[0].key === 'uploads') { profileTitle = 'Иллюстратор'; }
            else if (sortedProfile[0].key === 'technical') { profileTitle = 'Технический редактор'; }
            else { profileTitle = 'Редактор'; }
            if (sortedProfile[1] && sortedProfile[1].count > 0 && sortedProfile[0].count / sortedProfile[1].count < 1.2) {
                profileTitle = 'Универсал';
            }
        }
        var monthLabel = '—';
        if (bestMonth.key) {
            var bits = bestMonth.key.split('-');
            monthLabel = formatMonthLabel(new Date(Date.UTC(Number(bits[0]), Number(bits[1]) - 1, 1)));
        }
        return {
            activeDays: activeDays,
            averagePerActiveDay: activeDays ? contributions.length / activeDays : 0,
            recordDay: recordDay,
            bestMonth: { key: bestMonth.key, label: monthLabel, count: bestMonth.count },
            bestWeekday: { title: weekdayNames[bestWeekdayIndex], count: weekdayCounts[bestWeekdayIndex] || 0 },
            uniqueArticles: Object.keys(uniqueArticles).length,
            mostEditedArticle: mostEdited,
            firstCreatedArticle: createdRows.length ? createdRows[createdRows.length - 1] : null,
            latestCreatedArticle: createdRows.length ? createdRows[0] : null,
            distribution: distribution,
            profileTitle: profileTitle
        };
    }

    function readCache(username) {
        try {
            var raw = localStorage.getItem(cacheKey(username));
            if (!raw) {
                return null;
            }
            var parsed = JSON.parse(raw);
            if (!parsed || !parsed.savedAt || !parsed.data) {
                return null;
            }
            if (Date.now() - Number(parsed.savedAt) > CACHE_TTL) {
                return null;
            }
            return parsed.data;
        } catch (error) {
            return null;
        }
    }

    function writeCache(username, data) {
        try {
            localStorage.setItem(cacheKey(username), JSON.stringify({
                savedAt: Date.now(),
                data: data
            }));
        } catch (error) {
            /* localStorage может быть отключён — карточка продолжит работать. */
        }
    }


    function clearCache(username) {
        try { localStorage.removeItem(cacheKey(username)); } catch (error) {}
    }

    function preferencePageTitle(username) {
        return 'User:' + normalizeUser(username).replace(/ /g, '_') + '/LofarianChroniclerCard';
    }

    function emptyPreferences() {
        return { favoriteSections: [], favoriteCategory: '', favoriteAchievements: [], signature: '' };
    }

    function uniqueStrings(values, limit) {
        var seen = {};
        var result = [];
        (Array.isArray(values) ? values : []).forEach(function (value) {
            var text = String(value || '').trim();
            var key = text.toLocaleLowerCase('ru');
            if (!text || seen[key] || (limit && result.length >= limit)) { return; }
            seen[key] = true;
            result.push(text);
        });
        return result;
    }

    function sanitizePreferences(value) {
        value = value && typeof value === 'object' ? value : {};
        return {
            favoriteSections: uniqueStrings(value.favoriteSections, 3),
            favoriteCategory: String(value.favoriteCategory || '').trim().slice(0, 160),
            favoriteAchievements: uniqueStrings(value.favoriteAchievements, 5),
            signature: String(value.signature || '').trim().slice(0, 10)
        };
    }

    function parsePreferencesText(text) {
        text = String(text || '');
        var marker = text.indexOf(PREFS_MARKER);
        var start = marker === -1 ? -1 : text.indexOf('{', marker);
        var end = text.lastIndexOf('}');
        if (start === -1 || end < start) { return emptyPreferences(); }
        try { return sanitizePreferences(JSON.parse(text.slice(start, end + 1))); }
        catch (error) { return emptyPreferences(); }
    }

    function serializePreferences(preferences) {
        return '<!-- ' + PREFS_MARKER + '\n' + JSON.stringify(sanitizePreferences(preferences), null, 2) + '\n-->\n';
    }

    function fetchPreferences(api, username) {
        return api.get({
            action: 'query', prop: 'revisions', titles: preferencePageTitle(username),
            rvprop: 'content|timestamp', rvslots: 'main', formatversion: 2
        }).then(function (response) {
            var page = response && response.query && response.query.pages && response.query.pages[0];
            if (!page || page.missing) { return { preferences: emptyPreferences(), baseTimestamp: '' }; }
            var revision = page.revisions && page.revisions[0];
            var content = revision && revision.slots && revision.slots.main && revision.slots.main.content;
            return { preferences: parsePreferencesText(content), baseTimestamp: revision && revision.timestamp || '' };
        }).catch(function () {
            return { preferences: emptyPreferences(), baseTimestamp: '' };
        });
    }

    function savePreferences(api, username, preferences, baseTimestamp) {
        if (!isOwnProfile(username)) {
            return Promise.reject({ code: 'not-owner' });
        }

        function submit(timestamp) {
            var params = {
                action: 'edit',
                title: preferencePageTitle(username),
                text: serializePreferences(preferences),
                summary: 'Настройки статистического паспорта летописца',
                minor: true,
                watchlist: 'nochange',
                assert: 'user',
                formatversion: 2
            };
            if (timestamp) { params.basetimestamp = timestamp; }
            return api.postWithToken('csrf', params);
        }

        return submit(baseTimestamp).catch(function (error) {
            var code = error && (error.code || error.error && error.error.code) || '';
            if (code !== 'editconflict' && code !== 'badtoken') {
                throw error;
            }
            return fetchPreferences(api, username).then(function (latest) {
                return submit(latest && latest.baseTimestamp || '');
            });
        });
    }

    function extractCatalogJson(text) {
        text = String(text || '');
        var start = text.indexOf('{');
        var end = text.lastIndexOf('}');
        if (start === -1 || end < start) { return null; }
        try { return JSON.parse(text.slice(start, end + 1)); } catch (error) { return null; }
    }

    function achievementImageUrl(filename) {
        filename = String(filename || '').trim();
        if (!filename) { return ''; }
        if (mw.util && typeof mw.util.getUrl === 'function') {
            return mw.util.getUrl('Special:Redirect/file/' + filename.replace(/ /g, '_'));
        }
        return '/wiki/Special:Redirect/file/' + encodeURIComponent(filename.replace(/ /g, '_'));
    }

    function fetchCatalogChoices(api) {
        if (catalogChoicesPromise) { return catalogChoicesPromise; }
        catalogChoicesPromise = api.get({
            action: 'query', prop: 'revisions', titles: CATALOG_PAGES.join('|'),
            rvprop: 'content', rvslots: 'main', formatversion: 2
        }).then(function (response) {
            var pages = response && response.query && response.query.pages || [];
            var choices = [];
            var defaultImage = '';
            pages.forEach(function (page) {
                var revision = page && page.revisions && page.revisions[0];
                var content = revision && revision.slots && revision.slots.main && revision.slots.main.content;
                var part = extractCatalogJson(content);
                if (!part) { return; }
                if (part.defaultImage) { defaultImage = String(part.defaultImage); }
                Object.keys(part.achievements || {}).forEach(function (id) {
                    var item = part.achievements[id] || {};
                    choices.push({ id: 'achievement:' + id, rawId: id, type: 'achievement', title: String(item.title || id), image: String(item.image || defaultImage || ''), hidden: item.hidden === true || item.secret === true });
                });
                Object.keys(part.families || {}).forEach(function (id) {
                    var item = part.families[id] || {};
                    choices.push({ id: 'family:' + id, rawId: id, type: 'family', title: String(item.title || id), image: String(item.image || defaultImage || '') });
                });
            });
            choices.sort(function (a, b) { return a.title.localeCompare(b.title, 'ru'); });
            return choices;
        }).catch(function (error) { catalogChoicesPromise = null; throw error; });
        return catalogChoicesPromise;
    }

    function hydrateFavoriteAchievements(api, ids) {
        ids = uniqueStrings(ids, 5);
        if (!ids.length) { return Promise.resolve([]); }
        return fetchCatalogChoices(api).then(function (choices) {
            var byId = {};
            choices.forEach(function (item) { byId[item.id] = item; });
            return ids.map(function (id) { return byId[id] || null; }).filter(Boolean);
        }).catch(function () { return []; });
    }


    function isChoiceEarnedFromMap(choice, earnedMap) {
        earnedMap = earnedMap || {};
        if (!choice) { return false; }
        if (choice.type === 'family') {
            var prefix = String(choice.rawId || '') + '_';
            return Object.keys(earnedMap).some(function (id) {
                return id.indexOf(prefix) === 0 && Number(earnedMap[id] || 0) > 0;
            });
        }
        return Number(earnedMap[String(choice.rawId || '')] || 0) > 0;
    }

    function earnedChoicesFromProfileDom(choices) {
        var earnedIds = Object.create(null);
        var earnedFamilies = Object.create(null);
        document.querySelectorAll('.lof-profile-achievement[data-lof-earned="1"]').forEach(function (card) {
            var id = String(card.getAttribute('data-lof-achievement-id') || '').trim();
            var family = String(card.getAttribute('data-lof-family') || '').trim();
            if (id) { earnedIds[id] = true; }
            if (family) { earnedFamilies[family] = true; }
        });
        return (choices || []).filter(function (choice) {
            return choice.type === 'family'
                ? !!earnedFamilies[String(choice.rawId || '')]
                : !!earnedIds[String(choice.rawId || '')];
        });
    }

    /*
     * В редакторе любимых достижений показываются только уже полученные
     * награды текущего владельца профиля. Сначала используется официальный
     * read-only map Lofarian Achievements; DOM — безопасный резервный вариант.
     */
    function fetchEarnedCatalogChoices(api) {
        return fetchCatalogChoices(api).then(function (choices) {
            var internal = window.__LofarianAchievementsInternal;
            if (
                internal &&
                typeof internal.has === 'function' &&
                typeof internal.invoke === 'function' &&
                internal.has('readCatalog') &&
                internal.has('getCurrentViewerEffectiveAchievementMap')
            ) {
                return Promise.resolve(internal.invoke('readCatalog', []))
                    .then(function (catalog) {
                        return Promise.resolve(
                            internal.invoke('getCurrentViewerEffectiveAchievementMap', [catalog])
                        );
                    })
                    .then(function (earnedMap) {
                        return choices.filter(function (choice) {
                            return isChoiceEarnedFromMap(choice, earnedMap);
                        });
                    })
                    .catch(function () {
                        return earnedChoicesFromProfileDom(choices);
                    });
            }
            return earnedChoicesFromProfileDom(choices);
        });
    }

    function apiGetAll(api, params, listName, continueKey) {
        var output = [];
        var guard = 0;

        function step(continuation) {
            var request = Object.assign({}, params);
            if (continuation) {
                request[continueKey] = continuation;
            }
            return api.get(request).then(function (response) {
                var list = response && response.query && response.query[listName];
                if (Array.isArray(list)) {
                    output = output.concat(list);
                }
                guard += 1;
                if (guard > 1000) {
                    throw new Error('Слишком много страниц API при сборе статистики.');
                }
                var next = response && response.continue && response.continue[continueKey];
                return next ? step(next) : output;
            });
        }

        return step(null);
    }

    function fetchUserInfo(api, username) {
        return api.get({
            action: 'query',
            list: 'users',
            ususers: username,
            usprop: 'registration|editcount',
            formatversion: 2
        }).then(function (response) {
            var user = response && response.query && response.query.users && response.query.users[0];
            return user || {};
        });
    }

    function fetchContributions(api, username) {
        return apiGetAll(api, {
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            ucprop: 'ids|title|timestamp|flags',
            uclimit: 'max',
            ucdir: 'older',
            formatversion: 2
        }, 'usercontribs', 'uccontinue');
    }

    function fetchUploadLog(api, username) {
        return apiGetAll(api, {
            action: 'query',
            list: 'logevents',
            letype: 'upload',
            leuser: username,
            leprop: 'title|timestamp',
            lelimit: 'max',
            ledir: 'older',
            formatversion: 2
        }, 'logevents', 'lecontinue').catch(function () {
            return [];
        });
    }


    /*
     * Созданные статьи считаются отдельным API-фильтром ucshow=new,
     * а не по наличию поля `new` в общем списке вкладов. Это устраняет
     * ложные завышения счётчика на Fandom/formatversion=2.
     */
    function fetchCreatedArticles(api, username) {
        return apiGetAll(api, {
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            ucnamespace: 0,
            ucshow: 'new',
            ucprop: 'ids|title|timestamp',
            uclimit: 'max',
            ucdir: 'older',
            formatversion: 2
        }, 'usercontribs', 'uccontinue').then(function (rows) {
            var byTitle = Object.create(null);
            (rows || []).forEach(function (item) {
                var title = String(item && item.title || '').trim();
                if (!title) { return; }
                var key = normalizeTitle(title);
                if (!byTitle[key] || String(item.timestamp || '') > String(byTitle[key].timestamp || '')) {
                    byTitle[key] = {
                        title: title,
                        timestamp: String(item.timestamp || ''),
                        revid: Number(item.revid || 0)
                    };
                }
            });
            return Object.keys(byTitle).map(function (key) { return byTitle[key]; })
                .sort(function (a, b) { return String(b.timestamp).localeCompare(String(a.timestamp)); });
        }).catch(function () {
            return [];
        });
    }

    function fetchCommunityRoles(api, username) {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: ROLE_DATA_PAGE,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (response) {
            var page = response && response.query && response.query.pages && response.query.pages[0];
            var revision = page && page.revisions && page.revisions[0];
            var content = revision && revision.slots && revision.slots.main && revision.slots.main.content;
            var data = extractCatalogJson(content) || {};
            var roles = data.roles && typeof data.roles === 'object' ? data.roles : {};
            var users = data.users && typeof data.users === 'object' ? data.users : {};
            var wanted = normalizeUser(username).toLocaleLowerCase('ru');
            var roleIds = [];

            Object.keys(users).some(function (name) {
                if (normalizeUser(name).toLocaleLowerCase('ru') !== wanted) { return false; }
                roleIds = Array.isArray(users[name]) ? users[name].slice() : [];
                return true;
            });

            return roleIds.map(function (id) {
                var key = String(id || '').trim().toLowerCase();
                var item = roles[key] || {};
                var tone = String(item.tone || 'neutral').trim().toLowerCase();
                if (['slate','bronze','green','blue','purple','red','gold','neutral'].indexOf(tone) === -1) {
                    tone = 'neutral';
                }
                return {
                    id: key,
                    title: String(item.title || key || '').trim(),
                    tone: tone,
                    description: String(item.description || ROLE_DESCRIPTIONS[key] || 'Уникальная локальная роль сообщества Википедии мира Лофариан.').trim()
                };
            }).filter(function (item) { return !!item.title; });
        }).catch(function () {
            return [];
        });
    }

    function normalizeTitle(value) {
        return String(value || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function fetchFavoriteCategory(api, articleWeights) {
        var titles = Object.keys(articleWeights);
        var normalizedWeights = {};
        titles.forEach(function (title) {
            normalizedWeights[normalizeTitle(title)] = Number(articleWeights[title]) || 0;
        });
        if (!titles.length) {
            return Promise.resolve({ title: '—', weight: 0 });
        }

        var categoryWeights = {};
        var batches = [];
        for (var i = 0; i < titles.length; i += 40) {
            batches.push(titles.slice(i, i + 40));
        }

        function queryBatch(batch) {
            var continuation = null;
            var guard = 0;

            function step() {
                var params = {
                    action: 'query',
                    prop: 'categories',
                    titles: batch.join('|'),
                    cllimit: 'max',
                    clshow: '!hidden',
                    formatversion: 2
                };
                if (continuation) {
                    params.clcontinue = continuation;
                }
                return api.get(params).then(function (response) {
                    var pages = response && response.query && response.query.pages;
                    if (Array.isArray(pages)) {
                        pages.forEach(function (page) {
                            var weight = normalizedWeights[normalizeTitle(page.title)] || 0;
                            (page.categories || []).forEach(function (category) {
                                var name = String(category.title || '').replace(/^Категория:/i, '').trim();
                                if (!name) {
                                    return;
                                }
                                categoryWeights[name] = (categoryWeights[name] || 0) + weight;
                            });
                        });
                    }
                    guard += 1;
                    if (guard > 200) {
                        return;
                    }
                    continuation = response && response.continue && response.continue.clcontinue;
                    return continuation ? step() : undefined;
                });
            }
            return step();
        }

        var chain = Promise.resolve();
        batches.forEach(function (batch) {
            chain = chain.then(function () {
                return queryBatch(batch);
            });
        });

        return chain.then(function () {
            var sorted = Object.keys(categoryWeights).map(function (name) {
                return { title: name, weight: categoryWeights[name] };
            }).sort(function (a, b) {
                if (b.weight !== a.weight) {
                    return b.weight - a.weight;
                }
                return a.title.localeCompare(b.title, 'ru');
            });
            return { favorite: sorted[0] || { title: '—', weight: 0 }, options: sorted.slice(0, 60) };
        }).catch(function () {
            return { favorite: { title: '—', weight: 0 }, options: [] };
        });
    }

    function sectionName(ns) {
        ns = Number(ns);
        if (ns === 0) { return 'Статьи'; }
        if (ns === 1) { return 'Обсуждения статей'; }
        if (ns === 2 || ns === 3) { return 'Участники'; }
        if (ns === 4 || ns === 5) { return 'Проект'; }
        if (ns === 6 || ns === 7) { return 'Файлы'; }
        if (ns === 8 || ns === 9) { return 'Интерфейс'; }
        if (ns === 10 || ns === 11) { return 'Шаблоны'; }
        if (ns === 12 || ns === 13) { return 'Справка'; }
        if (ns === 14 || ns === 15) { return 'Категории'; }
        if (ns === 828 || ns === 829) { return 'Модули'; }
        var formatted = mw.config.get('wgFormattedNamespaces') || {};
        return formatted[ns] || 'Другие разделы';
    }

    function calculateStreaks(contributions) {
        var days = {};
        contributions.forEach(function (item) {
            var key = dayKey(item.timestamp);
            if (key) {
                days[key] = true;
            }
        });
        var ordered = Object.keys(days).sort();
        if (!ordered.length) {
            return { current: 0, best: 0 };
        }

        var best = 1;
        var run = 1;
        for (var i = 1; i < ordered.length; i += 1) {
            var prev = new Date(ordered[i - 1] + 'T00:00:00Z');
            var next = new Date(ordered[i] + 'T00:00:00Z');
            var diff = Math.round((next.getTime() - prev.getTime()) / 86400000);
            if (diff === 1) {
                run += 1;
                best = Math.max(best, run);
            } else {
                run = 1;
            }
        }

        var today = new Date();
        var todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        var last = new Date(ordered[ordered.length - 1] + 'T00:00:00Z');
        var gap = Math.round((todayUtc.getTime() - last.getTime()) / 86400000);
        var current = 0;

        if (gap <= 1) {
            current = 1;
            for (var j = ordered.length - 1; j > 0; j -= 1) {
                var a = new Date(ordered[j] + 'T00:00:00Z');
                var b = new Date(ordered[j - 1] + 'T00:00:00Z');
                if (Math.round((a.getTime() - b.getTime()) / 86400000) === 1) {
                    current += 1;
                } else {
                    break;
                }
            }
        }

        return { current: current, best: best };
    }

    function buildMonthActivity(contributions) {
        var now = new Date();
        var year = now.getUTCFullYear();
        var month = now.getUTCMonth();
        var monthStart = new Date(Date.UTC(year, month, 1));
        var nextMonth = new Date(Date.UTC(year, month + 1, 1));
        var daysInMonth = Math.round((nextMonth.getTime() - monthStart.getTime()) / 86400000);
        var counts = {};
        var total = 0;

        contributions.forEach(function (item) {
            var date = new Date(item.timestamp);
            if (isNaN(date.getTime()) || date < monthStart || date >= nextMonth) {
                return;
            }
            var key = dayKeyFromDate(date);
            counts[key] = (counts[key] || 0) + 1;
            total += 1;
        });

        var activeDays = Object.keys(counts).length;
        var maxPerDay = 0;
        Object.keys(counts).forEach(function (key) {
            maxPerDay = Math.max(maxPerDay, counts[key]);
        });

        var cells = [];
        for (var day = 1; day <= daysInMonth; day += 1) {
            var date = new Date(Date.UTC(year, month, day));
            var key = dayKeyFromDate(date);
            var count = counts[key] || 0;
            var level = count === 0 || maxPerDay === 0 ? 0 : Math.max(1, Math.min(4, Math.ceil((count / maxPerDay) * 4)));
            cells.push({ day: day, key: key, count: count, level: level });
        }

        return {
            label: formatMonthLabel(monthStart),
            total: total,
            activeDays: activeDays,
            cells: cells
        };
    }

    function analyzeContributions(contributions) {
        var sections = {};
        var articleWeights = {};
        var earliest = '';
        var lastActivity = '';

        contributions.forEach(function (item) {
            var section = sectionName(item.ns);
            sections[section] = (sections[section] || 0) + 1;

            if (Number(item.ns) === 0) {
                var articleTitle = String(item.title || '').trim();
                articleWeights[articleTitle] = (articleWeights[articleTitle] || 0) + 1;
            }

            if (item.timestamp) {
                if (!earliest || item.timestamp < earliest) {
                    earliest = item.timestamp;
                }
                if (!lastActivity || item.timestamp > lastActivity) {
                    lastActivity = item.timestamp;
                }
            }
        });

        var sectionOptions = Object.keys(sections).map(function (name) {
            return { name: name, count: sections[name] };
        }).sort(function (a, b) {
            if (b.count !== a.count) { return b.count - a.count; }
            return a.name.localeCompare(b.name, 'ru');
        });
        var favoriteSections = sectionOptions.slice(0, 3);

        return {
            favoriteSections: favoriteSections,
            sectionOptions: sectionOptions,
            articleWeights: articleWeights,
            earliest: earliest,
            lastActivity: lastActivity,
            streaks: calculateStreaks(contributions),
            month: buildMonthActivity(contributions)
        };
    }

    function countUniqueUploads(logs) {
        var titles = {};
        logs.forEach(function (item) {
            var title = String(item.title || '').trim();
            if (title) {
                titles[title] = true;
            }
        });
        return Object.keys(titles).length;
    }

    function collectStatistics(username, force) {
        if (!force) {
            var cached = readCache(username);
            if (cached) {
                return Promise.resolve(cached);
            }
        }

        var api = new mw.Api();
        return Promise.all([
            fetchUserInfo(api, username),
            fetchContributions(api, username),
            fetchUploadLog(api, username),
            fetchCreatedArticles(api, username),
            fetchPreferences(api, username),
            fetchCommunityRoles(api, username)
        ]).then(function (parts) {
            var user = parts[0] || {};
            var contributions = parts[1] || [];
            var uploads = parts[2] || [];
            var createdRows = parts[3] || [];
            var prefState = parts[4] || { preferences: emptyPreferences(), baseTimestamp: '' };
            var communityRoles = parts[5] || [];
            var preferences = sanitizePreferences(prefState.preferences);
            var analyzed = analyzeContributions(contributions);
            var uploadedImagesCount = countUniqueUploads(uploads);
            var activityInsights = buildActivityInsights(contributions, createdRows, uploadedImagesCount);
            return Promise.all([
                fetchFavoriteCategory(api, analyzed.articleWeights),
                hydrateFavoriteAchievements(api, preferences.favoriteAchievements),
                fetchPassportIdentity(api, username, user.userid, analyzed.earliest || user.registration || '')
            ]).then(function (extra) {
                var categoryData = extra[0] || { favorite: { title: '—', weight: 0 }, options: [] };
                var counts = {};
                (analyzed.sectionOptions || []).forEach(function (item) { counts[item.name] = item.count; });
                var manualSections = preferences.favoriteSections.map(function (name) { return { name: name, count: Number(counts[name]) || 0 }; });
                var autoCategory = categoryData.favorite || { title: '—', weight: 0 };
                var data = {
                    username: username,
                    avatar: getAvatar(),
                    arrival: analyzed.earliest || user.registration || '',
                    editCount: Number(user.editcount) || contributions.length,
                    createdArticles: createdRows.length,
                    createdArticleSamples: createdRows.slice(0, 40),
                    uploadedImages: uploadedImagesCount,
                    uploadSamples: uploads.slice(0, 40),
                    roles: communityRoles,
                    favoriteSections: manualSections.length ? manualSections : analyzed.favoriteSections,
                    favoriteSectionsManual: manualSections.length > 0,
                    sectionOptions: analyzed.sectionOptions || [],
                    favoriteCategory: preferences.favoriteCategory ? { title: preferences.favoriteCategory, weight: 0 } : autoCategory,
                    favoriteCategoryManual: !!preferences.favoriteCategory,
                    categoryOptions: categoryData.options || [],
                    favoriteAchievements: extra[1] || [],
                    passportIdentity: extra[2] || normalPassportIdentity(1),
                    passportIssuedAt: extra[2] && extra[2].issuedAt || '',
                    tenure: formatTenure(analyzed.earliest || user.registration || '', new Date().toISOString()),
                    activityStatus: activityStatus(analyzed.lastActivity),
                    activityInsights: activityInsights,
                    preferences: preferences,
                    signature: preferences.signature || '',
                    preferencesBaseTimestamp: prefState.baseTimestamp || '',
                    currentStreak: analyzed.streaks.current,
                    bestStreak: analyzed.streaks.best,
                    month: analyzed.month,
                    lastActivity: analyzed.lastActivity,
                    generatedAt: new Date().toISOString()
                };
                writeCache(username, data);
                return data;
            });
        });
    }

    function compactStat(label, value, action) {
        var tag = action ? 'button' : 'div';
        return '<' + tag + (action ? ' type="button" data-lof-action="' + escapeHtml(action) + '"' : '') +
            ' class="lof-chronicler-compact-stat' + (action ? ' is-clickable' : '') + '"><span>' +
            escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong></' + tag + '>';
    }

    function rolesHtml(roles) {
        roles = Array.isArray(roles) ? roles : [];
        if (!roles.length) { return ''; }
        return '<span class="lof-chronicler-role-list" aria-label="Уникальные роли сообщества">' +
            roles.map(function (role) {
                return '<button type="button" class="lof-chronicler-role" data-tone="' + escapeHtml(role.tone || 'neutral') +
                    '" data-lof-role-id="' + escapeHtml(role.id || '') + '" data-lof-role-title="' + escapeHtml(role.title || '') +
                    '" data-lof-role-tooltip="' + escapeHtml(role.description || 'Уникальная локальная роль сообщества.') +
                    '" aria-label="' + escapeHtml(role.title) + ': ' + escapeHtml(role.description || 'Уникальная локальная роль сообщества.') + '">' + escapeHtml(role.title) + '</button>';
            }).join('') + '</span>';
    }

    function sectionChips(sections) {
        if (!sections || !sections.length) {
            return '<span class="lof-chronicler-empty">Пока недостаточно данных</span>';
        }
        return sections.map(function (item) {
            return '<button type="button" class="lof-chronicler-section-chip is-clickable" data-lof-section="' +
                escapeHtml(item.name) + '"><b>' + escapeHtml(item.name) + '</b><small>' +
                escapeHtml(formatNumber(item.count)) + '</small></button>';
        }).join('');
    }

    function favoriteAchievementsHtml(items) {
        items = Array.isArray(items) ? items.slice(0, 5) : [];
        if (!items.length) { return '<div class="lof-chronicler-favorites-empty">Любимые достижения пока не выбраны.</div>'; }
        return items.map(function (item, index) {
            var image = item.image ? '<img src="' + escapeHtml(achievementImageUrl(item.image)) + '" alt="" loading="lazy">' : '<span class="lof-chronicler-favorite-achievement-placeholder">✦</span>';
            return '<button type="button" class="lof-chronicler-favorite-achievement is-clickable" data-lof-favorite-achievement="' +
                escapeHtml(item.id || '') + '"><span class="lof-chronicler-favorite-achievement-number">' +
                escapeHtml(String(index + 1)) + '</span><span class="lof-chronicler-favorite-achievement-image">' + image +
                '</span><strong>' + escapeHtml(item.title) + '</strong></button>';
        }).join('');
    }

    function preferenceModeText(manual) { return manual ? 'Выбрано летописцем' : 'Определено по активности'; }

    function wikiUrl(title, params) {
        if (mw.util && typeof mw.util.getUrl === 'function') {
            return mw.util.getUrl(title, params || {});
        }
        var url = '/wiki/' + encodeURIComponent(String(title || '').replace(/ /g, '_'));
        if (params && typeof params === 'object') {
            var query = Object.keys(params).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
            if (query) { url += '?' + query; }
        }
        return url;
    }

    function contributionsUrl(username, params) {
        return wikiUrl('Special:Contributions/' + normalizeUser(username).replace(/ /g, '_'), params || {});
    }

    function namespaceForSection(name) {
        var map = {
            'Статьи': 0,
            'Обсуждения статей': 1,
            'Участники': 2,
            'Проект': 4,
            'Файлы': 6,
            'Интерфейс': 8,
            'Шаблоны': 10,
            'Справка': 12,
            'Категории': 14,
            'Модули': 828
        };
        return Object.prototype.hasOwnProperty.call(map, name) ? map[name] : null;
    }

    function closeInfoDialog() {
        var old = document.getElementById('lof-chronicler-info-overlay');
        if (old) { old.remove(); }
    }

    function openInfoDialog(title, text, items, link) {
        closeInfoDialog();
        var overlay = document.createElement('div');
        overlay.id = 'lof-chronicler-info-overlay';
        overlay.className = 'lof-chronicler-info-overlay';
        overlay.innerHTML =
            '<section class="lof-chronicler-info-dialog">' +
                '<button type="button" class="lof-chronicler-info-close" aria-label="Закрыть">×</button>' +
                '<span class="lof-chronicler-kicker">ПАСПОРТ ЛЕТОПИСЦА</span>' +
                '<h3>' + escapeHtml(title || '') + '</h3>' +
                (text ? '<p>' + escapeHtml(text) + '</p>' : '') +
                '<div class="lof-chronicler-info-list"></div>' +
                (link ? '<a class="lof-chronicler-info-link" href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label || 'Открыть →') + '</a>' : '') +
            '</section>';
        var host = overlay.querySelector('.lof-chronicler-info-list');
        (Array.isArray(items) ? items.slice(0, 40) : []).forEach(function (item) {
            var row = document.createElement(item.href ? 'a' : 'div');
            row.className = 'lof-chronicler-info-row';
            if (item.href) { row.href = item.href; }
            row.innerHTML = '<strong>' + escapeHtml(item.title || '') + '</strong>' +
                (item.meta ? '<small>' + escapeHtml(item.meta) + '</small>' : '');
            host.appendChild(row);
        });
        if (!host.children.length) { host.style.display = 'none'; }
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) { closeInfoDialog(); }
        });
        overlay.querySelector('.lof-chronicler-info-close').addEventListener('click', closeInfoDialog);
        document.body.appendChild(overlay);
        attachModalHoverSystem(overlay, currentData || {});
    }

    function openFavoriteAchievement(id) {
        id = String(id || '').trim();
        if (!id) { return; }
        var parts = id.split(':');
        var type = parts.shift();
        var rawId = parts.join(':');
        var selector = type === 'family'
            ? '.lof-profile-achievement[data-lof-family="' + rawId.replace(/"/g, '\\"') + '"][data-lof-earned="1"]'
            : '.lof-profile-achievement[data-lof-achievement-id="' + rawId.replace(/"/g, '\\"') + '"][data-lof-earned="1"]';
        var card = document.querySelector(selector);
        if (card && typeof card.click === 'function') {
            /* Штатный обработчик Lofarian Achievements сам открывает его мини-окно. */
            card.click();
            return;
        }

        var internal = window.__LofarianAchievementsInternal;
        if (!internal || typeof internal.has !== 'function' || typeof internal.invoke !== 'function' ||
            !internal.has('readCatalog') || !internal.has('openAchievementDetailsModal')) {
            window.location.href = wikiUrl('Летопись Лофариана Вики:Достижения');
            return;
        }

        Promise.resolve(internal.invoke('readCatalog', [])).then(function (catalog) {
            var achievementId = rawId;
            if (type === 'family') {
                var earnedFamilyCard = document.querySelector('.lof-profile-achievement[data-lof-family="' + rawId.replace(/"/g, '\\"') + '"][data-lof-achievement-id]');
                if (earnedFamilyCard) {
                    achievementId = String(earnedFamilyCard.getAttribute('data-lof-achievement-id') || rawId);
                } else if (catalog && catalog.families && catalog.families[rawId]) {
                    var family = catalog.families[rawId];
                    var levels = family.levels || family.achievements || [];
                    if (Array.isArray(levels) && levels.length) {
                        achievementId = String(levels[levels.length - 1].id || levels[levels.length - 1] || rawId);
                    }
                }
            }
            var achievement = internal.has('getAchievement') ? internal.invoke('getAchievement', [catalog, achievementId]) : (catalog && catalog.achievements && catalog.achievements[achievementId]);
            if (!achievement) { throw new Error('achievement-not-found'); }
            var rarity = internal.has('getRarityInfo') ? internal.invoke('getRarityInfo', [catalog, achievement]) : { title: String(achievement.rarity || ''), key: String(achievement.rarity || 'common') };
            var title = internal.has('getAchievementBaseTitle') ? internal.invoke('getAchievementBaseTitle', [achievement]) : String(achievement.title || achievementId);
            var tier = internal.has('getAchievementTierLabel') ? internal.invoke('getAchievementTierLabel', [achievement]) : '';
            var category = internal.has('getAchievementCategoryTitle') ? internal.invoke('getAchievementCategoryTitle', [achievement.category]) : String(achievement.category || '');
            var points = internal.has('getAchievementPoints') ? internal.invoke('getAchievementPoints', [achievement]) : Number(achievement.points || 0);
            internal.invoke('openAchievementDetailsModal', [catalog, achievement, {
                compact: true,
                title: title + (tier ? ' ' + tier : ''),
                description: achievement.hidden === true || achievement.secret === true ? 'Условие засекречено.' : String(achievement.description || ''),
                rarityTitle: rarity && rarity.title || '',
                rarityKey: rarity && rarity.key || String(achievement.rarity || 'common'),
                categoryTitle: category,
                statusText: 'Получено',
                tierText: tier ? 'Ступень: ' + tier : '',
                pointsText: points ? '+' + formatNumber(points) + ' опыта' : ''
            }]);
        }).catch(function () {
            window.location.href = wikiUrl('Летопись Лофариана Вики:Достижения');
        });
    }

    function attachPassportActions(root, data, isModal) {
        if (!root || !data) { return; }
        root.addEventListener('click', function (event) {
            var node = event.target.closest ? event.target.closest('[data-lof-action],[data-lof-day],[data-lof-section],[data-lof-category],[data-lof-favorite-achievement],[data-lof-role-id],[data-lof-program-info]') : null;
            if (!node || !root.contains(node)) { return; }

            if (node.hasAttribute('data-lof-program-info')) {
                openInfoDialog('Участник программы достижений', PROGRAM_PARTICIPANT_DESCRIPTION);
                return;
            }

            if (node.hasAttribute('data-lof-role-id')) {
                var roleId = String(node.getAttribute('data-lof-role-id') || '').trim();
                var role = (data.roles || []).filter(function (item) { return item.id === roleId; })[0];
                openInfoDialog(role ? role.title : 'Уникальная роль', role ? role.description : 'Уникальная локальная роль сообщества Википедии мира Лофариан.');
                return;
            }

            if (node.hasAttribute('data-lof-favorite-achievement')) {
                openFavoriteAchievement(node.getAttribute('data-lof-favorite-achievement'));
                return;
            }

            if (node.hasAttribute('data-lof-category')) {
                var category = String(node.getAttribute('data-lof-category') || '').trim();
                if (category && category !== '—') {
                    window.location.href = wikiUrl('Категория:' + category);
                }
                return;
            }

            if (node.hasAttribute('data-lof-section')) {
                var section = String(node.getAttribute('data-lof-section') || '').trim();
                var sectionEntry = (data.favoriteSections || []).filter(function (item) {
                    return String(item && item.name || '') === section;
                })[0] || null;
                var sectionCount = sectionEntry ? Number(sectionEntry.count || 0) : 0;
                var namespace = namespaceForSection(section);
                var params = namespace == null ? {} : { namespace: namespace };
                openInfoDialog(
                    section || 'Любимый раздел',
                    (data.favoriteSectionsManual ? 'Этот раздел выбран летописцем вручную.' : 'Этот раздел определён автоматически по активности.') +
                    (sectionCount ? ' Зафиксировано ' + formatNumber(sectionCount) + ' действий.' : ''),
                    [],
                    { href: contributionsUrl(data.username, params), label: 'Посмотреть вклад в разделе →' }
                );
                return;
            }

            if (node.hasAttribute('data-lof-day')) {
                var date = String(node.getAttribute('data-lof-day') || '').trim();
                var count = Number(node.getAttribute('data-lof-day-count') || 0);
                if (!date) { return; }
                var endDate = new Date(date + 'T00:00:00Z');
                var nextDate = new Date(endDate.getTime() + 86400000);
                openInfoDialog(
                    'Активность за ' + formatDate(date + 'T00:00:00Z'),
                    formatNumber(count) + ' действий за эти UTC-сутки.',
                    [],
                    {
                        href: contributionsUrl(data.username, {
                            start: nextDate.toISOString(),
                            end: endDate.toISOString()
                        }),
                        label: 'Открыть правки за день →'
                    }
                );
                return;
            }

            var action = String(node.getAttribute('data-lof-action') || '');
            if (!action) { return; }
            if (action === 'contributions' || action === 'last-activity') {
                window.location.href = contributionsUrl(data.username);
                return;
            }
            if (action === 'contributions-oldest') {
                window.location.href = contributionsUrl(data.username, { dir: 'prev' });
                return;
            }
            if (action === 'uploads') {
                window.location.href = wikiUrl('Special:ListFiles/' + normalizeUser(data.username).replace(/ /g, '_'));
                return;
            }
            if (action === 'month') {
                if (!isModal) {
                    openModal(data);
                    window.setTimeout(function () {
                        var month = document.querySelector('#' + MODAL_ID + ' [data-lof-section-target="month"]');
                        if (month && month.scrollIntoView) { month.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                    }, 50);
                    return;
                }
                var monthTarget = root.querySelector('[data-lof-section-target="month"]');
                if (monthTarget && monthTarget.scrollIntoView) { monthTarget.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                return;
            }
            if (action === 'favorite-sections' || action === 'favorite-achievements') {
                var targetName = action === 'favorite-sections' ? 'favorite-sections' : 'favorite-achievements';
                if (!isModal) {
                    openModal(data);
                    window.setTimeout(function () {
                        var target = document.querySelector('#' + MODAL_ID + ' [data-lof-section-target="' + targetName + '"]');
                        if (target && target.scrollIntoView) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                    }, 50);
                    return;
                }
                var localTarget = root.querySelector('[data-lof-section-target="' + targetName + '"]');
                if (localTarget && localTarget.scrollIntoView) { localTarget.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                return;
            }
            if (action === 'created') {
                var created = (data.createdArticleSamples || []).map(function (item) {
                    return {
                        title: item.title,
                        meta: item.timestamp ? formatDate(item.timestamp) : '',
                        href: wikiUrl(item.title)
                    };
                });
                openInfoDialog(
                    'Созданные статьи',
                    'Здесь учитываются только статьи, которые летописец создал сам. Обычные правки уже существующих страниц в это число не входят.',
                    created,
                    { href: contributionsUrl(data.username, { namespace: 0 }), label: 'Все правки в статьях →' }
                );
                return;
            }
            if (action === 'passport-issued') {
                openInfoDialog('Дата выдачи паспорта', 'Паспорт выдан ' + formatDate(data.passportIssuedAt) + ' — в день первого подтверждённого подключения участника к программе Lofarian Achievements.');
                return;
            }
            if (action === 'tenure') {
                openInfoDialog('Стаж на Википедии мира Лофариан', 'С первого найденного действия прошло: ' + String(data.tenure || '—') + '.');
                return;
            }
            if (action === 'activity-status') {
                openInfoDialog('Статус активности', data.activityStatus ? data.activityStatus.description : 'Статус активности определить не удалось.');
                return;
            }
            if (action === 'profile-type') {
                openInfoDialog('Почерк летописца', 'Основной профиль деятельности: ' + String(data.activityInsights && data.activityInsights.profileTitle || '—') + '. Профиль определяется по соотношению правок статей, созданий, технических правок и загрузок файлов.');
                return;
            }
            if (action === 'unique-articles') {
                openInfoDialog('Охват статей', 'Летописец работал как минимум с ' + formatNumber(data.activityInsights && data.activityInsights.uniqueArticles || 0) + ' различными статьями основного пространства.');
                return;
            }
            if (action === 'active-days') {
                openInfoDialog('Активные дни', 'Всего зафиксировано ' + formatNumber(data.activityInsights && data.activityInsights.activeDays || 0) + ' UTC-дней, в которые было хотя бы одно действие.');
                return;
            }
            if (action === 'average-day') {
                openInfoDialog('Средняя активность', 'В среднем ' + String(Math.round(Number(data.activityInsights && data.activityInsights.averagePerActiveDay || 0) * 10) / 10).replace('.', ',') + ' действий на один активный день.');
                return;
            }
            if (action === 'record-day') {
                var rd = data.activityInsights && data.activityInsights.recordDay || { key: '', count: 0 };
                openInfoDialog('Рекорд за сутки', rd.key ? formatNumber(rd.count) + ' действий за ' + formatDate(rd.key + 'T00:00:00Z') + '.' : 'Данных пока недостаточно.');
                return;
            }
            if (action === 'most-edited') {
                var me = data.activityInsights && data.activityInsights.mostEditedArticle || { title: '—', count: 0 };
                openInfoDialog('Самая редактируемая статья', me.title === '—' ? 'Данных пока нет.' : 'Больше всего правок: ' + me.title + ' — ' + formatNumber(me.count) + '.', [], me.title === '—' ? null : { href: wikiUrl(me.title), label: 'Открыть статью →' });
                return;
            }
            if (action === 'first-created' || action === 'latest-created') {
                var article = action === 'first-created' ? (data.activityInsights && data.activityInsights.firstCreatedArticle) : (data.activityInsights && data.activityInsights.latestCreatedArticle);
                openInfoDialog(action === 'first-created' ? 'Первая созданная статья' : 'Последняя созданная статья', article ? formatDate(article.timestamp) : 'Данных пока нет.', [], article ? { href: wikiUrl(article.title), label: article.title + ' →' } : null);
                return;
            }
            if (action === 'best-month') {
                var bm = data.activityInsights && data.activityInsights.bestMonth || {};
                openInfoDialog('Самый активный месяц', bm.key ? bm.label + ': ' + formatNumber(bm.count) + ' действий.' : 'Данных пока нет.');
                return;
            }
            if (action === 'best-weekday') {
                var bw = data.activityInsights && data.activityInsights.bestWeekday || {};
                openInfoDialog('Самый активный день недели', bw.title ? bw.title + ' — ' + formatNumber(bw.count) + ' действий за всё время.' : 'Данных пока нет.');
                return;
            }

            if (action === 'current-streak') {
                openInfoDialog('Текущая серия активности', 'Последовательные UTC-дни, в которые было хотя бы одно действие. Сейчас: ' + formatNumber(data.currentStreak) + ' дней.');
                return;
            }
            if (action === 'best-streak') {
                openInfoDialog('Личный рекорд серии', 'Самая длинная последовательность активных UTC-дней: ' + formatNumber(data.bestStreak) + ' дней.');
            }
        });
    }

    function hideNativeUniqueRoleBadges(roles) {
        roles = Array.isArray(roles) ? roles : [];
        if (!roles.length) { return; }
        var titles = {};
        roles.forEach(function (role) {
            var title = String(role && role.title || '').trim();
            if (title) { titles[title] = true; }
        });
        var hosts = document.querySelectorAll('.user-profile-header, .profile-header, .page-header, .user-profile-header__details, .profile-header__details');
        Array.prototype.forEach.call(hosts, function (host) {
            if (!host || host.closest && host.closest('#' + CARD_ID)) { return; }
            Array.prototype.forEach.call(host.querySelectorAll('span,a,button,div'), function (node) {
                if (!node || node.closest && node.closest('#' + CARD_ID)) { return; }
                var ownText = String(node.textContent || '').replace(/\s+/g, ' ').trim();
                if (!titles[ownText]) { return; }
                if (node.children && node.children.length > 2) { return; }
                node.setAttribute('data-lof-chronicler-native-role-hidden', '1');
                node.style.setProperty('display', 'none', 'important');
            });
        });
    }

    function validityHtml(compact) {
        return '<div class="lof-chronicler-validity' + (compact ? ' is-compact' : '') + '">' +
            '<span class="lof-chronicler-validity-seal" aria-hidden="true"><b>DFC</b><i>WIKI</i></span>' +
            '<span><small>Википедия мира Лофариан</small><strong>Удостоверение действительно</strong></span>' +
        '</div>';
    }

    function renderLoadingCard(module, username) {
        var old = document.getElementById(CARD_ID);
        if (old) {
            old.remove();
        }
        var card = document.createElement('section');
        card.id = CARD_ID;
        card.className = 'lof-chronicler-card is-loading';
        card.innerHTML =
            '<div class="lof-chronicler-card-main">' +
                '<div class="lof-chronicler-compact-seal" aria-hidden="true"><span>DFC</span><i>✦</i></div>' +
                '<div class="lof-chronicler-copy">' +
                    '<span class="lof-chronicler-kicker">ВИКИПЕДИЯ МИРА ЛОФАРИАН · ПАСПОРТ УЧАСТНИКА</span>' +
                    '<div class="lof-chronicler-compact-title-row"><h2>Паспорт летописца</h2><span class="lof-chronicler-compact-owner">' + escapeHtml(username) + '</span></div>' +
                    '<div class="lof-chronicler-loading-line">Собираем статистику этой вики…</div>' +
                '</div>' +
            '</div>';
        if (module.parentNode) {
            module.parentNode.insertBefore(card, module);
        }
        return card;
    }


    function programChipHtml() {
        return '<button type="button" class="lof-chronicler-program-chip is-clickable" data-lof-program-info="1" data-lof-program-tooltip="' + escapeHtml(PROGRAM_PARTICIPANT_DESCRIPTION) + '">Участник программы достижений</button>';
    }

    function passportMetaHtml(data, compact) {
        var issued = formatDate(data.passportIssuedAt);
        var status = data.activityStatus || { key: 'unknown', title: 'Нет данных' };
        return '<div class="lof-chronicler-passport-meta' + (compact ? ' is-compact' : '') + '">' +
            '<button type="button" class="is-clickable" data-lof-action="passport-issued"><span>Выдан</span><strong>' + escapeHtml(issued) + '</strong></button>' +
            '<button type="button" class="is-clickable" data-lof-action="tenure"><span>Стаж</span><strong>' + escapeHtml(data.tenure || '—') + '</strong></button>' +
            '<button type="button" class="is-clickable" data-lof-action="activity-status" data-status="' + escapeHtml(status.key || 'unknown') + '"><span>Статус</span><strong>' + escapeHtml(status.title || '—') + '</strong></button>' +
        '</div>';
    }

    function distributionHtml(items) {
        items = Array.isArray(items) ? items : [];
        return '<div class="lof-chronicler-distribution">' + items.map(function (item) {
            return '<div class="lof-chronicler-distribution-row"><div><span>' + escapeHtml(item.title) + '</span><strong>' + escapeHtml(formatPercent(item.percent)) + '</strong></div><i><b style="width:' + Math.max(0, Math.min(100, Number(item.percent) || 0)) + '%"></b></i></div>';
        }).join('') + '</div>';
    }

    function buildCard(data) {
        var card = document.createElement('section');
        card.id = CARD_ID;
        card.className = 'lof-chronicler-card';

        var favoriteSectionsText = (data.favoriteSections || []).map(function (x) {
            return x.name;
        }).join(' · ') || '—';

        card.innerHTML =
            '<div class="lof-chronicler-card-main">' +
                '<div class="lof-chronicler-compact-seal" aria-hidden="true"><span>DFC</span><i>✦</i></div>' +
                '<div class="lof-chronicler-copy">' +
                    '<span class="lof-chronicler-kicker">ВИКИПЕДИЯ МИРА ЛОФАРИАН · ПАСПОРТ УЧАСТНИКА</span>' +
                    '<div class="lof-chronicler-compact-title-row">' +
                        '<h2>Паспорт летописца</h2>' +
                        '<span class="lof-chronicler-compact-owner">' + escapeHtml(data.username) + '</span>' +
                    '</div>' +
                    '<div class="lof-chronicler-document-code" aria-label="Паспортная серия и номер">' +
                        '<span><i>Серия</i><b>' + escapeHtml(data.passportIdentity && data.passportIdentity.series || 'AAAA') + '</b></span>' +
                        '<span><i>№</i><b>' + escapeHtml(data.passportIdentity && data.passportIdentity.numberText || '0001') + '</b></span>' +
                    '</div>' +
                    '<div class="lof-chronicler-compact-identity">' +
                        programChipHtml() +
                        rolesHtml(data.roles) +
                    '</div>' +
                    '<button type="button" class="lof-chronicler-arrival is-clickable" data-lof-action="contributions-oldest">На Википедии мира Лофариан с <strong>' + escapeHtml(formatDate(data.arrival)) + '</strong><span aria-hidden="true">→</span></button>' +
                    passportMetaHtml(data, true) +
                    (data.signature ? '<div class="lof-chronicler-compact-signature"><span>Подпись</span><strong>' + escapeHtml(data.signature) + '</strong></div>' : '') +
                    validityHtml(true) +
                    '<div class="lof-chronicler-compact-stats">' +
                        compactStat('Правок', formatNumber(data.editCount), 'contributions') +
                        compactStat('Создано статей', formatNumber(data.createdArticles), 'created') +
                        compactStat('Изображений', formatNumber(data.uploadedImages), 'uploads') +
                        compactStat('За месяц', formatNumber(data.month.total), 'month') +
                    '</div>' +
                    '<div class="lof-chronicler-compact-bottom">' +
                        '<button type="button" class="lof-chronicler-compact-link is-clickable" data-lof-action="favorite-sections"><b>Любимые разделы</b><span>' + escapeHtml(favoriteSectionsText) + '</span><i aria-hidden="true">→</i></button>' +
                        '<button type="button" class="lof-chronicler-compact-link is-clickable" data-lof-action="favorite-achievements"><b>Любимые достижения</b><span>' + escapeHtml(formatNumber((data.favoriteAchievements || []).length)) + '/5</span><i aria-hidden="true">→</i></button>' +
                        '<button type="button" class="lof-chronicler-compact-link is-clickable" data-lof-action="current-streak"><b>Серия активности</b><span>' + escapeHtml(formatNumber(data.currentStreak)) + ' дн.</span><i aria-hidden="true">→</i></button>' +
                    '</div>' +
                '</div>' +
                '<button type="button" class="lof-chronicler-open">Открыть паспорт <span aria-hidden="true">→</span></button>' +
            '</div>';

        card.querySelector('.lof-chronicler-open').addEventListener('click', function () {
            openModal(data);
        });
        attachPassportActions(card, data, false);
        attachModalHoverSystem(card, data);
        return card;
    }

    function calendarHtml(month) {
        var cells = (month && month.cells) || [];
        return '<div class="lof-chronicler-calendar" aria-label="Активность за месяц">' +
            cells.map(function (cell) {
                var hoverDate = cell.key
                    ? formatDate(String(cell.key) + 'T00:00:00Z')
                    : String(cell.day || '');
                return '<button type="button" class="lof-chronicler-calendar-day is-clickable level-' + Number(cell.level || 0) +
                    '" data-lof-day="' + escapeHtml(cell.key || '') + '" data-lof-day-count="' + Number(cell.count || 0) +
                    '" data-lof-hover="' + escapeHtml(hoverDate + ' · ' + formatNumber(cell.count) + ' действий') + '"><i>' +
                    escapeHtml(cell.day) + '</i></button>';
            }).join('') +
        '</div>';
    }

    /*
     * v1.3.5 — долгие поясняющие подсказки паспорта.
     * Подсказка появляется только после 2,4 секунды непрерывного наведения
     * (или фокуса). Она сообщает две вещи: что находится под курсором и что
     * произойдёт после нажатия. Обработчики самих кнопок не меняются.
     */
    function modalHoverText(node, data) {
        if (!node) { return ''; }

        if (node.classList.contains('lof-chronicler-modal-close')) {
            return 'Закроет большой паспорт и вернёт к компактной карточке в профиле.';
        }
        if (node.classList.contains('lof-chronicler-info-close')) {
            return 'Закроет это пояснение и вернёт к паспорту без изменения его данных.';
        }
        if (node.classList.contains('lof-chronicler-preferences-close')) {
            return 'Закроет редактор паспорта без сохранения несохранённых изменений.';
        }
        if (node.classList.contains('lof-chronicler-open')) {
            return 'Развернёт полный статистический паспорт: активность, почерк летописца, первый след, предпочтения и личные показатели.';
        }
        if (node.classList.contains('lof-chronicler-settings-button')) {
            return 'Откроет личные настройки владельца паспорта: любимые разделы, категорию, подпись и до пяти полученных любимых достижений.';
        }
        if (node.classList.contains('lof-chronicler-preferences-save')) {
            return 'Сохранит текущие предпочтения в личной подстранице владельца паспорта и сразу обновит отображение.';
        }
        if (node.classList.contains('lof-chronicler-preferences-cancel')) {
            return 'Отменит несохранённые изменения и вернёт к паспорту.';
        }
        if (node.classList.contains('lof-chronicler-achievement-choice')) {
            var choiceTitle = String((node.querySelector('b') || {}).textContent || '').trim();
            var selected = node.classList.contains('is-selected');
            return selected
                ? 'Уберёт «' + choiceTitle + '» из любимых достижений. Остальные выбранные награды сохранятся.'
                : 'Добавит «' + choiceTitle + '» в любимые достижения. Одновременно можно выбрать не больше пяти полученных наград.';
        }
        if (node.classList.contains('lof-chronicler-preference-chip')) {
            var input = node.querySelector('input[type="checkbox"]');
            var sectionName = String((node.querySelector('b') || {}).textContent || '').trim();
            return input && input.checked
                ? 'Снимет раздел «' + sectionName + '» с ручного выбора. После сохранения он перестанет считаться любимым.'
                : 'Добавит раздел «' + sectionName + '» в личный выбор. Можно закрепить до трёх любимых разделов.';
        }
        if (node.closest && node.closest('.lof-chronicler-category-suggestions')) {
            var suggested = String(node.textContent || '').trim();
            return 'Подставит категорию «' + suggested + '» в поле любимой категории. Изменение вступит в силу после сохранения паспорта.';
        }
        if (node.hasAttribute('data-lof-program-info')) {
            return 'Откроет описание статуса участника программы достижений и объяснит, почему паспорт доступен этому пользователю.';
        }
        if (node.hasAttribute('data-lof-role-id')) {
            var roleTitle = String(node.getAttribute('data-lof-role-title') || node.textContent || '').trim();
            return 'Откроет описание уникальной роли «' + (roleTitle || 'роль сообщества') + '» и её назначения на Википедии мира Лофариан.';
        }
        if (node.hasAttribute('data-lof-favorite-achievement')) {
            var favoriteId = String(node.getAttribute('data-lof-favorite-achievement') || '');
            var favorite = data && (data.favoriteAchievements || []).filter(function (item) {
                return String(item && item.id || '') === favoriteId;
            })[0] || null;
            var favoriteTitle = favorite && favorite.title ? favorite.title : 'любимое достижение';
            return 'Откроет штатное мини-окно Lofarian Achievements для «' + favoriteTitle + '»: крупную иконку, редкость, условие и сведения о получении.';
        }
        if (node.hasAttribute('data-lof-category')) {
            var category = String(node.getAttribute('data-lof-category') || '').trim();
            return category && category !== '—'
                ? 'Перейдёт в категорию «' + category + '» и покажет связанные с ней статьи Википедии мира Лофариан.'
                : 'Любимая категория ещё не выбрана. Владелец может задать её в настройках паспорта.';
        }
        if (node.hasAttribute('data-lof-section')) {
            var section = String(node.getAttribute('data-lof-section') || '').trim();
            return 'Откроет пояснение раздела «' + (section || 'выбранный раздел') + '» и отдельную ссылку на вклад участника именно в этом пространстве.';
        }
        if (node.hasAttribute('data-lof-day')) {
            var dayKey = String(node.getAttribute('data-lof-day') || '').trim();
            var dayCount = Number(node.getAttribute('data-lof-day-count') || 0);
            return 'Откроет сводку активности за ' + (dayKey ? formatDate(dayKey + 'T00:00:00Z') : 'выбранный день') + ': ' +
                formatNumber(dayCount) + ' действий и переход к правкам за эти UTC-сутки.';
        }

        var action = String(node.getAttribute('data-lof-action') || '').trim();
        var actionText = {
            'contributions': 'Перейдёт к полному журналу правок участника на Википедии мира Лофариан.',
            'contributions-oldest': 'Откроет начало истории участника на вики — самые ранние подтверждённые действия и вклад.',
            'created': 'Откроет список статей, которые участник создал сам в основном пространстве, с переходами к этим страницам.',
            'uploads': 'Перейдёт к файлам и изображениям, которые загрузил этот участник.',
            'month': 'Перенесёт к календарю текущего месяца и покажет распределение активности по дням.',
            'favorite-sections': 'Перенесёт к блоку любимых разделов, выбранных вручную или определённых по активности.',
            'favorite-achievements': 'Перенесёт к блоку любимых достижений, где показано до пяти выбранных полученных наград.',
            'passport-issued': 'Откроет пояснение даты выдачи — дня первого подтверждённого подключения к программе достижений.',
            'tenure': 'Откроет пояснение стажа — времени с первого подтверждённого действия на Википедии мира Лофариан.',
            'activity-status': 'Откроет расшифровку статуса активности и покажет, по давности какого действия он определён.',
            'profile-type': 'Объяснит автоматически рассчитанный профиль деятельности: автор, редактор, иллюстратор, технический редактор или универсал.',
            'unique-articles': 'Пояснит охват — число разных статей основного пространства, которых участник касался правками.',
            'active-days': 'Покажет, сколько разных UTC-дней за всё время у участника было хотя бы одно подтверждённое действие.',
            'average-day': 'Пояснит среднее количество действий на один активный день.',
            'record-day': 'Откроет сведения о самых активных сутках и количестве действий в этот день.',
            'first-created': 'Откроет сведения о первой статье, созданной участником, и переход к ней, если страница доступна.',
            'latest-created': 'Откроет сведения о последней созданной статье и переход к ней.',
            'most-edited': 'Откроет статью, которую участник редактировал чаще всего, и покажет связанную статистику.',
            'best-month': 'Откроет сведения о календарном месяце с максимальной активностью участника.',
            'best-weekday': 'Покажет день недели, на который чаще всего приходилась активность участника.',
            'current-streak': 'Пояснит текущую непрерывную серию календарных дней с подтверждённой активностью.',
            'best-streak': 'Покажет максимальную непрерывную серию активных дней за всю историю участника.',
            'last-activity': 'Перейдёт к последним действиям участника и позволит проверить его наиболее свежий вклад.'
        };
        if (actionText[action]) { return actionText[action]; }

        if (node.classList.contains('lof-chronicler-info-link')) {
            var infoHref = String(node.getAttribute('href') || '');
            var infoLabel = String(node.textContent || 'Открыть').replace(/\s+/g, ' ').trim();
            if (/Special:Contributions/i.test(infoHref)) { return 'Перейдёт из пояснения в журнал правок участника.'; }
            if (/Special:ListFiles|Special:NewFiles/i.test(infoHref)) { return 'Перейдёт из пояснения к загруженным файлам участника.'; }
            if (/Category:/i.test(infoHref)) { return 'Откроет указанную категорию на Википедии мира Лофариан.'; }
            return 'Откроет связанную страницу «' + infoLabel.replace(/[→›»]/g, '').trim() + '».';
        }

        if (node.tagName === 'A' && node.getAttribute('href')) {
            var href = String(node.getAttribute('href') || '');
            var label = String(node.textContent || node.getAttribute('aria-label') || 'ссылка').replace(/\s+/g, ' ').trim();
            if (/Special:Contributions/i.test(href)) { return 'Перейдёт к журналу правок участника.'; }
            if (/Category:/i.test(href)) { return 'Откроет категорию «' + label + '» на Википедии мира Лофариан.'; }
            if (/User:/i.test(href)) { return 'Перейдёт на страницу пользователя «' + label + '».'; }
            return 'Откроет связанную страницу «' + label.replace(/[→›»]/g, '').trim() + '» на Википедии мира Лофариан.';
        }

        var label = String(node.getAttribute('aria-label') || node.textContent || '').replace(/\s+/g, ' ').trim();
        return label
            ? 'Откроет связанную часть паспорта «' + label.slice(0, 80) + '» и покажет относящиеся к ней сведения.'
            : '';
    }

    function attachModalHoverSystem(scope, data) {
        if (!scope) { return; }
        if (scope.getAttribute('data-lof-long-hover-ready') === '1') { return; }
        scope.setAttribute('data-lof-long-hover-ready', '1');

        var DELAY = 2400;
        var selector = 'button, a[href], [role="button"], .lof-chronicler-preference-chip, [data-lof-action], [data-lof-day], [data-lof-section], [data-lof-category], [data-lof-favorite-achievement], [data-lof-role-id], [data-lof-program-info]';
        var tooltip = document.createElement('div');
        tooltip.className = 'lof-chronicler-hover-tooltip is-long-hover';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.setAttribute('aria-hidden', 'true');
        tooltip.innerHTML = '<span class="lof-chronicler-hover-tooltip-kicker">ПАСПОРТ · ПОДСКАЗКА</span><strong class="lof-chronicler-hover-tooltip-title"></strong><span class="lof-chronicler-hover-tooltip-copy"></span>';
        scope.appendChild(tooltip);

        var active = null;
        var pending = null;
        var showTimer = null;
        var clearTimer = null;

        function nodeLabel(node) {
            var label = String(
                node.getAttribute('aria-label') ||
                node.getAttribute('data-lof-native-title') ||
                node.textContent ||
                'Кнопка'
            ).replace(/\s+/g, ' ').trim();
            if (label.length > 72) { label = label.slice(0, 69) + '…'; }
            return label || 'Кнопка';
        }

        function hoverTitle(node) {
            if (!node) { return 'Элемент паспорта'; }

            if (node.classList.contains('lof-chronicler-modal-close')) { return 'Закрыть паспорт'; }
            if (node.classList.contains('lof-chronicler-info-close')) { return 'Закрыть пояснение'; }
            if (node.classList.contains('lof-chronicler-preferences-close')) { return 'Закрыть настройки'; }
            if (node.classList.contains('lof-chronicler-open')) { return 'Открыть полный паспорт'; }
            if (node.classList.contains('lof-chronicler-settings-button')) { return 'Настроить паспорт'; }
            if (node.classList.contains('lof-chronicler-preferences-save')) { return 'Сохранить паспорт'; }
            if (node.classList.contains('lof-chronicler-preferences-cancel')) { return 'Отменить изменения'; }
            if (node.classList.contains('lof-chronicler-achievement-choice')) {
                return String((node.querySelector('b') || {}).textContent || 'Любимое достижение').trim();
            }
            if (node.classList.contains('lof-chronicler-preference-chip')) {
                return 'Любимый раздел: ' + String((node.querySelector('b') || {}).textContent || '').trim();
            }
            if (node.closest && node.closest('.lof-chronicler-category-suggestions')) {
                return 'Выбрать категорию: ' + String(node.textContent || '').trim();
            }
            if (node.hasAttribute('data-lof-program-info')) { return 'Участник программы достижений'; }
            if (node.hasAttribute('data-lof-role-id')) {
                return String(node.getAttribute('data-lof-role-title') || node.textContent || 'Уникальная роль').replace(/\s+/g, ' ').trim();
            }
            if (node.hasAttribute('data-lof-favorite-achievement')) {
                var favoriteId = String(node.getAttribute('data-lof-favorite-achievement') || '');
                var favorite = data && (data.favoriteAchievements || []).filter(function (item) {
                    return String(item && item.id || '') === favoriteId;
                })[0] || null;
                return favorite && favorite.title ? favorite.title : 'Любимое достижение';
            }
            if (node.hasAttribute('data-lof-category')) {
                var category = String(node.getAttribute('data-lof-category') || '').trim();
                return category && category !== '—' ? 'Любимая категория: ' + category : 'Любимая категория';
            }
            if (node.hasAttribute('data-lof-section')) {
                var section = String(node.getAttribute('data-lof-section') || '').trim();
                return section ? 'Любимый раздел: ' + section : 'Любимый раздел';
            }
            if (node.hasAttribute('data-lof-day')) {
                var dayKey = String(node.getAttribute('data-lof-day') || '').trim();
                return dayKey ? 'Активность: ' + formatDate(dayKey + 'T00:00:00Z') : 'День активности';
            }

            var action = String(node.getAttribute('data-lof-action') || '').trim();
            var actionTitles = {
                'contributions': 'Все правки',
                'contributions-oldest': 'Первый след на Википедии',
                'created': 'Созданные статьи',
                'uploads': 'Загруженные изображения',
                'month': 'Активность за месяц',
                'favorite-sections': 'Любимые разделы',
                'favorite-achievements': 'Любимые достижения',
                'passport-issued': 'Дата выдачи паспорта',
                'tenure': 'Стаж на Википедии',
                'activity-status': 'Статус активности',
                'profile-type': 'Почерк летописца',
                'unique-articles': 'Охват статей',
                'active-days': 'Активные дни',
                'average-day': 'Средняя активность',
                'record-day': 'Рекорд за сутки',
                'first-created': 'Первая созданная статья',
                'latest-created': 'Последняя созданная статья',
                'most-edited': 'Самая редактируемая статья',
                'best-month': 'Самый активный месяц',
                'best-weekday': 'Самый активный день недели',
                'current-streak': 'Текущая серия активности',
                'best-streak': 'Личный рекорд серии',
                'last-activity': 'Последнее действие'
            };
            if (actionTitles[action]) { return actionTitles[action]; }
            if (node.classList.contains('lof-chronicler-info-link')) {
                return String(node.textContent || 'Открыть связанную страницу').replace(/[→›»]/g, '').replace(/\s+/g, ' ').trim();
            }
            return nodeLabel(node);
        }

        function hoverKicker(node) {
            if (node && node.closest) {
                if (node.closest('.lof-chronicler-preferences')) { return 'ПАСПОРТ · НАСТРОЙКИ'; }
                if (node.closest('.lof-chronicler-info-dialog')) { return 'ПАСПОРТ · ПОЯСНЕНИЕ'; }
                if (node.closest('.lof-chronicler-modal')) { return 'ПАСПОРТ · ПОДРОБНОСТИ'; }
            }
            return 'ПАСПОРТ ЛЕТОПИСЦА · ПОДСКАЗКА';
        }

        function prepare(node) {
            if (!node || !scope.contains(node)) { return null; }
            if (node.disabled || node.getAttribute('aria-disabled') === 'true') { return null; }
            if (node.hasAttribute('title')) {
                node.setAttribute('data-lof-native-title', node.getAttribute('title') || '');
                node.removeAttribute('title');
            }
            var destination = modalHoverText(node, data || {});
            if (!destination) { return null; }
            return { label: hoverTitle(node), destination: destination };
        }

        function positionTooltip(node) {
            if (!node || active !== node || !tooltip.classList.contains('is-visible')) { return; }
            var targetRect = node.getBoundingClientRect();
            var tipRect = tooltip.getBoundingClientRect();
            var gap = 10;
            var left = targetRect.left + targetRect.width / 2 - tipRect.width / 2;
            left = Math.max(10, Math.min(window.innerWidth - tipRect.width - 10, left));
            var top = targetRect.top - tipRect.height - gap;
            var below = top < 10;
            if (below) { top = targetRect.bottom + gap; }
            top = Math.max(10, Math.min(window.innerHeight - tipRect.height - 10, top));
            tooltip.style.left = Math.round(left) + 'px';
            tooltip.style.top = Math.round(top) + 'px';
            tooltip.classList.toggle('is-below', below);
        }

        function hide() {
            if (showTimer) { window.clearTimeout(showTimer); showTimer = null; }
            pending = null;
            active = null;
            tooltip.classList.remove('is-visible');
            tooltip.setAttribute('aria-hidden', 'true');
            if (clearTimer) { window.clearTimeout(clearTimer); }
            clearTimer = window.setTimeout(function () {
                if (!active && !pending) {
                    var t = tooltip.querySelector('.lof-chronicler-hover-tooltip-title');
                    var c = tooltip.querySelector('.lof-chronicler-hover-tooltip-copy');
                    if (t) { t.textContent = ''; }
                    if (c) { c.textContent = ''; }
                }
            }, 150);
        }

        function schedule(node) {
            hide();
            var info = prepare(node);
            if (!info) { return; }
            pending = node;
            showTimer = window.setTimeout(function () {
                showTimer = null;
                if (pending !== node || !document.documentElement.contains(node)) { return; }
                var kicker = tooltip.querySelector('.lof-chronicler-hover-tooltip-kicker');
                var title = tooltip.querySelector('.lof-chronicler-hover-tooltip-title');
                var copy = tooltip.querySelector('.lof-chronicler-hover-tooltip-copy');
                if (kicker) { kicker.textContent = hoverKicker(node); }
                if (title) { title.textContent = info.label; }
                if (copy) { copy.textContent = info.destination; }
                active = node;
                pending = null;
                tooltip.setAttribute('aria-hidden', 'false');
                tooltip.classList.add('is-visible');
                window.requestAnimationFrame(function () { positionTooltip(node); });
            }, DELAY);
        }

        function targetFromEvent(event) {
            if (!event || !event.target || !event.target.closest) { return null; }
            var node = event.target.closest(selector);
            return node && scope.contains(node) && node !== tooltip ? node : null;
        }

        scope.addEventListener('mouseover', function (event) {
            var node = targetFromEvent(event);
            if (!node) { return; }
            if (event.relatedTarget && node.contains(event.relatedTarget)) { return; }
            schedule(node);
        });
        scope.addEventListener('mouseout', function (event) {
            var node = targetFromEvent(event);
            if (!node) { return; }
            if (event.relatedTarget && node.contains(event.relatedTarget)) { return; }
            hide();
        });
        scope.addEventListener('focusin', function (event) {
            var node = targetFromEvent(event);
            if (node) { schedule(node); }
        });
        scope.addEventListener('focusout', function (event) {
            var node = targetFromEvent(event);
            if (node) { hide(); }
        });
        scope.addEventListener('click', hide);
        scope.addEventListener('scroll', hide, true);
        window.addEventListener('resize', function () {
            if (active) { positionTooltip(active); }
        });
    }

    function closeModal() {
        var old = document.getElementById(MODAL_ID);
        if (old) {
            old.remove();
        }
        document.documentElement.classList.remove('lof-chronicler-modal-open');
    }

    function openModal(data) {
        if (!data) {
            return;
        }
        closeModal();

        var overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        overlay.className = 'lof-chronicler-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Статистический паспорт летописца ' + data.username);

        var avatar = data.avatar
            ? '<img class="lof-chronicler-modal-avatar-image" src="' + escapeHtml(data.avatar) + '" alt="">'
            : '<span class="lof-chronicler-modal-avatar-fallback">' + escapeHtml(initial(data.username)) + '</span>';

        overlay.innerHTML =
            '<section class="lof-chronicler-modal">' +
                '<button type="button" class="lof-chronicler-modal-close" aria-label="Закрыть">×</button>' +
                '<div class="lof-chronicler-modal-hero">' +
                    '<div class="lof-chronicler-modal-avatar">' + avatar + '</div>' +
                    '<div class="lof-chronicler-modal-identity">' +
                        '<span class="lof-chronicler-kicker">ВИКИПЕДИЯ МИРА ЛОФАРИАН · СТАТИСТИЧЕСКИЙ ПАСПОРТ</span>' +
                        '<h2>' + escapeHtml(data.username) + '</h2>' +
                        '<div class="lof-chronicler-modal-document-code" aria-label="Паспортная серия и номер">' +
                            '<span><i>Серия</i><b>' + escapeHtml(data.passportIdentity && data.passportIdentity.series || 'AAAA') + '</b></span>' +
                            '<span><i>Номер</i><b>' + escapeHtml(data.passportIdentity && data.passportIdentity.numberText || '0001') + '</b></span>' +
                        '</div>' +
                        '<button type="button" class="lof-chronicler-passport-line is-clickable" data-lof-action="contributions-oldest"><span>На Википедии мира Лофариан с</span><strong>' + escapeHtml(formatDate(data.arrival)) + '</strong></button>' +
                        '<div class="lof-chronicler-identity-chips">' + programChipHtml() + rolesHtml(data.roles) + '</div>' +
                        passportMetaHtml(data, false) +
                    '</div>' +
                    (isOwnProfile(data.username) ? '<button type="button" class="lof-chronicler-settings-button">Настроить паспорт</button>' : '') +
                '</div>' +

                '<div class="lof-chronicler-modal-grid">' +
                    '<button type="button" class="lof-chronicler-stat is-clickable" data-lof-action="contributions"><span>Правок</span><strong>' + escapeHtml(formatNumber(data.editCount)) + '</strong><small>Открыть вклад</small></button>' +
                    '<button type="button" class="lof-chronicler-stat is-clickable" data-lof-action="created"><span>Создано статей</span><strong>' + escapeHtml(formatNumber(data.createdArticles)) + '</strong><small>Показать созданные</small></button>' +
                    '<button type="button" class="lof-chronicler-stat is-clickable" data-lof-action="uploads"><span>Изображений</span><strong>' + escapeHtml(formatNumber(data.uploadedImages)) + '</strong><small>Открыть загрузки</small></button>' +
                    '<button type="button" class="lof-chronicler-stat is-clickable" data-lof-action="month"><span>Активность за месяц</span><strong>' + escapeHtml(formatNumber(data.month.total)) + '</strong><small>' + escapeHtml(formatNumber(data.month.activeDays)) + ' активных дней · к календарю</small></button>' +
                '</div>' +

                '<div class="lof-chronicler-modal-section" data-lof-section-target="month">' +
                    '<div class="lof-chronicler-section-heading"><div><span>АКТИВНОСТЬ</span><h3>' + escapeHtml(data.month.label) + '</h3></div><strong>' + escapeHtml(formatNumber(data.month.total)) + ' действий</strong></div>' +
                    calendarHtml(data.month) +
                '</div>' +

                '<div class="lof-chronicler-modal-section lof-chronicler-signature-section">' +
                    '<div class="lof-chronicler-section-heading"><div><span>ПОЧЕРК ЛЕТОПИСЦА</span><h3>' + escapeHtml(data.activityInsights && data.activityInsights.profileTitle || '—') + '</h3></div><small>Автоматический профиль деятельности</small></div>' +
                    '<div class="lof-chronicler-signature-grid">' +
                        '<button type="button" class="is-clickable" data-lof-action="profile-type"><span>Профиль</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.profileTitle || '—') + '</strong></button>' +
                        '<button type="button" class="is-clickable" data-lof-action="unique-articles"><span>Охват</span><strong>' + escapeHtml(formatNumber(data.activityInsights && data.activityInsights.uniqueArticles || 0)) + ' статей</strong></button>' +
                        '<button type="button" class="is-clickable" data-lof-action="active-days"><span>Активных дней</span><strong>' + escapeHtml(formatNumber(data.activityInsights && data.activityInsights.activeDays || 0)) + '</strong></button>' +
                        '<button type="button" class="is-clickable" data-lof-action="average-day"><span>Среднее</span><strong>' + escapeHtml(String(Math.round(Number(data.activityInsights && data.activityInsights.averagePerActiveDay || 0) * 10) / 10).replace('.', ',')) + ' / день</strong></button>' +
                        '<button type="button" class="is-clickable" data-lof-action="record-day"><span>Рекорд</span><strong>' + escapeHtml(formatNumber(data.activityInsights && data.activityInsights.recordDay && data.activityInsights.recordDay.count || 0)) + ' / сутки</strong></button>' +
                    '</div>' +
                    distributionHtml(data.activityInsights && data.activityInsights.distribution) +
                '</div>' +

                '<div class="lof-chronicler-dual lof-chronicler-history-dual">' +
                    '<div class="lof-chronicler-modal-section">' +
                        '<div class="lof-chronicler-section-heading"><div><span>ПЕРВЫЙ СЛЕД</span><h3>История автора</h3></div></div>' +
                        '<div class="lof-chronicler-history-list">' +
                            '<button type="button" class="is-clickable" data-lof-action="first-created"><span>Первая созданная статья</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.firstCreatedArticle && data.activityInsights.firstCreatedArticle.title || '—') + '</strong></button>' +
                            '<button type="button" class="is-clickable" data-lof-action="latest-created"><span>Последняя созданная статья</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.latestCreatedArticle && data.activityInsights.latestCreatedArticle.title || '—') + '</strong></button>' +
                            '<button type="button" class="is-clickable" data-lof-action="most-edited"><span>Чаще всего редактирует</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.mostEditedArticle && data.activityInsights.mostEditedArticle.title || '—') + '</strong></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lof-chronicler-modal-section">' +
                        '<div class="lof-chronicler-section-heading"><div><span>РИТМ</span><h3>Активность во времени</h3></div></div>' +
                        '<div class="lof-chronicler-history-list">' +
                            '<button type="button" class="is-clickable" data-lof-action="best-month"><span>Самый активный месяц</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.bestMonth && data.activityInsights.bestMonth.label || '—') + '</strong></button>' +
                            '<button type="button" class="is-clickable" data-lof-action="best-weekday"><span>Чаще активен</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.bestWeekday && data.activityInsights.bestWeekday.title || '—') + '</strong></button>' +
                            '<button type="button" class="is-clickable" data-lof-action="record-day"><span>Лучшие сутки</span><strong>' + escapeHtml(data.activityInsights && data.activityInsights.recordDay && data.activityInsights.recordDay.key ? formatDate(data.activityInsights.recordDay.key + 'T00:00:00Z') : '—') + '</strong></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="lof-chronicler-dual">' +
                    '<div class="lof-chronicler-modal-section" data-lof-section-target="favorite-sections">' +
                        '<div class="lof-chronicler-section-heading"><div><span>ПРЕДПОЧТЕНИЯ</span><h3>Любимые разделы</h3></div><small class="lof-chronicler-choice-mode">' + escapeHtml(preferenceModeText(data.favoriteSectionsManual)) + '</small></div>' +
                        '<div class="lof-chronicler-section-chips">' + sectionChips(data.favoriteSections) + '</div>' +
                    '</div>' +
                    '<div class="lof-chronicler-modal-section">' +
                        '<div class="lof-chronicler-section-heading"><div><span>ЛОР</span><h3>Любимая категория</h3></div><small class="lof-chronicler-choice-mode">' + escapeHtml(preferenceModeText(data.favoriteCategoryManual)) + '</small></div>' +
                        '<button type="button" class="lof-chronicler-favorite-category is-clickable" data-lof-category="' + escapeHtml(data.favoriteCategory && data.favoriteCategory.title || '') + '">' +
                            '<strong>' + escapeHtml(data.favoriteCategory && data.favoriteCategory.title || '—') + '</strong>' +
                            '<small>' + escapeHtml(data.favoriteCategoryManual ? 'Личный выбор участника · открыть категорию' : 'По страницам, которые летописец редактирует чаще всего · открыть категорию') + '</small>' +
                        '</button>' +
                    '</div>' +
                '</div>' +

                '<div class="lof-chronicler-modal-section lof-chronicler-favorite-achievements-section" data-lof-section-target="favorite-achievements">' +
                    '<div class="lof-chronicler-section-heading"><div><span>ЛИЧНЫЙ ВЫБОР</span><h3>Любимые достижения</h3></div><strong>' + escapeHtml(formatNumber((data.favoriteAchievements || []).length)) + '/5</strong></div>' +
                    '<div class="lof-chronicler-favorite-achievements">' + favoriteAchievementsHtml(data.favoriteAchievements) + '</div>' +
                '</div>' +

                '<div class="lof-chronicler-streak-panel">' +
                    '<button type="button" class="is-clickable" data-lof-action="current-streak"><span>Текущая серия активности</span><strong>' + escapeHtml(formatNumber(data.currentStreak)) + ' дней</strong></button>' +
                    '<button type="button" class="is-clickable" data-lof-action="best-streak"><span>Личный рекорд</span><strong>' + escapeHtml(formatNumber(data.bestStreak)) + ' дней</strong></button>' +
                    '<button type="button" class="is-clickable" data-lof-action="last-activity"><span>Последнее действие</span><strong>' + escapeHtml(formatDate(data.lastActivity)) + '</strong></button>' +
                '</div>' +

                '<div class="lof-chronicler-passport-signoff">' +
                    '<div class="lof-chronicler-written-signature"><span>Подпись летописца</span><strong>' + escapeHtml(data.signature || '—') + '</strong></div>' +
                    validityHtml(false) +
                '</div>' +

                '<div class="lof-chronicler-modal-note">Это статистический паспорт участника Википедии мира Лофариан. Дата выдачи связана с первым подтверждённым подключением к программе достижений; остальная статистика строится по действиям на этой вики. Любимые разделы, категория и до пяти уже полученных любимых достижений выбираются самим летописцем.</div>' +
            '</section>';

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
        overlay.querySelector('.lof-chronicler-modal-close').addEventListener('click', closeModal);
        var settingsButton = overlay.querySelector('.lof-chronicler-settings-button');
        if (settingsButton) { settingsButton.addEventListener('click', function () { openPreferencesEditor(data); }); }
        attachPassportActions(overlay, data, true);
        attachModalHoverSystem(overlay, data);
        document.body.appendChild(overlay);
        document.documentElement.classList.add('lof-chronicler-modal-open');
        window.setTimeout(function () {
            var close = overlay.querySelector('.lof-chronicler-modal-close');
            if (close) {
                close.focus();
            }
        }, 0);
    }


    function closePreferencesEditor() {
        var old = document.getElementById(PREFS_MODAL_ID);
        if (old) { old.remove(); }
    }

    function allSectionOptions(data) {
        var counts = {};
        var names = [];
        (data.sectionOptions || []).forEach(function (item) {
            var name = String(item.name || '').trim();
            if (!name) { return; }
            counts[name] = Number(item.count) || 0;
            if (names.indexOf(name) === -1) { names.push(name); }
        });
        STANDARD_SECTIONS.forEach(function (name) { if (names.indexOf(name) === -1) { names.push(name); } });
        (data.preferences && data.preferences.favoriteSections || []).forEach(function (name) { if (names.indexOf(name) === -1) { names.push(name); } });
        return names.map(function (name) { return { name: name, count: counts[name] || 0 }; });
    }

    function openPreferencesEditor(data) {
        if (!data || !isOwnProfile(data.username)) { return; }
        closePreferencesEditor();
        var overlay = document.createElement('div');
        overlay.id = PREFS_MODAL_ID;
        overlay.className = 'lof-chronicler-preferences-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        var clean = sanitizePreferences(data.preferences || {});
        var selectedAchievements = clean.favoriteAchievements.slice();
        var sectionOptions = allSectionOptions(data);
        var categorySuggestions = (data.categoryOptions || []).map(function (item) { return String(item.title || '').trim(); }).filter(Boolean);
        overlay.innerHTML =
            '<section class="lof-chronicler-preferences">' +
                '<button type="button" class="lof-chronicler-preferences-close" aria-label="Закрыть">×</button>' +
                '<div class="lof-chronicler-preferences-hero"><span class="lof-chronicler-kicker">ЛИЧНЫЕ НАСТРОЙКИ</span><h2>Настроить паспорт</h2><p>Пустые поля остаются автоматическими. Любимые достижения не влияют на прогресс программы. Подпись — до 10 символов.</p></div>' +
                '<div class="lof-chronicler-preferences-block"><div class="lof-chronicler-preferences-title"><div><span>РАЗДЕЛЫ</span><h3>До трёх любимых разделов</h3></div><strong class="lof-chronicler-sections-counter">0/3</strong></div><div class="lof-chronicler-preferences-sections"></div><small>Если снять все отметки, три раздела снова определятся по активности.</small></div>' +
                '<div class="lof-chronicler-preferences-block"><div class="lof-chronicler-preferences-title"><div><span>ЛОР</span><h3>Любимая категория статей</h3></div></div><input type="text" class="lof-chronicler-category-input" maxlength="160" placeholder="Оставьте пустым для автоматического выбора"><div class="lof-chronicler-category-suggestions"></div></div>' +
                '<div class="lof-chronicler-preferences-block"><div class="lof-chronicler-preferences-title"><div><span>ПОДПИСЬ</span><h3>Подпись летописца</h3></div><strong class="lof-chronicler-signature-counter">0/10</strong></div><input type="text" class="lof-chronicler-signature-input" maxlength="10" placeholder="До 10 символов"><small>Короткая личная подпись, которая будет показана в паспорте.</small></div>' +
                '<div class="lof-chronicler-preferences-block"><div class="lof-chronicler-preferences-title"><div><span>ДОСТИЖЕНИЯ</span><h3>Любимые достижения</h3></div><strong class="lof-chronicler-achievements-counter">' + escapeHtml(String(selectedAchievements.length)) + '/5</strong></div><input type="search" class="lof-chronicler-achievement-search" placeholder="Найти достижение…"><div class="lof-chronicler-achievement-picker"><div class="lof-chronicler-picker-loading">Загружаем каталог достижений…</div></div><small>Можно выбрать до пяти уже полученных достижений или серий. Если выбрать полученное скрытое достижение, оно будет публично показано среди любимых в паспорте.</small></div>' +
                '<div class="lof-chronicler-preferences-status" aria-live="polite"></div>' +
                '<div class="lof-chronicler-preferences-actions"><button type="button" class="lof-chronicler-preferences-cancel">Отмена</button><button type="button" class="lof-chronicler-preferences-save">Сохранить</button></div>' +
            '</section>';
        var sectionHost = overlay.querySelector('.lof-chronicler-preferences-sections');
        var sectionCounter = overlay.querySelector('.lof-chronicler-sections-counter');
        var categoryInput = overlay.querySelector('.lof-chronicler-category-input');
        var categoryHost = overlay.querySelector('.lof-chronicler-category-suggestions');
        var signatureInput = overlay.querySelector('.lof-chronicler-signature-input');
        var signatureCounter = overlay.querySelector('.lof-chronicler-signature-counter');
        var picker = overlay.querySelector('.lof-chronicler-achievement-picker');
        var achievementCounter = overlay.querySelector('.lof-chronicler-achievements-counter');
        var search = overlay.querySelector('.lof-chronicler-achievement-search');
        var status = overlay.querySelector('.lof-chronicler-preferences-status');
        var save = overlay.querySelector('.lof-chronicler-preferences-save');
        categoryInput.value = clean.favoriteCategory;
        signatureInput.value = clean.signature || '';
        function syncSignature() { signatureCounter.textContent = String(signatureInput.value || '').length + '/10'; }
        signatureInput.addEventListener('input', syncSignature);
        syncSignature();

        function selectedSections() {
            return Array.prototype.slice.call(sectionHost.querySelectorAll('input[type="checkbox"]:checked')).map(function (input) { return input.value; }).slice(0, 3);
        }
        function syncSectionState() {
            var count = selectedSections().length;
            sectionCounter.textContent = count + '/3';
            Array.prototype.slice.call(sectionHost.querySelectorAll('input[type="checkbox"]')).forEach(function (input) { input.disabled = count >= 3 && !input.checked; });
        }
        sectionOptions.forEach(function (item) {
            var label = document.createElement('label');
            label.className = 'lof-chronicler-preference-chip';
            var input = document.createElement('input');
            input.type = 'checkbox'; input.value = item.name; input.checked = clean.favoriteSections.indexOf(item.name) !== -1;
            var text = document.createElement('span');
            text.innerHTML = '<b>' + escapeHtml(item.name) + '</b><small>' + escapeHtml(formatNumber(item.count)) + ' действий</small>';
            input.addEventListener('change', syncSectionState);
            label.appendChild(input); label.appendChild(text); sectionHost.appendChild(label);
        });
        syncSectionState();
        categorySuggestions.slice(0, 10).forEach(function (title) {
            var button = document.createElement('button'); button.type = 'button'; button.textContent = title;
            button.addEventListener('click', function () { categoryInput.value = title; categoryInput.focus(); });
            categoryHost.appendChild(button);
        });

        var catalogChoices = [];
        function renderChoices() {
            var query = String(search.value || '').trim().toLocaleLowerCase('ru');
            picker.innerHTML = '';
            var visible = catalogChoices.filter(function (item) { return !query || item.title.toLocaleLowerCase('ru').indexOf(query) !== -1; });
            if (!visible.length) { picker.innerHTML = '<div class="lof-chronicler-picker-empty">Ничего не найдено.</div>'; return; }
            visible.forEach(function (item) {
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'lof-chronicler-achievement-choice' + (selectedAchievements.indexOf(item.id) !== -1 ? ' is-selected' : '');
                var image = item.image ? '<img src="' + escapeHtml(achievementImageUrl(item.image)) + '" alt="" loading="lazy">' : '<span class="lof-chronicler-achievement-choice-placeholder">✦</span>';
                button.innerHTML = '<span class="lof-chronicler-achievement-choice-image">' + image + '</span><span><b>' + escapeHtml(item.title) + '</b><small>' + escapeHtml(item.type === 'family' ? 'Серия I–C' : 'Достижение') + '</small></span><i>✓</i>';
                button.addEventListener('click', function () {
                    var index = selectedAchievements.indexOf(item.id);
                    if (index !== -1) { selectedAchievements.splice(index, 1); }
                    else if (selectedAchievements.length < 5) { selectedAchievements.push(item.id); }
                    else { status.textContent = 'Можно выбрать не больше пяти любимых достижений.'; }
                    achievementCounter.textContent = selectedAchievements.length + '/5';
                    renderChoices();
                });
                picker.appendChild(button);
            });
        }
        search.addEventListener('input', renderChoices);
        var api = new mw.Api();
        fetchEarnedCatalogChoices(api).then(function (choices) {
            catalogChoices = choices || [];
            var allowed = Object.create(null);
            catalogChoices.forEach(function (item) { allowed[item.id] = true; });
            selectedAchievements = selectedAchievements.filter(function (id) { return !!allowed[id]; }).slice(0, 5);
            achievementCounter.textContent = selectedAchievements.length + '/5';
            renderChoices();
        }).catch(function () {
            picker.innerHTML = '<div class="lof-chronicler-picker-empty">Не удалось загрузить полученные достижения.</div>';
        });
        overlay.addEventListener('click', function (event) { if (event.target === overlay) { closePreferencesEditor(); } });
        overlay.querySelector('.lof-chronicler-preferences-close').addEventListener('click', closePreferencesEditor);
        overlay.querySelector('.lof-chronicler-preferences-cancel').addEventListener('click', closePreferencesEditor);
        save.addEventListener('click', function () {
            var next = sanitizePreferences({ favoriteSections: selectedSections(), favoriteCategory: categoryInput.value, favoriteAchievements: selectedAchievements, signature: signatureInput.value });
            status.textContent = 'Сохраняем…';
            save.disabled = true;

            /*
             * Ошибка повторной загрузки карточки больше не маскируется под
             * ошибку сохранения. Сначала отдельно подтверждаем запись API,
             * и только после этого перерисовываем паспорт.
             */
            savePreferences(api, data.username, next, data.preferencesBaseTimestamp).then(function () {
                status.textContent = 'Сохранено.';
                clearCache(data.username);
                window.setTimeout(function () {
                    closePreferencesEditor();
                    closeModal();
                    var module = document.getElementById('lof-profile-achievements-rail');
                    loadAndRender(module, data.username, true).then(function (updated) {
                        if (updated) { openModal(updated); }
                    }).catch(function (reloadError) {
                        if (window.console && console.warn) {
                            console.warn('[Lofarian Chronicler Card] Preferences saved, but passport reload failed:', reloadError);
                        }
                    });
                }, 180);
            }).catch(function (error) {
                save.disabled = false;
                var code = error && (error.code || error.error && error.error.code) || '';
                status.textContent = 'Не удалось записать настройки' + (code ? ' (' + code + ')' : '') + '. Попробуйте ещё раз.';
                if (window.console && console.warn) { console.warn('[Lofarian Chronicler Card] Preferences save failed:', error); }
            });
        });
        document.body.appendChild(overlay);
        attachModalHoverSystem(overlay, data);
    }

    function replaceCard(module, data) {
        var old = document.getElementById(CARD_ID);
        var card = buildCard(data);
        if (old && old.parentNode) {
            old.parentNode.replaceChild(card, old);
            return;
        }
        if (module && module.parentNode) {
            module.parentNode.insertBefore(card, module);
        }
    }

    function renderError(module, username, error) {
        var old = document.getElementById(CARD_ID);
        if (!old) {
            old = renderLoadingCard(module, username);
        }
        old.classList.remove('is-loading');
        old.classList.add('is-error');
        var line = old.querySelector('.lof-chronicler-loading-line');
        if (line) {
            line.textContent = 'Не удалось собрать статистику. Нажмите, чтобы повторить.';
            line.setAttribute('role', 'button');
            line.setAttribute('tabindex', '0');
            var retry = function () { loadAndRender(module, username, true); };
            line.onclick = retry;
            line.onkeydown = function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    retry();
                }
            };
        }
        if (window.console && console.warn) {
            console.warn('[Lofarian Chronicler Card] Статистика не загружена:', error);
        }
    }

    function loadAndRender(module, username, force) {
        currentUsername = username;
        if (!document.getElementById(CARD_ID)) {
            renderLoadingCard(module, username);
        }
        if (loadingPromise && !force) {
            return loadingPromise;
        }
        loadingPromise = collectStatistics(username, force).then(function (data) {
            currentData = data;
            replaceCard(module, data);
            hideNativeUniqueRoleBadges(data.roles);
            return data;
        }).catch(function (error) {
            renderError(module, username, error);
            return null;
        }).then(function (data) {
            loadingPromise = null;
            return data;
        });
        return loadingPromise;
    }

    function renderIfReady(force) {
        var username = profileUsername();
        if (!username) {
            return false;
        }
        var module = document.getElementById('lof-profile-achievements-rail');
        if (!module) {
            return false;
        }
        if (!participantAllowed(module, username)) {
            var stale = document.getElementById(CARD_ID);
            if (stale) {
                stale.remove();
            }
            return true;
        }
        loadAndRender(module, username, !!force);
        return true;
    }

    function stopWatching() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (watchTimer) {
            window.clearTimeout(watchTimer);
            watchTimer = null;
        }
    }

    function init(force) {
        closeModal();
        stopWatching();
        currentData = null;
        currentUsername = profileUsername();

        if (!currentUsername) {
            var stale = document.getElementById(CARD_ID);
            if (stale) {
                stale.remove();
            }
            return;
        }

        if (renderIfReady(force)) {
            return;
        }

        observer = new MutationObserver(function () {
            if (renderIfReady(force)) {
                stopWatching();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
        watchTimer = window.setTimeout(stopWatching, WATCH_TIMEOUT);
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.getElementById(PREFS_MODAL_ID)) {
            closePreferencesEditor();
        } else if (event.key === 'Escape' && document.getElementById(MODAL_ID)) {
            closeModal();
        }
    });

    if (mw.hook) {
        mw.hook('wikipage.content').add(function () {
            window.setTimeout(function () { init(false); }, 0);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(false); }, { once: true });
    } else {
        init(false);
    }

    window.LofarianChroniclerCard = {
        version: VERSION,
        refresh: function () { return init(true); },
        open: function () {
            if (currentData) {
                openModal(currentData);
                return true;
            }
            var username = profileUsername();
            var module = document.getElementById('lof-profile-achievements-rail');
            if (!username || !module || !participantAllowed(module, username)) {
                return false;
            }
            loadAndRender(module, username, false).then(function (data) {
                if (data) {
                    openModal(data);
                }
            });
            return true;
        }
    };
})(window.mediaWiki);