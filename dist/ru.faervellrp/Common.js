/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Добавляем виджет случайной статьи в правую колонку
window.AddRailModule = [
    {page: 'Template:RailModule_RandomArticle', prepend: true, maxAge: 0}
];
/*---UserTags---*/
window.UserTagsJS = {
	modules: {},
	tags: {
		gamemaster: { u: 'GM', order: 30 },
		sysop: { u: 'Админ', order: -1}
	}
};
UserTagsJS.modules.custom = {
	'Remelnius': ['sysop'],
	'MAX_X_PRO': ['sysop, bureaucrat']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global', 'staff'];

switch ( mw.config.get('wgPageName') ) {
    case 'Тестовая_приватная_страница':
        importArticles({
        	type: 'script',
        	articles: 'MediaWiki:PrivatePage.js'
        });
        break;
}

setTimeout(function() {
	(function($) {
		/** Polyfills and prerequisites **/
		// requestAnimationFrame Polyfill
		var lastTime = 0;
		var vendors = ['webkit', 'o', 'ms', 'moz', ''];
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
		// Prefixed event check
		$.fn.prefixedEvent = function(type, callback) {
			for (var x = 0; x < vendorCount; ++x) {
				if (!vendors[x]) {
					type = type.toLowerCase();
				}
				el = (this instanceof jQuery ? this[0] : this);
				el.addEventListener(vendors[x] + type, callback, false);
			}
			return this;
		};
		// Test if element is in viewport
		function elementInViewport(el) {
			if (el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
		}
		// Random array element
		function randomArrayElem(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}
		// Random integer
		function randomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		/** Actual plugin code **/
		$.fn.sakura = function(event, options) {
			// Target element
			var target = this.selector == "" ? $('body') : this;
			// Defaults for the option object, which gets extended below
			var defaults = {
				blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
				className: 'sakura',
				fallSpeed: 3,
				maxSize: 14,
				minSize: 10,
				newOn: 500,
				swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
			};
			var options = $.extend({}, defaults, options);
			// Default or start event
			if (typeof event === 'undefined' || event === 'start') {
				// Function that inserts new petals into the document
				var petalCreator = function() {
					if (target.data('sakura-anim-id')) {
						setTimeout(function() {
							requestAnimationFrame(petalCreator);
						}, options.newOn);
					}
					// Get one random animation of each type and randomize fall time of the petals
					var blowAnimation = randomArrayElem(options.blowAnimations);
					var swayAnimation = randomArrayElem(options.swayAnimations);
					var fallTime = ((document.documentElement.clientHeight * 0.007) + Math.round(Math.random() * 5)) * options.fallSpeed;
					// Build animation
					var animations = 'fall ' + fallTime + 's linear 0s 1' + ', ' + blowAnimation + ' ' + (((fallTime > 30 ? fallTime : 30) - 20) + randomInt(0, 20)) + 's linear 0s infinite' + ', ' + swayAnimation + ' ' + randomInt(2, 4) + 's linear 0s infinite';
					// Create petal and randomize size
					var petal = $('<div class="' + options.className + '">');
					var height = randomInt(options.minSize, options.maxSize);
					var width = height - Math.floor(randomInt(0, options.minSize) / 3);
					// Apply Event Listener to remove petals that reach the bottom of the page
					petal.prefixedEvent('AnimationEnd', function() {
							if (!elementInViewport(this)) {
								$(this).remove();
							}
						})
						// Apply Event Listener to remove petals that finish their horizontal float animation
						.prefixedEvent('AnimationIteration', function(ev) {
							if (
								($.inArray(ev.animationName, options.blowAnimations) != -1 || $.inArray(ev.animationName, options.swayAnimations) != -1) && !elementInViewport(this)) {
								$(this).remove();
							}
						}).css({
							'-webkit-animation': animations,
							animation: animations,
							'border-radius': randomInt(options.maxSize, (options.maxSize + Math.floor(Math.random() * 10))) + 'px ' + randomInt(1, Math.floor(width / 4)) + 'px',
							height: height + 'px',
							left: (Math.random() * document.documentElement.clientWidth - 100) + 'px',
							'margin-top': (-(Math.floor(Math.random() * 20) + 15)) + 'px',
							width: width + 'px'
						});
					target.append(petal);
				};
				// Finally: Start adding petals
				target.data('sakura-anim-id', requestAnimationFrame(petalCreator));
			}
			// Stop event, which stops the animation loop and removes all current blossoms
			else if (event === 'stop') {
				// Cancel animation
				var animId = target.data('sakura-anim-id');
				if (animId) {
					cancelAnimationFrame(animId);
					target.data('sakura-anim-id', null);
				}
				// Remove all current blossoms
				setTimeout(function() {
					$('.' + options.className).remove();
				}, (options.newOn + 50));
			}
		};
	}(jQuery));
	$(document).ready(function() {
		importArticles({
			type: 'style',
			article: 'u:dev:MediaWiki:SakuraStorm.css'
		});
		$('body').sakura();
	});
}, 30000);
/* ================================================
   ВИДЖЕТ СЛУЧАЙНОЙ СТАТЬИ FIREWELL
   Версия 1.0 - Автоматическая загрузка
================================================ */

var FirewellRandom = {
    
    // Конфигурация
    config: {
        excludedCategories: [
            'Шаблоны',
            'Категории',
            'Служебные_страницы',
            'Обсуждения',
            'Файлы'
        ],
        preferredCategories: [
            'Персонажи',
            'Локации',
            'Фракции',
            'Предметы',
            'События'
        ],
        maxRetries: 3,
        cacheTime: 5 * 60 * 1000 // 5 минут кэша
    },
    
    // Кэш для статей
    cache: {},
    
    // Инициализация
    init: function() {
        // Автоматически загружаем статью при загрузке страницы
        if (document.getElementById('random-article-container')) {
            // Ждем немного, чтобы страница полностью загрузилась
            setTimeout(function() {
                FirewellRandom.loadRandomArticle();
            }, 1000);
        }
        
        // Добавляем CSS для красивого отображения
        this.addStyles();
    },
    
    // Добавление CSS стилей
    addStyles: function() {
        var style = document.createElement('style');
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
    },
    
    // Основная функция загрузки случайной статьи
    loadRandomArticle: function() {
        var container = document.getElementById('random-article-container');
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        var button = container ? container.querySelector('button') : null;
        
        if (!container || !resultDiv || !loadingDiv) return;
        
        // Показываем индикатор загрузки
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        if (button) button.disabled = true;
        
        // Пробуем получить статью из предпочтительных категорий
        this.getRandomArticleFromCategories(this.config.preferredCategories, 0);
    },
    
    // Получение случайной статьи из указанных категорий
    getRandomArticleFromCategories: function(categories, attempt) {
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        
        if (attempt >= categories.length) {
            // Если не нашли в предпочтительных, пробуем общую случайную
            this.getGeneralRandomArticle();
            return;
        }
        
        var category = categories[attempt];
        var apiUrl = wgScriptPath + '/api.php?action=query&list=categorymembers' +
                    '&cmtitle=Category:' + encodeURIComponent(category) +
                    '&cmlimit=100&format=json';
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.query && data.query.categorymembers && data.query.categorymembers.length > 0) {
                    // Фильтруем статьи, исключая служебные
                    var articles = data.query.categorymembers.filter(function(article) {
                        return !article.title.includes(':') && 
                               !article.title.includes('/') &&
                               article.ns === 0;
                    });
                    
                    if (articles.length > 0) {
                        var randomArticle = articles[Math.floor(Math.random() * articles.length)];
                        this.displayArticle(randomArticle.title, category);
                    } else {
                        // Пробуем следующую категорию
                        this.getRandomArticleFromCategories(categories, attempt + 1);
                    }
                } else {
                    // Пробуем следующую категорию
                    this.getRandomArticleFromCategories(categories, attempt + 1);
                }
            })
            .catch(error => {
                console.error('FirewellRandom: Ошибка загрузки категории', category, error);
                this.getRandomArticleFromCategories(categories, attempt + 1);
            }.bind(this));
    },
    
    // Общая случайная статья (запасной вариант)
    getGeneralRandomArticle: function() {
        var apiUrl = wgScriptPath + '/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&format=json';
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.query && data.query.random && data.query.random.length > 0) {
                    // Ищем статью без двоеточий (не служебную)
                    var validArticles = data.query.random.filter(function(article) {
                        return !article.title.includes(':');
                    });
                    
                    if (validArticles.length > 0) {
                        var randomArticle = validArticles[0];
                        this.displayArticle(randomArticle.title, 'Общее');
                    } else {
                        this.showError('Не удалось найти подходящую статью');
                    }
                } else {
                    this.showError('Не удалось загрузить случайную статью');
                }
            })
            .catch(error => {
                console.error('FirewellRandom: Ошибка API', error);
                this.showError('Ошибка подключения к вики');
            }.bind(this));
    },
    
    // Отображение статьи
    displayArticle: function(title, category) {
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        var container = document.getElementById('random-article-container');
        var button = container ? container.querySelector('button') : null;
        
        // Получаем краткое описание
        var apiUrl = wgScriptPath + '/api.php?action=query&prop=extracts|info' +
                    '&exintro=true&explaintext=true&inprop=url' +
                    '&titles=' + encodeURIComponent(title) + '&format=json';
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.query && data.query.pages) {
                    var pageId = Object.keys(data.query.pages)[0];
                    var page = data.query.pages[pageId];
                    
                    var extract = page.extract || 'Описание отсутствует';
                    var shortText = extract.substring(0, 180);
                    if (extract.length > 180) shortText += '...';
                    
                    // Форматируем категорию
                    var categoryHtml = '';
                    if (category && category !== 'Общее') {
                        categoryHtml = '<span class="article-category-badge">' + category + '</span>';
                    }
                    
                    // Формируем HTML
                    var html = '<div style="margin-bottom: 10px;">' +
                               categoryHtml +
                               '<strong style="color:#32CD32; font-size: 1.1em;">' + title + '</strong>' +
                               '</div>' +
                               '<div style="color:#CCC; font-size: 0.9em; margin-bottom: 12px; line-height: 1.4;">' +
                               shortText +
                               '</div>' +
                               '<div style="text-align: center;">' +
                               '<a href="' + wgArticlePath.replace('$1', encodeURIComponent(title).replace(/ /g, '_')) + 
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
                    this.cache[title] = {
                        html: html,
                        timestamp: Date.now()
                    };
                    
                } else {
                    this.showError('Не удалось загрузить описание статьи');
                }
            })
            .catch(error => {
                console.error('FirewellRandom: Ошибка загрузки описания', error);
                this.showError('Ошибка загрузки описания');
            }.bind(this));
    },
    
    // Показать ошибку
    showError: function(message) {
        var resultDiv = document.getElementById('random-article-result');
        var loadingDiv = document.getElementById('random-article-loading');
        var container = document.getElementById('random-article-container');
        var button = container ? container.querySelector('button') : null;
        
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
};

// Инициализируем виджет при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        FirewellRandom.init();
    });
} else {
    FirewellRandom.init();
}
// Код для виджета случайной статьи
mw.loader.using('mediawiki.api').then(function() {
    // Этот код будет работать на всех страницах, но активируется только при наличии виджета
    if (document.getElementById('random-article-widget')) {
        // Инициализируем виджет
        setTimeout(function() {
            var button = document.getElementById('random-article-btn');
            if (button && typeof button.onclick !== 'function') {
                // Если виджет загружен через шаблон, но JS не сработал
                location.reload();
            }
        }, 1000);
    }
});