/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/UI/Notifications.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Показывает локальное уведомление о получении достижения и открывает соответствующую карточку.

ДАННЫЕ / I/O
Уведомление показывается на основании подтверждённого состояния системы.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Добавляет только уведомление Lofarian Achievements. Не заменяет системные уведомления Fandom и не скрывает рекламу.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Модуль загружается в предусмотренном dependency-layer; файлы слоя пакетируются штатным Fandom importArticles()/ResourceLoader.
- Повторные загрузки модулей дедуплицируются; тяжёлые Profile/Hall/Admin части подключаются условно.
- Каталог из Project:LofarianAchievementsData/* читается пакетно через MediaWiki API, а не отдельным запросом на каждое достижение.

RC10 — ДОБРОВОЛЬНОЕ УЧАСТИЕ / OPT-IN + CUTOFF
- На обычных страницах этот тяжёлый runtime не загружается для гостей и
  зарегистрированных пользователей, не подключивших систему достижений.
- Неучастники сохраняют возможность просматривать достижения других участников
  на профилях и в Зале славы через viewer-mode без личного подсчёта/записи.
- Участие хранится штатной user-script preference MediaWiki; временный отказ от
  приглашения использует только локальный browser storage.
- Для новых участников серверно фиксируется Unix-время нажатия «Принять участие»;
  исторические правки/создания/загрузки/Discussions до этой отметки не засчитываются.
- Старые участники мигрируются без обнуления уже существующих достижений.

ХРАНЕНИЕ И СОВМЕСТИМОСТЬ
- Официальные записи остаются на этой же вики в Project:LofarianAchievementsUsers/00..ff.
- Progress остаётся в Project:LofarianAchievementsProgress/0..255 в существующем формате L7.
- Схема L7, 256-сегментная модель, edit summary и AbuseFilter-совместимость RC9 не меняются.
- Критичные записи выполняются через стандартный MediaWiki API с CSRF token и действующими правами пользователя.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC10 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Notifications'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    function applyAchievementPrevalenceToRoot() { return I.invoke('applyAchievementPrevalenceToRoot', arguments); }
    function applyResolvedImageToElement() { return I.invoke('applyResolvedImageToElement', arguments); }
    function escapeHtml() { return I.invoke('escapeHtml', arguments); }
    function formatPoints() { return I.invoke('formatPoints', arguments); }
    function getAchievementBaseTitle() { return I.invoke('getAchievementBaseTitle', arguments); }
    function getHiddenUnlockedDescription() { return I.invoke('getHiddenUnlockedDescription', arguments); }
    function getAchievementPoints() { return I.invoke('getAchievementPoints', arguments); }
    function getAchievementTierLabel() { return I.invoke('getAchievementTierLabel', arguments); }
    function getCurrentUserName() { return I.invoke('getCurrentUserName', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function readAchievementNews() { return I.invoke('readAchievementNews', arguments); }
    function getProfileUsername() { return I.invoke('getProfileUsername', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function normalizeUserLookupKey() { return I.invoke('normalizeUserLookupKey', arguments); }
    function resolveAchievementImage() { return I.invoke('resolveAchievementImage', arguments); }

    function openAchievementFromPopup(
        achievementId
    ) {
        achievementId =
            String(
                achievementId || ''
            );

        var username =
            getCurrentUserName();

        if (
            !achievementId ||
            !username
        ) {
            return;
        }

        /*
         * Если popup появился прямо на собственном профиле,
         * не перезагружаем страницу: открываем уже смонтированное
         * окно «Все достижения» и сразу передаём ему нужный ID.
         */
        var profileUsername =
            getProfileUsername();

        var allButton =
            document.querySelector(
                '#lof-profile-achievements-rail ' +
                '.lof-profile-rail-all-button'
            );

        if (
            allButton &&
            profileUsername &&
            normalizeUserLookupKey(
                profileUsername
            ) ===
                normalizeUserLookupKey(
                    username
                )
        ) {
            allButton.setAttribute(
                'data-lof-popup-achievement',
                achievementId
            );

            allButton.click();

            allButton.removeAttribute(
                'data-lof-popup-achievement'
            );

            return;
        }

        /*
         * На любой другой странице ведём на собственный профиль.
         * Deep-link автоматически открывает официальные достижения
         * и прокручивает список к конкретной карточке.
         */
        var profileTitle =
            'User:' +
            username;

        var baseUrl = '';

        if (
            window.mw &&
            mw.util &&
            typeof mw.util.getUrl ===
                'function'
        ) {
            baseUrl =
                mw.util.getUrl(
                    profileTitle
                );
        } else {
            baseUrl =
                String(
                    mw.config.get(
                        'wgScript'
                    ) || '/index.php'
                ) +
                '?title=' +
                encodeURIComponent(
                    profileTitle
                );
        }

        var separator =
            baseUrl.indexOf('?') === -1
                ? '?'
                : '&';

        window.location.assign(
            baseUrl +
            separator +
            'lofAchievements=1' +
            '&lofAchievement=' +
            encodeURIComponent(
                achievementId
            )
        );
    }


    function showAchievementPopup(catalog, achievement) {
        var container = document.getElementById(
            'lof-achievement-container'
        );

        if (!container) {
            container = document.createElement('div');
            container.id = 'lof-achievement-container';
            document.body.appendChild(container);
        }

        var popup = document.createElement('div');

        var rarityInfo =
            getRarityInfo(
                catalog,
                achievement
            );

        popup.className =
            'lof-achievement-popup ' +
            'lof-rarity-border-' +
            rarityInfo.key;

        popup.innerHTML =
            '<button type="button" class="lof-achievement-popup-close" aria-label="Закрыть уведомление" title="Закрыть">×</button>' +
            '<div class="lof-achievement-icon-box">' +
                '<div class="lof-achievement-placeholder">✦</div>' +
                '<img class="lof-achievement-icon" alt="">' +
            '</div>' +
            '<div class="lof-achievement-content">' +
                '<div class="lof-achievement-label">' +
                    '<span class="lof-achievement-spark" aria-hidden="true">✦</span>' +
                    'Получено достижение' +
                '</div>' +
                '<div class="lof-achievement-title-row">' +
                    '<div class="lof-achievement-title">' +
                        escapeHtml(
                            getAchievementBaseTitle(
                                achievement
                            )
                        ) +
                    '</div>' +
                    (
                        getAchievementTierLabel(
                            achievement
                        )
                            ? '<span class="lof-achievement-tier-label">' +
                                escapeHtml(
                                    getAchievementTierLabel(
                                        achievement
                                    )
                                ) +
                              '</span>'
                            : ''
                    ) +
                '</div>' +
                '<div class="lof-achievement-description">' +
                    escapeHtml(
                        (achievement.hidden === true || achievement.secret === true)
                            ? getHiddenUnlockedDescription(
                                achievement.id,
                                achievement.description
                            )
                            : achievement.description
                    ) +
                '</div>' +
                '<div class="lof-achievement-footer">' +
                    (
                        getAchievementPoints(achievement) > 0
                            ? '<span class="lof-achievement-points">+' +
                                escapeHtml(
                                    formatPoints(
                                        getAchievementPoints(achievement)
                                    )
                                ) +
                              '</span>'
                            : ''
                    ) +
                    '<span class="lof-achievement-rarity lof-rarity-' +
                        escapeHtml(rarityInfo.key) +
                    '">' +
                        escapeHtml(rarityInfo.title) +
                    '</span>' +
                    (
                        achievement.secret === true ||
                        achievement.hidden === true
                            ? '<span class="lof-achievement-secret">Скрытое</span>'
                            : ''
                    ) +
                    '<span class="lof-achievement-prevalence" ' +
                        'data-lof-prevalence-id="' +
                        escapeHtml(achievement.id || '') +
                    '">Получили: …</span>' +
                '</div>' +
                '<div class="lof-achievement-details-link">' +
                    'Подробнее <span aria-hidden="true">→</span>' +
                '</div>' +
            '</div>';

        var achievementAutoHideTimer = null;
        var achievementCloseButton = popup.querySelector('.lof-achievement-popup-close');

        function dismissAchievementPopup(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (achievementAutoHideTimer) {
                clearTimeout(achievementAutoHideTimer);
                achievementAutoHideTimer = null;
            }

            if (!popup.parentNode || popup.getAttribute('data-lof-dismissed') === '1') {
                return;
            }

            popup.setAttribute('data-lof-dismissed', '1');
            popup.classList.remove('is-visible');
            popup.classList.add('is-hiding');

            setTimeout(function () {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 420);
        }

        if (achievementCloseButton) {
            achievementCloseButton.addEventListener('click', dismissAchievementPopup);
            achievementCloseButton.addEventListener('keydown', function (event) {
                event.stopPropagation();
            });
        }

        popup.setAttribute(
            'role',
            'button'
        );

        popup.setAttribute(
            'tabindex',
            '0'
        );

        popup.setAttribute(
            'aria-label',
            'Открыть достижение «' +
            getAchievementBaseTitle(
                achievement
            ) +
            '» во всех достижениях'
        );

        popup.addEventListener(
            'click',
            function (event) {
                if (event.target && event.target.closest && event.target.closest('.lof-achievement-popup-close')) {
                    return;
                }

                openAchievementFromPopup(
                    achievement.id
                );
            }
        );

        popup.addEventListener(
            'keydown',
            function (event) {
                if (event.key === 'Escape') {
                    dismissAchievementPopup(event);
                    return;
                }

                if (event.target && event.target.closest && event.target.closest('.lof-achievement-popup-close')) {
                    return;
                }

                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {
                    event.preventDefault();

                    openAchievementFromPopup(
                        achievement.id
                    );
                }
            }
        );

        container.appendChild(popup);

        applyAchievementPrevalenceToRoot(
            catalog,
            popup
        );

        var image = popup.querySelector(
            '.lof-achievement-icon'
        );

        var placeholder = popup.querySelector(
            '.lof-achievement-placeholder'
        );

        image.onload = function () {
            placeholder.style.display = 'none';
            image.style.display = 'block';
        };

        resolveAchievementImage(
            catalog,
            achievement
        ).then(function (result) {
            applyResolvedImageToElement(
                image,
                result,
                function () {
                    image.style.display = 'none';
                    placeholder.style.display = 'flex';
                }
            );
        }).catch(function (error) {
            image.style.display = 'none';
            placeholder.style.display = 'flex';

            console.error(
                '[Lofarian Achievements] Не удалось загрузить изображение:',
                error
            );
        });

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                popup.classList.add('is-visible');
            });
        });

        achievementAutoHideTimer = setTimeout(function () {
            dismissAchievementPopup();
        }, 7000);
    }


    function showManualAchievementNewsPopup(news) {
        if (!news || !news.id) {
            return;
        }

        var container = document.getElementById('lof-achievement-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'lof-achievement-container';
            document.body.appendChild(container);
        }

        var popup = document.createElement('div');
        popup.className = 'lof-achievement-popup lof-achievement-news-popup lof-rarity-border-notable';
        popup.setAttribute('role', 'button');
        popup.setAttribute('tabindex', '0');

        popup.innerHTML =
            '<button type="button" class="lof-achievement-popup-close" aria-label="Закрыть уведомление" title="Закрыть">×</button>' +
            '<div class="lof-achievement-icon-box">' +
                '<div class="lof-achievement-placeholder" style="display:flex">✦</div>' +
                '<img class="lof-achievement-icon" alt="Универсальный знак достижения">' +
            '</div>' +
            '<div class="lof-achievement-content">' +
                '<div class="lof-achievement-label">' +
                    '<span class="lof-achievement-spark" aria-hidden="true">✦</span>' +
                    'Новое в Летописи достижений' +
                '</div>' +
                '<div class="lof-achievement-title-row">' +
                    '<div class="lof-achievement-title">' + escapeHtml(news.title) + '</div>' +
                '</div>' +
                '<div class="lof-achievement-description">' + escapeHtml(news.message) + '</div>' +
                '<div class="lof-achievement-details-link">Посмотреть обновления <span aria-hidden="true">→</span></div>' +
            '</div>';

        /*
         * RC11.9.17: ручное объявление использует тот же универсальный знак,
         * который задан каталогом для сводных карточек достижений.
         * Ромб остаётся только временным fallback, пока файл загружается.
         */
        var newsUniversalIcon = popup.querySelector('.lof-achievement-icon');
        var newsUniversalPlaceholder = popup.querySelector('.lof-achievement-placeholder');
        var newsUniversalImageName = String(
            STATE.catalogCache && STATE.catalogCache.defaultImage ||
            'Достижение универсальное.png'
        );

        if (newsUniversalIcon) {
            newsUniversalIcon.onload = function () {
                if (newsUniversalPlaceholder) {
                    newsUniversalPlaceholder.style.display = 'none';
                }
                newsUniversalIcon.style.display = 'block';
            };

            resolveAchievementImage(
                { defaultImage: newsUniversalImageName },
                { image: newsUniversalImageName }
            ).then(function (result) {
                applyResolvedImageToElement(
                    newsUniversalIcon,
                    result,
                    function () {
                        newsUniversalIcon.style.display = 'none';
                        if (newsUniversalPlaceholder) {
                            newsUniversalPlaceholder.style.display = 'flex';
                        }
                    }
                );
            }).catch(function () {
                newsUniversalIcon.style.display = 'none';
                if (newsUniversalPlaceholder) {
                    newsUniversalPlaceholder.style.display = 'flex';
                }
            });
        }

        var newsAutoHideTimer = null;
        var newsCloseButton = popup.querySelector('.lof-achievement-popup-close');

        function dismissNewsPopup(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (newsAutoHideTimer) {
                clearTimeout(newsAutoHideTimer);
                newsAutoHideTimer = null;
            }

            if (!popup.parentNode || popup.getAttribute('data-lof-dismissed') === '1') {
                return;
            }

            popup.setAttribute('data-lof-dismissed', '1');
            popup.classList.remove('is-visible');
            popup.classList.add('is-hiding');

            setTimeout(function () {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 420);
        }

        function openNews() {
            var link = String(news.link || 'Летопись Лофариана Вики:Достижения');
            window.location.assign(mw.util.getUrl(link));
        }

        if (newsCloseButton) {
            newsCloseButton.addEventListener('click', dismissNewsPopup);
            newsCloseButton.addEventListener('keydown', function (event) {
                event.stopPropagation();
            });
        }

        popup.addEventListener('click', function (event) {
            if (event.target && event.target.closest && event.target.closest('.lof-achievement-popup-close')) {
                return;
            }
            openNews();
        });
        popup.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                dismissNewsPopup(event);
                return;
            }

            if (event.target && event.target.closest && event.target.closest('.lof-achievement-popup-close')) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openNews();
            }
        });

        container.appendChild(popup);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                popup.classList.add('is-visible');
            });
        });

        newsAutoHideTimer = setTimeout(function () {
            dismissNewsPopup();
        }, 12000);
    }


    /*
     * Только активный участник. Читается одна текущая запись News;
     * старых сообщений в очереди нет. У записи нет TTL: участник, который
     * зайдёт через сутки или позже, увидит последнее активное сообщение
     * один раз в этом браузере, если администратор его не заменил/очистил.
     */
    function checkManualAchievementNews() {
        if (!I.participation || I.participation.active !== true) {
            return Promise.resolve(null);
        }

        return readAchievementNews(false).then(function (news) {
            if (!news || !news.id) {
                return null;
            }

            var storageKey = 'lof-achievements-news-seen-v1:user:' + String(getCurrentUserId());
            var seenId = '';
            try {
                seenId = String(localStorage.getItem(storageKey) || '');
            } catch (error) {}

            if (seenId === String(news.id)) {
                return null;
            }

            try {
                localStorage.setItem(storageKey, String(news.id));
            } catch (error) {}

            showManualAchievementNewsPopup(news);
            return news;
        }).catch(function (error) {
            console.warn('[Lofarian Achievements] Не удалось проверить ручное объявление:', error);
            return null;
        });
    }


    I.registerFunctions('UI/Notifications', {
        openAchievementFromPopup: openAchievementFromPopup,
        showAchievementPopup: showAchievementPopup,
        showManualAchievementNewsPopup: showManualAchievementNewsPopup,
        checkManualAchievementNews: checkManualAchievementNews
    }, ["applyAchievementPrevalenceToRoot", "applyResolvedImageToElement", "escapeHtml", "formatPoints", "getAchievementBaseTitle", "getAchievementPoints", "getHiddenUnlockedDescription", "getAchievementTierLabel", "getCurrentUserId", "getCurrentUserName", "getProfileUsername", "getRarityInfo", "normalizeUserLookupKey", "readAchievementNews", "resolveAchievementImage"]);
})(window);