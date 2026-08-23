/* Фикс фона изображений и загрузка оригиналов */
(() => {
    if (window.imagesReplacedOriginal) return;
    window.imagesReplacedOriginal = true;
    
    const imageConfigs = [
        {
            selector: ".category-page__member-thumbnail",
            attributes: { src: /(\/smart\/width\/[\d]*\/height\/[\d]*)/g }
        },
        {
            selector: ".card-image img",
            attributes: { src: /(\/top-crop\/width\/300\/height\/[\d]*)/g }
        },
        {
            selector: ".category-page__trending-page img",
            attributes: {
                src: /(\/smart\/width\/160\/height\/[\d]*)/g,
                srcset: /(\/top-crop\/width\/[\d]*\/height\/[\d]*)/g
            }
        }
    ];
    
    const fixElement = (el) => {
        if (el.nodeType !== 1) return;
        imageConfigs.forEach(config => {
            if (el.matches(config.selector)) {
                for (const [attrName, regex] of Object.entries(config.attributes)) {
                    const originalValue = el.getAttribute(attrName);
                    if (originalValue) {
                        const newValue = originalValue.replace(regex, "");
                        if (originalValue !== newValue) {
                            el.setAttribute(attrName, newValue);
                        }
                    }
                }
            }
        });
    };
    
    const processNode = (node) => {
        if (node.nodeType !== 1) return;
        fixElement(node);
        const allSelectors = imageConfigs.map(c => c.selector).join(', ');
        const innerImages = node.querySelectorAll(allSelectors);
        innerImages.forEach(fixElement);
    };
    
    const processImages = () => {
        processNode(document.body);
    };
    
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach(processNode);
            } else if (mutation.type === "attributes") {
                fixElement(mutation.target);
            }
        }
    });
    
    const config = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
    };
    
    observer.observe(document.body, config);
    processImages();
})();

