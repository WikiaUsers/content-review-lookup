//Back to Top arrow
window.BackToTopModern = true;
window.BackToTopSpeed = 700;
window.BackToTopStart = 890;

//AddRailModule Config
window.AddRailModule = [{prepend: true}];

//Less Config
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
	// this is the page that has the compiled CSS
	target: 'MediaWiki:Common.css',
	// this is the page that lists the LESS files to compile
	source: 'MediaWiki:Custom-common.less',
	// these are the pages that you want to be able to update the target page from
	// note, you should not have more than one update button per page
	load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
	// target page header
	header: 'MediaWiki:Custom-css-header/common'
} );

// Simple Tabber
document.addEventListener("DOMContentLoaded", function() {
    const tabbers = document.querySelectorAll(".tabber");
    tabbers.forEach(tabber => {
        const tabs = tabber.querySelectorAll(".tabber-tab");
        const contents = tabber.querySelectorAll(".tabber-content");

        tabs.forEach((tab, i) => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(c => c.style.display = "none");
                tab.classList.add("active");
                contents[i].style.display = "block";
            });
        });
    });
});


(function() {
    // Detect Fandom theme
    var isDark = document.body.classList.contains('theme-fandomdesktop-dark');

    // Show correct navigation
    var darkNav = document.getElementById('navigation-dark');
    var lightNav = document.getElementById('navigation-light');

    if (isDark) {
        if(darkNav) darkNav.style.display = 'block';
        if(lightNav) lightNav.style.display = 'none';
    } else {
        if(darkNav) darkNav.style.display = 'none';
        if(lightNav) lightNav.style.display = 'block';
    }

    // Optional: Listen for theme changes without page reload (Fandom SPA)
    var observer = new MutationObserver(function() {
        isDark = document.body.classList.contains('theme-fandomdesktop-dark');
        if(isDark) {
            if(darkNav) darkNav.style.display = 'block';
            if(lightNav) lightNav.style.display = 'none';
        } else {
            if(darkNav) darkNav.style.display = 'none';
            if(lightNav) lightNav.style.display = 'block';
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();

// Made by TexDGaming
window.pPreview = $.extend(true, window.pPreview, {
    apid: true,
    defimage: 'https://images.wikia.com/stickwar/images/a/a6/Unknown_artwork_older.png',
    noimage: 'https://images.wikia.com/stickwar/images/a/a6/Unknown_artwork_older.png',
    delay: 200,
    RegExp: {
        noinclude: [
            '.mw-headline', '.toc', '.portable-infobox', 'table',
            '.pi-navigation', '.navbox', '.wds-tabs', 'ul.tabs',
            '[data-template="Unit Top Navigation"]',
            '[data-template="Stage Top Navigation"]',
            '[data-template="Character Top Navigation"]',
            '.pull-quote', 'blockquote',
            '.quote', '.templatequote'
        ]
    }
});

document.addEventListener('mouseover', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    if (link.hasAttribute('title')) {
        link.setAttribute('data-original-title', link.getAttribute('title'));
        link.removeAttribute('title');
    }

    const children = link.querySelectorAll('[title]');
    children.forEach(child => {
        child.setAttribute('data-original-title', child.getAttribute('title'));
        child.removeAttribute('title');
    });
}, true);

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        const previewEl = document.querySelector('.npage-preview');
        if (previewEl) {
            const textNodes = document.createTreeWalker(previewEl, NodeFilter.SHOW_TEXT, null, false);
            let textNode;
            while (textNode = textNodes.nextNode()) {
                if (textNode.nodeValue.includes('—')) {
                    textNode.nodeValue = textNode.nodeValue.split('—')[0];
                }
            }

            const customText = previewEl.querySelector('.custom-preview-text');
            if (customText) {
                const structuralElements = previewEl.querySelectorAll('p, div, span, .npage-preview__text, .pPreview-text');
                structuralElements.forEach(function(el) {
                    if (!el.classList.contains('custom-preview-text') && !el.classList.contains('npage-preview') && !el.querySelector('.custom-preview-text')) {
                        el.remove();
                    }
                });
            }
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });

mw.hook('ppreview.show').add(function(pp) {
    var $pp = $(pp);
    
    if ($pp.data('custom-processed')) return;
    $pp.data('custom-processed', true);

    var pageTitle = $pp.data('title');
    if (!pageTitle) {
        var currentLink = document.querySelector('a:hover');
        if (currentLink) {
            pageTitle = currentLink.getAttribute('data-original-title') || currentLink.getAttribute('title');
        }
    }

    if (!pageTitle) return;

    $.getJSON(mw.util.wikiScript('api'), {
        action: 'parse',
        page: pageTitle,
        prop: 'text',
        section: 0,
        format: 'json'
    }, function(data) {
        if (data && data.parse && data.parse.text) {
            var $html = $('<div>').html(data.parse.text['*']);

            $html.find('.pull-quote, blockquote, .quote, .templatequote, .mw-headline, .toc, .portable-infobox, table, .pi-navigation, .navbox, .wds-tabs, ul.tabs').remove();

            var targetText = "";

            function cleanExtract(rawString) {
                var cleaned = rawString.replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
                if (cleaned.length > 0) {
                    var sentences = cleaned.match(/[^.!?]+[.!?]+(\s|$)/g);
                    if (sentences && sentences.length > 0) {
                        var reconstructed = "";
                        for (var i = 0; i < sentences.length; i++) {
                            var nextSentence = sentences[i];
                            if (reconstructed.toLowerCase().includes(nextSentence.trim().toLowerCase())) {
                                break;
                            }
                            reconstructed += nextSentence;
                            if (reconstructed.length > 240) break;
                        }
                        return reconstructed.trim();
                    }
                }
                return cleaned.substring(0, 240);
            }

            $html.find('p').each(function() {
                var txt = cleanExtract($(this).text());
                if (txt.length > 25) {
                    targetText = txt;
                    return false;
                }
            });

            if (!targetText) {
                $html.find('div, span, section').each(function() {
                    var txt = cleanExtract($(this).clone().children().remove().end().text());
                    if (txt.length > 25) {
                        targetText = txt;
                        return false; 
                    }
                });
            }

            if (!targetText) {
                targetText = cleanExtract($html.text());
            }

            if (targetText) {
                $pp.find('.custom-preview-text').remove();
                
                var $textContainer = $('<p class="custom-preview-text"></p>').text(targetText);
                $pp.append($textContainer);
            }
        }
    });
});

const testStyles = `
    .npage-preview {
        background-color: #071a0c !important;
        border: 2px solid #ffcc00 !important;
        border-radius: 8px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7) !important;
        color: #ffffff !important;
        padding: 12px !important;
        max-width: 350px !important;
    }
    
    .npage-preview p,
    .npage-preview div,
    .npage-preview span,
    .npage-preview__text,
    .pPreview-text,
    .npage-preview p.custom-preview-text {
        display: block !important;
        color: #e0e0e0 !important;
        font-size: 13px !important;
        line-height: 1.5 !important;
        margin-top: 4px !important;
    }
    
    .npage-preview .pull-quote,
    .npage-preview blockquote,
    .npage-preview .quote,
    .npage-preview .templatequote,
    .npage-preview table,
    .npage-preview .portable-infobox {
        display: none !important;
    }
    
    .npage-preview img {
        border-radius: 4px !important;
        border: 1px solid #444 !important;
        margin-bottom: 8px !important;
        max-width: 120px !important;
        height: auto !important;
    }
    
    .npage-preview img[src*="Unknown_artwork_older.png"] {
        display: none !important;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = testStyles;
document.head.appendChild(styleSheet);

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});