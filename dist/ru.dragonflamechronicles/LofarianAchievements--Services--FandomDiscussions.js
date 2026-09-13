/*
===============================================================================
LOFARIAN ACHIEVEMENTS TEST 1.16.3 — FANDOM JS REVIEW NOTE — RC10 PARTICIPATION CUTOFF REVIEW READY
Страница Fandom: MediaWiki:LofarianAchievements/Services/FandomDiscussions.js

НАЗНАЧЕНИЕ ЭТОГО ФАЙЛА
Адаптер для статистики Fandom Discussions: читает посты/темы/лайки через same-site Fandom endpoints и наблюдает локальные элементы управления лайком.

ДАННЫЕ / I/O
Данные не отправляются на сторонние серверы; модуль не получает пароль или email.

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

ПРИМЕЧАНИЕ ДЛЯ REVIEW
Этот файл является одним модулем одной системы Lofarian Achievements. RC10 специально
разделён на небольшие MediaWiki:*.js страницы для прозрачности сопровождения, но
загружается штатным Fandom importArticles()/ResourceLoader с пакетированием.
===============================================================================
*/
(function (root) {
    'use strict';
    var I = root.__LofarianAchievementsInternal;
    if (!I) { throw new Error('[Lofarian Achievements] Runtime отсутствует: Services/FandomDiscussions'); }
    var C = I.config || {};
    var STATE = I.state || {};
    var api = I.api;
    function getCurrentUserId() { return I.invoke('getCurrentUserId', arguments); }
    function queueOwnGivenLikeProgress() { return I.invoke('queueOwnGivenLikeProgress', arguments); }
    function timestampToUnix() { return I.invoke('timestampToUnix', arguments); }

    function discussionPostUnix(post) {
        post = post || {};
        var value = post.creationDate && post.creationDate.epochSecond;
        var unix = Number(value || 0);

        if (unix > 0) {
            return Math.floor(unix);
        }

        return timestampToUnix(
            post.creationDate && post.creationDate.iso8601 ||
            post.createdAt ||
            post.timestamp ||
            ''
        );
    }


    function discussionPostLikeCount(post) {
        post = post || {};

        var embedded = post._embedded || {};
        var embeddedCount = embedded.count || {};
        var candidates = [
            post.upvoteCount,
            post.upvotesCount,
            post.likeCount,
            post.likesCount,
            post.reactionCount,
            post.reactionsCount,
            embeddedCount.UPVOTE,
            embeddedCount.upvote,
            embeddedCount.LIKE,
            embeddedCount.like
        ];

        if (Array.isArray(embedded.upvotes)) {
            candidates.push(embedded.upvotes.length);
        }
        if (Array.isArray(embedded['doc:upvotes'])) {
            candidates.push(embedded['doc:upvotes'].length);
        }
        if (Array.isArray(post.upvotes)) {
            candidates.push(post.upvotes.length);
        }

        return candidates.reduce(function (maxValue, value) {
            return Math.max(maxValue, Math.max(0, Math.floor(Number(value) || 0)));
        }, 0);
    }


    function discussionThreadUnix(thread) {
        thread = thread || {};
        return discussionPostUnix(
            thread.firstPost || thread
        );
    }


    function extractDiscussionPosts(data) {
        if (
            data && data._embedded &&
            Array.isArray(data._embedded['doc:posts'])
        ) {
            return data._embedded['doc:posts'];
        }

        if (
            data && data._embedded &&
            Array.isArray(data._embedded.posts)
        ) {
            return data._embedded.posts;
        }

        if (data && Array.isArray(data.posts)) {
            return data.posts;
        }

        return [];
    }


    function discussionApiUrl() {
        var scriptPath = String(
            mw.config.get('wgScriptPath') || ''
        ).replace(/\/$/, '');

        return scriptPath + '/wikia.php';
    }



    /*
     * Единственная точка низкоуровневого чтения Fandom Discussions.
     * Metrics/Discussions работает уже с готовым ответом и не знает URL/API.
     */
    function fetchDiscussionPostsRaw(userId, limit) {
        return $.ajax({
            url: discussionApiUrl(),
            method: 'GET',
            dataType: 'json',
            cache: true,
            data: {
                controller: 'DiscussionContribution',
                method: 'getPosts',
                userId: Number(userId),
                limit: Number(limit || 0),
                responseGroup: 'full',
                viewableOnly: true,
                canViewHiddenPosts: false,
                canViewHiddenPostsInContainer: false,
                containerType: 'FORUM'
            }
        });
    }


    function discussionLikeControlLooksPressed(control) {
        if (!control) {
            return false;
        }

        var pressed = String(control.getAttribute('aria-pressed') || '').toLowerCase();
        if (pressed === 'true') {
            return true;
        }

        var state = String(
            control.getAttribute('data-state') ||
            control.getAttribute('data-active') ||
            ''
        ).toLowerCase();

        if (state === 'active' || state === 'true' || state === 'pressed' || state === 'selected') {
            return true;
        }

        var classText = String(control.className || '').toLowerCase();
        return /(?:^|\s)(?:active|pressed|selected|upvoted|liked)(?:\s|$)/.test(classText);
    }


    function discussionControlIsLike(control) {
        if (!control) {
            return false;
        }

        var text = [
            control.getAttribute && control.getAttribute('aria-label'),
            control.getAttribute && control.getAttribute('title'),
            control.getAttribute && control.getAttribute('data-testid'),
            control.className,
            control.textContent
        ].filter(Boolean).join(' ').toLocaleLowerCase('ru');

        return (
            text.indexOf('нрав') !== -1 ||
            text.indexOf('like') !== -1 ||
            text.indexOf('upvote') !== -1 ||
            text.indexOf('vote-up') !== -1
        );
    }


    function discussionLikeTargetsAnotherUser(control, user) {
        if (!control || !user) {
            return false;
        }

        var node = control;
        var links = [];
        var depth = 0;

        while (node && depth < 8) {
            if (node.querySelectorAll) {
                links = Array.prototype.slice.call(
                    node.querySelectorAll('a[href*="/f/u/"],a[href*="/wiki/User:"]')
                );

                if (links.length) {
                    break;
                }
            }

            node = node.parentElement;
            depth++;
        }

        if (!links.length) {
            /*
             * В некоторых вариантах карточек Discussions имя автора
             * вынесено за ближайший DOM-контейнер. Самолайк интерфейсом
             * Fandom обычно не предлагается, поэтому неизвестный автор
             * не блокирует подтверждённое действие кнопки.
             */
            return true;
        }

        var currentId = String(user.userid || '');
        var currentName = String(user.name || '')
            .replace(/_/g, ' ')
            .toLocaleLowerCase('ru');
        var foundOwn = false;
        var foundOther = false;

        links.forEach(function (link) {
            var href = String(link.getAttribute('href') || '');
            var idMatch = href.match(/\/f\/u\/(\d+)/);

            if (idMatch) {
                if (String(idMatch[1]) === currentId) {
                    foundOwn = true;
                } else {
                    foundOther = true;
                }
                return;
            }

            var userMatch = href.match(/\/wiki\/User:([^?#]+)/i);
            if (userMatch) {
                var name = '';
                try {
                    name = decodeURIComponent(userMatch[1])
                        .replace(/_/g, ' ')
                        .toLocaleLowerCase('ru');
                } catch (error) {
                    name = String(userMatch[1])
                        .replace(/_/g, ' ')
                        .toLocaleLowerCase('ru');
                }

                if (name === currentName) {
                    foundOwn = true;
                } else {
                    foundOther = true;
                }
            }
        });

        return foundOther || !foundOwn;
    }


    function installGivenLikeTracker(user) {
        if (
            !user ||
            Number(user.userid) !== Number(getCurrentUserId()) ||
            !user.name
        ) {
            return;
        }

        function tryConfirmControl(control) {
            if (
                !discussionControlIsLike(control) ||
                !discussionLikeControlLooksPressed(control) ||
                !discussionLikeTargetsAnotherUser(control, user)
            ) {
                return false;
            }

            queueOwnGivenLikeProgress(user, 0, true);
            return true;
        }

        /*
         * Небольшой ретро-check: если в уже загруженной ленте /f есть
         * ранее поставленный пользователем лайк, он тоже может раскрыть
         * достижение без необходимости ставить второй лайк.
         */
        window.setTimeout(function () {
            var controls = document.querySelectorAll(
                'button,[role="button"],a'
            );

            for (var i = 0; i < controls.length; i++) {
                if (tryConfirmControl(controls[i])) {
                    break;
                }
            }
        }, 1600);

        document.addEventListener('click', function (event) {
            var target = event.target;
            if (!target || !target.closest) {
                return;
            }

            var control = target.closest('button,[role="button"],a');
            if (
                !discussionControlIsLike(control) ||
                !discussionLikeTargetsAnotherUser(control, user)
            ) {
                return;
            }

            /* Уже нажатая кнопка означает снятие лайка, а не новый лайк. */
            var wasPressed = discussionLikeControlLooksPressed(control);
            if (wasPressed) {
                return;
            }

            window.setTimeout(function () {
                if (!document.documentElement.contains(control)) {
                    return;
                }

                /*
                 * Fandom после успешного upvote обычно переводит контрол в
                 * pressed/active state. Если конкретная версия интерфейса не
                 * выставляет состояние, достижение просто не выдаётся ложноположительно.
                 */
                if (!discussionLikeControlLooksPressed(control)) {
                    return;
                }

                queueOwnGivenLikeProgress(user, 1, false);
            }, 650);
        }, true);
    }


    I.registerFunctions('Services/FandomDiscussions', {
        discussionPostUnix: discussionPostUnix,
        discussionPostLikeCount: discussionPostLikeCount,
        discussionThreadUnix: discussionThreadUnix,
        extractDiscussionPosts: extractDiscussionPosts,
        discussionApiUrl: discussionApiUrl,
        fetchDiscussionPostsRaw: fetchDiscussionPostsRaw,
        discussionLikeControlLooksPressed: discussionLikeControlLooksPressed,
        discussionControlIsLike: discussionControlIsLike,
        discussionLikeTargetsAnotherUser: discussionLikeTargetsAnotherUser,
        installGivenLikeTracker: installGivenLikeTracker
    }, ["getCurrentUserId", "queueOwnGivenLikeProgress", "timestampToUnix"]);
})(window);