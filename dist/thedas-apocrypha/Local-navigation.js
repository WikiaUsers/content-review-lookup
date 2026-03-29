/* ============================================================
   THEDAS APOCRYPHA WIKI
   MediaWiki:Local-navigation.js
   
   Enhances local navigation with:
   - Dynamic icon insertion based on nav item text
   - Dropdown ARIA accessibility improvements
   - Keyboard navigation (arrow keys, escape, enter)
   
   Codename: BLOOD SCRIPTURE
   ============================================================ */

(function() {
    'use strict';

    /* --------------------------------------------------------
       CONFIGURATION
       Map navigation labels to icon classes.
       Keys are lowercase; matching is case-insensitive.
       Values become CSS classes: .nav-icon-{value}
       Style these icons in Custom-local-navigation.css.
       -------------------------------------------------------- */

    var iconMap = {
        /* Primary navigation */
        'home':           'home',
        'main page':      'home',

        /* Characters */
        'characters':     'characters',
        'companions':     'characters',
        'heroes':         'characters',
        'villains':       'characters',
        'npcs':           'characters',

        /* Races & Classes */
        'races':          'races',
        'human':          'races',
        'elves':          'races',
        'dwarves':        'races',
        'qunari':         'races',
        'classes':        'classes',
        'warrior':        'classes',
        'rogue':          'classes',
        'mage':           'classes',
        'specializations':'classes',

        /* Locations */
        'locations':      'locations',
        'places':         'locations',
        'nations':        'locations',
        'ferelden':       'locations',
        'orlais':         'locations',
        'tevinter':       'locations',
        'antiva':         'locations',
        'nevarra':        'locations',
        'free marches':   'locations',
        'deep roads':     'locations',
        'the fade':       'locations',

        /* Factions & Organizations */
        'factions':       'factions',
        'organizations':  'factions',
        'grey wardens':   'factions',
        'wardens':        'factions',
        'chantry':        'factions',
        'templars':       'factions',
        'seekers':        'factions',
        'inquisition':    'factions',
        'dalish':         'factions',
        'carta':          'factions',
        'crows':          'factions',
        'venatori':       'factions',
        'qun':            'factions',

        /* Lore & History */
        'lore':           'lore',
        'codex':          'lore',
        'history':        'timeline',
        'timeline':       'timeline',
        'ages':           'timeline',
        'events':         'timeline',
        'blight':         'timeline',

        /* Magic & Powers */
        'magic':          'magic',
        'spells':         'magic',
        'abilities':      'magic',
        'blood magic':    'magic',
        'the fade':       'magic',

        /* Items & Equipment */
        'items':          'items',
        'equipment':      'items',
        'weapons':        'items',
        'armor':          'items',
        'artifacts':      'items',

        /* Quests & Gameplay */
        'quests':         'quests',
        'missions':       'quests',
        'war table':      'quests',

        /* Community */
        'community':      'community',
        'explore':        'explore',
        'browse':         'explore',
        'wiki':           'explore',
        'recent changes': 'community',
        'help':           'community'
    };

    /* --------------------------------------------------------
       UTILITY FUNCTIONS
       -------------------------------------------------------- */

    /**
     * Create an icon span element.
     * @param {string} iconType - The icon class suffix.
     * @returns {HTMLElement}
     */
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'nav-icon nav-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    /**
     * Look up the icon type for a given text string.
     * Checks exact match first, then substring match.
     * @param {string} text
     * @returns {string|null}
     */
    function getIconType(text) {
        if (!text) return null;
        var normalized = text.toLowerCase().trim();

        // Exact match
        if (iconMap[normalized]) {
            return iconMap[normalized];
        }

        // Substring match
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
     * Prepend an icon to a navigation element if a match is found.
     * @param {HTMLElement} navItem
     */
    function addIconToNavItem(navItem) {
        if (navItem.querySelector('.nav-icon')) return;

        var textContent = navItem.textContent || navItem.innerText;
        var iconType = getIconType(textContent);

        if (iconType) {
            navItem.insertBefore(createIcon(iconType), navItem.firstChild);
        }
    }

    /* --------------------------------------------------------
       ACCESSIBILITY ENHANCEMENTS
       -------------------------------------------------------- */

    function enhanceDropdownAccessibility() {
        var dropdowns = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-dropdown'
        );

        dropdowns.forEach(function(dropdown) {
            var toggle  = dropdown.querySelector('.wds-dropdown__toggle');
            var content = dropdown.querySelector('.wds-dropdown__content');
            if (!toggle || !content) return;

            // Unique ID for ARIA binding
            var uid = 'ta-nav-dd-' + Math.random().toString(36).substr(2, 9);
            content.id = uid;
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', uid);

            // Mouse events
            dropdown.addEventListener('mouseenter', function() {
                toggle.setAttribute('aria-expanded', 'true');
            });
            dropdown.addEventListener('mouseleave', function() {
                toggle.setAttribute('aria-expanded', 'false');
            });

            // Keyboard: toggle open/close
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var expanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', String(!expanded));
                    if (!expanded) {
                        var first = content.querySelector('a');
                        if (first) first.focus();
                    }
                }
                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });

            // Keyboard: arrow navigation inside dropdown
            content.addEventListener('keydown', function(e) {
                var links = content.querySelectorAll('a');
                var idx   = Array.prototype.indexOf.call(links, document.activeElement);

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    links[(idx + 1) % links.length].focus();
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    links[idx - 1 < 0 ? links.length - 1 : idx - 1].focus();
                }
                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        });
    }

    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */

    function init() {
        // Tab labels
        var labels = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-tabs__tab-label'
        );
        labels.forEach(addIconToNavItem);

        // Dropdown links
        var ddLinks = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-dropdown__content a'
        );
        ddLinks.forEach(addIconToNavItem);

        // ARIA enhancements
        enhanceDropdownAccessibility();
    }

    /* --------------------------------------------------------
       RUN
       -------------------------------------------------------- */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 200);
        });
    } else {
        setTimeout(init, 200);
    }

    // Fallback on window load
    window.addEventListener('load', function() {
        setTimeout(init, 500);
    });

})();