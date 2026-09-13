/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/UI/Roles.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Читает локальные визуальные роли сообщества для совместимости с отдельными
интерфейсами вики, но НЕ выводит их в штатной шапке профиля Fandom.
Начиная с RC11.9.25 локальные роли показываются только в специализированных
интерфейсах (например, «Паспорте летописца»).

ВАЖНО: ЭТО НЕ СИСТЕМНЫЕ ГРУППЫ ПРАВ
- Этот модуль НЕ создаёт MediaWiki user groups и НЕ выдаёт никаких прав.
- Он НЕ переименовывает Administrator, Bureaucrat, Content Moderator,
  Thread Moderator, Rollback или любые другие системные роли Fandom.
- Он НЕ скрывает, НЕ клонирует и НЕ изменяет DOM системных плашек Fandom.
- Локальные теги создаются как собственные <span> с отдельным CSS-классом
  `.lofarian-community-role` и визуально остаются отличимыми от системных ролей.
- В tooltip каждого локального тега прямо указано, что это локальная роль
  сообщества и она не является системной группой прав Fandom.

ДАННЫЕ / I/O
Читает только публичную локальную страницу этой же вики:
Project:LofarianRolesData
Страница содержит JSON с названиями визуальных ролей и их назначениями по
публичным именам пользователей. Никаких внешних запросов нет.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и удалённый исполняемый код не используются.
- Текст ролей вставляется через textContent; HTML из Project:LofarianRolesData
  не исполняется.
- Разрешён только фиксированный набор визуальных tone-классов; произвольный CSS
  или JavaScript из страницы данных не исполняется.
- Код не получает пароль, email, cookie или непубличные данные пользователя.
- Реклама и глобальная навигация Fandom не скрываются и не модифицируются.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Модуль загружается только на обычной странице профиля пользователя.
- Project:LofarianRolesData читается один раз за загрузку страницы и кэшируется
  Promise-ом внутри модуля.
- MutationObserver не выполняет API-запросы: он только повторно применяет уже
  загруженные данные после динамической перерисовки профиля.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Цель модуля — предоставить локальные данные ролей другим интерфейсам без
