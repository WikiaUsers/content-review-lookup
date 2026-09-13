/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 LATEST-ONLY MANUAL NEWS
Страница Fandom: MediaWiki:LofarianAchievements/Services/News.js

НАЗНАЧЕНИЕ
Хранит и читает только вручную публикуемое администратором объявление о
нововведениях Lofarian Achievements на локальной странице
Project:LofarianAchievementsNews. Страница хранит только ОДНО текущее сообщение: новая
admin-публикация полностью заменяет предыдущую. Никаких очередей старых сообщений,
автоматических «версий» или внешних уведомлений нет.

I/O И БЕЗОПАСНОСТЬ
Использует стандартный MediaWiki API этой же вики. Запись доступна только через
Admin.js после проверки системной группы sysop/bureaucrat. Внешних серверов,
трекеров, eval/new Function, обфускации и удалённого JS нет.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/News'); }
    var NEWS_PAGE = 'Project:LofarianAchievementsNews';
    var DATA_CLASS = (I.config && I.config.DATA_CLASS) || 'lof-achievements-database';
    var STATE = I.state || {};

    function extractJsonFromPage() { return I.invoke('extractJsonFromPage', arguments); }
    function getUserInfo() { return I.invoke('getUserInfo', arguments); }
    function userCanAdmin() { return I.invoke('userCanAdmin', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function readWikiPage() { return I.invoke('readWikiPage', arguments); }
    function deleteWikiPage() { return I.invoke('deleteWikiPage', arguments); }
    function protectTechnicalPage() { return I.invoke('protectTechnicalPage', arguments); }
    function wrapJsonForPage() { return I.invoke('wrapJsonForPage', arguments); }
    function writeWikiPage() { return I.invoke('writeWikiPage', arguments); }

    function normalizeNews(value) {
        if (!isPlainObject(value)) { return null; }
        var id = String(value.id || '').trim();
        var title = String(value.title || '').trim();
        var message = String(value.message || '').trim();
        if (value.active === false || !id || !title || !message) { return null; }
        return {
            schemaVersion: 1,
            active: true,
            id: id,
            title: title.slice(0, 180),
            message: message.slice(0, 1800),
            publishedAt: Math.max(0, Math.floor(Number(value.publishedAt) || 0)),
            link: String(value.link || 'Летопись Лофариана Вики:Достижения')
        };
    }

    function readAchievementNews(forceReload) {
        if (STATE.achievementNewsCache !== undefined && !forceReload) {
            return Promise.resolve(STATE.achievementNewsCache);
        }
        return readWikiPage(NEWS_PAGE).then(function (page) {
            if (!page.exists || !page.content) {
                STATE.achievementNewsCache = null;
                return null;
            }
            var parsed;
            try {
                parsed = JSON.parse(extractJsonFromPage(page.content));
            } catch (error) {
                console.warn('[Lofarian Achievements] Некорректный News JSON:', error);
                STATE.achievementNewsCache = null;
                return null;
            }
            STATE.achievementNewsCache = normalizeNews(parsed);
            return STATE.achievementNewsCache;
        });
    }

    function publishAchievementNewsUnchecked(title, message) {
        title = String(title || '').trim();
        message = String(message || '').trim();
        if (!title || !message) {
            return Promise.reject(new Error('Нужны заголовок и текст объявления.'));
        }
        return readWikiPage(NEWS_PAGE).then(function (page) {
            var stamp = nowUnix();
            var data = {
                schemaVersion: 1,
                active: true,
                id: String(stamp) + '-' + Math.random().toString(36).slice(2, 8),
                title: title.slice(0, 180),
                message: message.slice(0, 1800),
                publishedAt: stamp,
                link: 'Летопись Лофариана Вики:Достижения'
            };
            var text = wrapJsonForPage(data, true);
            return writeWikiPage(NEWS_PAGE, text, page.revid || 0).then(function () {
                var protection = page.exists
                    ? Promise.resolve(null)
                    : protectTechnicalPage(NEWS_PAGE).catch(function (error) {
                        console.warn('[Lofarian Achievements] Не удалось автоматически защитить News-страницу:', error);
                        return null;
                    });

                return protection.then(function () {
                    STATE.achievementNewsCache = data;
                    console.log('[Lofarian Achievements] ✅ Новость опубликована:', data);
                    return data;
                });
            });
        });
    }


    function publishAchievementNews(title, message) {
        return getUserInfo().then(function (userInfo) {
            if (!userCanAdmin(userInfo)) {
                throw new Error('Публикация новостей доступна только администратору/бюрократу.');
            }
            return publishAchievementNewsUnchecked(title, message);
        });
    }

    function clearAchievementNewsUnchecked() {
        return readWikiPage(NEWS_PAGE).then(function (page) {
            /*
             * RC11.9.16: НЕ переписываем News-страницу при отключении.
             * На этой вики Fandom Phalanx возвращает phalanx-blockedtext даже
             * при replacement-edit уже существующего безопасного объявления.
             * Поэтому администраторское clearNews() удаляет только одну
             * техническую страницу Project:LofarianAchievementsNews штатным
             * action=delete. readAchievementNews() для отсутствующей страницы
             * уже штатно возвращает null. Следующая publishNews() создаст её
             * заново и снова поставит sysop-защиту.
             */
            if (!page || !page.exists) {
                STATE.achievementNewsCache = null;
                console.log('[Lofarian Achievements] Новость уже отключена.');
                return true;
            }

            return deleteWikiPage(
                NEWS_PAGE,
                'Lofarian Achievements: отключение текущего объявления'
            ).then(function () {
                STATE.achievementNewsCache = null;
                console.log('[Lofarian Achievements] ✅ Новость отключена: техническая News-страница удалена.');
                return true;
            });
        });
    }

    function clearAchievementNews() {
        return getUserInfo().then(function (userInfo) {
            if (!userCanAdmin(userInfo)) {
                throw new Error('Отключение новостей доступно только администратору/бюрократу.');
            }
            return clearAchievementNewsUnchecked();
        });
    }


    I.registerFunctions('Services/News', {
        readAchievementNews: readAchievementNews,
        publishAchievementNews: publishAchievementNews,
        clearAchievementNews: clearAchievementNews
    }, ['deleteWikiPage', 'extractJsonFromPage', 'getUserInfo', 'isPlainObject', 'nowUnix', 'protectTechnicalPage', 'readWikiPage', 'userCanAdmin', 'wrapJsonForPage', 'writeWikiPage']);
})(window);