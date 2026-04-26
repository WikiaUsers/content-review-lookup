/* ============================================================ */
/*  MediaWiki:Local-navigation.js                               */
/*  THE FOUNDRY WIKI                                            */
/*  Local Navigation Enhancements — Codename "FORGEFIRE"        */
/*                                                              */
/*  This module handles:                                        */
/*    - Dynamic icon insertion based on nav item text           */
/*    - Dropdown ARIA accessibility attributes                  */
/*    - Full keyboard navigation (Enter, Space, Arrow, Escape)  */
/*                                                              */
/*  Import via Common.js:                                       */
/*  importArticles({                                            */
/*      type: 'script',                                         */
/*      articles: ['MediaWiki:Local-navigation.js']             */
/*  });                                                         */
/*                                                              */
/*  Last Updated: April 2026                                    */
/* ============================================================ */

(function() {
    'use strict';

    /* -------------------------------------------------------- */
    /*  CONFIGURATION                                           */
    /*  Map navigation labels to icon class suffixes.           */
    /*  CSS handles the actual icon rendering via               */
    /*  .fd-nav-icon-{type} pseudo-elements.                    */
    /* -------------------------------------------------------- */

    var iconMap = {
        /* Primary navigation */
        'home': 'home',
        'main page': 'home',
        'characters': 'characters',
        'heroes': 'characters',
        'villains': 'characters',
        'locations': 'locations',
        'places': 'locations',
        'geography': 'locations',
        'organizations': 'organizations',
        'teams': 'organizations',
        'factions': 'organizations',
        'powers': 'powers',
        'abilities': 'powers',
        'timeline': 'timeline',
        'history': 'timeline',
        'events': 'timeline',
        'community': 'community',
        'explore': 'explore',
        'browse': 'explore',
        'wiki': 'explore',
        'lore': 'lore',

        /* Foundry-specific terms */
        'alters': 'powers',
        'invokers': 'powers',
        'personas': 'powers',
        'mixers': 'powers',
        'the well': 'powers',
        'imma': 'organizations',
        'sentinels': 'organizations',
        'sentinels of justice': 'organizations',
        'syndicate': 'organizations',
        'the syndicate': 'organizations',
        'ascendancy': 'organizations',
        'liberty league': 'organizations',
        'occidental': 'locations',
        'meridian': 'locations',
        'oriental': 'locations',
        'zero event': 'timeline',
        'chaos years': 'timeline',
        'founding era': 'timeline',
        'modern era': 'timeline',

        /* Continent names */
        'vesperia': 'locations',
        'australis': 'locations',
        'borelia': 'locations'
    };

    /* -------------------------------------------------------- */
    /*  UTILITY FUNCTIONS                                       */
    /* -------------------------------------------------------- */

    /**
     * Create an icon span element
     * @param {string} iconType - Icon type suffix for CSS class
     * @returns {HTMLSpanElement}
     */
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'fd-nav-icon fd-nav-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    /**
     * Determine icon type from text content
     * @param {string} text - Nav item text
     * @returns {string|null} Icon type or null
     */
    function getIconType(text) {
        if (!text) return null;

        var normalized = text.toLowerCase().trim();

        /* Exact match first */
        if (iconMap[normalized]) {
            return iconMap[normalized];
        }

        /* Partial match — check if text contains a keyword */
        for (var keyword in iconMap) {
            if (iconMap.hasOwnProperty(keyword)) {
                if (normalized.indexOf(keyword) !== -1) {
                    return iconMap[keyword];
                }
            }
        }

        return null;
    }

    /**
     * Add icon to a navigation element if applicable
     * @param {HTMLElement} navItem - The nav element to enhance
     */
    function addIconToNavItem(navItem) {
        /* Skip if already has an icon */
        if (navItem.querySelector('.fd-nav-icon')) {
            return;
        }

        var textContent = navItem.textContent || navItem.innerText;
        var iconType = getIconType(textContent);

        if (iconType) {
            var icon = createIcon(iconType);
            navItem.insertBefore(icon, navItem.firstChild);
        }
    }

    /* -------------------------------------------------------- */
    /*  ACCESSIBILITY ENHANCEMENTS                              */
    /* -------------------------------------------------------- */

    /**
     * Enhance all navigation dropdowns with ARIA attributes
     * and keyboard navigation support.
     */
    function enhanceDropdownAccessibility() {
        var dropdowns = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-dropdown'
        );

        dropdowns.forEach(function(dropdown) {
            var toggle = dropdown.querySelector('.wds-dropdown__toggle');
            var content = dropdown.querySelector('.wds-dropdown__content');

            if (!toggle || !content) return;

            /* Generate unique ID for ARIA linkage */
            var dropdownId = 'fd-nav-dropdown-' +
                Math.random().toString(36).substr(2, 9);
            content.id = dropdownId;

            /* ARIA attributes on toggle */
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', dropdownId);

            /* Update aria-expanded on mouse enter/leave */
            dropdown.addEventListener('mouseenter', function() {
                toggle.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', function() {
                toggle.setAttribute('aria-expanded', 'false');
            });

            /* Keyboard: Enter/Space to toggle, Escape to close */
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var isExpanded =
                        toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded',
                        String(!isExpanded));

                    if (!isExpanded) {
                        /* Focus first link in the opened dropdown */
                        var firstLink = content.querySelector('a');
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                }

                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });

            /* Arrow key navigation within dropdown content */
            content.addEventListener('keydown', function(e) {
                var links = content.querySelectorAll('a');
                if (!links.length) return;

                var currentIndex = Array.prototype.indexOf.call(
                    links, document.activeElement
                );

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    var nextIndex = (currentIndex + 1) % links.length;
                    links[nextIndex].focus();
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    var prevIndex = currentIndex - 1;
                    if (prevIndex < 0) prevIndex = links.length - 1;
                    links[prevIndex].focus();
                }

                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }

                /* Home/End keys for quick jump */
                if (e.key === 'Home') {
                    e.preventDefault();
                    links[0].focus();
                }

                if (e.key === 'End') {
                    e.preventDefault();
                    links[links.length - 1].focus();
                }
            });
        });
    }

    /* -------------------------------------------------------- */
    /*  INITIALIZATION                                          */
    /* -------------------------------------------------------- */

    var initialized = false;

    function initLocalNavigation() {
        /* Prevent double-initialization */
        if (initialized) return;

        var navContainer = document.querySelector(
            '.fandom-community-header__local-navigation'
        );
        if (!navContainer) return;

        initialized = true;

        /* Add icons to top-level tab labels */
        var navLabels = navContainer.querySelectorAll(
            '.wds-tabs__tab-label'
        );
        navLabels.forEach(function(label) {
            addIconToNavItem(label);
        });

        /* Add icons to dropdown links */
        var dropdownLinks = navContainer.querySelectorAll(
            '.wds-dropdown__content a'
        );
        dropdownLinks.forEach(function(link) {
            addIconToNavItem(link);
        });

        /* Enhance dropdown accessibility */
        enhanceDropdownAccessibility();

        /* Log */
        if (window.FoundryWiki && window.FoundryWiki.utils) {
            window.FoundryWiki.utils.log('Local navigation module initialized');
        }
    }

    /* -------------------------------------------------------- */
    /*  RUN                                                     */
    /* -------------------------------------------------------- */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initLocalNavigation, 200);
        });
    } else {
        setTimeout(initLocalNavigation, 200);
    }

    /* Fallback on window load in case Fandom elements load late */
    window.addEventListener('load', function() {
        setTimeout(initLocalNavigation, 500);
    });

})();

/* ============================================================ */
/*  END OF MediaWiki:Local-navigation.js                        */
/*  THE FOUNDRY WIKI — Codename FORGEFIRE                       */
/* ============================================================ */