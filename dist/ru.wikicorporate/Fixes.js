/* 1. Фикс фона изображений и загрузка оригиналов */
(() => {
    'use strict';
    if (window.imagesReplacedOriginal) return;
    window.imagesReplacedOriginal = true;

    const imageConfigs = [
        {
            selector: '.category-page__member-thumbnail',
            attributes: { src: /(\/smart\/width\/\d*\/height\/\d*)/g }
        },
        {
            selector: '.card-image img',
            attributes: { src: /(\/top-crop\/width\/300\/height\/\d*)/g }
        },
        {
            selector: '.category-page__trending-page img',
            attributes: {
                src: /(\/smart\/width\/160\/height\/\d*)/g,
                srcset: /(\/top-crop\/width\/\d*\/height\/\d*)/g
            }
        }
    ];

    const allSelectors = imageConfigs.map(c => c.selector).join(', ');

    const fixElement = (el) => {
        if (!el || el.nodeType !== 1) return;
        imageConfigs.forEach(config => {
            if (el.matches(config.selector)) {
                Object.keys(config.attributes).forEach(attrName => {
                    const regex = config.attributes[attrName];
                    const originalValue = el.getAttribute(attrName);
                    if (originalValue) {
                        const newValue = originalValue.replace(regex, '');
                        if (originalValue !== newValue) {
                            el.setAttribute(attrName, newValue);
                        }
                    }
                });
            }
        });
    };

    const processNode = (node) => {
        if (!node || node.nodeType !== 1) return;
        fixElement(node);
        node.querySelectorAll(allSelectors).forEach(fixElement);
    };

    const initImageFixes = () => {
        if (!document.body) return;
        processNode(document.body);

        const observer = new MutationObserver(mutations => {
            for (let i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(processNode);
                } else if (mutation.type === 'attributes') {
                    fixElement(mutation.target);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src', 'srcset']
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageFixes);
    } else {
        initImageFixes();
    }
})();

/* 2. Исправление достижений (чтение напрямую из MediaWiki:Custom-AchievementDescriptions.json) */
(() => {
    'use strict';
    const namespace = mw.config.get('wgNamespaceNumber');
    const specialPage = mw.config.get('wgCanonicalSpecialPageName');

    if (namespace !== 2 && specialPage !== 'Leaderboard') return;
    if (window.isAchievementsFixed) return;
    window.isAchievementsFixed = true;

    const missingDescriptions = {};
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/api.php';

    const getPlural = (number) => {
        const absNum = Math.abs(number);
        const mod10 = absNum % 10;
        const mod100 = absNum % 100;
        if (mod100 >= 11 && mod100 <= 14) return 'изображений в статьи';
        if (mod10 === 1) return 'изображение в статью';
        if (mod10 >= 2 && mod10 <= 4) return 'изображения в статьи';
        return 'изображений в статьи';
    };

    const unescapeSafeHTML = (html) => {
        return html
            .replace(/&lt;(\/?(?:strong|b|i|em))&gt;/gi, '<$1>')
            .replace(/&lt;br\s*\/?&gt;/gi, '<br />')
            .replace(/&lt;a\s+href=(?:&quot;|"|')((?:https?:\/\/|\/)[^"&'<>]+)(?:&quot;|"|')(?:\s+[^&]*?)?&gt;/gi, '<a href="$1">')
            .replace(/&lt;\/a&gt;/gi, '</a>')
            .replace(/&amp;/g, '&');
    };

    const loadDescriptions = () => {
        const params = 'action=query&prop=revisions&titles=MediaWiki:Custom-AchievementDescriptions.json&rvprop=content&rvslots=main&formatversion=2&format=json&origin=*';
        return fetch(`${CENTRAL_API}?${params}`)
            .then(res => res.json())
            .then(data => {
                const page = data.query && data.query.pages && data.query.pages[0];
                if (page && !page.missing && page.revisions && page.revisions[0]) {
                    const parsed = JSON.parse(page.revisions[0].slots.main.content);
                    Object.keys(parsed).forEach(k => {
                        missingDescriptions[k.toLowerCase()] = mw.html.escape(String(parsed[k]));
                    });
                }
            })
            .catch(e => console.warn('[Achievements] Ошибка загрузки Custom-AchievementDescriptions.json:', e));
    };

    const fixTooltip = (tooltipNode) => {
        if (tooltipNode.dataset.achievementFixed === 'true') return;
        tooltipNode.dataset.achievementFixed = 'true';

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
                        if (iconData.indexOf(internalKey) !== -1) {
                            p.textContent = missingDescriptions[internalKey];
                            break;
                        }
                    }
                }
            });
        }

        let content = textContainer.innerHTML;
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
        const unhandledTooltips = document.querySelectorAll('.profile-hover:not([data-achievement-fixed="true"])');
        unhandledTooltips.forEach(fixTooltip);

        const unhandledBadges = document.querySelectorAll('.badge-text:not([data-achievement-fixed="true"])');
        unhandledBadges.forEach(badge => {
            badge.dataset.achievementFixed = 'true';

            let html = unescapeSafeHTML(badge.innerHTML);

            const listItem = badge.closest('li');
            if (listItem) {
                const iconData = listItem.innerHTML.toLowerCase();
                const keys = Object.keys(missingDescriptions);
                for (let i = 0; i < keys.length; i++) {
                    const internalKey = keys[i];
                    if (iconData.indexOf(internalKey) !== -1) {
                        if (html.indexOf(missingDescriptions[internalKey]) === -1) {
                            html = html.replace(/(<br\s*\/?>\s*){2}/i, `<br />${missingDescriptions[internalKey]}<br />`);
                        }
                        break;
                    }
                }
            }

            html = html.replace(
                /(?:<br\s*\/?>\s*)+([^<]*(?:назад|ago|только\s*что|just\s*now)[^<]*(?:<\/p>\s*)?)$/i,
                '<br /> &bull; $1'
            );

            badge.innerHTML = html;
        });
    };

    loadDescriptions().then(() => {
        const observer = new MutationObserver(mutations => {
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    processAchievements();
                    break;
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        processAchievements();
    });
})();

