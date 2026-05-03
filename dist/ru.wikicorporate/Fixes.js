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