/* Исправление достижений */
(() => {
    const namespace = mw.config.get('wgNamespaceNumber');
    const specialPage = mw.config.get('wgCanonicalSpecialPageName');

    if (namespace !== 2 && specialPage !== 'Leaderboard') return;
    if (window.isAchievementsFixed) return;
    window.isAchievementsFixed = true;

    // Сюда будут загружены данные из Module:AchievementDescriptions
    let missingDescriptions = {};

    const getPlural = (number) => {
        const absNum = Math.abs(number);
        const mod10 = absNum % 10;
        const mod100 = absNum % 100;
        if (mod100 >= 11 && mod100 <= 14) return 'изображений в статьи';
        if (mod10 === 1) return 'изображение в статью';
        if (mod10 >= 2 && mod10 <= 4) return 'изображения в статьи';
        return 'изображений в статьи';
    };

    // Точечное и безопасное разэкранирование только разрешенных тегов (a, strong, br, b, i)
    const unescapeSafeHTML = (html) => {
        return html
            .replace(/&lt;(\/?(?:strong|b|i|em|br|a)(?:\s+(?:(?!&gt;).)*?)?)&gt;/gi, '<$1>')
            .replace(/&amp;/g, '&');
    };

    // Загрузка словаря из Lua (Заменили mw.util.wikiScript на безопасный wgScriptPath)
    const loadDescriptions = () => {
        const url = mw.config.get('wgScriptPath') + '/api.php?action=query&prop=revisions&titles=Module:AchievementDescriptions&rvprop=content&rvslots=main&formatversion=2&format=json';
        return fetch(url)
            .then(res => res.json())
            .then(data => {
                const pages = data.query && data.query.pages;
                if (pages && pages[0] && pages[0].revisions) {
                    const content = pages[0].revisions[0].slots.main.content;
                    const regex = /\[\s*['"]([^'"]+)['"]\s*\]\s*=\s*['"]([^'"]+)['"]/g;
                    let match;
                    while ((match = regex.exec(content)) !== null) {
                        missingDescriptions[match[1].toLowerCase()] = match[2];
                    }
                }
            })
            .catch(e => console.warn('Ошибка при загрузке Module:AchievementDescriptions', e));
    };

    const fixTooltip = (tooltipNode) => {
        if (tooltipNode.dataset.achievementFixed) return;
        tooltipNode.dataset.achievementFixed = "true";

        const textContainer = tooltipNode.querySelector('.profile-hover-text');
        if (!textContainer) return;

        const badgeIcon = tooltipNode.nextElementSibling;
        if (badgeIcon && badgeIcon.classList.contains('badge-icon')) {
            const iconData = badgeIcon.outerHTML.toLowerCase();
            const paragraphs = textContainer.querySelectorAll('p');

            paragraphs.forEach(p => {
                if (!p.textContent.trim()) {
                    const keys = Object.keys(missingDescriptions);
                    for (let i = 0; i < keys.length; i++) {
                        const internalKey = keys[i];
                        if (iconData.indexOf(internalKey.toLowerCase()) !== -1) {
                            p.innerHTML = missingDescriptions[internalKey];
                            break;
                        }
                    }
                }
            });
        }

        let content = textContainer.innerHTML;
        
        // Очищаем лишние переносы строк и служебные ключи в тексте
        content = content.replace(/(?:&lt;|<)br\s*\/?(?:&gt;|>)/gi, ' ');
        content = content
            .replace(/categoryselect-addcategory-button/g, 'Добавить категорию')
            .replace(/rte-ck-image-add/g, 'Добавить изображение')
            .replace(/oasis-signup/g, 'Регистрация')
            .replace(/⧼|⧽/g, '');

        content = content.replace(
            /((?:(?:\d+(?:[\s,.\xA0]|&nbsp;)+)*\d+))\s+(?:изображений|изображения|изображение)\s+в\s+(?:статьи|статью|статей)/gi,
            (match, numStr) => {
                const cleanNumStr = numStr.replace(/\D/g, '');
                const number = parseInt(cleanNumStr, 10);
                if (isNaN(number)) return match;
                return `${numStr} ${getPlural(number)}`;
            }
        );

        content = content.replace(/\s{2,}/g, ' ').trim();
        textContainer.innerHTML = content;
    };

    const processAchievements = () => {
        // 1. Обработка тултипов при наведении
        const unhandledTooltips = document.querySelectorAll('.profile-hover:not([data-achievement-fixed="true"])');
        unhandledTooltips.forEach(fixTooltip);

        // 2. Обработка списка достижений на странице / лидерборде
        const unhandledBadges = document.querySelectorAll('.badge-text:not([data-achievement-fixed="true"])');
        unhandledBadges.forEach(badge => {
            badge.dataset.achievementFixed = "true";
            
            let html = badge.innerHTML;
            
            // Восстанавливаем экранированные ссылки <a>, <strong> и <br>
            html = unescapeSafeHTML(html);

            // Восстановление недостающих описаний для боковой панели / лидерборда
            const listItem = badge.closest('li');
            if (listItem) {
                const iconData = listItem.innerHTML.toLowerCase();
                const keys = Object.keys(missingDescriptions);
                for (let i = 0; i < keys.length; i++) {
                    const internalKey = keys[i];
                    if (iconData.indexOf(internalKey.toLowerCase()) !== -1) {
                        if (!html.includes(missingDescriptions[internalKey])) {
                            html = html.replace(/(<br\s*\/?>\s*){2}/i, `<br />${missingDescriptions[internalKey]}<br />`);
                        }
                        break;
                    }
                }
            }

            // Добавляем маркер точки строго перед временем
            html = html.replace(/(?:<br\s*\/?>\s*)+([^<]*(?:назад|ago|только\s*что|just\s*now)[^<]*(?:<\/p>\s*)?)$/i, '<br /> &bull; $1');
            
            badge.innerHTML = html;
        });
    };

    // Запуск после загрузки словаря
    loadDescriptions().then(() => {
        const observer = new MutationObserver((mutations) => {
            let hasNewNodes = false;
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    hasNewNodes = true;
                    break;
                }
            }
            if (hasNewNodes) {
                processAchievements();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        processAchievements();
    });
})();

/* Фикс новой структуры рейла */
(function() {
    'use strict';

    // Функция для безопасного извлечения элементов
    const unwrapElement = (selector, parentContainer) => {
        try {
            const wrapper = parentContainer.querySelector(selector);
            if (!wrapper) return false;
            
            const parent = wrapper.parentNode;
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            parent.removeChild(wrapper);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Используем хук MediaWiki, чтобы запускать логику только когда контент готов
    mw.hook('wikipage.content').add(function() {
        const rail = document.querySelector('.WikiaRail');
        // Если рейла на странице нет (например, на спец. страницах) — даже не запускаемся
        if (!rail) return;

        let attempts = 0;
        const maxAttempts = 15; // Защита от бесконечного цикла

        const observer = new MutationObserver((mutations, obs) => {
            attempts++;

            // Пытаемся развернуть все три паразитные обертки
            const eager = unwrapElement('[data-rail-region="legacy-eager-modules"]', rail);
            const lazy = unwrapElement('[data-rail-region="legacy-lazy-modules"]', rail);
            const inner = unwrapElement('.right-rail-wrapper:not(.has-rail-tabs)', rail);

            // Если мы успешно развернули главные контейнеры ИЛИ превысили лимит попыток
            if ((eager || lazy) || attempts >= maxAttempts) {
                obs.disconnect(); // Убиваем обсервер, спасаем оперативную память юзеров
            }
        });

        // Наблюдаем ТОЛЬКО за самим рейлом, а не за всей страницей
        observer.observe(rail, { childList: true, subtree: true });
    });
})(); 

/* Исправление локализации */
(() => {
    'use strict';

    const initLocalization = () => {
        // Подключаем оба модуля: обычный API и ForeignApi для кросс-доменных запросов
        mw.loader.using(['mediawiki.api', 'mediawiki.ForeignApi']).then(() => {
            
            // Обращаемся к центральной Вики, а не к текущей локальной
            const CENTRAL_WIKI_API = 'https://wikicorporate.fandom.com/ru/api.php';
            const api = new mw.ForeignApi(CENTRAL_WIKI_API, { anonymous: true });
            
            api.get({
                action: 'expandtemplates',
                text: '{{#invoke:UILocalization|toJSON}}',
                prop: 'wikitext',
                formatversion: 2
            }).then(res => {
                let dict = {};
                
                if (res && res.expandtemplates && res.expandtemplates.wikitext) {
                    try {
                        dict = JSON.parse(res.expandtemplates.wikitext.trim());
                    } catch (parseError) {
                        console.error('[Localization] Ошибка парсинга словаря:', parseError);
                        return;
                    }
                }

                if (Object.keys(dict).length === 0) return;

                const translateUI = () => {
                    const widgetTitles = document.querySelectorAll('.wds-widget-frame__title:not(.is-translated)');
                    
                    widgetTitles.forEach(title => {
                        const originalText = title.getAttribute('title') || title.textContent.trim();
                        if (dict[originalText]) {
                            title.textContent = dict[originalText];
                            title.setAttribute('title', dict[originalText]);
                            title.classList.add('is-translated');
                        }
                    });

                    const safeTextElements = document.querySelectorAll(`
                        .ActionItem_action-item__dll5i:not(.is-translated),
                        .wds-tabs__tab-label a:not(.is-translated),
                        .wds-tooltip
                    `);
                    
                    safeTextElements.forEach(item => {
                        item.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE || node.nodeType === 3) {
                                const originalText = node.nodeValue.trim();
                                
                                if (dict[originalText]) {
                                    node.nodeValue = node.nodeValue.replace(originalText, dict[originalText]);
                                    item.classList.add('is-translated');
                                }
                            }
                        });
                    });
                };

                translateUI();

                const observer = new MutationObserver(mutations => {
                    let shouldTranslate = false;
                    for (const mutation of mutations) {
                        if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
                            shouldTranslate = true;
                            break;
                        }
                    }
                    if (shouldTranslate) {
                        translateUI();
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true, characterData: true });

            }).catch(e => {
                console.error('[Localization] Ошибка загрузки словаря с центральной Вики:', e);
            });
        });
    };

    // БЕЗОПАСНЫЙ ЗАПУСК с предохранителем
    if (typeof window.mw !== 'undefined') {
        initLocalization();
    } else {
        let attempts = 0;
        const mwInterval = setInterval(() => {
            attempts++;
            if (typeof window.mw !== 'undefined') {
                clearInterval(mwInterval);
                initLocalization();
            } else if (attempts >= 40) { 
                // 40 попыток * 250 мс = 10 секунд ожидания.
                // Если за 10 секунд ядро не загрузилось, сдаёмся, чтобы не висеть в памяти.
                clearInterval(mwInterval);
                console.warn('[Localization] Ошибка: Ядро MediaWiki не загрузилось за 10 секунд.');
            }
        }, 250);
    }
})();