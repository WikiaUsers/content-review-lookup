/* Фикс фона изображений и загрузка оригиналов */
(() => {
	
    if (window.imagesReplacedOriginal) return;
    window.imagesReplacedOriginal = true;

    const imageConfigs = [
        {
            selector: ".category-page__member-thumbnail",
            attributes: {
                src: /(\/smart\/width\/[\d]*\/height\/[\d]*)/g
            }
        },
        {
            selector: ".card-image img",
            attributes: {
                src: /(\/top-crop\/width\/300\/height\/[\d]*)/g
            }
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

    // Восстановление недостающих описаний
    const missingDescriptions = {
        'welcome':      'Награда за регистрацию на Вики.',
        'creator':      'Награда за создание Вики. Отличная работа!',
        'pounce':       'За создание 100 статей на Вики.',
        'introduction': 'Награда за создание своей страницы участника.',
        'sayhi':        'Награда за сообщение на чужой стене обсуждения.'
    };

    const getPlural = (number) => {
        const absNum = Math.abs(number);
        const mod10 = absNum % 10;
        const mod100 = absNum % 100;

        if (mod100 >= 11 && mod100 <= 14) return 'изображений в статьи';
        if (mod10 === 1) return 'изображение в статью';
        if (mod10 >= 2 && mod10 <= 4) return 'изображения в статьи';
        return 'изображений в статьи';
    };

    const fixTooltip = (tooltipNode) => {
        if (tooltipNode.dataset.achievementFixed) return;

        const badgeIcon = tooltipNode.nextElementSibling;
        
        if (badgeIcon && badgeIcon.classList.contains('badge-icon')) {
            const iconData = badgeIcon.outerHTML.toLowerCase(); 

            const paragraphs = tooltipNode.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (!p.textContent.trim()) {
                    for (const [internalKey, desc] of Object.entries(missingDescriptions)) {
                        if (iconData.includes(internalKey.toLowerCase())) {
                            p.innerHTML = desc;
                            break;
                        }
                    }
                }
            });
        }

        // Исправление ошибок перевода и склонений
        let content = tooltipNode.innerHTML;

        content = content
            .replace(/categoryselect-addcategory-button/g, 'Добавить категорию')
            .replace(/rte-ck-image-add/g, 'Добавить изображение')
            .replace(/oasis-signup/g, 'Регистрация') 
            .replace(/⧼|⧽/g, ''); 

        content = content.replace(
            /((?:(?:\d+(?:[\s,.\xA0]|&nbsp;)+)*\d+))\s+(?:изображений|изображения|изображение)(?:[\s<br>]*в[\s]*)(?:статьи|статью|статей)/gi,
            (match, numStr) => {
                const cleanNumStr = numStr.replace(/\D/g, ''); 
                const number = parseInt(cleanNumStr, 10);
                if (Number.isNaN(number)) return match;
                return `${numStr} ${getPlural(number)}`;
            }
        );

        tooltipNode.innerHTML = content.trim();
        tooltipNode.dataset.achievementFixed = "true";
    };

    const processTooltips = () => {
        const unhandledTooltips = document.querySelectorAll('.profile-hover:not([data-achievement-fixed="true"])');
        unhandledTooltips.forEach(fixTooltip);
    };

    const observer = new MutationObserver((mutations) => {
        let hasNewNodes = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                hasNewNodes = true;
                break;
            }
        }
        if (hasNewNodes) {
            processTooltips();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    processTooltips();
})();