/* 3. Фикс новой структуры рейла */
(() => {
    'use strict';

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

    mw.hook('wikipage.content').add(() => {
        const rail = document.querySelector('.WikiaRail');
        if (!rail || rail.dataset.railUnwrapped === 'true') return;
        rail.dataset.railUnwrapped = 'true';

        let attempts = 0;
        const maxAttempts = 15;

        const tryUnwrap = () => {
            const eager = unwrapElement('[data-rail-region="legacy-eager-modules"]', rail);
            const lazy = unwrapElement('[data-rail-region="legacy-lazy-modules"]', rail);
            unwrapElement('.right-rail-wrapper:not(.has-rail-tabs)', rail);
            return eager || lazy;
        };

        if (tryUnwrap()) return;

        const observer = new MutationObserver((mutations, obs) => {
            attempts++;
            if (tryUnwrap() || attempts >= maxAttempts) {
                obs.disconnect();
            }
        });

        observer.observe(rail, { childList: true, subtree: true });
    });
})();

/* 4. Исправление локализации интерфейса (чтение напрямую из MediaWiki:Custom-UILocalization.json) */
(() => {
    'use strict';
    if (window.isUILocalizationLoaded) return;
    window.isUILocalizationLoaded = true;

    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/api.php';
    const CACHE_KEY = 'fandom_ui_localization_dict';
    const CACHE_TIME_KEY = 'fandom_ui_localization_time';
    const CACHE_TTL = 60 * 60 * 1000; // 1 час

    const fetchDictionary = () => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
            if (cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_TTL)) {
                return Promise.resolve(JSON.parse(cached));
            }
        } catch (e) {}

        const params = 'action=query&prop=revisions&titles=MediaWiki:Custom-UILocalization.json&rvprop=content&rvslots=main&formatversion=2&format=json&origin=*';
        return fetch(`${CENTRAL_API}?${params}`)
            .then(res => res.json())
            .then(data => {
                const page = data.query && data.query.pages && data.query.pages[0];
                if (page && !page.missing && page.revisions && page.revisions[0]) {
                    const dict = JSON.parse(page.revisions[0].slots.main.content);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(dict));
                        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
                    } catch (e) {}
                    return dict;
                }
                return {};
            })
            .catch(() => ({}));
    };

    const initLocalization = () => {
        fetchDictionary().then(dict => {
            if (!dict || Object.keys(dict).length === 0) return;

            let rafScheduled = false;
            const translateUI = () => {
                rafScheduled = false;
                const widgetTitles = document.querySelectorAll('.wds-widget-frame__title:not(.is-translated)');
                widgetTitles.forEach(title => {
                    const originalText = (title.getAttribute('title') || title.textContent || '').trim();
                    if (dict[originalText]) {
                        title.textContent = dict[originalText];
                        title.setAttribute('title', dict[originalText]);
                        title.classList.add('is-translated');
                    }
                });

                const safeTextElements = document.querySelectorAll(
                    '.ActionItem_action-item__dll5i:not(.is-translated), .wds-tabs__tab-label a:not(.is-translated), .wds-tooltip:not(.is-translated)'
                );

                safeTextElements.forEach(item => {
                    item.childNodes.forEach(node => {
                        if (node.nodeType === 3) {
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
                if (rafScheduled) return;
                for (let i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0 || mutations[i].type === 'characterData') {
                        rafScheduled = true;
                        window.requestAnimationFrame(translateUI);
                        break;
                    }
                }
            });

            observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLocalization);
    } else {
        initLocalization();
    }
})();