/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.5 HALL WIKITEXT + INLINE DETAILS
Страница Fandom: MediaWiki:LofarianAchievements/UI/HallOfFame.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Отображает Project:Зал славы, позиции, очки и редчайшие достижения на основе Services/Leaderboard.

ДАННЫЕ / I/O
Отрисовка выполняется в DOM; исходные данные читаются локальными сервисами.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Рисует только содержимое собственной страницы Project:Зал славы и связанные всплывающие элементы. Не меняет глобальную навигацию Fandom и не скрывает рекламу.

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

- RC11.5 использует тот же inline-блок подробностей для списка достижений пользователя; поясняющий текст самого Зала славы вынесен в обычный wikitext страницы.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC11.2 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/HallOfFame'); }
    var ACHIEVEMENTS_PAGE = 'Летопись Лофариана Вики:Достижения';
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var LEADERBOARD_PAGE_SIZE = C.LEADERBOARD_PAGE_SIZE;

    var hallRarestTooltipNode = null;
    function applyResolvedImageToElement() { return I.invoke('applyResolvedImageToElement', arguments); }
    function openAchievementDetailsModal() { return I.invoke('openAchievementDetailsModal', arguments); }
    function renderAchievementDetailsInline() { return I.invoke('renderAchievementDetailsInline', arguments); }
    function buildHiddenConditionNoise() { return I.invoke('buildHiddenConditionNoise', arguments); }
    function getHiddenUnlockedDescription() { return I.invoke('getHiddenUnlockedDescription', arguments); }
    function buildMetaAchievementFacts() { return I.invoke('buildMetaAchievementFacts', arguments); }
    function calculateScore() { return I.invoke('calculateScore', arguments); }
    function collectProfileUnearnedTargets() { return I.invoke('collectProfileUnearnedTargets', arguments); }
    function countLogicalEarnedAchievements() { return I.invoke('countLogicalEarnedAchievements', arguments); }
    function getAchievementStepStats() { return I.invoke('getAchievementStepStats', arguments); }
    function createEmptyDiscussionStats() { return I.invoke('createEmptyDiscussionStats', arguments); }
    function escapeHtml() { return I.invoke('escapeHtml', arguments); }
    function formatAchievementDate() { return I.invoke('formatAchievementDate', arguments); }
    function formatCatalogInteger() { return I.invoke('formatCatalogInteger', arguments); }
    function formatPlayersCount() { return I.invoke('formatPlayersCount', arguments); }
    function formatPoints() { return I.invoke('formatPoints', arguments); }
    function getAchievement() { return I.invoke('getAchievement', arguments); }
    function getAchievementBaseTitle() { return I.invoke('getAchievementBaseTitle', arguments); }
    function getAchievementCategoryTitle() { return I.invoke('getAchievementCategoryTitle', arguments); }
    function getAchievementCollectorState() { return I.invoke('getAchievementCollectorState', arguments); }
    function getAchievementPoints() { return I.invoke('getAchievementPoints', arguments); }
    function getAchievementPrevalenceMap() { return I.invoke('getAchievementPrevalenceMap', arguments); }
    function getAchievementProgressInfo() { return I.invoke('getAchievementProgressInfo', arguments); }
    function getAchievementTierLabel() { return I.invoke('getAchievementTierLabel', arguments); }
    function getAchievementVisualCategory() { return I.invoke('getAchievementVisualCategory', arguments); }
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function getCurrentViewerEffectiveAchievementMap() { return I.invoke('getCurrentViewerEffectiveAchievementMap', arguments); }
    function getLeaderboardRowsCached() { return I.invoke('getLeaderboardRowsCached', arguments); }
    function getRarestEarnedAchievements() { return I.invoke('getRarestEarnedAchievements', arguments); }
    function getRarityInfo() { return I.invoke('getRarityInfo', arguments); }
    function isPlainObject() { return I.invoke('isPlainObject', arguments); }
    function openProfileAchievementsDialog() { return I.invoke('openProfileAchievementsDialog', arguments); }
    function resolveAchievementImage() { return I.invoke('resolveAchievementImage', arguments); }
    function syncOwnHallRankAwardTimes() { return I.invoke('syncOwnHallRankAwardTimes', arguments); }
    function viewerKnowsHiddenAchievement() { return I.invoke('viewerKnowsHiddenAchievement', arguments); }
    function setRarityLabel() { return I.invoke('setRarityLabel', arguments); }

    function hideHallRarestTooltip() {
        if (!hallRarestTooltipNode) {
            return;
        }

        hallRarestTooltipNode.classList.remove(
            'is-visible'
        );
    }


    function getHallRarestTooltipNode() {
        if (
            hallRarestTooltipNode &&
            document.body.contains(
                hallRarestTooltipNode
            )
        ) {
            return hallRarestTooltipNode;
        }

        hallRarestTooltipNode =
            document.createElement(
                'div'
            );

        hallRarestTooltipNode.className =
            'lof-hall-rarest-tooltip';

        hallRarestTooltipNode.setAttribute(
            'role',
            'tooltip'
        );

        document.body.appendChild(
            hallRarestTooltipNode
        );

        window.addEventListener(
            'scroll',
            hideHallRarestTooltip,
            true
        );

        window.addEventListener(
            'resize',
            hideHallRarestTooltip
        );

        return hallRarestTooltipNode;
    }


    function positionHallRarestTooltip(
        tooltip,
        anchor
    ) {
        if (!tooltip || !anchor) {
            return;
        }

        var anchorRect =
            anchor.getBoundingClientRect();

        var tooltipRect =
            tooltip.getBoundingClientRect();

        var gap = 10;
        var viewportPadding = 10;

        var left =
            anchorRect.right + gap;

        if (
            left + tooltipRect.width >
            window.innerWidth - viewportPadding
        ) {
            left =
                anchorRect.left -
                tooltipRect.width -
                gap;
        }

        left =
            Math.max(
                viewportPadding,
                Math.min(
                    left,
                    window.innerWidth -
                        tooltipRect.width -
                        viewportPadding
                )
            );

        var top =
            anchorRect.top +
            (
                anchorRect.height -
                tooltipRect.height
            ) / 2;

        top =
            Math.max(
                viewportPadding,
                Math.min(
                    top,
                    window.innerHeight -
                        tooltipRect.height -
                        viewportPadding
                )
            );

        tooltip.style.left =
            Math.round(left) + 'px';

        tooltip.style.top =
            Math.round(top) + 'px';
    }


    function showHallRarestTooltip(
        anchor,
        data
    ) {
        if (!anchor || !data) {
            return;
        }

        var tooltip =
            getHallRarestTooltipNode();

        var rarityKey =
            String(
                data.rarityKey ||
                'common'
            );

        tooltip.setAttribute(
            'data-rarity',
            rarityKey
        );

        tooltip.innerHTML =
            '<div class="lof-hall-rarest-tooltip-title">' +
                escapeHtml(
                    data.title || 'Достижение'
                ) +
            '</div>' +
            '<div class="lof-hall-rarest-tooltip-meta">' +
                (
                    data.rarity
                        ? '<span class="lof-hall-rarest-tooltip-rarity lof-rarity-' +
                            escapeHtml(rarityKey) +
                          '">' +
                            escapeHtml(data.rarity) +
                          '</span>'
                        : ''
                ) +
                (
                    Number(data.points) > 0
                        ? '<span class="lof-hall-rarest-tooltip-points">+' +
                            escapeHtml(
                                formatPoints(
                                    Number(data.points)
                                )
                            ) +
                            ' опыта</span>'
                        : ''
                ) +
            '</div>' +
            '<div class="lof-hall-rarest-tooltip-stat">' +
                'Получили: <strong>' +
                    escapeHtml(
                        formatPlayersCount(
                            Number(data.count) || 0
                        )
                    ) +
                '</strong> из ' +
                escapeHtml(
                    String(
                        Number(data.total) || 0
                    )
                ) +
                (
                    data.formatted
                        ? ' · ' +
                            escapeHtml(data.formatted)
                        : ''
                ) +
            '</div>' +
            (
                data.earned
                    ? '<div class="lof-hall-rarest-tooltip-date">' +
                        'Получено: ' +
                        escapeHtml(data.earned) +
                      '</div>'
                    : ''
            ) +
            (
                data.owner
                    ? '<div class="lof-hall-rarest-tooltip-hint">' +
                        'Нажмите, чтобы открыть «Официальные достижения» ' +
                        escapeHtml(data.owner) +
                      '</div>'
                    : ''
            );

        var tooltipRarityLabel = tooltip.querySelector('.lof-hall-rarest-tooltip-rarity');
        if (tooltipRarityLabel) {
            setRarityLabel(tooltipRarityLabel, data.rarity, rarityKey);
        }

        tooltip.classList.add(
            'is-visible'
        );

        positionHallRarestTooltip(
            tooltip,
            anchor
        );
    }


    function bindHallRarestTooltip(
        anchor,
        data
    ) {
        if (!anchor) {
            return;
        }

        anchor._lofRarestTooltipData =
            data;

        anchor.removeAttribute(
            'title'
        );

        if (
            anchor.getAttribute(
                'data-lof-rich-tooltip-bound'
            ) === '1'
        ) {
            return;
        }

        anchor.setAttribute(
            'data-lof-rich-tooltip-bound',
            '1'
        );

        function show() {
            showHallRarestTooltip(
                anchor,
                anchor._lofRarestTooltipData
            );
        }

        anchor.addEventListener(
            'mouseenter',
            show
        );

        anchor.addEventListener(
            'focus',
            show
        );

        anchor.addEventListener(
            'mouseleave',
            hideHallRarestTooltip
        );

        anchor.addEventListener(
            'blur',
            hideHallRarestTooltip
        );

        anchor.addEventListener(
            'click',
            hideHallRarestTooltip
        );
    }


    function applyAchievementPrevalenceToRoot(
        catalog,
        root
    ) {
        if (!root) {
            return;
        }

        var elements =
            root.querySelectorAll(
                '[data-lof-prevalence-id]'
            );

        if (!elements.length) {
            return;
        }

        var ids = [];

        Array.prototype.forEach.call(
            elements,
            function (element) {
                var id =
                    String(
                        element.getAttribute(
                            'data-lof-prevalence-id'
                        ) || ''
                    );

                if (id) {
                    ids.push(
                        id
                    );
                }
            }
        );

        getAchievementPrevalenceMap(
            catalog,
            ids
        ).then(function (map) {
            Array.prototype.forEach.call(
                elements,
                function (element) {
                    var id =
                        String(
                            element.getAttribute(
                                'data-lof-prevalence-id'
                            ) || ''
                        );

                    var data =
                        map[id];

                    if (!data) {
                        element.textContent =
                            'Получили: —';

                        return;
                    }

                    var mode =
                        element.getAttribute(
                            'data-lof-prevalence-mode'
                        ) ||
                        '';

                    var detailed =
                        mode ===
                            'detailed';

                    var compact =
                        mode ===
                            'compact';

                    var countOnly =
                        mode ===
                            'count';

                    element.textContent =
                        'Получили: ' +
                        (
                            countOnly
                                ? formatPlayersCount(
                                    data.count
                                )
                                : compact
                                    ? String(
                                        data.count
                                    ) +
                                        '/' +
                                        String(
                                            data.total
                                        ) +
                                        ' · ' +
                                        data.formatted
                                    : data.formatted +
                                        (
                                            detailed
                                                ? ' · ' +
                                                    String(
                                                        data.count
                                                    ) +
                                                    ' из ' +
                                                    String(
                                                        data.total
                                                    ) +
                                                    ' участников'
                                                : ''
                                        )
                        );

                    var tooltipTitle =
                        element.getAttribute(
                            'data-lof-tooltip-title'
                        );

                    if (tooltipTitle) {
                        var tooltipLines = [
                            tooltipTitle
                        ];

                        var tooltipRarity =
                            element.getAttribute(
                                'data-lof-tooltip-rarity'
                            );

                        if (tooltipRarity) {
                            tooltipLines.push(
                                'Редкость: ' +
                                tooltipRarity
                            );
                        }

                        var tooltipPoints =
                            Number(
                                element.getAttribute(
                                    'data-lof-tooltip-points'
                                ) || 0
                            );

                        if (tooltipPoints > 0) {
                            tooltipLines.push(
                                'Очки опыта: +' +
                                formatPoints(
                                    tooltipPoints
                                )
                            );
                        }

                        tooltipLines.push(
                            'Получили: ' +
                            String(
                                data.count
                            ) +
                            ' из ' +
                            String(
                                data.total
                            ) +
                            ' участников (' +
                            data.formatted +
                            ')'
                        );

                        var tooltipEarned =
                            element.getAttribute(
                                'data-lof-tooltip-earned'
                            );

                        if (tooltipEarned) {
                            tooltipLines.push(
                                'Получено участником: ' +
                                tooltipEarned
                            );
                        }

                        var tooltipOwner =
                            element.getAttribute(
                                'data-lof-tooltip-owner'
                            );

                        if (tooltipOwner) {
                            tooltipLines.push(
                                'Нажмите, чтобы открыть официальные достижения ' +
                                tooltipOwner
                            );
                        }

                        var hallItem =
                            element.closest(
                                '.lof-hall-rarest-item'
                            );

                        if (hallItem) {
                            element.removeAttribute(
                                'title'
                            );

                            bindHallRarestTooltip(
                                hallItem,
                                {
                                    title:
                                        tooltipTitle,

                                    rarity:
                                        tooltipRarity || '',

                                    rarityKey:
                                        element.getAttribute(
                                            'data-lof-tooltip-rarity-key'
                                        ) || 'common',

                                    points:
                                        tooltipPoints,

                                    count:
                                        data.count,

                                    total:
                                        data.total,

                                    formatted:
                                        data.formatted,

                                    earned:
                                        tooltipEarned || '',

                                    owner:
                                        tooltipOwner || ''
                                }
                            );
                        } else {
                            element.title =
                                tooltipLines.join(
                                    '\n'
                                );
                        }
                    } else {
                        element.title =
                            String(
                                data.count
                            ) +
                            ' из ' +
                            String(
                                data.total
                            ) +
                            ' участников системы';
                    }
                }
            );
        }).catch(function (error) {
            console.warn(
                '[Lofarian Achievements] Не удалось рассчитать процент получения:',
                error
            );

            Array.prototype.forEach.call(
                elements,
                function (element) {
                    element.textContent =
                        'Получили: —';
                }
            );
        });
    }


    function isHallOfFamePage() {
        var title = String(
            mw.config.get('wgTitle') || ''
        ).trim();

        var canonicalNamespace = String(
            mw.config.get('wgCanonicalNamespace') || ''
        );

        if (
            title === 'Зал славы' &&
            (
                canonicalNamespace === 'Project' ||
                canonicalNamespace === ''
            )
        ) {
            return true;
        }

        return !!document.getElementById(
            'lof-achievements-leaderboard'
        );
    }


    function getLeaderboardRoot() {
        var existing = document.getElementById(
            'lof-achievements-leaderboard'
        );

        if (existing) {
            return existing;
        }

        var content = document.querySelector(
            '.mw-parser-output'
        );

        if (!content) {
            return null;
        }

        var root = document.createElement('div');
        root.id = 'lof-achievements-leaderboard';
        content.appendChild(root);

        return root;
    }


    function renderHallOfFame(catalog) {
        if (!isHallOfFamePage()) {
            return Promise.resolve();
        }

        var root =
            getLeaderboardRoot();

        if (!root) {
            return Promise.resolve();
        }

        root.innerHTML =
            '<div class="lof-leaderboard-loading">' +
                'Загружаем Зал славы…' +
            '</div>';

        var loadingTimer =
            setTimeout(
                function () {
                    var loading =
                        root.querySelector(
                            '.lof-leaderboard-loading'
                        );

                    if (loading) {
                        loading.textContent =
                            'Обновляем достижения и места в Зале славы…';
                    }
                },
                1800
            );

        /*
         * При лимите до 1000 активных участников первый
         * полный расчёт может быть заметно тяжелее прежнего.
         * После него результат кэшируется на 15 минут и
         * используется также для процентов достижений.
         */
        var hardTimeout =
            new Promise(function (
                resolve,
                reject
            ) {
                setTimeout(
                    function () {
                        reject(
                            new Error(
                                'MediaWiki API не успел построить рейтинг за 120 секунд.'
                            )
                        );
                    },
                    120000
                );
            });

        function formatHallRank(rank) {
            rank =
                Math.max(
                    1,
                    Math.floor(
                        Number(rank) || 1
                    )
                );

            if (rank === 1) {
                return 'I';
            }

            if (rank === 2) {
                return 'II';
            }

            if (rank === 3) {
                return 'III';
            }

            return String(rank);
        }

        function participantInitial(name) {
            name =
                String(
                    name || '?'
                ).trim();

            return (
                name.charAt(0) ||
                '?'
            ).toUpperCase();
        }


        var viewerHallAchievementMap = {};

        function buildHallOfficialAchievementsSection(
            row
        ) {
            var achievementMap =
                isPlainObject(
                    row.achievementMap
                )
                    ? row.achievementMap
                    : {};

            var scoreInfo =
                calculateScore(
                    catalog,
                    achievementMap
                );


            var hallCollectorState =
                getAchievementCollectorState(
                    catalog,
                    achievementMap
                );

            var hallCollectorProgressContext = {
                __achievementCollectorCount:
                    hallCollectorState.logicalCount,

                __discussionStats:
                    row.discussionStats ||
                    createEmptyDiscussionStats(),

                __directFacts:
                    row.directProgressFacts || {},

                __metaFacts:
                    buildMetaAchievementFacts(
                        catalog,
                        achievementMap
                    )
            };

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

            function addEntry(
                entry
            ) {
                var achievement =
                    entry.achievement;

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
                ].items.push(
                    entry
                );
            }

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

                addEntry({
                    id:
                        achievementId,

                    achievement:
                        achievement,

                    earnedAt:
                        achievementMap[
                            achievementId
                        ],

                    earned:
                        true,

                    category:
                        getAchievementVisualCategory(
                            achievementId,
                            achievement
                        ),

                    progressInfo:
                        getAchievementProgressInfo(
                            catalog,
                            achievement,
                            hallCollectorProgressContext
                        ),

                    concealCondition:
                        false,

                    isNew:
                        false
                });

                visibleCount++;
            });

            visibleCount =
                countLogicalEarnedAchievements(
                    catalog,
                    achievementMap
                );

            collectProfileUnearnedTargets(
                catalog,
                achievementMap,
                hallCollectorProgressContext
            ).forEach(
                addEntry
            );

            Object.keys(
                groups
            )
            .map(function (key) {
                return groups[
                    key
                ];
            })
            .sort(function (a, b) {
                return (
                    b.rarity.order -
                    a.rarity.order
                );
            })
            .forEach(function (group) {
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

                        if (achievement.family) {
                            card.setAttribute(
                                'data-lof-family',
                                String(achievement.family)
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
                            'data-lof-title',
                            (
                                entry.earned === false &&
                                achievement.concealTitle === true &&
                                achievement.hidden !== true
                            )
                                ? 'Скрытое достижение'
                                : achievement.title
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
                                viewerHallAchievementMap,
                                entry.id
                            );

                        var visibleHallBaseTitle =
                            concealCondition &&
                            entry.earned === false &&
                            achievement.concealTitle === true &&
                            achievement.hidden !== true
                                ? 'Скрытое достижение'
                                : getAchievementBaseTitle(
                                    achievement
                                );

                        textBlock.innerHTML =
                            '<div class="lof-profile-achievement-name-row">' +
                                '<div class="lof-profile-achievement-name">' +
                                    escapeHtml(
                                        visibleHallBaseTitle
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

                        var fullRarityLabel = textBlock.querySelector('.lof-profile-achievement-rarity');
                        if (fullRarityLabel) {
                            setRarityLabel(fullRarityLabel, rarity.title, rarity.key);
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

                        function openHallCardDetails() {
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
                                title: visibleHallBaseTitle + (fullTierLabel ? ' ' + fullTierLabel : ''),
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

                            /* RC11.6: компактные подробности поверх списка, без прыжка прокрутки. */
                            detailData.compact = true;
                            openAchievementDetailsModal(catalog, achievement, detailData);
                        }

                        card.setAttribute('role', 'button');
                        card.setAttribute('tabindex', '0');
                        card.setAttribute('aria-label', 'Подробнее о достижении «' + visibleHallBaseTitle + '»');
                        card.addEventListener('click', openHallCardDetails);
                        card.addEventListener('keydown', function (event) {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                openHallCardDetails();
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
            });

            var footer =
                document.createElement(
                    'div'
                );

            footer.className =
                'lof-profile-score-footer';

            footer.innerHTML =
                '<div class="lof-profile-score-total">' +
                    'Очки достижений: <strong>' +
                    escapeHtml(
                        formatPoints(
                            scoreInfo.score
                        )
                    ) +
                    '</strong>' +
                '</div>';

            section.appendChild(
                footer
            );

            return {
                section:
                    section,

                scoreInfo:
                    scoreInfo,

                visibleCount:
                    visibleCount
            };
        }


        function openHallOfficialAchievements(
            row,
            targetAchievementId
        ) {
            var built =
                buildHallOfficialAchievementsSection(
                    row
                );

            openProfileAchievementsDialog(
                catalog,
                row.name,
                built.scoreInfo,
                built.visibleCount,
                built.section,
                targetAchievementId ||
                    null
            );
        }


        function buildHallRarestList(
            row,
            podiumMode
        ) {
            var rarestLimit =
                Number(
                    row.rank
                ) <= 10
                    ? 5
                    : 1;

            var rarestEntries =
                getRarestEarnedAchievements(
                    catalog,
                    row.achievementMap || {},
                    rarestLimit
                );

            if (!rarestEntries.length) {
                return null;
            }

            var list =
                document.createElement(
                    'div'
                );

            list.className =
                podiumMode
                    ? 'lof-hall-rarest-list lof-hall-podium-rarest-list'
                    : 'lof-hall-rarest-list';

            rarestEntries.forEach(
                function (entry) {
                    var button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'lof-hall-rarest-item';

                    button.setAttribute(
                        'data-rarity',
                        entry.rarity.key
                    );

                    button.setAttribute(
                        'aria-label',
                        entry.achievement.title +
                        ' · ' +
                        entry.rarity.title +
                        ' · открыть в официальных достижениях ' +
                        row.name
                    );

                    var rarityFrame = document.createElement('span');
                    rarityFrame.className = 'lof-profile-rail-badge lof-hall-rarest-rarity-frame';
                    rarityFrame.setAttribute('data-rarity', entry.rarity.key);

                    var imageWrap =
                        document.createElement(
                            'span'
                        );

                    imageWrap.className =
                        'lof-hall-rarest-item-image-wrap lof-profile-rail-badge-image-wrap';
                    imageWrap.setAttribute('data-rarity', entry.rarity.key);

                    var image =
                        document.createElement(
                            'img'
                        );

                    image.className =
                        'lof-hall-rarest-item-image lof-profile-rail-badge-image';

                    image.alt =
                        '';

                    imageWrap.appendChild(
                        image
                    );
                    rarityFrame.appendChild(imageWrap);

                    var text =
                        document.createElement(
                            'span'
                        );

                    text.className =
                        'lof-hall-rarest-item-text';

                    var earnedDate =
                        formatAchievementDate(
                            row.achievementMap &&
                            row.achievementMap[
                                entry.id
                            ]
                        );

                    text.innerHTML =
                        '<span class="lof-hall-rarest-item-title">' +
                            escapeHtml(
                                entry.achievement.title
                            ) +
                        '</span>' +
                        '<span class="lof-hall-rarest-item-meta">' +
                            '<span class="lof-hall-rarest-item-rarity lof-rarity-' +
                                escapeHtml(
                                    entry.rarity.key
                                ) +
                            '">' +
                                escapeHtml(
                                    entry.rarity.title
                                ) +
                            '</span>' +
                            '<span class="lof-hall-rarest-item-prevalence" ' +
                                'data-lof-prevalence-id="' +
                                escapeHtml(
                                    entry.id
                                ) +
                                '" data-lof-prevalence-mode="count">Получили: …</span>' +
                        '</span>';

                    var rarestRarityLabel = text.querySelector('.lof-hall-rarest-item-rarity');
                    if (rarestRarityLabel) {
                        setRarityLabel(rarestRarityLabel, entry.rarity.title, entry.rarity.key);
                    }

                    var prevalence =
                        text.querySelector(
                            '.lof-hall-rarest-item-prevalence'
                        );

                    if (prevalence) {
                        prevalence.setAttribute(
                            'data-lof-tooltip-title',
                            entry.achievement.title
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-rarity',
                            entry.rarity.title
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-rarity-key',
                            entry.rarity.key
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-points',
                            String(
                                getAchievementPoints(
                                    entry.achievement
                                )
                            )
                        );

                        prevalence.setAttribute(
                            'data-lof-tooltip-owner',
                            row.name
                        );

                        if (earnedDate) {
                            prevalence.setAttribute(
                                'data-lof-tooltip-earned',
                                earnedDate
                            );
                        }
                    }

                    button.appendChild(
                        rarityFrame
                    );

                    button.appendChild(
                        text
                    );

                    button.addEventListener(
                        'click',
                        function () {
                            openHallOfficialAchievements(
                                row,
                                entry.id
                            );
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

                    list.appendChild(
                        button
                    );
                }
            );

            applyAchievementPrevalenceToRoot(
                catalog,
                list
            );

            return list;
        }


        /*
         * RC11.9.11: компактная аналитика участника для Зала славы.
         * Никакой новой серверной статистики не требуется — используем уже
         * рассчитанный achievementMap строки рейтинга.
         */
        function getHallBestChainEntry(row) {
            var best = null;

            Object.keys(row.achievementMap || {}).forEach(function (achievementId) {
                var achievement = getAchievement(catalog, achievementId);

                if (!achievement || !achievement.family) {
                    return;
                }

                var tier = Number(achievement.tier || 0);

                if (!best || tier > best.tier) {
                    best = {
                        id: achievementId,
                        achievement: achievement,
                        tier: tier,
                        rarity: getRarityInfo(catalog, achievement)
                    };
                }
            });

            return best;
        }

        function getHallMostExpensiveEntries(row, limit) {
            var entries = [];

            Object.keys(row.achievementMap || {}).forEach(function (achievementId) {
                var achievement = getAchievement(catalog, achievementId);

                if (!achievement) {
                    return;
                }

                entries.push({
                    id: achievementId,
                    achievement: achievement,
                    points: getAchievementPoints(achievement),
                    rarity: getRarityInfo(catalog, achievement)
                });
            });

            entries.sort(function (a, b) {
                if (b.points !== a.points) {
                    return b.points - a.points;
                }

                var rarityDifference =
                    Number(b.rarity && b.rarity.order || 0) -
                    Number(a.rarity && a.rarity.order || 0);

                if (rarityDifference) {
                    return rarityDifference;
                }

                return String(a.achievement.title || '').localeCompare(
                    String(b.achievement.title || ''),
                    'ru'
                );
            });

            return entries.slice(0, Math.max(1, Number(limit) || 1));
        }

        function getHallMostExpensiveEntry(row) {
            var entries = getHallMostExpensiveEntries(row, 1);
            return entries.length ? entries[0] : null;
        }

        function getHallCurrentChainEntries(row) {
            var families = {};

            Object.keys(row.achievementMap || {}).forEach(function (achievementId) {
                var achievement = getAchievement(catalog, achievementId);

                if (!achievement || !achievement.family) {
                    return;
                }

                var familyKey = String(achievement.family);
                var tier = Number(achievement.tier || 0);
                var current = families[familyKey];

                if (!current || tier > current.tier) {
                    families[familyKey] = {
                        id: achievementId,
                        achievement: achievement,
                        tier: tier,
                        rarity: getRarityInfo(catalog, achievement)
                    };
                }
            });

            return Object.keys(families)
                .map(function (key) { return families[key]; })
                .sort(function (a, b) {
                    if (b.tier !== a.tier) {
                        return b.tier - a.tier;
                    }

                    return String(a.achievement.title || '').localeCompare(
                        String(b.achievement.title || ''),
                        'ru'
                    );
                });
        }

        function getHallCrownEntry(row) {
            var entries = getRarestEarnedAchievements(
                catalog,
                row.achievementMap || {},
                1
            );

            return entries.length ? entries[0] : null;
        }

        var hallParticipantPopover = null;

        function closeHallParticipantPopover() {
            if (hallParticipantPopover && hallParticipantPopover.parentNode) {
                hallParticipantPopover.parentNode.removeChild(hallParticipantPopover);
            }

            hallParticipantPopover = null;
        }

        function positionHallParticipantPopover(popover, anchorNode) {
            if (!popover || !anchorNode || !anchorNode.getBoundingClientRect) {
                return;
            }

            var rect = anchorNode.getBoundingClientRect();
            var width = Math.min(360, Math.max(280, window.innerWidth - 28));
            var left = Math.min(
                window.innerWidth - width - 14,
                Math.max(14, rect.left)
            );
            var top = rect.bottom + 8;

            popover.style.width = width + 'px';
            popover.style.left = left + 'px';
            popover.style.top = top + 'px';

            requestAnimationFrame(function () {
                if (!popover || !popover.getBoundingClientRect) {
                    return;
                }

                var popRect = popover.getBoundingClientRect();

                if (popRect.bottom > window.innerHeight - 12) {
                    var above = rect.top - popRect.height - 8;
                    popover.style.top = Math.max(12, above) + 'px';
                }
            });
        }

        function openHallParticipantPopover(row, anchorNode) {
            closeHallParticipantPopover();

            var crown = getHallCrownEntry(row);
            var expensive = getHallMostExpensiveEntry(row);
            var chain = getHallBestChainEntry(row);
            var nextRow = Number(row.rank) > 1 ? rows[Number(row.rank) - 2] : null;
            var toNext = nextRow
                ? Math.max(0, Number(nextRow.score || 0) - Number(row.score || 0) + 1)
                : 0;

            var popover = document.createElement('section');
            popover.className = 'lof-hall-person-popover';
            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-label', 'Сводка участника ' + row.name);

            var crownTitle = crown && crown.achievement
                ? crown.achievement.title
                : '—';
            var crownRarity = crown && crown.rarity
                ? crown.rarity.title
                : 'Нет данных';
            var chainTitle = chain && chain.achievement
                ? chain.achievement.title
                : 'Нет активной цепочки';
            var expensiveTitle = expensive && expensive.achievement
                ? expensive.achievement.title
                : '—';

            popover.innerHTML =
                '<div class="lof-hall-person-popover-head">' +
                    '<div>' +
                        '<small>Место #' + escapeHtml(String(row.rank)) + '</small>' +
                        '<strong>' + escapeHtml(row.name) + '</strong>' +
                    '</div>' +
                    '<button type="button" class="lof-hall-person-popover-close" aria-label="Закрыть">×</button>' +
                '</div>' +
                '<div class="lof-hall-person-popover-stats">' +
                    '<button type="button" class="lof-hall-person-popover-stat is-clickable" data-action="xp" title="Показать самые дорогие полученные достижения">' +
                        '<span>Опыт</span><strong>' + escapeHtml(formatPoints(row.score)) + '</strong>' +
                    '</button>' +
                    '<button type="button" class="lof-hall-person-popover-stat is-clickable" data-action="achievements" title="Открыть коллекцию достижений">' +
                        '<span>Достижения</span><strong>' + escapeHtml(String(row.count)) + '</strong>' +
                    '</button>' +
                    '<div class="lof-hall-person-popover-stat is-static" title="Каждая достигнутая ступень считается отдельно">' +
                        '<span>Рубежи</span><strong>' +
                            escapeHtml(formatCatalogInteger(row.stepStats && row.stepStats.earned || 0)) +
                            ' / ' +
                            escapeHtml(formatCatalogInteger(systemStepStats.total || 0)) +
                        '</strong>' +
                    '</div>' +
                    (nextRow
                        ? '<button type="button" class="lof-hall-person-popover-stat is-clickable" data-action="above" title="Открыть сводку участника на место выше"><span>До места выше</span><strong>' + escapeHtml(formatPoints(toNext)) + '</strong></button>'
                        : '<div class="lof-hall-person-popover-stat is-static"><span>До места выше</span><strong>Лидер</strong></div>') +
                '</div>' +
                (crown
                    ? '<button type="button" class="lof-hall-person-popover-feature is-clickable" data-action="crown" title="Открыть корону коллекции">' +
                        '<span>Корона коллекции</span>' +
                        '<strong>' + escapeHtml(crownTitle) + '</strong>' +
                        '<small>' + escapeHtml(crownRarity) + '</small>' +
                      '</button>'
                    : '<div class="lof-hall-person-popover-feature is-static"><span>Корона коллекции</span><strong>—</strong><small>Нет данных</small></div>') +
                '<div class="lof-hall-person-popover-lines">' +
                    (expensive
                        ? '<button type="button" class="lof-hall-person-popover-line is-clickable" data-action="expensive" title="Открыть самое дорогое достижение"><span>Самая дорогая</span><strong>' + escapeHtml(expensiveTitle) + '</strong></button>'
                        : '<div class="lof-hall-person-popover-line is-static"><span>Самая дорогая</span><strong>—</strong></div>') +
                    (chain
                        ? '<button type="button" class="lof-hall-person-popover-line is-clickable" data-action="chains" title="Показать текущие цепочки">' +
                            '<span>Лучшая цепочка</span><strong>' + escapeHtml(chainTitle) + '</strong>' +
                          '</button>'
                        : '<div class="lof-hall-person-popover-line is-static"><span>Лучшая цепочка</span><strong>Нет активной цепочки</strong></div>') +
                '</div>' +
                '<div class="lof-hall-person-popover-drilldown" hidden></div>' +
                '<div class="lof-hall-person-popover-actions">' +
                    '<button type="button" data-action="collection">Коллекция</button>' +
                    '<a href="' + escapeHtml(mw.util.getUrl('User:' + row.name)) + '">Профиль</a>' +
                '</div>';

            var rarityKey = crown && crown.rarity ? crown.rarity.key : '';
            if (rarityKey) {
                popover.setAttribute('data-rarity', rarityKey);
            }

            document.body.appendChild(popover);
            hallParticipantPopover = popover;
            positionHallParticipantPopover(popover, anchorNode);

            var close = popover.querySelector('.lof-hall-person-popover-close');
            if (close) {
                close.addEventListener('click', closeHallParticipantPopover);
            }

            var collection = popover.querySelector('[data-action="collection"]');
            if (collection) {
                collection.addEventListener('click', function () {
                    closeHallParticipantPopover();
                    openHallOfficialAchievements(row);
                });
            }

            var achievementsStat = popover.querySelector('[data-action="achievements"]');
            if (achievementsStat) {
                achievementsStat.addEventListener('click', function () {
                    closeHallParticipantPopover();
                    openHallOfficialAchievements(row);
                });
            }

            var crownButton = popover.querySelector('[data-action="crown"]');
            if (crownButton && crown) {
                crownButton.addEventListener('click', function () {
                    closeHallParticipantPopover();
                    openHallOfficialAchievements(row, crown.id);
                });
            }

            var expensiveButton = popover.querySelector('[data-action="expensive"]');
            if (expensiveButton && expensive) {
                expensiveButton.addEventListener('click', function () {
                    closeHallParticipantPopover();
                    openHallOfficialAchievements(row, expensive.id);
                });
            }

            var aboveButton = popover.querySelector('[data-action="above"]');
            if (aboveButton && nextRow) {
                aboveButton.addEventListener('click', function () {
                    closeHallParticipantPopover();
                    openHallParticipantPopover(nextRow, anchorNode);
                });
            }

            var drilldown = popover.querySelector('.lof-hall-person-popover-drilldown');

            function renderHallPopoverDrilldown(mode) {
                if (!drilldown) {
                    return;
                }

                var items = mode === 'xp'
                    ? getHallMostExpensiveEntries(row, 5)
                    : getHallCurrentChainEntries(row);

                var heading = mode === 'xp'
                    ? 'Самые дорогие полученные'
                    : 'Текущие цепочки';

                drilldown.innerHTML =
                    '<div class="lof-hall-person-popover-drilldown-head">' +
                        '<strong>' + escapeHtml(heading) + '</strong>' +
                        '<button type="button" aria-label="Скрыть список">×</button>' +
                    '</div>' +
                    '<div class="lof-hall-person-popover-drilldown-list"></div>';

                var list = drilldown.querySelector('.lof-hall-person-popover-drilldown-list');

                if (!items.length) {
                    list.innerHTML = '<div class="lof-hall-person-popover-drilldown-empty">Пока нет данных.</div>';
                } else {
                    items.forEach(function (entry) {
                        var item = document.createElement('button');
                        item.type = 'button';
                        item.className = 'lof-hall-person-popover-drilldown-item';
                        item.setAttribute(
                            'data-rarity',
                            entry.rarity && entry.rarity.key || 'common'
                        );

                        var meta = mode === 'xp'
                            ? ('+' + formatPoints(entry.points))
                            : ('Ступень ' + (getAchievementTierLabel(entry.achievement) || entry.tier || '—'));

                        item.innerHTML =
                            '<span>' + escapeHtml(getAchievementBaseTitle(entry.achievement)) + '</span>' +
                            '<strong>' + escapeHtml(meta) + '</strong>';

                        item.addEventListener('click', function () {
                            closeHallParticipantPopover();
                            openHallOfficialAchievements(row, entry.id);
                        });

                        list.appendChild(item);
                    });
                }

                drilldown.hidden = false;
                popover.querySelectorAll('[data-action="xp"], [data-action="chains"]').forEach(function (button) {
                    button.classList.toggle('is-active', button.getAttribute('data-action') === mode);
                });

                var hide = drilldown.querySelector('.lof-hall-person-popover-drilldown-head button');
                if (hide) {
                    hide.addEventListener('click', function () {
                        drilldown.hidden = true;
                        popover.querySelectorAll('[data-action="xp"], [data-action="chains"]').forEach(function (button) {
                            button.classList.remove('is-active');
                        });
                    });
                }

                requestAnimationFrame(function () {
                    positionHallParticipantPopover(popover, anchorNode);
                });
            }

            var xpStat = popover.querySelector('[data-action="xp"]');
            if (xpStat) {
                xpStat.addEventListener('click', function () {
                    renderHallPopoverDrilldown('xp');
                });
            }

            var chainsLine = popover.querySelector('[data-action="chains"]');
            if (chainsLine) {
                chainsLine.addEventListener('click', function () {
                    renderHallPopoverDrilldown('chains');
                });
            }

            setTimeout(function () {
                function outside(event) {
                    if (
                        hallParticipantPopover === popover &&
                        !popover.contains(event.target) &&
                        (!anchorNode || !anchorNode.contains(event.target))
                    ) {
                        closeHallParticipantPopover();
                        document.removeEventListener('mousedown', outside, true);
                    }
                }

                document.addEventListener('mousedown', outside, true);
            }, 0);

            return popover;
        }


        function buildPodiumCard(
            row,
            currentId
        ) {
            var card =
                document.createElement(
                    'div'
                );

            card.className =
                'lof-hall-podium-card';

            card.setAttribute(
                'data-rank',
                String(
                    row.rank
                )
            );

            var medal =
                document.createElement(
                    'div'
                );

            medal.className =
                'lof-hall-podium-medal';

            medal.textContent =
                formatHallRank(
                    row.rank
                );

            var avatar =
                document.createElement(
                    'button'
                );

            avatar.type = 'button';
            avatar.className =
                'lof-hall-podium-avatar lof-hall-person-trigger';

            avatar.textContent =
                participantInitial(
                    row.name
                );

            avatar.title = 'Краткая сводка участника';
            avatar.addEventListener('click', function () {
                openHallParticipantPopover(row, avatar);
            });

            var user =
                document.createElement(
                    'a'
                );

            user.className =
                'lof-hall-podium-user';

            user.href =
                mw.util.getUrl(
                    'User:' +
                    row.name
                );

            user.textContent =
                row.name;

            if (
                row.userId ===
                currentId
            ) {
                var badge =
                    document.createElement(
                        'span'
                    );

                badge.className =
                    'lof-hall-current-badge';

                badge.textContent =
                    'Вы';

                user.appendChild(
                    badge
                );
            }

            var score =
                document.createElement(
                    'div'
                );

            score.className =
                'lof-hall-podium-score';

            score.textContent =
                formatPoints(
                    row.score
                ) +
                ' очков';

            var count =
                document.createElement(
                    'div'
                );

            count.className =
                'lof-hall-podium-count';

            count.textContent =
                String(
                    row.count
                ) +
                ' достижений';

            card.appendChild(
                medal
            );

            card.appendChild(
                avatar
            );

            card.appendChild(
                user
            );

            card.appendChild(
                score
            );

            card.appendChild(
                count
            );

            var podiumRarestList =
                buildHallRarestList(
                    row,
                    true
                );

            if (podiumRarestList) {
                card.appendChild(
                    podiumRarestList
                );
            }

            var achievementsButton =
                document.createElement(
                    'button'
                );

            achievementsButton.type =
                'button';

            achievementsButton.className =
                'lof-hall-achievements-button';

            achievementsButton.textContent =
                'Все достижения';

            achievementsButton.addEventListener(
                'click',
                function () {
                    openHallOfficialAchievements(
                        row
                    );
                }
            );

            card.appendChild(
                achievementsButton
            );

            return card;
        }

        return Promise.all([
            Promise.race([
                getLeaderboardRowsCached(
                    catalog,
                    false
                ),
                hardTimeout
            ]),
            getCurrentViewerEffectiveAchievementMap(catalog)
        ]).then(function (hallResults) {
            var rows = hallResults[0];
            viewerHallAchievementMap = hallResults[1] || {};
            clearTimeout(
                loadingTimer
            );

            root.innerHTML =
                '';

            if (!rows.length) {
                root.innerHTML =
                    '<div class="lof-leaderboard-empty">' +
                        'В Зале славы пока никого нет.' +
                    '</div>';

                return rows;
            }

            var currentId =
                getCurrentUserId();

            var currentRow =
                null;

            rows.some(function (row) {
                if (
                    row.userId ===
                    currentId
                ) {
                    currentRow =
                        row;

                    return true;
                }

                return false;
            });

            if (
                currentRow &&
                Number(
                    currentRow.userId
                ) ===
                Number(
                    getCurrentUserId()
                )
            ) {
                syncOwnHallRankAwardTimes(
                    {
                        userid:
                            currentRow.userId,

                        name:
                            currentRow.name
                    },
                    currentRow.rank,
                    0
                );
            }

            var systemStepStats =
                getAchievementStepStats(
                    catalog,
                    {}
                ) || {
                    total: 0,
                    earned: 0,
                    percent: 0
                };

            var totalPoints = 0;
            var totalAchievements = 0;

            rows.forEach(function (row) {
                row.stepStats = getAchievementStepStats(
                    catalog,
                    isPlainObject(row.achievementMap)
                        ? row.achievementMap
                        : {}
                );
                totalPoints +=
                    Number(
                        row.score
                    ) || 0;

                totalAchievements +=
                    Number(
                        row.count
                    ) || 0;
            });

            var shell =
                document.createElement(
                    'div'
                );

            shell.className =
                'lof-hall-shell';

            /*
             * Верхняя сводка.
             */
            var hero =
                document.createElement(
                    'section'
                );

            hero.className =
                'lof-hall-hero';

            hero.innerHTML =
                '<div class="lof-hall-kicker">Летопись Лофариана</div>' +
                '<h2 class="lof-hall-heading">Зал славы</h2>';

            var stats =
                document.createElement(
                    'div'
                );

            stats.className =
                'lof-hall-stats';

            var statsData = [
                {
                    label:
                        'Участников',

                    value:
                        formatCatalogInteger(
                            rows.length
                        )
                },
                {
                    label:
                        'Всего очков',

                    value:
                        formatPoints(
                            totalPoints
                        )
                },
                {
                    label:
                        'Получено достижений',

                    value:
                        formatCatalogInteger(
                            totalAchievements
                        )
                },
                {
                    label:
                        'Рубежей системы',

                    value:
                        formatCatalogInteger(
                            systemStepStats.total || 0
                        )
                },
                {
                    label:
                        'Ваше место',

                    value:
                        currentRow
                            ? '#' +
                                String(
                                    currentRow.rank
                                )
                            : '—'
                }
            ];

            statsData.forEach(
                function (item) {
                    var stat =
                        document.createElement(
                            'div'
                        );

                    stat.className =
                        'lof-hall-stat';

                    stat.innerHTML =
                        '<span class="lof-hall-stat-label">' +
                            escapeHtml(
                                item.label
                            ) +
                        '</span>' +
                        '<span class="lof-hall-stat-value">' +
                            escapeHtml(
                                item.value
                            ) +
                        '</span>';

                    stats.appendChild(
                        stat
                    );
                }
            );

            hero.appendChild(
                stats
            );

            shell.appendChild(
                hero
            );

            /*
             * RC11.9.11 — личная позиция всегда видна отдельно от таблицы.
             * Пользователю не нужно искать себя среди сотен строк.
             */
            if (currentRow) {
                var ownPlace = document.createElement('section');
                ownPlace.className = 'lof-hall-own-place';

                var rowAbove = Number(currentRow.rank) > 1
                    ? rows[Number(currentRow.rank) - 2]
                    : null;
                var pointsToAbove = rowAbove
                    ? Math.max(0, Number(rowAbove.score || 0) - Number(currentRow.score || 0) + 1)
                    : 0;

                var ownStepEarned = Number(currentRow.stepStats && currentRow.stepStats.earned || 0);
                var ownStepTotal = Number(systemStepStats.total || 0);
                var ownStepPercent = ownStepTotal > 0
                    ? Math.max(0, Math.min(100, Math.round((ownStepEarned / ownStepTotal) * 1000) / 10))
                    : 0;

                ownPlace.innerHTML =
                    '<div class="lof-hall-own-place-rank">' +
                        '<small>Ваше место</small>' +
                        '<strong>#' + escapeHtml(String(currentRow.rank)) + '</strong>' +
                    '</div>' +
                    '<div class="lof-hall-own-place-main">' +
                        '<div class="lof-hall-own-place-heading">' +
                            '<strong>' + escapeHtml(currentRow.name) + '</strong>' +
                            '<small>' +
                                escapeHtml(
                                    currentRow.rank === 1
                                        ? 'Вы возглавляете Зал славы.'
                                        : pointsToAbove + ' очк. до следующего места'
                                ) +
                            '</small>' +
                        '</div>' +
                        '<div class="lof-hall-own-place-metrics">' +
                            '<div class="lof-hall-own-place-metric">' +
                                '<span>Опыт</span>' +
                                '<strong>' + escapeHtml(formatPoints(currentRow.score)) + '</strong>' +
                                '<small>очков</small>' +
                            '</div>' +
                            '<div class="lof-hall-own-place-metric">' +
                                '<span>Коллекция</span>' +
                                '<strong>' + escapeHtml(String(currentRow.count)) + '</strong>' +
                                '<small>достижений</small>' +
                            '</div>' +
                            '<div class="lof-hall-own-place-metric is-steps">' +
                                '<span>Ступени Летописи</span>' +
                                '<strong>' + escapeHtml(formatCatalogInteger(ownStepEarned)) + ' / ' +
                                    escapeHtml(formatCatalogInteger(ownStepTotal)) + '</strong>' +
                                '<small>' + escapeHtml(String(ownStepPercent).replace('.', ',')) + '% пройдено</small>' +
                                '<div class="lof-hall-own-place-step-track" aria-hidden="true"><i style="width:' +
                                    escapeHtml(String(ownStepPercent)) + '%"></i></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lof-hall-own-place-actions">' +
                        '<button type="button" data-hall-action="nearby"><span>Окружение</span><small>Рядом со мной</small></button>' +
                        '<button type="button" data-hall-action="collection"><span>Профиль</span><small>Моя коллекция</small></button>' +
                    '</div>';

                ownPlace.querySelector('[data-hall-action="nearby"]').addEventListener(
                    'click',
                    function () {
                        showNearbyCurrent();
                    }
                );

                ownPlace.querySelector('[data-hall-action="collection"]').addEventListener(
                    'click',
                    function () {
                        openHallOfficialAchievements(currentRow);
                    }
                );

                shell.appendChild(ownPlace);
            }

            /*
             * Пьедестал первых трёх.
             * Визуально: II | I | III.
             */
            var topThree =
                rows.slice(
                    0,
                    3
                );

            if (topThree.length) {
                var podium =
                    document.createElement(
                        'section'
                    );

                podium.className =
                    'lof-hall-podium';

                var podiumOrder =
                    topThree.length >= 3
                        ? [
                            topThree[1],
                            topThree[0],
                            topThree[2]
                        ]
                        : topThree;

                podiumOrder.forEach(
                    function (row) {
                        if (!row) {
                            return;
                        }

                        podium.appendChild(
                            buildPodiumCard(
                                row,
                                currentId
                            )
                        );
                    }
                );

                shell.appendChild(
                    podium
                );
            }

            /*
             * RC11.9.11 — «Рекорды Летописи». Это не отдельный рейтинг,
             * а компактная сводка рекордсменов по уже загруженным данным.
             */
            var mostAchievementsRow = rows.slice().sort(function (a, b) {
                return Number(b.count || 0) - Number(a.count || 0) || Number(a.rank || 0) - Number(b.rank || 0);
            })[0] || null;

            var mostStepsRow = rows.slice().sort(function (a, b) {
                return Number(b.stepStats && b.stepStats.earned || 0) -
                    Number(a.stepStats && a.stepStats.earned || 0) ||
                    Number(a.rank || 0) - Number(b.rank || 0);
            })[0] || null;

            var rarestRecord = null;
            var bestChainRecord = null;

            rows.forEach(function (recordRow) {
                var crownEntry = getHallCrownEntry(recordRow);
                if (crownEntry) {
                    var crownOrder = Number(crownEntry.rarity && crownEntry.rarity.order || 0);
                    var crownPoints = getAchievementPoints(crownEntry.achievement);

                    if (
                        !rarestRecord ||
                        crownOrder > rarestRecord.order ||
                        (crownOrder === rarestRecord.order && crownPoints > rarestRecord.points)
                    ) {
                        rarestRecord = {
                            row: recordRow,
                            entry: crownEntry,
                            order: crownOrder,
                            points: crownPoints
                        };
                    }
                }

                var chainEntry = getHallBestChainEntry(recordRow);
                if (
                    chainEntry &&
                    (!bestChainRecord || Number(chainEntry.tier || 0) > Number(bestChainRecord.entry.tier || 0))
                ) {
                    bestChainRecord = {
                        row: recordRow,
                        entry: chainEntry
                    };
                }
            });

            var records = document.createElement('section');
            records.className = 'lof-hall-records';
            records.innerHTML =
                '<div class="lof-hall-section-heading">' +
                    '<div><small>Сводка</small><strong>Рекорды Летописи</strong></div>' +
                    '<span>Лучшие показатели текущего состава</span>' +
                '</div>';

            var recordsGrid = document.createElement('div');
            recordsGrid.className = 'lof-hall-records-grid';

            function appendHallRecord(label, value, detail, recordRow, rarityKey) {
                var card = document.createElement(recordRow ? 'button' : 'div');
                if (recordRow) {
                    card.type = 'button';
                }
                card.className = 'lof-hall-record-card' + (recordRow ? ' is-clickable' : '');
                if (rarityKey) {
                    card.setAttribute('data-rarity', rarityKey);
                }
                card.innerHTML =
                    '<span>' + escapeHtml(label) + '</span>' +
                    '<strong>' + escapeHtml(value) + '</strong>' +
                    '<small>' + escapeHtml(detail) + '</small>';

                if (recordRow) {
                    card.addEventListener('click', function () {
                        openHallParticipantPopover(recordRow, card);
                    });
                }

                recordsGrid.appendChild(card);
            }

            appendHallRecord(
                'Больше всего опыта',
                rows[0] ? rows[0].name : '—',
                rows[0] ? formatPoints(rows[0].score) + ' очков' : 'Нет данных',
                rows[0] || null,
                getHallCrownEntry(rows[0] || {}) && getHallCrownEntry(rows[0] || {}).rarity
                    ? getHallCrownEntry(rows[0] || {}).rarity.key
                    : ''
            );

            appendHallRecord(
                'Больше всего достижений',
                mostAchievementsRow ? mostAchievementsRow.name : '—',
                mostAchievementsRow ? String(mostAchievementsRow.count) + ' достижений' : 'Нет данных',
                mostAchievementsRow,
                ''
            );

            appendHallRecord(
                'Больше всего рубежей',
                mostStepsRow ? mostStepsRow.name : '—',
                mostStepsRow && mostStepsRow.stepStats
                    ? formatCatalogInteger(mostStepsRow.stepStats.earned) + ' / ' + formatCatalogInteger(systemStepStats.total || 0)
                    : 'Нет данных',
                mostStepsRow,
                ''
            );

            appendHallRecord(
                'Редчайшая награда',
                rarestRecord ? rarestRecord.row.name : '—',
                rarestRecord && rarestRecord.entry
                    ? rarestRecord.entry.achievement.title + ' · ' + rarestRecord.entry.rarity.title
                    : 'Нет данных',
                rarestRecord ? rarestRecord.row : null,
                rarestRecord && rarestRecord.entry && rarestRecord.entry.rarity
                    ? rarestRecord.entry.rarity.key
                    : ''
            );

            appendHallRecord(
                'Высшая цепочка',
                bestChainRecord ? bestChainRecord.row.name : '—',
                bestChainRecord && bestChainRecord.entry
                    ? bestChainRecord.entry.achievement.title
                    : 'Нет данных',
                bestChainRecord ? bestChainRecord.row : null,
                bestChainRecord && bestChainRecord.entry && bestChainRecord.entry.rarity
                    ? bestChainRecord.entry.rarity.key
                    : ''
            );

            records.appendChild(recordsGrid);
            shell.appendChild(records);

            /*
             * Основная таблица. Максимум 1000 участников
             * остаются доступны, но DOM строит только
             * 50 строк на странице.
             */
            var board =
                document.createElement(
                    'section'
                );

            board.className =
                'lof-hall-board';

            var toolbar =
                document.createElement(
                    'div'
                );

            toolbar.className =
                'lof-hall-toolbar';

            var search =
                document.createElement(
                    'input'
                );

            search.className =
                'lof-hall-search';

            search.type =
                'search';

            search.placeholder =
                'Найти участника…';

            search.setAttribute(
                'aria-label',
                'Поиск участника в Зале славы'
            );

            var resultInfo =
                document.createElement(
                    'div'
                );

            resultInfo.className =
                'lof-hall-result-info';

            toolbar.appendChild(
                search
            );

            var nearbyButton = document.createElement('button');
            nearbyButton.type = 'button';
            nearbyButton.className = 'lof-hall-nearby-button';
            nearbyButton.textContent = 'Рядом со мной';
            nearbyButton.disabled = !currentRow;
            nearbyButton.setAttribute(
                'title',
                currentRow
                    ? 'Показать участников непосредственно рядом с вашим местом'
                    : 'Ваш профиль пока не входит в рейтинг'
            );

            toolbar.appendChild(nearbyButton);

            toolbar.appendChild(
                resultInfo
            );

            board.appendChild(
                toolbar
            );

            var wrap =
                document.createElement(
                    'div'
                );

            wrap.className =
                'lof-leaderboard-table-wrap';

            var table =
                document.createElement(
                    'table'
                );

            table.className =
                'lof-leaderboard-table';

            table.innerHTML =
                '<thead>' +
                    '<tr>' +
                        '<th>Место</th>' +
                        '<th>Участник</th>' +
                        '<th>Редчайшие</th>' +
                        '<th>Очки</th>' +
                        '<th><a class="lof-achievements-heading-link" href="' +
                            escapeHtml(mw.util.getUrl(ACHIEVEMENTS_PAGE)) +
                            '">Достижения</a></th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody></tbody>';

            var tbody =
                table.querySelector(
                    'tbody'
                );

            wrap.appendChild(
                table
            );

            board.appendChild(
                wrap
            );

            var pagination =
                document.createElement(
                    'div'
                );

            pagination.className =
                'lof-hall-pagination';

            var pageStatus =
                document.createElement(
                    'div'
                );

            pageStatus.className =
                'lof-hall-page-status';

            var buttons =
                document.createElement(
                    'div'
                );

            buttons.className =
                'lof-hall-page-buttons';

            var previous =
                document.createElement(
                    'button'
                );

            previous.type =
                'button';

            previous.className =
                'lof-hall-page-button';

            previous.textContent =
                '← Назад';

            var next =
                document.createElement(
                    'button'
                );

            next.type =
                'button';

            next.className =
                'lof-hall-page-button';

            next.textContent =
                'Вперёд →';

            buttons.appendChild(
                previous
            );

            buttons.appendChild(
                next
            );

            pagination.appendChild(
                pageStatus
            );

            pagination.appendChild(
                buttons
            );

            board.appendChild(
                pagination
            );

            shell.appendChild(
                board
            );

            root.appendChild(
                shell
            );

            var page = 1;
            var query = '';
            var nearbyMode = false;

            function showNearbyCurrent() {
                if (!currentRow) {
                    return;
                }

                nearbyMode = true;
                query = '';
                search.value = '';
                page = 1;
                nearbyButton.classList.add('is-active');
                nearbyButton.textContent = 'Весь рейтинг';
                renderTablePage();

                board.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            function filteredRows() {
                if (nearbyMode && currentRow) {
                    var currentIndex = Math.max(0, Number(currentRow.rank || 1) - 1);
                    var nearStart = Math.max(0, currentIndex - 3);
                    var nearEnd = Math.min(rows.length, currentIndex + 4);
                    return rows.slice(nearStart, nearEnd);
                }

                if (!query) {
                    return rows;
                }

                return rows.filter(
                    function (row) {
                        return String(
                            row.name
                        )
                        .toLocaleLowerCase(
                            'ru'
                        )
                        .indexOf(
                            query
                        ) !== -1;
                    }
                );
            }

            function renderTablePage() {
                var filtered =
                    filteredRows();

                var pages =
                    Math.max(
                        1,
                        Math.ceil(
                            filtered.length /
                            LEADERBOARD_PAGE_SIZE
                        )
                    );

                page =
                    Math.min(
                        Math.max(
                            1,
                            page
                        ),
                        pages
                    );

                var start =
                    (
                        page - 1
                    ) *
                    LEADERBOARD_PAGE_SIZE;

                var end =
                    Math.min(
                        start +
                        LEADERBOARD_PAGE_SIZE,
                        filtered.length
                    );

                tbody.innerHTML =
                    '';

                if (!filtered.length) {
                    var emptyRow =
                        document.createElement(
                            'tr'
                        );

                    var emptyCell =
                        document.createElement(
                            'td'
                        );

                    emptyCell.colSpan =
                        5;

                    emptyCell.className =
                        'lof-hall-no-results';

                    emptyCell.textContent =
                        'Участник не найден.';

                    emptyRow.appendChild(
                        emptyCell
                    );

                    tbody.appendChild(
                        emptyRow
                    );
                } else {
                    filtered
                        .slice(
                            start,
                            end
                        )
                        .forEach(
                            function (row) {
                                var tr =
                                    document.createElement(
                                        'tr'
                                    );

                                if (
                                    row.userId ===
                                    currentId
                                ) {
                                    tr.className =
                                        'lof-leaderboard-current';
                                }

                                var rank =
                                    document.createElement(
                                        'td'
                                    );

                                rank.className =
                                    'lof-leaderboard-rank';

                                var rankSeal =
                                    document.createElement(
                                        'span'
                                    );

                                rankSeal.className =
                                    'lof-rank-seal';

                                rankSeal.setAttribute(
                                    'data-rank',
                                    String(
                                        row.rank
                                    )
                                );

                                rankSeal.textContent =
                                    formatHallRank(
                                        row.rank
                                    );

                                rank.appendChild(
                                    rankSeal
                                );

                                var userCell =
                                    document.createElement(
                                        'td'
                                    );

                                userCell.className =
                                    'lof-leaderboard-user';

                                var userLink =
                                    document.createElement(
                                        'a'
                                    );

                                userLink.href =
                                    mw.util.getUrl(
                                        'User:' +
                                        row.name
                                    );

                                userLink.textContent =
                                    row.name;

                                userCell.appendChild(
                                    userLink
                                );

                                var summaryButton = document.createElement('button');
                                summaryButton.type = 'button';
                                summaryButton.className = 'lof-hall-user-summary-button';
                                summaryButton.textContent = 'Сводка';
                                summaryButton.setAttribute('aria-label', 'Краткая сводка участника ' + row.name);
                                summaryButton.addEventListener('click', function () {
                                    openHallParticipantPopover(row, summaryButton);
                                });
                                userCell.appendChild(summaryButton);

                                if (
                                    row.userId ===
                                    currentId
                                ) {
                                    var currentBadge =
                                        document.createElement(
                                            'span'
                                        );

                                    currentBadge.className =
                                        'lof-hall-current-badge';

                                    currentBadge.textContent =
                                        'Вы';

                                    userCell.appendChild(
                                        currentBadge
                                    );
                                }

                                var rarestCell =
                                    document.createElement(
                                        'td'
                                    );

                                var rowRarestList =
                                    buildHallRarestList(
                                        row,
                                        false
                                    );

                                if (rowRarestList) {
                                    rarestCell.appendChild(
                                        rowRarestList
                                    );
                                } else {
                                    rarestCell.textContent =
                                        '—';
                                }

                                var score =
                                    document.createElement(
                                        'td'
                                    );

                                score.className =
                                    'lof-leaderboard-score';

                                score.textContent =
                                    formatPoints(
                                        row.score
                                    );

                                var count =
                                    document.createElement(
                                        'td'
                                    );

                                count.className =
                                    'lof-leaderboard-count';

                                var viewButton =
                                    document.createElement(
                                        'button'
                                    );

                                viewButton.type =
                                    'button';

                                viewButton.className =
                                    'lof-hall-achievements-button';

                                viewButton.textContent =
                                    String(
                                        row.count
                                    ) +
                                    ' · Смотреть';

                                viewButton.addEventListener(
                                    'click',
                                    function () {
                                        openHallOfficialAchievements(
                                            row
                                        );
                                    }
                                );

                                count.appendChild(
                                    viewButton
                                );

                                var stepCount = document.createElement('small');
                                stepCount.className = 'lof-hall-step-count';
                                stepCount.textContent =
                                    formatCatalogInteger(row.stepStats && row.stepStats.earned || 0) +
                                    ' / ' +
                                    formatCatalogInteger(systemStepStats.total || 0) +
                                    ' рубежей';
                                stepCount.title = 'Каждая достигнутая ступень считается отдельно';
                                count.appendChild(stepCount);

                                tr.appendChild(
                                    rank
                                );

                                tr.appendChild(
                                    userCell
                                );

                                tr.appendChild(
                                    rarestCell
                                );

                                tr.appendChild(
                                    score
                                );

                                tr.appendChild(
                                    count
                                );

                                tbody.appendChild(
                                    tr
                                );
                            }
                        );
                }

                if (filtered.length) {
                    resultInfo.textContent =
                        nearbyMode
                            ? 'Участники рядом с вашим местом'
                            : (
                                formatCatalogInteger(
                                    filtered.length
                                ) +
                                (
                                    query
                                        ? ' найдено'
                                        : ' активных участников'
                                )
                            );

                    pageStatus.textContent =
                        formatCatalogInteger(
                            start + 1
                        ) +
                        '–' +
                        formatCatalogInteger(
                            end
                        ) +
                        ' из ' +
                        formatCatalogInteger(
                            filtered.length
                        ) +
                        ' · страница ' +
                        String(
                            page
                        ) +
                        ' из ' +
                        String(
                            pages
                        );
                } else {
                    resultInfo.textContent =
                        '0 найдено';

                    pageStatus.textContent =
                        'Нет результатов';
                }

                previous.disabled =
                    page <= 1;

                next.disabled =
                    page >= pages;
            }

            search.addEventListener(
                'input',
                function () {
                    nearbyMode = false;
                    nearbyButton.classList.remove('is-active');
                    nearbyButton.textContent = 'Рядом со мной';

                    query =
                        String(
                            search.value || ''
                        )
                        .trim()
                        .toLocaleLowerCase(
                            'ru'
                        );

                    page = 1;

                    renderTablePage();
                }
            );

            nearbyButton.addEventListener(
                'click',
                function () {
                    if (!currentRow) {
                        return;
                    }

                    if (nearbyMode) {
                        nearbyMode = false;
                        page = Math.max(
                            1,
                            Math.ceil(Number(currentRow.rank || 1) / LEADERBOARD_PAGE_SIZE)
                        );
                        nearbyButton.classList.remove('is-active');
                        nearbyButton.textContent = 'Рядом со мной';
                        renderTablePage();
                        return;
                    }

                    showNearbyCurrent();
                }
            );

            previous.addEventListener(
                'click',
                function () {
                    if (page > 1) {
                        page--;

                        renderTablePage();

                        board.scrollIntoView({
                            behavior:
                                'smooth',

                            block:
                                'start'
                        });
                    }
                }
            );

            next.addEventListener(
                'click',
                function () {
                    var filtered =
                        filteredRows();

                    var pages =
                        Math.max(
                            1,
                            Math.ceil(
                                filtered.length /
                                LEADERBOARD_PAGE_SIZE
                            )
                        );

                    if (page < pages) {
                        page++;

                        renderTablePage();

                        board.scrollIntoView({
                            behavior:
                                'smooth',

                            block:
                                'start'
                        });
                    }
                }
            );

            document.addEventListener(
                'keydown',
                function (event) {
                    if (event.key !== 'Escape') {
                        return;
                    }

                    if (hallParticipantPopover) {
                        closeHallParticipantPopover();
                    }

                    if (openAchievementOverlay) {
                        closeHallAchievementViewer();
                    }
                }
            );

            renderTablePage();

            return rows;
        }).catch(function (error) {
            clearTimeout(
                loadingTimer
            );

            root.innerHTML =
                '<div class="lof-leaderboard-error">' +
                    'Не удалось построить Зал славы. ' +
                    'Подробности записаны в консоль.' +
                '</div>';

            console.error(
                '[Lofarian Achievements] Ошибка Зала славы:',
                error
            );

            throw error;
        });
    }


    I.registerFunctions('UI/HallOfFame', {
        hideHallRarestTooltip: hideHallRarestTooltip,
        getHallRarestTooltipNode: getHallRarestTooltipNode,
        positionHallRarestTooltip: positionHallRarestTooltip,
        showHallRarestTooltip: showHallRarestTooltip,
        bindHallRarestTooltip: bindHallRarestTooltip,
        isHallOfFamePage: isHallOfFamePage,
        getLeaderboardRoot: getLeaderboardRoot,
        renderHallOfFame: renderHallOfFame
    }, ["applyResolvedImageToElement", "buildHiddenConditionNoise", "getHiddenUnlockedDescription", "buildMetaAchievementFacts", "calculateScore", "collectProfileUnearnedTargets", "countLogicalEarnedAchievements", "getAchievementStepStats", "createEmptyDiscussionStats", "escapeHtml", "formatAchievementDate", "formatCatalogInteger", "formatPlayersCount", "formatPoints", "getAchievement", "getAchievementBaseTitle", "getAchievementCategoryTitle", "getAchievementCollectorState", "getAchievementPoints", "getAchievementPrevalenceMap", "getAchievementProgressInfo", "getAchievementTierLabel", "getAchievementVisualCategory", "getCurrentUserId", "getCurrentViewerEffectiveAchievementMap", "getLeaderboardRowsCached", "getRarestEarnedAchievements", "getRarityInfo", "isPlainObject", "openAchievementDetailsModal", "renderAchievementDetailsInline", "openProfileAchievementsDialog", "resolveAchievementImage", "syncOwnHallRankAwardTimes", "viewerKnowsHiddenAchievement", "setRarityLabel"]);
})(window);