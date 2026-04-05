/* Фикс фона изображений */
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
};

const observer = new MutationObserver(mutations => {
    let shouldUpdate = false;
    for (const mutation of mutations) {
        if (mutation.type === "childList" || mutation.type === "subtree" || mutation.type === "attributes") {
            shouldUpdate = true;
            break; 
        }
    }
    
    if (shouldUpdate) {
        processImages();
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