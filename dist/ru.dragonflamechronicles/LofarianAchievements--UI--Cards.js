/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC11.9.26 SHARED CARDS + LONG HOVER HELP
Страница Fandom: MediaWiki:LofarianAchievements/UI/Cards.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Отрисовка/разрешение изображений карточек достижений и единая безопасная система долгих поясняющих подсказок для кнопок профиля достижений, полного каталога и Зала славы.

ДАННЫЕ / I/O
Получает подготовленные данные; бизнес-логику выдачи и хранение не выполняет.

ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
- Это открытый, человекочитаемый локальный JavaScript этой вики.
- eval, new Function, обфускация и скрытый/удалённый исполняемый код не используются.
- Исполняемые зависимости находятся только на локальных MediaWiki:*.js страницах.
- Сторонние трекеры и передача пользовательских данных внешним сервисам отсутствуют.
- Код не получает пароль, email или содержимое авторизационных cookie пользователя.
- Официальные награды не доверяются localStorage; localStorage используется только как технический клиентский кэш/очередь.
- Реклама Fandom не скрывается и не модифицируется.

ИНТЕРФЕЙС И ПРАВА
Не скрывает рекламу, не переименовывает Administrator/Bureaucrat, не создаёт системные роли и не меняет MediaWiki user rights. Отдельный UI/Roles.js может показывать только локальные декоративные теги сообщества; они не являются группами прав и не изменяют системные плашки Fandom.

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

