/* Any JavaScript here will be loaded for all users on every page load. */

/* ============================================================================
 * EVENT CYCLERS
 * Rotates through multiple text fragments when clicking a button.
 * Usage: <span class="event-cycler">[[File:Icon.png|link=]]<span>Opt1</span><span>Opt2</span></span>
 * First child = button, rest = switchable fragments
 * ========================================================================= */

$(document).ready(function() {
    initEventCyclers();
    initTabberLinks();
});

function initEventCyclers() {
    document.querySelectorAll('.event-cycler').forEach(function(cycler) {
        if (cycler.dataset.cyclerInit === 'true') return;
        cycler.dataset.cyclerInit = 'true';
        
        var children = Array.from(cycler.children);
        if (children.length < 3) return;
        
        var button = children[0];
        var fragments = children.slice(1);
        
        fragments.forEach(function(frag) {
            frag.style.display = 'none';
        });
        
        var currentIndex = Math.floor(Math.random() * fragments.length);
        fragments[currentIndex].style.display = 'inline';
        
        button.style.cursor = 'pointer';
        var state = { index: currentIndex, fragments: fragments };
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            state.fragments[state.index].style.display = 'none';
            state.index = (state.index + 1) % state.fragments.length;
            state.fragments[state.index].style.display = 'inline';
        }, { passive: false });
    });
}

/* ============================================================================
 * TABBER LINKS
 * Replaces broken TabberLinks extension functionality.
 * Allows clicking links with hash anchors (#A, #B, etc.) to switch tabs
 * without page scroll, and handles browser back/forward navigation.
 * 
 * Works with Fandom's WDS (Wikia Design System) tabber structure:
 * - .wds-tabber: root container
 * - .wds-tabs__tab: tab buttons with data-hash attribute
 * - .wds-tab__content: tab content panels
 * ========================================================================= */

