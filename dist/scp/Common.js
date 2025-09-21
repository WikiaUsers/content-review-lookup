/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {

		// former staff
		formerbureaucrat: { u:'Former Bereaucrat', order: 100 },
		formersysop: { u:'Former Administrator', order: 101 },
		formermod: { u:'Former Moderator',  order: 102 },

		// former staff reasons
		fired: { u:'Hall of Shame', order: 103 },

		// content-moderator and threadmoderator merged together
		moderator: { u:'Moderator', order: 104 },

};

UserTagsJS.modules.mwGroups = ['threadmoderator', 'content-moderator'];

UserTagsJS.modules.mwGroups= {
	merge: true
        groups: ['moderator']
};




/* Adding custom user groups to users */

UserTagsJS.modules.custom = {
	'SnowyDasher47': ['moderator']
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// License thing for creative commons
$(function() {
    // Custom license text (modify as needed)
    var customText = 'Unless otherwise stated, the content of this page is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en" target="_blank">Creative Commons Attribution-ShareAlike 4.0 License</a>.';

    // Set up a MutationObserver to detect changes in the footer
    var observer = new MutationObserver(function(mutations) {
        var licenseElement = document.querySelector('.footer__license-text, .license-description, .wikia-license');
        
        if (licenseElement) {
            // Replace the text
            licenseElement.innerHTML = customText;
            
            // Stop observing once changed (optional)
            observer.disconnect();
        }
    });

    // Start observing the entire document
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    // Fallback: Try replacing after 3 seconds in case MutationObserver fails
    setTimeout(function() {
        var fallbackElement = document.querySelector('.footer__license-text, .license-description, .wikia-license');
        if (fallbackElement && fallbackElement.innerHTML.includes('unless otherwise noted')) {
            fallbackElement.innerHTML = customText;
        }
    }, 3000);
});

// actual .svg rendering (it is quite annoying)
// Works around Fandom's automatic rasterization

(function() {
    function inlineSVGs() {
        document.querySelectorAll("img").forEach(function(img) {
            if (img.dataset.svgProcessed) return; // skip if already done
            img.dataset.svgProcessed = "true";

            let src = img.src;
            if (!src) return;

            // Check if this is a rasterized SVG image
            if (src.includes("static.wikia.nocookie.net") && 
                (src.includes("/revision/") || src.includes("scale-to-width"))) {
                
                // Extract the original SVG path from the URL
                // Fandom URL pattern: /images/{hash1}/{hash2}/{filename}.svg/revision/.../scale-to-width-down/...
                const match = src.match(/\/images\/[0-9a-f]\/[0-9a-f]{2}\/([^\/]+\.svg)/i);
                
                if (match) {
                    // Reconstruct the original SVG URL
                    const filename = match[1];
                    const pathMatch = src.match(/(\/images\/[0-9a-f]\/[0-9a-f]{2}\/[^\/]+\.svg)/i);
                    
                    if (pathMatch) {
                        const svgPath = pathMatch[1];
                        const svgURL = "https://static.wikia.nocookie.net" + svgPath;
                        replaceWithSVG(img, svgURL);
                    }
                }
            }
            // If it's already a direct SVG link, just use it directly
            else if (src.includes("static.wikia.nocookie.net") && src.match(/\.svg(\?|$)/i)) {
                replaceWithSVG(img, src);
            }
        });
    }

    function replaceWithSVG(img, url) {
        // Add cache busting parameter to avoid browser caching issues
        const cacheBusterUrl = url + (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
        
        fetch(cacheBusterUrl)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(svgText => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(svgText, "image/svg+xml");
                
                // Check for XML parsing errors
                const parserErrors = doc.querySelectorAll('parsererror');
                if (parserErrors.length > 0) {
                    throw new Error('SVG parsing error');
                }
                
                let svg = doc.querySelector("svg");
                if (svg) {
                    // Copy all relevant attributes from the original image
                    if (img.id) svg.id = img.id;
                    if (img.className) svg.className = img.className;
                    
                    // Preserve width/height if present
                    const width = img.getAttribute("width") || img.style.width;
                    const height = img.getAttribute("height") || img.style.height;
                    
                    if (width) svg.setAttribute("width", width);
                    if (height) svg.setAttribute("height", height);
                    
                    // Copy styles
                    if (img.style.cssText) {
                        svg.style.cssText = img.style.cssText;
                    }
                    
                    // Copy data attributes
                    for (let i = 0; i < img.attributes.length; i++) {
                        const attr = img.attributes[i];
                        if (attr.name.startsWith('data-')) {
                            svg.setAttribute(attr.name, attr.value);
                        }
                    }
                    
                    svg.setAttribute("role", "img");
                    img.replaceWith(svg);
                }
            })
            .catch(err => {
                console.error("SVG inline error:", err, "URL:", url);
                // Remove the processed flag so we can try again if needed
                delete img.dataset.svgProcessed;
            });
    }

    // Run after page content loads
    mw.hook("wikipage.content").add(inlineSVGs);
    
    // Also run on initial page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inlineSVGs);
    } else {
        inlineSVGs();
    }
    
    // Set up a mutation observer to handle dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                inlineSVGs();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();