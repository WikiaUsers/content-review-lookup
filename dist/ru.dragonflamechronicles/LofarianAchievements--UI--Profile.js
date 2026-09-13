/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.5 PROFILE FAST LOAD + INLINE DETAILS
Страница Fandom: MediaWiki:LofarianAchievements/UI/Profile.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Интегрирует карточки Lofarian Achievements в профиль Fandom, фильтры/редкости/неполученные и правую панель.

ДАННЫЕ / I/O
Меняет только DOM текущей страницы; официальные права и штатные серверные данные Fandom не модифицируются.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Добавляет интерфейс Lofarian Achievements в профиль. Не скрывает рекламу, не переименовывает системные роли, не изменяет права. Штатные achievement-модули Fandom в RC9 не скрываются; legacy-функция hideNativeFandomAchievementModules является no-op.

ПРОИЗВОДИТЕЛЬНОСТЬ
- Этот тяжёлый/контекстный модуль подключается условно только для соответствующей feature (profile/hall/admin/leaderboard), а не на каждой странице.
- Повторные загрузки модулей дедуплицируются; тяжёлые Profile/Hall/Admin части подключаются условно.
- Каталог из Project:LofarianAchievementsData/* читается пакетно через MediaWiki API, а не отдельным запросом на каждое достижение.

RC11 — ДОБРОВОЛЬНОЕ УЧАСТИЕ / OPT-IN + КАТАЛОГ
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

- RC11.5 убирает прогрев изображений всей коллекции и показывает подробности карточки внутри окна «Все достижения», уменьшая лишние imageinfo-запросы и вложенные overlay.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC11.2 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Profile'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var HALL_PAGE = C.HALL_PAGE;
    var ACHIEVEMENTS_PAGE = 'Летопись Лофариана Вики:Достижения';
    var PROFILE_RAIL_PAGE_SIZE = C.PROFILE_RAIL_PAGE_SIZE;
    var HALL_TOP_500_ID = C.HALL_TOP_500_ID;
    var HALL_TOP_100_ID = C.HALL_TOP_100_ID;
    var HALL_TOP_10_ID = C.HALL_TOP_10_ID;
    function applyAchievementPrevalenceToRoot() { return I.invoke('applyAchievementPrevalenceToRoot', arguments); }
    function applyResolvedImageToElement() { return I.invoke('applyResolvedImageToElement', arguments); }
    function openAchievementDetailsModal() { return I.invoke('openAchievementDetailsModal', arguments); }
    function renderAchievementDetailsInline() { return I.invoke('renderAchievementDetailsInline', arguments); }
    function buildEffectiveAchievementMap() { return I.invoke('buildEffectiveAchievementMap', arguments); }
    function buildHiddenConditionNoise() { return I.invoke('buildHiddenConditionNoise', arguments); }
    function getHiddenUnlockedDescription() { return I.invoke('getHiddenUnlockedDescription', arguments); }
    function buildMetaAchievementFacts() { return I.invoke('buildMetaAchievementFacts', arguments); }
    function buildProfileProgressContext() { return I.invoke('buildProfileProgressContext', arguments); }
    function buildRarityPreviewPane() { return I.invoke('buildRarityPreviewPane', arguments); }
    function calculateScore() { return I.invoke('calculateScore', arguments); }
    function collectProfileUnearnedTargets() { return I.invoke('collectProfileUnearnedTargets', arguments); }
    function countLogicalEarnedAchievements() { return I.invoke('countLogicalEarnedAchievements', arguments); }
    function getAchievementStepStats() { return I.invoke('getAchievementStepStats', arguments); }
    function createEmptyDiscussionStats() { return I.invoke('createEmptyDiscussionStats', arguments); }
    function escapeHtml() { return I.invoke('escapeHtml', arguments); }
    function formatCatalogInteger() { return I.invoke('formatCatalogInteger', arguments); }
    function formatPoints() { return I.invoke('formatPoints', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementBaseTitle() { return I.invoke('getAchievementBaseTitle', arguments); }
    function getAchievementCategoryTitle() { return I.invoke('getAchievementCategoryTitle', arguments); }
    function getAchievementCollectorState() { return I.invoke('getAchievementCollectorState', arguments); }
    function getLogicalRarityAchievementCounts() { return I.invoke('getLogicalRarityAchievementCounts', arguments); }
    function getAchievementPoints() { return I.invoke('getAchievementPoints', arguments); }
    function getAchievementProgressInfo() { return I.invoke('getAchievementProgressInfo', arguments); }
    function getAchievementTierLabel() { return I.invoke('getAchievementTierLabel', arguments); }
    function getAchievementVisualCategory() { return I.invoke('getAchievementVisualCategory', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getCurrentViewerEffectiveAchievementMap() { return I.invoke('getCurrentViewerEffectiveAchievementMap', arguments); }
    function getEditorStatsForUser() { return I.invoke('getEditorStatsForUser', arguments); }
    function getLeaderboardRowsCached() { return I.invoke('getLeaderboardRowsCached', arguments); }
    function getLocalWikiPresenceStartUnix() { return I.invoke('getLocalWikiPresenceStartUnix', arguments); }
    function getProgressForUser() { return I.invoke('getProgressForUser', arguments); }
    function getParticipationStartedAt() { return I.invoke('getParticipationStartedAt', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function getUserAchievementMap() { return I.invoke('getUserAchievementMap', arguments); }
    function loadProfileUnreadAchievementMap() { return I.invoke('loadProfileUnreadAchievementMap', arguments); }
    function markProfileAchievementViewed() { return I.invoke('markProfileAchievementViewed', arguments); }
    function nowUnix() { return I.invoke('nowUnix', arguments); }
    function readUserSegment() { return I.invoke('readUserSegment', arguments); }
    function resolveAchievementImage() { return I.invoke('resolveAchievementImage', arguments); }
    function resolveUser() { return I.invoke('resolveUser', arguments); }
    function syncOwnHallRankAwardTimes() { return I.invoke('syncOwnHallRankAwardTimes', arguments); }
    function viewerKnowsHiddenAchievement() { return I.invoke('viewerKnowsHiddenAchievement', arguments); }
    function setRarityLabel() { return I.invoke('setRarityLabel', arguments); }

    function removeProfileAchievementsLoading() {
        var node = document.getElementById('lof-profile-achievements-loading');
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }

    function showProfileAchievementsLoading(root) {
        removeProfileAchievementsLoading();
        if (!root) { return null; }

        var loading = document.createElement('section');
        loading.id = 'lof-profile-achievements-loading';
        loading.className = 'lof-profile-achievements-loading';
        loading.innerHTML =
            '<div class="lof-profile-achievements-loading-head">' +
                '<div class="lof-profile-rail-kicker">Летопись Лофариана</div>' +
                '<h2><a class="lof-achievements-heading-link" href="' + escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) + '">Достижения</a></h2>' +
            '</div>' +
            '<div class="lof-profile-achievements-loading-state">' +
                '<span class="lof-profile-achievements-loading-diamond" aria-hidden="true">◆</span>' +
                '<span>Достижения загружаются…</span>' +
            '</div>';

        if (root.firstChild) {
            root.insertBefore(loading, root.firstChild);
        } else {
            root.appendChild(loading);
        }
        return loading;
    }

    function getProfileUsername() {
        if (mw.config.get('wgNamespaceNumber') !== 2) {
            return null;
        }

        var title = mw.config.get('wgTitle');

        if (!title || title.indexOf('/') !== -1) {
            return null;
        }

        return title;
    }


    function getManualAchievementsHeading() {
        var headings = document.querySelectorAll(
            '.mw-parser-output h2'
        );

        for (var i = 0; i < headings.length; i++) {
            var heading = headings[i];
            var headline = heading.querySelector('.mw-headline');
            var title = headline
                ? headline.textContent
                : heading.textContent;

            if (
                String(title).trim().toLowerCase() ===
                'достижения'
            ) {
                return heading;
            }
        }

        return null;
    }


    function hideManualAchievementsSection() {
        var heading = getManualAchievementsHeading();

        if (!heading) {
            return;
        }

        heading.style.display = 'none';

        var node = heading.nextElementSibling;

        while (node && node.tagName !== 'H2') {
            node.style.display = 'none';
            node = node.nextElementSibling;
        }
    }


    function formatAchievementDate(unixTime) {
        unixTime = Number(unixTime);

        if (!Number.isFinite(unixTime) || unixTime < 946684800) {
            return '';
        }

        return new Date(unixTime * 1000)
            .toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
    }


    function removeProfileAchievementsOverlay() {
        var overlay =
            document.getElementById(
                'lof-profile-achievements-overlay'
            );

        if (overlay) {
            overlay.remove();
        }

        document.body.classList.remove(
            'lof-profile-achievements-dialog-open'
        );
    }


    function restoreNativeAchievementsModules() {
        document.querySelectorAll(
            '.lof-native-achievements-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-achievements-hidden'
            );

            if (
                node.dataset &&
                node.dataset.lofPreviousDisplay !==
                    undefined
            ) {
                if (
                    node.dataset.lofPreviousDisplay
                ) {
                    node.style.setProperty(
                        'display',
                        node.dataset.lofPreviousDisplay
                    );
                } else {
                    node.style.removeProperty(
                        'display'
                    );
                }

                delete node.dataset.lofPreviousDisplay;
            } else {
                node.style.removeProperty(
                    'display'
                );
            }
        });

        document.querySelectorAll(
            '.lof-native-rail-toggle-shell-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-rail-toggle-shell-hidden'
            );

            node.style.removeProperty(
                'display'
            );
        });

    }


    function restoreFandomRightRailUtilities() {
        document.querySelectorAll(
            '.lof-native-achievements-hidden'
        ).forEach(function (node) {
            var hasUtility =
                node.querySelector &&
                node.querySelector(
                    'a[href*="Special:Contributions"], ' +
                    'a[href*="Contributions"], ' +
                    'a[href*="print"], ' +
                    '[title*="Печат"], ' +
                    '[aria-label*="Печат"]'
                );

            if (hasUtility) {
                node.classList.remove(
                    'lof-native-achievements-hidden'
                );
                node.style.removeProperty('display');
                node.style.removeProperty('visibility');
            }
        });
    }


    function restoreFandomProfileRightRail() {
        var pageRail =
            document.querySelector(
                '.page__right-rail'
            );

        if (pageRail) {
            pageRail.classList.remove(
                'lof-achievements-exclusive-rail'
            );

            pageRail.style.removeProperty(
                'display'
            );

            pageRail.style.removeProperty(
                'visibility'
            );

            pageRail.style.removeProperty(
                'overflow'
            );
        }

        /*
         * На случай soft-navigation после старой версии:
         * возвращаем только те элементы, которые прежде маркировал
         * именно наш код. Новые штатные элементы Fandom не трогаем.
         */
        document.querySelectorAll(
            [
                '.lof-native-achievements-hidden',
                '.lof-native-rail-toggle-shell-hidden',
                '.lof-fandom-collapse-control-hidden',
                '.lof-fandom-collapse-shell-hidden'
            ].join(',')
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-achievements-hidden',
                'lof-native-rail-toggle-shell-hidden',
                'lof-fandom-collapse-control-hidden',
                'lof-fandom-collapse-shell-hidden'
            );

            node.style.removeProperty(
                'display'
            );

            node.style.removeProperty(
                'visibility'
            );

            node.style.removeProperty(
                'width'
            );

            node.style.removeProperty(
                'height'
            );

            node.style.removeProperty(
                'overflow'
            );
        });
    }


    function restoreProfileHeaderActions() {
        var actionRow =
            document.querySelector(
                '.page-header__actions[data-lof-profile-actions-moved="1"]'
            );

        var anchor =
            document.getElementById(
                'lof-profile-native-actions-anchor'
            );

        if (
            actionRow &&
            anchor &&
            anchor.parentNode
        ) {
            anchor.parentNode.insertBefore(
                actionRow,
                anchor.nextSibling
            );

            actionRow.removeAttribute(
                'data-lof-profile-actions-moved'
            );
        }

        var shell =
            document.getElementById(
                'lof-profile-below-actions'
            );

        if (shell) {
            shell.remove();
        }

        if (anchor) {
            anchor.remove();
        }

        var editProfile = document.querySelector(
            '[data-lof-profile-edit-moved="1"]'
        );
        var editAnchor = document.getElementById(
            'lof-profile-native-edit-profile-anchor'
        );

        if (editProfile && editAnchor && editAnchor.parentNode) {
            editAnchor.parentNode.insertBefore(editProfile, editAnchor.nextSibling);
            editProfile.removeAttribute('data-lof-profile-edit-moved');
            editProfile.classList.remove('lof-profile-moved-edit-profile');
        }

        if (editAnchor) {
            editAnchor.remove();
        }

        var legacyEdit =
            document.getElementById(
                'lof-profile-below-edit'
            );

        if (legacyEdit) {
            legacyEdit.remove();
        }

        document.querySelectorAll(
            '.lof-native-profile-edit-hidden'
        ).forEach(function (node) {
            node.classList.remove(
                'lof-native-profile-edit-hidden'
            );
        });
    }


    function moveProfileActionsBelowAchievements(module) {
        if (!module || !module.parentNode) {
            return;
        }

        restoreProfileHeaderActions();

        var shell = document.createElement('div');
        shell.id = 'lof-profile-below-actions';
        shell.className = 'lof-profile-below-actions';
        shell.setAttribute('aria-label', 'Действия профиля');

        module.parentNode.insertBefore(shell, module.nextSibling);

        var actionRow = document.querySelector('.page-header__actions');
        if (actionRow && !shell.contains(actionRow)) {
            var actionAnchor = document.createElement('span');
            actionAnchor.id = 'lof-profile-native-actions-anchor';
            actionAnchor.hidden = true;
            actionRow.parentNode.insertBefore(actionAnchor, actionRow);
            actionRow.setAttribute('data-lof-profile-actions-moved', '1');
            shell.appendChild(actionRow);
        }

        var editProfile = null;
        Array.prototype.some.call(
            document.querySelectorAll('a, button'),
            function (node) {
                if (!node || shell.contains(node)) {
                    return false;
                }

                var text = String(node.textContent || '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .toLocaleLowerCase('ru');

                if (text === 'править профиль' || text === 'edit profile') {
                    editProfile = node;
                    return true;
                }

                return false;
            }
        );

        if (editProfile && editProfile.parentNode) {
            var editAnchor = document.createElement('span');
            editAnchor.id = 'lof-profile-native-edit-profile-anchor';
            editAnchor.hidden = true;
            editProfile.parentNode.insertBefore(editAnchor, editProfile);
            editProfile.setAttribute('data-lof-profile-edit-moved', '1');
            editProfile.classList.add('lof-profile-moved-edit-profile');
            shell.insertBefore(editProfile, shell.firstChild);
        }

        if (!shell.children.length) {
            shell.remove();
        }
    }


    function removeProfileAchievementsRail() {
        restoreProfileHeaderActions();

        var railModule =
            document.getElementById(
                'lof-profile-achievements-rail'
            );

        if (railModule) {
            railModule.remove();
        }

        var floating =
            document.getElementById(
                'lof-profile-floating-rail'
            );

        if (floating) {
            floating.remove();
        }

        restoreNativeAchievementsModules();
        restoreFandomProfileRightRail();

        removeProfileAchievementsOverlay();
    }


    function normalizeRailText(value) {
        return String(
            value || ''
        )
            .replace(
                /\s+/g,
                ' '
            )
            .trim()
            .toLocaleLowerCase(
                'ru'
            );
    }


    function looksLikeNativeFandomAchievements(node) {
        if (
            !node ||
            node.id ===
                'lof-profile-achievements-rail' ||
            node.id ===
                'lof-profile-floating-rail'
        ) {
            return false;
        }

        if (
            node.classList &&
            node.classList.contains(
                'lof-profile-rail-module'
            )
        ) {
            return false;
        }

        var className =
            String(
                node.className || ''
            ).toLocaleLowerCase(
                'en'
            );

        if (
            className.indexOf(
                'userprofileachievementsmodule'
            ) !== -1
        ) {
            return true;
        }

        var text =
            normalizeRailText(
                node.textContent
            );

        if (!text) {
            return false;
        }

        var russian =
            (
                text.indexOf(
                    'вы можете заработать'
                ) !== -1 ||
                text.indexOf(
                    'заработать ещё больше значков'
                ) !== -1 ||
                text.indexOf(
                    'заработать еще больше значков'
                ) !== -1
            ) &&
            (
                text.indexOf(
                    'значк'
                ) !== -1 ||
                text.indexOf(
                    'балл'
                ) !== -1
            );

        var english =
            (
                text.indexOf(
                    'you can earn'
                ) !== -1 ||
                text.indexOf(
                    'earn more badges'
                ) !== -1
            ) &&
            text.indexOf(
                'badge'
            ) !== -1;

        return (
            russian ||
            english
        );
    }


    function findNativeFandomAchievementModules(wrapper) {
        if (!wrapper) {
            return [];
        }

        var found = [];

        function add(node) {
            if (
                !node ||
                node === wrapper ||
                found.indexOf(node) !== -1 ||
                !looksLikeNativeFandomAchievements(
                    node
                )
            ) {
                return;
            }

            found.push(
                node
            );
        }

        /*
         * Сначала проверяем непосредственные модули right rail.
         * Именно так сейчас устроен профиль Fandom.
         */
        Array.prototype.forEach.call(
            wrapper.children || [],
            add
        );

        /*
         * Затем ищем известные и вероятные классы на случай
         * очередного переименования фронтенда Fandom.
         */
        wrapper.querySelectorAll(
            [
                '.UserProfileAchievementsModule',
                '[class*="AchievementsModule"]',
                '[class*="achievements-module"]',
                '[class*="AchievementModule"]',
                '[class*="achievement-module"]',
                '.rail-module',
                'section'
            ].join(',')
        ).forEach(function (node) {
            if (
                !looksLikeNativeFandomAchievements(
                    node
                )
            ) {
                return;
            }

            var host =
                node;

            /*
             * Если совпал внутренний элемент текста, поднимаемся
             * до ближайшего модуля, но не выше wrapper.
             */
            var candidate =
                node.closest &&
                node.closest(
                    '.rail-module, section, aside, [class*="Module"], [class*="module"]'
                );

            if (
                candidate &&
                candidate !== wrapper &&
                wrapper.contains(
                    candidate
                )
            ) {
                host =
                    candidate;
            }

            add(
                host
            );
        });

        return found;
    }


    function isUsableBackgroundColor(value) {
        value =
            String(
                value || ''
            )
            .trim()
            .toLowerCase();

        return (
            value &&
            value !==
                'transparent' &&
            value !==
                'rgba(0, 0, 0, 0)' &&
            value !==
                'rgba(0,0,0,0)'
        );
    }


    function captureNativeRailAppearance(
        wrapper,
        modules
    ) {
        if (
            !wrapper ||
            !modules ||
            !modules.length
        ) {
            return;
        }

        var source =
            modules[0];

        var candidates = [
            source
        ];

        /*
         * У Fandom фон иногда висит не на корневом rail-module,
         * а на первом внутреннем контейнере.
         */
        Array.prototype.slice.call(
            source.children || [],
            0,
            8
        ).forEach(function (child) {
            candidates.push(
                child
            );
        });

        var chosen =
            null;

        candidates.some(function (node) {
            try {
                var style =
                    window.getComputedStyle(
                        node
                    );

                if (
                    isUsableBackgroundColor(
                        style.backgroundColor
                    )
                ) {
                    chosen = {
                        node:
                            node,

                        style:
                            style
                    };

                    return true;
                }
            } catch (error) {
                /* пробуем следующий контейнер */
            }

            return false;
        });

        if (!chosen) {
            return;
        }

        var style =
            chosen.style;

        wrapper.style.setProperty(
            '--lof-native-rail-background',
            style.backgroundColor
        );

        if (
            style.color
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-color',
                style.color
            );
        }

        if (
            style.borderRadius &&
            style.borderRadius !==
                '0px'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-radius',
                style.borderRadius
            );
        }

        if (
            style.boxShadow &&
            style.boxShadow !==
                'none'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-shadow',
                style.boxShadow
            );
        }

        if (
            style.borderTopWidth !==
                '0px'
        ) {
            wrapper.style.setProperty(
                '--lof-native-rail-border',
                style.borderTopWidth +
                    ' ' +
                    style.borderTopStyle +
                    ' ' +
                    style.borderTopColor
            );
        }
    }


    function hideNativeFandomAchievementModules(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Штатные модули Fandom больше не скрываются.
         */
        return [];
    }


    function getProfileRightRailWrapper() {
        var wrapper =
            document.querySelector(
                '.page__right-rail .right-rail-wrapper'
            ) ||
            document.querySelector(
                '.right-rail-wrapper'
            );

        if (!wrapper) {
            return null;
        }

        return {
            wrapper:
                wrapper,

            created:
                false
        };
    }


    function looksLikeRailToggle(node) {
        if (!node) {
            return false;
        }

        var text =
            [
                node.getAttribute &&
                    node.getAttribute(
                        'aria-label'
                    ),
                node.getAttribute &&
                    node.getAttribute(
                        'title'
                    ),
                node.className,
                node.id,
                node.textContent
            ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase(
                'ru'
            );

        return (
            text.indexOf('свер') !== -1 ||
            text.indexOf('развер') !== -1 ||
            text.indexOf('collapse') !== -1 ||
            text.indexOf('expand') !== -1 ||
            text.indexOf('right-rail-toggle') !== -1 ||
            text.indexOf('rail-toggle') !== -1 ||
            text.indexOf('sidebar-toggle') !== -1
        );
    }


    function suppressNativeRailToggle(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Нативный right rail Fandom не изменяется.
         */
        return;
    }


    function isFandomRightRailUtilityControl(node) {
        if (!node) {
            return false;
        }

        var text =
            [
                node.textContent,
                node.getAttribute && node.getAttribute('aria-label'),
                node.getAttribute && node.getAttribute('title'),
                node.getAttribute && node.getAttribute('href')
            ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase('ru');

        return (
            text.indexOf('печат') !== -1 ||
            text.indexOf('print') !== -1 ||
            text.indexOf('вклад') !== -1 ||
            text.indexOf('contrib') !== -1 ||
            text.indexOf('участник') !== -1 ||
            text.indexOf('contributors') !== -1
        );
    }


    function keepFandomRightRailExpanded(wrapper) {
        /*
         * LEGACY NO-OP — TEST 1.12.0.
         * Нативный right rail Fandom не изменяется.
         */
        return;
    }


    function flattenProfileAchievementGroups(groupList) {
        var entries = [];

        groupList.forEach(
            function (group) {
                group.items.forEach(
                    function (entry) {
                        entries.push({
                            id:
                                entry.id,

                            achievement:
                                entry.achievement,

                            earnedAt:
                                entry.earnedAt,

                            rarity:
                                getRarityInfo(
                                    null,
                                    entry.achievement
                                )
                        });
                    }
                );
            }
        );

        return entries;
    }


function getProfileAchievementsDeepLink() {
    var result = {
        open:
            false,

        achievementId:
            ''
    };

    try {
        var params =
            new URLSearchParams(
                window.location.search || ''
            );

        result.achievementId =
            String(
                params.get(
                    'lofAchievement'
                ) || ''
            );

        result.open =
            params.get(
                'lofAchievements'
            ) ===
                '1' ||
            !!result.achievementId;
    } catch (error) {
        /* Старый браузер: обычное открытие профиля продолжит работать. */
    }

    return result;
}


    function openProfileAchievementsDialog(
        catalog,
        username,
        scoreInfo,
        visibleCount,
        section,
        targetAchievementId,
        initialFilter
    ) {
        removeProfileAchievementsOverlay();

        var unearnedTargetCount =
            section.querySelectorAll(
                '.lof-profile-achievement[data-lof-earned="0"]'
            ).length;

        var overlay =
            document.createElement(
                'div'
            );

        overlay.id =
            'lof-profile-achievements-overlay';

        overlay.className =
            'lof-profile-achievements-overlay';

        var dialog =
            document.createElement(
                'section'
            );

        dialog.className =
            'lof-profile-achievements-dialog';

        dialog.setAttribute(
            'role',
            'dialog'
        );

        dialog.setAttribute(
            'aria-modal',
            'true'
        );

        var head =
            document.createElement(
                'div'
            );

        head.className =
            'lof-profile-achievements-dialog-head';

        var titleBlock =
            document.createElement(
                'div'
            );

        titleBlock.innerHTML =
            '<div class="lof-profile-achievements-dialog-kicker">' +
                'Официальные достижения' +
            '</div>' +
            '<h3 class="lof-profile-achievements-dialog-title">' +
                escapeHtml(
                    username
                ) +
            '</h3>' +
            '<div class="lof-profile-achievements-dialog-summary">' +
                escapeHtml(
                    String(
                        visibleCount
                    )
                ) +
                ' получено · ' +
                escapeHtml(
                    String(
                        unearnedTargetCount
                    )
                ) +
                ' впереди · ' +
                escapeHtml(
                    formatPoints(
                        scoreInfo.score
                    )
                ) +
                ' опыта' +
            '</div>';

        var close =
            document.createElement(
                'button'
            );

        close.type =
            'button';

        close.className =
            'lof-profile-achievements-dialog-close';

        close.setAttribute(
            'aria-label',
            'Закрыть'
        );

        close.textContent =
                'Закрыть';

        close.addEventListener(
            'click',
            removeProfileAchievementsOverlay
        );

        head.appendChild(
            titleBlock
        );

        head.appendChild(
            close
        );

        var body =
            document.createElement(
                'div'
            );

        body.className =
            'lof-profile-achievements-dialog-body';

        var profileCards =
            Array.prototype.slice.call(
                section.querySelectorAll(
                    '.lof-profile-achievement[data-lof-achievement-id]'
                )
            );

        var earnedCards =
            profileCards.filter(
                function (card) {
                    return (
                        card.getAttribute(
                            'data-lof-earned'
                        ) !==
                            '0'
                    );
                }
            );

        var unearnedCards =
            profileCards.filter(
                function (card) {
                    return (
                        card.getAttribute(
                            'data-lof-earned'
                        ) ===
                            '0'
                    );
                }
            );

        var completedChains =
            earnedCards.filter(
                function (card) {
                    return card.classList.contains(
                        'is-tier-complete'
                    );
                }
            ).length;

        var rarestCard =
            earnedCards.slice()
                .sort(function (a, b) {
                    return (
                        Number(
                            b.getAttribute(
                                'data-lof-rarity-order'
                            ) || 0
                        ) -
                        Number(
                            a.getAttribute(
                                'data-lof-rarity-order'
                            ) || 0
                        )
                    );
                })[0] ||
                null;

        var stats =
            document.createElement(
                'div'
            );

        stats.className =
            'lof-profile-dialog-stats';

        [
            {
                label:
                    'Получено',

                value:
                    String(
                        visibleCount
                    ),

                action:
                    'earned'
            },
            {
                label:
                    'Впереди',

                value:
                    String(
                        unearnedCards.length
                    ),

                action:
                    'unearned'
            },
            {
                label:
                    'Очки опыта',

                value:
                    formatPoints(
                        scoreInfo.score
                    ),

                action:
                    'xp'
            },
            {
                label:
                    'Завершено цепочек',

                value:
                    String(
                        completedChains
                    ),

                action:
                    'chains'
            },
            {
                label:
                    'Редчайшее',

                value:
                    rarestCard
                        ? rarestCard.getAttribute(
                            'data-lof-title'
                        ) ||
                            '—'
                        : '—',

                card:
                    rarestCard
            }
        ].forEach(function (item) {
            var clickable =
                !!item.card ||
                !!item.action;

            var stat =
                document.createElement(
                    clickable
                        ? 'button'
                        : 'div'
                );

            if (clickable) {
                stat.type =
                    'button';
            }

            stat.className =
                'lof-profile-dialog-stat' +
                (
                    clickable
                        ? ' is-clickable'
                        : ''
                ) +
                (
                    item.card
                        ? ' is-clickable-rarest'
                        : ''
                );

            if (item.action) {
                stat.setAttribute(
                    'data-lof-stat-action',
                    item.action
                );
            }

            var achievementId =
                item.card
                    ? String(
                        item.card.getAttribute(
                            'data-lof-achievement-id'
                        ) || ''
                    )
                    : '';

            stat.innerHTML =
                (
                    item.card
                        ? '<span class="lof-profile-dialog-stat-icon-wrap">' +
                            '<img class="lof-profile-dialog-stat-icon" alt="">' +
                          '</span>'
                        : ''
                ) +
                '<span class="lof-profile-dialog-stat-copy">' +
                    '<span class="lof-profile-dialog-stat-label">' +
                        escapeHtml(
                            item.label
                        ) +
                    '</span>' +
                    '<span class="lof-profile-dialog-stat-value">' +
                        escapeHtml(
                            item.value
                        ) +
                    '</span>' +
                '</span>';

            if (clickable) {
                if (item.action === 'xp') {
                    stat.setAttribute(
                        'aria-label',
                        'Показать самые дорогие полученные достижения по опыту'
                    );
                } else if (item.action === 'chains') {
                    stat.setAttribute(
                        'aria-label',
                        'Показать текущие уровневые цепочки достижений'
                    );
                } else if (item.action === 'earned') {
                    stat.setAttribute(
                        'aria-label',
                        'Показать полученные достижения'
                    );
                } else if (item.action === 'unearned') {
                    stat.setAttribute(
                        'aria-label',
                        'Показать все неполученные достижения'
                    );
                } else {
                    stat.setAttribute(
                        'aria-label',
                        'Перейти к достижению «' +
                        item.value +
                        '»'
                    );
                }

                stat.addEventListener(
                    'click',
                    function () {
                        if (item.action === 'xp') {
                            resetToolFilters();
                            applyProfileFilter(
                                'xp'
                            );
                            return;
                        }

                        if (item.action === 'earned') {
                            resetToolFilters();
                            applyProfileFilter(
                                'earned'
                            );
                            return;
                        }

                        if (item.action === 'unearned') {
                            resetToolFilters();
                            applyProfileFilter(
                                'unearned'
                            );
                            return;
                        }

                        if (item.action === 'chains') {
                            resetToolFilters();
                            applyProfileFilter(
                                'chains'
                            );
                            return;
                        }

                        resetToolFilters();
                        applyProfileFilter(
                            'all'
                        );

                        var targetCard =
                            null;

                        profileCards.forEach(
                            function (card) {
                                card.classList.remove(
                                    'is-selected-from-rail'
                                );

                                if (
                                    !targetCard &&
                                    card.getAttribute(
                                        'data-lof-achievement-id'
                                    ) === achievementId
                                ) {
                                    targetCard =
                                        card;
                                }
                            }
                        );

                        if (targetCard) {
                            targetCard.classList.add(
                                'is-selected-from-rail'
                            );

                            requestAnimationFrame(
                                function () {
                                    targetCard.scrollIntoView({
                                        behavior:
                                            'smooth',

                                        block:
                                            'center',

                                        inline:
                                            'nearest'
                                    });
                                }
                            );
                        }
                    }
                );

                if (item.card) {
                    var rarestAchievement =
                        getAchievement(
                            catalog,
                            achievementId
                        );

                    var statIcon =
                        stat.querySelector(
                            '.lof-profile-dialog-stat-icon'
                        );

                    if (
                        rarestAchievement &&
                        statIcon
                    ) {
                        resolveAchievementImage(
                            catalog,
                            rarestAchievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                statIcon,
                                result,
                                function () {
                                    statIcon.style.visibility =
                                        'hidden';
                                }
                            );
                        }).catch(function () {
                            statIcon.style.visibility =
                                'hidden';
                        });
                    }
                }
            }

            stats.appendChild(
                stat
            );
        });

        var filterbar =
            document.createElement(
                'div'
            );

        filterbar.className =
            'lof-profile-achievements-filterbar';

        var rarityPreviewPane =
            buildRarityPreviewPane(
                catalog,
                section
            );

        /*
         * RC11.9.8 — отдельный список самых дорогих уже полученных
         * достижений. Открывается из карточки «Очки опыта» и из
         * быстрого центра управления коллекцией.
         */
        var xpPane =
            document.createElement(
                'section'
            );

        xpPane.className =
            'lof-profile-xp-pane';

        xpPane.style.display =
            'none';

        var xpList =
            document.createElement(
                'div'
            );

        xpList.className =
            'lof-profile-xp-list';

        var xpCards =
            earnedCards.slice()
                .filter(function (card) {
                    return Number(
                        card.getAttribute('data-lof-points') || 0
                    ) > 0;
                })
                .sort(function (a, b) {
                    var pointsDifference =
                        Number(
                            b.getAttribute('data-lof-points') || 0
                        ) -
                        Number(
                            a.getAttribute('data-lof-points') || 0
                        );

                    if (pointsDifference) {
                        return pointsDifference;
                    }

                    return (
                        Number(
                            b.getAttribute('data-lof-rarity-order') || 0
                        ) -
                        Number(
                            a.getAttribute('data-lof-rarity-order') || 0
                        )
                    );
                })
                .slice(0, 20);

        xpCards.forEach(function (card, index) {
            var row =
                document.createElement(
                    'button'
                );

            row.type =
                'button';

            row.className =
                'lof-profile-xp-row';

            row.setAttribute(
                'data-rarity',
                card.getAttribute('data-rarity') || 'common'
            );

            row.innerHTML =
                '<span class="lof-profile-xp-rank">' +
                    escapeHtml(String(index + 1)) +
                '</span>' +
                '<span class="lof-profile-xp-copy">' +
                    '<strong>' +
                        escapeHtml(
                            card.getAttribute('data-lof-title') ||
                            'Достижение'
                        ) +
                    '</strong>' +
                    '<span>' +
                        escapeHtml(
                            (
                                card.querySelector('.lof-profile-achievement-rarity') &&
                                card.querySelector('.lof-profile-achievement-rarity').textContent
                            ) ||
                            'Редкость'
                        ) +
                    '</span>' +
                '</span>' +
                '<span class="lof-profile-xp-points">+' +
                    escapeHtml(
                        formatPoints(
                            Number(
                                card.getAttribute('data-lof-points') || 0
                            )
                        )
                    ) +
                '</span>';

            row.addEventListener(
                'click',
                function () {
                    card.click();
                }
            );

            xpList.appendChild(
                row
            );
        });

        if (!xpCards.length) {
            xpList.innerHTML =
                '<div class="lof-profile-xp-empty">Полученных достижений с опытом пока нет.</div>';
        }

        xpPane.appendChild(
            xpList
        );

        /*
         * «Завершено цепочек» открывает не архив всех пройденных ступеней,
         * а текущий срез: по одной самой высокой полученной ступени каждой
         * начатой I–C цепочки.
         */
        var chainsPane =
            document.createElement(
                'section'
            );

        chainsPane.className =
            'lof-profile-chains-pane';

        chainsPane.style.display =
            'none';

        var currentChainCardsByFamily = {};

        earnedCards.forEach(function (card) {
            var family =
                String(
                    card.getAttribute('data-lof-family') || ''
                );

            if (!family) {
                return;
            }

            var previous =
                currentChainCardsByFamily[family];

            if (
                !previous ||
                Number(card.getAttribute('data-lof-tier') || 0) >
                Number(previous.getAttribute('data-lof-tier') || 0)
            ) {
                currentChainCardsByFamily[family] =
                    card;
            }
        });

        var currentChainCards =
            Object.keys(
                currentChainCardsByFamily
            )
                .map(function (family) {
                    return currentChainCardsByFamily[family];
                })
                .sort(function (a, b) {
                    return String(
                        a.getAttribute('data-lof-title') || ''
                    ).localeCompare(
                        String(
                            b.getAttribute('data-lof-title') || ''
                        ),
                        'ru'
                    );
                });

        var chainsList =
            document.createElement(
                'div'
            );

        chainsList.className =
            'lof-profile-chains-list';

        currentChainCards.forEach(function (card) {
            var row =
                document.createElement(
                    'button'
                );

            row.type =
                'button';

            row.className =
                'lof-profile-chain-row';

            row.setAttribute(
                'data-rarity',
                card.getAttribute('data-rarity') || 'common'
            );

            var tierNode =
                card.querySelector(
                    '.lof-profile-achievement-tier-label'
                );

            var tierText =
                tierNode
                    ? String(tierNode.textContent || '')
                    : String(card.getAttribute('data-lof-tier') || '');

            var isComplete =
                Number(
                    card.getAttribute('data-lof-tier') || 0
                ) >= 100 ||
                card.classList.contains(
                    'is-tier-complete'
                );

            row.innerHTML =
                '<span class="lof-profile-chain-copy">' +
                    '<strong>' +
                        escapeHtml(
                            card.getAttribute('data-lof-title') ||
                            'Уровневая цепочка'
                        ) +
                    '</strong>' +
                    '<span>' +
                        escapeHtml(
                            isComplete
                                ? 'Цепочка завершена'
                                : 'Текущая ступень ' + tierText
                        ) +
                    '</span>' +
                '</span>' +
                '<span class="lof-profile-chain-tier' +
                    (isComplete ? ' is-complete' : '') +
                '">' +
                    escapeHtml(
                        isComplete
                            ? 'C'
                            : tierText
                    ) +
                '</span>';

            row.addEventListener(
                'click',
                function () {
                    card.click();
                }
            );

            chainsList.appendChild(
                row
            );
        });

        if (!currentChainCards.length) {
            chainsList.innerHTML =
                '<div class="lof-profile-chains-empty">Уровневые цепочки ещё не начаты.</div>';
        }

        chainsPane.appendChild(
            chainsList
        );

        /*
         * «Впереди» теперь начинается с двух коротких ориентиров:
         * ближайшие к открытию и самые редкие из ещё не полученных.
         * Ниже при этом остаётся полный список ВСЕХ неполученных
         * самостоятельных достижений, которые система уже показывает.
         */
        var aheadOverview =
            document.createElement(
                'section'
            );

        aheadOverview.className =
            'lof-profile-ahead-overview';

        aheadOverview.style.display =
            'none';

        function buildAheadMiniList(
            title,
            cards,
            mode
        ) {
            var block =
                document.createElement(
                    'div'
                );

            block.className =
                'lof-profile-ahead-block';

            var heading =
                document.createElement(
                    'div'
                );

            heading.className =
                'lof-profile-ahead-block-title';

            heading.textContent =
                title;

            block.appendChild(
                heading
            );

            var list =
                document.createElement(
                    'div'
                );

            list.className =
                'lof-profile-ahead-mini-list';

            if (!cards.length) {
                var empty =
                    document.createElement(
                        'div'
                    );

                empty.className =
                    'lof-profile-ahead-empty';

                empty.textContent =
                    mode === 'near'
                        ? 'Пока нет достижений, выполненных хотя бы на 80%.'
                        : 'Неполученных достижений в этой группе нет.';

                list.appendChild(
                    empty
                );
            }

            cards.forEach(function (card) {
                var button =
                    document.createElement(
                        'button'
                    );

                button.type =
                    'button';

                button.className =
                    'lof-profile-ahead-mini-card';

                button.setAttribute(
                    'data-rarity',
                    card.getAttribute('data-rarity') || 'common'
                );

                var percent =
                    Number(
                        card.getAttribute('data-lof-progress-percent') || 0
                    );

                var meta =
                    mode === 'near'
                        ? (
                            percent > 0
                                ? String(percent) + '% готово'
                                : 'Ближайшая цель'
                        )
                        : (
                            (
                                card.querySelector('.lof-profile-achievement-rarity') &&
                                card.querySelector('.lof-profile-achievement-rarity').textContent
                            ) ||
                            'Редкость'
                        );

                button.innerHTML =
                    '<strong>' +
                        escapeHtml(
                            card.getAttribute('data-lof-title') ||
                            'Достижение'
                        ) +
                    '</strong>' +
                    '<span>' +
                        escapeHtml(meta) +
                    '</span>' +
                    (
                        mode === 'near' &&
                        percent > 0
                            ? '<i><b style="width:' +
                                escapeHtml(String(percent)) +
                                '%"></b></i>'
                            : ''
                    );

                button.addEventListener(
                    'click',
                    function () {
                        card.click();
                    }
                );

                list.appendChild(
                    button
                );
            });

            block.appendChild(
                list
            );

            return block;
        }

        var nearestCards =
            unearnedCards.slice()
                .filter(function (card) {
                    return Number(
                        card.getAttribute('data-lof-progress-percent') || 0
                    ) >= 80;
                })
                .sort(function (a, b) {
                    return (
                        Number(
                            b.getAttribute('data-lof-progress-percent') || 0
                        ) -
                        Number(
                            a.getAttribute('data-lof-progress-percent') || 0
                        )
                    );
                })
                .slice(0, 4);

        var nearestCardIds = {};

        nearestCards.forEach(function (card) {
            nearestCardIds[
                String(
                    card.getAttribute('data-lof-achievement-id') || ''
                )
            ] = true;
        });

        var rareAheadCards =
            unearnedCards.slice()
                .filter(function (card) {
                    return !nearestCardIds[
                        String(
                            card.getAttribute('data-lof-achievement-id') || ''
                        )
                    ];
                })
                .sort(function (a, b) {
                    var rarityDifference =
                        Number(
                            b.getAttribute('data-lof-rarity-order') || 0
                        ) -
                        Number(
                            a.getAttribute('data-lof-rarity-order') || 0
                        );

                    if (rarityDifference) {
                        return rarityDifference;
                    }

                    return (
                        Number(
                            b.getAttribute('data-lof-points') || 0
                        ) -
                        Number(
                            a.getAttribute('data-lof-points') || 0
                        )
                    );
                })
                .slice(0, 4);

        aheadOverview.appendChild(
            buildAheadMiniList(
                'Особенно близко',
                nearestCards,
                'near'
            )
        );

        aheadOverview.appendChild(
            buildAheadMiniList(
                'Редчайшие впереди',
                rareAheadCards,
                'rare'
            )
        );

        var allAhead =
            document.createElement(
                'div'
            );

        allAhead.className =
            'lof-profile-ahead-all';

        allAhead.innerHTML =
            '<strong>Все неполученные</strong>' +
            '<span>' +
                escapeHtml(
                    String(
                        unearnedCards.length
                    )
                ) +
                ' целей — полный список расположен ниже.' +
            '</span>';

        aheadOverview.appendChild(
            allAhead
        );

        /*
         * RC11.9.7:
         * у каждой вкладки теперь есть единообразная внутренняя шапка:
         * название раздела, короткое пояснение и число элементов.
         * Сами кнопки фильтров при этом возвращены к исходной компактной
         * ширине — пользователь имел в виду одинаковое оформление
         * содержимого вкладок, а не одинаковую ширину навигации.
         */
        var filterContext =
            document.createElement(
                'div'
            );

        filterContext.className =
            'lof-profile-filter-context';

        filterContext.innerHTML =
            '<div class="lof-profile-filter-context-copy">' +
                '<div class="lof-profile-filter-context-kicker">РАЗДЕЛ ДОСТИЖЕНИЙ</div>' +
                '<div class="lof-profile-filter-context-title"></div>' +
                '<div class="lof-profile-filter-context-description"></div>' +
            '</div>' +
            '<div class="lof-profile-filter-context-count" aria-hidden="true"></div>';

        var filterContextTitle =
            filterContext.querySelector(
                '.lof-profile-filter-context-title'
            );

        var filterContextDescription =
            filterContext.querySelector(
                '.lof-profile-filter-context-description'
            );

        var filterContextCount =
            filterContext.querySelector(
                '.lof-profile-filter-context-count'
            );

        var filterContextMeta = {
            all: {
                title: 'Все достижения',
                description: 'Полный каталог: развивающееся достижение считается один раз — текущая ступень заменяет предыдущую и не создаёт отдельную награду.'
            },
            earned: {
                title: 'Полученные',
                description: 'Все достижения и ступени, которые уже засчитаны этому участнику.'
            },
            unearned: {
                title: 'Впереди',
                description: 'Все доступные неполученные достижения: сначала ориентиры, затем полный список целей.'
            },
            reading: {
                title: 'Чтение',
                description: 'Достижения за чтение статей и время, проведённое за изучением Летописи.'
            },
            editing: {
                title: 'Редактирование',
                description: 'Достижения за правки, исправления и развитие уже существующих материалов.'
            },
            creation: {
                title: 'Создание',
                description: 'Достижения за создание новых страниц и других материалов Летописи.'
            },
            activity: {
                title: 'Активность',
                description: 'Достижения за регулярность, серии действий, возвращения и общий ритм участия.'
            },
            communication: {
                title: 'Общение',
                description: 'Достижения за сообщения, ответы и другие публичные действия в Discussions.'
            },
            special: {
                title: 'Особые',
                description: 'Необычные, скрытые и специальные достижения с отдельными условиями.'
            },
            rarities: {
                title: 'Редкости',
                description: 'Три градации и все оформления редкостей. Нажмите на любую редкость, чтобы открыть её описание.'
            },
            chains: {
                title: 'Уровневые цепочки',
                description: 'Текущие многоступенчатые серии достижений и уже достигнутые в них ступени.'
            },
            xp: {
                title: 'Самые дорогие достижения',
                description: 'Полученные награды, отсортированные по количеству опыта: сначала самые ценные.'
            }
        };

        var filterDefinitions = [
            ['all', 'Все'],
            ['reading', 'Чтение'],
            ['editing', 'Редактирование'],
            ['creation', 'Создание'],
            ['activity', 'Активность'],
            ['communication', 'Общение'],
            ['special', 'Особые'],
            ['rarities', 'Редкости']
        ];

        /*
         * Поиск и маленькие уточняющие фильтры работают поверх выбранного
         * тематического раздела. «Полученные»/«Неполученные» больше не
         * занимают место в основной полосе вкладок: к ним ведут сводка
         * и быстрый центр коллекции.
         */
        var filterTools =
            document.createElement(
                'div'
            );

        filterTools.className =
            'lof-profile-filter-tools';

        var searchInput =
            document.createElement(
                'input'
            );

        searchInput.type =
            'search';

        searchInput.className =
            'lof-profile-filter-search';

        searchInput.placeholder =
            'Поиск по достижениям…';

        searchInput.setAttribute(
            'aria-label',
            'Поиск по достижениям'
        );

        var raritySelect =
            document.createElement(
                'select'
            );

        raritySelect.className =
            'lof-profile-filter-select';

        raritySelect.setAttribute(
            'aria-label',
            'Фильтр по редкости'
        );

        var allRaritiesOption =
            document.createElement(
                'option'
            );

        allRaritiesOption.value =
            '';

        allRaritiesOption.textContent =
            'Все редкости';

        raritySelect.appendChild(
            allRaritiesOption
        );

        Object.keys(
            catalog.rarities || {}
        )
            .map(function (key) {
                var data =
                    catalog.rarities[key] || {};

                return {
                    key: key,
                    title: String(data.title || key),
                    order: Number(data.order || 0)
                };
            })
            .sort(function (a, b) {
                return a.order - b.order;
            })
            .forEach(function (rarity) {
                var option =
                    document.createElement(
                        'option'
                    );

                option.value =
                    rarity.key;

                option.textContent =
                    rarity.title;

                raritySelect.appendChild(
                    option
                );
            });

        var featureSelect =
            document.createElement(
                'select'
            );

        featureSelect.className =
            'lof-profile-filter-select';

        featureSelect.setAttribute(
            'aria-label',
            'Дополнительный фильтр достижений'
        );

        [
            ['', 'Все типы'],
            ['progress', 'С прогрессом'],
            ['no-progress', 'Без прогресса'],
            ['chains', 'Только цепочки'],
            ['hidden', 'Скрытые и тайные']
        ].forEach(function (definition) {
            var option =
                document.createElement(
                    'option'
                );

            option.value =
                definition[0];

            option.textContent =
                definition[1];

            featureSelect.appendChild(
                option
            );
        });

        var clearTools =
            document.createElement(
                'button'
            );

        clearTools.type =
            'button';

        clearTools.className =
            'lof-profile-filter-clear';

        clearTools.textContent =
            'Сбросить';

        clearTools.hidden =
            true;

        filterTools.appendChild(
            searchInput
        );

        filterTools.appendChild(
            raritySelect
        );

        filterTools.appendChild(
            featureSelect
        );

        filterTools.appendChild(
            clearTools
        );

        var currentFilterKey =
            'all';

        function hasToolFilters() {
            return (
                String(searchInput.value || '').trim() !== '' ||
                raritySelect.value !== '' ||
                featureSelect.value !== ''
            );
        }

        function resetToolFilters() {
            searchInput.value = '';
            raritySelect.value = '';
            featureSelect.value = '';
        }

        function cardMatchesTools(card) {
            var query =
                String(
                    searchInput.value || ''
                )
                    .trim()
                    .toLocaleLowerCase('ru');

            if (
                query &&
                String(
                    card.textContent ||
                    card.getAttribute('data-lof-title') ||
                    ''
                )
                    .toLocaleLowerCase('ru')
                    .indexOf(query) === -1
            ) {
                return false;
            }

            if (
                raritySelect.value &&
                card.getAttribute('data-rarity') !== raritySelect.value
            ) {
                return false;
            }

            if (featureSelect.value === 'progress') {
                if (!card.classList.contains('has-progress')) {
                    return false;
                }
            } else if (featureSelect.value === 'no-progress') {
                if (!card.classList.contains('no-progress')) {
                    return false;
                }
            } else if (featureSelect.value === 'chains') {
                if (!card.getAttribute('data-lof-family')) {
                    return false;
                }
            } else if (featureSelect.value === 'hidden') {
                if (card.getAttribute('data-lof-hidden') !== '1') {
                    return false;
                }
            }

            return true;
        }

        function applyProfileFilter(
            filterKey
        ) {
            currentFilterKey =
                filterKey ||
                'all';

            filterKey =
                currentFilterKey;

            var rarityMode =
                filterKey ===
                    'rarities';

            var xpMode =
                filterKey ===
                    'xp';

            var chainsMode =
                filterKey ===
                    'chains';

            var aheadMode =
                filterKey ===
                    'unearned';

            section.style.display =
                rarityMode || xpMode || chainsMode
                    ? 'none'
                    : '';

            rarityPreviewPane.style.display =
                rarityMode
                    ? ''
                    : 'none';

            xpPane.style.display =
                xpMode
                    ? ''
                    : 'none';

            chainsPane.style.display =
                chainsMode
                    ? ''
                    : 'none';

            filterTools.style.display =
                rarityMode || xpMode || chainsMode
                    ? 'none'
                    : '';

            clearTools.hidden =
                !hasToolFilters();

            aheadOverview.style.display =
                aheadMode &&
                !hasToolFilters()
                    ? ''
                    : 'none';

            profileCards.forEach(function (card) {
                var cardEarned =
                    card.getAttribute(
                        'data-lof-earned'
                    ) !==
                        '0';

                var visible =
                    filterKey ===
                        'all' ||
                    (
                        filterKey ===
                            'earned' &&
                        cardEarned
                    ) ||
                    (
                        filterKey ===
                            'unearned' &&
                        !cardEarned
                    ) ||
                    (
                        filterKey ===
                            'chains' &&
                        !!card.getAttribute(
                            'data-lof-family'
                        )
                    ) ||
                    card.getAttribute(
                        'data-lof-category'
                    ) ===
                        filterKey;

                if (
                    visible &&
                    !rarityMode &&
                    !xpMode &&
                    !chainsMode
                ) {
                    visible =
                        cardMatchesTools(
                            card
                        );
                }

                card.style.display =
                    visible
                        ? ''
                        : 'none';
            });

            section.querySelectorAll(
                '.lof-profile-rarity-group'
            ).forEach(function (group) {
                var hasVisible =
                    Array.prototype.some.call(
                        group.querySelectorAll(
                            '.lof-profile-achievement'
                        ),
                        function (card) {
                            return (
                                card.style.display !==
                                'none'
                            );
                        }
                    );

                group.classList.toggle(
                    'is-filter-empty',
                    !hasVisible
                );
            });

            filterbar.querySelectorAll(
                '.lof-profile-achievements-filter'
            ).forEach(function (button) {
                button.classList.toggle(
                    'is-active',
                    button.getAttribute(
                        'data-filter'
                    ) ===
                        filterKey
                );
            });

            var contextMeta =
                filterContextMeta[filterKey] ||
                filterContextMeta.all;

            var visibleCardCount =
                rarityMode
                    ? Object.keys(
                        catalog.rarities || {}
                    ).length
                    : (
                        xpMode
                            ? xpCards.length
                            : (
                                chainsMode
                                    ? currentChainCards.length
                                    : profileCards.filter(
                                        function (card) {
                                            return card.style.display !== 'none';
                                        }
                                    ).length
                            )
                    );

            if (filterContextTitle) {
                filterContextTitle.textContent =
                    contextMeta.title;
            }

            if (filterContextDescription) {
                filterContextDescription.textContent =
                    contextMeta.description;
            }

            if (filterContextCount) {
                filterContextCount.textContent =
                    rarityMode
                        ? String(visibleCardCount) + ' редкостей'
                        : (
                            xpMode
                                ? 'ТОП ' + String(visibleCardCount)
                                : (
                                    chainsMode
                                        ? String(visibleCardCount) + ' цепочек'
                                        : String(visibleCardCount) +
                                            (
                                                visibleCardCount === 1
                                                    ? ' запись'
                                                    : ' записей'
                                            )
                                )
                        );
            }

            filterContext.setAttribute(
                'data-filter',
                filterKey
            );

            stats.querySelectorAll(
                '.lof-profile-dialog-stat[data-lof-stat-action]'
            ).forEach(function (statButton) {
                statButton.classList.toggle(
                    'is-active',
                    statButton.getAttribute(
                        'data-lof-stat-action'
                    ) ===
                        filterKey
                );
            });
        }

        searchInput.addEventListener(
            'input',
            function () {
                applyProfileFilter(
                    currentFilterKey
                );
            }
        );

        raritySelect.addEventListener(
            'change',
            function () {
                applyProfileFilter(
                    currentFilterKey
                );
            }
        );

        featureSelect.addEventListener(
            'change',
            function () {
                applyProfileFilter(
                    currentFilterKey
                );
            }
        );

        clearTools.addEventListener(
            'click',
            function () {
                resetToolFilters();

                applyProfileFilter(
                    currentFilterKey
                );
            }
        );

        filterDefinitions.forEach(
            function (definition) {
                var filterButton =
                    document.createElement(
                        'button'
                    );

                filterButton.type =
                    'button';

                filterButton.className =
                    'lof-profile-achievements-filter' +
                    (
                        definition[0] ===
                            'all'
                            ? ' is-active'
                            : ''
                    );

                filterButton.setAttribute(
                    'data-filter',
                    definition[0]
                );

                filterButton.textContent =
                    definition[1];

                filterButton.addEventListener(
                    'click',
                    function () {
                        applyProfileFilter(
                            definition[0]
                        );
                    }
                );

                filterbar.appendChild(
                    filterButton
                );
            }
        );

        applyProfileFilter(
            initialFilter ||
            'all'
        );

        body.appendChild(
            stats
        );

        body.appendChild(
            filterbar
        );

        body.appendChild(
            filterTools
        );

        body.appendChild(
            filterContext
        );

        body.appendChild(
            aheadOverview
        );

        body.appendChild(
            xpPane
        );

        body.appendChild(
            chainsPane
        );

        var inlineDetails = document.createElement('section');
        inlineDetails.id = 'lof-profile-achievement-inline-details';
        inlineDetails.className = 'lof-achievements-inline-details lof-profile-dialog-inline-details';
        inlineDetails.hidden = true;
        inlineDetails.setAttribute('aria-live', 'polite');
        body.appendChild(inlineDetails);

        body.appendChild(
            section
        );

        body.appendChild(
            rarityPreviewPane
        );

        dialog.appendChild(
            head
        );

        dialog.appendChild(
            body
        );

        overlay.appendChild(
            dialog
        );

        overlay.addEventListener(
            'mousedown',
            function (event) {
                if (
                    event.target ===
                    overlay
                ) {
                    removeProfileAchievementsOverlay();
                }
            }
        );

        document.body.appendChild(
            overlay
        );

        document.body.classList.add(
            'lof-profile-achievements-dialog-open'
        );

        applyAchievementPrevalenceToRoot(
            catalog,
            section
        );

        /*
         * Если окно открыли кликом по конкретной иконке в rail,
         * прокручиваем полный список прямо к этой карточке и
         * визуально выделяем её.
         */
        section.querySelectorAll(
            '.lof-profile-achievement.is-selected-from-rail'
        ).forEach(function (card) {
            card.classList.remove(
                'is-selected-from-rail'
            );
        });

        if (targetAchievementId) {
            var targetCard =
                null;

            section.querySelectorAll(
                '.lof-profile-achievement[data-lof-achievement-id]'
            ).forEach(function (card) {
                if (
                    !targetCard &&
                    card.getAttribute(
                        'data-lof-achievement-id'
                    ) ===
                        String(
                            targetAchievementId
                        )
                ) {
                    targetCard =
                        card;
                }
            });

            if (targetCard) {
                targetCard.classList.add(
                    'is-selected-from-rail'
                );

                requestAnimationFrame(
                    function () {
                        requestAnimationFrame(
                            function () {
                                targetCard.scrollIntoView({
                                    behavior:
                                        'smooth',

                                    block:
                                        'center',

                                    inline:
                                        'nearest'
                                });
                            }
                        );
                    }
                );
            }
        }

        close.focus();
    }


    function mountProfileAchievementsRail(
        catalog,
        root,
        username,
        profileUserId,
        scoreInfo,
        groupList,
        visibleCount,
        fullSection,
        rankBanner,
        viewerAchievementMap
    ) {
        removeProfileAchievementsLoading();
        removeProfileAchievementsRail();

        var entries = [];

        groupList.forEach(
            function (group) {
                group.items.forEach(
                    function (entry) {
                        entries.push({
                            id:
                                entry.id,

                            achievement:
                                entry.achievement,

                            earnedAt:
                                entry.earnedAt,

                            rarity:
                                getRarityInfo(
                                    catalog,
                                    entry.achievement
                                ),

                            category:
                                entry.category,

                            progressInfo:
                                entry.progressInfo,

                            isNew:
                                entry.isNew ===
                                    true
                        });
                    }
                );
            }
        );

        /*
         * RC11.5: изображения больше не прогреваются для всей коллекции сразу.
         * Загружаются только реально отрисованные карточки/витрина — это заметно
         * уменьшает число imageinfo-запросов на больших профилях.
         */


        /*
         * TEST 1.12.3:
         * Коллекция в профиле является хронологической лентой.
         * Сначала показываются достижения, полученные последними,
         * а не достижения более высокой редкости. Витрина TOP-5
         * ниже по-прежнему отдельно сортирует копию массива по
         * редкости и поэтому не зависит от этого порядка.
         */
        entries.sort(function (a, b) {
            var earnedDifference =
                Number(
                    b.earnedAt || 0
                ) -
                Number(
                    a.earnedAt || 0
                );

            if (earnedDifference) {
                return earnedDifference;
            }

            return String(
                a.id || ''
            ).localeCompare(
                String(
                    b.id || ''
                ),
                'ru'
            );
        });

        var module =
            document.createElement(
                'section'
            );

        module.id =
            'lof-profile-achievements-rail';

        module.className =
            'lof-profile-rail-module lof-profile-achievements-main';

        var head =
            document.createElement(
                'div'
            );

        head.className =
            'lof-profile-rail-head';

        var headText =
            document.createElement(
                'div'
            );

        headText.innerHTML =
            '<div class="lof-profile-rail-kicker">' +
                'Летопись Лофариана' +
            '</div>' +
            '<div class="lof-profile-rail-title-row">' +
                '<h2 class="lof-profile-rail-title"><a class="lof-achievements-heading-link" href="' + escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) + '">Достижения</a></h2>' +
            '</div>' +
            '<div class="lof-profile-rail-summary">' +
                escapeHtml(
                    String(
                        visibleCount
                    )
                ) +
                ' получено · ' +
                escapeHtml(
                    formatPoints(
                        scoreInfo.score
                    )
                ) +
                ' опыта' +
            '</div>';

        var hall =
            document.createElement(
                'a'
            );

        hall.className =
            'lof-profile-rail-hall-link';

        hall.href =
            mw.util.getUrl(
                HALL_PAGE
            );

        hall.setAttribute(
            'aria-label',
            'Зал славы'
        );

        hall.setAttribute(
            'title',
            'Зал славы'
        );

        hall.innerHTML =
            '<span class="lof-profile-rail-hall-diamond" aria-hidden="true">◆</span>';

        var detailsLink =
            document.createElement(
                'a'
            );

        detailsLink.className =
            'lof-profile-rail-details-link';

        detailsLink.href =
            mw.util.getUrl(
                ACHIEVEMENTS_PAGE
            );

        detailsLink.textContent =
            'Подробнее →';

        detailsLink.setAttribute(
            'aria-label',
            'Подробнее о системе достижений'
        );

        var headActions =
            document.createElement(
                'div'
            );

        headActions.className =
            'lof-profile-rail-head-actions';

        var titleRow =
            headText.querySelector(
                '.lof-profile-rail-title-row'
            );

        if (titleRow) {
            titleRow.appendChild(
                detailsLink
            );
        }

        headActions.appendChild(
            hall
        );

        head.appendChild(
            headText
        );

        head.appendChild(
            headActions
        );

        module.appendChild(
            head
        );

        if (rankBanner) {
            rankBanner.className =
                'lof-profile-rail-rank';

            module.appendChild(
                rankBanner
            );
        }

        /*
         * RC11.9.8 — верхняя сводка коллекции. Место по опыту уже
         * показывает rankBanner выше; здесь дополняем его общей ёмкостью
         * системы, процентом коллекции, высшей редкостью и цепочками C.
         */
        var logicalCounts =
            getLogicalRarityAchievementCounts(
                catalog
            ) || {};

        var totalLogicalAchievements =
            Math.max(
                0,
                Number(
                    logicalCounts.total || 0
                )
            );

        var collectionPercent =
            totalLogicalAchievements > 0
                ? Math.min(
                    100,
                    Math.round(
                        Number(visibleCount || 0) /
                        totalLogicalAchievements *
                        100
                    )
                )
                : 0;

        var highestRarityEntry =
            entries.slice()
                .sort(function (a, b) {
                    return (
                        Number(b.rarity && b.rarity.order || 0) -
                        Number(a.rarity && a.rarity.order || 0)
                    );
                })[0] ||
                null;

        var completedChainFamilies = {};

        entries.forEach(function (entry) {
            if (
                entry.achievement &&
                entry.achievement.family &&
                Number(entry.achievement.tier || 0) === 100
            ) {
                completedChainFamilies[
                    String(entry.achievement.family)
                ] = true;
            }
        });

        var profileStepAchievementMap = {};

        entries.forEach(function (entry) {
            if (entry && entry.id) {
                profileStepAchievementMap[String(entry.id)] =
                    Number(entry.earnedAt || 0) || 1;
            }
        });

        var profileStepStats =
            getAchievementStepStats(
                catalog,
                profileStepAchievementMap
            ) || {
                total: 0,
                earned: 0,
                percent: 0
            };

        var summaryStrip =
            document.createElement(
                'div'
            );

        summaryStrip.className =
            'lof-profile-rail-summary-strip';

        [
            [
                'В системе',
                totalLogicalAchievements
                    ? String(totalLogicalAchievements)
                    : '—'
            ],
            [
                'Собрано',
                String(visibleCount) +
                    (
                        totalLogicalAchievements
                            ? '/' + String(totalLogicalAchievements)
                            : ''
                    ) +
                    ' · ' +
                    String(collectionPercent) +
                    '%'
            ],
            [
                'Высшая редкость',
                highestRarityEntry
                    ? highestRarityEntry.rarity.title
                    : '—'
            ],
            [
                'Цепочек C',
                String(
                    Object.keys(
                        completedChainFamilies
                    ).length
                )
            ]
        ].forEach(function (item) {
            var stat =
                document.createElement(
                    'div'
                );

            stat.className =
                'lof-profile-rail-summary-stat';

            stat.innerHTML =
                '<span>' +
                    escapeHtml(item[0]) +
                '</span>' +
                '<strong>' +
                    escapeHtml(String(item[1])) +
                '</strong>';

            summaryStrip.appendChild(
                stat
            );
        });

        module.appendChild(
            summaryStrip
        );

        /*
         * RC11.9.23: отдельный счётчик всех реально пройденных рубежей.
         * Он НЕ заменяет 110 логических достижений: это параллельная
         * статистика, в которой каждая ступень I–C считается отдельно.
         */
        var stepJourney = document.createElement('div');
        stepJourney.className = 'lof-profile-rail-step-journey';
        stepJourney.title =
            'Основная коллекция содержит ' +
            String(totalLogicalAchievements || 0) +
            ' развивающихся достижений и серий. Здесь каждая достигнутая ступень считается отдельно.';

        var stepPercent = Math.max(
            0,
            Math.min(
                100,
                Math.round(Number(profileStepStats.percent || 0) * 10) / 10
            )
        );

        stepJourney.innerHTML =
            '<div class="lof-profile-rail-step-copy">' +
                '<span>Рубежи Летописи</span>' +
                '<strong>' +
                    escapeHtml(formatCatalogInteger(profileStepStats.earned || 0)) +
                    ' / ' +
                    escapeHtml(formatCatalogInteger(profileStepStats.total || 0)) +
                '</strong>' +
                '<small>Каждая достигнутая ступень считается отдельно · ' +
                    escapeHtml(String(stepPercent).replace('.', ',')) +
                    '%</small>' +
            '</div>' +
            '<div class="lof-profile-rail-step-track" aria-hidden="true">' +
                '<span style="width:' + escapeHtml(String(stepPercent)) + '%"></span>' +
            '</div>';

        module.appendChild(stepJourney);

        /*
         * Быстрый центр управления коллекцией: основные переходы теперь
         * находятся в одном месте, а не разбросаны по интерфейсу.
         */
        var collectionHub =
            document.createElement(
                'nav'
            );

        collectionHub.className =
            'lof-profile-rail-hub';

        collectionHub.setAttribute(
            'aria-label',
            'Управление коллекцией достижений'
        );

        function appendHubFilterButton(
            label,
            filterKey
        ) {
            var button =
                document.createElement(
                    'button'
                );

            button.type =
                'button';

            button.className =
                'lof-profile-rail-hub-button';

            button.textContent =
                label;

            button.addEventListener(
                'click',
                function () {
                    openProfileAchievementsDialog(
                        catalog,
                        username,
                        scoreInfo,
                        visibleCount,
                        fullSection,
                        null,
                        filterKey
                    );
                }
            );

            collectionHub.appendChild(
                button
            );
        }

        var hubDetails =
            document.createElement(
                'a'
            );

        hubDetails.className =
            'lof-profile-rail-hub-button';

        hubDetails.href =
            mw.util.getUrl(
                ACHIEVEMENTS_PAGE
            );

        hubDetails.textContent =
            'Подробнее';

        collectionHub.appendChild(
            hubDetails
        );

        appendHubFilterButton(
            'Очки опыта',
            'xp'
        );

        appendHubFilterButton(
            'Цепочки',
            'chains'
        );

        appendHubFilterButton(
            'Полученные',
            'earned'
        );

        appendHubFilterButton(
            'Впереди',
            'unearned'
        );

        var hubHall =
            document.createElement(
                'a'
            );

        hubHall.className =
            'lof-profile-rail-hub-button';

        hubHall.href =
            mw.util.getUrl(
                HALL_PAGE
            );

        hubHall.textContent =
            'Зал славы';

        collectionHub.appendChild(
            hubHall
        );

        module.appendChild(
            collectionHub
        );

        /*
         * Единый информационный блок для ВСЕХ значков:
         * и редчайших, и основной коллекции.
         */
        var inspector =
            document.createElement(
                'div'
            );

        inspector.className =
            'lof-profile-rail-inspector';

        inspector.innerHTML =
            '<div class="lof-profile-rail-inspector-title">' +
                'Наведите на достижение' +
            '</div>' +
            '<div class="lof-profile-rail-inspector-meta">' +
                'Название, редкость, дата и прогресс появятся здесь.' +
            '</div>';

        function showEntryInInspector(entry, date) {
            if (!entry) {
                inspector.removeAttribute('data-rarity');
                return;
            }

            inspector.setAttribute('data-rarity', String(entry.rarity && entry.rarity.key || 'common'));

            var canRevealHiddenCondition =
                !(
                    entry.achievement &&
                    (
                        entry.achievement.hidden === true ||
                        entry.achievement.secret === true
                    )
                ) ||
                viewerKnowsHiddenAchievement(
                    viewerAchievementMap,
                    entry.id
                );

            var progressHtml =
                '';

            if (
                entry.progressInfo &&
                canRevealHiddenCondition
            ) {
                var readableProgressText =
                    String(
                        entry.progressInfo.text || ''
                    ).replace(
                        /\s*·\s*[0-9]+%\s*$/,
                        ''
                    );

                progressHtml =
                    '<div class="lof-profile-rail-inspector-progress">' +
                        '<div class="lof-profile-rail-inspector-progress-head">' +
                            '<span>' +
                                escapeHtml(
                                    readableProgressText
                                ) +
                            '</span>' +
                            (
                                entry.progressInfo.percent !== null &&
                                entry.progressInfo.hidePercentLabel !== true
                                    ? '<strong>' +
                                        escapeHtml(
                                            String(
                                                entry.progressInfo.percent
                                            )
                                        ) +
                                        '%</strong>'
                                    : ''
                            ) +
                        '</div>' +
                        (
                            entry.progressInfo.percent !==
                                null
                                ? '<div class="lof-profile-rail-inspector-bar">' +
                                    '<span style="width:' +
                                        escapeHtml(
                                            String(
                                                entry.progressInfo.percent
                                            )
                                        ) +
                                        '%"></span>' +
                                  '</div>'
                                : ''
                        ) +
                    '</div>';
            }

            var tierLabel =
                getAchievementTierLabel(
                    entry.achievement
                );

            inspector.innerHTML =
                '<div class="lof-profile-rail-inspector-title-row">' +
                    '<div class="lof-profile-rail-inspector-title">' +
                        escapeHtml(
                            getAchievementBaseTitle(
                                entry.achievement
                            )
                        ) +
                    '</div>' +
                    (
                        tierLabel
                            ? '<span class="lof-profile-rail-inspector-tier">' +
                                escapeHtml(
                                    tierLabel
                                ) +
                              '</span>'
                            : ''
                    ) +
                '</div>' +
                '<div class="lof-profile-rail-inspector-meta lof-profile-rail-inspector-meta-primary">' +
                    '<span class="lof-profile-rail-inspector-rarity lof-rarity-' +
                        escapeHtml(
                            entry.rarity.key
                        ) +
                    '">' +
                        '<i aria-hidden="true"></i>' +
                        '<span class="lof-profile-rail-inspector-rarity-title">' +
                            escapeHtml(
                                entry.rarity.title
                            ) +
                        '</span>' +
                    '</span>' +
                    '<span class="lof-profile-rail-inspector-grade">' +
                        escapeHtml(
                            (
                                entry.rarity.grade === 1
                                    ? 'I'
                                    : (
                                        entry.rarity.grade === 2
                                            ? 'II'
                                            : 'III'
                                    )
                            ) +
                            ' градация'
                        ) +
                    '</span>' +
                    (
                        entry.achievement.secret === true ||
                        entry.achievement.hidden === true
                            ? '<span class="lof-profile-rail-inspector-secret">Скрытое</span>'
                            : ''
                    ) +
                    '<span class="lof-profile-rail-inspector-points">' +
                        escapeHtml(
                            formatPoints(
                                getAchievementPoints(
                                    entry.achievement
                                )
                            )
                        ) +
                    '</span>' +
                '</div>' +
                '<div class="lof-profile-rail-inspector-meta lof-profile-rail-inspector-meta-secondary">' +
                    '<span class="lof-profile-rail-inspector-category">' +
                        'Раздел: ' +
                        escapeHtml(
                            getAchievementCategoryTitle(
                                entry.category
                            )
                        ) +
                    '</span>' +
                    '<span class="lof-profile-rail-inspector-date">' +
                        'Получено: ' +
                        escapeHtml(
                            date || 'дата не зафиксирована'
                        ) +
                    '</span>' +
                '</div>' +
                '<div class="lof-profile-rail-inspector-prevalence" ' +
                    'data-lof-prevalence-id="' +
                    escapeHtml(
                        entry.id
                    ) +
                    '" ' +
                    'data-lof-prevalence-mode="detailed">' +
                    'Получили: считаем…' +
                '</div>' +
                progressHtml;

            var inspectorRarityTitle = inspector.querySelector('.lof-profile-rail-inspector-rarity-title');
            if (inspectorRarityTitle) {
                setRarityLabel(inspectorRarityTitle, entry.rarity.title, entry.rarity.key);
            }

            /*
             * Один и тот же prevalence-механизм используется
             * для обычных значков и витрины. В inspector выводим
             * не только процент, но и абсолютное число участников.
             */
            applyAchievementPrevalenceToRoot(
                catalog,
                inspector
            );
        }

        function dismissNewEntryMark(
            entry,
            node
        ) {
            if (
                !entry ||
                entry.isNew !== true
            ) {
                return;
            }

            markProfileAchievementViewed(
                profileUserId,
                entry.id,
                entry.earnedAt
            );

            entry.isNew =
                false;

            if (node) {
                node.classList.remove(
                    'is-new-achievement'
                );

                node.querySelectorAll(
                    '.lof-profile-rail-new-mark, ' +
                    '.lof-profile-achievement-new-mark'
                ).forEach(function (mark) {
                    mark.remove();
                });
            }
        }

        /*
         * RC11.9.10: отдельное компактное окно для TOP-5.
         * Оно появляется только по нажатию на карточку редчайшего
         * достижения, не требует полноэкранного overlay и не меняет
         * положение/прокрутку профиля.
         */
        var featuredPopoverOutsideHandler = null;
        var featuredPopoverKeyHandler = null;
        var featuredPopoverViewportHandler = null;

        function closeFeaturedPopover() {
            var oldPopover = document.getElementById(
                'lof-profile-featured-popover'
            );

            if (oldPopover && oldPopover.parentNode) {
                oldPopover.parentNode.removeChild(oldPopover);
            }

            if (featuredPopoverOutsideHandler) {
                document.removeEventListener(
                    'mousedown',
                    featuredPopoverOutsideHandler,
                    true
                );
                featuredPopoverOutsideHandler = null;
            }

            if (featuredPopoverKeyHandler) {
                document.removeEventListener(
                    'keydown',
                    featuredPopoverKeyHandler,
                    true
                );
                featuredPopoverKeyHandler = null;
            }

            if (featuredPopoverViewportHandler) {
                window.removeEventListener(
                    'resize',
                    featuredPopoverViewportHandler
                );
                window.removeEventListener(
                    'scroll',
                    featuredPopoverViewportHandler,
                    true
                );
                featuredPopoverViewportHandler = null;
            }

            document.querySelectorAll(
                '.lof-profile-rail-featured.is-popover-open'
            ).forEach(function (node) {
                node.classList.remove('is-popover-open');
                node.setAttribute('aria-expanded', 'false');
            });
        }

        function positionFeaturedPopover(popover, anchor) {
            if (!popover || !anchor || !anchor.getBoundingClientRect) {
                return;
            }

            var anchorRect = anchor.getBoundingClientRect();
            var viewportWidth = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );
            var viewportHeight = Math.max(
                document.documentElement.clientHeight || 0,
                window.innerHeight || 0
            );
            var gap = 10;
            var edge = 10;
            var width = Math.min(318, Math.max(250, viewportWidth - 20));

            popover.style.width = width + 'px';
            popover.style.left = edge + 'px';
            popover.style.top = edge + 'px';

            var measuredHeight = Math.max(
                150,
                popover.offsetHeight || 0
            );
            var left = anchorRect.right + gap;

            if (left + width > viewportWidth - edge) {
                left = anchorRect.left - width - gap;
            }

            if (left < edge) {
                left = Math.min(
                    Math.max(edge, anchorRect.left),
                    Math.max(edge, viewportWidth - width - edge)
                );
            }

            var top = anchorRect.top +
                Math.min(8, Math.max(0, anchorRect.height * 0.12));

            if (top + measuredHeight > viewportHeight - edge) {
                top = Math.max(
                    edge,
                    viewportHeight - measuredHeight - edge
                );
            }

            popover.style.left = Math.round(left) + 'px';
            popover.style.top = Math.round(top) + 'px';

            var opensLeft = left < anchorRect.left;
            popover.classList.toggle('opens-left', opensLeft);
            popover.classList.toggle('opens-right', !opensLeft);
        }

        function openFeaturedPopover(entry, anchor, date) {
            if (!entry || !anchor) {
                return;
            }

            var existing = document.getElementById(
                'lof-profile-featured-popover'
            );
            var existingId = existing
                ? existing.getAttribute('data-achievement-id')
                : '';

            if (existing && existingId === String(entry.id || '')) {
                closeFeaturedPopover();
                return;
            }

            closeFeaturedPopover();

            var achievement = entry.achievement || {};
            var tierLabel = getAchievementTierLabel(achievement);
            var description = achievement.secret === true
                ? 'Условие засекречено.'
                : (
                    achievement.hidden === true
                        ? getHiddenUnlockedDescription(
                            entry.id,
                            achievement.description
                        )
                        : achievement.description
                );

            var popover = document.createElement('section');
            popover.id = 'lof-profile-featured-popover';
            popover.className = 'lof-profile-featured-popover';
            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-modal', 'false');
            popover.setAttribute(
                'aria-label',
                'Сведения о достижении «' +
                    getAchievementBaseTitle(achievement) + '»'
            );
            popover.setAttribute(
                'data-achievement-id',
                String(entry.id || '')
            );
            popover.setAttribute(
                'data-rarity',
                String(entry.rarity && entry.rarity.key || 'common')
            );

            var closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'lof-profile-featured-popover-close';
            closeButton.setAttribute('aria-label', 'Закрыть');
            closeButton.textContent = '×';
            closeButton.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeFeaturedPopover();
                anchor.focus();
            });

            var title = document.createElement('div');
            title.className = 'lof-profile-featured-popover-title';
            title.textContent =
                getAchievementBaseTitle(achievement) +
                (tierLabel ? ' ' + tierLabel : '');

            var meta = document.createElement('div');
            meta.className = 'lof-profile-featured-popover-meta';

            var rarity = document.createElement('span');
            rarity.className =
                'lof-profile-featured-popover-rarity lof-rarity-' +
                String(entry.rarity && entry.rarity.key || 'common');
            rarity.textContent = String(
                entry.rarity && entry.rarity.title || 'Обычная'
            );
            setRarityLabel(
                rarity,
                rarity.textContent,
                String(entry.rarity && entry.rarity.key || 'common')
            );
            meta.appendChild(rarity);

            var points = document.createElement('span');
            points.className = 'lof-profile-featured-popover-points';
            points.textContent = formatPoints(
                getAchievementPoints(achievement)
            );
            meta.appendChild(points);

            if (achievement.hidden === true || achievement.secret === true) {
                var secret = document.createElement('span');
                secret.className = 'lof-profile-featured-popover-secret';
                secret.textContent = 'Скрытое';
                meta.appendChild(secret);
            }

            var facts = document.createElement('div');
            facts.className = 'lof-profile-featured-popover-facts';
            facts.innerHTML =
                '<span>Получено: ' +
                    escapeHtml(date || 'дата не зафиксирована') +
                '</span>' +
                '<span class="lof-profile-featured-popover-prevalence" ' +
                    'data-lof-prevalence-id="' +
                    escapeHtml(entry.id) +
                    '" data-lof-prevalence-mode="detailed">' +
                    'Получили: считаем…' +
                '</span>';

            var condition = document.createElement('div');
            condition.className = 'lof-profile-featured-popover-condition';
            condition.innerHTML =
                '<strong>Условие</strong>' +
                '<span>' +
                    escapeHtml(String(description || 'Описание отсутствует.')) +
                '</span>';

            var detailsButton = document.createElement('button');
            detailsButton.type = 'button';
            detailsButton.className = 'lof-profile-featured-popover-more';
            detailsButton.textContent = 'Подробнее';
            detailsButton.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeFeaturedPopover();
                openAchievementDetailsModal(
                    catalog,
                    achievement,
                    {
                        title:
                            getAchievementBaseTitle(achievement) +
                            (tierLabel ? ' ' + tierLabel : ''),
                        description: description,
                        rarityTitle: entry.rarity.title,
                        rarityKey: entry.rarity.key,
                        categoryTitle:
                            getAchievementCategoryTitle(entry.category),
                        statusText: 'Получено',
                        tierText: tierLabel
                            ? 'Ступень: ' + tierLabel
                            : '',
                        earnedText:
                            'Получено: ' +
                            (date || 'дата не зафиксирована'),
                        compact: true
                    }
                );
            });

            popover.appendChild(closeButton);
            popover.appendChild(title);
            popover.appendChild(meta);
            popover.appendChild(facts);
            popover.appendChild(condition);
            popover.appendChild(detailsButton);
            document.body.appendChild(popover);

            anchor.classList.add('is-popover-open');
            anchor.setAttribute('aria-expanded', 'true');

            applyAchievementPrevalenceToRoot(catalog, popover);
            positionFeaturedPopover(popover, anchor);

            featuredPopoverOutsideHandler = function (event) {
                if (
                    popover.contains(event.target) ||
                    anchor.contains(event.target)
                ) {
                    return;
                }
                closeFeaturedPopover();
            };

            featuredPopoverKeyHandler = function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeFeaturedPopover();
                    anchor.focus();
                }
            };

            featuredPopoverViewportHandler = function () {
                positionFeaturedPopover(popover, anchor);
            };

            document.addEventListener(
                'mousedown',
                featuredPopoverOutsideHandler,
                true
            );
            document.addEventListener(
                'keydown',
                featuredPopoverKeyHandler,
                true
            );
            window.addEventListener(
                'resize',
                featuredPopoverViewportHandler
            );
            window.addEventListener(
                'scroll',
                featuredPopoverViewportHandler,
                true
            );
        }

        if (entries.length) {
            var featuredEntries =
                entries.slice()
                    .sort(function (a, b) {
                        if (b.rarity.order !== a.rarity.order) {
                            return b.rarity.order - a.rarity.order;
                        }

                        var pointsDiff =
                            getAchievementPoints(b.achievement) -
                            getAchievementPoints(a.achievement);

                        if (pointsDiff) {
                            return pointsDiff;
                        }

                        return (
                            Number(b.achievement.tier || 0) -
                            Number(a.achievement.tier || 0)
                        );
                    })
                    .slice(0, Math.min(5, entries.length));

            if (featuredEntries.length) {
                var featuredSection =
                    document.createElement('div');

                featuredSection.className =
                    'lof-profile-rail-featured-section';

                var featuredHeading =
                    document.createElement('div');

                featuredHeading.className =
                    'lof-profile-rail-featured-heading';

                featuredHeading.innerHTML =
                    '<span>Редчайшие достижения</span>' +
                    '<small>ТОП 5 коллекции</small>';

                featuredSection.appendChild(
                    featuredHeading
                );

                /*
                 * RC11.9.8: сводка «что выделяется в коллекции» встроена
                 * прямо в уже существующий блок редчайших достижений.
                 */
                var mostExpensiveEntry =
                    entries.slice()
                        .sort(function (a, b) {
                            var pointsDifference =
                                getAchievementPoints(b.achievement) -
                                getAchievementPoints(a.achievement);

                            if (pointsDifference) {
                                return pointsDifference;
                            }

                            return (
                                Number(b.rarity && b.rarity.order || 0) -
                                Number(a.rarity && a.rarity.order || 0)
                            );
                        })[0] ||
                        null;

                var bestChainEntry =
                    entries.filter(function (entry) {
                        return !!(
                            entry.achievement &&
                            entry.achievement.family
                        );
                    })
                        .sort(function (a, b) {
                            return (
                                Number(b.achievement.tier || 0) -
                                Number(a.achievement.tier || 0)
                            );
                        })[0] ||
                        null;

                var representedRarities = {};

                entries.forEach(function (entry) {
                    if (entry.rarity && entry.rarity.key) {
                        representedRarities[
                            String(entry.rarity.key)
                        ] = true;
                    }
                });

                var featuredInsights =
                    document.createElement(
                        'div'
                    );

                featuredInsights.className =
                    'lof-profile-rail-featured-insights';

                function appendFeaturedInsight(
                    label,
                    value,
                    entry,
                    action
                ) {
                    var insight =
                        document.createElement(
                            entry || action
                                ? 'button'
                                : 'div'
                        );

                    if (entry || action) {
                        insight.type =
                            'button';
                    }

                    insight.className =
                        'lof-profile-rail-featured-insight' +
                        (
                            entry || action
                                ? ' is-clickable'
                                : ''
                        );

                    insight.innerHTML =
                        '<span>' +
                            escapeHtml(label) +
                        '</span>' +
                        '<strong>' +
                            escapeHtml(value) +
                        '</strong>';

                    if (entry) {
                        insight.setAttribute(
                            'data-rarity',
                            entry.rarity && entry.rarity.key || 'common'
                        );

                        insight.addEventListener(
                            'click',
                            function () {
                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    entry.id
                                );
                            }
                        );
                    } else if (action === 'rarities') {
                        insight.addEventListener(
                            'click',
                            function () {
                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    null,
                                    'rarities'
                                );
                            }
                        );
                    }

                    featuredInsights.appendChild(
                        insight
                    );
                }

                appendFeaturedInsight(
                    'Самое редкое',
                    featuredEntries[0]
                        ? getAchievementBaseTitle(
                            featuredEntries[0].achievement
                        ) +
                        ' · ' +
                        featuredEntries[0].rarity.title
                        : '—',
                    featuredEntries[0] || null
                );

                appendFeaturedInsight(
                    'Самая дорогая',
                    mostExpensiveEntry
                        ? '+' + formatPoints(
                            getAchievementPoints(
                                mostExpensiveEntry.achievement
                            )
                        ) + ' · ' + getAchievementBaseTitle(
                            mostExpensiveEntry.achievement
                        )
                        : '—',
                    mostExpensiveEntry
                );

                appendFeaturedInsight(
                    'Лучшая цепочка',
                    bestChainEntry
                        ? getAchievementBaseTitle(
                            bestChainEntry.achievement
                        ) +
                        (
                            getAchievementTierLabel(
                                bestChainEntry.achievement
                            )
                                ? ' ' + getAchievementTierLabel(
                                    bestChainEntry.achievement
                                )
                                : ''
                        )
                        : '—',
                    bestChainEntry
                );

                appendFeaturedInsight(
                    'Редкостей собрано',
                    String(
                        Object.keys(
                            representedRarities
                        ).length
                    ) +
                    '/' +
                    String(
                        Object.keys(
                            catalog.rarities || {}
                        ).length
                    ),
                    null,
                    'rarities'
                );

                featuredSection.appendChild(
                    featuredInsights
                );

                var featuredList =
                    document.createElement('div');

                featuredList.className =
                    'lof-profile-rail-featured-list';

                featuredEntries.forEach(
                    function (featuredEntry, featuredIndex) {
                        var featured =
                            document.createElement('button');

                        featured.type = 'button';
                        featured.className =
                            'lof-profile-rail-featured' +
                            (
                                featuredIndex === 0
                                    ? ' is-primary'
                                    : ''
                            );

                        featured.setAttribute(
                            'data-rarity',
                            featuredEntry.rarity.key
                        );

                        featured.setAttribute(
                            'data-lof-achievement-id',
                            featuredEntry.id
                        );

                        featured.setAttribute(
                            'aria-haspopup',
                            'dialog'
                        );
                        featured.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                        var number =
                            document.createElement('span');

                        number.className =
                            'lof-profile-rail-featured-number';

                        number.textContent =
                            (
                                ['I', 'II', 'III', 'IV', 'V'][
                                    featuredIndex
                                ] ||
                                String(featuredIndex + 1)
                            );

                        var rarityFrame = document.createElement('span');
                        rarityFrame.className = 'lof-profile-rail-badge lof-profile-rail-featured-image-wrap lof-profile-featured-rarity-frame';
                        rarityFrame.setAttribute('data-rarity', featuredEntry.rarity.key);

                        var imageWrap = document.createElement('span');
                        imageWrap.className = 'lof-profile-rail-badge-image-wrap lof-profile-featured-rarity-image-wrap';
                        imageWrap.setAttribute('data-rarity', featuredEntry.rarity.key);

                        var image =
                            document.createElement('img');

                        image.className =
                            'lof-profile-rail-featured-image lof-profile-rail-badge-image';

                        image.alt = '';
                        imageWrap.appendChild(image);
                        rarityFrame.appendChild(imageWrap);

                        var text =
                            document.createElement('span');

                        text.className =
                            'lof-profile-rail-featured-text';

                        text.innerHTML =
                            '<span class="lof-profile-rail-featured-title-row">' +
                                '<span class="lof-profile-rail-featured-title">' +
                                    escapeHtml(
                                        getAchievementBaseTitle(
                                            featuredEntry.achievement
                                        )
                                    ) +
                                '</span>' +
                                (
                                    getAchievementTierLabel(
                                        featuredEntry.achievement
                                    )
                                        ? '<span class="lof-profile-rail-featured-tier">' +
                                            escapeHtml(
                                                getAchievementTierLabel(
                                                    featuredEntry.achievement
                                                )
                                            ) +
                                          '</span>'
                                        : ''
                                ) +
                            '</span>' +
                            '<span class="lof-profile-rail-featured-meta lof-rarity-' +
                                escapeHtml(featuredEntry.rarity.key) +
                            '">' +
                                '<span class="lof-profile-rail-featured-rarity-label">' +
                                    escapeHtml(featuredEntry.rarity.title) +
                                '</span>' +
                                (
                                    featuredEntry.achievement.tier === 100
                                        ? ' · Цепочка C'
                                        : ''
                                ) +
                            '</span>' +
                            (
                                featuredEntry.achievement.secret === true ||
                                featuredEntry.achievement.hidden === true
                                    ? '<span class="lof-profile-rail-featured-secret">Скрытое</span>'
                                    : ''
                            ) +
                            '<span class="lof-profile-rail-featured-prevalence" ' +
                                'data-lof-prevalence-id="' +
                                escapeHtml(featuredEntry.id) +
                                '" data-lof-prevalence-mode="compact">' +
                                'Получили: …' +
                            '</span>';

                        var featuredRarityLabel = text.querySelector('.lof-profile-rail-featured-rarity-label');
                        if (featuredRarityLabel) {
                            setRarityLabel(featuredRarityLabel, featuredEntry.rarity.title, featuredEntry.rarity.key);
                        }

                        featured.appendChild(number);
                        featured.appendChild(rarityFrame);
                        featured.appendChild(text);

                        var featuredDate =
                            formatAchievementDate(
                                featuredEntry.earnedAt
                            );

                        /*
                         * RC11.9.11: TOP-5 снова ведёт себя как единая часть
                         * профиля. Наведение показывает сведения в штатном
                         * инспекторе профиля; нажатие открывает полный список
                         * достижений сразу на выбранной награде.
                         */
                        featured.removeAttribute('aria-haspopup');
                        featured.removeAttribute('aria-expanded');

                        featured.addEventListener(
                            'mouseenter',
                            function () {
                                dismissNewEntryMark(
                                    featuredEntry,
                                    featured
                                );

                                showEntryInInspector(
                                    featuredEntry,
                                    featuredDate
                                );
                            }
                        );

                        featured.addEventListener(
                            'focus',
                            function () {
                                dismissNewEntryMark(
                                    featuredEntry,
                                    featured
                                );

                                showEntryInInspector(
                                    featuredEntry,
                                    featuredDate
                                );
                            }
                        );

                        featured.addEventListener(
                            'click',
                            function () {
                                dismissNewEntryMark(
                                    featuredEntry,
                                    featured
                                );

                                closeFeaturedPopover();

                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    featuredEntry.id
                                );
                            }
                        );

                        resolveAchievementImage(
                            catalog,
                            featuredEntry.achievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                image,
                                result,
                                function () {
                                    image.style.visibility = 'hidden';
                                }
                            );
                        }).catch(function () {
                            image.style.visibility = 'hidden';
                        });

                        featuredList.appendChild(featured);
                    }
                );

                featuredSection.appendChild(featuredList);
                module.appendChild(featuredSection);

                applyAchievementPrevalenceToRoot(
                    catalog,
                    featuredSection
                );

                module.appendChild(
                    inspector
                );
            }
        }

        /*
         * RC11.9.8 — компактный блок «Впереди» прямо в профиле.
         * В нём сразу видно ближайшие к открытию цели и самые редкие
         * из ещё не полученных; полный список открывается в диалоге.
         */
        var railUnearnedCards =
            Array.prototype.slice.call(
                fullSection.querySelectorAll(
                    '.lof-profile-achievement[data-lof-earned="0"]'
                )
            );

        if (railUnearnedCards.length) {
            var aheadRailSection =
                document.createElement(
                    'section'
                );

            aheadRailSection.className =
                'lof-profile-rail-ahead-section';

            var aheadRailHeading =
                document.createElement(
                    'div'
                );

            aheadRailHeading.className =
                'lof-profile-rail-ahead-heading';

            aheadRailHeading.innerHTML =
                '<span>Впереди</span>' +
                '<small>' +
                    escapeHtml(
                        String(
                            railUnearnedCards.length
                        )
                    ) +
                    ' не получено' +
                '</small>';

            aheadRailSection.appendChild(
                aheadRailHeading
            );

            function appendRailAheadGroup(
                title,
                cards,
                mode
            ) {
                if (!cards.length) {
                    return;
                }

                var group =
                    document.createElement(
                        'div'
                    );

                group.className =
                    'lof-profile-rail-ahead-group';

                var groupTitle =
                    document.createElement(
                        'div'
                    );

                groupTitle.className =
                    'lof-profile-rail-ahead-group-title';

                groupTitle.textContent =
                    title;

                group.appendChild(
                    groupTitle
                );

                var list =
                    document.createElement(
                        'div'
                    );

                list.className =
                    'lof-profile-rail-ahead-list';

                cards.forEach(function (card) {
                    var button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'lof-profile-rail-ahead-item';

                    button.setAttribute(
                        'data-rarity',
                        card.getAttribute('data-rarity') || 'common'
                    );

                    var percent =
                        Number(
                            card.getAttribute('data-lof-progress-percent') || 0
                        );

                    var rarityNode =
                        card.querySelector(
                            '.lof-profile-achievement-rarity'
                        );

                    var meta =
                        mode === 'near'
                            ? String(percent) + '% готово'
                            : (
                                rarityNode
                                    ? String(rarityNode.textContent || '')
                                    : 'Редкая цель'
                            );

                    button.innerHTML =
                        '<strong>' +
                            escapeHtml(
                                card.getAttribute('data-lof-title') ||
                                'Достижение'
                            ) +
                        '</strong>' +
                        '<span>' +
                            escapeHtml(meta) +
                        '</span>';

                    button.addEventListener(
                        'click',
                        function () {
                            openProfileAchievementsDialog(
                                catalog,
                                username,
                                scoreInfo,
                                visibleCount,
                                fullSection,
                                card.getAttribute('data-lof-achievement-id')
                            );
                        }
                    );

                    list.appendChild(
                        button
                    );
                });

                group.appendChild(
                    list
                );

                aheadRailSection.appendChild(
                    group
                );
            }

            var railNearCards =
                railUnearnedCards.slice()
                    .filter(function (card) {
                        return Number(
                            card.getAttribute('data-lof-progress-percent') || 0
                        ) >= 80;
                    })
                    .sort(function (a, b) {
                        return (
                            Number(
                                b.getAttribute('data-lof-progress-percent') || 0
                            ) -
                            Number(
                                a.getAttribute('data-lof-progress-percent') || 0
                            )
                        );
                    })
                    .slice(0, 2);

            var railNearIds = {};

            railNearCards.forEach(function (card) {
                railNearIds[
                    String(
                        card.getAttribute('data-lof-achievement-id') || ''
                    )
                ] = true;
            });

            var railRareCards =
                railUnearnedCards.slice()
                    .filter(function (card) {
                        return !railNearIds[
                            String(
                                card.getAttribute('data-lof-achievement-id') || ''
                            )
                        ];
                    })
                    .sort(function (a, b) {
                        var rarityDifference =
                            Number(
                                b.getAttribute('data-lof-rarity-order') || 0
                            ) -
                            Number(
                                a.getAttribute('data-lof-rarity-order') || 0
                            );

                        if (rarityDifference) {
                            return rarityDifference;
                        }

                        return (
                            Number(
                                b.getAttribute('data-lof-points') || 0
                            ) -
                            Number(
                                a.getAttribute('data-lof-points') || 0
                            )
                        );
                    })
                    .slice(0, 2);

            appendRailAheadGroup(
                'Особенно близко',
                railNearCards,
                'near'
            );

            appendRailAheadGroup(
                'Редчайшие впереди',
                railRareCards,
                'rare'
            );

            var allAheadButton =
                document.createElement(
                    'button'
                );

            allAheadButton.type =
                'button';

            allAheadButton.className =
                'lof-profile-rail-ahead-all-button';

            allAheadButton.textContent =
                'Все неполученные →';

            allAheadButton.addEventListener(
                'click',
                function () {
                    openProfileAchievementsDialog(
                        catalog,
                        username,
                        scoreInfo,
                        visibleCount,
                        fullSection,
                        null,
                        'unearned'
                    );
                }
            );

            aheadRailSection.appendChild(
                allAheadButton
            );

            module.appendChild(
                aheadRailSection
            );
        }


        if (!entries.length) {
            var empty =
                document.createElement(
                    'div'
                );

            empty.className =
                'lof-profile-rail-empty';

            empty.textContent =
                'Официальных достижений пока нет.';

            module.appendChild(
                empty
            );
        } else {
            var grid =
                document.createElement(
                    'div'
                );

            grid.className =
                'lof-profile-rail-badges';

            var pager =
                document.createElement(
                    'div'
                );

            pager.className =
                'lof-profile-rail-pager';

            var pageInfo =
                document.createElement(
                    'div'
                );

            pageInfo.className =
                'lof-profile-rail-page-info';

            var pageButtons =
                document.createElement(
                    'div'
                );

            pageButtons.className =
                'lof-profile-rail-page-buttons';

            var previous =
                document.createElement(
                    'button'
                );

            previous.type =
                'button';

            previous.className =
                'lof-profile-rail-page-button';

            previous.textContent =
                '‹';

            previous.setAttribute(
                'aria-label',
                'Предыдущие достижения'
            );

            var next =
                document.createElement(
                    'button'
                );

            next.type =
                'button';

            next.className =
                'lof-profile-rail-page-button';

            next.textContent =
                '›';

            next.setAttribute(
                'aria-label',
                'Следующие достижения'
            );

            pageButtons.appendChild(
                previous
            );

            pageButtons.appendChild(
                next
            );

            pager.appendChild(
                pageInfo
            );

            pager.appendChild(
                pageButtons
            );

            var collectionHeading =
                document.createElement(
                    'div'
                );

            collectionHeading.className =
                'lof-profile-rail-collection-heading';

            collectionHeading.innerHTML =
                '<span>Недавно получено</span>' +
                '<span>' +
                    escapeHtml(
                        String(
                            entries.length
                        )
                    ) +
                    ' получено' +
                '</span>';

            module.appendChild(
                collectionHeading
            );

            module.appendChild(
                grid
            );

            if (
                entries.length >
                PROFILE_RAIL_PAGE_SIZE
            ) {
                module.appendChild(
                    pager
                );
            }

            var currentPage = 1;

            function renderBadgePage(skipAnimation) {
                if (!skipAnimation) {
                    grid.classList.add(
                        'is-changing-page'
                    );
                }

                var pageCount =
                    Math.max(
                        1,
                        Math.ceil(
                            entries.length /
                            PROFILE_RAIL_PAGE_SIZE
                        )
                    );

                currentPage =
                    Math.min(
                        Math.max(
                            1,
                            currentPage
                        ),
                        pageCount
                    );

                var start =
                    (
                        currentPage - 1
                    ) *
                    PROFILE_RAIL_PAGE_SIZE;

                var end =
                    Math.min(
                        entries.length,
                        start +
                        PROFILE_RAIL_PAGE_SIZE
                    );

                grid.innerHTML =
                    '';

                entries
                    .slice(
                        start,
                        end
                    )
                    .forEach(function (entry) {
                        var button =
                            document.createElement(
                                'button'
                            );

                        button.type =
                            'button';

                        button.className =
                            'lof-profile-rail-badge' +
                            (
                                entry.isNew
                                    ? ' is-new-achievement'
                                    : ''
                            ) +
                            (
                                entry.achievement.tier ===
                                    100
                                    ? ' is-tier-complete'
                                    : ''
                            );

                        button.setAttribute(
                            'data-rarity',
                            entry.rarity.key
                        );

                        button.setAttribute(
                            'data-lof-achievement-id',
                            entry.id
                        );

                        var date =
                            formatAchievementDate(
                                entry.earnedAt
                            );

                        button.setAttribute(
                            'aria-label',
                            entry.achievement.title +
                            ' · ' +
                            entry.rarity.title +
                            (
                                date
                                    ? ' · Получено: ' +
                                        date
                                    : ''
                            )
                        );

                        var imageWrap =
                            document.createElement(
                                'span'
                            );

                        imageWrap.className =
                            'lof-profile-rail-badge-image-wrap';

                        var image =
                            document.createElement(
                                'img'
                            );

                        image.className =
                            'lof-profile-rail-badge-image';

                        image.alt =
                            '';

                        imageWrap.appendChild(
                            image
                        );

                        if (
                            entry.achievement.secret ===
                            true
                        ) {
                            var secret =
                                document.createElement(
                                    'span'
                                );

                            secret.className =
                                'lof-profile-rail-secret-mark';

                            secret.textContent =
                                '✦';

                            imageWrap.appendChild(
                                secret
                            );
                        }

                        if (
                            entry.achievement.tier ===
                            100
                        ) {
                            var tierComplete =
                                document.createElement(
                                    'span'
                                );

                            tierComplete.className =
                                'lof-profile-rail-tier-complete';

                            tierComplete.textContent =
                                'C';

                            tierComplete.title =
                                'Цепочка завершена';

                            imageWrap.appendChild(
                                tierComplete
                            );
                        }

                        if (entry.isNew) {
                            var newMark =
                                document.createElement(
                                    'span'
                                );

                            newMark.className =
                                'lof-profile-rail-new-mark';

                            newMark.title =
                                'Новое достижение';

                            imageWrap.appendChild(
                                newMark
                            );
                        }



                        button.appendChild(
                            imageWrap
                        );

                        button.addEventListener(
                            'mouseenter',
                            function () {
                                dismissNewEntryMark(
                                    entry,
                                    button
                                );

                                showEntryInInspector(
                                    entry,
                                    date
                                );
                            }
                        );

                        button.addEventListener(
                            'focus',
                            function () {
                                dismissNewEntryMark(
                                    entry,
                                    button
                                );

                                showEntryInInspector(
                                    entry,
                                    date
                                );
                            }
                        );

                        button.addEventListener(
                            'click',
                            function () {
                                dismissNewEntryMark(
                                    entry,
                                    button
                                );

                                openProfileAchievementsDialog(
                                    catalog,
                                    username,
                                    scoreInfo,
                                    visibleCount,
                                    fullSection,
                                    entry.id
                                );
                            }
                        );

                        grid.appendChild(
                            button
                        );

                        image.addEventListener(
                            'load',
                            function () {
                                image.classList.add(
                                    'is-ready'
                                );
                            },
                            {
                                once:
                                    true
                            }
                        );

                        resolveAchievementImage(
                            catalog,
                            entry.achievement
                        ).then(function (result) {
                            applyResolvedImageToElement(
                                image,
                                result,
                                function () {
                                    image.style.visibility =
                                        'hidden';
                                }
                            );
                        }).catch(function () {
                            image.style.visibility =
                                'hidden';
                        });
                    });

                pageInfo.textContent =
                    String(
                        currentPage
                    ) +
                    ' / ' +
                    String(
                        pageCount
                    ) +
                    ' · ' +
                    String(
                        start + 1
                    ) +
                    '–' +
                    String(
                        end
                    ) +
                    ' из ' +
                    String(
                        entries.length
                    );

                previous.disabled =
                    currentPage <= 1;

                next.disabled =
                    currentPage >= pageCount;

                requestAnimationFrame(
                    function () {
                        requestAnimationFrame(
                            function () {
                                grid.classList.remove(
                                    'is-changing-page'
                                );
                            }
                        );
                    }
                );
            }

            previous.addEventListener(
                'click',
                function () {
                    if (currentPage > 1) {
                        currentPage--;
                        renderBadgePage(true);
                    }
                }
            );

            next.addEventListener(
                'click',
                function () {
                    var pageCount =
                        Math.max(
                            1,
                            Math.ceil(
                                entries.length /
                                PROFILE_RAIL_PAGE_SIZE
                            )
                        );

                    if (
                        currentPage <
                        pageCount
                    ) {
                        currentPage++;
                        renderBadgePage();
                    }
                }
            );

            renderBadgePage();
        }

        var actions =
            document.createElement(
                'div'
            );

        actions.className =
            'lof-profile-rail-actions';

        var allButton =
            document.createElement(
                'button'
            );

        allButton.type =
            'button';

        allButton.className =
            'lof-profile-rail-all-button';

        allButton.innerHTML =
            '<span class="lof-profile-rail-all-icon" aria-hidden="true">▦</span>' +
            '<span>Все достижения</span>';

        allButton.addEventListener(
            'click',
            function () {
                var deepLink =
                    getProfileAchievementsDeepLink();

                var popupAchievementId =
                    String(
                        allButton.getAttribute(
                            'data-lof-popup-achievement'
                        ) || ''
                    );

                openProfileAchievementsDialog(
                    catalog,
                    username,
                    scoreInfo,
                    visibleCount,
                    fullSection,
                    popupAchievementId ||
                    deepLink.achievementId ||
                        null
                );
            }
        );

        actions.appendChild(
            allButton
        );

        module.appendChild(
            actions
        );

        /*
         * TEST 1.12.0:
         * достижения монтируются только в основную область профиля.
         * Штатную правую колонку Fandom код не изменяет.
         */
        restoreFandomProfileRightRail();

        if (root.firstChild) {
            root.insertBefore(
                module,
                root.firstChild
            );
        } else {
            root.appendChild(
                module
            );
        }

        /*
         * RC11.9.25: штатные действия Fandom физически переносятся под
         * блок достижений. Кнопки не копируются: сохраняются родные DOM-узлы,
         * обработчики, права и поведение Fandom.
         */
        moveProfileActionsBelowAchievements(module);

        var deepLink =
            getProfileAchievementsDeepLink();

        if (deepLink.open) {
            setTimeout(
                function () {
                    if (
                        document.body.contains(
                            allButton
                        )
                    ) {
                        allButton.click();
                    }
                },
                0
            );
        }

        return;


    }


    function renderProfileAchievements(catalog, hallRowsOverride) {
        var username =
            getProfileUsername();

        if (!username) {
            return Promise.resolve();
        }

        var root =
            document.querySelector(
                '.mw-parser-output'
            );

        if (!root) {
            return Promise.resolve();
        }

        hideManualAchievementsSection();
        removeProfileAchievementsRail();

        var oldRank =
            document.getElementById(
                'lof-profile-hall-rank'
            );

        if (oldRank) {
            oldRank.remove();
        }

        var old =
            document.getElementById(
                'lof-official-achievements'
            );

        if (old) {
            old.remove();
        }

        showProfileAchievementsLoading(root);

        return resolveUser(
            username
        ).then(function (resolvedUser) {
            return Promise.all([
                readUserSegment(
                    resolvedUser.userid,
                    false
                ),

                getProgressForUser(
                    resolvedUser,
                    false
                ),

                Promise.all([
                    readUserSegment(resolvedUser.userid, false),
                    getProgressForUser(resolvedUser, false)
                ]).then(function (cutoffData) {
                    var cutoffProtected = getUserAchievementMap(
                        cutoffData[0].data,
                        resolvedUser.userid
                    );
                    var explicitStartedAt = Number(resolvedUser.userid) === Number(getCurrentUserId()) && I.participation
                        ? Number(I.participation.startedAt || 0)
                        : 0;
                    var startedAt = getParticipationStartedAt(
                        cutoffProtected,
                        cutoffData[1],
                        explicitStartedAt
                    );
                    var discussionBaseline = Number(resolvedUser.userid) === Number(getCurrentUserId()) && I.participation
                        ? Number(I.participation.discussionBaselineTotal)
                        : -1;
                    return getEditorStatsForUser(
                        resolvedUser,
                        false,
                        startedAt,
                        discussionBaseline
                    );
                }),

                Number(resolvedUser.userid) === Number(getCurrentUserId())
                    ? Promise.resolve(null)
                    : getCurrentViewerEffectiveAchievementMap(catalog)
            ]).then(function (results) {
                var loaded =
                    results[0];

                var progress =
                    results[1];

                var editorStats =
                    results[2];

                var protectedMap =
                    getUserAchievementMap(
                        loaded.data,
                        resolvedUser.userid
                    );

                var achievementMap =
                    buildEffectiveAchievementMap(
                        catalog,
                        resolvedUser,
                        protectedMap,
                        progress,
                        editorStats.achievementMap,
                        editorStats
                    );

                var viewerAchievementMap =
                    results[3] || achievementMap;

                var profileProgressContext =
                    buildProfileProgressContext(
                        protectedMap,
                        progress,
                        editorStats
                    );


                profileProgressContext.__discussionStats =
                    editorStats.discussionStats ||
                    createEmptyDiscussionStats();

                profileProgressContext.__achievementCollectorCount =
                    getAchievementCollectorState(
                        catalog,
                        achievementMap
                    ).logicalCount;

                profileProgressContext.__metaFacts =
                    buildMetaAchievementFacts(
                        catalog,
                        achievementMap,
                        {
                            progress: progress,
                            editorStats: editorStats,
                            starozhilDays: (function () {
                                var start = getLocalWikiPresenceStartUnix(
                                    protectedMap,
                                    progress,
                                    editorStats.achievementMap
                                );
                                return start > 0
                                    ? Math.max(
                                        0,
                                        Math.floor((nowUnix() - start) / 86400)
                                    )
                                    : 0;
                            })()
                        }
                    );

                var unreadAchievementMap =
                    loadProfileUnreadAchievementMap(
                        resolvedUser.userid,
                        achievementMap
                    );

                if (
                    Array.isArray(
                        hallRowsOverride
                    )
                ) {
                    hallRowsOverride.some(
                        function (row) {
                            if (
                                Number(
                                    row.userId
                                ) !==
                                Number(
                                    resolvedUser.userid
                                )
                            ) {
                                return false;
                            }

                            [
                                HALL_TOP_500_ID,
                                HALL_TOP_100_ID,
                                HALL_TOP_10_ID
                            ].forEach(function (achievementId) {
                                if (
                                    row.achievementMap &&
                                    row.achievementMap[
                                        achievementId
                                    ]
                                ) {
                                    achievementMap[
                                        achievementId
                                    ] =
                                        row.achievementMap[
                                            achievementId
                                        ];
                                }
                            });

                            return true;
                        }
                    );
                }

                var scoreInfo =
                    calculateScore(
                        catalog,
                        achievementMap
                    );

                /*
                 * Самый верх профиля:
                 * место пользователя по очкам опыта среди тех,
                 * кто реально входит в текущий Top-1000 Зала славы.
                 */
                var rankBanner =
                    document.createElement(
                        'div'
                    );

                rankBanner.id =
                    'lof-profile-hall-rank';

                rankBanner.className =
                    'lof-profile-hall-rank';

                rankBanner.innerHTML =
                    '<span class="lof-profile-hall-rank-medal" aria-hidden="true">◆</span>' +
                    '<div class="lof-profile-hall-rank-main">' +
                        '<div class="lof-profile-hall-rank-label">' +
                            'Место на вики по очкам опыта' +
                        '</div>' +
                        '<div class="lof-profile-hall-rank-value">' +
                            'Определяем место…' +
                        '</div>' +
                        '<div class="lof-profile-hall-rank-score">' +
                            escapeHtml(
                                formatPoints(
                                    scoreInfo.score
                                )
                            ) +
                            ' опыта' +
                        '</div>' +
                    '</div>' +
                    '<a class="lof-profile-hall-rank-link" href="' +
                        escapeHtml(
                            mw.util.getUrl(
                                HALL_PAGE
                            )
                        ) +
                    '">' +
                        'Зал славы →' +
                    '</a>';

                (
                    Array.isArray(
                        hallRowsOverride
                    )
                        ? Promise.resolve(
                            hallRowsOverride
                        )
                        : getLeaderboardRowsCached(
                            catalog,
                            false
                        )
                ).then(function (rows) {
                    var ownRow =
                        null;

                    rows.some(
                        function (row) {
                            if (
                                Number(
                                    row.userId
                                ) ===
                                Number(
                                    resolvedUser.userid
                                )
                            ) {
                                ownRow =
                                    row;

                                return true;
                            }

                            return false;
                        }
                    );

                    if (
                        ownRow &&
                        Number(
                            resolvedUser.userid
                        ) ===
                        Number(
                            getCurrentUserId()
                        )
                    ) {
                        syncOwnHallRankAwardTimes(
                            resolvedUser,
                            ownRow.rank,
                            0
                        );
                    }

                    if (
                        !Array.isArray(
                            hallRowsOverride
                        ) &&
                        ownRow &&
                        ownRow.achievementMap &&
                        (
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_500_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_500_ID
                                ]
                            ) ||
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_100_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_100_ID
                                ]
                            ) ||
                            (
                                ownRow.achievementMap[
                                    HALL_TOP_10_ID
                                ] &&
                                !achievementMap[
                                    HALL_TOP_10_ID
                                ]
                            )
                        )
                    ) {
                        renderProfileAchievements(
                            catalog,
                            rows
                        );

                        return;
                    }

                    var value =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-value'
                        );

                    if (!value) {
                        return;
                    }

                    rankBanner.classList.remove(
                        'is-rank-first',
                        'is-rank-top10',
                        'is-rank-top100',
                        'is-rank-top500'
                    );

                    var medal =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-medal'
                        );

                    if (medal) {
                        medal.textContent =
                            '◆';
                    }

                    if (ownRow) {
                        value.textContent =
                            '#' +
                            String(
                                ownRow.rank
                            ) +
                            ' в Зале славы';

                        if (Number(ownRow.rank) === 1) {
                            rankBanner.classList.add(
                                'is-rank-first'
                            );

                            if (medal) {
                                medal.textContent =
                                    'I';
                            }
                        } else if (Number(ownRow.rank) <= 10) {
                            rankBanner.classList.add(
                                'is-rank-top10'
                            );

                            if (medal) {
                                medal.textContent =
                                    'X';
                            }
                        } else if (Number(ownRow.rank) <= 100) {
                            rankBanner.classList.add(
                                'is-rank-top100'
                            );

                            if (medal) {
                                medal.textContent =
                                    'C';
                            }
                        } else if (Number(ownRow.rank) <= 500) {
                            rankBanner.classList.add(
                                'is-rank-top500'
                            );

                            if (medal) {
                                medal.textContent =
                                    '◆';
                            }
                        }
                    } else {
                        value.textContent =
                            'В Зал славы не входит';
                    }
                }).catch(function (error) {
                    var value =
                        rankBanner.querySelector(
                            '.lof-profile-hall-rank-value'
                        );

                    if (value) {
                        value.textContent =
                            'Место временно недоступно';
                    }

                    console.warn(
                        '[Lofarian Achievements] Не удалось определить место профиля:',
                        error
                    );
                });

                var section =
                    document.createElement(
                        'section'
                    );

                section.id =
                    'lof-official-achievements';

                section.innerHTML =
                    '<h2 class="lof-profile-title"><a class="lof-achievements-heading-link" href="' +
                    escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) +
                    '">Достижения</a></h2>';

                var groups = {};
                var visibleCount = 0;

                Object.keys(
                    achievementMap
                ).forEach(function (achievementId) {
                    var achievement =
                        getAchievement(
                            catalog,
                            achievementId
                        );

                    if (!achievement) {
                        return;
                    }

                    var rarity =
                        getRarityInfo(
                            catalog,
                            achievement
                        );

                    if (!groups[rarity.key]) {
                        groups[rarity.key] = {
                            rarity:
                                rarity,

                            items:
                                []
                        };
                    }

                    groups[
                        rarity.key
                    ].items.push({
                        id:
                            achievementId,

                        achievement:
                            achievement,

                        earnedAt:
                            achievementMap[
                                achievementId
                            ],

                        category:
                            getAchievementVisualCategory(
                                achievementId,
                                achievement
                            ),

                        progressInfo:
                            getAchievementProgressInfo(
                                catalog,
                                achievement,
                                profileProgressContext
                            ),

                        isNew:
                            unreadAchievementMap[
                                achievementId
                            ] ===
                                true
                    });

                    visibleCount++;
                });

                /*
                 * TEST 1.12.5:
                 * ступени одной I–C цепочки не раздувают счётчик
                 * «получено». Если получена хотя бы одна ступень,
                 * вся цепочка считается одним достижением.
                 */
                visibleCount =
                    countLogicalEarnedAchievements(
                        catalog,
                        achievementMap
                    );

                var groupList =
                    Object.keys(
                        groups
                    )
                    .map(function (key) {
                        return groups[
                            key
                        ];
                    })
                    .sort(function (a, b) {
                        /*
                         * В профиле сначала самые престижные.
                         */
                        return (
                            b.rarity.order -
                            a.rarity.order
                        );
                    });

                var dialogGroups = {};

                /*
                 * RC11.9.21:
                 * окно «Все достижения» использует тот же ЛОГИЧЕСКИЙ счёт,
                 * что и отдельная страница каталога. Одна I–C family-цепочка
                 * = одна запись; небольшие виртуальные серии тоже = одна запись.
                 * Поэтому число карточек в «Все» совпадает с общим количеством
                 * каталога (для текущей базы — 110), а не с прежним сокращённым набором
                 * «получено + доступные одиночные цели».
                 */
                var profileLogicalVirtualSeries = [
                    {
                        id: 'achievement_collector',
                        title: 'Собиратель наград',
                        ids: [
                            'achievement_collector_5',
                            'achievement_collector_10',
                            'achievement_collector_25',
                            'achievement_collector_50',
                            'achievement_collector_75',
                            'achievement_collector_100'
                        ]
                    },
                    {
                        id: 'meta_award_archive',
                        title: 'Архив наград',
                        ids: [
                            'meta_award_archive_10',
                            'meta_award_archive_25',
                            'meta_award_archive_50'
                        ]
                    },
                    {
                        id: 'meta_harvest_day',
                        title: 'Урожайный день',
                        ids: [
                            'meta_harvest_day_3',
                            'meta_harvest_day_5',
                            'meta_harvest_day_10'
                        ]
                    },
                    {
                        id: 'meta_trophy_shelf',
                        title: 'Полка трофеев',
                        ids: [
                            'meta_trophy_shelf_5',
                            'meta_trophy_shelf_10',
                            'meta_trophy_shelf_20'
                        ]
                    },
                    {
                        id: 'comm_approval',
                        title: 'Одобрено сообществом',
                        ids: [
                            'comm_approval_1',
                            'comm_approval_5',
                            'comm_approval_10',
                            'comm_approval_25',
                            'comm_approval_50',
                            'comm_approval_100'
                        ]
                    }
                ];

                var profileVirtualMemberMap = {};

                profileLogicalVirtualSeries.forEach(function (series) {
                    (series.ids || []).forEach(function (achievementId) {
                        profileVirtualMemberMap[String(achievementId)] =
                            String(series.id);
                    });
                });

                function addLogicalDialogEntry(entry) {
                    if (!entry || !entry.achievement) {
                        return;
                    }

                    var rarity =
                        getRarityInfo(
                            catalog,
                            entry.achievement
                        );

                    if (!dialogGroups[rarity.key]) {
                        dialogGroups[rarity.key] = {
                            rarity: rarity,
                            items: []
                        };
                    }

                    dialogGroups[rarity.key].items.push(entry);
                }

                function makeDirectLogicalEntry(achievementId, achievement) {
                    var earnedAt =
                        achievementMap[achievementId] || null;

                    var earned =
                        Number(earnedAt || 0) > 0;

                    var concealCondition =
                        achievement.hidden === true ||
                        achievement.secret === true;

                    return {
                        id: achievementId,
                        logicalId: achievementId,
                        achievement: achievement,
                        earnedAt: earned ? earnedAt : null,
                        earned: earned,
                        category: getAchievementVisualCategory(
                            achievementId,
                            achievement
                        ),
                        progressInfo: concealCondition
                            ? null
                            : getAchievementProgressInfo(
                                catalog,
                                achievement,
                                profileProgressContext
                            ),
                        concealCondition: concealCondition,
                        isNew: earned &&
                            unreadAchievementMap[achievementId] === true
                    };
                }

                /* Самостоятельные достижения: все, а не только «доступные». */
                Object.keys(catalog.achievements || {}).forEach(
                    function (achievementId) {
                        if (profileVirtualMemberMap[achievementId]) {
                            return;
                        }

                        var achievement =
                            getAchievement(
                                catalog,
                                achievementId
                            );

                        if (!achievement) {
                            return;
                        }

                        addLogicalDialogEntry(
                            makeDirectLogicalEntry(
                                achievementId,
                                achievement
                            )
                        );
                    }
                );

                /*
                 * Небольшие серии, физически записанные несколькими ID,
                 * сворачиваются в одну логическую карточку. Представителем
                 * служит высшая уже полученная ступень, либо первая ступень.
                 */
                profileLogicalVirtualSeries.forEach(function (series) {
                    var representativeId = '';
                    var representativeAchievement = null;
                    var earnedAt = null;
                    var earnedIndex = -1;

                    (series.ids || []).forEach(function (achievementId, index) {
                        var achievement =
                            getAchievement(
                                catalog,
                                achievementId
                            );

                        if (!achievement) {
                            return;
                        }

                        if (!representativeAchievement) {
                            representativeId = achievementId;
                            representativeAchievement = achievement;
                        }

                        if (Number(achievementMap[achievementId] || 0) > 0) {
                            earnedIndex = index;
                            representativeId = achievementId;
                            representativeAchievement = achievement;
                            earnedAt = achievementMap[achievementId];
                        }
                    });

                    if (!representativeAchievement) {
                        return;
                    }

                    var progressAchievement = representativeAchievement;
                    var progressId = representativeId;

                    if (
                        earnedIndex >= 0 &&
                        earnedIndex + 1 < (series.ids || []).length
                    ) {
                        var nextId = series.ids[earnedIndex + 1];
                        var nextAchievement =
                            getAchievement(catalog, nextId);

                        if (nextAchievement) {
                            progressAchievement = nextAchievement;
                            progressId = nextId;
                        }
                    }

                    var concealCondition =
                        progressAchievement.hidden === true ||
                        progressAchievement.secret === true;

                    addLogicalDialogEntry({
                        id: representativeId,
                        logicalId: 'series:' + series.id,
                        logicalFamily: series.id,
                        displayTitle: series.title,
                        achievement: representativeAchievement,
                        earnedAt: earnedIndex >= 0 ? earnedAt : null,
                        earned: earnedIndex >= 0,
                        category: getAchievementVisualCategory(
                            representativeId,
                            representativeAchievement
                        ),
                        progressInfo: concealCondition
                            ? null
                            : getAchievementProgressInfo(
                                catalog,
                                progressAchievement,
                                profileProgressContext
                            ),
                        concealCondition: concealCondition,
                        progressAchievementId: progressId,
                        isNew: earnedIndex >= 0 &&
                            unreadAchievementMap[representativeId] === true
                    });
                });

                /* Каждая обычная family I–C также представлена ровно один раз. */
                Object.keys(catalog.families || {}).forEach(function (familyId) {
                    var family = catalog.families[familyId];

                    if (
                        !family ||
                        !Array.isArray(family.thresholds) ||
                        !family.thresholds.length
                    ) {
                        return;
                    }

                    var highestEarnedLevel = 0;
                    var highestEarnedAt = null;

                    for (var level = 1; level <= family.thresholds.length; level++) {
                        var levelId =
                            familyId + '_' +
                            String(level).padStart(2, '0');

                        if (Number(achievementMap[levelId] || 0) > 0) {
                            highestEarnedLevel = level;
                            highestEarnedAt = achievementMap[levelId];
                        }
                    }

                    var representativeLevel =
                        highestEarnedLevel > 0
                            ? highestEarnedLevel
                            : 1;

                    var representativeId =
                        familyId + '_' +
                        String(representativeLevel).padStart(2, '0');

                    var representativeAchievement =
                        getAchievement(
                            catalog,
                            representativeId
                        );

                    if (!representativeAchievement) {
                        return;
                    }

                    var progressLevel =
                        Math.min(
                            family.thresholds.length,
                            highestEarnedLevel > 0
                                ? highestEarnedLevel + 1
                                : 1
                        );

                    var progressId =
                        familyId + '_' +
                        String(progressLevel).padStart(2, '0');

                    var progressAchievement =
                        getAchievement(catalog, progressId) ||
                        representativeAchievement;

                    var concealCondition =
                        family.hidden === true ||
                        family.secret === true ||
                        progressAchievement.hidden === true ||
                        progressAchievement.secret === true;

                    addLogicalDialogEntry({
                        id: representativeId,
                        logicalId: 'family:' + familyId,
                        logicalFamily: familyId,
                        displayTitle: String(
                            family.title ||
                            getAchievementBaseTitle(representativeAchievement)
                        ),
                        achievement: representativeAchievement,
                        earnedAt: highestEarnedLevel > 0
                            ? highestEarnedAt
                            : null,
                        earned: highestEarnedLevel > 0,
                        category: getAchievementVisualCategory(
                            representativeId,
                            representativeAchievement
                        ),
                        progressInfo: concealCondition
                            ? null
                            : getAchievementProgressInfo(
                                catalog,
                                progressAchievement,
                                profileProgressContext
                            ),
                        concealCondition: concealCondition,
                        progressAchievementId: progressId,
                        isNew: highestEarnedLevel > 0 &&
                            unreadAchievementMap[representativeId] === true
                    });
                });

                var unearnedTargets = [];
                Object.keys(dialogGroups).forEach(function (rarityKey) {
                    dialogGroups[rarityKey].items.forEach(function (entry) {
                        if (entry.earned === false) {
                            unearnedTargets.push(entry);
                        }
                    });
                });

                var dialogGroupList =
                    Object.keys(
                        dialogGroups
                    )
                    .map(function (key) {
                        return dialogGroups[
                            key
                        ];
                    })
                    .sort(function (a, b) {
                        return (
                            b.rarity.order -
                            a.rarity.order
                        );
                    });

                dialogGroupList.forEach(
                    function (group) {
                        group.items.sort(
                            function (a, b) {
                                if (
                                    (
                                        a.earned !==
                                            false
                                    ) !==
                                    (
                                        b.earned !==
                                            false
                                    )
                                ) {
                                    return (
                                        a.earned !==
                                            false
                                            ? -1
                                            : 1
                                    );
                                }

                                var pointDifference =
                                    getAchievementPoints(
                                        b.achievement
                                    ) -
                                    getAchievementPoints(
                                        a.achievement
                                    );

                                if (pointDifference) {
                                    return pointDifference;
                                }

                                return String(
                                    a.achievement.title
                                ).localeCompare(
                                    String(
                                        b.achievement.title
                                    ),
                                    'ru'
                                );
                            }
                        );

                        var raritySection =
                            document.createElement(
                                'div'
                            );

                        raritySection.className =
                            'lof-profile-rarity-group';

                        raritySection.setAttribute(
                            'data-rarity',
                            group.rarity.key
                        );

                        var heading =
                            document.createElement(
                                'h3'
                            );

                        heading.className =
                            'lof-profile-rarity-heading ' +
                            'lof-rarity-' +
                            group.rarity.key;

                        heading.innerHTML =
                            '<span class="lof-profile-rarity-heading-main">' +
                                '<span class="lof-profile-rarity-heading-title"></span>' +
                                '<small>' +
                                    escapeHtml(
                                        (
                                            group.rarity.grade === 1
                                                ? 'I'
                                                : (
                                                    group.rarity.grade === 2
                                                        ? 'II'
                                                        : 'III'
                                                )
                                        ) +
                                        ' градация'
                                    ) +
                                '</small>' +
                            '</span>' +
                            '<span class="lof-profile-rarity-count"></span>';

                        var rarityHeadingTitle =
                            heading.querySelector(
                                '.lof-profile-rarity-heading-title'
                            );

                        var rarityHeadingCount =
                            heading.querySelector(
                                '.lof-profile-rarity-count'
                            );

                        setRarityLabel(
                            rarityHeadingTitle,
                            group.rarity.groupTitle,
                            group.rarity.key
                        );

                        setRarityLabel(
                            rarityHeadingCount,
                            String(group.items.length),
                            group.rarity.key
                        );

                        raritySection.appendChild(
                            heading
                        );

                        var grid =
                            document.createElement(
                                'div'
                            );

                        grid.className =
                            'lof-profile-achievements-grid';

                        group.items.forEach(
                            function (entry) {
                                var achievement =
                                    entry.achievement;

                                var rarity =
                                    getRarityInfo(
                                        catalog,
                                        achievement
                                    );

                                var card =
                                    document.createElement(
                                        'div'
                                    );

                                card.className =
                                    'lof-profile-achievement ' +
                                    'lof-rarity-border-' +
                                    rarity.key +
                                    (
                                        entry.earned ===
                                            false
                                            ? ' is-unearned-achievement'
                                            : ' is-earned-achievement'
                                    ) +
                                    (
                                        entry.isNew
                                            ? ' is-new-achievement'
                                            : ''
                                    ) +
                                    (
                                        entry.earned !==
                                            false &&
                                        achievement.tier ===
                                            100
                                            ? ' is-tier-complete'
                                            : ''
                                    ) +
                                    (
                                        entry.progressInfo
                                            ? ' has-progress'
                                            : ' no-progress'
                                    );

                                card.setAttribute(
                                    'data-lof-achievement-id',
                                    entry.id
                                );

                                if (entry.logicalFamily || achievement.family) {
                                    card.setAttribute(
                                        'data-lof-family',
                                        String(entry.logicalFamily || achievement.family)
                                    );

                                    card.setAttribute(
                                        'data-lof-tier',
                                        String(
                                            Math.max(
                                                1,
                                                Math.floor(Number(achievement.tier) || 1)
                                            )
                                        )
                                    );
                                }

                                card.setAttribute(
                                    'data-lof-category',
                                    entry.category
                                );

                                card.setAttribute(
                                    'data-lof-earned',
                                    entry.earned ===
                                        false
                                        ? '0'
                                        : '1'
                                );

                                card.setAttribute(
                                    'data-rarity',
                                    rarity.key
                                );

                                card.setAttribute(
                                    'data-lof-rarity-order',
                                    String(
                                        rarity.order
                                    )
                                );

                                card.setAttribute(
                                    'data-lof-points',
                                    String(
                                        getAchievementPoints(
                                            achievement
                                        ) || 0
                                    )
                                );

                                card.setAttribute(
                                    'data-lof-hidden',
                                    (
                                        achievement.hidden === true ||
                                        achievement.secret === true
                                    )
                                        ? '1'
                                        : '0'
                                );

                                if (
                                    entry.progressInfo &&
                                    entry.progressInfo.percent !== null &&
                                    entry.progressInfo.percent !== undefined
                                ) {
                                    card.setAttribute(
                                        'data-lof-progress-percent',
                                        String(
                                            Math.max(
                                                0,
                                                Math.min(
                                                    100,
                                                    Number(
                                                        entry.progressInfo.percent
                                                    ) || 0
                                                )
                                            )
                                        )
                                    );
                                }

                                card.setAttribute(
                                    'data-lof-title',
                                    entry.displayTitle ||
                                    (
                                        (
                                            entry.earned === false &&
                                            achievement.concealTitle === true &&
                                            achievement.hidden !== true
                                        )
                                            ? 'Скрытое достижение'
                                            : achievement.title
                                    )
                                );

                                var rarityFrame = document.createElement('span');
                                rarityFrame.className = 'lof-profile-rail-badge lof-profile-achievement-rarity-frame';
                                rarityFrame.setAttribute('data-rarity', rarity.key);

                                var imageWrap = document.createElement('span');
                                imageWrap.className = 'lof-profile-rail-badge-image-wrap lof-profile-achievement-rarity-image-wrap';

                                var image =
                                    document.createElement(
                                        'img'
                                    );

                                image.className =
                                    'lof-profile-achievement-image lof-profile-rail-badge-image';

                                image.alt =
                                    '';
                                imageWrap.appendChild(image);
                                rarityFrame.appendChild(imageWrap);

                                var textBlock =
                                    document.createElement(
                                        'div'
                                    );

                                var points =
                                    getAchievementPoints(
                                        achievement
                                    );

                                var fullTierLabel =
                                    getAchievementTierLabel(
                                        achievement
                                    );

                                var isHiddenCondition =
                                    achievement.hidden === true ||
                                    achievement.secret === true;

                                var concealCondition =
                                    isHiddenCondition &&
                                    !viewerKnowsHiddenAchievement(
                                        viewerAchievementMap,
                                        entry.id
                                    );

                                var visibleBaseTitle =
                                    entry.displayTitle ||
                                    (
                                        concealCondition &&
                                        entry.earned === false &&
                                        achievement.concealTitle === true &&
                                        achievement.hidden !== true
                                            ? 'Скрытое достижение'
                                            : getAchievementBaseTitle(
                                                achievement
                                            )
                                    );

                                textBlock.innerHTML =
                                    '<div class="lof-profile-achievement-name-row">' +
                                        '<div class="lof-profile-achievement-name">' +
                                            escapeHtml(
                                                visibleBaseTitle
                                            ) +
                                            (
                                                entry.isNew
                                                    ? '<span class="lof-profile-achievement-new-mark">Новое</span>'
                                                    : ''
                                            ) +
                                        '</div>' +
                                        (
                                            fullTierLabel
                                                ? '<span class="lof-profile-achievement-tier-label">' +
                                                    escapeHtml(
                                                        fullTierLabel
                                                    ) +
                                                  '</span>'
                                                : ''
                                        ) +
                                    '</div>' +
                                    (
                                        entry.earned ===
                                            false
                                            ? '<div class="lof-profile-achievement-unearned-label">' +
                                                (
                                                    concealCondition
                                                        ? 'Скрытая цель'
                                                        : 'Не получено'
                                                ) +
                                              '</div>'
                                            : ''
                                    ) +
                                    '<div class="lof-profile-achievement-description' +
                                        (
                                            concealCondition
                                                ? ' is-concealed-condition'
                                                : ''
                                        ) +
                                    '">' +
                                        escapeHtml(
                                            concealCondition
                                                ? buildHiddenConditionNoise(
                                                    entry.id
                                                )
                                                : (
                                                    isHiddenCondition
                                                        ? getHiddenUnlockedDescription(
                                                            entry.id,
                                                            achievement.description
                                                        )
                                                        : achievement.description
                                                )
                                        ) +
                                    '</div>';

                                var date =
                                    formatAchievementDate(
                                        entry.earnedAt
                                    );

                                if (entry.earned !== false) {
                                    textBlock.innerHTML +=
                                        '<div class="lof-profile-achievement-date">Получено: ' +
                                            escapeHtml(
                                                date || 'дата не зафиксирована'
                                            ) +
                                        '</div>';
                                }

                                if (
                                    entry.progressInfo &&
                                    !concealCondition
                                ) {
                                    textBlock.innerHTML +=
                                        '<div class="lof-profile-achievement-progress lof-rarity-' +
                                            escapeHtml(
                                                rarity.key
                                            ) +
                                            (
                                                entry.progressInfo.complete
                                                    ? ' is-complete'
                                                    : ''
                                            ) +
                                        '">' +
                                            '<div class="lof-profile-achievement-progress-text">' +
                                                '<span>' +
                                                    escapeHtml(
                                                        entry.progressInfo.text
                                                    ) +
                                                '</span>' +
                                                (
                                                    entry.progressInfo.percent !== null &&
                                                    entry.progressInfo.hidePercentLabel !== true
                                                        ? '<strong>' +
                                                            escapeHtml(
                                                                String(
                                                                    entry.progressInfo.percent
                                                                )
                                                            ) +
                                                            '%</strong>'
                                                        : ''
                                                ) +
                                            '</div>' +
                                            (
                                                entry.progressInfo.percent !== null
                                                    ? '<div class="lof-profile-achievement-progress-bar">' +
                                                        '<span style="width:' +
                                                            escapeHtml(
                                                                String(
                                                                    entry.progressInfo.percent
                                                                )
                                                            ) +
                                                            '%"></span>' +
                                                      '</div>'
                                                    : ''
                                            ) +
                                        '</div>';
                                }

                                textBlock.innerHTML +=
                                    '<div class="lof-profile-achievement-footer">' +
                                        (
                                            points > 0
                                                ? '<span class="lof-profile-achievement-points">+' +
                                                    escapeHtml(
                                                        formatPoints(
                                                            points
                                                        )
                                                    ) +
                                                  '</span>'
                                                : ''
                                        ) +
                                        '<span class="lof-profile-achievement-rarity lof-rarity-' +
                                            escapeHtml(
                                                rarity.key
                                            ) +
                                        '">' +
                                            escapeHtml(
                                                rarity.title
                                            ) +
                                        '</span>' +
                                        (
                                            achievement.secret === true ||
                                            achievement.hidden === true
                                                ? '<span class="lof-profile-achievement-secret">Скрытое</span>'
                                                : ''
                                        ) +
                                        (
                                            entry.earned ===
                                                false
                                                ? '<span class="lof-profile-achievement-unearned-status">Не получено</span>'
                                                : ''
                                        ) +
                                        '<span class="lof-profile-achievement-prevalence" ' +
                                            'data-lof-prevalence-id="' +
                                            escapeHtml(
                                                entry.id
                                            ) +
                                        '">Получили: …</span>' +
                                    '</div>';

                                var rarityLabelNode = textBlock.querySelector('.lof-profile-achievement-rarity');
                                if (rarityLabelNode) {
                                    setRarityLabel(rarityLabelNode, rarity.title, rarity.key);
                                }

                                if (
                                    entry.earned !==
                                        false &&
                                    achievement.tier ===
                                        100
                                ) {
                                    var completeMark =
                                        document.createElement(
                                            'span'
                                        );

                                    completeMark.className =
                                        'lof-profile-achievement-tier-complete';

                                    completeMark.textContent =
                                        'C';

                                    completeMark.title =
                                        'Цепочка завершена';

                                    card.appendChild(
                                        completeMark
                                    );
                                }

                                function dismissCardNewMark() {
                                    if (
                                        entry.earned !== false &&
                                        entry.isNew
                                    ) {
                                        markProfileAchievementViewed(
                                            resolvedUser.userid,
                                            entry.id,
                                            entry.earnedAt
                                        );

                                        entry.isNew = false;
                                        card.classList.remove(
                                            'is-new-achievement'
                                        );

                                        card.querySelectorAll(
                                            '.lof-profile-achievement-new-mark, ' +
                                            '.lof-profile-rail-new-mark'
                                        ).forEach(function (mark) {
                                            mark.remove();
                                        });
                                    }
                                }

                                function openCardDetails() {
                                    dismissCardNewMark();

                                    var detailDescription = concealCondition
                                        ? 'Условие засекречено.'
                                        : (
                                            isHiddenCondition
                                                ? getHiddenUnlockedDescription(entry.id, achievement.description)
                                                : achievement.description
                                        );

                                    var prevalenceNode = card.querySelector('.lof-profile-achievement-prevalence');
                                    var detailsTarget = document.getElementById('lof-profile-achievement-inline-details');
                                    var detailData = {
                                        title: visibleBaseTitle + (fullTierLabel ? ' ' + fullTierLabel : ''),
                                        description: detailDescription,
                                        rarityTitle: rarity.title,
                                        rarityKey: rarity.key,
                                        categoryTitle: getAchievementCategoryTitle(entry.category),
                                        statusText: entry.earned === false ? 'Не получено' : 'Получено',
                                        tierText: fullTierLabel ? 'Ступень: ' + fullTierLabel : '',
                                        earnedText: entry.earned !== false ? 'Получено: ' + (date || 'дата не зафиксирована') : '',
                                        progressText: entry.progressInfo && !concealCondition ? entry.progressInfo.text : '',
                                        prevalenceText: prevalenceNode ? prevalenceNode.textContent : ''
                                    };

                                    /*
                                     * RC11.6: подробности из полного списка открываются небольшим
                                     * fixed-popup поверх текущего списка. Никакого scrollIntoView —
                                     * позиция списка и прокрутка пользователя сохраняются.
                                     */
                                    detailData.compact = true;
                                    openAchievementDetailsModal(catalog, achievement, detailData);
                                }

                                card.setAttribute('role', 'button');
                                card.setAttribute('tabindex', '0');
                                card.setAttribute('aria-label', 'Подробнее о достижении «' + visibleBaseTitle + '»');
                                card.addEventListener(
                                    'mouseenter',
                                    dismissCardNewMark
                                );
                                card.addEventListener(
                                    'focus',
                                    dismissCardNewMark
                                );
                                card.addEventListener('click', openCardDetails);
                                card.addEventListener('keydown', function (event) {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        openCardDetails();
                                    }
                                });

                                card.appendChild(
                                    rarityFrame
                                );

                                card.appendChild(
                                    textBlock
                                );

                                grid.appendChild(
                                    card
                                );

                                resolveAchievementImage(
                                    catalog,
                                    achievement
                                ).then(function (result) {
                                    applyResolvedImageToElement(
                                        image,
                                        result,
                                        function () {
                                            image.style.visibility =
                                                'hidden';
                                        }
                                    );
                                }).catch(function () {
                                    image.style.visibility =
                                        'hidden';
                                });
                            }
                        );

                        raritySection.appendChild(
                            grid
                        );

                        section.appendChild(
                            raritySection
                        );
                    }
                );

                if (
                    visibleCount <= 0 &&
                    unearnedTargets.length <= 0
                ) {
                    var empty =
                        document.createElement(
                            'div'
                        );

                    empty.className =
                        'lof-profile-empty';

                    empty.textContent =
                        'Официальных достижений пока нет.';

                    section.appendChild(
                        empty
                    );
                }

                var footer =
                    document.createElement(
                        'div'
                    );

                footer.className =
                    'lof-profile-score-footer';

                var total =
                    document.createElement(
                        'div'
                    );

                total.className =
                    'lof-profile-score-total';

                total.innerHTML =
                    'Очки достижений: <strong>' +
                    escapeHtml(
                        formatPoints(
                            scoreInfo.score
                        )
                    ) +
                    '</strong>';

                var hallLink =
                    document.createElement(
                        'a'
                    );

                hallLink.className =
                    'lof-hall-link';

                hallLink.href =
                    mw.util.getUrl(
                        HALL_PAGE
                    );

                hallLink.textContent =
                    'Перейти в Зал славы →';

                footer.appendChild(
                    total
                );

                footer.appendChild(
                    hallLink
                );

                section.appendChild(
                    footer
                );

                /*
                 * Проценты полного списка запускаем заранее, пока сам
                 * список ещё скрыт. При открытии окна значения обычно
                 * уже готовы и не появляются с заметной подгрузкой.
                 */
                applyAchievementPrevalenceToRoot(
                    catalog,
                    section
                );

                /*
                 * TEST 1.12.0:
                 * компактная витрина достижений находится в основной
                 * области профиля. Полный список по-прежнему открывается
                 * через «Все достижения». Штатный right rail Fandom
                 * остаётся полностью самостоятельным.
                 */
                mountProfileAchievementsRail(
                    catalog,
                    root,
                    resolvedUser.name,
                    resolvedUser.userid,
                    scoreInfo,
                    groupList,
                    visibleCount,
                    section,
                    rankBanner,
                    viewerAchievementMap
                );
            });
        }).catch(function (error) {
            removeProfileAchievementsLoading();
            console.warn(
                '[Lofarian Achievements] Не удалось определить владельца профиля:',
                username,
                error
            );
        });
    }


    I.registerFunctions('UI/Profile', {
        getManualAchievementsHeading: getManualAchievementsHeading,
        hideManualAchievementsSection: hideManualAchievementsSection,
        removeProfileAchievementsOverlay: removeProfileAchievementsOverlay,
        restoreNativeAchievementsModules: restoreNativeAchievementsModules,
        restoreFandomRightRailUtilities: restoreFandomRightRailUtilities,
        restoreFandomProfileRightRail: restoreFandomProfileRightRail,
        restoreProfileHeaderActions: restoreProfileHeaderActions,
        moveProfileActionsBelowAchievements: moveProfileActionsBelowAchievements,
        removeProfileAchievementsRail: removeProfileAchievementsRail,
        normalizeRailText: normalizeRailText,
        looksLikeNativeFandomAchievements: looksLikeNativeFandomAchievements,
        findNativeFandomAchievementModules: findNativeFandomAchievementModules,
        isUsableBackgroundColor: isUsableBackgroundColor,
        captureNativeRailAppearance: captureNativeRailAppearance,
        hideNativeFandomAchievementModules: hideNativeFandomAchievementModules,
        getProfileRightRailWrapper: getProfileRightRailWrapper,
        looksLikeRailToggle: looksLikeRailToggle,
        suppressNativeRailToggle: suppressNativeRailToggle,
        isFandomRightRailUtilityControl: isFandomRightRailUtilityControl,
        keepFandomRightRailExpanded: keepFandomRightRailExpanded,
        flattenProfileAchievementGroups: flattenProfileAchievementGroups,
        getProfileAchievementsDeepLink: getProfileAchievementsDeepLink,
        openProfileAchievementsDialog: openProfileAchievementsDialog,
        mountProfileAchievementsRail: mountProfileAchievementsRail,
        renderProfileAchievements: renderProfileAchievements
    }, ["applyAchievementPrevalenceToRoot", "applyResolvedImageToElement", "buildEffectiveAchievementMap", "buildHiddenConditionNoise", "getHiddenUnlockedDescription", "buildMetaAchievementFacts", "buildProfileProgressContext", "buildRarityPreviewPane", "calculateScore", "collectProfileUnearnedTargets", "countLogicalEarnedAchievements", "getAchievementStepStats", "createEmptyDiscussionStats", "escapeHtml", "formatCatalogInteger", "formatPoints", "getAchievement", "getAchievementBaseTitle", "getAchievementCategoryTitle", "getAchievementCollectorState", "getLogicalRarityAchievementCounts", "getAchievementPoints", "getAchievementProgressInfo", "getAchievementTierLabel", "getAchievementVisualCategory", "getCurrentUserId", "getCurrentViewerEffectiveAchievementMap", "getEditorStatsForUser", "getLeaderboardRowsCached", "getLocalWikiPresenceStartUnix", "getProgressForUser", "getParticipationStartedAt", "getRarityInfo", "getUserAchievementMap", "loadProfileUnreadAchievementMap", "markProfileAchievementViewed", "nowUnix", "openAchievementDetailsModal", "renderAchievementDetailsInline", "readUserSegment", "resolveAchievementImage", "resolveUser", "syncOwnHallRankAwardTimes", "viewerKnowsHiddenAchievement", "setRarityLabel"]);
})(window);