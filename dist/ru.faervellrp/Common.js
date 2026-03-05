/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

// ============================================
// 1. Виджет случайной статьи через RailModule
// ============================================
window.AddRailModule = window.AddRailModule || [];
window.AddRailModule.push({
    page: 'Template:RailModule_RandomArticle',
    prepend: true,
    maxAge: 0
});

// ============================================
// 2. Настройки UserTags
// ============================================
window.UserTagsJS = window.UserTagsJS || {};
window.UserTagsJS.modules = window.UserTagsJS.modules || {};
window.UserTagsJS.tags = window.UserTagsJS.tags || {
    gamemaster: { u: 'GM', order: 30 },
    sysop: { u: 'Админ', order: -1 }
};

// Исправлено: теперь значение — массив, а не строка
window.UserTagsJS.modules.custom = {
    'Remelnius': ['sysop'],
    'MAX_X_PRO': ['sysop', 'bureaucrat'] // <-- было 'sysop, bureaucrat' (строка)
};

window.UserTagsJS.modules.mwGroups = [
    'bureaucrat', 'threadmoderator', 'patroller', 'rollback',
    'sysop', 'bot', 'bot-global', 'staff'
];

// ============================================
// 3. Импорт для приватной страницы
// ============================================
if (mw.config.get('wgPageName') === 'Тестовая_приватная_страница') {
    importArticles({
        type: 'script',
        articles: 'MediaWiki:PrivatePage.js'
    });
}

