/* Фикс фона изображений */
(() => {

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

    // Паттерн для поиска ссылок Wikia
    const wikiaPattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;

    const processImages = () => {

        imageConfigs.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach(image => {
                for (const [attrName, regex] of Object.entries(config.attributes)) {
                    const originalValue = image.getAttribute(attrName);
                    if (originalValue) {
                        const newValue = originalValue.replace(regex, "");
                        if (originalValue !== newValue) {
                            image.setAttribute(attrName, newValue);
                        }
                    }
                }
            });
        });

        document.querySelectorAll(".pi-image-thumbnail").forEach(img => {
            const srcset = img.getAttribute("srcset");
            // Проверяем, чтобы не добавлять параметр повторно
            if (srcset && !srcset.includes("format=original")) {
                const [firstSrc] = srcset.split(" ");
                const separator = firstSrc.includes("?") ? "&" : "?";
                img.setAttribute("srcset", `${firstSrc}${separator}format=original`);
            }
        });

        document.querySelectorAll(".page__main img").forEach(img => {
            const src = img.getAttribute("src");
            // Проверяем, чтобы не добавлять параметр повторно и что домен совпадает
            if (src && !src.includes("format=original") && wikiaPattern.test(src)) {
                const separator = src.includes("?") ? "&" : "?";
                img.setAttribute("src", `${src}${separator}format=original`);
            }
        });
    };

    // Оптимизированный Observer с защитой от спама вызовов
    let isUpdating = false;

    const observer = new MutationObserver(mutations => {
        let shouldUpdate = false;

        for (const mutation of mutations) {
            if (mutation.type === "childList" || mutation.type === "attributes") {
                shouldUpdate = true;
                break; 
            }
        }

        // Если нужно обновить и мы еще не находимся в процессе обновления
        if (shouldUpdate && !isUpdating) {
            isUpdating = true;
            // requestAnimationFrame группирует изменения DOM, предотвращая зависания
            requestAnimationFrame(() => {
                processImages();
                isUpdating = false;
            });
        }
    });

    const observerConfig = {
        childList: true,
        subtree: true,
        attributes: true, 
        attributeFilter: ['src', 'srcset']
    };

    observer.observe(document.body, observerConfig);
    
    processImages();
})();