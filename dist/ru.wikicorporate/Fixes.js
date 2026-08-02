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
        
        if (el.matches('.pi-image-thumbnail')) {
            const srcset = el.getAttribute('srcset');
            if (srcset && !srcset.includes('format=original')) {
                const firstSrc = srcset.split(' ')[0];
                const separator = firstSrc.includes('?') ? '&' : '?';
                el.setAttribute('srcset', `${firstSrc}${separator}format=original`);
            }
        }
    };
    
    const processNode = (node) => {
        if (node.nodeType !== 1) return;
        fixElement(node);
        const allSelectors = imageConfigs.map(c => c.selector).join(', ') + ', .pi-image-thumbnail';
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

    // Функция-обертка для DOMPurify
    const sanitizeHTML = (html) => {
        return (window.DOMPurify && window.DOMPurify.sanitize) 
            ? window.DOMPurify.sanitize(html) 
            : html;
    };

    const unescapeSafeHTML = (html) => {
        const unescaped = html.replace(/&lt;(\/?(?:strong|br|a)(?:\s+(?:(?!&gt;).)*?)?)&gt;/gi, '<$1>');
        return sanitizeHTML(unescaped);
    };
    
    // Асинхронная загрузка словаря из Lua (строгий ES6 с использованием Promises)
    const loadDescriptions = () => {
        const url = mw.util.wikiScript('api') + '?action=query&prop=revisions&titles=Module:AchievementDescriptions&rvprop=content&rvslots=main&formatversion=2&format=json';
        return fetch(url)
            .then(res => res.json())
            .then(data => {
                const pages = data.query && data.query.pages;
                if (pages && pages[0] && pages[0].revisions) {
                    const content = pages[0].revisions[0].slots.main.content;
                    // Парсим Lua-таблицу (ищет форматы ['ключ'] = 'значение')
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
        const badgeIcon = tooltipNode.nextElementSibling;
        
        if (badgeIcon && badgeIcon.classList.contains('badge-icon')) {
            const iconData = badgeIcon.outerHTML.toLowerCase();
            const paragraphs = tooltipNode.querySelectorAll('p');
            
            paragraphs.forEach(p => {
                if (!p.textContent.trim()) {
                    const keys = Object.keys(missingDescriptions);
                    for (let i = 0; i < keys.length; i++) {
                        const internalKey = keys[i];
                        if (iconData.indexOf(internalKey.toLowerCase()) !== -1) {
                            p.innerHTML = sanitizeHTML(missingDescriptions[internalKey]);
                            break;
                        }
                    }
                }
            });
        }
        
        let content = tooltipNode.innerHTML;
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
        
        content = content.replace(/\s{2,}/g, ' ');
        tooltipNode.innerHTML = sanitizeHTML(content.trim());
        tooltipNode.dataset.achievementFixed = "true";
    };
    
    const processAchievements = () => {
        const unhandledTooltips = document.querySelectorAll('.profile-hover:not([data-achievement-fixed="true"])');
        unhandledTooltips.forEach(fixTooltip);
        
        const unhandledBadges = document.querySelectorAll('.badge-text:not([data-achievement-fixed="true"])');
        unhandledBadges.forEach(badge => {
            let html = badge.innerHTML;
            html = unescapeSafeHTML(html);
            
            // Восстановление недостающих описаний для боковой панели (ищет 2 переноса строки подряд)
            const listItem = badge.closest('li');
            if (listItem) {
                const iconData = listItem.innerHTML.toLowerCase();
                const keys = Object.keys(missingDescriptions);
                for (let i = 0; i < keys.length; i++) {
                    const internalKey = keys[i];
                    if (iconData.indexOf(internalKey.toLowerCase()) !== -1) {
                        html = html.replace(/(<br\s*\/?>\s*){2}/i, `<br />${missingDescriptions[internalKey]}<br />`);
                        break;
                    }
                }
            }
            
            // Исправление: Сохраняем <br> и добавляем маркер точки строго перед временем
            html = html.replace(/(?:<br\s*\/?>\s*)+([^<]*(?:назад|ago|только\s*что|just\s*now)[^<]*(?:<\/p>\s*)?)$/i, '<br /> &bull; $1');
            badge.innerHTML = sanitizeHTML(html);
            badge.dataset.achievementFixed = "true";
        });
    };
    
    // Дожидаемся загрузки словаря, прежде чем начинать обработку DOM
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

/* Доработка поиска */
((window, mw) => {
    if (window.fandomSearchShortcutsLoaded) return;
    window.fandomSearchShortcutsLoaded = true;
    
    const searchInputSelector = '.search-app__wrapper > input, .wds-global-navigation__search-input, #searchInput';
    const ns = mw.config.get('wgFormattedNamespaces');
    const namespaces = {
        t: ns[10], mw: ns[8], s: ns[-1], h: ns[12], m: ns[828],
        f: ns[6], u: ns[2], ut: ns[3], w: ns[1200], ub: ns[500],
        p: ns[4], c: ns[14], fo: ns[110]
    };
    
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    ).set;
    
    document.addEventListener('input', (event) => {
        const target = event.target;
        if (!target.matches(searchInputSelector)) return;
        const currentVal = target.value;
        const match = currentVal.match(/^\!([a-z]+) /i);
        
        if (match) {
            const shortcut = match[1].toLowerCase();
            if (namespaces.hasOwnProperty(shortcut)) {
                const newText = `${namespaces[shortcut]}:${currentVal.slice(match[0].length)}`;
                nativeInputValueSetter.call(target, newText);
                target.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });
})(window, window.mediaWiki);