// ============================================
// 4. Плагин sakura (эффект лепестков)
//    Вынесен из setTimeout, чтобы определение было доступно сразу.
// ============================================
(function($) {
    // Полифиллы requestAnimationFrame (оставлены без изменений)
    var lastTime = 0;
    var vendors = ['webkit', 'o', 'ms', ''];
    var vendorCount = vendors.length;
    for (var x = 0; x < vendorCount && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    // Проверка нахождения элемента в видимой области
    function elementInViewport(el) {
        if (el instanceof jQuery) el = el[0];
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Случайный элемент массива
    function randomArrayElem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Случайное целое
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Добавление события с префиксами (исправлена глобальная переменная el)
    $.fn.prefixedEvent = function(type, callback) {
        var el = this instanceof jQuery ? this[0] : this; // <-- было el без var
        for (var i = 0; i < vendorCount; ++i) {
            var prefix = vendors[i];
            var eventType = prefix ? prefix + type : type.toLowerCase();
            el.addEventListener(eventType, callback, false);
        }
        return this;
    };

    // Основной метод плагина
    $.fn.sakura = function(event, options) {
        var target = this.selector === '' ? $('body') : this;
        var defaults = {
            blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
            className: 'sakura',
            fallSpeed: 3,
            maxSize: 14,
            minSize: 10,
            newOn: 500,
            swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
        };
        options = $.extend({}, defaults, options);

        if (event === 'stop') {
            var animId = target.data('sakura-anim-id');
            if (animId) {
                cancelAnimationFrame(animId);
                target.data('sakura-anim-id', null);
            }
            setTimeout(function() {
                $('.' + options.className).remove();
            }, options.newOn + 50);
            return;
        }

        // event === 'start' или не задано
        var petalCreator = function() {
            if (!target.data('sakura-anim-id')) return; // остановлено

            var blowAnimation = randomArrayElem(options.blowAnimations);
            var swayAnimation = randomArrayElem(options.swayAnimations);
            var fallTime = ((document.documentElement.clientHeight * 0.007) + Math.round(Math.random() * 5)) * options.fallSpeed;

            var animations = [
                'fall ' + fallTime + 's linear 0s 1',
                blowAnimation + ' ' + (Math.max(fallTime, 30) - 20 + randomInt(0, 20)) + 's linear 0s infinite',
                swayAnimation + ' ' + randomInt(2, 4) + 's linear 0s infinite'
            ].join(', ');

            var height = randomInt(options.minSize, options.maxSize);
            var width = height - Math.floor(randomInt(0, options.minSize) / 3);

            var petal = $('<div class="' + options.className + '">')
                .prefixedEvent('AnimationEnd', function() {
                    if (!elementInViewport(this)) $(this).remove();
                })
                .prefixedEvent('AnimationIteration', function(ev) {
                    // Проверяем, закончилась ли горизонтальная анимация, и удаляем за экраном
                    if (
                        (options.blowAnimations.indexOf(ev.animationName) !== -1 ||
                         options.swayAnimations.indexOf(ev.animationName) !== -1) &&
                        !elementInViewport(this)
                    ) {
                        $(this).remove();
                    }
                })
                .css({
                    '-webkit-animation': animations,
                    'animation': animations,
                    'border-radius': randomInt(options.maxSize, options.maxSize + Math.floor(Math.random() * 10)) + 'px ' + randomInt(1, Math.floor(width / 4)) + 'px',
                    'height': height + 'px',
                    'left': (Math.random() * document.documentElement.clientWidth - 100) + 'px',
                    'margin-top': (-(Math.floor(Math.random() * 20) + 15)) + 'px',
                    'width': width + 'px'
                });

            target.append(petal);

            // Запланировать следующее появление
            setTimeout(function() {
                requestAnimationFrame(petalCreator);
            }, options.newOn);
        };

        // Запуск
        target.data('sakura-anim-id', true);
        requestAnimationFrame(petalCreator);
    };
})(jQuery);

// Запуск эффекта через 30 секунд (определение уже доступно)
$(document).ready(function() {
    importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:SakuraStorm.css'
    });
    setTimeout(function() {
        $('body').sakura();
    }, 30000);
});

    // Получение настроек из mw.config
    var scriptPath = mw.config.get('wgScriptPath');
    var articlePath = mw.config.get('wgArticlePath');

    // Вспомогательная функция для URL статьи
    function getArticleUrl(title) {
        return mw.util.getUrl(title);
    }

    // Отображение ошибки
    function showError(message) {
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        var container = document.getElementById('random-article-container');
        var button = container ? container.querySelector('button') : null;

        if (!resultDiv || !loadingDiv) return;

        resultDiv.innerHTML = '<div class="firewell-random-error">' +
            '<strong>Ошибка:</strong> ' + message + '<br>' +
            '<small>Попробуйте нажать кнопку еще раз.</small>' +
            '</div>';
        resultDiv.style.display = 'block';
        loadingDiv.style.display = 'none';

        if (button) {
            button.disabled = false;
            button.innerHTML = '🔄 Попробовать снова';
        }
    }

 


    // Отображение статьи с описанием
    function displayArticle(title, category) {
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        var container = document.getElementById('random-article-container');
        var button = container ? container.querySelector('button') : null;

        // Проверка кэша
        var cacheKey = title + '|' + category;
        if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < config.cacheTime)) {
            resultDiv.innerHTML = cache[cacheKey].html;
            resultDiv.style.display = 'block';
            loadingDiv.style.display = 'none';
            if (button) {
                button.disabled = false;
                button.innerHTML = '🎲 Другая статья';
            }
            return;
        }

        var apiUrl = scriptPath + '/api.php?action=query&prop=extracts|info' +
            '&exintro=true&explaintext=true&inprop=url' +
            '&titles=' + encodeURIComponent(title) + '&format=json';

        fetch(apiUrl)
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.query && data.query.pages) {
                    var pages = data.query.pages;
                    var pageId = Object.keys(pages)[0];
                    var page = pages[pageId];

                    if (pageId === '-1') { // страница не существует
                        showError('Статья не найдена');
                        return;
                    }

                    var extract = page.extract || 'Описание отсутствует';
                    var shortText = extract.length > 180 ? extract.substring(0, 180) + '…' : extract;

                    var categoryHtml = (category && category !== 'Общее')
                        ? '<span class="article-category-badge">' + category + '</span>'
                        : '';

                    var html = '<div style="margin-bottom: 10px;">' +
                        categoryHtml +
                        '<strong style="color:#32CD32; font-size: 1.1em;">' + title + '</strong>' +
                        '</div>' +
                        '<div style="color:#CCC; font-size: 0.9em; margin-bottom: 12px; line-height: 1.4;">' +
                        shortText +
                        '</div>' +
                        '<div style="text-align: center;">' +
                        '<a href="' + getArticleUrl(title) +
                        '" class="firewell-article-link" style="margin-right: 15px;">📖 Читать полностью</a>' +
                        '<a href="javascript:void(0)" onclick="FirewellRandom.loadRandomArticle()" style="color:#FFD700;">🎲 Другая статья</a>' +
                        '</div>';

                    resultDiv.innerHTML = html;
                    resultDiv.style.display = 'block';
                    loadingDiv.style.display = 'none';

                    if (button) {
                        button.disabled = false;
                        button.innerHTML = '🎲 Другая статья';
                    }

                    // Сохраняем в кэш
                    cache[cacheKey] = {
                        html: html,
                        timestamp: Date.now()
                    };
                } else {
                    showError('Не удалось загрузить описание');
                }
            })
            .catch(function() {
                showError('Ошибка загрузки описания');
            });
    }

    // Публичный API
    return {
        loadRandomArticle: function() {
            var container = document.getElementById('random-article-container');
            var resultDiv = document.getElementById('random-article-result');
            var loadingDiv = document.getElementById('random-article-loading');
            var button = container ? container.querySelector('button') : null;

            if (!container || !resultDiv || !loadingDiv) return;

            loadingDiv.style.display = 'block';
            resultDiv.style.display = 'none';
            if (button) button.disabled = true;

            // Пытаемся сначала получить из предпочтительных категорий
            loadFromCategories(config.preferredCategories, 0);
        },

        init: function() {
            // Автозагрузка при наличии контейнера
            if (document.getElementById('random-article-container')) {
                setTimeout(this.loadRandomArticle.bind(this), 1000);
            }
            // Добавляем стили (один раз)
            if (!document.getElementById('firewell-random-styles')) {
                var style = document.createElement('style');
                style.id = 'firewell-random-styles';
                style.textContent = `
                    .firewell-article-link {
                        color: #32CD32 !important;
                        text-decoration: none;
                        border-bottom: 1px dotted #32CD32;
                        transition: all 0.2s ease;
                    }
                    .firewell-article-link:hover {
                        color: #98FB98 !important;
                        border-bottom: 1px solid #98FB98;
                    }
                    .firewell-random-error {
                        color: #FF6B6B;
                        background: rgba(255, 107, 107, 0.1);
                        padding: 10px;
                        border-radius: 4px;
                        border-left: 4px solid #FF6B6B;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };
})();

// Инициализация виджета
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        FirewellRandom.init();
    });
} else {
    FirewellRandom.init();
}

// ============================================
// 6. Дополнительный код для виджета (исправлен)
// ============================================
mw.loader.using('mediawiki.api').then(function() {
    var widget = document.getElementById('random-article-widget');
    if (!widget) return;

    var button = document.getElementById('random-article-btn');
    if (button && typeof FirewellRandom.loadRandomArticle === 'function') {
        // Если кнопка существует, но обработчик не привязан (например, если виджет вставлен динамически),
        // просто назначаем событие.
        button.onclick = function(e) {
            e.preventDefault();
            FirewellRandom.loadRandomArticle();
        };
    }
});