function initTabberLinks() {
    if (window.tabberLinksReplacement) return;
    window.tabberLinksReplacement = true;

    var scrollRestorationDisabled = false;
    var lastInitTime = 0;

    /* ------------------------------------------------------------------------
     * Disables browser's automatic scroll restoration.
     * Only enabled after first tabber interaction to minimize side effects.
     * --------------------------------------------------------------------- */
    function disableScrollRestoration() {
        if (scrollRestorationDisabled) return;
        try {
            if (window.history && 'scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
                scrollRestorationDisabled = true;
            }
        } catch (e) {
            // Fallback to lockScroll if scrollRestoration not supported
        }
    }

    /* ------------------------------------------------------------------------
     * Gets current scroll position across different browsers.
     * --------------------------------------------------------------------- */
    function getScrollPosition() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft || 0,
            y: window.pageYOffset || document.documentElement.scrollTop || 0
        };
    }

    /* ------------------------------------------------------------------------
     * Temporarily locks scroll position to prevent browser from jumping.
     * Used when browser tries to scroll to anchor or restore scroll position.
     * --------------------------------------------------------------------- */
    function lockScroll(duration) {
        duration = duration || 700;
        var start = getScrollPosition();
        var endTime = new Date().getTime() + duration;

        function restore() {
            var current = getScrollPosition();
            if (current.x !== start.x || current.y !== start.y) {
                window.scrollTo(start.x, start.y);
            }
        }

        function onScroll() {
            if (new Date().getTime() < endTime) restore();
            else cleanup();
        }

        function cleanup() {
            window.removeEventListener('scroll', onScroll, true);
        }

        window.addEventListener('scroll', onScroll, true);
        setTimeout(cleanup, duration);
        restore();
    }

    /* ------------------------------------------------------------------------
     * Extracts and decodes hash value, removing the leading '#'.
     * --------------------------------------------------------------------- */
    function getCleanHash(hash) {
        if (!hash || hash[0] !== '#') return '';
        try {
            return decodeURIComponent(hash.slice(1));
        } catch (e) {
            return hash.slice(1);
        }
    }

    /* ------------------------------------------------------------------------
     * Switches to a specific tab within a tabber.
     * Returns false if the hash doesn't exist in this tabber (no changes made).
     * --------------------------------------------------------------------- */
    function switchToTab(tabberRoot, cleanHash) {
        if (!tabberRoot || !cleanHash) return false;

        var tabs = tabberRoot.querySelectorAll('.wds-tabs__tab');
        var contents = tabberRoot.querySelectorAll('.wds-tab__content');
        var targetIndex = -1;

        // First, find if the target tab exists
        for (var i = 0; i < tabs.length; i++) {
            if ((tabs[i].getAttribute('data-hash') || '') === cleanHash) {
                targetIndex = i;
                break;
            }
        }

        if (targetIndex === -1) return false;

        // Switch to the target tab
        for (var i = 0; i < tabs.length; i++) {
            if (i === targetIndex) {
                tabs[i].classList.add('wds-is-current');
                tabs[i].setAttribute('tabindex', '0');
                tabs[i].setAttribute('aria-selected', 'true');
                if (contents[i]) contents[i].classList.add('wds-is-current');
            } else {
                tabs[i].classList.remove('wds-is-current');
                tabs[i].setAttribute('tabindex', '-1');
                tabs[i].setAttribute('aria-selected', 'false');
                if (contents[i]) contents[i].classList.remove('wds-is-current');
            }
        }

        return true;
    }

    /* ------------------------------------------------------------------------
     * Searches all tabbers on the page for the target hash.
     * --------------------------------------------------------------------- */
    function switchAnyTab(cleanHash) {
        if (!cleanHash) return false;
        var tabbers = document.querySelectorAll('.wds-tabber');
        for (var i = 0; i < tabbers.length; i++) {
            if (switchToTab(tabbers[i], cleanHash)) return true;
        }
        return false;
    }

    /* ------------------------------------------------------------------------
     * Checks if any tabber on the page contains the given hash.
     * Used to distinguish tabber anchors from regular page anchors.
     * --------------------------------------------------------------------- */
    function pageHasTabHash(cleanHash) {
        if (!cleanHash) return false;
        var tabbers = document.querySelectorAll('.wds-tabber');
        for (var i = 0; i < tabbers.length; i++) {
            var tabs = tabbers[i].querySelectorAll('.wds-tabs__tab');
            for (var j = 0; j < tabs.length; j++) {
                if ((tabs[j].getAttribute('data-hash') || '') === cleanHash) {
                    return true;
                }
            }
        }
        return false;
    }

    /* ------------------------------------------------------------------------
     * Handles clicks on links with hash anchors.
     * Prevents default behavior and switches tabs without scrolling.
     * Only intercepts links pointing to the current page.
     * --------------------------------------------------------------------- */
    document.addEventListener('click', function(e) {
        var link = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!link) return;

        var hash = link.hash;
        if (!hash || hash === '#') return;

        // Check if the link points to the current page
        var currentPath = window.location.pathname;
        var linkPath = link.pathname || currentPath;
        
        // If link points to a different page, let browser handle it normally
        if (linkPath !== currentPath) return;

        var cleanHash = getCleanHash(hash);
        var currentTabber = link.closest('.wds-tabber');
        var switched = false;

        if (currentTabber) switched = switchToTab(currentTabber, cleanHash);
        if (!switched) switched = switchAnyTab(cleanHash);

        if (switched) {
            e.preventDefault();
            e.stopPropagation();
            disableScrollRestoration();
            if (window.history && window.history.pushState) {
                window.history.pushState(null, '', hash);
            } else {
                lockScroll(700);
                window.location.hash = hash;
            }
        }
    }, true);

    /* ------------------------------------------------------------------------
     * Handles browser back/forward navigation.
     * --------------------------------------------------------------------- */
    function handleHistoryNavigation() {
        var cleanHash = getCleanHash(window.location.hash);
        if (!cleanHash || !pageHasTabHash(cleanHash)) return;
        disableScrollRestoration();
        lockScroll(700);
        switchAnyTab(cleanHash);
    }

    window.addEventListener('hashchange', handleHistoryNavigation);

    /* ------------------------------------------------------------------------
     * Additional safeguard for browsers that restore scroll before hashchange.
     * --------------------------------------------------------------------- */
    window.addEventListener('popstate', function() {
        var cleanHash = getCleanHash(window.location.hash);
        if (cleanHash && pageHasTabHash(cleanHash)) lockScroll(700);
    });

    /* ------------------------------------------------------------------------
     * Initialization function with duplicate call protection.
     * --------------------------------------------------------------------- */
    function init() {
        var now = new Date().getTime();
        if (now - lastInitTime < 300) return;
        lastInitTime = now;

        var cleanHash = getCleanHash(window.location.hash);
        if (cleanHash && pageHasTabHash(cleanHash)) switchAnyTab(cleanHash);
    }

    // Call init immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

/* ============================================================================
 * DYNAMIC CONTENT HANDLING
 * Re-initialize all functionality when content is loaded dynamically
 * (e.g., via AJAX, preview, etc.)
 * ========================================================================= */

if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(function() {
        initEventCyclers();
        initTabberLinks();
    });
}