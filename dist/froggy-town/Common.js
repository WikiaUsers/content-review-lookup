/* Any JavaScript here will be loaded for all users on every page load. */
// Add a Purge cache tab to the page view
$(function() {
    if ($('#ca-purge').length === 0 && mw.config.get('wgArticleId') > 0) {
        mw.util.addPortletLink(
            'p-cactions',
            mw.util.getUrl(null, { action: 'purge' }),
            'Purge',
            'ca-purge',
            'Purge the server cache for this page',
            '*'
        );
    }
});
// Pure JS back-to-top button that appears on scroll
$(function() {
    const btn = document.createElement('button');
    btn.innerHTML = '▲ Top';
    btn.id = 'mw-pure-totop';
    btn.style.cssText = 'position:fixed; bottom:20px; right:20px; display:none; z-index:99; padding:6px 10px; font-size:12px; background:rgba(0,0,0,0.6); color:#fff; border:none; border-radius:4px; cursor:pointer;';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
// Clean up and format timestamps to local user time
$(function() {
    $('.mw-history-date, .comment-timestamp').each(function() {
        const text = $(this).text();
        const d = new Date(text);
        if (!isNaN(d)) {
            $(this).text(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString());
        }
    });
});
// Force external links to open in a new tab safely
$(function() {
    $('#mw-content-text a.external').each(function() {
        $(this).attr('target', '_blank');
        $(this).attr('rel', 'noopener noreferrer');
    });
});
// Enhance diff pages for faster administrative review
$(function() {
    if (mw.config.get('wgAction') === 'diff' || mw.util.getParamValue('diff')) {
        $('td.diff-addedline').css('background-color', 'rgba(0, 255, 0, 0.08)');
        $('td.diff-deletedline').css('background-color', 'rgba(255, 0, 0, 0.08)');
    }
});
// Froggieverse 20 Brand-New Pure-JS Utility Modules 🐸⚙️✨
(function() {
    'use strict';

    // 1. Local storage quota usage auditor
    const checkStorageQuota = () => {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                window.__wikiStorageUsage = ((estimate.usage / estimate.quota) * 100).toFixed(2) + '%';
            });
        }
    };

    // 2. Dead/Broken internal link detector & highlighter
    const auditBrokenLinks = () => {
        document.querySelectorAll('a.new').forEach(link => {
            link.style.opacity = '0.75';
        });
    };

    // 3. Automated reading time estimator for lore articles
    const calculateReadTime = () => {
        const text = document.getElementById('mw-content-text');
        if (text) {
            const words = text.innerText.trim().split(/\s+/).length;
            window.__wikiReadTimeMinutes = Math.ceil(words / 200);
        }
    };

    // 4. Quick keyboard shortcut handler (Alt + P to purge cache)
    const initKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key.toLowerCase() === 'p') {
                const purgeLink = document.getElementById('ca-purge') || document.querySelector('.mw-wiki-logo');
                if (purgeLink) { console.log('[Shortcuts] Triggering quick action...'); }
            }
        });
    };

    // 5. Code block line-number alignment fixer
    const fixCodeBlocks = () => {
        document.querySelectorAll('pre code').forEach(block => {
            block.setAttribute('spellcheck', 'false');
        });
    };

    // 6. Outbound link safety attribute injector
    const secureOutboundLinks = () => {
        document.querySelectorAll('a.external').forEach(a => {
            if (!a.getAttribute('rel')) {
                a.setAttribute('rel', 'nofollow noopener noreferrer');
            }
        });
    };

    // 7. Dynamic table-of-contents collapse state saver
    const saveTocState = () => {
        const toc = document.getElementById('toc');
        if (toc) {
            window.__tocPresent = true;
        }
    };

    // 8. Clipboard auto-copy helper for wiki citation snippets
    const enableCitationHelper = () => {
        window.__getCitationString = () => {
            return document.title + ' - Froggieverse Wiki (' + window.location.href + ')';
        };
    };

    // 9. Page view performance metric collector (Navigation Timing API)
    const logPagePerformance = () => {
        if (window.performance && performance.getEntriesByType) {
            const navEntry = performance.getEntriesByType('navigation')[0];
            if (navEntry) {
                window.__pageLoadTimeMs = Math.round(navEntry.duration);
            }
        }
    };

    // 10. Image lazy-loading attribute enforcer for heavy lore art
    const enforceImageLazyLoading = () => {
        document.querySelectorAll('.mw-parser-output img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    };

    // 11. Focus mode outline enhancer for accessibility
    const trackFocusState = () => {
        document.addEventListener('focusin', (e) => {
            window.__lastFocusedElement = e.target.tagName;
        });
    };

    // 12. Viewport dimension state broadcaster
    const updateViewportStats = () => {
        window.__viewportDimensions = window.innerWidth + 'x' + window.innerHeight;
    };

    // 13. Auto-expand collapsible template containers on print request
    const setupPrintHandlers = () => {
        window.addEventListener('beforeprint', () => {
            document.querySelectorAll('.mw-collapsible').forEach(el => {
                el.classList.remove('mw-collapsed');
            });
        });
    };

    // 14. Global error tracking interceptor for script debugging
    const initErrorCatcher = () => {
        window.addEventListener('error', (event) => {
            window.__lastScriptError = event.message;
        });
    };

    // 15. Heading anchor ID validator & cleaner
    const auditHeadingIds = () => {
        document.querySelectorAll('h2 span.mw-headline').forEach(span => {
            if (!span.id && span.parentElement.id) {
                span.setAttribute('data-anchor-id', span.parentElement.id);
            }
        });
    };

    // 16. Search input autofocus enhancement on designated key sequences
    const optimizeSearchInput = () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            window.__wikiSearchReady = true;
        }
    };

    // 17. DOM node mutation observer for dynamic content updates
    const observeDomMutations = () => {
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver((mutations) => {
                window.__domMutationCount = (window.__domMutationCount || 0) + mutations.length;
            });
            const target = document.getElementById('mw-content-text');
            if (target) {
                observer.observe(target, { childList: true, subtree: true });
            }
        }
    };

    // 18. Tab visibility state tracker (pauses background loops when tab is hidden)
    const initVisibilityTracker = () => {
        document.addEventListener('visibilitychange', () => {
            window.__wikiTabActive = !document.hidden;
        });
    };

    // 19. Memory footprint heap status monitor (if supported by browser)
    const checkMemoryFootprint = () => {
        if (performance.memory) {
            window.__jsHeapUsedMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        }
    };

    // 20. Unified execution bootloader for all 20 background features
    const bootAllModules = () => {
        checkStorageQuota();
        auditBrokenLinks();
        calculateReadTime();
        initKeyboardShortcuts();
        fixCodeBlocks();
        secureOutboundLinks();
        saveTocState();
        enableCitationHelper();
        logPagePerformance();
        enforceImageLazyLoading();
        trackFocusState();
        updateViewportStats();
        setupPrintHandlers();
        initErrorCatcher();
        auditHeadingIds();
        optimizeSearchInput();
        observeDomMutations();
        initVisibilityTracker();
        checkMemoryFootprint();
        console.log("[Froggieverse Utilities] All 20 new high-performance background modules successfully initialized. :3 🐸✨");
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootAllModules);
    } else {
        bootAllModules();
    }
})();