дублирования этих ролей рядом с системными плашками Fandom. Администраторские/
бюрократические названия и права Fandom остаются полностью штатными.
===============================================================================
*/
(function (root) {
    'use strict';

    var I = root.__LofarianAchievementsInternal;
    if (!I) {
        throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Roles');
    }

    var ROLE_DATA_PAGE = 'Project:LofarianRolesData';
    var ROLE_LIST_SELECTOR = '[data-lofarian-community-role-list="1"]';
    var roleDataPromise = null;
    var observer = null;
    var observerTimer = null;

    var ALLOWED_TONES = {
        slate: true,
        bronze: true,
        green: true,
        blue: true,
        purple: true,
        red: true,
        gold: true,
        neutral: true
    };

    /*
     * Используется только для выбора места вставки.
     * Текст/DOM найденных системных плашек никогда не изменяется.
     */
    var KNOWN_SYSTEM_ROLE_LABELS = {
        'Administrator': true,
        'Администратор': true,
        'Bureaucrat': true,
        'Бюрократ': true,
        'Content Moderator': true,
        'Модератор контента': true,
        'Thread Moderator': true,
        'Модератор обсуждений': true,
        'Rollback': true,
        'Wiki Representative': true,
        'Global Discussions Moderator': true
    };

    function readWikiPage() {
        return I.invoke('readWikiPage', arguments);
    }

    function extractJsonFromPage() {
        return I.invoke('extractJsonFromPage', arguments);
    }

    function getProfileUsername() {
        return I.invoke('getProfileUsername', arguments);
    }

    function normalizeUserLookupKey() {
        return I.invoke('normalizeUserLookupKey', arguments);
    }

    function cleanText(value, maxLength) {
        return String(value == null ? '' : value)
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .trim()
            .slice(0, maxLength || 80);
    }

    function normalizeRoleData(value) {
        var source = value && typeof value === 'object' ? value : {};
        var sourceRoles = source.roles && typeof source.roles === 'object'
            ? source.roles
            : {};
        var sourceUsers = source.users && typeof source.users === 'object'
            ? source.users
            : {};
        var roles = Object.create(null);
        var users = Object.create(null);

        Object.keys(sourceRoles).forEach(function (rawId) {
            var id = String(rawId || '').trim().toLowerCase();
            var item = sourceRoles[rawId];

            if (!/^[a-z0-9_-]{1,40}$/.test(id) || !item || typeof item !== 'object') {
                return;
            }

            var title = cleanText(item.title, 48);
            if (!title) {
                return;
            }

            var tone = String(item.tone || 'neutral').trim().toLowerCase();
            if (!ALLOWED_TONES[tone]) {
                tone = 'neutral';
            }

            roles[id] = {
                id: id,
                title: title,
                tone: tone
            };
        });

        Object.keys(sourceUsers).forEach(function (username) {
            var key = normalizeUserLookupKey(username);
            var values = Array.isArray(sourceUsers[username])
                ? sourceUsers[username]
                : [];
            var seen = Object.create(null);
            var normalized = [];

            values.forEach(function (rawRoleId) {
                var roleId = String(rawRoleId || '').trim().toLowerCase();
                if (!roles[roleId] || seen[roleId]) {
                    return;
                }
                seen[roleId] = true;
                normalized.push(roleId);
            });

            if (key && normalized.length) {
                users[key] = normalized;
            }
        });

        return {
            roles: roles,
            users: users
        };
    }

    function loadCommunityRoleData() {
        if (roleDataPromise) {
            return roleDataPromise;
        }

        roleDataPromise = readWikiPage(ROLE_DATA_PAGE)
            .then(function (page) {
                if (!page || !page.exists) {
                    return normalizeRoleData({});
                }

                var jsonText = extractJsonFromPage(page.content || '');
                var parsed;

                try {
                    parsed = JSON.parse(jsonText || '{}');
                } catch (error) {
                    console.warn(
                        '[Lofarian Achievements] Project:LofarianRolesData содержит некорректный JSON.',
                        error
                    );
                    parsed = {};
                }

                return normalizeRoleData(parsed);
            })
            .catch(function (error) {
                console.warn(
                    '[Lofarian Achievements] Не удалось прочитать локальные роли сообщества:',
                    error
                );
                return normalizeRoleData({});
            });

        return roleDataPromise;
    }

    function findSystemRoleAnchor() {
        var elements = document.querySelectorAll('span, a, div');
        var matches = [];

        Array.prototype.forEach.call(elements, function (element) {
            if (!element || element.children.length) {
                return;
            }

            var text = String(element.textContent || '').trim();
            if (KNOWN_SYSTEM_ROLE_LABELS[text]) {
                matches.push(element);
            }
        });

        return matches.length ? matches[matches.length - 1] : null;
    }

    function removeExistingRoleList() {
        var current = document.querySelector(ROLE_LIST_SELECTOR);
        if (current && current.parentNode) {
            current.parentNode.removeChild(current);
        }
    }

    function createRoleTag(role) {
        var tag = document.createElement('span');
        tag.className = 'lofarian-community-role';
        tag.dataset.lofarianCommunityRole = role.id;
        tag.dataset.lofarianCommunityRoleTone = role.tone;
        tag.textContent = role.title;
        tag.setAttribute('role', 'note');
        tag.setAttribute(
            'title',
            'Локальная роль сообщества вики мира Лофариан. Не является системной группой прав Fandom.'
        );
        tag.setAttribute(
            'aria-label',
            role.title + '. Локальная роль сообщества; не является системной группой прав Fandom.'
        );
        return tag;
    }

    function applyCommunityRoles(roleData) {
        var username = getProfileUsername();
        if (!username) {
            removeExistingRoleList();
            return false;
        }

        var userKey = normalizeUserLookupKey(username);
        var roleIds = roleData && roleData.users
            ? roleData.users[userKey]
            : null;

        if (!Array.isArray(roleIds) || !roleIds.length) {
            removeExistingRoleList();
            return false;
        }

        var anchor = findSystemRoleAnchor();
        if (!anchor || !anchor.parentNode) {
            return false;
        }

        var existing = document.querySelector(ROLE_LIST_SELECTOR);
        if (existing && existing.dataset.lofarianCommunityRoleUser === userKey) {
            return true;
        }

        removeExistingRoleList();

        var list = document.createElement('span');
        list.className = 'lofarian-community-role-list';
        list.dataset.lofarianCommunityRoleList = '1';
        list.dataset.lofarianCommunityRoleUser = userKey;
        list.setAttribute('aria-label', 'Локальные роли сообщества');

        roleIds.forEach(function (roleId) {
            var role = roleData.roles[roleId];
            if (role) {
                list.appendChild(createRoleTag(role));
            }
        });

        if (!list.children.length) {
            return false;
        }

        anchor.insertAdjacentElement('afterend', list);
        return true;
    }

    function installCommunityRoleObserver(roleData) {
        if (observer || !document.body || typeof MutationObserver === 'undefined') {
            return;
        }

        observer = new MutationObserver(function () {
            clearTimeout(observerTimer);
            observerTimer = setTimeout(function () {
                applyCommunityRoles(roleData);
            }, 120);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function initCommunityRoles() {
        /*
         * RC11.9.25: локальные роли больше НЕ вставляются в штатную шапку
         * профиля Fandom. Данные ролей остаются доступными для отдельных
         * интерфейсов (например, «Паспорта летописца»), но сама система
         * достижений не рисует их рядом с Администратором/Бюрократом.
         */
        removeExistingRoleList();
        return loadCommunityRoleData();
    }

    I.registerFunctions('UI/Roles', {
        loadCommunityRoleData: loadCommunityRoleData,
        applyCommunityRoles: applyCommunityRoles,
        initCommunityRoles: initCommunityRoles
    }, [
        'readWikiPage',
        'extractJsonFromPage',
        'getProfileUsername',
        'normalizeUserLookupKey'
    ]);

    initCommunityRoles();
})(window);