- RC11.5 добавляет общий inline-renderer подробностей: в полном списке профиля/Зала славы карточка обновляет область внутри уже открытого интерфейса и не создаёт вложенное модальное окно.
- RC11.9.26 добавляет только интерфейсные подсказки после 2,4 секунды наведения; они не меняют переходы, права, выдачу, прогресс или хранение.

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC10 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: UI/Cards'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    var STAGED_ACHIEVEMENT_ID_INFO = C.STAGED_ACHIEVEMENT_ID_INFO;
    function getAchievementBaseTitle() { return I.invoke('getAchievementBaseTitle', arguments); }
    function normalizeImageUrl() { return I.invoke('normalizeImageUrl', arguments); }
    function resolveFileUrl() { return I.invoke('resolveFileUrl', arguments); }
    function romanAchievementLevel() { return I.invoke('romanAchievementLevel', arguments); }
    function setRarityLabel() { return I.invoke('setRarityLabel', arguments); }

    function applyResolvedImageToElement(image, result, onFinalFailure) {
        if (!image || !result) {
            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }

            return;
        }

        var candidates = [];

        [
            result.thumbUrl,
            result.originalUrl,
            result.url
        ].forEach(function (candidate) {
            candidate =
                normalizeImageUrl(candidate);

            if (
                candidate &&
                candidates.indexOf(candidate) === -1
            ) {
                candidates.push(candidate);
            }
        });

        if (!candidates.length) {
            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }

            return;
        }

        var index = 0;

        image.onerror = function () {
            index++;

            if (index < candidates.length) {
                /*
                 * Если Fandom CDN не отдал thumbnail, пробуем
                 * оригинальный файл. Это особенно важно сразу
                 * после загрузки нового изображения, когда API уже
                 * видит файл, а thumbnail на static.wikia ещё может
                 * временно отвечать ошибкой.
                 */
                image.src = candidates[index];
                return;
            }

            image.onerror = null;

            if (typeof onFinalFailure === 'function') {
                onFinalFailure();
            }
        };

        image.addEventListener('load', function () {
            if (image.classList && image.classList.contains('lof-profile-rail-badge-image')) {
                image.classList.add('is-ready');
            }
            image.style.visibility = '';
        });

        image.src = candidates[0];

        if (
            image.complete &&
            image.naturalWidth > 0
        ) {
            image.dispatchEvent(
                new Event('load')
            );
        }
    }


    function resolveAchievementImage(catalog, achievement) {
        /*
         * TEST 1.14.2: более устойчивый поиск иконок самостоятельных
         * ступенчатых серий. Сначала используется точное имя из каталога.
         * Если на Fandom файл был загружен под базовым названием серии,
         * пробуем и его, затем универсальную иконку.
         */
        var names = [];

        function addName(value) {
            value = String(value || '').trim();

            if (!value || names.indexOf(value) !== -1) {
                return;
            }

            names.push(value);
        }

        if (achievement) {
            addName(achievement.image);

            if (achievement.title) {
                addName(String(achievement.title) + '.png');
            }

            if (achievement.family) {
                addName(
                    getAchievementBaseTitle(achievement) + '.png'
                );
            }

            var stagedInfo =
                STAGED_ACHIEVEMENT_ID_INFO[achievement.id];

            if (
                stagedInfo &&
                stagedInfo.series &&
                stagedInfo.series.displayTier === true
            ) {
                var baseTitle =
                    getAchievementBaseTitle(achievement);

                addName(
                    baseTitle +
                    ' ' +
                    romanAchievementLevel(stagedInfo.index + 1) +
                    '.png'
                );

                addName(
                    baseTitle +
                    ' ' +
                    String(stagedInfo.index + 1) +
                    '.png'
                );

                addName(baseTitle + '.png');
            }
        }

        addName(catalog && catalog.defaultImage);

        function tryIndex(index) {
            if (index >= names.length) {
                return Promise.reject(
                    new Error('Не удалось найти изображение достижения.')
                );
            }

            return resolveFileUrl(names[index])
                .catch(function () {
                    return tryIndex(index + 1);
                });
        }

        return tryIndex(0);
    }


    function getAchievementLoreDescription() { return I.invoke('getAchievementLoreDescription', arguments); }

    function removeAchievementDetailsOverlay() {
        var old = document.getElementById('lof-achievement-details-overlay');
        if (old && old.parentNode) {
            old.parentNode.removeChild(old);
        }
        document.documentElement.classList.remove('lof-achievement-details-open');
    }

    function openAchievementDetailsModal(catalog, achievement, details) {
        if (!achievement) {
            return null;
        }

        details = details || {};
        removeAchievementDetailsOverlay();

        var overlay = document.createElement('div');
        overlay.id = 'lof-achievement-details-overlay';
        overlay.className = 'lof-achievement-details-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');

        var dialog = document.createElement('section');
        dialog.className = 'lof-achievement-details-dialog' + (details.compact ? ' is-compact' : '');
        if (details.rarityKey) {
            dialog.setAttribute('data-rarity', String(details.rarityKey));
        }

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'lof-achievement-details-close';
        close.textContent = 'Закрыть';
        close.addEventListener('click', removeAchievementDetailsOverlay);

        var visual = document.createElement('div');
        visual.className = 'lof-achievement-details-visual';

        /*
         * RC11.7: используем тот же rarity-frame, который уже показан
         * пользователю в разделе «Редкость» полного списка достижений.
         */
        var rarityFrame = document.createElement('span');
        rarityFrame.className = 'lof-profile-rail-badge lof-achievement-rarity-frame';
        rarityFrame.setAttribute('data-rarity', String(details.rarityKey || 'common'));

        var imageWrap = document.createElement('span');
        imageWrap.className = 'lof-profile-rail-badge-image-wrap lof-achievement-details-rarity-image-wrap';
        imageWrap.setAttribute('data-rarity', String(details.rarityKey || 'common'));

        var placeholder = document.createElement('span');
        placeholder.className = 'lof-achievement-details-placeholder';
        placeholder.textContent = '✦';
        imageWrap.appendChild(placeholder);

        var image = document.createElement('img');
        image.className = 'lof-achievement-details-image lof-profile-rail-badge-image';
        image.alt = '';
        image.style.visibility = 'hidden';
        imageWrap.appendChild(image);
        rarityFrame.appendChild(imageWrap);
        visual.appendChild(rarityFrame);

        resolveAchievementImage(catalog, achievement).then(function (result) {
            applyResolvedImageToElement(image, result, function () {
                image.style.visibility = 'hidden';
            });
            image.onload = function () {
                image.style.visibility = '';
                image.classList.add('is-ready');
                placeholder.style.display = 'none';
            };
            if (image.complete && image.naturalWidth > 0) {
                image.style.visibility = '';
                image.classList.add('is-ready');
                placeholder.style.display = 'none';
            }
        }).catch(function () {
            image.style.visibility = 'hidden';
        });

        var copy = document.createElement('div');
        copy.className = 'lof-achievement-details-copy';

        var meta = document.createElement('div');
        meta.className = 'lof-achievement-details-meta';

        [
            details.categoryTitle,
            details.rarityTitle,
            details.statusText
        ].forEach(function (value, index) {
            value = String(value || '').trim();
            if (!value) { return; }
            var chip = document.createElement('span');
            chip.textContent = value;
            if (index === 1 && details.rarityKey) {
                chip.className = 'lof-rarity-' + String(details.rarityKey);
                setRarityLabel(chip, value, details.rarityKey);
            }
            meta.appendChild(chip);
        });

        var title = document.createElement('h2');
        title.textContent = String(details.title || achievement.title || achievement.id || 'Достижение');

        var description = document.createElement('p');
        description.className = 'lof-achievement-details-description';
        description.textContent = getAchievementLoreDescription(achievement, details);

        var condition = document.createElement('div');
        condition.className = 'lof-achievement-details-condition';
        var conditionLabel = document.createElement('strong');
        conditionLabel.textContent = 'Условие';
        var conditionText = document.createElement('span');
        conditionText.textContent = String(details.description || achievement.description || 'Описание отсутствует.');
        condition.appendChild(conditionLabel);
        condition.appendChild(conditionText);

        copy.appendChild(meta);
        copy.appendChild(title);
        copy.appendChild(description);
        copy.appendChild(condition);

        var facts = document.createElement('div');
        facts.className = 'lof-achievement-details-facts';

        var pointValue = Math.max(0, Math.floor(Number(achievement.points) || 0));
        if (String(details.pointsText || '').trim()) {
            var pointsText = document.createElement('span');
            pointsText.textContent = String(details.pointsText);
            facts.appendChild(pointsText);
        } else if (pointValue > 0) {
            var points = document.createElement('span');
            points.innerHTML = '<strong>' + String(pointValue) + '</strong> опыта';
            facts.appendChild(points);
        }

        [
            details.tierText,
            details.earnedText,
            details.progressText,
            details.prevalenceText
        ].forEach(function (value) {
            value = String(value || '').trim();
            if (!value) { return; }
            var fact = document.createElement('span');
            fact.textContent = value;
            facts.appendChild(fact);
        });

        if (facts.childNodes.length) {
            copy.appendChild(facts);
        }

        var body = document.createElement('div');
        body.className = 'lof-achievement-details-body';
        body.appendChild(visual);
        body.appendChild(copy);

        dialog.appendChild(close);
        dialog.appendChild(body);
        overlay.appendChild(dialog);

        overlay.addEventListener('mousedown', function (event) {
            if (event.target === overlay) {
                removeAchievementDetailsOverlay();
            }
        });

        document.body.appendChild(overlay);
        document.documentElement.classList.add('lof-achievement-details-open');
        close.focus();
        return overlay;
    }

    function renderAchievementDetailsInline(catalog, achievement, details, target) {
        if (!achievement || !target) {
            return null;
        }

        details = details || {};
        target.innerHTML = '';
        target.hidden = false;
        target.classList.add('lof-achievements-inline-details');
        if (details.rarityKey) {
            target.setAttribute('data-rarity', String(details.rarityKey));
        }

        var visual = document.createElement('div');
        visual.className = 'lof-achievements-inline-details-visual';

        var badge = document.createElement('span');
        badge.className = 'lof-achievements-hub-badge lof-profile-rail-badge';
        badge.setAttribute('data-rarity', String(details.rarityKey || 'common'));

        var imageWrap = document.createElement('span');
        imageWrap.className = 'lof-achievements-hub-image-wrap lof-profile-rail-badge-image-wrap';

        var placeholder = document.createElement('span');
        placeholder.className = 'lof-achievements-hub-image-placeholder';
        placeholder.textContent = '✦';

        var image = document.createElement('img');
        image.className = 'lof-achievements-hub-image lof-profile-rail-badge-image';
        image.alt = '';
        image.loading = 'eager';
        image.style.opacity = '0';

        imageWrap.appendChild(placeholder);
        imageWrap.appendChild(image);
        badge.appendChild(imageWrap);
        visual.appendChild(badge);

        var copy = document.createElement('div');
        copy.className = 'lof-achievements-inline-details-copy';

        var meta = document.createElement('div');
        meta.className = 'lof-achievements-inline-details-meta';
        [
            { value: details.categoryTitle },
            { value: details.rarityTitle, rarity: details.rarityKey },
            { value: details.statusText, earned: String(details.statusText || '').toLowerCase() === 'получено' }
        ].forEach(function (item) {
            var value = String(item.value || '').trim();
            if (!value) { return; }
            var chip = document.createElement('span');
            chip.textContent = value;
            if (item.rarity) {
                chip.className = 'lof-rarity-' + String(item.rarity);
                setRarityLabel(chip, value, item.rarity);
            }
            if (item.earned) { chip.classList.add('is-earned'); }
            meta.appendChild(chip);
        });

        var title = document.createElement('h3');
        title.textContent = String(details.title || achievement.title || achievement.id || 'Достижение');

        var condition = document.createElement('div');
        condition.className = 'lof-achievements-inline-details-condition';
        var isSecret = String(details.description || '').trim() === 'Условие засекречено.';
        if (isSecret) { condition.classList.add('is-secret'); }
        condition.innerHTML =
            '<strong>Условие</strong>' +
            '<span>' + String(details.description || achievement.description || 'Описание отсутствует.')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;') + '</span>';

        var facts = document.createElement('div');
        facts.className = 'lof-achievements-inline-details-facts';
        var pointValue = Math.max(0, Math.floor(Number(achievement.points) || 0));
        if (pointValue > 0) {
            var points = document.createElement('span');
            points.textContent = String(pointValue) + ' опыта';
            facts.appendChild(points);
        }
        [details.tierText, details.earnedText, details.progressText, details.prevalenceText].forEach(function (value) {
            value = String(value || '').trim();
            if (!value) { return; }
            var fact = document.createElement('span');
            fact.textContent = value;
            facts.appendChild(fact);
        });

        copy.appendChild(meta);
        copy.appendChild(title);
        copy.appendChild(condition);
        if (facts.childNodes.length) { copy.appendChild(facts); }
        target.appendChild(visual);
        target.appendChild(copy);

        resolveAchievementImage(catalog, achievement).then(function (result) {
            applyResolvedImageToElement(image, result, function () {
                image.style.opacity = '0';
            });
            image.onload = function () {
                image.style.opacity = '1';
                image.classList.add('is-ready');
                placeholder.style.display = 'none';
            };
            if (image.complete && image.naturalWidth > 0) {
                image.style.opacity = '1';
                image.classList.add('is-ready');
                placeholder.style.display = 'none';
            }
        }).catch(function () {
            image.style.opacity = '0';
        });

        return target;
    }

    /*
     * RC11.9.26 — долгие поясняющие подсказки для кнопок системы.
     * Подсказка появляется только после 2,4 секунды непрерывного наведения
     * (или фокуса с клавиатуры), поэтому не мешает обычной работе интерфейса.
     * Она не меняет переходы и обработчики кнопок: только объясняет, что это
     * за элемент и что произойдёт после нажатия.
     */
    function installLongHoverHelp() {
        if (root.__LofarianAchievementsLongHoverHelpInstalled) {
            return;
        }
        root.__LofarianAchievementsLongHoverHelpInstalled = true;

        var DELAY = 2400;
        var timer = null;
        var activeNode = null;
        var pendingNode = null;
        var tooltip = null;

        function inAchievementsScope(node) {
            return !!(
                node &&
                node.closest &&
                node.closest(
                    '#lof-profile-achievements-rail, ' +
                    '#lof-profile-floating-rail, ' +
                    '.lof-profile-achievements-overlay, ' +
                    '.lof-profile-featured-popover, ' +
                    '#lof-achievements-leaderboard, ' +
                    '.lof-hall-person-popover, ' +
                    '.lof-achievement-details-overlay, ' +
                    '.lof-achievements-hub'
                )
            );
        }

        function compactText(value) {
            return String(value || '')
                .replace(/\s+/g, ' ')
                .trim();
        }

        function ensureTooltip() {
            if (tooltip && tooltip.parentNode) {
                return tooltip;
            }
            tooltip = document.createElement('div');
            tooltip.className = 'lof-achievements-longhint';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.setAttribute('aria-hidden', 'true');
            tooltip.innerHTML =
                '<span class="lof-achievements-longhint-kicker">ЛЕТОПИСЬ ДОСТИЖЕНИЙ</span>' +
                '<strong class="lof-achievements-longhint-title"></strong>' +
                '<span class="lof-achievements-longhint-copy"></span>';
            document.body.appendChild(tooltip);
            return tooltip;
        }

        function scopeKicker(node) {
            if (!node || !node.closest) { return 'ЛЕТОПИСЬ ДОСТИЖЕНИЙ'; }
            if (node.closest('.lof-hall-person-popover, #lof-achievements-leaderboard')) {
                return 'ЗАЛ СЛАВЫ · ПОДСКАЗКА';
            }
            if (node.closest('.lof-achievements-hub')) {
                return 'КАТАЛОГ ДОСТИЖЕНИЙ · ПОДСКАЗКА';
            }
            if (node.closest('.lof-achievement-details-overlay')) {
                return 'ДОСТИЖЕНИЕ · ПОДСКАЗКА';
            }
            return 'ПРОФИЛЬ · ДОСТИЖЕНИЯ';
        }

        function shortAchievementTitle(node) {
            var titleNode = node && node.querySelector && node.querySelector(
                '.lof-achievements-hub-card-title, ' +
                '.lof-profile-rail-featured-title, ' +
                '.lof-profile-achievement-title, ' +
                '.lof-profile-rail-ahead-title, ' +
                '.lof-hall-rarest-item-title, ' +
                '.lof-hall-person-popover-drilldown-item span, ' +
                '.lof-profile-xp-copy strong, ' +
                '.lof-profile-chain-copy strong'
            );
            return compactText(
                (titleNode && titleNode.textContent) ||
                (node && node.getAttribute && node.getAttribute('data-lof-title')) ||
                ''
            );
        }

        function nodeLabel(node) {
            if (!node) { return 'Элемент'; }

            var cls = node.classList || { contains: function () { return false; } };
            var action = compactText(node.getAttribute && node.getAttribute('data-action'));
            var hallAction = compactText(node.getAttribute && node.getAttribute('data-hall-action'));
            var filterAction = compactText(node.getAttribute && (
                node.getAttribute('data-lof-stat-action') || node.getAttribute('data-filter')
            ));

            if (cls.contains('lof-profile-achievements-dialog-close') ||
                cls.contains('lof-profile-featured-popover-close') ||
                cls.contains('lof-hall-person-popover-close') ||
                cls.contains('lof-achievement-details-close')) {
                return 'Закрыть';
            }
            if (cls.contains('lof-profile-rail-hall-link') ||
                cls.contains('lof-profile-hall-rank-link') ||
                cls.contains('lof-achievements-hub-hall') ||
                cls.contains('lof-achievements-program-hall')) {
                return 'Зал славы';
            }
            if (cls.contains('lof-achievements-heading-link') ||
                cls.contains('lof-profile-rail-details-link')) {
                return 'Страница достижений';
            }
            if (cls.contains('lof-achievements-hub-dropdown-button')) {
                var kind = node.querySelector('.lof-achievements-hub-dropdown-kind');
                return 'Фильтр: ' + compactText(kind && kind.textContent || node.getAttribute('aria-label') || 'каталог');
            }
            if (cls.contains('lof-achievements-hub-dropdown-option')) {
                var optionWrap = node.closest('.lof-achievements-hub-dropdown');
                var optionKind = optionWrap && optionWrap.querySelector('.lof-achievements-hub-dropdown-kind');
                return compactText(optionKind && optionKind.textContent || 'Фильтр') + ': ' + compactText(node.textContent).replace(/✓/g, '').trim();
            }
            if (cls.contains('lof-achievements-hub-toggle')) {
                return compactText(node.textContent) || 'Каталог достижений';
            }
            if (cls.contains('lof-achievements-program-rarity')) {
                return 'Редкость: ' + compactText(node.textContent || node.getAttribute('aria-label'));
            }
            if (cls.contains('lof-achievements-hub-page') ||
                cls.contains('lof-profile-rail-page-button') ||
                cls.contains('lof-hall-page-button')) {
                var aria = compactText(node.getAttribute('aria-label'));
                if (aria) { return aria; }
                if (compactText(node.textContent) === '←' || compactText(node.textContent) === '‹') { return 'Предыдущая страница'; }
                if (compactText(node.textContent) === '→' || compactText(node.textContent) === '›') { return 'Следующая страница'; }
                return 'Страница ' + compactText(node.textContent);
            }
            if (cls.contains('lof-profile-filter-clear')) { return 'Сбросить фильтры'; }
            if (cls.contains('lof-profile-achievements-filter')) {
                return 'Раздел: ' + compactText(node.textContent || 'Все');
            }
            if (cls.contains('lof-profile-dialog-stat')) {
                var statLabel = node.querySelector('.lof-profile-dialog-stat-label');
                return compactText(statLabel && statLabel.textContent || node.getAttribute('aria-label') || 'Сводка коллекции');
            }
            if (cls.contains('lof-profile-rail-hub-button')) {
                return compactText(node.textContent || 'Раздел коллекции');
            }
            if (cls.contains('lof-profile-rail-featured-insight')) {
                var insightLabel = node.querySelector('span');
                return compactText(insightLabel && insightLabel.textContent || 'Сводка коллекции');
            }
            if (cls.contains('lof-hall-nearby-button')) { return compactText(node.textContent) || 'Рядом со мной'; }
            if (cls.contains('lof-hall-user-summary-button') || cls.contains('lof-hall-person-trigger')) {
                return 'Сводка участника';
            }
            if (cls.contains('lof-hall-achievements-button')) { return 'Коллекция участника'; }
            if (cls.contains('lof-hall-record-card')) {
                var recLabel = node.querySelector('span');
                return compactText(recLabel && recLabel.textContent || 'Рекорд Зала славы');
            }
            if (action === 'collection' || hallAction === 'collection') { return hallAction === 'collection' ? 'Моя коллекция' : 'Коллекция участника'; }
            if (action === 'achievements') { return 'Достижения участника'; }
            if (action === 'xp') { return 'Самые дорогие достижения'; }
            if (action === 'above') { return 'Участник на место выше'; }
            if (action === 'crown') { return 'Корона коллекции'; }
            if (action === 'expensive') { return 'Самое дорогое достижение'; }
            if (action === 'chains') { return 'Текущие цепочки'; }
            if (hallAction === 'nearby') { return 'Рядом со мной'; }

            var achievementTitle = shortAchievementTitle(node);
            if (achievementTitle) { return achievementTitle; }

            var label = compactText(
                node.getAttribute('data-lof-longhint-label') ||
                node.getAttribute('aria-label') ||
                node.getAttribute('data-lof-native-title') ||
                node.textContent
            );
            label = label
                .replace(/^Подробнее\s*[→›»]?$/i, 'Подробнее')
                .replace(/\s+Получили:.*$/i, '')
                .replace(/\s+Получено:.*$/i, '')
                .replace(/\s+Не получено.*$/i, '')
                .trim();
            if (label.length > 64) { label = label.slice(0, 61) + '…'; }
            return label || 'Интерактивный элемент';
        }

        function destinationText(node, label) {
            if (!node) { return ''; }
            var cls = node.classList || { contains: function () { return false; } };
            var lower = compactText(label).toLocaleLowerCase('ru');
            var action = compactText(node.getAttribute && node.getAttribute('data-action'));
            var hallAction = compactText(node.getAttribute && node.getAttribute('data-hall-action'));
            var filterAction = compactText(node.getAttribute && (
                node.getAttribute('data-lof-stat-action') || node.getAttribute('data-filter')
            ));

            if (cls.contains('lof-profile-achievements-dialog-close') ||
                cls.contains('lof-profile-featured-popover-close') ||
                cls.contains('lof-hall-person-popover-close') ||
                cls.contains('lof-achievement-details-close')) {
                return 'Закроет текущее окно. Все выбранные фильтры и положение страницы останутся без изменений.';
            }
            if (cls.contains('lof-profile-rail-hall-link') ||
                cls.contains('lof-profile-hall-rank-link') ||
                cls.contains('lof-achievements-hub-hall') ||
                cls.contains('lof-achievements-program-hall') ||
                lower === 'зал славы') {
                return 'Перейдёт в Зал славы — общий рейтинг участников программы по набранному опыту.';
            }
            if (cls.contains('lof-achievements-heading-link') || cls.contains('lof-profile-rail-details-link')) {
                return 'Откроет официальную страницу системы: описание программы, редкости и полный каталог достижений.';
            }

            if (cls.contains('lof-achievements-hub-dropdown-button')) {
                var kind = compactText((node.querySelector('.lof-achievements-hub-dropdown-kind') || {}).textContent).toLocaleLowerCase('ru');
                if (kind.indexOf('категор') !== -1) { return 'Раскроет категории каталога: чтение, редактирование, создание, активность, общение и особые достижения.'; }
                if (kind.indexOf('редк') !== -1) { return 'Раскроет шкалу редкостей и позволит оставить в каталоге достижения выбранной редкости.'; }
                if (kind.indexOf('тип') !== -1) { return 'Раскроет типы наград: одиночные достижения, уровневые серии и скрытые достижения.'; }
                return 'Раскроет варианты этого фильтра. Выбор сразу обновит каталог на текущей странице.';
            }
            if (cls.contains('lof-achievements-hub-dropdown-option')) {
                var wrap = node.closest('.lof-achievements-hub-dropdown');
                var kindNode = wrap && wrap.querySelector('.lof-achievements-hub-dropdown-kind');
                var kindText = compactText(kindNode && kindNode.textContent).toLocaleLowerCase('ru');
                var value = compactText(node.textContent).replace(/✓/g, '').trim();
                if (kindText.indexOf('категор') !== -1) { return 'Покажет в каталоге категорию «' + value + '». Остальные активные фильтры сохранятся.'; }
                if (kindText.indexOf('редк') !== -1) { return 'Оставит в каталоге достижения редкости «' + value + '». Остальные активные фильтры сохранятся.'; }
                if (kindText.indexOf('тип') !== -1) { return 'Оставит в каталоге тип «' + value + '». Остальные активные фильтры сохранятся.'; }
                return 'Применит вариант «' + value + '» к текущему каталогу.';
            }
            if (cls.contains('lof-achievements-hub-toggle')) {
                return lower.indexOf('свернуть') !== -1
                    ? 'Свернёт полный каталог, оставив на странице описание программы, примеры и редкости.'
                    : 'Развернёт все достижения с поиском, фильтрами, карточками и постраничной навигацией.';
            }
            if (cls.contains('lof-achievements-program-rarity')) {
                var rarityName = compactText(node.textContent || '').replace(/^Подробнее о редкости/i, '').trim();
                return 'Покажет описание редкости «' + rarityName + '», её градацию и положение в общей шкале редкостей.';
            }
            if (cls.contains('lof-achievements-hub-page')) {
                var txt = compactText(node.textContent);
                if (txt === '←') { return 'Покажет предыдущую страницу полного каталога достижений.'; }
                if (txt === '→') { return 'Покажет следующую страницу полного каталога достижений.'; }
                return 'Переключит каталог на страницу ' + txt + ' без перезагрузки всей вики-страницы.';
            }
            if (cls.contains('lof-profile-rail-page-button')) {
                return lower.indexOf('предыдущ') !== -1
                    ? 'Покажет предыдущую группу значков в компактной коллекции профиля.'
                    : 'Покажет следующую группу значков в компактной коллекции профиля.';
            }
            if (cls.contains('lof-hall-page-button')) {
                return lower.indexOf('предыдущ') !== -1 || compactText(node.textContent) === '←'
                    ? 'Покажет предыдущую страницу участников Зала славы.'
                    : 'Покажет следующую страницу участников Зала славы.';
            }

            if (cls.contains('lof-achievements-hub-card')) {
                return 'Откроет карточку «' + label + '» с крупной иконкой, условием получения, редкостью, опытом и дополнительной информацией.';
            }
            if (cls.contains('lof-profile-achievement')) {
                return 'Откроет «' + label + '» в небольшом окне: крупная иконка, условие, редкость, статус получения и прогресс.';
            }
            if (cls.contains('lof-profile-rail-featured') || cls.contains('lof-hall-rarest-item')) {
                return 'Откроет подробную карточку достижения «' + label + '» с его редкостью, условием и сведениями о получении.';
            }
            if (cls.contains('lof-profile-rail-ahead-item') || cls.contains('lof-profile-ahead-mini-card')) {
                return 'Откроет ещё не полученное достижение «' + label + '» и покажет условие и доступный прогресс до него.';
            }
            if (cls.contains('lof-profile-xp-row')) {
                return 'Откроет полученное достижение «' + label + '». Этот список отсортирован от самых дорогих наград по опыту.';
            }
            if (cls.contains('lof-profile-chain-row')) {
                return 'Откроет текущую достигнутую ступень цепочки «' + label + '» и её подробности.';
            }
            if (cls.contains('lof-hall-person-popover-drilldown-item')) {
                return 'Откроет достижение «' + label + '» в коллекции выбранного участника Зала славы.';
            }

            if (cls.contains('lof-profile-rail-all-button')) {
                return 'Откроет полный список коллекции этого участника с разделами, поиском, фильтрами, полученными и будущими целями.';
            }
            if (cls.contains('lof-profile-rail-ahead-all-button')) {
                return 'Откроет раздел «Впереди» со всеми ещё не полученными достижениями и ближайшими целями участника.';
            }
            if (cls.contains('lof-profile-rail-hub-button')) {
                if (lower.indexOf('очки опыта') !== -1) { return 'Покажет самые дорогие по опыту достижения, которые участник уже получил.'; }
                if (lower.indexOf('цепоч') !== -1) { return 'Покажет текущую высшую ступень каждой начатой уровневой цепочки.'; }
                if (lower.indexOf('получен') !== -1) { return 'Покажет только достижения, которые уже находятся в коллекции участника.'; }
                if (lower.indexOf('вперед') !== -1) { return 'Покажет все достижения, которых ещё нет в коллекции, включая ближайшие к получению.'; }
                if (lower.indexOf('подробнее') !== -1) { return 'Перейдёт на официальную страницу системы достижений и полного каталога.'; }
                if (lower.indexOf('зал славы') !== -1) { return 'Перейдёт в общий рейтинг участников программы достижений.'; }
            }
            if (cls.contains('lof-profile-dialog-stat')) {
                if (filterAction === 'xp') { return 'Переключит окно на самые дорогие уже полученные достижения по опыту.'; }
                if (filterAction === 'chains') { return 'Переключит окно на текущие ступени начатых уровневых цепочек.'; }
                if (filterAction === 'earned') { return 'Оставит в списке только уже полученные достижения.'; }
                if (filterAction === 'unearned') { return 'Оставит в списке все ещё не полученные достижения.'; }
                return 'Откроет связанное достижение или сводку коллекции.';
            }
            if (cls.contains('lof-profile-achievements-filter')) {
                var sectionName = compactText(node.textContent || 'Все');
                if (sectionName.toLocaleLowerCase('ru') === 'все') { return 'Покажет все 110 логических достижений и серий системы в одном списке.'; }
                if (sectionName.toLocaleLowerCase('ru') === 'редкости') { return 'Переключит список на обзор всех редкостей и их градаций.'; }
                return 'Покажет только раздел «' + sectionName + '» внутри полного списка достижений.';
            }
            if (cls.contains('lof-profile-filter-clear')) {
                return 'Очистит строку поиска и дополнительные фильтры, не меняя выбранный раздел списка.';
            }
            if (cls.contains('lof-profile-rail-featured-insight')) {
                var insightName = compactText((node.querySelector('span') || {}).textContent).toLocaleLowerCase('ru');
                if (insightName.indexOf('самое редкое') !== -1) { return 'Откроет самое редкое достижение из текущей коллекции участника.'; }
                if (insightName.indexOf('самая дорогая') !== -1) { return 'Откроет достижение коллекции с наибольшей стоимостью в очках опыта.'; }
                if (insightName.indexOf('лучшая цепочка') !== -1) { return 'Откроет самую высокую достигнутую ступень среди уровневых цепочек участника.'; }
                if (insightName.indexOf('редкост') !== -1) { return 'Откроет обзор редкостей и покажет, какие из них представлены в коллекции.'; }
                return 'Откроет связанную подробность коллекции.';
            }

            if (cls.contains('lof-hall-nearby-button') || hallAction === 'nearby') {
                return lower.indexOf('весь рейтинг') !== -1
                    ? 'Вернёт полный список участников Зала славы после просмотра соседних мест.'
                    : 'Покажет небольшой диапазон участников непосредственно вокруг вашего текущего места.';
            }
            if (hallAction === 'collection') {
                return 'Откроет вашу собственную коллекцию достижений прямо из Зала славы.';
            }
            if (cls.contains('lof-hall-user-summary-button') || cls.contains('lof-hall-person-trigger')) {
                return 'Откроет компактную сводку участника: место, опыт, коллекцию, корону, цепочки и другие показатели.';
            }
            if (cls.contains('lof-hall-achievements-button')) {
                return 'Откроет полный список официальных достижений выбранного участника.';
            }
            if (cls.contains('lof-hall-record-card')) {
                return 'Откроет сводку участника, которому принадлежит рекорд «' + label + '».';
            }
            if (action === 'collection' || action === 'achievements') {
                return 'Откроет коллекцию официальных достижений выбранного участника.';
            }
            if (action === 'xp') {
                return 'Развернёт внутри сводки пять самых дорогих по опыту полученных достижений участника.';
            }
            if (action === 'above') {
                return 'Закроет текущую сводку и откроет участника, который стоит на одну позицию выше в рейтинге.';
            }
            if (action === 'crown') {
                return 'Откроет достижение, которое считается короной — главным по редкости в коллекции этого участника.';
            }
            if (action === 'expensive') {
                return 'Откроет самое дорогое по опыту достижение этого участника.';
            }
            if (action === 'chains') {
                return 'Развернёт текущие высшие ступени начатых уровневых цепочек этого участника.';
            }
            if (compactText(node.getAttribute('aria-label')).toLocaleLowerCase('ru').indexOf('скрыть список') !== -1) {
                return 'Свернёт дополнительный список в сводке участника, не закрывая саму сводку.';
            }

            if (node.tagName === 'A' && node.href) {
                var href = String(node.getAttribute('href') || '');
                var linkLabel = compactText(node.textContent || node.getAttribute('aria-label') || label);
                if (/User:/i.test(href)) { return 'Перейдёт на профиль пользователя «' + linkLabel + '» на Википедии мира Лофариан.'; }
                if (/Category:/i.test(href)) { return 'Откроет категорию «' + linkLabel + '» на Википедии мира Лофариан.'; }
                if (/Special:Contributions/i.test(href)) { return 'Откроет журнал правок выбранного участника.'; }
                return 'Перейдёт на связанную страницу «' + linkLabel + '» на Википедии мира Лофариан.';
            }

            /* Страховка для будущих кнопок. Все текущие элементы системы
             * перечислены выше; эта ветка нужна только для новых контролов. */
            return 'Откроет связанный раздел «' + (label || 'Подробнее') + '» и покажет относящиеся к нему сведения.';
        }

        function prepareNode(node) {
            if (!node || !inAchievementsScope(node)) { return null; }
            if (node.disabled || node.getAttribute('aria-disabled') === 'true') { return null; }

            if (node.hasAttribute('title')) {
                node.setAttribute('data-lof-native-title', node.getAttribute('title') || '');
                node.removeAttribute('title');
            }

            var label = nodeLabel(node);
            var destination = destinationText(node, label);
            if (!destination) { return null; }
            return { label: label, destination: destination };
        }

        function position(node) {
            var tip = ensureTooltip();
            if (!node || activeNode !== node || !tip.classList.contains('is-visible')) { return; }
            var targetRect = node.getBoundingClientRect();
            var tipRect = tip.getBoundingClientRect();
            var gap = 11;
            var left = targetRect.left + targetRect.width / 2 - tipRect.width / 2;
            left = Math.max(10, Math.min(window.innerWidth - tipRect.width - 10, left));
            var top = targetRect.top - tipRect.height - gap;
            var below = top < 10;
            if (below) { top = targetRect.bottom + gap; }
            top = Math.max(10, Math.min(window.innerHeight - tipRect.height - 10, top));
            tip.style.left = Math.round(left) + 'px';
            tip.style.top = Math.round(top) + 'px';
            tip.classList.toggle('is-below', below);
        }

        function hide() {
            if (timer) {
                window.clearTimeout(timer);
                timer = null;
            }
            pendingNode = null;
            activeNode = null;
            if (tooltip) {
                tooltip.classList.remove('is-visible');
                tooltip.setAttribute('aria-hidden', 'true');
            }
        }

        function schedule(node) {
            hide();
            var info = prepareNode(node);
            if (!info) { return; }
            pendingNode = node;
            timer = window.setTimeout(function () {
                timer = null;
                if (pendingNode !== node || !document.documentElement.contains(node)) { return; }
                var tip = ensureTooltip();
                var kicker = tip.querySelector('.lof-achievements-longhint-kicker');
                var title = tip.querySelector('.lof-achievements-longhint-title');
                var copy = tip.querySelector('.lof-achievements-longhint-copy');
                if (kicker) { kicker.textContent = scopeKicker(node); }
                if (title) { title.textContent = info.label; }
                if (copy) { copy.textContent = info.destination; }
                activeNode = node;
                pendingNode = null;
                tip.setAttribute('aria-hidden', 'false');
                tip.classList.add('is-visible');
                window.requestAnimationFrame(function () { position(node); });
            }, DELAY);
        }

        function buttonFromEvent(event) {
            if (!event || !event.target || !event.target.closest) { return null; }
            var node = event.target.closest('button, a[href], [role="button"]');
            return node && inAchievementsScope(node) ? node : null;
        }

        document.addEventListener('mouseover', function (event) {
            var node = buttonFromEvent(event);
            if (!node) { return; }
            if (event.relatedTarget && node.contains(event.relatedTarget)) { return; }
            schedule(node);
        }, true);

        document.addEventListener('mouseout', function (event) {
            var node = buttonFromEvent(event);
            if (!node) { return; }
            if (event.relatedTarget && node.contains(event.relatedTarget)) { return; }
            hide();
        }, true);

        document.addEventListener('focusin', function (event) {
            var node = buttonFromEvent(event);
            if (node) { schedule(node); }
        }, true);

        document.addEventListener('focusout', function (event) {
            var node = buttonFromEvent(event);
            if (node) { hide(); }
        }, true);

        document.addEventListener('click', function () { hide(); }, true);
        window.addEventListener('scroll', hide, true);
        window.addEventListener('resize', function () {
            if (activeNode) { position(activeNode); }
        });
    }

    installLongHoverHelp();

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.getElementById('lof-achievement-details-overlay')) {
            removeAchievementDetailsOverlay();
        }
    });


    I.registerFunctions('UI/Cards', {
        applyResolvedImageToElement: applyResolvedImageToElement,
        resolveAchievementImage: resolveAchievementImage,
        openAchievementDetailsModal: openAchievementDetailsModal,
        renderAchievementDetailsInline: renderAchievementDetailsInline,
        removeAchievementDetailsOverlay: removeAchievementDetailsOverlay
    }, ["getAchievementBaseTitle", "normalizeImageUrl", "resolveFileUrl", "romanAchievementLevel", "getAchievementLoreDescription", "setRarityLabel"]);
})(window);